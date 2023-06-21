import React, { useState } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import classNames from 'classnames';

import { TextField } from '@material-ui/core';
import { Trans } from '@lingui/react';
import { SearchOutlined } from '@material-ui/icons';
import groupsStore from 'Store/Groups';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  searchBar: {
    // border: `${theme.spacing(0.2)} solid ${theme.palette.background.light}`,
    // borderRadius: theme.spacing(5)
  },
  root: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    // right: 0,
    padding: theme.spacing(1),
    top: theme.spacing(14)
  },
  menuItem: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  searchContainer: {
    flex: 1,
    marginLeft: theme.spacing(1)
  },
  searchBarTextField: {
    flex: 1,
    '& .MuiInputBase-root': {
      width: '100%'
    }
  },
  outlineSearch: {
    height: '20px',
    fontSize: 'small',
    width: '20px',
    color: 'fill:#000;opacity:1.5'
  },
  fullWidth: {
    width: '100%'
  },
  error: {
    color: theme.palette.error.main
  },
  searchBarError: {
    borderColor: theme.palette.error.main
  }
}));

function NormalSearch({
  //   options = [],
  onsearch,
  filterApplied,
  defaultSearchBy,
  defaultText,
  setSearchBy,
  searchBy,
  //   setText,
  onSelectValues,
  searchToggle,
  //   text,
  placeholder,
  tableData,
  searchTab,
  SearchOptions
  //   placeholder=""
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // const [searchBy, setSearchBy] = useState('' || '');
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleSelect = (item) => {
    setSearchBy(item.name);
    onSelectValues.setValue(item);
    setHasError(null);
    handleClickAway();
  };

  const onSearchAction = (value) => {
    // event.preventDefault();

    // if (!text) {
    //   setHasError('text');
    //   return;
    // }
    if (value.length >= 2) {
      setText(value);
      onsearch(value);
    } else {
      setHasError('text');
    }
  };

  const handleSearch = (e) => {
    if (searchTab === 'Tasks') {
      dispatch(
        groupsStore.onTableSearch({
          id: searchTab,
          context: {
            onSearch: tableData,
            value: e.currentTarget.value
          }
        })
      );
    } else if (searchTab === 'Users') {
      dispatch(
        groupsStore.onTableSearch({
          id: searchTab,
          context: {
            onSearch: tableData,
            value: e.currentTarget.value
          }
        })
      );
    }
  };

  //   const searchByName = searchBy
  //     ? options
  //     : '';

  return (
    <Grid
      container
      alignItems="center"
      className={classNames(
        classes.searchBar,
        hasError ? classes.searchBarError : ''
      )}
    >
      {/* {!_isEmpty(Status.TableSearchOptions[SearchOptions]) && (
        <Grid item>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
              <Button
                type="button"
                size="small"
                onClick={handleClick}
                className={classNames(
                  hasError && hasError === 'searchBy' ? classes.error : ''
                )}
              >
                <Typography
                  variant="subtitle2"
                  className={classNames(
                    hasError && hasError === 'searchBy' ? classes.error : ''
                  )}
                >
                  {searchBy || <Trans>Search By</Trans>}
                </Typography>
                <ArrowDropDownIcon />
              </Button>
              {open ? (
                <Grid item className={classes.dropdown}>
                  <Paper>
                    {Status.TableSearchOptions[SearchOptions]?.map((item) => (
                      <MenuItem
                        onClick={() => handleSelect(item)}
                        key={item.id}
                        // selected={item.id === searchBy}
                        className={classes.menuItem}
                      >
                        <Typography variant="subtitle2">{item.name}</Typography>
                      </MenuItem>
                    ))}
                  </Paper>
                </Grid>
              ) : null}
            </div>
          </ClickAwayListener>
        </Grid>
      )} */}
      <Grid item>
        <Grid container alignItems="center">
          {searchToggle.value && (
            <Grid item>
              <Tooltip title={placeholder} placeholder="bottom">
                <TextField
                  fullWidth
                  id="standard-bare"
                  variant="outlined"
                  placeholder={placeholder}
                  inputProps={{}}
                  // style={{
                  //   width: 400
                  // }}
                  onChange={(e) => {
                    setText(e.currentTarget.value);
                    setHasError(null);
                    onSearchAction(e.currentTarget.value);
                    handleSearch(e);
                  }}
                  size="small"
                  className={classNames(
                    hasError && hasError === 'text' ? classes.error : ''
                  )}
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        title={<Trans id="Search"></Trans>}
                        placeholder={<Trans id="bottom"></Trans>}
                      >
                        <IconButton>
                          <SearchOutlined className={classes.outlineSearch} />
                        </IconButton>
                      </Tooltip>
                    )
                  }}
                />
              </Tooltip>
            </Grid>
          )}
          {!searchToggle.value && (
            <Grid item>
              <Tooltip title="Search" placeholder="bottom">
                <IconButton
                  type="submit"
                  aria-label="search"
                  onClick={() => searchToggle.toggle()}
                >
                  <SearchOutlined className={classes.outlineSearch} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NormalSearch;
