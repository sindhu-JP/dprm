import {
  TecnotreedigitalSales,
  TecnotreeProduct,
  Tecnotreewallet
} from './../axios';

const payment = async (payload) => {
  return await await TecnotreedigitalSales.post(`/payment`, payload)
    .then((res) => res.data)
    .catch((err) => {});
};

const getPartnerDetails = async (id) => {

  return await TecnotreedigitalSales.get(
    `/search/Partner_Profile?PartnerProfileCreation.PartnerDetails.Partner_ID=${id}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const getAgentDetails = async (id) => {
  return await TecnotreedigitalSales.get(`/search/Reseller_Onboard?ResellerProfileCreation.AgentDetails.Agent_ID=${id}`)
  .then((res) => res.data)
  .catch((err) => {});
}

const getContractDetails = async (id) => {
  return await await TecnotreedigitalSales.get(
    `/search/Add_Contract?AddContractFor.ContractInformation.CONTRACT_ID=${id}`
  )
    .then((res) => res.data)
    .catch((err) => {
      return [];
    });
};

const getProductDetails = async (id) => {
  return await await TecnotreedigitalSales.get(
    `/search/Add_Product?AddProduct.ProductDetails.PRODUCT_ID=${id}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const getSettlementRuleDetails = async (id) => {
  return await await TecnotreedigitalSales.get(`settlementRules/${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};

const getCommissionRuleDetails = async (id) => {
  return await await TecnotreedigitalSales.get(`commissionRules/${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};

const getTenantDetails = async (id) => {
  return await await TecnotreedigitalSales.get(
    `/search/Tenant_Partner_Profile?TenantProfileCreation.TenantDetails.TENANT_ID=${id}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const executeProcess = async (payload) => {
  return await TecnotreedigitalSales.post(`/bpmn/executeProcess`, payload)
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
};

const genereatepdf = async (payload) => {
  return await TecnotreedigitalSales.post(
    `/contract/genereatesharcontractfile`,
    payload
  )
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
};

const shareattachment = async (payload) => {
  return await TecnotreeProduct.post(
    '/notification/triggerNotificationForEmailAttachment',
    payload
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const addmoney = async (walletId, payload) => {
  return await Tecnotreewallet.patch(
    `/registerAccount/addMoney/${walletId}`,
    payload
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const SettlementRuleDetails = async (code) => {
  if (code) {
    return await TecnotreedigitalSales.get(
      `settlementRules?settlementRuleCode=${code}`
    )
      .then((res) => (res.status === 200 ? res.data : null))
      .catch((err) => null);
  }
};
const getcommissionRules = async (code) => {
  return await TecnotreedigitalSales.get(
    `commissionRules?commissionRuleCode=${code}`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getAdjustmentDetails = async (id) => {
  return await TecnotreedigitalSales.get(`/adjustment/${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};

const getSmartlocation = async (id) => {
  return await TecnotreedigitalSales.get(`/orderTracking?OrderId=${id}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const getManaualCommision= async (id) => {
  return await TecnotreedigitalSales.get(`/manualCommission/${id}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
export default {
  addmoney,
  executeProcess,
  payment,
  getPartnerDetails,
  getAgentDetails,
  getProductDetails,
  getContractDetails,
  getTenantDetails,
  getSettlementRuleDetails,
  getCommissionRuleDetails,
  genereatepdf,
  shareattachment,
  SettlementRuleDetails,
  getcommissionRules,
  getAdjustmentDetails,  
  getSmartlocation,
  getManaualCommision
};
