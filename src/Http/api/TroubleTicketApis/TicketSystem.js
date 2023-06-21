import { TecnotreedigitalSales, TecnotreeTroubleTicket } from 'Http/axios';
const queryString = require('query-string');
let loginUser = localStorage.getItem('loginUser');
loginUser = loginUser === "undefined" ? undefined : loginUser;

console.log('loginUser', loginUser)
console.log('loginUser', typeof loginUser)
const groups = loginUser ? JSON.parse(loginUser) : {} ;

const _searchTenantList = async (value) => {
  return await TecnotreedigitalSales.get(
    `search/Partner_Profile?PartnerProfileCreation.PartnerDetails.PARTNER_NAME=${value}&PartnerProfileCreation.PartnerDetails.Partner_ID=${value}`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const _loadAllPartnerList = async (id, limit, offset) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket?sort=-createdDate&relatedParty.id=${id}&limit=${limit}&offset=${offset}`
  )
    .then((res) => (res.status === 200 ? res : null))
    .catch((err) => null);
};

const _loadAllPartnerTicketOpen = async (id) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket?relatedParty.id=${id}&status=open`
  )
    .then((res) => (res.status === 200 ? res.headers['x-total-count'] : null))
    .catch((err) => null);
};
const _loadAllPartnerTicketclose = async (id) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket?relatedParty.id=${id}&status=closed`
  )
    .then((res) => (res.status === 200 ? res.headers['x-total-count'] : null))
    .catch((err) => null);
};
const _loadAllPartnerTicketResolve = async (id) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket?relatedParty.id=${id}&status=resolved`
  )
    .then((res) => (res.status === 200 ? res.headers['x-total-count'] : null))
    .catch((err) => null);
};

const _getStatustabs = async (id) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket/status?relatedPartyId=${id}`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const _getFilterData = async (id, dynamicURL, limit, offset) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket?relatedParty.id=${id}&${dynamicURL ? dynamicURL : 'sort=-modifiedDate'}&limit=${limit}&offset=${offset}`
  )
    .then((res) => (res.status === 200 ? res : null))
    .catch((err) => err);
};

const _getStatusTickets = async (id, status) => {
  return await TecnotreeTroubleTicket.get(
    `troubleTicket?sort-=createdDate&relatedParty.id=${id}&status=${status}`
  )
    .then((res) => (res.status === 200 ? res : null))
    .catch((err) => null);
};
const _getStatusCounts = async (groups, id, team, TaskIdSearch) => {
  let endpoint = '';

  const query = {
    ticketId: TaskIdSearch,
    userId: !team ? id : ''
  };

  // if (!team) {
  //   return await TecnotreedigitalSales.get(
  //     `troubleTicket/statusCount?groupId=${groups}&sort=-createdDate&${queryString.stringify(
  //       _.pickBy(query, _.identity)
  //     )}`
  //   )
  //     .then((res) => (res.status === 200 ? res.data : null))
  //     .catch((err) => null);
  // } else {
  //   return await TecnotreedigitalSales.get(
  //     `troubleTicket/statusCount?groupId=${groups}&sort=-createdDate&${queryString.stringify(
  //       _.pickBy(query, _.identity)
  //     )}`
  //   )
  //     .then((res) => (res.status === 200 ? res.data : null))
  //     .catch((err) => null);
  // }

  return await TecnotreedigitalSales.get(
    `troubleTicket/statusCount?groupId=${groups}&sort=-createdDate&${queryString.stringify(
      _.pickBy(query, _.identity)
    )}`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const _getStatusCountTickets = async (
  groups,
  id,
  status,
  team,
  limit,
  offset,
  TaskIdSearch,
  dynamicURL
) => {
  const query = {
    id: TaskIdSearch
  };

  let end = '';
  if (team) {
    if (TaskIdSearch) {
      end = `troubleTicket?limit=${limit}&offset=${offset}&groups.id=${groups}&sort=-modifiedDate${
        dynamicURL ? dynamicURL : ''
      }&status=${status ? status : "Approved"}&id=${TaskIdSearch}`;
    } else {
      end = `troubleTicket?limit=${limit}&offset=${offset}&groups.id=${groups}&sort=-modifiedDate${
        dynamicURL ? dynamicURL : ''
      }&status=${status ? status : "Approve"}`;
    }
  } else {
    if (TaskIdSearch) {
      end = `troubleTicket?limit=${limit}&offset=${offset}&groups.id=${groups}&sort=-modifiedDate${
        dynamicURL ? dynamicURL : ''
      }&assignees.id=${id}&status=${status}&id=${TaskIdSearch}&status=${status ? status : "Approve"}`;
    } else {
      end = `troubleTicket?limit=${limit}&offset=${offset}&groups.id=${groups}&sort=-modifiedDate${
        dynamicURL ? dynamicURL : ''
      }&status=${status ? status : "Approve"}`;
    }
  }
  return await TecnotreedigitalSales.get(end)
    .then((res) => (res.status === 200 ? res : null))
    .catch((err) => null);
};

const _getAssignUsers = async (id) => {
  return await TecnotreedigitalSales.get(
    `/auth/secure/get_users?groupIds=${id}`
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};
const _getTicketStatuslist = async (status) => {
  if (status) {
    return await TecnotreedigitalSales.get(
      `formIdentity?formIdentity=TaskManagementStatus&status=${status}`
    )
      .then((res) => (res.status === 200 ? res.data : null))
      .catch((err) => null);
  }
};

const _UpdateStatus = async (id, payload) => {
  return await TecnotreedigitalSales.patch(`troubleTicket/${id}`, payload)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const updateUserCount = async (oldAssignee, newAssignee) => {
  let payload = {
    oldAssignee: oldAssignee,
    newAssignee: newAssignee
  };
  return await TecnotreedigitalSales.post(`dsales/updateusertaskcount`, payload)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

export default {
  _searchTenantList,
  _loadAllPartnerList,
  _loadAllPartnerTicketOpen,
  _loadAllPartnerTicketclose,
  _loadAllPartnerTicketResolve,
  _getStatustabs,
  _getStatusTickets,
  _getStatusCounts,
  _getStatusCountTickets,
  _getAssignUsers,
  _getTicketStatuslist,
  _UpdateStatus,
  updateUserCount,
  _getFilterData
};
