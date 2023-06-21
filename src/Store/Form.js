import { createSlice } from '@reduxjs/toolkit'

const dummyFormState = {
  values: {},
  fields: {},
  meta: {},
  canSubmit: false,
  errors: {},
  loading: false,
  submitting: false
}

const Form = createSlice({
  name: "form",
  initialState: {
    forms: {}
  },
  reducers: {
    add: (state, { payload }) => {
      state.forms[payload] = dummyFormState
    },
    initMetadata: (state, { payload }) => {
      const { id, data } = payload
      if(id && state.forms[id] && data) {
        for( const field of data ) {
          state.forms[id].meta[field.name] = field.value
        }
      } 
    },
    
    addMetadata: (state, { payload }) => {
      state.forms[payload.id].meta[payload.field] = payload.value
    },

    updateValue: (state, { payload }) => {
      const { id, field, value } = payload
      if(id && state.forms[id]) {
        state.forms[id].values[field] = value
      }
    },

    updateFields: (state, { payload }) => {
      const { id, fields } = payload
      
      if(id && state.forms[id] && fields) {
        fields.map( field => {
          state.forms[id].fields[field.name] = field.value
        })
      }
    },

    updateValues: (state, { payload }) => {
      const { id, fields } = payload
      
      if(id && state.forms[id] && fields) {
        fields.map( field => {
          state.forms[id].values[field.name] = field.value
        })
      }
    }
  }
})

export { Form }
export default Form.actions