import _ from 'lodash';
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

// import Autocomplete from 'lib/components/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';

const InvoicePaymentDetails = ({
  AdjustmentfromDetails,
  loading,
  onNext,
  handleChange,
  errors,
  invoicedetails
}) => {
  const classes = useStyles();

  // const handleChange = (event, newValue, name) => {
  //   AdjustmentfromDetails.setValue({
  //     ...AdjustmentfromDetails.value,
  //     [name]: newValue
  //   });
  // };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={6}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Invoice Payment
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <KeyboardDatePicker
              required
              fullWidth
              disabled
              clearable
              label="CURRENT DATE"
              name="currentDate"
              // value={values.contractValidity}
              onChange={(date) => {
                handleChange(date, 'currentDate');
              }}
              minDate={new Date()}
              format="MM/dd/yyyy"
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              id="free-solo-demo"
              currency
              name={'PaymentMethod'}
              options={[
                { name: 'Cheque', code: 'Cheque' },
                { name: 'Cash', code: 'Cash' }
              ]}
              getOptionLabel={(option) => option.code}
              getOptionSelected={(option) => option.code}
              onSelect={(e) => {
                handleChange(e.target.value, 'method');
              }}
              error={!!errors?.method}
              helperText={_.get(errors, 'method', '')}
              renderInput={(params) => (
                <TextField {...params} label="Payment Method" required />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Amount "
              name="Amount"
              required
              disabled
              value={_.get(invoicedetails, 'invoiceAmount', '')}
              onChange={(e) => handleChange(e.target.value, 'Amount')}
            />
          </Grid>
        </Grid>
        <Box py={4}>
          <Box mb={4}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Typography variant="subtitle1">Description</Typography>
              </Grid>
              {/* <Grid item>
              <Typography variant="subtitle2">Your description here</Typography>
            </Grid> */}
            </Grid>
          </Box>

          <Grid container xs={12}>
            <TextField
              fullWidth
              name="desc"
              required
              label={'Your description here'}
              error={!!errors?.remarks}
              helperText={_.get(errors, 'remarks ', '')}
              onChange={(e) => handleChange(e.target.value, 'remarks')}
            />
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.common.white
  },
  button: {
    boxShadow: 'none',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      backgroundColor: theme.palette.success.light
    }
  }
}));

// export default CompanyDetails;

export default connect((state) => ({
  leadsState: state.leads
}))(InvoicePaymentDetails);
