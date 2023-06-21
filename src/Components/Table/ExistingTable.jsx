import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// import React from "react";
// import {
//   TableContainer,
//   Table as MuiTable,
//   TableBody,
//   TableHead,
//   TableCell,
//   TableRow,
//   Box,
//   makeStyles,
//   IconButton,
//   Collapse,
//   Typography,
//   Table,
// } from "@material-ui/core";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// const ExistingTable = ({ rows, columns, onRowAction, role, onRowClick , subTable, Subcolumns}) => {
//   const [open, setOpen] = React.useState("");
//   const classes = useStyles();
//   return (
//     <Box>
{
  /* <TableContainer className={classes.container}>
        <MuiTable stickyHeader className={classes.table} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                 
                </IconButton>
              </TableCell>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody> */
}

{
  /* {rows?.map((row, index) => (
              <TableRow key={row.code} key={index}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>

                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    align={col.align}
                    className={classes.borderview}
                  >
                    {col.render && typeof col.render === "function"
                      ? col.render({
                          status: row.columns[col.id],
                          role: "",
                          action: (e) => onRowAction(e, row),
                        })
                      : col.format && typeof col.format === "function"
                      ? col.format(row.columns[col.id])
                      : row.columns[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))} */
}

{
  /* <TableRow>
              <TableCell
                // style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
      
                    <Table size="small" aria-label="purchases" className={classes.table}>
                      <TableHead>               
                          {Subcolumns?.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                   
                      </TableHead>
                      <TableBody>
                        {subTable?.map((row, index) => (
                          <TableRow key={row.code} key={index}>
                            {columns.map((col, idx) => (
                              <TableCell
                                key={idx}
                                align={col.align}
                                className={classes.borderview}
                              >
                                {col.render && typeof col.render === "function"
                                  ? col.render({
                                      status: row.columns[col.id],
                                      role: "",
                                      action: (e) => onRowAction(e, row),
                                    })
                                  : col.format &&
                                    typeof col.format === "function"
                                  ? col.format(row.columns[col.id])
                                  : row.columns[col.id]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow> */
}

{
  /* </TableBody>
         </MuiTable>
      </TableContainer> */
}
//     </Box>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   container: {
//     maxHeight: 800,
//     backgroundColor: theme.palette.common.white,
//   },
//   table: {
//     backgroundColor: theme.palette.common.white,
//   },
//   borderview:{
//     // borderWidth: 0, borderWidth: 1, borderColor: 'red',borderStyle: 'solid'

//   }
// }));

// ExistingTable.defaultProps = {
//   rows: [],
//   columns: [],
// };

// export default ExistingTable;

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

export const Row = (props) => {
  const { row, onRowClick } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow key={props.row.code} key={props.index}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {props.columns.map((col, idx) => (
          <TableCell key={idx} align={col.align} className={classes.borderview}>
            {col.render && typeof col.render === 'function'
              ? col.render({
                  status: row.columns[col.id],
                  role: '',
                  action: (e) => props.onRowAction(e, row)
                })
              : col.format && typeof col.format === 'function'
              ? col.format(row.columns[col.id])
              : row.columns[col.id]}
          </TableCell>
        ))}
      </TableRow>

      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto">
          <Table size="small" aria-label="purchases">
            <TableHead>
              {props.Subcolumns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {props.row.subtable?.map((row, index) => (
                <TableRow
                  key={row?.code}
                  key={index}
                  onClick={(e) => onRowClick(e, props.row)}
                >
                  {props.columns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      align={col.align}
                      className={classes.borderview}
                    >
                      {col.render && typeof col.render === 'function'
                        ? col.render({
                            status: row.columns[col.id],
                            role: '',
                            action: (e) => props.onRowAction(e, props.row)
                          })
                        : col.format && typeof col.format === 'function'
                        ? col.format(row.columns[col.id])
                        : row.columns[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>

      {/* 
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" >
            <Table size="small" aria-label="purchases">
              <TableHead>
                {props.Subcolumns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                {props.subTable?.map((row, index) => (
                  <TableRow key={row.code} key={index}>
                    {props.columns.map((col, idx) => (
                      <TableCell
                        key={idx}
                        align={col.align}
                        className={classes.borderview}
                      >
                        {col.render && typeof col.render === "function"
                          ? col.render({
                              status: row.columns[col.id],
                              role: "",
                              action: (e) => props.onRowAction(e, row),
                            })
                          : col.format && typeof col.format === "function"
                          ? col.format(row.columns[col.id])
                          : row.columns[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
};

const ExistingTable = ({
  rows,
  columns,
  onRowAction,
  role,
  onRowClick,
  subTable,
  Subcolumns,
  subtable
}) => {
  const [open, setOpen] = React.useState('');
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table
        aria-label="collapsible table"
        stickyHeader
        className={classes.table}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              ></IconButton>
            </TableCell>
            {columns?.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <Row
              row={row}
              index={index}
              columns={columns}
              subTable={subTable}
              Subcolumns={Subcolumns}
              onRowAction={onRowAction}
              onRowClick={onRowClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    maxHeight: 800,
    backgroundColor: theme.palette.common.white
  },
  table: {
    backgroundColor: theme.palette.common.white
  },
  borderview: {
    // borderWidth: 0, borderWidth: 1, borderColor: 'red',borderStyle: 'solid'
  }
}));

ExistingTable.defaultProps = {
  rows: [],
  columns: []
};

export default ExistingTable;
