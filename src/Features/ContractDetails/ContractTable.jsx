import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Badge
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { history } from 'Store';

import TablePagination from '@material-ui/core/TablePagination';
import SearchIcon from '@material-ui/icons/Search';

import ContractShareDialog from './ContractShareDialog';
import EditableContract from './EditableContract';
import { isEmpty } from 'lodash-es';
import Model from 'Store/Modals';
import { useDispatch } from 'react-redux';
import ContractListRowDetails from './ContractListRowDetails';
import PartnertApi from 'Http/api/Partner';
import PartnerFactory from 'Factory/Partner';
import { useStateful } from 'react-hanger';

const ContractTable = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [showContract, setShowContract] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [rowData, setRowData] = React.useState({});
  const formData = useStateful({});
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const classes = useStyles();
  function createData(id, cname, associated, start, end) {
    return { id, cname, associated, start, end };
  }
  const onClose = () => {
    setOpenDialog(false);
    setOpenDrawer(false);
    setShowContract(false);
  };
  // let arr = [];

  // arr.push(props.contractList);
  // let filteredData;
  // const v = arr.map((item) => {
  //   let firstFiltered = item;
  //   const inside = (item) => {
  //     item.map((data) => {
  //       filteredData = data;
  //       return filteredData;
  //     });
  //   };
  //   return inside(firstFiltered);
  // });

  const rows = [
    createData(
      '009865',
      'Contract1',
      'Coca-Coal Karnataka',
      '11 May 2020',
      '11 May 2020'
    ),
    createData(
      '009865',
      'Contract1',
      'Coca-Coal Karnataka',
      '11 May 2020',
      '11 May 2020'
    ),
    createData(
      '009865',
      'Contract1',
      'Coca-Coal Karnataka',
      '11 May 2020',
      '11 May 2020'
    ),
    createData(
      '009865',
      'Contract1',
      'Coca-Coal Karnataka',
      '11 May 2020',
      '11 May 2020'
    ),
    createData(
      '009865',
      'Contract1',
      'Coca-Coal Karnataka',
      '11 May 2020',
      '11 May 2020'
    )
  ];
  const getPdfbase64 = async (row) => {
    const payload = {
      contractId: row?.CONTRACT_ID,
      productId: '',
      partnerId: row?.Partner_ID
    };
    const base64 = await PartnertApi.genereatepdf(payload);
    let payloadpdf = PartnerFactory.getfromdata(base64, row);
    formData.setValue(payloadpdf);
  };
  const handleShareContract = async () => {
    await PartnertApi.shareattachment(formData.value);
  };
  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container direction="column">
        <Grid container direction="row" display="flex" justify="space-between">
          <Grid item flexGrow={1}>
            <Box pl={2} py={4}>
              <Typography variant="h5">Contract Details</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              {checked ? (
                <Grid item>
                  <Button
                    size="large"
                    variant="text"
                    color="primary"
                    // onClick={() => history.push("/dlpm-web-ui/contractsignoff")}
                    onClick={() => props.openDrawer()}
                  >
                    Contract SignOff
                  </Button>
                </Grid>
              ) : (
                ''
              )}
              <Grid item>
                <IconButton>
                  <SearchIcon fontSize={'large'} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Badge variant="dot"></Badge>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <TableContainer component={Box}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>CONTRACT ID</TableCell>
                  <TableCell align="left">PARTNER ID</TableCell>
                  <TableCell align="left">PARTNER NAME</TableCell>
                  <TableCell align="left">START DATE</TableCell>
                  <TableCell align="left">END DATE</TableCell>
                  <TableCell align="left">ACTION</TableCell>
                  <TableCell align="left">EDIT </TableCell>
                  {/* <TableCell align="left"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dataSource.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => {
                      if (
                        row.Contract_SignOff === 'yes' &&
                        row.Contract_Shared === 'yes'
                      ) {
                        // alert('sign off btn is there');
                        setRowData(row);
                        setOpenDrawer(true);
                      }
                    }}
                  >
                    <TableCell align="left" className={classes.row}>
                      {row.CONTRACT_ID}
                    </TableCell>
                    {/* <TableCell
                      component="th"
                      scope="row"
                      className={classes.cel1}
                    >
                      <Checkbox onChange={handleChange} /> {row.id}
                    </TableCell> */}
                    <TableCell align="left" className={classes.row}>
                      {row.Partner_ID}
                    </TableCell>
                    <TableCell align="left" className={classes.row}>
                      {row.PARTNER_NAME}
                    </TableCell>
                    <TableCell align="left" className={classes.row}>
                      {new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                      }).format(new Date(row.START_DATE))}
                    </TableCell>
                    <TableCell align="left" className={classes.row}>
                      {new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                      }).format(new Date(row.END_DATE))}
                    </TableCell>
                    <TableCell align="left" className={classes.row}>
                      {(() => {
                        if (row.Contract_Shared === 'no') {
                          return (
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => {
                                // props.onClick(item);
                                // setDrawer(true);
                                // rowData = item;
                                // setSelectedRowDetails(item);
                                // props.openDrawer();
                                // props.rowDetails(row);
                                setRowData(row);
                                getPdfbase64(row);
                                setOpenDialog(true);
                              }}
                            >
                              Contract Share
                            </Button>
                          );
                        } else if (
                          row.Contract_Shared === 'yes' &&
                          row.Contract_SignOff === 'no'
                        ) {
                          return (
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => {
                                // props.onClick(item);
                                // setDrawer(true);
                                // rowData = item;
                                // setSelectedRowDetails(item);
                                // props.openDrawer();
                                dispatch(Model.open({ id: 'ButtomDrawer' }));
                                props.rowDetails(row);
                              }}
                            >
                              Sign Off
                            </Button>
                          );
                        }
                      })()}
                      {/* 
                      {row.Contract_Shared === 'no' ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                              // props.onClick(item);
                              // setDrawer(true);
                              // rowData = item;
                              // setSelectedRowDetails(item);
                              // props.openDrawer();
                              // props.rowDetails(row);

                              setOpenDialog(true);
                            }}
                          >
                            Contract Share
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                              // props.onClick(item);
                              // setDrawer(true);
                              // rowData = item;
                              // setSelectedRowDetails(item);
                              props.openDrawer();
                              props.rowDetails(row);
                            }}
                          >
                            Sign Off
                          </Button>
                        </>
                      )} */}
                    </TableCell>
                    {/* <TableCell align="left" className={classes.celast}> */}

                    {/* </TableCell> */}

                    <TableCell>
                      {(() => {
                        if (
                          row.Contract_Shared === 'yes' &&
                          row.Contract_SignOff === 'no'
                        ) {
                          return (
                            <>
                              <Button
                                variant="contained"
                                color="red"
                                size="large"
                                onClick={() => {
                                  setRowData(row);
                                  // props.onClick(item);
                                  setShowContract(true);
                                  // setDrawer(true);
                                  // rowData = item;
                                  // setSelectedRowDetails(item);
                                  // props.openDrawer();
                                  // dispatch(Model.open({id:"ButtomDrawer"}))
                                  props.rowDetails(row);
                                }}
                              >
                                Edit
                              </Button>
                            </>
                          );
                        } else {
                          return <></>;
                        }
                      })()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!isEmpty(rowData) ? (
              <>
                {showContract && (
                  <EditableContract
                    open={true}
                    formIdentity="Add_contract"
                    onClose={onClose}
                    row={rowData}
                    masterData={props}
                    callAPI={true}
                    // rowData={selectedRowDetails}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        </Grid>
        <Grid item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              history.push({
                pathname: '/digital-prm-web-ui/payment',
                partnerId: props.partnerId.id,
                partnerName: props.partnerId.name,
                contractsData: props.dataSource
              });

              // setPayment(true)
            }}
          >
            Payment
          </Button>
        </Grid>
      </Grid>
      {isEmpty(rowData) ? (
        <></>
      ) : (
        <ContractShareDialog
          open={openDialog}
          onClose={onClose}
          rowData={rowData}
          handleShareContract={handleShareContract}
        />
      )}
      {isEmpty(rowData) ? (
        <></>
      ) : (
        <ContractListRowDetails
          open={openDrawer}
          onClose={onClose}
          rowData={rowData}
        />
      )}
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxHeight: '100%',
    overflow: 'auto'
  },
  sign: {
    color: '1400C8'
  },
  table: {
    minWidth: 650,
    backgroundColor: 'inherit',
    borderCollapse: 'separate',
    borderSpacing: '0px 4px'
  },
  row: {
    //"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'
    // "& td": {
    //   paddingLeft: "2rem",
    //   paddingRight: "2rem",
    // },
    borderBottom: '1px solid lightgrey',
    borderTop: '1px solid lightgrey'
  },
  cel1: {
    borderBottom: '1px solid lightgrey',
    borderLeft: '1px solid lightgrey',
    borderTop: '1px solid lightgrey'
  },
  celast: {
    borderBottom: '1px solid lightgrey',
    borderRight: '1px solid lightgrey',
    borderTop: '1px solid lightgrey'
  }
}));
export default ContractTable;
