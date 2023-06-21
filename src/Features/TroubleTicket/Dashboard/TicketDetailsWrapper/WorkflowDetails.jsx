import React from 'react';
// import { useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
// import LeadUtils from 'lib/utils/lead';
// import { useStateful } from 'react-hanger';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const Workflowdetails = ({ values }) => {
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2">
          Provisioning
          </Typography>
        </Box>
        <Grid container spacing={4}>
        </Grid>
      </Box>
    </Paper>
  );
};
export default Workflowdetails;
