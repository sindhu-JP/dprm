import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import PartnerController from '../Controllers/Partner';

const leadsAdapter = createEntityAdapter();
const Partners = createSlice({
  name: 'partners',
  initialState: leadsAdapter.getInitialState({
    // loading: false,
    updating: false,
    walletDetails: {},
    paymentDetails: {},

    errors: {
      payment: ''
      // payment: ''
    },
    loading: {
      paymentloader: false
    }
  }),
  reducers: {},
  extraReducers: {
    // Create Lead

    [PartnerController.SumbmitPayment.pending]: (state, { payload }) => {
      state.loading.paymentloader = true;
      state.errors.payment = '';
    },
    [PartnerController.SumbmitPayment.fulfilled]: (state, { payload }) => {
      state.loading.paymentloader = false;
      (state.walletDetails = payload.walletdetail),
        (state.paymentDetails = payload.partner);
    },
    [PartnerController.SumbmitPayment.rejected]: (state, { error }) => {
      state.loading.paymentloader = false;

      state.errors.payment = error.message;
    }
  }
});

export { Partners };
export default Partners.actions;
