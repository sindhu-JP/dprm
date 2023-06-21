import { createSlice } from "@reduxjs/toolkit";
import ProductsController from "Controllers/Products";

const Products = createSlice({
  name: "products",
  initialState: {
    ids: [],
    entities: {},
    loading: {
      products: false,
    },
    errors: {
      products: false,
    },
  },
  extraReducers: {
    [ProductsController.load.pending]: (state) => {
      state.errors.products = "";
      state.loading.products = true;
    },
    [ProductsController.load.fulfilled]: (state, { payload }) => {
      let ids = [];
      let entities = {};
      if (payload) {
        if (payload && payload.length) {
          for (const product of payload) {
            if (!ids.includes(product.id)) {
              ids.push(product.id);
              entities[product.id] = product;
            }
          }
        }
      }

      state.ids = ids;
      state.entities = entities;
      state.errors.products = "";
      state.loading.products = false;
    },
  },
});

export { Products };
export default Products.actions;
