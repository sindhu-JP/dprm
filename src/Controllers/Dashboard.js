import { createAsyncThunk } from '@reduxjs/toolkit';
import dashboardAPI from '../Http/api/dashboard';
import dashboardFactory from '../Factory/Dashboard';
import Modal from 'Store/Modals';
import Alert from 'Store/Alert';
import { history } from 'Store';
import partnerList from 'Factory/Partner';
import { TecnotreedigitalSales, TecnotreeAgentManagement,TTDamFormURL } from '../Http/axios';
import ParnerAPI from 'Http/api/Partner';
import masterdata from 'Http/api/masterdata';
import clearState from 'Store/Dashboard';
import WorkflowApi from 'Http/api/WorkflowApi';
import config from 'config';

import DocumnetsAPI from 'Http/api/documents';
import WorkFlowPayload from 'Factory/Worlflowpayload';
import dashboard from '../Http/api/dashboard';
import { LoadingSpin } from 'Features/Forms/LoadingSpin';

const getPotentialParnterList = createAsyncThunk(
  'dashboard/getPotentialParnterList',
  async (
    { limit = 10, offset = 0, searchValue = '', SearchQuery = '' },
    { dispatch }
  ) => {
    let data = await dashboardAPI.getDashboardDetails(
      limit,
      offset,
      searchValue,
      SearchQuery
    );

    let count = data.headers['x-count'];
    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      ),
      xCount: count
    };
  }
);
const getResellerPartners = createAsyncThunk(
  'dashboard/getResellerPartners',
  async (
    { limit = 10, offset = 0, searchValue = '', SearchQuery = '', setLoader },
    { dispatch }
  ) => {

    try {
      console.log(getResellerPartners,  'getResellerPartners')
      let data = await dashboardAPI.getPartnerReseller(
        limit,
        offset,
        searchValue,
        SearchQuery,
        setLoader
      )
  
      if(data) {
        let count = data?.headers['x-count'];
        console.log('count', count, data, "xxxxxlll");
        return {
          list: data?.data.sort(
            (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
          ),
          xCount: count
        };
      }
      else {
        return []
      }
    
    }
    catch(error) {
      
 console.log("xxxxx", error)

 return []
    }
 
  }
);

const getPotentialDealer = createAsyncThunk(
  'dashboard/getPotentialDealer',
  async (
    { limit = 10, offset = 0, searchValue = '', SearchQuery = '', setLoader },
    { dispatch }
  ) => {

    try {
      console.log(getResellerPartners,  'getResellerPartners')
      let data = await dashboardAPI.getPotentialDealer(
        limit,
        offset,
        searchValue,
        SearchQuery,
        setLoader
      )
  
      if(data) {
        let count = data?.headers['x-total-count'];
        console.log('count', count, data, "xxxxxlll");
        return {
          list: data?.data.sort(
            (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
          ),
          xCount: count
        };
      }
      else {
        return []
      }
    
    }
    catch(error) {
      
 console.log("xxxxx", error)

 return []
    }
 
  }
);

const getPartnerLead = createAsyncThunk(
  'dashboard/getPartnerLead',
  async (
    { limit = 10, offset = 0, searchValue = '', SearchQuery = '' },
    { dispatch }
  ) => {
    let data = await dashboardAPI.getPartnerLead(
      limit,
      offset,
      searchValue,
      SearchQuery
    );

    let count = data.headers['x-total-count'];
    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      ),
      xCount: count
    };
  }
);
const FilterByPartner = createAsyncThunk(
  'dashboard/FilterByPartner',
  async ({ payload }) => {    
    try {
      let data = await dashboardAPI._FilterByPartner(payload);
      let count = data.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } catch (err) {
      return [];
    }
  }
);
const FilterByTenant = createAsyncThunk(
  'dashboard/FilterByTenant',
  async ({ payload }) => {  
    try {
      let data = await dashboardAPI._FilterByTenant(payload);
      let count = data.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } catch (err) {
      return [];
    }
  }
);

const FilterByAgent = createAsyncThunk(
  'dashboard/FilterByAgent',
  async ({ payload }) => {
    try {
      let data = await dashboardAPI._FilterByAgent(payload);
      let count = data.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } catch (err) {
      return [];
    }
  }
);

const FilterByDealer = createAsyncThunk(
  'dashboard/FilterByDealer',
  async ({ payload }) => {
    try {
      let data = await dashboardAPI._FilterByDealer(payload);
      let count = data.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } catch (err) {
      return [];
    }
  }
);
const GetselfCareEnrolmentList = createAsyncThunk(
  'dashboard/GetselfCareEnrolmentList',
  // async (
  //   { limit = 10, offset = 0, searchValue = '', SearchQuery = '',setLoaderr },
  //   { dispatch }
  // ) => {
  //   let data = await dashboardAPI.SelfcareEnrolment(
  //     limit,
  //     offset,
  //     searchValue,
  //     SearchQuery,
  //     setLoaderr
  //   );

  //   let count = data.headers['x-count'];
  //   return {
  //     list: data?.data.sort(
  //       (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
  //     ),
  //     xCount: count
  //   };
  // }
  async (
    {setLoaderr, limit = 10, offset = 0, searchValue = '', SearchQuery = '' },
    { dispatch }
  ) => {
    let data = await dashboardAPI.SelfcareEnrolment(
      limit,
      offset,
      searchValue,
      SearchQuery,
      setLoaderr
    );

    let count = data.headers['x-count'];
    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      ),
      xCount: count
    };
  }
);

const GetSelfCareResellerEnrollmentList = createAsyncThunk(
  'dashboard/GetSelfCareResellerEnrollmentList',
  async (
    {setLoaderr, limit = 10, offset = 0, searchValue = '', SearchQuery = '' },
    { dispatch }
  ) => {
    let data = await dashboardAPI.ResellerSelfEnrolment(
      limit,
      offset,
      searchValue,
      SearchQuery,
      setLoaderr
    );

    let count = data.headers['x-count'];
    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      ),
      xCount: count
    };
  }

  // async ({setLoaderr}) => {
  //   let data = await dashboardAPI.ResellerSelfEnrolment(setLoaderr);
  //   let count = data.headers['x-count'];
  //     return {
  //       list: data?.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
  //       xCount: count
  //     };
  // }
);

const DeactiveAccount = createAsyncThunk(
  'dashboard/DeactiveAccount',
  async ({ payload }, { dispatch }) => {
    let data = await dashboardAPI.DeactiveAcc(payload);
    return data;
  }
);

const getTenantsList = createAsyncThunk(
  'dashboard/getTenantsList',
  async (
    { limit = 10, offset = 0, searchValue, SearchQuery },
    { dispatch }
  ) => {
    let data = await dashboardAPI.getTenants(
      limit,
      offset,
      searchValue,
      SearchQuery
    );
    let count = data.headers['x-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
);
const getMyTaskLIst = createAsyncThunk(
  'dashboard/getMyTaskLIst',
  async ({ limit, offset }) => {
    let res = await dashboardAPI.getMyTasks({ limit, offset });

    let xcount = res.headers['x-total-count'];
    return { data: res?.data, xcount };
  }
);

const showPartnerDialog = createAsyncThunk(
  'dashboard/showPartnerDialog',
  async (payload) => {
    const data = dashboardFactory.showPartnerDialogPayload(payload);
    return data;
    // return {
    //   open: true,
    //   payload,
    // };
  }
);
const hidePartnerDialog = createAsyncThunk(
  'dashboard/hidePartnerDialog',
  () => {
    return {
      open: false
    };
  }
);
const getPartnerActions = createAsyncThunk(
  'dashboard/getPartnerActions',
  async ({ formId, Status }) => {
    const data = dashboardAPI.getPartnerActions({ formId, Status });
    return data;
  }
);
const updatePartnerStatus = createAsyncThunk(
  'dashboard/updatePartnerStatus',
  async ({ ticketId, status, exeId, body, description }) => {
    const data = await dashboardAPI.updatePartnerStatus({ ticketId, status });
    // if ()
    if (data.taskInfoId !== undefined) {
      const data2 = await dashboardAPI.getPartnerExecutionResponse(exeId);
      if (data2.apiResponse.statusCodeValue === 200) {
        const data3 = await dashboardAPI.getPartnerExecutionProcess(
          data2,
          status,
          description
        );
      }
    }

    return data;
  }
);
const getPartnerExecutionResponse = createAsyncThunk('', async (exeId) => {
  const data = dashboardAPI.getPartnerExecutionResponse(exeId);
  return data;
});

const taskApprove = createAsyncThunk(
  'dashboard/taskApprove',
  async (
    { ticketId, status, exeId, body, description, type },
    { dispatch }
  ) => {
    const data = await dashboardAPI
      .updatePartnerStatus({ ticketId, status })
      .catch((err) => {});
    const data2 = await dashboardAPI.getPartnerExecutionResponse(exeId);

    await dashboardAPI.getPartnerExecutionProcess(
      data2,
      status,
      description.value
    );
    // if ()
    //   if (data.taskInfoId !== undefined) {
    //     const data2 = await dashboardAPI.getPartnerExecutionResponse(exeId);
    //   //   if (data2.apiResponse.statusCodeValue === 200) {
    //   //     // const data3 = await dashboardAPI.getPartnerExecutionProcess(
    //   //     //   data2,
    //   //     //   status,
    //   //     //   description
    //   //     // );
    //   //   }

    //   // } else {
    //   //   console.log('fail data');
    //   // }

    dispatch(Modal.close('Approval'));
    dispatch(Modal.close('TaskDetails'));
    dispatch(Modal.close('ProductList'));

    if (status === 'Reject') {
      dispatch(
        Alert.open({
          type: 'error',
          message: `${type}   Rejected   Successfully`
        })
      );
    } else {
      dispatch(
        Alert.open({
          type: 'Success',
          message: `${type}     Successfully`
        })
      );
    }

    await dispatch(getPotentialParnterList());
    await dispatch(getproductLists({ id: '' }));
    await dispatch(GetselfCareEnrolmentList());
    await dispatch(GetSelfCareResellerEnrollmentList());
    return data;
  }
  // return data;
);

const ContractList = createAsyncThunk(
  'dashboard/ContractList',
  async ({ type, id, typeOF }, { dispatch }) => {
    const data =
      // await dashboardAPI
      //   ._fetchPartnerContracts(id, 10, 0)
      //   .catch((err) => {});
      // console.log('New API', data);

      await dashboardAPI.getContractList(type, id).catch((err) => {});

    if (data.length > 0 && data[0]?.rowList?.length === 0) {
      dispatch(
        Alert.open({
          type: 'error',
          message: ` ${typeOF} contracts are not available`
        })
      );

      dispatch(Modal.close('contracts'));
    }

    return data;
  }
  // return data;
);

const PartnerContractsList = createAsyncThunk(
  'dashboard/partnerContractsList',
  async ({ type, id, typeOF }, { dispatch }) => {
    const data = await dashboardAPI
      ._fetchPartnerContracts(id, 10, 0)
      .catch((err) => {});

    let count = data?.headers['x-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
);

const shareNotification = createAsyncThunk(
  'dashboard/shareattachment',
  async ({ payload, contractid, statustype, type, id }, { dispatch }) => {
    const data = await dashboardAPI.shareattachment(payload).catch((err) => {});

    await dashboardAPI.UpdateStatus(contractid, statustype);

    await dispatch(ContractList({ type, id }));
    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Contract Shared Successfully'
      })
    );
    dispatch(Modal.close('ShareContract'));

    return data;
  }
  // return data;
);

const globalSeatch = createAsyncThunk(
  'dashboard/globalSeatch',
  async ({ value }, { dispatch }) => {
    const data = await dashboardAPI.GlobalSearch(value).catch((err) => {});

    return data;
  }
  // return data;
);

const SearchAddContract = createAsyncThunk(
  'dashboard/SearchAddContract',
  async ({ id, limit = 10, offset = 0, value, searchQuery, setLoader }) => {
    const data = await dashboardAPI
      .SearchPartnerContract(id, limit, offset, value, searchQuery, setLoader)
      .catch((err) => {});

    let count = data?.headers['x-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
  // return data;
);
const CustomerTickets = createAsyncThunk(
  'dashboard/customertickets',
  async ({ id, limit = 10, offset = 0, value, searchQuery, setLoader }) => {
    // console.log(id, 'idy', setLoader);
    const data = await dashboardAPI
      .CustomerTicket(id, limit, offset, value, searchQuery, setLoader)
      .catch((err) => {});

    let count = data?.headers['x-total-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
  // return data;
);
const FilterCustomerTickets = createAsyncThunk(
  'dashboard/filtercustomertickets',
  async ({ id, fromDate, toDate, limit, offset, setLoader }) => {
    // console.log(id, 'idy', setLoader);
    const data = await dashboardAPI
      .filterCustomerTicket(id, fromDate, toDate, limit, offset, setLoader)
      .catch((err) => {});

    let count = data?.headers['x-total-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
  // return data;
);

const getproductLists = createAsyncThunk(
  'dashboard/getproductLists',
  async ({ id, limit = 10, offset = 0, value, searchQuery, setLoader }) => {
    const data = await dashboardAPI
      .getProductdetails(id, limit, offset, value, searchQuery, setLoader)
      .catch((err) => {});

    let count = data?.headers['x-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
  // return data;
);

const getTenantLists = createAsyncThunk(
  'dashboard/getTenantLists',
  async ({ id, limit = 10, offset = 1, value, searchQuery, setLoader }) => {
    const data = await dashboardAPI
      .getTenantdetails(id, limit, offset, value, searchQuery, setLoader)
      .catch((err) => {});

    let count = data?.headers['x-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
  // return data;
);

const filterMyTask = createAsyncThunk(
  'dashboard/filterMyTask',
  async ({ fromDate, toDate, status, limit, offset }) => {
    const res = await dashboardAPI
      .filterBymytask(fromDate, toDate, status, limit, offset)
      .catch((err) => {});

    const xcount = res.headers['x-total-count'];

    return { data: res.data, xcount };
  }
  // return data;
);

const PartnerFilterByvalue = createAsyncThunk(
  'dashboard/PartnerFilterByvalue',
  async ({ fromDate, toDate, status }) => {
    const data = await dashboardAPI
      .filterByPartner(fromDate, toDate, status)
      .catch((err) => {});

    return data;
  }
  // return data;
);

const downloadContract = createAsyncThunk(
  'dashboard/downloadContract',
  async ({ url }, { dispatch }) => {
    if (url) {
      await DocumnetsAPI.Download_Preview(url, true).catch((err) => {});

      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Contract Downloaded Successfully.'
        })
      );
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: ' Download Failed'
        })
      );
    }

    return data;
  }
  // return data;
);

const contractLink = createAsyncThunk(
  'dashboard/contractLink',
  async ({ id }, { dispatch }) => {
    if (id) {
      await dashboardAPI.GenerateContractLink(id).catch((err) => {});

      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Contract Template Downloaded Successfully.'
        })
      );
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: ' Download Failed'
        })
      );
    }
  }
  // return data;
);

const orderTracking = createAsyncThunk(
  'dashboard/orderTracking',
  async ({ id, limit, offset, value, SearchQuery, setLoader }) => {
    console.log(SearchQuery, "havanna")
    let data = await dashboardAPI
      .OrderTrack(id, limit, offset, value, SearchQuery, setLoader)
      .catch((err) => {
        //  console.log('errr', err);
      });
    if (data?.headers) {
      let count = data?.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } else {
      return data;
    }
  }
);

const ManualOrderTracking = createAsyncThunk(
  'dashboard/manualorderTracking',
  async ({ limit = 10, offset = 1, id, value = '' }) => {
    let data = await dashboardAPI
      .ManualOrderTracking(id, limit, offset, value)
      .catch((err) => {
        //  console.log('errr', err);
      });
      console.log(data, "manual data")
    if (data?.headers) {
      let count = data?.headers['x-total-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } else {
      return data;
    }
  }
);


const FilterByorderTracking = createAsyncThunk(
  'dashboard/FilterByorderTracking',
  async ({ payload }) => {
    let data = await dashboardAPI
      ._FilterByorderTracking(payload)
      .catch((err) => {});
    if (data?.headers) {
      let count = data?.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } else {
      return data;
    }
  }
  // return data;
);

const getRequestList = createAsyncThunk(
  'dashboard/getRequestList',
  async ({ id, status, offset, limit }) => {
    let data = await dashboardAPI.getRequests(id, status, limit, offset).catch((err) => {});
    const payload = {
      xCount: parseInt( data?.headers['x-total-count']),
      data: data?.data
    }
    return payload;
  }
);

const searchRequestList = createAsyncThunk(
  'dashboard/getRequestList',
  async ({ id, limit = 10, offset = 0, value, searchQuery, setLoader }) => {
    let data = await dashboardAPI
      .searchRequestList(id, limit, offset, value, searchQuery, setLoader)
      .catch((err) => {});

    return data;
  }
);



const getPaymentlist = createAsyncThunk(
  'dashboard/getPaymentlist',
  async ({ id, searchQuery, searchValue  }) => {
    let data = await dashboardAPI.getTransaction(id,searchQuery, searchValue ).catch((err) => {});

    return data;
  }
);

const getproductAll = createAsyncThunk(
  'dashboard/getproductAll',
  async ({ id = '', limit = 10, offset = 1 }) => {
    const data = await dashboardAPI
      .productlistAll(id, limit, offset)
      .catch((err) => {});

    let count = data?.headers['x-count'];
    return {
      list: data?.data,
      xCount: count
    };
  }
  // return data;
);

const ProductsOverview = createAsyncThunk(
  'dashboard/ProductsOverview',
  async ({ id }) => {
    const data = await ParnerAPI.getProductDetails(id).catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    dispatch(clearState.clear());
    return data;
  }
  // return data;
);
const TenantsOverview = createAsyncThunk(
  'dashboard/TenantsOverview',
  async ({ id }) => {
    const data = await ParnerAPI.getTenantDetails(id).catch((err) => {});

    return data;
  }
  // return data;
);

const getPartneroverview = createAsyncThunk(
  'dashboard/getPartneroverview',
  async ({ url }, { dispatch }) => {
    dispatch(Modal.close('leadView'));
    const data = await dashboardAPI.getPartnerObj(url).catch((err) => {});

    let parnerDetails = partnerList.makesearchList(data);

    let makeObj = {
      details: parnerDetails.searchlist,
      mainlist: parnerDetails.list
    };

    history.push({
      pathname: '/digital-prm-web-ui/360',
      state: { detail: makeObj }
    });
    dispatch(Modal.close('PaymentConformation'));
    dispatch(Modal.close('contracts'));

    return data;
  }
  // return data;
);

const getTenantoverview = createAsyncThunk(
  'dashboard/getTenantoverview',
  async ({ url }, { dispatch }) => {
    dispatch(Modal.close('leadView'));
    const data = await dashboardAPI.getPartnerObj(url).catch((err) => {});

    let parnerDetails = partnerList.makeTenantsearchList(data);

    let makeObj = {
      details: parnerDetails.searchlist,
      mainlist: parnerDetails.list
    };

    history.push({
      pathname: '/digital-prm-web-ui/360',
      state: { detail: makeObj }
    });

    dispatch(Modal.close('PaymentConformation'));
    dispatch(Modal.close('contracts'));
    dispatch(clearState.clear());
    return data;
  }
  // return data;
);

const getUploadHistoryList = createAsyncThunk(
  'dashboard/getUploadHistoryList',
  async (
    { limit = 10, offset = 0, searchValue = '', SearchQuery = '' },
    { dispatch }
  ) => {
    let data = await dashboardAPI.getUploadHistory();

    let count = data.headers['x-count'];
    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      ),
      xCount: count
    };
  }
);

const getSearchUploadHistoryList = createAsyncThunk(
  'dashboard/getUploadHistoryList',
  async (
    { limit = 10, offset = 0, searchValue = '', SearchQuery = '' },
    { dispatch }
  ) => {
    let data = await dashboardAPI.getUploadSearchHistory(
      limit,
      offset,
      searchValue,
      SearchQuery
    );

    let count = data.headers['x-count'];
    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      ),
      xCount: count
    };
  }
);

const getProductoverview = createAsyncThunk(
  'dashboard/getProductoverview',
  async ({ url }, { dispatch }) => {
    dispatch(Modal.close('leadView'));
    const data = await dashboardAPI.getPartnerObj(url).catch((err) => {});

    let parnerDetails = partnerList.makeproductsearchList(data);

    let makeObj = {
      details: parnerDetails.searchlist,
      mainlist: parnerDetails.list
    };

    history.push({
      pathname: '/digital-prm-web-ui/360',
      state: { detail: makeObj }
    });

    return data;
  }
  // return data;
);

const getOverviewDetails = createAsyncThunk(
  'dashboard/getOverviewDetails',
  async ({ data }) => {
    let parnerDetails = partnerList.makeproductsearchList(data);

    let makeObj = {
      details: parnerDetails.searchlist,
      mainlist: parnerDetails.list
    };

    history.push({
      pathname: '/digital-prm-web-ui/360',
      state: { detail: makeObj }
    });
  }
  // return data;
);

const getInvoiceDetails = createAsyncThunk(
  'dashboard/getInvoiceDetails',
  async ({ id, searchQuery, searchValue,  offset, limit}) => {
    const data = await dashboardAPI.getInvoice(id, searchQuery, searchValue,  offset, limit).catch((err) => {});
    return {list: data?.data, xCount: data?.headers['x-total-count']};
    // return data;
  }
);

const Adjustment = createAsyncThunk(
  'dashboard/Adjustment',
  async ({ id, searchQuery, searchValue, offset, limit }) => {
    const data = await dashboardAPI.getAdjustment({id, searchQuery, searchValue, offset, limit}).catch((err) => {});
    console.log('adjustmentData',data)
    return {list: data?.data, xCount: data?.headers['x-total-count']};
    // return data;
  }
  );
  
  const getSettlement = createAsyncThunk(
    'dashboard/getSettlement',
    async ({ id, searchQuery, searchValue, offset, limit  }) => {
      const data = await dashboardAPI.getSettlementdetails({id, searchQuery, searchValue , offset, limit}).catch((err) => {});
      console.log('settlementData',data)
  return {list: data?.data, xCount: data?.headers['x-total-count']};
    // return data;
  }
);

const getTransaction = createAsyncThunk(
  'dashboard/getTransaction',
  async ({ id, searchQuery, searchValue , offset, limit }) => {
    const data = await dashboardAPI.paymentlist({id, searchQuery, searchValue, offset, limit}).catch((err) => {});
    return {list: data?.data, xCount: data?.headers['x-total-count']};
  }
);
const getUnsettlementBal = createAsyncThunk(
  'dashboard/getUnsettlementBal',
  async ({ id, searchQuery, searchValue  }) => {
    const data = await dashboardAPI._getUnsettlebalance(id, searchQuery, searchValue ).catch((err) => {});
    return data;
  }
);

const OnsubmitBilliginAdjustment = createAsyncThunk(
  'dashboard/OnsubmitBilliginAdjustment',
  async ({ body }, { dispatch }) => {
    const data = await dashboardAPI.workflowTrigger(body).catch((err) => {
      console.log(err, "ERRTESLA")
    });

    //  if(data.apiResponse.status=== "200 OK"){

    console.log(data, "infodataxxxx")
    dispatch(Modal.close('BillingAdjustment'));
    dispatch(Modal.close('InvoiceAdjustment'));

    dispatch(
      Modal.open({
        id: 'BillingConformation',
        context: {
          details: data
        }
      })
    );
    // }

    return data;
  }
  // return data;
);
const storeAllNotes = createAsyncThunk('dashboard/storeAllNotes', async () => {
  const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
  const data = await dashboard.getAllNotes(Loginuser.username).catch((err) => {
    err;
  });
  return data;
});

const getOrderdetails = createAsyncThunk(
  'dashboard/getOrderdetails',
  async ({ id }) => {
    const data = await dashboardAPI.Orderdetails(id).catch((err) => {});
    return data;
  }
  // return data;
);
const OrderSelfcareComplete = createAsyncThunk(
  'dashboard/OrderSelfcareComplete',
  async ({ payload, trackingid }, { dispatch }) => {
    LoadingSpin(true)
    await dashboardAPI.OrderCompletion(payload).catch((err) => {});
    let data = await dashboardAPI
      .orderCompletestatus(trackingid)
      .catch((err) => {});

    const payloadworkflow = {
      workflowId: '1644904123150',
      userId: '',
      userRole: '',

      executionModeStatus: false,
      async: false,
      Values: {
        accessToken: localStorage.getItem('ACCESS_TOKEN'),

        PARTNERID: payload?.partnerId,
        productName: payload?.productName,
        productId: payload?.productId,
        orderId: payload?.orderId
      }
    };
    await dashboardAPI.workflowTrigger(payloadworkflow);

    LoadingSpin(false)
    // dispatch(
    //   Alert.open({
    //     type: 'Success',
    //     message: 'Order completed Successfully.'
    //   })
    // );
    // dispatch(Modal.close('OrderDetails'));

    return data;
  }
  // return data;
);

const getPendingProdcutlist = createAsyncThunk(
  'dashboard/getPendingProdcutlist',
  async (
    { id, type, limit = 10, offset = 0, searchQuery, setLoader },
    { dispatch }
  ) => {
    //  let data = await dashboardAPI.PendingProdcutlist(id);
    let list = await dispatch(
      getproductLists({
        id: id,
        limit: 10,
        offset: 0,
        value: null,
        searchQuery,
        setLoader
      })
    );

    if (list.length <= 0 || !list?.payload) {
      dispatch(
        Alert.open({
          type: 'error',
          message: `${type} Products are not available`
        })
      );

      dispatch(Modal.close('ProductList'));
    }
    return data;
  }
);

const OnpayInoice = createAsyncThunk(
  'dashboard/OnpayInoice',
  async ({ invoiceID, payload, walletId, debitmoneyDetails }, { dispatch }) => {
    await dashboardAPI
      .dprmOnboarddebitMoney(walletId, { ...debitmoneyDetails })
      .catch((err) => {});

    let data = await dashboardAPI
      .getpayinvoice(invoiceID, { ...payload })
      .catch((err) => {});
    if (data) {
      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Invoice paid successfully.'
        })
      );
      dispatch(Modal.close('PayInvoiceDetails'));
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Invoice paid Failed Please try again'
        })
      );
    }

    return data;
  }
  // return data;
);

const DcmProductlist = createAsyncThunk(
  'dashboard/DcmProductlist',
  async ({ id }) => {
    let data = await dashboardAPI._DcmProductlist(id).catch((err) => {});

    return data;
  }
  // return data;
);

const workflowTrigger = createAsyncThunk(
  'dashboard/workflowTrigger',
  async ({ payload }, { dispatch }) => {
    let data = await WorkflowApi.ExcuteWorkflow(payload).catch((err) => {});

    if (!_.isEmpty(data)) {
      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Dcm Product Configuration successfully !!!'
        })
      );

      dispatch(Modal.close('ProductDetails'));

      await dispatch(getproductLists({ id: '' }));
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please Try again'
        })
      );
    }

    return data;
  }
  // return data;
);

const LaunchDCM = createAsyncThunk('dashboard/LaunchDCM', async () => {
  return window.open(
    `${config.dev.server.dlpm_base_url}/dclm-web-ui/`,
    '_self'
  );
});

const DynamicMenulist = createAsyncThunk(
  'dashboard/DynamicMenulist',
  async () => {
    let data = await dashboardAPI._MenuList().catch((err) => {});
  }
);

const VerifyOtp = createAsyncThunk(
  'dashboard/verifyOtp',
  async ({ payload, context }, { dispatch }) => {
    let data = await dashboardAPI._VerifyOtp(payload).catch((err) => {
      throw Error('Failed to reopen Lead. Try again.');
    });

    // console.log(payload, context, 'jamjam');
    if (data) {
      dispatch(
        Alert.open({
          type: 'success',
          message: 'Otp Verified Successfully !!!'
        })
      );
      dispatch(Modal.close('OtpVerification'));
      dispatch(
        Modal.open({
          id: 'bottomSheet',
          context: context
        })
      );
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please Try again '
        })
      );
    }

    const onTrriggerBtnClick = (data, sectionTitle, sectionIndex) => {};
  }
);

const VerifyOtpDashboard = createAsyncThunk(
  'dashboard/VerifyOtpDashboard',
  async ({ payload, context, fields }, { dispatch }) => {
   
    if(context?.dealerType ===  "subDealer" || context?.dealerType ===  "subDealerEmployee") {
      LoadingSpin(true)
    }
    const mymasterData = await masterdata.DprmMasterdata()

    console.log(mymasterData[0].masterData?.workflowIds?.agentMiniFormCreation
      , "roloandoee")
    console.log(context, "ccccccdddssd")
  
    // console.log(payload, context, fields, context.agentId, 'jamjam');
    let data = await dashboardAPI._VerifyOtp(payload).catch((err) => {
      throw Error('Failed to reopen Lead. Try again.');
    });
   
    if (data) {

      if(context?.dealerType ===  "subDealer" || context?.dealerType ===  "subDealerEmployee") {
        LoadingSpin(true)
      }
      else {
        dispatch(
          Alert.open({
            type: 'success',
            message: 'Otp Verified Successfully !!!'
          })
        );
      }
  
      dispatch(Modal.close('OtpVerification'));

      if (context.leadPartner) {
        const userData = JSON.parse(localStorage.getItem('USER'));
        const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
        let userName =
          localStorage.getItem('USER') &&
          JSON.parse(localStorage.getItem('USER')).sub;
        let userRole = localStorage.getItem('role');
        let Ebody = {};
        let newVal = {};

        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = context.workflowIds;
        Ebody['Values'] = { ...context.formStep };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['email'] = context.formStep.email.toUpperCase();
        Ebody['Values']['partnerRegNo'] =
          context.formStep.partnerRegNo.toUpperCase();
        Ebody['Values']['date'] = new Date();
        Ebody['Values']['userName'] = userData?.sub;
        Ebody['Values']['userId'] = Loginuser?.id;
        
        Ebody['Values']['subStatus'] = 'draft';
        Ebody['Values']['channel'] = 'DPRM';
        Ebody['Values']['Status'] = 'open';
        Ebody['Values']['leadId'] = context.agentId;
        Ebody['Values']['UploadDocuments'] = context.documents;
        Ebody['Values']['acceptanceStatus'] = 'open';
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            dispatch(
              Alert.open({
                type: 'success',
                message: 'Otp Verified Successfully !!!'
              })
            );

            history.push({
              pathname: '/digital-prm-web-ui/leadapproval',
              details: resp.data
            });
          })
          .catch((err) => {
            dispatch(
              Alert.open({
                type: 'error',
                message: 'Please Try again '
              })
            );
          });
        return;
      }

      if(context.formStep.agentCategory === "Dealer" || context?.dealerType) {

       if(context?.dealerType ===  "subDealer" || context?.dealerType ===  "subDealerEmployee") {
        LoadingSpin(true)
      }

        const userData = JSON.parse(localStorage.getItem('USER'));
        const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
        let userName =
          localStorage.getItem('USER') &&
          JSON.parse(localStorage.getItem('USER')).sub;
        let userRole = localStorage.getItem('role');
        let Ebody = {};
        let newVal = {};

        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = mymasterData[0].masterData?.workflowIds?.agentMiniFormCreation
        Ebody['Values'] = { ...context.formStep };
       
        Ebody['Values']['email'] = context?.formStep?.email.toUpperCase();
        Ebody['Values']['mobile'] = context?.phoneNumber;
        Ebody['Values']['level'] = context?.formType?.level;
        Ebody['Values']['pId'] = context?.nodeId || Loginuser?.id;
        Ebody['Values']['agentCat'] = context?.formStep?.agentCategory?.toUpperCase();
        Ebody['Values']['agentSubCat'] = context?.formStep?.agentSubCategory?.toUpperCase();
        Ebody['Values']['firstName'] = context?.formStep?.agentName
        Ebody['Values']['lastName'] = context?.formStep?.agentLastName;
        Ebody['Values']['dealerType'] = context?.dealerType || "dealer";
        Ebody['Values']['date'] = new Date();
        Ebody['Values']['userName'] = userData?.sub;
        Ebody['Values']['userId'] = Loginuser?.id;
        Ebody['Values']['agentUserId'] = Loginuser?.id;
        Ebody['Values']['subStatus'] = 'draft';
        Ebody['Values']['channel'] = 'DPRM';
        Ebody['Values']['Status'] = 'open';
        Ebody['Values']['agentId'] = context?.agentID,
        Ebody['Values']['acceptanceStatus'] = 'open';
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
       
        
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
           
            if(context?.dealerType ===  "subDealer" || context?.dealerType ===  "subDealerEmployee") {
              LoadingSpin(false)
              context?.getHierarchy()
              dispatch(
                Alert.open({
                  type: 'success',
                  message: `${context?.dealerType ===  "subDealer" ? "Sub Dealer" : "Sub Dealer Employee"} Successfully Created`
                })
              );
  
            }
            else {
              history.push({
                pathname: `/digital-prm-web-ui/`,
                state: {
                  TicketID: resp?.data?.notification?.agentId,
                  PartnerName: `${context.formStep.agentName}`,
                  userId: resp?.data?.notification?.id,
                  open: true
                }
              });
            }
            console.log(resp, "responso")
            // dispatch(
            //   Alert.open({
            //     type: 'success',
            //     message: 'Otp Verified Successfully !!!'
            //   })
            // );

            // history.push({
            //   pathname: '/digital-prm-web-ui/leadapproval',
            //   details: resp.data
            // });


           
     
            console.log(resp, "womenend")
          })
          .catch((err) => {
           
            console.log(err, "errorororoor")
            dispatch(
              Alert.open({
                type: 'error',
                message: 'Please Try again'
              })
            );
          });
        return;
      }
      if(context.agent) {
        const handleGenerateID = (values) => {
          TecnotreeAgentManagement.post('/partnership/generateId')
            .then((res) => {
             
              handleGenerateScore(res?.data?.id, values);
            })
            .catch((err) => {});
        };
      
  const handleGenerateScore = async (Id, values) => {
    try {
      const { data } = await TTDamFormURL.post(
        `creditscores/generateCreditScore?uniqueId=${Id}&ratId=RJJ5XZKYJ200&eventName=CustomerInfoCreditScoreCreationNotification`,
        {
          partnerType: values.agentCategory,
          subPartnerType: values.agentSubCategory
        }
      );
      handleRiskData(data?.currentScore, values, Id);
    } catch (error) {
    return error
    }
  };

  const handleRiskData = async (score, values, id) => {
   
    try {
      const { data } = await TecnotreedigitalSales.get(
        `masterdata/partnerRiskCategoryData?code=${score}`
      );
    
      sendData(values, data[0]?.riskCategoryData, id);
    } catch (error) {
    
     // console.log(error);
    }
  };


  const sendData = (values, riskCategory, id) => {
    console.log(values, riskCategory, id, "xccccccvmvmm")
    const payload = {
      firstName: values?.agentName,
      lastName: values?.agentLastName,
      // "middleName": data.middleName,
      // "givenName": "Vishwas",
      email: values?.email,
      agentPublicIdentier: values?.agentMSISDN,
      category: values?.agentCategory,
      subCategory: values?.agentSubCategory,

      '@type': "",
      nationalId: values?.NID_passport_refugee_Id
    };  



  if(payload && context.formType?.stepIdentity && context.formType?.formIdentity) {
    history.push({
      pathname: '/digital-prm-web-ui/agentForms',
      state: {
        formIdentity:context.formType?.formIdentity,
        // fields: fields,
        stepId: context.formType?.stepIdentity,
        agentId: id,
        agentForm: true,
        formFields: values,
        riskCategory
        // isFields: true
      }
    });

    
  }
  
  else {
    history.push({
      pathname: '/digital-prm-web-ui/agentForms',
      state: {
        formIdentity: "Reseller_Onboard",
        // fields: fields,
        stepId: "ResellerProfileCreation",
        agentId: id,
        agentForm: true,
        formFields: values,
        riskCategory
        // isFields: true
      }
    });
  }

 
    // history.push({
    //    pathname:`${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`
    // })

    // window.open(`${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`, '_blank').focus();
    let formName;
    // if (
    //   values?.agentSubCategory === 'EVDS' ||
    //   values?.agentSubCategory === 'RICA'
    // ) {
    //   formName = 'OnboardingUI';
    // } else if (values?.agentSubCategory === 'Ambassador') {
    //   formName = 'Ambassador_Onboard';
    // }

    

   
  };
  handleGenerateID(context.formStep)

   }

      if(!(context.agent) && !(context.leadPartner)) {
        setTimeout(() => {
          dispatch(Alert.close({ type: '', message: '' }));
          history.push({
            pathname: '/digital-prm-web-ui/forms',
            state: {
              // formIdentity: 'Partner_Profile',
              // fields: fields,
              // stepId: 'PartnerProfileCreation',
              // isFields: true
  
              formIdentity: context?.formStep?.SubCategory
                ? context?.formStep?.SubCategory?.formIdentity
                : 'Partner_Profile',
              fields: fields,
              stepId: context?.formStep?.SubCategory
                ? context?.formStep?.SubCategory?.stepIdentity
                : 'PartnerProfileCreation',
              isFields: true
            }
          });
        }, 1000);
      }

    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please Try again '
        })
      );
    }
  }
);

const Onsearch_LogTicket = createAsyncThunk(
  'dashboard/Onsearch_LogTicket',
  async ({ value }, { dispatch }) => {
    const data = await dashboardAPI.GlobalSearch(value).catch((err) => {});

    return data;
  }
  // return data;
);

const PartnerProducts_LogTicket = createAsyncThunk(
  'dashboard/PartnerProducts_LogTicket',
  async ({ id }) => {
    const data = await dashboardAPI.getProductdetails(id).catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);
//

const LoadAll_Partner_Reports = createAsyncThunk(
  'dashboard/Load_Reports',
  async () => {
    const data = await dashboardAPI._parterReports().catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const getPartnerCounts = createAsyncThunk(
  'dashboard/getPartnerCounts',
  async ({ payload }) => {
    const data = await dashboardAPI._partnerCounts(payload).catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const AllgetPartnerCounts = createAsyncThunk(
  'dashboard/AllgetPartnerCounts',
  async () => {
    const data = await dashboardAPI._getCounts().catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const backOfficeDashboardCounts = createAsyncThunk(
  'dashboard/backOfficeDashboardCounts',
  async () => {
    const groups = JSON.parse(localStorage.getItem('loginUser'));
    const data = await dashboardAPI
      ._getBackOfficeCounts(groups)
      .catch((err) => {});

    return data;
  }
);

const PartnerSalesSummarygraph = createAsyncThunk(
  'dashboard/PartnerSalesSummarygraph',
  async ({ type }) => {
    const data = await dashboardAPI._partnerGraph(type).catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const PartnerSalesSummarygraphFilter = createAsyncThunk(
  'dashboard/PartnerSalesSummarygraphFilter',
  async ({ type, payload }) => {
    const data = await dashboardAPI
      ._partnerGraphfilter(type, payload)
      .catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const getOrderCounts = createAsyncThunk(
  'dashboard/getOrderCounts',
  async ({ payload }) => {
    const data = await dashboardAPI._OrderCounts(payload).catch((err) => {});

    return data;
  }
);

const getAllorderCounts = createAsyncThunk(
  'dashboard/getAllorderCounts',
  async () => {
    const data = await dashboardAPI._getOrderCounts().catch((err) => {});

    return data;
  }
);

const SendSdkTOCustomer = createAsyncThunk(
  'dashboard/getAllorderCounts',
  async (
    {
      payload,
      contractid,
      statustype,
      type,
      id,
      notificationPayload,
      productDetails
    },
    { dispatch }
  ) => {
    const data = await dashboardAPI
      ._SendSdkTOCustomer(payload)
      .catch((err) => {});
    await dashboardAPI.UpdateStatus(contractid, statustype);
    await WorkflowApi.ExcuteWorkflow(
      WorkFlowPayload.shareContractWorkFlowPayload(
        notificationPayload,
        contractid,
        productDetails
      )
    );
    // await dispatch(ContractList({ type, id }));
    await dispatch(PartnerContractsList({ id }));
    dispatch(Modal.close('ShareContract'));
    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Contract Shared Successfully'
      })
    );

    return data;
  }
);
const validateAgent = createAsyncThunk(
  'agent/validateAgent',
  async (
    { payload, formIdentity, stepId, agentId, formFields, riskCategory },
    { dispatch }
  ) => {
      
    try {
      const res = await dashboardAPI.validateAgent({ payload }).catch(() => {
        throw Error('Failed to validate agent');
      });
  
      if (res?.data?.inValidMsisdnss) {
       
        dispatch(
          Alert.open({
            type: 'error',
            message: 'Invalid Msisdn'
          })
        );
  
        // window.location.replace(
        //   `${config.dev.server.dclm_base_url}/dprm-agent-web-ui/`
        // );
      } else {
        history.push({
          pathname: '/digital-prm-web-ui/agentForms',
          state: {
            formIdentity: formIdentity,
            // fields: fields,
            stepId: stepId,
            agentId: agentId,
            agentForm: true,
            formFields: formFields,
            riskCategory
            // isFields: true
          }
        });
      }
      return data;
    }

    catch(error) {
     
      console.log(error, "herrxxxx")
    }
   
    
  }
);



const createAgentId = createAsyncThunk('agent/createAgentId', async () => {
  return dashboardAPI.createAgentId().catch(() => {
    throw Error('Failed to generate agent id');
  });
});

const fetchStatusProducts = createAsyncThunk(
  'popupTable/getProduct',
  async ( {status,offset,key} ) => {
      const  data  = await dashboardAPI.fetchProduct(status, offset);
      return {data,key};
  }
);


export default {
  storeAllNotes,
  getproductAll,
  Adjustment,
  getInvoiceDetails,
  getSettlement,
  getTransaction,
  getRequestList,
  PartnerFilterByvalue,
  contractLink,
  filterMyTask,
  getTenantLists,
  getproductLists,
  globalSeatch,
  SearchAddContract,
  searchRequestList,
  shareNotification,
  getPotentialParnterList,
  getResellerPartners,
  getMyTaskLIst,
  showPartnerDialog,
  hidePartnerDialog,
  getPartnerActions,
  updatePartnerStatus,
  taskApprove,
  getPartnerExecutionResponse,
  ContractList,
  downloadContract,
  orderTracking,
  contractLink,
  getPaymentlist,
  ProductsOverview,
  TenantsOverview,
  getPartneroverview,
  getTenantoverview,
  getProductoverview,
  OnsubmitBilliginAdjustment,
  getOrderdetails,
  OrderSelfcareComplete,
  getTenantsList,
  getPendingProdcutlist,
  OnpayInoice,
  getOverviewDetails,
  GetselfCareEnrolmentList,
  GetSelfCareResellerEnrollmentList,
  DcmProductlist,
  workflowTrigger,
  LaunchDCM,
  DynamicMenulist,
  VerifyOtp,
  Onsearch_LogTicket,
  PartnerProducts_LogTicket,
  VerifyOtpDashboard,
  LoadAll_Partner_Reports,
  getPartnerCounts,
  AllgetPartnerCounts,
  PartnerSalesSummarygraph,
  PartnerSalesSummarygraphFilter,
  getAllorderCounts,
  getOrderCounts,
  FilterByPartner,
  FilterByorderTracking,
  FilterByTenant,
  FilterByAgent,
  backOfficeDashboardCounts,
  SendSdkTOCustomer,
  validateAgent,
  createAgentId,
  PartnerContractsList,
  CustomerTickets,
  FilterCustomerTickets,
  getPartnerLead,
  getUploadHistoryList,
  getSearchUploadHistoryList,
  getUnsettlementBal,
  ManualOrderTracking,
  getPotentialDealer,
  FilterByDealer,
  fetchStatusProducts
};
