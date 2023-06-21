import { createSlice } from '@reduxjs/toolkit';
// import HierarchyController from "Controllers/Hierarchy";
// import LanguageController from "Controllers/Language";

const Language = createSlice({
  name: 'Language',
  initialState: {
    language: 'en'
  },
  error: {
    userInfo: ''
  },

  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload.language;
    }
  }
});

export { Language };
export default Language.actions;
