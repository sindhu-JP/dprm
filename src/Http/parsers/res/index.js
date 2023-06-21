const prepareListForDropdownOptions = ({
  list,
  nameKey = 'name',
  codeKey = 'code',
  nameField,
  codeField,
}) => {
  return list
    ? list.map((item) => ({
        [nameKey]: item[nameField],
        [codeKey]: item[codeField],
        ...item,
      }))
    : []
}

const extractCompanyDetails = (lead) => {
  if (!lead) {
    return {}
  }
  const company = lead['companyDetails']
  const assignment = lead['leadAssignment']
  if (!company) {
    return {}
  }

  return {
    name: company?.companyName,
    registrationNumber: company?.companyRegistrationNumber,
    classification: company?.leadClassification,
    category: company?.customerCategory,
    subCategory: company?.customerSubCategory,
    industryType: company?.industryType,
    assignment: assignment?.email,
  }
}

export default {
  prepareListForDropdownOptions,
  extractCompanyDetails,
}
