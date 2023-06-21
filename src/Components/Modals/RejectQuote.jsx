import React from 'react';
import { useStateful } from 'react-hanger';
import { Autocomplete } from 'Components';
import StringUtils from 'lib/utils/strings';
import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  TextareaAutosize
} from '@material-ui/core';
import NavigateNext from '@material-ui/icons/NavigateNext';

const RejectQuote = ({ onCancel, onSubmit, context, modalId }) => {
  const classes = useStyles();
  const description = useStateful('');
  const reason = useStateful('');
  const errorMsg = useStateful('');

  const handleSubmit = () => {
    // let Reason = reason.value;
    // if (Reason == "Other") {
    //   Reason = description.value;
    // }
    if (reason.value) {
      onSubmit({
        status: 'QUOTE_REJECTED',
        statusChangeReason: reason.value,
        description: description.value,
        id: context?.lead?.id,
        oppId: context?.opportuntiData?.id,
        contractId: context?.opportuntiData?.contract?.id,

        // quoteid: context.lead.quoteRef.id,
        statusChangeBy: context.user?.username || '',
        modalId,
        quoteId: context.quoteId,

        user: context?.user
      });
      errorMsg.setValue('');
    } else {
      errorMsg.setValue('please enter the Reason');
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
          <Typography variant="h4">Reject Quote & Contract?</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6" className={classes.subtitle}>
            Rejecting quote by {StringUtils.capitalizeFirst(context?.user?.sub)}{' '}
            ?
          </Typography>
        </Grid>

        <Grid item>
          <Autocomplete
            label="Reason * "
            onChange={(e) => reason.setValue(e.target.value)}
            // value={reason.value}
            options={[
              {
                label: 'Customer Not Interested',
                value: 'Customer Not Interested'
              },
              {
                label: 'Invalid Data',
                value: 'Invalid Data'
              },
              {
                label: 'Customer Not Responding',
                value: 'Customer Not Responding'
              },
              {
                label: 'Other',
                value: 'Other'
              }
            ]}
          />
          {errorMsg.value ? (
            <span className={classes.error}>{errorMsg.value}</span>
          ) : (
            ''
          )}
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">Description</Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                rowsMin={4}
                rowsMAx={6}
                placeholder="Your Description Here"
                className={classes.textarea}
                onChange={(e) => description.setValue(e.target.value)}
              />
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
                endIcon={<NavigateNext />}
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
                endIcon={<NavigateNext />}
              >
                Submit
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
  error: {
    color: theme.palette.error.main
  }
}));

export default RejectQuote;
