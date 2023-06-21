import React, { useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Typography,
  ClickAwayListener
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Trans, useLingui } from '@lingui/react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import classNames from 'classnames';
// import { useStateful } from 'react-hanger';
const useStyles = makeStyles((theme) => ({
  searchBar: {
    border: `${theme.spacing(0.2)} solid ${theme.palette.background.light}`,
    borderRadius: theme.spacing(5)
  },
  root: {
    position: 'relative'
  },
  rootTwo: {
    '& .MuiListItem-root': {
      '& .MuiTypography-h6': {
        color: theme.palette.primary.black,
        '&:hover': {
          color:
          theme.palette.type === 'dark'
            ? `${theme.palette.common.gray} !important`
            :  theme.palette.common.white,
          backgroundColor: theme.palette.primary.main
        }
      },

      '&:hover': {
        '& .MuiTypography-h6': {
          color:
          theme.palette.type === 'dark'
            ? `${theme.palette.common.gray} !important`
            :  theme.palette.common.white,
        },
        backgroundColor: theme.palette.primary.main,
        color:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.gray} !important`
          :  theme.palette.common.white,
      }
    },
    '&.MuiPaper-rounded': {
      borderRadius: '0px'
    },
    '&.MuiPaper-root': {
      // backgroundColor: theme.palette.primary.main,
      color: '#ffffff !important',
      backgroundColor:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.gray} !important`
          : theme.palette.primary.dropDownSelected,
      color: theme.palette.primary.selectedFont,
      '& :hover': {
        color: '#ffffff !important',
        backgroundColor:
        theme.palette.type === 'dark'
          ? `${theme.palette.primary.black} !important`
          : '#000000 !important',
      },
      '&.MuiTouchRipple-root': {
        color: '#ffffff !important',
        '& :hover': {
          color: '#ffffff !important',
          backgroundColor:
          theme.palette.type === 'dark'
            ? `${theme.palette.primary.black} !important`
            : '#000000 !important',
        },
      },
    },
    padding: 0,
    '& ul': {
      // backgroundColor: theme.palette.primary.paperBackColor
      color: theme.palette.primary.contrastText,
      '& :hover': {
        backgroundColor:
          theme.palette.type === 'dark'
            ? `${theme.palette.primary.black} !important`
            : theme.palette.primary.onHover,
            color: '#ffffff !important',
        // backgroundColor: theme.palette.primary.onHover,
        // color: theme.palette.primary.black
        // backgroundColor:'blue',
        // color:'red'
      }
    },
    '& li': {
      color: theme.palette.primary.contrastText,
      padding:'7px 15px',
      '& :hover': {
        backgroundColor:
          theme.palette.type === 'dark'
            ? `${theme.palette.primary.black} !important`
            : theme.palette.primary.onHover,
            color: '#ffffff !important',
        // backgroundColor: theme.palette.primary.onHover,
        // color: theme.palette.primary.black
        // backgroundColor:'blue',
        // color:'red'
      }
    },

    '& .MuiPaper-root': {
      padding: 0,
    }
  },
  paper: {
    '& .MuiPaper-rounded': {
      borderRadius: '16px',
      padding: '10px'
    }
  },

  dropdown: {
    position: 'absolute',
    zIndex: 10,
    padding: '10px',
    // right: 0,

    top: theme.spacing(14)
  },
  menuItem: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  searchContainer: {
    flex: 1,
    marginLeft: theme.spacing(1),
    padding: '6px'
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
  },
  newErrorText: {
    color: theme.palette.error.main,
    fontSize: '12px',
    marginTop: '5px'
  }
}));
function SearchBar({
  //   options = [],
  onsearch,
  filterApplied,
  defaultSearchBy,
  defaultText,
  setSearchBy,
  searchBy,
  setText,
  onSelectValues,
  usergrpinfo,
  user,
  text,
  placeholder,
  Options,
  onSearchTable,
  Text,
  setSearchId,
  searchText,
  hasError,
  setHasError
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //   const [searchBy, setSearchBy] = useState('' || '');
  //   const [text, setText] = useState('' || '');
  // const [hasError, setHasError] = useState(null);
  const [detailedError, setDetailedError] = useState(null);
  //    const onSelectValues= useStateful({})
  const [Searchoptions, setOptions] = useState([]);
  const [hideMenu, setHideMenu] = useState(true);

  const { i18n } = useLingui();

  const handleClick = () => {
    setHideMenu(true);
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (Options?.length > 0) {
      setOptions(Options);
    } else {
      setOptions([]);
    }
    // setText('');
  }, [Options]);
  const handleSelect = (item) => {
    // console.log(item, "teyxxx")
    setSearchBy(item);
    setSearchId && setSearchId(item);
    // onSelectValues.setValue(item)
    setHasError && setHasError(null);
    handleClickAway();
    setOpen((prev) => !prev);
    setHideMenu(false);
  };
  const onSearchAction = (event) => {
    event.preventDefault();
    if (_.isEmpty(searchBy) && !_isEmpty(Searchoptions)) {
      setHasError('searchBy');
      setDetailedError('Please select search by option');
      return;
    }
    if (!text || text.length <= 3) {
    setHasError && setHasError('text');
      setDetailedError('Please enter at least 4 characters');
      return;
    }
    console.log('text', text);

    onSearchTable(searchBy, text);
    // onsearch({
    //   value: text,
    //   Url: onSelectValues.value.url,
    //   user: user,
    //   usergrpinfo: usergrpinfo
    // });
  };
  //   const searchByName = searchBy
  //     ? options
  //     : '';

  return (
    <>
      <Grid
        container
        alignItems="center"
        className={classNames(
          classes.searchBar,
          hasError ? classes.searchBarError : ''
        )}
        style={{ padding: '0.2rem' }}
      >
        {!_isEmpty(Searchoptions) && (
          <Grid item>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className={classes.root}>
                <Button
                  type="button"
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
                    {searchBy?.name || <Trans id="Search By"></Trans>}
                  </Typography>
                  <ArrowDropDownIcon />
                </Button>
                {open && hideMenu ? (
                  <Grid item className={classes.dropdown}>
                    <Paper
                      className={classes.rootTwo}
                      style={{ position: 'absolute', top: '5px' }}
                    >
                      {Searchoptions?.map((item) => (
                        <MenuItem
                          onClick={() => handleSelect(item)}
                          key={item.id}
                          // selected={item.id === searchBy}
                          className={classes.menuItem}
                        >
                          <Typography variant="h6">
                            {item?.name}
                          </Typography>
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
                fullWidth
                // style={{ width: '700px' }}
                placeholder={
                  !placeholder || placeholder === 'Search'
                    ? i18n.t`Search`
                    : `${_get(placeholder, 'props.id', '')}`
                }
                inputProps={{ 'aria-label': 'search bar' }}
                value={text}
                // className={classes.fullWidth}
                onChange={(e) => {
                  setText(e.currentTarget.value);
                  Text.setValue(e.currentTarget.value);
                  searchText.setValue(e.currentTarget.value);
                  setHasError(null);
                }}
                className={classNames(
                  hasError && hasError === 'text' ? classes.error : ''
                )}
              />
            </Grid>
            <Grid item>
              <IconButton
                type="submit"
                aria-label="search"
                onClick={onSearchAction}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {hasError && (
        <Typography
          variant="subtitle2"
          className={classNames(classes.newErrorText)}
        >
          {detailedError}
        </Typography>
      )}
    </>
  );
}
export default SearchBar;
