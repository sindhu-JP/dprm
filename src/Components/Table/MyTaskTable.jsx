import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Box,
  makeStyles,
  TablePagination,
  Grid,
  Typography,
  Select
} from '@material-ui/core';
import DashboardController from '../../Controllers/Dashboard';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

const options = ['Approve', 'Reject'];

const ITEM_HEIGHT = 48;
const MyTaskTable = ({
  rows,
  columns,
  onRowAction,
  role,
  onRowClick,
  page,
  rowsPerPage,
  handleChangeListPage,
  handleChangeRowsPerListPage,
  ...props
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [position, setPosition] = useState(-1);
  const open = Boolean(anchorEl);
  const [rowData, setRowData] = React.useState();
  const [approvalDialogOpen, setAprrovalDialogOpen] = useState(false);

  function handleMenuClick(selectedRowData) {
    setRowData(selectedRowData);
    setAprrovalDialogOpen(true);
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClose = () => {
    setAprrovalDialogOpen(false);
  };

  // const handleClick = (event, row) => {
  //   setAnchorEl(event.currentTarget);
  //   setRowData(row);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   props.hideDialog();
  // };

  const options = ['Approve/Reject', 'Reassign', 'Follow Up'];

  const statusClass = (stat) => {
    if (stat.toLowerCase() === 'approve') {
      return classes.approved;
    } else if (stat.toLowerCase() === 'pending') {
      return classes.pending;
    } else if (stat.toLowerCase() === 'reject') {
      return classes.rejected;
    } else {
      return classes.pending;
    }
  };
  // const handleDialog = (row) => {
  // //  props.showDialog(row)
  // };

  let reversedRows = rows.slice(0).reverse();
  let managerDetails;
  var retrievedObject = localStorage.getItem('USER');
  var userName = JSON.parse(retrievedObject).sub;
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
          {/* {(rows.length === 0 || rows.length === undefined) && (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',width:'100%'}}>
              <h1>loading...</h1>
            </div>
          )} */}
          <TableBody>
            {reversedRows.length > 0 &&
              (rowsPerPage > 0
                ? reversedRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : reversedRows
              ).map((row, index) => (
                <TableRow
                  style={{
                    borderWidth: '1px',
                    borderColor: '#aaaaaa',
                    borderStyle: 'solid'
                  }}
                >
                  <TableCell>
                    <Button
                      style={{ color: 'black' }}
                      onClick={() => {
                        props.showDialog(row);
                      }}
                    >
                      {row.id}
                    </Button>
                  </TableCell>
                  {row.customerInfo.PRODUCT_NAME && (
                    <TableCell>{row.customerInfo.PRODUCT_NAME} </TableCell>
                  )}
                  {row.customerInfo.PARTNER_NAME && (
                    <TableCell>{row.customerInfo.PARTNER_NAME} </TableCell>
                  )}
                  {row.customerInfo.CONTRACT_ID && <TableCell> </TableCell>}
                  {/* {(() => {
                    if (row.customerInfo.PARTNER_NAME) {
                      <TableCell>{row.customerInfo.PARTNER_NAME} </TableCell>;
                    } else if (row.customerInfo.PRODUCT_NAME) {
                      {
                        row.customerInfo.PRODUCT_NAME;
                      }
                    }
                  })()} */}

                  {row.customerInfo.ticketName && (
                    <TableCell>{row.customerInfo.ticketName} </TableCell>
                  )}
                  {/* <TableCell>{row.customerInfo.groupName}</TableCell> */}
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }).format(new Date(row.createdDate))}
                  </TableCell>
                  <TableCell>{userName}</TableCell>
                  <TableCell
                    className={[classes.status, statusClass(row.status)]}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Grid container>
                      {' '}
                      <Typography className={classes.status}>
                        {row.customerInfo.status}
                      </Typography>
                      <Select
                        disableUnderline={true}
                        IconComponent={() => (
                          <MoreVertIcon
                            style={{
                              cursor: 'pointer',
                              minWidth: '20px',
                              width: '20px'
                            }}
                            onClick={() => {
                              setPosition(index);
                              setAnchorEl(true);
                              handleClick;
                            }}
                          />
                        )}
                        open={index === position}
                        onClose={() => {
                          setPosition(-1);
                          handleClose;
                        }}
                        onOpen={() => {
                          setPosition(index);
                          setAnchorEl(true);
                        }}
                        value={''}
                      >
                        <MenuItem
                          onClick={() => {
                            handleMenuClick(row);
                            props.handleBottomClick(row);
                          }}
                        >
                          Approve/Reject
                        </MenuItem>
                      </Select>
                      {/* <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={() => handleClick(row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            boxShadow: 'none',
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch'
                          }
                        }}
                      >
                        {options.map((option) => (
                          <MenuItem
                            key={option}
                            selected={option === 'Pyxis'}
                            onClick={handleOpenBottom}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu> */}
                      {/* <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="card-actions-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleMenuClick(row)}>
                          Action
                        </MenuItem>
                      </Menu> */}
                      {/* <Select
                        disableUnderline={true}
                        IconComponent={() => (
                          <MoreVertIcon
                            style={{
                              cursor: 'pointer',
                              minWidth: '20px',
                              width: '20px'
                            }}
                            onClick={() => {
                              setPosition(index);
                              setAnchorEl(true);
                              props.getPartnerActions({
                                formId: row.formIdentity,
                                Status: row.status
                              });
                            }}
                          />
                        )}
                        open={index === position}
                        onClose={() => {
                          setPosition(-1);
                        }}
                        onOpen={() => {
                          setPosition(index);
                          setAnchorEl(true);
                          props.getPartnerActions({
                            formId: row.formIdentity,
                            Status: row.status
                          });
                        }}
                        value={''}
                        // onChange={handleChange}
                      >
                        {props.actions.length === 0 &&
                          position === index &&
                          props.fetching === true && (
                            <MenuItem disabled>{'Loading'}</MenuItem>
                          )}
                        {props.actions.length === 0 &&
                          position === index &&
                          props.fetching === false && (
                            <MenuItem disabled>{'No actions'}</MenuItem>
                          )}

                        {props.actions.length > 0 &&
                          position === index &&
                          props.actions.map((option) => (
                            <MenuItem
                              key={option.name}
                              selected={option.name === 'Pyxis'}
                              onClick={() => {
                                handleClose();
                               );

                                props.updatePartnerStatus({
                                  ticketId: row.id,
                                  status: option.name,
                                  exeId: row.taskInfoId,
                                  body: row
                                });
                                // props.executeWorkFlow(row.taskInfoId)
                              }}
                            >
                              {option.name}
                            </MenuItem>
                          ))}
                      </Select> */}
                      {/* <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        // onClick={handleClick}
                        // fontSize={10}
                        onClick={() => {
                          setPosition(index)
                          setAnchorEl(true)
                          props.getPartnerActions({
                            formId: row.formIdentity,
                            Status: row.status,
                          });
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                   
                     {
                         position === index &&
                          <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "20ch",
                              borderRadius: "0px",
                              boxShadow: " 2px 2px 2px 2px #F3F4F9",
                              borderColor: "white",
                            },
                          }}
                        >
                         
                          {props.actions.length > 0 &&
                            props.actions.map((option) => (
                              <MenuItem
                                key={option.name}
                                selected={option.name === "Pyxis"}
                                onClick={handleClose}
                              >
                                {option.name}
                              </MenuItem>
                            ))}
                        </Menu>  */}
                    </Grid>
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
        onChangePage={handleChangeListPage}
        onChangeRowsPerPage={handleChangeRowsPerListPage}
      />
      {/* <PartnerDrawer open = {true} /> */}

      {/* {rowData != 'undefined' ? (
        <div>
          <ApprovalBottomSheet
            open={approvalDialogOpen}
            rowData={rowData}
            onClose={onClose}
          />
        </div>
      ) : (
        <div></div>
      )} */}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},

  status: {
    // backgroundColor: "orange",
    borderRadius: '12px',
    fontSize: '12px',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '14px',
    display: 'flex'
  },
  approved: {
    backgroundColor: '#30D973'
  },
  pending: {
    backgroundColor: '#FFA369'
  },
  rejected: {
    backgroundColor: 'red'
  },
  container: {
    overflowY: 'auto',
    minHeight: 300,
    maxHeight: 300,
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
    backgroundColor: theme.palette.common.white,
    borderCollapse: 'collapse',
    width: '99%'
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

MyTaskTable.defaultProps = {
  rows: [],
  columns: []
};

export default connect(
  (state) => ({
    actions: state.dashboardData.partnerActions,
    fetching: state.dashboardData.loading.partnerActionsLoading
  }),
  {
    showDialog: DashboardController.showPartnerDialog,
    hideDialog: DashboardController.hidePartnerDialog,
    getPartnerActions: DashboardController.getPartnerActions,
    updatePartnerStatus: DashboardController.updatePartnerStatus,
    executeWorkFlow: DashboardController.getPartnerExecutionResponse
  }
)(MyTaskTable);
