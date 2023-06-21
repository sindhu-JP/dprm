import React, { useState } from 'react';
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
const styles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 220,
    width: ({ full }) => (full ? '100%' : 'auto')
  },
  root: {
    '& .Mui-selected': {
      width:'100px !important',
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.primary.main
          : theme.palette.common.black,
      color:
        theme.palette.type === 'light'
          ? theme.palette.primary.contrastText
          : '#000',
      '&:hover': {
        backgroundColor:
          theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.common.black,
        color:
          theme.palette.type === 'light'
            ? theme.palette.primary.contrastText
            : theme.palette.primary.white
      }
    },

    padding: 0,
    maxHeight: '200px',
    '& ul': {
      backgroundColor: theme.palette.common.gray
    },
    '& li': {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
        color: '#000'
      }
    },

    '& .MuiPaper-root': {
      padding: 0
    }
  }
}));

const SelectDropDown = ({
  value,
  handleChange,
  options,
  label,
  selectedUserData,
  full
}) => {
  const classes = styles({ full });

  const [selectValue, setSelectValue] = useState('');

  const onChangeSelect = (e) => {
    let getSelected = options.find(
      (element) => element.name === e.target.value
    );

    setSelectValue(e.target.value);
    if (selectedUserData) {
      handleChange(getSelected);
    } else {
      handleChange(e);
    }
  };

  React.useEffect(() => {
    if (value) {
      setSelectValue(value);
    }
  }, [value]);
  return (
    <FormControl className={classes.formControl} full={full}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <MuiSelect
        className={classes.root}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        fullWidth
        //   value={age}
        MenuProps={{ classes: { paper: classes.root } }}
        onChange={onChangeSelect}
      >
        {options?.map((opt, key) => (
          <MenuItem key={opt.id} value={opt.code} name={opt.id}>
            {opt.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
export default SelectDropDown;
