import {
  Box,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import statuses from 'lib/constants/statuses';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  bold: {
    fontWeight: 'bold'
  },
  blue: {
    ackgroundColor: 'blue',
    color: theme.palette.common.white
  }
}));
export default function StatusCard({ DcmStatus }) {
  const classes = useStyles();

  const getStatusColor = (lead) => {
    return statuses.statuses[lead?.SubStatus]?.color || 'orange';
  };

  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Chip
                  className={classes[getStatusColor(DcmStatus)]}
                  label={_.get(DcmStatus, 'SubStatus', '')}
                />
              </Grid>

              <Grid item>
                <Typography variant="h6">
                  Partner ID: {_.get(DcmStatus, 'PartnerName', '')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" className={classes.bold}>
                  {_.get(DcmStatus, 'id', '')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
