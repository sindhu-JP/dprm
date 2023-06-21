import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';

import partnerFactory from 'Factory/Partner';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2'
  },
  root: {
    width: theme.spacing(65),
    minHeight: '13rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    maxHeight: '25rem'
  },
  image: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden'
  }
}));
const SettlementRule = ({ maintitle, settlementRuleDetails }) => {
  const classes = useStyles();
  const rangeLabels = ['RangeFrom', 'RangeTo', 'Amount'];
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                {maintitle}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4}>
          {settlementRuleDetails.map((item) => {
            return (
              <>
                {Object.keys(item).map((field) => {
                  return (
                    <>
                      {field === 'settlementCycle' ? (
                        <Grid item xs={4}>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="subtitle2">
                                {partnerFactory.removeUnderScore(field)}
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                variant="subtitle1"
                                style={{ wordBreak: 'break-word' }}
                              >
                                {item[field].map((item) => {
                                  return (
                                    <>
                                      {item.from} - {item.to}
                                    </>
                                  );
                                })}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : field === 'path' ? (
                        <></>
                      ) : field === 'href' ? (
                        <></>
                      ) : field === '@baseType' ? (
                        <></>
                      ) : field === '@schemaLocation' ? (
                        <></>
                      ) : (
                        <Grid item xs={4}>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="subtitle2">
                                {partnerFactory.removeUnderScore(field)}
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                variant="subtitle1"
                                style={{ wordBreak: 'break-word' }}
                              >
                                {field === 'createdDate' ? (
                                  <>
                                    {dayjs(item[field]).format('DD MMM YYYY')}
                                  </>
                                ) : (
                                  item[field]
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </Grid>
      </Box>
    </Paper>
  );
};

export default SettlementRule;
