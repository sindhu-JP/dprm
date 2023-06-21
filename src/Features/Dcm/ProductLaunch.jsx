import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default function ProductLaunch({ LaunchDCM }) {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Typography variant="h2" className={classes.title}>
              Product Specification
            </Typography>
          </Box>

          <Grid container spacing={4} direction="column">
            <Grid item>
              <Typography variant="subtitle2">
                Please Launch Digital Contract Manager to Configure a Complex
                Product Offering
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => LaunchDCM()}
              >
                Launch DCM
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
