import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const AdditionalDetails = ({ values }) => {
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2">Additional Details</Typography>
        </Box>

        <Grid container spacing={4}></Grid>
      </Box>
    </Paper>
  );
};

export default AdditionalDetails;
