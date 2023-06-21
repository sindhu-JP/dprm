import { TecnotreedigitalSales } from './../axios';

const getCurrency = async () => {
  return await await TecnotreedigitalSales.get(`/masterdata?type=currency`)
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
};

// get MP details
const getPartner = async (partnerId) => {
  return await await TecnotreedigitalSales.get(
    `/search/Partner_Profile?PartnerProfileCreation.PartnerDetails.Partner_ID=${partnerId}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

// get tenent details
const getTenent = async (partnerId) => {
  return await await TecnotreedigitalSales.get(
    `/search/Tenant_Partner_Profile?TenantProfileCreation.TenantDetails.TENANT_ID=${partnerId}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

// update MP onboarding status
const onBoardingStatus = async (partnerId) => {
  return await await TecnotreedigitalSales.patch(
    `dsales/updateCollection/Partner_Profile/PartnerProfileCreation/PartnerDetails/Partner_ID/${partnerId}?PartnerProfileCreation.PartnerDetails.Onboarding_Status=ACTIVE`
  )
    .then((res) => res.data)
    .catch((err) => {});
};

// update tenent onboarding status

const tenentOnBoardingStatus = async (partnerId) => {
  return await await TecnotreedigitalSales.patch(
    `dsales/updateCollection/Tenant_Partner_Profile/TenantProfileCreation/TenantDetails/TENANT_ID/${partnerId}?TenantProfileCreation.TenantDetails.Onboarding_Status=ACTIVE`
  )
    .then((res) => res.data)
    .catch((err) => {});
};
export default {
  getCurrency,
  getPartner,
  onBoardingStatus,
  getTenent,
  tenentOnBoardingStatus
};
