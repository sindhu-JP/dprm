import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, TextField, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const FormikAutocomplete = ({ label, options, required, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Autocomplete
      name={field.name}
      onChange={(_, value) =>
        field.onChange({ target: { name: field.name, value } })
      }
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          error={!!errorText}
          helperText={errorText}
          required={required}
          {...params}
          label={label}
        />
      )}
    />
  );
};

export const FormikTextField = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      fullWidth
      required={required}
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export const FormikCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(e) =>
            field.onChange({
              target: { name: field.name, value: e.target.checked }
            })
          }
          name={field.name}
        />
      }
      label={label}
    />
  );
};

export const FormikCheckboxValueGroup = ({
  label,
  name,
  options,
  values,
  ...props
}) => {
  const [field] = useField(name);

  const handleChange = (option) => {
    if (values.includes(option.code)) {
      field.onChange({
        target: {
          name: field.name,
          value: values.filter((val) => val !== option.code)
        }
      });
    } else {
      field.onChange({
        target: { name: field.name, value: [...values, option.code] }
      });
    }
  };

  return (
    <React.Fragment>
      {options.map((option, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={values.includes(option.code)}
                onChange={() => handleChange(option)}
                name={`${option.code}`}
              />
            }
            label={option.name}
          />
        );
      })}
    </React.Fragment>
  );
};
