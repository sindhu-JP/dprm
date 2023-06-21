import { createSlice } from "@reduxjs/toolkit";
import EventsController from "Controllers/Events";

const Events = createSlice({
  name: "events",
  initialState: {
    ids: [],
    entities: {},
    loading: {
      creating: false,
      loading: false,
    },
    error: "",
  },
  extraReducers: {
    [EventsController.create.pending]: (state, { payload }) => {
      state.loading.creating = true;
    },
    [EventsController.create.fulfilled]: (state, { payload }) => {
    
      state.entities[payload.id] = payload;
      state.ids.unshift(payload.id);
      state.loading.creating = false;
    },
    [EventsController.create.rejected]: (state, { error }) => {
      state.loading.creating = false;
      state.error = error;
    },

    [EventsController.load.pending]: (state, { payload }) => {
      state.loading.loading = true;
    },
    [EventsController.load.fulfilled]: (state, { payload }) => {
      let ids = [];
      let entities = {};

      payload.map((evt) => {
        if (!ids.includes(evt.id)) {
          ids.push(evt.id);
          entities[evt.id] = evt;
        }
      });

      state.ids = ids;
      state.entities = entities;
      state.loading.loading = false;
    },
    [EventsController.load.rejected]: (state, { error }) => {
      state.loading.loading = false;
      state.error = error;
    },
  },
});

export { Events };
export default Events.actions;
