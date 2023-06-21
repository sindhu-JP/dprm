import React from 'react';
import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const ProductDescription = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Product Description
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">DESCRIPTION</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.productDesp.DESCRIPTION}
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
export default ProductDescription;
