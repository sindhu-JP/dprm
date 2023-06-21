import React from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Paper,
  TextField,
  InputAdornment
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Table from '../../../../Components/Table/RenderTable';
import ORDER_TABLE from 'lib/constants/Financial/ConfigTable';
import img from 'Assets/Icons/Notes.svg';
import imgD from 'Assets/Icons/NotesD.svg';
import { TecnotreedigitalSales } from 'Http/axios';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import update from 'update-immutable';
import { useBoolean } from 'react-hanger';
import Modal from 'Store/Modals';
import Backdroploader from 'Components/Backdroploader';
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import Alert from 'Store/Alert';

const DigitalProductList = (props) => {
  const { customerInfo, quoteDetails } = props;
  const [qoute360ViewOpen, setQoute360ViewOpen] = React.useState(false);
  const [quoteInfo, setQuoteInfo] = React.useState('');
  const enableSearch = useBoolean(false);
  const classes = useStyles();
  const loading = useBoolean(false);
  const dispatch = CustomHooks.customUseDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const { ThemeType } = useSelector((state) => state.Appearance);
  const handleChangeRowsPerListPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerListPage(+event.target.value);
    setMyListPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuOpen = () => {};
  const maketable = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        rowlist: row?.orders,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };

  const handleTableRowClick = (e, data) => {
    dispatch(
      Modal.open({
        id: 'OrderDetails',
        context: {
          details: data
        }
      })
    );
  };

  const handleLeadAction = (action, data) => {
    if (action.modalId) {
      loading.setTrue();
      TecnotreedigitalSales.post(
        '/bpmn/executeProcess',

        update(
          {},
          {
            $merge: {
              workflowId: 1635430030839,
              userId: '',
              userRole: '',

              executionModeStatus: false,
              async: false,
              Values: {
                accessToken: localStorage.getItem('ACCESS_TOKEN'),
                id: data?.rowlist?.id,
                resourceSpecificationId: data?.rowlist?.resourceSpecificationId,
                productOfferingId: data?.rowlist?.productOfferingId,
                patchStatus: action.modalId,
                resourceFacingServiceSpecificationId:
                  data?.rowlist?.resourceFacingServiceSpecificationId,
                customerFacingServiceSpecificationId:
                  data?.rowlist?.customerFacingServiceSpecificationId,
                productionSpecificationType:
                  data?.rowlist?.productionSpecificationType
                //optionalId: props.location.state.details.partnerId
                //   }
              }
            }
          }
        )
      )
        .then((resp) => {
          loading.setFalse();
          // props.DcmProductlist({id:props.partnerId})
          if (resp?.data?.apiResponse?.status === '200 OK') {
            dispatch(
              Alert.open({
                type: 'success',
                message: `DCM Product offering status updated successfully to ${action.modalId}!!!`
              })
            );
            props.DcmProductlist({ id: props.partnerId });
          } else {
            dispatch(
              Alert.open({
                type: 'error',
                message: 'Please Try again '
              })
            );
            loading.setFalse();
          }
        })
        .catch((err) => {
          dispatch(
            Alert.open({
              type: 'error',
              message: 'Please Try again '
            })
          );
          loading.setFalse();
        });
    }
  };

  return (
    <Grid container direction="row" spacing={6}>
      <Backdroploader open={loading.value} />
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={4}
                    >
                      {enableSearch.value ? (
                        <Grid item>
                          <TextField
                            style={{ width: '400px' }}
                            id="standard-basic"
                            fullWidth
                            placeholder="Search by Quote ID, Name"
                            InputProps={{
                              disableunderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon
                                    fontSize="large"
                                    className={classes.iconSearch}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      ) : (
                        <>
                          <Grid item>
                            {ThemeType === 'dark' ? (
                              <img src={imgD} className={classes.imglog} />
                            ) : (
                              <img src={img} className={classes.imglog} />
                            )}
                          </Grid>
                          <Grid item>
                            <Typography variant="h2" className={classes.title}>
                              {'Digital Products'}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={4}
                        >
                          <Grid item>
                            {enableSearch.value ? (
                              <CloseOutlinedIcon
                                fontSize={'small'}
                                onClick={enableSearch.toggle}
                              />
                            ) : (
                              <SearchIcon
                                fontSize={'large'}
                                onClick={enableSearch.toggle}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* taxdocument */}
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={4}
                        >
                          <Grid item></Grid>
                        </Grid>
                      </Grid>
                      {/* tax end */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Table
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              role={props.user?.role?.roleName}
              // role={props.user?.role?.roleName}
              // // rows={leads.value?.table?.rows || []}
              rows={maketable(props.orderList).reverse()}
              // // rows={Object.values(props.leadsState.tableRows)}
              columns={ORDER_TABLE.DCM.columns}
              onRowAction={handleLeadAction}
              //   onRowClick={handleTableRowClick}
              breackpoint={true}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  }
}));

export default connect((state) => ({}), {})(DigitalProductList);
