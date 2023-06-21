import { Grid, makeStyles,Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Refresh from '../../Components/TableSearch/Refresh';
import { useBoolean, useStateful } from 'react-hanger';
import NormalSearch from '../../Components/TableSearch/NormalSearch';
import groupsStore from 'Store/Groups';
import SearchBar from '../../Components/TableSearch/SearchBar';

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
  resetList,
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
  onSearchTable,
  TableSearchBar,
  searchText,
  setSearchId,
  loader,
  text,
  setText,
  setPartnerList
  // ThemeType
}) {
  const classes = useStyles();
  const searchToggle = useBoolean(false);
  const showFilter = useBoolean(false);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const [searchValueBy, setSearchValueBy] = React.useState('');
  const [hasError, setHasError] = React.useState(null);
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
    setHasError(false)
    searchToggle.setFalse();
    setSearchBy('');
    setText('');
    resetList();
    onSelectValues('');
    if (searchTab === 'Tasks') {
      dispatch(
        groupsStore.onTableSearch({
          id: 'Tasks',
          context: {
            onSearch: ''
            // value: e.currentTarget.value
          }
        })
      );
    } else if (searchTab === 'Users') {
      dispatch(
        groupsStore.onTableSearch({
          id: 'Users',
          context: {
            onSearch: ''
            // value: e.currentTarget.value
          }
        })
      );
    }
  };
  return (
    <Box py={2}>
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="space-between"
      spacing={4}
      xs={12}
    >
      <Grid item xs={11}>
        {!TableSearchBar ? (
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
            setText={setText}
            text={text}
          />
        ) : (
          <SearchBar
            Options={Options}
            onSearchTable={onSearchTable}
            setText={setText}
            text={text}
            setSearchBy={setSearchBy}
            searchBy={searchBy}
            Text={Text}
            searchText={searchText}
            setSearchId={setSearchId}
            loader={loader}
            setHasError={setHasError}
            hasError={hasError}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        <Refresh handleRefresh={handleRefreshIcon} />
      </Grid>
    </Grid>
    </Box>
  );
}
