import React, { Component } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { SvgIcon } from 'lib/components';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Trans } from '@lingui/react';
import { I18n } from '@lingui/react';
import _debounce from 'lodash/debounce';
// import ProfileAuthentication from 'common/components/AuthenticateModal/ProfileAuthentication';
// import OtpInAuthModal from 'common/components/AuthenticateModal/OtpInAuthModal';
// import appRoutes from 'common/constants/appRoutes';
import _ from 'lodash';
import SearchModal from './SearchModal';

const styles = (theme) => ({
  NewSearchBar: {
    position: 'relative',
    height: theme.spacing(22),
    border: 0,
    width: '70%'
  },
  searchBarHeight: {
    lineHeight: 4.6,
    width: '100%',
    '& input': {
      lineHeight: 1.2,
      border: `${theme.spacing(0.5)} solid ${
        theme.palette.secondary.contrastText
      }`,
      height: theme.spacing(8.5),
      marginTop: 13
    },
    '& input:focus': {
      paddingLeft: 10,
      borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.primary.main}`,
      height: theme.spacing(8.5),
      marginTop: theme.spacing(4)
    },
    '& input::placeholder, value': {
      fontSize: '16px'
      // textAlign: 'center'
    },
    '& input:focus::placeholder': {
      color: 'transparent'
    }
  },
  disableunderline: {
    '& .MuiInput-underline': {
      '&:before': {
        content: 'none'
      },
      '& .MuiInputBase-input': {
        marginLeft: theme.spacing(3)
      }
    }
  },
  requestHeader: {
    border: `1px solid ${theme.palette.common.mercury}`,
    borderRadius: 10,
    margin: theme.spacing(7)
  },
  iconSearch: {
    marginTop: theme.spacing(4)
  },
  iconClearSearch: {
    float: 'right',
    position: 'absolute',
    top: 10,
    right: 0
  },
  iconClose: {
    color: theme.palette.common.gray
  },
  MenuList: {
    position: 'absolute',
    // maxWidth: '85%',
    minWidth: '85%',
    backgroundColor: theme.palette.common.white
  },
  Searchinput: {
    display: 'flex',
    padding: 0,
    fontSize: '16px'
  },
  SelectStyle: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  noOptionsMessage: {
    padding: 10,
    position: 'absolute',
    width: '85%',
    backgroundColor: theme.palette.common.white
  },

  placeholder: {
    position: 'absolute',
    left: 2
  },
  maintainSearchPadding: {
    lineHeight: '4rem',
    padding: '6px 15px',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.background.main
    }
  },
  searchResult: {
    fontWeight: 800,
    color: 'black',
    display: 'inline',
    whiteSpace: 'pre'
  },
  searchSubResult: {
    fontWeight: 400,
    color: 'grey',
    display: 'flex',
    padding: 'inherit',
    whiteSpace: 'pre'
  },
  returnedText: {
    display: 'contents'
  },
  searchBarLink: {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.primary.main // '#1C82B8'
  },
  searchBarBorder: { borderLeft: `1px ${theme.palette.text.primary} solid` },
  searchBarBorderBottom: {
    borderBottom: `1px ${theme.palette.text.primary} solid`
  },
  avatarPlaceholder: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '60px'
  },
  zIndex: {
    borderRadius: theme.spacing(8),
    zIndex: 1,
    position: 'fixed',
    backgroundColor: theme.palette.common.white,
    border: `${theme.spacing(0.1)} solid ${theme.palette.common.grayShadow}`,
    marginTop: theme.spacing(8),
    minWidth: 0
  }
});

const NoOptionsMessage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.noOptionsMessage}>
      <Typography variant="body1" color="textSecondary">
        <Trans id="No Data Found For Search Criteria"></Trans>
      </Typography>
    </div>
  );
};
export const toCamelCase = (str) => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};
const SearchDetailsCustomer = (props) => {
  const { classes, isSkipUserAuthorization, customer, isSkipOtpAuthorization } =
    props;
  const highlightMatch = (value) => {
    const searchLength = props.searchText.length;
    if (
      value &&
      props.searchText === value.substr(0, searchLength).toUpperCase()
    ) {
      return (
        <>
          <Typography
            component="span"
            className={classNames('pr0', 'mr0', classes.searchResult)}
          >
            {value.substr(0, searchLength)}
          </Typography>
          <Typography
            component="span"
            className={classNames('pr10', classes.searchSubResult)}
          >
            {value.substr(searchLength)}
          </Typography>
        </>
      );
    }
    return value;
  };
  return (
    <div
      data-cy="customerSearchDropdown"
      className={`${classes.maintainSearchPadding} ${
        props.isrequestTab ? classes.requestHeader : ''
      }`}
      onClick={() => props.customerSelection(props.customerDetails.customerId)}
      // onClick={() => handleAuthDialog(props.customerDetails)}
      //  onClick={() => props.customerSelection(props.customerDetails)}
    >
      <Grid container justify="flex-start" direction="row" alignItems="center">
        {_.get(props.customerDetails, 'fullName', '') !== '' && (
          <Grid item>
            <Avatar
              className={classNames('p10', 'mr10', classes.avatarPlaceholder)}
            >
              {_.get(props.customerDetails, 'fullName', '')
                .split(' ')
                .splice(0, 2)
                .map((a) => a[0])
                .join('')
                .toUpperCase()}
            </Avatar>
          </Grid>
        )}
        <Grid item xs>
          <Grid container alignItems="center">
            <Grid item className={(classes.returnedText, 'pr5')}>
              {_.get(props, 'customerDetails.fullName', '') !== '' && (
                <Typography className={classes.searchSubResult}>
                  {highlightMatch(_.get(props.customerDetails, 'fullName', ''))}
                </Typography>
              )}
            </Grid>
            <Grid item className={(classes.returnedText, 'pr10')}>
              {_.get(props, 'customerDetails.customerId', '') !== '' && (
                <Typography className={classes.searchSubResult}>
                  -&nbsp;
                  {highlightMatch(
                    _.get(props, 'customerDetails.customerId', '')
                  )}
                </Typography>
              )}
            </Grid>
            <Grid item>
              {_.get(props, 'customerDetails.status', '') !== '' && (
                <Typography
                  className={classNames(
                    classes.searchSubResult,
                    'mr15',
                    'pl10',
                    'pr10',
                    _.get(props, 'customerDetails.status', '') === 'active'
                      ? 'completedStatus'
                      : _.get(props, 'customerDetails.status', '') ===
                        'terminated'
                      ? 'declinedStatus'
                      : 'inprogressStatus'
                  )}
                >
                  {toCamelCase(_.get(props, 'customerDetails.status', ''))}
                </Typography>
              )}
            </Grid>
            <Grid item className={classes.returnedText}>
              {_.get(props, 'customerDetails.contactNumbers', '') !== '' && (
                <>
                  <Typography
                    className={classNames(
                      'pl15',
                      'pr5',
                      'blGray',
                      classes.searchSubResult
                    )}
                  >
                    <SvgIcon
                      iconName="phone"
                      iconColor="grey"
                      iconWidth={14}
                      className={classNames('wrapBreakWord textEllipsis')}
                    />
                  </Typography>
                  <Typography
                    className={classNames('pr15', classes.searchSubResult)}
                  >
                    {highlightMatch(
                      _.get(props, 'customerDetails.contactNumbers[0]', '')
                    )}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item className={classes.returnedText}>
              {_.get(props, 'customerDetails.email', '') !== '' && (
                <>
                  <Typography
                    className={classNames(
                      'pl15',
                      'pr5',
                      'blGray',
                      classes.searchSubResult
                    )}
                  >
                    <SvgIcon
                      iconName="email"
                      iconColor="grey"
                      iconWidth={14}
                      className={classNames('wrapBreakWord textEllipsis')}
                    />
                  </Typography>
                  <Typography
                    className={classNames('pr15', classes.searchSubResult)}
                  >
                    {highlightMatch(_.get(props, 'customerDetails.email', ''))}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item className={classes.returnedText}>
              {_.get(props, 'customerDetails.identificationId', '') !== '' && (
                <>
                  <Typography
                    className={classNames(
                      'pl15',
                      'blGray',
                      classes.searchSubResult
                    )}
                  >
                    <Trans id="National ID"></Trans> -
                  </Typography>
                  <Typography
                    className={classNames('pr15', classes.searchSubResult)}
                  >
                    &nbsp;
                    {highlightMatch(
                      _.get(props, 'customerDetails.identificationId', '')
                    )}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item>
              {_.get(props, 'customerDetails.services', '') !== '' && (
                <Typography
                  className={classNames('pl15', classes.searchSubResult)}
                >
                  {_.get(props, 'customerDetails.services', '')}
                  <Trans id="Services"> </Trans>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const SearchDisplayOnCondition = (props) => {
  const { customerDetails } = props;
  return (
    <SearchDetailsCustomer
      customerDetails={customerDetails}
      // key={index}
      {...props}
    />
  );
};

function Menu(props) {
  const { customers, classes, showLoading, searchText, isrequestTab } = props;
  if (showLoading) {
    return (
      <div className={classes.noOptionsMessage}>
        <Typography variant="body1" color="textSecondary">
          {searchText.length >= 3 ? (
            <>
              <Trans id="Fetching"></Trans>
              <span>...</span>
            </>
          ) : (
            <Trans id="No Data Found For Search Criteria"></Trans>
          )}
        </Typography>
      </div>
    );
  }
  return customers !== undefined && customers.length > 0 ? (
    <div
      className={`${classes.MenuList} ${isrequestTab ? classes.zIndex : ''}`}
      // {...innerProps}
    >
      {customers.map((customer, index) => {
        return (
          <SearchDisplayOnCondition
            customerDetails={customer}
            key={index}
            details={props}
            {...props}
          />
        );
      })}
    </div>
  ) : (
    <NoOptionsMessage {...props} />
  );
}
export const lockBodyScroll = () => {
  document.body.setAttribute(
    'style',
    'overflow: hidden; position: fixed; width: 100%;'
  );
};
export const unlockBodyScroll = () => {
  document.body.setAttribute('style', 'overflow: visible; position: static;');
};
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isMenuOpen: false,
      showLoading: true,
      handleAuth: false,
      handleOtp: false,
      mobileNo: null
    };
    this.searchRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.isMenuOpen || this.state.isHomePage) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
  }

  customerSelection = (customer) => {
    this.props.isInServiceRequest
      ? this.props.handleCustomerSelection(customer)
      : this.props.handleCustomerSelection(customer.customerId);
    this.hideMenu();
    this.hidepopup();
  };

  handleAuthDialog = async (customerInfo) => {
    await this.props.getFullCustomerAction(customerInfo.customerId);

    const payload = {};
    payload.dialogFlag = true;
    payload.customerInfo = customerInfo;

    await this.props.handleCustomerAuthDialog(payload);
    this.hideMenu();
    this.hidepopup();
    this.setState({
      handleAuth: this.props.custAuthDialogFlag.custAndDialogInfo.dialogFlag
    });
  };

  handleOtpDialog = async (customerId, mobile) => {
    await this.props.getFullCustomerAction('');
    this.setState({
      handleAuth: !this.props.custAuthDialogFlag.custAndDialogInfo.dialogFlag,
      handleOtp: true,
      mobileNo: mobile
    });
  };

  proceedWithOtpValidation = (event) => {
    this.setState({
      handleOtp: false
    });
    let url = '';
    if (event === 'undefined') url = '/dashboard';
    else {
      // url = `${appRoutes.customer360}/dashboard?customerId=${event}`;
      url = `/customer360/dashboard?customerId=${event}`;
      this.props.history.push(url);
      this.props.handleShowToast({
        type: 'success',
        message: <Trans id="Customer Authentication Successful."></Trans>
      });
    }
    this.props.history.push(url);
  };

  closeCustomerAuth = async (customerId) => {
    await this.props.getFullCustomerAction('');
    this.setState({
      handleAuth: !this.props.custAuthDialogFlag.custAndDialogInfo.dialogFlag,
      handleOtp: false
    });
  };

  hidepopup = () => {
    this.props.handleHideCustomerRequestList();
  };

  componentWillUnmount() {
    this.customerSearchDebounce.cancel();
    unlockBodyScroll();
  }

  customerSearchDebounce = _debounce(async (value) => {
    await this.props.getCustomerListsAction(value);
    this.setState({ showLoading: false });
  }, 1000);

  keyPressed = async (event) => {
    const { value: keyPressedValue } = event.target;
    const value = keyPressedValue;
    const updatedState = {
      isMenuOpen: true,
      searchText: value
    };
    // if (value.length >= 3) {
    //   this.setState({ showLoading: true });
    // await this.customerSearchDebounce(value);
    // }
    this.setState(updatedState);
  };

  hideMenu = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  clearSearch = () => {
    this.setState({
      searchText: '',
      isMenuOpen: false
    });
  };

  render() {
    const {
      customers,
      classes,
      isCustomer360,
      isInServiceRequest,
      isHomePage,
      isrequestTab,
      activeCustomerDetails,
      customerAuthDetails,
      isSkipUserAuthorization,
      organizationCustomer,
      PartyType,
      customer,
      isSkipOtpAuthorization
    } = this.props;

    const { isMenuOpen, searchText, showLoading } = this.state;
    return (
      <>
        <ClickAwayListener onClickAway={this.hideMenu}>
          <div className={classes.NewSearchBar} action="Customer Search">
            <div
              className={isCustomer360 ? '' : classes.searchBarBorderBottom}
              onClick={(e) => {
                this.keyPressed(e);
              }}
            >
              <I18n>
                {({ i18n }) => (
                  <TextField
                    data-cy="searchForCustomers"
                    id="inputBaseBar"
                    autoComplete="off"
                    value={searchText}
                    classes={{ root: classes.searchBarHeight }}
                    placeholder="Enter Lead ID/Quote ID"
                    // placeholder={
                    //   isCustomer360
                    //     ? i18n._('Search for Customers')
                    //     : i18n._('Enter Service ID/Customer ID')
                    // }
                    className={isrequestTab ? classes.disableunderline : ''}
                    InputProps={{
                      disableunderline: true,
                      startAdornment: searchText === '' && (
                        <InputAdornment position="start">
                          <SearchIcon
                            fontSize="large"
                            className={classes.iconSearch}
                          />
                        </InputAdornment>
                      )
                    }}
                    onChange={(e) => {
                      this.keyPressed(e);
                    }}
                    ref={this.searchRef}
                  />
                )}
              </I18n>

              {(isMenuOpen || searchText !== '') && (
                <IconButton
                  className={classes.iconClearSearch}
                  aria-label="ClearSearch"
                  onClick={this.clearSearch}
                >
                  <CloseIcon fontSize="large" className={classes.iconClose} />
                </IconButton>
              )}
            </div>
            {!isMenuOpen ? null : isHomePage ? (
              <SearchModal
              // {...this.props}
              // closeModal={this.clearSearch}
              // customerSelection={this.customerSelection}
              // handleCustomerSelection={this.handleCustomerSelection}
              // customers={customers}
              // searchText={searchText}
              // showLoading={showLoading}
              // handleAuthDialog={this.handleAuthDialog}
              // closeCustomerAuth={this.closeCustomerAuth}
              // classes={{}}
              // isSkipUserAuthorization={isSkipUserAuthorization}
              // organizationCustomer={organizationCustomer}
              // PartyType={PartyType}
              // customer={customer}
              // handleOtpDialog={this.handleOtpDialog}
              // isSkipOtpAuthorization={isSkipOtpAuthorization}
              />
            ) : (
              (isInServiceRequest || isCustomer360) && (
                <Menu
                // customerSelection={this.customerSelection}
                // handleCustomerSelection={this.handleCustomerSelection}
                // customers={customers}
                // searchText={searchText}
                // showLoading={showLoading}
                // handleAuthDialog={this.handleAuthDialog}
                // closeCustomerAuth={this.closeCustomerAuth}
                // handleOtpDialog={this.handleOtpDialog}
                // classes={{}}
                // isSkipUserAuthorization={isSkipUserAuthorization}
                // organizationCustomer={organizationCustomer}
                // PartyType={PartyType}
                // customer={customer}
                // isSkipOtpAuthorization={isSkipOtpAuthorization}
                // {...this.props}
                />
              )
            )}
          </div>
        </ClickAwayListener>
        {/* {this.state.handleAuth && (
          <ProfileAuthentication
            activeCustomerDetails={activeCustomerDetails}
            closeCustomerAuth={this.closeCustomerAuth}
            handleOtpDialog={this.handleOtpDialog}
            handleShowToast={this.props.handleShowToast}
            customerAuthDetails={customerAuthDetails}
            organizationCustomer={organizationCustomer}
            PartyType={PartyType}
            customer={customer}
            isSkipOtpAuthorization={isSkipOtpAuthorization}
            {...this.props}
          />
        )}
        {this.state.handleOtp && (
          <OtpInAuthModal
            closeCustomerAuth={this.closeCustomerAuth}
            handleOtpDialog={this.handleOtpDialog}
            handleShowToast={this.props.handleShowToast}
            customerAuthDetails={customerAuthDetails}
            customer={customer}
            mobileNo={this.state.mobileNo}
            proceedWithOtpValidation={this.proceedWithOtpValidation}
            {...this.props}
          />
        )} */}
      </>
    );
  }
}

export default withStyles(styles)(SearchBar);

// overflow:hidden disables the scrolling on a desktop browser
// position: fixed is additionally needed for mobile devices

// overflow:visible ables the scrolling on a desktop browser
// position: static is additionally needed for mobile devices
