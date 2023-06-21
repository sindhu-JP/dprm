import { createSlice } from '@reduxjs/toolkit';
// import TicketController from 'Controllers/Reports';

import TicketController from 'Controllers/TroubleTicket';
const dummyFormState = {
  values: {},
  fields: {},
  meta: {},
  canSubmit: false,
  errors: {},
  loading: false,
  submitting: false,
  userGroups: {},
  TroubleTicketStatus: [],
  taskAssignWorkflowlist: {}
};

const TroubleTicket = createSlice({
  name: 'TroubleTicket',
  initialState: {
    PartnerSummaryrow: [],
    getGroups: [],
    WorkFlowHistory: {},
    TroubleTicketStatus: [],
    userGroupsRow: {},
    TroubleTicketAssignUser: [],
    TroubleTicketDynamicmenu: [],
    TroubleTicketList: [],
    TroubleTicketListXcount: 0,
    loading: {
      reportLoading: false,
      workflowHistoryLoader: false,
      StatuCount: false,
      TicketsLoader: false,
      ApprovelLoader: false
    }
  },
  reducers: {},
  extraReducers: {
    [TicketController.LoadAll_StatusCount.pending]: (state, { payload }) => {
      state.loading.TicketsLoader = true;
    },
    // updating my tasks list (status success)
    [TicketController.LoadAll_StatusCount.fulfilled]: (state, { payload }) => {
      state.loading.TicketsLoader = false;
      state.TroubleTicketStatus = payload;
    },
    // updating my tasks list (status failure)
    [TicketController.LoadAll_StatusCount.rejected]: (state, { error }) => {
      state.loading.TicketsLoader = false;
    },

    [TicketController.LoadAll_GetStatusTickets.pending]: (
      state,
      { payload }
    ) => {
      state.loading.TicketsLoader = true;
    },
    // updating my tasks list (status success)
    [TicketController.LoadAll_GetStatusTickets.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.TicketsLoader = false;
      state.TroubleTicketList = payload?.data;
      state.TroubleTicketDynamicmenu = payload?.dynamic;
      state.TroubleTicketAssignUser = payload?.AssignUsers;
      state.TroubleTicketListXcount = payload?.count;
    },
    // updating my tasks list (status failure)
    [TicketController.LoadAll_GetStatusTickets.rejected]: (
      state,
      { error }
    ) => {
      state.loading.TicketsLoader = false;
    },

    [TicketController.TrobleTicketApporovel.pending]: (state, { payload }) => {
      state.loading.ApprovelLoader = true;
    },
    // updating my tasks list (status success)
    [TicketController.TrobleTicketApporovel.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.ApprovelLoader = false;
    },
    // updating my tasks list (status failure)
    [TicketController.TrobleTicketApporovel.rejected]: (state, { error }) => {
      state.loading.ApprovelLoader = false;
    }
  }
});
export { TroubleTicket };
export default TroubleTicket.actions;
