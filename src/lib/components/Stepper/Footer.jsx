import React from 'react';

import { Grid, makeStyles, Button, CircularProgress } from '@material-ui/core';

import { ArrowForward } from '@material-ui/icons';

import { connect } from 'react-redux';

import ModalsStore from 'Store/Modals';

const useStyles = makeStyles((theme) => ({
  button: {
    boxShadow: 'none',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      backgroundColor: theme.palette.success.light
    }
  },
  info: {
    marginLeft: '50px'
  }
}));
const Footer = ({
  onSave,
  modalState,
  closeModal,
  onClickSaveAndExit,
  openModal,
  info,
  addpayment,
  onMainAction,
  primaryText,
  secondaryText,
  disabled,
  isSubmitting,
  paymentbtn,
  onProceed,
  btndisabled,
  buttonType
}) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" alignItems="center" justify="space-between">
      <Grid item xs={6} className={classes.info}>
        {info}
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={4}>
          <Grid item>
            <Button
              size="large"
              variant="text"
              color="primary"
              type="submit"
              onClick={() => {
                // setModalOpen(true)

                onClickSaveAndExit(true);
              }}
              // disabled={disabled}
            >
              {/* {secondaryText} */}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              endIcon={!isSubmitting ? <ArrowForward /> : null}
              className={classes.button}
              type="submit"
              onClick={() => {
                //onProceed;
                // onClickSaveAndExit(false)
                // closeModal('IsSaveAndExit');
              }}
              disabled={isSubmitting || btndisabled}
            >
              {isSubmitting ? (
                <CircularProgress size={25} style={{ color: 'green' }} />
              ) : paymentbtn ? (
                paymentbtn
              ) : (
                primaryText
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Footer.defaultProps = {
  info: null,
  loading: false,
  primaryText: 'Proceed',
  secondaryText: 'Save & Exit',
  onSave: () => {},
  onNext: () => {}
};

Footer.propTypes = {};

export default connect(
  (state) => ({
    modalState: state.modals
  }),
  {
    closeModal: ModalsStore.close,
    openModal: ModalsStore.open
  }
)(Footer);
