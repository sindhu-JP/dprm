import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  makeStyles,
  Box,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const RelationshipManager = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Partner Relationship Manager
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">NAME</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {
                      props.primaryContactDetails.PartnerRelationshipManager
                        .NAME
                    }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">EMAIL</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {
                      props.primaryContactDetails.PartnerRelationshipManager
                        .MANAGER_EMAIL
                    }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">MOBILE NUMBER</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {
                      props.primaryContactDetails.PartnerRelationshipManager
                        .MOBILE_NUMBER
                    }
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

export default RelationshipManager;
