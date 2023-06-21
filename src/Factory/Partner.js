const getfromdata = (base64, row) => {
  const dataURI = `data:application/octet-stream;base64,${base64}`;
  const data = {
    notificationCode: 'contracts-Share-PPC-1',
    inputValue: {
      partnerName: row?.PARTNER_NAME,
      partnerID: row?.Partner_ID,
      url: ''
    },
    emailTo: row?.EMAIL_ID,
    msisdn: ''

    // notificationId: "1938",
  };

  const formData = new FormData();
  formData.append('files', dataURLtoFile(dataURI), `${row?.CONTRACT_ID}.pdf`);
  formData.append('emailUserInput', JSON.stringify(data));

  return formData;
};

const dataURLtoFile = (dataurl, filename) => {
  if (dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'user.pdf', { type: 'application/pdf' });
  }
};
const makesearchList = (data) => {
  let list = {};

  if (data) {
    (list.partnerName =
      data.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME),
      (list.partnerId =
        data.PartnerProfileCreation?.PartnerDetails?.Partner_ID),
      (list.mobileNo =
        data.PartnerProfileCreation?.PrimaryContactDetails?.MOBILE_NUMBER),
      (list.email =
        data.PartnerProfileCreation?.PrimaryContactDetails?.EMAIL_ID),
      (list.primarycontactName =
        data.PartnerProfileCreation?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME),
      (list.contractCount = data?.contractCount?.toString()),
      (list.productCount = data?.productCount?.toString()),
      (list.tenantCount = data?.tenantCount?.toString()),
      (list.partnerRegno =
        data.PartnerProfileCreation?.PartnerDetails?.PARTNER_REGISTRATION_NUMBER),
      (list.status = data.PartnerProfileCreation?.status);
    list.OnboardStatus =
      data?.PartnerProfileCreation?.PartnerDetails?.Onboarding_Status;
  }

  let listdata = {
    list,
    searchlist: data
  };
  return listdata;
};

const makeTenantsearchList = (data) => {
  let list = {};

  if (data) {
    (list.tenantName = data.TenantProfileCreation?.TenantDetails?.TENANT_NAME),
      (list.tenantId = data.TenantProfileCreation?.TenantDetails?.TENANT_ID),
      (list.mobileNo =
        data.TenantProfileCreation?.PrimaryContactDetails?.MOBILE_NUMBER),
      (list.email =
        data.TenantProfileCreation?.PrimaryContactDetails?.EMAIL_ID),
      (list.primarycontactName =
        data.TenantProfileCreation?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME),
      (list.tenantRegno =
        data.TenantProfileCreation?.TenantDetails?.COMPANY_REGISTRATION_NUMBER),
      (list.status = data.TenantProfileCreation?.status),
      (list.partnerName =
        data.TenantProfileCreation?.TenantDetails?.TENANT_NAME),
      (list.contractCount = data?.contractCount?.toString()),
      (list.productCount = data?.productCount?.toString()),
      (list.tenantCount = data?.tenantCount?.toString()),
      (list.partnerId = data.TenantProfileCreation?.TenantDetails?.TENANT_ID),
      (list.partnerUid = data.TenantProfileCreation?.TenantDetails?.Partner_ID);
    list.OnboardStatus =
      data?.TenantProfileCreation?.TenantDetails?.Onboarding_Status;
  }

  let listdata = {
    list,
    searchlist: data
  };
  return listdata;
};

const makeproductsearchList = (data) => {
  let list = {};

  if (data) {
    (list.productName = data.AddProduct?.ProductDetails?.PRODUCT_NAME),
      (list.productId = data.AddProduct?.ProductDetails?.PRODUCT_ID),
      (list.lob = data.AddProduct?.ProductDetails?.PRODUCT_LOB),
      (list.technology = data.AddProduct?.ProductDetails?.PRODUCT_TECHNOLOGY),
      //  list.primarycontactName=data.AddProduct?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME,
      //  list.productRegno=data.AddProduct?.ProductDetails?.COMPANY_REGISTRATION_NUMBER,
      (list.status = data.AddProduct?.status),
      (list.partnerName = data.AddProduct?.ProductDetails?.PRODUCT_NAME),
      (list.PARTNERID = data.AddProduct?.ProductDetails?.Partner_ID);
    list.partnerId = data.AddProduct?.ProductDetails?.PRODUCT_ID;
    list.partnerUid = data.AddProduct?.ProductDetails?.Partner_ID;
    list.OnboardStatus = data?.AddProduct?.status;
  }

  let listdata = {
    list,
    searchlist: data
  };
  return listdata;
};
const makeagentsearchList = (data) => {
  let list = {};

  if (data) {
    (list.agentName = data.ResellerProfileCreation
      ?.DealerDetails?.FIRST_NAME),
      (list.agentId = data.ResellerProfileCreation?.DealerDetails?.Agent_ID),
      (list.mobileNo = data.ResellerProfileCreation?.DealerDetails?.MOBILE_NO),
      (list.email = data.ResellerProfileCreation?.DealerDetails?.EMAIL),
      //  list.primarycontactName=data.AddProduct?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME,
       list.agentRegno=data.ResellerProfileCreation?.DealerDetails?.DEALER_LICENCE_NUMBER       ,
      
      (list.subCategory = data.ResellerProfileCreation?.DealerDetails?.SUB_CATEGORY),
      (list.category =  data.ResellerProfileCreation?.DealerDetails?.CATEGORY);
      (list.contractCount = data?.contractCount?.toString()),
      (list.productCount = data?.productCount?.toString()),
      (list.tenantCount = data?.tenantCount?.toString()),
    list.OnboardStatus =  data.ResellerProfileCreation?.DealerDetails?.Onboard_Status;
  }

  let listdata = {
    list,
    searchlist: data
  };
  return listdata;
};

const getist = (data) => {
  let list = {};
  _.map(data, (item) => {
    list[item.columns.id] = item;
  });

  return list;
};

const filterByvalue = (payload) => {
  let temp = Object.values(payload.context).filter((person) => {
    const savageMatch =
      JSON.stringify(person.columns)
        .toLowerCase()
        .indexOf(payload.value.toLowerCase()) !== -1;
    if (savageMatch) return getist(savageMatch);
  });
  return temp;
};

const filterByvalueReports = (payload) => {
  let TEMP = payload.context.filter((person) => {
    const savageMatch =
      JSON.stringify(person)
        .toLowerCase()
        .indexOf(payload.value.toLowerCase()) !== -1;
    if (savageMatch) return savageMatch;
  });
  return TEMP;
};
const productdetails = (product) => {
  let data = {};

  data.productName = _.get(
    product,
    'AddProduct.ProductDetails.PRODUCT_NAME',
    '--'
  );
  data.productId = _.get(product, 'AddProduct.ProductDetails.PRODUCT_ID', '--');
  data.lob = _.get(product, 'AddProduct.ProductDetails.PRODUCT_LOB', '--');
  data.technology = _.get(
    product,
    'AddProduct.ProductDetails.PRODUCT_TECHNOLOGY',
    '--'
  );
  data.productData = product;

  return data;
};

const getWalletId = (context) => {
  let id = '';
  if (context?.details?.formIdentity === 'Partner_Profile') {
    id = _.get(
      context.details,
      'PartnerProfileCreation.PartnerDetails.Wallet_ID',
      ''
    );
  } else if (context?.details?.formIdentity === 'Tenant_Partner_Profile') {
    id = _.get(
      context.details,
      'TenantProfileCreation.TenantDetails.Wallet_ID',
      ''
    );
  }
  return id;
};
const getCameltoSpace = (item) => {
  return _.startCase(item);
};

const removeUnderScore = (item) => {
  if (item.includes('_')) {
    return item.split('_').join(' ');
  } else {
    return _.upperCase(_.startCase(_.upperFirst(item)));
  }
};

const getPartnerOnboard = (data) => {
  let isValid = false;

  if (data?.ONE_TIME_CHARGES === 0 && +data?.SECURITY_DEPOSIT <= 0) {
    isValid = true;
  } else if (data?.ONE_TIME_CHARGES === 0.0 && +data?.SECURITY_DEPOSIT <= 0) {
    isValid = true;
  } else if (data?.ONE_TIME_CHARGES === '' && +data?.SECURITY_DEPOSIT <= 0) {
    isValid = true;
  } else if (data?.ONE_TIME_CHARGES === '' && +data?.SECURITY_DEPOSIT === '') {
    isValid = true;
  }

  return isValid;
};

const StartTOcamelcase = (data) => {
  return _.upperCase(_.startCase(_.camelCase(data)));
};

const makeparseRes = (data) => {
  let Segment = excuteMap(0, data);
  // let Channels = excuteMap(1, data)

  let Category = excuteMap(1, data);
  let taxCategory = excuteMap(3, data);
  let charges = excuteMap(4, data);
  let Channels = excuteMap(5, data);

  return {
    Segment,
    Channels: Channels,

    Category,
    taxCategory,
    charges,
    configservice: _.map(
      data[2]?.data?.productOfferingPrice?.priceType,
      (item) => {
        return {
          code: item.value,
          name: item.label
        };
      }
    )
  };
};
const excuteMap = (value, data) => {
  return _.map(data[value].data, (item) => {
    if (item?.id) {
      return {
        code: item.id,
        name: item.name
      };
    } else {
      return {
        code: item,
        name: item
      };
    }
  });
};

const makePartnerlist = (data) => {
  let list = {};
  if (data) {
    (list.name = data.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME),
      (list.label = data.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME),
      (list.code = data.PartnerProfileCreation?.PartnerDetails?.Partner_ID);
  }

  let listdata = {
    ...list,
    searchlist: data
  };
  return listdata;
};

const makeTenantlist = (data) => {
  let list = {};

  if (data) {
    (list.name = data.TenantProfileCreation?.TenantDetails?.TENANT_NAME),
      (list.label = data.TenantProfileCreation?.TenantDetails?.TENANT_NAME),
      (list.code = data.TenantProfileCreation?.TenantDetails?.TENANT_ID);
  }

  let listdata = {
    ...list,
    searchlist: data
  };
  return listdata;
};

const makeProductlistView = (data) => {
  let list = {};

  if (data) {
    (list.name = data.AddProduct?.ProductDetails?.PRODUCT_NAME),
      (list.code = data.AddProduct?.ProductDetails?.PRODUCT_ID),
      (list.label = data.AddProduct?.ProductDetails?.PRODUCT_NAME);
  }

  let listdata = {
    ...list,
    searchlist: data
  };
  return listdata;
};

export default {
  getfromdata,
  dataURLtoFile,
  makesearchList,
  makeTenantsearchList,
  makeproductsearchList,
  filterByvalue,
  productdetails,
  getWalletId,
  getCameltoSpace,
  removeUnderScore,
  getPartnerOnboard,
  makeparseRes,
  makePartnerlist,
  makeTenantlist,
  makeProductlistView,
  filterByvalueReports,
  makeagentsearchList
};
