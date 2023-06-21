import React from 'react';
import { Stepper, Step, StepButton } from '@material-ui/core';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  //Chip,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';
import { ArrowBack, PersonAddDisabled, Help } from '@material-ui/icons';
// import Logo from 'Assets/Icons/Logo.svg';

import { useHistory } from 'react-router-dom';
import Logo from 'Components/Logo';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  spacer: {
    flexGrow: 1
  },
  logo: {
    width: theme.spacing(40),
    '& > img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      height: 'auto'
    }
  },
  divider: {
    margin: theme.spacing(0, 4),
    height: '3.6rem'
  },
  req: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  main: {
    backgroundColor: theme.palette.background.main,
    maxHeight: '100vh',
    overflow: 'hidden'
  }
}));
const steps = [
  'PARTNER PROFILE CREATION',
  'MANAGE HIERARCHY',
  'CONTRACT SHARE AND SIGNOFF',
  'PAYMENT',
  'CONFIRMATION'
];

const Partner = ({ children, regId, activeIndex, isRoute, partnerId }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const history = useHistory();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const navigateToDashBoard = () => {
    history.push('/');
  };
  const navigateToPreviousPage = () => {
    history.goBack();
  };
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [completed, setCompleted] = React.useState({});
  // const totalSteps = () => {
  //   return steps.length;
  // };

  // const completedSteps = () => {
  //   return Object.keys(completed).length;
  // };

  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };

  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps();
  // };
  // const handleNext = () => {
  //   const newActiveStep =
  //     isLastStep() && !allStepsCompleted()
  //       ? // It's the last step, but not all steps have been completed,
  //         // find the first step that has been completed
  //         steps.findIndex((step, i) => !(i in completed))
  //       : activeStep + 1;
  //   setActiveStep(newActiveStep);
  // };
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  // };
  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };
  return (
    <>
      {/* <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Stepper
            activeStep={2}
            footer={true}
            footerInfo={
              <Grid
                container
                alignItems="center"
                direction="row"
                spacing={4}
              ></Grid>
            }
            body={() => children}
          />
        </Grid>
      </Grid> */}

      <Grid container className={classes.root}>
        {/* <Header regId={regId} /> */}

        <AppBar className={classes.root} position="relative">
          <Toolbar>
            <IconButton edge="start" onClick={navigateToPreviousPage}>
              <ArrowBack />
            </IconButton>
            <Box ml={4} className={classes.logo} onClick={navigateToDashBoard}>
              <Logo />
            </Box>
            <Divider orientation="vertical" className={classes.divider} />
            <Box>
              <Grid
                container
                direction="row"
                alignItems="center"
                wrap="nowrap"
                spacing={6}
              >
                <Grid item>
                  <Typography className={classes.req} variant="h6">
                    {/* {`${props.title} - ${props.id ? props.id : 'Loading ...'}`} */}
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Chip
                    // avatar={Edit}
                    color="primary"
                    variant="outlined"
                    label="Draft"
                  />
                </Grid> */}
              </Grid>
            </Box>
            <Box className={classes.spacer} />
            <Box>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
              >
                <Grid item>
                  <IconButton size="large">
                    <Help />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton size="large">
                    <PersonAddDisabled />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </AppBar>

        <Grid item xs={12} className={classes.main}>
          <Box
            py={6}
            px={10}
            style={{
              maxHeight: '100vh',
              overflowY: 'auto',
              overflowX: 'hidden'
              // paddingBottom: "100px",
            }}
          >
            {isRoute && partnerId?.toString().startsWith("MP")? (
              <Grid item xs={12}>
                <Stepper activeStep={activeIndex}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepButton
                        StepIconProps={{
                          classes: { root: classes.stepIcon }
                        }}
                        onClick={handleNext}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            ) : null}

            <Grid item xs={12} style={{ marginTop: '10px' }}>
              {children}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Partner;
