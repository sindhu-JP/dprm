import React from 'react';
import _ from 'lodash';
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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ServiceDetails from 'Features/Requests/ServiceDetails';
import LeadUtils from 'lib/utils/lead';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  border: {
    borderRadius: '0px'
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
  details: {
    backgroundColor: '#F3F4F9',
    borderRadius: '20px'
  },
  borderv: {
    border: '1px solid #e2e2e2',
    backgroundColor: '#F3F4F9'
  }
}));

const ContractProducts = ({ product, values, dataproduct }) => {
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
  const [checked, setchecked] = React.useState(true);

  // const data = useStateful({});
  const masterdata = useSelector((state) => state.master.data);
  const address = useStateful({});
  React.useEffect(() => {
    if (product) {
      let pData = {
        title: _.get(product, 'method', '--'),
        name: _.get(product, 'name', '--'),
        id: _.get(product, 'id', ''),

        businessType: _.get(product, 'businessType', '--'),
        offerId: _.get(product, 'id', '--'),
        technology: _.get(product, 'productSpecification.technology[0]', '--'),
        lob: _.get(product, 'lob', '--'),
        price: _.get(product, 'productOfferingPrice[0].price.value', '00'),
        unit: _.get(product, 'productOfferingPrice[0].price.unit', '--'),
        address: _.get(product, 'address', '--')
      };

      pData.title =
        pData.title.length > 36
          ? `${pData.title.substring(0, 34)}...`
          : pData.title;
      data.setValue(pData);
    }
  }, [product]);
  const handleswich = (e) => {
    setchecked(!checked);
  };

  React.useEffect(() => {
    if (product.address && masterdata) {
      address.setValue(
        LeadUtils.getPrimaryAddress({
          addressDetails: product.address,
          masterdata
        })
      );
    }
  }, [product.address]);

  return (
    <Paper elevation={0} className={classes.border}>
      <Box px={5}>
        <Grid container spacing={6} direction={'row'} justify="space-between">
          <Grid container xs>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => handleswich(product)}
                    name="checkedB"
                    color="primary"
                  />
                }
              />
            </Grid>
            <Grid item direction={'row'}>
              <Grid item>
                <Typography variant="h5" className={classes.title}>
                  {data.value.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  {' '}
                  {data.value.lob + ' - ' + data.value.businessType}
                </Typography>
              </Grid>
            </Grid>
            {/* 
            <Grid item>
              <Grid container alignItems="center" spacing={6}>
                <Grid item direction={'column'}>
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Offer ID: {data.value.id}
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={6}>
              <Grid item direction={'column'}>
                <Grid item>
                  <Typography variant="h5" className={classes.title}>
                    {' Offer ID'}: {data.value.offerId}
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
      </Box>

      <Collapse in={expanded.value} unmountOnExit timeout="auto">
        <Box py={1}>
          <Grid item>
            <ServiceDetails
              values={values}
              data={dataproduct}
              id={product.id}
            />
          </Grid>
          {data.value.address && data.value.address.country !== undefined && (
            <Paper elevation={0}>
              <Box p={2}>
                <Box mb={2}>
                  <Paper elevation={0} className={classes.borderv}>
                    <Box mb={4}>
                      <Typography variant="h6" className={classes.title}>
                        Feasibility
                      </Typography>
                    </Box>

                    <Grid container direction="column" spacing={4}>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={4}
                        >
                          <Grid item>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              justify="space-between"
                              spacing={4}
                            >
                              <Grid item>
                                <CheckCircleIcon
                                  fontSize={'default'}
                                  style={{ color: '#64DD17' }}
                                />
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Typography variant="body1">
                                      {address.value.formattedAddress}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ContractProducts;
