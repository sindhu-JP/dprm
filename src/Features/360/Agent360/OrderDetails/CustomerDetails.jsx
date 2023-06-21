import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import User from 'Assets/Icons/User-Profile-Img.svg';

const CustomerDetails = ({
  values,
  Details,
  Address,
  AccountOwnerDetails,
  engagedPartyObj
}) => {
  const classes = useStyles();
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <img src={User} />
            </Grid>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Customer Details
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">CUSTOMER ID</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{engagedPartyObj?.id}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> CUSTOMER NAME</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{engagedPartyObj?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> MOBILE</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {' '}
                  {AccountOwnerDetails?.mobile}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">EMAIL </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {AccountOwnerDetails?.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">WHATSAPP </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {AccountOwnerDetails?.whatsapp}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">
                  INSTALLATION ADDRESS
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {Address?.formattedAddress}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default CustomerDetails;
