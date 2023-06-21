import React from 'react';

import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';

import { makeStyles, StepLabel, withStyles } from '@material-ui/core';

import { useStateful } from 'react-hanger';

import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';

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
  time: {
    opacity: '1',
    color: '#2ED573',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    font: 'var(--unnamed-font-style-normal) normal medium 14px/24px Roboto'
  },
  yetdone: {
    font: 'normal normal normal 14px/16px Roboto',
    letterSpacing: '0px',
    textAlign: 'center',
    color: '#57606F',
    opacity: '1'
  },
  remainingTime: {
    font: 'normal normal normal 14px/16px Roboto',
    letterSpacing: '0px',
    opacity: '1',
    color: '#57606F',
    textAlign: 'center'
  },
  remainingTimeline: {
    background: '#FF4757 0% 0% no-repeat padding-box',
    borderRadius: '50px',
    opacity: '1',
    height: '8px'
  },
  arrowUp: {
    background: '#2626C0 0% 0% no-repeat padding-box',
    opacity: '1',
    fontSize: '5rem'
  },
  alternativeLabel: {},
  active: {},
  completed: {},
  disabled: {}
});
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#FF4757'
  }
}))(LinearProgress);
const OrderStepper = ({
  steps,
  activeStep,
  authState,
  completed,
  history,
  Status,
  value,
  status,
  oppLevelSla,
  leadLevelSla
}) => {
  const StepperValues = useStateful([]);
  const handleStep = () => {};
  const classes = usestyle();

  return (
    <React.Fragment>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps &&
          steps?.map((step, index) => (
            <Step
              key={step.status}
              classes={{
                root: classes.step,
                completed: classes.completed,
                active: classes.active
              }}
            >
              <StepLabel
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
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
      </Stepper>
    </React.Fragment>
  );
};

OrderStepper.defaultProps = {
  steps: [
    {
      label: 'Feasibility',
      status: 'Feasibility',
      changeDate: ''
    },
    {
      label: 'Delivery',
      status: 'Delivery',
      changeDate: ''
    },
    {
      label: 'Provisioning',
      status: 'Provisioning',
      changeDate: ''
    },
    {
      label: 'Installation',
      status: 'Installation',
      changeDate: ''
    }
  ],
  activeStep: 0,
  completed: []
};

export default connect(
  (state) => ({
    authState: state.auth
  }),
  {}
)(OrderStepper);
