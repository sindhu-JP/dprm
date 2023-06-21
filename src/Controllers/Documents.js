import { createAsyncThunk } from '@reduxjs/toolkit';

import Modal from 'Store/Modals';
import Alert from 'Store/Alert';

import DocumentApi from 'Http/api/documents';

const downloadInvoice = createAsyncThunk(
  'dashboard/downloadInvoice',
  async ({ invoiceid, partnerid }, { dispatch }) => {
    if (invoiceid && partnerid) {
      await DocumentApi.downloadinvoicePdf(invoiceid, partnerid).catch(
        (err) => {}
      );

      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Invoice Downloaded Successfully.'
        })
      );
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: ' Download Failed'
        })
      );
    }
  }
  // return data;
);

const shareInvoice = createAsyncThunk(
  'dashboard/shareInvoice',
  async ({ invoiceId, partnerId, emailId }, { dispatch }) => {
    const payload = {
      invoiceId: invoiceId,
      partnerId: partnerId,
      emailId: emailId
    };
    await DocumentApi.ShareInvoiceDetails(payload).catch((err) => {});

    dispatch(
      Alert.open({
        type: 'Success',
        message: ' Statement sent Successfully.'
      })
    );
    dispatch(Modal.close('ShareNotification'));
  }
  // return data;
);

const generateInvoicelink = createAsyncThunk(
  'dashboard/generateInvoicelink',
  async ({ invoiceid, partnerid }, { dispatch }) => {
    if (invoiceid && partnerid) {
      await DocumentApi.generateInvoicelink(invoiceid, partnerid).catch(
        (err) => {}
      );
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'print  Failed'
        })
      );
    }
  }
  // return data;
);

const DownloadPreview = createAsyncThunk(
  'dashboard/DownloadPreview',
  async ({ url, contractPreview, comptype }, { dispatch }) => {
    if (url?.name) {
      console.log(url, "downoad url")
      await DocumentApi.Download_Preview(url, contractPreview, comptype).catch(
        (err) => {}
      );

      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Downloaded Successfully.'
        })
      );
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: ' Download Failed'
        })
      );
    }
  }
  // return data;
);

export default {
  downloadInvoice,
  shareInvoice,
  generateInvoicelink,
  DownloadPreview
};
