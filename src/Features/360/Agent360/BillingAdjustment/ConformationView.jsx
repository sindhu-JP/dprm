import React from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import Tick from 'Assets/Icons/Pending_confirmation.svg';

import { useLocation } from 'react-router-dom';
import { history } from 'Store';
import { useDispatch } from 'react-redux';
import Modal from 'Store/Modals';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main
  },
  paper: {
    // height: '466px',
    // width: '445px',
    // marginTop: '80px',
    // marginLeft: '368px'
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
const ConformationView = ({ context }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log("contextbilling", context)
  return (
    <div className={classes.root}>
      <Box
        py={6}
        px={10}
        style={{
          maxHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        <Grid container direction="column">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '70vh' }}
          >
            <Paper className={classes.paper} elevation={0}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item style={{ marginTop: '40px' }}>
                  <img src={Tick}></img>
                </Grid>
                <Grid item>
                  <Typography variant="h2" style={{ color: '#FFA369' }}>
                    'Approval Pending'
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <Typography variant="label1">
                    Request is sent to account manager for approval.
                  </Typography>
                </Grid>

                <Grid
                  container
                  style={{ alignItems: 'center', width: '400px' }}
                >
                  <Grid
                    container
                    direction="column"
                    item
                    xs={6}
                    style={{
                      marginLeft: '50px',
                      marginBottom: '5px'
                    }}
                    spacing={4}
                  >
                    <Grid
                      item
                      xs
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      <Typography>Request ID</Typography>
                    </Grid>

                    <Grid
                      item
                      xs
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      <Typography>Invoice ID</Typography>
                    </Grid>

                    <Grid
                      item
                      xs
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Typography>Adjustment Amount</Typography>
                    </Grid>

                    <Grid
                      item
                      xs
                      direction="column"
                      align="left"
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Typography> status</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    item
                    xs={4}
                    align="center"
                    spacing={4}
                  >
                    <Grid
                      item
                      container
                      display="flex"
                      justify="flex-start"
                    ></Grid>
                    <Grid item container display="flex" justify="flex-start">
                      <Typography>
                        {_.get(context, 'Values.ticketId', '')}
                      </Typography>
                    </Grid>
                    <Grid item container display="flex" justify="flex-start">
                      <Typography>
                        {_.get(context, 'Values.invoiceId', '')}
                      </Typography>
                    </Grid>
                    <Grid item container display="flex" justify="flex-start">
                      <Typography>
                        KWD {_.get(context, 'Values.adjustmentAmount', '')}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      display="flex"
                      justify="flex-start"
                      style={{ paddingRight: '32px' }}
                    >
                      <Typography>
                        <Typography>Pending for approval</Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

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
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={() => dispatch(Modal.close('BillingConformation'))}
                  >
                    Partner 360 view
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      history.push('/'),
                        dispatch(Modal.close('BillingConformation'));
                    }}
                  >
                    Partner Dashboard
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default withRouter(ConformationView);
