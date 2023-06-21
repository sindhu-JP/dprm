import { TecnotreeProduct } from "../axios";
import Products from "lib/constants/products";

const getProductList = async (lob) => {

  try {
    const lobs = lob.split(",");
    let response = [];

    Products.map((prod) => {
      if (lobs.includes(prod.productSpecification.LoB)) {
        response.push(prod);
      }
    });

    return response;
  } catch (err) {
    return {
      error: "",
    };
  }
};

const get = async (lob, name, lobkey, technology, business) => {

  let endpoint =
    "/dclm-product-catalog/product-offering?lifecycleStatus=Launched&channel.name=CRM&isSellable=true&category.name=Plan&depth=1&limit=20&offset=0";

  // if (lob&&technology) {

  //   endpoint = endpoint + `&productSpecification.LoB=${lob}&productSpecification.technology=${technology}`;
  // }else
  // if (lob&&!technology) {
  //   endpoint = endpoint + `&productSpecification.LoB=${lob}`;
  // }

  if (lob && technology && business) {

    endpoint = endpoint + `&productSpecification.LoB=${lob}&productSpecification.technology=${technology}&businessType=${business}`;
  } else
    if (lob && !technology && !business) {
      endpoint = endpoint + `&productSpecification.LoB=${lob}`;
    }
    else if (lob && technology && !business) {
      endpoint = endpoint + `&productSpecification.LoB=${lob}&productSpecification.technology=${technology}`;
    }
    else if (lob && !technology && business) {
      endpoint = endpoint + `&productSpecification.LoB=${lob}&businessType=${business}`;
    }

    else if (lobkey && name) {
      endpoint = endpoint + `&q=${name}`;
    }
  return await TecnotreeProduct.get(endpoint)
    .then((res) => res.data)
    .catch((err) => null);
};

const getFullProduct = async (id) => {
  let endpoint = `/dclm-product-catalog/product-offering/${id}?depth=3`;

  return await TecnotreeProduct.get(endpoint)
    .then((res) => res.data)
    .catch((err) => null);
};

export default {
  getProductList,
  get,
  getFullProduct,
};
