import {
  Tecnotree,
  // TecnotreeDoccheck,
  Tecnotreewallet,
  TecnotreeContractMangement,
  TecnotreeDms,
  TecnotreedigitalSales
} from '../axios';


import { getaccessToken, DPRM_DMS } from 'Http/axios';
// export const downloadPdfReport = async (id) => {
//   await FileSaver.saveAs(
//     `${config.dev.server.dlpm_base_url}/dlpm/presales-service/v1/downlaod/pdfreport/${id}`
//   );
// };

// export default {
//   downloadPdfReport,
// };

export const downloadPdfReport = async (id, e) => {
  const res = await Tecnotree.get(`/downlaod/pdfreport/${id}`);
  var a = document.createElement('a');
  a.href = 'data:application/octet-stream;base64,' + res.data;
  a.download = `${id}.pdf`;
  a.click();
};
// e.preventDefault();
//   const link = document.createElement("a");
//   link.target = "_blank";

//     link.href = `${config.dev.server.dlpm_base_url}/dlpm/presales-service/v1/downlaod/pdfreport/${id}`;

//   link.download = "file.pdf";
//   setTimeout(() => {
//   link.dispatchEvent(new MouseEvent("click"));

// }, 1000)

export const shareattachment = async (id, e) => {
  return await Tecnotree.get(`/downlaod/pdfreport/${id}`)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};


export const getUploadHistory = async () => {
  return await TecnotreedigitalSales.get(`/commissionBulkUpload`)
  .then((res) => (res.status === 200 ? res.data : null))
  .catch((err) => null);
}

export const downloadReport = async (fileType) => {
  return await TecnotreedigitalSales.get(`/commissionBulkUpload/template/${fileType}`,{ 
    responseType: 'blob'}
  )
}

export const downloadBackOffice = async (fileType) => {
  return await TecnotreedigitalSales.get(`fileupload/${fileType}`,{ 
    responseType: 'blob'}
  )
}
export const DocumentChecking = async (payload, e) => {
  return;
  // return await TecnotreeDoccheck.post(`/DAP/1/DocumentPurposeCheck`, payload)
  //   .then((res) => (res.status === 200 ? res.data : null))
  //   .catch((err) => null);
};

export const ShareInvoiceDetails = async (payload, e) => {
  return await Tecnotreewallet.post(`/invoice/notificationbyemailId  `, payload)
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);
};

const downloadinvoicePdf = async (inoviceId, partnerId) => {
  let id = 'name';
  let data = await Tecnotreewallet.get(
    `/invoice/download?invoiceId=${inoviceId}&partnerId=${partnerId}`,
    { responseType: 'blob' }
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);

  const blob = new Blob([data], { type: 'application/pdf' });
  const href = window.URL.createObjectURL(blob);
  const theLink = document.createElement('a');
  theLink.href = href;
  theLink.download = inoviceId + '.pdf';
  document.body.appendChild(theLink);
  theLink.click();
  document.body.removeChild(theLink);
};

const generateInvoicelink = async (inoviceId, partnerId) => {
  let data = await Tecnotreewallet.get(
    `/invoice/download?invoiceId=${inoviceId}&partnerId=${partnerId}`,
    { responseType: 'blob' }
  )
    .then((res) => (res.status === 200 ? res.data : null))
    .catch((err) => null);

  const file = new Blob([data], { type: 'application/pdf' });

  const fileURL = URL.createObjectURL(file);

  const pdfWindow = window.open();
  pdfWindow.location.href = fileURL;
};
const getAuthImage = (item) => {
  let src = '';
  let img = fetch(`${DPRM_DMS}/${item.name}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${getaccessToken()}`,
      'Content-Type': undefined
    }
  }).then((res) => {
    if (res.ok) {
      res.blob().then((b) => {
        src = URL.createObjectURL(b);
        return URL.createObjectURL(b);
      });
    }
  });
};

const Download_Preview = async (url, contractPreview, comptype) => {
  let extention = url?.name?.split('.');
  let getFile = extention[extention.length - 1];

  console.log(comptype, "ccccllkkkk")
  if (contractPreview) {
    let id = 'name';
    let endpoint;
    if(comptype !== 'MOU') {
      endpoint =  await TecnotreeContractMangement.get(
        `/fileuploads/${url.name}`,
        { responseType: 'blob' }
      )
    }
    else {
      endpoint = await TecnotreeDms.get(`/document/download/${url.id}`, {
        responseType: 'blob'
      })
    }

    console.log(endpoint, "endpoit")
    const {data} = endpoint
      // .then((res) => (res.status === 200 ? res.data : null))
      // .catch((err) => null);
      console.log(data, "data is there")
    const blob = new Blob([data], { type: 'application/pdf' });
    const href = window.URL.createObjectURL(blob);
    const theLink = document.createElement('a');
    theLink.href = href;
    theLink.download = `${url.name}`;
    document.body.appendChild(theLink);
    theLink.click();
    document.body.removeChild(theLink);
  } else if (!contractPreview && getFile === 'pdf') {
    let id = 'name';
    let data = await TecnotreeDms.get(`/document/download/${url.id}`, {
      responseType: 'blob'
    })
      .then((res) => (res.status === 200 ? res.data : null))
      .catch((err) => null);

    const blob = new Blob([data], { type: 'application/pdf' });
    const href = window.URL.createObjectURL(blob);
    const theLink = document.createElement('a');
    theLink.href = href;
    theLink.download = `${url.name}`;
    document.body.appendChild(theLink);
    theLink.click();
    document.body.removeChild(theLink);
  } else {
    let data = await TecnotreeDms.get(`/document/download/${url.id}`, {
      responseType: 'blob'
    })
      .then((res) => (res.status === 200 ? res.data : null))
      .catch((err) => null);

    const blob = new Blob([data], { type: 'image/jpeg' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${url.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default {
  DocumentChecking,
  shareattachment,
  downloadPdfReport,
  downloadinvoicePdf,
  ShareInvoiceDetails,
  generateInvoicelink,
  getAuthImage,
  Download_Preview,
  getUploadHistory,
  downloadReport
};
