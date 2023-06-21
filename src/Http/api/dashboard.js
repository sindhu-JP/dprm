import {
  TecnotreedigitalSales,
  TecnotreeProduct,
  Tecnotreewallet,
  Tecnotreerelatedpaty,
  TecnotreeContractMangement,
  TecnotreeAgentManagement,
  Productpromotion
} from './../axios';

import Factory from 'Factory/Partner';
import masterdata from 'lib/utils/masterdata';
// import { Masterdata } from 'lib/utils';
import QueryString from 'Utils/QueryString';

//  fetch potential partners list
const getTenants = async (limit, offset, searchValue, SearchQuery) => {
  let endPoint = ``;

  if (SearchQuery && SearchQuery?.name === 'Email') {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.PrimaryContactDetails.EMAIL_ID=${searchValue}&limit=${10}&offset=${0}`;
  } else if (SearchQuery && SearchQuery?.name === `Mobile`) {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.PrimaryContactDetails.MOBILE_NUMBER=${searchValue}&limit=${10}&offset=${0}`;
  } else {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&${QueryString.queryObj(
      {
        limit: limit,
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue
      }
    )}&offset=${offset}`;
  }
  const data = await TecnotreedigitalSales.get(endPoint).then((res) => res);
  return data;
};

const getSuspendTenants = async (limit, offset, searchValue, SearchQuery) => {
  let endPoint = ``;

  if (SearchQuery && SearchQuery?.name === 'Email') {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.PrimaryContactDetails.EMAIL_ID=${searchValue}&limit=${10}&offset=${0}`;
  } else if (SearchQuery && SearchQuery?.name === `Mobile`) {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.PrimaryContactDetails.MOBILE_NUMBER=${searchValue}&limit=${10}&offset=${0}`;
  } else {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.TenantDetails.Onboarding_Status=ACTIVE&${QueryString.queryObj(
      {
        limit: limit,
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue
      }
    )}&offset=${offset}`;
  }
  const data = await TecnotreedigitalSales.get(endPoint).then((res) => res);
  return data;
};

const getRevokeTenants = async (limit, offset, searchValue, SearchQuery) => {
  let endPoint = ``;

  if (SearchQuery && SearchQuery?.name === 'Email') {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.PrimaryContactDetails.EMAIL_ID=${searchValue}&limit=${10}&offset=${0}`;
  } else if (SearchQuery && SearchQuery?.name === `Mobile`) {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.PrimaryContactDetails.MOBILE_NUMBER=${searchValue}&limit=${10}&offset=${0}`;
  } else {
    endPoint = `search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&TenantProfileCreation.TenantDetails.Onboarding_Status=SUSPENDED&${QueryString.queryObj(
      {
        limit: limit,
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue
      }
    )}&offset=${offset}`;
  }
  const data = await TecnotreedigitalSales.get(endPoint).then((res) => res);
  return data;
};

const _FilterByTenant = async (payload) => {
  try {
    let endPoint = '';
    const TenantObj = {
      limit: payload.limit,
      offset: payload.offset === 0 ? '0' : payload.offset.toString(),

      'TenantProfileCreation.TenantDetails.Onboarding_Status': payload?.status
    };
    if (payload.fromDate && payload.toDate && !payload.status) {
      endPoint = `/search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&createdDate>${
        payload.fromDate
      }&createdDate<${payload.toDate}&${QueryString.queryObj(TenantObj)}`;
    } else if (payload.fromDate && payload.toDate && payload.status) {
      endPoint = `/search/Tenant_Partner_Profile?createdDate>${
        payload.fromDate
      }&createdDate<${payload.toDate}&${QueryString.queryObj(TenantObj)}`;
    } else if (payload.status) {
      endPoint = `/search/Tenant_Partner_Profile?${QueryString.queryObj(
        TenantObj
      )}`;
    }
    const data = await TecnotreedigitalSales.get(endPoint)
      .then((res) => res)
      .catch((err) => {
        // console.log(err, 'filterr');
      });
    return data;
  } catch (err) {
    // console.log(err, 'errorccc');
    return [];
  }

};
const _FilterByAgent = async (payload) => {
  console.log('payload', payload);
  try {
    let endPoint = '';
    const AgentObj = {
      limit: payload.limit,
      'ResellerProfileCreation.AgentDetails.Onboarding_Status': payload?.status?.toUpperCase()
    };

    const pendingAgentObj = {
      limit: payload.limit,
      'ResellerProfileCreation.status': payload?.status?.toUpperCase()
    }

    if (payload.fromDate && payload.toDate && !payload.status) {
      endPoint = `/search/Reseller_Onboard?createdDate>${
        payload.fromDate
      }&createdDate<${payload.toDate}&${QueryString.queryObj(AgentObj)}&offset=${payload.offset}`;
    } else if (payload.fromDate && payload.toDate && payload.status) {
      if (payload.status.toLowerCase() === 'pending' || payload.status.toLowerCase() === 'rejected') {
        endPoint = `/search/Reseller_Onboard?createdDate>${
          payload.fromDate
        }&createdDate<${payload.toDate}&${QueryString.queryObj(pendingAgentObj)}&offset=${payload.offset}`;
      } else {
        endPoint = `/search/Reseller_Onboard?createdDate>${
          payload.fromDate
        }&createdDate<${payload.toDate}&${QueryString.queryObj(AgentObj)}&offset=${payload.offset}`;
      }
    } else if (payload.status) {
        if (payload.status.toLowerCase() === 'pending' || payload.status.toLowerCase() === 'rejected') {
        endPoint = `/search/Reseller_Onboard?${QueryString.queryObj(pendingAgentObj)}&offset=${payload.offset}`;
      } else {
        // endPoint = `/search/Reseller_Onboard?createdDate>${
        //   payload.fromDate
        // }&createdDate<${payload.toDate}&${QueryString.queryObj(AgentObj)}&offset=${payload.offset}`;
        endPoint = `/search/Reseller_Onboard?ResellerProfileCreation.status=Approved&${QueryString.queryObj(
        AgentObj
      )}&offset=${payload.offset}`;
      }
    }

    const data = await TecnotreedigitalSales.get(endPoint)
      .then((res) => res)
      .catch((err) => {
      });
  console.log('data', data);
    return data;
  } catch (err) {
    return [];
  }
};
const _FilterByDealer = async (payload) => {
  console.log('payload', payload);
  // https://dclm-mmp.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digita
  // l-partnership-management-back-end-dynamic-forms/v1/users
  // ?userType=dealer,agent&createdDate%3E2023-05-18T00:00:00.00
  // 0Z&createdDate%3C2023-05-19T24:00:00.000Z&sort=-createdDate&status=Active&limit=10&offset=0

  try {
    let endPoint = '';
    const AgentObj = {
      limit: payload.limit,
      'status': payload?.status?.toUpperCase()
    };

    const pendingAgentObj = {
      limit: payload.limit,
      'status': payload?.status?.toUpperCase()
    }

    if (payload.fromDate && payload.toDate && !payload.status) {
      users

      endPoint = `/user?userType=dealer,agent&createdDate>${
        payload.fromDate
      }&createdDate<${payload.toDate}&${QueryString.queryObj(AgentObj)}&offset=${payload.offset}`;
    } else if (payload.fromDate && payload.toDate && payload.status) {
      if (payload.status.toLowerCase() === 'pending' || payload.status.toLowerCase() === 'rejected') {
        endPoint = `/user?userType=dealer,agent&createdDate>${
          payload.fromDate
        }&createdDate<${payload.toDate}&${QueryString.queryObj(pendingAgentObj)}&offset=${payload.offset}`;
      } else {
        endPoint = `/user?userType=dealer,agent&createdDate>${
          payload.fromDate
        }&createdDate<${payload.toDate}&${QueryString.queryObj(AgentObj)}&offset=${payload.offset}`;
      }
    } else if (payload.status) {
        if (payload.status.toLowerCase() === 'pending' || payload.status.toLowerCase() === 'rejected') {
        endPoint = `/users?userType=dealer,agent&${QueryString.queryObj(pendingAgentObj)}&offset=${payload.offset}`;
      } else {
        // endPoint = `/search/Reseller_Onboard?createdDate>${
        //   payload.fromDate
        // }&createdDate<${payload.toDate}&${QueryString.queryObj(AgentObj)}&offset=${payload.offset}`;
        endPoint = `/users?userType=dealer,agent&limit=10&offset=${payload.offset}`;
      }
    }

    const data = await TecnotreedigitalSales.get(endPoint)
      .then((res) => res)
      .catch((err) => {
      });
  console.log('data', data);
    return data;
  } catch (err) {
    return [];
  }
};
const SelfcareEnrolment = async (limit, offset, searchValue, SearchQuery, setLoaderr) => {
  setLoaderr(true);
  const data = await TecnotreedigitalSales.get(
    `/submit/Self_Enrolment_Form?limit=${limit}&offset=${offset}`
  )
  // .then((res) => res);
  .then((res) => {
    console.log(res, 'resttttter');
    setLoaderr(false);
    return res;
  });
  // res.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  return data;
};

const ResellerSelfEnrolment = async (limit, offset, searchValue, SearchQuery, setLoaderr) => {
  setLoaderr(true);
  const data = await TecnotreedigitalSales.get(
    `/submit/Reseller_Self_Enrolment?limit=${limit}&offset=${offset}`
  )
  // .then((res) => res);
  .then((res) => {
    console.log(res, 'resttttterSelffff');
    setLoaderr(false);
    return res;
  });
  // res.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  return data;
    // (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)};
};

const getDashboardDetails = async (limit, offset, searchValue, SearchQuery) => {
  console.log('check');
  const data = await TecnotreedigitalSales.get(
    `/search/Partner_Profile?PartnerProfileCreation.status=Approved&${QueryString.queryObj(
      {
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue,
        limit: limit
      }
    )}&offset=${offset}`
  ).then((res) => res);
  return data;
};
const getPartnerReseller = async (limit, offset, searchValue, SearchQuery, setLoader) => {
  try {
   setLoader && setLoader(true)
    const data = await TecnotreedigitalSales.get(
      // "search/Reseller_Onboard?ResellerProfileCreation.status=Approved&&limit=10"
      `/search/Reseller_Onboard?ResellerProfileCreation.status=Approved&${QueryString.queryObj(
        {
          [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue,
           limit
        }
      )}&offset=${offset}`
    )
   setLoader && setLoader(false)
    console.log('data', data);
    return data;
  }

  catch(error) {
    console.log(error?.response, "errrrox")
    return []
  }
};

const getPotentialDealer = async (limit, offset, searchValue, SearchQuery, setLoader) => {
  try {
   setLoader && setLoader(true)
    const data = await TecnotreedigitalSales.get(
      // "search/Reseller_Onboard?ResellerProfileCreation.status=Approved&&limit=10"
      `/users?sort=-createdDate&userType=dealer,agent&${QueryString.queryObj(
        {
          [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue,
           limit
        }
      )}&offset=${offset}`
    )
   setLoader && setLoader(false)
    console.log('data', data);
    return data;
  }

  catch(error) {
    console.log(error?.response, "errrrox")
    return []
  }

};

const getPartnerLead = async (limit, offset, searchValue, SearchQuery) => {
  console.log('SearchQuery', SearchQuery)
  const query = SearchQuery && searchValue ? `&${SearchQuery}=${searchValue}` : '';
  console.log('query',query)
  let endpoint = `/leadPartner?sort=-createdDate${query}&offset=${offset}&limit=${limit}`;
  // if (SearchQuery === 'l eadId') {
  //   endpoint = `/leadPartner?sort=-createdDate&offset=${offset}&limit=${limit}`;
  // } else {
  //   endpoint = `/leadPartner?sort=-createdDate&offset=${offset}&limit=${limit}&status=Lead${query}`;
  // }
  const data = await TecnotreedigitalSales.get(endpoint).then((res) => res);
  console.log('dataLoaded', data);
  return data;
};



const FilterLead = async (payload) => {
  console.log(payload,'payloadpayloadpayloadpayload')
  let endPoint = '';
  const PartnerObj = {
    limit: payload.limit,
    // offset:payload.offset,
    'PartnerProfileCreation.PartnerDetails.Onboarding_Status': payload?.status
  };
  if (payload.fromDate && payload.toDate && !payload.status) {
    endPoint = `/leadPartner?sort=-createdDate&createdDate>${payload.fromDate}&createdDate<${payload.toDate}&offset=${payload.offset}&limit=${payload.limit}${payload?.status ? `&status=${payload?.status}`  : ''}`;
  } else if (payload.fromDate && payload.toDate && payload.status) {
    endPoint = `/leadPartner?sort=-createdDate&createdDate>${payload.fromDate}&createdDate<${payload.toDate}&offset=${payload.offset}&limit=${payload.limit}${payload?.status ? `&status=${payload?.status}`  : ''}`;
  }

  const data = await TecnotreedigitalSales.get(endPoint)
    .then((res) => res)
    .catch((err) => err);

  return data;
};



const getSuspensionPartners = async (
  limit,
  offset,
  searchValue,
  SearchQuery
) => {
  const data = await TecnotreedigitalSales.get(
    `/search/Partner_Profile?PartnerProfileCreation.status=Approved&PartnerProfileCreation.PartnerDetails.Onboarding_Status=ACTIVE&${QueryString.queryObj(
      {
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue,
        limit: limit
      }
    )}&offset=${offset}`
  ).then((res) => res);
  return data;
};

const getRevokePartners = async (limit, offset, searchValue, SearchQuery) => {
  const data = await TecnotreedigitalSales.get(
    `/search/Partner_Profile?PartnerProfileCreation.status=Approved&PartnerProfileCreation.PartnerDetails.Onboarding_Status=SUSPENDED&${QueryString.queryObj(
      {
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue,
        limit: limit
      }
    )}&offset=${offset}`
  ).then((res) => res);
  return data;
};

const getManaualCommision = async (limit, offset, searchValue, SearchQuery) => {
  const data = await TecnotreedigitalSales.get(
    `/search/Partner_Profile?PartnerProfileCreation.status=Approved&PartnerProfileCreation.PartnerDetails.Onboarding_Status=ACTIVE&${QueryString.queryObj(
      {
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : searchValue,
        limit: limit
      }
    )}&offset=${offset}`
  ).then((res) => res);
  return data;
};

const _FilterByPartner = async (payload) => {
  let endPoint = '';
  const PartnerObj = {
    limit: payload.limit,
    // offset:payload.offset,
    'PartnerProfileCreation.PartnerDetails.Onboarding_Status': payload?.status
  };
  if (payload.fromDate && payload.toDate && !payload.status) {
    endPoint = `/search/Partner_Profile?PartnerProfileCreation.status=Approved&createdDate>${
      payload.fromDate
    }&createdDate<${payload.toDate}&${QueryString.queryObj(
      PartnerObj
    )}&offset=${payload.offset}`;
  } else if (payload.fromDate && payload.toDate && payload.status) {
    endPoint = `/search/Partner_Profile?createdDate>${
      payload.fromDate
    }&createdDate<${payload.toDate}&${QueryString.queryObj(
      PartnerObj
    )}&offset=${payload.offset}`;
  } else if (payload.status) {
    endPoint = `/search/Partner_Profile?${QueryString.queryObj(
      PartnerObj
    )}&offset=${payload.offset}`;
  }
  const data = await TecnotreedigitalSales.get(endPoint)
    .then((res) => res)
    .catch((err) => err);
  return data;
};

const _FilterByorderTracking = async (payload) => {
  const PartnerObj = {
    limit: payload.limit,
    // offset:  payload.offset,
    status: payload?.status
  };
  let endPoint = '';
  if (payload.fromDate && payload.toDate && !payload.status) {
    endPoint = `/orderTracking?sort=-createdDate&createdDate>${QueryString.queryObj(
      PartnerObj
    )}&offset=${payload.offset}`;
  } else if (payload.fromDate && payload.toDate && payload.status) {
    endPoint = `/orderTracking?sort=-createdDate&createdDate>${
      payload.fromDate
    }&createdDate<${payload.toDate}&${QueryString.queryObj(
      PartnerObj
    )}&offset=${payload.offset}`;
  } else if (payload.status) {
    endPoint = `/orderTracking?sort=-createdDate&${QueryString.queryObj(
      PartnerObj
    )}&offset=${payload.offset}`;
  }
  const data = await TecnotreedigitalSales.get(endPoint).then((res) => res);
  return data;
};

// fetch my tasks list
const getMyTasks = async ({ limit = 10, offset = 0 }) => {
  const groups = JSON.parse(localStorage.getItem('loginUser'));

  const groupId = groups.groupId.join(',');

  const data = await TecnotreedigitalSales.get(
    `/manualtask?limit=${limit}&offset=${offset}`
    // &customerInfo.groupId=${groupId}&sort=-createdDate`
  ).then((res) => res);
  return data;
};

const getPartnerActions = async (payload) => {
  const data = await TecnotreedigitalSales.get(
    `/formIdentity?formIdentity=${payload.formId}&status=${payload.Status}`
  ).then((res) => res.data);
  return data;
};
const updatePartnerStatus = async (payload) => {
  let body = { status: payload.status };

  const data = await TecnotreedigitalSales.patch(
    `/manualtask/${payload.ticketId}`,
    body
  ).then((res) => res.data);
  return data;
};
const getPartnerExecutionResponse = async (exeId) => {
  const data = await TecnotreedigitalSales.get(
    `/RBAC/get_executionResponse/${exeId}`
  ).then((res) => res.data);
  return data;
};
const getPartnerExecutionProcess = async (body, status, description) => {
  // get the logged in user details
  let managerEmail;
  let managerName;
  let managerMobile;
  var retrievedObject = localStorage.getItem('USER');
  managerEmail = JSON.parse(retrievedObject).email;
  managerName = JSON.parse(retrievedObject).sub;
  managerMobile = JSON.parse(retrievedObject).mobile;
  body.Values.Description = description;
  body.Values.MANAGER_EMAIL = managerEmail;
  body.Values.MANAGER_NO = managerMobile;
  body.Values.acceptanceStatus = status;

  let payload = {
    ...body,
    acceptanceStatus: status,
    async: false
  };
  const data = await TecnotreedigitalSales.post(
    `/bpmn/executeProcess`,
    payload
  ).then((res) => res.data);
  return data;
};

const getContractList = async (type, id) => {
  const data = await TecnotreedigitalSales.get(
    `/list/${type}?Partner_ID=${id}`
  ).then((res) => res.data);
  return data;
};

const SearchPartnerContract = async (
  id,
  limit,
  offset,
  value,
  searchQuery,
  setLoader
) => {
  try {
    setLoader(true);
    if (id.substring(0, 2) === 'PR') {
      const data = await TecnotreedigitalSales.get(
        `search/Add_Contract?${
          searchQuery.code
            ? searchQuery.code
            : 'AddContractFor.ContractInformation.PRODUCT_ID'
        }=${value ? value : id}&${QueryString.queryObj({
          limit: limit
        })}&offset=${offset}`
      ).then((res) => res);
      setLoader(false);
      return data;
    }
    const data = await TecnotreedigitalSales.get(
      `search/Add_Contract?${
        searchQuery.code
          ? searchQuery.code
          : 'AddContractFor.ContractInformation.Partner_ID'
      }=${value ? value : id}&${
        id ? `AddContractFor.ContractInformation.Partner_ID=${id}` : ''
      }&${QueryString.queryObj({
        limit: limit
      })}&offset=${offset}`
    ).then((res) => res);
    setLoader(false);
    return data;
  } catch (err) {
    console.log(err, 'error');
  }
};

const CustomerTicket = async (
  id,
  limit,
  offset,
  value,
  searchQuery,
  setLoader
) => {
  //console.log(value, 'value');
  let isSearch =
    searchQuery.code && value ? `${searchQuery.code}=${value}` : '';
  try {
    setLoader(true);

    const data = await TecnotreedigitalSales.get(
      `productFeedBack?productId=${id}${isSearch}&offset=${offset}&limit=${limit}`
    ).then((res) => res);
    setLoader(false);
    return data;
  } catch (err) {
    return err;
    // console.log(err, 'error');
  }
};

const filterCustomerTicket = async (
  id,
  fromDate,
  toDate,
  limit,
  offset,
  setLoader
) => {
  try {
    setLoader(true);
    let endPoint = `productFeedBack?productId=${id}&sort=-createdDate&createdDate>=${fromDate}&createdDate<=${toDate}&limit=${limit}&offset=${offset}`;

    const data = await TecnotreedigitalSales.get(endPoint).then((res) =>
      res.status === 200 ? res : null
    );
    setLoader(false);
    return data;
  } catch (err) {
    //console.log(err, 'error');
    return err;
  }
};
const _fetchPartnerContracts = async (partnerID, limit, offset) => {
  const data = await TecnotreedigitalSales.get(
    `search/Add_Contract?AddContractFor.ContractInformation.Partner_ID=${partnerID}&limit=${limit}&offset=${offset}`
  ).then((res) => res);
  return data;
};

const shareattachment = async (payload) => {
  return await TecnotreeProduct.post(
    '/notification/triggerNotificationForEmailAttachment',
    payload
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const UpdateStatus = async (contractid, statustype) => {
  return await TecnotreedigitalSales.patch(
    `/dsales/updateCollection/Add_Contract/AddContractFor/ContractInformation/CONTRACT_ID/${contractid}?${statustype}=yes&AddContractFor.ContractInformation.Contract_Current_Status=Pending_Acceptance`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const GlobalSearch = async (value) => {
  return await TecnotreedigitalSales.get(`/searchindex?search=${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const getProductdetails = async (
  id,
  limit,
  offset,
  value,
  searchQuery,
  setLoader
) => {
  if (id) {
    setLoader(true);
    return await TecnotreedigitalSales.get(
      `/search/Add_Product?${
        searchQuery.code
          ? searchQuery.code
          : 'AddProduct.ProductDetails.Partner_ID'
      }=${value ? value : id}&${
        id ? `AddProduct.ProductDetails.Partner_ID=${id}` : ''
      }&${QueryString.queryObj({
        limit: limit
      })}&offset=${offset}`
    )
      .then((res) => {
        setLoader(false);

        return res ? res : null;
      })
      .catch((err) => null);
  }
  // else {
  //   return await TecnotreedigitalSales.get(
  //     `/search/Add_Product?AddProduct.status=Approved&${QueryString.queryObj(
  //       {
  //         limit: limit,
  //         offset: offset,
  //         value: value
  //       })}`
  //   )
  //     .then((res) => (res ? res : null))
  //     .catch((err) => null);
  // }
};

const getTenantdetails = async (
  id,
  limit,
  offset,
  value,
  searchQuery,
  setLoader
) => {
  setLoader(true);
  return await TecnotreedigitalSales.get(
    `/search/Tenant_Partner_Profile?TenantProfileCreation.status=Approved&${
      searchQuery.code
        ? searchQuery.code
        : 'TenantProfileCreation.TenantDetails.Partner_ID'
    }=${value ? value : id}&${
      id ? `TenantProfileCreation.TenantDetails.Partner_ID=${id}` : ''
    } &${QueryString.queryObj({
      limit: limit
      // offset: 0,
    })}&offset=${offset}`
  )
    .then((res) => {
      {
        setLoader(false);
        return res.status === 200 ? res : null;
      }
    })
    .catch((err) => null);
};

const filterBymytask = async (fromDate, toDate, status, limit, offset) => {
  const groups = JSON.parse(localStorage.getItem('loginUser'));

  const groupId = groups.groupId.join(',');
  let endPoint = '';
  if (fromDate && toDate && !status) {
    endPoint = `manualtask?createdDate>=${fromDate}&createdDate<=${toDate}&limit=${limit}&offset=${offset}&customerInfo.groupId=${groupId}&sort=-createdDate`;
  } else if (fromDate && toDate && status) {
    endPoint = `manualtask?createdDate>=${fromDate}&createdDate<=${toDate}&status=${status}&limit=${limit}&offset=${offset}&customerInfo.groupId=${groupId}&sort=-createdDate`;
  } else if (status) {
    endPoint = `manualtask?status=${status}&limit=${limit}&offset=${offset}&customerInfo.groupId=${groupId}&sort=-createdDate`;
  }
  return await TecnotreedigitalSales.get(endPoint)
    .then((res) => (res.status === 200 ? res : null))
    .catch((err) => null);
};

const filterByPartner = async (fromDate, toDate, status) => {
  let endPoint = '';
  if (fromDate && toDate) {
    endPoint = `/search/Partner_Profile?PartnerProfileCreation.createdDate>=${fromDate}&PartnerProfileCreation.createdDate<=${toDate}`;
  }

  return await TecnotreedigitalSales.get(endPoint)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getWalletdetails = async (id) => {
  return await Tecnotreewallet.get(`/registerAccount?accountId=${id}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const downloadPdf = async (id) => {
  let data = await TecnotreedigitalSales.get(
    `/contract/downloadcontractpdf/${id}`,
    { responseType: 'blob' }
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);

  const blob = new Blob([data], { type: 'application/pdf' });
  const href = window.URL.createObjectURL(blob);
  const theLink = document.createElement('a');
  theLink.href = href;
  theLink.download = id + '.pdf';
  document.body.appendChild(theLink);
  theLink.click();
  document.body.removeChild(theLink);
};
const GenerateContractLink = async (id) => {
  let data = await TecnotreeContractMangement.get(`/fileuploads/${id}`, {
    responseType: 'blob'
  })
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);

  const file = new Blob([data], { type: 'application/pdf' });

  const fileURL = URL.createObjectURL(file);

  const pdfWindow = window.open();
  pdfWindow.location.href = fileURL;
};

const OrderTrack = async (id, limit, offset, value, SearchQuery, setLoader) => { 

  setLoader && setLoader(true)
  if (id && !value) {
    return await TecnotreedigitalSales.get(
      `/orderTracking?partnerId=${id}&orderChannel=dclm&offset=0&limit=10`
    )
      .then((res) => {
        setLoader && setLoader(false)
        return res.status === 200 ? res.data : null;
      })
      .catch((err) => {
        return [];
      });
  } else if(id && value) {
    return await TecnotreedigitalSales.get(
      `/orderTracking?partnerId=${id}&orderChannel=dclm&sort=-createdDate&${QueryString.queryObj({
        limit: limit,
        [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
      })}&offset=${offset}`
    )
      .then((res) => {
        setLoader && setLoader(false)
        return res.status === 200 ? res.data : null;
      })
      .catch((err) => {
        return [];
      });
  }
  else  {
    return await TecnotreedigitalSales.get(
      `/orderTracking?&orderChannel=dclm&sort=-createdDate&${QueryString.queryObj({
        limit: limit,
        offset: offset,
        value: value
      })}`
    )
      .then((res) => {
        setLoader && setLoader(false)
        return res.status === 200 ? res.data : null;
      })
      .catch((err) => {
        return [];
      });
  }

};
const ManualOrderTracking = async (id, limit, offset, value) => {
  if (id) {
    return await TecnotreedigitalSales.get(
      `/orderTracking?partnerId=${id}&orderChannel=dprm&offset=0&limit=${limit}`
    )
      .then((res) => {
        return res.status === 200 ? res : null;
      })
      .catch((err) => {
        return [];
      });
  } 
  else  {
    return await TecnotreedigitalSales.get(
      `/orderTracking?sort=-createdDate&${QueryString.queryObj({
        limit: `${limit || 10}`,
        offset: `${offset || 0}`,
        [searchQuery?.code]: _.isEmpty(searchQuery) ? '' : searchValue
      })}`
    )
      .then((res) => {
        return res.status === 200 ? res : null;
      })
      .catch((err) => {
        return [];
      });
  }
};

// const getRequests = async (id) => {
// const paymentlist = async (id) => {
//   return await Tecnotreewallet.get(
//     `/walletTransactions?orderId=${id}&limit=100000`
//   )
//     .then((res) => (res.status === 200 ? res.data : null))
//     .catch((err) => null);
// };

const getRequests = async (id, status, limit, offset) => {
  if (id.substring(0, 2) === 'MP') {
    return await TecnotreedigitalSales.get(
      `/manualtask?limit=${limit || 10}&offset=${offset || 0}&customerInfo.Partner_ID=${id}${status ? `&status=${status}` : ''}`
    )
      .then((res) => (res.status === 200 ? res : null))
      .catch((err) => null);
  } else if (id.substring(0, 2) === 'PR') {
    return await TecnotreedigitalSales.get(
      `/manualtask?limit=${limit || 10}&offset=${offset || 0}&customerInfo.PRODUCT_ID=${id}${status ? `&status=${status}` : ''}`
    )
      .then((res) => (res.status === 200 ? res : null))
      .catch((err) => null);
  } else if (id.substring(0, 2) === 'TP') {
    return await TecnotreedigitalSales.get(
      `/manualtask?limit=${limit || 10}&offset=${offset || 0}&customerInfo.Partner_ID=${id}${status ? `&status=${status}` : ''}`
    )
      .then((res) => (res.status === 200 ? res : null))
      .catch((err) => null);
  }
};

const searchRequestList = async (
  id,
  limit,
  offset,
  value,
  searchQuery,
  setLoader
) => {
  setLoader(true);

  if (id.substring(0, 2) === 'MP') {
    return await TecnotreedigitalSales.get(
      `/manualtask?limit=${limit}&offset=${offset}&customerInfo.Partner_ID=${id}&sort=-createdDate&${QueryString.queryObj(
        {
          [`${searchQuery.code}`]: value
        }
      )}`
    )
      .then((res) => {
        setLoader(false);

        return res.status === 200 ? res.data : null;
      })
      .catch((err) => null);
  } else if (id.substring(0, 2) === 'PR') {
    return await TecnotreedigitalSales.get(
      `/manualtask?limit=${limit}&offset=${offset}&customerInfo.PRODUCT_ID=${id}&sort=-createdDate&${QueryString.queryObj(
        {
          [`${searchQuery.code}`]: value
        }
      )}`
    )
      .then((res) => (res.status === 200 ? res.data : null))
      .catch((err) => null);
  } else if (id.substring(0, 2) === 'TP') {
    return await TecnotreedigitalSales.get(
      `/manualtask?limit=${limit}&offset=${offset}&customerInfo.Partner_ID=${id}&sort=-createdDate&${QueryString.queryObj(
        {
          [`${searchQuery.code}`]: value
        }
      )}`
    )
      .then((res) => (res.status === 200 ? res.data : null))
      .catch((err) => null);
  }
};

const productlistAll = async (id) => {
  return await TecnotreedigitalSales.get(
    `/dsales/gettenantproducts/${id}?TenantProfileCreation.TenantDetails.Partner_ID=${id}`
  )
    .then((res) => res)
    .catch((err) => {});
};

const getPartnerObj = async (url) => {
  return await TecnotreedigitalSales.get(
    `/partnerProfile/partnerdetails/${url}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const getAdjustment = async ({id, searchQuery, searchValue, offset, limit}) => {
  const query = searchValue && searchQuery ? `&${searchQuery}=${searchValue}` : '';
  return await Tecnotreewallet.get(`/adjustment?walletId=${id}&sort=-createdDate${query}&offset=${offset ?? 0}&limit=${limit ?? 10}`)
    .then((res) => res)
    .catch((err) => {});
};

const getInvoice = async (id, searchQuery, searchValue,  offset, limit) => {
  const query = searchValue && searchQuery ? `&${searchQuery}=${searchValue}` : '';
  return await Tecnotreewallet.get(
    `/invoice?WalletId=${id}&sort=-createdDate${query}&offset=${offset ?? 0}&limit=${limit ?? 10}`
  )
  .then((res) => (res.status === 200 ? res : null))
    .catch((err) => {});
};

const getSettlementdetails = async ({id, searchQuery, searchValue, offset, limit}) => {
  const query = searchValue && searchQuery ? `&${searchQuery}=${searchValue}` : '';
  return await Tecnotreewallet.get(`/settlement?walletId=${id}&sort=-createdDate${query}&offset=${offset ?? 0}&limit=${limit ?? 10}`)
    .then((res) => res)
    .catch((err) => {});
};

const paymentlist = async ({id, searchQuery, searchValue, offset, limit}) => {
  const query = searchValue && searchQuery ? `&${searchQuery}=${searchValue}` : '';
  return await Tecnotreewallet.get(
    `/walletTransactions?orderId=${id}&sort=-createdDate${query}&offset=${offset ?? 0}&limit=${limit ?? 10}`
  )
    .then((res) => (res.status === 200 ? res : null))
    .catch((err) => null);
};

const _getUnsettlebalance = async (id, searchQuery, searchValue) => {
  const query = searchValue && searchQuery ? `&${searchQuery}=${searchValue}` : '';
  console.log('id', {id, searchQuery, searchValue})
  return await Tecnotreewallet.get(`/settlement/unsettlementbal?walletId=${id}${query}&offset=0&limit=10`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getReasondetails = async (body) => {
  return await await TecnotreedigitalSales.get(`/masterdata?type=reason`)
    .then((res) => _.get(res.data, '[0]', ''))
    .catch((err) => {});
};

const getchargeItemsdetails = async (body) => {
  return await await TecnotreedigitalSales.get(`/masterdata?type=chargeItems`)
    .then((res) => _.get(res.data, '[0]', ''))
    .catch((err) => {});
};

const getAdjustmentdetails = async (body) => {
  return await await TecnotreedigitalSales.get(
    `/masterdata?type=adjustmentType`
  )
    .then((res) => _.get(res.data, '[0]', ''))
    .catch((err) => {});
};

const workflowTrigger = async (body) => {
  return await TecnotreedigitalSales.post(`/bpmn/executeProcess`, body)
    .then((res) => res?.data)
    .catch((err) => {
      // console.log(err, 'catch errror');
      return err;
    });
};

const Orderdetails = async (id) => {
  return await Tecnotreewallet.get(`/invoice/getInvoice/${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};

const OrderCompletion = async (payload) => {
  return await Tecnotreewallet.post(`/commission`, payload)
    .then((res) => res.data)
    .catch((err) => {});
};

const orderCompletestatus = async (trackingid) => {
  return await TecnotreedigitalSales.patch(
    `/orderTracking/updateordertrackingstatus/${trackingid}/Completed`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const PendingProdcutlist = async (id) => {
  return await TecnotreedigitalSales.get(
    `/manualtask?limit=10&customerInfo.Partner_ID=${id}&status=pending`
  )
    .then((res) => res.data)
    .catch((err) => {});
};
const ApprovedProdcutlist = async (id) => {
  return await TecnotreedigitalSales.get(
    `/manualtask?limit=10&customerInfo.Partner_ID=${id}&status=Approve`
  )
    .then((res) => res.data)
    .catch((err) => {});
};


const CreateNote = async (data, username) => {
  return await Tecnotreerelatedpaty.post(`/customer/${username}/note`, data)
    .then((res) => res.data)
    .catch((err) => {
      err;
    });
};
const getAllNotes = async (username) => {
  return await Tecnotreerelatedpaty.get(`/customer/${username}/note?limit=1000`)
    .then((res) => res.data)
    .catch((err) => {
      err;
    });
};
const getOneDealer = async (dealer) => {
  let endpoint;
  console.log(dealer, "dealersss")

  if(dealer?.formIdentity === "Dealers") {
    endpoint = `/search/Dealers?ResellerProfileCreation.DealerDetails.Agent_ID=${dealer.partnerId}`
  }
  else if(dealer?.formIdentity === "Sub-Dealer_Shop") {
    endpoint = `/search/Sub-Dealer_Shop?ResellerProfileCreation.SubDealerDetails.Agent_ID=${dealer.partnerId}`

  
  }
  else if(dealer?.formIdentity === "Sub-Dealer_Employee") {
    endpoint = `/search/Sub-Dealer_Employee?ResellerProfileCreation.SubDealerEmployeeDetails.Agent_ID=${dealer.partnerId}`

   
  }
  return await TecnotreedigitalSales.get(endpoint)
    .then((res) => res.data)
    .catch((err) => {
      err;
    });
};
const editNote = async (data, username) => {
  return await Tecnotreerelatedpaty.patch(
    `/customer/${username}/note/${data.id}`,
    data
  )
    .then((res) => res.data)
    .catch((err) => {
      err;
    });
};

const getUploadHistory = async (
  limit,
  offset,
  searchValue,
  SearchQuery
) => {

  console.log("searchValue: ", searchValue, "SearchQuery: ", SearchQuery, "offset: ", offset, "limit: ", limit)

  const data = await TecnotreedigitalSales.get(
    `/commissionBulkUpload`
  ).then((res) => res);
  return data;
}

const getUploadSearchHistory = async (
  limit,
  offset,
  searchValue,
  SearchQuery
) => {

  console.log("searchValue: ", searchValue, "SearchQuery: ", SearchQuery.code, "offset: ", offset, "limit: ", limit)

  const data = await TecnotreedigitalSales.get(
    `/commissionBulkUpload?${SearchQuery.code}=${searchValue}&limit=${limit}&offset=${offset}`
  ).then((res) => res);
  return data;
}

const getCustomerDetails = async (id) => {
  return await Tecnotreerelatedpaty.get(
    `/customer/${id}?expand=engagedParty,relatedParty`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const getpayinvoice = async (id, payload) => {
  return await Tecnotreewallet.patch(`/invoice/${id}`, payload)
    .then((res) => res.data)
    .catch((err) => {});
};
const dprmOnboarddebitMoney = async (id, debitmoneyDetails) => {
  return await Tecnotreewallet.patch(
    `/registerAccount/dprmOnboarddebitMoney/${id}`,
    debitmoneyDetails
  )
    .then((res) => res.data)
    .catch((err) => {});
};
const CommissionRulesCode = async (value) => {
  return await TecnotreedigitalSales.get(
    `searchfield/Commission_Rules/${value}?status=Approved
    `
  )
    .then((res) => (res.data ? res.data : null))
    .catch((err) => null);
};

const _DcmProductlist = async (id) => {
  return await TecnotreedigitalSales.get(`/dcmProdDetails?partnerId=${id}`)
    .then((res) => (res ? res.data : null))
    .catch((err) => null);
};

const getAlldropdown = () => {
  return Promise.all([
    TecnotreeProduct.get('/dcm/utility-services/market-segment'),
    TecnotreeProduct.get(
      '/dcm/product-catalogue/v1/product-category?limit=500 '
    ),
    TecnotreeProduct.get('/dcm/config-service'),
    TecnotreeProduct.get('/dcm/config-service/tax-categories'),
    TecnotreeProduct.get('/dcm/utility-services/charges'),
    TecnotreeProduct.get('/dcm/utility-services/channel')
  ]).then((values) => {
    return Factory.makeparseRes(values);
  });
};

const _MenuList = async (id) => {
  return masterdata.Menuitem;
};

const _VerifyOtp = async (payload) => {
  return await TecnotreedigitalSales.post(`/otp/verify`, payload)
    .then((res) => res.data)
    .catch((err) => {});
};

const _parterReports = async () => {
  return await TecnotreedigitalSales.get(`/list/LINKEDFORMAA9Y3S26`)
    .then((res) => res.data)
    .catch((err) => {});
};

const _getCounts = async () => {
  return await TecnotreedigitalSales.get(
    `partnerProfile/partner-dashboard-count`
  )
    .then((res) => res.data)
    .catch((err) => {});
};
const _getBackOfficeCounts = async ({ id }) => {
  return await TecnotreedigitalSales.get(
    `troubleTicket/user-dashboard-tasks-count/${id}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};
const _partnerCounts = async (payload) => {
  return await TecnotreedigitalSales.post(
    `partnerProfile/partner-dashboard-count-fillter`,
    payload
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const _getOrderCounts = async () => {
  return await TecnotreedigitalSales.get(
    `partnerProfile/partner-dashboard-orders-count`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const _OrderCounts = async (payload) => {
  return await TecnotreedigitalSales.post(
    `/partnerProfile/partner-dashboard-orders-count-filter`,
    payload
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const _partnerGraph = async (type) => {
  return await TecnotreedigitalSales.get(
    `reports/partner-sales-summary-graph/${type}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const _partnerGraphfilter = async (type, payload) => {
  return await TecnotreedigitalSales.post(
    `reports/partner-sales-summary-graph-filter/${type}`,
    payload
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const _SendSdkTOCustomer = async (body) => {
 
  return await TecnotreeContractMangement.post(
    `/contract/fillDynamicValuesOnDocumentforDynamic`,
    body
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const validateAgent = async ({ payload }) => {
  return await TecnotreeAgentManagement.post(
    '/partnership/validate',
    payload
  ).then((res) => res);
};
const createAgentId = async () => {
  return await TecnotreeAgentManagement.post('/partnership/generateId').then(
    (res) => res
  );
};

 const fetchProduct =async (status, offset=0) => {
  console.log(status, "status")
  const {data} = await Productpromotion.get(`/search/Add_Product?AddProduct.ProductDetails.PROMOTION_STATUS=${status}&limit=5&offset=${offset}`);
  return data
}

export default {
  CreateNote,
  getAllNotes,
  editNote,
  OrderTrack,
  getRequests,
  searchRequestList,
  productlistAll,
  getWalletdetails,
  getTenantdetails,
  filterBymytask,
  downloadPdf,
  filterByPartner,
  getProductdetails,
  GlobalSearch,
  UpdateStatus,
  shareattachment,
  getContractList,
  getDashboardDetails,
  getMyTasks,
  SearchPartnerContract,
  getPartnerActions,
  updatePartnerStatus,
  getPartnerExecutionResponse,
  getPartnerExecutionProcess,
  // getWalletdetails,
  // downloadPdf,
  GenerateContractLink,
  // OrderTrack,
  paymentlist,
  getPartnerObj,
  getAdjustment,
  getInvoice,
  getSettlementdetails,
  getSuspensionPartners,
  getAdjustmentdetails,
  getReasondetails,
  getchargeItemsdetails,
  workflowTrigger,
  Orderdetails,
  OrderCompletion,
  orderCompletestatus,
  getUploadHistory,
  getTenants,
  PendingProdcutlist,
  ApprovedProdcutlist,
  getCustomerDetails,
  getpayinvoice,
  dprmOnboarddebitMoney,
  SelfcareEnrolment,
  ResellerSelfEnrolment,
  CommissionRulesCode,
  _DcmProductlist,
  getAlldropdown,
  _MenuList,
  _VerifyOtp,
  _parterReports,
  _getCounts,
  _getBackOfficeCounts,
  _partnerCounts,
  _partnerGraph,
  _partnerGraphfilter,
  _getOrderCounts,
  _OrderCounts,
  _FilterByPartner,
  _FilterByorderTracking,
  _FilterByTenant,
  _FilterByAgent,
  _getUnsettlebalance,
  _SendSdkTOCustomer,
  validateAgent,
  createAgentId,
  getSuspendTenants,
  getRevokePartners,
  getRevokeTenants,
  _fetchPartnerContracts,
  getRevokePartners,
  CustomerTicket,
  filterCustomerTicket,
  getPartnerLead,
  getPartnerReseller,
  FilterLead,
  getUploadSearchHistory,
  getManaualCommision,
  ManualOrderTracking,
  getPotentialDealer,
  _FilterByDealer,
  getOneDealer,
  fetchProduct
};

// /manualtask
