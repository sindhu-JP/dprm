import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';
import _ from 'lodash';
import dayjs from 'dayjs';
const InvoiceDetails = ({ values, modalcontext, invoicedetails,balance }) => {
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
                Invoice Details
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">INVOICE ID</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {_.get(invoicedetails, 'invoiceId', '')}
                  {/* {companyDetails.value.name} */}
                  {/* {_.get(details, 'rowlist.id', '---')} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">INVOICE DATE</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dayjs(invoicedetails?.createdDate).format('DD MMM YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">DUE DATE</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dayjs(invoicedetails?.dueDate).format('DD MMM YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">BILL CYCLE</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dayjs(invoicedetails?.fromPeriod).format('DD MMM YYYY')}-{' '}
                  {dayjs(invoicedetails?.toPeriod).format('DD MMM YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">AMOUNT TO BE PAID</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{
                    color:
                      Math.sign(
                        _.get(invoicedetails, 'invoiceAmount', '00')
                      ) === -1
                        ? 'red'
                        : '',
                    fontWeight: 'bold'
                  }}
                >
                  {balance?.currency} {' '} {_.get(invoicedetails, 'invoiceAmount', '00')}
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
export default InvoiceDetails;
