import React from 'react';

import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import SelectDropDown from 'Components/Dropdown';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const Setavailable = ({ value, userDetails, handleChange, list }) => {
  const [selectValue, setSelectValue] = React.useState('');
  const classes = useStyles();
  const options = [
    {
      name: 'Available'
    },
    { name: 'Unavailble' }
  ];
  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
    handleChange(e);
  };
  // React.useEffect(() => {
  //   if (userDetails?.list?.availbility) {
  //     setSelectValue(userDetails?.list?.availbility);
  //   }
  // }, [selectValue]);
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2" className={classes.title}>
            Set Available
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item>
            {/* <Select
              labelId="label"
              id="select"
              value={selectValue}
              onChange={onChangeSelect}
            >
              {options.map((opt) => (
                <MenuItem value={opt.name}>{opt.name}</MenuItem>
              ))}
            </Select> */}
            <SelectDropDown
              label=""
              handleChange={handleChange}
              options={list || []}
              value={value}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Setavailable;
