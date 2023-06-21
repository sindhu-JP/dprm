import { createAsyncThunk } from '@reduxjs/toolkit'

const LanguageChange = createAsyncThunk(
  'dashboard/LanguageChange',
  async ({payload}) => {
    return payload
  }
);

export default {LanguageChange}