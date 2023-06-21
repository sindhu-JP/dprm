import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { useStateful } from 'react-hanger';
import SearchIcon from '@material-ui/icons/Search';

import { Paper, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import LeadController from 'Controllers/Lead';
import { Navbar } from 'Components';
import moment from 'moment';
import { Leads } from 'Http/api';

import ModalsStore from 'Store/Modals';
import { SUB_TABLE } from 'lib/constants';

import { useBoolean } from 'react-hanger';
import AlertActions from 'Store/Alert';

import STATUS from 'lib/constants/statuses';

// import Chickletrequests from './Chickletrequests';
import DashboardLayout from 'Layouts/Dashboard';

import TemporaryDrawer from 'Components/Leftsidebar';
import RequestTable from 'Components/Table/RequestTable';
import CustomerOverview from './CustomerOverview';

const RequestView = (props) => {
  const [leadInfo, setLeadInfo] = React.useState('');
  const [leadViewOpen, setLeadViewOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles();
  const leads = useStateful({});
  const navMessage = useStateful('');
  const duration = useStateful('oneday');
  const rerender = useStateful('erwer');
  const enableSearch = useBoolean(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // const toggleForm = () => setFormOpen(!formOpen);
  // const [leadClassification, setLeadClassification] = React.useState("");
  const [fromDate, handleDateChangeFrom] = React.useState(null);
  const [toDate, handleDateChangeTo] = React.useState(null);
  // const [statusFilter, setStatusFilter] = React.useState("")
  const [invisible, setInvisible] = React.useState(true);
  const [roles, setRoles] = React.useState('');

  // const selectedLobs = useStateful({});
  const Tablerows = useStateful([]);

  const updatatedLobs = useStateful({});

  const getDate = (dateString) => {
    const substr = dateString.substr(0, 10);
    return `${substr}T00:00:01.342Z`;
  };

  const setuser = useStateful({});
  // const onLeadClassiFication = async (data) => {

  //   const data= leads
  //   // const res = await Leads.updateLeadClassiFication(modalData.value.data.id, {
  //   //   // status: "LEAD_CLASSIFICATION",
  //   //   ...data,
  //   // });
  //   // props.alert({
  //   //   message: `Lead Classification changed successfully.`,
  //   //   type: "success",
  //   // });
  //   // loadLeads();
  //   // rerender.setValue(new Date().toISOString());
  //   // setLeadClassiFicationOpen(false);
  // };

  const handleTableRowClick = (event, row) => {
    //  if(row.subtabledata){
    props.openModal({
      id: 'CustomerOverview',
      context: {
        lead: row.data,
        user: props.user,
        subOpp: row.subtabledata
      }
    });
    // }
  };

  const checkQuoteValidity = async (list) => {
    let requests = [];
    let expiredLeads = [];

    for (let lead of list) {
      if (lead.quote) {
        let cdate = dayjs(new Date()).format('DD MMM YYYY');
        let vdate = dayjs(lead.quote.validity).format('DD MMM YYYY');

        if (cdate >= vdate && lead.status !== 'QUOTE_EXPIRED') {
          expiredLeads.push(lead.id);
        }
      }
    }

    if (expiredLeads.length > 0) {
      requests = expiredLeads.map((id) =>
        Leads.updateStatus(id, { status: 'QUOTE_EXPIRED' })
      );

      await Promise.all(requests).then((res) => props.loadLeads());
    }
  };

  //   React.useEffect(() => {
  //     if (leads.value && leads.value.data) {
  //       // checkQuoteValidity(leads.value.data);
  //     }
  //     props.existing();
  //   }, [leads.value]);

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleLeadAction = async (action, lead) => {
    const { openModal, downloadQuote } = props;

    let onboardingstatus = false;

    let temp = [];

    if (lead.subtabledata.serviceRequestType === 'CHANGE_PLAN') {
      temp.push(...STATUS?.stepperlabel?.Opportunity);
    }
    if (
      action?.actionblob === 'customerAcceptence' ||
      action?.actionblob === 'customerRejection'
    ) {
      for (var i = 0; i < lead.data.opportunities.length; i++) {
        if (lead.data.opportunities[i].status === 'ONBOARDING') {
          onboardingstatus = true;
          props.Alertopen({
            type: 'error',
            message:
              'Please wait while one of your opportunity is due for onboarding'
          });

          break;
        }
      }
    }

    if (action.modalId) {
      if (
        action.modalId === 'customerAcceptence' &&
        onboardingstatus === false
      ) {
        openModal({
          id: action.modalId,

          quoteUpdate: false,

          context: {
            opportuntiData: lead.subtabledata,
            lead: lead.data,
            quoteId: lead?.data.quoteRef?.id,
            user: props.user,
            duration: duration.value,
            NewOpp: false,
            modelID: action.label,
            Stepper: temp
          }
        });

        if (action.actionBlob) {
          props[action.actionBlob]({
            quoteId: lead?.subtabledata?.quoteRef?.id
          });
        }
      } else if (onboardingstatus === false) {
        openModal({
          id: action.modalId,

          quoteUpdate: false,

          context: {
            opportuntiData: lead.subtabledata,
            lead: lead.data,
            quoteId: lead?.data.quoteRef?.id,
            user: props.user,
            duration: duration.value,
            NewOpp: false,
            modelID: action.label,
            Stepper: temp
          }
        });

        if (action.actionBlob) {
          props[action.actionBlob]({
            quoteId: lead?.subtabledata?.quoteRef?.id
          });
        }
      }
    } else {
      if (action.actionType && typeof props[action.actionType] === 'function') {
        props[action.actionType]({
          opportuntiData: lead?.subtabledata,
          quoteUpdate: false,
          duration: duration.value,
          id: lead.data.id,
          duration: duration.value,
          quoteId: lead?.subtabledata?.quoteRef?.id,
          status: action.nextStatus,
          user: props.user,
          NewOpp: false,
          modelID: action.label,
          Stepper: temp
        });
      }
    }
  };

  const hydrateRows = (data) => {
    const industryTypes = {};
    let rows = [];
    Object.values(data).map((row) => {
      rows.push({
        data: row.data,
        subtabledata: row.sub,
        columns: {
          ...row.columns
          // industryType: industryTypes[row?.columns?.industryType],
        }
      });
    });
    //  Tablerows.setValue(rows)

    return rows;
  };

  const getdate = () => {
    var myDate = moment().toDate().getTime();
    let date = moment(myDate).format('MM ddd, YYYY hh:mm:ss a');

    return date;
  };

  // React.useEffect(()=>{

  //   if(STATUS.tabledata){
  //      let data=STATUS.tabledata.map(item=>{
  //        return Leadfactory.requestTable(item)

  //      })
  //      hydrateRows(data)

  //   }

  // },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.loadLeads({ user: props.user, count: event.target.value });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <DashboardLayout>
      <Grid container direction="column" style={{ backgroundColor: '#EDEDF5' }}>
        <Navbar message={navMessage.value} user={props.user} />
        <Box py={6} px={10} className={classes.homeContainer}>
          <Grid container direction="column" spacing={10}>
            <Grid
              container
              alignItems="center"
              xs={12}
              style={{ paddingTop: '10px' }}
            >
              <Grid className={classes.left}>
                <Typography variant="subtitle1">Requests</Typography>
              </Grid>
              <Grid className={classes.right}>
                <Typography
                  className={classes.welcomeMessage}
                  variant="subtitle1"
                >
                  {getdate()}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>{/* <Chickletrequests /> */}</Grid>

            <TemporaryDrawer />

            <Grid item xs={12}>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <Box>
                    <Grid container direction="column" spacing={4}>
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
                              <Grid item>
                                <Box pl={2} py={4}>
                                  <Typography variant="subtitle1">
                                    Recent Requests
                                  </Typography>
                                </Box>
                              </Grid>
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
                                    <SearchIcon
                                      fontSize={'large'}
                                      onClick={enableSearch.toggle}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <RequestTable
                      page={page}
                      rowsPerPage={rowsPerPage}
                      handleChangePage={handleChangePage}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      role={props.user?.role?.roleName}
                      // rows={leads.value?.table?.rows || []}
                      // rows={Tablerows.value}
                      // rows={Object.values(props.leadsState.tableRows)}
                      rows={hydrateRows(props.leadsState.serviceTable)}
                      columns={SUB_TABLE.PotentialCustomers.columns}
                      onRowAction={handleLeadAction}
                      onRowClick={handleTableRowClick}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {props.modalState.CustomerOverview && (
          <CustomerOverview
            open={true}
            lead={props.modalState?.context?.lead}
            existingOpp={props.modalState?.context?.subOpp}
            onClose={() => props.closeModal('CustomerOverview')}
          />
        )}
      </Grid>
    </DashboardLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  welcomeMessage: {
    fontWeight: theme.typography.fontWeightBold,
    font: 'normal normal medium 20px/24px Roboto',
    letterSpacing: '0px',
    color: '#57606F',
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
  root: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(18),
    right: 0
  },
  paper: {
    width: 340,
    height: 350
  },
  left: {
    paddingLeft: '16px'
  },
  right: {
    marginLeft: 'auto',
    paddingRight: '16px'
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data,
    alertState: state.alert
  }),
  {
    openModal: ModalsStore.open,
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
    // Duplicatechecklead: LeadController.Duplicatechecklead,
    OnLeadStatusCount: LeadController.LeadStatusCount,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    ViewProfile: LeadController.ViewProfile,
    dropOpportunity: LeadController.dropOpportunity
  }
)(RequestView);
