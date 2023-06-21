import React, { Component } from 'react';
import { Typography, Tooltip } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Trans } from '@lingui/react';
import _debounce from 'lodash/debounce';
import SearchModal from './SearchModal';
import { history } from 'Store';

// import Opportunities from 'Features/360/360QuoteDetails/Opportunities';

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

const SearchDisplayOnCondition = (props) => {
  const { customerDetails } = props;
};

function Menu(props) {
  
  const { classes, showLoading, searchText, isrequestTab } = props;

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
  return props.customers !== undefined && props.customers.length > 0 ? (
    <div
      className={`${classes.MenuList} ${isrequestTab ? classes.zIndex : ''}`}
    >
      {props.customers.map((customer, index) => {
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
export const unlockBodyScroll = () => {
  document.body.setAttribute('style', 'overflow: visible; position: static;');
};
export const lockBodyScroll = () => {
  document.body.setAttribute(
    'style',
    'overflow: hidden; position: fixed; width: 100%;'
  );
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
      mobileNo: null,
      customers: [],
      Lead: [],
      opportunities: [],
      Subscirption: [],
      Subscirptiondata: []
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

  customerSearchDebounce = _debounce(async (value) => {
    this.setState({ showLoading: false });
  }, 1000);

  componentDidMount = () => {};

  filterIt(arr, searchKey) {
    return arr.filter(function (obj) {
      return Object.keys(obj).some(function (key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  filterByValue(array, string) {
    return array.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  filterdata = (data, value) => {
    let found = data.filter((person) => {
      const savageMatch =
        JSON.stringify(person).toLowerCase().indexOf(value.toLowerCase()) !==
        -1;
      if (savageMatch) return savageMatch;
    });
    return found;
  };

  keyPressed = async (event) => {
    event.persist();
    const { value } = event.target;
    this.setState({
      searchText: event.target.value,
      isMenuOpen: true
    });
    if (value.length >= 3) {
      this.setState({ showLoading: true });
      const res = this.props.globalSeatch({ value: event.target.value });
      // let temp = [];
      // if (res) {
      //   res.map((item) => {
      //     if (item.opportunities) {
      //       temp.push(...item.opportunities);
      //     }
      //   });
      // }

      // if (event.target.value) {
      //   let temp = [];

      //   this.setState({
      //     Subscirptiondata: this.filterdata(this.props.data.customerRequest, value)
      //   });
      // }

      this.setState({
        isMenuOpen: true
        // customers: res,
        // opportunities: this.filterIt(temp, event.target.value),
      });
    }
  };

  hideMenu = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  clearSearch = () => {
    this.props.clearstore();
    this.setState({
      searchText: '',
      isMenuOpen: false
    });
  };
  handleSearchResult = (data) => {
    console.log(data, "dataxxxxxxx")
    this.props.clearstore();
    this.setState({
      searchText: '',
      isMenuOpen: false
    });
    history.push({
      pathname: '/digital-prm-web-ui/360',
      state: { detail: data }
    });
  };

  handleSearchResultAgent = (data) => {
    history.push({
      pathname: '/digital-prm-web-ui/agent/360',
      state: { detail: data }
    });
  };
  handlesubscription = (value) => {
    if (value.code === 'ModifyPlanProductRequest') {
      let data = Object.assign({}, value, {
        id: 'productConfiguration',
        payload: { serviceRequestType: 'SUBSCRIPTION_MODIFICATION' }
      });
      this.props.handlesubscriptionfuc(data);
    } else if (value.code === 'AddVasProductRequest') {
      let data = Object.assign({}, value, {
        id: 'Addvas',
        payload: { serviceRequestType: 'ADD_VAS' }
      });
      this.props.handlesubscriptionfuc(data);
    } else if (value.code === 'ChangePlanProductRequest') {
      let data = Object.assign({}, value, {
        id: 'opportunityCreation',
        payload: { serviceRequestType: 'CHANGE_PLAN' }
      });
      this.props.handlesubscriptionfuc(data);
    }
  };

  makesearchlist = (data) => {
    let list = [];
    _.mapValues(data, (item) => {
      list.push({
        details: item.searchlist,

        mainlist: {
          ...item.list
        }
      });
    });
    return list;
  };

  render() {
    const {
      classes,
      isCustomer360,
      isInServiceRequest,
      isHomePage,
      isrequestTab
    } = this.props;

    const { isMenuOpen, searchText, showLoading } = this.state;

    console.log(this.props.DashboardDetails.AgentSearchlist, "heyxxxaas")
    return (
      <>
        <ClickAwayListener onClickAway={this.hideMenu}>
          <div className={classes.NewSearchBar} action="Customer Search">
            <div
              // className={isCustomer360 ? "" : classes.searchBarBorderBottom}
              onClick={(e) => {}}
            >
              {/* <TextField
                data-cy="searchForCustomers"
                id="inputBaseBar"
                autoComplete="off"
                value={searchText}
                placeholder={
                  isCustomer360
                    ? 'Search for Customers'
                    : 'Enter Partner ID/Name, Tenent ID/Name, Product ID/Name'
                }
                InputProps={{
                  disableunderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="default"
                        className={classes.iconSearch}
                      />
                    </InputAdornment>
                  ),

                  style: {
                    borderRadius: '50px',
                    height: '30px',
                    backgroundColor: '#EDEDF5'
                  }
                }}
                fullWidth
                variant="outlined"
                onChange={this.keyPressed}
              /> */}
              <TextField
                data-cy="searchForCustomers"
                id="inputBaseBar"
                autoComplete="off"
                value={searchText}
                placeholder={`Enter Partner ID/Name, Tenent ID/Name, Product ID/Name`}
                InputProps={{
                  disableunderline: true,
                  classes,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="35px"
                        className={classes.iconSearch}
                      />
                    </InputAdornment>
                  ),

                  style: {
                    border: 'none',
                    height: '55px',
                    left: '10px',
                    backgroundColor: 'transparent',
                    width:'100%'
                  }
                }}
                fullWidth
                // variant="outlined"
                onChange={this.keyPressed}
              />

              {/* <TextField
                data-cy="searchForCustomers"
                id="inputBaseBar"
                autoComplete="off"
                value={searchText}
                classes={{ root: classes.searchBarHeight }}
                placeholder={
                  isCustomer360
                    ? "Search for Customers"
                    : "Enter Lead ID/Quote ID"
                }
                className={classNames(isrequestTab && classes.disableunderline)}
                InputProps={{
                  disableunderline: true,
                  startAdornment: "" === "" && (
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="large"
                        className={classes.iconSearch}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={this.keyPressed}
              />
*/}
              {(isMenuOpen || searchText !== '') && (
                <Tooltip title="Close" placeholder="bottom">
                  <IconButton
                    className={classes.iconClearSearch}
                    aria-label="ClearSearch"
                    onClick={this.clearSearch}
                  >
                    <CloseIcon fontSize="small" className={classes.iconClose} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            {!isMenuOpen ? null : isHomePage ? (
              <SearchModal
                closeModal={this.clearSearch}
                customerSelection={this.customerSelection}
                customers={this.makesearchlist(
                  this.props.DashboardDetails.PartnersearchList
                )}
                tententList={this.makesearchlist(
                  this.props.DashboardDetails.TenantSearchlist
                )}
                addproductlist={this.makesearchlist(
                  this.props.DashboardDetails.addProductlist
                )}
                agentList={this.makesearchlist(
                  this.props.DashboardDetails.AgentSearchlist
                )}
                searchText={searchText}
                // Subscirptiondata={this.state.Subscirptiondata}
                // showLoading={showLoading}
                handleAuthDialog={this.handleAuthDialog}
                handleSearchResult={this.handleSearchResult}
                handlesubscription={this.handlesubscription}
                handleSearchResultAgent={this.handleSearchResultAgent}
              />
            ) : (
              <Menu
                customers={this.makesearchlist(
                  this.props.DashboardDetails.PartnersearchList
                )}
                searchText={searchText}
                showLoading={this.props.loading}
              />
            )}
          </div>
        </ClickAwayListener>
      </>
    );
  }
}

const styles = (theme) => ({
  NewSearchBar: {
    position: 'relative',
    // height: theme.spacing(22),
    border: 0,
    width: '150%'
  },
  searchBarHeight: {
    lineHeight: 4,
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
    //   marginTop: theme.spacing(4),
    fontSize: '28px'
  },

  underline: {
    '&&&:before': {
      borderBottom: 'none'
    },
    '&&:after': {
      borderBottom: 'none'
    }
  },
  iconClearSearch: {
    float: 'right',
    position: 'absolute',
    top: 2,
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
    // flexWrap: "wrap",
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
    color: theme.palette.primary.main
  },
  // searchBarBorder: { borderLeft: `1px ${theme.palette.text.primary} solid` },
  searchBarBorderBottom: {
    // borderBottom: `1px ${theme.palette.text.primary} solid`,
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

SearchBar.defaultProps = {
  customer: [],
  isInServiceRequest: false,
  isCustomer360: false,
  isrequestTab: false,
  isHomePage: true,
  isSkipUserAuthorization: false
};

export default withStyles(styles)(SearchBar);

export const toCamelCase = (str) => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

// overflow:hidden disables the scrolling on a desktop browser
// position: fixed is additionally needed for mobile devices

// overflow:visible ables the scrolling on a desktop browser
// position: static is additionally needed for mobile devices
