import ErrorHandle from 'Controllers/ErrorHandle';
import { TecnotreedigitalSales, TecnotreeTroubleTicket } from 'Http/axios';
import Alert from 'Store/Alert';

const partnerView = async (id) => {
  return await TecnotreedigitalSales.get(`searchindex?search=${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};
const getTenantdetails = async (id) => {
  return await TecnotreedigitalSales.get(
    `/search/Tenant_Partner_Profile?TenantProfileCreation.TenantDetails.TENANT_ID=${id}`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const menuItemlist = async (payload) => {
  return await TecnotreedigitalSales.post(`auth/secure/login`, payload)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const Deactivateaccount = async (payload) => {
  return await TecnotreedigitalSales.post(
    `selfcare/secure/deactivate
    `,
    payload
  )
    .then((res) => (res.data ? res.data : null))
    .catch((err) => null);
};
const CommissionRulesCode = async (value) => {
  return await TecnotreedigitalSales.get(
    `searchfield/Commission_Rules/${value}?status=Approved
    `
  )
    .then((res) => (res.data ? res.data : null))
    .catch((err) => null);
};

const User_MasterList = async (id) => {
  return await TecnotreedigitalSales.get(
    `auth/userlist/master/${id}
    `
  )
    .then((res) => (res.data ? res.data : null))
    .catch((err) => null);
};

const User_TenantList = async (id) => {
  return await TecnotreedigitalSales.get(
    `auth/userlist/tenant/${id}
    `
  )
    .then((res) => (res.data ? res.data : null))
    .catch((err) => null);
};

const _AddUser = async (payload, { dispatch }) => {
  return await TecnotreedigitalSales.post(
    `auth/adduser
    `,
    payload
  )
    .then((res) => (res.data ? res.data : null))
    .catch((error) => {
      dispatch(
        Alert.open({
          type: 'error',
          message: `${error?.response?.data?.message}`
        })
      );
      // dispatch(
      //   ErrorHandle.ErrorHandler({
      //     payload: error.response?.data || { message: 'Please try again!!!!' }
      //   })
      // );
    });
};

const _ModifyUser = async (payload, { dispatch }) => {
  return await TecnotreedigitalSales.put(
    `auth/modifyuser
    `,
    payload
  )
    .then((res) => (res.data ? res.data : null))
    .catch((error) => {
      dispatch(
        ErrorHandle.ErrorHandler({
          payload: error.response?.data || { message: 'Please try again ' }
        })
      );
    });
};

const _GenarateTicketID = async () => {
  return await TecnotreeTroubleTicket.get(`troubleTicket/generateId`)
    .then((res) => (res.data ? res.data : null))
    .catch((error) => {});
};

const _getCategoryDetails = async () => {
  return await TecnotreeTroubleTicket.get('category?LoB=DPRM&limit=100000')
    .then((res) => (res.data ? res.data : null))
    .catch((error) => {});
};

const _getParentCategoryDetails = async (type) => {
  let url;
  if (type) {
    url = `category?LoB=DPRM&limit=1000&ticketType=${type}`;
  } else {
    url = `category?LoB=DPRM&limit=1000`;
  }
  return await TecnotreeTroubleTicket.get(url)
    .then((res) => (res.data ? res.data : null))
    .catch((error) => {});
};
const _getSubCategoryDetails = async (id) => {
  return await TecnotreeTroubleTicket.get(`category?limit=1000&parentId=${id}`)
    .then((res) => (res.data ? res.data : null))
    .catch((error) => {});
};

const _DTT_Workflow = async (body) => {
  return await TecnotreedigitalSales.post(`/dtt/executeprocess`, body)
    .then((res) => res.data)
    .catch((err) => {});
};

export default {
  _DTT_Workflow,
  partnerView,
  getTenantdetails,
  menuItemlist,
  Deactivateaccount,
  CommissionRulesCode,
  User_MasterList,
  User_TenantList,
  _AddUser,
  _ModifyUser,
  _GenarateTicketID,
  _getCategoryDetails,
  _getParentCategoryDetails,
  _getSubCategoryDetails
};
