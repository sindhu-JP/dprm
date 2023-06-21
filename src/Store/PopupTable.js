import { createSlice } from "@reduxjs/toolkit";

const PopupTable = createSlice({
  name: "popupTable",
  initialState: {
    inProgress: [],
    pending: [],
    loading: true,
    error: '',
  },
  reducers: {
    loading(state) {
      state.loading = false;
    },
    storeTable: (state, { payload }) => {
      state.loading = false;
      state[payload.type] = payload.data;
    },
    error(state, msg) {
      state.loading = false;
      state.error = msg
    },
  }
});

export { PopupTable };
export const { storeTable, error, loading } = PopupTable.actions;
