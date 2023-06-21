import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import _groupBy from "lodash/groupBy";
import _get from "lodash/get";
import _find from "lodash/find";
import _merge from "lodash/merge";
import SearchIcon from "@material-ui/icons/Search";
import SVGIcon from "common/components/SvgIcon";
import constants from "common/constants/constants";
import Profile from "./Profile";
import Accordion from "./Accordion";

const drawerWidth = 296;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: 104,
  },
  drawerPaper: {
    background: theme.palette.common.gray,
    overflowY: "hidden",
    flex: 1,
    zIndex: 1000,
  },
  searchRoot: {
    borderTop: `1px solid ${theme.palette.common.mercury}`,
    borderBottom: `1px solid ${theme.palette.common.mercury}`,
    padding: theme.spacing(2, 4),
  },
  searchBarHeight: {
    width: "80%",
    "& input:focus": {
      paddingLeft: 10,
      color: theme.palette.common.mercury,
      backgroundColor: theme.palette.common.gray,
      borderRadius: 2,
    },
    "& input::placeholder, value": {
      fontSize: "16px",
    },
    "& input:focus::placeholder": {
      color: "transparent",
    },
  },
  menuWrapper: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.5em",
      borderRadius: 50,
      color: theme.palette.text.primary,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: `width ${theme.transitions.speed}s ease 0ms`,
    overflowX: "hidden",
  },
  drawerClose: {
    transition: `width ${theme.transitions.speed}s ease 0ms`,
    overflowX: "hidden",
    width: 104,
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: "1.7em",
  },
  collapsedIcon: {
    color: theme.palette.text.secondary,
    fontSize: "1.7em",
    paddingLeft: "50%",
    marginRight: 0,
  },
  gold: {
    background: `${theme.palette.common.gold} 0% 0% no-repeat padding-box`,
  },
  platinum: {
    background: `${theme.palette.common.platinum} 0% 0% no-repeat padding-box`,
  },
  silver: {
    background: `${theme.palette.common.silver} 0% 0% no-repeat padding-box`,
  },
  default_segment: {
    background: `${theme.palette.primary.main} 0% 0% no-repeat padding-box`,
  },
  iconColor: {
    fill: theme.palette.text.secondary,
  },
});

const isPlanProduct = (product) => {
  return (
    product &&
    product.isCustomerVisible &&
    _find(
      _get(product, "productOffering.category"),
      (category) => category && category.name === "Plan"
    )
  );
};

let lobs = {};

const setActiveLobs = (lobs) => {
  localStorage.setItem("lobs", JSON.stringify(lobs));
};

const setActiveProductLob = (product) => {
  lobs[product.id] = [product.LoB];
  setActiveLobs(lobs);
};

const getInnerElements = (
  product,
  productList,
  activeFilterValue,
  className
) => {
  /**
   * start - code to render services for simpleProduct offering
   * */
  if (product.productOffering["@type"] === "SimpleProductOffering") {
    lobs[product.id] = [product.LoB];
    localStorage.setItem("lobs", JSON.stringify(lobs));
    if (activeFilterValue === "all" || activeFilterValue === product.LoB) {
      return [
        {
          text: product.publicIdentifier,
          businessType: product.businessType,
          icon: (
            <SVGIcon
              className={className}
              iconWidth={25}
              iconName={
                constants.iconNames[
                  product.LoB ? product.LoB.toLowerCase() : "ohno"
                ]
              }
            />
          ),
        },
      ];
    }
    return null;
  }
  /**
   * end - code to render services for simpleProduct offering
   * */

  /**
   * start - code to render services for bundleProduct offering
   * */
  const productCategoryIds = product.productOffering.category.map(
    (obj) => obj.id
  );
  const noOfCategory = product.productOffering.category.length;
  /**
   * in above line we fetched categoryIds present inside bundleOffering product
   * below logic is just to get data for categoryId's present in bundleOffering product
   *
   * in below loop -> first are looping through all products available for a customer (which are not visible & are simpleProduct )
   *        whichever products have similar categoryIds as that of bundleOffering -> we use data of that product
   *        to create strucute & data related to that service to be shown under bundleOffering product.
   *        Once we get data for all 4 -> we exit the loop.
   */

  const items = {}; // this array is to store all services inside bundle offering

  productList.forEach((productItem) => {
    if (
      _get(productItem, "productOffering[@type]", "") ===
        "SimpleProductOffering" &&
      !productItem.isCustomerVisible
    ) {
      const categoryIds = productItem.productOffering.category.map(
        (obj) => obj.id
      );
      const containProductCategoryId = _.intersection(
        categoryIds,
        productCategoryIds
      );
      containProductCategoryId.forEach((matchedId) => {
        let productDataUsed = false; // this variable is used to ensure we assign data of 1 product for only 1 category
        if (Object.keys(items).indexOf(matchedId) < 0 && !productDataUsed) {
          items[matchedId] = {
            text: productItem.publicIdentifier,
            businessType: product.businessType,
            icon: (
              <SVGIcon
                className={className}
                iconWidth={25}
                iconName={
                  constants.iconNames[
                    productItem.LoB ? productItem.LoB.toLowerCase() : "ohno"
                  ]
                }
              />
            ),
          };
          lobs[product.id] = [...(lobs[product.id] || []), productItem.LoB]; // lobs variable here is maintaing all loBs of bundleProduct
          const indexId = productCategoryIds.indexOf(matchedId);
          productCategoryIds.splice(indexId, 1);
          productDataUsed = true;
        }
      });
      if (Object.keys(lobs[product.id]).length === noOfCategory) {
        // when we get data for all categoryIds -> we close the loop
        return false;
      }
    }
    return "";
  });

  setActiveLobs(lobs);

  return Object.values(items);
  /**
   * end - code to render services for bundleProduct offering
   * */
};

const getFinalProducts = (productList) => {
  return (productList || []).filter((item) => isPlanProduct(item));
};

const NavigationDrawer = ({
  classes,
  accounts,
  products,
  activeAccountId,
  activeProductId,
  onClick,
  customer,
  productListIsObj = false,
  onlyProducts,
  onDrawerStateChange,
  countries,
}) => {
  const [highLightedAccount, setHighLightedAccount] = useState(activeAccountId);
  const [highLightedProduct, setHighLightedProduct] = useState(activeProductId);
  const [searchText, setSearchText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeFilterValue, setFilterValue] = useState("all");

  const keyPressed = (e) => {
    setSearchText(e.target.value);
  };

  const productList = productListIsObj
    ? products
    : _groupBy(products, (product) => {
        return product.accountId;
      });

  useEffect(() => {
    lobs = {};
    if (!activeAccountId) {
      setHighLightedAccount(accounts.length && accounts[0]);
    }
  }, []);

  useEffect(() => {
    if (activeAccountId && highLightedAccount !== activeAccountId) {
      setHighLightedAccount(activeAccountId);
    } else if (!highLightedAccount) {
      setHighLightedAccount(accounts.length && accounts[0]);
    }
    return () => {};
  }, [activeAccountId, accounts.length]);

  useEffect(() => {
    if (activeProductId && highLightedProduct !== activeProductId) {
      setHighLightedProduct(activeProductId);
    } else if (!highLightedProduct) {
      setHighLightedProduct(
        _get(productList[highLightedAccount], "[0].id", "")
      );
    }
    return () => {};
  }, [activeProductId, Object.keys(products).length, highLightedAccount]);

  useEffect(() => {
    if (onDrawerStateChange) {
      onDrawerStateChange(drawerOpen);
    }
  }, [drawerOpen]);

  const { id: customerId, segmentType } = customer || {};
  const setActiveFilter = (value = "all") => {
    setFilterValue(value);
  };

  /**
   * profile related data massaging start
   */

  const getThemeClass = (segmentType) => {
    switch ((segmentType || "").toLowerCase()) {
      case "platinum":
        return classes.platinum;
      case "gold":
        return classes.gold;
      case "silver":
        return classes.silver;
      default:
        return classes.default_segment;
    }
  };

  const availableOptions = [];
  (productList[highLightedAccount] || []).forEach((item) => {
    if (item.id === highLightedProduct && item.LoB) {
      availableOptions.push(item.LoB);
    }
  });

  const productArray = productListIsObj ? Object.values(products).flat() : [];

  const generateAccountData = () => {
    const accontsObj = [];
    accounts.map((accountId) => {
      const finalProducts = getFinalProducts(productList[accountId]).map(
        (productItem) => {
          const services = getInnerElements(
            productItem,
            productListIsObj ? productArray : products,
            activeFilterValue,
            classes.iconColor
          );
          return {
            ...productItem,
            services,
          };
        }
      );
      accontsObj.push({
        accountId,
        productData: finalProducts,
      });
    });
    return accontsObj;
  };

  /**
   * profile related data massaging end
   */

  const handleClickAction = ({
    accountId,
    productId,
    accountClicked,
    isBundleProduct,
    bundleItemData,
    isCustomerClicked,
  }) => {
    onClick({
      accountId: accountId === "none" ? "" : accountId || highLightedAccount,
      productId: productId || highLightedProduct,
      customerId,
      isBundleProduct,
      accountClicked,
      bundleItemData,
      isCustomerClicked,
    });
  };

  const getIcon = (loB) => {
    switch ((loB || "").toLowerCase()) {
      case "mobile":
        return "GSM";
      case "iptv":
        return "IP_TV";
      case "fixedline":
        return "LandLine";
      default:
        return "Broadband-1";
    }
  };

  const accountData = generateAccountData();

  const getFilteredData = () => {
    if (!searchText) {
      return accountData;
    }
    const filteredData = [];
    accountData.map((acc) => {
      const { accountId, productData } = acc;
      const filteredProduct = [];
      productData.map((p) => {
        const { services, name, productOffering } = p;
        const mainName = name || productOffering.name || "";
        if (mainName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
          filteredProduct.push(p);
        } else {
          const filteredServices = services.filter((s) => {
            return (
              (s.text || s.businessType || "")
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) > -1
            );
          });
          if (filteredServices.length) {
            filteredProduct.push({
              ...p,
              services: [...filteredServices],
            });
          }
        }
      });
      if (accountId.indexOf(searchText) > -1) {
        filteredData.push(acc);
      } else if (filteredProduct.length) {
        filteredData.push({
          accountId,
          productData: [...filteredProduct],
        });
      }
    });
    return filteredData;
  };

  return (
    <div
      className={classes.drawer}
      onMouseEnter={() => {
        if (!drawerOpen) setDrawerOpen(true);
      }}
      onMouseLeave={() => {
        if (drawerOpen) setDrawerOpen(false);
      }}
    >
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
        open={drawerOpen}
      >
        <Profile
          {...customer}
          isExpand={drawerOpen}
          activeFilterValue={activeFilterValue}
          setActiveFilter={setActiveFilter}
          themeClass={getThemeClass(segmentType)}
          availableOptions={availableOptions}
          handleClick={() => handleClickAction({ isCustomerClicked: true })}
          countries={countries}
        />
        {drawerOpen ? (
          <div className={classes.searchRoot}>
            <InputBase
              data-cy="searchForCustomers"
              id="inputBase"
              autoComplete="off"
              value={searchText}
              className={classNames(classes.searchBarHeight, "pb0")}
              placeholder="Name, Account ID, Service ID"
              onChange={(e) => {
                keyPressed(e);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        ) : null}
        <div className={classes.menuWrapper}>
          {getFilteredData().map((accountValue, index) => {
            const { accountId, productData = [] } = accountValue;
            return (
              <Accordion
                key={index}
                isExpand={drawerOpen}
                highLighted={highLightedAccount === accountId}
                data-cy="AccountOverview"
                accountName={`Account ${accountId}`}
                segmentType={segmentType}
                clickAction={() =>
                  handleClickAction({
                    accountId,
                    productId: _get(productData[0], "id"),
                    accountClicked: true,
                  })
                }
                icon={
                  <SVGIcon
                    className={classes.iconColor}
                    iconWidth={25}
                    iconName={constants.iconNames.account}
                  />
                }
                items={
                  productData
                    ? productData.map((productItem) => {
                        const isBundleProduct =
                          productItem.productOffering["@type"] ===
                          "BundledProductOffering";
                        return {
                          text: productItem.productOffering.name,
                          active: highLightedProduct === productItem.id,
                          icon: getIcon(productItem.LoB),
                          isOpen: highLightedProduct === productItem.id,
                          clickAction: () =>
                            handleClickAction({
                              accountId,
                              productId: productItem.id,
                              isBundleProduct,
                              bundleItemData: productItem.services[0],
                            }),
                          innerElements: productItem.services,
                        };
                      })
                    : []
                }
              />
            );
          })}
          {onlyProducts.map((productItem, productIdx) => {
            const { name = "" } = productItem.productSpecification;
            if (
              searchText &&
              !(
                (name || "").toLowerCase().indexOf(searchText.toLowerCase()) >
                -1
              )
            ) {
              return null;
            }
            const highLighted =
              highLightedAccount === productItem.id ||
              (!highLightedAccount && activeProductId === productItem.id);
            if (highLighted) {
              setActiveProductLob(productItem);
            }
            return (
              <Accordion
                key={productIdx}
                isExpand={drawerOpen}
                isProduct
                segmentType={segmentType}
                highLighted={highLighted}
                accountName={productItem.productOffering.name}
                clickAction={() =>
                  handleClickAction({
                    accountId: "none",
                    productId: productItem.id,
                  })
                }
                icon={
                  <SVGIcon
                    className={classes.iconColor}
                    iconWidth={25}
                    iconName={
                      constants.iconNames[
                        productItem.LoB ? productItem.LoB.toLowerCase() : "ohno"
                      ]
                    }
                  />
                }
                items={[]}
              />
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

NavigationDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: "",
      productOffering: { "@type": "", category: [] },
    })
  ).isRequired,
  activeAccountId: PropTypes.string.isRequired,
  activeProductId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  productListIsObj: PropTypes.bool,
  onlyProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: "",
      productOffering: { "@type": "", category: [] },
    })
  ),
  onDrawerStateChange: PropTypes.func,
};

NavigationDrawer.defaultProps = {
  productListIsObj: false,
  onlyProducts: [],
  onDrawerStateChange: null,
};

export default withStyles(styles)(NavigationDrawer);
