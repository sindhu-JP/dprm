// import React, { useState, Fragment, createRef } from 'react';
// import config from 'config';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import classNames from 'classnames';
// import ReactDOM from 'react-dom';
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
// import { Link } from 'react-scroll';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import { Trans } from '@lingui/macro';
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
// import PrimaryContactDetails from './PrimaryContactDetails';
// import PartnerRelationshipManager from './PartnerRelationshipManager';
// import Manager from 'Assets/Icons/manager.svg';
// import Refrel from 'Assets/Icons/referral.svg';
// import AddressCompany from 'Assets/Icons/AddressCompany.svg';
// import leadUser from 'Assets/Icons/LeadAssignment.svg';
// import Service from 'Assets/Icons/Service-details.svg';
// import upload from 'Assets/Icons/Registration.svg';
// import companydetails from 'Assets/Icons/svgicon.svg';

// const ListItemLink = (props) => <ListItem button component="a" {...props} />;

// const PartnerDetailsContent = (props) => {
//   const [selectedRow, setSelectedRow] = useState(0);
//   const [scroll, setScroll] = useState('');
//   let items = [];
//   const classes = useStyles();
//   const details = React.createRef();
//   const address = React.createRef();
//   const billing = React.createRef();
//   const contactdetails = React.createRef();

//   const handleListItemClick = (index, id) => {
//     setSelectedRow(index);
//     setScroll(id);
//     scroll.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   const customerDetailsList = [
//     {
//       name: <Trans>Partner Details</Trans>,
//       sectionId: 'CompanyDetails',
//       icon: companydetails,
//       id: 'details'
//     },
//     {
//       name: <Trans>Company Address</Trans>,
//       sectionId: 'CompanyAddress',
//       icon: AddressCompany,
//       id: 'address'
//     },
//     {
//       name: <Trans>Billing</Trans>,
//       sectionId: 'ProfileOwnerDetails',
//       icon: Manager,
//       id: 'billing'
//     },

//     {
//       name: <Trans>Primary Contact Details</Trans>,
//       sectionId: 'ServiceDetails',
//       icon: Service,
//       id: 'contactdetails'
//     },
//     {
//       name: <Trans>Add Another Contact</Trans>,
//       sectionId: 'LeadAssignment',
//       icon: leadUser,
//       id: 'anothercontact'
//     },
//     {
//       name: <Trans>Partner Relationship Manager</Trans>,
//       sectionId: 'LeadAssignment',
//       icon: leadUser,
//       id: 'realtionship'
//     },
//     {
//       name: <Trans>Upload Documents</Trans>,
//       sectionId: 'LeadAssignment',
//       icon: leadUser,
//       id: 'upload'
//     }
//   ];
//   return (
//     <Box m={6}>
//       <Grid container direction="row">
//         <Grid item xs={4}>
//           {/* Vertical Tabe Menu */}
//           {/* <SideTabMenu
//             sections={props.details.data.PartnerProfileCreation.sections}
//           /> */}
//           <Grid container spacing={6} className={classes.root}>
//             <Grid item xs={12}>
//               <Paper
//                 elevation={0}
//                 variant="elevation"
//                 className={classes.sideBar}
//               >
//                 <div>
//                   <List className={classNames('pt0', 'pb0')}>
//                     {customerDetailsList.map((item, index) => (
//                       <Fragment key={index}>
//                         <Link
//                           to={item.id}
//                           spy={true}
//                           smooth={true}
//                           offset={-150}
//                           duration={500}
//                         >
//                           <ListItemLink
//                             onClick={() => handleListItemClick(index, item.id)}
//                             selected={selectedRow === index}
//                             className={classNames(
//                               classes.listItem,
//                               selectedRow === index
//                                 ? classes.selectedLink
//                                 : null
//                             )}
//                             style={{ fontWeight: 'bold' }}
//                           >
//                             <ListItemIcon
//                               className={classNames(
//                                 classes.listItemIcon,
//                                 selectedRow === index ? classes.selectedRow : ''
//                               )}
//                             >
//                               <img
//                                 src={item.icon}
//                                 className={classes.iconsize}
//                               />
//                             </ListItemIcon>

//                             <ListItemText
//                               primary={
//                                 <Typography
//                                   gutterBottom
//                                   variant="body1"
//                                   className={classNames(
//                                     classes.listItemText,
//                                     selectedRow === index
//                                       ? classes.selectedRow
//                                       : null
//                                   )}
//                                 >
//                                   {item.name}
//                                 </Typography>
//                               }
//                             />
//                           </ListItemLink>
//                         </Link>

//                         <Divider />
//                       </Fragment>
//                     ))}
//                   </List>
//                 </div>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item xs={8}>
//           <Grid container direction="column" justify="flex-end" spacing={6}>
//             <Grid item id="details" ref={details}>
//               {/* <PartnerDetails
//                 // values={
//                 //   props.details.data.PartnerProfileCreation.PartnerDetails
//                 // }
//               /> */}
//             </Grid>
//             <Grid item id="address" ref={address}>
//               {/* <PartnerAddress
//                 // values={
//                 //   props.details.data.PartnerProfileCreation.CompanyAddress
//                 // }
//               /> */}
//             </Grid>
//             <Grid item id="billing" ref={billing}>
//               {/* <PartnerBilling
//                 // values={props.details.data.PartnerProfileCreation.Billing}
//               /> */}
//             </Grid>
//             <Grid item id="contactdetails" ref={contactdetails}>
//               {/* <PrimaryContactDetails

//               /> */}
//             </Grid>
//             <Grid item id="realtionship">
//               {/* <PartnerRelationshipManager

//               /> */}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     paddingRight: '1rem'
//   },
//   sideBar: {
//     position: 'sticky',
//     top: '75px',
//     padding: '1.5rem 0'
//   },
//   iconsize: {
//     width: '22px',
//     height: '20px'
//   },
//   selectedRow: {
//     color: theme.palette.primary.main
//     // borderRight: `5px solid ${theme.palette.primary.main}`
//   },
//   selectedLink: {
//     fill: theme.palette.primary.main,
//     fontWeight: 'bold',
//     borderRight: `5px solid ${theme.palette.primary.main}`,
//     backgroundColor: 'green'
//   },
//   listItemText: {
//     color: '#4933D3',
//     fontWeight: 'bold'
//   },
//   listItemIcon: {},
//   listItem: {
//     fontWeight: 'bold',
//     '&:hover': {
//       background: theme.palette.common.white,
//       color: '#4933D3'
//     },
//     '&:hover $listItemText': {
//       color: theme.palette.primary.main
//       // color:"#4933D3"
//     },
//     '&:hover $listItemIcon': {
//       fill: theme.palette.primary.main
//       // color:"#4933D3".
//     }
//   },
//   headerName: {
//     color: theme.palette.text.secondary
//   },
//   contentName: {
//     color: theme.palette.text.primary
//   },
//   headerTitle: {
//     color: theme.palette.text.primary,
//     textAlign: 'left',
//     letterSpacing: 0,
//     marginLeft: theme.spacing(4)
//   },
//   rootSpacing: {
//     marginBottom: theme.spacing(6)
//   },
//   saveButton: {
//     width: 92,
//     height: 40,
//     borderRadius: 8,
//     background: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     '&:hover': {
//       background: theme.palette.primary.main
//     }
//   },
//   cancelButton: {
//     width: 92,
//     height: 40,
//     marginRight: theme.spacing(6),
//     background: 'transparent',
//     '&:hover': {
//       background: 'transparent'
//     }
//   },
//   sectionTitle: {
//     color: theme.palette.common.gray
//   },
//   modalRootTitle: {
//     display: 'none'
//   },
//   dialogClassName: {
//     padding: theme.spacing(12, 32)
//   },
//   checkCircle: {
//     display: 'block',
//     margin: '0 auto',
//     width: theme.spacing(32),
//     height: theme.spacing(32),
//     fill: theme.palette.success.main,
//     textAlign: 'center'
//   },
//   modalTitle: {
//     color: theme.palette.success.main,
//     textAlign: 'center'
//   },
//   dialogContent: {
//     width: '100%'
//   },
//   warningIcon: {
//     fill: theme.palette.error.main
//   },
//   boxShadow: {
//     boxShadow: `0px 0px 6px ${theme.palette.common.grayShadow}`,
//     borderRadius: theme.spacing(4)
//   },
//   buttonProgress: {
//     position: 'absolute',
//     color: theme.palette.success.main
//   },
//   text: {
//     color: theme.palette.primaryMain
//   }
// }));
// export default PartnerDetailsContent;
