import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';

import { useBoolean, useStateful } from 'react-hanger';
import _ from 'lodash';

const ServiceDetails = ({ values, products, Contract, data, id }) => {
  const classes = useStyles();
  const expanded = useBoolean(true);
  const Details = useStateful({});
  const characteristic = useStateful([]);

  React.useEffect(() => {
    if (values) {
      let temp = [];

      let details = _.map(values.orderItem, (item) => {
        if (item.productOffering.id === id) {
          if (
            item?.productSpecification?.['@type'] ===
            'CompositeProductSpecification'
          ) {
            return _.map(item.orderItem, (items) => {
              temp.push(...items.product.characteristic);
            });
          } else {
            if (item.product?.characteristic?.length > 0) {
              temp.push(...item.product.characteristic);
            }
          }
        }
      });

      characteristic.setValue(temp);
    }
  }, [values]);

  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Box mb={4}>
          <Paper elevation={0} className={classes.border}>
            <Box mb={4}>
              <Typography variant="h6" className={classes.title}>
                Service Details
              </Typography>
            </Box>
            <Grid container direction={'row'} xs={12} spacing={6}>
              {characteristic.value &&
                characteristic.value?.map((item2) => {
                  if (item2?.value !== '') {
                    return (
                      <Grid item xs={3}>
                        <TextField
                          label={item2.name}
                          disabled
                          value={item2.value}
                        />
                      </Grid>
                    );
                  }
                })}
            </Grid>
          </Paper>
        </Box>
        <Box mt={4}></Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  charges: {
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(6, 4)
  },
  title: {
    fontWeight: 'bold'
  },
  border: {
    border: '1px solid #e2e2e2',
    backgroundColor: '#F3F4F9'
  },
  heading: {
    fontSize: '18px',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));
export default ServiceDetails;
