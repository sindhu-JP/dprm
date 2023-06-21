import { createSlice } from "@reduxjs/toolkit";
import HierarchyController from "Controllers/Hierarchy";

const Hierarchy = createSlice({
  name: "hierarchy",
  initialState: {
    data: null,
    // loading: false,
    // error: "",

    userInfo:{},

    loading:{
      userInfo:false


    },
  error:{
    userInfo:""
  }
  },
  extraReducers: {
    [HierarchyController.loadHirarchy.pending]: (state, action) => {
      state.loading.userInfo = true;
      state.error.userInfo = "";
    },
    [HierarchyController.loadHirarchy.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.error.userInfo = "";
      state.loading.userInfo = false;
    },
    [HierarchyController.loadHirarchy.rejected]: (state, { error }) => {
      state.error.userInfo = error.message;
      state.loading.userInfo= false;
    },
  },
});

export { Hierarchy };
export default Hierarchy.actions;