import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import _ from 'lodash';
// import ProductCard from 'Features/OpportunityCreation/ProductsCard';
import { ReactComponent as Interaction } from 'Assets/Icons/Interaction.svg';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import dayjs from 'dayjs';

const VasHistory = ({ productIdentifier, customerDetails, plan }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      style={{
        minHeight: '50rem',
        maxHeight: '200px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <Box py={2} px={4}>
        <Grid container direction="column" spacing={6} justify="center">
          <Grid item>
            <Grid container direction="row" spacing={4} alignItems="center">
              <Grid item>
                <Interaction />
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {plan === 'CHANGE_PLAN' ? 'Change Plan' : 'VAS History'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            {customerDetails &&
              customerDetails?.opportunities?.map((item) => {
                if (
                  item.serviceRequestType === 'CHANGE_PLAN' ||
                  item.serviceRequestType === 'ADD_VAS'
                ) {
                  return (
                    <>
                      {' '}
                      <Grid container>
                        <Grid item>
                          <div className={classes.seperat}></div>
                          <Grid container direction="row" spacing={6}>
                            <Grid item>
                              <AccountCircleOutlinedIcon
                                className={classes.sequence}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1">
                                {' '}
                                {dayjs(customerDetails.modifiedDate).format(
                                  'DD MMM YYYY'
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                          <div className={classes.seperatorv1}></div>
                        </Grid>

                        <Grid item></Grid>
                        <Grid item>
                          <Box
                            style={{
                              backgroundColor: '#f3f4f9',
                              height: '170px',
                              width: '300px',
                              marginLeft: '-6rem',
                              marginTop: '4rem',
                              borderRadius: '10px'
                            }}
                          >
                            <Box px={8} py={6}>
                              <Grid container direction="column" spacing={1}>
                                <Grid item>
                                  <Typography
                                    variant="h6"
                                    className={classes.title}
                                  >
                                    {' '}
                                    {_.get(item.products, '[0].name', '')}
                                  </Typography>
                                </Grid>
                                {/* <Grid item>
                        <Typography variant="subtitle1"> {customerDetails?.primaryContactDetails?.name}</Typography>
                      </Grid> */}
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Request ID: {item?.id}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Subscription ID:
                                    {_.get(
                                      productIdentifier,
                                      'productIdentifier',
                                      ''
                                    )}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    User :{' '}
                                    {_.get(
                                      customerDetails.channel,
                                      '[0].id',
                                      ''
                                    )}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  );
                }
              })}

            {/* </Grid> */}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  },

  sequence: {
    height: '30px',
    width: '30px',
    opacity: 1,
    textAlign: 'center'
  },
  root: {
    width: theme.spacing(65),
    minHeight: '18rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    maxHeight: '25rem'
  },
  embedded: {
    display: 'block',
    width: '100%',
    height: '100'
  },
  closeIcon: {
    width: theme.spacing(8),
    cursor: 'pointer',
    color: theme.palette.text.primary
  },
  button: {
    backgroundColor: theme.palette.common.white
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  selectText: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1)
  },

  seperatorv1: {
    width: ' 0.01rem',
    height: '150px',
    backgroundColor: '#e6e9f7',
    opacity: '1',
    marginLeft: '15px'
  },
  seperat: {
    width: ' 0.01rem',
    height: '20px',
    backgroundColor: '#e6e9f7',
    opacity: '1',
    marginLeft: '15px'
  },
  iconSmall: {
    width: theme.spacing(4),
    color: theme.palette.common.silver,
    '& svg': {
      path: theme.palette.common.silver
    },
    '& path': {
      path: theme.palette.common.silver
    }
  },
  image: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden'
  },

  drawer: {
    backgroundColor: theme.palette.background.main
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(4)
  }
}));
export default VasHistory;
