import React from 'react';

import { TecnotreeDms } from 'Http/axios';
import { useForm } from 'Hooks/Form';
import { useStateful, useBoolean } from 'react-hanger';
import constants from '../../../Features/constants/constants';

export const ConstractUpload = ({
  onGetDetails,
  onSuccess,
  name,
  initialState,
  attachmentID,
  companyregid,
  setloadingOpen,
  ContractID
}) => {
  const uploading = useBoolean(false);
  const currentFile = useStateful('');
  const detailsNeeded = useBoolean(false);
  const fileresponse = useStateful('');
  const filedata = useStateful('');
  const [selectedDate, handleDateChange] = React.useState(null);
  const details = useForm({
    initialState: initialState || {
      ContractID: ContractID,
      issueDate: selectedDate,
      SignedIDdate: selectedDate,
      issuePlace: '',
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
          name: 'ContractId',
          value: attachmentID
        },
        {
          name: 'issueDate',
          value: details.value.issueDate
        },

        {
          name: 'issuePlace',
          value: details.value.issuePlace
          // ? moment(details.value.issuePlace).format(constants.dateFormat.reverseDate)
          // : ''
        },

        {
          name: 'SignedIDdate',

          value: details.value.SignedIDdate
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
      let error = '';
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
    fileobj: currentFile.value,
    fileurl: filedata.value,
    fomrdatavalue: fileresponse.value
  };
};
