import { createSlice } from "@reduxjs/toolkit";
import MasterdataController from "Controllers/Masterdata";

const Master = createSlice({
  name: "master",
  initialState: {
    data: null,
    loading: false,
    error: "",
    masterData:{}
  },
  extraReducers: {
    // [MasterdataController.masterDataLoad.pending]: (state, action) => {
    //   state.loading = true;
    //   state.error = "";
    // },
    // [MasterdataController.masterDataLoad.fulfilled]: (state, { payload }) => {
    //   state.data = payload;
    //   state.error = "";
    //   state.loading = false;
    // },
    // [MasterdataController.masterDataLoad.rejected]: (state, { error }) => {
    //   state.error = error.message;
    //   state.loading = false;
    // },


    [MasterdataController.getmasterdata.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [MasterdataController.getmasterdata.fulfilled]: (state, { payload }) => {
      state.masterData = _.get(payload, "[0].masterData", {});
      state.data = _.get(payload);
      state.error = "";
      state.loading = false;
    },
    [MasterdataController.getmasterdata.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },



    
  },
});

export { Master };
export default Master.actions;
