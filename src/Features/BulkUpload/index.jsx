import React from 'react'
import { connect } from 'react-redux'
import { useStateful } from 'react-hanger'

import { Trans } from '@lingui/react'
import GroupAssignmentController from 'Controllers/GroupAssignmentController'
import UploadCard from './UploadCard'
import { uploadCardData } from './Constant'
import MyNotes from './MyNotes'
import RequestTabletemplates from './RequestTabletemplates'

import {
  Paper,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core'
import HierarchyController from 'Controllers/Hierarchy'
import LeadController from 'Controllers/Lead'
import DashboardController from 'Controllers/Dashboard'

import { Navbar } from 'Components'

import TroubleTicketController from 'Controllers/TroubleTicket'

import ModalsStore from 'Store/Modals'
import AlertActions from 'Store/Alert'
import DashboardLayout from 'Layouts/Dashboard'
import RootFooter from 'Components/Footer/RootFooter'
import BulkRequestTemplate from './BulkRequestTemplate'

// import {getUploadHistory} "../../Http/api/documents"

// import Interactionhistory from '../../Components/Inractionhistory/Intractionhistory';


const BulkUpload = (props) => {
  const navMessage = useStateful('');
  const classes = useStyles();
  return (
    <DashboardLayout>
      <Navbar
        message={navMessage.value}
        user={props.authstate.user}
        authstate={props.authstate}
      />

      <Box className={classes.homeContainer}>
        <Box className={classes.left}>
          <Typography className={classes.welcomeMessage} variant="h2">
            <Trans id=" Recent Uploads"></Trans>
          </Typography>
        </Box>
        
        <Box className={classes.gridContainer}>
          {uploadCardData.map(data => (
            <UploadCard data={data} />
          ))}
        </Box>

        <Typography variant='h2' className={classes.title}>
          Templates
        </Typography>

        <Box className={classes.partners}>
          <Typography>
            Frequently downloaded:
          </Typography>
          
          <Paper elevation={0} className={classes.singleCard}>
            <Typography>Soft Suspension</Typography>
          </Paper>
          <Paper elevation={0} className={classes.singleCard}>
            <Typography>Revoke Suspension</Typography>
          </Paper>
          <Paper elevation={0} className={classes.singleCard}>
            <Typography>Terminate Plan</Typography>
          </Paper>
          <Paper elevation={0} className={classes.singleCard}>
            <Typography>Change Plan</Typography>
          </Paper>
        </Box>


        <Box className={classes.containerTwo}>
          <Box className={classes.containerThree}><BulkRequestTemplate /></Box>
          <Box className={classes.containerFour}><MyNotes /></Box>
        </Box>

        <Box className={classes.containerFive}>
          <RequestTabletemplates />
        </Box>
      </Box>
        
      <RootFooter />
    </DashboardLayout>
  )
}



const useStyles = makeStyles((theme) => ({

  container: {
    width: '100%',
    height: '100%'
  },

  singleCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'max-content',
    height: 2,
    background: '#FFFFFF',
    borderRadius: 4,
    opacity: 1,
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  left: {
    margin: '10px 0px'
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '20px 0px'
  },
  welcomeMessage: {
    fontWeight: theme.typography.fontWeightBold,
    font: 'normal normal medium 20px/24px Roboto',
    letterSpacing: '0px',
    color: theme.palette.primary.black,
    opacity: 1
  },
  homeContainer: {
    // maxHeight: `calc(100vh - ${theme.spacing(16)})`,
    width: '100%',
    maxHeight: `calc(100vh - 70px)`,
    padding: '30px',
    overflowY: 'scroll'
  },

  containerTwo: {
    display: 'flex',
    columnGap: '20px',
    margin: '20px 0px 40px 0px'
  },


  containerThree: {
    flexBasis: '65%'
  },

  containerFour: {
    flexBasis: '35%'
  },

  containerFive: {
    marginBottom: '50px'
  },

  partners: {
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center'
  }

}))

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
    Groups: state.Groups,
    TroubleTicket: state.TroubleTicket
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
    GetSelfCareResellerEnrollmentList:
      DashboardController.GetSelfCareResellerEnrollmentList,
    getproductLists: DashboardController.getproductLists,
    workflowTrigger: DashboardController.workflowTrigger,
    LaunchDCM: DashboardController.LaunchDCM,
    Onsearch_LogTicket: DashboardController.Onsearch_LogTicket,

    PartnerProducts_LogTicket: DashboardController.PartnerProducts_LogTicket,
    VerifyOtp: DashboardController.VerifyOtpDashboard,
    _LoadAllPartner_Reports: DashboardController.LoadAll_Partner_Reports,
    getPartnerCounts: DashboardController.getPartnerCounts,
    AllgetPartnerCounts: DashboardController.AllgetPartnerCounts,
    backOfficeDashboardCounts: DashboardController.backOfficeDashboardCounts,
    PartnerSalesSummarygraph: DashboardController.PartnerSalesSummarygraph,
    PartnerSalesSummarygraphFilter:
      DashboardController.PartnerSalesSummarygraphFilter,
    orderTracking: DashboardController.orderTracking,
    getAllorderCounts: DashboardController.getAllorderCounts,
    getOrderCounts: DashboardController.getOrderCounts,
    FilterByorderTracking: DashboardController.FilterByorderTracking,
    _LoadAllPartnerTickets: TroubleTicketController.LoadAll_PartnerTickets,
    LoadAll_StatusTickets: TroubleTicketController.LoadAll_StatusTickets,
    LoadAll_StatusCount: TroubleTicketController.LoadAll_StatusCount,
    LoadAll_GetStatusTickets: TroubleTicketController.LoadAll_GetStatusTickets,
    Load_filter_tickets: TroubleTicketController.Load_filter_tickets,
    TrobleTicketApporovel: TroubleTicketController.TrobleTicketApporovel,
    getGrouplist: GroupAssignmentController.getGrouplist,
    TrobleTicketAssignUser: TroubleTicketController.TrobleTicketAssignUser
  }
)(BulkUpload) 
