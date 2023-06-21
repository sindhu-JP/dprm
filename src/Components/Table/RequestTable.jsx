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
  TablePagination,
  TextField
} from '@material-ui/core';

import SelectDropDown from 'Components/SelectDropdown';
import { KeyboardDatePicker } from '@material-ui/pickers';
import SimpleSelect from 'Components/SimpleSelect';

let name = ['DRAFT', 'COMPLETED'];
const RequestTable = ({
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
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

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
                    maxWidth: column.maxWidth
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.border} style={{ width: '10%' }}>
                <TextField
                  placeholder={'filter'}
                  fullWidth
                  label="OPPORTUNITY ID"
                />
              </TableCell>
              <TableCell className={classes.border} style={{ width: '10%' }}>
                <TextField label="OrderID" placeholder={'filter'} />
              </TableCell>
              <TableCell className={classes.border} style={{ width: '10%' }}>
                <SimpleSelect label={'ALl'} />
              </TableCell>
              <TableCell className={classes.border} style={{ width: '10%' }}>
                <SimpleSelect label={'ALl'} />
              </TableCell>
              <TableCell className={classes.border} style={{ width: '10%' }}>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  format="MM/dd/yyyy"
                  disablePast
                  onChange={(e) => {}}
                />
              </TableCell>
              <TableCell className={classes.border} style={{ width: '10%' }}>
                <SelectDropDown name={name} />
              </TableCell>
            </TableRow>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
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

RequestTable.defaultProps = {
  rows: [],
  columns: []
};

export default RequestTable;
