import React from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Stepper } from 'lib/components';

import Tick from '../../Assets/Icons/opportunity_won.svg';
import PrintIcon from '@material-ui/icons/Print';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main
  },
  paper: {
    height: '566px',
    width: '545px',
    marginTop: '80px',
    marginLeft: '368px'
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
const PaymentConfirmation = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Navbar /> */}
      <Box
        py={6}
        px={10}
        style={{
          maxHeight: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: '140px'
        }}
      >
        <Grid container direction="column">
          <Grid>
            <Stepper activeStep={4} />
          </Grid>
          <Grid container direction="row">
            <Paper className={classes.paper}>
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
                  <Typography variant="h2">Success</Typography>
                </Grid>
                <Grid item style={{ marginTop: '40px', marginBottom: '30px' }}>
                  <Typography variant="label1">
                    Registration successfully for Coca-Cola Karnataka
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
                    style={{ marginLeft: '50px' }}
                    spacing={4}
                  >
                    <Grid
                      item
                      xs
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      <Typography>REQUEST ID</Typography>
                    </Grid>
                    <Grid
                      item
                      xs
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Typography>Request Date</Typography>
                    </Grid>
                    <Grid
                      item
                      xs
                      direction="column"
                      align="left"
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Typography>Total Price Paid</Typography>
                    </Grid>
                    <Grid
                      item
                      xs
                      direction="column"
                      align="left"
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Typography>Pending for</Typography>
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
                    <Grid item container display="flex" justify="center">
                      <Typography>REQ12345EFJ</Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      display="flex"
                      justify="center"
                    >
                      <Typography>25 Mar, 2020</Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="flex-end"
                      justify="center"
                    >
                      <Typography>GHS 2300.00</Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="flex-end"
                      justify="center"
                    >
                      <Typography>Activation</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid>
                <PrintIcon color="primary" />
              </Grid>
              <Button >
                  <Typography color="primary">Receipt</Typography>
            </Button> 
            </Grid> */}

              <Grid container direction="row">
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '30px'
                  }}
                >
                  <Grid item>
                    <PrintIcon color="primary" />
                  </Grid>
                  <Typography item color="primary">
                    Receipt
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={6}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-center',
                  marginTop: '50px',
                  marginLeft: '90px'
                }}
              >
                <Grid item>
                  <Button variant="outlined" color="primary" disableElevation>
                    Create new Partner
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" disableElevation>
                    Partner Dashboard
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Grid style={{ marginTop: '400px', marginLeft: '10px' }}>
              <Button variant="contained" color="primary" disableElevation>
                Click here to see DCM Configuration
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PaymentConfirmation;
