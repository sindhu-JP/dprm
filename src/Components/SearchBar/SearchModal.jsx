import React, { useState, useEffect } from 'react';
import { Trans } from '@lingui/react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchCustomerListItem from './SearchCustomerListItem';
// import SearchCustomerListItem1 from './SearchCustomerListItem1';
import Skeleton from '@material-ui/lab/Skeleton';
import _range from 'lodash/range';
import { Box } from '@material-ui/core';

const styles = (theme) => ({
  appBar: {
    position: 'relative'
  },
  mainWrapper: {
    top: theme.spacing(16),
    left: '11rem',
    right: 0,
    bottom: 0,
    display: 'flex',
    zIndex: 100,
    position: 'fixed'
    // backgroundColor: theme.palette.common.backdrop
  },
  paperContainer: {
    marginTop: theme.spacing(2),
    width: theme.spacing(250),
    // marginLeft: theme.spacing(85),
    height: 'fit-content',
    overflow: 'auto',
    minHeight: theme.spacing(30)
    // maxHeight: theme.spacing(195)
  },
  filterSection: {
    marginTop: theme.spacing(5)
  },
  title: {
    flex: 1,
    fontSize: theme.spacing(10),
    fontWeight: theme.typography.fontWeightLight
  },
  searchBarHeight: {
    width: '100%',
    '& input': {
      height: theme.spacing(10)
    },
    '& input:focus': {
      height: theme.spacing(10)
    },
    '& input:focus::placeholder': {
      color: 'transparent'
    }
  },
  searchBarIcon: {
    borderBottom: `${theme.spacing(0.4)} solid ${
      theme.palette.background.paper
    }`
  },
  listItem: {
    backgroundColor: theme.palette.background.grayShadow,
    borderRadius: theme.spacing(2.7),
    fontWeight: theme.typography.fontWeightRegular
  },
  headingText: {
    opacity: 0.6,
    marginTop: theme.spacing(5),
    color: theme.palette.background.grayShadow,
    textTransform: 'uppercase'
  },
  noOptionsMessage: {
    padding: 10
  },
  customerListContainer: {
    overflowY: 'auto',
    // height: theme.spacing(50)
    minHeight: '20rem',
    maxHeight: '30rem'
  },
  customerListFit: {
    overflowY: 'auto',
    maxHeight: 450
  },
  clearIcon: {
    color: theme.palette.primary.main
  },
  linkText: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    paddingTop: theme.spacing(6)
  },
  linkTitle: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginTop: theme.spacing(5)
  },
  primaryBtn: {
    color: theme.palette.secondary.contrastText
  },
  dateComponent: {
    fontSize: theme.spacing(5),
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightLight
  },
  avatarPlaceholder: {
    backgroundColor: theme.palette.text.heading,
    width: theme.spacing(16),
    height: theme.spacing(16)
  },
  searchCustomerListItem: {
    border: `${theme.spacing(0.1)} solid ${theme.palette.common.grayShadow}`,
    opacity: 1,
    borderRadius: theme.spacing(4),
    padding: theme.spacing(4),
    borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.common.grey}`
  }
});

const filterPills = [
  {
    id: 'contact',
    pillText: <Trans>Contact Number</Trans>,
    inputTitle: <Trans>ENTER CONTACT NUMBER</Trans>
  },
  {
    id: 'email',
    pillText: <Trans>Email ID</Trans>,
    inputTitle: <Trans>ENTER EMAIL ID</Trans>
  }
  // {
  //   id: 'nationalid',
  //   pillText: <Trans>National ID</Trans>,
  //   inputTitle: <Trans>ENTER NATIONAL ID</Trans>
  // },
  // {
  //   id: 'category',
  //   pillText: <Trans>Customer Type</Trans>,
  //   inputTitle: <Trans>ENTER CUSTOMER TYPE</Trans>,
  //   type: 'dropdown'
  // }
];

const advanceFilterPills = [
  {
    id: 'category',
    pillText: <Trans id="SEARCH TYPE"></Trans>,
    placeholder: 'Search Type',
    type: 'dropdown'
  },
  {
    id: 'contact',
    pillText: <Trans id="CONTACT NUMBER"></Trans>,
    placeholder: 'Contact Number'
  },
  {
    id: 'dob',
    pillText: <Trans id="DATE OF BIRTH"></Trans>,
    placeholder: 'DATE OF BIRTH',
    type: 'date'
  },
  {
    id: 'email',
    pillText: <Trans id="EMAIL ID"></Trans>,
    placeholder: 'Email ID'
  },
  {
    id: 'status',
    pillText: <Trans id="STATUS"></Trans>,
    placeholder: 'Status'
  },
  {
    id: 'nationalid',
    pillText: <Trans id="NATIONAL ID"></Trans>,
    placeholder: 'National ID'
  }
];

const NoOptionsMessage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.noOptionsMessage}>
      <Typography variant="body1" color="textSecondary">
        <Trans id="No Data Available"></Trans>
      </Typography>
    </div>
  );
};

export const CustomerMenu = (props) => {
  const {
    customers,
    classes,
    showLoading = false,
    searchText,
    customerSelection,
    filterName,
    closeModal,
    filterValue,
    handleAuthDialog,
    isSkipUserAuthorization,
    opportunities,
    handleSearchResult,
    handleSearchResultAgent,
    Subscirptiondata,
    handlesubscription,
    handleListItemClick,
    tententList,
    addproductlist,
    agentList
  } = props;

  console.log(agentList,customers,tententList, addproductlist,  "agent listerxxx")

  const { avatarPlaceholder, searchCustomerListItem } = classes;
  if (customers?.length === 0 && tententList?.length === 0 && addproductlist?.length === 0 && agentList?.length === 0) {
   
    return (
      <div>
       
          <>
            <Grid container className={searchCustomerListItem}>
              <Grid item xs={1}>
                <Avatar className={avatarPlaceholder}>
                  <Skeleton />
                </Avatar>
              </Grid>
              <Grid item xs={11}>
                {_range(2).map((card) => (
                  <Typography variant="body1" key={card}>
                    <Skeleton />
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </>
        
      </div>
    );
  } else {
    return customers ||
      tententList ||
      agentList ||
      (addproductlist !== undefined && customers.length > 0) ||
      tententList.length > 0 ||
      agentList.length > 0 ||
      addproductlist.length > 0 ? (
      <Grid
        container
        direction="columns"
        spacing={5}
        alignItems="flex-start"
        justify="flex-start"
        alignContent="baseline"
        className={classNames({
          [classes.customerListContainer]:
            customers ||
            tententList ||
            (addproductlist && customers.length > 4) ||
            tententList.length > 4 ||
            addproductlist.length > 4,
          [classes.customerListFit]:
            customers ||
            tententList ||
            (addproductlist && customers.length < 5) ||
            addproductlist.length < 5 ||
            tententList.length < 5
        })}
      >
        {customers.length > 0 ? (
          <Typography variant="h6" style={{ fontWeight: '600' }}>
            Searching in Master Parter
          </Typography>
        ) : (
          ''
        )}
        {customers?.map((customer, index) => {
          return (
            <>
              <Grid item key={index} xs={12}>
                <SearchCustomerListItem
                  status={customer.mainlist?.OnboardStatus}
                  mail={customer.mainlist?.email}
                  leadId={customer.mainlist?.partnerId}
                  primaryContact={customer.mainlist.mobileNo}
                  fullName={customer.mainlist?.partnerName}
                  contractCount={customer.mainlist?.contractCount}
                  productCount={customer.mainlist?.productCount}
                  tenantCount={customer.mainlist?.tenantCount}
                  CRN={customer.mainlist.partnerRegno}
                  searchText={searchText}
                  onCustomerClick={() => handleSearchResult(customer)}
                  classes={{
                    avatarPlaceholder,
                    root: searchCustomerListItem
                  }}
                />
              </Grid>
            </>
          );
        })}

        {tententList.length > 0 ? (
          <Box>
            <Typography variant="h6" style={{ fontWeight: '600' }}>
              Searching in Tenant Partner
            </Typography>
          </Box>
        ) : (
          ''
        )}
        {tententList?.map((customer, index) => {
          return (
            <>
              <Grid item key={index} xs={12}>
                <SearchCustomerListItem
                  status={customer.mainlist?.status}
                  mail={customer.mainlist?.email}
                  leadId={customer.mainlist?.tenantId}
                  primaryContact={customer.mainlist.mobileNo}
                  fullName={customer.mainlist?.tenantName}
                  CRN={customer.mainlist.tenantRegno}
                  searchText={searchText}
                  contractCount={customer.mainlist?.contractCount}
                  productCount={customer.mainlist?.productCount}
                  tenantCount={customer.mainlist?.tenantCount}
                  onCustomerClick={() => handleSearchResult(customer)}
                  classes={{
                    avatarPlaceholder,
                    root: searchCustomerListItem
                  }}
                />
              </Grid>
            </>
          );
        })}

        {addproductlist.length > 0 ? (
          <Box>
            <Typography variant="h6" style={{ fontWeight: '600' }}>
              Searching in Products
            </Typography>
          </Box>
        ) : (
          ''
        )}
        {addproductlist?.map((item, index) => {
          return (
            <>
              <Grid item key={index} xs={12}>
                <SearchCustomerListItem
                  status={item.mainlist?.status}
                  lob={item.mainlist?.lob}
                  technology={item.mainlist?.technology}
                  fullName={item.mainlist?.productName}
                  leadId={item.mainlist?.productId}
                  partnerId={item.mainlist?.PARTNERID}
                  searchText={searchText}
                  onCustomerClick={() => handleSearchResult(item)}
                  classes={{
                    avatarPlaceholder,
                    root: searchCustomerListItem
                  }}
                />
              </Grid>
            </>
          );
        })}
                {agentList?.map((customer, index) => {
          return (
            <>
              <Grid item key={index} xs={12}>
                <SearchCustomerListItem
                   status={customer.mainlist?.OnboardStatus}
                   mail={customer.mainlist?.email}
                   leadId={customer.mainlist?.agentId}
                   primaryContact={customer.mainlist.mobileNo}
                   fullName={customer.mainlist?.agentName}
                   contractCount={customer.mainlist?.contractCount}
                   productCount={customer.mainlist?.productCount}
                   tenantCount={customer.mainlist?.tenantCount}
                   CRN={customer.mainlist.agentRegno}
                   searchText={searchText}
                   onCustomerClick={() => handleSearchResultAgent(customer)}
                   classes={{
                     avatarPlaceholder,
                     root: searchCustomerListItem
                   }}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    ) : (
      <NoOptionsMessage {...props} />
    );
  }
};

const FullScreenDialog = (props) => {
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [advanceFilter, setAdvanceFilter] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showQuickActionDialog, setShowQuickActionDialog] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [openFilter, setOpenFilter] = useState('');
  const [filterValue, setFilterValue] = useState({});

  const {
    classes,
    getCustomerListsAction,
    user,
    history,
    custAuthDialogFlag,
    customerId,
    closeModal,
    isInServiceRequest,
    partyType,
    handleClose,
    searchText,
    showLoading,
    handleCustomerSelection,
    customerSelection,
    handleAuthDialog,
    customers,
    isSkipUserAuthorization,
    ...restProps
  } = props;

  useEffect(() => {
    if (props.searchText && props.searchText.length > 1) {
      setMenuOpen(true);
    } else if (!Object.values(filterValue).join('')) {
      setMenuOpen(false);
    }
  }, [props.searchText]);

  const getQuickActionList = (userOptions) => {
    return (
      (userOptions || []).filter((data) => {
        return data.quickAction;
      }) || []
    );
  };

  const handleQuickActionClose = () => {
    setRequestName('');
    setShowQuickActionDialog(false);
  };

  const updateFilter = (e, id, useDirectValue) => {
    const value = useDirectValue ? e : e.target.value;
    setAdvanceFilter({ [id]: value });
  };

  const applyFilter = (id, value) => {
    if (!filterValue[id] && !value) {
      return;
    }
    setOpenFilter('');
    setFilterValue({ [id]: value });
    getCustomerListsAction(value || searchText);
  };

  const onAdvanceSubmit = () => {
    if (advanceFilter && Object.keys(advanceFilter).length) {
      applyFilter(
        Object.keys(advanceFilter)[0],
        Object.values(advanceFilter)[0]
      );
      setShowAdvanceSearch(false);
      setMenuOpen(true);
    }
  };
  return (
    <div className={classes.mainWrapper}>
      <Paper
        elevation={1}
        variant="elevation"
        className={classes.paperContainer}
      >
        <Grid
          container
          justify="flex-start"
          alignItems="stretch"
          spacing={showAdvanceSearch ? 5 : 10}
        >
          {/* <Grid item sm={12} alignItems="flex-end"> Advanced filters</Grid> */}
          {!isMenuOpen && !showAdvanceSearch && (
            <Grid item sm={12}>
              <Grid container spacing={4}>
                <Grid item sm={12}>
                  {' '}
                  {/* make sm=10 when advance search is implemented for ui to be fixed */}
                  {/* <QuickActions
                    title={<Trans>Quick Links</Trans>}
                    onItemClick={handleQuickActionClick}
                    listItems={getQuickActionList(
                      props.masterData.customerRequest
                    )}
                    titleKeyName="name"
                    IdkeyName="code"
                    paddingX={1}
                    paddingY={1}
                    titleVariant="body1"
                    customClasses={{
                      listItem: classes.listItem,
                      headingText: classes.headingText
                    }}
                  /> */}
                </Grid>
                {/* Will be implemented after enhanced elastic search
                <Grid 
                  item
                  sm={2}
                  onClick={() => {
                    setShowAdvanceSearch(false);
                  }}
                >
                  <Typography variant="body1" className={classes.linkText}>
                    <Trans>Advance Search</Trans>
                  </Typography>
                </Grid> */}
              </Grid>
            </Grid>
          )}
          {/* {isMenuOpen && (
            <Grid item>
              <Grid
                container
                spacing={4}
                alignItems="center"
                className={classes.filterSection}
              >
                <Grid item>
                  <Typography variant="body1">
                    <Trans>Filter By</Trans>:
                  </Typography>
                </Grid>

                {filterPills.map((pills) => {
                  return (
                    <Grid item key={pills.id}>
                      <DropDownPill
                        onMenuBtnClick={() => setOpenFilter(pills.id)}
                        pillText={pills.pillText}
                        inputTitle={pills.inputTitle}
                        open={openFilter === pills.id}
                        selected={filterValue[pills.id]}
                        defaultTextValue={filterValue[pills.id]}
                        onClose={() => setOpenFilter('')}
                        onApply={applyFilter}
                        id={pills.id}
                        type={pills.type}
                        partyType={partyType}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          )} */}
          {isMenuOpen && (
            <Grid item xs={12}>
              <CustomerMenu
                customerSelection={customerSelection}
                handleCustomerSelection={handleCustomerSelection}
                customers={customers}
                searchText={searchText}
                showLoading={showLoading}
                handleAuthDialog={handleAuthDialog}
                {...props}
                filterName={Object.keys(filterValue) || []}
                filterValue={filterValue}
                isSkipUserAuthorization={isSkipUserAuthorization}
              />
            </Grid>
          )}
          {showAdvanceSearch ? (
            <>
              <Grid item xs={12}>
                <Grid container justify="space-between">
                  <Grid item xs={10}>
                    <Typography className={classes.headingText} variant="body1">
                      <Trans id="Advance Search"></Trans>
                    </Typography>{' '}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    onClick={() => {
                      setShowAdvanceSearch(false);
                    }}
                  >
                    <Typography variant="body1" className={classes.linkTitle}>
                      <Trans id="Normal Search"></Trans>
                    </Typography>{' '}
                  </Grid>
                </Grid>
              </Grid>
              {advanceFilterPills.map((item, idx) => {
                return (
                  <Grid item xs={4} key={idx}>
                    {item.type === 'date' ? (
                      <></>
                    ) : (
                      // <DatePickerComponent
                      //   label={item.placeholder}
                      //   id="dob"
                      //   value={advanceFilter[item.id]}
                      //   onChange={(newDate) => {
                      //     updateFilter(newDate, item.id, true);
                      //   }}
                      //   dateFormat={constants.dateFormat.dob}
                      //   classes={{ classes: { root: classes.dateComponent } }}
                      // />
                      <TextField
                        id="standard-basic"
                        label={item.pillText}
                        onChange={(e) => updateFilter(e, item.id)}
                        placeholder={item.placeholder}
                        fullWidth
                        value={advanceFilter[item.id]}
                      />
                    )}
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <Grid container justify="flex-end" spacing={10}>
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={() => {
                        setShowAdvanceSearch(false);
                      }}
                    >
                      <Typography variant="button">
                        <Trans id="Cancel"></Trans>
                      </Typography>
                    </Button>{' '}
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={onAdvanceSubmit}
                      color="primary"
                      variant="contained"
                    >
                      {' '}
                      <Typography variant="button">
                        <Trans id="Submit"></Trans>
                      </Typography>
                    </Button>{' '}
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Paper>
    </div>
  );
};
FullScreenDialog.defaultProps = {
  customers: []
};

export default withRouter(withStyles(styles)(FullScreenDialog));
