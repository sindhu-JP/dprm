import React from 'react';
import _ from 'lodash';
import { Trans } from '@lingui/react';
import { connect } from 'react-redux';
import { useStateful } from 'react-hanger';

// import PartnerDrawer from '../../Components/Table/PartnerDrawer';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import HierarchyController from 'Controllers/Hierarchy';
import LeadController from 'Controllers/Lead';
import DashboardController from 'Controllers/Dashboard';

// import MyTaskTable from '../../Components/Table/MyTaskTable';
import { Navbar } from 'Components';

// import OpportunityCreation from "Features/OpportunityCreation";
// import ProductConfiguration from "Components/ProductConfiguration";

import ModalsStore from 'Store/Modals';

import { useBoolean } from 'react-hanger';

import AlertActions from 'Store/Alert';

import { useHistory } from 'react-router';

import Dashboard from 'Store/Dashboard';

// import PartnerTabs from './Tabs.';

import DashboardLayout from 'Layouts/Dashboard';

import Header from './Header';
import TabsGroup from './TabsGroup';
import RootFooter from 'Components/Footer/RootFooter';
import Users from './Users/index';
import TaskAssignment from './TaskAssignment';
import GroupAssignmentController from 'Controllers/GroupAssignmentController';
//  import Utils from 'Factory/Utils'

import Setunavailablem from 'Features/GroupAssignment/Users/Setunavailable';
import EditUser from './Users/EditUse';
import ActionModal from './TaskAssignment/ActionModal';
const GroupAssignment = (props) => {
  const [leadInfo, setLeadInfo] = React.useState('');
  const [leadViewOpen, setLeadViewOpen] = React.useState(false);
  const classes = useStyles();
  const leads = useStateful({});
  const navMessage = useStateful('');
  const duration = useStateful('All');
  const durationGraph = useStateful('All');
  const rerender = useStateful('erwer');
  const enableSearch = useBoolean(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const username = JSON.parse(localStorage.getItem('USER'));
  // const toggleForm = () => setFormOpen(!formOpen);
  // const [leadClassification, setLeadClassification] = React.useState("");

  const OnsearchTenantvalue = (e) => {
    if (e.target.value.length > 3) {
      // props.OnLeadSearch(e.target.value);

      dispatch(
        Dashboard.partnerSearch({
          id: 'Tenant',
          context: props.dashboardData.TenantSearchTable,
          value: e.target.value
        })
      );
    } else if (e.target.value.length === 0) {
      // props.getMytaskList();
    }

    //  }else if(e.target.value<=0) {
    //

    //  }
  };

  const closeTaskSearch = () => {
    taskSearchbar.setFalse();
    props.getMytaskList();
    TenantSearchbar.setFalse();
  };

  const closeTenantSearch = () => {
    props.getTenantsList();
    TenantSearchbar.setFalse();
  };

  // potential partner
  const [page, setPage] = React.useState(0);
  const [Selfcarepage, setSelfcarepage] = React.useState(0);

  //  my list  const [rowsTaskPerPage, setTaskRowsPerPage] = React.useState(10);

  const [rowsTenantPerPage, setTenantRowsPerPage] = React.useState(10);
  const [myListPage, setMyListPage] = React.useState(0);
  const [rowsPerListPage, setRowsPerListPage] = React.useState(10);

  const partnerFilter = useBoolean(false);

  const onSelectValues = useStateful({});
  const FilterObj = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const dropdowngroups = useStateful('');
  const [tabsName, setTabsName] = React.useState('Tasks');
  const Unavailablerow = useStateful({});
  // my task page list hanlding

  const [selectValue, setselectValue] = React.useState('');
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const handleChangeRowsPerListPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerListPage(+event.target.value);
    setMyListPage(0);
  };
  // potential partner page list hanlding

  const handleTenantChangePage = (event, newPage) => {
    setTenantPage(newPage);
  };
  const handleTenantChangeRowsPerPage = (event) => {
    setTenantRowsPerPage(+event.target.value);
    setTenantPage(0);
  };

  const handleSelfCareChangePage = (event, newPage) => {
    setSelfcarePage(newPage);
  };

  const handleSelfCareChangeRowsPerPage = (event) => {
    setSelfcareRowsPerPage(+event.target.value);
    setSelfcarePage(0);
  };

  const handleTaskChangePage = (event, newPage) => {
    setTaskPage(newPage);
  };
  const handleTaskChangeRowsPerPage = (event) => {
    setTaskRowsPerPage(+event.target.value);
    setTaskPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSelfcarePage = (event, newPage) => {
    setSelfcarepage(newPage);
  };
  const handleChangeSelfcateRowsPerPage = (event) => {
    setselfcarerowsPerPage(+event.target.value);
    setSelfcarepage(0);
  };

  const loadHirarchydata = async () => {
    if (props?.user) {
      props.loadHirarchy({ name: props?.user?.sub });
    }
  };

  React.useEffect(() => {
    if (!_.isEmpty(localStorage.getItem('loginUser'))) {
      const data = JSON.parse(localStorage.getItem('loginUser'));
      props.getGrouplist({ id: data?.id });
    }
  }, []);

  const handleChangeTabs = (name) => {
    setTabsName(name);
  };
  const handleSelect = (value) => {
    dropdowngroups.setValue(value.target?.name);
    props.getuserGrouplist({ id: value?.target.code });
  };

  const handleChange = (e) => {
    setselectValue(e.target.value);
    // props.getuserGrouplist({ id: e?.target.value });
  };

  React.useEffect(() => {
    if (props.Groups.getGroups.length > 0) {
      setselectValue(props.Groups.getGroups[0]?.code);
    }
  }, [props.Groups.getGroups]);

  return (
    <DashboardLayout>
      <Grid container direction="column">
        <Navbar
          message={navMessage.value}
          user={props.user || props.authstate.user}
          authstate={props.authstate}
        />
        <Box py={4}>
          <Box className={classes.homeContainer}>
            <Grid container direction="column">
              <Grid
                container
                alignItems="center"
                xs={12}
                style={{ paddingTop: '10px' }}
              >
                <Grid className={classes.left}>
                  <Typography className={classes.welcomeMessage} variant="h1">
                    <Trans id="Group 360"></Trans>
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Box py={2} px={6}>
                  <Header
                    list={props.Groups.getGroups || []}
                    handleChange={handleChange}
                    defaultValue={props.Groups.getGroups[0]}
                    value={selectValue}
                  />
                </Box>
              </Grid>

              <Grid item>
                <TabsGroup
                  handleChangeTabs={handleChangeTabs}
                  tabsName={tabsName}
                />
              </Grid>
            </Grid>
            <Box py={4} px={6}>
              <Grid container>
                <Grid item xs={12}>
                  {tabsName === 'Users' && (
                    <Users
                      getuserGrouplist={props.getuserGrouplist}
                      defaultValue={props.Groups.getGroups[0]}
                      value={selectValue}
                      userGroupsRow={props.Groups.userGroupsRow}
                      onSearchuserGroupsRow={props.Groups.onSearchuserGroupsRow}
                      UserSetUnAvailable={props.UserSetUnAvailable}
                      UserSetAvailable={props.UserSetAvailable}
                      Unavailablerow={Unavailablerow}
                      usersLoading={props.Groups.loading}
                    />
                  )}
                  {tabsName === 'Tasks' && (
                    <TaskAssignment
                      gettaskassignWorkflow={props.gettaskassignWorkflow}
                      defaultValue={props.Groups.getGroups[0]}
                      value={selectValue}
                      taskAssignWorkflowlist={
                        props.Groups.taskAssignWorkflowlist
                      }
                      onSearchtaskAssignWorkflowlist={
                        props.Groups.onSearchtaskAssignWorkflowlist
                      }
                      gettaskassignWorkflowhistory={
                        props.gettaskassignWorkflowhistory
                      }
                      workflowHistory={props.Groups.WorkFlowHistory}
                      workFlowLoader={props.Groups.workflowHistoryLoader}
                    />
                  )}
                </Grid>
              </Grid>

              {props.modalState.Setunavailable && (
                <Setunavailablem
                  open={props.modalState.Setunavailable}
                  Unavailablerow={Unavailablerow.value}
                  UserSetUnAvailable={props.UserSetUnAvailable}
                  onClose={() => props.closeModal('Setunavailable')}
                />
              )}

              {props.modalState.EditUser && (
                <EditUser
                  open={props.modalState.EditUser}
                  Unavailablerow={Unavailablerow.value}
                  UserSetAvailable={props.UserSetAvailable}
                  onClose={() => props.closeModal('EditUser')}
                  details={props.modalState?.context}
                  // Unavailablerow={Unavailablerow.value}
                  UserSetUnAvailable={props.UserSetUnAvailable}
                />
              )}

              {props.modalState.ActionModal && (
                <ActionModal
                  getuserGrouplist={props.getuserGrouplist}
                  open={props.modalState.ActionModal}
                  defaultValue={props.Groups.getGroups[0]}
                  value={selectValue}
                  Unavailablerow={Unavailablerow.value}
                  UserSetAvailable={props.UserSetAvailable}
                  onClose={() => props.closeModal('ActionModal')}
                  details={props.modalState?.context}
                  userGroupsRow={props.Groups.userGroupsRow}
                  context={props.modalState.context}
                  TaskAssingUser={props.TaskAssingUser}
                />
              )}
            </Box>
            <div>
              <RootFooter />
            </div>
          </Box>
        </Box>
      </Grid>
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
    contractState: state.contracts,
    Groups: state.Groups
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
    FilterByorderTracking: DashboardController.FilterByorderTracking,
    getGrouplist: GroupAssignmentController.getGrouplist,
    getuserGrouplist: GroupAssignmentController.getuserGrouplist,
    gettaskassignWorkflow: GroupAssignmentController.gettaskassignWorkflow,
    gettaskassignWorkflowhistory:
      GroupAssignmentController.gettaskassignWorkflowhistory,
    UserSetAvailable: GroupAssignmentController.UserSetAvailable,
    UserSetUnAvailable: GroupAssignmentController.UserSetUnAvailable,
    TaskAssingUser: GroupAssignmentController.TaskAssingUser
  }
)(GroupAssignment);
