import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import PricingDetails from './PricingDetails';
import ProductDescription from './ProductDescription';
import ProductDetails from './ProductDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '2rem',
    paddingLeft: '2rem'
  },
  heading: {
    fontSize: '15px',
    fontWeight: 600
  },
  aa: {
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }
}));
const ProductViewDetails = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Grid item className={classes.aa}>
        <PricingDetails pricingData={props.productData.PricingDetails} />
      </Grid>
      <Grid item className={classes.aa}>
        <ProductDescription
          productDesp={props.productData.ProductDescription}
        />
      </Grid>
      <Grid item className={classes.aa}>
        <ProductDetails productDetails={props.productData.ProductDetails} />
      </Grid>
    </div>
  );
};
export default ProductViewDetails;
