import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Grid, Typography } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RevokeWarning({
  open,
  handleSubmit,
  setOpen,
  partnerData
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ overflow: 'hidden' }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'You want to revoke this partner'}
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
                      {partnerData?.PrimaryContactDetails?.EMAIL_ID}
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
                      {partnerData?.PrimaryContactDetails?.MOBILE_NUMBER}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
