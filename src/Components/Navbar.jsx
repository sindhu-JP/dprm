import React from 'react';
import config from 'config';
import { connect } from 'react-redux';
import {
  Grid,
  Box,
  makeStyles,
  Tooltip,
  ClickAwayListener
} from '@material-ui/core';

// import Logo from 'Assets/Icons/Logo.svg';
import Globalsearch from 'Components/SearchBar/Globalsearch';
import AuthController from 'Controllers/Auth';
import Setting from './Setting';
import Subscription from './Modals/Subscription';
import { useBoolean } from 'react-hanger';
import { useSelector } from 'react-redux';
import Quick from 'Assets/Icons/quicklinks.svg';
import QuickLinkLite from 'Assets/Icons/quicklinks-lite.svg';
import HelpCircle from 'Assets/Icons/HelpCircle.svg';
import HelpCircleLite from 'Assets/Icons/HelpCircle-lite.svg';
import NotificationIcon from 'Assets/Icons/NotificationIcon.svg';
import { Trans } from '@lingui/react';
import ModalsStore from 'Store/Modals';

import { Alert } from 'Components';
import AlertActions from 'Store/Alert';
import DashboardController from 'Controllers/Dashboard';
import { useDispatch } from 'react-redux';
import dashboardData from 'Store/Dashboard';
import Logo from 'Components/Logo';
// import Logout from 'Components/Modals/Logout';
import AuthStore from 'Store/Auth';
import Profile from 'Components/Profile';

//  import { connect } from "react-redux";
// import { ReactComponent as Quick } from "Assets/Icons/quicklinks.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '70px'
  },
  logo: {
    width: theme.spacing(30),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      height: 'auto'
    }
  },
  avatar: {
    color: '#ffffff',
    backgroundColor: theme.palette.primary.main,
    // width: theme.spacing(10),
    // height: theme.spacing(10),
    fontSize: theme.spacing(4)
  },
  paperSpace: {
    '& .MuiMenu-paper': {
      backgroundColor: theme.palette.primary.black,
      padding: 0,
      width: '100px'
    }
  },
  img: {
    cursor: 'pointer'
  }
}));
const Navbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState('');
  const openmodel = useBoolean(false);
  const [showSubscription, setshowSubscription] = React.useState(false);
  const [data, setdata] = React.useState('');
  const [mode, setMode] = React.useState('light');
  const { ThemeType } = useSelector((state) => state.Appearance);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setshowSubscription(false);
    openmodel.setFalse();
  };

  const createInitials = (username) => {
    return username ? username.split('')[0].toUpperCase() : '';
  };

  //   const handleClose = (value: string) => {
  //     setOpen(false);
  //     setSelectedValue(value);
  //   };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    handleClose();
    AuthController.logout(config.sso);
  };

  const handleDarkClose = (value) => {
    dispatch(AuthStore.DarkTheme(value));
    setAnchorEl(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(!anchorEl);
  };

  const handlemounseCard = () => {
    openmodel.setFalse();
  };
  const handleListItemClick = (value) => {
    setdata(value);
    setshowSubscription(true);

    openmodel.setFalse();
  };

  const handleclickcard = async (data, customers) => {};

  const onclose = () => {
    setshowSubscription(false);
  };

  const modelclose = () => {
    setshowSubscription(false);

    openmodel.setFalse();
  };

  const ERRORshow = () => {
    props.Alertopen({
      type: 'error',
      message: 'please select active subscription'
    });
  };
  const handlesubscription = (value) => {
    setdata(value);
    setshowSubscription(true);

    openmodel.setFalse();
  };

  const handleLogTicket = () => {};
  const onHeaderClick = () => {};
  const handleHelp = () => {
    //  history.push(`${config.basePath}Help`)
    let helpOpen = window.open(`${config.basePath}Help`, '_blank');
    helpOpen.focus();
  };

  return (
    <Box px={8} className={classes.root}>
      <Box py={4}>
        <Grid
          container
          spacing={2}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Grid item>
            {/* <Box className={classes.logo}> */}
            {/* <img src={MomentsLogo} onClick={() => history.push('/')} /> */}
            {/* </Box> */}
            <Logo clickHandler={onHeaderClick} />
          </Grid>

          <Grid item xs={12} sm container spacing={4} className={classes.paper}>
            <Grid item xs container direction="column">
              <Grid item xs={6}>
                {!props.authstate.salesUser ? (
                  <>
                    <Grid item style={{ borderRadius: '50px' }}>
                      <Globalsearch
                        data={props.masterdata}
                        globalSeatch={props.globalSeatch}
                        DashboardDetails={props.DashboardDetails}
                        loading={props.DashboardDetails.loading.searchloader}
                        handlesubscriptionfuc={handlesubscription}
                        
                        clearstore={() =>
                          dispatch(
                            dashboardData.search({
                              context: {}
                            })
                          )
                        }
                      />
                    </Grid>
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
            {!props.authstate.salesUser ? (
              <>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '2rem'
                  }}
                >
                  <Tooltip
                    title={<Trans id="Quick Links"> </Trans>}
                    placeholder="bottom"
                  >
                      {ThemeType === 'dark' ? (<img
                      src={QuickLinkLite}
                      onClick={() => {
                        setshowSubscription(false);
                        openmodel.toggle();
                      }}
                      className={classes.img}
                    />) : (<img
                      src={Quick}
                      onClick={() => {
                        setshowSubscription(false);
                        openmodel.toggle();
                      }}
                      className={classes.img}
                    />)}                   
                  </Tooltip>
                </Grid>
              </>
            ) : (
              ''
            )}

            <Grid
              item
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem'
              }}
            >
              <Tooltip title="Notification" placeholder="bottom">
                <img src={NotificationIcon} className={classes.img} style={{color:"white"}} />
              </Tooltip>
            </Grid>
            <Grid
              item
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem'
              }}
            >
              <Tooltip title="Help" placeholder="bottom">
              {ThemeType === 'dark' ? (  <img
                  src={HelpCircleLite}
                  className={classes.img}
                  onClick={handleHelp}
                />) : (  <img
                  src={HelpCircle}
                  className={classes.img}
                  onClick={handleHelp}
                />)}      
              
              </Tooltip>
            </Grid>
            <Grid
              item
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '1rem'
              }}
            >
              {/* <Tooltip title="Menu" placeholder="bottom">
                <Avatar className={classes.avatar} onClick={handleMenuOpen}>
                  {createInitials(props.user?.sub)}
                </Avatar>
              </Tooltip> */}
              {/* {anchorEl && (
                <Logout
                  open={anchorEl}
                  onClick={onLogout}
                  user={props.user?.sub}
                  handleClose={handleClose}
                  handleDarkClose={handleDarkClose}
                  mode={mode}
                />
              )} */}
              <Profile />
            </Grid>
            <Grid
              item
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '2rem'
              }}
            >             
              <Setting/>
            </Grid>           
          </Grid>
        </Grid>
      </Box>
      {openmodel.value ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid item justify="flex-end">
            <Subscription
              selectedValue={selectedValue}
              open={open}
              openModal={props.openModal}
              onClose={handleClose}
              handleListItemClick={handleListItemClick}
              data={props.masterdata}
              handleLogTicket={handleLogTicket}
            />
          </Grid>
        </ClickAwayListener>
      ) : (
        ''
      )}

      <Alert
        open={props.alertState.open}
        onClose={props.closeAlert}
        message={props.alertState.message}
        type={props.alertState.type}
      />
      
    </Box>
  );
};

Navbar.propTypes = {};
export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data,
    alertState: state.alert,
    DashboardDetails: state.dashboardData
  }),
  {
    Alertopen: AlertActions.open,
    openModal: ModalsStore.open,
    closeAlert: AlertActions.close,
    globalSeatch: DashboardController.globalSeatch
  }
)(Navbar);
