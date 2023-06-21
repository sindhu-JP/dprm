import { createAsyncThunk } from '@reduxjs/toolkit';

import Alert from 'Store/Alert';

const ErrorHandler = createAsyncThunk(
  'dashboard/ErrorHandler',
  async ({ payload }, { dispatch }) => {
    dispatch(
      Alert.open({
        type: 'error',
        message: payload?.message
      })
    );
  }
);

export default {
  ErrorHandler
  //   VerifyOTP
};
