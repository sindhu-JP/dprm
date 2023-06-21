// import React, { useState } from 'react';
// import config from 'config';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import {
//   Grid,
//   Box,
//   makeStyles,
//   Avatar,
//   Menu,
//   MenuItem,
//   Typography,
//   TextField
// } from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
// import Logo from 'Assets/Icons/Logo.svg';
// import Arrow from 'Assets/Icons/arrow-up.svg';
// import Notes from 'Assets/Icons/DprmColoredNotes.svg';
// import Globalsearch from 'Components/SearchBar/Globalsearch';
// import AuthController from 'Controllers/Auth';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import SettingsIcon from '@material-ui/icons/Settings';
// import { InputAdornment, Paper } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import Quick from 'Assets/Icons/quicklinks.svg';
// import Notification from 'Assets/Icons/notification.svg';
// import setting from 'Assets/Icons/setting.svg';
// import thirdparty from 'Assets/Icons/thirdparty.svg';
// import { history } from 'Store';
// import { Alert } from 'Components';
// import AlertActions from 'Store/Alert';
// import { Chip } from '@material-ui/core';
// import PartnerDetails from './PartnerDetails';
// import PartnerAddress from './PartnerAddress';
// import PartnerBilling from './PartnerBilling';
// import SideTabMenu from './SideTabMenu';
// import PrimaryContactDetails from './PrimaryContactDetails';
// import PartnerRelationshipManager from './PartnerRelationshipManager';
// import PartnerDetailsContent from './PartnerDetailsContent';
// // import RecentRequests from './';
// import SimpleTabs from './Tabs';

// const MainContent = (props) => {
//   const classes = useStyles();

//   const [details, setDetails] = useState(false);
//   const [request, setRequest] = useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const handClick = () => {
//     setDetails(true);
//     if (request) {
//       setRequest(false);
//     }
//     setIsActive(true);
//   };

//   const handClose = () => {
//     setDetails(false);
//     setRequest(true);
//     setIsActive(false);
//   };
//   return (
//     <Box className={classes.root}>
//       <Grid container direction="row" justify="center" spacing={20}>
//         {/* <Grid item align="center">
//           <Button className={classes.button}>Partner Overview</Button>
//         </Grid> */}
//         <Grid item align="center">
//           <Button
//             className={isActive ? classes.active : classes.button}
//             onClick={handClick}
//           >
//             Partner Details
//           </Button>
//         </Grid>
//         <Grid item align="center">
//           <Button className={classes.button}>Financials</Button>
//         </Grid>
//         <Grid item align="center">
//           <Button
//             className={isActive ? classes.button : classes.active}
//             onClick={handClose}
//           >
//             Requests
//           </Button>
//         </Grid>
//         <Grid item align="center">
//           <Button className={classes.button}>Contracts</Button>
//         </Grid>
//         <Grid item align="center">
//           <Button className={classes.button}>Order Tracking</Button>
//         </Grid>
//       </Grid>
//       {/* {details ? <PartnerDetailsContent details={props} /> : ''}
//       {request ? <RecentRequests /> : ''} */}
//     </Box>
//     // <div>
//     //   <SimpleTabs details={props} />
//     // </div>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: '#F3F4F9',
//     height: '40px'
//   },
//   button: {
//     marginTop: '10px',
//     height: '25px',
//     backgroundColor: '#F3F4F9',
//     color: 'primary',
//     '&:hover': {
//       backgroundColor: '#1400C8',
//       color: '#fff'
//     }
//   },
//   active: {
//     marginTop: '10px',
//     height: '25px',
//     backgroundColor: '#1400C8',
//     color: '#fff'
//   }
// }));

// export default MainContent;
