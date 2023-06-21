import React from 'react';
import {
  Grid,
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { useStateful } from 'react-hanger';
import { Leads } from 'Http/api';
// import ProfileStepper from './ProfileStepper';
import dayjs from 'dayjs';
import _ from 'lodash';

const Chicklet360 = ({ customerInfo }) => {
  const data1 = useStateful({});
  const { totoalvalue, setvalue } = React.useState('');
  const { currency, setcurrency } = React.useState('');

  const classes = useStyles();

  const loadChicklet = async () => {
    const res = await Leads.chikletKpi(customerInfo.id);

    if (res) {
      data1.setValue(res);
    }
  };

  const totalrecurring = () => {
    return customerInfo?.opportunities && customerInfo?.opportunities[0].quote
      ? customerInfo?.opportunities[0]?.quote.orderTotalPrice.map((res) => {
          if (res.priceType == 'Rental') {
            return _.get(res.price, 'taxIncludedAmount.value', '0 /-') * 36;
          } else {
            return '';
          }
        })
      : '--';
  };
  const currrency = () => {
    return customerInfo?.opportunities && customerInfo?.opportunities[0]?.quote
      ? customerInfo?.opportunities[0]?.quote?.orderTotalPrice.map((res) => {
          if (res.priceType == 'Rental') {
            return _.get(res.price, 'taxIncludedAmount.unit', '-');
          } else {
            return '';
          }
        })
      : '';
  };

  // customerInfo.quote?  _.get(customerInfo.quote.orderTotalPrice, "[2].price.taxIncludedAmount.value","--")*36:"--";

  // const  currrency=()=>{
  //   return customerInfo.quote?  _.get(customerInfo.quote.orderTotalPrice, "[2].price.taxIncludedAmount.unit","--")*36:"";

  // }
  React.useEffect(() => {
    if (customerInfo?.id) {
      loadChicklet();
    }
  }, [customerInfo?.id]);

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item>
        <Paper elevation={0} className={classes.chickletHeight}>
          <Box py={2} px={2}>
            <Typography variant="h6">
              {' '}
              <b>
                {currrency()} {totalrecurring()}
              </b>{' '}
            </Typography>
            <Typography variant="h6">Potential Revenue (36 Months)</Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item>
        <Paper elevation={0} className={classes.chickletHeight}>
          <Box py={2} px={2}>
            <Typography variant="h6">
              <b>
                {(data1.value[0] && data1.value[0]['open Quotations']) || '--'}
              </b>
            </Typography>
            <Typography variant="h6">Open Quotations</Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item>
        <Paper elevation={0} className={classes.chickletHeight}>
          <Box py={2} px={2}>
            <Typography variant="h6">
              <b>{data1.value[0] && data1.value[0]['Lead Ageing']} Day(s)</b> (
              {dayjs(customerInfo.createdDate).format('DD MMM YYYY')})
            </Typography>
            <Typography variant="h6">Lead Ageing</Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item>
        <Paper elevation={0} className={classes.chickletHeight}>
          <Box py={2} px={2}>
            <Typography variant="h4">
              {/* <ProfileStepper
                value={data1.value[0] && data1.value[0]['profile complete']}
              /> */}
            </Typography>
            <Typography variant="h6">Profile Complete</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Chicklet360;

const useStyles = makeStyles((theme) => ({
  chickletHeight: {
    height: '100px',
    width: '240px'
  }
}));
