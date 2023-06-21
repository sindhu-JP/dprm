import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductsAPI from "Http/api/product";

const load = createAsyncThunk("products/load", async (option, { dispatch }) => {
  const products = await ProductsAPI.get(option.lob, option.name, option.lobkey, option.tecnology, option.business).catch((err) => {
    throw new Error("Failed to load products");
  });

  return products;
});

export default { load };
