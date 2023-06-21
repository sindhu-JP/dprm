import React from 'react';

import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  }
}));
const Adjustment = ({
  register,
  errors,
  control,
  schema,
  options,
  runLeadVerification,
  leadsState,
  leadOpen,
  drop,
  setexpiryDate,
  reasonDetails,
  adjustmentdetails,
  ChargeItemdetails,
  AdjustmentfromDetails
}) => {
  const classes = useStyles();

  const handleChange = (event, newValue, name) => {
    AdjustmentfromDetails.setValue({
      ...AdjustmentfromDetails.value,
      [name]: newValue
    });
  };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={6}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Adjustment
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Autocomplete
              id="free-solo-demo"
              currency
              name={'adjustmentType'}
              options={adjustmentdetails['adjustmentType'] || []}
              getOptionLabel={(option) => option.code}
              getOptionSelected={(option) => option.code}
              onSelect={(e) => {
                handleChange(e, e.target.value, 'adjustmentType');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Adjustment type" required />
              )}
            />
          </Grid>
          {/* <Grid item xs={4}>
            <Autocomplete
              id="free-solo-demo"
              currency
              name={'chargeItem'}
              options={ChargeItemdetails['chargeItems']}
             
              getOptionLabel={(option) => option.code}
              getOptionSelected={(option) => option.code}
              onSelect={(e) => {
                handleChange(e, e.target.value, 'chargeItem');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Charge Item" required />
              )}
            />
          </Grid> */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Adjustment Amount"
              name="adjustmentAmount"
              required
              onChange={(e) =>
                handleChange(e, e.target.value, 'adjustmentAmount')
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              id="free-solo-demo"
              currency
              name={'reason'}
              options={reasonDetails['reason'] || []}
              getOptionLabel={(option) => option.code}
              getOptionSelected={(option) => option.code}
              onSelect={(e) => {
                handleChange(e, e.target.value, 'reason');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Reason" required />
              )}
            />
          </Grid>
          {/* <Grid item xs={4}>
            <KeyboardDatePicker
              required
              fullWidth
              clearable
              label="CURRENT DATE"
              // value={values.contractValidity}
              onChange={(date) => {
                handleChange(date, date, 'currentDate')
              }}
              minDate={new Date()}
              format="MM/dd/yyyy"
            />
          </Grid> */}
        </Grid>
        <Box mb={4}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle1">Description</Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container xs={12}>
          <TextField
            fullWidth
            name="desc"
            required
            label={'Your description here'}
            onChange={(e) => handleChange(e, e.target.value, 'desc')}
          />
        </Grid>
      </Box>
    </Paper>
  );
};

export default connect((state) => ({
  leadsState: state.leads
}))(Adjustment);
