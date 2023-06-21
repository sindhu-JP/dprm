import React from 'react';
import { Grid, makeStyles, Typography, Chip } from '@material-ui/core';

import { history } from 'Store';

const Header = (props) => {
  const classes = useStyles();

  const handleroute = () => {
    props.onClose();
    history.push({
      pathname: '/digital-prm-web-ui/hierarchy',
      state: {
        partnerId: props?.partnerData?.PartnerDetails?.Partner_ID,
        stepper: false
      }
    });
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm container spacing={1} className={classes.paper}>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Grid item xs={12}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <Typography variant="h4">
                          {props.partnerData.PartnerDetails.PARTNER_NAME}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          className={classes.red}
                          // label={_.get(props?.SubOpportunity, "status", "")}
                          label={
                            props.partnerData.PartnerDetails.Onboarding_Status
                          }
                          size={'small'}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">|</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                          {props.partnerData.PartnerDetails.PARTNER_SUB_TYPE
                            ? props.partnerData.PartnerDetails.PARTNER_SUB_TYPE
                            : props.partnerData.PartnerDetails.TYPE}
                        </Typography>
                      </Grid>
                      {/* <Grid item>
                        <Typography variant="h6">| </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          className={classes.gray}
                         
                          label="Platinum"
                          size={'small'}
                        />
                      </Grid>

                      <Grid item>
                        <Typography variant="h6">| </Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="h6">VIP </Typography>
                      </Grid> */}
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Typography variant="h6">
                      Partner ID: {props.partnerData.PartnerDetails.Partner_ID}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item className={classes.paper}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleroute}
            >
              Manage Hierarchy
            </Button>
          </Grid> */}
        </Grid>
        {/* <Alert
          open={alertState.open}
          onClose={closeAlert}
          message={alertState.message}
          type={alertState.type}
        /> */}
      </Grid>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  },
  button: {
    background: 'white'
  },

  red: {
    backgroundColor: 'orange',
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  },
  gray: {
    backgroundColor: '#6368a4',
    color: theme.palette.common.white,
    width: '65px',
    borderRadius: '7px'
  },

  tag: {
    position: 'relative',
    bottom: '1.3rem',
    right: '4rem'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  image: {
    width: 128,
    height: 128
  },

  grid1: {
    paddingRight: '40px'
  }
}));

export default Header;
