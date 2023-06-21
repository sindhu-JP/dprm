import _ from 'lodash';
import { getItem } from 'Utils/Storage';
import hierarchyApi from 'Http/api/hierarchy';
const makeBlackListCheckPayload = ({ registrationNumber }) => {
  return {
    '@baseType': 'PartyRole',
    '@type': 'Customer',
    customerType: 'Organization',
    engagedParty: {
      '@baseType': 'Party',
      '@referredType': 'Organization',
      organizationIdentification: [
        {
          identificationId: registrationNumber
        }
      ]
    }
  };
};

const makeLobpayload = (data) => {
  let temp = [...data];

  let lobs = [];
  _.map(temp, (item) => {
    let obj = Object.assign({}, { name: item, code: item });
    lobs.push(obj);
  });

  let payload = {
    serviceType: lobs
  };

  return payload;
};

const makeDuplicateCheckdenilist = ({ registrationNumber, name }) => {
  return {
    engagedParty: {
      '@type': 'Organization',
      organizationIdentification: [
        {
          identificationType: 'companyRegistration',
          identificationId: registrationNumber
        }
      ]
    },
    '@type': 'Customer'
  };
};
const makeautocheckpayload = ({ installationaddress, products }) => {
  return {
    productOfferingQualificationItem: [
      {
        product: {
          '@type': 'Product',
          relatedPlace: [
            {
              '@type': 'PlaceRef',
              name: installationaddress.addressLine1,
              role: installationaddress.addressLine1,
              country: installationaddress.country,
              stateOrProvince: installationaddress.stateOrProvince,
              city: installationaddress.city,
              postOfficecode: installationaddress.postcode,
              postBoxNumber: installationaddress.postcode,
              landmark: installationaddress.landmark,
              '@referredType': 'geographicAddress'
            }
          ]
        },
        productOffering: {
          id: products?.id,
          // "href": "https://host:port/productCatalogManagement/v4/productOffering/142789",
          name: products?.name,
          '@referredType': 'ProductOffering'
        },
        state: 'done',
        '@type': 'ProductOfferingQualificationItem'
      }
    ],
    '@type': 'ProductOfferingQualification'
  };
};
const attachments = ({ fileDetails }) => {
  return {
    id: fileDetails.id,
    name: _.get(fileDetails.attachment, '[0].name', ''),
    description: _.get(fileDetails.attachment, '[0].description', ''),
    url: _.get(fileDetails.attachment, '[0].href', ''),
    mimeType: _.get(fileDetails.attachment, '[0].mimeType', ''),
    validFor: {
      startDateTime: fileDetails.documentExpiryDate
    }
  };
};

const makeDuplicateCheckPayload = ({ companyRegistrationNumber }) => {
  return {
    '@baseType': 'PartyRole',
    '@type': 'Customer',
    customerType: 'Organization',
    engagedParty: {
      '@baseType': 'Party',
      '@referredType': 'Organization',

      organizationIdentification: [
        {
          identificationType: 'companyRegistration',
          identificationId: companyRegistrationNumber,
          issuingAuthority: 'Non impedit volupta',
          issuingDate: '2020-10-01T14:55:00.000Z'
        }
      ]
    }
  };
};

const makeNewLeadPayload = (data) => {
  let temp = {
    ...data
  };

  Object.keys(data).map((sec) => {
    if (sec === 'assignment') {
      temp.leadAssignment = data[sec];

      delete temp.assignment;
    }

    if (sec === 'lob' && data[sec]) {
      temp.lob = data[sec]?.reduce((acc, curr) => {
        if (acc) {
          return `${acc},${curr.code}`;
        } else {
          return curr.code;
        }
      }, '');
    }

    if (sec === 'companyDetails') {
      let details = data[sec];
      const { source, websiteUrl, numberOfEmployee, expectedClosureDate } =
        details.optional;

      details.customerCategory = details.customerCategory.code;
      details.customerSubCategory = details.subCategory.code;
      details.industryType = details.industryType.code;
      details.leadClassification = details.leadClassification.code;
      // details.expectedClosureDate = details.expectedClosureDate;

      delete temp.companyDetails.subCategory;

      if (source || websiteUrl || numberOfEmployee || expectedClosureDate) {
        details.optionalDetails = {
          ...(source && { source }),
          ...(websiteUrl && { websiteUrl }),
          ...(numberOfEmployee && { numberOfEmployee: numberOfEmployee.code }),
          ...(expectedClosureDate && { expectedClosureDate })
        };
        delete temp.companyDetails.optional;
      }

      temp.companyDetails = details;
    }

    if (sec === 'companyAddress') {
      let address = data[sec];

      address.country = address.country.code;
      address.stateOrProvince = address.stateOfOrigin.code;
      address.city = address.city.code;
      address.postcode = address.poBox;

      delete address.poBox;
      delete address.stateOfOrigin;

      temp.companyAddress = address;
    }

    if (sec === 'consumptionPattern') {
      let pattern = data[sec];

      pattern.frequentTraveler = pattern.frequentTraveler || false;
      pattern.phoneUsedWhileAbroad = pattern.phoneUsedWhileAbroad || false;

      if (pattern.activeMessagesPerMonth)
        pattern.activeMessagesPerMonth = pattern.activeMessagesPerMonth.code;
      if (pattern.phoneUsedWhileAbroad)
        pattern.phoneUsedWhileAbroad = pattern.phoneUsedWhileAbroad.code;

      if (pattern.dataUse) {
        pattern.dataUse = Object.keys(pattern.dataUse)
          .map((key) => pattern.dataUse[key] && key)
          .filter((d) => d);
      }

      temp.consumptionPattern = pattern;
    }

    if (sec === 'primaryContactDetails') {
      let contact = data[sec];

      const contactvalue = { ...contact.contactMedium };

      const contactMedium = {};
      const { phoneNumber, extensionNumber } = contact;

      contact.mobile = contact.mobileNumber;

      // to convert every value to a boolean
      Object.keys(contactvalue).map((medium) => {
        let d = contactvalue[medium];
        contactMedium[d] = true;
        // contact.contactMedium[medium] = !!contact.contactMedium[medium];
      });

      contact.contactMedium = contactMedium;
      // if (phoneNumber || extensionNumber) {
      //   contact.optionalDetails = {
      //     ...(phoneNumber && { phoneNumber }),
      //     ...(extensionNumber && { extensionNumber }),
      //   }

      // delete contact.phoneNumber;
      // delete contact.extensionNumber;
      // }

      delete contact.mobileNumber;
      temp.primaryContactDetails.contactMedium = contactMedium;
      // temp.primaryContactDetails = contact
    }

    if (sec === 'referralInformation') {
      let referral = data[sec];

      referral.companyName = referral.company?.code;
      referral.mobile = referral.refMobile;
      referral.email = referral.refEmail;
      referral.profileManager = referral.refName;

      delete referral.refEmail;
      delete referral.refMobile;
      delete referral.refName;

      temp.referralInformation = referral;
    }

    if (sec === 'moreContact') {
      let details = { ...data[sec] };
      let contacts = {};

      Object.keys(details).map((id) => {
        let d = details[id];
        contacts[d.role] = d;
      });

      delete temp.moreContact;
      temp.primaryContactDetails.moreContact = contacts;
    }

    if (sec === 'attachment') {
      let attachmentdata = data[sec];

      if (attachmentdata.length > 0) {
        temp.attachment = attachmentdata;
      } else {
        temp.attachment = '';
      }
    }
  });
  return temp;
};

const makeTableRow = (lead, opp) => {
  // requestTable(opp);
  let row = {};

  if (lead) {
    let columns = {};
    if (
      lead.status === 'LEAD_APPROVAL' ||
      (lead.status === 'OPPORTUNITY_CREATION' && _.isEmpty(opp)) ||
      lead.status === 'LEAD_DROPPED' ||
      lead.status === 'LEAD_GENERATION'
    ) {
      columns.status = lead?.status;
      columns.date = lead?.createdDate;
      columns.companyName = lead?.companyDetails?.companyName || '-';
      columns.industryType = lead?.companyDetails?.industryType;
      columns.leadClassification = lead?.companyDetails?.leadClassification;
      columns.lob = opp?.lob;
    } else if (opp) {
      columns.status = opp?.status || lead?.status;
      columns.date = lead?.createdDate;
      columns.opportunity = opp?.id;
      columns.companyName = lead?.companyDetails?.companyName || '-';
      columns.industryType = lead?.companyDetails?.industryType;
      columns.leadClassification = lead?.companyDetails?.leadClassification;
      columns.lob = opp?.lob || lead?.lob;
      columns.serviceRequestType = opp?.serviceRequestType;
    }

    row = {
      data: lead,
      sub: opp,
      columns
    };
  }

  return row;
};

const requestTable = (data, lead) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.id;
    columns.OrderID = data?.partyInteractionId;
    columns.serviceRequestType = data?.serviceRequestType;
    columns.Date = data.Date;
    columns.Appointment = data?.Appointment;
    columns.status = data?.status;
    columns.lob = data?.lob;
  }

  row = {
    data: lead,
    sub: data,
    columns
  };
  return row;
};

const makeOppTableRow = (opp, lead) => {
  let row = {};

  if (opp) {
    let columns = {};

    columns.status = opp?.status;
    columns.validity = opp?.date;
    columns.oppID = opp?.id;
    columns.requestType = opp?.serviceRequestType;

    columns.lob = opp?.lob;
    // columns.lead= lead?.companyDetails?.leadClassification;

    row = {
      data: lead,
      sub: opp,
      columns
    };
  }

  return row;
};
const JsonparseData = (data) => {
  if (
    ((x) => {
      try {
        JSON.parse(x);
        return true;
      } catch (e) {
        return false;
      }
    })(data)
  ) {
    return JSON.parse(data);
  } else {
    return data;
  }
};

const StatusChanges = (data) => {
  // let status = 'ONBOARDING';
  // switch (data) {
  //   case 'CHANGE_PLAN':
  //     status = data;
  //     break;
  //   case 'ADD_VAS':
  //     status = data;
  //     break;

  //   case 'ADD_SERVICE':
  //     status = data;
  //     break;

  //     default
  // }
  // return status;
};
const removeItems = (temp, product) => {
  for (var n = 0; n < temp.length; n++) {
    if (temp[n].name === product.name) {
      var removedObject = temp.splice(n, 1);

      return (removedObject = null);
      break;
    }
  }
};

const ProductAddress = (updatedProducts) => {
  // let temp=[...updatedProducts]
  let temp = JSON.parse(JSON.stringify(updatedProducts));

  temp.map((item) => {
    delete item.Uid;
  });

  return temp;
};

// const existingopp=(data)=>{

//   if(data){

//      return data
//   }else{
//      return {}
//   }

// }

const exitingleadopp = (data, id, products, vasproduct) => {
  let temp = [...data];
  data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        products: products.map((Productitem) => ({
          id: Productitem.id,
          name: Productitem.name,
          address: Productitem.address,
          businessType: Productitem.businessType,
          lob: Productitem?.productSpecification?.LoB,

          vas: _.compact(
            vasproduct.map((vasitem) => {
              if (vasitem.Uid === Productitem.Uid) {
                return {
                  id: vasitem.id,
                  name: vasitem.productSpecification.name,
                  businessType: vasitem.businessType,
                  lob: vasitem?.productSpecification?.LoB
                };
              }
            })
          )
        }))
      };
    } else {
      return item;
    }
  });

  return temp;
};

const upatedlobselection = (updatevalues) => {
  let temp = [...updatevalues];

  let templob = [];
  temp.map((item) => {
    templob.push(item.productSpecification.LoB);
  });

  return _.uniq(templob);
};

const opportunitypayload = (opportunitydata) => {
  let data = [...opportunitydata];

  for (var i = 0; i < data.length; i++) {
    if (Object.keys(data[i].quote).length === 0) {
      delete data[i]?.quote;
      delete data[i]?.contract;
      break;
    }
  }

  return _.uniqBy(data, 'id');
};
const oppPayload = ({
  leadID,
  checkstatus,
  opportunitiesstatus,
  authUser,
  lead,
  removeButton,
  uniquelobs,
  payload,
  exitingOpp,
  ConcelledQuote,
  payload1,
  OpportunitiId,
  changePlan,
  quotelist,
  contractlist,
  publicIdentifierid,
  orderItemlist,
  updatedProducts,
  exoppdata,
  setopportunity,
  isSaveAndExit,
  updatedvasProducts,
  parent
}) => {
  const opppayload = {
    id: leadID,
    leaddata: lead,
    quoteId: exitingOpp.quoteRef?.id,
    contractId: contractlist.value?.id,
    user: authUser,
    opportunitiesstatus: opportunitiesstatus,
    status: isSaveAndExit ? 'OPPORTUNITY_CREATION' : checkstatus,
    modalId: 'opportunityCreation',
    isSaveAndExit: isSaveAndExit,
    lob: uniquelobs.toString(),
    selectedlobs: removeButton,
    companyDetails: payload,
    leadAssignment: payload1,
    ConcelledQuote: ConcelledQuote.value,
    statusChangeBy: authUser.sub,
    parent: parent,
    opportunities: [
      {
        id: OpportunitiId.value,
        status: isSaveAndExit ? 'OPPORTUNITY_CREATION' : checkstatus,
        lob: uniquelobs.toString(),
        ...changePlan.value,
        publicIdentifier: publicIdentifierid,
        date: new Date().toISOString(),
        quote: quotelist.value,
        orderItem: orderItemlist.value?.orderItem,
        contract: contractlist.value,

        statusChange: [
          {
            statusId: isSaveAndExit ? 3 : 4,
            status: isSaveAndExit ? 'OPPORTUNITY_CREATION' : checkstatus,
            changeDate: new Date().toISOString(),
            changeReason: ''
          }
        ],

        products: updatedProducts.map((Productitem) => {
          // if (Productitem?.vas && Productitem?.vas.length > 0) {
          return {
            id: Productitem.id,
            name: Productitem.name,
            address: Productitem.address,
            businessType: Productitem.businessType,
            lob: Productitem?.productSpecification?.LoB,
            vas: Productitem?.vas?.map((vasitem) => {
              return {
                id: vasitem.id,
                name: vasitem.name,
                businessType: vasitem.productSpecification.technology,
                lob: vasitem.productSpecification.LoB,
                productSpecification: {
                  ...vasitem.productSpecification
                }
                // productSpecificationRelationship:[]
              };
            })

            // _.compact(
            //   updatedvasProducts.map((vasitem) => {
            //     if (vasitem.Uid === Productitem.Uid) {
            //     return {
            //       id: vasitem.id,
            //       name: vasitem.name,
            //       businessType: vasitem.productSpecification.technology,
            //       lob: vasitem.productSpecification.lob,
            //       productSpecification: {
            //         ...vasitem.productSpecification,
            //       },
            //     };
            //     // }
            //   })
            // ),
          };
          // } else {
          //   return {
          //     id: Productitem.id,
          //     name: Productitem.name,
          //     address: Productitem.address,
          //     businessType: Productitem.businessType,
          //     lob: Productitem?.productSpecification?.LoB,
          //     vas: [],
          //   };
          // }
        })
      },

      ...(exoppdata
        ? exitingleadopp(
            setopportunity.value.opportunities,
            OpportunitiId.value,
            updatedProducts,
            updatedvasProducts
          )
        : '')
    ]
  };

  return opppayload;
};

const getSRrequest = (opp, changePlandata) => {
  let SRrequest = true;
  if (changePlandata.serviceRequestType === 'ONBOARDING') {
    return (SRrequest = true);
  } else if (opp && opp.length > 0) {
    for (var i = 0; i < opp.length; i++) {
      if (
        opp[i].status === 'PLAN_ADDED' ||
        opp[i].status === 'VAS_ADDED' ||
        opp[i].status === 'PLAN_MODIFIED' ||
        opp[i].status === 'ONBOARDED'
      ) {
        break;
      } else {
        return (SRrequest = false);
        break;
      }
    }

    // for(var i=0; i<opp.length; i++){
  }

  return SRrequest;
};

const MakeLeadpayaload = (data, lob, user) => {
  let customer = { ...data };

  let values = [
    {
      role: 'Customer',
      id: customer?.id
    }
  ];

  let primaryContactDetails = _.compact(
    _.map(customer.relatedParty, (item) => {
      if (item.role === 'ContactPerson') {
        let mobile = item?.engagedParty?.contactMedium?.find((item) =>
          item.type === 'Phone' ? item : ''
        );
        let email = item?.engagedParty?.contactMedium?.find((item) =>
          item.type === 'EmailAddress' ? item : ''
        );
        let whatsapp = item?.engagedParty?.contactMedium?.find((item) =>
          item.medium.type === 'whatsapp' ? item : ''
        );
        let telegram = item?.engagedParty?.contactMedium?.find((item) =>
          item.medium.type === 'telegram' ? item : ''
        );
        return {
          name: item?.name,
          lastName: item?.engagedParty?.familyName,
          designation: item?.designation,
          mobile: mobile.medium?.number,
          email: email.medium?.emailAddress,
          whatsapp: '',
          contactMedium: {
            telegram: telegram?.preferred,
            whatsapp: whatsapp?.preferred,
            email: email?.preferred
          }
        };
      }
    })
  );

  const lead = {
    companyDetails: {
      companyName: customer?.engagedParty?.tradingName,
      registrationNumber: _.get(
        customer.engagedParty?.organizationIdentification,
        '[0].identificationId',
        ''
      ),
      customerCategory: customer?.customerCategory,
      customerSubCategory: customer?.customerSubCategory,
      riskCategory: customer?.riskCategory,
      industryType: customer?.customerType,
      registrationExpiryDate: _.get(
        customer.engagedParty,
        'customFields.registrationExpiryDate',
        ''
      ),
      companyRegistrationNumber: _.get(
        customer.engagedParty?.organizationIdentification,
        '[0].identificationId',
        ''
      )
    },
    companyAddress: {
      postcode: _.get(
        customer?.engagedParty?.contactMedium,
        '[0].medium.postcode',
        ''
      ),
      city: _.get(customer?.engagedParty?.contactMedium, '[0].medium.city', ''),
      stateOrProvince: _.get(
        customer?.contactMedium,
        '[0].medium.stateOrProvince',
        ''
      ),
      country: _.get(
        customer?.engagedParty?.contactMedium,
        '[0].medium.country',
        ''
      ),

      addressLine1: _.get(
        customer?.engagedParty?.contactMedium,
        '[0].medium.addressLine1',
        ''
      )
    },
    primarycontanct: {
      name: _.get(primaryContactDetails, '[0].name', ''),
      lastName: _.get(primaryContactDetails, '[0].lastName', ''),
      designation: _.get(primaryContactDetails, '[0].designation', ''),
      mobile: _.get(primaryContactDetails, '[0].mobile', ''),
      email: _.get(primaryContactDetails, '[0].email', ''),

      contactMedium: _.get(primaryContactDetails, '[0].contactMedium', '')
    },
    primaryContactDetails: {
      title: 'Profile Owner Details',

      name: _.get(primaryContactDetails, '[0].name', ''),
      lastName: _.get(primaryContactDetails, '[0].lastName', ''),
      designation: _.get(primaryContactDetails, '[0].designation', ''),
      mobile: _.get(primaryContactDetails, '[0].mobile', ''),
      email: _.get(primaryContactDetails, '[0].email', ''),

      contactMedium: _.get(primaryContactDetails, '[0].contactMedium', '')
    },

    status: _.get(customer, 'status', ''),
    lob: lob,
    leadAssignment: {
      name: user?.sub,
      email: user?.email
    },
    relatedParty: [...customer?.relatedParty, ...values]
  };

  return lead;
};

const getcontractId = (data, lead) => {
  let contractId = '';

  let temp = data.opportunities.map((item) => {
    if (item.id === lead?.data?.oppId) {
      if (item.contract) {
        contractId = item.contract.id;
      }
    }
  });

  return contractId;
};

const getpermissions = (Data, value, lead) => {
  let Ispermission = false;
  var permissipns = Data?.permissions.split(',');

  if (value.modalId === 'quoteApproval') {
    for (var i = 0; i < permissipns.length; i++) {
      if (
        permissipns[i].match(value.permission) &&
        (lead?.data.generalManager === Data?.sub ||
          lead?.data.ceo === Data?.sub)
      ) {
        Ispermission = true;
      }
    }
    // return Ispermission.
  } else {
    for (let i = 0; i < permissipns.length; i++) {
      if (permissipns[i].match(value.permission)) {
        Ispermission = true;
      }
    }
  }
  return Ispermission;
};
const onBoardingcustomer = (action, lead) => {
  let onboardingstatus = false;
  if (
    action?.actionblob === 'customerAcceptence' ||
    action?.actionblob === 'customerRejection'
  ) {
    for (var i = 0; i < lead.data.opportunities.length; i++) {
      if (lead.data.opportunities[i].status === 'ONBOARDING') {
        onboardingstatus = true;
        // props.Alertopen({
        //   type: 'error',
        //   message:
        //     'Please wait while one of your opportunity is due for onboarding',
        // })

        break;
      }
    }
  }

  return onboardingstatus;
};

// const getparent=(data)=>{

//     let username=_.get(data.)
// }

const getQuoteApprovel = async (action, lead) => {
  if (action.modalId === 'approveLead') {
    const usergrpinfo = await hierarchyApi
      .digitalSales(lead.data?.leadAssignment?.name)
      .catch((err) => {
        throw Error('Failed to Digital sales. Please try again.');
      });
    return usergrpinfo;
  } else {
    let payload = {
      userName: 'dlpm.GeneralMgr',
      leadClassification: 'Hot',
      quoteAmount: '111111'
    };

    const quoteApprovel = await hierarchyApi
      .ApproveQuote(payload)
      .catch((err) => {});
    return quoteApprovel;
  }
};

const getErrormsg = (quotedata, value, key) => {
  let message = `Please wait while ${value}  (${_.get(
    quotedata[key],
    'username'
  )}) is reviewing the  details for approval  `;
  return message;
};

//  const gettoken=async()=>{

//   const token = await getItem('ACCESS_TOKEN')
//    return token
//  }
const getworkflowpayload = async (data, lead, leadDetails) => {
  // let totalAmount =  lead?.quote?.orderTotalPrice.map(o => parseInt( o.price.taxIncludedAmount.value)).reduce((a, c) => { return a + c });

  let payload = {
    username: '',
    formIdentity: 'QUOTE_APPROVAL',
    stepIdentity: '',
    executionModeStatus: false,
    workflowId: '1617032108680',
    async: false,
    Values: {
      User_Name: data.user?.sub,
      LeadClassification: leadDetails?.companyDetails?.leadClassification,
      Quote_Amount: '11000',
      accessToken: await getItem('ACCESS_TOKEN')
    }
  };
  return payload;
};
export default {
  getworkflowpayload,
  getQuoteApprovel,
  onBoardingcustomer,
  getpermissions,
  getcontractId,
  makeLobpayload,
  MakeLeadpayaload,
  getSRrequest,
  upatedlobselection,
  ProductAddress,
  exitingleadopp,
  removeItems,
  JsonparseData,
  makeTableRow,
  makeNewLeadPayload,
  makeBlackListCheckPayload,
  makeDuplicateCheckPayload,
  attachments,
  makeOppTableRow,
  makeautocheckpayload,
  requestTable,
  StatusChanges,
  opportunitypayload,
  oppPayload,
  makeDuplicateCheckdenilist,
  getErrormsg
  // existingopp
};
