import React from 'react';

import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Paper
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import produce from 'immer';

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
export default function Setunavailable({
  open,
  onClose,
  Unavailablerow,
  UserSetUnAvailable,
  fromdate,
  setfromdate,
  todate,
  settodate,
  dateConvertAndCountDays,
  totalCounts
}) {
  const classes = useStyles();
  const [countFrom, setCountFrom] = React.useState('');
  const [countTo, setCountTo] = React.useState('');
  const handleSubmit = () => {
    const payload = produce({}, (draft) => {
      (draft.fromDate = fromdate),
        (draft.toDate = todate),
        (draft.totalDays = Unavailablerow?.totalDays);
      draft.ruleName = Unavailablerow?.ruleName;
      draft.userId = Unavailablerow?.id;
      draft.status = Unavailablerow?.status;
      draft.reassignmentRule = false;
      draft.ruleImpact = [];
    });

    UserSetUnAvailable({ payload: payload });
  };

  const handleFromData = (date) => {
    setfromdate(date);
    // setCountFrom(date);
    // dateConvertAndCountDays();
  };
  const handleToData = (date) => {
    settodate(date);
    // setCountTo(date);
    // dateConvertAndCountDays();
  };
  const minDate = new Date(new Date(fromdate).getTime() + 86400000);

  return (
    <div>
      {/* <Buttonsheet
        open={open}
        header={'Set Un Available Period '}
        onClose={onClose}
        heightvalue={'40vh'}
      > */}
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Typography variant="h2" className={classes.title}>
              Set Unavailable
            </Typography>
          </Box>
          <Box py={5}>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <KeyboardDatePicker
                      // clearable
                      disablePast
                      required
                      format="dd/MM/yyyy"
                      value={fromdate}
                      // required
                      name="fromDate"
                      label="FROM DATE"
                      // onChange={(date) => setfromdate(date)}
                      onChange={handleFromData}
                      // strictCompareDates
                    />
                  </Grid>{' '}
                  <Grid item>
                    <KeyboardDatePicker
                      // clearable
                      disablePast
                      required
                      value={todate}
                      format="dd/MM/yyyy"
                      // required
                      name="fromDate"
                      label="TO DATE"
                      // onChange={(date) => settodate(date)}
                      onChange={handleToData}
                      minDate={minDate}
                    />
                  </Grid>{' '}
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle1">
                          TOTAL NUMBER OF DAY(S)
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {totalCounts > 0 ? totalCounts : 0}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>{' '}
                </Grid>
              </Grid>
            </Grid>

            <Box px={8} className={classes.footer}>
              <Grid container justify="flex-end" spacing={5} direction="row">
                <Grid item>
                  <Button
                    size="large"
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    cancel
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
                    {/* {buttonLoader ? (
                          <CircularProgress size={25} color="primary" />
                        ) : (
                          btn.label
                        )} */}
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Paper>
      {/* </Buttonsheet> */}
    </div>
  );
}
