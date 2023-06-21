import React from 'react';
import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import produce from 'immer';
import Setavailable from './Setavailable';
import SetBandwidth from './SetBandwidth';
import { connect } from 'react-redux';
import Setunavailable from './Setunavailable';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  },
  footer: {
    position: 'fixed',
    padding: '10px',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.common.white
  },
  button: {
    boxShadow: 'none',
    // backgroundColor: theme.palette.success.main,
    // color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      // backgroundColor: theme.palette.success.light
    }
  }
}));
function EditUser({
  open,
  onClose,
  Unavailablerow,
  UserSetAvailable,
  details,
  Groups,
  // Unavailablerow,
  UserSetUnAvailable
}) {
  const classes = useStyles();
  // const [fromdate, setfromdate] = React.useState(null);
  // const [todate, settodate] = React.useState(null);
  const [selectValue, setselectValue] = React.useState('');
  const [activeTasks, setActiveTasks] = React.useState('');
  const [pausedTasks, setPausedTasks] = React.useState('');

  const [fromdate, setfromdate] = React.useState(null);
  const [todate, settodate] = React.useState(null);

  const [totalCounts, setTotalCounts] = React.useState(0);
  const handleChange = (e) => {
    setselectValue(e.target.value);

    // props.getuserGrouplist({ id: e?.target.value });
  };
  const handleActiveTasks = (e) => {
    setActiveTasks(e.target.value);
  };
  const handlePausedTasks = (e) => {
    setPausedTasks(e.target.value);
  };
  const dateConvertAndCountDays = () => {
    let oneday = 24 * 60 * 60 * 1000;

    const totalCountDays = Math.ceil((todate - fromdate) / oneday);
    setTotalCounts(totalCountDays);
  };
  React.useEffect(() => {
    dateConvertAndCountDays();
  }, [fromdate, todate]);
  const handleSubmit = () => {
    if (selectValue === 'Unavailble') {
      const payload = {};
      payload['ruleName'] = Unavailablerow?.ruleName;
      payload['userId'] = Unavailablerow?.id;
      payload['status'] = Unavailablerow?.status;
      payload['reassignmentRule'] = false;
      payload['ruleImpact'] = [];

      payload['fromDate'] = fromdate;
      payload['toDate'] = todate;

      UserSetUnAvailable({ payload: payload });
      const pay = {
        ...Unavailablerow
      };
      pay['availbility'] = selectValue;
      pay['activeTasks'] = activeTasks;
      pay['pausedTasks'] = pausedTasks;
      pay['totalDays'] = totalCounts;
      UserSetAvailable({ payload: pay });
    } else {
      const payload = produce((draft) => {
        (draft.fromDate = fromdate),
          (draft.toDate = todate),
          (draft.totalDays = Unavailablerow.totalDays);
        draft.ruleName = Unavailablerow?.ruleName;
        draft.userId = Unavailablerow?.id;
        draft.status = Unavailablerow?.status;
        draft.reassignmentRule = false;
        draft.ruleImpact = [];
      });
      // Unavailablerow['availbility'] = 'yte';
      const pay = {
        ...Unavailablerow
      };
      pay['availbility'] = selectValue;
      pay['activeTasks'] = activeTasks;
      pay['pausedTasks'] = pausedTasks;

      UserSetAvailable({ payload: pay });
    }
  };
  React.useEffect(() => {
    if (details?.list?.availbility) {
      setselectValue(details?.list?.availbility);
    }
    setActiveTasks(details?.list?.activeTasks);
    setPausedTasks(details?.list?.pausedTasks);
  }, [details]);

  const list = [
    {
      name: 'Available',
      code: 'Available'
    },
    { name: 'Unavailble', code: 'Unavailble' }
  ];
  return (
    <div>
      <Buttonsheet
        open={open}
        header={'Set Un Available Period '}
        onClose={onClose}
        heightvalue={'80vh'}
        marginBtm={'50px'}
      >
        <Box style={{ paddingBottom: '50px' }}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Setavailable
                userDetails={details}
                handleChange={handleChange}
                value={selectValue}
                list={list}
              />
            </Grid>
            <Grid item>
              <SetBandwidth
                userDetails={details}
                activeTasks={activeTasks}
                handleChange={handleActiveTasks}
                handlePausedTasks={handlePausedTasks}
                pausedTasks={pausedTasks}
              />
            </Grid>
            {selectValue === 'Unavailble' && (
              <Grid item>
                <Setunavailable
                  UserSetUnAvailable={UserSetUnAvailable}
                  Unavailablerow={Unavailablerow}
                  fromdate={fromdate}
                  setfromdate={setfromdate}
                  todate={todate}
                  settodate={settodate}
                  dateConvertAndCountDays={dateConvertAndCountDays}
                  totalCounts={totalCounts}
                />
              </Grid>
            )}
          </Grid>

          <Box px={8} className={classes.footer}>
            <Grid container justify="flex-end" spacing={5} direction="row">
              <Grid item>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  // endIcon={!buttonLoader ? <ArrowForward /> : null}
                  className={classes.button}
                  endIcon={<ArrowForward />}
                  onClick={handleSubmit}
                >
                  {Groups?.loading?.reportLoading ? (
                    <CircularProgress size={25} color="primary" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Buttonsheet>
    </div>
  );
}
export default connect(
  (state) => ({
    Groups: state.Groups
  }),
  {}
)(EditUser);
