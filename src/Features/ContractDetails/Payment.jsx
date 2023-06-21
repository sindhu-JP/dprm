import React, { useEffect } from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Badge,
  IconButton,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  InputLabel,
  NativeSelect
} from '@material-ui/core';
import { Stepper } from 'lib/components';

import CreditCardIcon from '@material-ui/icons/CreditCard';
import PrintIcon from '@material-ui/icons/Print';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import { TecnotreedigitalSales } from '../../Http/axios';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
  //   root: {
  //   flexGrow: 1,
  // },
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
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        borderLeft: '2px solid #1400C8'
      }
    }
  },
  selected: {}
}));
const Payment = (props) => {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState([]);
  const [selectedCurrency, setSelectedCurrency] = React.useState('GHS');

  const [amount, setAmount] = React.useState();
  useEffect(() => {
    const getCurrency = async () => {
      await TecnotreedigitalSales.get(`/masterdata?type=currency`)
        .then((resp) => {
          setCurrency(resp.data[0]);
        })
        .catch((error) => {});
    };
    getCurrency();
  }, []);

  let partnerID = props.location.partnerId;
  let data;
  if (Array.isArray(props.location.contractsData)) {
    let filteredElement = props.location.contractsData.map((item) => {
      if (item) {
        return item.CONTRACT_ID;
      }
    });
    data = filteredElement;
  } else {
    data = props.location.contractsData;
  }
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  }))(Badge);

  const ShoppingCart = () => {
    return (
      <Grid container direction="row">
        <Grid item>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Grid>
        <Grid item style={{ marginTop: '10px' }}>
          <Typography>View Cart</Typography>
        </Grid>
        <Grid item style={{ marginLeft: '200px', marginTop: '10px' }}>
          <Typography>One time enrollment fee GHS 2300.00</Typography>
        </Grid>
      </Grid>
    );
  };
  const handleChange = (event) => {
    const name = event.target.value;
    setSelectedCurrency(name);
  };
  const handleAmount = (event) => {
    const amount = event.target.value;
    setAmount(amount);
  };
  const handleClick = () => {
    let payload = {
      paymentType: 'cash',
      amount: parseInt(amount),
      partnerId: partnerID,
      contractIds: data,
      currencyType: selectedCurrency
    };
    TecnotreedigitalSales.post('/payment', payload)
      .then((resp) => {})
      .catch((error) => {});
  };
  return (
    <div className={classes.outerdiv}>
      {/* {console.log('inside return', currency.currency)} */}
      {/* <Navbar /> */}
      <Box
        style={{
          maxHeight: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: '140px'
        }}
      >
        <Grid container direction="column">
          <Grid>
            <Stepper
              activeStep={3}
              footer={true}
              // onClickSaveAndExit={(value) =>
              //   console.log('values in appo cre', value)
              // }
              footerInfo={<ShoppingCart />}
              onClickProceed={handleClick}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: '70%', marginLeft: '10%' }}
          >
            <Grid item>
              <Grid container direction="row">
                <Grid container direction="row">
                  <Grid item>
                    <Typography>
                      <Checkbox />
                      Pay Later
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

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
                      <Grid item>
                        <PrintIcon color="primary" />
                      </Grid>
                      <Typography item color="primary">
                        Proforma Invoice
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="row">
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <AccountBalanceWalletIcon />
                      </Grid>
                      <Typography item>Remaining Payable Amount</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="row">
                    <Grid container direction="row" spacing={2}>
                      <Typography item variant="h4">
                        GHS 00.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Paper
            style={{
              width: '90%',
              marginTop: '20px',
              marginBottom: '20px',
              marginLeft: '5%'
            }}
          >
            <Grid container direction="row" display="flex">
              <Grid item>
                <Typography>Cash</Typography>
              </Grid>
              <Grid alignItems="center" item>
                <Typography variant="h4" style={{ marginLeft: '200px' }}>
                  GHS 2300.00
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* <Paper
            style={{
              width: "90%",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "5%",
            }}
          >
            <Grid container direction="row">
              <Grid item>
                <Grid container direction="row">
                  <Grid item>
                    <Checkbox />
                  </Grid>
                  <Box item>
                    <Typography>Mobile Money</Typography>
                    <Typography>MUR 500</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid item style={{ marginLeft: "200px" }}>
                <Grid container direction="row">
                  <Grid item>
                    <Checkbox />
                  </Grid>
                  <Box item>
                    <Typography>Loyality Points</Typography>
                    <Typography>200</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Paper> */}

          <Grid container>
            <Grid item style={{ width: '30%', marginLeft: '5%', zIndex: '0' }}>
              <Paper className={classes.back}>
                <List>
                  {/* <ListItem
                    button
                    classes={{ root: classes.root, selected: classes.selected }}
                    selected
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cheque" />
                  </ListItem> */}

                  <ListItem
                    button
                    classes={{ root: classes.root, selected: classes.selected }}
                    selected
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cash" />
                  </ListItem>
                  {/* <ListItem
                    button
                    classes={{ root: classes.root, selected: classes.selected }}
                    selected
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Internet Payment" />
                  </ListItem> */}
                  {/* <ListItem
                    button
                    classes={{ root: classes.root, selected: classes.selected }}
                    selected
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Credit/Debit Card" />
                  </ListItem> */}

                  {/* <ListItem
                    button
                    classes={{ root: classes.root, selected: classes.selected }}
                    selected
                  >
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary="EMI on Invoice" />
                  </ListItem> */}
                </List>
              </Paper>
            </Grid>

            <Grid item style={{ width: '60%' }}>
              <Paper style={{ marginLeft: '30px' }}>
                <Grid
                  container
                  direction="column"
                  style={{ marginLeft: '50px' }}
                >
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item>
                        <InputLabel htmlFor="uncontrolled-native">
                          Currency
                        </InputLabel>

                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: 'name',
                            id: 'uncontrolled-native'
                          }}
                          onChange={handleChange}
                        >
                          {isEmpty(currency) ? (
                            <></>
                          ) : (
                            <>
                              {currency.currency.map((item) => {
                                return (
                                  <option value={item.code}>{item.code}</option>
                                );
                              })}
                            </>
                          )}
                        </NativeSelect>
                      </Grid>
                      <Grid item style={{ marginLeft: '50px' }}>
                        <TextField
                          label="Payable Amount"
                          onChange={handleAmount}
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: '100px', marginBottom: '40px' }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClick}
                    >
                      Add Payment
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Payment;
