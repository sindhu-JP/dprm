import { createSlice } from '@reduxjs/toolkit';

const Lob = createSlice({
  name: 'lob',
  initialState: {
    feasibilityList: [],
    loading: false
  },
  reducers: {},
  extraReducers: {
    // [getLobFeasibiltyList.pending]: (state, { payload }) => {
    //   state.loading = true;
    // },
    // [getLobFeasibiltyList.rejected]: (state, { payload }) => {
    //   state.loading = false;
    // },
    // [getLobFeasibiltyList.fulfilled]: (state, { payload }) => {
    //   state.feasibilityList = payload;
    //   state.error = "";
    //   state.loading = false;
    // },
  }
});

export { Lob };
export default Lob.actions;
