import {
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Tooltip
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
// import Filter from 'Assets/Icons/Filter.svg';
import filterSvg from 'Assets/Icons/filterSvg.svg';
import filterSvgLite from 'Assets/Icons/filterSvgLite.svg';
// import img from 'Assets/Icons/TenantIcon.svg';
// import imgD from 'Assets/Icons/TenantIcon.svg';
import Refresh from './Refresh';
import ReportsFilter from 'Components/ReportsFilter';
import { useBoolean, useStateful } from 'react-hanger';
import NormalSearch from './NormalSearch';
import groupsStore from 'Store/Groups';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  snackBar: {
    color: 'gray',
    borderColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '16px'
  },
  welcomeMessage: {
    fontWeight: theme.typography.fontWeightBold,
    font: 'normal normal medium 20px/24px Roboto',
    letterSpacing: '0px',
    color: '#57606F',
    opacity: 1
  },
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(30)})`,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '85vh'
  },
  iconSizing: {
    height: '30px',
    width: '30px'
  },
  table: {
    backgroundColor: theme.palette.common.white,
    '& > thead': {
      backgroundColor: theme.palette.common.white
    }
  },
  icons: {
    cursor: 'pointer'
  },
  //for filter css
  root: {
    position: 'relative'
  },
  reports: {
    marginRight: '3rem',
    background: 'white',
    borderRadius: '0px',
    top: '2px',
    fontSize: '1.0rem'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(18),
    right: 0
  },
  paper: {
    // padding: 0,
    width: 390,
    // minHeight: 480,
    // maxHeight: 550

    height: 'auto'
  },
  left: {
    paddingLeft: '16px'
  },
  right: {
    marginLeft: 'auto',
    paddingRight: '16px'
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4),
    borderRadius: theme.spacing(4),
    width: '99%'
  },
  searchIcon: {
    stroke: theme.palette.icon.stroke
  }
}));
export default function TableSearch({
  title,
  RefresheHandler,
  potentialTenats,
  filterHandler,
  downloadHandler,
  searchHandler,
  SearchOptions,
  onsearch,
  handleRefresh,
  onSelectValues,
  searchBy,
  setSearchBy,
  handlFilter,
  FilterObj,
  filter,
  placeholder,
  partnerValue,
  commonstatus,
  tenantValue,
  clearFilters,
  tableData,
  searchTab,
  Options = [],
  showIcon= false,
  onSearchTable,
  TableSearchBar,
  searchText,
  setSearchId,
  loader,
  customerFilter,
  showStatus,
  inputValue,
  setInputValue,
  isSearchValuesControlledByParent,
  tabIcon
  // ThemeType
}) {
  console.log('Options', Options);
  const classes = useStyles();
  const searchToggle = useBoolean(false);
  const showFilter = useBoolean(false);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const [searchValueBy, setSearchValueBy] = React.useState('');
  const [text, setText] = React.useState('');
  const Text = useStateful('');
  const dateFormat = () => {
    if (FilterObj.value?.fromDate || FilterObj.value?.toDate) {
      if (FilterObj.value?.fromDate && FilterObj.value?.toDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const handlFilterApply = () => {
    if (!_.isEmpty(FilterObj.value)) {
      if (dateFormat()) {
        handlFilter();
        showFilter.setFalse();
      }
      //  FilterObj.setValue({});
    }
  };
  const handleClickAway = () => {
    showFilter.setFalse();
    // filtermenu.setFalse()
    //  partnerFilter.setFalse()
  };
  const handleRefreshIcon = () => {
    console.log('refresh items');
    searchToggle.setFalse();
    setSearchValueBy('');
    setText('');
    handleRefresh();
    if (searchTab === 'Tasks') {
      dispatch(
        groupsStore.onTableSearch({
          id: 'Tasks',
          context: {
            onSearch: tableData
            // value: e.currentTarget.value
          }
        })
      );
    } else if (searchTab === 'Users') {
      dispatch(
        groupsStore.onTableSearch({
          id: 'Users',
          context: {
            onSearch: tableData
            // value: e.currentTarget.value
          }
        })
      );
    }
  };
  return (
    <Box py={3}>
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item>
                {  showIcon &&  <IconButton>
                    {ThemeType === 'dark' ? (
                      <img src={tabIcon} className={classes.iconSizing} />
                    ) : (
                      <img src={tabIcon} className={classes.iconSizing} />
                    )}
                  </IconButton>}
                </Grid>
                <Grid item>
                  <Typography
                    variant="h2"
                    // className={classes.title}
                  >
                   
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h2"
                    // className={classes.title}
                  >
                    {title}
                  </Typography>
                </Grid>
              
                {/* </>
            )} */}
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
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
                      {TableSearchBar ? (
                        <SearchBar
                          Options={Options}
                          onSearchTable={onSearchTable}
                          setText={setText}
                          text={text}
                          setSearchBy={setSearchValueBy}
                          searchBy={searchValueBy}
                          Text={Text}
                          searchText={searchText}
                          setSearchId={setSearchId}
                          loader={loader}
                        />
                        ) : (
                        <NormalSearch
                          // Options={Options}
                          onsearch={onsearch}
                          SearchOptions={SearchOptions}
                          onSelectValues={onSelectValues}
                          searchBy={searchBy}
                          setSearchBy={setSearchBy}
                          searchToggle={searchToggle}
                          placeholder={placeholder}
                          tableData={tableData}
                          searchTab={searchTab}
                          searchText={searchText}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {filter === 'true' && (
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <Grid
                          container
                          className={classes.root}
                          alignItems="baseline"
                          spacing={1}
                        >
                          <Grid item>
                            <Tooltip title="Filter" placeholder="bottom">
                              <IconButton>
                                {ThemeType === 'dark' ? (
                                  <img
                                    src={filterSvgLite}
                                    onClick={() => showFilter.toggle()}
                                  />
                                ) : (
                                  <img
                                    src={filterSvg}
                                    onClick={() => showFilter.toggle()}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Grid>

                          {showFilter.value && (
                            <Grid item className={classes.dropdown}>
                              <Paper className={classes.paper}>
                                <ReportsFilter
                                  sumaryCardDetails={{}}
                                  handlFilterApply={handlFilterApply}
                                  FilterObj={FilterObj}
                                  showFilter={showFilter}
                                  partnerValue={partnerValue}
                                  commonstatus={commonstatus}
                                  tenantValue={tenantValue}
                                  clearFilters={clearFilters}
                                  potentialTenats={potentialTenats}
                                  showStatus={showStatus}
                                  // StatusList={StatusList}
                                />
                              </Paper>
                            </Grid>
                          )}
                        </Grid>
                      </ClickAwayListener>
                    </Grid>
                  </Grid>
                )}
                {customerFilter && (
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <Grid
                          container
                          className={classes.root}
                          alignItems="baseline"
                          spacing={1}
                        >
                          <Grid item>
                            <Tooltip title="Filter" placeholder="bottom">
                              <IconButton>
                                {ThemeType === 'dark' ? (
                                  <img
                                    src={filterSvgLite}
                                    onClick={() => showFilter.toggle()}
                                  />
                                ) : (
                                  <img
                                    src={filterSvg}
                                    onClick={() => showFilter.toggle()}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Grid>

                          {showFilter.value && (
                            <Grid item className={classes.dropdown}>
                              <Paper className={classes.paper}>
                                <ReportsFilter
                                  sumaryCardDetails={{}}
                                  handlFilterApply={handlFilterApply}
                                  FilterObj={FilterObj}
                                  showFilter={showFilter}
                                  partnerValue={partnerValue}
                                  commonstatus={commonstatus}
                                  tenantValue={tenantValue}
                                  clearFilters={clearFilters}
                                  potentialTenats={potentialTenats}
                                  showStatus={showStatus}
                                  // StatusList={StatusList}
                                />
                              </Paper>
                            </Grid>
                          )}
                        </Grid>
                      </ClickAwayListener>
                    </Grid>
                  </Grid>
                )}
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                    spacing={4}
                  >
                    <Grid item>
                      <Refresh handleRefresh={handleRefreshIcon} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
