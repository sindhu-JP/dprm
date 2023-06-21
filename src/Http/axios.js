import axios from 'axios';
import { getItem } from 'Utils/Storage';
import { Storage } from 'lib/utils';
import config from 'config';
import { history } from 'Store';
import {  message} from 'antd';
const development = process.env.NODE_ENV === 'development';

const tecnovosUrl = `${config.dev.server.tecnovos_base_url}`;
const dapUrl = development ? `` : `${config.dev.server.dlpm_base_url}`;
const mmp = `${config.dev.server.dap_base_url}`;
// const mmp = development
//   ? `${config.dev.server.dap_base_url}`
//   : `${config.dev.server.dap_base_url}`;
const Documenturl = `${config.dev.server.dclm_base_url}/documentManagement/v1`;

const productUrl = development
  ? `/product/dcm/product-offering-qualification/v1/`
  : `${config.dev.server.dlpm_base_url}/dcm/product-offering-qualification/v1/`;

const tecnotreeUrl = development
  ? '/product/dlpm/presales-service/v1/'
  : `${config.dev.server.dlpm_base_url}/dlpm/presales-service/v1/`;
const DMS = development
  ? '/documentManagement/v1/document/'
  : `${config.dev.server.dlpm_base_url}/documentManagement/v1/document/`;
const digitalwallet = development
  ? '/product/wallet/digital-wallet/v1/'
  : `${config.dev.server.dlpm_base_url}/wallet/digital-wallet/v1/`;

const sales = development
  ? '/product/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1'
  : `${config.dev.server.dlpm_base_url}/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1`;

const relatedPartyUrl = development
  ? '/product/customer-service/customerManagement/v1/'
  : `${config.dev.server.dlpm_base_url}/customer-service/customerManagement/v1/`;

const SubscriptiondaUrl = development
  ? '/productInventoryManagement/v1/'
  : `${config.dev.server.dlpm_base_url}/productInventoryManagement/v1/`;

const tecnotreeDoc = development
  ? '/rules-service/1/'
  : `${config.dev.server.dlpm_base_url}/rules-service/1/`;

const tecnotreeProductUrl = development
  ? '/product'
  : `${config.dev.server.dclm_base_url}`;
const vasproducts = development
  ? '/dclm-product-catalog/'
  : `${config.dev.server.dclm_base_url}/dclm-product-catalog/`;

const tecnotreePartyManagementUrl = development
  ? '/product/customer-service/partyManagement/v1/'
  : `${config.dev.server.dclm_base_url}/customer-service/partyManagement/v1/`;
const tecnotreeDocumentUrl = development
  ? '/product/documentManagement/v1'
  : `${config.dev.server.dclm_base_url}/documentManagement/v1/`;

const customervalidate = development
  ? '/customer-service/customerManagement/v1/'
  : `${config.dev.server.dclm_base_url}/customer-service/customerManagement/v1/`;
const dclmPartyInteraction1 = development
  ? `/partyInteractionManagement/v1`
  : `${config.dev.server.dclm_base_url}/partyInteractionManagement/v1`;
// digital-trouble-ticket/trouble-ticket-management-back-end-dynamic-forms/v1/troubleTicket?relatedParty.id=tycoonn
const TroubleTicket_System = development
  ? '/api/digital-trouble-ticket/trouble-ticket-management-back-end-dynamic-forms/v1/'
  : `${config.dev.server.dclm_base_url}/digital-trouble-ticket/trouble-ticket-management-back-end-dynamic-forms/v1/`;
const contractMangement = development
  ? '/product/digital-contract/digital-contract-management-service/v1'
  : `${config.dev.server.dlpm_base_url}/digital-contract/digital-contract-management-service/v1`;

// agent management axios
const agentManagement = development
  ? '/product/mpos/agent'
  : `${config.dev.server.dclm_base_url}/mpos/agent`;

  // forms data 

  const pendingCountURL = development ? '/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1'
  : `${config.dev.server.dclm_base_url}/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1`;

const DamFormURL = `${config.dev.server.dclm_base_url}/digital-agent/digital-agent-management-service/v1`;

// Axios Initialization
const Tecnovos = axios.create({ baseURL: tecnovosUrl });
const Tecnotree = axios.create({ baseURL: tecnotreeUrl });
const TecnotreeDms = axios.create({ baseURL: tecnotreeDocumentUrl });
const TecnotreeProduct = axios.create({ baseURL: tecnotreeProductUrl });
const Tecnotreevasproducts = axios.create({ baseURL: vasproducts });
const TecnotreeTroubleTicket = axios.create({ baseURL: TroubleTicket_System });
const Tecnotreeproducts = axios.create({ baseURL: productUrl });
const TecnotreeDoccheck = axios.create({ baseURL: tecnotreeDoc });
const Tecnotreerelatedpaty = axios.create({ baseURL: relatedPartyUrl });
const TecnotreeDMS = axios.create({ baseURL: DMS });
const Tecnotreewallet = axios.create({ baseURL: digitalwallet });

const TecnotreeSubscription = axios.create({ baseURL: SubscriptiondaUrl });

const Tecnotreevalidate = axios.create({ baseURL: customervalidate });
const TecnotreePartyManagement = axios.create({
  baseURL: tecnotreePartyManagementUrl
});
const DAP = axios.create({ baseURL: dapUrl });
const Tecnotreemmp = axios.create({ baseURL: mmp });
const DclmPartyInteraction = axios.create({ baseURL: dclmPartyInteraction1 });
const TecnotreedigitalSales = axios.create({ baseURL: sales });
const TecnotreeForm = axios.create({ baseURL: '' });
const DPRM_DMS = `${config.dev.server.dclm_base_url}/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload`;
const DPRM_DOM = `${config.dev.server.dclm_base_url}/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/`;
const DAM_DMS = `${config.dev.server.dclm_base_url}/digital-agent/digital-agent-management-service/v1/fileupload`;
const Tecnotree_DOM = axios.create({ baseURL: DPRM_DOM });

const TecnotreeContractMangement = axios.create({ baseURL: contractMangement });
const TecnotreeAgentManagement = axios.create({ baseURL: agentManagement });
const pendingCount = axios.create({baseURL: pendingCountURL})
const Productpromotion = axios.create({baseURL:sales})
const TTDamFormURL = axios.create({ baseURL: DamFormURL });
const getaccessToken = () => {
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (token) {
    return token;
  }
};

// Handle invalid token
const handle401 = async (error) => {

  console.log(error?.response?.data , "errrrrr")
  
  if(error?.response?.data?.code === "400") {
    message.error(error?.response?.data?.message, 1);
    return error;
  }
  if (error?.response?.status === 401) {
    await Storage.clear();
    history.push(`${config.basePath}sessionout`);
    // window.location.assign('/digital-prm-web-ui');
    Promise.reject(error);
  } 

  if(error?.response?.data?.code === "409") {
    message.error(error?.response?.data?.reason, 1);
    return error;
  }
  return error
  
};

// Add auth token to requests
const attachToken = async (config) => {
  const token = await getItem('ACCESS_TOKEN');

  if (config.method === 'patch') {
    config.headers['Content-Type'] = 'application/merge-patch+json';
  } else {
    config.headers['Content-Type'] = `application/json`;
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
};

// Add Necessary headers
const modifyHeaders = async (config) => {
  if (config.method === 'patch') {
    config.headers['Content-Type'] = 'application/merge-patch+json';
  } else {
    config.headers['Content-Type'] = `application/json`;
  }
  return config;
};

// Axios instance for Tecnovos API calls
Tecnovos.interceptors.request.use(modifyHeaders);
Tecnovos.interceptors.response.use((response) => response, handle401);
Tecnotreevalidate.interceptors.request.use(attachToken);
Tecnotreevalidate.interceptors.response.use((response) => response, handle401);
Tecnotree_DOM.interceptors.request.use(attachToken);
Tecnotree_DOM.interceptors.response.use((response) => response, handle401);
Tecnotreeproducts.interceptors.request.use(attachToken);
Tecnotreeproducts.interceptors.response.use((response) => response, handle401);
Tecnotreerelatedpaty.interceptors.request.use(attachToken);
Tecnotreerelatedpaty.interceptors.response.use(
  (response) => response,
  handle401
);
Tecnotreevasproducts.interceptors.request.use(attachToken);
Tecnotreevasproducts.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreeSubscription.interceptors.request.use(attachToken);
TecnotreeSubscription.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreeDoccheck.interceptors.request.use(attachToken);
TecnotreeDoccheck.interceptors.response.use((response) => response, handle401);
TecnotreedigitalSales.interceptors.request.use(attachToken);
TecnotreedigitalSales.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreeTroubleTicket.interceptors.request.use(attachToken);
TecnotreeTroubleTicket.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreeContractMangement.interceptors.request.use(attachToken);
TecnotreeContractMangement.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreeForm.interceptors.request.use(attachToken);
TecnotreeForm.interceptors.response.use((response) => response, handle401);
Tecnotreewallet.interceptors.request.use(attachToken);
Tecnotreewallet.interceptors.response.use((response) => response, handle401);
TecnotreeDMS.interceptors.request.use(attachToken);
TecnotreeDMS.interceptors.response.use((response) => response, handle401);
// Axios instance for tecnotree for general api calls
Tecnotree.interceptors.request.use(attachToken);
Tecnotree.interceptors.response.use((response) => response, handle401);
TecnotreeDms.interceptors.request.use(attachToken);
Tecnotree.interceptors.response.use((response) => response, handle401);
Tecnotreerelatedpaty.interceptors.response.use(
  (response) => response,
  handle401
);
//Axios instance for dap for general api calls
DAP.interceptors.request.use(attachToken);
DAP.interceptors.response.use((response) => response, handle401);

Tecnotreemmp.interceptors.response.use(attachToken);
Tecnotreemmp.interceptors.response.use((response) => response, handle401);

// Axios instance for tecnotree for general api calls
TecnotreePartyManagement.interceptors.request.use(attachToken);
TecnotreePartyManagement.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreedigitalSales.interceptors.response.use(
  (response) => response,
  handle401
);
TecnotreeAgentManagement.interceptors.request.use(attachToken);
TecnotreeAgentManagement.interceptors.response.use(
  (response) => response,
  handle401
);
pendingCount.interceptors.request.use(attachToken);

pendingCount.interceptors.response.use(
  (response) => response,
  handle401
);
Productpromotion.interceptors.request.use(attachToken);

Productpromotion.interceptors.response.use(
  (response) => response,
  handle401
);
TTDamFormURL.interceptors.request.use(attachToken);
TTDamFormURL.interceptors.response.use(
  (response) => response,
   handle401
);
// Axios instance for calling ttProduct catalog API=
TecnotreeProduct.interceptors.request.use(attachToken);
TecnotreeProduct.interceptors.response.use((response) => response, handle401);

DclmPartyInteraction.interceptors.request.use(attachToken);
DclmPartyInteraction.interceptors.response.use(
  (response) => response,
  handle401
);

export {
  Tecnovos,
  Tecnotree,
  Tecnotreemmp,
  TecnotreeProduct,
  TecnotreePartyManagement,
  TecnotreeDms,
  DAP,
  getaccessToken,
  Tecnotreevalidate,
  Tecnotreeproducts,
  TecnotreeDoccheck,
  Tecnotreerelatedpaty,
  Documenturl,
  TecnotreeSubscription,
  Tecnotreevasproducts,
  DclmPartyInteraction,
  TecnotreedigitalSales,
  TecnotreeForm,
  Tecnotreewallet,
  DPRM_DMS,
  Tecnotree_DOM,
  TecnotreeTroubleTicket,
  TecnotreeContractMangement,
  contractMangement,
  TecnotreeAgentManagement,
  pendingCount,
  TTDamFormURL,
  DAM_DMS,
  TecnotreeDMS,
  Productpromotion
};
