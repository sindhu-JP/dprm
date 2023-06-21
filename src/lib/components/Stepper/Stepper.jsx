import React from 'react';

import { Box, makeStyles } from '@material-ui/core';

import Header from './Header';
import Footer from './Footer';
import StepIndicator from './StepIndicator';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.main
  },
  header: {},
  body: {
    maxHeight: `calc(100vh - ${theme.spacing(10)} - ${theme.spacing(30)})`,
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    backgroundColor: theme.palette.background.main,
    paddingTop: '0.1rem',
    paddingBottom: '2.5rem'

  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: '1',
    paddingTop: '1.0rem',
    paddingBottom: '2.1rem'
  },
  body1: {
    paddingTop: '1.0rem',
    paddingBottom: '1.1rem'
  }
}));
const Stepper = ({
  body,
  id,
  title,
  onDrop,
  status,
  onClose,
  activeStep,
  footerInfo,
  onFaqRequest,
  isSubmitting,
  onMainAction,
  completedSteps,
  onClickSaveAndExit,
  Steppersdata,
  footer,
  onClickProceed,
  historypush,
  paymentbtn,
  btndisabled,
  buttonType,
  partnerCompleted,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header
          id={id}
          title={title}
          status={status}
          onDrop={onDrop}
          onFaqRequest={onFaqRequest}
          onClose={onClose}
          paymentbtn={paymentbtn}
          historypush={historypush}
        />
      </Box>
      <Box className={classes.body}>
        <StepIndicator
          completed={completedSteps}
          activeStep={activeStep}
          Steppersdata={Steppersdata}
          partnerCompleted={partnerCompleted}
        />
        <Box px={6} className={classes.body1}>
          {body()}
        </Box>
      </Box>
      {footer === true ? (
        <Box py={4} px={8} className={classes.footer}>
          <Footer
            info={footerInfo}
            onMainAction={onMainAction}
            onClickSaveAndExit={onClickSaveAndExit}
            isSubmitting={isSubmitting}
            onProceed={onClickProceed}
            paymentbtn={paymentbtn}
            btndisabled={btndisabled}
            buttonType={buttonType}
          />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

Stepper.defaultProps = {
  body: () => {}
};

Stepper.propTypes = {};
export default Stepper;
