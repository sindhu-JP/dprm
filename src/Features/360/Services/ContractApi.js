const { TTAgentUrl, TecnotreeContractMangement } = require("Http/axios");
const { LoadingSpin } = require ('Features/Forms/LoadingSpin');
const {message} = require("antd");
const _getContractObj = async (id) => {
  return await TTAgentUrl.get(`/search/Add_Contract?AddContractFor.ContractInformation.Agent_Id=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
const _documentPreview = async (id) => {
  // LoadingSpin(true);
  let data = await TecnotreeContractMangement.get(`/fileuploads/${id}`, {
    responseType: 'blob'
  })
    .then((res) => {
      // LoadingSpin(false);      
      return res.status === 200 ? res.data : null
    })
    .catch((err) => {
      // LoadingSpin(false);
      message.error('Failed to open Document',1);
      return null
    });

  const file = new Blob([data], { type: 'application/pdf' });

  const fileURL = URL.createObjectURL(file);

  const pdfWindow = window.open();
  pdfWindow.location.href = fileURL;
};
const _shareContract = async (data) => {
  
  return await TecnotreeContractMangement.post(`/contract/fillDynamicValuesOnDocumentforDynamic`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
const downloaContract = async (id) => {
  LoadingSpin(true);
  let data = await TecnotreeContractMangement.get(
    `/fileuploads/${id}`,
    { responseType: 'blob' }
  )
    .then((res) => {
      LoadingSpin(false);
      message.success("Document Downloaded Successfully",1);
      return res.status === 200 ? res.data : null
    })
    .catch((err) => {
      LoadingSpin(false);
      message.error('Failed to Download Document',1);
      return null
    });

  const blob = new Blob([data], { type: 'application/pdf' });
  const href = window.URL.createObjectURL(blob);
  const theLink = document.createElement('a');
  theLink.href = href;
  theLink.download = id + '.pdf';
  document.body.appendChild(theLink);
  theLink.click();
  document.body.removeChild(theLink);
};
export default {_getContractObj, _documentPreview, _shareContract, downloaContract }