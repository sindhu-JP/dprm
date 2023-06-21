

import React, { useState } from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

import Footer360 from 'Components/Footer/Footer360';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Header from 'lib/components/Stepper/Header';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Trans } from '@lingui/react';
import Tick from '../../Assets/Icons/Pending_confirmation.svg';
import BulkStepper from './BulkStepper';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main
  },
  textColor: {
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.black} !important`
        : ``
  },
  buttonWidth: {}
}));

const BulkSuccess = (props, context, fromSuccess) => {

    console.log(props.location?.details, "properxxxxxxx")
  const classes = useStyles();
  const history = useHistory();
  const handleDashboardRoute = () => {
    localStorage.setItem('selectedSidebarTab', 'Home');
    history.push('/');
  };
  const handleBackOfficeRoute = () => {
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
    history.push('/digital-prm-web-ui/BackOffice');
  };
  const [copyAlert, setCopyAlert] = useState(false);



      return (
        <div>
        <div className={classes.root}>
          <Header AgentPaymentModel={'Success'} />

          <BulkStepper />
          <Box
            style={{
              maxHeight: '100vh',
              overflow: 'hidden',
              padding: '5rem 2.5rem'
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
                <Paper elevation={0}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                    <Grid item>
                    <img src={Tick}></img>
                  </Grid>
                    </Grid>
                    <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle}
                      align="center"
                    >
                      {'Approval Pending'}
                    </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        <Trans id=" Manual Commissioning  Request Submit successfully, Approval pending."></Trans>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
            
              
                        {/* { !(props.fromSuccess)&&<Grid item>
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
                              <Typography variant="subtitle2">
                                {props.location.state.TicketID}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>} */}
                   
                          <Grid item>
                            <Grid container>
                              <Grid item style={{ width: '150px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  Request ID
                                </Typography>
                              </Grid>
                              <Grid item style={{ width: '50px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item style={{ width: '100px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                 {props.location?.details?.notification?.requestId}
                                  <CopyToClipboard
                                    onCopy={() => setCopyAlert(true)}
                                    text={"TOQOES"}
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
                        
             
                          <Grid item>
                            <Grid container>
                              <Grid item style={{ width: '150px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  Request Date
                                </Typography>
                              </Grid>
                              <Grid item style={{ width: '50px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item style={{ width: '100px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  {moment(
                                    context?.context?.data?.Values
                                      ?.lastModifiedDate
                                  ).format('YYYY-MM-DD')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container>
                              <Grid item style={{ width: '150px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  Status
                                </Typography>
                              </Grid>
                              <Grid item style={{ width: '50px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item style={{ width: '100px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  {props.location?.details?.notification?.status}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        
                      </Grid>
                    </Grid>
                    {/* <Grid
                      item
                      container
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="subtitle2">
                          Partner Name
                        </Typography>
                      </Grid>
                      <Grid item className={classes.alignmentWidth}>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>:</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {props.location.state.PartnerName}
                        </Typography>
                      </Grid>

                      
                    </Grid>

                    <Grid
                      item
                      container
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <Grid item className={classes.alignmentWidth}>
                        <Grid
                          container
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography variant="subtitle2">
                              Request ID
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={classes.alignmentWidth}>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>:</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={classes.alignmentWidth}>
                        <Typography variant="subtitle2">
                          {props.location.state.TicketID}
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Grid>

                  <Grid
                    container
                    spacing={6}
                    style={{
                      marginTop: '30px'
                    }}
                    justify="space-around"
                    alignItems="center"
                  >
                    {props.fromSuccess === false && (
                      <Grid item>
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          disableElevation
                          className={classes.buttonWidth}
                          onClick={handleDashboardRoute}
                        >
                          Partner Dashboard
                        </Button>
                      </Grid>

                      
                    )}
                  
                  {props.fromSuccess === false && (
                        <Grid item>
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            disableElevation
                            className={classes.buttonWidth}
                            onClick={handleBackOfficeRoute}
                          >
                            Go to BackOffice
                          </Button>
                        </Grid>
                      )}
                    {/* <Grid item>
                     <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        disableElevation
                        className={classes.buttonWidth}
                        onClick={handleBackOfficeRoute}
                      >
                        Go to BackOffice
                      </Button>
                    </Grid> */}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Footer360 />
          </Grid>
        </div>
      </div>
      );
   
};

export default BulkSuccess;
