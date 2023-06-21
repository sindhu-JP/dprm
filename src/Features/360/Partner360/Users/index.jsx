import React, {useState} from 'react';
import {
  Grid,
  makeStyles,
  // Typography,
  Box,
  Paper,
  Button
} from '@material-ui/core';

import { connect } from 'react-redux';
import img from 'Assets/Icons/TenantIcon.svg';

import Modal from 'Store/Modals';
import TableSearch from 'Components/TableSearch';
import { useStateful } from 'react-hanger';

import customhook from 'lib/CustomHooks/CustomHooks';
import UserTabs from './UserTabs';
import { Trans } from '@lingui/react';

const ProductList = (props) => {
  const { customerInfo, quoteDetails } = props;
  const classes = useStyles();
  const dispatch = customhook.customUseDispatch();

  const onSelectValues = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');

  const [searchId, setSearchId] = React.useState('');
  const SearchText = useStateful('');
  const [searchText, setSearchText] = useState('')

  const [options, setOptions] = React.useState([
    {
      name: 'Invoice Id',
      code: 'invoiceId',
      Type: 'invoice'
    }
  ]);


  const clearFilters = () => {
  };
  
  const handleRefresh = () => {
    // clearSearchInput()
    // let walletId = partnerFactory.getWalletId(props.partnerdetails);
    // props.getInvoiceDetails({ id: walletId});
    // props.getSettlement({ id: walletId});
    // props.Adjustment({ id: walletId});
    // props.getTransaction({ id: walletId});
  
    // SearchText.setValue('');
    // setPage(0);
    // setRowsPerPage(10);
  };

  const onSearchTable = (search, value) => {
    // console.log({search})
    // setSearchBy(search)
    // SearchText.setValue(value);
    // const walletId = partnerFactory.getWalletId(props.partnerdetails);
    // switch (search.Type) {
    //   case 'invoice':
    //     props.getInvoiceDetails({ id: walletId, searchQuery : search.code, searchValue: value,  limit: rowsPerPage,
    //       offset: 0, });
    //     break;
    //     case 'settlement':
    //     props.getSettlement({ id: walletId, searchQuery : search.code, searchValue: value });
    //     break;
    //     case 'adjustment':
    //     props.Adjustment({ id: walletId, searchQuery : search.code, searchValue: value });
    //     break;
    //     case 'transaction':
    //     props.getTransaction({ id: walletId, searchQuery : search.code, searchValue: value });
    //     break;
    //   default:
    //     break;
    // }
  };

  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const handleChangeRowsPerListPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerListPage(+event.target.value);
    setMyListPage(0);
  };
  // potential partner page list hanlding
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    props.TenentList_user({ id: props.partnerdetails?.mainlist?.partnerId });
    props.MasterList_user({ id: props.partnerdetails?.mainlist?.partnerId });
  }, []);

  return (
    <Grid container direction="row" spacing={6}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box>
            {!props.isOverview && (
              <Grid container direction="column">
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                  >
                    {/* <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={4}
                      >

                        <Grid item>
                          <Typography variant="h2" className={classes.title}>
                            <Trans id="Users"></Trans>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid> */}

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
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  dispatch(
                                    Modal.open({
                                      id: 'AddProduct',
                                      context: props.partnerdetails
                                    })
                                  );
                                }}

                                //    style={{}}
                              >
                                Add User
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item></Grid>
                        {/* tax end */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                </div>
              </Grid>
            )}

              <TableSearch
                SearchOptions={'Users'}
                title={<Trans id="Users"></Trans>}
                onSelectValues={onSelectValues}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                clearFilters={clearFilters}
                handleRefresh={handleRefresh}
                filter={true}
                placeholder={''}
                partnerValue="partnerValue"
                onSearchTable={onSearchTable}
                TableSearchBar={true}
                setSearchId={setSearchId}
                searchText={SearchText}
                Options={options}
                inputValue={searchText}
                setInputValue={setSearchText}
                isSearchValuesControlledByParent
                showIcon={true}
                tabIcon={img}
              />

            <UserTabs
              tabName={props.tabNames}
              isOverview={props.isOverview}
              TenantList={props.TenantList}
              Masterlist={props.Masterlist}
              loader={props.loader}
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
  menumodel: {
    marginTop: '8rem'
  }
}));

export default connect((state) => ({}), {})(ProductList);
