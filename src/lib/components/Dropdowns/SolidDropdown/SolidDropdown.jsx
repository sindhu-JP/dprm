import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  MenuItem,
  FormControl,
  Select,
  InputBase,
  withStyles
} from '@material-ui/core';

const Input = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    position: 'relative',
    backgroundColor: 'transparent',
    fontSize: theme.spacing(6),
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(6),
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}))(InputBase);

const SolidDropdown = ({
  name,
  value,
  options,
  onChange,
  emptyLabel,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      <Select
        {...rest}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        input={<Input />}
      >
        <MenuItem value="">
          <em>{emptyLabel || 'None'} </em>
        </MenuItem>
        {options?.map((opt, index) => (
          <MenuItem key={index} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
const useStyles = makeStyles((theme) => ({
  select: {
    '&:focus': {
      background: '#57606F !important'
    }
  }
}));

SolidDropdown.defaultProps = {
  options: [],
  value: ''
};

SolidDropdown.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  nullValue: PropTypes.object
};
export default SolidDropdown;
