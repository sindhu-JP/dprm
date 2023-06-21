// import React from 'react';
// import {
//     Button,
//     Paper,
//     Box,
//     Grid,
//     makeStyles,
//     Typography,
// } from '@material-ui/core';
// import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
// import _ from 'lodash';
// import _debounce from 'lodash/debounce';

// const useStyles = makeStyles((theme) => ({

//     root: {
//         backgroundColor: theme.palette.background.main
//     },
//     buttonWidth: {
//         width: "120px"
//     }
// }));

// const AgentSuccessModal = ({ handleProced }) => {
//     const classes = useStyles();
//     return (
//         <div>
//             <div className={classes.root}>
//                 <Box
//                     py={6}
//                     px={10}
//                     style={{
//                         maxHeight: '100vh',
//                         overflow: 'hidden'
//                     }}
//                 >
//                     <Grid container direction="column">
//                         <Grid
//                             container
//                             spacing={0}
//                             direction="column"
//                             alignItems="center"
//                             justify="center"
//                             style={{ minHeight: '70vh' }}
//                         >
//                             <Paper elevation={0}>
//                                 <Grid
//                                     container
//                                     direction="column"
//                                     alignItems="center"
//                                     spacing={4}
//                                 >
//                                     <Grid item>
//                                         <CheckCircleRoundedIcon
//                                             fontSize="large"
//                                             style={{ color: '#59cf59', height: "80px", width: "80px" }}
//                                         />
//                                     </Grid>
//                                     <Grid item>
//                                         <Typography variant="h2" style={{ color: '#59cf59' }} >
//                                             Success !
//                                         </Typography>
//                                     </Grid>
//                                     <Grid item>
//                                         <Typography variant="subtitle1">
//                                             Agent Created Successfully..!!
//                                         </Typography>
//                                     </Grid>

//                                 </Grid>

//                                 <Grid
//                                     container
//                                     spacing={6}
//                                     style={{
//                                         justifyContent: 'center',
//                                         marginTop: '50px'
//                                     }}
//                                 >
//                                     <Grid item>
//                                         <Button
//                                             variant="contained"
//                                             size="large"
//                                             color="primary"
//                                             className={classes.buttonWidth}
//                                             onClick={handleProced}
//                                         >
//                                             Click here to Agent portal
//                                         </Button>
//                                     </Grid>

//                                 </Grid>
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </div>
//         </div>
//     );
// };

// export default (AgentSuccessModal);

import React, { useState } from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Footer360 from 'Components/Footer/Footer360';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Header from 'lib/components/Stepper/Header';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Trans } from '@lingui/react';

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

const AgentSuccessModal = (props, context, fromSuccess) => {
  const { url, formType } = props.location.state;

  const classes = useStyles();
  const history = useHistory();
  const handleDashboardRoute = () => {
    history.push('/');
  };
  const handleBackOfficeRoute = () => {
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
    history.push('/digital-prm-web-ui/BackOffice');
  };
  const [copyAlert, setCopyAlert] = useState(false);
  const handleProceed = () => {
    history.push('/');
    window.open(url, '_blank');
  };

  console.log(props, formType, context, fromSuccess, 'propssssssssssssssss');
  console.log(formType, 'formtyoeee');

  switch (formType) {
    case 'agent':
      return (
        <div>
          <div className={classes.root}>
            <Header AgentPaymentModel={'Success'} />
            <Box
              // py={6/}
              // px={10/}
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
                      <Grid item>
                        <Typography variant="subtitle1">
                          Agent created successfully.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {/* Agent ID : {agentData?.Values?.agentId} ||{' '}
                      {agentData?.agentid} */}
                        </Typography>
                        {/* <Typography variant="subtitle2">
                      Request ID : REQ1234EFG
                    </Typography> */}
                        {/* <Typography variant="subtitle2">
                      Request date : 26, MAR 2022
                    </Typography> */}
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
                          size="large"
                          color="primary"
                          disableElevation
                          className={classes.buttonWidth}
                          onClick={handleDashboardRoute}
                        >
                          Go to DashBoard
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.buttonWidth}
                          disableElevation
                          onClick={handleProceed}
                        >
                          Go to Agent Portal
                        </Button>
                      </Grid>
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
    case 'reseller':
      return (
        <div>
          <div className={classes.root}>
            <Header AgentPaymentModel={'Success'} />
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
                      <Grid item>
                        <Typography variant="subtitle1">
                          <Trans id=" Agent created successfully, Approval pending."></Trans>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Grid container>
                              <Grid item style={{ width: '150px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  Agent ID
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
                                   {props.location.state.AgentID}
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
                                  Agent Name
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
                                  {props.location.state.PartnerName}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
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
                          {props.fromSuccess === true ||
                          props.fromSuccess === false ? (
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
                                    {props.location.state.TicketID}
                                    <CopyToClipboard
                                      onCopy={() => setCopyAlert(true)}
                                      text={props.location.state.TicketID}
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
                          {props.fromSuccess === true ||
                          props.fromSuccess === false ? (
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
                          ) : (
                            ''
                          )}
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
    case 'partner':
      return (
        <div>
          <div className={classes.root}>
            <Header AgentPaymentModel={'Success'} />
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
                      <Grid item>
                        <Typography variant="subtitle1">
                          <Trans id="Master Partner created successfully, Approval pending."></Trans>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="column" alignItems="center">
                          <Grid item>
                            <Grid container>
                              <Grid item style={{ width: '150px' }}>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textColor}
                                >
                                  Partner Name
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
                                  {props.location.state.PartnerName}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
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
                          {props.fromSuccess === true ||
                          props.fromSuccess === false ? (
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
                                    {props.location.state.TicketID}
                                    <CopyToClipboard
                                      onCopy={() => setCopyAlert(true)}
                                      text={props.location.state.TicketID}
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
                          {props.fromSuccess === true ||
                          props.fromSuccess === false ? (
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
                          ) : (
                            ''
                          )}
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

      
    default:
      return <div></div>;
  }
};

export default AgentSuccessModal;
