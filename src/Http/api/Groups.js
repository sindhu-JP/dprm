import { TecnotreedigitalSales } from './../axios';

// import { Masterdata } from 'lib/utils';

const _getGrouplist = async (id) => {
  return await TecnotreedigitalSales.post(`/groups/groupsbyUserId/${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};
const _gettaskAssignworkflow = async (id, setLoader) => {
  setLoader(true);
  return await TecnotreedigitalSales.get(`/bpmncategory?groupid=${id}`)
    .then((res) => {
      setLoader(false);
      return res.data;
    })
    .catch((err) => {});
};

const _getuesrGrouplist = async (id, setLoader) => {
  setLoader(true);
  return await TecnotreedigitalSales.get(
    `/auth/secure/get_users?groupIds=${id}`
  )
    .then((res) => {
      setLoader(false);
      return res.data;
    })
    .catch((err) => {});
};

const _workflowHistory = async (id) => {
  return await TecnotreedigitalSales.get(`createworkflow/${id}`)
    .then((res) => res.data)
    .catch((err) => {});
};

const _SetAvailable = async (payload) => {
  return await TecnotreedigitalSales.put(`auth/secure/edit_user`, payload)
    .then((res) => res.data)
    .catch((err) => {});
};

const _SetUnAvailable = async (payload) => {
  return await TecnotreedigitalSales.post(`unavailable`, payload)
    .then((res) => res.data)
    .catch((err) => {});
};

const _TaskAssignHistory = async (workflowid, nodeId) => {
  return await TecnotreedigitalSales.get(
    `/taskAssignment?workflowId=${workflowid}&nodeId=${nodeId}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

const _TaskAssignUser = async (id, payload) => {
  if (id) {
    return await TecnotreedigitalSales.patch(`/taskAssignment/${id}`, payload)
      .then((res) => res.data)
      .catch((err) => {});
  } else {
    return await TecnotreedigitalSales.post(`/taskAssignment`, payload)
      .then((res) => res.data)
      .catch((err) => {});
  }
};

export default {
  _getGrouplist,
  _getuesrGrouplist,
  _gettaskAssignworkflow,
  _workflowHistory,
  _SetAvailable,
  _SetUnAvailable,
  _TaskAssignHistory,
  _TaskAssignUser
};
