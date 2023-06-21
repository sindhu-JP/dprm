import React from 'react';

import { Box, makeStyles } from '@material-ui/core';

// import Header from './Header';
import Footer from './Footer';
import StepIndicator from './StepIndicator';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.main,
  },
  header: {},
  body: {
    maxHeight: `calc(100vh - ${theme.spacing(10)} - ${theme.spacing(30)})`,
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    backgroundColor: theme.palette.background.main
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.white
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
  completedSteps
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {/* <Header
          id={id}
          title={title}
          status={status}
          onDrop={onDrop}
          onFaqRequest={onFaqRequest}
          onClose={onClose}
        /> */}
      </Box>
      <Box className={classes.body}>
        <StepIndicator completed={completedSteps} activeStep={activeStep} />
        <Box px={6}>{body()}</Box>
      </Box>
      <Box py={4} px={8} className={classes.footer}>
        <Footer
          info={footerInfo}
          onMainAction={onMainAction}
          isSubmitting={isSubmitting}
        />
      </Box>
    </Box>
  );
};

Stepper.defaultProps = {
  body: () => {}
};

Stepper.propTypes = {};
export default Stepper;
