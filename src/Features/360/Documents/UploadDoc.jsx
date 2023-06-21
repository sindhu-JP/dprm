import React from 'react';
import Dayjs from 'dayjs';
import { Tecnovos, TecnotreeDms, Tecnotree } from 'Http/axios';
import { useForm } from 'Hooks/Form';
import { useStateful, useBoolean } from 'react-hanger';
import constants from '../../../Features/constants/constants';
import axios from 'axios';
import LeadFactory from 'Factory/Lead';
import moment from 'moment';

export const useUpload = ({
  onGetDetails,
  onSuccess,
  name,
  initialState,
  attachmentID,
  fileobj
}) => {
  const uploading = useBoolean(false);
  const currentFile = useStateful('');
  const detailsNeeded = useBoolean(false);
  const fileresponse = useStateful('');
  const filedata = useStateful('');
  const [selectedDate, handleDateChange] = React.useState(null);
  const details = useForm({
    initialState: initialState || {
      companyRegistrationNumber: '',
      issueDate: selectedDate,
      expiryDate: selectedDate,
      issuePlace: '',
      issuedBy: '',
      attachmentID: attachmentID
    }
  });

  const prepareForm = (options) => {
    const form = new FormData();
    for (const key in options) {
      form.append(key, options[key]);
    }
    return form;
  };

  const upload = async (payload) => {
    try {
      const response = await TecnotreeDms.post('/document/upload', payload);
      return response.data;
    } catch (err) {
      return {
        error: ''
      };
    }
  };

  const submitDetails = async () => {
    uploading.toggle();

    try {
      const formData = new FormData();
      formData.append('file', fileobj);

      const metaData = {
        lifecycleState: constants.status.DRAFT,
        documentSpecification: {
          id: details.value.idNumber
        }
      };

      metaData.documentCharacteristic = [
        {
          name: 'companyRegistrationNumber',
          value: details.value.companyRegistrationNumber
        },
        {
          name: 'issueDate',
          value: details.value.issueDate
        },
        {
          name: 'expiryDate',
          value: details.value.expiryDate
          //     ? moment(details.value.expiryDate).format(constants.dateFormat.reverseDate)
          //     : ''
        },
        {
          name: 'issuePlace',
          value: details.value.issuePlace
          // ? moment(details.value.issuePlace).format(constants.dateFormat.reverseDate)
          // : ''
        },
        {
          name: 'issuedBy',

          value: details.value.issuedBy
        }
      ];

      formData.append('metadata', JSON.stringify(metaData));

      const fileDetails = await upload(formData);

      //  if(fileDetails){

      //   //  const res= await  TecnotreeDms.get(`/document/download/${fileDetails.attachment[0].id}`);

      //    filedata.setValue(res)

      //  }

      fileresponse.setValue(fileDetails);
      // filedata.setValue(currentFile.value)

      uploading.toggle();
      detailsNeeded.toggle();
      onSuccess({
        target: {
          name,
          value: fileDetails
        }
      });
    } catch (err) {}
  };

  const start = async (files) => {
    const file = files[0];

    currentFile.setValue(file);
    detailsNeeded.toggle();
  };

  return {
    start,
    detailsNeeded: detailsNeeded.value,
    cancel: detailsNeeded.toggle,
    details: details.value,
    updateDetails: details.update,
    submitDetails,
    fileurl: filedata.value,
    fomrdatavalue: fileresponse.value
  };
};
