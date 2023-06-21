import { createAsyncThunk } from '@reduxjs/toolkit';
import contractAPI from '../Http/api/contract';

const getContractDetails = createAsyncThunk(
  'contracts/getContractDetails',
  async (formID) => {
    const data = contractAPI.getContractDetails(formID);
    return data;
  }
);
export default {
  getContractDetails
};
