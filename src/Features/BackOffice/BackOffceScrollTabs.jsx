import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import filter from 'Assets/Icons/Filter.svg';
import Modals from 'Store/Modals';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip, Badge, Grid } from '@material-ui/core';
import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import '../../stories/button.css';
const BackOfficeScrollTabs = withStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },
  tabWrapper: {
    height: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    minHeight: '32px',
    borderBottom: '0px solid transparent',
    marginLeft: -15,
  },
  scrollButtons: {
    color: theme.palette.common.draftColor,
    width: theme.spacing(8),
    opacity: 1
  },
  tab: {
    minHeight: '0',
    minWidth: '0',
    marginRight: 0,
    marginLeft: -10,
    "&:first:child":{
      marginLeft: -20,
    }
  },
  filterBadge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.type === 'dark' ? `#000000 !important` : ``
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
    backgroundColor:
      theme.palette.type === 'dark'
        ? `#FFA369 !important`
        : theme.palette.primary.main
  },

  defaultButton: {
    color: theme.palette.type === 'dark' ? `#FFF !important` : `#000 !important`
  }
}))(({ classes, options, ActiveTabs, activeTab, count }) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.tabWrapper}>
        <Grid container spacing={10} style={{marginLeft:'0',alignItems:'center'}}>
          <Grid item xs={7} className='backOfficeScrollBtn'>
          <Tabs
          variant="scrollable"
          scrollButtons="on"
          // textColor="" // invalid prop
          value={false}
          classes={{
            root: classes.tabWrapper,
            scrollButtons: classes.scrollButtons
          }}
          style={{ marginLeft: '-20px' }}
        >
          {options.length > 0 ? (
            <>
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
                      activeTab(item);
                    }}
                    icon={
                      <span
                        className={`${classes.button} ${
                          item?.statusName === ActiveTabs
                            ? classes.activeButton
                            : classes.defaultButton
                        }`}
                      >
                        <Typography
                          variant="button"
                          className={
                            item?.statusName === ActiveTabs
                              ? classes.buttonText
                              : classes.defaultButton
                          }
                        >
                          {item?.statusName} ({item?.count})
                        </Typography>
                      </span>
                    }
                  />
                );
              })}
            </>
          ) : (
            'No Status Found'
          )}
                  
        </Tabs>
          </Grid>
     
        <Grid item xs={3}  alignSelf="center" style={{ alignSelf: 'center',padding:"0" }}>
            <Grid
              container
              durection="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={5}>
                <Badge
                  color="primary"
                  className={classes.filterBadge}
                  onClick={() => {
                    dispatch(
                      Modals.open({
                        id: 'TicketFilter'
                      })
                    );
                  }}
                >
                  <Tooltip title="Filter" placeholder="bottom">
                    <img src={filter} />
                  </Tooltip>
                </Badge>
              </Grid>
              <Grid item xs={5} >              
                  <Tooltip title="Refresh" placement="bottom">
                <IconButton onClick={() => activeTab('Approve')}>
                  <img src={refreshIcon} height={24} width={24} />
                </IconButton>
              </Tooltip>                
              </Grid>
            </Grid>
          </Grid>  
        </Grid>
     
      </AppBar>
    </div>
  );
});

BackOfficeScrollTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array
};
BackOfficeScrollTabs.defaultProps = {
  options: [{}]
};

export default BackOfficeScrollTabs;
