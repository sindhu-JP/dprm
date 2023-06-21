import React from 'react';

import Box from '@material-ui/core/Box';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepButton from '@material-ui/core/StepButton';
import { makeStyles } from '@material-ui/core';
import { useStateful } from 'react-hanger';
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
const StepIndicator = ({
  steps,
  activeStep,
  completed,
  Steppersdata,
  partnerCompleted
}) => {
  const steppervalues = useStateful([]);

  React.useEffect(() => {
    if (Steppersdata && Steppersdata.length > 0) {
      steppervalues.setValue(Steppersdata);
    } else {
      steppervalues.setValue(steps);
    }
  }, [Steppersdata]);
  const handleStep = () => {};
  const classes = usestyle();
  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
        {steppervalues &&
          steppervalues.value.map((step, index) => (
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
    // "LEAD GENERATION",
    // "OPPORTUNITY CREATION",
    // "PRODUCT CONFIGURATION ",
    // "QUOTE GENERATION",
    // "CREATE CONTRACT",
    // "CONTRACT SIGN OFF",
    // "CUSTOMER ACCEPTANCE ",
    // "ONBOARDING",
    'PARTNER PROFILE CREATION',
    'MANAGE HIERARCHY',
    'CONTRACT SHARE & SIGN OFF',
    'PAYMENT',
    'CONFIRMATION'
  ],
  activeStep: 0,
  completed: []
};

export default StepIndicator;
