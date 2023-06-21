import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';

const AutocompletOpp = ({
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
  disabledValue,

  handlChangeLead
  // selectedValue
}) => {
  return (
    <Controller
      // onChange={([, data]) => data}
      onChange={([, data]) => handlChangeLead(data)}
      name={name}
      control={control}
      rules={{ required: false }}
      // defaultValue={options?.find(item => item.code === userData?.sub)}
      defaultValue={options?.find((item) => item.code === existingValue)}
      // value={disabledValue ? userData?.sub : options.code}
      // defaultValue={options?.find(item => item.code === existingValue)}
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
                required: false
              }}
            />
          )}
          onChange={(e, data) => onChange(data)}
          // onChange={(e, data) => handlChangeLead(data)}

          // onChange={(e, data) =>
          //   disabledValue ? onChange(data) : onChange(options.find(item => item.code === userData?.sub))
          // }
          // onChange={(event, newValue) => {
          //   // setSelectedValue(newValue);
          //   onChange(newValue)
          // }}
          // value={selectedValue}

          {...props}
          {...autocompleteProps}
        />
      )}
      {...controllerProps}
    />
  );
};

AutocompletOpp.propTypes = {};

export default AutocompletOpp;
