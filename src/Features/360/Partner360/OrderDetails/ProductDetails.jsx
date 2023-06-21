import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import _ from 'lodash';

import dayjs from 'dayjs';

import getfieldData from 'Factory/Partner';
import ProductIcon from 'Assets/Icons/ProductNewIcon.svg';
import { useStateful } from 'react-hanger';
const ProductDetails = ({
  values,
  Productdetails,
  paymentDatails,
  CompleteOrder,
  status
}) => {
  const classes = useStyles();
  const details = useStateful({});
  React.useEffect(() => {
    if (Productdetails) {
      details.setValue(Productdetails);
    }
  }, [Productdetails]);
  return (
    <Paper elevation={0} className={classes.border}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <img src={ProductIcon} />
            </Grid>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Product Details
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={classes.border}>
        <Box py={6} px={6}>
          <Grid container spacing={4}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item direction={'column'}>
                <Grid item>
                  <Typography variant="h5" className={classes.title}>
                    {details.value?.productName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {' '}
                    {/* {data.value.name} */}
                    {details.value?.lob} - {details.value?.technology}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={6}>
                  <Grid item direction={'column'}>
                    <Grid item>
                      <Typography variant="h5" className={classes.title}>
                        Product ID: {details.value?.productId}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {/* <Typography variant="subt">Contract : 1 Year</Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box py={6} px={6}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              {/* <Typography variant="h6" className={classes.title}>
                Pending for Provisioning
              </Typography> */}
            </Grid>
          </Grid>
        </Box>

        <Grid container direction="row" xs={12}>
          <Grid item xs={6}>
            {/* <OrderStepper /> */}
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end" direction="row" spacing={3}>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Grid>
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

          <Grid container spacing={4}>
            {!_.isEmpty(details.value?.productData) && (
              <>
                {details.value?.productData &&
                  Object.keys(
                    details.value?.productData?.AddProduct?.ProductDetails
                  ).map((item) => {
                    return (
                      <Grid item xs={4}>
                        <Grid container direction="column">
                          <Grid item>
                            {/* <Typography variant="subtitle2">{details.value?.productData?.AddProduct?.ProductDetails}</Typography> */}
                            <Typography variant="subtitle1">
                              {' '}
                              {getfieldData.removeUnderScore(item)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              {/* {
                            details.value?.productData?.AddProduct
                              ?.ProductDetails[item]
                          } */}
                              {item === 'AVAILABLE_FROM' ||
                              item === 'AVAILABLE_TO' ||
                              item === 'createdDate' ? (
                                <>
                                  {dayjs(
                                    details.value?.productData?.AddProduct
                                      ?.ProductDetails[item]
                                  ).format('DD MMM YYYY')}
                                </>
                              ) : (
                                details.value?.productData?.AddProduct
                                  ?.ProductDetails[item]
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
              </>
            )}
            <>
              {!_.isEmpty(details.value?.sublist) &&
                Object.keys(details.value.sublist).map((item) => {
                  return (
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="subtitle1">{item}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">
                            {details.value.sublist[item]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
            </>
          </Grid>
        </Box>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Payment Details
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box py={6} px={8}>
            <Grid container spacing={4}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item direction={'column'}>
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      Unpaid amount
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={6}>
                    <Grid item direction={'column'}>
                      <Grid item>
                        <Typography variant="h5" className={classes.title}>
                        {_.get(paymentDatails, 'currency', '00')} {_.get(paymentDatails, 'unpaidAmount', '00')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box py={4} px={8}>
            <Grid container spacing={4}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item direction={'column'}>
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      PaidAmount
                    </Typography>
                  </Grid>
                  <Grid item>
                    {/* <Typography variant="subtitle2">
                    
                      Invoice date
                    </Typography> */}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={6}>
                    <Grid item direction={'column'}>
                      <Grid item>
                        <Typography variant="h5" className={classes.title}>
                        {_.get(paymentDatails, 'currency', '00')} {_.get(paymentDatails, 'paidAmount', '00')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {/* {dayjs(paymentDatails?.invoiceDate).format(
                            'DD MMM YYYY'
                          )} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2',
    borderRadius: '10px'
  },
  Box: {
    backgroundColor: '#F4F6F8',
    height: '6rem',
    borderRadius: '10px'
  }
}));
export default ProductDetails;
