import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';

const Autocomplete = ({
  name,
  label,
  variant,
  options,
  control,
  error,
  required,
  helperText,
  inputProps,
  controllerProps,
  autocompleteProps,
  existingValue,

  userData,
  disabledValue

  // handlChangeLead,
  // selectedValue
}) => {
  return (
    <Controller
      onChange={([, data]) => data}
      // onChange={([, data]) => handlChangeLead(data)}
      name={name}
      control={control}
      render={({ onChange, ...props }) => (
        <MuiAutocomplete
          options={options}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => value.code}
          disabled={disabledValue}
          renderInput={(params) => (
            <TextField
              required={required}
              error={error}
              helperText={helperText}
              label={label}
              variant={variant}
              {...params}
              {...inputProps}
              disabled={disabledValue}
              //  InputLabelProps={{required:false}}
              InputProps={{
                ...params.InputProps,
                ...inputProps?.InputProps,
                required: true
              }}
            />
          )}
          onChange={(e, data) => onChange(data)}
          {...props}
          {...autocompleteProps}
        />
      )}
      {...controllerProps}
    />
  );
};

Autocomplete.propTypes = {};

export default Autocomplete;
