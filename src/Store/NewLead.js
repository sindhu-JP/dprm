import { createSlice } from '@reduxjs/toolkit';

const NewLead = createSlice({
  name: 'currentLead',
  initialState: {
    isSaveAndExit: false,
    form: ''
  },
  reducers: {
    updateSection: (state, { payload }) => {
      state.form[payload.section][payload.field] = payload.value;
    },
    updateForm: (state, { payload }) => {
      state.form[payload.property] = payload.value;
    },
    set: (state, { payload }) => {
      state[payload.key] = payload.value;
    }
  }
});

export { NewLead };
export default NewLead.actions;
