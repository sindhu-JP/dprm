
import _ from 'lodash';



export const downloadFile = async (
  response,
  filename = 'download',
  type = 'pdf'
) => {
  const data =
    _.get(response, 'payload.data', null) || _.get(response, 'data', null);
  // if (!(data instanceof Blob)) return;
  const blob = new Blob([data], { type: `application/${type}` });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${filename}-${+new Date()}.${type}`;
  link.click();
};



