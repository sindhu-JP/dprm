import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0',
    paddingTop: '30px'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  steps: {
    padding: '10px',
    // backgroundColor: '#e7e7e7'
    backgroundColor: 'transparent'
  }
}));

export default function StepperRevoke({ partnerType }) {
  function getSteps() {
    return [`REVOKE ${partnerType ? 'PARTNER' : 'TENANT'}`, 'CONFIRMATION'];
  }
  const classes = useStyles();
  const [activeStep] = React.useState(1);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className={classes.steps}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
