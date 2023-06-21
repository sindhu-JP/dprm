import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const CustomerDetails = ({ values }) => {
  const FetchParnterlist = (data) => {
    let temp = { ...data };
    return _.omit(temp, [
      'LOGIN_TYPE',
      'href',
      'Wallet_ID',
      'Partner_ID',
      'ROLE',
      'TENANT_ID',
      'My_Task',
      'Contract_Added',
      'PRODUCT_ID',
      'Onboarding_Status',
      'path',
      // 'commissionRuleRange',
      '@schemaLocation',
      '@baseType',
      'status',
      'SAME_AS_MASTER_CONTACT_DETAILS',
      'SAME_AS_MASTER'
    ]);
  };

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2">Partner Details</Typography>
        </Box>

        <Grid container spacing={4}>
          {Object.keys(
            FetchParnterlist(
              values?.details?.PartnerProfileCreation?.PartnerDetails
            )
          ).map((item, i) => (
            <>
              <Grid item xs={4} key={i}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">
                      {item.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {
                        values?.details?.PartnerProfileCreation?.PartnerDetails[
                          item
                        ]
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default CustomerDetails;
