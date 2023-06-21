import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import contractController from 'Controllers/contract';
const contractadapter = createEntityAdapter();
const Contracts = createSlice({
  name: 'contracts',
  initialState: contractadapter.getInitialState({
    contractDetails: {},
    errors: {
      fetchContractError: ''
    },
    loading: {
      fetchContract: false
    }
  }),
  reducers: {},
  extraReducers: {
    //   updating potential partner list (pending status)

    [contractController.getContractDetails.pending]: (state, { payload }) => {
      state.loading.fetchContract = true;
      state.errors.fetchContractError = '';
    },

    //   updating potential partner list (rejected status)

    [contractController.getContractDetails.fulfilled]: (state, { payload }) => {
      state.loading.fetchContract = true;
      state.errors.fetchContractError = '';
      state.contractDetails = payload;
    },

    [contractController.getContractDetails.rejected]: (state, { error }) => {
      state.loading.fetchContract = false;
      state.errors.fetchContractError = error.message;
    }
  }
});

export { Contracts };
export default Contracts.actions;
