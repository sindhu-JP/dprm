import React, { useState } from 'react';
import _ from 'lodash';
import { connect, useSelector } from 'react-redux';
import { useBoolean } from 'react-hanger';
import Statuses from 'lib/constants/statuses';
import ModalsStore from 'Store/Modals';
import MenuIcon from '../LeadDetails/MenuIcon';
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

import STATUS from 'lib/constants/statuses';
import Leadfactory from 'Factory/Lead';
import hierarchyApi from 'Http/api/hierarchy';
import LeadsAPI from 'Http/api/leads';
const Workflow = (props) => {
  const classes = useStyles();
  const [textMsg, setTextMsg] = useState('');
  const optionalSectionExpanded = useBoolean(false);
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
      setTextMsg('');
      setNoteList(res.data.note);
    }
  };
  const handleStatusUpdate = async (action) => {
    props.onAction(action, {
      data: props.partnerDetails
      // subtabledata: props.SubOpportunity,
    });
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
    }
    return quoteApprovel;
  };
  const mainActions = (lead) => {
    let action = Statuses.detailsPageActions[lead.status];

    let obj = {};
    let value = {};

    if (action?.primary) {
      let temp = [];

      value.primary = (
        <Button
          variant="contained"
          color="primary"
          size="small"
          // disabled={action.primary.approvalRequiredForQuote}
          onClick={async () => {
            props.handleTaskAction(action.primary, props.contextDetails);
            // lead = {
            //   data: props.leadInfo
            // };
          }}
        >
          {action.primary.label}{' '}
        </Button>
      );
    }

    if (action?.secondary) {
      let temp = [];

      value.secondary = (
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={async () => {
            props.handleTaskAction(action.secondary, props.contextDetails);
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
                {mainActions(props.partnerDetails).secondary && (
                  <Grid item>
                    {mainActions(props.partnerDetails).secondary}
                  </Grid>
                )}
                {mainActions(props.partnerDetails).primary && (
                  <Grid item>{mainActions(props.partnerDetails).primary}</Grid>
                )}
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
            {props?.data?.PartnerDetails?.Partner_ID && (
              <>
                Partner ID:{' '}
                {_.get(props?.data?.PartnerDetails, 'Partner_ID', '')}
              </>
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2" className={classes.title}>
            {_.get(props?.data?.PartnerDetails, 'PARTNER_NAME', '')}
          </Typography>
        </Grid>

        <Grid item>
          <StepProgressBar
            // value={props?.values}
            // //  steps={props.steps}
            // status={props.SubOpportunity}
            activeStep={STATUS.ApprovalIndex[props.partnerDetails?.status]}
            // history={props.SubOpportunity || props.values}
            // Status={props?.SubOpportunity?.status}
            // oppLevelSla={props?.oppLevelSla}
            // leadLevelSla={props?.leadLevelSla}
          />
        </Grid>

        <Box mt={2} mb={2}>
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
            /> */}
          </Grid>
        </Box>

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
)(Workflow);
