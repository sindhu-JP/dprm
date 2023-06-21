import { Trans } from '@lingui/react';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { history } from 'Store';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdropBtn: {
    '&.MuiButton-contained': {
      boxShadow: 'none'
    },
    backgroundColor:theme.palette.type === 'dark' ? `${theme.palette.primary.black}!important` :  `${theme.palette.primary.main} !important`,  
    color: theme.palette.type === 'dark' ? `${theme.palette.common.white}!important` :  `${theme.palette.primary.black} !important`,    
    '&:hover':{
      color:theme.palette.common.white,
      backgroundColor: theme.palette.type === 'dark' ? `#E0E0E0 !important` :  ``
    },
  
  },
  cardStyles:{
    paddingTop:'18px',
    paddingBottom:'52px'
  }
}));
export default function FrequentlyUsedLinks() {
  //  const Buttons=["Log Ticket", "Change Commission Rule", "Bill Adjustment"]  
// #7f7f7f
  const classes = useStyles();
  const dynamicButtons = [
    {
      name: <Trans id="Settlement Rule Creation"></Trans>,
      code: 'SettlementRuleCreation',
      url: 'settlementRule'
    },
    {
      name: <Trans id="Commission Rule Creation"></Trans>,
      code: 'CommissionRuleCreation',
      url: 'commissionRule'
    }
    // { name: 'Bill Adjustment', code: 'BillAdjustment' }
  ];

  return (
    <div>
      {' '}
      <Paper elevation={0}>
        <Box>
          <Grid container direction="column" spacing={4} className={classes.cardStyles}>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <Box pl={2} py={4}>
                        <Typography variant="h2">
                          <Trans id="Frequently Used Links"></Trans>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Box py={2}>
                <Grid container direction="row" spacing={4}>
                  {dynamicButtons.map((item) => {
                    return (
                      <Grid item>
                        <Button
                          variant="contained"
                          className={classes.backdropBtn}
                          onClick={() =>
                            history.push(`/digital-prm-web-ui/${item.url}`)
                          }
                        >
                          {item.name}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
