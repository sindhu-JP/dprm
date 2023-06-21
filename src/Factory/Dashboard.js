const showPartnerDialogPayload = (payload) => {
  return {
    payload
  };
};
const hidePartnerDialogPayload = () => {
  return {
    open: false
  };
};

export default {
  showPartnerDialogPayload,
  hidePartnerDialogPayload
};
