import { createAsyncThunk } from '@reduxjs/toolkit';
import bulkUploadAPI from '../Http/api/bulkupload';




const getBulkUpload = createAsyncThunk(
    'dashboard/getBulkUpload',
    async (
      { limit = 10, offset = 0},
     
    ) => {
    //   console.log(getResellerPartners,'getResellerPartners')
      let data = await bulkUploadAPI.getBulkUpload(
        limit,
        offset,
      
      ).catch(err=>{
         console.log(err)
      }); 
    
      let count = data.headers['x-count'];
      return {
        list: data?.data.sort(
          (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
        ),
        xCount: count
      };
    }
  );


  export default {getBulkUpload}