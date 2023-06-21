import {
    TecnotreedigitalSales,

  } from './../axios';
  



  const getBulkUpload = async (limit, offset) => {
    
    const data = await TecnotreedigitalSales.get(
      `/commissionBulkUpload/bulk-interactions?sort=-createdDate&limit=10&offset=0`
    )
    // .then((res) => res);
    .then((res) => {
      console.log(res, 'resttttter');
     
      return res;
    });
    // res.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return data;
  };


  const validateBulkUpload = async (form) => {
    
    const data = await TecnotreedigitalSales.post(
      `/commissionBulkUpload/validate/MarketingPartner`,
      form
    )
    // .then((res) => res);
    .then((res) => {
      console.log(res, 'resttttter');
     
      return res;
    }).catch((err)=> {
      console.log(err)
    })
    // res.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return data;
  };
  const BulkUpload = async (form) => {
    
    const data = await TecnotreedigitalSales.post(
      `/commissionBulkUpload/upload`,
      form
    )
    // .then((res) => res);
    .then((res) => {
      console.log(res, 'resttttter');
     
      return res;
    }).catch((err)=> {
      console.log(err)
    })
    // res.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return data;
  };
  
  const SubmitBulkUpload = async (form) => {
    
    const data = await TecnotreedigitalSales.post(
      `/bpmn/executeProcess`,
      form
    )
    // .then((res) => res);
    .then((res) => {
      console.log(res, 'resttttter');
     
      return res;
    }).catch((err)=> {
      console.log(err)
    })
    // res.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return data;
  };
  export default {
    getBulkUpload,
    validateBulkUpload,
    BulkUpload,
    SubmitBulkUpload
  };