import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const SetBandwidth = ({
  values,
  userDetails,
  handleChange,
  activeTasks,
  handlePausedTasks,
  pausedTasks
}) => {
  const classes = useStyles();
  const handleActiveTasks = (e) => {
    handleChange(e);
  };

  const handlePaused = (e) => {
    handlePausedTasks(e);
  };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2" className={classes.title}>
            Set BandWidth
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              required
              // onChange={form.update}
              onChange={(e) => handleActiveTasks(e)}
              name="activeTasks"
              value={activeTasks}
              fullWidth
              label="ACITVE_TASKS"
            />
          </Grid>
          <Grid item xs={4}>
            {/* <TextField
              required
              onChange={handlePaused}
              name="pausedTasks"
              value={pausedTasks}
              fullWidth
              label="PAUSED_TASKS"
            /> */}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SetBandwidth;
