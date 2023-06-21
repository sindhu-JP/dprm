import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Chip,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core';
import _ from 'lodash';

import { connect } from 'react-redux';
import ModalsStore from 'Store/Modals';
import Statuses from 'lib/constants/statuses';

import { ReactComponent as Customersigment } from 'Assets/Icons/Customersigment.svg';
import CloseIcon from '@material-ui/icons/Close';
import LeadAPI from 'Http/api/leads';
import $ from 'jquery';
import { ReactComponent as Lead } from 'Assets/Icons/lead.svg';

import { uniq } from 'lodash';
import { ReactComponent as VIP } from 'Assets/Icons/VIP.svg';
import AlertActions from 'Store/Alert';
import { Alert } from 'Components';
import { useStateful } from 'react-hanger';
import LeadController from 'Controllers/Lead';
import { Trans } from '@lingui/react';

const Heading = ({
  existingOpp,
  openModal,
  user,
  onClose,
  existingOpenModel,
  opportunityStatus,
  checklob,
  createLead,
  issubmitting,
  leadsState,
  alertState,
  closeAlert,
  Alertopen
}) => {
  const classes = useStyles();
  const leadId = useStateful('');
  const [serviceofLobs, setserviceofLobs] = React.useState('');
  const customerData = useStateful({});
  const Subscription = useStateful({});
  const getLeadId = async () => {
    const id = await LeadAPI.nextId().catch((err) => {});
    leadId.setValue(id);
  };

  const addOpportunity = () => {
    const leadobj = Object.assign({}, existingOpp);
    leadobj.lob = checklob;
    openModal({
      id: 'opportunityCreation',
      context: {
        lead: leadobj,
        user: user,
        NewOpp: false,
        user: user,
        // lobs:checklob,

        OppData: _.get(existingOpp, 'opportunities[0]', [])
      }
    });
  };

  const getStatusColor = (lead) => {
    return Statuses.ExsLeadStatus[lead?.status].color || 'orange';
  };

  const getcustomerdata = async (id) => {
    const res = await LeadAPI.getrelatedPaty(id);
    const Subscriptiondata = await LeadAPI.getSubscriptiondata(id);
    Subscription.setValue(Subscriptiondata);
    customerData.setValue(res);
  };

  React.useEffect(() => {
    var textNode = $('svg');
    textNode = textNode.find('.changeText');
    textNode = textNode.children();
    textNode.text(`Partner`);

    if (existingOpp) {
      let temp = [];
      let d = existingOpp?.opportunities?.map((lobitem) => {
        if (lobitem) {
          let lobstring = lobitem.lob.split(',');
          temp.push(lobstring);
        }
      });

      const removeDuplicate = uniq(temp);
      setserviceofLobs(removeDuplicate);

      let data = existingOpp?.relatedParty?.map((item) => {
        if (item.role === 'Customer') {
          getcustomerdata(item.id);
        }
      });
    }

    if (existingOpp?.relatedParty) {
      getLeadId();
    }
  }, [existingOpp]);

  const CreateLead = () => {
    // if (existingOpp.status === 'active') {
    let payload = {
      id: leadId.value,
      companyDetails: existingOpp.companyDetails,
      companyAddress: existingOpp.companyAddress,
      primaryContactDetails: existingOpp.primaryContactDetails,
      lob: existingOpp.lob,
      relatedParty: existingOpp.relatedParty
    };

    createLead({
      id: leadId.value,
      user: user,
      data: { ...payload },
      status: 'ONBOARDED'
    });
    // } else {
    //   Alertopen({
    //     type: 'error',
    //     message: 'please select active customer',
    //   })
    // }
  };

  return (
    <>
      <Grid container direction="row" justify="space-between" xs={12}>
        {opportunityStatus === 'DUPLICATE_CUSTOMER_NEW_OPPORTUNITY' ||
        opportunityStatus === 'DUPLICATE_CUSTOMER _EXISTING _OPPORTUNITY' ? (
          <>
            <Customersigment className={classes.tag}>Partner</Customersigment>
          </>
        ) : (
          <Lead className={classes.tag}>
            <text>lead</text>
          </Lead>
        )}

        <Grid item>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm container spacing={1} className={classes.paper}>
          <Grid item xs container direction="column">
            <Grid item xs>
              {opportunityStatus === 'DUPLICATE_CUSTOMER_NEW_OPPORTUNITY' ||
              opportunityStatus ===
                'DUPLICATE_CUSTOMER _EXISTING _OPPORTUNITY' ? (
                <>
                  <Grid item xs={12}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Grid container direction="row" spacing={2}>
                          <Grid item>
                            <Typography variant="h4">
                              {existingOpp.companyDetails.companyName}{' '}
                            </Typography>
                          </Grid>
                          <Grid item>
                            {existingOpp.status === 'initialized' ? (
                              <Chip
                                className={classes.red}
                                // label={_.get(props?.SubOpportunity, "status", "")}
                                label={existingOpp.status}
                                size={'small'}
                              />
                            ) : (
                              <Chip
                                className={classes.green}
                                // label={_.get(props?.SubOpportunity, "status", "")}
                                label={existingOpp.status}
                                size={'small'}
                              />
                            )}
                          </Grid>
                          <Grid item>
                            <Typography variant="h6">|</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="h6">
                              {_.get(
                                customerData.value,
                                'customerCategory',
                                ''
                              )}{' '}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="h6">| </Typography>
                          </Grid>
                          <Grid item>
                            <Chip
                              className={classes.gray}
                              // label={_.get(props?.SubOpportunity, "status", "")}
                              label="Platinum"
                              size={'small'}
                            />
                          </Grid>
                          {_.get(
                            customerData.value,
                            'engagedParty.customFields.vip',
                            'false'
                          ) ? (
                            <>
                              <Grid item>
                                <Typography variant="h6">| </Typography>
                              </Grid>
                              <Grid item>
                                <VIP />
                              </Grid>
                              <Grid item>
                                <Typography variant="h6">VIP </Typography>
                              </Grid>
                            </>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Typography variant="h6">
                          Corporate ID:{' '}
                          {existingOpp.companyDetails?.registrationNumber} |
                          Sub-Profile:{' '}
                          {_.get(customerData.value, 'children.length', 0)} |
                          Account:{' '}
                          {_.get(customerData.value, 'account.length', 0)} |
                          Subscription: {_.get(Subscription.value, 'length', 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid item xs={10}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <Grid container direction="row" spacing={4}>
                        {/* <Grid item>
                          <Typography variant="h4">
                            {existingOpp.companyDetails.companyName }{' '}
                          </Typography>
                        </Grid> */}
                        <Grid item>
                          <Typography variant="h6">| </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">CORPORATE </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Typography variant="h6">
                        LeadID: {existingOpp.id} | ServiceOfIntrest :{' '}
                        {_.get(serviceofLobs, 'length', '0')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* <Grid item style={{paddingRight:'40px'}}>
						<Typography gutterBottom variant="subtitle1">Total Revenue</Typography>
						<Typography variant="body2" gutterBottom >GHS 2,87,000.00</Typography>
					</Grid> */}

          {existingOpp.relatedParty ? (
            <Grid item className={classes.paper}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={CreateLead}
                disabled={issubmitting}
              >
                {leadsState.loading.creating ? (
                  <CircularProgress size={25} style={{ color: 'green' }} />
                ) : (
                  'Manage Hierarchy'
                )}
              </Button>
            </Grid>
          ) : (
            <Grid item className={classes.paper}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={addOpportunity}
              >
                <Trans id="Manage Hierarchy"></Trans>
              </Button>
            </Grid>
          )}
        </Grid>
        <Alert
          open={alertState.open}
          onClose={closeAlert}
          message={alertState.message}
          type={alertState.type}
        />
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    background: 'white'
  },

  red: {
    backgroundColor: 'orange',
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  },
  gray: {
    backgroundColor: '#6368a4',
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  },

  tag: {
    position: 'relative',
    bottom: '1.3rem',
    right: '4rem'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  image: {
    width: 128,
    height: 128
  },

  grid1: {
    paddingRight: '40px'
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data,
    alertState: state.alert
  }),
  {
    // openModal: ModalsStore.open,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    openModal: ModalsStore.existingOpenModel,
    createLead: LeadController.NewLead
  }
)(Heading);
