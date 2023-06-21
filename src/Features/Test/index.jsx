import React from 'react';
import _ from 'lodash';

const getCompanyDetails = (lead) => {
  let data = _.get(lead, 'companyDetails', {});
  let details = {};

  details.name = _.get(data, 'companyName', '');
  details.category = _.get(data, 'customerCategory', '');
  details.industryType = _.get(data, 'industryType', '');
  details.subcategory = _.get(data, 'customerSubCategory', '');
  details.classification = _.get(data, 'leadClassification', '');
  details.registrationNumber = _.get(data, 'companyRegistrationNumber', '');

  return details;
};

const Test = () => {
  return <div>Hello</div>;
};

export default Test;
