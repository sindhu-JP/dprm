import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  makeStyles,
  // Typography,
  Box,
  Paper
  // TextField,
  // Tooltip,
  // IconButton
} from '@material-ui/core';
import dashboardStore from 'Store/Dashboard';
// import { SearchOutlined } from '@material-ui/icons';
// import img from 'Assets/Icons/Notes.svg';
// import imgD from 'Assets/Icons/NotesD.svg';
//import SearchIcon from '@material-ui/icons/Search';
import { connect, useDispatch } from 'react-redux';
// import classNames from 'classnames';
import { useBoolean, useStateful } from 'react-hanger';
import RequestTabs from './Tabs';
import { Trans } from '@lingui/react';
import TableSearch from 'Components/TableSearch';
import dashboardAPI from '../../../../Http/api/dashboard';
import img from 'Assets/Icons/Notes.svg'


const SearchType = {
  Pending: "PENDING",
  Approved: "APPROVED"
}

const ProductStatus = {
  [SearchType.Approved]: 'Approve',
  [SearchType.Pending]: 'pending'
}

const Requests = (props) => {
  const partnerId = props.mainlist?.partnerId;
  console.log('partnerId', partnerId);
  const dispatch = useDispatch();
  // const { details, mainlist } = props.location.state?.detail;
  // console.log('mainList', window?.location);
  const { customerInfo, quoteDetails } = props;
  const [qoute360ViewOpen, setQoute360ViewOpen] = React.useState(false);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const [quoteInfo, setQuoteInfo] = React.useState('');
  const [value, setValue] = React.useState('');
  const [hasError, setHasError] = React.useState(null);
  const enableSearch = useBoolean(false);
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const onSelectValues = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const [searchId, setSearchId] = React.useState('');
  const SearchText = useStateful('');
  const [loader, setLoader] = React.useState(false);

  const clearFilters = () => {
    FilterObj.setValue({});
  };

  const handleRefresh = () => {
    props.searchRequestList({
      id: props.mainlist?.partnerId,
      limit: 10,
      offset: 0,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });

    SearchText.setValue('');
    // FilterObj.setValue({});
    setPage(0);
    setRowsPerPage(10);
  };

  const onSearchTable = (search, value) => {
    SearchText.setValue(value);
    props.searchRequestList({
      id: props.mainlist?.partnerId,
      limit: 10,
      offset: 0,
      value,
      searchQuery: searchId || '',
      setLoader: setLoader
    });
  };

  const handleMenuOpen = () => {};

  const hydratetaskrows = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        mytasks: row.mytasks,
        tasks: row.tasks,
        columns: {
          ...row.columns,
          assignee: props.user?.sub
        }
      });
    });

    return rows;
  };
  const handleTaskRowClick = (action, partner) => {
    props.openModal({
      id: 'TaskDetails',
      context: {
        taskdetails: partner
      }
    });
  };

// useEffect(() => {
//     props.getRequestList({ id: props.mainlist?.partnerId, status: 'Approve' });
//   }, []);


const [searchType, setSearchType] = React.useState('APPROVED');

// useEffect(() => {
//   if(searchType === SearchType.Approved){
//     props.getRequestList({ id: props.mainlist?.partnerId, status: 'Approve' });

//   } else {
//     props.getRequestList({ id: props.mainlist?.partnerId, status: 'pending' });
//   }
//   console.log('searchType',searchType);
// }, [searchType]);
useEffect(() => {
  props.getRequestList({ id: props.mainlist?.partnerId, status: ProductStatus[searchType], limit: pageSize, offset: pageNumber  });
}, [searchType, pageNumber, pageSize]);

  const getApprovedProductList = async () => {
    const response = await dashboardAPI.ApprovedProdcutlist(partnerId) 
     console.log('response', response);
     dispatch(
      dashboardStore.onTableSearch({
        id: 'Requests',
        context: {
          onSearch: response,
          value: value,
          type: 'APPROVED'
        }
      })
    );
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleCloseSearch = () => {
    enableSearch.setFalse();

    if (searchType === 'APPROVED') {
      dispatch(
        dashboardStore.onTableSearch({
          id: 'Requests',
          context: {
            onSearch: props.onSearchRequestlist,
            type: 'APPROVED'
          }
        })
      );
    } else if (searchType === 'PENDING') {
      dispatch(
        dashboardStore.onTableSearch({
          id: 'Requests',
          context: {
            onSearch: props.onSearchPendingRequestlist,
            type: 'PENDING'
          }
        })
      );
    }
  };

  const handlePagination = ({ pageNumber, pageSize }) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
    //props.getRequestList({ id: props.mainlist?.partnerId, status: ProductStatus[searchType], limit: pageSize , offset: pageNumber });
  }

  // useEffect(() => {
  //   if(searchType === SearchType.Approved){
  //     getApprovedProductList();

  //   } else {
  //     // dispatch
  //   }
  // }, [searchType]);


  return (
    <Grid container direction="row" spacing={6}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box>
            {/* <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={4}
                    >
                      <Grid item className={classes.spaceBtwn}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          spacing={4}
                        >
                          <Grid item>
                            {ThemeType === 'dark' ? (
                              <img src={imgD} className={classes.imglog} />
                            ) : (
                              <img src={img} className={classes.imglog} />
                            )}
                          </Grid>
                          <Grid item>
                            <Typography variant="h2" className={classes.title}>
                              <Trans id="RECENT REQUESTS"></Trans>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <>
                        <Grid item className={classes.alignments}>
                          <TextField
                            fullWidth
                            id="standard-bare"
                            variant="outlined"
                            placeholder={'Search by Request ID, Request Type'}
                            style={{
                              width: 400
                            }}
                            onChange={(e) => handleChange(e)}
                            size="small"
                            className={classNames(
                              hasError && hasError === 'text'
                                ? classes.error
                                : ''
                            )}
                            InputProps={{
                              endAdornment: (
                                <Tooltip
                                  title={<Trans id="Search"></Trans>}
                                  placeholder={<Trans id="bottom"></Trans>}
                                >
                                  <IconButton onClick={handleSearch}>
                                    <SearchOutlined
                                      className={classes.outlineSearch}
                                    />
                                  </IconButton>
                                </Tooltip>
                              )
                            }}
                          />
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
                      <Grid item></Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={4}
                        >
                          <Grid item></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}

            <TableSearch
              SearchOptions={'Partner'}
              title={<Trans id="Recent Requests"></Trans>}
              onSelectValues={onSelectValues}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              // onsearch={onPartnersearch}
              clearFilters={clearFilters}
              handleRefresh={handleRefresh}
              filter={true}
              placeholder={''}
              partnerValue="partnerValue"
              onSearchTable={onSearchTable}
              TableSearchBar={true}
              setSearchId={setSearchId}
              searchText={SearchText}
              Options={[
                {
                  name: 'Request Id',
                  code: 'customerInfo.ticketId',
                  Type: 'request'
                },
                {
                  name: 'Request Type',
                  code: 'customerInfo.ticketName',
                  Type: 'request'
                }
              ]}
              showIcon={true}
              tabIcon={img}
            />

            <RequestTabs
              requestTablerow={props.requestTablerow}
              user={props.user}
              setSearchType={setSearchType}
              openModal={props.openModal}
              pendingRequestlist={props.pendingRequestlist}
              loading={props.requestsLoader}
              tableRowCount={props?.dashboardData?.tableCount?.productCount}         
              handlePagination={handlePagination}        
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
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
  alignments: {
    alignItems: 'center',
    gap: '10px'
  },
  spaceBtwn: {
    flex: 1
  },
  menumodel: {
    marginTop: '8rem'
  }
}));

export default connect((state) => ({dashboardData: state.dashboardData}), {})(Requests);
