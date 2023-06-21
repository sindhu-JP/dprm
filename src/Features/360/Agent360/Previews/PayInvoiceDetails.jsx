import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';

import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Button,
  CircularProgress
} from '@material-ui/core';

import InvoiceDetails from 'Components/Details/InvoiceDetails';

import _ from 'lodash';
import { ArrowForward } from '@material-ui/icons';
import InvoicePaymentDetails from 'Components/Details/InvoicePaymentDetails';
import useForm from 'Hooks/UseForm';
import NavigateNext from '@material-ui/icons/NavigateNext';

const PayInvoiceDetails = ({
  open,
  onClose,
  modalcontext,
  user,
  InvoicePreviewDetails,
  orderRowdetails,
  getOrderdetails,
  OrderProductlist,
  orderPayload,
  loading,
  onNext,
  OnpayInoice,
  loader
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    // getOrderdetails({ id: _.get(modalcontext, 'details.columns.id', '') });
  }, []);

  const onSuccess = (data) => {
    let changeStatusPayload = {
      ...modalcontext?.details?.rowlist,
      status: 'Paid'
    };
    let DebitmoneyDetails = {
      amount: _.get(modalcontext, 'details.rowlist.invoiceAmount', ''),
      remarks: data?.remarks,
      purposeOfTranx: 'Invoice Payment',
      transactionType: data?.method
    };

    OnpayInoice({
      invoiceID: _.get(modalcontext, 'details.rowlist.id', ''),
      payload: _.omit(changeStatusPayload, [
        'createdDate',
        'modifiedDate',
        'href',
        'id',
        '@schemaLocation'
      ]),
      walletId: _.get(modalcontext, 'details.rowlist.walletId', ''),
      debitmoneyDetails: DebitmoneyDetails
    });
  };
  const { handleChange, handleSubmit, errors } = useForm(onSuccess);
  //  const handleChange = (event, newValue, name) => {
  // .setValue({
  //     ...value,
  //     [name]: newValue
  //   })
  return (
    <div>
      <Buttonsheet open={open} onClose={onClose} header={''}>
        <Box px={18}>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', alignItems: 'center' }}
            // y={1}
          >
            <Grid>
              <Grid item>
                <Typography variant="h2">
                  {_.get(modalcontext, 'partner.mainlist.partnerName', '--')}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="caption">
                  Profile ID:{' '}
                  {_.get(modalcontext, 'partner.mainlist.partnerId', '--')} |
                  Products:
                  {_.get(modalcontext, 'partner.mainlist.productCount', 0)} |
                  Contracts:{' '}
                  {_.get(modalcontext, 'partner.mainlist.contractCount', 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            spacing={3}
            style={{ marginTop: '1rem' }}
          >
            <Grid item>
              <InvoiceDetails invoicedetails={modalcontext?.details?.rowlist} />
            </Grid>

            <Grid item>
              <InvoicePaymentDetails
                handleChange={handleChange}
                errors={errors}
                invoicedetails={modalcontext?.details?.rowlist}
              />
            </Grid>
          </Grid>

          <Box py={10}></Box>

          <Box px={8} py={6} className={classes.footer}>
            <Grid container justify="space-between">
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  spacing={10}
                >
                  <Grid item>
                    {/* <Badge color="error" badgeContent={cart.count}>
                    <ShoppingCartIcon />
                  </Badge> */}
                  </Grid>
                  <Grid item>
                    {/* <Typography style={{ color: "#FB9919" }} variant="subtitle2">
                    Upfront Charges {cart.upfront || "00"}.00 /-
                  </Typography>
                  <Typography style={{ color: "#A97FFF" }} variant="subtitle2">
                    Monthly Rentals {cart.recurring || "00"}.00 /-
                  </Typography> */}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  endIcon={!loader ? <ArrowForward /> : null}
                  className={classes.button}
                  onClick={handleSubmit}
                  // disabled={disabled}
                  endIcon={<NavigateNext />}
                >
                  {loader ? (
                    <CircularProgress size={25} style={{ color: 'white' }} />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Buttonsheet>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.common.white
  },
  button: {
    boxShadow: 'none',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      backgroundColor: theme.palette.success.light
    }
  }
}));
export default PayInvoiceDetails;
