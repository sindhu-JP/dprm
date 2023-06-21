import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import User from 'Assets/Icons/User-Profile-Img.svg';
import dayjs from 'dayjs';

const AgentDetails = ({ values,Details, agentdetails, channelName }) => {
  const localUserName = JSON.parse(localStorage.getItem('USER'));
  const classes = useStyles();
  console.log(agentdetails, Details,'agentdetailsagentdetails')
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
                Agent Details
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">CREATED BY</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {agentdetails?.createdBy}
                </Typography>
                {/* <Typography variant="body1">{localUserName.sub}</Typography> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> DATE & TIME</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dayjs(agentdetails?.date).format('DD MMM YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2"> CHANNEL</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {/* {agentdetails?.cannelName || 'DPRM'} */}
                  {channelName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">REGISTERED AT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {agentdetails?.agentlocation}
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
export default AgentDetails;
