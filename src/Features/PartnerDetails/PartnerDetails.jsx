import React from 'react';
import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const PartnerDetails = (props) => {
  const classes = useStyles();
  return (
    <div>
      {(() => {
        if (props.partnerData !== 'undefined') {
          return (
            <Paper elevation={0}>
              <Box p={4}>
                <Box mb={4}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item>
                      <Typography variant="h2" className={classes.title}>
                        Partner Details
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">
                          PARTNER NAME
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {props.details.PARTNER_NAME}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">
                          Registration Number
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {props.details.PARTNER_REGISTRATION_NUMBER}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">
                          PARTNER TYPE
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {props.details.PARTNER_TYPE}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">SUB TYPE</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {props.details.SUB_TYPE}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">
                          INDUSTRY TYPE
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {props.details.INDUSTRY_TYPE}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Box mb={4}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item>
                      <Typography variant="h4" className={classes.title}>
                        Optional Details
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">SOURCE</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {props.details.SOURCE}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Box mt={6}>
            <Grid container justify="center">
              <Button
                size="large"
                color="primary"
                onClick={optionalSectionExpanded.toggle}
                endIcon={
                  <ExpandMore
                    style={{
                      transform: `rotate(${
                        optionalSectionExpanded.value ? '180deg' : '0'
                      })`
                    }}
                  />
                }
              >
                {optionalSectionExpanded.value
                  ? `Hide Optional Details`
                  : `Show Optional Details`}
              </Button>
            </Grid>
          </Box> */}
              </Box>
            </Paper>
          );
        } else {
          return <div></div>;
        }
      })()}
    </div>
  );
};

export default PartnerDetails;
