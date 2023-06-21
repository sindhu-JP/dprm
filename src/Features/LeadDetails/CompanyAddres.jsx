import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import LeadUtils from 'lib/utils/lead';
import { useStateful } from 'react-hanger';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const CompanyAddres = ({ values }) => {
  const classes = useStyles();
  const masterdata = useSelector((state) => state.master.data);
  const address = useStateful({});

  React.useEffect(() => {
    if (values && masterdata) {
      address.setValue(
        LeadUtils.getPrimaryAddress({
          addressDetails: values,
          masterdata
        })
      );
    }
  }, [values]);

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2" className={classes.title}>
            Company Address
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item>
            <Typography variant="body1">
              {address.value.formattedAddress}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CompanyAddres;
