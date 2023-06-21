import React from 'react';
import { useStateful } from 'react-hanger';
import {
  Button,
  Box,
  Grid,
  makeStyles,
  Typography,
  Chip
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  mTop: {
    marginTop: '20px'
  }
}));
const FilterTable = ({
  handleFilter,
  handleClear,
  leadClassification,
  statusFilter,
  fromDate,
  toDate,
  handleDateChangeTo,
  handleDateChangeFrom,
  onHandleFilterChange,
  masterdata,
  options,
  statusField
}) => {
  const classes = useStyles();
  const status = useStateful([
    { name: 'Approve', code: 'Approve', checked: false },
    { name: 'Pending', code: 'pending', checked: false },

    { name: 'Rejected', code: 'Reject', checked: false }
  ]);

  return (
    <Box m={3}>
      <Grid direction="column" spacing={6}>
        <form>
          <Grid item>
            <Typography variant="h4">Filters</Typography>
          </Grid>

          <Grid item className={classes.mTop}>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  clearable
                  disableFuture
                  format="dd/MM/yyyy"
                  value={fromDate ? fromDate : null}
                  // name={"Fromdate"}

                  required
                  name="fromDate"
                  label="FROM DATE"
                  onChange={(date) => onHandleFilterChange(date, 'fromDate')}
                  strictCompareDates
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  clearable
                  disableFuture
                  value={toDate ? toDate : null}
                  name="toDate"
                  format="dd/MM/yyyy"
                  label="TO DATE"
                  required
                  onChange={(date) => onHandleFilterChange(date, 'toDate')}
                  strictCompareDates
                  minDate={fromDate}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.mTop}>
            {/* {statusField ? (
              <Autocomplete
                label="STATUS"
                name="statusFilter"
                // onChange={(e) => setStatusFilter(e.target.value)}
                onChange={(value) =>
                  onHandleFilterChange(value, 'statusFilter')
                }
                // value={reason.value}

                options={options}
              />
            ) : (
              ''
            )} */}
          </Grid>

          <Grid item>
            <Typography variant="h4">Status</Typography>
          </Grid>

          <Grid item>
            <Box py={4}>
              <Grid container direction="row" spacing={2}>
                {status?.value.map((item) => {
                  return (
                    <Grid item>
                      <Chip
                        variant={item.checked ? 'default' : 'outlined'}
                        size="medium"
                        color={item.checked ? 'primary' : ''}
                        label={item.code}
                        // onClick={() =>

                        // }
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid item className={classes.mTop}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  variant="text"
                  color="secondary"
                  type={'reset'}
                  size="large"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleFilter}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

export default FilterTable;
