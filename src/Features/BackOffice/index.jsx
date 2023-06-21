import React, { useState } from 'react';
import _ from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { useStateful } from 'react-hanger';
import SearchIcon from '@material-ui/icons/Search';

import TicketFilter from './BackofficeFilter';
// import Dashboard from 'Store/Dashboard';
import getAssociate from 'Features/TroubleTicket/Components/DataFactory/Ticket';
import TicketDetailsWrapper from './TicketDetailsWrapper';
// import PartnerDrawer from '../../Components/Table/PartnerDrawer';
import { Trans } from '@lingui/react';
import CloseIcon from '@material-ui/icons/Close';
import SelectDropDown from 'Components/Dropdown';
import GroupAssignmentController from 'Controllers/GroupAssignmentController';
import PartnerApi from 'Http/api/Partner';

import {
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  InputAdornment,
  IconButton,
  InputBase,
  withStyles,
  TablePagination
} from '@material-ui/core';
import HierarchyController from 'Controllers/Hierarchy';
import LeadController from 'Controllers/Lead';
import DashboardController from 'Controllers/Dashboard';

// import MyTaskTable from '../../Components/Table/MyTaskTable';
import { Navbar } from 'Components';

import TroubleTicketController from 'Controllers/TroubleTicket';
// import OpportunityCreation from "Features/OpportunityCreation";
// import ProductConfiguration from "Components/ProductConfiguration";

import ModalsStore from 'Store/Modals';
import { Modal } from 'lib/components';

import { useBoolean } from 'react-hanger';

//import RefreshIcon from '@material-ui/icons/Refresh';

// import ContractSignoff from '../ContractCreation/ContractSignOff';
// import ProfileCard from 'Features/LeadStatusGraph/ProfileCard';
import AlertActions from 'Store/Alert';

import { useHistory } from 'react-router';

// import Dashboard from 'Store/Dashboard';

import classNames from 'classnames';

// import PartnerTabs from './Tabs.';
import Chicklets from 'Components/Chicklets';
// import FrequentlyUsedLinks from './FrequentlyUsedLinks';
// import MyNotes from './MyNotes';

import DashboardLayout from 'Layouts/Dashboard';
// import OrderDetails from '../../360/Partner360/OrderDetails/Orderdetails';
import TicketApi from 'Http/api/TroubleTicketApis/TicketSystem';
import RootFooter from 'Components/Footer/RootFooter';
//  import Utils from 'Factory/Utils'
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import Dashboard from 'Http/360/Api/Dashboard';
import BackOfficeScrollTabs from './BackOffceScrollTabs';
import BackOfficeTicketCard from './BackOfficeTicketCard';
import produce from 'immer';
import ApprovalReason from 'Components/Modals/ApproveReason';
import TicketFactory from 'Factory/TicketPayload';
import Backdroploader from 'Components/Backdroploader';
import FormsCreation from 'Features/ManageHierarchy/FormsCreation';
import SuccessModal from 'Components/SuccessModal';
import { useSelector } from 'react-redux';
import SuspendTicketWrapper from './SuspendTicketWrapper';
import LeadPartnerTicketWrapper from './LeadTicketWrapper';
import CloseAccountTicketWrapper from './CloseTicketWrapper';
import ResellerPartnerWrapper from './ResellerPartnerWrapper';
import ManualCommissionWrapper from './ManualCommissionWrapper';
const groups = JSON.parse(localStorage.getItem('loginUser'));
const showEmptyMessage = () => {
  //  const classes=useStyles()

  return (
    <Paper elevation={0} style={{ minHeight: '20rem' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={4}
        // className={classes.emptyBox}

        style={{ minHeight: '20rem' }}
      >
        <Grid item>
          <Typography variant="subtitle1">
            <Trans id="List is empty"></Trans>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
const BackOffice = (props) => {
  const { PartnerTicketlist, TicketLoader, TotallInteractionCount } =
    props.dashboardData;
  const {
    _LoadAllPartnerTickets,
    partnerdetails = {
      mainlist: {
        partnerId: 'MPS187B9'
      }
    },
    LoadAll_StatusTickets,
    LoadAll_GetStatusTickets
  } = props;

  const [leadInfo, setLeadInfo] = React.useState('');
  const sample = useSelector((state) => state);
  const [troubleTkt, setTroubleTkt] = React.useState({});
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
  const Details = useStateful({});
  const [open, setOpen] = React.useState(false);
  // const toggleForm = () => setFormOpen(!formOpen);
  // const [leadClassification, setLeadClassification] = React.useState("");
  const [fromDate, handleDateChangeFrom] = React.useState(null);
  const [toDate, handleDateChangeTo] = React.useState(null);
  // const [statusFilter, setStatusFilter] = React.useState("")
  const [fullscreen, setFullscreen] = React.useState(false);
  const [invisible, setInvisible] = React.useState(true);
  const [Searchtext, setSearchtext] = React.useState('');
  // const [searchList, setSearchList] = React.useState([]);
  // const [searchListData, setSearchListData] = React.useState([]);
  const [invisiblePartner, setinvisiblePartner] = React.useState(true);
  const [roles, setRoles] = React.useState('');
  const [rowData, setRowData] = React.useState();
  const [approvalDialogOpen, setAprrovalDialogOpen] = React.useState(false);
  const loaderTicket = useBoolean(false);
  // const selectedLobs = useStateful({});
  const updatatedLobs = useStateful({});
  const [filterCount, setFilterCount] = useState({});
  const filtermenu = useBoolean(false);
  //   const dispatch = useDispatch();
  const [logTicketMinMode, setMinMode] = React.useState(false);

  const taskSearchbar = useBoolean(false);

  const LogTicketFulldetails = useStateful({});

  const LogTicket_ProductObj = useStateful({});
  const TenantSearchbar = useBoolean(false);
  const ChickletCount = useStateful({});
  const username = JSON.parse(localStorage.getItem('USER'));
  const ToggleButtonValue = useStateful('top');
  const [RequestId, setRequestId] = React.useState('');
  const [activeTicket, setactiveTicket] = React.useState('');
  const [selectSuspendTicket, setSelectSuspendTicket] = React.useState('');
  const [selectLeadPartner, setSelectedPartner] = React.useState('');
  const [selectClosePartner, setSelectedClosePartner] = React.useState('');
  const [selectResellerPartner, setSelectedResellerPartner] =
    React.useState('');
  const [selectManualCommissionDetails, setSelectManualCommissionDetails] =
    React.useState('');
  const contractView = useBoolean(false);
  const onClose = () => {
    setAprrovalDialogOpen(false);
  };
  const ContractStatus = useStateful({});

  const [selectValue, setselectValue] = React.useState('');
  const graphCountdetails = useStateful([]);
  const [alignment, setAlignment] = React.useState('Top');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleClickAway = () => {
    // filtermenu.setFalse()
    //  partnerFilter.setFalse()
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  // React.useEffect(()=>{
  //   console.log(props.TroubleTicket,"Dataaaa")
  //   if(props.TroubleTicket?.TroubleTicketList){
  //     setSearchListData(props.TroubleTicket?.TroubleTicketList)
  //   }
  // },[])
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
      label: 'All',
      value: 'All',
      code: 'All'
    },
    {
      label: 'Today',
      value: '0',
      code: '0'
    },
    {
      label: 'Last week',
      value: '7',
      code: '7'
    },
    {
      label: 'Last 1 Month',
      value: '1',
      code: '1'
    },
    {
      label: 'Last 3 Month',
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
    props.getPotentialPartners();
  };
  // const handleRefresh = () => {

  // };

  const setuser = useStateful({});

  /////////////////////////////////////////////////////////////////////////////////////

  const getdate = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12) greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';
    return greet;
  };

  // potential partner
  const [page, setPage] = React.useState(0);
  const [Selfcarepage, setSelfcarepage] = React.useState(0);

  const [Taskpage, setTaskPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [selfcarerowsPerPage, setselfcarerowsPerPage] = React.useState(10);
  const [rowsTaskPerPage, setTaskRowsPerPage] = React.useState(10);
  const [Tenantpage, setTenantPage] = React.useState(0);

  const [SelfcarePage, setSelfcarePage] = React.useState(0);
  const [rowsSelfcarePerPage, setSelfcareRowsPerPage] = React.useState(10);
  const [currentTicket, setCurrentTicket] = React.useState([]);
  //  my list  const [rowsTaskPerPage, setTaskRowsPerPage] = React.useState(10);

  const [rowsTenantPerPage, setTenantRowsPerPage] = React.useState(10);
  const [myListPage, setMyListPage] = React.useState(0);
  const [rowsPerListPage, setRowsPerListPage] = React.useState(10);
  const [tenantData, setTenantData] = React.useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState({});
  const partnerFilter = useBoolean(false);

  const onSelectValues = useStateful({});
  const FilterObj = useStateful({});
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

  const historyCheck = true;
  const ticketHistoryCount = 10;
  const dispatch = useDispatch();

  const [offset, setoffset] = CustomHooks.CustomUseState(0);
  const [limit, setlimit] = CustomHooks.CustomUseState(5);

  const totallCount = useStateful([]);
  const categoryList = useStateful([]);
  const statusTabslist = useStateful([]);
  const ActiveTabs = useStateful('');
  const ActiveIndex = useStateful(0);
  const UserGroups = useStateful([]);
  const AssignUserList = useStateful([]);
  const [assignee, setAssignee] = React.useState('');
  const statuslist = useStateful([]);
  const seleectGroup = useStateful('AllGroups');
  const selectedTicketdetails = useStateful({});
  const DynamicMenusltems = useStateful([]);
  const contractObj = useStateful({});
  const ReadTask = useBoolean(false);
  const [catData, setCatData] = useState({ parentCatData: [], subCatData: [] });

  // console.log(props.modalState.context.data, 'testing1212');

  const getCategoryOptions = async () => {
    const data = await DashboardApi._getParentCategoryDetails().catch(
      (err) => null
    );
    let res = [];
    data.length > 0 &&
      data.map((itm) => {
        res.push({ id: itm.id, title: itm.name });
      });
    // console.log({ data }, 'dropdown data');
    setCatData({ ...catData, parentCatData: res });
    // setCat_Loading(false)
    // return [{title:'sample1'},{title:'sample2'}]
  };
  const getSubCategoryOptions = async (id) => {
    let data;
    if (id) {
      data = await DashboardApi._getSubCategoryDetails(id).catch((err) => null);
      let res = [];
      if (data.length > 0) {
        data.map((itm) => res.push({ id: itm.id, title: itm.name }));
      }
      setCatData({ ...catData, subCatData: res });
    }
    // console.log({ data }, 'dropdown data');
    // return [{ title: 'sample1' }, { title: 'sample3' }];
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage, props.TroubleTicket.TroubleTicketListXcount, 'offset');
    const filterpayload = JSON.parse(localStorage.getItem('filter'));
    console.log(filterpayload, 'filterpayload', limit);

    if (!filterpayload?.filtercount > 0) {
      console.log(filterpayload, 'filterpayloadfilterpayload');
      LoadAll_GetStatusTickets({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        status: ActiveTabs.value,
        team: ReadTask.value,
        limit: limit,
        offset: limit * newPage
      });
    } else if (filterpayload?.filtercount > 0) {
      LoadAll_GetStatusTickets({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        status: ActiveTabs.value,
        team: ReadTask.value,
        limit: limit,
        offset: limit * newPage,
        dynamicURL: filterpayload.dynamicURL
      });
    } else {
      LoadAll_GetStatusTickets({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        status: ActiveTabs.value,
        team: ReadTask.value,
        limit: limit,
        offset: 0
      });
    }
  };
  const handlePageCount = (limit) => {
    console.log(limit, 'limittttttttttt');
    // setoffset(0);
    setlimit(limit);
    const filterpayload = JSON.parse(localStorage.getItem('filter'));
    console.log(filterpayload?.filtercount, filterpayload, 'filterpayloaddddd');
    console.log(
      props.TroubleTicket?.TroubleTicketList,
      props.TroubleTicket?.TroubleTicketListXcount,
      'xxxxcounttttttt'
    );
    // console.log(
    //   filterpayload,
    //   'filterpayload',
    //   props.TroubleTicket?.TroubleTicketList,
    //   props.TroubleTicket?.TroubleTicketListXcount
    // );
    if (!filterpayload?.filtercount > 0) {
      LoadAll_GetStatusTickets({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        status: ActiveTabs.value,
        team: ReadTask.value,
        limit: limit,
        offset: 0
      });
    } else if (filterpayload?.filtercount > 0) {
      LoadAll_GetStatusTickets({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        status: ActiveTabs.value,
        team: ReadTask.value,
        limit: limit,
        offset: 0,
        dynamicURL: filterpayload.dynamicURL
      });
    } else {
      LoadAll_GetStatusTickets({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        status: ActiveTabs.value,
        team: ReadTask.value,
        limit: limit,
        offset: 0
      });
    }
  };

  const getAllCounts = async () => {
    const res = await Dashboard._getCategoryDetails();
    categoryList.setValue(res);

    _LoadAllPartnerTickets({
      id: _.get(partnerdetails, 'mainlist.partnerId', '...')
    });

    let data = await Promise.all([
      TicketApi._loadAllPartnerTicketOpen(
        _.get(partnerdetails, 'mainlist.partnerId', '...')
      ),
      TicketApi._loadAllPartnerTicketclose(
        _.get(partnerdetails, 'mainlist.partnerId', '...')
      ),
      TicketApi._loadAllPartnerTicketResolve(
        _.get(partnerdetails, 'mainlist.partnerId', '...')
      )
    ]).then((results) => {
      return results;
    });

    const statusTabs = await TicketApi._getStatustabs(
      _.get(partnerdetails, 'mainlist.partnerId', '...')
    );
    statusTabslist.setValue(['All'].concat(statusTabs[0]?.status));
    totallCount.setValue(data);
  };
  const ExtrnalParser = async (id, identifierApi, TicketName) => {
    console.log(id, 'iddeeeeeee');
    if (id?.substring(0, 2) === 'MP') {
      let res = await PartnerApi.getPartnerDetails(id);
      return deleteLegacyRes(res[0], TicketName, 'Partner', id);
    } else if (id?.substring(0, 2) === 'TP') {
      let res = await PartnerApi.getTenantDetails(id);
      return deleteLegacyRes(res[0], TicketName, 'Partner', id);
      // return res[0];
    } else if (id?.substring(0, 2) === 'AG') {
      let res = await PartnerApi.getAgentDetails(id);
      return deleteLegacyRes(res[0], TicketName, 'Product');
    } else if (id?.substring(0, 2) === 'PR') {
      let res = await PartnerApi.getProductDetails(id);
      return deleteLegacyRes(res[0], TicketName, 'Product');
    } else {
      if (identifierApi && id) {
        let res = await PartnerApi[identifierApi](id);
        return res[0];
      }
    }
    loaderTicket.setFalse();
  };
  const deleteLegacyRes = (data, TicketName, identifierName, id) => {
    if (
      (TicketName === 'Contract Modification' ||
        TicketName === 'Contract Renewal') &&
      identifierName === 'Partner'
    ) {
      contractView.setTrue();
      return {
        PartnerProfileCreation: {
          PartnerDetails: {
            ...data.PartnerProfileCreation?.PartnerDetails
          },
          sections: ['PartnerDetails']
        },
        formIdentity: 'Partner_Profile',
        formName: 'Partner_Profile'
      };
    } else if (
      (TicketName === 'Contract Modification' ||
        TicketName === 'Contract Renewal' ||
        TicketName === 'Contract Cancel') &&
      identifierName === 'Product'
    ) {
      contractView.setTrue();
      return {
        AddProduct: {
          ProductDetails: {
            ...data.AddProduct?.ProductDetails
          },
          sections: ['ProductDetails']
        },
        formIdentity: 'Add_Product',
        formName: 'Add_Product'
      };
    } else if (TicketName === 'ProductContract') {
      if (id?.substring(0, 2) === 'MP') {
        contractView.setTrue();
        return {
          PartnerProfileCreation: {
            PartnerDetails: {
              ...data.PartnerProfileCreation?.PartnerDetails
            },
            sections: ['PartnerDetails']
          },
          formIdentity: 'Partner_Profile',
          formName: 'Partner_Profile'
        };
      } else if (id?.substring(0, 2) === 'TP') {
        contractView.setTrue();
        return {
          TenantProfileCreation: {
            TenantDetails: {
              ...data.TenantProfileCreation?.TenantDetails
            },
            sections: ['TenantDetails']
          },
          formIdentity: 'Tenant_Partner_Profile',
          formName: 'Tenant Partner Profile'
        };
      }
    } else {
      contractView.setFalse();
      return data;
    }
  };
  const updateTicketObj = async (data, id) => {
    console.log(data, 'oldantecocaw');
    loaderTicket.setTrue();
    let res = '';
    if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'CM' || id) {
      res = await PartnerApi.getCommissionRuleDetails(
        data?.relatedEntity[0]?.id
      );
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'CO') {
      res = await PartnerApi.getcommissionRules(data?.relatedEntity[0]?.id);
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'ST') {
      res = await PartnerApi.getSettlementRuleDetails(
        data?.relatedEntity[0]?.id
      );
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'MP') {
      res = await PartnerApi.getPartnerDetails(data?.relatedEntity[0]?.id);
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'TP') {
      res = await PartnerApi.getTenantDetails(data?.relatedEntity[0]?.id);
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'PR') {
      res = await PartnerApi.getProductDetails(data?.relatedEntity[0]?.id);
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'CR') {
      console.log(selectedTicketdetails, 'cccccccccccccontract');
      res = await PartnerApi.getContractDetails(data?.relatedEntity[0]?.id);
      if (res?.length > 0) {
        contractObj.setValue(res[0]);
      }
    } else if (data?.relatedEntity[0]?.id?.substring(0, 2) === 'AD') {
      res = await PartnerApi.getAdjustmentDetails(data?.relatedEntity[0]?.id);
    }
    //  else if (data?.relatedEntity[0]?.name === 'Agent-Contract') {
    //   console.log("hhhhhhhhh")
    //   res = await PartnerApi.getAgentDetails(data?.relatedEntity[0]?.id);
    // }

    if (res) {
      console.log(res, 'checkcomingggggggg');
      const updateobj = await produce(data, async (draft) => {
        !id && (draft['MainObj'] = res);
        _.get(res, '[0].formName') === 'Partner_Profile' &&
          (draft['TaskMerger'] = _.compact([res[0]]));
        _.get(res, '[0].formName') === 'Add_Contract' &&
          (draft['TaskMerger'] = _.compact([
            data?.relatedEntity[0].name === 'Contract Modification'
              ? {
                  ...res[0],

                  AddContractFor: {
                    ...res[0].AddContractFor,
                    'Modify Contract Description': {
                      ['Description']: data?.description
                    },
                    ContractModificationHistory:
                      res[0]?.AddContractFor?.ContractModificationHistory,
                    sections: [
                      'ContractInformation',
                      'Modify Contract Description',
                      'ContractModificationHistory',
                      'UploadDocuments'
                    ]
                  }
                }
              : res[0],
            _.get(res, '[0].AddContractFor.ContractInformation.PRODUCT_ID')
              ? await ExtrnalParser(
                  _.get(
                    res,
                    '[0].AddContractFor.ContractInformation.PRODUCT_ID'
                  ),
                  null,
                  data?.relatedEntity[0].name
                )
              : await ExtrnalParser(
                  _.get(
                    res,
                    '[0].AddContractFor.ContractInformation.Partner_ID'
                  ),
                  'getPartnerDetails',
                  data?.relatedEntity[0].name
                ),
            data?.relatedEntity[0].name === 'Contract Modification'
              ? _.get(
                  res,
                  '[0].AddContractFor.ContractInformation.Partner_ID'
                )?.startsWith('MP')
                ? await ExtrnalParser(
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.Partner_ID'
                    ),
                    'getPartnerDetails',
                    data?.relatedEntity[0].name
                  )
                : await ExtrnalParser(
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.Partner_ID'
                    ),
                    'getTenantDetails',
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.PRODUCT_ID'
                    )
                      ? 'ProductContract'
                      : 'PartnerContract'
                  )
              : '',

            data?.relatedEntity[0].name === 'Contract' ||
            data?.relatedEntity[0].name === 'Contract Renewal' ||
            data?.relatedEntity[0].name === 'Contract Cancel' ||
            data?.relatedEntity[0].name === 'Agent-Contract'
              ? _.get(
                  res,
                  '[0].AddContractFor.ContractInformation.PRODUCT_ID'
                ) &&
                _.get(res, '[0].AddContractFor.ContractInformation.Partner_ID')
                ? await ExtrnalParser(
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.Partner_ID'
                    ),
                    'getPartnerDetails',
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.PRODUCT_ID'
                    )
                      ? 'ProductContract'
                      : 'PartnerContract'
                  )
                : (await ExtrnalParser(
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.Partner_ID'
                    ),
                    'getTenantDetails',
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.PRODUCT_ID'
                    )
                      ? 'ProductContract'
                      : 'PartnerContract'
                  ))
                ? await ExtrnalParser(
                    _.get(
                      res,
                      '[0].AddContractFor.ContractInformation.Agent_ID'
                    ),
                    'getAgentDetails',
                    data?.relatedEntity[0].name
                  )
                : ''
              : '',

            await ExtrnalParser(
              _.get(
                res,
                '[0].AddContractFor.ContractInformation.Settelement_Code'
              ),
              'SettlementRuleDetails',
              data?.relatedEntity[0].name
            ),

            await ExtrnalParser(
              _.get(
                res,
                '[0].AddContractFor.ContractInformation.Commission_Code'
              ),
              'getcommissionRules',
              data?.relatedEntity[0].name
            ),
            await ExtrnalParser(
              _.get(res, '[0].AddContractFor.ContractInformation.Agent_ID'),
              'getAgentDetails',
              data?.relatedEntity[0].name
            )
          ]));
        _.get(res, '[0].formName') === 'Add_Product' &&
          (draft['TaskMerger'] = _.compact([
            res[0],
            await ExtrnalParser(
              _.get(res, '[0].AddProduct.ProductDetails.Partner_ID'),
              'getPartnerDetails',
              data?.relatedEntity[0].name
            )
          ]));
        _.get(res, '[0].@baseType') === 'AdjustmentService' &&
          (draft['TaskMerger'] = _.compact([
            res[0],
            await ExtrnalParser(
              _.get(res, '[0].partnerId'),
              'getPartnerDetails',
              data?.relatedEntity[0].name
            )
          ]));
      });
      console.log(updateobj, 'mytask');

      selectedTicketdetails.setValue(updateobj);
      setactiveTicket();
      loaderTicket.setFalse();
      return res;
    } else {
      loaderTicket.setFalse();
    }
  };

  const activeTab = async (item, limit, offset) => {
    localStorage.removeItem('filter');
    loaderTicket.setTrue();
    ActiveTabs.setValue(item?.statusName);
    LoadAll_GetStatusTickets({ limit: 5, offset: 0,groups: UserGroups.value,status: item?.statusName,team: ReadTask.value,});
    setPage(0);
    setlimit(5);
    setRowsPerListPage(0);
    const active = await LoadAll_GetStatusTickets({
      groups: UserGroups.value,
      userid: props.authstate.user?.sub,
      status: item?.statusName,
      team: ReadTask.value,
      limit: 5,
      offset: 0
    });
    loaderTicket.setFalse();
    // _dynamicmenuStatus(item?.statusName)
  };

  const handleTicketSelection = async (ticket, index) => {
    console.log(ticket?.relatedEntity[0]?.name, 'checkkkkjjjj', " ticket: ", ticket);
    // setSearchtext('');
    ActiveIndex.setValue(index);
    loaderTicket.setTrue();

    if (ticket?.relatedEntity[0]?.name === 'Suspension') {
      setSelectSuspendTicket(ticket);
      loaderTicket.setFalse();
    } else if (ticket?.relatedEntity[0]?.name === 'Lead Partner') {
      setSelectedPartner(ticket);
      loaderTicket.setFalse();
    } else if (ticket?.relatedEntity[0]?.name === 'ReOpenAccount') {
      setSelectedClosePartner(ticket);
      loaderTicket.setFalse();
    } else if (ticket?.relatedEntity[0]?.name === 'Agent - Onboard') {
      setSelectedResellerPartner(ticket);
      loaderTicket.setFalse();
    } else if (ticket?.relatedEntity[0]?.name === 'Manual Commission') {
      setSelectManualCommissionDetails(ticket);
      loaderTicket.setFalse();
    }
    // }else if (ticket?.relatedEntity[0]?.name === 'Agent-Contract') {
    //   console.log(ticket,'tickettttt')
    //   console.log(ticket?.relatedData?.contract?.AddContractFor, "checkin1")
    //   const data = await PartnerApi.getAgentDetails(ticket?.relatedData?.contract?.AddContractFor?.ContractInformation?.Agent_ID);
    //   console.log(data,'datadatadatadata')
    //   ticket.relatedData.contract.AddContractFor.AgentInformation = data[0]?.ResellerProfileCreation
    //   // ticket["relatedData"]["contract"]["AddContractFor"]["AgentInformation"] = data[0].ResellerProfileCreation
    //   console.log(ticket,relatedData.contract.AddContractFor, "checkin2")
    //   // ticket["relatedData"]["contract"]["AddContractFor"]["AgentInformation"] = await PartnerApi.getAgentDetails();
    //   // ticket["relatedData"]["contract"]["AddContractFor"]["AgentInformation"] = data?.[0].ResellerProfileCreation
    //   setSelectedResellerPartner(ticket);
    //   console.log( await PartnerApi.getAgentDetails(ticket?.relatedData?.contract?.AddContractFor?.ContractInformation?.Agent_ID),'apiCheckkk')

    //   console.log(ticket,'ticketttttChhhhh')
    //   loaderTicket.setFalse();
    // }
    else {
      setSelectSuspendTicket({});
      setSelectedPartner({});
      setSelectedClosePartner({});
      setSelectedResellerPartner({});
      setSelectManualCommissionDetails({});
      updateTicketObj(ticket);
    }
  };
  const handleTickObj = async () => {
    updateTicketObj(props.TroubleTicket?.TroubleTicketList[0]);
  };
  console.log(
    props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity[0],
    'yyyyyyyyyyyyyyyyyyyyyyy'
  );

  React.useEffect(() => {
    if (props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity.length === 1) {
      setCurrentTicket(props.TroubleTicket?.TroubleTicketList[0]);

      setSelectSuspendTicket();
      setSelectedClosePartner();
      setSelectedResellerPartner();
      setSelectManualCommissionDetails();
      setSelectedPartner();
      if (
        props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity[0]?.name ===
        'Suspension'
      ) {
        setSelectSuspendTicket(props.TroubleTicket?.TroubleTicketList[0]);
      } else if (
        props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity[0]?.name ===
        'Lead Partner'
      ) {
        setSelectedPartner(props.TroubleTicket?.TroubleTicketList[0]);
      } else if (
        props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity[0]?.name ===
        'ReOpenAccount'
      ) {
        setSelectedClosePartner(props.TroubleTicket?.TroubleTicketList[0]);
      } else if (
        props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity[0]?.name ===
        'Agent - Onboard'
      ) {
        setSelectedResellerPartner(props.TroubleTicket?.TroubleTicketList[0]);
      } else if (
        props.TroubleTicket?.TroubleTicketList[0]?.relatedEntity[0]?.name ===
        'Manual Commission'
      ) {
        setSelectManualCommissionDetails(
          props.TroubleTicket?.TroubleTicketList[0]
        );
      }
    }
    ActiveTabs.setValue(props.TroubleTicket?.TroubleTicketList[0]?.status);
  }, [props.TroubleTicket?.TroubleTicketList]);
  React.useEffect(() => {
    handleTickObj();
  }, [props.TroubleTicket?.TroubleTicketList]);

  React.useEffect(() => {
    if (props.TroubleTicket?.TroubleTicketStatus) {
      // setSearchListData(props?.TroubleTicket.TroubleTicketList)
      statuslist.setValue(props.TroubleTicket?.TroubleTicketStatus);
      ActiveTabs.setValue(
        props.TroubleTicket?.TroubleTicketStatus[0]?.statusName
      );
      // _dynamicmenuStatus(props.TroubleTicket?.TroubleTicketStatus[0]?.statusName)
    }
  }, [props.TroubleTicket?.TroubleTicketStatus]);

  React.useEffect(() => {
    if (props.authstate?.userGroups?.id) {
      props.getGrouplist({ id: props.authstate?.userGroups?.id });
    }
  }, [props.authstate?.userGroups?.id]);

  React.useEffect(() => {
    if (props.Groups.getGroups.length > 0) {
      setselectValue(props.Groups.getGroups[0]?.code);
    }
  }, [props.Groups.getGroups]);

  React.useEffect(() => {
    if (props.authstate?.userGroups?.groupId) {
      UserGroups.setValue(props.authstate?.userGroups?.groupId);
      props.LoadAll_StatusCount({
        groups: props.authstate?.userGroups?.groupId,
        userid: props.authstate.user?.sub,
        status: 'Resolved',
        team: ReadTask.value,
        limit: 5,
        offset: 0
      });
      // _getAssignlist(props.authstate?.userGroups?.groupId);
    }
  }, [props.authstate?.userGroups]);

  const handleSelectGroups = (e) => {
    loaderTicket.setTrue();
    seleectGroup.setValue(e.target.value);
    if (e.target.value === 'AllGroups') {
      UserGroups.setValue(props.authstate?.userGroups?.groupId);
      props.LoadAll_StatusCount({
        groups: props.authstate?.userGroups?.groupId,
        userid: props.authstate.user?.sub,
        status: 'Resolved',
        team: ReadTask.value,
        limit: 5,
        offset: 0
      });

      // _getAssignlist(props.authstate?.userGroups?.groupId);
    } else {
      UserGroups.setValue(e.target.value);
      props.LoadAll_StatusCount({
        groups: e.target.value,
        userid: props.authstate.user?.sub,
        status: 'Resolved',
        team: ReadTask.value,
        limit: 5,
        offset: 0
      });
      loaderTicket.setFalse();
      // _getAssignlist(e.target.value);
    }
  };
  React.useEffect(() => {
    props.backOfficeDashboardCounts();
  }, []);

  console.log(props.TroubleTicket?.TroubleTicketList, 'testerxander');
  const handleAssignChange = (e, value) => {
    setSelectedAssigned(value);
    // console.log(props.TroubleTicket?.TroubleTicketAssignUser, value, "ttttttxtxt")
    if (props.TroubleTicket?.TroubleTicketAssignUser?.length > 0) {
      let val = value?.assignee?.id;
      let arr = props.TroubleTicket?.TroubleTicketAssignUser;

      let getId;
      arr.find((element) => {
        if (element.username === val) {
          getId = element;
        }
      });

      props.TrobleTicketAssignUser({
        id: value?.id,
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        payload: TicketFactory.assignUser(
          e.code,
          value,
          props.authstate.user?.sub
        ),
        oldAssignee: getId?.id,
        newAssignee: e.id
      });
    } else {
      props.TrobleTicketAssignUser({
        id: value?.id,
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        payload: TicketFactory.assignUser(
          e.code,
          value,
          props.authstate.user?.sub
        ),
        oldAssignee: props.TroubleTicket?.TroubleTicketAssignUser?.username,
        newAssignee: e.id
      });
    }

    setAssignee(e.target.value);
  };
  const handleReadTask = (e) => {
    loaderTicket.setTrue();
    if (e.target.value === 'Teamtask') {
      ReadTask.setTrue();
      props.LoadAll_StatusCount({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        team: true,
        limit: 5,
        offset: 0
      });
    } else {
      ReadTask.setFalse();
      props.LoadAll_StatusCount({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        team: false,
        limit: 5,
        offset: 0
      });
    }
    loaderTicket.setFalse();
  };

  const handleSearchRequestId = (e) => {
    setRequestId(e.target.value);

    if (e.target.value.length >= 3) {
      let data = props.LoadAll_StatusCount({
        groups: UserGroups.value,
        userid: props.authstate.user?.sub,
        team: ReadTask.value,
        limit: 5,
        offset: 0,
        TaskIdSearch: e.target.value,
        status: ActiveTabs.value
      });
      setTroubleTkt(data);
    } else {
      if (e.target.value.length === 0) {
        props.LoadAll_StatusCount({
          groups: UserGroups.value,
          userid: props.authstate.user?.sub,
          team: ReadTask.value,
          limit: 5,
          offset: 0,
          TaskIdSearch: '',
          status: ActiveTabs.value
        });
      }
    }
  };

  const handleTickets = async ({ id, dynamicURL }) => {
    // console.log(dynamicURL, 'urlooo');
    await LoadAll_GetStatusTickets({
      groups: UserGroups.value,
      userid: props.authstate.user?.sub,
      status: ActiveTabs.value,
      team: ReadTask.value,
      limit: 5,
      offset: 0,
      dynamicURL
    });
  };
  // console.log(selectLeadPartner, "se")
  return (
    <DashboardLayout>
      <Backdroploader
        open={loaderTicket.value || props.TroubleTicket.loading.TicketsLoader}
      />
      <Grid container direction="column">
        <Navbar
          message={navMessage.value}
          user={props.authstate.user}
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
                    <Trans id="Your Performance"></Trans>
                  </Typography>

                  {/* <Typography variant="subtitle1">{date.today()}</Typography> */}
                </Grid>
                <Grid className={classes.right}>
                  {/* <SelectDropdown
                    value={duration.value}
                    // label={durationGraph.value}
                    onChange={(e) => {
                      duration.setValue(e.target.value), handleChangeCount(e);
                    }}
                    options={options}
                  /> */}
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
                  options={[
                    {
                      title: <Trans id="My Tasks"></Trans>,
                      value: props.dashboardData?.ChickletCount?.myTask || 0,
                      day: '607'
                      //   icon: 'OrderCompleted'
                    },
                    {
                      title: <Trans id="InProgress Tasks"></Trans>,
                      value:
                        props.dashboardData?.ChickletCount?.inprogressTasks ||
                        0,
                      day: '607'
                      //   icon: 'OrderPending'
                    },
                    {
                      title: <Trans id="Reject Tasks"></Trans>,
                      value:
                        props.dashboardData?.ChickletCount?.rejectTask || 0,
                      day: '607'
                      //   icon: 'OrderCompleted'High Priority Tasks
                    },

                    {
                      title: <Trans id="Resolved Tasks"></Trans>,
                      value:
                        props.dashboardData?.ChickletCount?.resolvedTask || 0,
                      day: '607'
                      //   icon: 'OrderCompleted'High Priority Tasks
                    }
                  ]}
                />
              </Grid>

              <Grid item xs>
                <Grid container direction="row" spacing={6}>
                  <Grid item>
                    <SelectDropDown
                      label={`Read Tasks`}
                      handleChange={handleReadTask}
                      options={
                        [
                          {
                            name: <Trans id="My Task"></Trans>,
                            code: 'Mytask'
                          },
                          {
                            name: <Trans id="Team Task"></Trans>,
                            code: 'Teamtask'
                          }
                        ] || []
                      }
                      value={'Mytask'}
                    />
                  </Grid>
                  <Grid item>
                    <SelectDropDown
                      label={`Read Groups`}
                      handleChange={handleSelectGroups}
                      options={
                        [
                          {
                            name: <Trans id="All Groups"></Trans>,
                            code: 'AllGroups'
                          }
                        ].concat(props.Groups.getGroups) || []
                      }
                      value={seleectGroup.value}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item xs={5}>
                    <Grid
                      container
                      direction="row"
                      // spacing={2}
                      alignItems="center"
                      className={classes.tabScroller}
                    >
                      <Grid item xs={11}>
                        <BackOfficeScrollTabs
                          ActiveTabs={ActiveTabs.value}
                          options={
                            props.TroubleTicket?.TroubleTicketStatus || []
                          }
                          activeTab={activeTab}
                          count={props.TroubleTicket?.TroubleTicketListXcount}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid container direction="row" spacing={6}>
                  <Grid item xs={4}>
                    <Grid
                      container
                      direction="column"
                      wrap="nowrap"
                      spacing={4}
                      // className={enableSticky ? classes.stickyLeftPane : ''}
                    >
                      <Grid item>
                        <Box py={2}>
                          <InputBase
                            name="newComment"
                            className={classNames(classes.inputField)}
                            fullwidth
                            value={RequestId}
                            placeholder={`Search by Request Id`}
                            // value={searchId}
                            onChange={(e) => handleSearchRequestId(e)}
                            startAdornment={
                              <InputAdornment position="start">
                                <SearchIcon className={classes.searchIcon} />
                              </InputAdornment>
                            }
                            endAdornment={
                              Searchtext.length >= 2 && (
                                <>
                                  <IconButton size="small">
                                    <CloseIcon
                                    //  onClick={handleClose}
                                    />
                                  </IconButton>
                                </>
                              )
                            }
                          />
                        </Box>
                      </Grid>
                      {!_.isEmpty(props.TroubleTicket?.TroubleTicketList) ? (
                        <>
                          <Grid item xs={12}>
                            <Box py={10} className={classes.searchbarSpaces}>
                              {historyCheck ? (
                                props.TroubleTicket?.TroubleTicketList.length >
                                0 ? (
                                  props.TroubleTicket?.TroubleTicketList?.map(
                                    (ticket, index) => {
                                      // const category = ticket.category
                                      //   ? ticket.category.split(',')
                                      //   : [];
                                      const { associateId, customerType } =
                                        getAssociate.getAssociateIdWithCustomerType(
                                          ticket
                                        );

                                      return (
                                        <BackOfficeTicketCard
                                          key={index}
                                          index={index}
                                          requestLabel={
                                            <Trans id="REQUEST ID"></Trans>
                                          }
                                          partnerdetails={partnerdetails}
                                          showWarningIcon={
                                            //   ticket.status === constants.priorities.HIGH
                                            'HIGH'
                                          }
                                          requestId={ticket.id}
                                          ticketItem={ticket}
                                          associateLabel={
                                            <Trans id="Service ID"></Trans>
                                          }
                                          serviceId={_.get(
                                            ticket,
                                            'publicIdentifier[0]',
                                            ''
                                          )}
                                          category={ticket?.category}
                                          showTime={true}
                                          // time={moment(ticket.createdDate).format(
                                          //   constants.dateFormat.fullDateMonthWithTime
                                          // )}
                                          selectedRow={ticket}
                                          type={customerType}
                                          associateId={associateId}
                                          // selected={
                                          //   ticket.id === this.state.selectedTicket
                                          // }
                                          onCardClick={handleTicketSelection}
                                          status={ticket.status}
                                          tooltip
                                          ActiveIndex={ActiveIndex.value}
                                        />
                                      );
                                    }
                                  )
                                ) : (
                                  <Box px={0} pb={6} pt={1}>
                                    {showEmptyMessage()}
                                  </Box>
                                )
                              ) : (
                                <Box px={0} pb={6} pt={1}>
                                  {showEmptyMessage()}
                                </Box>
                              )}
                            </Box>
                            <div className="ticketPagination">
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 20, 30, 50]}
                                component="div"
                                count={
                                  props.TroubleTicket
                                    ?.TroubleTicketListXcount || 0
                                }
                                rowsPerPage={limit}
                                page={page}
                                onPageChange={handleChangePage}
                                onChangeRowsPerPage={(e, limit) =>
                                  handlePageCount(e.target.value)
                                }
                                // labelDisplayedRows={({ from, to, count }) => {
                                //   return `${
                                //     from > 9 ? from : `0${from || 0}`
                                //   }-${to > 9 ? to : `0${to || 0}`} of ${
                                //     count !== -1 ? count || 0 : 0
                                //   }`;
                                // }}
                                backIconButtonProps={{
                                  'aria-label': (
                                    <Trans id="Previous Page"></Trans>
                                  )
                                }}
                                nextIconButtonProps={{
                                  'aria-label': <Trans id="Next Page"></Trans>
                                }}
                                SelectProps={{
                                  inputProps: { 'aria-label': 'rows per page' },
                                  MenuProps: {
                                    classes: { paper: classes.selectedDropdown }
                                  }
                                }}
                              />
                            </div>
                          </Grid>
                        </>
                      ) : (
                        <Box px={0} pb={6} pt={1}>
                          {showEmptyMessage()}
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={8}>
                    <Box py={10} className={classes.alignmentBox}>
                      <>
                        {selectSuspendTicket?.relatedEntity?.length > 0 &&
                        selectSuspendTicket?.relatedEntity[0]?.name ===
                          'Suspension' ? (
                          <SuspendTicketWrapper
                            partnerdetails={partnerdetails}
                            AssignUserList={
                              props.TroubleTicket?.TroubleTicketAssignUser
                            }
                            DynamicMenusltems={
                              props.TroubleTicket?.TroubleTicketDynamicmenu
                            }
                            selectedTicketdetails={selectSuspendTicket}
                            openModal={props.openModal}
                            handleAssignChange={handleAssignChange}
                            contractObj={contractObj.value}
                            contractPreview={false}

                            // TrobleTicketAssignUser={TrobleTicketAssignUser}
                          />
                        ) : selectLeadPartner?.relatedEntity?.length > 0 &&
                          selectLeadPartner?.relatedEntity[0]?.name ===
                            'Lead Partner' ? (
                          <LeadPartnerTicketWrapper
                            partnerdetails={partnerdetails}
                            AssignUserList={
                              props.TroubleTicket?.TroubleTicketAssignUser
                            }
                            DynamicMenusltems={
                              props.TroubleTicket?.TroubleTicketDynamicmenu
                            }
                            selectedTicketdetails={selectLeadPartner}
                            openModal={props.openModal}
                            handleAssignChange={handleAssignChange}
                            contractObj={contractObj.value}
                            contractPreview={false}
                          />
                        ) : selectClosePartner?.relatedEntity?.length > 0 &&
                          selectClosePartner?.relatedEntity[0]?.name ===
                            'ReOpenAccount' ? (
                          <CloseAccountTicketWrapper
                            partnerdetails={partnerdetails}
                            AssignUserList={
                              props.TroubleTicket?.TroubleTicketAssignUser
                            }
                            DynamicMenusltems={
                              props.TroubleTicket?.TroubleTicketDynamicmenu
                            }
                            selectedTicketdetails={selectClosePartner}
                            openModal={props.openModal}
                            handleAssignChange={handleAssignChange}
                            contractObj={contractObj.value}
                            contractPreview={false}
                          />
                        ) : selectResellerPartner?.relatedEntity?.length > 0 &&
                          selectResellerPartner?.relatedEntity[0]?.name ===
                            'Agent - Onboard' ? (
                          <ResellerPartnerWrapper
                            partnerdetails={partnerdetails}
                            AssignUserList={
                              props.TroubleTicket?.TroubleTicketAssignUser
                            }
                            DynamicMenusltems={
                              props.TroubleTicket?.TroubleTicketDynamicmenu
                            }
                            selectedTicketdetails={selectResellerPartner}
                            openModal={props.openModal}
                            handleAssignChange={handleAssignChange}
                            contractObj={contractObj.value}
                            contractPreview={false}
                          />
                        ) : selectManualCommissionDetails?.relatedEntity
                            ?.length > 0 &&
                          selectManualCommissionDetails?.relatedEntity[0]
                            ?.name === 'Manual Commission' ? (
                          <ManualCommissionWrapper
                            partnerdetails={partnerdetails}
                            AssignUserList={
                              props.TroubleTicket?.TroubleTicketAssignUser
                            }
                            DynamicMenusltems={
                              props.TroubleTicket?.TroubleTicketDynamicmenu
                            }
                            selectedTicketdetails={
                              selectManualCommissionDetails
                            }
                            openModal={props.openModal}
                            handleAssignChange={handleAssignChange}
                            contractObj={contractObj.value}
                            contractPreview={false}
                          />
                        ) : (
                          <>
                            {props.TroubleTicket?.TroubleTicketList?.length >
                            0 ? (
                              <TicketDetailsWrapper
                                partnerdetails={partnerdetails}
                                AssignUserList={
                                  props.TroubleTicket?.TroubleTicketAssignUser
                                }
                                DynamicMenusltems={
                                  props.TroubleTicket?.TroubleTicketDynamicmenu
                                }
                                selectedTicketdetails={
                                  selectedTicketdetails.value
                                }
                                openModal={props.openModal}
                                handleAssignChange={handleAssignChange}
                                contractObj={contractObj.value}
                                contractPreview={
                                  selectedTicketdetails.value?.relatedEntity &&
                                  (_.includes[
                                    ('Contract Modification', 'Contract')
                                  ],
                                  selectedTicketdetails.value?.relatedEntity[0]
                                    ?.name)
                                    ? true
                                    : false
                                }

                                // TrobleTicketAssignUser={TrobleTicketAssignUser}
                              />
                            ) : (
                              showEmptyMessage()
                            )}
                          </>
                        )}
                      </>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box py={10}> </Box>
          </Box>
        </Box>
      </Grid>
      {props.modalState.ApprovalReason && (
        <Modal id="ApprovalReason">
          {({ context, modalId, close }) => (
            <ApprovalReason
              modalId={'ApprovalReason'}
              user={props.authstate?.user?.sub}
              TrobleTicketApporovel={props.TrobleTicketApporovel}
              context={props.modalState.context.data}
              modalContext={props.modalState?.context}
              onCancel={() => props.closeModal('ApprovalReason')}
              groups={UserGroups.value}
              userid={props.authstate.user?.sub}
              loading={props.TroubleTicket.loading.ApprovelLoader}
              assignee={assignee}
              activeTabs={activeTab}
              setactiveTicket={setactiveTicket}
              ActiveTabs={ActiveTabs}
            />
          )}
        </Modal>
      )}

      {/* {props.modalState.contracts && (
        <Contracts
          // loadcontract={props.ContractList}
          // page={page}
          // type={type}
          // context={props.modalState.context}
          // rowsPerPage={rowsPerPage}
          // formData={formData}
          onClose={() => props.closeModal('contracts')}
          historypush={() => {
            props.closeModal('contracts');
            history.push('/');
          }}
          // handleChangePage={handleChangePage}
          // handleChangeRowsPerPage={handleChangeRowsPerPage}
          // list={props.dashboardData.contractTablelist}
          // tableLoading={props.dashboardData.loading.contractTableloader}
          // onSearchContract={props.dashboardData.SearchContractTablelist}
        />
      )} */}

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

      {props.modalState.SuccessModal && (
        <Modal id="SuccessModal">
          <SuccessModal context={props.modalState?.context} />
        </Modal>
      )}
      {props.modalState.TicketFilter && (
        <Modal id="TicketFilter">
          {({ context, modalId, close }) => (
            <TicketFilter
              modalId={'TicketFilter'}
              user={props.authstate?.user}
              setFilterCount={setFilterCount}
              masterParterDetails={partnerdetails}
              DashboardData={props.DashboardData}
              catData={catData}
              getCategoryOptions={getCategoryOptions}
              getSubCategoryOptions={getSubCategoryOptions}
              // onSubmit={props.VerifyOTP}
              // partnerid={props.match.params.id}
              Load_filter_tickets={handleTickets}
              partnerdetails={partnerdetails}
              onCancel={() => props.closeModal('TicketFilter')}
              loading={false}
              sortFilter={false}
              customFilter={false}
            />
          )}
        </Modal>
      )}
      <Box>
        <RootFooter />
      </Box>
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
  searchbarSpaces: {
    paddingTop: '2px',
    paddingBottom: '2px'
  },
  filterBadge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.type === 'dark' ? `#000000 !important` : ``
  },
  inputField: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4),
    borderRadius: theme.spacing(4),
    width: '100%'
  },
  searchIcon: {
    stroke: theme.palette.icon.stroke
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
  selectedDropdown: {
    //background: 'black',
    marginTop: '0rem'
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
  alignmentBox: {
    paddingTop: '0.5rem'
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
)(BackOffice);
