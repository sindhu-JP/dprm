import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { Trans } from '@lingui/react';
import SelectDropDown from 'Components/Dropdown';
const Header = ({ list, handleChange, defaultValue, value }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Grid container>
              <Grid item xs={4}>
                {/* {value&&
              <Autocomplete
              label="Search Groups"
              onChange={handleSelect}
              //  value={value}
              options={list || []}
              userMM={false}
              defaultValue={defaultValue}
            />} */}

                <SelectDropDown
                  label={<Trans id="Search Groups"></Trans>}
                  handleChange={handleChange}
                  options={list || []}
                  value={value}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
