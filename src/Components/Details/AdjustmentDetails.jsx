import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';

import _ from 'lodash';
import dayjs from 'dayjs';
const AdjustmentDetails = ({ values, modalcontext }) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const companyDetails = useStateful({});
  const { details } = modalcontext;

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Adjustment Details
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Adjustment ID</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {/* {companyDetails.value.name} */}
                  {_.get(details, 'rowlist.adjustmentId', '---')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">DATE</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dayjs(details?.rowlist?.createdDate).format('DD MMM YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">CREDIT/DEBIT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(details, 'rowlist.method', '---')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">TOTAL AMOUNT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  KWD {_.get(details, 'rowlist.amount', '00')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">ADJUSTED AMOUNT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  KWD {_.get(details, 'rowlist.depositAmount', '00')}
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>

        {/* <Box py={3}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="subtitle2" className={classes.title}>
                Description
              </Typography>
            </Grid>
          </Grid>
        </Box> */}
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default AdjustmentDetails;
