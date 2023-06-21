import React, { useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useStateful } from 'react-hanger';
import SearchIcon from '@material-ui/icons/Search';
import filterSvg from 'Assets/Icons/filterSvg.svg';
import filterSvgLite from 'Assets/Icons/filterSvgLite.svg';
import noDataFound from 'Assets/Icons/noDataFound.svg';
import ReOpenAccount from '../../Components/Modals/ReOpenAccount';
import UtilsDate from 'lib/utils/date';
import PartnerDrawer from '../../Components/Table/PartnerDrawer';
import FormsCreation from 'Features/ManageHierarchy/FormsCreation';
import ContractApi from 'Features/360/Services/ContractApi';
import workflowPayload from 'Factory/Worlflowpayload';
// import PartnerTable from 'Factory/PartnerTables';
// import ContractApi from 'Features/360/Services/ContractApi';
import './index.css';
// import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import {
  Snackbar,
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  InputAdornment,
  TextField,
  Chip,
  Badge,
  ClickAwayListener,
  IconButton,
  InputBase,
  withStyles,
  Tooltip
} from '@material-ui/core';
import HierarchyController from 'Controllers/Hierarchy';
import LeadController from 'Controllers/Lead';
import DashboardController from 'Controllers/Dashboard';
import MasterDataController from 'Controllers/Masterdata';

import { Navbar } from 'Components';
import Table from 'Components/Table/RenderTable';
import LeadDetails from 'Features/LeadDetails';
import { TecnotreedigitalSales } from 'Http/axios';
// import OpportunityCreation from "Features/OpportunityCreation";
// import ProductConfiguration from "Components/ProductConfiguration";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import { Leads } from 'Http/api';
import { datepicker as date } from 'Utils';
import StringUtils from 'lib/utils/strings';
import ModalsStore from 'Store/Modals';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';
import { Modal } from 'lib/components';
import { useBoolean } from 'react-hanger';

import FilterTable from 'Components/FilterTable';
// import ReportsIcon from 'Assets/Icons/reports.svg';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import refreshIconLite from 'Assets/Icons/RefreshIconLitee.svg';
//import RefreshIcon from '@material-ui/icons/Refresh';

// import ProfileCard from 'Features/LeadStatusGraph/ProfileCard';
import AlertActions from 'Store/Alert';
import { Alert } from 'Components';

import ApprovalBottomSheet from 'Components/Table/ApprovalBottomSheet';
import { useHistory } from 'react-router';
import Approval from 'Components/Modals/Approval';
import MytaskDetails from 'Features/TaskDetails/MytaskDetails';

import Dashboard from 'Store/Dashboard';
import ProductDetails from 'Components/ProductDetails';
import DcmSpecification from 'Features/Dcm';
import MaximizeTicket from 'Features/TroubleTicket/LogTicket/MaximizeLogTicker';
import TicketModal from 'Features/TroubleTicket/Components/TicketModal';
import MinimizeLogTicket from 'Features/TroubleTicket/LogTicket/MinimizeLogTicket';
import OtpVerification from 'Components/Modals/OtpVerification';
import Utils from 'Factory/Utils';
import PartnerTabs from './Tabs.';
import Chicklets from 'Components/Chicklets';
import FrequentlyUsedLinks from './FrequentlyUsedLinks';
import dashboard from '../../Http/api/dashboard';
import Amchartsgraph from 'Components/Charts/Amchartsgraph';
import SvgFile from 'lib/components/SvgFile';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SelectDropdown from 'Components/Select';
import ReportsFilter from 'Components/ReportsFilter';
import moment from 'moment';
import TableSearch from 'Components/TableSearch';
import RootFooter from 'Components/Footer/RootFooter';

import PartnerAgentInfo from 'Features/Home/PartnerAndAgentInfo';
import { Trans } from '@lingui/react';
import MyNotes from './MyNotes';
import AddContractModal from './AddContractModal';
import ContractSignOff from 'Features/Contracts/ContractSignOff';
import PartnerTables from 'Factory/PartnerTables';
import { message } from 'antd';
import AgentShareContract from 'Components/Modals/AgentShareContract';
import ContractSuccessModal from 'Components/ContractSuccessModal';
import { Skeleton } from '@material-ui/lab';
import _range from 'lodash/range';
// import MyTaskTable from '../../Components/Table/MyTaskTable';
//  import Utils from 'Factory/Utils'
const Home = (props) => {
  console.log('props from home', props);
  const masterdata = useSelector(
    (state) => state?.master?.masterData?.workflowIds?.resellerShareContract
  );

  const masterdataCategry = useSelector(
    (state) => state?.master?.masterData?.agentCategory
  );
  localStorage.setItem('masterdataAgentCat', JSON.stringify(masterdataCategry));
  console.log(masterdata, 'master data ionic', masterdataCategry);

  console.log(masterdata, 'master data ionic', props);
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
  const [loaderr, setLoaderr] = React.useState(true);
  // const toggleForm = () => setFormOpen(!formOpen);
  // const [leadClassification, setLeadClassification] = React.useState("");
  const [fromDate, handleDateChangeFrom] = React.useState(null);
  const [toDate, handleDateChangeTo] = React.useState(null);
  // const [statusFilter, setStatusFilter] = React.useState("")
  const [fullscreen, setFullscreen] = React.useState(false);
  const [invisible, setInvisible] = React.useState(true);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const [invisiblePartner, setinvisiblePartner] = React.useState(true);
  const [roles, setRoles] = React.useState('');
  const [rowData, setRowData] = React.useState();
  const [approvalDialogOpen, setAprrovalDialogOpen] = React.useState(false);
  // const selectedLobs = useStateful({});
  const updatatedLobs = useStateful({});
  const buttonLoader = useBoolean(false);
  const filtermenu = useBoolean(false);
  const dispatch = useDispatch();
  const [contractObj, setContractObj] = useState({});
  const [logTicketMinMode, setMinMode] = React.useState(false);
  const taskSearchbar = useBoolean(false);
  const LogTicketFulldetails = useStateful({});
  const LogTicket_ProductObj = useStateful({});
  const TenantSearchbar = useBoolean(false);
  const ChickletCount = useStateful({});
  const [selectedAgent, setSelectedAgent] = useState();
  const SearchText = useStateful({});
  const SearchQuery = useStateful({});
  const [loader, setLoader] = useState(false);
  

  const handleClose = () => {
    // setAddCntr_open(false);
    dispatch(Modal.close('createContract'));
    dispatch(Modal.close('agentPreview'));
  };

  const ToggleButtonValue = useStateful('top');
  const onClose = () => {
    setAprrovalDialogOpen(false);
  };
  const graphCountdetails = useStateful([]);
  const [alignment, setAlignment] = React.useState('Top');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleClickAway = () => {
    showFilter.setFalse();
    // filtermenu.setFalse()
    //  partnerFilter.setFalse()
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const onHandleFilterChange = (value, name) => {
    if (value.target) {
      updatatedLobs.setValue({
        ...updatatedLobs.value,
        [name]: value.target.value
      });
    } else {
      updatatedLobs.setValue({
        ...updatatedLobs.value,
        [name]: value
      });
    }
  };

  const unselectLob = async (lob) => {
    let temp = { ...updatatedLobs.value };
    delete temp[lob];
    // reloadProducts(temp);
    updatatedLobs.setValue(temp);
    // selectedLobs.setValue(temp);
    if (!_.isEmpty(temp)) {
      handleFilter(temp);
    } else {
      // props.getMytaskList();
    }

    //  props.getMytaskList();
  };
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
  const unselectLobParnter = async (lob) => {
    let temp = { ...updatatedLobs.value };
    delete temp[lob];
    // reloadProducts(temp);
    updatatedLobs.setValue(temp);

    // selectedLobs.setValue(temp);

    if (!_.isEmpty(temp)) {
      handlepartnerFilter(temp);
    }

    //  props.getMytaskList();
  };

  const getDate = (dateString) => {
    const substr = dateString.substr(0, 10);
    return `${substr}T00:00:01.342Z`;
  };

  //  const handlepartnerfilter=()=>{
  //     partnerFilter.se
  //  }

  const handlepartnerFilter = (data) => {
    if (data?.fromDate && data?.toDate) {
      updatatedLobs.setValue(data);

      props.PartnerFilterByvalue({
        fromDate: data?.fromDate?.toISOString(),
        toDate: data?.toDate?.toISOString(),
        status: data?.statusFilter
      });
      handleClickAway();

      partnerFilter.setFalse();
      setinvisiblePartner(false);
    }
  };

  const handleFilter = (data) => {
    updatatedLobs.setValue(data);

    props.filterMyTask({
      fromDate: data?.fromDate?.toISOString(),
      toDate: data?.toDate?.toISOString(),
      status: data?.statusFilter
    });
    handleClickAway();

    filtermenu.setFalse();
    setInvisible(false);
  };

  const handlepartnerRefresh = () => {
    handleDateChangeFrom(null);
    handleDateChangeTo(null);
    handleClickAway();
    setinvisiblePartner(true);
    updatatedLobs.setValue({});
    partnerFilter.setFalse();
    props.getPotentialPartners({ limit: 10, offset: 0 });
  };
  const handleRefresh = () => {
    handleDateChangeFrom(null);
    handleDateChangeTo(null);
    handleClickAway();
    setInvisible(true);
    updatatedLobs.setValue({});

    filtermenu.setFalse();
    FilterObj.setValue({});
    props.getMytaskList({ limit: 10, offset: 0 });
  };
  const handleRefreshSelfcareTable = () => {
    handleDateChangeFrom(null);
    handleDateChangeTo(null);
    handleClickAway();
    setInvisible(true);
    updatatedLobs.setValue({});

    filtermenu.setFalse();
    FilterObj.setValue({});
    props.GetselfCareEnrolmentList({ limit: 10, offset: 0, setLoaderr });
  };
  const handleRefreshSelfcareResellerTable = () => {
    handleDateChangeFrom(null);
    handleDateChangeTo(null);
    handleClickAway();
    setInvisible(true);
    // updatatedLobs.setValue({});

    filtermenu.setFalse();
    FilterObj.setValue({});

    props.GetSelfCareResellerEnrollmentList({
      limit: 10,
      offset: 0,
      setLoaderr
    });
  };

  const handleGraphRefresh = () => {
    props.PartnerSalesSummarygraph({ type: ToggleButtonValue.value });
  };
  const setuser = useStateful({});

  const handleTableRowClick = (event, row) => {
    console.log(row, "rowssss")
    //  if(row.subtabledata){
    props.openModal({
      id: 'leadView',
      context: {
        sections: row.sections,
        partnerDetails: row.partnerDetails,
        partners: row.partners,
        columns: row.columns,
        type: row.formType
      }
    });
    // }
  };

  const handleDealerClick = async(event, row) => {
    if(row?.partners?.profileStatus === "PENDING") {
      return
    }

    else {
      console.log(row, "check1212")
      const data = await dashboard.getOneDealer(row?.partners)
      console.log(data[0]?.ResellerProfileCreation, "dealer datat", row)
      // const {data} = await DashboardController.get
      //  if(row.subtabledata){
      props.openModal({
        id: 'leadView',
        context: {
          sections: data[0]?.ResellerProfileCreation?.sections,
          partnerDetails: data[0]?.ResellerProfileCreation,
          partners: row.partners,
          columns: row.columns,
          type: row.formType
        }
      });
    }

   
    // }
  };

  const handleBottomsheet = (row) => {
    setRowData(row);
    setAprrovalDialogOpen(true);
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

  React.useEffect(() => {
    if (leads.value && leads.value.data) {
      // checkQuoteValidity(leads.value.data);
    }
    props.existing();
  }, [leads.value]);

  ////////////////////////////////////////////////////////////////////////////////////////////
  const handleTaskRowClick = (action, partner) => {
    props.openModal({
      id: 'TaskDetails',
      context: {
        taskdetails: partner
      }
    });
  };
  const handleTaskAction = async (action, partner) => {
    props.openModal({
      id: action.modalId,
      context: {
        data: partner.mytasks,

        row: partner.tasks,
        actions: action
      }
    });
  };

  const handleLeadAction = async (action, partner) => {
    console.log(partner?.partnerDetails, action, props,partner,  'vvvvuihh');
    if (action.modalId) {
      setSelectedAgent(partner?.partnerDetails);
      if (action.modalId === 'ContractSignoff') {
        dispatch(
          ModalsStore.open({
            id: 'ContractSignpreview',
            context: partner?.partnerDetails
          })
        );
      } else if (action.modalId === 'manageHierarchy') {
        history.push({
          pathname: '/digital-prm-web-ui/hierarchy',
          state: {
            partnerId: partner?.columns?.id?.startsWith("AG") ? partner?.partners?.id : partner?.columns?.id,
           
          }
        });
      } else {
        dispatch(
          ModalsStore.open({
            id: action.modalId,
            context: partner?.partnerDetails
          })
        );
      }
    }
  };

  const handleReOpenAccount = () => {};
  const handleSelfcareAction = async (action, row) => {
    history.push({
      pathname: '/digital-prm-web-ui/forms',
      state: {
        selfcarePartnerObj: row?.partners,
        formIdentity: 'Partner_Profile',
        stepId: 'PartnerProfileCreation'
      }
    });
  };

  const handleSelfcareResellerAction = async (action, row) => {
    console.log(row, 'rrrroooooooooowwwwwwwwwww');
    history.push({
      pathname: '/digital-prm-web-ui/resellerForms',
      state: {
        selfcarePartnerObj: row?.partners,
        formIdentity: 'Reseller_Onboard',
        stepId: 'ResellerProfileCreation'
      }
    });
  };

  const hydratetaskrows = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        mytasks: row.mytasks,
        tasks: row.tasks,

        columns: {
          ...row.columns,
          Initiator: props.user?.sub
        }
      });
    });

    return rows;
  };

  const hydraProductrows = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        products: row.products,
        // tasks: row.tasks,

        columns: {
          ...row.columns
          // Initiator: props.user?.sub
        }
      });
    });

    return rows;
  };
  const hydrateRows = (data) => {
    let rows = [];
    Object.values(data)
      .filter((row) => row?.columns?.startDate)
      .map((row) => {
        rows.push({
          partnerDetails: row.partnerDetails,
          sections: row.sections,
          partners: row.partners,
          formType: row.formType,
          columns: { ...row.columns }
        });
      });
    console.log(data, 'hydrateData');
    return rows.sort(
      (a, b) =>
        Date.parse(b?.columns?.startDate) - Date.parse(a?.columns?.startDate)
    );
    // if (data) {
    //   Object.values(data)
    //     // .filter((row) => row?.columns?.startDate)
    //     .map((row) => {
    //       rows.push({
    //         partnerDetails: row.partnerDetails,
    //         sections: row.sections,
    //         partners: row.partners,
    //         formType: row.formType,
    //         columns: { ...row.columns }
    //       });
    //     });

    //   console.log(rows, 'test');
    //   return rows;
    // }
  };

  const getdate = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12) greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';
    return greet;
  };

  const OnsearchPartnervalue = (e) => {
    if (e.target.value.length > 3) {
      // props.OnLeadSearch(e.target.value);

      dispatch(
        Dashboard.partnerSearch({
          id: 'partner',
          context: props.dashboardData.partnerSearchTable,
          value: e.target.value
        })
      );
    } else if (e.target.value.length === 0) {
      // props.getMytaskList();
    }
  };
  const Onsearchvalue = (e) => {
    if (e.target.value.length > 3) {
      // props.OnLeadSearch(e.target.value);

      dispatch(
        Dashboard.partnerSearch({
          id: 'Mytask',
          context: props.dashboardData.mytaskTablesearchrow,
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

  React.useEffect(() => {
    props.existing();
    // getCount();
    props.AllgetPartnerCounts();
    props.getmasterdata();
    props.storeAllNotes();
  }, []);

  // React.useEffect(() => {
  //   props.getPotentialPartners({ limit: 10, offset: 0 });
  //   props.getResellerPartners({ limit: 10, offset: 0, setLoader });

  // }, [props.alertState]);

  const getCount = async () => {
    let res = await dashboard._getCounts();
    ChickletCount.setValue(res);
  };

  React.useEffect(() => {
    const payload = {
      JsonName: 'doclist',
      customer: {
        level: 'Customer',
        requestType: 'Registration',
        customerType: 'Organization'
      }
    };
    props.DocumentCheck({ payload });

    if (props.user) {
      setuser.setValue(props.user);
    }
  }, [props.user]);

  const closeSearch = () => {
    enableSearch.toggle();

    props.getPotentialPartners({ limit: 10, offset: 0 });
  };

  const closeTaskSearch = () => {
    taskSearchbar.setFalse();
    props.getMytaskList({ limit: 10, offset: 0 });
    TenantSearchbar.setFalse();
  };

  const closeTenantSearch = () => {
    props.getTenantsList();
    TenantSearchbar.setFalse();
  };

  React.useEffect(() => {
    // props.getTenantsList({limit:10, offset:0});
    props.authstate.salesUser &&
      props.GetSelfCareResellerEnrollmentList({
        limit: 10,
        offset: 0,
        setLoaderr
      });
    // props.GetselfCareEnrolmentList({ limit: 10, offset: 0, setLoaderr });
    // props.getPotentialPartners({ limit: 10, offset: 0 });
    // props.getTenantsList({limit:10, offset:0});

    // props.authstate.salesUser && props.GetselfCareEnrolmentList({ setLoaderr });
  }, []);
  React.useEffect(() => {
    // props.getTenantsList({limit:10, offset:0});

    // // props.GetselfCareEnrolmentList();
    // props.authstate.salesUser &&
    //   props.GetSelfCareResellerEnrollmentList({
    //     limit: 10,
    //     offset: 0,
    //     setLoaderr
    //   });
    props.GetselfCareEnrolmentList({ limit: 10, offset: 0, setLoaderr });
    props.getPotentialPartners({ limit: 10, offset: 0 });
    // props.getTenantsList({limit:10, offset:0});

    // props.authstate.salesUser &&
    //   props.GetSelfCareResellerEnrollmentList({ setLoaderr });
  }, []);
  console.log(props.dashboardData, 'damnxxx');
  // potential partner
  const [page, setPage] = React.useState(0);
  const [Taskpage, setTaskPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selfcarerowsPerPage, setselfcarerowsPerPage] = React.useState(10);
  const [selfcareResellerRowsPerPage, setSelfcareResellerRowsPerPage] =
    React.useState(10);
  const [rowsTaskPerPage, setTaskRowsPerPage] = React.useState(10);
  const [Tenantpage, setTenantPage] = React.useState(0);
  const [SelfcarePage, setSelfcarePage] = React.useState(0);
  const [selfcareResellerPage, setSelfcareResellerPage] = React.useState(0);
  const [rowsTenantPerPage, setTenantRowsPerPage] = React.useState(10);
  const [myListPage, setMyListPage] = React.useState(0);
  const [rowsPerListPage, setRowsPerListPage] = React.useState(10);

  const partnerFilter = useBoolean(false);
  const FilterObj = useStateful({});
  const showFilter = useBoolean(false);

  const onSelectValues = useStateful({});
  // const FilterObj=useStateful({})
  const [searchBy, setSearchBy] = React.useState('');
  // my task page list hanlding
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
    console.log(FilterObj.value, 'FilterObj.valueFilterObj.value');
    // setSelfcarePage(newPage);
    console.log(props.dashboardData.SelfcareTable, 'see thiss');
    setSelfcarePage(newPage);
    // if (_.isEmpty(FilterObj.value)) {
    props.GetselfCareEnrolmentList({
      limit: selfcarerowsPerPage,
      offset: newPage,
      searchValue: SearchText.value,
      SearchQuery: SearchQuery.value,
      setLoaderr
    });
    // } else {
    //   FilterApply(null, newPage);
    // }
  };
  const handleSelfCareResellerChangePage = (event, newPage) => {
    // setSelfcareResellerPage(newPage);
    setSelfcareResellerPage(newPage);
    props.GetSelfCareResellerEnrollmentList({
      limit: selfcareResellerRowsPerPage,
      offset: newPage,
      searchValue: SearchText.value,
      SearchQuery: SearchQuery.value
    });
  };

  const handleSelfCareChangeRowsPerPage = (event, newPage) => {
    setselfcarerowsPerPage(+event.target.value);

    // setSelfcarePage(0);
    if (selfcarerowsPerPage !== event.target.value) {
      props.GetselfCareEnrolmentList({
        limit: event.target.value,
        offset: 0,
        searchValue: SearchText.value,
        SearchQuery: SearchQuery.value,
        setLoaderr
      });
    } else {
      FilterApply(null, newPage);
    }
  };
  const handleSelfCareResellerChangeRowsPerPage = (event, newPage) => {
    setSelfcareResellerRowsPerPage(+event.target.value);
    // setSelfcareResellerPage(0);
    if (selfcareResellerRowsPerPage !== event.target.value) {
      props.GetSelfCareResellerEnrollmentList({
        limit: event.target.value,
        offset: 0,
        searchValue: SearchText.value,
        SearchQuery: SearchQuery.value
      });
    } else {
      FilterApply(null, newPage);
    }
  };

  const handleTaskChangePage = (event, newPage) => {
    setTaskPage(newPage);
    if (
      FilterObj.value?.fromDate ||
      FilterObj.value?.toDate ||
      FilterObj.value?.status
    ) {
      props.filterMyTask({
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
        status: FilterObj.value?.status,
        limit: rowsTaskPerPage,
        offset: newPage * rowsTaskPerPage
      });
    } else {
      props.getMytaskList({
        limit: rowsTaskPerPage,
        offset: newPage * rowsTaskPerPage
      });
    }
  };

  const handleTaskChangeRowsPerPage = (event) => {
    if (
      FilterObj.value?.fromDate ||
      FilterObj.value?.toDate ||
      FilterObj.value?.status
    ) {
      props.filterMyTask({
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
        status: FilterObj.value?.status,
        limit: event.target.value,
        offset: Taskpage * event.target.value
      });
    } else {
      props.getMytaskList({
        limit: event.target.value,
        offset: Taskpage * event.target.value
      });
    }

    setTaskRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const loadHirarchydata = async () => {
    if (props?.user) {
      props.loadHirarchy({ name: props?.user?.sub });
    }
  };

  const clearFilters = () => {
    props.getMytaskList({ limit: 10, offset: 0 });
  };
  React.useEffect(() => {
    // loadHirarchydata()
    // props.ContractList();
    // props.getproductLists({ id: '' });
    // graph()
    props.PartnerSalesSummarygraph({ type: ToggleButtonValue.value });
    // props.PartnerSalesSummarygraphFilter({type:ToggleButtonValue.value, payload:{ dateRange: UtilsDate.getDateCalculation(3)}});
  }, []);

  const getContractDetails = async (id) => {
    return await ContractApi._getContractObj(id)
      .then((res) => {
        setContractObj(res[0]);
        return res[0];
      })
      .catch((err) => null);
  };
  const contractList = (data) => {
    console.log(data, 'objectDataaa');
    let contObj = PartnerTables.makeaddContractFor(data);
    contObj = {
      ...contObj,
      agentObj: selectedAgent,
      rowlist: {
        Agent_Id: selectedAgent?.id,
        Agent_Name: selectedAgent?.firstName,
        // MOBILE_NUMBER: selectedAgent?.account[0]?.mobileNumber,
        EMAIL_ID: selectedAgent?.email,
        Dynamic_Contract_Pdf:
          contractObj?.AddContractFor?.ContractInformation?.Dynamic_Contract_Pdf
      }
    };
    return contObj;
  };

  const onCountactions = (e, data, value) => {
    props.getPartneroverview({
      url: `Partner_Profile/${_.get(data.partners, '_id', '')}/${_.get(
        data,
        'columns.id',
        ''
      )}`
    });
    props.closeModal('leadView');
  };
  const handleProductAction = (action, data) => {
    props.openModal({
      id: 'ProductDetails',
      context: {
        row: data
      }
    });
  };

  const handleRowProduct = (action, data) => {
    if (data) {
      props.openModal({
        id: 'DcmSpecification',
        context: {
          row: data
        }
      });
    }
  };

  const LogTicket_OnsearchValue = (e) => {
    if (e.target.value.length >= 3) {
      props.Onsearch_LogTicket({ value: e.target.value });
    }
  };

  const LogTicket_handleSelect = (value) => {
    if (value.target?.code) {
      LogTicketFulldetails.setValue({
        ...LogTicketFulldetails.value,
        partnerList: value?.target
      });
      props.PartnerProducts_LogTicket({ id: value.target?.code });
    }
  };

  const LogTicket_SelectedProduct = (value) => {
    LogTicketFulldetails.setValue({
      ...LogTicketFulldetails.value,
      productList: value?.target
    });
    LogTicket_ProductObj.setValue(value.target);
  };

  const onDocumentChange = (e) => {
    let temp = [];
    LogTicketFulldetails.setValue({
      ...LogTicketFulldetails.value,

      Attachments: [
        ...LogTicketFulldetails.value?.Attachments,
        e.target.file[0]
      ]
    });
  };

  const handleChangeCount = (e) => {
    if (e.target.value === 'All') {
      return props.AllgetPartnerCounts();
    } else {
      const payload = {
        linkedFormId: 'APILISTPAGEQ1KCP6177',

        dateRange: UtilsDate.getDateCalculation(e.target.value)
      };

      return props.getPartnerCounts({ payload });
    }
  };

  const graph = async () => {
    let res = await dashboard._partnerGraph();
    graphCountdetails.setValue(
      _.map(res, (item) => {
        return {
          value: parseInt(item.count),
          network: item.productName
        };
      })
    );
    // graphCountdetails.setValue(_.map(res, (item))=>{
    //    return {
    //      : parseInt(  res.count),
    //      network:res.productName

    //    }
    // }))
  };
  const handleToggleChange = (e, value) => {
    ToggleButtonValue.setValue(value);

    props.PartnerSalesSummarygraph({ type: value });
  };
  const handlegraphFilter = (e) => {
    if (e.target.value === 'All') {
      props.PartnerSalesSummarygraph({ type: ToggleButtonValue.value });
    } else {
      props.PartnerSalesSummarygraphFilter({
        type: ToggleButtonValue.value,
        payload: { dateRange: UtilsDate.getDateCalculation(e.target.value) }
      });
    }
  };

  const dateFormat = () => {
    if (FilterObj.value?.fromDate || FilterObj.value?.toDate) {
      if (FilterObj.value?.fromDate && FilterObj.value?.toDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const handlFilterApply = () => {
    if (!_.isEmpty(FilterObj.value)) {
      if (dateFormat()) {
        showFilter.setFalse();

        let payload = {
          startDate: FilterObj.value?.fromDate
            ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
            : '',
          endDate: FilterObj.value?.toDate
            ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
            : ''
        };

        props.PartnerSalesSummarygraphFilter({
          type: ToggleButtonValue.value,
          payload: { dateRange: payload }
        });
        FilterObj.setValue({});
      }
    }
  };

  const onsearch = (value) => {
    dispatch(
      Dashboard.partnerSearch({
        id: 'Mytask',
        context: props.dashboardData.mytaskTablesearchrow,
        value: value
      })
    );
  };

  const FilterApply = () => {
    if (Utils.dateFormat(FilterObj.value)) {
      props.filterMyTask({
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
        status: FilterObj.value?.status,
        limit: rowsTaskPerPage,
        offset: Taskpage
      });
      handleClickAway();

      // FilterObj.setValue({});
      setInvisible(false);
    }
  };
  const [refresh, setRefresh] = useState({});
  const handleShareContract = async (data) => {
    console.log(data, 'mutumina');
    buttonLoader.setTrue();
    const dataObj = {
      referenceId: data?.AgentDetails?.Agent_ID,
      contractId: '',
      formType: data?.agentObj?.category + data?.agentObj?.subCategory,
      emailId: data?.rowlist?.EMAIL_ID
    };

    let Ebody = {
      workflowId: masterdata,
      userId: '',
      userRole: '',
      executionModeStatus: false,
      async: false,
      Values: {
        CONTRACT_ID:
          data?.ContactInformation?.AddContractFor?.ContractInformation
            ?.CONTRACT_ID,

        Agent_ID: data?.AgentDetails?.Agent_ID,
        contractPrimaryId: data?.addContract?._id,
        accessToken: localStorage.getItem('ACCESS_TOKEN'),
        ...workflowPayload.returnWorkflowData()
      }
    };
    TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
      .then((resp) => {
        props.closeModal('ShareContract');
        buttonLoader.setFalse();
        message.success('Contract Shared Successfully', 1);
      })
      .catch((err) => {
        buttonLoader.setFalse();
        message.error('Failed to share contract', 1);
      });

    await ContractApi._shareContract(dataObj)
      .then((res) => {})
      .catch((err) => {
        buttonLoader.setFalse();
        message.error('Failed to share contract', 1);
      });
    setRefresh({});
  };
  const downloadPDF = async (data) => {
    console.log('download pdf here', data);
    return await ContractApi._documentPreview(data.id);
  };
  console.log(props, props.dashboardData, 'PropssssdashboardData');

  const reloadTableData = () => {
    props?.getResellerPartners({ limit: 10, offset: 0 });
  };

  return (
    <>
      <Grid container direction="column">
        <Navbar
          message={navMessage.value}
          user={props.user}
          authstate={props.authstate}
        />
        <Box py={4}>
          <Box py={6} px={10} className={classes.homeContainer}>
            <Grid container direction="column" spacing={10}>
              {!(props?.user?.sub === 'dprmSalesUser') && (
                <Grid
                  container
                  alignItems="center"
                  xs={12}
                  style={{ paddingTop: '10px' }}
                >
                  <Grid className={classes.left}>
                    <Typography className={classes.welcomeMessage} variant="h4">
                      {`${getdate()} ${StringUtils.capitalizeFirst(
                        props?.user?.sub
                      )}`}
                    </Typography>
                    <Typography variant="subtitle1">{date.today()}</Typography>
                  </Grid>
                  <Grid className={classes.grow}>
                    <div />
                  </Grid>
                  <Grid>
                    <SelectDropdown
                      value={duration.value}
                      // label={durationGraph.value}
                      onChange={(e) => {
                        duration.setValue(e.target.value), handleChangeCount(e);
                      }}
                      options={options}
                    />
                  </Grid>
                  {Utils.Opcochanges() && (
                    <Grid>
                      <Button
                        variant="outlined"
                        startIcon={<SaveAltIcon />}
                        className={classes.reports}
                        onClick={() =>
                          history.push('/digital-prm-web-ui/Reports')
                        }
                      >
                        <Trans id="Reports">Reports</Trans>
                      </Button>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* <Box py={}4> </Box> */}
              {!(props?.user?.sub === 'dprmSalesUser') && (
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
                    options={[
                      {
                        title: (
                          <Trans id="Active Partners">Active Partners</Trans>
                        ),
                        value:
                          props.dashboardData?.ChickletCount?.activePartners ||
                          0,
                        day: '607',
                        icon: 'Active-Partners'
                      },
                      {
                        title: <Trans id="Pending Partners"></Trans>,
                        value:
                          props.dashboardData?.ChickletCount?.pendingPartners ||
                          0,
                        day: '607',
                        icon: 'Pending-Partner'
                      },
                      {
                        title: <Trans id="Suspended Partners"></Trans>,
                        value:
                          props.dashboardData?.ChickletCount
                            ?.suspendedPartners || 0,
                        day: '607',
                        icon: 'Suspended-Partner'
                      },
                      {
                        title: <Trans id="Retired Partners"></Trans>,
                        value:
                          props.dashboardData?.ChickletCount?.retiredPartners ||
                          0,
                        day: '607',
                        icon: 'new-retired-white'
                      },
                      {
                        title: <Trans id="Total Count"></Trans>,
                        value:
                          props.dashboardData?.ChickletCount?.totalPartners ||
                          0,
                        day: '607',
                        icon: 'Total-Partner'
                      }
                    ]}
                  />
                </Grid>
              )}

              {
                <>
                  {!(props?.user?.sub === 'dprmSalesUser') && (
                    <Grid item xs>
                      <Grid container direction="row" spacing={6}>
                        <Grid item xs={8}>
                          <Grid container direction="column" spacing={6}>
                            <Grid item xs={12}>
                              <FrequentlyUsedLinks />
                            </Grid>

                            <Grid item xs={12}>
                              <Paper elevation={0}>
                                <Box>
                                  <Grid
                                    container
                                    direction="column"
                                    spacing={4}
                                    className={classes.cardStyles}
                                  >
                                    <Grid item xs>
                                      <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justify="space-between"
                                      >
                                        <Grid item>
                                          <Grid container alignItems="center">
                                            <Grid item>
                                              {ThemeType === 'dark' ? (
                                                <SvgFile
                                                  iconName="Partner-Sales-lite"
                                                  iconWidth={30}
                                                />
                                              ) : (
                                                <SvgFile
                                                  iconName="Partner-Sales"
                                                  iconWidth={30}
                                                />
                                              )}
                                            </Grid>
                                            <Grid
                                              item
                                              className={classes.spacings}
                                            >
                                              <Box pl={2} py={4}>
                                                <Typography variant="h2">
                                                  <Trans id="Partner Sales Summary"></Trans>
                                                </Typography>
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        <Grid item className={classes.right}>
                                          <ToggleButtonGroup
                                            variant="contained"
                                            value={ToggleButtonValue.value}
                                            exclusive
                                            // size="small"
                                            onChange={handleToggleChange}
                                          >
                                            <ToggleButton
                                              variant="contained"
                                              value="top"
                                              className={classes.toggleBtn}
                                            >
                                              <Trans id="Top 5"> </Trans>
                                            </ToggleButton>
                                            <ToggleButton
                                              value="bottom"
                                              className={classes.toggleBtnTwo}
                                            >
                                              <Trans id="Bottom 5"></Trans>
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        </Grid>
                                        <Grid item>
                                          <Grid item>
                                            <Grid
                                              container
                                              direction="row"
                                              alignItems="center"
                                              justify="space-between"
                                              spacing={4}
                                            >
                                              <ClickAwayListener
                                                onClickAway={handleClickAway}
                                              >
                                                <Grid
                                                  container
                                                  className={classes.root}
                                                  alignItems="baseline"
                                                  spacing={1}
                                                >
                                                  <Grid item>
                                                    <Tooltip
                                                      title="Filter"
                                                      placeholder="bottom"
                                                    >
                                                      <IconButton>
                                                        {ThemeType ===
                                                        'dark' ? (
                                                          <img
                                                            src={filterSvgLite}
                                                            onClick={() =>
                                                              showFilter.toggle()
                                                            }
                                                          />
                                                        ) : (
                                                          <img
                                                            src={filterSvg}
                                                            onClick={() =>
                                                              showFilter.toggle()
                                                            }
                                                          />
                                                        )}
                                                      </IconButton>
                                                    </Tooltip>
                                                  </Grid>

                                                  {showFilter.value && (
                                                    <Grid
                                                      item
                                                      className={
                                                        classes.dropdown
                                                      }
                                                    >
                                                      <Paper
                                                        className={
                                                          classes.paper
                                                        }
                                                      >
                                                        <ReportsFilter
                                                          handlFilterApply={
                                                            handlFilterApply
                                                          }
                                                          FilterObj={FilterObj}
                                                          showFilter={
                                                            showFilter
                                                          }
                                                        />
                                                      </Paper>{' '}
                                                    </Grid>
                                                  )}
                                                </Grid>
                                              </ClickAwayListener>
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
                                              <Tooltip
                                                title="Refresh"
                                                placeholder="bottom"
                                              >
                                                <IconButton
                                                  onClick={handleGraphRefresh}
                                                >
                                                  {ThemeType === 'dark' ? (
                                                    <img
                                                      src={refreshIconLite}
                                                    />
                                                  ) : (
                                                    <img src={refreshIcon} />
                                                  )}
                                                </IconButton>
                                              </Tooltip>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid item>
                                      {props.dashboardData.loading
                                        .summaryGraphLoading ? (
                                        <>
                                        <Grid container>
          
                                                <Grid item xs={12}>
                                              
                                                {_range(5).map((card) => (
                                              
                                                <Typography variant="body1" key={card}>
                                              
                                                <Skeleton height="80px" />
                                              
                                                </Typography>
                                              
                                                ))}
                                              
                                                </Grid>
                                              
                                                </Grid>
                                        </>
                                      ) : (
                                        <>
                                          {props.dashboardData.SalesSummaryGraph
                                            .length > 0 ? (
                                            <Amchartsgraph
                                              ThemeType={
                                                props.Appearance.ThemeType
                                              }
                                              data={
                                                props.dashboardData
                                                  .SalesSummaryGraph
                                              }
                                            />
                                          ) : (
                                            <Grid
                                              container
                                              justifyContent="center"
                                              alignItems="center"
                                              direction="column"
                                              style={{
                                                marginTop: 50,
                                                marginBottom: 50
                                              }}
                                            >
                                              <Grid item>
                                                <img src={noDataFound} />
                                              </Grid>
                                              <Grid item>
                                                <Trans id="No Information Available"></Trans>
                                              </Grid>
                                            </Grid>
                                          )}
                                        </>
                                      )}
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container direction="column" spacing={5}>
                            <Grid item style={{ width: '100%' }}>
                              <MyNotes />
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                direction="column"
                                spacing={4}
                                style={{ height: '102%' }}
                              >
                                <Grid item style={{ height: '100%' }}>
                                  {/* <PotentialLead
                              runLeadVerification={props.runLeadVerification}
                              Duplicatechecklead={props.Duplicatechecklead}
                              loading={props.leadsState.loading.PreFillData}
                              user={props.user}
                              opco={props.dashboardData.Opco}
                            /> */}

                                  <PartnerAgentInfo
                                    runLeadVerification={
                                      props.runLeadVerification
                                    }
                                    Duplicatechecklead={
                                      props.Duplicatechecklead
                                    }
                                    loading={
                                      props.leadsState.loading.PreFillData
                                    }
                                    user={props.user}
                                    opco={props.dashboardData.Opco}
                                    validateAgent={props.validateAgent}
                                    agentValidateError={
                                      props.dashboardData.errors
                                        .agentValidateError
                                    }
                                    masterDataLoad={props.masterDataLoad}
                                    masterdata={props.masterdata}
                                    createAgentId={props.createAgentId}
                                    agentId={
                                      props.dashboardData.agentGenerateID
                                    }
                                    Masterdata={props.Masterdata}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </>
              }
              <Grid item>
                <Grid container direction="row" spacing={6}>
                  {props.authstate.dcmUser ? (
                    <>
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
                                      {taskSearchbar.value ? (
                                        <Grid item>
                                          <TextField
                                            style={{ width: '400px' }}
                                            id="standard-basic"
                                            onChange={Onsearchvalue}
                                            fullWidth
                                            placeholder="Search by PARTNER NAME "
                                            InputProps={{
                                              disableunderline: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <SearchIcon
                                                    fontSize="large"
                                                    className={
                                                      classes.iconSearch
                                                    }
                                                  />
                                                </InputAdornment>
                                              )
                                            }}
                                          />
                                        </Grid>
                                      ) : (
                                        <>
                                          <Grid item>
                                            <Box pl={2} py={4}>
                                              <Typography variant="h4">
                                                <Trans id="Partner Products">
                                                  {' '}
                                                </Trans>
                                              </Typography>
                                            </Box>
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
                                            {taskSearchbar.value ? (
                                              <CloseOutlinedIcon
                                                fontSize={'small'}
                                                onClick={closeTaskSearch}
                                              />
                                            ) : (
                                              <SearchIcon
                                                fontSize={'large'}
                                                onClick={taskSearchbar.toggle}
                                              />
                                            )}
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              direction="row"
                                              alignItems="center"
                                              justify="space-between"
                                              spacing={4}
                                            >
                                              <ClickAwayListener
                                                onClickAway={handleClickAway}
                                              >
                                                <Grid
                                                  container
                                                  className={classes.root}
                                                  alignItems="baseline"
                                                  spacing={1}
                                                >
                                                  <Grid item>
                                                    <Tooltip
                                                      title="Filter"
                                                      placeholder="bottom"
                                                    >
                                                      <IconButton
                                                        onClick={
                                                          filtermenu.toggle
                                                        }
                                                      >
                                                        <Badge
                                                          variant="dot"
                                                          invisible={invisible}
                                                          color="error"
                                                        >
                                                          <img
                                                            src={filterSvg}
                                                          />
                                                        </Badge>
                                                      </IconButton>
                                                    </Tooltip>
                                                  </Grid>

                                                  {filtermenu.value ? (
                                                    <Grid
                                                      item
                                                      className={
                                                        classes.dropdown
                                                      }
                                                    >
                                                      <Paper
                                                        className={
                                                          classes.paper
                                                        }
                                                      >
                                                        <FilterTable
                                                          handleClear={
                                                            handleRefresh
                                                          }
                                                          handleFilter={() =>
                                                            handleFilter(
                                                              updatatedLobs.value
                                                            )
                                                          }
                                                          fromDate={
                                                            updatatedLobs.value
                                                              .fromDate
                                                          }
                                                          toDate={
                                                            updatatedLobs.value
                                                              .toDate
                                                          }
                                                          handleDateChangeTo={
                                                            handleDateChangeTo
                                                          }
                                                          handleDateChangeFrom={
                                                            handleDateChangeFrom
                                                          }
                                                          onHandleFilterChange={
                                                            onHandleFilterChange
                                                          }
                                                          statusField={true}
                                                          options={[
                                                            {
                                                              value: 'Approve',
                                                              label: 'Approve'
                                                            },
                                                            {
                                                              value: 'pending',
                                                              label: 'pending'
                                                            }
                                                          ]}
                                                        />
                                                      </Paper>{' '}
                                                    </Grid>
                                                  ) : null}
                                                </Grid>
                                              </ClickAwayListener>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item>
                              <Box pl={2} py={4}>
                                <Grid container direction="row" spacing={4}>
                                  {!invisible &&
                                    Object.keys(updatatedLobs.value).map(
                                      (key, index) => {
                                        let lob = updatatedLobs.value[key];

                                        if (
                                          key === 'leadClassification' ||
                                          key === 'statusFilter'
                                        ) {
                                          return (
                                            <Grid item>
                                              <Chip
                                                label={
                                                  key === 'statusFilter'
                                                    ? 'Status :' + lob
                                                    : 'LeadClassification : ' +
                                                      lob
                                                }
                                                color="primary"
                                                onDelete={() =>
                                                  unselectLob(key)
                                                }
                                              />
                                            </Grid>
                                          );
                                        }
                                      }
                                    )}

                                  {!invisible &&
                                    updatatedLobs.value.fromDate &&
                                    updatatedLobs.value.toDate && (
                                      <Grid item>
                                        <Chip
                                          label={
                                            'Date Range: ' +
                                            `${dayjs(
                                              updatatedLobs.value.fromDate
                                            ).format('D MMMM, YYYY')}` +
                                            '-' +
                                            `${dayjs(
                                              updatatedLobs.value.toDate
                                            ).format('D MMMM, YYYY')}`
                                          }
                                          color="primary"
                                          onDelete={() =>
                                            unselectLob('fromDate')
                                          }
                                        />
                                      </Grid>
                                    )}
                                </Grid>
                              </Box>
                            </Grid>

                            <Table
                              page={Taskpage}
                              rowsPerPage={rowsTaskPerPage}
                              handleChangePage={handleTaskChangePage}
                              handleChangeRowsPerPage={
                                handleTaskChangeRowsPerPage
                              }
                              role={props.user?.role?.roleName}
                              // rows={leads.value?.table?.rows || []}
                              // rows={props.dashboardData.myTasks}
                              rows={hydraProductrows(
                                props.dashboardData.productrowlist
                              )}
                              columns={
                                PARTNER_TABLE_CONFIG.productColumns.columns
                              }
                              onRowAction={handleProductAction}
                              onRowClick={handleRowProduct}
                              BreackRowPoint={true}
                              // handleBottomClick={handleBottomsheet}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    </>
                  ) : props.authstate.salesUser ? (
                    <>
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
                                      {taskSearchbar.value ? (
                                        <Grid item>
                                          <TextField
                                            style={{ width: '400px' }}
                                            id="standard-basic"
                                            onChange={Onsearchvalue}
                                            fullWidth
                                            placeholder="Search by PARTNER NAME "
                                            InputProps={{
                                              disableunderline: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <SearchIcon
                                                    fontSize="large"
                                                    className={
                                                      classes.iconSearch
                                                    }
                                                  />
                                                </InputAdornment>
                                              )
                                            }}
                                          />
                                        </Grid>
                                      ) : (
                                        <>
                                          <Grid item>
                                            <Box pl={2} py={4}>
                                              <Typography variant="h4">
                                                Self Care Partner
                                              </Typography>
                                            </Box>
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
                                            {taskSearchbar.value ? (
                                              <CloseOutlinedIcon
                                                fontSize={'small'}
                                                onClick={closeTaskSearch}
                                              />
                                            ) : (
                                              <SearchIcon
                                                fontSize={'large'}
                                                onClick={taskSearchbar.toggle}
                                              />
                                            )}
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              direction="row"
                                              alignItems="center"
                                              justify="space-between"
                                              spacing={4}
                                            >
                                              <ClickAwayListener
                                                onClickAway={handleClickAway}
                                              >
                                                <Grid
                                                  container
                                                  className={classes.root}
                                                  alignItems="baseline"
                                                  spacing={1}
                                                >
                                                  <Grid item>
                                                    <Tooltip
                                                      title="Filter"
                                                      placeholder="bottom"
                                                    >
                                                      <IconButton
                                                        onClick={
                                                          filtermenu.toggle
                                                        }
                                                      >
                                                        <Badge
                                                          variant="dot"
                                                          invisible={invisible}
                                                          color="error"
                                                        >
                                                          <img
                                                            src={filterSvg}
                                                          />
                                                        </Badge>
                                                      </IconButton>
                                                    </Tooltip>
                                                  </Grid>

                                                  {filtermenu.value ? (
                                                    <Grid
                                                      item
                                                      className={
                                                        classes.dropdown
                                                      }
                                                    >
                                                      <Paper
                                                        className={
                                                          classes.paper
                                                        }
                                                      >
                                                        <FilterTable
                                                          handleClear={
                                                            handleRefresh
                                                          }
                                                          handleFilter={() =>
                                                            handleFilter(
                                                              updatatedLobs.value
                                                            )
                                                          }
                                                          fromDate={
                                                            updatatedLobs.value
                                                              .fromDate
                                                          }
                                                          toDate={
                                                            updatatedLobs.value
                                                              .toDate
                                                          }
                                                          handleDateChangeTo={
                                                            handleDateChangeTo
                                                          }
                                                          handleDateChangeFrom={
                                                            handleDateChangeFrom
                                                          }
                                                          onHandleFilterChange={
                                                            onHandleFilterChange
                                                          }
                                                          statusField={true}
                                                          options={[
                                                            {
                                                              value: 'Approve',
                                                              label: 'Approve'
                                                            },
                                                            {
                                                              value: 'pending',
                                                              label: 'pending'
                                                            }
                                                          ]}
                                                        />
                                                      </Paper>{' '}
                                                    </Grid>
                                                  ) : null}
                                                </Grid>
                                              </ClickAwayListener>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            onClick={handleRefreshSelfcareTable}
                                          >
                                            <Tooltip
                                              title="Refresh"
                                              placeholder="bottom"
                                            >
                                              {/* <RefreshIcon /> */}
                                              <img src={refreshIcon} />
                                            </Tooltip>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item>
                              <Box pl={2} py={4}>
                                <Grid container direction="row" spacing={4}>
                                  {!invisible &&
                                    Object.keys(updatatedLobs.value).map(
                                      (key, index) => {
                                        let lob = updatatedLobs.value[key];

                                        if (
                                          key === 'leadClassification' ||
                                          key === 'statusFilter'
                                        ) {
                                          return (
                                            <Grid item>
                                              <Chip
                                                label={
                                                  key === 'statusFilter'
                                                    ? 'Status :' + lob
                                                    : 'LeadClassification : ' +
                                                      lob
                                                }
                                                color="primary"
                                                onDelete={() =>
                                                  unselectLob(key)
                                                }
                                              />
                                            </Grid>
                                          );
                                        }
                                      }
                                    )}

                                  {!invisible &&
                                    updatatedLobs.value.fromDate &&
                                    updatatedLobs.value.toDate && (
                                      <Grid item>
                                        <Chip
                                          label={
                                            'Date Range: ' +
                                            `${dayjs(
                                              updatatedLobs.value.fromDate
                                            ).format('D MMMM, YYYY')}` +
                                            '-' +
                                            `${dayjs(
                                              updatatedLobs.value.toDate
                                            ).format('D MMMM, YYYY')}`
                                          }
                                          color="primary"
                                          onDelete={() =>
                                            unselectLob('fromDate')
                                          }
                                        />
                                      </Grid>
                                    )}
                                </Grid>
                              </Box>
                            </Grid>
                            <Table
                              page={SelfcarePage}
                              rowsPerPage={selfcarerowsPerPage}
                              handleChangePage={handleSelfCareChangePage}
                              handleChangeRowsPerPage={
                                handleSelfCareChangeRowsPerPage
                              }
                              role={props.user?.role?.roleName}
                              // rows={leads.value?.table?.rows || []}
                              // rows={props.dashboardData['partners']}
                              rows={hydrateRows(
                                props.dashboardData.SelfcareTable || []
                              )}
                              columns={
                                PARTNER_TABLE_CONFIG.SelfcareCustomers.columns
                              }
                              totalCount={
                                props.dashboardData?.tableCount?.selfcareCount
                              }
                              onRowAction={handleSelfcareAction}
                              onRowClick={handleTableRowClick}
                              onCountactions={onCountactions}
                              BreackRowPoint={true}
                              // tableLoader={props.dashboardData.loading.partnerListLoading || props.masterdata.loading}
                              loader={loaderr}
                            />
                          </Box>
                        </Paper>
                      </Grid>
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
                                      {taskSearchbar.value ? (
                                        <Grid item>
                                          <TextField
                                            style={{ width: '400px' }}
                                            id="standard-basic"
                                            onChange={Onsearchvalue}
                                            fullWidth
                                            placeholder="Search by PARTNER NAME "
                                            InputProps={{
                                              disableunderline: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <SearchIcon
                                                    fontSize="large"
                                                    className={
                                                      classes.iconSearch
                                                    }
                                                  />
                                                </InputAdornment>
                                              )
                                            }}
                                          />
                                        </Grid>
                                      ) : (
                                        <>
                                          <Grid item>
                                            <Box pl={2} py={4}>
                                              <Typography variant="h4">
                                                Self Care Reseller
                                              </Typography>
                                            </Box>
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
                                            {taskSearchbar.value ? (
                                              <CloseOutlinedIcon
                                                fontSize={'small'}
                                                onClick={closeTaskSearch}
                                              />
                                            ) : (
                                              <SearchIcon
                                                fontSize={'large'}
                                                onClick={taskSearchbar.toggle}
                                              />
                                            )}
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              direction="row"
                                              alignItems="center"
                                              justify="space-between"
                                              spacing={4}
                                            >
                                              <ClickAwayListener
                                                onClickAway={handleClickAway}
                                              >
                                                <Grid
                                                  container
                                                  className={classes.root}
                                                  alignItems="baseline"
                                                  spacing={1}
                                                >
                                                  <Grid item>
                                                    <Tooltip
                                                      title="Filter"
                                                      placeholder="bottom"
                                                    >
                                                      <IconButton
                                                        onClick={
                                                          filtermenu.toggle
                                                        }
                                                      >
                                                        <Badge
                                                          variant="dot"
                                                          invisible={invisible}
                                                          color="error"
                                                        >
                                                          <img
                                                            src={filterSvg}
                                                          />
                                                        </Badge>
                                                      </IconButton>
                                                    </Tooltip>
                                                  </Grid>

                                                  {filtermenu.value ? (
                                                    <Grid
                                                      item
                                                      className={
                                                        classes.dropdown
                                                      }
                                                    >
                                                      <Paper
                                                        className={
                                                          classes.paper
                                                        }
                                                      >
                                                        <FilterTable
                                                          handleClear={
                                                            handleRefresh
                                                          }
                                                          handleFilter={() =>
                                                            handleFilter(
                                                              updatatedLobs.value
                                                            )
                                                          }
                                                          fromDate={
                                                            updatatedLobs.value
                                                              .fromDate
                                                          }
                                                          toDate={
                                                            updatatedLobs.value
                                                              .toDate
                                                          }
                                                          handleDateChangeTo={
                                                            handleDateChangeTo
                                                          }
                                                          handleDateChangeFrom={
                                                            handleDateChangeFrom
                                                          }
                                                          onHandleFilterChange={
                                                            onHandleFilterChange
                                                          }
                                                          statusField={true}
                                                          options={[
                                                            {
                                                              value: 'Approve',
                                                              label: 'Approve'
                                                            },
                                                            {
                                                              value: 'pending',
                                                              label: 'pending'
                                                            }
                                                          ]}
                                                        />
                                                      </Paper>{' '}
                                                    </Grid>
                                                  ) : null}
                                                </Grid>
                                              </ClickAwayListener>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            // onClick={
                                            //   handleRefreshSelfcareResellerTable
                                            // }
                                          >
                                            <Tooltip
                                              title="Refresh"
                                              placeholder="bottom"
                                            >
                                              {/* <RefreshIcon /> */}
                                              <img src={refreshIcon} />
                                            </Tooltip>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item>
                              <Box pl={2} py={4}>
                                <Grid container direction="row" spacing={4}>
                                  {!invisible &&
                                    Object.keys(updatatedLobs.value).map(
                                      (key, index) => {
                                        let lob = updatatedLobs.value[key];

                                        if (
                                          key === 'leadClassification' ||
                                          key === 'statusFilter'
                                        ) {
                                          return (
                                            <Grid item>
                                              <Chip
                                                label={
                                                  key === 'statusFilter'
                                                    ? 'Status :' + lob
                                                    : 'LeadClassification : ' +
                                                      lob
                                                }
                                                color="primary"
                                                onDelete={() =>
                                                  unselectLob(key)
                                                }
                                              />
                                            </Grid>
                                          );
                                        }
                                      }
                                    )}

                                  {!invisible &&
                                    updatatedLobs.value.fromDate &&
                                    updatatedLobs.value.toDate && (
                                      <Grid item>
                                        <Chip
                                          label={
                                            'Date Range: ' +
                                            `${dayjs(
                                              updatatedLobs.value.fromDate
                                            ).format('D MMMM, YYYY')}` +
                                            '-' +
                                            `${dayjs(
                                              updatatedLobs.value.toDate
                                            ).format('D MMMM, YYYY')}`
                                          }
                                          color="primary"
                                          onDelete={() =>
                                            unselectLob('fromDate')
                                          }
                                        />
                                      </Grid>
                                    )}
                                </Grid>
                              </Box>
                            </Grid>
                            <Table
                              page={selfcareResellerPage}
                              rowsPerPage={selfcareResellerRowsPerPage}
                              handleChangePage={
                                handleSelfCareResellerChangePage
                              }
                              handleChangeRowsPerPage={
                                handleSelfCareResellerChangeRowsPerPage
                              }
                              role={props.user?.role?.roleName}
                              // rows={leads.value?.table?.rows || []}
                              // rows={props.dashboardData['partners']}
                              rows={hydrateRows(
                                props.dashboardData.SelfcareResellerTable
                              )}
                              columns={
                                PARTNER_TABLE_CONFIG.SelfcareResellerCustomers
                                  .columns
                              }
                              totalCount={
                                props.dashboardData?.tableCount?.resellerCount
                              }
                              BreackRowPoint={true}
                              onRowAction={handleSelfcareResellerAction}
                              onRowClick={handleTableRowClick}
                              onCountactions={onCountactions}
                              // tableLoader={props.dashboardData.loading.partnerListLoading || props.masterdata.loading}
                              loader={loader}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    </>
                  ) : (
                    <>
                      {/* <Grid item xs={12}>
                  <Grid container direction="column" spacing={4}></Grid>
                </Grid> */}
                      <Grid item xs={12}>
                        <Paper elevation={0} className={classes.overLap}>
                          <PartnerTabs
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
                            getPotentialDealer={props.getPotentialDealer}
                          />
                        </Paper>
                      </Grid>
                      {Utils.Opcochanges() ? (
                        ''
                      ) : (
                        <Grid item xs={12}>
                          <Paper elevation={0}>
                            <Box>
                              <TableSearch
                                SearchOptions={'mytasksOptions'}
                                title="My Tasks"
                                onSelectValues={onSelectValues}
                                searchBy={searchBy}
                                setSearchBy={setSearchBy}
                                onsearch={onsearch}
                                handleRefresh={handleRefresh}
                                FilterObj={FilterObj}
                                handlFilter={FilterApply}
                                clearFilters={clearFilters}
                                filter={'true'}
                                commonstatus={[
                                  {
                                    name: 'Approved',
                                    code: 'Approve',
                                    checked: false
                                  },
                                  {
                                    name: 'Pending',
                                    code: 'pending',
                                    checked: false
                                  },
                                  {
                                    name: 'Reject',
                                    code: 'Reject',
                                    checked: false
                                  }
                                ]}
                                placeholder={
                                  'Request Id, Approval For, Approval Type'
                                }
                              />
                              <Grid item>
                                <Box pl={2} py={4}>
                                  <Grid container direction="row" spacing={4}>
                                    {!invisible &&
                                      Object.keys(updatatedLobs.value).map(
                                        (key, index) => {
                                          let lob = updatatedLobs.value[key];

                                          if (
                                            key === 'leadClassification' ||
                                            key === 'statusFilter'
                                          ) {
                                            return (
                                              <Grid item>
                                                <Chip
                                                  label={
                                                    key === 'statusFilter'
                                                      ? 'Status :' + lob
                                                      : 'LeadClassification : ' +
                                                        lob
                                                  }
                                                  color="primary"
                                                  onDelete={() =>
                                                    unselectLob(key)
                                                  }
                                                />
                                              </Grid>
                                            );
                                          }
                                        }
                                      )}

                                    {!invisible &&
                                      updatatedLobs.value.fromDate &&
                                      updatatedLobs.value.toDate && (
                                        <Grid item>
                                          <Chip
                                            label={
                                              'Date Range: ' +
                                              `${dayjs(
                                                updatatedLobs.value.fromDate
                                              ).format('D MMMM, YYYY')}` +
                                              '-' +
                                              `${dayjs(
                                                updatatedLobs.value.toDate
                                              ).format('D MMMM, YYYY')}`
                                            }
                                            color="primary"
                                            onDelete={() =>
                                              unselectLob('fromDate')
                                            }
                                          />
                                        </Grid>
                                      )}
                                  </Grid>
                                </Box>
                              </Grid>
                              <Table
                                page={Taskpage}
                                rowsPerPage={rowsTaskPerPage}
                                handleChangePage={handleTaskChangePage}
                                handleChangeRowsPerPage={
                                  handleTaskChangeRowsPerPage
                                }
                                role={props.user?.role?.roleName}
                                // rows={leads.value?.table?.rows || []}
                                // rows={props.dashboardData.myTasks}
                                rows={hydratetaskrows(
                                  props.dashboardData.mytaskTablerow
                                )}
                                columns={PARTNER_TABLE_CONFIG.Mytasks.columns}
                                onRowAction={handleTaskAction}
                                onRowClick={handleTaskRowClick}
                                BreackRowPoint={true}
                                totalCount={
                                  props.dashboardData.manulTaskTotalcount
                                }
                                loading={
                                  props.dashboardData.loading.myTaskListLoading
                                }

                                // handleBottomClick={handleBottomsheet}
                              />
                            </Box>
                          </Paper>
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
              {/* <Grid item xs={12}>
          <CopyRightFooter />
        </Grid> */}
            </Grid>
          </Box>{' '}
        </Box>
        <RootFooter />
        {/* <Grid container>
          <Grid item xs={12}>
            <Box>
              <RootFooter />
            </Box>
          </Grid>
        </Grid> */}
        {props.modalState.Approval && (
          <Modal id="Approval">
            {({ context, modalId, close }) => (
              <Approval
                modalId={'Approval'}
                user={props.user?.sub}
                onSubmit={props.taskApprove}
                context={props.modalState.context.data}
                modalContext={props.modalState?.context}
                onCancel={() => props.closeModal('Approval')}
                loading={props.dashboardData.loading.approveLoader}
              />
            )}
          </Modal>
        )}
        {props.modalState.TaskDetails && (
          <MytaskDetails
            open={props.modalState?.TaskDetails}
            context={props.modalState?.context?.taskdetails}
            onClose={() => props.closeModal('TaskDetails')}
            handleTaskAction={handleTaskAction}
          />
        )}
        {props.modalState.leadView && (
          <LeadDetails
            open={props.modalState.leadView}
            context={props.modalState.leadViewData}
            user={props.user}
            subOpportunity={props.modalState?.leadViewData}
            onAction={handleLeadAction}
            Alertopen={props.Alertopen}
            openModal={props.openModal}
            onClose={() => {
              props.closeModal('leadView');
              // props.loadLeads();
              // setLeadViewOpen(false);
            }}
          />
        )}
        {props.modalState.createContract && (
          <AddContractModal
            open={props.modalState.createContract}
            onClose={() => props.closeModal('createContract')}
            handleClose={handleClose}
            agent={selectedAgent}
          />
        )}
        {props.modalState.ContractSuccessModal && (
          <Modal id="ContractSuccessModal">
            <ContractSuccessModal
              context={selectedAgent}
              data={selectedAgent}
              successFrom={'Add_Contract'}
            />
          </Modal>
        )}

        {props.modalState.FormsCreation && (
          <FormsCreation
            open={props.modalState.FormsCreation}
            modalcontext={props.modalState?.context}
            onClose={() => props.closeModal('FormsCreation')}
            backOffice={true}
            contractObj={contractObj.value}
            contractModification={true}
            // setHierarchy={setHierarchy}
          />
        )}

        {props.modalState.ShareContract && (
          <AgentShareContract
            onClose={() => props.closeModal('ShareContract')}
            // modalcontext={contractList(contractObj)}
            agent={selectedAgent}
            handleShareContract={(data) => handleShareContract(data)}
            buttonLoader={buttonLoader.value}
            // loading={props.leadsState.loading.creating}
            // loading={props.leadsState.loading?.shareContract}
            downloadpdf={(data) => downloadPDF(data)}
          />
        )}

        {props.modalState.ContractSignpreview && (
          <ContractSignOff
            open={props.modalState.ContractSignpreview}
            onClose={() => props.closeModal('ContractSignpreview')}
            modalcontext={contractList(contractObj)}
            handleloadcontracts={() => props.closeModal('ContractSignpreview')}
            reloadTableData={reloadTableData}
          />
        )}

        {props.modalState.onReOpenAccountHandle && (
          <Modal id="onReOpenAccountHandle">
            {({ context, modalId, close }) => (
              <ReOpenAccount
                modalId={'onReOpenAccountHandle'}
                open={props.modalState.onReOpenAccountHandle}
                masterData={props.masterdata}
                getPotentialPartners={props.getPotentialPartners}
                context={props.modalState.context}
                user={props.user}
                subOpportunity={props.modalState?.leadViewData}
                onAction={handleReOpenAccount}
                onCancel={() => props.closeModal('onReOpenAccountHandle')}
                // Alertopen={props.Alertopen}
                // openModal={props.openModal}
                // onCloseConfirm={() => {
                //   props.closeModal('onReOpenAccountHandle');
                //   // props.loadLeads();
                //   // setLeadViewOpen(false);
                // }}
              />
            )}
          </Modal>
        )}
        <Alert
          open={props.alertState.open}
          onClose={props.closeAlert}
          message={props.alertState.message}
          type={props.alertState.type}
        />
        {props.dashboardData.showPartner && (
          <PartnerDrawer dialogOpen={props.dashboardData.showPartner} />
        )}
        {(props.dashboardData.loading.updateDashboard ||
          props.dashboardData.loading.partnerListLoading ||
          props.dashboardData.loading.myTaskListLoading) && (
          <Snackbar
            ContentProps={{
              classes: {
                root: classes.snackBar
              }
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={true}
            onClose={() => {}}
            message="loading details"
            key={'loader'}
          >
            {/* <SnackbarContent>
    <Typography style={{color:'black'}}>{"I love snacks"}</Typography>
      </SnackbarContent> */}
          </Snackbar>
        )}
        {props.dashboardData.loading.updateDashboard && props.getMytaskList()}
        {rowData !== 'undefined' ? (
          <ApprovalBottomSheet
            open={props.modalState.TaskApproval}
            rowData={props.modalState?.context?.row}
            data={props.modalState?.context?.data}
            onClose={onClose}
          />
        ) : (
          <div></div>
        )}
        {props.modalState.ProductDetails && (
          <ProductDetails
            open={props.modalState.ProductDetails}
            rowlist={props.modalState?.context?.row}
            workflowTrigger={props.workflowTrigger}
            loading={props.dashboardData.loading.workflow}
            onClose={() => {
              props.closeModal('ProductDetails');
              // props.loadLeads();
              // setLeadViewOpen(false);
            }}
          />
        )}
        {props.modalState.DcmSpecification && (
          <DcmSpecification
            LaunchDCM={props.LaunchDCM}
            open={props.modalState?.DcmSpecification}
            modalContext={props.modalState?.context?.row}
            onClose={() => {
              props.closeModal('DcmSpecification');
              // props.loadLeads();
              // setLeadViewOpen(false);
            }}
          />
        )}
        {props.modalState.LogTicket && (
          <TicketModal
            headerText={'Ticket ID'}
            submitBtnText="Proceed"
            onClose={() => {
              props.closeModal('LogTicket'), setMinMode(false);
            }}
            onEnterFullscreen={() => setFullscreen(true)}
            fullscreen={fullscreen}
            logTicket={true}
            Min_mode={() => setMinMode(true)}
            max_mode={() => setMinMode(false)}
            troubleTicketMaximize={true}
            showLogTicketUI={true}
            callLogId={2345}
          >
            {fullscreen && (
              <MaximizeTicket
                onMinimize={() => setFullscreen(false)}
                partnerDropdownlist={
                  props.dashboardData.LogTicketPartnerDetails
                }
                OnsearchValue={LogTicket_OnsearchValue}
                logTicketMinMode={logTicketMinMode}
                handleSelect={LogTicket_handleSelect}
                LogTicket_ProductObj={LogTicket_ProductObj.value}
                onDocumentChange={onDocumentChange}
                ProductDropDownList={
                  props.dashboardData.LogTicketProductDetails
                }
                SelectedProduct={LogTicket_SelectedProduct}
              />
            )}

            {!fullscreen && (
              <MinimizeLogTicket
                partnerDropdownlist={
                  props.dashboardData.LogTicketPartnerDetails
                }
                OnsearchValue={LogTicket_OnsearchValue}
                logTicketMinMode={logTicketMinMode}
                handleSelect={LogTicket_handleSelect}
                LogTicket_ProductObj={LogTicket_ProductObj.value}
                onDocumentChange={onDocumentChange}
                ProductDropDownList={
                  props.dashboardData.LogTicketProductDetails
                }
                SelectedProduct={LogTicket_SelectedProduct}
              />
            )}

            {/* <MaximizeTicket/>         */}
          </TicketModal>
        )}
        {props.modalState.OtpVerification && (
          <Modal id="OtpVerification">
            {({ context, modalId, close }) => (
              <OtpVerification
                modalId={'OtpVerification'}
                // user={props.authstate?.user?.sub}
                // onSubmit={props.taskApprove}
                VerifyOtp={props.VerifyOtp}
                context={props.modalState?.formContext}
                //  loading={props.dashboardData.loading?.VerifyOtpLoader}
                onCancel={() => props.closeModal('OtpVerification')}
                loading={props.dashboardData.loading.VerifyOtpLoader}
              />
            )}
          </Modal>
        )}
        {/* <selfcareReseller/>/ */}
      </Grid>
    </>
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
  grow: {
    flexGrow: 1
  },
  overLap: {
    width: '90vw'
  },
  spacings: {
    paddingLeft: '15px'
  },
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(16)})`,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingBottom: '10rem'
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
    color: theme.palette.primary.black,
    background: theme.palette.background.paper,
    borderRadius: '5px',
    fontSize: '16px',
    padding: '6px 20px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    }
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
  },
  cardStyles: {
    paddingTop: '50px',
    paddingBottom: '108px'
  },
  toggleBtn: {
    color: '#57606F !important',
    '&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)': {
      borderTopLeftRadius: '18px',
      borderBottomLeftRadius: '18px',
      borderColor:'#ffc60b'
    }
  },
  toggleBtnTwo: {
    color: '#57606F !important',
    '&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
      borderTopRightRadius: '18px',
      borderBottomRightRadius: '18px',
      borderColor:'#ffc60b'
    }
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master,
    alertState: state.alert,
    hierarchy: state.hierarchy,
    authstate: state.auth,
    dashboardData: state.dashboardData,
    contractState: state.contracts,
    Masterdata: state.master?.masterData,
    Appearance: state.Appearance
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
    storeAllNotes: DashboardController.storeAllNotes,
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
    FilterByPartner: DashboardController.FilterByPartner,
    FilterByTenant: DashboardController.FilterByTenant,
    FilterByAgent: DashboardController.FilterByAgent,
    FilterByDealer: DashboardController.FilterByDealer,
    validateAgent: DashboardController.validateAgent,
    masterDataLoad: MasterDataController.masterDataLoad,
    createAgentId: DashboardController.createAgentId,
    getmasterdata: MasterDataController.getmasterdata,
    getPartnerLead: DashboardController.getPartnerLead,
    getResellerPartners: DashboardController.getResellerPartners,
    getPotentialDealer: DashboardController.getPotentialDealer
    
  }
)(Home);
