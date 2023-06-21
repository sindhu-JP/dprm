import React, { useEffect, useState } from 'react';
// import _ from 'lodash';

import { connect, useDispatch } from 'react-redux';
import { useStateful } from 'react-hanger';
import UtilsDate from 'lib/utils/date';
import {
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  InputBase,
  withStyles
} from '@material-ui/core';
import HierarchyController from 'Controllers/Hierarchy';
import LeadController from 'Controllers/Lead';
import DashboardController from 'Controllers/Dashboard';
import { Navbar } from 'Components';
import Table from 'Components/Table/RenderTable';
import LeadDetails from 'Features/LeadDetails';
import ModalsStore from 'Store/Modals';
import { useBoolean } from 'react-hanger';
import AlertActions from 'Store/Alert';
import { useHistory } from 'react-router';
import Chicklets from 'Components/Chicklets';
import SelectDropdown from 'Components/Select';
import DashboardLayout from 'Layouts/Dashboard';
import ORDER_TABLE from 'lib/constants/Financial/ConfigTable';
import OrderDetails from '../../360/Partner360/OrderDetails/Orderdetails';
import TableSearch from 'Components/TableSearch';
import moment from 'moment';
import RootFooter from 'Components/Footer/RootFooter';

import { Trans } from '@lingui/react';
//  import Utils from 'Factory/Utils'
const OrderRequests = (props) => {
  const classes = useStyles();
  const leads = useStateful({});
  const navMessage = useStateful('');
  const duration = useStateful('All');

  const history = useHistory();

  const updatatedLobs = useStateful({});
  const filtermenu = useBoolean(false);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const partnerFilter = useBoolean(false);
  const onSelectValues = useStateful({});
  const FilterObj = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const SearchValue = useStateful({});
  const [loader, setLoader] = useState(false);
  const username = JSON.parse(localStorage.getItem('USER'));
  const SearchQuery = useStateful({});

  const Input = withStyles((theme) => ({
    root: {
      backgrounColor: 'green'
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: theme.spacing(3, 7, 3, 4),
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
      }
    }
  }))(InputBase);
  const options = [
    {
      label: <Trans id="All"></Trans>,
      value: 'All',
      code: 'All'
    },
    {
      label: <Trans id="Today"></Trans>,
      value: '0',
      code: '0'
    },
    {
      label: <Trans id="Last week"></Trans>,
      value: '7',
      code: '7'
    },
    {
      label: <Trans id="Last 1 Month"></Trans>,
      value: '1',
      code: '1'
    },
    {
      label: <Trans id="Last 3 Month"></Trans>,
      value: '3',
      code: '3'
    }
  ];

  const handleTableRowClick = (event, row) => {};

  const handleLeadAction = async (action, partner) => {
    if (action.modalId === 'manageHierarchy') {
      history.push({
        pathname: '/digital-prm-web-ui/hierarchy',
        state: {
          partnerId: partner?.columns?.id,
          parterList: partner
        }
      });
    } else if (action.actionType) {
      const payloadDeactive = {
        partnerId: partner?.columns?.id
      };
      props[action.actionType]({ payload: payloadDeactive });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.orderTracking({
      limit: rowsPerPage,
      offset: newPage,
      value: SearchValue.value
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    props.orderTracking({
      limit: event.target.value,
      offset: newPage,
      value: SearchValue.value
    });
  };

  React.useEffect(() => {
    props.existing();

    props.AllgetPartnerCounts();
    props.getAllorderCounts();
    props.orderTracking({ limit: 10, offset: 0, setLoader });
  }, []);

  const handleChangeCount = (e) => {
    if (e.target.value === 'All') {
      return props.getAllorderCounts();
    } else {
      const payload = {
        dateRange: UtilsDate.getDateCalculation(e.target.value)
      };

      return props.getOrderCounts({ payload });
    }
  };

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

  const onSearchTable = (search, value) => {
    SearchValue.setValue(value);
    SearchQuery.setValue(search);
    console.log('value', value);
    console.log('search', search);
    props.orderTracking({ 
      limit: rowsPerPage, 
      offset: page, 
      searchValue: value,
      searchQuery: search
     });
  };
  const handleRefresh = () => {
    setPage(0);
    setRowsPerPage(10);
    props.orderTracking({ limit: 10, offset: 0, setLoader });
  };

  const handlFilterApply = () => {
    const payload = {
      fromDate: FilterObj.value?.fromDate
        ? `${moment(FilterObj.value?.fromDate).format(
            'YYYY-MM-DD'
          )}T00:00:00.000Z`
        : null,
      toDate: FilterObj.value?.toDate
        ? `${moment(FilterObj.value?.toDate).format(
            'YYYY-MM-DD'
          )}T24:00:00.000Z`
        : null,
      status: FilterObj.value?.status
    };
    FilterObj.setValue({});
    props.FilterByorderTracking({ payload: payload });
  };

  useEffect(()=>{
    console.log('unique',props.dashboardData?.orderList);
    console.log('columns',ORDER_TABLE.Orders.columns);
  })
  return (
    <DashboardLayout>
      <Grid container direction="column">
        <Navbar
          message={navMessage.value}
          user={props.user || props.authstate.user}
          authstate={props.authstate}
        />
        <Box py={4}>
          <Box py={6} px={10} className={classes.homeContainer}>
            <Grid container direction="column" spacing={10}>
              <Grid
                container
                alignItems="center"
                xs={12}
                style={{ paddingTop: '10px' }}
              >
                <Grid className={classes.left}>
                  <Typography className={classes.welcomeMessage} variant="h1">
                    <Trans id="Customer Orders"></Trans>
                  </Typography>
                  {/* <Typography variant="subtitle1">{date.today()}</Typography> */}
                </Grid>
                <Grid className={classes.right}>
                  <SelectDropdown
                    value={duration.value}
                    // label={durationGraph.value}
                    onChange={(e) => {
                      duration.setValue(e.target.value), handleChangeCount(e);
                    }}
                    options={options}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Chicklets
                  showYesterdayCount={1}
                  cards={{
                    completedOrders: 744,
                    pendingOrders: 1730,
                    rejectedOrders: 2389,
                    totalOrders: 9204,
                    troubleTickets: 161
                  }}
                  breakPoint={true}
                  options={[]}
                />
              </Grid>

              <Grid item xs style={{ paddingBottom: '10rem' }}>
                <Grid container direction="row" spacing={6}>
                  <Grid item xs={12}>
                    <Grid container direction="column" spacing={6}>
                      <Grid item xs={12}>
                        <Paper elevation={0}>
                          <Box>
                            <TableSearch
                              SearchOptions={'OrderTracking'}
                              title={<Trans id="Partner Order Summary"></Trans>}
                              onSelectValues={onSelectValues}
                              searchBy={searchBy}
                              setSearchBy={setSearchBy}
                              onSearchTable={onSearchTable}
                              handleRefresh={handleRefresh}
                              FilterObj={FilterObj}
                              TableSearchBar={true}
                              handlFilter={handlFilterApply}
                              filter={'true'}
                              commonstatus={[
                                {
                                  name: <Trans id="created"></Trans>,
                                  code: 'created',
                                  checked: false
                                },
                                {
                                  name: <Trans id="completed"></Trans>,
                                  code: 'completed',
                                  checked: false
                                },
                                {
                                  name: <Trans id="terminated"></Trans>,
                                  code: 'Terminated',
                                  checked: false
                                }
                              ]}
                              Options={[
                                {
                                  name: 'Order Id',
                                  code: 'OrderId',
                                  Type: 'Partner'
                                },
                                {
                                  name: 'Partner Id',
                                  code: 'partnerId',
                                  Type: 'Partner'
                                },
                                {
                                  name: 'Customer Id',
                                  code: 'CustomerId',
                                  Type: 'Partner'
                                },
                                {
                                  name: 'Product Name',
                                  code: 'productName',
                                  Type: 'Partner'
                                },
                                {
                                  name: 'Product Id',
                                  code: 'ProductId',
                                  Type: 'Partner'
                                }
                              ]}
                              placeholder={
                                <Trans
                                  id="Order ID, Parter ID, Customer ID, Product
                                  Name, Product ID"
                                ></Trans>
                              }
                            />
                            <Table
                              page={page}
                              rowsPerPage={rowsPerPage}
                              handleChangePage={handleChangePage}
                              handleChangeRowsPerPage={handleChangeRowsPerPage}
                              role={props.user?.role?.roleName}
                              rows={maketable(props.dashboardData?.orderList)}
                              // // rows={Object.values(props.leadsState.tableRows)}
                              columns={ORDER_TABLE.Orders.columns}
                              // onRowAction={handleLeadAction}
                              onRowClick={handleTableRowClick}
                              breackpoint={true}
                              totalCount={
                                props.dashboardData?.tableCount?.orderCount
                              }
                              loader={loader}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Box py={}4> </Box> */}
            </Grid>

            {/* <Box py={}4> </Box> */}
          </Box>
        </Box>
      </Grid>
      <Box>
        <RootFooter />
      </Box>

      {props.modalState.OrderDetails && (
        <OrderDetails
          open={props.modalState.OrderDetails}
          partnerdetails={'Details.value'}
          modalcontext={props.modalState?.context}
          onClose={() => props.closeModal('OrderDetails')}
          OrderSelfcareComplete={props.OrderSelfcareComplete}
        />
      )}

      {props.modalState.leadView && (
        <LeadDetails
          open={props.modalState.leadView}
          context={props.modalState.leadViewData}
          // user={props.user}
          subOpportunity={props.modalState?.leadViewData}
          onAction={handleLeadAction}
          // Alertopen={props.Alertopen}
          // openModal={props.openModal}
          onClose={() => {
            props.closeModal('leadView');
            // props.loadLeads();
            // setLeadViewOpen(false);
          }}
        />
      )}
    </DashboardLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  snackBar: {
    color: 'gray',
    borderColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '16px'
  },
  welcomeMessage: {
    fontWeight: theme.typography.fontWeightBold,
    font: 'normal normal medium 20px/24px Roboto',
    letterSpacing: '0px',
    color: theme.palette.primary.black,
    opacity: 1
  },
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(16)})`,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  table: {
    backgroundColor: theme.palette.common.white,
    '& > thead': {
      backgroundColor: theme.palette.common.white
    }
  },
  icons: {
    cursor: 'pointer'
  },
  //for filter css
  root: {
    position: 'relative'
  },
  reports: {
    marginRight: '3rem',
    background: 'white',
    borderRadius: '0px',
    top: '2px',
    fontSize: '1.0rem'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(18),
    right: 0
  },
  paper: {
    // padding: 0,
    width: 340,
    minHeight: 200,
    maxHeight: 300
  },
  left: {
    paddingLeft: '16px'
  },
  right: {
    marginLeft: 'auto',
    paddingRight: '16px'
  },
  selectForm: {
    background: 'white'
  },

  selectRoot: {
    padding: ' 7px 30px',
    border: '1px solid rgba(0, 0, 0, 0.23)'
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data,
    alertState: state.alert,
    hierarchy: state.hierarchy,
    authstate: state.auth,
    dashboardData: state.dashboardData,
    contractState: state.contracts
  }),
  {
    openModal: ModalsStore.open,
    toggleSaveandExit: ModalsStore.toggleSaveandExit,
    closeModal: ModalsStore.close,
    dropLead: LeadController.drop,
    leadReopen: LeadController.reopen,
    loadLeads: LeadController.loadAll,
    approveLead: LeadController.approve,
    reassignLead: LeadController.reassign,
    rejectQuote: LeadController.rejectQuote,
    approveQuote: LeadController.approveQuote,
    downloadQuote: LeadController.downloadQuote,
    approveManualFeasibility: LeadController.approveManualFeasibility,
    ManualFeasibilityFailed: LeadController.ManualFeasibilityFailed,
    shareQuotation: LeadController.shareQuotation,
    createQuotation: LeadController.createQuotation,
    customerRejected: LeadController.customerRejected,
    customerAccepted: LeadController.customerAccepted,
    createOpportunity: LeadController.createOpportunity,
    leadClassification: LeadController.leadClassification,
    addproductsconfig: LeadController.addproductsconfig,
    startonboarding: LeadController.startonboarding,
    OnLeadSearch: LeadController.LeadSearch,
    shareAttachment: LeadController.shareAttachment,
    LeadTableFilter: LeadController.LeadTableFilter,
    DocumentCheck: LeadController.DocumentCheck,
    Contractcreation: LeadController.Contractcreation,
    existing: LeadController.existingCustomer,
    runLeadVerification: LeadController.runLeadVerification,
    Duplicatechecklead: LeadController.Duplicatechecklead,
    OnLeadStatusCount: LeadController.LeadStatusCount,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    ViewProfile: LeadController.ViewProfile,
    dropOpportunity: LeadController.dropOpportunity,
    ServiceUpdate: LeadController.ServiceUpdate,
    modifyPlan: LeadController.modifyPlan,
    loadHirarchy: HierarchyController.loadHirarchy,
    getPotentialPartners: DashboardController.getPotentialParnterList,
    getMytaskList: DashboardController.getMyTaskLIst,
    showPartnerDialog: DashboardController.showPartnerDialog,
    taskApprove: DashboardController.taskApprove,
    ContractList: DashboardController.ContractList,
    filterMyTask: DashboardController.filterMyTask,
    PartnerFilterByvalue: DashboardController.PartnerFilterByvalue,
    getPartneroverview: DashboardController.getPartneroverview,
    getTenantsList: DashboardController.getTenantsList,
    GetselfCareEnrolmentList: DashboardController.GetselfCareEnrolmentList,
    GetSelfCareResellerEnrollmentList: DashboardController.GetSelfCareResellerEnrollmentList,
    getproductLists: DashboardController.getproductLists,
    workflowTrigger: DashboardController.workflowTrigger,
    LaunchDCM: DashboardController.LaunchDCM,
    Onsearch_LogTicket: DashboardController.Onsearch_LogTicket,

    PartnerProducts_LogTicket: DashboardController.PartnerProducts_LogTicket,
    VerifyOtp: DashboardController.VerifyOtpDashboard,
    _LoadAllPartner_Reports: DashboardController.LoadAll_Partner_Reports,
    getPartnerCounts: DashboardController.getPartnerCounts,
    AllgetPartnerCounts: DashboardController.AllgetPartnerCounts,
    PartnerSalesSummarygraph: DashboardController.PartnerSalesSummarygraph,
    PartnerSalesSummarygraphFilter:
      DashboardController.PartnerSalesSummarygraphFilter,
    orderTracking: DashboardController.orderTracking,
    getAllorderCounts: DashboardController.getAllorderCounts,
    getOrderCounts: DashboardController.getOrderCounts,
    FilterByorderTracking: DashboardController.FilterByorderTracking
  }
)(OrderRequests);
