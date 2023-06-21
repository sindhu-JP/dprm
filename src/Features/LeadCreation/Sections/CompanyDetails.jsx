import _ from 'lodash';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useBoolean } from 'react-hanger';
import { ExpandMore } from '@material-ui/icons';
import {
  Box,
  Grid,
  Paper,
  Button,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';
import { useSelector, connect } from 'react-redux';
import { Check } from '@material-ui/icons';
import { sectionValidator } from '../Schema';
import Autocomplete from 'lib/components/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import LoadFactory from 'Factory/Lead';

const CompanyDetails = ({
  register,
  errors,
  control,
  schema,
  options,
  runLeadVerification,
  leadsState,
  leadOpen,
  drop,
  setexpiryDate
}) => {
  const classes = useStyles();
  const sectionIsValid = useBoolean(false);
  const optionalSectionExpanded = useBoolean(false);
  const [selectedDate, handleDateChange] = React.useState(
    drop ? leadOpen.companyDetails?.optional?.expectedClosureDate : null
  );
  const validateRegNumber = useBoolean(false);
  const masterdata = useSelector((state) => state.master.data);
  // const address = useStateful({});
  const [subCatData, setSubCatData] = useState();
  const [details, setDetails] = useState(leadOpen?.companyDetails);

  const values = useWatch({
    control,
    name: 'companyDetails',
    defaultValue: leadOpen?.companyDetails
  });

  const handleChecks = (value) => {
    const companyName = _.get(value, 'companyName', '');
    const registrationNumber = _.get(value, 'companyRegistrationNumber', '');

    if (companyName && registrationNumber.length >= 3) {
      const payload = {
        ...LoadFactory.makeBlackListCheckPayload({ registrationNumber })
      };
      // runLeadVerification({ companyName, registrationNumber, payload });
    }
  };

  React.useEffect(() => {
    sectionValidator({
      value: { companyDetails: { ...values } },
      schema,
      sectionName: 'companyDetails',
      onFaliure: sectionIsValid.setFalse,
      onSuccess: sectionIsValid.setTrue
    });
  }, [values]);
  const handleMouseleave = () => {
    handleChecks(values);
  };

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={6}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Company Details
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
          <Grid item xs={4}>
            {leadsState.PreFillData && leadsState.PreFillData.companyDetails ? (
              <TextField
                required
                error={!!errors.companyName}
                helperText={_.get(errors, 'companyName.message', '')}
                fullWidth
                name="companyDetails.companyName"
                label="Company Name"
                inputRef={register}
                value={leadsState.PreFillData.companyDetails.companyName}
                variant="standard"
              />
            ) : (
              <TextField
                required
                error={!!errors.companyName}
                helperText={_.get(errors, 'companyName.message', '')}
                fullWidth
                name="companyDetails.companyName"
                label="Company Name"
                inputRef={register}
                variant="standard"
                defaultValue={leadOpen?.companyDetails?.companyName}
              />
            )}
          </Grid>

          <Grid item xs={4}>
            {leadsState.PreFillData && leadsState.PreFillData.companyDetails ? (
              <TextField
                required
                fullWidth
                variant="standard"
                error={!!errors.companyRegistrationNumber}
                helperText={_.get(
                  errors,
                  'companyRegistrationNumber.message',
                  ''
                )}
                name="companyDetails.companyRegistrationNumber"
                label="Company Registration Number"
                inputRef={register}
                value={
                  leadsState.PreFillData.companyDetails
                    .companyRegistrationNumber
                }
                onMouseLeave={handleMouseleave}
              />
            ) : (
              <TextField
                required
                fullWidth
                variant="standard"
                error={!!errors.companyRegistrationNumber}
                helperText={_.get(
                  errors,
                  'companyRegistrationNumber.message',
                  ''
                )}
                name="companyDetails.companyRegistrationNumber"
                label="Company Registration Number"
                inputRef={register}
                onMouseLeave={handleMouseleave}
                // value={leadsState?.reopenLead?.companyDetails?.companyRegistrationNumber}
                defaultValue={
                  leadOpen?.companyDetails?.companyRegistrationNumber
                }
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <KeyboardDatePicker
              clearable
              required
              fullWidth
              disablePast={true}
              value={selectedDate}
              placeholder="select Date"
              onChange={(date) => {
                setexpiryDate(date);
                handleDateChange(date);
              }}
              // minDate={new Date()}
              format="MM/dd/yyyy"
              label="Registration ExpiryDate"
              name="companyDetails.registrationExpiryDate"
              inputRef={register}
              // onMouseLeave={handleDateMouseleave}
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              required
              error={!!errors.customerCategory}
              helperText={_.get(errors, 'customerCategory.message', '')}
              name="companyDetails.customerCategory"
              options={options.customerCategories}
              label="Customer Category"
              variant="standard"
              control={control}
              // value={values.companyDetails.customerCategory}
              existingValue={leadOpen?.companyDetails?.customerCategory}
            />
          </Grid>

          <Grid item xs={4}>
            {drop &&
              values.customerCategory &&
              values.customerCategory?.subCategory && (
                <Autocomplete
                  required
                  error={!!errors.subCategory}
                  helperText={_.get(errors, 'subCategory.message', '')}
                  name="companyDetails.subCategory"
                  options={_.get(values, 'customerCategory.subCategory', [])}
                  label="Customer Sub Category"
                  variant="standard"
                  control={control}
                  existingValue={leadOpen?.companyDetails?.customerSubCategory}
                />
              )}
            {!drop && (
              <Autocomplete
                required
                error={!!errors.subCategory}
                helperText={_.get(errors, 'subCategory.message', '')}
                name="companyDetails.subCategory"
                options={_.get(values, 'customerCategory.subCategory', [])}
                label="Customer Sub Category"
                variant="standard"
                control={control}
              />
            )}
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              required
              error={!!errors.industryType}
              helperText={_.get(errors, 'industryType.message', '')}
              name="companyDetails.industryType"
              options={options.industryTypes}
              label="Industry Type"
              variant="standard"
              control={control}
              existingValue={leadOpen?.companyDetails?.industryType}
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              required
              error={!!errors.leadClassification}
              helperText={_.get(errors, 'leadClassification.message', '')}
              name="companyDetails.leadClassification"
              options={options.leadClassifications}
              label="Lead Classification"
              variant="standard"
              control={control}
              existingValue={leadOpen?.companyDetails?.leadClassification}
            />
          </Grid>

          {/* <Grid item xs={4}>

            <KeyboardDatePicker
              clearable
              fullWidth
              value={selectedDate}
              placeholder="select Date"
              onChange={date => handleDateChange(date)}
              // minDate={new Date()}
              format="MM/dd/yyyy"
              label="Expected order closure date"
              name="companyDetails.expectedClosureDate"
              inputRef={register}
            />
          </Grid> */}
        </Grid>

        <Collapse in={optionalSectionExpanded.value} timeout="auto">
          <Box mb={6} mt={12}>
            <Typography variant="h4" className={classes.title}>
              Optional Details
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="standard"
                error={!!errors?.optional?.source}
                helperText={_.get(errors, 'optional.source.message', '')}
                name="companyDetails.optional.source"
                label="Source"
                inputRef={register}
                defaultValue={leadOpen?.companyDetails?.optionalDetails?.source}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="standard"
                error={!!errors?.optional?.websiteUrl}
                helperText={_.get(errors, 'optional.websiteUrl.message', '')}
                name="companyDetails.optional.websiteUrl"
                label="websiteUrl"
                inputRef={register}
                defaultValue={
                  leadOpen?.companyDetails?.optionalDetails?.websiteUrl
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                error={!!errors?.optional?.numberOfEmployee}
                helperText={_.get(
                  errors,
                  'optional.numberOfEmployee.message',
                  ''
                )}
                name="companyDetails.optional.numberOfEmployee"
                options={options.employeCounts}
                label="No. of Employee"
                variant="standard"
                control={control}
                existingValue={
                  leadOpen?.companyDetails?.optionalDetails?.numberOfEmployee
                }
              />
            </Grid>
            <Grid item xs={4}>
              <KeyboardDatePicker
                clearable
                fullWidth
                disablePast={true}
                value={selectedDate}
                placeholder="select Date"
                onChange={(date) => handleDateChange(date)}
                // minDate={new Date()}
                format="MM/dd/yyyy"
                label="Expected order closure date"
                name="companyDetails.optional.expectedClosureDate"
                inputRef={register}
              />
            </Grid>
          </Grid>
        </Collapse>

        <Box mt={6}>
          <Grid container justify="center">
            <Button
              size="large"
              color="primary"
              onClick={optionalSectionExpanded.toggle}
              endIcon={
                <ExpandMore
                  style={{
                    transform: `rotate(${
                      optionalSectionExpanded.value ? '180deg' : '0'
                    })`
                  }}
                />
              }
            >
              {optionalSectionExpanded.value
                ? `Hide Optional Details`
                : `Show Optional Details`}
            </Button>
          </Grid>
        </Box>
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

// export default CompanyDetails;

export default connect((state) => ({
  leadsState: state.leads
}))(CompanyDetails);
