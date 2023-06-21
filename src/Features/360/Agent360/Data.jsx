// import React, { useEffect } from 'react';
// import { makeStyles } from '@material-ui/core';
// import {
//   Paper,
//   Checkbox,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   Badge
// } from '@material-ui/core';
// import RequestTable from 'Components/Table/RequestTable';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { history } from 'Store';
// import MuiTable from '@material-ui/core/Table';
// import BlackList from 'Components/BlackList';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import { SvgIcon } from 'lib/components';
// import TablePagination from '@material-ui/core/TablePagination';
// import SearchIcon from '@material-ui/icons/Search';
// import filter from 'Assets/Icons/Filter.svg';

// const RecentRequests = (props) => {
//   const [checked, setChecked] = React.useState(false);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };
//   const classes = useStyles();
//   function createData(id, cname, associated, start, end) {
//     return { id, cname, associated, start, end };
//   }

//   const rows = [
//     createData(
//       'SQR00666',
//       'New Registration',
//       '11 May 2020',
//       'Jessica Pearson',
//       'Product Config in DCM'
//     ),
//     createData(
//       'SQR00987',
//       'New Registration',
//       '4 May 2020',
//       'Jessica Pearson',
//       'Product Config in DCM'
//     ),
//     createData(
//       'SQR00293',
//       'New Registration',
//       '13 Apr 2020',
//       'Jessica Pearson',
//       'Product Config in DCM'
//     )
//   ];

//   return (
//     <Paper className={classes.paper} elevation={0} my={6}>
//       <Grid container direction="column">
//         <Grid container direction="row" display="flex" justify="space-between">
//           <Grid item flexGrow={1}>
//             <Box pl={2} py={4}>
//               <Typography variant="h5">Recent Requests</Typography>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Grid container direction="row">
//               <Grid item>
//                 <IconButton>
//                   <SearchIcon fontSize={'large'} />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <IconButton>
//                   <Badge variant="dot">
//                     <img src={filter} />
//                   </Badge>
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid>
//           <TableContainer component={Box}>
//             <Table className={classes.table} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>REQUEST ID</TableCell>
//                   <TableCell align="left">REQUEST TYPE</TableCell>
//                   <TableCell align="left">START DATE</TableCell>
//                   <TableCell align="left">ASSIGNEE</TableCell>
//                   <TableCell align="left">STATUS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow key={row.id}>
//                     <TableCell
//                       component="th"
//                       scope="row"
//                       className={classes.cel1}
//                     >
//                       {row.id}
//                     </TableCell>
//                     <TableCell align="left" className={classes.row}>
//                       {row.cname}
//                     </TableCell>
//                     <TableCell align="left" className={classes.row}>
//                       {row.associated}
//                     </TableCell>
//                     <TableCell align="left" className={classes.row}>
//                       {row.start}
//                     </TableCell>
//                     <TableCell align="left" className={classes.row}>
//                       <Typography className={classes.status}>
//                         {row.end}
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//           />
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: '20px',
//     maxHeight: '100%',
//     overflow: 'auto'
//   },
//   sign: {
//     color: '1400C8'
//   },
//   table: {
//     minWidth: 650,
//     backgroundColor: 'inherit',
//     borderCollapse: 'separate',
//     borderSpacing: '0px 4px'
//   },
//   row: {
//     //"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'
//     // "& td": {
//     //   paddingLeft: "2rem",
//     //   paddingRight: "2rem",
//     // },
//     borderBottom: '1px solid lightgrey',
//     borderTop: '1px solid lightgrey'
//   },
//   cel1: {
//     borderBottom: '1px solid lightgrey',
//     borderLeft: '1px solid lightgrey',
//     borderTop: '1px solid lightgrey'
//   },
//   celast: {
//     borderBottom: '1px solid lightgrey',
//     borderRight: '1px solid lightgrey',
//     borderTop: '1px solid lightgrey'
//   },
//   status: {
//     backgroundColor: '#FFA502',
//     borderRadius: '12px',
//     fontSize: '12px',
//     color: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '10px',
//     marginBottom: '10px',
//     display: 'flex',
//     width: '150px'
//   }
// }));
// export default RecentRequests;
