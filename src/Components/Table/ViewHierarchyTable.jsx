// import React from 'react';
// import {
//   TableContainer,
//   Table as MuiTable,
//   TableBody,
//   TableHead,
//   TableCell,
//   TableRow,
//   TablePagination,
//   TableFooter,
//   makeStyles
// } from '@material-ui/core';
// const useStyles = makeStyles((theme) => ({
//   table: {
//     backgroundColor: theme.palette.common.white,
//     borderCollapse: 'collapse',
//     width: '99%'
//   },
//   borderview: {
//     // border:'1px solid red',
//     borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
//     borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
//     '&:first-child': {
//       borderLeft: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
//     },
//     '&:last-child': {
//       borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
//     }
//   },
//   border: {
//     // border: "1px solid #e2e2e2",
//     borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
//     borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
//     '&:first-child': {
//       borderLeft: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
//     },
//     '&:last-child': {
//       borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
//     }
//   },
//   tableRow: {}
// }));
// const ViewHierarchyTable = () => {
//   const classes = useStyles();
//   return (
//     <>
//       <TableContainer>
//         <MuiTable stickyHeader className={classes.table}>
//           <TableHead>
//             <TableRow>
//               <TableCell className="table-headers">PRODUCT NAME</TableCell>
//               <TableCell className="table-headers">PRODUCT ID</TableCell>
//               <TableCell className="table-headers">CONTRACT ID</TableCell>
//               <TableCell className="table-headers">CONTRACT VALIDITY</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow
//               style={{
//                 borderWidth: '1px',
//                 borderColor: '#aaaaaa',
//                 borderStyle: 'solid'
//               }}
//             >
//               <TableCell className="table-partnername-waiting-status">
//                 Mobile Plan 1
//               </TableCell>
//               <TableCell>09876543211 </TableCell>
//               <TableCell>123456 </TableCell>
//               <TableCell>12 Months </TableCell>
//             </TableRow>
//             <TableRow
//               style={{
//                 borderWidth: '1px',
//                 borderColor: '#aaaaaa',
//                 borderStyle: 'solid'
//               }}
//             >
//               <TableCell>
//                 <a>Mobile Plan 1</a>
//               </TableCell>
//               <TableCell className="table-partnername-waiting-status">
//                 09876543211
//               </TableCell>
//               <TableCell>123456 </TableCell>
//               <TableCell>12 Months </TableCell>
//             </TableRow>
//           </TableBody>
//         </MuiTable>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 20, 30, 40, 50]}
//         component="div"
//       />
//     </>
//   );
// };

// export default ViewHierarchyTable;
