// import React from 'react';
// import {
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   InputAdornment,
//   Chip,
//   makeStyles,
//   Box,
//   Button
// } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   title: {
//     fontWeight: theme.typography.fontWeightBold
//   }
// }));
// const AdditionalContact = (props) => {
//   const classes = useStyles();
//   return (
//     <div>
//       <Paper elevation={0}>
//         <Box p={4}>
//           <Box mb={4}>
//             <Grid container direction="row" spacing={4}>
//               <Grid item>
//                 <Typography variant="h2" className={classes.title}>
//                   Additional Contact Details
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">NAME</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {props.primaryContactDetails.PRIMARY_CONTACT_NAME}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">LASTNAME</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {props.primaryContactDetails.PRIMARY_CONTACT_LAST_NAME}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">DESIGNATION</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {props.primaryContactDetails.DESIGNATION}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">MOBILE NUMBER</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {props.primaryContactDetails.MOBILE_NUMBER}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">EMAIL</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {props.primaryContactDetails.EMAIL_ID}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">WHATSAPP</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {' '}
//                     {props.primaryContactDetails.WHATSAPP}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">PHONE NUMBER</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {' '}
//                     {props.primaryContactDetails.PHONE_NUMBER}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">EXTENION NUMBER</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {' '}
//                     {props.primaryContactDetails.EXTENION_NUMBER}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="subtitle2">DEPARTMENT</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">
//                     {' '}
//                     {props.primaryContactDetails.DEPARTMENT}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </div>
//   );
// };
// export default AdditionalContact;
