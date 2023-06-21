import { TecnotreedigitalSales } from './../axios';

const digitalSales = async (name) => {
  return await TecnotreedigitalSales.get(`/dsales/usergrpinfo/${name}`)
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
};

const executeProcess = async (payload) => {
  return await TecnotreedigitalSales.post(`/bpmn/executeProcess`, payload)
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
};

const ApproveQuote = async (payload) => {
  return await TecnotreedigitalSales.post(`/dsales/quoteapproval`, payload)
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
};

export default { ApproveQuote, digitalSales, executeProcess };
