import React from 'react';
import { Table } from 'lib/components';
import { Paper, Grid, Box, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  charges: {
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    '& > div': {
      borderBottom: `1px solid ${theme.palette.grey[300]}`
    },
    '& > div:last-child': {
      borderBottom: `none`
    }
  },
  orangeText: {
    color: theme.palette.common.gold,
    fontWeight: theme.typography.fontWeightMedium
  },
  purpleText: {
    color: theme.palette.common.vividTangerine,
    fontWeight: theme.typography.fontWeightMedium
  }
}));
const QuoteBreakdown = ({ title, charges, table }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <Box mb={6}>
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
      </Box>

      <Box className={classes.charges}>
        <Box p={6}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography className={classes.orangeText} variant="h3">
                Upfront Charges
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Typography variant="">( Exclusive of Tax )</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" className={classes.orangeText}>
                    ${charges.upfront}.00
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box p={6}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography className={classes.purpleText} variant="h3">
                Recurring Charges
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                spacing={2}
              >
                <Grid item>
                  <Typography variant="">( Exclusive of Tax )</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" className={classes.purpleText}>
                    ${charges.recurring}.00
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box pt={6}>
        <Typography className={classes.title} variant="h6">
          Summary
        </Typography>
      </Box>

      <Table data={table} />
    </Paper>
  );
};

QuoteBreakdown.defaultProps = {
  title: 'Service of Interests'
};
QuoteBreakdown.propTypes = {};
export default QuoteBreakdown;
