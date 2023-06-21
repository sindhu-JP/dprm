import { createAsyncThunk } from '@reduxjs/toolkit';
import dashboardAPI from '../Http/api/dashboard';
import Modal from 'Store/Modals';
import Alert from 'Store/Alert';
import TicketAPI from 'Http/api/TroubleTicketApis/TicketSystem';
// import TicketSystem from 'Http/api/TroubleTicketApis/TicketSystem';
let loginUser = localStorage.getItem('loginUser');
loginUser = loginUser === "undefined" ? undefined : loginUser;

const groups = loginUser ? JSON.parse(loginUser) : {};
console.log('groups', groups)
const LoadAll_PartnerTickets = createAsyncThunk(
  'dashboard/Load_PartnerTickets',
  async ({ id, limit = '5', offset }) => {
    const data = await TicketAPI._loadAllPartnerList(
      id,
      limit,
      offset ? offset : '0'
    ).catch((err) => {});

    let totallCount = data.headers['x-total-count'];
    return {
      data: data.data,
      xCount: totallCount
    };
  }
);

const LoadAll_StatusTickets = createAsyncThunk(
  'dashboard/LoadAll_StatusTickets',
  async ({ id, status }) => {
    const data = await TicketAPI._getStatusTickets(id, status).catch(
      (err) => {}
    );

    let totallCount = data.headers['x-total-count'];
    return {
      data: data.data,
      xCount: totallCount
    };
  }
);
const Load_filter_tickets = createAsyncThunk(
  'dashboard/Load_filter_tickets',
  async ({ id, dynamicURL, limit, offset }) => {
    console.log(limit, "limit")
    const data = await TicketAPI._getFilterData(id, dynamicURL, limit ? limit : 5, offset ? offset : 0).catch((err) =>
      { err }
    );
    let totallCount = data.headers['x-total-count'];  
    return {
      data: data.data,
      xCount: totallCount
    };
  }
);
const LoadAll_StatusCount = createAsyncThunk(
  'dashboard/LoadAll_StatusCount',
  async (
    { groups, userid, team, limit, offset, TaskIdSearch, payload },
    { dispatch }
  ) => {  
    const data = await TicketAPI._getStatusCounts(
      groups,
      userid,
      team,
      TaskIdSearch
    ).catch((err) => {});    
    dispatch(
      await LoadAll_GetStatusTickets({
        groups,
        userid,
        status:
          payload?.status === 'InProgress' || payload?.status === 'Reject'
            ? payload?.status
            : data[0]?.statusName,
        team,
        limit: limit,
        offset: offset,
        TaskIdSearch: TaskIdSearch
      })
    );

    return data;
  }
);

const LoadAll_GetStatusTickets = createAsyncThunk(
  'dashboard/LoadAll_GetStatusTickets',
  async ({
    groups,
    userid,
    status,
    team,
    offset = 0,
    limit = 5,
    TaskIdSearch,
    dynamicURL
  }) => {
    const data = await TicketAPI._getStatusCountTickets(
      groups,
      userid,
      status,
      team,
      limit,
      offset,
      TaskIdSearch,
      dynamicURL
    ).catch((err) => {});

    console.log(groups, "groupie")
    const dynamic = await TicketAPI._getTicketStatuslist(status);
    const AssignUsers = await TicketAPI._getAssignUsers(groups);

    const xCount = data.headers['x-total-count'];   
    return {
      data: data.data.sort(
        (a, b) => Date.parse(b.modifiedDate) - Date.parse(a.modifiedDate)
      ),
      dynamic,
      AssignUsers,
      count: xCount
    };
  }
);

const TrobleTicketApporovel = createAsyncThunk(
  'dashboard/TrobleTicketApporovel',
  async (
    { id, payload, dataView, description, groups, userid, message },
    { dispatch }
  ) => {
    const data = await TicketAPI._UpdateStatus(id, payload).catch((err) => {});
    const data2 = await dashboardAPI.getPartnerExecutionResponse(
      _.get(dataView, 'workFlowRef.[0].taskInfoId', '')
    );

    const DeleteOf = delete data2?.Values?.authToken;
    let parserObj = {
      ...data2,
      Values: {
        ...data2.Values,
        accessToken: localStorage.getItem('ACCESS_TOKEN')
      }
    }; 

    await dashboardAPI.getPartnerExecutionProcess(
      parserObj,
      payload.status,
      description,
      _.get(dataView, 'workFlowRef.[0].taskInfoId', '')
    );

    dispatch(Modal.close('ApprovalReason'));
    if (message === 'Approve') {

      dispatch(
        Alert.open({
          type: 'Success',
          message: ` Approved   Successfully`
        })
      );
    } else if (message === 'Reject') {
      dispatch(
        Alert.open({
          type: 'error',
          message: `  Rejected   Successfully`
        })
      );
    }

    if (message !== 'Reject') {
      dispatch(
        await LoadAll_StatusCount({
          groups,
          userid
        })
      );
    } else {
      let payload = {
        status: 'Reject'
      };
      dispatch(
        await LoadAll_StatusCount({
          groups,
          userid,
          payload
        })
      );
    }

    return data;
  }
);

const TrobleTicketAssignUser = createAsyncThunk(
  'dashboard/TrobleTicketAssignUser',
  async (
    { id, payload, groups, userid, oldAssignee, newAssignee },
    { dispatch }
  ) => {
    const data = await TicketAPI._UpdateStatus(id, payload).catch((err) => {});
    // add here updateUserCount
    const updateUserCount = await TicketAPI.updateUserCount(
      oldAssignee,
      newAssignee
    ).catch((err) => {});

    dispatch(
      await LoadAll_StatusCount({
        groups,
        userid,

        payload
      })
    );
    return data;
  }
);

export default {
  LoadAll_PartnerTickets,
  LoadAll_StatusTickets,
  LoadAll_StatusCount,
  LoadAll_GetStatusTickets,
  TrobleTicketApporovel,
  TrobleTicketAssignUser,
  Load_filter_tickets
};
