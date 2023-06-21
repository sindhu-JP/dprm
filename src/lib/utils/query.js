const fromObj = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

const getParameter = (url) => {
  if (url.split("?")[0] === "") {
    let params = {};
    let parameterString = url.split("?")[1];
    let paramArray = parameterString.split("&");

    paramArray.map((param) => {
      let propValue = param.split("=");

      let key = propValue[0];
      let value = propValue[1];

      params[key] = value;
    });

    return params;
  }
};

export default {
  fromObj,
  getParameter,
};
