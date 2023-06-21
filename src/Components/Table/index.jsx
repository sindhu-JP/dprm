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
import { useHistory } from 'react-router-dom';
import { Trans } from '@lingui/react';

const Table = ({
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
  const history = useHistory();
  let reversedRows = rows.slice(0).reverse();
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
            {reversedRows.length > 0 &&
              (rowsPerPage > 0
                ? reversedRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : reversedRows
              ).map((row) => (
                <TableRow
                  style={{
                    borderWidth: '1px',
                    borderColor: '#aaaaaa',
                    borderStyle: 'solid'
                  }}
                >
                  <TableCell>
                    {row.PartnerProfileCreation['PartnerDetails'].Partner_ID}
                  </TableCell>
                  <TableCell>
                    {row.PartnerProfileCreation['PartnerDetails'].PARTNER_NAME}
                  </TableCell>
                  <TableCell>
                    {row.PartnerProfileCreation['PrimaryContactDetails'] &&
                      row.PartnerProfileCreation['PrimaryContactDetails']
                        .MOBILE_NUMBER}
                  </TableCell>
                  <TableCell>
                    {row.PartnerProfileCreation['PrimaryContactDetails'] &&
                      row.PartnerProfileCreation['PrimaryContactDetails']
                        .EMAIL_ID}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }).format(new Date(row.createdDate))}
                  </TableCell>
                  <TableCell
                    className={classes.status}
                    onClick={() => {
                      history.push({
                        pathname: '/digital-prm-web-ui/hierarchy',
                        state: {
                          partnerId:
                            row.PartnerProfileCreation['PartnerDetails']
                              .Partner_ID
                        }
                      });
                    }}
                  >
                    <Trans id="Manage Hierarchy"></Trans>
                    {/* replace with manage hierarchy */}
                  </TableCell>
                  <TableCell>
                    {/* <IconButton onClick={()=>{
                      history.push('/digital-prm-web-ui/hierarchy')
                    }}>
                      <MoreVertIcon />
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            {/* {rows?.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow
                key={row.code}
                key={index}
                onClick={(e) => onRowClick(e, row)}
                
              >
                {columns.map((col, idx) => (
                  <TableCell key={idx} align={col.align}
                  className={classes.border}

                   style={{width:"10%"}}
                  
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
            ))} */}
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

  status: {
    cursor: 'pointer',
    backgroundColor: 'orange',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '14px',
    marginBottom: '14px',
    display: 'flex'
  },
  approved: {
    backgroundColor: 'green'
  },
  pending: {
    backgroundColor: 'orange'
  },
  approved: {
    backgroundColor: 'red'
  },
  container: {
    overflowY: 'auto',
    minHeight: 262,
    maxHeight: 262,
    backgroundColor: theme.palette.common.white,
    overflowX: 'auto',
    '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px)':
      {
        maxHeight: 750,
        minHeight: 750,
        backgroundColor: theme.palette.common.white
      }
  },
  table: {
    backgroundColor: theme.palette.common.white,
    borderCollapse: 'collapse',
    width: '99%'
  },
  borderview: {
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

Table.defaultProps = {
  rows: [],
  columns: []
};

export default Table;
