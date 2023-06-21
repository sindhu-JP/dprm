import React from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

import Tick from '../../Assets/Icons/opportunity_won.svg';

import { useHistory } from 'react-router-dom';
import Modal from 'Store/Modals';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { useStateful } from 'react-hanger';
const PaymentConfirmation = ({
  paymentdetails,
  id,
  getOverviewDetails,
  getPartneroverview,
  getTenantoverview
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const partnerOverview = useStateful({});
  const date = new Date();

  React.useEffect(() => {
    if (paymentdetails) {
      partnerOverview.setValue(paymentdetails.details);
    }
  }, []);

  const handleRouting = () => {
    if (
      paymentdetails?.id?.includes('MP') ||
      paymentdetails?.details?.PartnerProfileCreation?.PartnerDetails?.Partner_ID?.includes(
        'MP'
      )
    ) {
      getPartneroverview({
        url: `Partner_Profile/${_.get(paymentdetails, 'details._id', '')}/${
          paymentdetails?.id ||
          paymentdetails?.details?.PartnerProfileCreation?.PartnerDetails
            ?.Partner_ID
        }`
      });
    } else {
      getTenantoverview({
        url: `Tenant_Partner_Profile/${_.get(
          paymentdetails,
          'details._id',
          ''
        )}/${
          paymentdetails?.id ||
          paymentdetails?.details?.PartnerProfileCreation?.PartnerDetails
            ?.Partner_ID
        }`
      });
    }
  };
  return (
    <div className={classes.root}>
      {/* <Navbar /> */}
      <Box py={6} px={20}>
        <Grid container direction="column" justify="center">
          <Grid container direction="row" justify="center">
            <Paper className={classes.paper} elevation={0}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item style={{ marginTop: '40px' }}>
                  <img src={Tick}></img>
                </Grid>
                <Grid item>
                  <Typography variant="h2">Success</Typography>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={8}
                    style={{ marginTop: 20 }}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={4}
                      >
                        <Grid item>
                          <Typography variant="subtitle1">
                            {paymentdetails?.id?.includes('MP') ||
                            paymentdetails?.details?.PartnerProfileCreation?.PartnerDetails?.Partner_ID?.includes(
                              'MP'
                            )
                              ? 'PARTNER ID'
                              : 'TENANT ID'}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography variant="subtitle1">
                            ON BOARDED DATE
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item style={{ width: '20px' }}></Grid>

                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={4}
                      >
                        <Grid item>
                          <Typography variant="subtitle1">
                            {paymentdetails?.details?.TenantProfileCreation
                              ?.TenantDetails?.TENANT_ID ||
                              paymentdetails?.details?.PartnerProfileCreation
                                ?.PartnerDetails?.Partner_ID}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                            {moment(date).format('DD MMM YYYY')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    spacing={6}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '50px'
                    }}
                  >
                    <Grid item>
                      <Typography variant="subtitle1">
                        {paymentdetails?.id?.includes('MP') ||
                        paymentdetails?.details?.PartnerProfileCreation?.PartnerDetails?.Partner_ID?.includes(
                          'MP'
                        )
                          ? 'PARTNER ONBOARDED SUCCESSFULLY'
                          : 'TENANT ONBOARDED SUCCESSFULLY'}
                        {/* PARTNER ONBOARDED SUCCESSFULLY */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    spacing={6}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '50px'
                    }}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          dispatch(Modal.close('PaymentConformation'));
                          dispatch(Modal.close('contracts'));
                          dispatch(Modal.close('leadView'));
                          history.push('/');
                        }}
                        disableElevation
                      >
                        Partner Dashboard
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // dispatch(Modal.close('PaymentConformation'));
                          // dispatch(Modal.close('contracts'));
                          // history.push('/');
                          handleRouting();
                        }}
                        disableElevation
                      >
                        Partner 360 view
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main
  },
  paper: {
    height: '566px',
    width: '545px'
  },
  ticklogo: {
    marginTop: '46px',
    marginLeft: '212px',

    marginBottom: '460px',
    height: '60px',
    width: '60px'
  },
  outerColumn: {
    borderRight: '1px solid grey',
    borderBottom: '1px solid grey',
    borderLeft: '1px solid grey',
    height: 100
  },
  centerColumn: {
    borderBottom: '1px solid grey',
    height: 100
  }
}));
export default PaymentConfirmation;
