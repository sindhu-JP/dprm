import React from 'react';
import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const BillingDetails = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Billing Details
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">BILLING NAME</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.billingData.BILLING_NAME}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">
                    BILL PREFERED LANGUAGE
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.billingData.BILL_PREFERRED_LANGUAGE}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">BILL CURRENCY</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.billingData.BILL_CURRENCY}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">PERIODICITY</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.billingData.PERIODICITY}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">BILL CYCLE</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">EMPTY</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">BILLING REGION</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {props.billingData.BILLING_REGION}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default BillingDetails;
