import StringUtils from "lib/utils/strings";
import { getTotalChargeOfType } from "lib/utils/product";

const makeOpportunityCreationDetails = ({ masterdata, users, lead, hierarchyLob }) => {

  let details = {};
  let selectedLobs = lead?.lob?.split(",");

  details.selectedLobs = {};
  details.companyName = StringUtils.capitalizeFirst(
    lead.companyDetails?.companyName
  );
  details.registrationNumber = lead.companyDetails.registrationNumber;
   
  details.assignment = {
    ...users[lead.leadAssignment?.name],
    name: users[lead.leadAssignment?.name]?.name,
    code: users[lead.leadAssignment?.name]?.id,
  };
  details.classification = {
    name: StringUtils.capitalizeFirst(lead.companyDetails?.leadClassification),
    code: lead.companyDetails?.leadClassification,
  };

  

   
  for (let serviceType of masterdata.serviceType) {
    if (selectedLobs.includes(serviceType.code)) {
      details.selectedLobs[serviceType.code] = serviceType;
    }
  

}
  return details;
};

const makeOpportunityCreationFormoptions = ({ masterdata, users ,hierarchyLob }) => {
  let options = {};
   if(hierarchyLob){
    options.serviceTypes = hierarchyLob?.serviceType;
   }else{
    options.serviceTypes = masterdata.serviceType;
   }

 
  options.businessType = masterdata.businessType;
  options.accountManagers = users.ids.map((id) => {
    const user = users.entities[id];
    return {
      ...user,
      name: user.name || "",
      code: user.id,
    };
  });
  options.leadClassifications = [
    { name: "Hot", code: "HOT" },
    { name: "Medium", code: "MEDIUM" },
    { name: "Cold", code: "COLD" },
  ];

  return options;
};

const calculateCart = ({ products, vas, cart }) => {
  let data = {
    count: 0,
    upfront: 0,
    recurring: 0,
  };

  data.count = cart + Object.keys(products).length + vas;

  for (let prodId in products) {
    data.upfront += getTotalChargeOfType("upfront", products[prodId]);
    data.recurring += getTotalChargeOfType("recurring", products[prodId]);
  }
  for (let vasId in vas) {
    data.upfront += getTotalChargeOfType("upfront", vas[vasId]);
    data.recurring += getTotalChargeOfType("recurring", vas[vasId]);
  }

  return data;
};

const modifyplanpayload=(data)=>{
  let payload =

  {
    "orderItem": [
      {
        "href": "",
        "action": "modify",
"actionSubType": "modifyPlan",

        "transferDeposit": false,
        'product':{

          id:data.productId
        },
        "productOffering": {
          "id": data?.id,
          "href": "",
          "name": "",
          "businessType": [
            ""
          ],
          "path": "",
          "@schemaLocation": ""
        },
      }
    ]
  }
  return payload



}
const changeplanPayload = (data) => {


  let payload =

  {
    "orderItem": [
      {
        "href": "",
        "action": "delete",
        "actionSubType": "changePlan",
        "transferDeposit": false,
        'product':{

          id:data.productId
        },
        "productOffering": {
          "id": data?.id,
          "href": "",
          "name": "",
          "businessType": [
            ""
          ],
          "path": "",
          "@schemaLocation": ""
        },
      }
    ]
  }
  return payload

}

export default {
  calculateCart,
  makeOpportunityCreationDetails,
  makeOpportunityCreationFormoptions,
  changeplanPayload,
  modifyplanpayload
};
