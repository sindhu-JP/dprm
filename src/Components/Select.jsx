import React from 'react';
import PropTypes from 'prop-types';
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  InputBase,
  Box,
  withStyles,
  makeStyles
} from '@material-ui/core';

const Input = withStyles((theme) => ({
  root: {
    backgrounColor: 'green',
    '& .MuiMenu-paper': {
      padding: 0
    },  
  },

  input: {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 40px 10px 28px',
    paddingRight:"0px",
    // padding: theme.spacing(3, 7, 3, 4),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const Select = ({ value, onChange, options = [], label }) => {
  const classes = useStyles();
  return (
    <Box px={2}>
      <FormControl>
        <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
        <MuiSelect
          className={classes.root}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={onChange}
          size="small"
          input={<Input />}
          MenuProps={{ classes: { paper: classes.root } }}
        >
          {options?.map((opt, key) => (
            <MenuItem key={key} value={opt.code}>
              {opt.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    '& .Mui-selected': {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: theme.palette.type === 'dark'
        ? `${theme.palette.common.gray} !important`
        : theme.palette.primary.dropDownSelected,
      color: theme.palette.primary.selectedFont,
      '&:hover': {
        color: "#ffffff",
        backgroundColor: theme.palette.type === 'dark'
          ? `${theme.palette.common.gray} !important`
          : theme.palette.primary.dropDownSelected
      }
    },
    padding: 0,
    '& ul': {
      backgroundColor: theme.palette.primary.paperBackColor
    },
    '& li': {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark'
          ? `${theme.palette.primary.black} !important`
          : theme.palette.primary.onHover,
        color: "#000000"
        // backgroundColor: theme.palette.primary.onHover,
        // color: theme.palette.primary.black
        // backgroundColor:'blue',
        // color:'red'
      }
    },

    '& .MuiPaper-root': {
      padding: 0
    }
  }
}));
Select.defaultProps = {
  variant: 'filled',
  id: 'select-sdfsf',
  label: '',
  value: '',
  onChange: () => { },
  options: []
};

Select.propTypes = {
  variant: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
};
export default Select;
