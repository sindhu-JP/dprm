import { createSlice } from '@reduxjs/toolkit';
// import GroupAssignmentController from 'Controllers/Reports';

import partnerTable from 'Factory/PartnerTables';

import GroupAssignmentController from 'Controllers/GroupAssignmentController';
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
  workflowStatus: ''
};

const setWorkflowReducer = createSlice({
  name: 'setWorkflowReducer',
  initialState: {
    PartnerSummaryrow: [],
    getGroups: [],

    userGroupsRow: {},
    loading: {
      reportLoading: false
    }
  },
  reducers: {},
  extraReducers: {
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
      }
    },

    // updating my tasks list (status failure)
    [GroupAssignmentController.gettaskassignWorkflow.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    }
  }
});

export { setWorkflowReducer };
export default setWorkflowReducer.actions;
