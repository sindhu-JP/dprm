import React from "react";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles, StepLabel } from "@material-ui/core";
import { useStateful } from "react-hanger";
import LeadActions from 'Components/Table/LeadActions';
const usestyle = makeStyles({
  step: {
    "& $completed": {
      color: "#2ED573",
    },
    "& $active": {
      color: "#FFA502",
    },
    "& $disabled": {
      color: "red",
    },
  },
  alternativeLabel: {},
  active: {},
  completed: {},
  disabled: {},
});

const AgentContractStepper = ({ steps, activeStep, completed, history, Status }) => {
  const StepperValues = useStateful([]);
  const handleStep = () => {};
  const classes = usestyle();


  return (
    <React.Fragment>
       <LeadActions />
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps&&steps?.map((step, index) => (
          <Step
            key={step}
            classes={{
              root: classes.step,
              completed: classes.completed,
              active: classes.active,
            }}
          >
            <StepLabel
              classes={{
                alternativeLabel: classes.alternativeLabel,
                labelContainer: classes.labelContainer,
              }}
              StepIconProps={{
                classes: {
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active,
                  disabled: classes.disabled,
                },
              }}
            >
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </React.Fragment>
  );
};

AgentContractStepper.defaultProps = {
  steps: [
    "Agent creation",
    "Agent approval",
    "Contract creation",
    "Contract approval",
    "Share contract",
    "Agent acceptance",
    "CONTRACT_SIGN_OFF",
    "Payment pending",
    "Active",
  ],
  activeStep: 0,
  completed: [],
};

export default AgentContractStepper;
