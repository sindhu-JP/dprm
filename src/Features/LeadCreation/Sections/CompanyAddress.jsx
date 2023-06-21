import React from 'react';
import _ from 'lodash';
import { sectionValidator } from '../Schema';
import { useBoolean } from 'react-hanger';
import { useWatch } from 'react-hook-form';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import Autocomplete from 'lib/components/Autocomplete';

const CompanyAddress = ({
  register,
  errors,
  control,
  schema,
  options,
  leadOpen,
  drop
}) => {
  const classes = useStyles();
  const sectionIsValid = useBoolean(false);

  const values = useWatch({
    control,
    name: 'companyAddress',
    defaultValue: leadOpen?.companyAddress
  });

  React.useEffect(() => {
    sectionValidator({
      value: {
        companyAddress: { ...values }
      },
      schema,
      sectionName: 'companyAddress',
      onFaliure: sectionIsValid.setFalse,
      onSuccess: sectionIsValid.setTrue
    });
  }, [values]);

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={6}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Company Address
              </Typography>
            </Grid>
            {sectionIsValid.value && (
              <Grid item>
                <IconButton size="small" className={classes.icon}>
                  <Check />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TextField
              required
              error={!!errors?.addressLine1}
              helperText={_.get(errors, 'addressLine1.message', '')}
              fullWidth
              name="companyAddress.addressLine1"
              label="Address Line 1"
              inputRef={register}
              variant="standard"
              defaultValue={leadOpen?.companyAddress?.addressLine1}
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              required
              error={!!errors.country}
              helperText={_.get(errors, 'country.message', '')}
              name="companyAddress.country"
              options={options.countries}
              label="Country"
              variant="standard"
              control={control}
              existingValue={leadOpen?.companyAddress?.country}
            />
          </Grid>
          <Grid item xs={4}>
            {drop && values.country && values.country?.province && (
              <Autocomplete
                required
                error={!!errors.stateOfOrigin}
                helperText={_.get(errors, 'stateOfOrigin.message', '')}
                name="companyAddress.stateOfOrigin"
                options={_.get(values, 'country.province', [])}
                label="State Of Origin"
                variant="standard"
                control={control}
                existingValue={leadOpen?.companyAddress?.stateOrProvince}
              />
            )}
            {!drop && (
              <Autocomplete
                required
                error={!!errors.stateOfOrigin}
                helperText={_.get(errors, 'stateOfOrigin.message', '')}
                name="companyAddress.stateOfOrigin"
                options={_.get(values, 'country.province', [])}
                label="State Of Origin"
                variant="standard"
                control={control}
                existingValue={leadOpen?.companyAddress?.stateOrProvince}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {drop && values.stateOfOrigin && values.stateOfOrigin.city && (
              <Autocomplete
                required
                error={!!errors.city}
                helperText={_.get(errors, 'city.message', '')}
                name="companyAddress.city"
                options={_.get(values, 'stateOfOrigin.city', [])}
                label="City"
                variant="standard"
                control={control}
                existingValue={leadOpen?.companyAddress?.city}
              />
            )}
            {!drop && (
              <Autocomplete
                required
                error={!!errors.city}
                helperText={_.get(errors, 'city.message', '')}
                name="companyAddress.city"
                options={_.get(values, 'stateOfOrigin.city', [])}
                label="City"
                variant="standard"
                control={control}
                existingValue={leadOpen?.companyAddress?.city}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              error={!!errors?.poBox}
              helperText={_.get(errors, 'poBox.message', '')}
              fullWidth
              name="companyAddress.poBox"
              label="PO Box"
              inputRef={register}
              variant="standard"
              defaultValue={leadOpen?.companyAddress?.postcode}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              // required
              error={!!errors?.landmark}
              helperText={_.get(errors, 'landmark.message', '')}
              fullWidth
              name="companyAddress.landmark"
              label="Landmark"
              inputRef={register}
              variant="standard"
              defaultValue={leadOpen?.companyAddress?.landmark}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
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
  }
}));

CompanyAddress.propTypes = {};
export default CompanyAddress;
