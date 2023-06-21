import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const LeadAssignment = ({ values }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            {/* <Grid item>
              <img src={User} />
            </Grid> */}
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Lead Assignment
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          {Object.keys(values).map((item, i) => (
            <>
              <Grid item xs={4} key={i}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">
                      {item.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{values[item]}</Typography>
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

export default LeadAssignment;
