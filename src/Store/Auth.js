import { createSlice } from '@reduxjs/toolkit';
import AuthController from 'Controllers/Auth';

const Auth = createSlice({
  name: 'auth',
  initialState: {
    user: '',
    loginUser: '',
    salesUser: false,
    dcmUser: false,
    loading: false,
    authenticated: false,
    themeMode: 'light',

    userGroups: {},
    // isAccountManger: false,

    error: '',
    token: ''
  },
  reducers: {
    logout: (state) => {
      state.user = '';
      state.token = '';
      state.error = '';
      state.loading = false;
      state.tokenValidity = '';
      state.authenticated = false;
    },

    DarkTheme: (state, payload) => {
      state.themeMode = payload;
    }
  },
  extraReducers: {
    [AuthController.login.pending]: (state, { payload }) => {
      state.authenticated = false;
      state.loading = true;
    },
    [AuthController.login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.tokens;
      state.loginUser = payload.loginUser;
      state.userGroups = payload.loginUser;
      if (payload.loginUser.roleName === 'SalesPerson') {
        state.salesUser = true;
        // state.dcmUser = true;
      } else if (payload.loginUser.roleName === 'DprmDcmAdminUser') {
        state.dcmUser = true;
      } else {
        state.salesUser = false;
        state.dcmUser = false;
      }
      state.loading = false;
      state.authenticated = true;
      // window.location.assign("/");
    },
    [AuthController.login.rejected]: (state, { payload }) => {
      state.authenticated = false;
      state.loading = false;
    },

    [AuthController.restoreSession.pending]: (state, { payload }) => {
      state.error = '';
      state.loading = true;
      state.authenticated = false;
    },
    [AuthController.restoreSession.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.tokens;
      state.loginUser = payload.loginUser;
      state.userGroups = payload.loginUser;
      if (payload.loginUser.roleName === 'SalesPerson') {
        state.salesUser = true;
      } else if (payload.loginUser.roleName === 'DprmDcmAdminUser') {
        state.dcmUser = true;
      } else {
        state.salesUser = false;
        state.dcmUser = false;
      }
      state.error = '';
      state.loading = false;
      state.authenticated = true;
    },
    [AuthController.restoreSession.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
      state.authenticated = false;
    }
  }
});

export { Auth };
export default Auth.actions;
