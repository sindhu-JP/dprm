// import React from 'react';
// import { Box, Button, Grid, Typography } from '@material-ui/core';
// import classNames from 'classnames';
// import { Trans } from '@lingui/macro';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import Home from '@material-ui/icons/Home';
// import Email from '@material-ui/icons/Email';
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
// import CalendarToday from '@material-ui/icons/CalendarToday';
// import { makeStyles } from '@material-ui/core/styles';
// // import Logo from '../../public/assets/images/T_logo.svg'
// import { history } from 'Store';
// import { useBoolean } from 'react-hanger';
// import LeftSideDrawer from 'Components/Leftsidebar';

// const useStyles = makeStyles((theme) => ({
//   sidebar: {

//     backgroundColor: theme.palette.primary.main

//   },
//   iconName: {
//     textTransform: 'capitialize'
//   },
//   logo: {
//     width: theme.spacing(15),
//     '& img': {
//       display: 'block',
//       backgroundSize: 'contain',
//       width: '60%',
//       height: 'auto',
//       marginLeft: '40%'
//     }
//   },
//   cbtn: {
//     display: 'block',
//     width: '80%',
//     // maxWidth:,
//     margin: '0 auto',
//     padding: theme.spacing(7, 0)
//   },
//   buttonActive: {
//     textAlign: 'center',
//     cursor: 'pointer',
//     color: theme.palette.common.black,
//     background: theme.palette.common.selectedGray
//   },
//   dashboardIcon: {
//     fontSize: theme.spacing(6),
//     color: theme.palette.common.black
//   },
//   title: {
//     color: theme.palette.common.black
//   },
//   menuIcon: {
//     textAlign: 'center',
//     marginTop: '20px',
//     cursor: 'pointer'
//   },
//   menuIconItem: {
//     fontSize: '26px'
//   }
// }));
// const Sidebar = (props) => {
//   const classes = useStyles();

//   const showDrawer = useBoolean(false);
//   const handleMouse = () => showDrawer.setTrue();
//   const handleleave = () => showDrawer.setFalse();

//   const handlRoute = (pathname) => {
//     history.push({
//       pathname: pathname
//     });
//     showDrawer.setFalse();
//   };
//   return (
//     <div
//       style={{ height: '60%' }}
//       className={classNames(classes.sidebar, 'sideMenuBar')}
//       //  onMouseLeave={handleleave}
//     >
//       <Box py={6} px={2}>
//         <Grid item>
//           <Box className={classes.logo}>{/* <img src={Logo}  /> */}</Box>
//         </Grid>
//         <Grid
//           item

//           // onMouseOver ={handleMouse}
//         >
//           <Box className={classes.menuIcon}>
//             <HomeOutlinedIcon className={classes.menuIconItem} />
//           </Box>
//         </Grid>
//         <Grid item>
//           {/* <Box className={classes.menuIcon}

//           //  onMouseOver ={handleMouse}
//           >
//           <MailOutlineOutlinedIcon className={classes.menuIconItem} style={{fontSize:'24px'}}/>
//           </Box> */}
//         </Grid>
//       </Box>
//       {/* <Typography>EEEE</Typography> */}
//       {/* <Button color="default" className={classes.cbtn}

//        onClick={()=> history.push({
//         pathname: "/dlpm-web-ui' ",
//         // state: { detail: data },
//        })

//        }
//       >
//         <Home className={classes.dashboardIcon} />
//         <Typography variant="h6" className={classes.title} display="block" >
//           <Trans>Dashboard</Trans>
//         </Typography>
//       </Button>

//       <Button color="default" className={classes.cbtn}

//       onClick={()=> history.push({
//         pathname: "/dlpm-web-ui/req",
//         // state: { detail: data },
//        })

//        }
//       >
//         <CalendarToday className={classes.dashboardIcon} />
//         <Typography variant="h6" className={classes.title} display="block" >
//           <Trans>Requests</Trans>
//         </Typography>
//       </Button>

//       <Button color="default" className={classes.cbtn} >
//         <DashboardIcon className={classes.dashboardIcon} />
//         <Typography variant="h6" className={classes.title} display="block" >
//           <Trans>Messages</Trans>
//         </Typography>
//       </Button>

//       <Button color="default" className={classes.cbtn} >
//         <Email className={classes.dashboardIcon} />
//         <Typography variant="h6" className={classes.title} display="block">
//           <Trans>Emails</Trans>
//         </Typography>
//       </Button> */}
//       <LeftSideDrawer
//         handleRoute={handlRoute}
//         open={showDrawer.value}
//         //  handleleave={handleleave}
//       />
//     </div>
//   );
// };
// // Sidebar.propTypes = {};
// // export default Sidebar;

// // import React from "react";
// // import PropTypes from "prop-types";
// // import { Box, makeStyles } from "@material-ui/core";

// // const Sidebar = (props) => {
// //   const classes = useStyles();

// //   return (
// //     <Box px={8} className={classes.root}>
// //       hello
// //     </Box>
// //   );
// // };

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     backgroundColor: "#333333",
// //     minHeight: "100vh",
// //   },
// // }));

// Sidebar.propTypes = {};
// export default Sidebar;

import React, { useState } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import HomeIcon from 'Assets/Icons/Home-light.svg';
// import {Link} from "react-router-dom"
import Orders_Request from 'Assets/Icons/List-light.svg';
import Bulk_Icon from 'Assets/Icons/Bulk-light.svg';

import { connect } from 'react-redux';
// import bulkRequest from '../Assets/Icons/bulkRequest.svg';

import { history } from 'Store';
import { useBoolean } from 'react-hanger';

import { useDispatch } from 'react-redux';
import { Trans } from '@lingui/react';
import constant from 'lib/constants/constantview';
import PartnerRes from 'Factory/PartnerRes';
const useStyles = makeStyles((theme) => ({
  themeColorBackground: {
    // background:
    //   theme.palette.type === 'dark'
    //     ? `${theme.palette.common.white} 0% 0% no-repeat padding-box !important`
    //     : `${theme.palette.primary.black} 0% 0% no-repeat padding-box`

    background:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.white} 0% 0% no-repeat padding-box !important`
        : `#333 0% 0% no-repeat padding-box`
  },
  iconName: {
    textTransform: 'capitialize'
  },
  logo: {
    //cursor:'pointer',
    width: theme.spacing(15),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '60%',
      height: 'auto',
      marginLeft: '40%'
    }
  },
  cbtn: {
    display: 'block',
    width: '80%',

    margin: '0 auto',
    padding: theme.spacing(7, 0)
  },
  buttonActive: {
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.common.black,
    background: theme.palette.common.selectedGray
  },
  dashboardIcon: {
    fontSize: theme.spacing(6),
    color: theme.palette.common.black
  },
  title: {
    color: theme.palette.common.black
  },
  menuIcon: {
    marginTop: '25px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuIconItem: {
    fontSize: '26px'
  },
  highlightOption: {
    // '&:hover': {
    //   background: '#deaa1e',
    //   borderRadius: '6px',
    //   transition: '0.9s'
    // },
    width: '100%',
    marginTop: '14px',
    // background: 'rgba(255, 255, 255, 0.25)',
    // opacity: 0.25,
    display: 'block',
    textAlign: 'center',
    cursor: 'pointer'
  },
  eachSideIconStyle: {
    // background: `${theme.palette.common.headerIconColor}`,
    background: '#7F7F7F',
    borderRadius: '6px',
    transition: '0.5s',
    position: 'relative',
    width: '106%',
    borderRight: `5px solid ${theme.palette.primary.main} !important`,
    // '&:hover': {
    //   background: `${theme.palette.common.headerIconColor}`,
    //   borderRadius: '6px',
    //   transition: '0.5s',
    //   position: 'relative',
    //   width: '112%',
    //   borderRight: `5px solid ${theme.palette.primary.main}`
    // },
    padding: '10px 0px'
  },
  fontColor: {
    color: theme.palette.primary.contrastText
  },
  iconGap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    padding: 'initial'
  }
}));
const Sidebar = ({ dashboardData, authState }) => {
  const classes = useStyles();
  const hide = useBoolean(false);
  const show = useBoolean(false);
  const [clickedHome, setClickedHome] = useState(true);
  const [clickedOrders, setClickedOrders] = useState(false);
  const [clickedBackOffice, setClickedBackOffice] = useState(false);
  const showDrawer = useBoolean(false);
  const [clicked, setClicked] = useState('');
  const handleleave = () => showDrawer.setFalse();
  const dispatch = useDispatch();
  const handleHome = (type, tab) => {
    setClicked(type);
    localStorage.setItem('selectedSidebarTab', type);
    // dispatch(
    //   Dashboard.tabChange({
    //     value: type
    //   })
    // );

    if (tab.url === 'Orders&Requests') {
      history.push(`/digital-prm-web-ui/Orders&Requests`);
    }
    if (tab.url === 'BackOffice') {
      history.push(`/digital-prm-web-ui/${tab.url}`);
    }

    if (tab.url === 'GroupAssignment') {
      history.push(`/digital-prm-web-ui/${tab.url}`);
    }
    if (tab.url === 'BulkUpload') {
      history.push(`/digital-prm-web-ui/${tab.url}`);
    }
    if (tab.url === '') {
      history.push(`/`);
    }
  };
  const tabs = [
    {
      name: <Trans id="Home"></Trans>,
      url: '',
      iconName: HomeIcon,
      bool: true
    },
    {
      name: 'Orders & Request',
      url: 'Orders&Requests',
      iconName: Orders_Request,
      bool: true
    },
    {
      name: 'Group 360',
      url: 'GroupAssignment',
      iconName: Orders_Request,
      bool: true
    },
    {
      name: 'Back Office',
      url: 'BackOffice',
      iconName: Orders_Request,
      bool: true
    },
    {
      name: 'Bulk ',
      url: 'BulkUpload',
      iconName: Bulk_Icon,
      bool: true
    }
  ];
  // const themeLeftSidebarHomeIcon = (DLPM_CONFIG.appTheme === 'mtn') ? HomeIcon : homeOutlineIcon;
  // const themeLeftSidebarBulkIcon = (DLPM_CONFIG.appTheme === 'mtn') ? BulkIcon : bulkRequest;
  React.useEffect(() => {
    let selectedTab = localStorage.getItem('selectedSidebarTab');
    setClicked(selectedTab);
  }, [clicked]);
  React.useEffect(() => {
    let selectedTab = localStorage.getItem('selectedSidebarTab');
    if (selectedTab) {
      setClicked(selectedTab);
    } else {
      localStorage.setItem('selectedSidebarTab', 'Home');
    }
  }, []);

  const icons = {
    Orders_Request: Orders_Request,
    HomeIcon: HomeIcon,
    Bulk_Icon: Bulk_Icon,
  };
  return (
    <>
      <div
        style={{ height: '100%' }}
        className={classNames(classes.themeColorBackground, 'sideMenuBar')}
        // onMouseLeave={handleleave}
      >
        {!authState.salesUser && (
          <Box py={10} px={1} className={classes.iconGap}>
            {PartnerRes.DynamicMenulist(constant.RouterPath, 'dashboard').map(
              (tab) => {
                return (
                  <Grid
                    item
                    className={
                      clicked === tab.name ? `${classes.eachSideIconStyle}` : ''
                    }
                    onClick={() => handleHome(tab.name, tab)}
                  >
                    <Box
                      className={
                        hide ? classes.highlightOption : classes.menuIcon
                      }
                    >
                      <img
                        src={icons[tab.iconName]}
                        style={{ zIndex: 1, opacity: 1 }}
                      />
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        className={classes.fontColor}
                      >
                        {tab.label}
                      </Typography>
                    </Box>
                  </Grid>
                );
              }
            )}
          </Box>
        )}
      </div>
    </>
  );
};

Sidebar.propTypes = {};
export default connect(
  (state) => ({ dashboardData: state.dashboardData, authState: state.auth }),
  {}
)(Sidebar);
