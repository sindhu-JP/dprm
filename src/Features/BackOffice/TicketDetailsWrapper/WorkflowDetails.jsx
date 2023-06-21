import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/react';

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
          {' '}
          <Typography variant="h2">
            <Trans id="Provisioning"></Trans>
          </Typography>
        </Box>

        <Grid container spacing={4}></Grid>
      </Box>
    </Paper>
  );
};

export default Workflowdetails;
