import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle2Changes: {
    textTransform: 'uppercase',
    '&.MuiTypography-subtitle2': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.primary.black} !important`
          : `#777777 !important`
    }
  },
  borderOne:{
    border: `1px solid #e2e2e2`,
    borderRadius: "16px",
    padding:'20px'
  },
  box:{
    padding:'20px !important'
  },
}));
const BillingAdjustmentDetails = ({ BillingAdjustment }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0}>
       <Box className={classes.box}> 
      <Box p={4}  className={classes.borderOne}>
        <Box mb={4} >
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                ADJUSTMENT DETAILS
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  ADJUSTMENT ID
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'id', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  {' '}
                  INVOICE ID
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'invoiceId', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  {' '}
                  PARTNER ID
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'partnerId', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  {' '}
                  ADJUSTMENT AMOUNT
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  KWD {_.get(BillingAdjustment, 'adjustmentAmount', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  ADJUSTMENT TYPE
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'adjustmentType', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  WALLET ID
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'walletId', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  status
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'status', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={classes.subtitle2Changes}
                >
                  DESCRIPTION
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(BillingAdjustment, 'description', '--')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Paper>
  );
};

export default BillingAdjustmentDetails;
