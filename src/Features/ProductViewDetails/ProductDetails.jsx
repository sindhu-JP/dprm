import React from 'react';
import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const ProductDetails = (props) => {
  const classes = useStyles();
  return (
    <div>
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

          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">PRODUCT ID</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDetails.PRODUCT_ID}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">PRODUCT LOB</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDetails.PRODUCT_LOB}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">PRODUCT NAME</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDetails.PRODUCT_NAME}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">
                    PRODUCT TECHNOLOGY
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDetails.PRODUCT_TECHNOLOGY}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">AVAILABLE_FROM</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDetails.AVAILABLE_FROM}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">AVAILABLE_TO</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDetails.AVAILABLE_TO}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};
export default ProductDetails;
