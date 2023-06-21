import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const ScrollTabs = withStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },
  tabWrapper: {
    height: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    minHeight: '32px',
    borderBottom: '0px solid transparent'
  },
  scrollButtons: {
    color: theme.palette.common.draftColor,
    width: theme.spacing(8),
    opacity: 1
  },
  tab: {
    minHeight: '0',
    minWidth: '0',
    marginRight: 0
  },
  button: {
    background: `${theme.palette.common.draftColor} 0% 0% no-repeat padding-box`,
    borderRadius: theme.spacing(1),
    minWidth: '5.5rem',
    height: '32px',
    boxShadow: 'none',
    padding: theme.spacing(1.5, 4)
  },
  buttonText: {
    color: theme.palette.primary.primaryMainContrast,
    textTransform: 'none'
  },
  activeButton: {
    backgroundColor: theme.palette.type === 'dark'
    ? `#FFA369 !important`
    : theme.palette.primary.main   
  }
}))

(({ classes, options , ActiveTabs, activeTab}) => { 
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.tabWrapper}>
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          // textColor="" // invalid prop
          value={false}
          classes={{
            root: classes.tabWrapper,
            scrollButtons: classes.scrollButtons
          }}
        >
          {options.length>0?<>
          {options?.map((item, index) => {
            return (
              <Tab
                key={index}
                className={classes.tab}
                selected={classes.activeButton}
                onClick={(e) => {
                  e.target.parentElement.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth',
                    inline: 'nearest'
                  });
                  // item.onClick(e);

                  activeTab(item)
                }}
                icon={
                  <span
                    className={`${classes.button} ${ item===ActiveTabs? classes.activeButton:''
                    
                    }`}
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      {item}
                    </Typography>
                  </span>
                }
              />
            );
          })}
          </>:"No Status Found"}
        </Tabs>
      </AppBar>
    </div>
  );
});

ScrollTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array
};
ScrollTabs.defaultProps = {
  options: [{}]
};

export default ScrollTabs;
