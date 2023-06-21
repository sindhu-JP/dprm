import { Grid, IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import refreshIconLite from 'Assets/Icons/RefreshIconLitee.svg';
import { useSelector } from 'react-redux';
export default function Refresh({ handleRefresh }) {
  const {ThemeType} = useSelector(state=>(state.Appearance));
  return (
    <Grid container>
      <Grid item>
        <Tooltip title="Refresh" placeholder="bottom">
          <IconButton>
            {ThemeType === 'dark' ? (
              <img src={refreshIconLite} fontSize="small" onClick={handleRefresh} />
            ) : (
              <img
                src={refreshIcon}
                fontSize="small"
                onClick={handleRefresh}
              />
            )}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
