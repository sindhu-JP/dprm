import React from 'react';

import {
  Grid,
  makeStyles,
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  Typography
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import { Table } from 'Components';

import SearchIcon from '@material-ui/icons/Search';

// import ProjectOverview from 'Features/ProjectManagement/ProjectOverview';
import { useBoolean } from 'react-hanger';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  }
}));
export default function SearchBar() {
  const classes = useStyles();
  const enableSearch = useBoolean(false);
  return (
    <div>
      <Box>
        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={4}>
                  {enableSearch.value ? (
                    <Grid item>
                      <TextField
                        style={{ width: '400px' }}
                        id="standard-basic"
                        fullWidth
                        placeholder="Search by Quote ID, Name"
                        InputProps={{
                          disableunderline: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon
                                fontSize="large"
                                className={classes.iconSearch}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  ) : (
                    <>
                      <Grid item>
                        {/* <img src={img} className={classes.imglog} />A */}
                      </Grid>
                      <Grid item>
                        <Typography variant="h2" className={classes.title}>
                          {/* {'Financial'} */}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  spacing={4}
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <Grid item>
                        {enableSearch.value ? (
                          <Tooltip title="Close" placeholder="bottom">
                            <CloseOutlinedIcon
                              fontSize={'small'}
                              onClick={enableSearch.toggle}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Search" placeholder="bottom">
                            <SearchIcon
                              fontSize={'large'}
                              onClick={enableSearch.toggle}
                            />
                          </Tooltip>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* taxdocument */}

                  {/* tax end */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
