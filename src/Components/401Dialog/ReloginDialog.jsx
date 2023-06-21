import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';
import AuthController from 'Controllers/Auth';
import config from 'config';
import { Trans } from '@lingui/react';
import { Typography } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReloginDialog({ open }) {
  const [loader, setLoader] = React.useState(false);
  const handleClose = () => {
    setLoader(true);
    AuthController.logout(config.sso);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">
            {' '}
            <Trans id="Session Expired"> </Trans>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Trans id="Session has expired kindly login again .."></Trans>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{ width: 120 }}
            loader={loader}
          >
            <Trans id="Login"></Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
