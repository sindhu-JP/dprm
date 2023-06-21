// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import { Box, Chip } from '@material-ui/core';
// import { Grid } from '@material-ui/core';
// import { Typography } from '@material-ui/core';
// import { Avatar } from '@material-ui/core';
// import icon from 'Assets/Icons/company.svg';
// import ProductIcon from 'Assets/Icons/ProductIcon.svg';
// import product from 'Assets/Icons/product.svg';
// import tenant from 'Assets/Icons/TenantPartner.svg';

// const useStyles = makeStyles({
//   list: {
//     width: 330,
//     overflowX: 'hidden'
//   },
//   fullList: {
//     width: 'auto'
//   },
//   boxcolor: {
//     backgroundColor: '#1C1EC8',
//     height: '230px'
//   },
//   text: {
//     color: '#FFFFFF'
//   },
//   chip: {
//     background: 'red',
//     color: 'white',
//     marginLeft: '1px',
//     width: '28px',
//     height: '15px',
//     marginTop: '1px'
//   },
//   count: {
//     color: '#FFFFFF',
//     marginLeft: '5px',
//     fontWeight: 'bold'
//   }
//   // searchbox: {
//   //   backgroundColor: '#2CFEE8',
//   //   height: '50px'
//   // }
// });
// export default function LeftDrawer({
//   open,
//   handleleave,
//   partnerdetails,
//   showDrawer,
//   handleTabs,
//   hideTenant,
//   hideProducts
// }) {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false
//   });
//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };
//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom'
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {hideProducts && (
//           <ListItem
//             button
//             onClick={() => {
//               handleTabs('Products'), showDrawer.setFalse();
//             }}
//           >
//             <ListItemIcon>
//               <img src={product} style={{height:"18px"}}/>
//             </ListItemIcon>

//             <ListItemText primary={'Products'} />
//             <Chip
//               label={_.get(partnerdetails, 'details.productCount', '0')}
//               color="error"
//               className={classes.chip}
//               size="small"
//             />
//           </ListItem>
//         )}
//         {hideTenant && (
//           <ListItem
//             button
//             onClick={() => {
//               handleTabs('Tenants');
//               showDrawer.setFalse();
//             }}
//           >
//             <ListItemIcon>
//               <img src={tenant} />
//             </ListItemIcon>
//             <ListItemText primary={'Tenants'} />
//             <Chip
//               label={_.get(partnerdetails, 'details.tenantCount', '0')}
//               color="error"
//               className={classes.chip}
//               size="small"
//             />
//           </ListItem>
//         )}
//       </List>
//     </div>
//   );
//   return (
//     <div onMouseLeave={handleleave}>
//       {['left'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Drawer
//             anchor={anchor}
//             open={open}
//             onClose={handleleave}
//             onClose={toggleDrawer(anchor, false)}
//             style={{ overflowX: 'hidden', width: 300 }}
//           >
//             <Box py={4} className={classes.boxcolor}>
//               <Box py={6}>
//                 <Grid
//                   container
//                   direction="column"
//                   alignItems="center"
//                   spacing={3}
//                   mt={15}
//                 >
//                   <Grid item>
//                     <Avatar
//                       style={{
//                         height: '50px',
//                         width: '50px',
//                         backgroundColor: '#D8E2EF'
//                       }}
//                     >
//                       <img alt="Remy Sharp" src={icon}></img>
//                     </Avatar>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="h2" className={classes.text}>
//                       {_.get(partnerdetails, 'mainlist.partnerName', '...')}
//                     </Typography>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="body1" className={classes.text}>
//                       Partner ID:{' '}
//                       {_.get(partnerdetails, 'mainlist.partnerId', '...')}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Grid item>
//                 <Box py={4} px={10}>
//                   <Grid
//                     xs
//                     container
//                     direction="row"
//                     spacing={1}
//                     justify="space-between"
//                   >
//                     <Grid item>
//                       <img src={tenant} />
//                       <span className={classes.count}>
//                         {_.get(partnerdetails, 'details.tenantCount', '0')}
//                       </span>
//                     </Grid>
//                     <Grid item>
//                       <Typography variant="h6">|</Typography>
//                     </Grid>
//                     <Grid item>
//                       <img src={product} style={{height:"18px"}}/>{' '}
//                       <span className={classes.count}>
//                         {_.get(partnerdetails, 'details.productCount', '0')}
//                       </span>
//                     </Grid>
//                     <Grid item>
//                       <img src={ProductIcon} />
//                       <span className={classes.count}>
//                         {_.get(partnerdetails, 'details.contractCount', '0')}
//                       </span>
//                     </Grid>
//                     <Grid item></Grid>
//                   </Grid>
//                 </Box>
//               </Grid>
//             </Box>
//             <Box py={4} className={classes.searchbox}></Box>
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
