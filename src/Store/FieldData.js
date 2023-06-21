import { createSlice } from "@reduxjs/toolkit";

const FieldData = createSlice({
  name: "fieldData",
  initialState: {
    loading: false,
    data: {},
  },
  reducers: {
    init: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    updateField: (state, { payload }) => {
      state.data[payload.field] = payload.value;
    },
  },
});

export { FieldData };
export default FieldData.actions;
