import React from 'react';
import Box from '@material-ui/core/Box';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepButton from '@material-ui/core/StepButton';
import { makeStyles } from '@material-ui/core';
const usestyle = makeStyles({
  step: {
    '& $completed': {
      color: '#2ED573'
    },
    '& $active': {
      color: '#FFA502'
    },
    '& $disabled': {
      color: 'red'
    }
  },
  alternativeLabel: {},
  active: {},
  completed: {},
  disabled: {}
});

const StepIndicator = ({ steps, activeStep, completed }) => {
  const handleStep = () => {};

  const classes = usestyle();
  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            key={index}
            classes={{
              root: classes.step,
              completed: classes.completed,
              active: classes.active
            }}
          >
            <StepButton
              onClick={handleStep(index)}
              classes={{
                alternativeLabel: classes.alternativeLabel,
                labelContainer: classes.labelContainer
              }}
              StepIconProps={{
                classes: {
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active,
                  disabled: classes.disabled
                }
              }}
              completed={activeStep > index}
            >
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

StepIndicator.defaultProps = {
  steps: [
    ' SELECT SUBSCRIPTION',
    'OPPORTUNITY CREATION',
    'PRODUCT  CONFIGURATION ',
    'QUOTE GENERATION',
    'CREATE CONTRACT',

    'CONTRACT SIGN OFF'
  ],

  activeStep: 0,
  completed: []
};

export default StepIndicator;
