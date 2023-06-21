import React from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box,
  makeStyles,
  TablePagination
} from '@material-ui/core';

const MainTable = ({
  rows,
  columns,
  onRowAction,
  role,
  onRowClick,
  props,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  const classes = useStyles();
  return (
    <Box>
      <TableContainer className={classes.container}>
        <MuiTable stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    color: '#67809F'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={row.code}
                key={index}
                onClick={(e) => onRowClick(e, row)}
              >
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    align={col.align}
                    className={classes.border}
                    style={{ width: '10%' }}
                  >
                    {col.render && typeof col.render === 'function'
                      ? col.render({
                          status: row.columns[col.id],
                          role: '',
                          action: (e) => onRowAction(e, row)
                        })
                      : col.format && typeof col.format === 'function'
                      ? col.format(row.columns[col.id])
                      : row.columns[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},

  container: {
    overflowY: 'auto',
    maxHeight: 750,
    minHeight: 750,
    backgroundColor: theme.palette.common.white,
    overflowX: 'auto',
    '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px)':
      {
        maxHeight: 750,
        minHeight: 750,
        backgroundColor: theme.palette.common.white,
        overflowY: 'auto',
        overflowX: 'auto'
      }
  },
  table: {
    backgroundColor: theme.palette.common.white
  },
  borderview: {
    // border:'1px solid red',
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  border: {
    // border: "1px solid #e2e2e2",
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  tableRow: {}
}));

MainTable.defaultProps = {
  rows: [],
  columns: []
};

export default MainTable;
