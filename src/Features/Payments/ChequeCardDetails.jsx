import { Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';

export default function ChequeCardDetails({ payabaleAmount, Comments }) {
  return (
    <Grid container direction=" row" xs={12} spacing={8}>
      <Grid item xs={6}>
        <TextField
          label="PAYABLE AMOUNT"
          fullWidth
          required
          disabled
          inputProps={{
            shrink: true
          }}
          value={payabaleAmount}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField label="CHEQUE NUMBER" fullWidth required />
      </Grid>
      <Grid item xs={6}>
        <KeyboardDatePicker
          // clearable
          disableFuture
          required
          format="dd/MM/yyyy"
          // required
          name="fromDate"
          label="FROM DATE"
          // onChange={(date) => onHandleFilterChange(date, 'fromDate')}
          strictCompareDates
        />
      </Grid>
      <Grid item xs={6}>
        <TextField label="BANK NAME" fullWidth required />
      </Grid>
      <Grid item xs={6}>
        <TextField label="BRANCH NAME" fullWidth required />
      </Grid>
      <Grid item xs={6}>
        <TextField
          // error={true}
          value={Comments.value}
          onChange={(e) => Comments.setValue(e.target.value)}
          label="Comments"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          required
        ></TextField>
      </Grid>
    </Grid>
  );
}
