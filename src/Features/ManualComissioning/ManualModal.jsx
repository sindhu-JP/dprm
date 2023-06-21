import React, { useState } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Paper,
  Button
} from '@material-ui/core';
// import { Stepper } from 'lib/components';
// import { Card } from 'lib/components';
import Utils from 'Factory/Utils';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
// import { Navbar, Chicklet, Select, Table } from 'Components';
import Tick from '../../Assets/Icons/Pending_confirmation.svg';
// import PrintIcon from '@material-ui/icons/Print';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NavbarManual from './NavbarManual';

import { useLocation } from 'react-router-dom';
import { history } from 'Store';
import Footer360 from 'Components/Footer/Footer360';
import StepperManual from './StepperManual';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
    overflow: 'hidden'
  },
  paper: {
    // width: '500px'
    marginTop: '30px',
    marginBottom: '35px'
  },
  ticklogo: {
    marginTop: '46px',
    marginLeft: '212px',

    marginBottom: '460px',
    height: '60px',
    width: '60px'
  },
  root1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    // height: '100vh',
    overflow: 'hidden'
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
  },
  inner: {
    width: '40rem',
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4),
    alignItems: 'center'
  },
  contentBox: {
    width: '110vw',
    height: '81vh',
    overflowY: 'scroll',
    scrollBehavior: 'smooth'
  }
}));
const ManualModal = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [copyAlert, setCopyAlert] = useState(false);
  const handleBackOfficeRoute = () => {
    history.push('/digital-prm-web-ui/BackOffice');
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
  };
  console.log(location, 'locationn', props);
  return (
    <div className={classes.root}>
      <NavbarManual />
      <div className={classes.contentBox}>
        <StepperManual
          partnerType={
            props?.location?.details?.Values?.partnerId
          }
        />

        <Box className={classes.root1}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={6}
              className={classes.inner}
            >
              <Grid item>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  spacing={3}
                >
                  <Grid item>
                    <img src={Tick}></img>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2" style={{ color: '#FFA369' }}>
                      {'Approval Pending'}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle}
                      align="center"
                    >
                      Manual Commission Request Submitted Successfully
                    </Typography>
          
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  spacing={6}
                >
                  <Grid item>
                  <Grid container>
                      <Grid item style={{ width: '150px' }}>                      
                          <Typography variant="subtitle2">
                            Partner ID
                          </Typography>                     
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {props?.location?.details?.Values?.partnerId}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Partner Name</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {props?.location?.details?.Values?.partnerName}
                        </Typography>
                      </Grid>
                    </Grid> 
                    {Utils.Opcochanges() ? (
                      <Grid item>
                        <Grid container>
                          <Grid item style={{ width: '150px' }}>
                            <Typography variant="subtitle2">
                              Request ID
                            </Typography>
                          </Grid>
                          <Grid item style={{ width: '50px' }}>
                            <Typography variant="subtitle2">:</Typography>
                          </Grid>
                          <Grid item style={{ width: '100px' }}>
                            <Typography
                              variant="subtitle2"
                              style={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              {props.location?.details?.Values?.ticketId}
                              <CopyToClipboard
                                onCopy={() => setCopyAlert(true)}
                                text={props.location?.details?.Values?.ticketId}
                              >
                                <FileCopyIcon
                                  style={{
                                    cursor: 'pointer',
                                    marginLeft: '10px'
                                  }}
                                />
                              </CopyToClipboard>
                              <>
                                {copyAlert === true ? (
                                  <Typography
                                    variant="subtitle2"
                                    style={{ color: 'blue' }}
                                  >
                                    {' '}
                                    Copied
                                  </Typography>
                                ) : (
                                  ''
                                )}
                              </>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      ''
                    )}                                    
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Request Date</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {moment(props?.location?.details?.Values?.date).format('YYYY-MM-DD')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Status</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                        Pending
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-around"
                  spacing={4}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => history.push('/')}
                    >
                      Partner Dashboard
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={handleBackOfficeRoute}
                    >
                      Go to BackOffice
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </div>
      <Grid item xs={12}>
        <Footer360 />
      </Grid>
    </div>
  );
};

export default withRouter(ManualModal);
