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

const CustomerReject = ({
  loading,
  error,
  context,
  modalId,
  user,
  onCancel,
  onSubmit
}) => {
  const classes = useStyles();
  const description = useStateful('');
  const errorMsg = useStateful('');

  const handleSubmit = () => {
    if (description.value) {
      onSubmit({
        modalId,
        id: context.lead.id,
        quoteId: context.quoteId,
        status: 'CUSTOMER_REJECTED',
        description: description.value,
        oppId: context.opportuntiData.id,
        statusChangeBy: context?.user?.sub,
        user: context?.user
      });
      errorMsg.setValue('');
    } else {
      errorMsg.setValue('Please enter the reason');
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
          <Typography variant="h4">Customer Rejected?</Typography>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6"> Reason for Rejection *</Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                rowsMin={4}
                rowsMAx={6}
                placeholder="Enter reason Here"
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
                {loading ? 'Rejecting ...' : 'Reject'}
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
    padding: theme.spacing(8),
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

  titleColor: {
    color: '#CECECE'
  },
  error: {
    color: theme.palette.error.main
  }
}));
export default CustomerReject;
