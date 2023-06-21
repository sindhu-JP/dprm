import React from 'react';

import _ from 'lodash';
import { useBoolean, useStateful } from 'react-hanger';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { getTotalChargeOfType } from 'lib/utils/product';

const useStyles = makeStyles((theme) => ({
  border: {
    border: '1px solid #e2e2e2'
    //  borderRadius:"0px"
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
  }
}));
const ContractProducts = ({ product }) => {
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

  React.useEffect(() => {
    if (product) {
      let pData = {
        title: _.get(product, 'method', '--'),
        name: _.get(product, 'name', '--'),
        id: _.get(product, 'id', ''),
        businessType: _.get(
          product,
          'productSpecification.businessType[0]',
          '--'
        ),
        technology: _.get(product, 'productSpecification.technology[0]', '--'),
        lob: _.get(product, 'productSpecification.LoB', '--'),
        price: _.get(product, 'productOfferingPrice[0].price.value', '00'),
        unit: _.get(product, 'productOfferingPrice[0].price.unit', '--')
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

  return (
    <Paper elevation={0} className={classes.border}>
      <Box px={5}>
        <Grid container spacing={6}>
          {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                     onChange={()=>handleswich(product)}
                   
                    name="checkedB"
                    color="primary"
                  />
                }
              /> */}
          {/* </Grid> */}
          <Grid item direction={'row'}>
            <Grid item>
              <Typography variant="h5" className={classes.title}>
                {data.value.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6"> {data.value.name}</Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={6}>
              <Grid item direction={'column'}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Offer ID: {data.value.id}
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Typography variant="h6">Contract : 12 Months</Typography> */}
                </Grid>
              </Grid>

              {/* <Grid item>
              <IconButton onClick={expanded.toggle}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ContractProducts;
