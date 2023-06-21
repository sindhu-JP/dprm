export const createNewLeadPayload = (data) => {
  let temp = {
    ...data,
  };

  Object.keys(data).map((sec) => {
    if (sec === "assignment") {
      temp.leadAssignment = data[sec];
      delete temp.assignment;
    }

    if (sec === "lob" && data[sec]) {
      temp.lob = data[sec]?.reduce((acc, curr) => {
        if (acc) {
          return `${acc},${curr.code}`;
        } else {
          return curr.code;
        }
      }, "");
    }

    if (sec === "companyDetails") {
      let details = data[sec];

      details.customerCategory = details.customerCategory.code;
      details.subCategory = details.subCategory.code;
      details.industryType = details.industryType.code;
      details.leadClassification = details.leadClassification.code;

      if (details.numberOfEmployee)
        details.numberOfEmployee = details.numberOfEmployee.code;

      temp.companyDetails = details;
    }

    if (sec === "companyAddress") {
      let address = data[sec];

      address.country = address.country.code;
      address.stateOfOrigin = address.stateOfOrigin.code;
      address.city = address.city.code;

      temp.companyAddress = address;
    }

    if (sec === "consumptionPattern") {
      let pattern = data[sec];

      if (pattern.activeMessagesPerMonth)
        pattern.activeMessagesPerMonth = pattern.activeMessagesPerMonth.code;
      if (pattern.phoneUsedWhileAbroad)
        pattern.phoneUsedWhileAbroad = pattern.phoneUsedWhileAbroad.code;

      temp.consumptionPattern = pattern;
    }

    if (sec === "primaryContactDetails") {
      let contact = data[sec];
      contact.designation = contact.designation.code;

      temp.primaryContactDetails = contact;
    }

    if (sec === "referralInformation") {
      let referral = data[sec];
      referral.company = referral.company.code;

      temp.referralInformation = referral;
    }
  });

  return temp;
};
