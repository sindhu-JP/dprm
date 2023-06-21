import { TecnotreedigitalSales } from './../axios';

const getFields = async (formId, stepId) => {
  const data = await TecnotreedigitalSales.get(
    `step?formIdentity=${formId}&stepIdentity=${stepId}`
  ).then((res) => res.data);
  return data;
};

const getPartnerNumber = async (type) => {
  const data = await TecnotreedigitalSales.get(
    `partnerreidgenarate/${type}`
  ).then((res) => res.data);
  return data;
};

export default {
  getFields,
  getPartnerNumber
};
