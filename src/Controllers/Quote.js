import { createAsyncThunk } from "@reduxjs/toolkit";
import QuoteAPI from "Http/api/quote";

const create = createAsyncThunk(
  "lead/createQuote",
  async (payload, { dispatch }) => {}
);

export default {
  create,
};
