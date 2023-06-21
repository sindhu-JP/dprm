import React from 'react';
import _ from 'lodash';
import { useBoolean } from 'react-hanger';
import { useWatch } from 'react-hook-form';
import { sectionValidator } from '../Schema';

import CheckboxGroup from 'lib/components/CheckboxGroup';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { connect } from 'react-redux';

const PrimaryContactDetails = ({
  register,
  errors,
  control,
  schema,
  options,
  leadsState,
  leadOpen,
  drop,
  contactarray
}) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const sectionIsValid = useBoolean(false);

  const values = useWatch({
    control,
    name: 'primaryContactDetails',
    defaultValue: leadOpen?.primaryContactDetails
  });

  React.useEffect(() => {
    sectionValidator({
      value: {
        primaryContactDetails: { ...values }
      },
      schema,
      sectionName: 'primaryContactDetails',
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
                Primary Contact Details
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
            {leadsState.PreFillData &&
            leadsState.PreFillData.primaryContactDetails ? (
              <TextField
                required
                fullWidth
                label="Name"
                variant="standard"
                inputRef={register}
                error={!!errors?.name}
                name="primaryContactDetails.name"
                helperText={_.get(errors, 'name.message', '')}
                value={leadsState.PreFillData.primaryContactDetails.name}
              />
            ) : (
              <TextField
                required
                fullWidth
                label="Name"
                variant="standard"
                inputRef={register}
                error={!!errors?.name}
                name="primaryContactDetails.name"
                helperText={_.get(errors, 'name.message', '')}
                defaultValue={leadOpen?.primaryContactDetails?.name}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="standard"
              inputRef={register}
              error={!!errors?.lastName}
              name="primaryContactDetails.lastName"
              helperText={_.get(errors, 'lastName.message', '')}
              defaultValue={leadOpen?.primaryContactDetails?.lastName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Designation"
              variant="standard"
              type={'text'}
              inputRef={register}
              error={!!errors?.designation}
              name="primaryContactDetails.designation"
              helperText={_.get(errors, 'designation.message', '')}
              defaultValue={leadOpen?.primaryContactDetails?.designation}
            />
            {/* <Autocomplete
              required
              error={!!errors.designation}
              helperText={_.get(errors, "designation.message", "")}
              name="primaryContactDetails.designation"
              options={options.designations}
              label="Designation"
              variant="standard"
              control={control}
            /> */}
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Mobile Number"
              variant="standard"
              type={'number'}
              inputRef={register}
              error={!!errors?.mobileNumber}
              name="primaryContactDetails.mobileNumber"
              helperText={_.get(errors, 'mobileNumber.message', '')}
              defaultValue={leadOpen?.primaryContactDetails?.mobile}
            />
          </Grid>
          <Grid item xs={4}>
            {leadsState.PreFillData &&
            leadsState.PreFillData.primaryContactDetails ? (
              <TextField
                required
                fullWidth
                label="Email"
                variant="standard"
                inputRef={register}
                error={!!errors?.email}
                name="primaryContactDetails.email"
                helperText={_.get(errors, 'email.message', '')}
                value={leadsState.PreFillData.primaryContactDetails.email}
              />
            ) : (
              <TextField
                required
                fullWidth
                label="Email"
                variant="standard"
                inputRef={register}
                error={!!errors?.email}
                name="primaryContactDetails.email"
                helperText={_.get(errors, 'email.message', '')}
                defaultValue={leadOpen?.primaryContactDetails?.email}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              // required
              fullWidth
              label="Whatsapp"
              variant="standard"
              type={'number'}
              inputRef={register}
              error={!!errors?.whatsapp}
              name="primaryContactDetails.whatsapp"
              helperText={_.get(errors, 'whatsapp.message', '')}
              defaultValue={leadOpen?.primaryContactDetails?.whatsapp}
            />
          </Grid>

          {/* <Grid container spacing={6}> */}
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              variant="standard"
              inputProps={{ maxLength: 10 }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              inputRef={register}
              error={!!errors?.phoneNumber}
              name="primaryContactDetails.phoneNumber"
              helperText={_.get(errors, 'phoneNumber.message', '')}
              defaultValue={
                leadOpen?.primaryContactDetails?.optionalDetails?.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Extension Number"
              variant="standard"
              inputProps={{ maxLength: 10 }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              inputRef={register}
              error={!!errors?.extensionNumber}
              name="primaryContactDetails.extensionNumber"
              helperText={_.get(errors, 'extensionNumber.message', '')}
              defaultValue={
                leadOpen?.primaryContactDetails?.optionalDetails
                  ?.extensionNumber
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Department"
              variant="standard"
              inputRef={register}
              error={!!errors?.Department}
              name="primaryContactDetails.department"
              helperText={_.get(errors, 'Department.message', '')}
              defaultValue={leadOpen?.primaryContactDetails?.designation}
            />
            {/* </Grid> */}
          </Grid>
          <Grid item xs={12}>
            <Box mb={4}>
              <Typography variant="h4" className={classes.title}>
                Contact Medium <span className={classes.starmark}>*</span>
              </Typography>
            </Box>
            {/* {[
              { name: "Email", code: "email" },
              { name: "Whatsapp", code: "whatsapp" },
              { name: "SMS", code: "sms" },
              { name: "Telegram", code: "telegram" },
            ].map((option, index) => (

              <CheckboxGroup
                key={index}
                control={control}
                name={`primaryContactDetails.contactMedium.${option.code}`}
                label={option.name}
                defaultValue={leadOpen?.primaryContactDetails?.contactMedium}
              // defaultValue={Object.keys(leadOpen?.primaryContactDetails?.contactMedium).map((item) => {
              //   return `primaryContactDetails.contactMedium.${item}`

              // })

              />
            ))} */}
            {/* {drop && values?.contactMedium &&
              // leadOpen?.PrimaryContactDetails && leadOpen?.PrimaryContactDetails.contactMedium &&
              Arry && Arry.map((option, index) => {
                // Object.keys(values?.contactMedium).map((option, index) => (
                let obj = {}
                if (option.code == obj[leadOpen?.PrimaryContactDetails?.contactMedium]) {
                  return (
                    <>
                      option.isActive = true
                    < CheckboxGroup
                        key={index}
                        control={control}
                        name={`primaryContactDetails.contactMedium.${option.code}`
                        }
                        label={option.name}
                        defaultValue={option.isActive}

                      />
                    </>
                  )
                }

              })

            } */}

            {drop &&
              leadOpen?.primaryContactDetails &&
              leadOpen.primaryContactDetails.contactMedium &&
              contactarray &&
              contactarray.map((option, index) => {
                // if (option.isActive == true) {
                return (
                  <CheckboxGroup
                    key={index}
                    control={control}
                    name={`primaryContactDetails.contactMedium.${option?.code}`}
                    label={option?.name}
                    defaultValue={option?.isActive}
                    // defaultValue={leadOpen?.primaryContactDetails?.contactMedium}
                    // defaultValue={Object.keys(leadOpen?.primaryContactDetails?.contactMedium).map((item) => (

                    //   `primaryContactDetails.contactMedium.${item}`

                    // ))}
                  />
                );
                // }
                // else  {
                //   return <CheckboxGroup
                //     key={index}
                //     control={control}
                //     name={`primaryContactDetails.contactMedium.${option.code}`}
                //     label={option.name}

                //   />
                // }
              })}
            {!drop &&
              contactarray &&
              contactarray.map((option, index) => {
                // if (option.isActive == true) {
                return (
                  <CheckboxGroup
                    key={index}
                    control={control}
                    name={`primaryContactDetails.contactMedium.${option.code}`}
                    label={option.name}
                  />
                );
              })}

            {!sectionIsValid.value && (
              <div style={{ color: 'red' }}>
                {_.get(errors, 'contactMedium.message', '')}
              </div>
            )}
          </Grid>
        </Grid>
        {/* 
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
                label="Phone Number"
                variant="standard"
                inputRef={register}
                error={!!errors?.phoneNumber}
                name="primaryContactDetails.phoneNumber"
                helperText={_.get(errors, "phoneNumber.message", "")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Extension Number"
                variant="standard"
                inputRef={register}
                error={!!errors?.extensionNumber}
                name="primaryContactDetails.extensionNumber"
                helperText={_.get(errors, "extensionNumber.message", "")}
              />
            </Grid>
          </Grid>
        </Collapse> */}
        {/* 
        <Box mt={6}>
          <Grid container justify="center">
            <Button
              size="large"
              color="primary"
              onClick={optionalSectionExpanded.toggle}
              endIcon={
                <ExpandMore
                  style={{
                    transform: `rotate(${optionalSectionExpanded.value ? "180deg" : "0"
                      })`,
                  }}
                />
              }
            >
              {optionalSectionExpanded.value
                ? `Hide Optional Details`
                : `Show Optional Details`}
            </Button>
          </Grid>
        </Box> */}
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
  },
  starmark: {
    color: 'red'
  }
}));

PrimaryContactDetails.propTypes = {};

export default connect((state) => ({
  leadsState: state.leads
}))(PrimaryContactDetails);
// export default PrimaryContactDetails;
