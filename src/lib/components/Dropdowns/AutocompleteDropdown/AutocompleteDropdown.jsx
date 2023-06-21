import React from 'react';

import { TextField } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';

const AutocompleteDropdown = ({
  variant,
  options,
  label,
  name,
  onChange,
  width,
  autoHighlight,
  value,
  required,
  ...rest
}) => {
  const handleChange = (event, selection) => {
    onChange({
      target: {
        name,
        value: selection
      }
    });
  };

  return (
    <MuiAutocomplete
      options={options}
      style={{ width }}
      autoHighlight={autoHighlight}
      label={label}
      name={name}
      onChange={handleChange}
      getOptionLabel={(option) => option.name || ''}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ required: true }}
          variant={variant}
          required={required}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password'
          }}
        />
      )}
      {...rest}
    />
  );
};

AutocompleteDropdown.defaultProps = {
  // label: "LEAD CLASSIFICATION",
  name: 'leadClassification',
  onChange: () => {},
  width: '100%',
  autoHighlight: true,
  variant: 'standard',
  label: 'Input Label',
  value: '',
  options: []
};

AutocompleteDropdown.propTypes = {};
export default AutocompleteDropdown;
