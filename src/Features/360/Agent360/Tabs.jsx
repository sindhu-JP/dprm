import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { CommonButton } from '@tt-dcpq/dcpq-common-libs';
import Fade from '@material-ui/core/Fade';
import { MenuItem, Menu } from '@material-ui/core';
import { TabBar } from '@tt-dcpq/dcpq-common-libs';
import { isEmpty } from 'lodash';
import MasterPartner from 'Assets/Icons/MasterPartnerBlack.svg';
import TenantPartner from 'Assets/Icons/TenantPartner.svg';
import AddProduct from 'Assets/Icons/AddProductIcon.svg';
import { useHistory } from 'react-router-dom';
import { Trans, useLingui } from '@lingui/react';

// import FinancialComponent from './FinancialComponent';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: ' 20px 20px 14px',
    overflow: 'hidden'
  },
  stickyClass: {
    background: theme.palette.background.main,
    padding: ' 2px 20px 14px'
  },
  grow: {
    flexGrow: 1
  },
  navRoot: {
    marginTop: 0
  },
  navigationRoot: {
    marginTop: theme.spacing(-6)
  },
  Tabs: {
    borderRadius: '8px'
  },
  toolBar: {
    display: 'flex',
    height: 56,
    minHeight: 56,
    justifyContent: 'space-between'
  },
  menuItem: {
    margin: theme.spacing(1),
    paddingLeft: '18px',
    paddingRight: '18px'
    // '&:hover': {
    //   background: theme.palette.secondary.main
    // }
  },
  active: {
    background: theme.palette.secondary.main
  },
  menuItemText: {
    color: theme.palette.primary.contrastText,
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: '400',
    color: '#6C7482'
  },
  icon: {
    marginLeft: 13
  },
  expansionPanel: {
    height: '316px',
    backgroundColor: theme.palette.background.main,
    textAlign: 'center',
    position: 'fixed',
    zIndex: '999',
    minWidth: '92%'
  },
  common: {
    //marginRight: '10rem',
    background:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.black} !important`
        : `${theme.palette.common.white}`,
    // right: '100rem',
    //position: 'relative',
    // width: '100px',
    // height: '50px',
    '&::after': {
      content: '""',
      position: 'absolute',
      //right: '-36px',
      // top: '5px',
      // border: theme.palette.type === 'dark' ? '22px  solid transparent' :'19px  solid transparent',
      border: '19px  solid transparent',
      borderLeft:
        theme.palette.type === 'dark'
          ? `20px solid ${theme.palette.common.black}`
          : `20px solid ${theme.palette.common.white}`
    }
  },
  chipClr: {
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.white} !important`
        : `${theme.palette.common.white}`
  },
  customTab: {
    // color:
    //   theme.palette.type === 'dark'
    //     ? `${theme.palette.common.black} !important`
    //     : `#e0e0e0`,
    color: `${theme.palette.primary.black} !important`,
    '&:hover': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.black} !important`
          : `${theme.palette.common.white}`
    }
  },
  customTabs: {
    '& .MuiTab-root': {
      minWidth: '100px'
    },
    '& .Mui-selected': {
      marginLeft: '10px',
      // background: theme.palette.secondary.main,
      backgroundColor:
        theme.palette.type === 'dark' ? '#E0E0E0 !important' : '#FFE479',
      padding: '8px',
      color:
        theme.palette.type === 'dark'
          ? '#000000 !important'
          : // `${theme.palette.background.paper} !important`
            //  `${theme.palette.primary.main}`
            `${theme.palette.primary.black} !important`
      // color:`${theme.palette.primary.black} !important`
      // color:
      //   theme.palette.type === 'dark'
      //     ? `${theme.palette.primary.black} !important`
      //     : `${theme.palette.primary.black} !important`
    },

    '& .MuiTabs-indicator': {
      height: 0
    },
    '& .MuiTabScrollButton-root': {
      '& .MuiSvgIcon-root': {
        fontSize: '2rem'
      }
    }
  },
  master: {
    //right: '15rem'
  },
  tenant: {
    //right: '28rem'
  },
  product: {
    // right: '35rem'
  },

  parnterIcon: {
    paddingRight: '8px'
    // backgroundColor:theme.palette.background.paper
  },
  stickyCssWithoutExpansion: { height: '73px' }
});

const NavigationBar = ({
  classes,
  options,
  activeItem = 'Overview',
  toggleOverlay,
  selectedDropDownOption,
  handleSelectedDropDownOption,
  getFinanceOptions,
  navigationRoot,
  handleTabs,
  dynamictabs,
  TabsName,
  partnerdetails
}) => {
  const [showDropDown, setShowDropDown] = useState('');
  const financialOnClick = options.find((opt) => opt.name === 'Financials');
  // const { ThemeType } = useSelector((state) => state.Appearance);
  const tabsArray = dynamictabs.map((item) => ({
    id: item.name,
    name: item.name,
    link: item.link,
    icon: '',
    isForm: false,
    isFormList: false,
    heading: item.name,
    isDynamicLink: false,
    isLink: true,
    businessType: '',
    submenus: []
  }));

  const [active, setActive] = useState();

  useEffect(() => {
    if (tabsArray.length > 0) {
      hadleTabs(null, tabsArray[0]);
    }
  }, [tabsArray.length]);

  const { i18n } = useLingui();

  const dropDownDefaultItems = {
    Financials: (
      // <FinancialComponent
      //   options={getFinanceOptions}
      //   handleSelectedDropDownOption={handleSelectedDropDownOption}
      //   active={selectedDropDownOption}
      //   onClick={() => {
      //     financialOnClick.action();
      //     setShowDropDown('');
      //     toggleOverlay();
      //   }}
      // />
      <></>
    )
  };
  const hadleTabs = (event, value) => {
    setActive(value);
    handleTabs(value.id);
  };
  let history = useHistory();
  const [indexvalue, setindex] = useState(0);
  const [partner, setPartner] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chipState, setChipState] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChipClick = () => {
    setAnchorEl(null);
    history.goBack();
  };
  const masterhandlechip = () => {
    if (partner === 'Master' && chipState === 'Product') {
      history.goBack();
    }
  };
  const handleTenentChipClick = () => {
    history.goBack();
  };
  useEffect(() => {
    if (!isEmpty(partnerdetails)) {
      if (partnerdetails?.details?.PartnerProfileCreation) {
        setPartner('Master');
      } else if (partnerdetails?.details?.TenantProfileCreation) {
        setPartner('Tenent');
      } else if (partnerdetails?.details?.AddProduct) {
        setPartner('Product');
      }
    }
  }, [partnerdetails]);

  // useEffect(() => {
  //   if (!isEmpty(partnerdetails)) {
  //     if (partnerdetails?.details?.PartnerProfileCreation) {
  //       setPartner('Master');
  //     } else if (partnerdetails?.details?.AddProduct?.ProductDetails) {
  //       if (
  //         partnerdetails?.details?.AddProduct.ProductDetails.Partner_ID.substring(
  //           0,
  //           2
  //         ) === 'MP'
  //       ) {
  //         setPartner('Master');
  //       } else if (
  //         partnerdetails?.details?.AddProduct.ProductDetails.Partner_ID.substring(
  //           0,
  //           2
  //         ) === 'TP'
  //       ) {
  //         setPartner('Product');
  //       } else {
  //         setPartner('Tenent');
  //       }
  //     } else if (partnerdetails?.details?.TenantProfileCreation) {
  //       setPartner('Tenent');
  //     } else {
  //       console.log('err');
  //     }
  //   }
  // }, [partnerdetails]);
  useEffect(() => {
    if (!isEmpty(dynamictabs)) {
      dynamictabs.map((tab) => {
        if (tab.label === 'Partner Details') {
          setChipState('Master');
        } else if (tab.label === 'Product Details') {
          setChipState('Product');
        } else if (tab.label === 'Tenant Details') {
          setChipState('Tenant');
        }
      });

      // if (dynamictabs.length <= 4) {
      //   setChipState('Product');
      // } else if (dynamictabs.length == 6) {
      //   setChipState('Tenant');
      // } else {

      //   setChipState('Partner');
      // }
    }
  }, [dynamictabs]);

  return (
    <div
      onMouseLeave={() => {
        showDropDown && toggleDropDown('', false);
      }}
    >
      {/* <Sticky
        // enabled={enableSticky}
        top={86}
        innerZ={15}
        className={classes.stickyCssWithoutExpansion}
      > */}
      <div
        className={navigationRoot ? classes.navigationRoot : classes.navRoot}
      >
        {/* <div md={12} zIndex={1}
        // className={`${classes.root} ${
        //   // enableSticky ? classes.stickyClass : ""
        // }`}
        > */}
        <AppBar
          position="static"
          className={classes.NavigationBar}
          elevation={0}
          minWidth={12}
          md={12}

          // style={{ background: '#F3F4F9' }}
        >
          <Toolbar className={classes.toolBar} color="primary" minWidth={12}>
            <Grid container spacing={0} alignItems="center">
              <Grid item>
                <div>
                  {partner === 'Master' ? (
                    <div
                      className={`${classes.common} ${
                        chipState === 'Partner'
                          ? classes.master
                          : classes.product
                      }`}
                    >
                      <CommonButton
                        className={classes.chipClr}
                        variant="text"
                        onClick={masterhandlechip}
                      >
                        {/* {ThemeType === 'dark' ? (
                              <img src={imgD} />
                            ) : (
                              <img src={MasterPartner} />
                            )}  */}
                        <img
                          src={MasterPartner}
                          className={classes.parnterIcon}
                        />

                        <Trans id="Master Partner"></Trans>
                      </CommonButton>
                    </div>
                  ) : partner === 'Tenent' ? (
                    <div
                      className={`${classes.common} ${
                        chipState === 'Partner'
                          ? classes.master
                          : classes.product
                      }`}
                    >
                      <CommonButton
                        className={classes.chipClr}
                        variant="text"
                        onClick={handleTenentChipClick}
                      >
                        <img
                          src={TenantPartner}
                          className={classes.parnterIcon}
                        />
                        Tenent Partner{' '}
                      </CommonButton>
                    </div>
                  ) : partner === 'Product' ? (
                    <div
                      className={`${classes.common} ${
                        chipState === 'Partner'
                          ? classes.master
                          : classes.product
                      }`}
                    >
                      <CommonButton
                        className={classes.chipClr}
                        variant="text"
                        onClick={handleClick}
                      >
                        <img src={AddProduct} className={classes.parnterIcon} />
                        Product{' '}
                      </CommonButton>
                      <Menu
                        id="simple-user-menu"
                        aria-labelledby="simple-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left'
                        }}
                      >
                        <MenuItem onClick={handleChipClick}>
                          {partnerdetails?.details?.AddProduct?.ProductDetails?.Partner_ID.substring(
                            0,
                            2
                          ) === 'MP' ? (
                            <>
                              <img
                                src={MasterPartner}
                                className={classes.parnterIcon}
                              />
                              <Trans id="Master Partner"></Trans>
                            </>
                          ) : partnerdetails?.details?.AddProduct?.ProductDetails?.Partner_ID.substring(
                              0,
                              2
                            ) === 'TP' ? (
                            <>
                              <img
                                src={MasterPartner}
                                className={classes.parnterIcon}
                              />
                              Tenent Partner
                            </>
                          ) : (
                            ''
                          )}{' '}
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Grid>
              <Grid
                item
                md={10}
                style={{ marginLeft: '20px', width: '90vw', overflow: 'auto' }}
              >
                <div>
                  <TabBar
                    tabs={tabsArray}
                    activeTab={active}
                    setActiveTab={(data) => {
                      hadleTabs(null, data);
                    }}
                  />
                  <Grid
                    container
                    spacing={0}
                    wrap="nowrap"
                    style={{ overflow: 'auto', justifyContent: 'center' }}
                  >
                    {/* {dynamictabs?.map((item, index) => {
                      return (
                        <Button
                          data-cy={item.name}
                          color="secondary"
                          variant={item.name === TabsName ? 'contained' : ''}
                          key={index}
                          style={{
                            height: 'fit-content',
                            alignSelf: 'center',
                            whiteSpace: 'pre'
                          }}
                          onClick={() => {
                            setindex(index);
                            handleTabs(item.name);
                          }}
                          // onMouseEnter={() => {
                          //   if (item.haveOptions) {
                          //     toggleDropDown(item.name);
                          //   } else {
                          //     showDropDown && toggleDropDown("", false);
                          //   }
                          // }}
                          className={`${classes.menuItem} ${
                            item.name === activeItem ? classes.active : ''
                          }`}
                        >
                          {item.label}
                        </Button>
                      );
                    })} */}
                  </Grid>
                </div>
              </Grid>
            </Grid>

            {/* <div></div> */}
          </Toolbar>
        </AppBar>
      </div>
      {/* </div> */}
      {/* </Sticky> */}
      <Fade in={showDropDown}>
        {showDropDown ? (
          <div className={classes.expansionPanel}>
            {dropDownDefaultItems[showDropDown]}
          </div>
        ) : (
          <div className={classes.expansionPanelHidden} />
        )}
      </Fade>
    </div>
  );
};

NavigationBar.propTypes = {
  activeItem: PropTypes.string,
  classes: PropTypes.object.isRequired,
  handleSelectedDropDownOption: PropTypes.func,
  options: PropTypes.array,
  selectedDropDownOption: PropTypes.string,
  toggleOverlay: PropTypes.func,
  getFinanceOptions: PropTypes.shape({
    invoiceData: PropTypes.array,
    receiptDetails: PropTypes.array,
    adjustmentData: PropTypes.array,
    refundDetails: PropTypes.array,
    rentaldetails: PropTypes.array,
    rechargeData: PropTypes.array
  })
};

NavigationBar.defaultProps = {
  activeItem: 'Overview',
  handleSelectedDropDownOption: null,
  options: [],
  selectedDropDownOption: '',
  toggleOverlay: null,
  getFinanceOptions: {
    invoiceData: [],
    receiptDetails: [],
    adjustmentData: [],
    refundDetails: [],
    rentaldetails: [],
    rechargeData: []
  }
};

export default withStyles(styles)(NavigationBar);
