// import React from "react";
// import {
//   Paper,
//   Avatar,
//   Grid,
//   ButtonBase,
//   Typography,
//   Button,
//   Icon,
//   Chip,
//   Box,
// } from "@material-ui/core";

//  import _ from 'lodash'
// import { makeStyles } from "@material-ui/core/styles";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   border: {
//     border: "1px solid #e2e2e2",
//     //  borderRadius:"0px"


//     padding: theme.spacing(2),
//     // margin: "auto",
//     minHeight: "5rem",
//   },

//    paper:{
//     padding: theme.spacing(2),
//     // margin: "auto",
//     minHeight: "5rem",
       
//    },
//   image: {
//     width: 128,
//     height: 128,
//   },

//   grid1: {
//     paddingRight: "40px",
//   },
//   count: {
//     fontSize: theme.spacing(7.25),
//     fontWeight: theme.typography.fontWeightBold,
//   },
//   title: {
//     fontWeight: "600",
//   },
//   green: {
//     backgroundColor: theme.palette.success.main,
//     color: theme.palette.common.white,
//     width: "65px",
//     borderRadius: "7px",
//   },
// }));
// const ProductDetails = ({ data, selectsubscription, unselectproduct , }) => {
//   const classes = useStyles();


//   return (
//     <Paper className={classes.border} elevation={0}>
//       <Box py={5} px={4}>
//         <Grid container direction="row" spacing={4}>
//           <Grid item>
//             <Typography variant="h5" className={classes.title}>
//               {_.get(data, "name", "")}
//             </Typography>
//           </Grid>

//           <Grid item>
//             <Chip
//               className={classes.green}
//               // label={_.get(props?.SubOpportunity, "status", "")}
//               label="Active"
//               size={"small"}
//             />
//           </Grid>
//           <Grid item>
//             <Typography variant="body1">
//               Subscription ID:
//               {_.get(data, "publicIdentifier", "")}
//             </Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={5}>
//           <Grid item xs={12} sm container spacing={4} className={classes.paper}>
//             <Grid item xs container direction="column">
//               <Grid container direction="row" spacing={4}>
//                 <Grid item>
//                   <Typography variant="h6">
//                     {/* {existingOpp.companyDetails.companyName}{" "} */}

//                     {_.get(data, "LoB", "")}
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="h6">| </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="h6">
//                     {_.get(data, "businessType", "")}{" "}
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="h6">| </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="h6">
//                     {_.get(data, "billingAccount.name", "")}:{" "}
//                     {_.get(data, "billingAccount.id", "")}{" "}
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Grid item>
//                 {/* <Typography variant="body1">Precondition goes here </Typography> */}
//               </Grid>
//             </Grid>

//             <Grid item className={classes.paper}>
//               <Button variant="contained" color="primary"
              
//                onClick={unselectproduct}
//               >
//                Unselect
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// };

// export default ProductDetails;
