/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function MultiSelectDropDown({options, onchangeDropdown, defaultValue}) {
  const classes = useStyles();
  
  return (    
    <div className={classes.root}>
      
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={options}
        getOptionLabel={(option) => option.title}
        onChange={(e, v)=>onchangeDropdown(e, v)}
        defaultValue={defaultValue}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Add User" placeholder="User Name" />
        )}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

