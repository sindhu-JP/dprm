// // "https://xd.adobe.com/view/47138c9b-db17-46fa-8988-185a26f05a98-1240/screen/8d4bad4f-9a47-4ed9-a17c-ee6aa6208dbc/specs/"
// import React from 'react';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import {
//   Grid,
//   Box,
//   Button,
//   Typography,
//   makeStyles,
//   IconButton,
//   Paper
// } from '@material-ui/core';
// import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: '35rem',
//     margin: 'auto',
//     marginTop: theme.spacing(12)
//   },

//   inner: {
//     padding: theme.spacing(8)
//   },

//   rounded: {
//     borderRadius: theme.spacing(5),
//     padding: theme.spacing(2, 7)
//   },

//   icon: {
//     backgroundColor: theme.palette.error.main,
//     color: theme.palette.common.white,
//     padding: theme.spacing(4),
//     '& svg': {
//       fill: '#ffffff'
//     }
//   },
//   duplicate: {
//     backgroundColor: theme.palette.error.main,
//     color: theme.palette.common.white
//   },
//   property: {
//     width: theme.spacing(50)
//   }
// }));
// const Duplicate = ({ Data, onClose }) => {
//   const classes = useStyles();
//   // const [company, _] = React.useState(props.data.customer || {});

//   return (
//     <Box className={classes.root}>
//       <Grid container direction="column" alignItems="center" spacing={8}>
//         <Grid item>
//           <Paper elevation={0} className={classes.inner}>
//             <Grid container direction="column" alignItems="center" spacing={8}>
//               <Grid item>
//                 <IconButton size={10} color="error" className={classes.icon}>
//                   <ReportProblemRoundedIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <Typography variant="h2">Duplicate</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography variant="h6" style={{ textAlign: 'center' }}>
//                   {/* {props.data.heading} */}
//                   {`“${Data.companyRegistrationNumber}" company registration number   found Dupilcate.
//                   Registration can’t be performed.`}
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Grid container direction="column" justify="center" spacing={6}>
//                   <Grid item>
//                     <Grid
//                       container
//                       spacing={6}
//                       alignItems="center"
//                       justify="center"
//                     >
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'right' }}
//                         item
//                       >
//                         Company Name
//                       </Grid>
//                       <Grid item>:</Grid>
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'left' }}
//                         item
//                       >
//                         {Data.companyName}
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item>
//                     <Grid
//                       container
//                       spacing={6}
//                       alignItems="center"
//                       justify="center"
//                     >
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'right' }}
//                         item
//                       >
//                         Category
//                       </Grid>
//                       <Grid item>:</Grid>
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'left' }}
//                         item
//                       >
//                         {Data.customerCategory}
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item>
//                     <Grid
//                       container
//                       spacing={6}
//                       alignItems="center"
//                       justify="center"
//                     >
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'right' }}
//                         item
//                       >
//                         Sub Category
//                       </Grid>
//                       <Grid item>:</Grid>
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'left' }}
//                         item
//                       >
//                         {Data.customerSubCategory}
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item>
//                     <Grid
//                       container
//                       spacing={6}
//                       alignItems="center"
//                       justify="center"
//                     >
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'right' }}
//                         item
//                       >
//                         companyRegistrationNumber
//                       </Grid>
//                       <Grid item>:</Grid>
//                       <Grid
//                         className={classes.property}
//                         style={{ textAlign: 'left' }}
//                         item
//                       >
//                         {Data.companyRegistrationNumber}
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//                 {/* <Grid container direction="row" spacing={4}>
//                   {props.details?.map((field, index) => (
//                     <Grid item xs={6} key={index}>
//                       <Grid
//                         container
//                         direction="column"
//                         justify="space-between"
//                       >
//                         <Grid item>
//                           <Typography variant="subtitle2">
//                             {field.label}
//                           </Typography>
//                         </Grid>
//                         <Grid item>
//                           <Typography variant="h6">{field.value}</Typography>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   ))}
//                 </Grid> */}
//               </Grid>
//               <Grid item style={{ alignSelf: 'flex-end' }}>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   size="large"
//                   className={classes.rounded}
//                   onClick={onClose}
//                 >
//                   OK
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* <Grid item style={{ alignSelf: "center" }}>
//           <Button
//             variant="contained"
//             color="error"
//             size="large"
//             className={classNames(classes.duplicate, classes.rounded)}
//             onClick={props.}
//           >
//             Click here to continue duplicate check
//           </Button>
//         </Grid> */}
//       </Grid>
//     </Box>
//   );
// };

// Duplicate.defaultProps = {
//   details: [],
//   onClose: () => {}
// };

// Duplicate.propTypes = {
//   detials: PropTypes.array,
//   onClose: PropTypes.func
// };

// export default Duplicate;
