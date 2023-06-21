import React, { useState, useEffect } from 'react';
import { Trans } from '@lingui/react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';
import _range from 'lodash/range';

// import QuickActions from '../QuickActions';

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
    minHeight: theme.spacing(45)
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
    height: theme.spacing(130)
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
  },
  {
    id: 'nationalid',
    pillText: <Trans>National ID</Trans>,
    inputTitle: <Trans>ENTER NATIONAL ID</Trans>
  },
  {
    id: 'category',
    pillText: <Trans>Customer Type</Trans>,
    inputTitle: <Trans>ENTER CUSTOMER TYPE</Trans>,
    type: 'dropdown'
  }
];

const advanceFilterPills = [
  {
    id: 'category',
    pillText: <Trans>SEARCH TYPE</Trans>,
    placeholder: 'Search Type',
    type: 'dropdown'
  },
  {
    id: 'contact',
    pillText: <Trans>CONTACT NUMBER</Trans>,
    placeholder: 'Contact Number'
  },
  {
    id: 'dob',
    pillText: <Trans>DATE OF BIRTH</Trans>,
    placeholder: 'DATE OF BIRTH',
    type: 'date'
  },
  {
    id: 'email',
    pillText: <Trans>EMAIL ID</Trans>,
    placeholder: 'Email ID'
  },
  {
    id: 'status',
    pillText: <Trans>STATUS</Trans>,
    placeholder: 'Status'
  },
  {
    id: 'nationalid',
    pillText: <Trans>NATIONAL ID</Trans>,
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
    handleSearchResult,
    relatedParty
  } = props;

  const [mobile, setmobile] = React.useState('');
  const [email, setemail] = React.useState('');

  const { avatarPlaceholder, searchCustomerListItem } = classes;

  // React.useEffect(() => {
  //   if (relatedParty?.engagedParty?.contactMedium) {
  //     const mobileNumber = relatedParty?.engagedParty?.contactMedium.find(
  //       (item) => item.medium.type === "mobile"
  //     );
  //     const email = relatedParty?.engagedParty?.contactMedium.find(
  //       (item) => item.medium.type === "emailAddress"
  //     );

  //     setmobile(_.get(mobileNumber, "medium.number", ""));
  //     setemail(_.get(email, "medium.emailAddress", ""));
  //   }
  // }, []);

  //   const GetmobileNumber=()=>{

  //     const mobileNumber=relatedParty.engagedParty.contactMedium.find(item=>item.medium.type==="mobile")

  // return

  // }

  if (Object.keys(customers).length === 0) {
    return (
      <div>
        {searchText.length > 2 ? (
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
        ) : (
          <Typography variant="body1" color="textSecondary">
            <Trans id="Enter atleast 3 characters"></Trans>
          </Typography>
        )}
      </div>
    );
  } else {
    return Object.keys(customers).length > 0 ? (
      <Grid
        container
        direction="columns"
        spacing={5}
        alignItems="flex-start"
        justify="flex-start"
        alignContent="baseline"
        // className={classNames({
        //   [classes.customerListContainer]: customers && customers.products.length > 4,
        //   [classes.customerListFit]: customers && customers.product.length < 5,
        // })}
      >
        {customers &&
          customers?.map((item, index) => {
            if (item?.customer?.products) {
              return (
                <>
                  {item?.customer?.products?.map((customer, index) => {
                    return (
                      <Grid item key={index} xs={12}>
                        {/* <Customerlist
                      status={customer.status}
                      // accountType={customer.type}

                      // quote={customer.quoteRef ? customer.quoteRef.id : ""}
                      accountId={customer.accountId}
                      mail={email}
                      acoountOwner={customer.accountName}
                      leadId={customer.id}
                      customerName={customers.fullName}
                      primaryContact={customer.accountName}
                      fullName={customer.offeringName}
                      SubscriptionID={customer.publicIdentifier}
                      status={customer.status}
                      searchText={searchText}
                      onCustomerClick={() =>
                        handleSearchResult(customer, item.customer)
                      }
                      classes={{
                        avatarPlaceholder,
                        root: searchCustomerListItem,
                      }}
                    /> */}
                      </Grid>
                    );
                  })}
                </>
              );
            }
          })}
      </Grid>
    ) : (
      <NoOptionsMessage {...props} />
    );
  }
};

const SearchsubID = (props) => {
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
    <div>
      {/* <Paper
        elevation={1}
        variant="elevation"
        className={classes.paperContainer}
      > */}
      <Grid
        container
        justify="flex-start"
        alignItems="stretch"
        spacing={showAdvanceSearch ? 5 : 10}
      >
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
      </Grid>
    </div>
  );
};
SearchsubID.defaultProps = {
  customers: []
};

export default withRouter(withStyles(styles)(SearchsubID));
