import React from 'react';

import _ from 'lodash';
import { useBoolean, useStateful } from 'react-hanger';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { getTotalChargeOfType } from 'lib/utils/product';

import { useDispatch, useSelector } from 'react-redux';

import Modals from 'Store/Modals';
import dayjs from 'dayjs';

const upfrontChargeTypes = [
  'OneTimeCharge',
  'Fee',
  'Penalty',
  'Charge',
  'Deposit'
];
const recurringChargeTypes = [
  'Recurring',
  'Rental',
  'AdvancedRental',
  'Installment'
];
const data = [
  {
    label: 'Installation Fee',
    value: 'GHS 1600.00'
  },
  {
    label: 'Security Deposits',
    value: 'GHS 0.00'
  },
  {
    label: 'Gross Amount',
    value: 'GHS 1,600.00',
    heading: true
  },
  {
    label: 'CST @ 6%',
    value: 'GHS 96.00'
  },
  {
    label: 'NHIL @ 2.5%',
    value: 'GHS 40.00'
  },
  {
    label: 'GETFL @ 2.5%',
    value: 'GHS 40.00'
  },
  {
    label: 'Sub Total',
    value: 'GHS 1766.00',
    heading: true
  },
  {
    label: 'VAT @ 12.5%',
    value: 'GHS 222.00'
  },
  {
    label: 'Total Upfront',
    value: 'GHS 1,998.00',
    heading: true
  }
];

const InvoiceCurd = ({
  product,
  vasData,
  values,
  dataproduct,
  label,
  context,
  enble
}) => {
  const classes = useStyles();
  const expanded = useBoolean(false);
  const dispatch = useDispatch();
  const name = _.get(product, 'name', '');
  const totalUpfrontCharges = getTotalChargeOfType('upfront', product, false);
  const totalRecurringCharges = getTotalChargeOfType(
    'recurring',
    product,
    false
  );

  const data = useStateful({});
  const masterdata = useSelector((state) => state.master.data);
  const address = useStateful({});

  return (
    <Paper elevation={0} className={classes.border}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Grid container direction={'row'} spacing="3">
            <Grid item>
              <Typography
                variant="subtitle2"
                color="primary"
                className={classes.title}
              >
                {/* {data.value.title} */}
                Invoice ID - {_.get(context.details.columns, 'id', '')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2"></Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                {/* {data.value.title} */}
                Date of Invoice:{' '}
                {dayjs(context?.details?.columns?.date).format('DD MMM YYYY')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2"></Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                {/* {data.value.title} */}
                Due Date:{' '}
                {dayjs(context?.details?.columns?.dueDate).format(
                  'DD MMM YYYY'
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2"></Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                {/* {data.value.title} */}
                Due Amount:{' '}
                {_.get(context, 'details.columns.InvoiceTotal', '00')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {/* <Typography variant="h6">
            98765434567 | POSTPAID
            </Typography> */}
          </Grid>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" spacing={6}>
            <Grid item direction={'column'}>
              <Grid item>
                {/* <Typography variant="h5" className={classes.title}>
                KWD 17,825.00
                </Typography> */}
                {enble ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      dispatch(Modals.close('BillingAdjustment'));
                      dispatch(
                        Modals.open({
                          id: 'InvoiceAdjustment',
                          context: context
                        })
                      );
                    }}
                  >
                    {label}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      dispatch(Modals.close('InvoiceAdjustment'));
                      dispatch(
                        Modals.open({
                          id: 'BillingAdjustment',
                          context: context
                        })
                      );
                    }}
                  >
                    {label}
                  </Button>
                )}
              </Grid>
              <Grid item>
                {/* <Typography variant="h6">Contract : 12 Months</Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  border: {
    border: '1px solid #e2e2e2'
  },
  heading: {
    fontSize: '18px',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium
  },
  upfrontTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.common.gold
  },
  recurringTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.common.indigo
  },

  heading: {
    fontSize: '18px',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary
  },
  details: {
    backgroundColor: '#F3F4F9',
    borderRadius: '20px'
  },
  borderv: {
    border: '1px solid #e2e2e2',
    backgroundColor: '#F3F4F9'
  },
  chip: {
    background: '#FF4757',
    color: 'white',
    borderRadius: '5px'
  }
}));

export default InvoiceCurd;
