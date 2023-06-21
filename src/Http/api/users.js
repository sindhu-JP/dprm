import { TecnotreePartyManagement } from "./../axios";

const get = async ({ query }) => {
  let url = "/ssoIndividual";

  if (query) {
    url = url + query;
  }

  return await TecnotreePartyManagement.get(url).then((res) => res?.data || []);
};

export default {
  get,
};
