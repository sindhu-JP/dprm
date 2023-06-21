import React from 'react';

import { TecnotreeDms } from 'Http/axios';
import { useForm } from 'Hooks/Form';
import { useStateful, useBoolean } from 'react-hanger';
import constants from '../../../Features/constants/constants';

export const useUpload = ({
  onGetDetails,
  onSuccess,
  name,
  initialState,
  attachmentID,
  companyregid,
  setloadingOpen
}) => {
  const uploading = useBoolean(false);
  const currentFile = useStateful('');
  const detailsNeeded = useBoolean(false);
  const fileresponse = useStateful('');
  const filedata = useStateful('');
  const [selectedDate, handleDateChange] = React.useState(null);
  const details = useForm({
    initialState: initialState || {
      companyRegistrationNumber: companyregid,
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

    detailsNeeded.toggle();

    try {
      const formData = new FormData();
      formData.append('file', currentFile.value);

      const metaData = {
        lifecycleState: constants.status.DRAFT,
        documentSpecification: {
          id: attachmentID
        }
      };

      metaData.documentCharacteristic = [
        {
          name: 'companyRegistrationNumber',
          value: companyregid
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

      onSuccess({
        target: {
          name,
          value: fileDetails
        }
      });
    } catch (err) {
      return err;
    }
    setloadingOpen(false);
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
