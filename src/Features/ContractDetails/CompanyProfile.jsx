import React from 'react';
import { Paper, Grid, ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CompanyLogo from '../../Assets/Icons/company_1716823.svg';
import { isEmpty } from 'lodash-es';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  image: {
    width: 60,
    height: 60
  },

  grid1: {
    paddingRight: '40px'
  },
  count: {
    fontSize: theme.spacing(7.25),
    fontWeight: theme.typography.fontWeightBold
  }
}));
const CompanyProfile = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img src={CompanyLogo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container spacing={4} className={classes.paper}>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Typography></Typography>
              <Typography variant="h4">
                {props.details.name}- {props.details.id}
              </Typography>
              {!isEmpty(props.rowSignOff) ? (
                <>
                  <Typography>
                    COntract ID -{props?.rowSignOff?.CONTRACT_ID}
                  </Typography>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyProfile;
