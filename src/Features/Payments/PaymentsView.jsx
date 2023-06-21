import { Grid, Paper } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import CashDetails from './CashDetails';

export default function PaymentsView({
  currencydata,
  AmountDetails,
  addpayment,
  handleaddPayment,
  balance,
  loading,
  onBoardingStatus,
  selectedCard,
  handlePaymentTypeSelected,
  Comments,
  SetbtnDisableVal
}) {
  const calculateAmount = (balance) => {
    if (
      balance?.ONE_TIME_CHARGES >= 0 ||
      parseInt(balance.SECURITY_DEPOSIT) >= 0
    ) {
      if (balance.SECURITY_DEPOSIT === '') {
        balance.SECURITY_DEPOSIT = +balance.SECURITY_DEPOSIT + 0;
        return balance.ONE_TIME_CHARGES + balance.SECURITY_DEPOSIT;
      }
      return balance.ONE_TIME_CHARGES + parseInt(balance.SECURITY_DEPOSIT);
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Box px={15} className={classes.container}>
        <Box py={4}>
          <Paper>
            <Grid
              container
              direction="row"
              justify="space-between"
              // style={{ width: '70%', marginLeft: '10%' }}
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  spacing={10}
                >
                  <Grid item>
                    <Grid container direction="row">
                      <Grid container direction="row" spacing={2}>
                        <Grid item></Grid>
                        <Grid item>
                          {/* <Typography item color="primary">
                          Proforma Invoice
                        </Typography> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container direction="row">
                      <Grid container direction="row" spacing={2}>
                        <Grid item>
                          <AccountBalanceWalletIcon />
                        </Grid>
                        <Grid item>
                          <Typography item>Remaining Payable Amount</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container direction="row">
                      <Grid container direction="row" spacing={2}>
                        <Typography item variant="h4">
                          {balance?.CURRENCY}: {calculateAmount(balance)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Grid container direction="column" spacing={6}>
          {/* <Grid item>
            <CashCard />
          </Grid>
          <Grid item>
            <CashDetailsCurd
           
            />
          </Grid> */}
          <Grid item>
            <CashDetails
              AmountDetails={AmountDetails}
              currencydata={currencydata}
              addpayment={addpayment}
              loading={loading}
              balance={balance}
              onBoardingStatus={onBoardingStatus}
              handleaddPayment={handleaddPayment}
              SetbtnDisableVal={SetbtnDisableVal}
              selectedCard={selectedCard}
              payabaleAmount={
                balance?.ONE_TIME_CHARGES + parseInt(balance.SECURITY_DEPOSIT)
              }
              handlePaymentTypeSelected={handlePaymentTypeSelected}
              Comments={Comments}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    // // height: '95vh',
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: theme.palette.background.main,
    margin: 'auto',
    width: '70vw'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
