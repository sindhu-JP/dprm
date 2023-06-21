import React from 'react';
import _ from 'lodash';
import Table from 'Components/Table/RenderTable';
import { useBoolean, useStateful } from 'react-hanger';
import {
  Box,
  Grid,
  Paper,
  IconButton,
  Typography,
  Collapse,
  makeStyles
} from '@material-ui/core';
import { getTotalChargeOfType } from 'lib/utils/product';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import ORDER from 'lib/constants/Financial/ConfigTable';
import { useSelector } from 'react-redux';
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

const ProductDetails = ({
  vasData,
  values,
  dataproduct,
  orderRowdetails,
  InvoicePreviewDetails,
  product,
  balance
}) => {
  const classes = useStyles();
  const expanded = useBoolean(false);

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

  React.useEffect(() => {
    // if (product) {
    //   let pData = {
    //     title: _.get(product, 'method', '--'),
    //     name: _.get(product, 'name', '--'),
    //     businessType: _.get(product, 'businessType', '--'),
    //     technology: _.get(product, 'productSpecification.technology[0]', '--'),
    //     lob: _.get(product, 'lob', '--'),
    //     price: _.get(product, 'productOfferingPrice[0].price.value', '00'),
    //     unit: _.get(product, 'productOfferingPrice[0].price.unit', '--'),
    //     address: _.get(product, 'address', '--'),
    //     offerId: _.get(product, 'id', '--'),
    //   }
    //   pData.title =
    //     pData.title.length > 36
    //       ? `${pData.title.substring(0, 34)}...`
    //       : pData.title
    //   data.setValue(pData)
    // }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // my task page list hanlding
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };

  // potential partner page list hanlding
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    // if (product.address && masterdata) {
    //   address.setValue(
    //     LeadUtils.getPrimaryAddress({
    //       addressDetails: product.address,
    //       masterdata,
    //     }),
    //   )
    // }
  }, []);

  const maketablelist = (data) => {
    let rows = _.map(data, (item) => {
      return {
        columns: item
      };
    });

    return rows;
  };

  return (
    <Paper elevation={0} className={classes.border}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item direction={'column'}>
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              {/* {data.value.title} */}
              {_.get(product, 'productName', '')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {_.get(product, 'productId', '')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={6}>
            <Grid item direction={'column'}>
              <Grid item>
                <Typography variant="h5" className={classes.title}>
                  {balance?.currency}{' '} {_.get(product, 'totalAmount', '00.00')}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Typography variant="h6">Contract : 12 Months</Typography> */}
              </Grid>
            </Grid>

            <Grid item>
              <IconButton onClick={expanded.toggle}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Collapse in={expanded.value} unmountOnExit timeout="auto">
        <Box py={4}>
          <Box mb={4}>
            <Table
              page={page}
              rows={maketablelist(product?.OrderDetails)}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              columns={ORDER.OrderTracking.columns}
              // onRowAction={props.handleInvoiceRowAction}
              // onRowClick={props.handleInvoiceRowClick}
            />
          </Box>

          <Box mb={4} mt={4} />
        </Box>
      </Collapse>
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
  }
}));

export default ProductDetails;
