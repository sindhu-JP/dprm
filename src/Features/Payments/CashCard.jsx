import { Grid } from '@material-ui/core';
import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

export default function CashCard() {
  return (
    <div>
      <Paper elevation={0}>
        <Grid
          container
          direction="row"
          display="flex"
          justify={'space-between'}
        >
          <Grid item xs>
            <Grid container direction="row">
              <Grid item>
                <Typography variant={'h6'}>Cash</Typography>
              </Grid>
              <Grid alignItems="center" item>
                <Typography variant="h4" style={{ marginLeft: '200px' }}>
                  GHS 2300.00
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <CloseIcon fontSize="small" style={{ color: 'red' }} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
