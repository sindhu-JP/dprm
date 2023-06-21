import React from 'react';
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  InputBase,
  withStyles,
  makeStyles
} from '@material-ui/core';

const Input = withStyles((theme) => ({
  root: {
    backgrounColor: 'green'
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: theme.spacing(3, 7, 3, 4),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  menu: {
    '&:hover': {
      color: '#fff'
    }
  }
}));
const SelectBox = (props) => {
  const {
    size,
    value,
    onChange,
    options,
    label,
    optionLabelProp,
    valueType,
    width,
    disabled,
    errorcomponent,
    touched,
    error,
    optional,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <>
      <FormControl
        size={size}
        style={{ minWidth: optional ? '90%' : '100%' }}
        fullWidth={optional ? false : true}
        error={touched && !value}
        required={props.required}
      >
        <InputLabel
          id="demo-simple-select-filled-label"
          className={touched && error && !value ? classes.error : ''}
        >
          {label}
        </InputLabel>
        <MuiSelect
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={onChange}
          fullWidth
          disabled={disabled}
          size="small"
          MenuProps={{
            style: {
              maxHeight: 500,
              color: '#fff',
              width: `${width}rem`
            }
          }}
          {...rest}
        >
          {options?.map(
            (opt, key) =>
              ({
                object: (
                  <MenuItem key={key} value={opt} className={classes.menu}>
                    {opt[optionLabelProp]}
                  </MenuItem>
                ),
                id: (
                  <MenuItem key={key} value={opt.id} className={classes.menu}>
                    {opt[optionLabelProp]}
                  </MenuItem>
                )
              }[valueType] || (
                <MenuItem key={key} value={opt.value} className={classes.menu}>
                  {opt.label}
                </MenuItem>
              ))
          )}
        </MuiSelect>
        {errorcomponent}
      </FormControl>
    </>
  );
};

export default SelectBox;
