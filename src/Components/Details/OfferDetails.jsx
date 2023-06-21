import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';
import _ from 'lodash';
import ProductDetails from './ProductDetails';
const OfferDetails = ({
  values,
  modalcontext,
  InvoicePreviewDetails,
  orderRowdetails,
  OrderProductlist,
  orderPayload,
  balance
}) => {
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
                Product Details
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container direction="column" spacing={3}>
          {OrderProductlist.map((product) => {
            return (
              <Grid item>
                <ProductDetails
                  InvoicePreviewDetails={InvoicePreviewDetails}
                  orderRowdetails={orderRowdetails}
                  product={product}
                  balance={balance}
                />
              </Grid>
            );
          })}
        </Grid>

        <Box py={4}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h2">Invoice Summary</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box py={4}>
          {/* <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">
                {_.get(InvoicePreviewDetails?.productData, 'productName', '')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                MUR{' '}
                {_.get(
                  InvoicePreviewDetails?.productData,
                  'TotalAmount',
                  '00.00'
                )}
              </Typography>
            </Grid>
          </Grid> */}

          {/* <Divider /> */}
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">Sub Total</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
              {balance?.currency} {' '} {_.get(orderPayload, 'payableAmount', '00.00')}
              </Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">
                Billing Adjustments (Credit)
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
              {balance?.currency} {' '} {_.get(orderPayload, 'billingAdjustmentAmount', '00.00')}
              </Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">Fee</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {_.get(orderPayload, 'fee', '00.00')}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">
                Tax {_.get(orderPayload, 'taxPercentage', '0')}%
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {_.get(orderPayload, 'taxAmount', '0')}%
              </Typography>
            </Grid>
          </Grid>

          <Divider />
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">Total Amount Due</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                style={{
                  color:
                    Math.sign(_.get(orderPayload, 'invoiceAmount', '00')) === -1
                      ? 'red'
                      : '',
                  fontWeight: 'bold'
                }}
              >
                {balance?.currency}{' '}
                {_.round(orderPayload?.invoiceAmount, 2) -
                  orderPayload?.taxAmount}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default OfferDetails;
