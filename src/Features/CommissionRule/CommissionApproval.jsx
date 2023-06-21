import React, { useState } from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Utils from 'Factory/Utils';
import { withRouter } from 'react-router-dom';
import Tick from '../../Assets/Icons/Pending_confirmation.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NavbarSettlement from 'Features/SettlementRule/NavbarSettlement';
import StepperCommission from './StepperCommission';
import { useLocation } from 'react-router-dom';
import { history } from 'Store';
import Footer360 from 'Components/Footer/Footer360';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
    overflow: 'hidden'
  },
  root1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  },
  // paper: {
  //   // height: '466px',
  //   width: '500px'
  //   // marginTop: '80px',
  //   // marginLeft: '368px'
  // },
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
  },
  inner: {
    width: '40rem',
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4),
    alignItems: 'center'
  }
}));
const CommissionApproval = (props) => {
  const classes = useStyles();
  const location = useLocation();

  const handleBackOfficeRoute = () => {
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
    history.push('/digital-prm-web-ui/BackOffice');
  };
  // useEffect(() => {
  //   data = props.location.state;
  // }, [location]);
  const [copyAlert, setCopyAlert] = useState(false);

  return (
    <div className={classes.root}>
      {/* <Navbar /> */}
      <NavbarSettlement />
      <StepperCommission />
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
                <Grid item style={{ marginTop: '40px' }}>
                  <img src={Tick}></img>
                </Grid>
                <Grid item>
                  <Typography variant="h2" style={{ color: '#FFA369' }}>
                    {props.location?.details?.notification?.header ===
                    'Sent For Approval'
                      ? 'Approval Pending'
                      : ''}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    variant="subtitle2"
                    className={classes.subtitle}
                    align="center"
                  >
                    Commission Rule created successfully, Approval pending
                  </Typography>
                </Grid>
                {Utils.Opcochanges() ? (
                  <Grid item>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">REQUEST ID</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {props.location?.details?.Values?.ticketId}
                          <CopyToClipboard
                            onCopy={() => setCopyAlert(true)}
                            text={props.location?.details?.Values?.ticketId}
                          >
                            <FileCopyIcon
                              style={{ cursor: 'pointer', marginLeft: '10px' }}
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
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Grid container>
                        <Grid item style={{ width: '150px' }}>
                          <Typography variant="subtitle2">
                            Commission Name{' '}
                          </Typography>
                        </Grid>
                        <Grid item style={{ width: '50px' }}>
                          <Typography variant="subtitle2">:</Typography>
                        </Grid>
                        <Grid item style={{ width: '100px' }}>
                          <Typography variant="subtitle2">
                            {
                              props.location?.details?.Values
                                ?.commissionRuleName
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item style={{ width: '150px' }}>
                          <Typography variant="subtitle2">
                            Commission Code{' '}
                          </Typography>
                        </Grid>
                        <Grid item style={{ width: '50px' }}>
                          <Typography variant="subtitle2">:</Typography>
                        </Grid>
                        <Grid item style={{ width: '100px' }}>
                          <Typography variant="subtitle2">
                            {
                              props.location?.details?.Values
                                ?.commissionRuleCode
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item style={{ width: '150px' }}>
                          <Typography variant="subtitle2">Date</Typography>
                        </Grid>
                        <Grid item style={{ width: '50px' }}>
                          <Typography variant="subtitle2">:</Typography>
                        </Grid>
                        <Grid item style={{ width: '100px' }}>
                          <Typography
                            variant="subtitle2"
                            style={{ inlineSize: 'max-content' }}
                          >
                            {new Intl.DateTimeFormat('en-GB', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric'
                            }).format(new Date())}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item style={{ width: '150px' }}>
                          <Typography variant="subtitle2">Status</Typography>
                        </Grid>
                        <Grid item style={{ width: '50px' }}>
                          <Typography variant="subtitle2">:</Typography>
                        </Grid>
                        <Grid item style={{ width: '100px' }}>
                          <Typography variant="subtitle2">
                            <Typography
                              variant="subtitle2"
                              style={{ inlineSize: 'max-content' }}
                            >
                              Approval pending
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>
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
                justify="center"
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
                {Utils.Opcochanges() ? (
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
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Grid item xs={12}>
        <Footer360 />
      </Grid>
    </div>
  );
};

export default withRouter(CommissionApproval);
