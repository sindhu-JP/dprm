import React from 'react';
import { useStateful } from 'react-hanger';
import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  TextareaAutosize
} from '@material-ui/core';
import statuses from 'lib/constants/statuses';
import { useState } from 'react';

const ServiceUpdate = ({
  context,
  user,
  onCancel,
  onSubmit,
  modalId,
  title,
  type,
  duration,
  loading,
  error
}) => {
  const classes = useStyles();
  const description = useStateful('');

  const [Error, seterror] = useState('');
  const stepperdata = useStateful([]);
  const errorMsg = useStateful('');
  React.useEffect(() => {
    if (context?.OppData?.serviceRequestType === 'CHANGE_PLAN') {
      stepperdata.setValue(statuses?.stepperlabel?.Opportunity);
    }
  }, [context]);

  const handleSubmit = () => {
    if (description.value) {
      onSubmit({
        statusChangeReason: description.value,
        id: context.lead.id,
        // quoteId: context.quoteId,
        statusChangeBy: context.user?.sub || '',
        modalId: context?.modalId,
        // oppId:context.opportuntiData.id,
        duration: context.duration,
        user: context?.user,

        leadData: context,

        lead: context?.lead,
        user: context?.user,
        NewOpp: true,
        modalId: 'ServiceUpdate',
        OppData: context?.OppData,
        Subscription: context?.OppData,

        payload: { serviceRequestType: context?.OppData?.serviceRequestType },

        // customerID: customers.customerId,
        Stepper: stepperdata.value
      });
    } else {
      errorMsg.setValue('please enter the Description');
    }
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={6}
        className={classes.inner}
      >
        <Grid item>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">
                Service updation ({context?.OppData?.id})
              </Typography>
            </Grid>
            {error && (
              <Grid item>
                <Typography className={classes.error} variant="body">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            {/* <Grid item>
              <Typography variant="subtitle2">
                Enter the reason for updation
              </Typography>
            </Grid> */}
            <Grid item>
              <TextareaAutosize
                rowsMin={4}
                rowsMAx={6}
                placeholder="Your Description Here"
                className={classes.textarea}
                onChange={(e) => description.setValue(e.target.value)}
              />

              {errorMsg.value ? (
                <span className={classes.error}>{errorMsg.value}</span>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={4}
          >
            <Grid item>
              <Button
                onClick={onCancel}
                size="large"
                variant="text"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="large"
              >
                {loading ? 'Approving ...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },

  error: {
    color: theme.palette.error.main
  },

  inner: {
    width: theme.spacing(100),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },

  subtitle: {
    fontWeight: theme.typography.fontWeightMedium
  },

  textarea: {
    width: '100%',
    minWidth: '100%',
    maxWidth: theme.spacing(92),
    maxHeight: theme.spacing(104),
    border: `none`,
    color: theme.palette.text.primary,
    fontFamily: 'inherit'
  },

  mtop50: {
    marginTop: '50px'
  },

  submitBtn: {
    background: '#2626C0',
    width: '93px',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    '&:hover': {
      background: '#2626C0'
    }
  },

  titleColor: {
    color: '#CECECE'
  }
}));

ServiceUpdate.defaultProps = {
  context: {},
  type: 'Lead'
};
export default ServiceUpdate;
