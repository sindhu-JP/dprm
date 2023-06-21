import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default function OtherSpecification() {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Typography variant="h2" className={classes.title}>
              Other Configurations
            </Typography>
          </Box>

          <Grid container spacing={4}></Grid>
        </Box>
      </Paper>
    </div>
  );
}
