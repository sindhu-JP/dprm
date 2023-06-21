import React from 'react';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';
import { TextField, Paper, Typography } from '@material-ui/core';

const BodyWrapper = ({ children }) => (
  <Paper style={{ padding: 0 }}>{children}</Paper>
);

const Autocomplete = ({
  options,
  label,
  onChange,
  name,
  required,
  value,
  placeholder,
  defaultValue,
  onchangeCode,
  handleSelect,
  // defaultValue,
  userMM = true,
  ...props
}) => {
  return (
    <MuiAutocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) => option.label || ''}
      value={value}
      required={required}
      InputLabelProps={{ required: true }}
      defaultValue={defaultValue}
      // onInputChange={(e) => onchangeCode(e)}
      // onSelect={(e) => handleSelect(e)}

      renderOption={(option) => (
        <React.Fragment>
          {userMM ? (
            <Typography variant="subtitle1">
              {option.name} -({option.status})
            </Typography>
          ) : (
            <Typography variant="subtitle1">{option.name}</Typography>
          )}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ required: true }}
          margin={props.margin}
          label={label}
          fullWidth
          //  value={value}
          placeholder={placeholder}
          InputLabelProps={{ required: props.required }}
          // defaultValue={defaultValue}
        />
      )}
      onChange={(e, v) => {
        if (v && typeof onChange === 'function') {
          onChange({ target: { name, value: v.value, ...v } });
        }
      }}
      {...props}
    />
  );
};

Autocomplete.defaultProps = {
  margin: 'none'
};
export default Autocomplete;
