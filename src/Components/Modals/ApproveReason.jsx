import React from 'react';
import { useStateful } from 'react-hanger';
import StringUtils from 'lib/utils/strings';
import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  TextareaAutosize,
  CircularProgress
} from '@material-ui/core';

const ApprovalReason = ({
  context,
  user,
  onCancel,
  TrobleTicketApporovel,
  modalId,
  title,
  type,
  duration,
  loading,
  parent,
  error,
  modalContext,
  userid,
  groups,
  assignee,
  ActiveTabs,
  activeTabs,
  setactiveTicket
}) => {
  const classes = useStyles();
  const description = useStateful('');
  const [errorMsg, setErrorMsg] = React.useState(false);
  
  const handleSubmit = () => {
    if (modalContext.modalFrom === 'Tickets') {
      const payloadValue = {
        Approve: {
          author: user,

          action: 'Status Change',

          date: new Date(),

          note: '',

          text: `has ${modalContext?.modalStatus} the task`,

          type: modalContext?.data?.id
        },
        Reject: {
          author: user,

          action: 'Status Change',

          date: new Date(),

          note: '',

          text: `has ${modalContext?.modalStatus} the task`,

          type: modalContext?.data?.id
        }
      };
      const payload = {
        status: modalContext?.modalStatus,
        statusChange: [
          {
            changeDate: new Date(),
            changeReason: description.value,
            status: modalContext?.modalStatus,
            '@type': 'StatusChange'
          }
        ],
        relatedParty: modalContext?.data?.relatedParty,
        ticketActivity: modalContext?.data?.ticketActivity.concat(
          payloadValue[modalContext?.modalStatus]
        )
      };
      setactiveTicket(context);
      TrobleTicketApporovel({
        payload: payload,
        id: modalContext?.data?.id,
        dataView: modalContext?.data,
        description: description.value,
        groups: groups,
        userid: '',
        message: modalContext?.modalStatus
      });
      ActiveTabs.setValue(modalContext?.modalStatus);
    }
  };
  const getTitle = () =>
    `${type} ApprovaldBy ${StringUtils.capitalizeFirst(context?.user?.sub)}`;
  const handleDesc = (e) => {
    let str = e.target.value;
    if (str.match(/^\s*/)[0].length === 0) {
      description.setValue(e.target.value);
      setErrorMsg(false);
    } else {
      setErrorMsg(true);
    }
  };

  const getBtnStatus = () => {
    // let removed =
    //   description.value.length - description.value.trimLeft().length;

    if (description.value.length > 0 && loading === false) {
      return false;
    } else {
      return true;
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
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">
              {modalContext?.modalStatus}
              <> By</> {user}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6" required>
                Description
              </Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                rowsMin={4}
                rowsMAx={6}
                required
                placeholder="Your Description Here"
                className={classes.textarea}
                onChange={handleDesc}
                helperText="Incorrect entry."
              />
              {errorMsg && (
                <span style={{ color: 'red' }}>
                  Please enter valid description
                </span>
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
                disabled={loading}
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
                disabled={getBtnStatus()}
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

  error: {
    color: theme.palette.error.main
  },
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
  },
  inner: {
    width: theme.spacing(100),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
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
    color: 'black',
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

ApprovalReason.defaultProps = {
  context: {},
  type: 'Lead'
};
export default ApprovalReason;
