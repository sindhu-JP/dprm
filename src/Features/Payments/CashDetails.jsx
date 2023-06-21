import { Box, makeStyles, Paper, CircularProgress } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { ArrowForward } from '@material-ui/icons';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useStateful } from 'react-hanger';
import ChequeCardDetails from './ChequeCardDetails';
const useStyles = makeStyles((theme) => ({
  outerdiv: {
    backgroundColor: theme.palette.background.main
  },
  profile: {
    margin: 10
  },
  field: {
    width: 'calc(10vw)',
    minWidth: '50px',
    maxWidth: '100px',
    marginLeft: '16px',
    marginRight: '16px',
    marginBottom: '16px'
  },
  paymentbox: {
    marginTop: '20px'
  },
  back: {
    backgroundColor: theme.palette.background.highlight,
    paddingLeft: 0,
    paddingRight: 0
  },
  root: {
    '&$selected': {
      backgroundColor: theme.palette.background.highlight,
      borderLeft: '5px solid #1400C8',
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        borderLeft: '5px solid #1400C8'
      }
    }
  },
  button: {
    boxShadow: 'none',
    // backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      // backgroundColor: theme.palette.success.light
    }
  },

  info: {
    marginLeft: '50px'
  },

  selected: {}
}));

export default function CashDetails({
  currencydata,
  AmountDetails,
  addpayment,
  handleaddPayment,
  loading,
  onBoardingStatus,
  balance,
  selectedCard,
  handlePaymentTypeSelected,
  payabaleAmount,
  Comments,
  SetbtnDisableVal
}) {
  const [paymentState, setPaymentState] = React.useState(false);
  const [comment, setComment] = React.useState('');


  const defaultProps = {};
  const classes = useStyles();
  const WalletItems = useStateful({
    label: 'Cheque',
    name: 'Cheque',
    Icon: <InboxIcon />
  });

  const handleChange = (event, newValue, name) => {
    if (AmountDetails)
      AmountDetails.setValue({
        ...AmountDetails.value,
        [name]: newValue
      });
  };
  React.useEffect(() => {
    AmountDetails.setValue({
      ...AmountDetails.value,
      amount: balance?.ONE_TIME_CHARGES + parseInt(balance.SECURITY_DEPOSIT)
    });
  }, [balance]);

  React.useEffect(() => {
    if (paymentState) {
      SetbtnDisableVal(false);
    } else {
      SetbtnDisableVal(true);
    }
  }, [paymentState]);

  const calculateAmount = (balance) => {
    if (
      balance?.ONE_TIME_CHARGES >= 0 ||
      parseInt(balance.SECURITY_DEPOSIT) >= 0
    ) {
      if (balance.SECURITY_DEPOSIT === '') {
        balance.SECURITY_DEPOSIT = +balance.SECURITY_DEPOSIT + 0;
        return balance.ONE_TIME_CHARGES + balance.SECURITY_DEPOSIT;
      }
      if (balance.ONE_TIME_CHARGES === '') {
        balance.ONE_TIME_CHARGES = +balance.ONE_TIME_CHARGES + 0;
        return balance.ONE_TIME_CHARGES + parseInt(balance.SECURITY_DEPOSIT);
      }
      return balance.ONE_TIME_CHARGES + parseInt(balance.SECURITY_DEPOSIT);
    }
  };

  const paymentTypesArr = [
    { label: 'Cheque', name: 'Cheque', Icon: <InboxIcon /> },
    { label: 'Cash', name: 'Cash', Icon: <InboxIcon /> },
    {
      label: 'Digital Wallet',
      name: 'Digital Wallet',
      Icon: <AccountBalanceWalletIcon />
    }
  ];
  return (
    <div>
      <Grid container direction="row" xs={12} spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ height: '25rem' }} elevation={0}>
            {paymentTypesArr.map((listItem, index) => {
              return (
                <ListItem
                  button
                  selected={index === selectedCard ? true : false}
                  classes={{ root: classes.root, selected: classes.selected }}
                  onClick={() => {
                    handlePaymentTypeSelected(listItem, index),
                      WalletItems.setValue(listItem);
                  }}
                >
                  <ListItemIcon>{listItem.Icon}</ListItemIcon>
                  <ListItemText primary={listItem.label} />
                </ListItem>
              );
            })}
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper style={{ height: '25rem', overflowY: 'auto' }} elevation={0}>
            {_.includes(['Cash', 'Digital Wallet'], WalletItems.value.name) && (
              <Box px={4} py={3}>
                <Grid container direction="row" spacing={10}>
                  <Grid item>
                    <Autocomplete
                      options={currencydata}
                      getOptionLabel={(option) => option.code}
                      getOptionSelected={(option) => option.code}
                      disabled={true}
                      defaultValue={{ code: balance?.CURRENCY }}
                      onSelect={(e) => {
                        handleChange(e, e.target.value, 'currencyType');
                      }}
                      id="auto-complete"
                      autoComplete
                      includeInputInList
                      style={{ width: '123%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="currencyType"
                          //   margin="normal"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item style={{ paddingLeft: '35px' }}>
                    <Grid item>
                      <TextField
                        // error={true}
                        label="Payable Amount"
                        fullWidth
                        type="number"
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={calculateAmount(balance)}
                        disabled={true}
                        // onChange={(e) =>
                        //   handleChange(e, e.target.value, 'amount')
                        // }
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={10}>
                  <Grid item>
                    <Grid item>
                      <TextField
                        // error={true}

                        label="Comments"
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                        required
                        value={Comments.value}
                        onChange={(e) => Comments.setValue(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item style={{ marginTop: '130px', marginBottom: '40px' }}>
                  {onBoardingStatus === 'ACTIVE' ? (
                    <></>
                  ) : (
                    <Button
                      size="large"
                      variant="contained"
                      endIcon={!loading ? <ArrowForward /> : null}
                      className={classes.button}
                      color="primary"
                      disabled={loading || paymentState}
                      onClick={() => {
                        setComment('');
                        setPaymentState(true);
                        handleaddPayment();
                      }}
                    >
                      {loading ? (
                        <CircularProgress
                          size={25}
                          style={{ color: 'green' }}
                        />
                      ) : loading ? (
                        'Add Payment...'
                      ) : (
                        'Add Payment'
                      )}
                    </Button>
                  )}
                </Grid>
              </Box>
            )}

            {WalletItems.value.name === 'Cheque' && (
              <Box px={4} py={3}>
                <ChequeCardDetails
                  payabaleAmount={payabaleAmount}
                  Comments={Comments}
                />

                <Grid item style={{ marginTop: '30px' }}>
                  {onBoardingStatus === 'ACTIVE' ? (
                    <></>
                  ) : (
                    <Button
                      size="large"
                      variant="contained"
                      endIcon={!loading ? <ArrowForward /> : null}
                      className={classes.button}
                      color="primary"
                      disabled={loading}
                      onClick={() => handleaddPayment()}
                    >
                      {loading ? (
                        <CircularProgress
                          size={25}
                          style={{ color: 'green' }}
                        />
                      ) : loading ? (
                        'Add Payment...'
                      ) : (
                        'Add Payment'
                      )}
                    </Button>
                  )}
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>

        {}
      </Grid>
    </div>
  );
}
