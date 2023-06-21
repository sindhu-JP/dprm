import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import getfieldData from 'Factory/Partner';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function ProductDetails({ productDetails }) {
  const classes = useStyles();

  const removeKeys = (data) => {
    return _.omit(data, [
      'Dcm_Status',
      'Description',
      'Contract_Added',
      'Contract_ID',
      'Contract_Added',
      'Dcm_Product_Configured'
    ]);
  };
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4} py={4}>
            <Typography variant="h2" className={classes.title}>
              Product Information
            </Typography>
          </Box>

          <Box mb={4} py={3}>
            <Typography variant="h4" className={classes.title}>
              Product Details
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {productDetails?.products &&
              Object.keys(
                removeKeys(productDetails?.products?.AddProduct?.ProductDetails)
              ).map((item) => {
                return (
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="body1">
                          {' '}
                          {getfieldData.removeUnderScore(item)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {item === 'AVAILABLE_FROM' ||
                          item === 'AVAILABLE_TO' ||
                          item === 'createdDate' ? (
                            <>
                              {dayjs(
                                productDetails?.products?.AddProduct
                                  ?.ProductDetails[item]
                              ).format('DD MMM YYYY')}
                            </>
                          ) : (
                            productDetails?.products?.AddProduct
                              ?.ProductDetails[item]
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>

          <Box mb={4} py={3}>
            <Typography variant="h4" className={classes.title}>
              Pricing Details
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {productDetails?.products &&
              Object.keys(
                productDetails?.products?.AddProduct?.PricingDetails
              ).map((item) => {
                return (
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="body1">
                          {' '}
                          {getfieldData.removeUnderScore(item)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {
                            productDetails?.products?.AddProduct
                              ?.PricingDetails[item]
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
