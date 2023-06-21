import React from 'react';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
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
const UploadDocuments = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Upload Documents
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid container direction="row">
              <Grid item>
                <Box
                  className={classes.root}
                  style={{ border: `1px solid #e2e2e2` }}
                >
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <Box className={classes.inputWrapper}>
                        <Grid container direction="column" spacing={10} mt={15}>
                          <Grid item>
                            <ControlPointIcon
                              style={{ fontSize: '4rem' }}
                              color={'primary'}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default UploadDocuments;
