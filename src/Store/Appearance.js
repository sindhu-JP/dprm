import { createSlice } from "@reduxjs/toolkit";
const Appearance = createSlice({
  name: "Appearance",
  initialState: {
    ThemeType: 'light'
  },
  error: {
    userInfo: ""
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.ThemeType = payload.ThemeType
    }
  },
});
export { Appearance };
export default Appearance.actions;