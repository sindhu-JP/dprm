import { createAsyncThunk } from '@reduxjs/toolkit';

import { Tecnovos } from '../axios';

const nextId = createAsyncThunk('quote/getNextId', async () => {});

export const generate = async (payload) => {
  const res = await Tecnovos.post('/quote', payload);
};

export default { generate };
