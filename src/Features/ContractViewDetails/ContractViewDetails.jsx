import React from 'react';
import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const ContractViewDetails = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Contract Details
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">CONTRACT ID</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.CONTRACT_ID}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">CONTRACT_TYPE</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.CONTRACT_TYPE}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">CONTRACT PERIOD</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.CONTRACT_PERIOD}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">START DATE</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.START_DATE}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">END DATE</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.END_DATE}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">CONTRACT VALIDITY</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.CONTRACT_VALIDITY}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">NOTICE PERIOD</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.NOTICE_PERIOD}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">
                    REVENUE SHARING PERCENTAGE / AMOUNT
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation
                      .REVENUE_SHARING_PERCENTAGE/AMOUNT}
                  </Typography>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">SETTLEMENT MODE</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.SETTLEMENT_MODE}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">DSP COMMISSION</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.contractData.ContractInformation.DSP_COMMISSION}
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

export default ContractViewDetails;
