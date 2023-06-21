import React from 'react';
import { Paper, Grid, Typography, Chip, Box } from '@material-ui/core';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  border: {
    border: '1px solid #e2e2e2',
    padding: theme.spacing(2),
    minHeight: '5rem'
  },

  paper: {
    padding: theme.spacing(2),
    minHeight: '5rem'
  },
  image: {
    width: 128,
    height: 128
  },

  grid1: {
    paddingRight: '40px'
  },
  count: {
    fontSize: theme.spacing(7.25),
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    fontWeight: '600'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  }
}));
const ChangeProduct = ({ data, selectsubscription, unselectproduct }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.border} elevation={0}>
      <Box py={5} px={4}>
        <Grid container direction="row" justify="space-between">
          <Grid container direction="row" spacing={4} xs>
            <Grid item>
              <Typography variant="h5" className={classes.title}>
                {_.get(data, 'technology', '')}
              </Typography>
            </Grid>

            <Grid item>
              <Chip
                className={classes.green}
                // label={_.get(props?.SubOpportunity, "status", "")}
                label="Active"
                size={'small'}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Subscription ID:
                {_.get(data, 'publicIdentifier', '')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {/* <Button variant="contained" 
              
              onClick={unselectproduct}
               style={{background:"#a3a3a3", color:"#ffffff"}}
             >
            Plan change from
             </Button> */}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm container spacing={4} className={classes.paper}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <Typography variant="h6">
                    {/* {existingOpp.companyDetails.companyName}{" "} */}

                    {_.get(data, 'LoB', '')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">| </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {_.get(data, 'businessType', '')}{' '}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">| </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {_.get(data, 'billingAccount.name', '')}:{' '}
                    {_.get(data, 'billingAccount.id', '')}{' '}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1">Precondition goes here </Typography>
              </Grid>
            </Grid>

            <Grid item className={classes.paper}>
              {/* <Button variant="contained" color="primary"
              
               onClick={unselectproduct}
              >
               Unselect
              </Button> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ChangeProduct;
