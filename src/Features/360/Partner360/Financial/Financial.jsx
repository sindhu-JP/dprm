import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  // Typography,
  Box,
  Paper,
  TextField,
  InputAdornment
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useBoolean, useStateful } from 'react-hanger';
import FinancialTabs from './FinancialTabs';
import Wallet from './Wallet';
import { Trans } from '@lingui/react';
import TableSearch from 'Components/TableSearch';
import partnerFactory from 'Factory/Partner';


const Finacial = (props) => {
  const { customerInfo, quoteDetails } = props;
  const [qoute360ViewOpen, setQoute360ViewOpen] = React.useState(false);
  const [quoteInfo, setQuoteInfo] = React.useState('');
  const enableSearch = useBoolean(false);

const onSelectValues = useStateful({});
const [searchBy, setSearchBy] = React.useState('');
const [searchId, setSearchId] = React.useState('');
const SearchText = useStateful('');
const [loader, setLoader] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(10);


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
  clearSearchInput()
  let walletId = partnerFactory.getWalletId(props.partnerdetails);
  props.getInvoiceDetails({ id: walletId});
  props.getSettlement({ id: walletId});
  props.Adjustment({ id: walletId});
  props.getTransaction({ id: walletId});

  SearchText.setValue('');
  setPage(0);
  setRowsPerPage(10);
};
console.log(props, "proper")
const [searchText, setSearchText] = useState('')

const clearSearchInput = () => {
  setSearchText('')
  setSearchBy('')
}

useEffect(() => {
  console.log('SearchText', SearchText.value)
}, [SearchText.value])

const onSearchTable = (search, value) => {
  console.log({search})
  setSearchBy(search)
  SearchText.setValue(value);
  const walletId = partnerFactory.getWalletId(props.partnerdetails);
  switch (search.Type) {
    case 'invoice':
      props.getInvoiceDetails({ id: walletId, searchQuery : search.code, searchValue: value,  limit: rowsPerPage,
        offset: 0, });
      break;
      case 'settlement':
      props.getSettlement({ id: walletId, searchQuery : search.code, searchValue: value });
      break;
      case 'adjustment':
      props.Adjustment({ id: walletId, searchQuery : search.code, searchValue: value });
      break;
      case 'transaction':
      props.getTransaction({ id: walletId, searchQuery : search.code, searchValue: value });
      break;
    default:
      break;
  }
};

const [searchQuery, setSearchQuery] = useState({query: '', value: ''})

useEffect(() => {
  console.log({searchBy, value: SearchText.value })
  const query = searchBy;
  const value = SearchText.value;
  if(value && query){
    setSearchQuery((prev) => ({...prev,  value , query }))
  }
}, [searchBy, SearchText.value])


  const classes = useStyles();
  const handleinvoiceAction = (action, data, partnerdetails) => {
    props[action.actionType]({
      invoiceid: data?.columns.id,
      partnerid: _.get(partnerdetails.mainlist, 'partnerId', '')
    });
  };
  return (
    <Box>
      <Grid container direction="column">
        <Grid item>
          <Wallet
            balance={props.balance}
            unsettledAmount={true}
            WalletBalance={props.WalletBalance}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={6}>
            <Grid item xs={12}>
              <Paper elevation={0}>
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
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={4}
                          >
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
                              
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <TableSearch
                    SearchOptions={'Financials'}
                    title={<Trans id="Financials"></Trans>}
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
                  />

                  <Grid item>
                    <FinancialTabs
                      paymentlist={props.paymentlist}
                      openModal={props.openModal}
                      getInvoiceDetails={props.getInvoiceDetails}
                      Adjustment={props.Adjustment}
                      user={props.user}
                      partnerdetails={props.partnerdetails}
                      getSettlement={props.getSettlement}
                      InvoiceDetails={props.InvoiceDetails}
                      Adjustmentdetails={props.Adjustmentdetails}
                      Settlementdetails={props.Settlementdetails}
                      Paymentdetails={props.PaymentDetails}
                      downloadInvoice={props.downloadInvoice}
                      shareInvoice={props.shareInvoice}
                      handleinvoiceAction={handleinvoiceAction}
                      getTransaction={props.getTransaction}
                      invoiceLoader={props.invoiceloader}
                      balance={props.balance}
                      setOptions={setOptions}
                      handleRefresh={handleRefresh}
                      searchText={SearchText}
                      clearSearchInput={clearSearchInput}
                      tableRowCount={props.tableRowCount}
                      getUnsettlementBal={props.getUnsettlementBal}
                    />
                  </Grid>

                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
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

export default connect((state) => ({}), {})(Finacial);
