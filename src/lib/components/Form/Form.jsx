import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { Form as RFF, FormSpy } from 'react-final-form';
import {
  TextField,
  Autocomplete,
  DatePicker,
  Switches,
  KeyboardDatePicker
} from 'mui-rff';
import _ from 'lodash';

const renderField = (field) => {
  const fields = {
    text: (config) => (
      <TextField
        fullWidth
        label={config.label}
        name={config.id}
        required={config.validation.required}
        disabled
      />
    ),

    autocomplete: (config) => (
      <Autocomplete
        label={config.label}
        options={config.options}
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.code}
        name={config.id}
        required={config.validation.required}
      />
    ),
    date: (config) => (
      <DatePicker
        label={config.label}
        name={config.id}
        required={config.validation.required}
        dateFunsUtils={DateFnsUtils}
        disablePast
      />
    ),
    switch: (config) => (
      <Switches name={config.id} label={config.label} data={config.options} />
    ),
    dateKeyboard: (config) => (
      <KeyboardDatePicker
        label={config.label}
        name={config.id}
        required={config.validation.required}
        dateFunsUtils={DateFnsUtils}
        disablePast
        format="dd/MM/yyyy"
      />
    )
  };

  return fields[field.type](field);
};

const Form = ({ meta = {}, values = {}, formSchema, onChange = () => {} }) => {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Box mb={4}>
        <Typography className={classes.title} variant="h2">
          {meta.title}
        </Typography>
      </Box>
      <Box>
        {!_.values(values).every(_.isEmpty) ? (
          <RFF
            onSubmit={() => {}}
            initialValues={values}
            subscription={{
              submitting: true,
              pristine: true
            }}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <FormSpy onChange={(data) => onChange(data.values)} />
                <Grid container spacing={6}>
                  {Object.keys(formSchema.fields).map((fieldId) => {
                    const field = formSchema.fields[fieldId];
                    return field.showif ? (
                      field.showif.value === values?.[field.showif.field] ? (
                        <Grid item key={fieldId} xs={field.span || 4}>
                          {renderField(field)}
                        </Grid>
                      ) : null
                    ) : (
                      <Grid item key={fieldId} xs={field.span || 4}>
                        {renderField(field)}
                      </Grid>
                    );
                  })}
                  <Grid item></Grid>
                </Grid>
              </form>
            )}
          />
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default Form;
