import { TecnotreeContractMangement, TecnotreedigitalSales } from './../axios';

const getContractDetails = async (formID) => {
  const data = await TecnotreedigitalSales.get(
    `/submit/Add_Contract/${formID}`
  ).then((res) => res.data);
  return data;
};

const getContractDocs = async () => {
  const data = await TecnotreeContractMangement.get(
    `/contract?lob=Mobile&technologyType=Fiber`
  ).then((res) => res.data);
  return data;
};
const getDocumentDetails = async (payload) => {
  const data = await TecnotreeContractMangement.post(
    `contract/getAllContractsByPageUsingCustomFieldsUsingAnd`,
    payload
  ).then((res) => res.data);
  return data;
};

export default { getContractDetails, getContractDocs, getDocumentDetails };
