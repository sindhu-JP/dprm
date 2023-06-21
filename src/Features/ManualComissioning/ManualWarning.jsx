import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { Grid, makeStyles, Typography } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    // height: '90%',
    overflowY: 'auto'
  },
  alert: {
    '& .MuiTypography-h6': {
      color: 'red',
      fontSize: '16px'
    }
  },
  accept: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100px',
    padding: '0 20px',
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: '12px',

    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  reject: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100px',
    padding: '0 20px',
    fontSize: '12px'
  }
}));
export default function ManualWarning({
  open,
  handleSubmit,
  setOpen,
  partnerData
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ overflow: 'hidden' }}
        PaperProps={{
          style: {
            top: '0px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.alert}>
          {'You want to suspend this partner'}
        </DialogTitle>
        <DialogContent>
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
                    <Typography variant="subtitle2">Name</Typography>
                  </Grid>
                  <Grid item style={{ width: '50px' }}>
                    <Typography variant="subtitle2">:</Typography>
                  </Grid>
                  <Grid item style={{ width: '100px' }}>
                    <Typography variant="subtitle2">
                      {partnerData?.PartnerDetails?.PARTNER_NAME ||
                        partnerData?.TenantDetails?.TENANT_NAME}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item style={{ width: '150px' }}>
                    <Typography variant="subtitle2">Partner ID</Typography>
                  </Grid>
                  <Grid item style={{ width: '50px' }}>
                    <Typography variant="subtitle2">:</Typography>
                  </Grid>
                  <Grid item style={{ width: '100px' }}>
                    <Typography variant="subtitle2">
                      {partnerData?.PartnerDetails?.Partner_ID ||
                        partnerData?.TenantDetails?.TENANT_ID}
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
                      {partnerData?.PartnerDetails
                        ?.PARTNER_REGISTRATION_NUMBER ||
                        partnerData?.TenantDetails?.COMPANY_REGISTRATION_NUMBER}
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
                      {partnerData?.PrimaryContactDetails?.EMAIL_ID ||
                        partnerData?.TenantProfileCreation
                          ?.PrimaryContactDetails?.EMAIL_ID}
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
                      {partnerData?.PrimaryContactDetails?.MOBILE_NUMBER ||
                        partnerData?.TenantProfileCreation
                          ?.PrimaryContactDetails?.MOBILE_NUMBER}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.reject}
          >
            No
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className={classes.accept}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
