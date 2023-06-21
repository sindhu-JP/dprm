import _ from 'lodash';

const mediums = {
  whatsapp: {
    label: 'Whatsapp',
    icon: 'whatsapp'
  },
  email: {
    label: 'Email',
    icon: 'email'
  },
  sms: {
    label: 'SMS',
    icon: 'sms'
  },
  telegram: {
    label: 'Telegram',
    icon: 'telegram'
  }
};

const dataUse = {
  checkingWorkEmails: {
    label: 'Check Work Emails',
    name: 'checkingWorkEmails'
  },
  checkingPersonalEmails: {
    label: 'Checking Personal Emails',
    name: 'checkingPersonalEmails'
  },
  onlineShopping: {
    label: 'Online Shopping',
    name: 'onlineShopping'
  }
};

// new
const makeReverseCategorySub = ({ addressDetails, masterdata }) => {
  if (!masterdata || !addressDetails) {
    return '';
  }
  const category = _.get(addressDetails, 'customerCategory', '');
  const subcategory = _.get(addressDetails, 'customerSubCategory', '');
  const category1 = _.find(
    masterdata?.partyType[1].category,
    (cnt) => cnt.code === category
  );
  // const subcategory1 = _.find(category1?.subCategory, (prov) => prov.code === subcategory);

  // return category1?.subCategory;
  const fullAddress = category1?.subCategory;

  return {
    fullAddress
  };
  // Object.keys(data).map((sec) => {
  //   if (sec === "companyDetails") {

  //   }
  // })
};

const getPrimaryAddress = ({ addressDetails, masterdata }) => {
  if (!masterdata || !addressDetails) {
    return '';
  }

  const poBox = _.get(addressDetails, 'postcode', '');
  const cityCode = _.get(addressDetails, 'city', '');
  const landmark = _.get(addressDetails, 'landmark', '');
  const countryCode = _.get(addressDetails, 'country', '');
  const address = _.get(addressDetails, 'addressLine1', '');
  const stateCode = _.get(addressDetails, 'stateOrProvince', '');

  const country = _.find(
    masterdata?.country,
    (cnt) => cnt.code === countryCode
  );
  const state = _.find(country?.province, (prov) => prov.code === stateCode);
  const city = _.find(state?.city, (cty) => cty.code === cityCode);

  const fullAddress = {
    country: country?.name,
    state: state?.name || '',
    city: city?.name || '',
    addressLine: address,
    poBox,
    landmark
  };

  return {
    address: fullAddress,
    formattedAddress: `${fullAddress.addressLine}, ${fullAddress.country}, ${fullAddress.state}, ${fullAddress.city}, PO BOX - ${fullAddress.poBox}, ${fullAddress.landmark}`
  };
};

const primaryContactDetails = ({ contactDetails }) => {
  const email = _.get(contactDetails, 'email', '__');
  const mobile = _.get(contactDetails, 'mobile', '__');
  const telegram = _.get(contactDetails, 'teligram', '__');
  const whatsapp = _.get(contactDetails, 'whatsapp', '__');
  const lastName = _.get(contactDetails, 'lastName', '__');
  const firstName = _.get(contactDetails, 'name', '__');
  const designation = _.get(contactDetails, 'designation', '__');

  const phoneNumber = _.get(contactDetails, 'phoneNumber', '__');

  const extensionNumber = _.get(contactDetails, 'extensionNumber', '__');

  const department = _.get(contactDetails, 'department', '__');

  const contactMediums = [];

  Object.entries(_.get(contactDetails, 'contactMedium', [])).map((medium) => {
    if (medium[1]) {
      contactMediums.push(mediums[medium[0]]);
    }
  });

  const details = {
    extensionNumber,
    department,
    phoneNumber,
    email,
    mobile,
    whatsapp,
    telegram,
    lastName,
    firstName,
    designation,
    mediums: contactMediums
  };

  return details;
};

const moreContactDetails = ({ contactDetails }) => {
  const email = _.get(contactDetails, 'email', '__');
  const mobile = _.get(contactDetails, 'mobileNumber', '__');

  const whatsapp = _.get(contactDetails, 'whatsapp', '__');
  const lastName = _.get(contactDetails, 'lastName', '__');
  const firstName = _.get(contactDetails, 'name', '__');
  const telegram = _.get(contactDetails, 'telegram', '__');
  const role = _.get(contactDetails, 'role', '__');
  const phoneNumber = _.get(contactDetails, 'phoneNumber', '__');

  const extensionNumber = _.get(contactDetails, 'extensionNumber', '__');

  const department = _.get(contactDetails, 'department', '__');

  const contactMediums = [];

  Object.entries(_.get(contactDetails, 'contactMedium', [])).map((medium) => {
    if (medium[1]) {
      contactMediums.push(mediums[medium[0]]);
    }
  });

  const details = {
    email,
    mobile,
    whatsapp,
    telegram,
    lastName,
    firstName,
    telegram,
    role,
    extensionNumber,
    department,
    phoneNumber,
    mediums: contactMediums
  };

  return details;
};
const consumptionPattern = ({ consumptionDetails: cDetails }) => {
  const activeMessages = _.get(cDetails, 'activeMessagesPerMonth', '');
  const localCallsMinutes = _.get(cDetails, 'minutesOfLocalCallPerMonth', '');
  const offNetCallsMinutes = _.get(
    cDetails,
    'minutesOfOffnetCallsPerMonth',
    ''
  );
  const internationalVoiceCallMinutes = _.get(
    cDetails,
    'minutesOfInternationVoiceCallsPerMonth',
    ''
  );
  const dataUses = _.get(cDetails, 'dataUse', []).map((use) => dataUse[use]);
  const frequentTraveler = _.get(cDetails, 'frequentTraveler', false);

  const phoneUsedWhileAbroad = _.get(cDetails, 'phoneUsedWhileAbroad', false);
  const roamingDataConnectionImportance = _.get(
    cDetails,
    'roamingDataConnectionImportance',
    false
  );

  const details = {
    calls: {
      activeMessages,
      localCallsMinutes,
      offNetCallsMinutes,
      internationalVoiceCallMinutes
    },
    dataUses,
    frequentTraveler,
    phoneUsedWhileAbroad,
    roamingDataConnectionImportance
  };

  return details;
};

const getCompanyDetails = ({ companyDetails }) => {
  let data = companyDetails;
  let details = {};

  details.name = _.get(data, 'companyName', '');
  details.category = _.get(data, 'customerCategory', '');
  details.industryType = _.get(data, 'industryType', '');
  details.subCategory =
    _.get(data, 'subCategory', '') || _.get(data, 'customerSubCategory', '');
  details.classification = _.get(data, 'leadClassification', '');
  details.registrationNumber = _.get(data, 'registrationNumber', '');
  details.riskCategory = _.get(data, 'riskCategory', '');
  details.registrationExpiryDate = _.get(data, 'registrationExpiryDate', '');

  return details;
};

const getReferralInformation = (lead) => {
  const data = _.get(lead, 'referralInformation', {});
  return data;
};

const getLeadFormOptions = ({
  masterData,
  leads,
  users,
  user,
  hierarchyLob
}) => {
  const options = {
    lobs: [],
    leads: [],
    countries: [],
    designations: [],
    employeCounts: [],
    industryTypes: [],
    messageActivity: [],
    accountManagers: [],
    customerCategories: [],
    leadClassifications: [],
    roamingDataConnectionImportance: []
  };

  options.countries = _.get(masterData, 'country', []);
  options.customerCategories = _.get(masterData, 'partyType[1].category', []);
  options.industryTypes = _.get(masterData, 'industry', []);
  options.leadClassifications = [
    { name: 'Hot', code: 'Hot' },
    { name: 'Medium', code: 'Medium' },
    { name: 'Cold', code: 'Cold' }
  ];
  // options.employeCounts = [
  //   { name: "< 100", code: "<100" },
  //   { name: "101 - 500", code: "101-500" },
  //   { name: "501 - 1000", code: "501 - 1000" },
  // ];
  options.employeCounts = _.get(masterData, 'employees', []);
  options.designations = [
    { name: 'Admin', code: 'admin' },
    { name: 'User', code: 'user' }
  ];

  if (hierarchyLob?.serviceType?.length > 0) {
    options.lobs = _.get(hierarchyLob, 'serviceType', []);
  } else {
    options.lobs = _.get(masterData, 'serviceType', []);
  }
  options.messageActivity = [
    { name: 'Low', code: 'low' },
    { name: 'Moderate', code: 'moderate' },
    { name: 'High', code: 'high' }
  ];
  options.roamingDataConnectionImportance = [
    { name: 'Low', code: 'low' },
    { name: 'Moderate', code: 'moderate' },
    { name: 'High', code: 'high' }
  ];

  if (leads.ids?.length) {
    options.leads = leads.ids.map((leadId) => {
      let lead = leads.entities[leadId];
      return {
        lead,
        name: _.get(lead, 'companyDetails.companyName', ''),
        code: _.get(lead, 'id', ''),
        refName: _.get(lead, 'primaryContactDetails.name', ''),
        refEmail: _.get(lead, 'primaryContactDetails.email', ''),
        refMobile: _.get(lead, 'primaryContactDetails.mobile', '')
      };
    });
  }

  if (users && users.ids && users.entities) {
    options.accountManagers = users.ids.map((userId) => {
      let user = users.entities[userId];
      return {
        ...user,
        name: user.name || '',
        code: user.id
      };
    });
  }

  if (options.accountManagers) {
    options.accountManagers.push({
      name: user.sub,
      code: user.sub
    });
  }
  let data = _.uniqBy(options.accountManagers, 'code');
  options.accountManagers = data;

  return options;
};

const getAddress = ({ installationaddress, data }) => {
  let payload = {
    ...installationaddress,
    Lob: data.name
  };

  return payload;
};

const DocumentsIds = ({ data }) => {
  const companyRegistration = data.purpose.find(
    (item) => item.code === 'companyRegistration'
  );
  const purchaseOrder = data.purpose.find(
    (item) => item.code === 'purchaseOrder'
  );
  const POID = data.purpose.find((item) => item.code === 'POID');
  const Documents = {
    companyRegistration: companyRegistration?.code,
    purchaseOrder: purchaseOrder?.code,
    POID: POID?.code
  };

  return Documents;
};
export default {
  DocumentsIds,
  getAddress,
  moreContactDetails,
  getCompanyDetails,
  getPrimaryAddress,
  getLeadFormOptions,
  consumptionPattern,
  primaryContactDetails,
  makeReverseCategorySub
};

// const getPrimaryAddress = ({ addressDetails, masterdata }) => {

//   if (!masterdata || !addressDetails) {
//     return "";
//   }

//   const poBox = _.get(addressDetails, "postcode", "");
//   const cityCode = _.get(addressDetails, "city", "");
//   const landmark = _.get(addressDetails, "landmark", "");
//   const countryCode = _.get(addressDetails, "country", "");
//   const address = _.get(addressDetails, "addressLine1", "");
//   const stateCode = _.get(addressDetails, "stateOrProvince", "");

//   const country = _.find(
//     masterdata?.country,
//     (cnt) => cnt.code === countryCode
//   );
//   const state = _.find(country?.province, (prov) => prov.code === stateCode);
//   const city = _.find(state?.city, (cty) => cty.code === cityCode);

//   const fullAddress = {
//     country: country?.name,
//     state: state?.name || "",
//     city: city?.name || "",
//     addressLine: address,
//     poBox,
//     landmark,
//   };

//   return {
//     address: fullAddress,
//     formattedAddress: `${fullAddress.addressLine}, ${fullAddress.country}, ${fullAddress.state}, ${fullAddress.city}, PO BOX - ${fullAddress.poBox}, ${fullAddress.landmark}`,
//   };
// };
