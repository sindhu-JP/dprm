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
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withRouter } from 'react-router-dom';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
// import Utils from 'Factory/Utils';
// import { Navbar, Chicklet, Select, Table } from 'Components';
// import Tick from '../../Assets/Icons/Pending_confirmation.svg';
// import PrintIcon from '@material-ui/icons/Print';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useLocation } from 'react-router-dom';
import { history } from 'Store';
import NavbarRevoke from './NavbarRevoke';
import StepperRevoke from './StepperRevoke';
import Footer360 from 'Components/Footer/Footer360';

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
const RevokeApproval = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [copyAlert, setCopyAlert] = useState(false);
  const handleBackOfficeRoute = () => {
    history.push('/digital-prm-web-ui/BackOffice');
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
  };

  return (
    <div className={classes.root}>
      <NavbarRevoke />
      <div className={classes.contentBox}>
        <StepperRevoke
          partnerType={
            props?.location?.details?.Values?.partner?.PartnerDetails
              ?.Partner_ID
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
                    <CheckCircleRoundedIcon
                      fontSize="large"
                      style={{
                        color: '#59cf59',
                        height: '80px',
                        width: '80px'
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h2" style={{ color: '#59cf59' }}>
                      Success !
                    </Typography>
                  </Grid>
                  {/* <Grid item>
                  <Typography variant="h2" style={{ color: '#FFA369' }}>
                    {'Approval Pending'}
                  </Typography>
                </Grid> */}

                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle}
                      align="center"
                    >
                      {'Suspended Partner Revoked Sucessfully'}
                    </Typography>
                    {/* <Typography
                    variant="subtitle2"
                    className={classes.subtitle}
                    align="center"
                  >
                    {'Approval Pending'}
                  </Typography> */}
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
                  {/* {Utils.Opcochanges() ? (
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
                )} */}
                  <Grid item>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Name</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {props?.location?.details?.Values?.partner
                            ?.PartnerDetails?.PARTNER_NAME ||
                            props?.location?.details?.Values?.partner
                              ?.TenantDetails?.TENANT_NAME}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        {props?.location?.details?.Values?.partner
                          ?.PartnerDetails ? (
                          <Typography variant="subtitle2">
                            Partner ID
                          </Typography>
                        ) : (
                          <Typography variant="subtitle2">Tenant ID</Typography>
                        )}
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {props?.location?.details?.Values?.partner
                            ?.PartnerDetails?.Partner_ID ||
                            props?.location?.details?.Values?.partner
                              ?.TenantDetails?.TENANT_ID}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Reg No</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {props?.location?.details?.Values?.partner
                            ?.PartnerDetails?.PARTNER_REGISTRATION_NUMBER ||
                            props?.location?.details?.Values?.partner
                              ?.TenantDetails?.COMPANY_REGISTRATION_NUMBER}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Email</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {
                            props?.location?.details?.Values?.partner
                              ?.PrimaryContactDetails?.EMAIL_ID
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2">Mobile no</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2">:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2">
                          {' '}
                          {
                            props?.location?.details?.Values?.partner
                              ?.PrimaryContactDetails?.MOBILE_NUMBER
                          }
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

export default withRouter(RevokeApproval);
