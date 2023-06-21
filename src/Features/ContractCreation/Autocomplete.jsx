import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const AutoSelect = ({
  required,
  type,
  label,
  form,
  field,
  options,
  fullWidth,
  margin,
  placeholder,
  ...props
}) =>{
  const { name, onChange, value } = field;
  return (
    <Autocomplete
      {...props}
      type = { type }
      name = { name }
      value = { value }
      onChange = { onChange }
      getOptionLabel={option =>option.label}
      options = { options }
      renderInput={params =>{
        return (
          <TextField 
            {...params}             
            variant="outlined"  
            fullWidth 
            placeholder={ placeholder }
          />
        )
      }}
    />
  )
}

 export default AutoSelect