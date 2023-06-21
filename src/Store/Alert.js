import { createSlice } from "@reduxjs/toolkit";

const Alert = createSlice({
  name: "alert",
  initialState: {
    open: false,
    message: "",
    type: "",
  },
  
  reducers: {
    open: (state, { type, payload }) => {
      state.message = payload.message;
      state.type = payload.type;
      state.open = true;
    },
    close: (state) => {
      state.message = "";
      state.type = "";
      state.open = false;
    },
  },
});

export { Alert };
export default Alert.actions;
