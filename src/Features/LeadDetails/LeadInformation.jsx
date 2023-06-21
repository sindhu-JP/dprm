import React, { useState } from 'react';
import _ from 'lodash';
import { connect, useSelector } from 'react-redux';
import { useBoolean } from 'react-hanger';
import Statuses from 'lib/constants/statuses';
import ModalsStore from 'Store/Modals';
import Modals from 'Store/Modals';
import MenuIcon from './MenuIcon';
import { useDispatch } from 'react-redux';
import StepProgressBar from './StepProgressBar';
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  makeStyles,
  Chip,
  Collapse
} from '@material-ui/core';
import dayjs from 'dayjs';
import LeadController from 'Controllers/Lead';
import { Leads } from 'Http/api';

// import ChangePlanStepper from './ChangePlanStepper';
import STATUS from 'lib/constants/statuses';
import Leadfactory from 'Factory/Lead';
import hierarchyApi from 'Http/api/hierarchy';
import LeadsAPI from 'Http/api/leads';
import { useHistory } from 'react-router-dom';
import { Trans } from '@lingui/react';
const LeadInformation = (props) => {
  console.log(props, "properview")
  const classes = useStyles();
  const history = useHistory();
  // const comment = useStateful("");
  const [textMsg, setTextMsg] = useState('');
  const optionalSectionExpanded = useBoolean(false);
  const dispatch = useDispatch();
  const [noteList, setNoteList] = useState(props?.values?.note || []);
  const userInfo = useSelector((state) => state.hierarchy.userInfo);
  const handleChange = (data) => {
    setTextMsg(data);
  };
  const keyPress = async (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      let res = await Leads.updateNoteStatus(props.values.id, {
        note: [
          ...noteList,
          {
            text: e.target.value,
            date: new Date().toISOString(),
            author: props.user.sub
          }
        ]
      });
      // let res = props.commentSection({
      //   id: props.values.id,
      //   note: [...noteList, {
      //     "text": e.target.value,
      //     "date": new Date().toISOString(),
      //     "author": props.user.sub,
      //   }]
      // });
      setTextMsg('');
      setNoteList(res.data.note);
      // props.commentSection({ id: props.values.id, note: res.data.note })

      // setNoteList(props.comment)
    }
  };
  //new comment ends
  const handleStatusUpdate = async (action) => {
    history.push({
      pathname: '/digital-prm-web-ui/hierarchy',
      state: {
        partnerId: props.columns.id
      }
    });
    // props.onAction(action, {
    //   data: props.partnerDetails
    //   // subtabledata: props.SubOpportunity,
    // });
  };

  const getStatusColor = (lead) => {
    return Statuses.statuses[lead?.status]?.color || 'orange';
  };

  const buttonAction = async (lead, leadDetauls) => {
    let getdata = await Leadfactory.getworkflowpayload(
      props.authState,
      lead,
      leadDetauls
    );

    let payload = {
      ...getdata
    };

    const quoteApprovel = await hierarchyApi
      .executeProcess(payload)
      .catch((err) => {});
    const quotedata = JSON.parse(quoteApprovel?.taskResponse);
    if (quotedata.ceo) {
      props.Alertopen({
        type: 'error',
        message: Leadfactory.getErrormsg(quotedata, 'CEO', 'ceo')
      });
    } else {
      props.Alertopen({
        type: 'error',
        message: Leadfactory.getErrormsg(quotedata, 'GeneralManager', 'gm')
      });
    }

    if (!lead.generalManager) {
      let payload = {
        generalManager: _.get(quotedata, 'gm.username'),

        ceo: _.get(quotedata, 'ceo.username')
      };

      const data = await LeadsAPI.updateStatus(lead.data.id, {
        ...payload
      }).catch((err) => {});

      //  let store gm=
    }
    return quoteApprovel;
  };
  const mainActions = (lead) => {
    let action = Statuses.detailsPageActions[lead.status];

    let obj = {};

    // if (action) {
    //   Object.keys(action).map((item) => {
    //     if (
    //       action[item]?.approvalRequiredForLead ||
    //       action[item]?.approvalRequiredForQuote
    //     ) {
    //       if (
    //         action[item].approvalRequiredForQuote ===
    //         userInfo.approvalRequiredForQuote
    //       ) {
    //         obj[item] = action[item]
    //       } else if (
    //         action[item].approvalRequiredForLead ===
    //         userInfo.approvalRequiredForLead
    //       ) {
    //         obj[item] = action[item]
    //       }
    //     } else {
    //       obj[item] = action[item]
    //     }
    //   })
    // }
    let value = {};

    let onboardingstatus = false;

    let temp = [];

    if (props.SubOpportunity?.serviceRequestType === 'CHANGE_PLAN') {
      temp.push(...STATUS?.stepperlabel?.Opportunity);
    }

    if (
      action?.actionblob === 'customerAcceptence' ||
      action?.actionblob === 'customerRejection'
    ) {
      for (var i = 0; i < props.values.opportunities.length; i++) {
        if (props.values.opportunities[i].status === 'ONBOARDING') {
          onboardingstatus = true;
          props.Alertopen({
            type: 'error',
            message: 'Please Reassign for Approval'
          });

          break;
        }
      }
    }

    // if(usersStore.isAccountManger) {
    //   if(!action.onlyForAccountManger) {

    if (action?.primary) {
      let onboardingstatus = false;
      let temp = [];

      if (props.SubOpportunity?.serviceRequestType === 'CHANGE_PLAN') {
        temp.push(...STATUS?.stepperlabel?.Opportunity);
      }

      if (
        action?.primary.actionblob === 'customerAcceptence' ||
        action?.primary.actionblob === 'customerRejection'
      ) {
        for (let i = 0; i < props.values.opportunities.length; i++) {
          if (props.values.opportunities[i].status === 'ONBOARDING') {
            onboardingstatus = true;
            // props.Alertopen({
            //   type: "error",
            //   message:
            //     "Please wait while one of your opportunity is due for onboarding",
            // });

            break;
          }
        }
      }
      value.primary = (
        <Button
          variant="contained"
          color="primary"
          size="small"
          // disabled={action.primary.approvalRequiredForQuote}
          onClick={async () => {
            lead = {
              data: props.leadInfo
            };
            if (
              Leadfactory.getpermissions(
                props.authState?.user,
                action.primary,
                lead
              )
            ) {
              if (action?.primary.modalId && onboardingstatus === false) {
                props.openModal({
                  id: action.primary.modalId,
                  context: {
                    lead: props.leadInfo,
                    user: props.user,
                    quoteId: props.SubOpportunity?.quoteRef?.id,
                    NewOpp: false,
                    opportuntiData: props.SubOpportunity,
                    Stepper: temp
                  }
                });
                if (action?.primary.actionBlob) {
                  props[action?.primary.actionBlob]({
                    quoteId: props.SubOpportunity?.quoteRef?.id
                  });
                }
              } else if (
                action.primary.actionType &&
                typeof props[action.primary.actionType] === 'function'
              ) {
                props[action.primary.actionType]({
                  opportuntiData: props.SubOpportunity,
                  id: props.leadInfo.id,
                  quoteId: props.SubOpportunity?.quoteRef?.id,
                  status: action.nextStatus,
                  NewOpp: false,
                  user: props.user,
                  Stepper: temp
                });
              }
            } else {
              if (action?.primary.modalId === 'approveLead') {
                const usergrpinfo = await hierarchyApi
                  .digitalSales(lead.data?.leadAssignment?.name)
                  .catch((err) => {
                    throw Error('Failed to Digital sales. Please try again.');
                  });

                props.Alertopen({
                  type: 'error',
                  message: `Please wait while your Reporting Manager (${_.get(
                    usergrpinfo,
                    'parent.username',
                    ''
                  )}) is reviewing the  details for approval  `
                });

                return usergrpinfo;
              } else {
                buttonAction(props.SubOpportunity, props.leadInfo);
              }
              // const usergrpinfo = await hierarchyApi.digitalSales( props.leadInfo?.leadAssignment?.name).catch((err) => {
              //   throw Error('Failed to Digital sales. Please try again.')
              // })

              // props.Alertopen({
              //   type: 'error',
              //   message: `Please wait while the (${_.get(usergrpinfo,"parent.username", "")}) is reviewing the lead details for approval  `
              // })
            }
          }}
        >
          {action.primary.label}{' '}
        </Button>
      );
    }

    if (
      action?.secondary &&
      !Leadfactory.getpermissions(props.authState?.user, action.secondary)
    ) {
      let temp = [];

      if (props.SubOpportunity?.serviceRequestType === 'CHANGE_PLAN') {
        temp.push(...STATUS?.stepperlabel?.Opportunity);
      }

      let onboardingstatus = false;

      if (
        action?.secondary.actionblob === 'customerAcceptence' ||
        action?.secondary.actionblob === 'customerRejection'
      ) {
        for (let i = 0; i < lead.data.opportunities.length; i++) {
          if (lead.data.opportunities[i].status === 'ONBOARDING') {
            onboardingstatus = true;
            // props.Alertopen({
            //   type: "error",
            //   message:
            //     "Please wait while one of your opportunity is due for onboarding",
            // });

            break;
          }
        }
      }
      value.secondary = (
        <Button
          variant="outlined"
          size="small"
          onClick={async () => {
            lead = {
              data: props.leadInfo
            };
            if (
              Leadfactory.getpermissions(
                props.authState?.user,
                action?.secondary,
                lead
              )
            ) {
              if (action?.secondary.modalId && onboardingstatus === false) {
                props.openModal({
                  id: action.secondary.modalId,
                  context: {
                    lead: props.leadInfo,
                    user: props.user,
                    NewOpp: false,
                    quoteId: props.SubOpportunity?.quoteRef?.id,
                    opportuntiData: props.SubOpportunity,
                    Stepper: temp
                  }
                });
              } else if (
                action.secondary.actionType &&
                typeof props[action.secondary.actionType] === 'function'
              ) {
                props[action.secondary.actionType]({
                  id: props.leadInfo.id,
                  NewOpp: false,
                  user: props.user,

                  quoteId: props.SubOpportunity?.quoteRef?.id,
                  status: action.nextStatus,
                  opportuntiData: props.SubOpportunity,
                  Stepper: temp
                });
              }
            } else {
              // const usergrpinfo = await hierarchyApi.digitalSales( props.leadInfo?.leadAssignment?.name).catch((err) => {
              //   throw Error('Failed to Digital sales. Please try again.')
              // })

              // props.Alertopen({
              //   type: 'error',
              //   message: `Please wait while the (${_.get(usergrpinfo,"parent.username", "")}) is reviewing the lead details for approval  `
              // })

              if (action?.secondary.modalId === 'approveLead') {
                const usergrpinfo = await hierarchyApi
                  .digitalSales(lead.data?.leadAssignment?.name)
                  .catch((err) => {
                    throw Error('Failed to Digital sales. Please try again.');
                  });

                props.Alertopen({
                  type: 'error',
                  message: `Please wait while your Reporting Manager (${_.get(
                    usergrpinfo,
                    'parent.username',
                    ''
                  )}) is reviewing the  details for approval  `
                });

                return usergrpinfo;
              } else {
                buttonAction(props.SubOpportunity, props.leadInfo);
              }
            }
          }}
        >
          {action.secondary?.label}
        </Button>
      );
    }
    //   }
    // }

    return value;
  };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Grid item>
          <Grid container direction="row" justify="space-between" spacing={4}>
            <Grid item>
              <Chip
                className={classes[getStatusColor(props.partnerDetails)]}
                label={_.get(props.partnerDetails, 'status', '')}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                spacing={6}
                alignItems="center"
                justify="flex-end"
              >
                {props.partnerDetails?.PartnerDetails?.Onboarding_Status === "SUSPENDED" || props.partnerDetails?.PartnerDetails?.Onboarding_Status === "CLOSED"  ? (''):(
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {                                     
                    history.push({
                      pathname: '/digital-prm-web-ui/hierarchy',
                      state: {
                        partnerId: props?.agentData?.partners?.userType === "dealer" ? props?.agentData?.partners?.id : props.columns.id
                      }
                    });
                    dispatch(Modals.close('leadView')); 
                  }}
                >
                  <Trans id="Manage Hierarchy"></Trans>
                </Button>)}
                {/* {mainActions(props.SubOpportunity || props.values)
                  .secondary && (
                  <Grid item>
                    {
                      mainActions(props.SubOpportunity || props.values)
                        .secondary
                    }
                  </Grid>
                )}
                {mainActions(props.SubOpportunity || props.values).primary && (
                  <Grid item>
                    {mainActions(props.SubOpportunity || props.values).primary}
                  </Grid>
                )} */}
                <Grid item>
                  <MenuIcon
                    // authpermisson={props.authState.user}
                    action={handleStatusUpdate}
                    status={props.partnerDetails?.status}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="h6">
            Partner ID:{' '}
            {_.get(props.columns, 'TenantId', '')
              ? _.get(props.columns, 'TenantId', '')
              : _.get(props.columns, 'id', '')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2" className={classes.title}>
            {_.get(props.columns, 'partnerName', '')
              ? _.get(props.columns, 'partnerName', '')
              : _.get(props.columns, 'tenantName', '')}
          </Typography>
        </Grid>

        <Grid item>
          <StepProgressBar
            // value={props?.values}
            // //  steps={props.steps}
            // status={props.SubOpportunity}
            activeStep={1}
            // history={props.SubOpportunity || props.values}
            // Status={props?.SubOpportunity?.status}
            // oppLevelSla={props?.oppLevelSla}
            // leadLevelSla={props?.leadLevelSla}
          />
        </Grid>

        {/* <Box mt={2} mb={2}>
          <Grid item>
            {/* <TextField
              placeholder="Add a comment..."
              variant="outlined"
              name="comment"
              fullWidth
              // onChange={handleComment}
              className={classes.textarea}
              type="text"
              name="textMsg"
              value={textMsg}
              onKeyDown={keyPress}
              onChange={(e) => handleChange(e.target.value)}
            /> 
          </Grid>
        </Box> */}

        {/* {props.leadsState?.comment?.map((item, i) => ( */}
        {/* {arrayview &&
          [...arrayview]?.reverse().map((item, i) => ( */}
        {noteList &&
          [...noteList]?.reverse().map((item, i) => (
            <Grid item>
              {i === 0 ? (
                <Grid container direction="row" spacing={4}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {dayjs(item.date).format('D MMMM, YYYY h:mm A')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="body1">
                          {item.text || ''}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">{item.author}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Collapse in={optionalSectionExpanded.value} timeout="auto">
                  <Grid container direction="row" spacing={4}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        {dayjs(item.date).format('D MMMM, YYYY h:mm A')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <Typography variant="body1">
                            {item.text || ''}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">
                            {item.author || ''}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Collapse>
              )}
            </Grid>
          ))}
        <Grid
          item
          onClick={optionalSectionExpanded.toggle}
          style={{ fontSize: '14px', color: '#4933D3' }}
        >
          {/* {noteList.length > 1 ?
            " View " : ""} */}
          {noteList.length > 1
            ? optionalSectionExpanded.value
              ? `View Less`
              : `View More`
            : ''}
        </Grid>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  textarea: {
    width: '100%',
    padding: '5px',
    '& input': {
      backgroundColor: '#e2e2e2'
    }
  },
  bg: {
    background: 'red !important'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  }
}));
export default connect(
  (state) => ({
    leadsState: state.leads,
    authState: state.auth
  }),
  {
    approveManualFeasibility: LeadController.approveManualFeasibility,
    ManualFeasibilityFailed: LeadController.ManualFeasibilityFailed,
    openModal: ModalsStore.open,
    commentSection: LeadController.commentSection,
    startonboarding: LeadController.startonboarding,
    shareAttachment: LeadController.shareAttachment
  }
)(LeadInformation);
