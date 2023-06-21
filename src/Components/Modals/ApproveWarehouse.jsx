// import React from 'react';
// import { useStateful } from 'react-hanger';
// import {
//   Grid,
//   Box,
//   Button,
//   Typography,
//   makeStyles,
//   TextareaAutosize,
//   Input
// } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100vw',
//     height: '100vh'
//   },

//   inner: {
//     width: theme.spacing(100),
//     padding: theme.spacing(6),
//     height: 'auto',
//     backgroundColor: theme.palette.common.white,
//     borderRadius: theme.spacing(4)
//   },

//   subtitle: {
//     fontWeight: theme.typography.fontWeightMedium
//   },

//   textarea: {
//     width: '100%',
//     minWidth: '100%',
//     maxWidth: theme.spacing(92),
//     maxHeight: theme.spacing(104),
//     border: `none`,
//     color: theme.palette.text.primary,
//     fontFamily: 'inherit'
//   },

//   mtop50: {
//     marginTop: '50px'
//   },

//   submitBtn: {
//     background: '#2626C0',
//     width: '93px',
//     color: 'white',
//     borderRadius: '8px',
//     fontSize: '16px',
//     '&:hover': {
//       background: '#2626C0'
//     }
//   },

//   titleColor: {
//     color: '#CECECE'
//   }
// }));
// const ApproveWarehouse = ({ user, onCancel, onSubmit }) => {
//   const classes = useStyles();
//   const description = useStateful('');

//   const handleSubmit = () => {
//     onSubmit(description.value);
//   };

//   return (
//     <Box className={classes.root}>
//       <Grid
//         container
//         direction="column"
//         justify="center"
//         spacing={6}
//         className={classes.inner}
//       >
//         <Grid item>
//           <Typography variant="h4">Approve Warehouse</Typography>
//         </Grid>

//         <Grid item>
//           <Typography variant="h6" className={classes.subtitle}>
//             Approve Warehouse by {user}
//           </Typography>
//         </Grid>

//         <Grid item>
//           <Grid container direction="column" spacing={2}>
//             <Grid item>
//               <Typography variant="subtitle2">Description</Typography>
//             </Grid>
//             <Grid item>
//               <TextareaAutosize
//                 rowsMin={4}
//                 rowsMAx={6}
//                 placeholder="Your Description Here"
//                 className={classes.textarea}
//                 onChange={(e) => description.setValue(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item>
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             justify="flex-end"
//             spacing={4}
//           >
//             <Grid item>
//               <Button
//                 onClick={onCancel}
//                 size="large"
//                 variant="text"
//                 color="secondary"
//               >
//                 Cancel
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 onClick={handleSubmit}
//                 variant="contained"
//                 color="primary"
//                 size="large"
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ApproveWarehouse;
