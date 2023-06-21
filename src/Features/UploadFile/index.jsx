import React, {useEffect, useState} from  'react'

import { connect } from 'react-redux'
import { Typography, Paper, makeStyles, Box, LinearProgress, Button } from '@material-ui/core'
import { useStateful } from 'react-hanger'
import DashboardLayout from 'Layouts/Dashboard'
import RootFooter from 'Components/Footer/RootFooter'
import { Navbar } from 'Components'
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import Alert from 'Store/Alert';
// import { DataGrid } from '@material-ui/data-grid';
import HierarchyController from 'Controllers/Hierarchy'
import GroupAssignmentController from 'Controllers/GroupAssignmentController'
import LeadController from 'Controllers/Lead'
import DashboardController from 'Controllers/Dashboard'
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import { CSVReader } from 'react-csv';
import TroubleTicketController from 'Controllers/TroubleTicket'
import Papa from 'papaparse';
import "./index.css"
import Interactionhistory from '../../Components/Inractionhistory/Intractionhistory';
import bulkUploadAPI from 'Http/api/bulkupload';
import _isEmpty from 'lodash/isEmpty';
import ModalsStore from 'Store/Modals'
import AlertActions from 'Store/Alert'
import WorkFlowPayload from 'Factory/Worlflowpayload';
import { useSelector } from 'react-redux'
// import FileOne from "./documents/Donation-Partners.csv";
// import FileTwo from "./documents/Marketing-Partners.csv";
const userData = JSON.parse(localStorage.getItem('USER'));
const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
const UploadFile = (props) => {
  const masterdata = useSelector((state) => state.master.masterData?.workflowIds?.manualCommissionBulkUpload);
  const dispatch = useDispatch();
  console.log(masterdata, "mdddee")
  const navMessage = useStateful('');
  const [imageModal, setImageModal] = React.useState(false);
  const [title, setTitle] = useState("Upload files here")
  const [message, newMessage] = useState("")
  const [size, setsize] = useState("")
  const [preview, setPreview] = useState({})
  const [numPages, setNumPages] = React.useState(20);
  const [pageNumber, setPageNumber] = React.useState([]);
  const classes = useStyles()
 const [bulkList, setBulkList] = useState([])
 const [data, setData] = useState(null);
 const [colorLinear, setColorLinear] = useState("#ccc")
 const [review, setReview] = useState(null)
 const [comBulkUpload, setComBulkUpload] = useState({})
 const [showBtn, setShowBtn] = useState(null)
 const [successMsg, setSuccessMsg] = useState("")
 const history = useHistory();
 const [formData, setFormData] = useState({
  csv: '',
  
});

let bulkUpload = [
  
     {
     date: "12-03-2023",
        data: [
    {
     bulkType: "Donation Commission",
     time: "10:24PM",
     createdBy:"Lucky",
     status: "Pending"
     },
     {
     bulkType: "Donation Commission",
     time: "10:24PM",
     createdBy:"Lucky",
     status: "Pending"
     }
     ]
     },
     {
     date: "15-03-2023",
     data: [
     {
     bulkType: "Donation Commission",
     time: "10:24PM",
     createdBy:"Basavaraj",
     status: "Pending"
     },
     {
     bulkType: "Donation Commission",
     time: "10:24PM",
     createdBy:"Basavaraj",
     status: "Pending"
     },
     {
     bulkType: "Donation Commission",
     time: "10:24PM",
     createdBy:"Basavaraj",
     status: "Pending"
     },
     {
     bulkType: "Donation Commission",
     time: "10:24PM",
     createdBy:"Sarath",
     status: "Pending"
     }
     ]
     }
    ]



 function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
  let array = [];
  for (var i = 1; i <= numPages; i++) {
    array.push(i);
  }
  setPageNumber(array);
}

  const getHistory = async()=> {
    try {
     const {data} = await bulkUploadAPI.getBulkUpload()
     console.log(data, "awaitlll")
     setBulkList(data)
    }
    catch(error) {

      console.log(error)
    }
  }



  const handleChange = async(e)=> {
    console.log(e.target.files[0], "meshoto")
    const file = e.target.files[0]
    setTitle(e.target.files[0].name)
    newMessage("Review")
    
    setsize(e.target.files[0].size)
    setFormData({ ...formData, csv: e.target.files[0]});
  console.log("oghey", file)
  Papa.parse(file, {
    complete: (results) => {
      setData(results.data);
    },
  });

  }

  console.log(data, "babddd")

  const handleImageModal = () => {
    
    setImageModal(false);
  };
  const handlePreview = (dataX) => {
    setShowBtn(false)
   if(data) {
    setReview(dataX)
    setImageModal(true);
   }
   
    
  };
  let userRole = localStorage.getItem('role');
  const handleSubmitUpload = async()=> {

    let payload = {
      Values: {
        commissionBulkUploadId:comBulkUpload.id,
        ...WorkFlowPayload.returnWorkflowData(),
      commissionBulkUpload:   comBulkUpload,
      username: userData?.sub,
      accessToken: localStorage.getItem('ACCESS_TOKEN'),
      date: new Date().toISOString(),
      userId:  Loginuser?.id,
      subStatus: "draft",
      channel: "DPRM",
      dprmUser: false,
      workflowId: masterdata,
      acceptanceStatus: "Approve"
      },
      userId:  Loginuser?.id,
      username: userData?.sub,
      userRole,
      executionModeStatus: false,
      async: false,
      workflowId: masterdata,

    }
      
    const {data} = await bulkUploadAPI.SubmitBulkUpload(payload)
          console.log(data, "awaitlllxxxx")

          if(data) {
            history.push({ 
              pathname: '/digital-prm-web-ui/BulkSuccessPage',
              details: data
            });
          }
          else {
            dispatch(
              Alert.open({
                type: 'Success',
                message: "There was an error submiting please try again"
              })
            );
          }
        
  }

  const handleOk = () => {
    if(message === "Review") {
      newMessage("Start Upload")
    }
 
    setImageModal(false);
  };

  const handleValidate = async()=> {
    setReview("view")
    try {

      if(message === "Review") {
        const file = new FormData();
        file.append('file', formData.csv);
        file.append('bulkType', "MarketingPartner");
          const {data} = await bulkUploadAPI.validateBulkUpload(file)
          console.log(data, "awaitlllxxxx")
          setImageModal(true);
          setShowBtn(true)
          //  setPreview(data[0])
         
        //   let columns = []
        //   Object.keys(data[0]?.file).forEach((item)=> {
    
    
        //     columns.push(
        //       { field: item, headerName: item, width: 150, editable: true}
        //     )
        //   })
         
        // console.log(columns)
       
      }
      if(message === "Start Upload") {
        const file = new FormData();
        file.append('file', formData.csv);
        file.append('bulkType', "MarketingPartner");
        file.append('username', userData?.sub);
        file.append('userId', Loginuser?.id);
        file.append('skipLine', "2");
    
        const {data} = await bulkUploadAPI.BulkUpload(file)
        console.log(data, "awaitlllxxxx")
        setComBulkUpload(data)
        setSuccessMsg("Successful!!!")
        setColorLinear("green")
       
      }
     
     }
     catch(error) {
 
       console.log(error)
     }
  }
  useEffect(()=> {
    getHistory()
  }, [])
  return (
    <>
    <DashboardLayout>
      <Navbar
        message={navMessage.value}
        user={props.authstate.user}
        authstate={props.authstate}
      />

      <Box className={classes.homeContainer}>

        <Box className={classes.containerTwo}>
          <Box className={classes.containerThree}>
            <Paper elevation={0} style={{height: '350px'}}>
              <Typography>Bulk Operation</Typography> 

              <Paper elevation={1} className={classes.uploadContainer}>
                <Typography>Bulk Upload</Typography>

                <Box className={classes.dottedBorderComp}>
                  <Typography style={{fontSize: "12px"}}>{title}</Typography>

                  <Box className={classes.containerEight}>

                  <Button component="label" onClick={()=> handlePreview("view")}>
                    <VisibilityIcon />
                  </Button>
                   
                    <Button component="label">
                    <EditIcon />
                         <input hidden accept="*" multiple type="file" onChange={handleChange}/>
                      </Button>
                     
                    <DeleteIcon />
                  </Box>
                </Box>
              </Paper>
            </Paper>

           {message && <Paper elevation={0} style={{marginTop: '20px'}}>
              <div style={{display: "flex", justifyContent: "space-between"}}> 
              <Box className={classes.containerSeven}>
                <Typography variant='body1'>{title}</Typography>
                <Typography variant='h2'>{size} Bytes</Typography>
              </Box>

              <Box>
                <Typography>{successMsg}</Typography>
              </Box>
              </div>
             

              <Box className={classes.containerFive}>
                <Box className={classes.containerSix}>
                  <LinearProgress
                    variant="determinate" 
                    value={0} 
                    className={classes.linearProgress}
                    style={{backgroundColor: `${colorLinear}`}}
                  />
                </Box>

                <Button variant='contained' color='primary' disabled={colorLinear === "green" ? true: false }  onClick={handleValidate}>{message}</Button>
              </Box>
            </Paper>}
          </Box>

          <Box className={classes.containerFour}>
            <Paper elevation={0}>
              {/* <Typography>Upload History</Typography> */}
              <Interactionhistory bulkList={bulkList}/>
            </Paper>
          </Box>

        </Box>

      <Box style={{backgroundColor: "#fff", width: "1690px", marginTop: "140px", marginLeft: "-30px", padding: "15px", display: "flex", justifyContent: "flex-end"}}>
        <Button  variant='contained' style={{color: "green"}} color='primary' disabled={colorLinear === "green" ? false: true } onClick={handleSubmitUpload}>Proceed</Button>
      </Box>

      </Box>
      
      <RootFooter />
    </DashboardLayout>
     <Modal
     title="Document Preview"
     centered
     visible={imageModal}
     // style={{ zIndex: 2000 }}
     footer={null}
     // width={800}
     onCancel={handleImageModal}
     
   >
    <>
    {
      review === "view" ?  <>
      {
        preview && (
          <table>
            <thead>
              <tr>{data[0].map((header) => <th>{header}</th>)}</tr>
            </thead>
            <tbody>
              {data.slice(1).map((row) => (
                <tr>{row.map((cell) => <td>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        )
       }
      </> :  <>
     {!(_isEmpty(preview)) && (
        <table>
          <thead>
            <tr>{Object.keys(preview?.file).map((header) => <th>{header}</th>)}</tr>
          </thead>
          <tbody>
          <tr>{Object.values(preview?.file).map((header) => <td>{header}</td>)}</tr>
            {/* {Object.values(preview?.file).map((header) => (
              <tr><td>{header}</td></tr>
            ))} */}
          </tbody>
        </table>
      )}
     </>
    }
   
    


    </>
 <div style={{display:"flex", justifyContent: "flex-end"}}>
 {showBtn &&<Button variant="contained"  color='primary' onClick={handleOk}>{ "Proceed"}</Button>}
 </div>
    
   </Modal>
   </>
  )
}

const useStyles = makeStyles((theme) => ({

  container: {
    width: '100%',
    height: '100%'
  },

  homeContainer: {
    // maxHeight: `calc(100vh - ${theme.spacing(16)})`,
    width: '100%',
    maxHeight: `calc(100vh - 70px)`,
    padding: '30px',
    overflowY: 'scroll'
  },

  linearProgress: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc'

    // "& .${LinearProgress.linearProgressClasses.bar}": {
    //   borderRadius: 5,
    //   backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    // }
  },

  containerTwo: {
    display: 'flex',
    columnGap: '20px',
    margin: '20px 0px 40px 0px'
  },

  uploadContainer: {
    width: '200px',
    height: '200px',
    margin: '10px auto',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '10px'
  },

  dottedBorderComp: {
    height: '100px',
    width: '180px',
    border: '2px #ccc solid',
    borderRadius: '8px',
    borderStyle: 'dotted',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '20px',
    justifyContent: 'center'
  },

  containerThree: {
    flexBasis: '70%'
  },

  containerFour: {
    flexBasis: '30%'
  },

  containerFive: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px'
  },

  containerSix: {
    flexBasis: '80%',
  },

  containerSeven: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px'
  },

  containerEight: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
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
)(UploadFile) 
