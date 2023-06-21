import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '15px',
    fontWeight: 600
  }
}));

export default function ContractDetails({ context }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography className={classes.heading}>
              {context.details?.columns?.Productname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.heading}>
              {context.details?.columns?.ProductID}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            LOB -{' '}
            {context.details?.rowlist?.AddProduct?.ProductDetails?.PRODUCT_LOB}
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}
