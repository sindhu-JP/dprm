import React, { useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Typography,
  ClickAwayListener,
  Tooltip
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Trans } from '@lingui/react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import classNames from 'classnames';
import Status from 'lib/constants/statuses';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    border: `${theme.spacing(0.2)} solid ${theme.palette.background.light}`,
    borderRadius: theme.spacing(5)
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

function SearchInput({
  //   options = [],
  onsearch,
  filterApplied,
  defaultSearchBy,
  defaultText,
  setSearchBy,
  searchBy,
  //   setText,
  onSelectValues,
  //   text,
  placeholder = <Trans id="Search"></Trans>,
  SearchOptions
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [searchBy, setSearchBy] = useState('' || '');
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(null);

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

  const onSearchAction = (event) => {
    event.preventDefault();
    if (!searchBy && !_isEmpty(Status.TableSearchOptions[SearchOptions])) {
      setHasError('searchBy');
      return;
    }
    if (!text) {
      setHasError('text');
      return;
    }
    setText('');
    onsearch({
      value: text
    });
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
      {!_isEmpty(Status.TableSearchOptions[SearchOptions]) && (
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
                  {searchBy || <Trans id="Search By"></Trans>}
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
      )}
      <Grid item className={classes.searchContainer}>
        <Grid container alignItems="center">
          <Grid item className={classes.searchBarTextField}>
            <InputBase
              placeholder={_get(placeholder, 'props.id', '')}
              inputProps={{ 'aria-label': 'search bar' }}
              value={text}
              className={classes.fullWidth}
              onChange={(e) => {
                setText(e.currentTarget.value);
                setHasError(null);
              }}
              className={classNames(
                hasError && hasError === 'text' ? classes.error : ''
              )}
            />
          </Grid>
          <Grid item>
            <Tooltip title="Search" placeholder="bottom">
              <IconButton
                type="submit"
                aria-label="search"
                onClick={onSearchAction}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchInput;
