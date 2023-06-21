import { createSlice } from '@reduxjs/toolkit';
// import GroupAssignmentController from 'Controllers/Reports';

import Partnerlist from 'Factory/Partner';
import partnerTable from 'Factory/PartnerTables';

import GroupAssignmentController from 'Controllers/GroupAssignmentController';
// import Partnerlist from 'Factory/Partner';
const dummyFormState = {
  values: {},
  fields: {},
  meta: {},
  canSubmit: false,
  errors: {},
  loading: false,
  submitting: false,
  userGroups: {},
  taskAssignWorkflowlist: {},
  onSearchtaskAssignWorkflowlist: {}
};

const Groups = createSlice({
  name: 'Groups',
  initialState: {
    PartnerSummaryrow: [],
    getGroups: [],
    WorkFlowHistory: {},

    userGroupsRow: {},
    onSearchuserGroupsRow: {},
    loading: {
      reportLoading: false,
      workflowHistoryLoader: false
    }
  },
  reducers: {
    onTableSearch: (state, { payload }) => {
      let data = {
        context: payload?.context?.onSearch,
        value: payload?.context?.value
      };

      if (payload.id === 'Tasks') {
        state.taskAssignWorkflowlist = Partnerlist.filterByvalue(data);
      } else if (payload.id === 'Users') {
        state.userGroupsRow = Partnerlist.filterByvalue(data);
      }
    }
  },
  extraReducers: {
    [GroupAssignmentController.getGrouplist.pending]: (state, { payload }) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [GroupAssignmentController.getGrouplist.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.getGroups = _.map(payload || [], (item) => {
        return {
          name: item.groupName,
          label: item.groupName,
          code: item.id,
          list: item
        };
      });
    },
    // updating my tasks list (status failure)
    [GroupAssignmentController.getGrouplist.rejected]: (state, { error }) => {
      state.loading.reportLoading = false;
    },

    [GroupAssignmentController.getuserGrouplist.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
    },
    // updating my tasks list (status success)
    [GroupAssignmentController.getuserGrouplist.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      let row = {};
      let ids = [];
      if (payload) {
        _.map(payload, (item) => {
          ids.push(item.id);
          row[item.id] = partnerTable.userGroupTable(item);
        });

        state.userGroupsRow = row;
        state.onSearchuserGroupsRow = row;
      }
    },

    // updating my tasks list (status failure)
    [GroupAssignmentController.getuserGrouplist.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },

    [GroupAssignmentController.UserSetUnAvailable.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
    },
    // updating my tasks list (status success)
    [GroupAssignmentController.UserSetUnAvailable.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      let row = {};
      let ids = [];
      if (payload) {
        state.userGroupsRow[payload.id] = partnerTable.userGroupTable(payload);
      }
    },

    // updating my tasks list (status failure)
    [GroupAssignmentController.UserSetUnAvailable.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },

    [GroupAssignmentController.UserSetAvailable.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
    },
    // updating my tasks list (status success)
    [GroupAssignmentController.UserSetAvailable.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      let row = {};
      let ids = [];
      if (payload) {
        state.userGroupsRow[payload.id] = partnerTable.userGroupTable(payload);
      }
    },

    // updating my tasks list (status failure)
    [GroupAssignmentController.UserSetAvailable.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },

    [GroupAssignmentController.gettaskassignWorkflow.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
    },
    // updating my tasks list (status success)
    [GroupAssignmentController.gettaskassignWorkflow.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      let row = {};
      let ids = [];
      if (payload) {
        _.map(payload, (item, index) => {
          ids.push(item.id);
          row[item._id] = partnerTable.TaskworkflowTable(item, index);
        });

        state.taskAssignWorkflowlist = row;
        state.onSearchtaskAssignWorkflowlist = row;
      }
    },

    // updating my tasks list (status failure)
    [GroupAssignmentController.gettaskassignWorkflow.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },

    [GroupAssignmentController.gettaskassignWorkflowhistory.pending]: (
      state,
      { payload }
    ) => {
      state.loading.workflowHistoryLoader = true;
    },
    // updating my tasks list (status success)
    [GroupAssignmentController.gettaskassignWorkflowhistory.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.workflowHistoryLoader = false;
      let row = {};
      let ids = [];
      if (payload) {
        state.WorkFlowHistory = payload;
      }
    },

    // updating my tasks list (status failure)
    [GroupAssignmentController.gettaskassignWorkflowhistory.rejected]: (
      state,
      { error }
    ) => {
      state.loading.workflowHistoryLoader = false;
    }
  }
});

export { Groups };
export default Groups.actions;
