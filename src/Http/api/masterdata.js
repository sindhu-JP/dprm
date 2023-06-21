import { TecnotreeAgentManagement, TecnotreedigitalSales } from 'Http/axios';

// import masterData from 'lib/constants/masterdata'

const load = async () => {
  return await TecnotreeAgentManagement.get(
    // "/masterData?type=dclmMasterData&lang=en"
    '/dprmuMasterData'
  ).then((res) => res.data);
};
const DprmMasterdata = async () => {
  return await TecnotreedigitalSales.get(
    // "/masterData?type=dclmMasterData&lang=en"
    '/masterdata'
  ).then((res) => res.data);
};

export default {
  load,
  DprmMasterdata
};
