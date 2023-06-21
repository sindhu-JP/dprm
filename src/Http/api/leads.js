import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import {
  Tecnovos,
  Tecnotree,
  TecnotreeProduct,
  TecnotreeSubscription,
  Tecnotreerelatedpaty,
  DAP,
  TecnotreePartyManagement,
  Tecnotreevalidate,
  Tecnotreeproducts,
  Tecnotreevasproducts,
  DclmPartyInteraction,
  TecnotreedigitalSales
} from './../axios';
import { ENDPOINTS } from 'Constants';
import { Query } from 'lib/utils';

const leadEntity = new schema.Entity('leads');

const loadLeads = createAsyncThunk(
  'leads/loadLeads',
  async ({ user = '', limit = 100, sort = '-createdDate' }, thunkAPI) => {
    try {
      const query = Query.fromObj({ limit, sort, leadAssignment: user });
      const response = await Tecnotree.get(
        `${ENDPOINTS.LEADS}?${query}&&${limit}`
      );
      const normalized = normalize(response.data, [leadEntity]);
      return normalized.entities;
    } catch (err) {
      throw Error('Failed to load');
    }
  }
);

const parseReponse = (res) => {
  return {
    details: [
      {
        label: 'COMPANY NAME',
        value: res.companyName
      },
      {
        label: 'REGISTRATION NUMBER',
        value: res.companyRegistrationNumber
      },
      {
        label: 'VAT NUMBER',
        value: res.vatNumber
      },
      {
        label: 'CUSTOMER CATEGORY',
        value: res.customerCategory
      },
      {
        label: 'SUB CATEGORY',
        value: res.customerSubCategory
      }
    ],
    ...res
  };
};

const parseTable = (leads) => {
  let payload = {
    data: leads,
    table: {}
  };

  const rows = leads.map((lead) => {
    let temp = {
      data: lead,
      columns: {}
    };

    temp.columns['companyName'] = lead?.companyDetails?.companyName || '-';
    temp.columns['leadClassification'] =
      lead?.companyDetails?.leadClassification;
    temp.columns['industryType'] = lead?.companyDetails?.industryType;
    temp.columns['date'] = lead?.createdDate;
    temp.columns['status'] = lead?.status;

    return temp;
  });

  payload.table.rows = rows;
  return payload;
};

//  const  getDocumentBlob=({documentId})=>{

//   return await TecnotreeDms.get

//  }
//============ VERIFIED ACTIVE USE ================//

const create = async (payload) => {
  return await Tecnotree.post('/lead', payload).then((res) => res.data);
};

const update = async (payload) => {
  return await Tecnotree.put(`/lead/${payload.id}`, payload).then(
    (res) => res.data
  );
};

const loadleadAll = async ({ user, count, usergrpinfo }) => {
  let temp = [...usergrpinfo?.childs];
  temp.push(user?.sub);
  if (temp.length > 0) {
    return await Tecnotree.get(
      `/lead?sort=-modifiedDate&limit=${count}&leadAssignment.name=${temp.toString()}`
    ).then((res) => res.data);
  } else {
    return await Tecnotree.get(
      `/lead?sort=-modifiedDate&limit=${count}&leadAssignment.name=${user?.sub}`
    ).then((res) => res.data);
  }

  // const admin = _.get(user, "roles", "")
  // const admindetails = _.compact(admin.split(',').map((item) => {
  //   if (item === "ROOT/dlpmAdmin") {

  //     return item
  //   } else {
  //     console.log("error")
  //   }
  // }
  // )
  // )

  // if (admindetails[0] === "ROOT/dlpmAdmin") {
  //   return await Tecnotree.get(`/lead?sort=-modifiedDate&limit=${count}&leadAssignment.name=${username.toString()}`)
  //     .then((res) => res.data)
  //     .catch(console.log);
  // } else {
  //   return await Tecnotree.get(`/lead?sort=-modifiedDate&limit=${count}&leadAssignment.name=${username.toString()}`)
  //     .then((res) => res.data)
  //     .catch(console.log);

  // }
};

const leadOnsearch = async (value) => {
  return await Tecnotree.get(`/lead?companyDetails.companyName*=${value}`).then(
    (res) => res.data
  );
};

const leadStatusCount = async () => {
  return await Tecnotree.get(`/lead/getCount`).then((res) => res.data);
};

const slaTiming = async (value) => {
  return await Tecnotree.get(`/sla/${value}`).then((res) => res.data);
};

const LeadTableFilter = async (value) => {
  return await Tecnotree.get(`/lead?${value}`).then((res) => res.data);
};

const getCustomer = async (id) => {
  return await Tecnotree.get(`/customer?id=${id}`).then((res) => res.data);
};

const getOrganisation = async (id) => {
  return await Tecnotree.get(
    `/customer-service/partyManagement/v1/organization?id=${id}`
  ).then((res) => res.data);
};

const blackListCheck = async (payload) => {
  const url = 'customer/validate/denylistCheck';
  return await Tecnotreevalidate.post(url, payload).then((res) => res.data);
};
const duplicatedenilist = async (payload) => {
  const url = 'customer/validate/duplicateIdentificationCheck';
  return await Tecnotreevalidate.post(url, payload).then((res) => res.data);
};

const duplicateCheck = async (payload) => {
  // duplicate/Partner_Profile/PartnerProfileCreation?PARTNER_REGISTRATION_NUMBER=54646456458
  // return await Tecnotree.post(
  //   "/lead/validate/duplicate",
  //   payload
  // ).then((res) => res.data);
  // https://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/duplicate/Partner_Profile/PartnerProfileCreation?PARTNER_REGISTRATION_NUMBER=54646456458
  return await TecnotreedigitalSales.get(
    `duplicate/Partner_Profile/PartnerProfileCreation?PARTNER_REGISTRATION_NUMBER=${payload.partnerRegNo}`
  ).then((res) => res.data);
};

const updateStatus = async (id, payload) => {
  return await Tecnotree.patch(`/lead/${id}`, payload).then((res) => res.data);
};

const contractSignoff = async (id, payload, method) => {
  return await Tecnotree({
    method: method,
    url: `/contract/${id}`,
    data: payload
  }).then((res) => res.data);
};
const contractSignoffpatch = async (id, payload) => {
  return Tecnotree.patch(`/contract/${id}`, payload).then((res) => res.data);
  // return await Tecnotree({

  //     method:"patch",
  //     url: `/contract/${id}`,
  //     data:payload}).then((res) => res.data);
};

const updateStatusHistory = async (id, payload) => {
  return await Tecnotree.patch(`/lead/status/${id}`, payload).then(
    (res) => res.data
  );
};
const dyanmicStatusHistory = async (id, payload, method) => {
  return await Tecnotree({
    method: method,
    url: `/lead/status/${id}`,
    data: payload
  }).then((res) => res.data);
};
const generateQuote = async (payload) => {
  return Tecnotree.post('/quote', payload).then((res) => res.data);
};
const updateQuote = async (payload) => {
  return Tecnotree.put(`/quote/${payload.id}`, payload).then((res) => res.data);
};

const shareQoutationByEmail = async (id, payload) => {
  await Tecnotree.post(`/downlaod/pdfreport`, {
    MailIds: payload,
    leadId: id
  }).then((res) => res.data);
};

const nextId = async () => {
  return await Tecnotree.post('/lead/generateId').then((res) => {
    if (res && res.data) {
      return res.data.id;
    }

    throw new Error('Failed to get id');
  });
};

const nextIdQuote = async () => {
  return await Tecnotree.post('/quote/generateId').then((res) => {
    if (res && res.data) {
      return res.data.id;
    }

    throw new Error('Failed to get id');
  });
};
const getQuoteID = async (id, payload) => {
  const data = await Tecnotree.get(`/lead/${id}`, payload).then(
    (res) => res.data
  );

  return data;
};

const GetcontractDetails = async ({ qouteId }) => {
  const data = await Tecnotree.get(`/contract?quoteId=${qouteId}`).then(
    (res) => res.data
  );
  return data;
};
const getcontractID = async () => {
  const data = await Tecnotree.post(`/contract/generateId`).then(
    (res) => res.data
  );

  return data;
};
const getContractDetailesById = async (contractID) => {
  const data = await Tecnotree.get(`/contract/${contractID}`).then(
    (res) => res.data
  );
  return data;
};

//================== =========== ==================//

// const getAllexisting = async  () => {
//   try {
//     const res = await Tecnovos.get(

//       // `/lead?limit=10&sort=-createdDate&leadAssignment.email=${user}`
//     );
//     return res.data
//   } catch (err) {
//     return {
//       error: "",
//     };
//   }
// };

const getAllexisting = async (value) => {
  return await Tecnotree.get(`/lead?status=ONBOARDED`).then((res) =>
    res.data ? res.data : ''
  );
};

const getAll = async ({ user = '', limit = 100, sort = '-createdDate' }) => {
  try {
    const res = await Tecnovos.get(
      `/lead`
      // `/lead?limit=10&sort=-createdDate&leadAssignment.email=${user}`
    );
    return {
      data: parseTable(res.data)
    };
  } catch (err) {
    return {
      error: ''
    };
  }
};

const updateLeadClassiFication = async (id, payload, reason, oppId) => {
  try {
    const data = {
      statusChangeReason: reason,
      companyDetails: payload,
      oppId: oppId
    };
    const res = await Tecnotree.patch(`/lead/${id}`, data, {
      headers: {
        ['Content-Type']: 'application/merge-patch+json'
      }
    });
    return {
      data: res.data
    };
  } catch (err) {
    return {
      error: ''
    };
  }
};

const Leadsearch = async (value) => {
  return await Tecnotree.get(`/lead/leadSearch/${value}`).then((res) =>
    res.data ? res.data : ''
  );
};

const quoteexpired = async (value) => {
  return await Tecnotree.get(`/quote/quoteValidity/${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const Contractvalidity = async (value) => {
  return await Tecnotree.get(`quote/contractValidity/${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getUpdatedQuote = async (value) => {
  // return await Tecnotree.get(`/quote/${value}`)
  return await Tecnotree.get(`/quote?leadId=${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getUpdatedContract = async (value) => {
  return await Tecnotree.get(`/contract?leadId=${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getleadidDetails = async (value) => {
  // return await Tecnotree.get(`/quote/${value}`)
  return await Tecnotree.get(`/quote?leadId=${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const chikletKpi = async (value) => {
  return await Tecnotree.get(`/lead/leadView/${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

// const FollowUp = async (payload) => {
//   await Tecnotree.post(`/followUp`, payload)
//     .then((res) => res.data)
//     .catch((err) => null);
// };

const getNotes = async ({ leadId, sort = '-createdDate' }) => {
  // return await Tecnotree.get(`/followUp?author=${user}&sort=-createdDate`)
  return await Tecnotree.get(`/event?leadId=${leadId}&sort=-createdDate`)
    .then((res) => (res ? res.data : {}))
    .catch(() => {});
};
const getrecommendOffers = async (id) => {
  return await TecnotreeProduct.get(
    `/dclm-product-catalog/recommendation?depth=1&limit=50`
  ).then((res) => res);
};

const getquoteStatus = async (quoteId, payload) => {
  return await Tecnotree.patch(`/quote/${quoteId}`, payload).then(
    (res) => res.data
  );
};
const updateNoteStatus = async (id, payload) => {
  try {
    const res = await Tecnotree.patch(`/lead/${id}`, payload, {
      headers: {
        ['Content-Type']: 'application/json'
      }
    });
    return {
      data: res.data
    };
  } catch (err) {
    return {
      error: ''
    };
  }
};

const shareNotification = async (payload) => {
  return DAP.post('/notification/triggerNotification', payload)
    .then((res) => res.data)
    .catch((err) => null);
};

const leadAssignmentEmailMobile = async (value) => {
  return await TecnotreePartyManagement.get(`/ssoIndividual/${value}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const checkfeacibilty = async (payload) => {
  return await TecnotreePartyManagement.post(
    `/dcm/product-offering-qualification/v1/product-offering-qualification`,
    payload
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const shareattachment = async (payload) => {
  return await DAP.post(
    '/notification/triggerNotificationForEmailAttachment',
    payload
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const contractcreate = async (payload) => {
  return await Tecnotree.post('/contract', payload)
    .then((res) => (res.data ? res.data : ''))
    .catch((err) => null);
};
const updateContractByID = async (payload) => {
  return await Tecnotree.put(`/contract/${payload.id}`, payload)
    .then((res) => (res.data ? res.data : ''))
    .catch((err) => null);
};

const checkfeasibility = async (payload) => {
  return await Tecnotreeproducts.post(
    '/product-offering-qualification',
    payload,
    {
      headers: { 'Access-Control-Allow-Origin': true }
    }
  )
    .then((res) => res.data)
    .catch((err) => null);
};

const getoppurtunityId = async () => {
  return await Tecnotree.post('/lead/generateOppId')
    .then((res) => (res.data ? res.data : ''))
    .catch((err) => null);
};

const getVasByID = async (id) => {
  const data = await Tecnotreevasproducts.get(
    `/product-offering?productSpecification.productSpecificationRelationship.type=addon&productSpecification.productSpecificationRelationship.id=${id}&isSellable=true&lifecycleStatus=Launched`
  ).then((res) => res.data);

  return data;
};

const getrelatedPaty = async (payload) => {
  const data = await Tecnotreerelatedpaty.get(
    `/customer/${payload}/customerHierarchy`
  ).then((res) => res.data);

  return data;
};
const customerManagement = async (id) => {
  const data = await Tecnotreerelatedpaty.get(
    `/customer/${id}?expand=relatedParty,engagedParty,depth=3`
  ).then((res) => res.data);

  return data;
};

const searchsubscription = async (payload) => {
  const data = await Tecnotreerelatedpaty.post(
    `/search/customer`,
    payload
  ).then((res) => (res ? res.data : res));

  return data;
};

const getSearchCustomerdetails = async (id) => {
  const data = await Tecnotreerelatedpaty.get(
    `customer/${id}?expand=engagedParty,relatedParty`
  ).then((res) => res.data);

  return data;
};

const getSRResonsebyId = async (partyinteractionId) => {
  const data = await DclmPartyInteraction.get(
    `/partyInteraction/${partyinteractionId}`
  ).then((res) => res.data);
  return data;
};

const publicIdentifier = async (id) => {
  const data = await TecnotreeSubscription.get(
    `product?publicIdentifier=${id}&expand=engagedParty,relatedParty`
  ).then((res) => res.data);
  return data;
};
const getSubscriptiondata = async (id) => {
  const data = await TecnotreeSubscription.get(
    `/product?relatedParty.id=${id}&isCustomerVisible=true`
  ).then((res) => res.data);

  return data;
};

const getleadDeatils = async (id) => {
  const data = await Tecnotree.get(`lead?relatedParty.id=${id}`).then(
    (res) => res.data
  );

  return data;
};

const gethistory = async (id, value) => {
  const data = await Tecnotree.get(
    `lead?relatedParty.id=${id}&opportunities.serviceRequestType=${value}`
  ).then((res) => res.data);
  return data;
};
//  const getVasByID = async ({lob,  technology} ) => {

//   const data = await TecnotreeProduct.get(`/dclm-product-catalog/product-offering?lifecycleStatus=Launched&channel.name=CRM&isSellable=true&category.name=VAS&marketSegment.%40referredType=EB&productSpecification.LoB=${lob}&productSpecification.technology=${technology}&businessType=Postpaid&depth=1&limit=10&offset=0
//   `).then((res) => res.data);

//   return data

//   const data = await TecnotreeProduct.get(`/dclm-product-catalog/product-offering?lifecycleStatus=Launched&channel.name=CRM&isSellable=true&category.name=VAS&marketSegment.%40referredType=EB&productSpecification.LoB=${lob}&productSpecification.technology=${technology}&businessType=Postpaid&depth=1&limit=10&offset=0
//   `).then((res) => res.data);

//   return data

// }
// const https://dclm-mmp.cluster1.devtestlab2.tecnotree.com/productInventoryManagement/v1/product/PR481523?expand=productRelationship.product

const productInvertory = async (id) => {
  const data = await TecnotreeSubscription.get(
    `/product/${id}?expand=productRelationship.product`
  ).then((res) => res.data);

  return data;
};

const getProductlist = async (id) => {
  const data = await Tecnotreevasproducts.get(`/product-offering/${id} `).then(
    (res) => res.data
  );

  return data;
};

const dependency = async (ids) => {
  const data = await Tecnotreevasproducts.get(
    `/product-offering?queryType=planQuery&productSpecification.productSpecificationRelationship.type=dependency&productSpecification.productSpecificationRelationship.id=${ids}&depth=1&limit=10&offset=0&isSellable=true&&lifecycleStatus=launched`
  ).then((res) => res.data);

  return data;
};

export { loadLeads };
export default {
  productInvertory,
  contractSignoffpatch,
  getProductlist,
  gethistory,
  getleadDeatils,
  searchsubscription,
  getSubscriptiondata,
  getrelatedPaty,
  getoppurtunityId,
  LeadTableFilter,
  shareattachment,
  leadAssignmentEmailMobile,
  shareNotification,
  updateNoteStatus,
  getrecommendOffers,
  checkfeacibilty,
  getNotes,
  // FollowUp,
  chikletKpi,
  getleadidDetails,
  create,
  loadleadAll,
  Leadsearch,
  getCustomer,
  updateStatus,
  generateQuote,
  updateQuote,
  blackListCheck,
  duplicateCheck,
  getOrganisation,
  updateStatusHistory,
  leadOnsearch,
  leadStatusCount,
  getAll,
  loadLeads,
  nextId,
  nextIdQuote,
  shareQoutationByEmail,
  updateLeadClassiFication,
  quoteexpired,
  getQuoteID,
  getquoteStatus,
  getUpdatedQuote,
  getUpdatedContract,
  checkfeasibility,
  getcontractID,
  contractcreate,
  getAllexisting,
  getVasByID,
  GetcontractDetails,
  contractSignoff,
  Contractvalidity,
  Contractvalidity,
  getSearchCustomerdetails,
  publicIdentifier,
  slaTiming,
  update,
  dependency,
  dyanmicStatusHistory,
  getSRResonsebyId,
  updateContractByID,
  getContractDetailesById,
  duplicatedenilist,
  customerManagement
};
