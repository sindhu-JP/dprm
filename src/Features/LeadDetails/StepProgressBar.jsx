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
    // paddingLeft: '30px'
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
const StepProgressBar = ({
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

  // React.useEffect(() => {
  //   let temp = []
  //   if (status?.statusChange) {

  //     let dateArr1 = value  && value?.statusChange||[]
  //     let dateArr2 = status?.statusChange||[]
  //     // if(dateArr1 & dateArr2){
  //       var finalChangeDate = [...dateArr1, ...dateArr2];
  //     // }

  //     let d = [...steps]

  //     let newArr = []
  //     d && d.map((item, index) => {
  //       finalChangeDate && finalChangeDate.map((key, value) => {
  //         if (item?.status === key?.status) {
  //           let obj = Object.assign({}, item, { changeDate: key.changeDate })
  //           newArr.push(obj)
  //         }
  //       })
  //     })
  //     let mergedArr = [...d, ...newArr]

  //     temp = [...new Map(mergedArr.map(item => [item.status, item])).values()]

  //     temp = temp.map((item) => {
  //       if (item.status == "LEAD_GENERATION") {
  //         return {
  //           ...item,
  //           label: "LEAD GENERATION",
  //           status: "LEAD_GENERATION",
  //           changeDate: value.createdDate
  //         };
  //       } else {
  //         return item;
  //       }
  //     })

  //     if (oppLevelSla?.sla) {

  //       temp = temp.map((item) => {
  //         if (item.status === oppLevelSla?.sla.status) {
  //           let str = oppLevelSla?.sla.remainingTime;
  //           var res = str.split(":");

  //           let remaTime = res[0] + "days " + res[1] + "hours " + res[2] + "Min"
  //           let obj = Object.assign({}, item, { changeDate: remaTime })
  //           return obj;
  //         }
  //         else {
  //           return item;
  //         }

  //       })

  //     }

  //     StepperValues.setValue(temp);
  //   } else {
  //     let dateArr1 = value?.statusChange
  //     let d = [...steps]
  //     let newArr = []
  //     d.map((item, index) => {
  //       dateArr1 && dateArr1.map((key, value) => {
  //         if (item.status === key.status) {
  //           let obj = Object.assign({}, item, { changeDate: key.changeDate })
  //           newArr.push(obj)
  //         }
  //       })
  //     })
  //     let mergedArr = [...d, ...newArr]
  //     temp = [...new Map(mergedArr.map(item => [item.status, item])).values()]

  //     temp = temp.map((item) => {
  //       if (item.status == "LEAD_GENERATION") {
  //         return {
  //           ...item,
  //           label: "LEAD GENERATION",
  //           status: "LEAD_GENERATION",
  //           changeDate: value.createdDate
  //         };
  //       } else {
  //         return item;
  //       }
  //     })

  //     if (leadLevelSla) {

  //       temp = temp.map((item) => {
  //         if (item.status === leadLevelSla.status) {
  //           let str = leadLevelSla.remainingTime;
  //           var res = str.split(":");

  //           let remaTime = res[0] + "days " + res[1] + "hours " + res[2] + "Min"
  //           let obj = Object.assign({}, item, { changeDate: remaTime })
  //           return obj;
  //         }
  //         else {
  //           return item;
  //         }

  //       })

  //     }

  //     StepperValues.setValue(temp);
  //   }

  //   if (Status === "ADD_SERVICE"||Status === "CHANGE_PLAN"||Status === "SERVICE_ADDED"||Status === "PLAN_ADDED"||Status==="ONBOARDED") {
  //     let data = temp.map((item) => {
  //       if (item.status == "ONBOARDING") {
  //         return {
  //           ...item,
  //           label: Status,
  //           status: Status,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });

  //     StepperValues.setValue(data);
  //   // } else if (Status === "CHANGE_PLAN") {
  //   //   let data = temp.map((item) => {
  //   //     if (item.status == "ONBOARDING") {
  //   //       return {
  //   //         ...item,
  //   //         label: "CHANGE PLAN",
  //   //         status: "CHANGE_PLAN",
  //   //       };
  //   //     } else {
  //   //       return item;
  //   //     }
  //   //   });
  //   //   StepperValues.setValue(data);
  //   // }
  //   // else if (Status === "SERVICE_ADDED") {
  //   //   let data = temp.map((item) => {
  //   //     if (item.status == "ONBOARDING") {
  //   //       return {
  //   //         ...item,
  //   //         label: "SERVICE ADDED",
  //   //         status: "SERVICE_ADDED",
  //   //       };
  //   //     } else {
  //   //       return item;
  //   //     }
  //   //   });
  //     // StepperValues.setValue(data);
  //   } else {
  //     StepperValues.setValue(temp);
  //   }

  // }, [oppLevelSla,leadLevelSla]);

  // function getValidateCode(changeDate) {
  //   let date = dayjs(changeDate).format("D MMMM, YYYY h:mm")
  //   if (date == "Invalid Date") {
  //     return (<>
  //     <div className={classes.remainingTime}>{changeDate} left</div>
  //     <BorderLinearProgress variant="determinate" value={70} />
  //     {/* <ArrowDropUpOutlinedIcon color="secondary" fontSize="29px"/> */}
  //     </>
  //     )
  //   }
  //   else {
  //     return (
  //       <div>
  //         {dayjs(changeDate).format("D MMMM, YYYY h:mm")}
  //         <div align="center">{authState?.user?.sub.toUpperCase()}</div>
  //       </div>
  //     )
  //   }

  // }

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

      {/* <Divider variant="fullWidth" style={{ backgroundColor: '#2626C0' }} /> */}
    </React.Fragment>
  );
};

StepProgressBar.defaultProps = {
  steps: [
    {
      label: 'Partner Creation',
      status: 'PARTNER_CREATION',
      changeDate: ''
    },
    {
      label: 'Manage Hierarchy',
      status: 'MANAGE_HIERARCHY',
      changeDate: ''
    },
    {
      label: 'Contract Sign-off',
      status: 'CONTRACT_SIGN_OFF',
      changeDate: ''
    },
    {
      label: 'Payment',
      status: 'PAYMENT',
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
)(StepProgressBar);
