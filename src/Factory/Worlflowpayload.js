import update from 'update-immutable';
// import Date from 'Utils/Date';

const dcmProductPayload = (values, data) => {
  return update(
    {},
    {
      $merge: {
        workflowId: '1636456845048',
        userId: '',
        userRole: '',

        executionModeStatus: false,
        async: false,
        Values: {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          dcmFormSubmit: true,
          marketSegment: values?.marketSegment?.code,
          channels: values?.channels?.code,
          category: values?.category?.code,
          taxCategory: values?.taxCategory?.code,
          priceType: values?.priceType?.code,
          charges: values?.charges?.code,
          PRODUCT_SPECIFICATION: values?.type?.code,
          PRODUCT_TECHNOLOGY: data?.PRODUCT_TECHNOLOGY,
          PRODUCT_LOB: data?.PRODUCT_LOB,
          PRODUCT_NAME: data?.Productname,
          PRODUCT_ID: data?.ProductID,

          businessType: values?.BusinessType?.code
        }
      }
    }
  );
};

const productSpecificationDropdown = (id) => {
  return update(
    {},
    {
      $merge: {
        workflowId: id,
        userId: '',
        userRole: '',

        executionModeStatus: false,
        async: false,
        Values: {
          accessToken: localStorage.getItem('ACCESS_TOKEN')
        }
      }
    }
  );
};

const parserRes = (data) => {
  let temp = _map(data.arr, (item) => {
    if (item.type === 'dropdown') {
      return {
        ...item,
        isApiData: true
      };
    } else {
      return item;
    }
  });

  const payload = {
    sectionName: data?.sectionName,
    sectiontitle: data?.sectiontitle,
    arr: temp
  };

  return {
    sectionName: data?.sectionName,
    sectiontitle: data?.sectiontitle,
    arr: temp
  };
};
const closeAccountPayload = (id, data = {}) => {
  return update(
    {},
    {
      $merge: {
        workflowId: id,
        userId: '',
        userRole: '',

        executionModeStatus: false,
        async: false,
        Values: {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          ...data
        }
      }
    }
  );
};
const UpdateSectionForm = (data, sectionName, sectionitems) => {
  if (sectionName === 'CompanyAddress') {
    let sectionlist = [];
    return _.compact(
      _.map(data.column, (section) => {
        if (
          data.sectionlist[section].sectionName === sectionName ||
          data.sectionlist[section].sectionName === 'UploadDocuments'
        ) {
          sectionlist.push({
            ...sectionlist
          });
          return {
            ...data,
            column: [section, 'section81'],
            sectionlist: {
              [section]: { ...data.sectionlist[section] },

              // [section]: parserRes(data.sectionlist[section] ),
              section81: {
                sectionName: 'UploadDocuments',
                sectiontitle: 'Upload Documents',
                arr: [
                  {
                    fId: 'multiupload',
                    instructions: '',
                    linkedTo: false,
                    max: '',
                    icon: 'fa fa-pencil-square-o',
                    autoFill: '',
                    tooltip: '',
                    formIdentity: '',
                    label: 'COMPANY REGISTRATION',
                    type: 'multiUpload',
                    required: true,
                    errorMsg: '',
                    kyctype: [
                      {
                        checked: 'true',
                        id: '2',
                        label: '.pdf'
                      },
                      {
                        checked: 'false',
                        id: '4',
                        label: '.doc'
                      },
                      {
                        checked: 'true',
                        id: '6',
                        label: '.png'
                      },
                      {
                        checked: 'false',
                        id: '5',
                        label: '.docx'
                      },
                      {
                        checked: 'false',
                        id: '3',
                        label: '.csv'
                      },
                      {
                        checked: 'true',
                        id: '1',
                        label: '.jpeg'
                      }
                    ],
                    stepIdentity: '',
                    regex: '',
                    min: '',
                    name: 'COMPANY_REGISTRATION',
                    placeholder: '',
                    id: '1625134151745',
                    value: '',
                    fieldType: 'Multi Upload',
                    order: 0
                  },
                  {
                    fId: 'multiupload',
                    instructions: '',
                    linkedTo: false,
                    max: '',
                    icon: 'fa fa-pencil-square-o',
                    autoFill: '',
                    tooltip: '',
                    formIdentity: '',
                    label: 'TIN/TAX_DOCUMENT',
                    type: 'multiUpload',
                    required: false,
                    errorMsg: '',
                    kyctype: [
                      {
                        checked: 'true',
                        id: '2',
                        label: '.pdf'
                      },
                      {
                        checked: 'false',
                        id: '4',
                        label: '.doc'
                      },
                      {
                        checked: 'true',
                        id: '6',
                        label: '.png'
                      },
                      {
                        checked: 'false',
                        id: '5',
                        label: '.docx'
                      },
                      {
                        checked: 'false',
                        id: '3',
                        label: '.csv'
                      },
                      {
                        checked: 'true',
                        id: '1',
                        label: '.jpeg'
                      }
                    ],
                    stepIdentity: '',
                    regex: '',
                    min: '',
                    name: 'TIN/TAX_DOCUMENT',
                    placeholder: '',
                    id: '1625134151745',
                    value: '',
                    fieldType: 'Multi Upload',
                    order: 0
                  },
                  {
                    fId: 'multiupload',
                    instructions: '',
                    linkedTo: false,
                    max: '',
                    icon: 'fa fa-pencil-square-o',
                    autoFill: '',
                    tooltip: '',
                    formIdentity: '',
                    label: 'FINANCIAL_DOCUMENTS',
                    type: 'multiUpload',
                    required: false,
                    errorMsg: '',
                    kyctype: [
                      {
                        checked: 'true',
                        id: '2',
                        label: '.pdf'
                      },
                      {
                        checked: 'false',
                        id: '4',
                        label: '.doc'
                      },
                      {
                        checked: 'true',
                        id: '6',
                        label: '.png'
                      },
                      {
                        checked: 'false',
                        id: '5',
                        label: '.docx'
                      },
                      {
                        checked: 'false',
                        id: '3',
                        label: '.csv'
                      },
                      {
                        checked: 'true',
                        id: '1',
                        label: '.jpeg'
                      }
                    ],
                    stepIdentity: '',
                    regex: '',
                    min: '',
                    name: 'FINANCIAL_DOCUMENTS',
                    placeholder: '',
                    id: '1625134151745',
                    value: '',
                    fieldType: 'Multi Upload',
                    order: 0
                  }
                ]
              }
            }
          };
        }
      })
    );
  } else {
    if (sectionName) {
      return _.compact(
        _.map(data.column, (section) => {
          if (data.sectionlist[section].sectionName === sectionName) {
            return {
              ...data,
              column: [section],
              sectionlist: {
                [section]: {
                  ...filterOutFormFields(data.sectionlist[section])
                }
              }
            };
          }
        })
      );
     } else if(sectionitems?.length>0) {
 let tempValue ={}
 let columnValue=[]
       const dataitems= _.compact(
        _.map(data.column, (section) => {
          
          if (_.includes(sectionitems,data.sectionlist[section].sectionName)) {


            columnValue.push(section)
         
              // ...data,/
          
               tempValue[section]={
                ...filterOutFormFields(data.sectionlist[section])
               }
              
            
          }
        })
      );


     return[{
       ...data,
       column:columnValue,
       sectionlist:tempValue
     }]
        

     } else {
       console.log("eleeeeeee")
      return [data];
    }
  }
};

const filterOutFormFields = (data) => {
  if (data.sectionName === 'PartnerDetails') {
    let temp = [...data.arr];

    let fiter = data.arr.map((item) => {
      if (
        item.name === 'PARTNER_NAME' ||
        item.name === 'PARTNER_REGISTRATION_NUMBER'
      ) {
        return {
          ...item,
          editable: true,
          disableField: true
        };
      } else {
        return item;
      }
    });
    return {
      arr: fiter,
      sectionName: data.sectionName,
      sectiontitle: data.sectiontitle
    };
  } else {
    return data;
  }
};

const makeFormDetails = (values, partnerDetails, id, partnerFulldetails) => {
  if (id === 'CompanyAddress') {
    let PartnerProfileCreation = {
      ...partnerDetails,
      [id]: values.PartnerProfileCreation[id],
      UploadDocuments: values.PartnerProfileCreation['UploadDocuments']
    };
    return {
      PartnerProfileCreation,

      id: partnerFulldetails?._id,
      mid: '',
      pid: '',
      formIdentity: 'Partner_Profile',
      formName: 'Partner_Profile',
      steps: ['PartnerProfileCreation'],
      refNoRegistartion: '#refNoRegistartion',
      createdDate: '#createdDate',
      lastModifiedDate: '#lastModifiedDate',
      PartnerProfileModification: {
        [id]: {
          ...filterOutnewValues(
            values.PartnerProfileCreation[id],
            partnerFulldetails.PartnerProfileCreation[id]
          )
        },
        UploadDocuments: values.PartnerProfileCreation['UploadDocuments']
      }
    };
  } else {
    let PartnerProfileCreation = {
      ...partnerDetails,
      [id]: values.PartnerProfileCreation[id]
    };
    return {
      PartnerProfileCreation,

      id: partnerFulldetails?._id,
      mid: '',
      pid: '',
      formIdentity: 'Partner_Profile',
      formName: 'Partner_Profile',
      steps: ['PartnerProfileCreation'],
      refNoRegistartion: '#refNoRegistartion',
      createdDate: '#createdDate',
      lastModifiedDate: '#lastModifiedDate',
      PartnerProfileModification: {
        [id]: {
          ...filterOutnewValues(
            values.PartnerProfileCreation[id],
            partnerFulldetails.PartnerProfileCreation[id]
          )
        }
      }
    };
  }
};

const filterOutnewValues = (data, oldData) => {
  const record = {};
  Object.keys(data).forEach((key) => {
    if (!_.isEqual(data[key], oldData[key])) {
      record[key] = data[key];
    }
  });
  return record;
};

const addUserWorkFlow = (data, partnerdetails) => {
  return update(
    {},
    {
      $merge: {
        workflowId: '1641904532465',
        userId: '',
        userRole: '',

        executionModeStatus: false,
        async: false,
        Values: {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          username: data?.ssoUsername?.split('/')[1],
          email: data?.email,
          fullname: `${data?.partnerName} ${data?.lastName}`,
          roleId: 'RO1001',
          groupId: [
            partnerdetails?.details?.PartnerProfileCreation?.PartnerDetails
              .DTT_Group_Id
          ],
          parentId: data?.partnerId,
          mobile: data?.mobile,
          loginType: 'T Admin'
        }
      }
    }
  );
};

const ExtraCmsUpdatePayload = (id, partnerID, agent) => {
  return update(
    {},
    {
      $merge: {
        userId: '12356',

        userRole: '123456',

        executionModeStatus: false,

        async: false,

        workflowId: agent ? '1678249871511' : "1651231773481",

        formIdentity: 'Add_Contract',

        stepIdentity: 'AddContractFor',
        Values: {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          CONTRACT_ID: id,
          partnerType: agent ? "" : partnerID.substring(0, 2) === 'MP' ? 'master' : 'tenent'
        }
      }
    }
  );
};

const ContractModificationPayload = (newPayload, oldPayload) => {
  return update(
    {},
    {
      $merge: {
        workflowId: '1652458838045',
        userId: '',
        userRole: '',
        executionModeStatus: false,
        async: false,
        Values: {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          id: oldPayload?._id,
          AddContractFor: {
            CommissionRuleDetails: {
              Commission_Rule:
                newPayload?.AddContractFor?.CommissionRuleDetails
                  ?.Commission_Rule
            },
            SettlementRuleDetails: {
              Settlement_Rule:
                newPayload?.AddContractFor?.SettlementRuleDetails
                  ?.Settlement_Rule
            },
            ContractInformation: {
              ...oldPayload.AddContractFor.ContractInformation,

              Commission_Code: _.get(
                oldPayload.AddContractFor,
                'ContractInformation.Commission_Code',
                ''
              ),
              Settelement_Code: _.get(
                oldPayload.AddContractFor,
                'ContractInformation.Settelement_Code',
                ''
              ),
              Contract_Current_Status: 'Active',
              CONTRACT_MODIFY_COUNT: parseInt(
                newPayload?.AddContractFor?.ContractInformation
                  ?.CONTRACT_MODIFY_COUNT + 1
              )
            },

            UploadDocuments: oldPayload?.AddContractFor.UploadDocuments,
            customStep: false,
            sections: oldPayload?.AddContractFor?.sections,
            status: oldPayload?.AddContractFor?.status,
            stepIdentity: oldPayload?.AddContractFor?.stepIdentity,
            stepRefNo: oldPayload?.AddContractFor?.stepRefNo,

            ContractModificationHistory: {
              ...oldPayload.AddContractFor.ContractInformation
            }
          },
          formIdentity: 'Add_Contract',
          formName: 'Add_Contract',
          refNoRegistartion: oldPayload.refNoRegistartion,
          createdDate: new Date(),
          steps: ['AddContractFor'],
          lastModifiedDate: new Date()
        }
      }
    }
  );
};

const shareContractWorkFlowPayload = (
  notificationPayload,
  contractid,
  productDetails
) => {
  return update(
    {},
    {
      $merge: {
        workflowId: '1660283326755',
        userId: '',
        userRole: '',

        executionModeStatus: false,
        async: false,
        Values: {
          partnerId:
            notificationPayload?.PartnerProfileCreation?.PartnerDetails
              ?.Partner_ID ||
            notificationPayload?.TenantProfileCreation?.TenantDetails
              ?.TENANT_ID,
          partnerName:
            notificationPayload?.PartnerProfileCreation?.PartnerDetails
              ?.PARTNER_NAME ||
            notificationPayload?.TenantProfileCreation?.TenantDetails
              ?.TENANT_NAME,
          partnerPrimaryContactName:
            notificationPayload?.PartnerProfileCreation?.PrimaryContactDetails
              ?.PRIMARY_CONTACT_NAME ||
            notificationPayload?.TenantProfileCreation?.PrimaryContactDetails
              ?.PRIMARY_CONTACT_NAME,
          partnerPrimaryContactEmail:
            notificationPayload?.PartnerProfileCreation?.PrimaryContactDetails
              ?.EMAIL_ID ||
            notificationPayload?.TenantProfileCreation?.PrimaryContactDetails
              ?.EMAIL_ID,
          partnerPrimaryContactMobile:
            notificationPayload?.PartnerProfileCreation?.PrimaryContactDetails
              ?.MOBILE_NUMBER ||
            notificationPayload?.TenantProfileCreation?.PrimaryContactDetails
              ?.MOBILE_NUMBER,
          contractId: contractid,
          managerMobile:
            notificationPayload?.PartnerProfileCreation
              ?.PartnerRelationshipManager?.MOBILE_NO ||
            notificationPayload?.TenantProfileCreation
              ?.PartnerRelationshipManager?.MOBILE_NO,
          managerEmail:
            notificationPayload?.PartnerProfileCreation
              ?.PartnerRelationshipManager?.MANAGER_EMAIL ||
            notificationPayload?.TenantProfileCreation
              ?.PartnerRelationshipManager?.MANAGER_EMAIL,
          managerName:
            notificationPayload?.PartnerProfileCreation
              ?.PartnerRelationshipManager?.NAME ||
            notificationPayload?.TenantProfileCreation
              ?.PartnerRelationshipManager?.NAME,
          productId: productDetails?.AddProduct?.ProductDetails?.PRODUCT_ID,
          productName: productDetails?.AddProduct?.ProductDetails?.PRODUCT_NAME,
          accessToken: localStorage.getItem('ACCESS_TOKEN')
        }
      }
    }
  );
};
const returnWorkflowData = (
  partnerId,
  partnerPrimaryContactEmail,
  partnerPrimaryContactMobile,
  partnerName,
  partnerPrimaryContactName,
  contractId
) => {
  let loginData = {};
  if (typeof localStorage != 'undefined') {
    const user = localStorage.getItem('loginUser');
    if (user != null) {
      const data = JSON.parse(user);
      loginData = data;
    }
  }
  let workflowData = {
    managerEmail: loginData.email,
    managerMobile: loginData.mobile,
    managerName: loginData.username,
    partnerId,
    partnerName,
    partnerPrimaryContactEmail,
    partnerPrimaryContactMobile,
    partnerPrimaryContactName,
    contractId
  };
  return workflowData;
};

export default {
  dcmProductPayload,
  productSpecificationDropdown,
  UpdateSectionForm,
  makeFormDetails,
  // editFormWorkflowpayload,
  closeAccountPayload,
  addUserWorkFlow,
  ExtraCmsUpdatePayload,
  ContractModificationPayload,
  shareContractWorkFlowPayload,
  returnWorkflowData
};
