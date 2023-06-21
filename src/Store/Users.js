import { createSlice } from '@reduxjs/toolkit';
import UsersController from 'Controllers/Users';

const Users = createSlice({
  name: 'users',
  initialState: {
    ids: [],
    entities: {},
    loading: false,
    error: ''
  },
  extraReducers: {
    [UsersController.loadAccountManagers.pending]: (state, { payload }) => {
      state.error = '';
      state.loading = true;
    },
    [UsersController.loadAccountManagers.fulfilled]: (state, { payload }) => {
      if (payload && payload.length) {
        let ids = [];
        let entities = {};

        payload.map((user) => {
          ids.push(user.id);
          entities[user.id] = user;
        });

        state.ids = ids;
        state.entities = entities;
      }

      state.error = '';
      state.loading = false;
    },
    [UsersController.loadAccountManagers.rejected]: (state, { error }) => {
      state.error = '';
      state.loading = false;
    }
  }
});

export { Users };
export default Users.actions;
