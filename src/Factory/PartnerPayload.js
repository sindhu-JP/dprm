const makepayloadexecuteProcess = (data) => {
  let workFlowId = 1618923957892;
  let userRole = localStorage.getItem('roleId');
  let Ebody = {};
  Ebody['workflowId'] = workFlowId;
  Ebody['userId'] = localStorage.getItem('signinId');
  Ebody['userRole'] = userRole;
  Ebody['executionModeStatus'] = false;
  Ebody['async'] = false;
  Ebody['Values'] = {};
  Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
  Ebody['Values']['CONTRACT_ID'] = data.CONTRACT_ID;
  Ebody['Values']['MOBILE_NUMBER'] = data.MOBILE_NUMBER;
  Ebody['Values']['PARTNER_NAME'] = data.PARTNER_NAME;
  Ebody['Values']['Partner_ID'] = data.Partner_ID;
  Ebody['Values']['url'] =
    'http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/0052ec98-fe07-46a3-8776-319c3a0f9993assigngrouptouser.png';

  return Ebody;
};

const makeBillingAdjustment = (data) => {
  let workFlowId = 1624281386049;
  let userRole = localStorage.getItem('roleId');
  let Ebody = {};
  Ebody['workflowId'] = workFlowId;
  Ebody['userId'] = localStorage.getItem('signinId');
  Ebody['userRole'] = userRole;
  Ebody['executionModeStatus'] = false;
  Ebody['async'] = false;
  Ebody['Values'] = { ...data };
  Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');

  return Ebody;
};

export default {
  makepayloadexecuteProcess,
  makeBillingAdjustment
};
