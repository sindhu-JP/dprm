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
  Menu,
  MenuItem,
  TablePagination,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Paper
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Trans, useLingui } from '@lingui/react';
// import PartnerTabs from "Features/Home/Tabs.";
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ViewWorkFlow from 'Components/workflowDisplay/displayWorkflow';
import CircularProgress from '@material-ui/core/CircularProgress';
import noDataFound from 'Assets/Icons/noDataFound.svg';
import DownloadReports from 'Assets/Icons/downloads.svg';
import { Skeleton } from '@material-ui/lab';
import _range from 'lodash/range';
const RenderTable = ({
  rows,
  columns,
  onRowAction,
  role,
  onRowClick,
  props,
  page,
  rowsPerPage,
  onCountactions,
  handleChangePage,
  handleChangeRowsPerPage,
  breackpoint,
  handleOpenworkflowhistory,
  handleCloseworkflowhistory,
  workflowHistory,
  workFlowLoader,
  handleOpenworkflowAction,
  totalCount,
  BreackRowPoint = false,
  loading = false,
  handleFileUpload,
  uploadData,
  DownloadDocs,
  loader
}) => { 
  console.log('table rows', rows)
  const classes = useStyles({ breackpoint });
  const onDownloadAction = (e, row) => {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowVal, setRowVal] = React.useState(null);
  const open = Boolean(anchorEl);
  const onClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const { i18n } = useLingui();

  // console.log("asasa: ", rows)

  // console.log("colass: ", columns)

  const [activeLanguage, setActiveLanguage] = React.useState(
    i18n.locale || 'en'
  );

  React.useEffect(() => {
    setActiveLanguage(i18n.locale);
  }, [i18n.locale]);

  console.log(rows, "rowsssss")
  const ofValue = i18n.t`of`;
  const rowsPerPageValue = <Trans id="Records Per Page" />;

  return (
    <Box>
                <Grid item xs={12}>
                        <Paper elevation={0} className={classes.overLap}>
                          {/* <PartnerTabs
                            dashboardData={props.dashboardData}
                            handleLeadAction={handleLeadAction}
                            handleTableRowClick={handleTableRowClick}
                            handleTableDealerClick={handleDealerClick}
                            onCountactions={onCountactions}
                            getPartnerLead={props.getPartnerLead}
                            getResellerPartners={props.getResellerPartners}
                            getPotentialPartners={props.getPotentialPartners}
                            getTenantsList={props.getTenantsList}
                            FilterByPartner={props.FilterByPartner}
                            FilterByTenant={props.FilterByTenant}
                            FilterByAgent={props.FilterByAgent}
                            FilterByDealer={props.FilterByDealer}
                            tableRowCount={props.dashboardData?.tableCount}
                            alertSuccess={props.alertState}
                            refreshObj={refresh}
                            getPotentialDealer={props.getPotentialDealer} */}
                          {/* /> */}
                        </Paper>
                      </Grid>
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
                    // color: '#67809F'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading === true || loader === true ? (
          <TableRow className={classes.tableRow}>

           <TableCell colSpan={8} className={classes.border}>
          
           <Grid container>
          
           <Grid item xs={12}>
          
           {_range(8).map((card) => (
          
           <Typography variant="body1" key={card}>
          
           <Skeleton height="80px" />
          
           </Typography>
          
           ))}
          
           </Grid>
          
           </Grid>
          
           </TableCell>
          
          </TableRow>
            ) : (
              <>
                {(uploadData && uploadData().length) ||
                  (rows.length === 0  && (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          direction="column"
                        >
                          <Grid item>
                            <img src={noDataFound} />
                          </Grid>
                          <Grid item>
                            <Trans id="No Information Available"></Trans>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                {BreackRowPoint ? (
                  <>
                    {rows &&
                      rows.map((row, index) => (
                        <>
                          <TableRow
                            key={row.code}
                            //key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => onRowClick(e, row)}
                          >
                            {columns.map((col, idx) => (
                              <TableCell
                                key={idx}
                                align={col.align}
                                className={classes[`${row?.partners?.profileStatus}`]}
                                style={{ width: '10%' }}
                              >
                                {col.render &&
                                typeof col.render === 'function' ? (
                                  col.render({
                                    status: row.columns[col.id],
                                    role: '',
                                    data: row,
                                    action: (e) => onRowAction(e, row),
                                    onDownloadAction: (e) =>
                                      onDownloadAction(e, row)
                                  })
                                ) : col.format &&
                                  typeof col.format === 'function' ? (
                                  col.format(row?.columns[col.id])
                                ) : col.id === 'mytaskcount' ? (
                                  <Typography
                                    variant="h6"
                                    onClick={(e) =>
                                      onCountactions(e, row, 'Request')
                                    }
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {row[col.id]}
                                  </Typography>
                                ) : Math.sign(row[col.value]) === -1 ? (
                                  <Typography
                                    variant="h6"
                                    style={{
                                      color: 'red',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    {row[col.id]}
                                  </Typography>
                                ) : row.columns[col.id] === 'workflow' ? (
                                  <>
                                    View Workflow
                                    {row?.open ? (
                                      <IconButton
                                        onClick={() =>
                                          handleCloseworkflowhistory(
                                            row?.columns?.WORKFLOW_ID
                                          )
                                        }
                                      >
                                        <RemoveCircleOutlineRoundedIcon color="primary" />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        onClick={() =>
                                          handleOpenworkflowhistory(
                                            row?.columns?.WORKFLOW_ID
                                          )
                                        }
                                      >
                                        <AddCircleIcon color="primary" />
                                      </IconButton>
                                    )}
                                    <IconButton
                                      aria-label="more"
                                      aria-controls="long-menu2"
                                      aria-haspopup="true"
                                      onClick={onClick}
                                    >
                                      {/* <{o?.isOpen ? (
                                                   <RemoveCircleOutlineRoundedIcon />
                                                 ) : ( */}
                                      <MoreVertIcon
                                        color="primary"
                                        onClick={() => {
                                          setRowVal(row);
                                          // handleOpenworkflowAction(row);
                                        }}
                                      />

                                      <Menu
                                        id="long-menu2"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={(e) => {
                                          e.stopPropagation();
                                          setAnchorEl(null);
                                        }}
                                        className={classes.paperSpace}
                                      >
                                        <MenuItem
                                          onClick={(e) => {
                                            //  e.stopPropagation();

                                            handleOpenworkflowAction(rowVal);
                                            setAnchorEl(null);
                                          }}
                                        >
                                          <Trans id="Task Allocations policy"></Trans>
                                        </MenuItem>
                                      </Menu>
                                      {/* )} */}
                                    </IconButton>
                                  </>
                                ) : row[col.id] === 'Settings' ? (
                                  <>
                                    {/* Settings      hided */}
                                    <IconButton
                                      aria-label="more"
                                      aria-controls="long-menu2"
                                      aria-haspopup="true"
                                      onClick={onClick}
                                    >
                                      {/* <{o?.isOpen ? (
                                                   <RemoveCircleOutlineRoundedIcon />
                                                 ) : ( */}
                                      <MoreVertIcon
                                        color="primary"
                                        // onClick={() =>
                                        //   handleOpenworkflowAction(row)
                                        // }
                                      />
                                      <Menu
                                        id="long-menu2"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={(e) => {
                                          e.stopPropagation();
                                          setAnchorEl(null);
                                        }}
                                        className={classes.paperSpace}
                                      >
                                        {/* {actions.value.map((option) => (
                                          <MenuItem key={option.id} onClick={(e) => onClose(e, option)}>
                                            {option.label}
                                          </MenuItem>
                                        ))} */}
                                        <MenuItem
                                          onClick={(e) => {
                                            //  e.stopPropagation();
                                            setAnchorEl(null);
                                            handleOpenworkflowAction(row);
                                          }}
                                        >
                                          Task Allocation policy
                                        </MenuItem>
                                      </Menu>
                                      {/* )} */}
                                    </IconButton>
                                  </>
                                ) : row.columns[col.id] === 'doc' ? (
                                  <Grid container spacing={4}>
                                    <Grid item>
                                      <IconButton
                                        onClick={() =>
                                          DownloadDocs(row.columns)
                                        }
                                      >
                                        <label htmlFor="select-image1">
                                          <img src={DownloadReports} />
                                        </label>
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  row.columns[col?.id]
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                          {row?.open && (
                            <>
                              <TableRow>
                                <TableCell
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                  colSpan={6}
                                >
                                  {!workFlowLoader ? (
                                    <Collapse
                                      in={true}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Grid>
                                        {!_.isEmpty(workflowHistory) && (
                                          <Grid
                                            item
                                            className={classes.workFlowView}
                                          >
                                            <ViewWorkFlow
                                              workflowTaskData={workflowHistory}
                                            />
                                          </Grid>
                                        )}
                                      </Grid>
                                    </Collapse>
                                  ) : (
                                    <div className={classes.root}>
                                      <CircularProgress
                                        align="center"
                                        color="inherit"
                                        size={24}
                                      />
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </>
                      ))}
                  </>
                ) : (
                  <>
                    {rows &&
                      rows
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <>
                            <TableRow
                              key={row.code}
                              //key={index}
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => onRowClick(e, row)}
                            >
                              {columns.map((col, idx) => (
                                <TableCell
                                  key={idx}
                                  align={col.align}
                                  className={classes.border}
                                  style={{ width: '10%' }}
                                >
                                  {col.render &&
                                  typeof col.render === 'function' ? (
                                    col.render({
                                      status: row.columns[col.id],
                                      role: '',
                                      data: row,
                                      action: (e) => onRowAction(e, row),
                                      onDownloadAction: (e) =>
                                        onDownloadAction(e, row)
                                    })
                                  ) : col.format &&
                                    typeof col.format === 'function' ? (
                                    col.format(row?.columns[col.id])
                                  ) : col.id === 'mytaskcount' ? (
                                    <Typography
                                      variant="h6"
                                      onClick={(e) =>
                                        onCountactions(e, row, 'Request')
                                      }
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {row[col.id]}
                                    </Typography>
                                  ) : Math.sign(row[col.value]) === -1 ? (
                                    <Typography
                                      variant="h6"
                                      style={{
                                        color: 'red',
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      {row[col.id]}
                                    </Typography>
                                  ) : row.columns[col.id] === 'workflow' ? (
                                    <>
                                      View Workflow
                                      {row?.open ? (
                                        <IconButton
                                          onClick={() =>
                                            handleCloseworkflowhistory(
                                              row?.columns?.WORKFLOW_ID
                                            )
                                          }
                                        >
                                          <RemoveCircleOutlineRoundedIcon color="primary" />
                                        </IconButton>
                                      ) : (
                                        <IconButton
                                          onClick={() =>
                                            handleOpenworkflowhistory(
                                              row?.columns?.WORKFLOW_ID
                                            )
                                          }
                                        >
                                          <AddCircleIcon color="primary" />
                                        </IconButton>
                                      )}
                                      <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu2"
                                        aria-haspopup="true"
                                        onClick={onClick}
                                      >
                                        {/* <{o?.isOpen ? (
                                                   <RemoveCircleOutlineRoundedIcon />
                                                 ) : ( */}
                                        <MoreVertIcon
                                          color="primary"
                                          onClick={() => {
                                            setRowVal(row);
                                            // handleOpenworkflowAction(row);
                                          }}
                                        />

                                        <Menu
                                          id="long-menu2"
                                          anchorEl={anchorEl}
                                          keepMounted
                                          open={open}
                                          onClose={(e) => {
                                            e.stopPropagation();
                                            setAnchorEl(null);
                                          }}
                                          className={classes.paperSpace}
                                        >
                                          <MenuItem
                                            onClick={(e) => {
                                              //  e.stopPropagation();

                                              handleOpenworkflowAction(rowVal);
                                              setAnchorEl(null);
                                            }}
                                          >
                                            Task Allocations policy
                                          </MenuItem>
                                        </Menu>
                                        {/* )} */}
                                      </IconButton>
                                    </>
                                  ) : row[col.id] === 'Settings' ? (
                                    <>
                                      {/* Settings      hided */}
                                      <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu2"
                                        aria-haspopup="true"
                                        onClick={onClick}
                                      >
                                        {/* <{o?.isOpen ? (
                                                   <RemoveCircleOutlineRoundedIcon />
                                                 ) : ( */}
                                        <MoreVertIcon
                                          color="primary"
                                          // onClick={() =>
                                          //   handleOpenworkflowAction(row)
                                          // }
                                        />
                                        <Menu
                                          id="long-menu2"
                                          anchorEl={anchorEl}
                                          keepMounted
                                          open={open}
                                          onClose={(e) => {
                                            e.stopPropagation();
                                            setAnchorEl(null);
                                          }}
                                          className={classes.paperSpace}
                                        >
                                          {/* {actions.value.map((option) => (
                                          <MenuItem key={option.id} onClick={(e) => onClose(e, option)}>
                                            {option.label}
                                          </MenuItem>
                                        ))} */}
                                          <MenuItem
                                            onClick={(e) => {
                                              //  e.stopPropagation();
                                              setAnchorEl(null);
                                              handleOpenworkflowAction(row);
                                            }}
                                          >
                                            Task Allocation policy
                                          </MenuItem>
                                        </Menu>
                                        {/* )} */}
                                      </IconButton>
                                    </>
                                  ) : row.columns[col.id] === 'doc' ? (
                                    <Grid container spacing={4}>
                                      <Grid item>
                                        <IconButton
                                          onClick={() =>
                                            DownloadDocs(row.columns)
                                          }
                                        >
                                          <label htmlFor="select-image1">
                                            <img src={DownloadReports} />
                                          </label>
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    row.columns[col?.id]
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                            {row?.open && (
                              <>
                                <TableRow>
                                  <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={6}
                                  >
                                    {!workFlowLoader ? (
                                      <Collapse
                                        in={true}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <Grid>
                                          {!_.isEmpty(workflowHistory) && (
                                            <Grid
                                              item
                                              className={classes.workFlowView}
                                            >
                                              <ViewWorkFlow
                                                workflowTaskData={
                                                  workflowHistory
                                                }
                                              />
                                            </Grid>
                                          )}
                                        </Grid>
                                      </Collapse>
                                    ) : (
                                      <div className={classes.root}>
                                        <CircularProgress
                                          align="center"
                                          color="inherit"
                                          size={24}
                                        />
                                      </div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              </>
                            )}
                          </>
                        ))}
                  </>
                )}
              </>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
        component="div"
        count={totalCount || rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          MenuProps: { classes: { paper: classes.selectDropdown } }
        }}
        classes={{ menuItem: classes.menuItem }}
        labelRowsPerPage={rowsPerPageValue}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${ofValue} ${count}`
        }
        dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},

  container: {
    // width:'87vw',
    overflowY: 'auto',
    maxHeight: ({ breackpoint }) => (breackpoint ? 750 : 410),
    minHeight: ({ breackpoint }) => (breackpoint ? 750 : 410),
    backgroundColor: theme.palette.background.paper,
    overflowX: 'auto',
    '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px)':
      {
        maxHeight: ({ breackpoint }) => (breackpoint ? 750 : 410),
        minHeight: ({ breackpoint }) => (breackpoint ? 750 : 410),
        backgroundColor: theme.palette.common.white,
        overflowY: 'auto',
        overflowX: 'auto'
      }
  },
  table: {
    backgroundColor: theme.palette.background.paper,
    position:'Sticky',
    '& .MuiTableCell-body': {
      color: theme.palette.primary.black
    },
    '& .MuiTableCell-head': {
      color: theme.palette.primary.black,
      backgroundColor: theme.palette.background.paper
    }
  },
  paperSpace: {
    '& .MuiMenu-paper': {
      backgroundColor: theme.palette.primary.black,
      padding: 0
    }
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
  PENDING: {
    // border: "1px solid #e2e2e2",
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(1.5)} solid #FF0000`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  COMPLETED: {
    // border: "1px solid #e2e2e2",
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(1.5)} solid #2ED573`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  INPROGRESS: {
    // border: "1px solid #e2e2e2",
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(1.5)} solid #FD9024`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  tableRow: {},
  selectDropdown: {
    background: 'black',
    marginTop: '1rem'
  },
  menuItem: {
    // color: 'white'
  }
}));

RenderTable.defaultProps = {
  rows: [],
  columns: []
};

export default RenderTable;
