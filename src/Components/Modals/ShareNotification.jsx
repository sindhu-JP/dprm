import React from 'react';
import { useStateful } from 'react-hanger';
import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
  TextField,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
const ShareNotification = ({
  user,
  onCancel,
  onSubmit,
  modalId,
  title,
  type,
  duration,
  loading,
  parent,
  error,
  modalContext,
  partnerdetails,
  context
}) => {
  const classes = useStyles();
  const description = useStateful('');
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [Edit, setEdit] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const handleSubmit = () => {
    onSubmit({
      invoiceId: context?.details?.rowlist?.invoiceId,

      partnerId: _.get(partnerdetails, 'mainlist.partnerId', '...'),

      emailId: email
    });
  };

  React.useEffect(() => {
    if (partnerdetails) {
      setEmail(
        partnerdetails?.details?.PartnerProfileCreation?.PrimaryContactDetails
          ?.EMAIL_ID
      );
    }
  }, []);

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
              <Typography variant="h4">Email Address</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <EditIcon onClick={() => setEdit(!Edit)} />
              </IconButton>
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
            <Grid item>
              <TextField
                label="Email"
                disabled={Edit}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                InputProps={{ disableUnderline: Edit }}
                fullWidth
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
                className={classes.btnClr}
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
                // disabled={getBtnStatus()}
              >
                {loading ? (
                  <CircularProgress size={25} style={{ color: 'white' }} />
                ) : (
                  'Submit'
                )}
                {/* {loading ? 'Submitting ...' : 'Submit'} */}
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
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
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

ShareNotification.defaultProps = {
  context: {},
  type: 'Lead'
};
export default ShareNotification;
