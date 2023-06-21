import { createAsyncThunk } from '@reduxjs/toolkit';
import MasterdataAPI from 'Http/api/masterdata';
import config from 'config';
const masterDataLoad = createAsyncThunk(
  'master/masterDataLoad',
  async (options, { dispatch }) => {
    if (config.appTheme === 'moments') {
      const data = await MasterdataAPI.load().catch((err) => {
        throw new Error('Failed to load masterdata');
      });
      return data;
    } else {
      return;
    }
  }
);

const getmasterdata = createAsyncThunk(
  'master/masterDataLoad',
  async (options, { dispatch }) => {
    const data = await MasterdataAPI.DprmMasterdata().catch((err) => {
      throw new Error('Failed to load masterdata');
    });

    return data;
  }
);

export default { masterDataLoad, getmasterdata };
