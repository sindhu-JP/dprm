import React, { useState } from 'react';
import { Grid, Box, Button, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { history } from 'Store';
import { useDispatch } from 'react-redux';
import Utils from 'Factory/Utils';
import Modals from 'Store/Modals';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },

  error: {
    color: theme.palette.error.main
  },

  inner: {
    width: '40rem',
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },
  textarea: {
    width: '100%',
    minWidth: '100%',
    maxWidth: theme.spacing(92),
    maxHeight: theme.spacing(104),
    border: `none`,
    color: theme.palette.text.primary,
    fontFamily: 'inherit'
  },
  textColor: {
    fontWeight: 600,
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.black} !important`
        : ``
  },
  mtop50: {
    marginTop: '50px'
  },

  submitBtn: {
    background: '#2626C0',
    width: '93px',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    '&:hover': {
      background: '#2626C0'
    }
  },

  titleColor: {
    color: '#CECECE'
  }
}));

const SuccessModal = (
  context,
  user,
  onCancel,
  onSubmit,
  modalId,
  title,
  type,
  duration,
  loading,
  parent,
  error,
  modalContext,
  data,
  id
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [copyAlert, setCopyAlert] = useState(false);
  const handleGobackDashboard = () => {
    dispatch(Modals.close('SuccessModal'));
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
    history.push('/digital-prm-web-ui/BackOffice');
  };
  const refreshPage = () => {
    if (context?.successFrom) {
      dispatch(Modals.close('SuccessModal'));
    } else {
      window.location.reload();
    }
  };
  return (
    <Box className={classes.root}>
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

            <Grid item>
              <Typography
                variant="subtitle2"
                className={classes.textColor}
                align="center"
              >
                {context?.successFrom
                  ? context?.context
                  : context?.context?.Values?.AddContractFor
                      ?.ContractInformation?.PRODUCT_ID
                  ? 'Product Contract Modification done Successfully!!'
                  : 'Partner Contract Modification done Successfully!!'}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2" className={classes.textColor}>
                {context?.successFrom ? (
                  ''
                ) : context?.context?.Values?.AddContractFor
                    ?.ContractInformation?.PRODUCT_ID ? (
                  <>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2" className={classes.textColor}>Product ID</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2" className={classes.textColor}>:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2" className={classes.textColor}>
                          {
                            context?.context?.Values?.AddContractFor
                              ?.ContractInformation?.PRODUCT_ID
                          }
                          {/* <CopyToClipboard
                            onCopy={() => setCopyAlert(true)}
                            text={context?.data?.notification?.requestId}
                          >
                            <FileCopyIcon style={{ cursor: 'pointer', marginLeft:'10px'}} />
                          </CopyToClipboard> */}
                          {/* <>
                            {copyAlert === true ? (
                              <Typography variant="subtitle2" style={{color:'blue'}}>
                                {' '}
                                Copied
                              </Typography>
                            ) : (
                              ''
                            )}
                          </> */}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid item>
                      <CopyToClipboard
                        onCopy={() => setCopyAlert(true)}
                        text={
                          context?.context?.Values?.AddContractFor
                            ?.ContractInformation?.PRODUCT_ID
                        }
                      >
                        <FileCopyIcon />
                      </CopyToClipboard>
                    </Grid>
                    <Grid>
                      {copyAlert === true ? (
                        <Typography variant="subtitle2"> ID Copied</Typography>
                      ) : (
                        ''
                      )}
                    </Grid> */}

                    {/* Product ID:
                    {
                      context?.context?.Values?.AddContractFor
                        ?.ContractInformation?.PRODUCT_ID
                    } */}
                  </>
                ) : (
                  <>
                    <Grid container>
                      <Grid item style={{ width: '150px' }}>
                        <Typography variant="subtitle2" className={classes.textColor}>Partner ID</Typography>
                      </Grid>
                      <Grid item style={{ width: '50px' }}>
                        <Typography variant="subtitle2" className={classes.textColor}>:</Typography>
                      </Grid>
                      <Grid item style={{ width: '100px' }}>
                        <Typography variant="subtitle2" className={classes.textColor}>
                          {
                            context?.context?.Values?.AddContractFor
                              ?.ContractInformation?.Partner_ID
                          }
                          {/* <CopyToClipboard
                            onCopy={() => setCopyAlert(true)}
                            text={context?.data?.notification?.requestId}
                          >
                            <FileCopyIcon style={{ cursor: 'pointer', marginLeft:'10px' }} />
                          </CopyToClipboard> */}
                          {/* <>
                            {copyAlert === true ? (
                              <Typography variant="subtitle2" style={{color:'blue'}}>
                                {' '}
                                Copied
                              </Typography>
                            ) : (
                              ''
                            )}
                          </> */}
                        </Typography>
                      </Grid>
                      {/* <Grid item>
                        <CopyToClipboard
                          onCopy={() => setCopyAlert(true)}
                          text={
                            context?.context?.Values?.AddContractFor
                              ?.ContractInformation?.Partner_ID
                          }
                        >
                          <FileCopyIcon />
                        </CopyToClipboard>
                      </Grid>
                      <Grid>
                        {copyAlert === true ? (
                          <Typography variant="subtitle2">ID Copied</Typography>
                        ) : (
                          ''
                        )}
                      </Grid> */}
                    </Grid>
                    {/* Partner ID:
                    {
                      context?.context?.Values?.AddContractFor
                        ?.ContractInformation?.Partner_ID
                    } */}
                  </>
                )}
              </Typography>
            </Grid>
            {context?.context?.Values?.AddContractFor?.ContractInformation
              ?.PRODUCT_ID ? (
              ''
            ) : context?.successFrom ? (
              <>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    {context?.context === 'Tenant Added successfully' ||
                    context?.context ===
                      'Contract Sign off done Successfully!' ? (
                      ''
                    ) : (
                      <Grid item>
                        <Grid container>
                          <Grid item style={{ width: '150px' }}>
                            <Typography variant="subtitle2" className={classes.textColor}>
                              Request ID
                            </Typography>
                          </Grid>
                          <Grid item style={{ width: '50px' }}>
                            <Typography variant="subtitle2" className={classes.textColor}>:</Typography>
                          </Grid>
                          <Grid item style={{ width: '100px' }}>
                            <Typography variant="subtitle2" className={classes.textColor}>
                              {context?.data?.notification?.requestId}
                              <>
                                <CopyToClipboard
                                  onCopy={() => setCopyAlert(true)}
                                  text={context?.data?.notification?.requestId}
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
                              </>
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <CopyToClipboard
                              onCopy={() => setCopyAlert(true)}
                              text={context?.data?.notification?.requestId}
                            >
                              <FileCopyIcon />
                            </CopyToClipboard>
                          </Grid> */}
                          {/* <Grid>
                            {copyAlert === true ? (
                              <Typography variant="subtitle2">
                                {' '}
                                ID Copied
                              </Typography>
                            ) : (
                              ''
                            )}
                          </Grid> */}
                        </Grid>
                      </Grid>
                    )}
                    {context?.context === 'Tenant Added successfully' ||
                    context?.context ===
                      'Contract Sign off done Successfully!' ? (
                      ''
                    ) : (
                      <Grid item>
                        <Grid container>
                          <Grid item style={{ width: '150px' }}>
                            <Typography variant="subtitle2" className={classes.textColor}>
                              Request Date
                            </Typography>
                          </Grid>
                          <Grid item style={{ width: '50px' }}>
                            <Typography variant="subtitle2" className={classes.textColor}>:</Typography>
                          </Grid>
                          <Grid item style={{ width: '100px' }}>
                            <Typography variant="subtitle2" className={classes.textColor}>
                              {moment(
                                context?.context?.data?.Values?.lastModifiedDate
                              ).format('YYYY-MM-DD')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : (
              ''
            )}
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
            {Utils.Opcochanges() ? (
              <Grid item>
                {context?.context ===
                  'Product Created successfully, Approval pending' ||
                context?.context ===
                  'Contract created successfully, Approval pending' ||
                context?.context ===
                  'Partner contract created successfully, Approval pending' ||
                context.context ===
                  'Partner Profile Modification Request Submitted, Approval pending!!' ? (
                  <Button
                    // onClick={onCancel}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleGobackDashboard}
                  >
                    Go to BackOffice
                  </Button>
                ) : (
                  ' '
                )}
              </Grid>
            ) : (
              ''
            )}
            <Grid item>
              <Button
                // onClick={onCancel}
                size="large"
                variant="contained"
                color="primary"
                onClick={refreshPage}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuccessModal;
