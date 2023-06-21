import { Checkbox, Grid, makeStyles } from '@material-ui/core';
import { Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: theme.palette.background.main,
    margin: 'auto',
    width: '70vw'
  },
  title: {
    fontWeight: 'bold'
  }
}));
export default function CashDetailsCurd() {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Grid container direction="row" display="flex">
          <Grid item xs>
            <Grid container direction="row" spacing={4}>
              <Grid item alignItems="center">
                <Checkbox color="primary" />
              </Grid>

              <Grid item xs>
                <Grid container direction="column">
                  <Grid alignItems="center" item>
                    <Typography variant="subtitle2">Mobile Money</Typography>
                  </Grid>
                  <Grid alignItems="center" item>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                      GHS 2300.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
