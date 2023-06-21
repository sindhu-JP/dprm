import React, { useState } from 'react';
import { Grid, Box, Button, Typography, makeStyles } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SuccessIcon from '../../../public/icons/successIcon.svg';
import Modals from 'Store/Modals';
import { history } from 'Store';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  label: {
    fontWeight: theme.palette.fontWeightBold
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },
  dot: {
    backgroundColor: '#FFA369',
    borderRadius: '50%',
    width: '55px',
    height: '55px',
    display: 'inline-block'
  },
  mtop70: {
    marginTop: '55px'
  }
}));
const CommissionModal = ({ details, onSubmit, onCancel, resData }) => {
  const classes = useStyles();
  // const activeform = customhook.customUseDispatch();
  const [copyAlert, setCopyAlert] = useState(false);
  const dispatch = useDispatch();
  const handleRedirect = () => {
    dispatch(Modals.close('CommissionModal'));

    history.push('/');
  };
  const handleBackOfficeRoute = () => {
    dispatch(Modals.close('CommissionModal'));
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
    history.push('/digital-prm-web-ui/BackOffice');
  };
  return (
    <Box className={classes.root} px={5}>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.inner}
        alignItems="center"
      >
        <Grid item>
          <img src={SuccessIcon} alt="success"></img>
        </Grid>
        <Grid item>
          <Typography
            variant="h2"
            style={{ color: '#0BD535', fontWeight: 600 }}
          >
            Commission Rules Updated Successfully.
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item style={{ width: '150px' }}>
              <Typography variant="subtitle2">Request ID</Typography>
            </Grid>
            <Grid item style={{ width: '50px' }}>
              <Typography variant="subtitle2">:</Typography>
            </Grid>
            <Grid item style={{ width: '100px' }}>
              <Typography variant="subtitle2">
                00000000
                <CopyToClipboard
                  onCopy={() => setCopyAlert(true)}
                  text={'000000'}
                >
                  <FileCopyIcon
                    style={{
                      cursor: 'pointer',
                      marginLeft: '10px',
                      fontSize: '15px'
                    }}
                  />
                </CopyToClipboard>
                <>
                  {copyAlert === true ? (
                    <Typography variant="subtitle2" style={{ color: 'blue' }}>
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
          <Grid container>
            <Grid item style={{ width: '150px' }}>
              <Typography variant="subtitle2">Request Date</Typography>
            </Grid>
            <Grid item style={{ width: '50px' }}>
              <Typography variant="subtitle2">:</Typography>
            </Grid>
            <Grid item style={{ width: '100px' }}>
              12.10.1995
              {/* <Grid item style={{ width: '100px' }}>
                            <Typography variant="subtitle2">
                              {moment(
                                context?.context?.data?.Values?.lastModifiedDate
                              ).format('YYYY-MM-DD')}
                            </Typography>
                          </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
            direction="row"
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid item>
              {/* <Button
                  onClick={onCancel}
                  size="large"
                  variant="text"
                  color="secondary"
                >
                  Cancel
                </Button>  */}
            </Grid>
            <Grid item>
              <Button
                onClick={handleRedirect}
                variant="contained"
                color="primary"
                size="large"
              >
                Go to Dashboard
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleBackOfficeRoute}
                variant="contained"
                color="primary"
                size="large"
              >
                Go to BackOffice
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommissionModal;
