import { Tecnovos } from "../axios";

const getLobFeasibiltyList = async () => {
  try {
    const response = await Tecnovos.get("/lob");
    return {
      data: response.data,
    };
  } catch (err) {
    throw Error("Failed to get lob feasibility.");
  }
};
export default {
  getLobFeasibiltyList,
};

export { getLobFeasibiltyList };
