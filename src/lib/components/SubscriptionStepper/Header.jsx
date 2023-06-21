// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Divider,
//   Chip,
//   Typography,
//   Grid,
//   makeStyles
// } from '@material-ui/core';
// import { ArrowBack, Edit, PersonAddDisabled, Help } from '@material-ui/icons';
// import Logo from 'Assets/Icons/Logo.svg';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.common.white
//   },
//   spacer: {
//     flexGrow: 1
//   },
//   logo: {
//     width: theme.spacing(40),
//     '& > img': {
//       display: 'block',
//       backgroundSize: 'contain',
//       width: '100%',
//       height: 'auto'
//     }
//   },
//   divider: {
//     margin: theme.spacing(0, 4),
//     height: '3.6rem'
//   },
//   req: {
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightMedium
//   }
// }));
// const FormHeader = (props) => {
//   const classes = useStyles();

//   return (
//     <AppBar className={classes.root} position="relative">
//       <Toolbar>
//         <IconButton edge="start" onClick={props.onClose}>
//           <ArrowBack />
//         </IconButton>
//         <Box ml={4} className={classes.logo} onClick={props.onClose}>
//           <img src={Logo} />
//         </Box>
//         <Divider orientation="vertical" className={classes.divider} />
//         <Box>
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             wrap="nowrap"
//             spacing={6}
//           >
//             <Grid item>
//               <Typography className={classes.req} variant="h6">
//                 {`${props.title} - ${props.id ? props.id : 'Loading ...'}`}
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Chip
//                 // avatar={Edit}
//                 color="primary"
//                 variant="outlined"
//                 label="Draft"
//               />
//             </Grid>
//           </Grid>
//         </Box>
//         <Box className={classes.spacer} />
//         <Box>
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             justify="flex-end"
//           >
//             <Grid item>
//               <IconButton size="large" onClick={props.onFaqRequest}>
//                 <Help />
//               </IconButton>
//             </Grid>
//             <Grid item>
//               <IconButton size="large" onClick={props.onDrop}>
//                 <PersonAddDisabled />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// FormHeader.defaultProps = {
//   title: 'Create Lead',
//   onInfo: () => {},
//   onDrop: () => {}
// };

// FormHeader.propTypes = {};
// export default FormHeader;
