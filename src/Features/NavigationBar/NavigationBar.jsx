import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Sticky from 'react-stickynode';
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
    marginTop: -4
  },
  navigationRoot: {
    marginTop: theme.spacing(-6)
  },
  NavigationBar: {
    borderRadius: '8px'
  },
  toolBar: {
    display: 'flex',
    height: 56,
    minHeight: 56,
    justifyContent: 'center'
  },
  menuItem: {
    margin: theme.spacing(1),
    paddingLeft: '18px',
    paddingRight: '18px',
    '&:hover': {
      background: theme.palette.secondary.main
    }
  },
  active: {
    background: theme.palette.secondary.main
  },
  menuItemText: {
    color: theme.palette.primary.contrastText,
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: '400'
  },
  icon: {
    marginLeft: 13
  },
  expansionPanel: {
    height: '316px',
    backgroundColor: theme.palette.background.main, // '#ededf5',
    textAlign: 'center',
    position: 'fixed',
    zIndex: '999',
    minWidth: '92%'
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
  navigationRoot
}) => {

  console.log(options, 'optionsxxxxxxxxx');
  const [showDropDown, setShowDropDown] = useState('');
  const financialOnClick = options.find((opt) => opt.name === 'Financials');
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

  const [enableSticky, setSticky] = useState(false);

  const onScrollProgress = (e) => {
    const isEnable = window.scrollY >= 135;
    if (isEnable !== enableSticky) {
      setSticky(isEnable);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollProgress);
    return () => {
      window.removeEventListener('scroll', onScrollProgress);
    };
  }, [enableSticky]);

  const toggleDropDown = (name, value) => {
    setShowDropDown(showDropDown === name ? '' : name);
    toggleOverlay(value);
  };

  return (
    <div
      onMouseLeave={() => {
        showDropDown && toggleDropDown('', false);
      }}
    >
      <Sticky
        enabled={enableSticky}
        top={86}
        innerZ={15}
        className={classes.stickyCssWithoutExpansion}
      >
        <div
          className={navigationRoot ? classes.navigationRoot : classes.navRoot}
        >
          <div
            className={`${classes.root} ${
              enableSticky ? classes.stickyClass : ''
            }`}
          >
            <AppBar
              position="static"
              className={classes.NavigationBar}
              elevation={0}
            >
              <Toolbar className={classes.toolBar}>
                {options.map((item, index) => {
                  return (
                    <Button
                      data-cy={item.name}
                      key={index}
                      onClick={
                        item.haveOptions
                          ? () => toggleDropDown(item.name)
                          : () => {
                              showDropDown && toggleDropDown('', false);
                              item.action();
                            }
                      }
                      onMouseEnter={() => {
                        if (item.haveOptions) {
                          toggleDropDown(item.name);
                        } else {
                          showDropDown && toggleDropDown('', false);
                        }
                      }}
                      className={`${classes.menuItem} ${
                        item.name === activeItem ? classes.active : ''
                      }`}
                    >
                      <span>
                        <span className={classes.menuItemText}>
                          {item.label}
                        </span>
                      </span>
                    </Button>
                  );
                })}
              </Toolbar>
            </AppBar>
          </div>
        </div>
      </Sticky>
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
