import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';
import _ from 'lodash';
import dayjs from 'dayjs';
const SettlementDetails = ({ values, modalcontext, Settlementedetails, balance }) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const companyDetails = useStateful({});

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Settlement Details
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> INVOICE ID</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(Settlementedetails, 'invoiceId', '')}
                  {/* {companyDetails.value.name} */}
                  {/* {_.get(details, 'rowlist.id', '---')} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> SETTLEMENT ID</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(Settlementedetails, 'settlementId', '')}
                  {/* {companyDetails.value.name} */}
                  {/* {_.get(details, 'rowlist.id', '---')} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> SETTLEMENT DATE</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dayjs(Settlementedetails?.settlementDate).format(
                    'DD MMM YYYY'
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> AMOUNT SETTLED</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{
                    color:
                      Math.sign(
                        _.get(Settlementedetails, 'Settlementedetails', '00')
                      ) === -1
                        ? 'red'
                        : '',
                    fontWeight: 'bold'
                  }}
                >
                  {balance?.currency} {_.get(Settlementedetails, 'settlementAmount', '00.00')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default SettlementDetails;
