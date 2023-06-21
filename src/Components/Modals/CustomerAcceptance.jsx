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

const CustomerAcceptance = ({
  context,
  modalId,
  loading,
  onCancel,
  onSubmit,
  parent
}) => {
  const classes = useStyles();
  const description = useStateful('');

  const [Oppstatus, setOppstatus] = React.useState('ONBOARDING');
  const [serviceType, setserviceType] = React.useState('');

  React.useEffect(() => {
    if (context) {
      if (
        context?.opportuntiData?.serviceRequestType === 'CHANGE_PLAN' ||
        context?.opportuntiData?.serviceRequestType === 'ADD_VAS' ||
        context?.opportuntiData?.serviceRequestType ===
          'SUBSCRIPTION_MODIFICATION'
      ) {
        setOppstatus(context?.opportuntiData?.serviceRequestType);
      } else {
        if (context.lead?.relatedParty) {
          let vas = context.lead?.relatedParty?.map((item) => {
            if (item.role === 'Customer') {
              setOppstatus('ADD_SERVICE');
            }
          });
        }
      }
    }
  }, [context]);
  const handleSubmit = () => {
    onSubmit({
      modalId,
      quoteId: context?.opportuntiData?.quoteRef?.id,
      id: context.lead.id,
      oppId: context?.opportuntiData?.id,
      status: Oppstatus,
      statusChangeReason: description.value,
      user: context?.user,
      contractId: context?.opportuntiData?.contract?.id,
      statusChangeBy: context?.user?.sub,
      // contractId: context?.opportuntiData?.contract?.id,
      serviceRequestType: Oppstatus,
      parent: parent
    });
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
          <Typography variant="h4">Customer Accepted?</Typography>
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
                {loading ? 'Accepting ...' : 'Accept'}
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
  }
}));
export default CustomerAcceptance;
