import _get from 'lodash/get';
import _find from 'lodash/find';
import _startCase from 'lodash/startCase';
import _toLower from 'lodash/toLower';
import _difference from 'lodash/difference';
import constants from 'common/constants/constants';

export const sanitizeEnumData = (enumData) => {
  if (!enumData || _get(enumData, 'enum', []).length < 1) {
    return {
      readOnly: true
    };
  }
  return enumData;
};

export const updateCustomFields = (customFields) => {
  const customFieldKeys = Object.keys(customFields);
  customFieldKeys.forEach((element) => {
    if (!customFields[element]) {
      customFields[element] = undefined;
    }
  });
  return customFields;
};

export const sanitizeFormData = (
  requiredFields,
  optionalFields,
  formData,
  isEdit
) => {
  if (isEdit) {
    const keyArr = Object.keys(formData);
    keyArr.forEach((keyName) => {
      if (formData[keyName] === undefined || formData[keyName] === '') {
        delete formData[keyName];
      }
    });
    return formData;
  }

  (requiredFields || []).forEach((keyName) => {
    if (formData[keyName] === '' || formData[keyName] === undefined) {
      formData[keyName] = constants.placeHolderValue;
    }
  });
  (optionalFields || []).forEach((keyName) => {
    if (formData[keyName] === '' || formData[keyName] === undefined) {
      formData[keyName] = constants.placeHolderValue;
    }
  });
  return formData;
};

export const sanitizeData = (data) => {
  const coreFields = [
    'companyName',
    'customerCategory',
    'customerSubCategory',
    'riskCategory',
    'registrationNumber',
    'taxExempted',
    'taxExemptionDate',
    'taxPolicy'
  ];

  let customFields = { ...data.customFields };
  delete data.customFields;
  customFields = { ...data, ...customFields };
  const sanitizedCustomFields = {};

  const customKeys = _difference(Object.keys(data), coreFields);
  coreFields.forEach((keyName) => {
    data[keyName] =
      data[keyName] === constants.placeHolderValue ? '' : data[keyName];
  });

  customKeys.forEach((keyName) => {
    sanitizedCustomFields[keyName] =
      customFields[keyName] === constants.placeHolderValue ? '' : data[keyName];

    if (
      sanitizedCustomFields[keyName] &&
      keyName.toLowerCase().indexOf('date') > -1
    ) {
      const dateData = sanitizedCustomFields[keyName];
      try {
        if (typeof dateData === 'string') {
          sanitizedCustomFields[keyName] = new Date(dateData).toISOString();
        }
      } catch (err) {
        sanitizedCustomFields[keyName] = new Date().toISOString();
      }
    }
  });
  data.customFields = sanitizedCustomFields;

  return { data, customKeys };
};

export const getEnums = (list, valueId, labelId) => {
  return list.length
    ? {
        enum: list.map((listItem) => listItem[valueId]),
        enumNames: list.map((listItem) =>
          _startCase(_toLower(listItem[labelId]))
        ),
        default: (_find(list, 'default') || {})[valueId]
      }
    : {};
};

export const duplicateData = (formData, keys = []) => {
  if (!keys.length) {
    return formData;
  }
  const returnValues = {};
  keys.map((key) => {
    returnValues[key] = formData[key];
  });

  return returnValues;
};

export const deleteKeys = (formData, keys = []) => {
  if (!keys.length) {
    return formData;
  }
  keys.map((key) => {
    delete formData[key];
  });

  return formData;
};
