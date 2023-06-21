import React from 'react';
import UIDUtil from 'lib/utils/uid';
import {
  Paper,
  Grid,
  Button,
  Box,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const AddAditionalContact = ({ showContactForm }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h2" className={classes.title}>
              Add Another Contact
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => showContactForm(UIDUtil.generateUnsafeUID())}
              variant="outlined"
              color="primary"
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddAditionalContact;
