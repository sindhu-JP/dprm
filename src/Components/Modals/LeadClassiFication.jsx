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

const LeadClassiFication = ({
  user,
  onCancel,
  onSubmit,
  context,
  modalId,
  loading,
  parent,
  error
}) => {
  const classes = useStyles();
  const classification = useStateful(
    context?.lead?.companyDetails?.leadClassification
  );
  const description = useStateful('');
  const reason = useStateful('');
  const errorMsg = useStateful('');

  const handleSubmit = () => {
    if (reason.value) {
      let payload = Object.assign({}, context.lead.companyDetails);
      payload.leadClassification = classification.value;
      onSubmit({
        id: context.lead.id,
        reason: reason.value,
        oppId: context?.opportuntiData?.id,
        statusChangeBy: context?.user?.sub,
        user: context.user,
        description: description.value,
        payload: payload,
        modalId,
        parent: parent
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
          <Typography variant="h4">Lead Classification</Typography>
        </Grid>

        <Grid item>
          <Autocomplete
            defaultValue={{
              label: StringUtils.capitalizeFirst(
                context?.lead?.companyDetails?.leadClassification
              ),
              value: context?.lead?.companyDetails?.leadClassification
            }}
            label="Lead Classification *"
            onChange={(e) => classification.setValue(e.target.value)}
            options={[
              {
                label: 'Hot',
                value: 'Hot'
              },
              {
                label: 'Medium',
                value: 'Medium'
              },
              {
                label: 'Cold',
                value: 'Cold'
              }
            ]}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            label="Reason*"
            onChange={(e) => reason.setValue(e.target.value)}
            options={[
              {
                label: 'Customer Not Interested',
                value: 'notIntereseted'
              },
              {
                label: 'Customer Not Responding',
                value: 'notResponding'
              },
              {
                label: 'Product Procing Too Hight',
                value: 'productPriceTooHigh'
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
                {loading ? 'Submiting ...' : 'Submit'}
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

export default LeadClassiFication;
