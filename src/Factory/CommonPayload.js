const addUserpayload = (values, data, partnerdetails) => {
    return {
    name: values?.name,
    lastName: values?.lastName,
    designation: values?.designation,
    mobile: values?.mobileNumber,
    email: values?.email,
    whatsapp: values?.whatsapp,
    phoneNumber: values?.phoneNumber,
    extensionNumber: values?.extensionNumber,
    department: values?.department,
    masterPartnerId:partnerdetails?.mainlist?.partnerId,
      // data?.list?.PartnerProfileCreation?.PartnerDetails?.Partner_ID ||
      // data?.list?.masterPartnerId,
    tenantPartnerId:
      data?.list?.TenantProfileCreation?.TenantDetails?.TENANT_ID || '',
      partnerId:  data?.list?.partnerId,
    isMasterUser: data?.isMasterUser || false,
    isTenantUser: data?.isTenantUser || false,
    partnerType: data?.Substatus,
    contactMedium: values?.contactMedium,
    masterPartnerName:
      data?.list?.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME ||
      data?.list?.masterPartnerName,

    tenantPartnerName:
      data?.list?.TenantProfileCreation?.TenantDetails?.TENANT_NAME
  };
};
export default { addUserpayload };
