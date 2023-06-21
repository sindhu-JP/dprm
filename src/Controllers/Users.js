import UsersAPI from 'Http/api/users';
import { createAsyncThunk } from '@reduxjs/toolkit';

const loadAccountManagers = createAsyncThunk(
  'users/loadAccountManagers',
  async () => {
    return await UsersAPI.get({
      query: '?role=ROOT/dclmACMgr'
    }).catch((err) => {
      throw new Error('Failed to fetch sso users.');
    });
  }
);

export default {
  loadAccountManagers
};
