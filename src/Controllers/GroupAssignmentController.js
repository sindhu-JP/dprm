import { createAsyncThunk } from '@reduxjs/toolkit';
// import dashboardAPI from '/Http/api/dashboard';
// import dashboardFactory from './Factory/Dashboard';
import Alert from 'Store/Alert';

import GroupsApi from 'Http/api/Groups';
import Modals from 'Store/Modals';
const getGrouplist = createAsyncThunk(
  'Groups/getGroups',
  async ({ id }) => {
    const data = await GroupsApi._getGrouplist(id).catch((err) => {});

    return data;
  }
  // return data;
);
const getuserGrouplist = createAsyncThunk(
  'Groups/getuserGrouplist',
  async ({ id, setLoader }) => {
    const data = await GroupsApi._getuesrGrouplist(id, setLoader).catch(
      (err) => {}
    );

    return data;
  }
  // return data;
);

const gettaskassignWorkflow = createAsyncThunk(
  'Groups/gettaskassignWorkflow',
  async ({ id, setLoader }) => {
    const data = await GroupsApi._gettaskAssignworkflow(id, setLoader).catch(
      (err) => {}
    );

    return data;
  }
  // return data;
);

const gettaskassignWorkflowhistory = createAsyncThunk(
  'Groups/gettaskassignWorkflowhistory',
  async ({ id }) => {
    const data = await GroupsApi._workflowHistory(id).catch((err) => {});

    return data;
  }
  // return data;
);
const UserSetAvailable = createAsyncThunk(
  'Groups/UserSetAvailable',
  async ({ payload }, { dispatch }) => {
    const data = await GroupsApi._SetAvailable(payload).catch((err) => {});

    dispatch(Modals.close('EditUser'));

    dispatch(
      Alert.open({
        id: 'success',
        type: 'success',
        message: ' Bandwidth Period has been updated Successfully '
      })
    );

    return data;
  }
  // return data;
);

const UserSetUnAvailable = createAsyncThunk(
  'Groups/UserSetUnAvailable',
  async ({ payload }, { dispatch }) => {
    const data = await GroupsApi._SetUnAvailable(payload).catch((err) => {});

    // dispatch(Modals.close('Setunavailable'))

    dispatch(Modals.close('EditUser'));

    dispatch(
      Alert.open({
        id: 'success',
        type: 'success',
        message: ' Set UnAvailable Period Updated Successfully '
      })
    );
    return data;
  }
  // return data;
);

const TaskAssingUser = createAsyncThunk(
  'Groups/TaskAssingUser',
  async ({ id, payload }, { dispatch }) => {
    const data = await GroupsApi._TaskAssignUser(id, payload).catch(
      (err) => {}
    );

    dispatch(Modals.close('ActionModal'));
    if (id) {
      dispatch(
        Alert.open({
          id: 'success',
          type: 'success',
          message: 'User added Successfully '
        })
      );
    } else {
      dispatch(
        Alert.open({
          id: 'success',
          type: 'success',
          message: 'User Updated Successfully '
        })
      );
    }
    return data;
  }
  // return data;
);
export default {
  getGrouplist,
  getuserGrouplist,
  gettaskassignWorkflow,
  gettaskassignWorkflowhistory,
  UserSetAvailable,
  UserSetUnAvailable,
  TaskAssingUser
};
