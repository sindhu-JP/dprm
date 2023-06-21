import React, { useState, useEffect } from 'react';
import {
  Form,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Spin,
  Radio,
  Checkbox,
  Button,
  Upload,
  Tooltip,
  Switch,
  message
} from 'antd';
import './FormFields.scss';
import Drawer from '@material-ui/core/Drawer';
import moment from 'moment';

// import { API } from '../../utils/API';
import {
  // TecnotreedigitalSales,
  getaccessToken,
  DPRM_DMS,

  // DAM_DMS,
  TecnotreeDms
} from '../../Http/axios';
import SearchDataRender from './SearchDataRender';
import {
  UploadOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  
} from '@ant-design/icons';

// import { attachToken, getaccessToken, DPRM_DMS } from 'Http/axios';
import { Document, Page } from 'react-pdf';
import { useDispatch } from 'react-redux';
// import config from 'config';
import FormUploadDrawer from './FormUploadDrawer';
import { LoadingSpin } from './LoadingSpin';
import CloseIcon from '@material-ui/icons/Close';
import {
  Grid,
  IconButton,
  Typography,
  Box,
  makeStyles
} from '@material-ui/core';
import { isEmpty } from 'lodash';
// import { DocumentChecking } from 'Http/api/documents';
import config from 'config';
import { useStateful } from 'react-hanger';
import classNames from 'classnames';

const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function Forms(props) {

  console.log(props, "properties")
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [form] = Form.useForm();
  const [displayCam, setDisplayCam] = useState(false);
  const [dataUri, setDataUri] = useState('');

  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState('');
  const [DocumentView, setDocumentView] = useState(false);
  const [previewTitle, setpreviewTitle] = useState('');
  const [filename, setfileName] = useState('Document Name');
  const [multiFileList, setMulltiFileList] = useState([]);
  const [isFileuploadDrawer, setIsFileuploadDrawer] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [fileDetails, setFileDetails] = useState({});
  const [uploadObj, setUploadObj] = useState({});
  const [files, setfiles] = React.useState([]);
  const [fileUploadData, setfileuploadData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [fileDoc, setFileDoc] = useState([]);
  const [docType, setDocType] = useState("")
  let merchantId = null;
  const id = localStorage.getItem('merchantId');
  if (id) {
    merchantId = localStorage.getItem('merchantId');
  }
  // const [numPages, setNumPages] = React.useState(null);
  // const [pageNumber, setPageNumber] = React.useState(1);
  // const  buttonLoader=useBoolean(false)
  const [numPages, setNumPages] = useState(null);
  const blobPreview = useStateful({});
 
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  
  const handleTakePhoto = (dataUi) => {
    setDataUri(dataUi);

    setDisplayCam(false);
    // props.setCaptureData(dataUi);
  };

  const handleModalCancel = () => {
    setDisplayCam(false);
  };
  const handleCaptureDelete = () => {
    setDataUri('');

    // props.setCaptureData('');
  };

  const dummyRequest = async ({ file, onSuccess, onError }, data) => {
    let metadata = {
      lifecycleState: 'draft',

      documentSpecification: {
        id: 'DPRM'
      },

      relatedParty: [
        {
          id: null,

          name: null,

          role: 'DSP-USER',

          '@referredType': 'USER',

          engagedParty: {}
        }
      ],

      relatedEntity: {
        id: props.dmsPayload?.agent
          ? props.dmsPayload?.obj?.id
          : props.dmsPayload?.obj?.Partner_ID,

        '@referredType': 'Partner'
      },

      documentCharacteristic: [
        {
          name: 'documentType',

          value: 'Partner Onboard'
        },

        {
          name: 'partnerId',

          value: props.dmsPayload?.agent
            ? props.dmsPayload?.obj?.id
            : props.dmsPayload?.obj?.Partner_ID
          // : merchantId
        }
      ]
    };
    // if (file.type === 'image/png') {
    //   setIsFileuploadDrawer(true);
    // } else {
    //   dispatch(
    //     Alert.open({
    //       type: 'error',
    //       message: 'Please Upload valid Formats only PNG,JPEG,JPG,PDF'
    //     })
    //   );
    // }

    let size = (file.size / 1024 / 1024).toFixed(2),
      min = parseFloat(data?.min), 
      max = parseFloat(data?.max);

    if (isNaN(min) && isNaN(max)) {
      const Uploadform = new FormData();
      Uploadform.append('file', file);
      Uploadform.append('name', file.name);
      Uploadform.append('id', file.uid);
      Uploadform.append('description', 'sdasdsad');
      Uploadform.append('productName', 'BussinessAccount');
      Uploadform.append('folderName', 'Testbusinessaccount');
      Uploadform.append('metadata', JSON.stringify(metadata));
      // let result = await triggerUploadApi(Uploadform, file, data?.type);
      setfileuploadData(Uploadform);
      // setIsFileuploadDrawer(true);
      // setCurrentData(data);
      // setFileDetails(file);
      onSuccess('result');
    } else if (size >= min && size <= max) {
      const Uploadform = new FormData();
      Uploadform.append('file', file);
      Uploadform.append('name', file.name);
      Uploadform.append('id', file.uid);
      Uploadform.append('description', 'sdasdsad');
      Uploadform.append('productName', 'BussinessAccount');
      Uploadform.append('folderName', 'Testbusinessaccount');
      Uploadform.append('metadata', metadata);
      // let result = await triggerUploadApi(Uploadform, file, data?.type);
      setfileuploadData(Uploadform);
      // setIsFileuploadDrawer(true);
      // setCurrentData(data);
      // setFileDetails(file);
      onSuccess('result');
    } else {
      message.error('file Size doesnt match', 1);
      onError('error');
    }
  };

  const handlePreview = async (file) => {
    blobPreview.setValue({});
    if (file.url) {
      let fileName = file.name;
      let fileExtension = fileName.split('.').pop();
      if (fileExtension === 'pdf') {
        setpreviewVisible(true);
        setpreviewImage(file);
        setDocumentView(true);
        setpreviewTitle(file.name);
        getBlob(file);
        // window.open(file.url, '_blank');
      } else {
        getBlob(file);
        setDocumentView(false);

        setpreviewImage(file);
        setpreviewVisible(true);
        setpreviewTitle(file.name);
      }
    }
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    // if (fileList && fileList[0].url) {
    //   setpreviewImage(file.preview);
    //   setpreviewVisible(true);
    //   setpreviewTitle(file.name);
    // }
  };

  const handlemultiPreview = async (file) => {
    if (file.url) {
      let fileName = file.url;
      let fileExtension = fileName.split('.').pop();

      if (file?.mimeType?.includes('application/pdf')) {
        // pdf file open
        setpreviewVisible(true);
        setpreviewImage(file);
        setDocumentView(true);
        getBlob(file);

        // window.open(file.url, '_blank');
      } else {
        setDocumentView(false);
        // other format
        getBlob(file);

        setpreviewImage(file);
        setpreviewVisible(true);
        setpreviewTitle(file.name);
      }
    }
    // file['preview'] = await getBase64(file.originFileObj);

    // setpreviewImage(file.preview);
    // setpreviewVisible(true);
    // setpreviewTitle(file.name);
  };

  const DynamicAxios = () => {
    return TecnotreeDms;
  };

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const triggerUploadApi = (Uploadform, Cdata, fileDetails, DocValues) => {
    return new Promise(function (resolve, reject) {
      DynamicAxios()
        .post(`document/upload`, Uploadform)
        .then((resp) => {
          fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${resp.data?.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          )
            .then((res) => {
              console.log(res, 'ressscsxss');
              return res.blob();
            })
            .then(async (blob) => {
              let objectURL = URL.createObjectURL(blob);

              const base64 = await blobToBase64(blob);
              setFileDoc((oldArray) => [...oldArray, base64]);
              setImagePreview(resp.data?.id);
              let fileLst = [
                {
                  uid: fileDetails.uid,
                  name: resp.data?.fileName,
                  status: resp.data?.lifecycleState,
                  createDate: resp.data?.createdDate,
                  mimeType: _.get(resp.data?.attachment, '[0].mimeType', ''),
                  url: objectURL,
                  id: resp.data?.id,
                  expiryDate: DocValues?.expiryDate,
                  name: _.get(resp.data.attachment, '[0].name', ''),

                  dms: {}
                }
              ];
              if (Cdata?.type === 'multiUpload') {
                let ObjUpload = { ...uploadObj },
                  list = ObjUpload[Cdata?.name]
                    ? [...ObjUpload[Cdata?.name]]
                    : [];

                fileLst = [...fileLst, ...list];
              }

              // console.log(fileLst, resp?.data, "file listxx")
              resolve(fileLst);
            });
          //   .then(async (res) => {

          //   if (res.status === 200) {
          //     const url = URL.createObjectURL(new Blob([res.data]));

          //     setImagePreview(resp.data?.id);
          //     let fileLst = [
          //       {
          //         uid: fileDetails.uid,
          //         name: resp.data?.fileName,
          //         status: 'done',
          //         url: url,

          //         dms: resp.data?.dms ? resp.data?.dms : {}
          //       }
          //     ];
          //     if (Cdata?.type === 'multiUpload') {
          //       let ObjUpload = { ...uploadObj },
          //         list = ObjUpload[Cdata?.name]
          //           ? [...ObjUpload[Cdata?.name]]
          //           : [];

          //       fileLst = [...fileLst, ...list];
          //     }
          //     resolve(fileLst);
          //   }
          // });
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  };
  const handleUpload = async ({ file, fileList }, data) => {};

  const onClickCamera = () => {
    setDisplayCam(true);
  };
  const onDrawerClose = () => {
    setIsFileuploadDrawer(false);
  };

  const getAuthorizedImage = async (item) => {
    if (item) {
      return fetch(`${DPRM_DMS}/${item.name}`, {
        method: 'get',

        headers: {
          Authorization: `Bearer ${getaccessToken()}`,

          'Content-Type': undefined
        }
      }).then((res) => {
        if (res.ok) {
          res.blob().then((b) => {
            let src = URL.createObjectURL(b);

            // let setObj = {},
            //   ObjUpload = { ...uploadObj };
            // ObjUpload[currentData.name] = [{... item, url:URL.createObjectURL(b)} ],
            // setUploadObj({ ...ObjUpload });
            // setObj[currentData.name] = [{... item, url:URL.createObjectURL(b)}]
            // props.formRef.setFieldsValue(setObj);
            // LoadingSpin(false);
          });
        }
      });
    }
  };

  console.log(props?.docsInfo?.UploadDocuments, 'hryxxxx');

  const onSubmitDocument = async (values) => {
    LoadingSpin(true);
    let cdata = currentData,
      dsm = {},
      uploadDoc = fileUploadData;

    dsm = { ...values };
    dsm['name'] = fileDetails.name;
    dsm['uid'] = fileDetails.uid;
    dsm['status'] = 'active';

    dsm = JSON.stringify(dsm);

    uploadDoc.append('dms', dsm);
    setIsFileuploadDrawer(false);
    let reslove = triggerUploadApi(uploadDoc, cdata, fileDetails, values);
    reslove
      .then(async (response) => {
        let setObj = {},
          ObjUpload = { ...uploadObj };
        ObjUpload[currentData.name] = [...response];
        console.log(ObjUpload, currentData,  "issues with code")
        setUploadObj({ ...ObjUpload });
        setObj[currentData.name] = response;
        props.formRef.setFieldsValue(setObj);
        LoadingSpin(false);
      })
      .catch((err) => {
        LoadingSpin(false);
        // console.log(err, 'error');
        message.error('Error in Upload File');
      });
  };
  console.log(uploadObj, 'documents ype');
  const handleUrlData = async () => {
    let uploadDoc2 = {
      COMPANY_REGISTRATION: [],
      FINANCIAL_DOCUMENTS: [],
      'TIN/TAX_DOCUMENT': [],
      NATIONAL_ID: [],
      ADDRESS_PROOF: [],
      NID: [],
      PHOTOGRAPH: [],
      SIGNATURE: [], 
      KYC_DOCUMENTS: []
    };

    const getTinTax = props?.docsInfo?.UploadDocuments?.[
      'TIN/TAX_DOCUMENT'
    ]?.map(async (el) => {
      if (
        el?.url?.includes('blob:http://') ||
        el?.thumbUrl?.includes('blob:http://')
      ) {
        let data = fetch(
          // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
          `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
          {
            method: 'get',
            headers: {
              Authorization: `Bearer ${getaccessToken()}`
            }
          }
        );

        let newData = await data;
        let blob = await newData.blob();
        let object = URL.createObjectURL(blob);

        return {
          ...el,
          url: object
        };
      } else {
        return {
          ...el
        };
      }

      // .then((res) => res.blob())
      // .then(async (blob) => {
      //   let objectURL = URL.createObjectURL(blob);

      //   return {
      //     ...el,
      //     url: URL.createObjectURL(blob)
      //   };
      // });
    });

    console.log(getTinTax, '.............');

    if (getTinTax) {
      let texData = getTinTax && (await Promise?.all(getTinTax));
      uploadDoc2['TIN/TAX_DOCUMENT'] = [...texData];
    }

    const getComReg =
      props?.docsInfo?.UploadDocuments?.COMPANY_REGISTRATION?.map(
        async (el) => {
          if (
            el?.url?.includes('blob:http://') ||
            el?.thumbUrl?.includes('blob:http://')
          ) {
            let data = fetch(
              // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
              `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
              {
                method: 'get',
                headers: {
                  Authorization: `Bearer ${getaccessToken()}`
                }
              }
            );

            let newData = await data;
            let blob = await newData.blob();
            let object = URL.createObjectURL(blob);
            return {
              ...el,
              url: object
            };
          } else {
            return {
              ...el
            };
          }

          // .then((res) => res.blob())
          // .then(async (blob) => {
          //   let objectURL = URL.createObjectURL(blob);

          //   return {
          //     ...el,
          //     url: URL.createObjectURL(blob)
          //   };
          // });
        }
      );

    if (getComReg) {
      let texDataComp = await Promise.all(getComReg);

      uploadDoc2.COMPANY_REGISTRATION = [...texDataComp];
    }

    const getFinDoc =
      props?.docsInfo?.UploadDocuments?.FINANCIAL_DOCUMENTS?.map(async (el) => {
        if (
          el?.url?.includes('blob:http://') ||
          el?.thumbUrl?.includes('blob:http://')
        ) {
          let data = fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          ).then();

          let newData = await data;
          let blob = await newData.blob();
          let object = URL.createObjectURL(blob);

          return {
            ...el,
            url: object
          };
        } else {
          return {
            ...el
          };
        }

        // .then((res) => res.blob())
        // .then(async (blob) => {
        //   let objectURL = URL.createObjectURL(blob);

        //   return {
        //     ...el,
        //     url: URL.createObjectURL(blob)
        //   };
        // });
      });

    if (getFinDoc) {
      let texDataFinDoc = await Promise.all(getFinDoc);
      uploadDoc2.FINANCIAL_DOCUMENTS = [...texDataFinDoc];
    }

    const getNationalId = props.docsInfo?.UploadDocuments?.NATIONAL_ID?.map(
      async (el) => {
        if (
          el?.url?.includes('blob:http://') ||
          el?.thumbUrl?.includes('blob:http://')
        ) {
          let data = fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          );

          let newData = await data;
          let blob = await newData.blob();
          let object = URL.createObjectURL(blob);
          return {
            ...el,
            url: object
          };
        } else {
          return {
            ...el
          };
        }

        // .then((res) => res.blob())
        // .then(async (blob) => {
        //   let objectURL = URL.createObjectURL(blob);

        //   return {
        //     ...el,
        //     url: URL.createObjectURL(blob)
        //   };
        // });
      }
    );

    if (getNationalId) {
      let textDataNATDOC = await Promise.all(getNationalId);
      uploadDoc2.NATIONAL_ID = [...textDataNATDOC];
    }

    const getAddress = props.docsInfo?.UploadDocuments?.ADDRESS_PROOF?.map(
      async (el) => {
        if (
          el?.url?.includes('blob:http://') ||
          el?.thumbUrl?.includes('blob:http://')
        ) {
          let data = fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          );

          let newData = await data;
          let blob = await newData.blob();
          let object = URL.createObjectURL(blob);
          return {
            ...el,
            url: object
          };
        } else {
          return {
            ...el
          };
        }

        // .then((res) => res.blob())
        // .then(async (blob) => {
        //   let objectURL = URL.createObjectURL(blob);

        //   return {
        //     ...el,
        //     url: URL.createObjectURL(blob)
        //   };
        // });
      }
    );
    if (getAddress) {
      let textDataAddress = await Promise.all(getAddress);
      uploadDoc2.ADDRESS_PROOF = [...textDataAddress];
    }

    const getNID = props.docsInfo?.UploadDocuments?.NID?.map(async (el) => {
      if (
        el?.url?.includes('blob:http://') ||
        el?.thumbUrl?.includes('blob:http://')
      ) {
        let data = fetch(
          // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
          `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
          {
            method: 'get',
            headers: {
              Authorization: `Bearer ${getaccessToken()}`
            }
          }
        );

        let newData = await data;
        let blob = await newData.blob();
        let object = URL.createObjectURL(blob);
        return {
          ...el,
          url: object
        };
      } else {
        return {
          ...el
        };
      }

      // .then((res) => res.blob())
      // .then(async (blob) => {
      //   let objectURL = URL.createObjectURL(blob);

      //   return {
      //     ...el,
      //     url: URL.createObjectURL(blob)
      //   };
      // });
    });

    if (getNID) {
      let textDataNID = await Promise.all(getNID);
      uploadDoc2.NID = [...textDataNID];
    }

    const getPhoto = props.docsInfo?.UploadDocuments?.PHOTOGRAPH?.map(
      async (el) => {
        if (
          el?.url?.includes('blob:http://') ||
          el?.thumbUrl?.includes('blob:http://')
        ) {
          let data = fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          );

          let newData = await data;
          let blob = await newData.blob();
          let object = URL.createObjectURL(blob);
          return {
            ...el,
            url: object
          };
        } else {
          return {
            ...el
          };
        }

        // .then((res) => res.blob())
        // .then(async (blob) => {
        //   let objectURL = URL.createObjectURL(blob);

        //   return {
        //     ...el,
        //     url: URL.createObjectURL(blob)
        //   };
        // });
      }
    );

    if (getPhoto) {
      let textDataPhoto = await Promise.all(getPhoto);
      uploadDoc2.PHOTOGRAPH = [...textDataPhoto];
    }

    const getSIGNATURE = props.docsInfo?.UploadDocuments?.SIGNATURE?.map(
      async (el) => {
        if (
          el?.url?.includes('blob:http://') ||
          el?.thumbUrl?.includes('blob:http://')
        ) {
          let data = fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          );

          let newData = await data;
          let blob = await newData.blob();
          let object = URL.createObjectURL(blob);
          return {
            ...el,
            url: object
          };
        } else {
          return {
            ...el
          };
        }

        // .then((res) => res.blob())
        // .then(async (blob) => {
        //   let objectURL = URL.createObjectURL(blob);

        //   return {
        //     ...el,
        //     url: URL.createObjectURL(blob)
        //   };
        // });
      }
    );

    if (getSIGNATURE) {
      let textDataSign = await Promise.all(getSIGNATURE);
      uploadDoc2.SIGNATURE = [...textDataSign];
    }

    const getKYC = props.docsInfo?.UploadDocuments?.KYC_DOCUMENTS?.map(
      async (el) => {
        if (
          el?.url?.includes('blob:http://') ||
          el?.thumbUrl?.includes('blob:http://')
        ) {
          let data = fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${el.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          );
  
          let newData = await data;
          let blob = await newData.blob();
          let object = URL.createObjectURL(blob);
          return {
            ...el,
            url: object
          };
        } else {
          return {
            ...el
          };
        }
  
        // .then((res) => res.blob())
        // .then(async (blob) => {
        //   let objectURL = URL.createObjectURL(blob);
  
        //   return {
        //     ...el,
        //     url: URL.createObjectURL(blob)
        //   };
        // });
      }
    );

    if (getKYC) {
      let textDataKYC = await Promise.all(getKYC);
      uploadDoc2.KYC_DOCUMENTS = [...textDataKYC];
    }
    return uploadDoc2;
  };




  const getDoc = async () => {
    let uploadObj2 = await handleUrlData();
   
    console.log(uploadObj2, 'gbaxxx');

    setUploadObj(uploadObj2);
    setfiles(uploadObj2);
  };

  useEffect(() => {
    if (!isEmpty(props.docsInfo)) {
      getDoc();

      //     setUploadObj({
      //   COMPANY_REGISTRATION: [
      //     {
      //       uid: 'rc-upload-1631684087639-2',
      //       name: '53fa2802-31df-411a-b7b1-7bd4299e4e33download.jpg',
      //       status: 'done',
      //       url: 'http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/53fa2802-31df-411a-b7b1-7bd4299e4e33download.jpg',
      //       dms: {
      //         id: '6141869ba76dc637b50029d7',
      //         issueDate: '2021-09-12T05:37:23.542Z',
      //         expiryDate: '2021-10-09T05:37:25.630Z',
      //         name: 'download.jpg',
      //         url: 'http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/53fa2802-31df-411a-b7b1-7bd4299e4e33download.jpg',
      //         uid: 'rc-upload-1631684087639-2',
      //         documentype: 'ID',
      //         documentName: 'dfdf',
      //         status: 'active',
      //         issuePlace: 'ddd',
      //         issueBy: 'dd',
      //         registerationNumber: 'asfd'
      //       }
      //     }
      //   ]
      // });
      //props.formRef.setFieldsValue({uploadDoc})
    }
  }, [props.docsInfo]);

  const onFileUploadRemove = (file, Cdata) => {
    let objUpload = { ...uploadObj },
      setObj = {},
      filterArr = [];

    filterArr = objUpload[Cdata?.name].filter((item) => {
      return item.uid !== file.uid;
    });
    objUpload[Cdata?.name] = [...filterArr];
    setObj[Cdata?.name] = [...filterArr];

    props.formRef.setFieldsValue(setObj);

    setUploadObj(objUpload);
  };

  const isFullscreen = false;
  const uploadButton = (
    <div className="upload-form-inner">
      <PlusOutlined style={{ position: 'relative', left: '24px' }} />
      <div style={{ marginTop: 8, fontSize: 'small' }}>Select file</div>
    </div>
  );

  const uploadMultiButton = (
    <div className="upload-form-inner">
      <PlusOutlined style={{ position: 'relative', left: 0 }} />
      <div style={{ marginTop: 8, fontSize: 'small' }}>Select file</div>
    </div>
  );

  const getBlob = async (file) => {
    fetch(
      // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
      `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${file.id}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${getaccessToken()}`,

          'Content-Type': undefined
        }
      }
    )
      .then((res) => {
        console.log('resultzzz', res);
        return res.blob();
      })
      .then(async (blob) => {
        let objectURL = URL.createObjectURL(blob);

        const base64 = await blobToBase64(blob);
        blobPreview.setValue(base64);
      });
  };

  console.log(props.fieldData, "field data")
  let dataObj = props.fieldData.map((item) => {
    return {
      ...item,
      name:
        item?.label === 'TIN/TAX DOCUMENTS'
          ? 'TIN/TAX_DOCUMENT'
          : item?.label === 'FINANCIAL STATEMENTS'
          ? 'FINANCIAL_DOCUMENTS'
          
          : item.name
    };

   
    // if (item?.label === 'TIN/TAX DOCUMENTS') {
    //   return {
    //     ...item,
    //     name: 'TIN/TAX_DOCUMENT'
    //   };
    // }

    // if (item?.label === 'FINANCIAL STATEMENTS') {
    //   return {
    //     ...item,
    //     name: 'FINANCIAL_DOCUMENTS'
    //   };
    // }

    // if (item?.label === 'COMPANY REGISTRATION') {
    //   return {
    //     ...item,
    //     name: 'COMPANY REGISTRATION'
    //   };
    // }
  });
  console.log(dataObj, "dataobject")
  return (
    <>
      <div
        className={
          props.customSteps ? 'tt-form-label-with-custom-step' : 'tt-form-label'
        }
      >
        <Row gutter={16}>
          {dataObj &&
            dataObj.map((data, index) => {
              console.log(data.name, props?.searchResp, 'data types');
              if (data?.type === 'email') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        name={data?.name}
                        initialValue={
                          data?.defaultValue ? data?.defaultValue : ''
                        }
                        colon={false}
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!'
                          },
                          { required: data?.required, message: data?.errorMsg },
                          {
                            min:
                              data?.min && data?.min !== ''
                                ? parseInt(data?.min)
                                : '',
                            max:
                              data?.max && data?.max !== ''
                                ? parseInt(data?.max)
                                : '',
                            message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                          },
                          {
                            pattern:
                              data?.regex && data?.regex !== ''
                                ? new RegExp(data?.regex)
                                : '',
                            message: 'Format is wrong'
                          }
                        ]}
                      >
                        <Input
                          disabled={
                            data?.editable
                              ? data?.editable
                              : data?.disableField &&
                                (data?.value !== '' ||
                                  (data?.defaultValue &&
                                    data?.defaultValue !== ''))
                              ? data?.disableField
                              : data?.disableField ?
                              data?.disableField : false
                          }
                          onBlur={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'email'
                            )
                          }
                          className={classNames(
                            'tt-input-fields',
                            classes.input
                          )}
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'compare') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        dependencies={
                          data?.compareField ? [data?.compareField] : []
                        }
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? 'Excution is success'
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : 'Excution failed'
                            : ''
                        }
                        colon={false}
                        name={data?.name}
                        initialValue={
                          data?.defaultValue ? data?.defaultValue : 'tttttt'
                        }
                        rules={[
                          { required: data?.required },
                          {
                            min:
                              data?.min && data?.min !== ''
                                ? parseInt(data?.min)
                                : '',
                            max:
                              data?.max && data?.max !== ''
                                ? parseInt(data?.max)
                                : '',
                            message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                          },
                          {
                            pattern:
                              data?.regex && data?.regex !== ''
                                ? new RegExp(data?.regex)
                                : '',
                            message: 'Format is wrong'
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (
                                data?.compareType &&
                                data?.compareType === 'equal'
                              ) {
                                if (
                                  !value ||
                                  getFieldValue(data?.compareField) === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  `The ${data?.compareField} should match ${data?.label}`
                                );
                              } else if (
                                data?.compareType &&
                                data?.compareType === 'notEqual'
                              ) {
                                if (
                                  !value ||
                                  getFieldValue(
                                    data?.compareField
                                  ).toString() !== value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  `The ${data?.compareField} should not be same as ${data?.label}!`
                                );
                              }
                            }
                          })
                        ]}
                      >
                        <Input
                          disabled={
                            data?.editable
                              ? data?.editable
                              : data?.disableField &&
                                (data?.value !== '' ||
                                  (data?.defaultValue &&
                                    data?.defaultValue !== ''))
                              ? data?.disableField
                              : false
                          }
                          onChange={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'text'
                            )
                          }
                          className="tt-input-fields"
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }

              if (data?.type === 'text' || data?.type === 'URL') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        // hasFeedback
                        // validateStatus={
                        //   data?.name === props.statusId
                        //     ? props.validationStatus
                        //     : ''
                        // }
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        colon={false}
                        name={data?.name}
                        initialValue={
                          data?.defaultValue
                            ? data?.defaultValue
                            : // : data?.label === 'CREDIT DAYS'
                              // ? props.riskCategory?.creditDays
                              // : data?.label === 'CREDIT LIMIT'
                              // ? props.riskCategory?.creditLimit
                              // : data?.label === 'RISK CATEGORY'
                              // ? props.riskCategory?.risk
                              ''
                        }
                        rules={[
                          {
                            required: data?.required,
                            message: `${data?.label} is required`
                          },
                          {
                            min:
                              data?.min && data?.min !== ''
                                ? parseInt(data?.min)
                                : '',
                            max:
                              data?.max && data?.max !== ''
                                ? parseInt(data?.max)
                                : '',
                            message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                          },
                          {
                            pattern:
                              data?.regex && data?.regex !== ''
                                ? new RegExp(data?.regex)
                                : '',
                            message: 'Format is wrong'
                          }
                        ]}
                      >
                        <Input
                          disabled={
                            data?.label === 'CREDIT DAYS' ||
                            data?.label === 'CREDIT LIMIT' ||
                            data?.label === 'RISK CATEGORY'
                              ? true
                              : data?.editable
                              ? data?.editable
                              : data?.disableField &&
                                (data?.value !== '' ||
                                  (data?.defaultValue &&
                                    data?.defaultValue !== ''))
                              ? data?.disableField
                              : false
                          }
                          onBlur={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'text'
                            )
                          }
                          className={classNames(
                            'tt-input-fields',
                            classes.input
                          )}
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'number') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        name={data?.name}
                        colon={false}
                        initialValue={
                          data?.defaultValue ? data?.defaultValue : ''
                        }
                        // validateStatus={
                        //   data?.name === props.statusId
                        //     ? props.validationStatus
                        //     : ''
                        // }
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        // hasFeedback
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        rules={[
                          { required: data?.required, message: data?.errorMsg },
                          {
                            min:
                              data?.min && data?.min !== ''
                                ? parseInt(data?.min)
                                : '',
                            max:
                              data?.max && data?.max !== ''
                                ? parseInt(data?.max)
                                : '',
                            message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                          },
                          {
                            pattern:
                              data?.regex && data?.regex !== ''
                                ? new RegExp(data?.regex)
                                : '',
                            message: 'Format is wrong'
                          }
                        ]}
                      >
                        <Input
                          disabled={
                            data?.editable
                              ? data?.editable
                              : data?.disableField &&
                                (data?.value !== '' ||
                                  (data?.defaultValue &&
                                    data?.defaultValue !== ''))
                              ? data?.disableField
                              : false
                          }
                          onBlur={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'number'
                            )
                          }
                          type={data?.type}
                          className={classNames(
                            'tt-input-fields',
                            classes.input
                          )}
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'dropdown') {
                return (
                  <Col
                    span={
                      data?.name === 'Commission_Rule_Details' ||
                      data?.name === 'Settlement_Rule_Details'
                        ? 24
                        : 8
                    }
                    key={index}
                  >
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        className={classNames('tt-form-label', classes.label)}
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        name={data?.name}
                        colon={false}
                        rules={[
                          { required: data?.required, message: data?.errorMsg }
                        ]}
                      >
                        {
                          <Select
                            style={{
                              width:
                                data?.name === 'Commission_Rule_Details' ||
                                data?.name === 'Settlement_Rule_Details'
                                  ? 300
                                  : '100%'
                            }}
                            disabled={
                              data?.editable
                                ? data?.editable
                                : data?.disableField &&
                                  (data?.value !== '' ||
                                    (data?.defaultValue &&
                                      data?.defaultValue !== ''))
                                ? data?.disableField
                                : false
                            }
                            className={classNames(
                              classes.select,
                              'tt-form-select'
                            )}
                            bordered={false}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            optionFilterProp="children"
                            showSearch={true}
                            getPopupContainer={(node) => node.parentNode}
                            onChange={(value) =>
                              props.onDropDownChange(value, data?.regex, data)
                            }
                          >
                            {data?.options &&
                              data?.options.map((item, indx) => {
                                return (
                                  <Option
                                    key={indx}
                                    value={item.id ? item.id : item.value}
                                  >
                                    {item.label
                                      ? item.label
                                      : item.value
                                      ? item.value
                                      : item.id}
                                  </Option>
                                );
                              })}
                          </Select>
                        }
                      </Form.Item>
                    }

                    {props.searchCommissionResp && (
                      <SearchDataRender
                        searchResp={
                          props.searchCommissionResp[data?.name]
                            ? props.searchCommissionResp[data?.name]
                            : {}
                        }
                      />
                    )}
                    {props.searchSettelementResp && (
                      <SearchDataRender
                        searchResp={
                          props.searchSettelementResp[data?.name]
                            ? props.searchSettelementResp[data?.name]
                            : {}
                        }
                      />
                    )}

                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'radio') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        name={data?.name}
                        colon={false}
                        rules={[
                          { required: data?.required, message: data?.errorMsg }
                        ]}
                      >
                        <Radio.Group
                          onChange={(e) =>
                            props.onRadioChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'radio'
                            )
                          }
                        >
                          {data?.options ? (
                            data?.options.map((item, index) => {
                              return (
                                <Radio key={index} value={item.value}>
                                  {item.value}
                                </Radio>
                              );
                            })
                          ) : (
                            <Radio value={1}>A</Radio>
                          )}
                        </Radio.Group>
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'checkbox') {
                return (
                  <Col
                    span={
                      data?.name === 'PRIMARY_CONTACT_NAME' ||
                      data?.name === 'PRIMARY_CONTACT_DETAILS'
                        ? 24
                        : 8
                    }
                    key={index}
                  >
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        name={data?.name}
                        rules={[
                          { required: data?.required, message: data?.errorMsg }
                        ]}
                      >
                        <Checkbox.Group
                          onChange={(checkedValues) =>
                            props.onCheckBoxChange(checkedValues, data)
                          }
                        >
                          {data?.options ? (
                            data?.options.map((item, index) => {
                              return (
                                <Checkbox
                                  value={item.value}
                                  key={index}
                                  style={{ lineHeight: '32px' }}
                                >
                                  {item.value}
                                </Checkbox>
                              );
                            })
                          ) : (
                            <Checkbox value={1}>Demo</Checkbox>
                          )}
                        </Checkbox.Group>
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'switch'&& data?.name !== 'SAME_AS_MASTER_CONTACT_DETAILS_1') {
                return (
                  <Col
                    span={
                      data?.name === 'SAME_AS_MASTER' ||
                      data?.name === 'SAME_AS_MASTER_CONTACT_DETAILS'
                        ? 24
                        : 8
                    }
                    key={index}
                  >
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        valuePropName="checked"
                        name={data?.name}
                        colon={false}
                        rules={[
                          { required: data?.required, message: data?.errorMsg }
                        ]}
                      >
                        <Switch
                          //onChange={props.onSwitchTrigger}
                          onChange={(checked) =>
                            props.onSwitchTrigger(checked, data?.regex, data)
                          }
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'datepicker' || data?.type === 'date') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        name={data?.name}
                        colon={false}
                        rules={[
                          { required: data?.required, message: data?.errorMsg }
                        ]}
                        className={classNames('tt-form-label', classes.label)}
                      >
                        <DatePicker
                          onChange={(date, dateString) =>
                            props.onInputChange(
                              dateString,
                              data?.regex,
                              data,
                              'datepicker',
                              'date'
                            )
                          }
                          onOpenChange={(open) => {}}
                          disabled={
                            data?.name === 'END_DATE' ||
                            (props.modifyContract &&
                              data?.name === 'START_DATE')
                              ? true
                              : false
                          }
                          style={{ width: '100%' }}
                          getPopupContainer={(node) => node.parentNode}
                          className={classNames(
                            'tt-input-fields',
                            classes.input
                          )}
                          disabledDate={(current) => {
                            return (
                              current &&
                              current <
                                moment(props.availableFrom, 'YYYY-MM-DD')
                            );
                          }}
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'textarea') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        initialValue={
                          data?.defaultValue ? data?.defaultValue : ''
                        }
                        name={data?.name}
                        colon={false}
                        rules={[
                          { required: data?.required, message: data?.errorMsg },

                          {
                            min:
                              data?.min && data?.min !== ''
                                ? parseInt(data?.min)
                                : '',
                            max:
                              data?.max && data?.max !== ''
                                ? parseInt(data?.max)
                                : '',
                            message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                          },
                          {
                            pattern:
                              data?.regex && data?.regex !== ''
                                ? new RegExp(data?.regex)
                                : '',
                            message: 'Format is wrong'
                          }
                        ]}
                      >
                        <TextArea
                          disabled={
                            data?.editable
                              ? data?.editable
                              : data?.disableField &&
                                (data?.value !== '' ||
                                  (data?.defaultValue &&
                                    data?.defaultValue !== ''))
                              ? data?.disableField
                              : false
                          }
                          onChange={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'textarea'
                            )
                          }
                          className={classNames(
                            'tt-input-fields',
                            classes.input
                          )}
                          rows={1}
                          autoSize={true}
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'password') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        name={data?.name}
                        colon={false}
                        initialValue={
                          data?.defaultValue ? data?.defaultValue : ''
                        }
                        rules={[
                          { required: data?.required },
                          {
                            min:
                              data?.min && data?.min !== ''
                                ? parseInt(data?.min)
                                : '',
                            max:
                              data?.max && data?.max !== ''
                                ? parseInt(data?.max)
                                : '',
                            message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                          },
                          {
                            pattern:
                              data?.regex && data?.regex !== ''
                                ? new RegExp(data?.regex)
                                : '',
                            message: 'Format is wrong'
                          }
                        ]}
                      >
                        <Input.Password
                          disabled={
                            data?.editable &&
                            (data?.value !== '' || data?.defaultValue !== '')
                              ? data?.editable
                              : props.type === 'userProfile'
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'password'
                            )
                          }
                          className="tt-input-fields"
                        />
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'upload') {
                let filetype =
                  data &&
                  data?.kyctype.map((item) => {
                    if (item.checked === 'true') {
                      return item.label;
                    }
                  });
                filetype = filetype.filter((item) => item !== undefined);
                filetype = filetype.join();
                return (
                  <Col span={8} key={index}>
                    <div className="upload-form-outter">
                      {
                        <Form.Item
                          label={<span>{data?.label}</span>}
                          name={data?.name}
                          colon={false}
                          className={classNames(
                            'tt-form-label ant-form-item-label',
                            classes.label
                          )}
                          // valuePropName={[...fileList]}
                          // getValueFromEvent={({ fileList }) =>
                          //   normFile(fileList)
                          // }
                          rules={[
                            {
                              required: data?.required,
                              message: data?.errorMsg
                            }
                          ]}
                        >
                          <Upload
                            headers={{
                              Authorization: `Bearer ${getaccessToken()}`
                            }}
                            // headers={{Authorization: `Bearer ${getaccessToken()}`}}
                            accept={`${filetype}`}
                            listType={
                              uploadObj[data?.name] &&
                              uploadObj[data?.name]?.length === 1
                                ? 'picture-card'
                                : ''
                            }
                            onPreview={handlePreview}
                            fileList={
                              uploadObj[data.name] 
                                ? [...uploadObj[data.name]]
                                : []
                            }
                            beforeUpload={(file) => {
                              setIsFileuploadDrawer(true);
                              setDocType(data?.label)
                              setCurrentData(data);
                              setFileDetails(file);
                            }}
                            onChange={(info) => handleUpload(info, data)}
                            customRequest={(option) =>
                              dummyRequest(option, data)
                            }
                            onRemove={(file) => onFileUploadRemove(file, data)}
                          >
                            {uploadObj[data?.name] &&
                            uploadObj[data?.name].length === 1
                              ? null
                              : uploadButton}
                          </Upload>
                        </Form.Item>
                      }
                    </div>
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'multiUpload') {
                let filetype =
                  data &&
                  data?.kyctype.map((item) => {
                    if (item.checked === 'true') {
                      return item.label;
                    }
                  });
                filetype = filetype.filter((item) => item !== undefined);
                filetype = filetype.join();
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        name={data?.name}
                        colon={false}
                        className={classNames(
                          'tt-form-label ant-form-item-label',
                          classes.label
                        )}
                        rules={[
                          {
                            required:
                              data?.required === 'false'
                                ? false
                                : data?.required,
                            message:
                              Object.keys(uploadObj).length > 0
                                ? ''
                                : data?.errorMsg
                          }
                        ]}
                      >
                        <Upload
                          headers={{
                            Authorization: `Bearer ${getaccessToken()}`
                          }}
                          accept={`${filetype}`}
                          listType="picture-card"
                          onPreview={handlemultiPreview}
                          fileList={
                            uploadObj[data.name]
                              ? [...uploadObj[data.name]]
                              : []
                          }
                          onChange={(info) => handleUpload(info)}
                          customRequest={(option) => dummyRequest(option, data)}
                          onRemove={(file) => onFileUploadRemove(file, data)}
                          beforeUpload={(file) => {
                            setIsFileuploadDrawer(true);
                            setCurrentData(data);
                            setFileDetails(file);
                            setDocType(data?.label)
                          }}
                        >
                          {uploadObj[data?.name] &&
                          uploadObj[data?.name]?.length >= 8
                            ? null
                            : uploadMultiButton}

                          {/* headers={{Authorization: `Bearer ${getaccessToken()}`}} */}
                        </Upload>
                      </Form.Item>
                    }

                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'capture') {
                return (
                  <Col span={8} key={index}>
                    <Form.Item
                      label={
                        <>
                          <span>
                            {data?.label} &nbsp;
                            <Tooltip title={data?.tooltip ? data?.tooltip : ''}>
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </span>
                          {data?.required ? (
                            <span className="capture-required"></span>
                          ) : (
                            ''
                          )}
                        </>
                      }
                      name={data?.name}
                    >
                      {props.captureData ? (
                        <div className="capture-img-preview">
                          <Row>
                            <Col span={21}>
                              <img
                                src={props.captureData}
                                height="48px"
                                width="68px"
                              />
                            </Col>
                            <Col span={3}>
                              <DeleteOutlined
                                style={{ marginTop: 14 }}
                                onClick={handleCaptureDelete}
                              />
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <Button onClick={onClickCamera}>
                          <UploadOutlined /> Click to Capture
                        </Button>
                      )}
                    </Form.Item>
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'MultiSelect') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hasFeedback
                        validateStatus={
                          data?.name === props.statusId
                            ? props.validationStatus
                            : ''
                        }
                        // help="The information is being validated..."
                        extra={
                          data?.name === props.statusId
                            ? props.validationStatus === 'success'
                              ? data?.executeSuccess
                                ? data?.executeSuccess
                                : ''
                              : props.validationStatus === 'validating'
                              ? 'Execution is in process'
                              : data?.executeFail
                              ? data?.executeFail
                              : ''
                            : ''
                        }
                        name={data?.name}
                        colon={false}
                        rules={[
                          { required: data?.required, message: data?.errorMsg }
                        ]}
                      >
                        <Select
                          mode="tags"
                          className="tt-form-select"
                          bordered={false}
                          allowClear
                          optionFilterProp="children"
                          showSearch={true}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          getPopupContainer={(node) => node.parentNode}
                          onChange={(value) =>
                            props.onMultiDropDownChange(
                              value,
                              data?.regex,
                              data
                            )
                          }
                        >
                          {data?.options &&
                            data?.options.map((item, indx) => {
                              return (
                                <Option
                                  key={indx}
                                  value={item.id ? item.id : item.value}
                                >
                                  {item.label ? item.label : item.value}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    }
                    {data?.instructions && (
                      <div className="formcreationinstructions">
                        {data?.instructions}{' '}
                      </div>
                    )}
                  </Col>
                );
              }
              if (data?.type === 'Button') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item>
                        <Button
                          className={
                            data?.style === 'Outlined'
                              ? 'outline_btn'
                              : data?.style === 'Text'
                              ? 'text_btn'
                              : 'contained_btn'
                          }
                          onClick={() =>
                            props.onTrriggerBtnClick(
                              data,
                              props.sectionTitle,
                              props.sectionIndex
                            )
                          }
                          type={data?.style === 'Text' ? 'text' : ''}
                          width={'150px'}
                        >
                          {data?.label}
                        </Button>
                      </Form.Item>
                    }
                  </Col>
                );
              }
              if (data?.type === 'hidden') {
                return (
                  <Col span={8} key={index}>
                    {
                      <Form.Item
                        label={<span>{data?.label}</span>}
                        hidden="true"
                        name={data?.name}
                        initialValue={
                          data?.defaultValue ? data?.defaultValue : ''
                        }
                      >
                        <Input
                          onChange={(e) =>
                            props.onInputChange(
                              e.target.value,
                              data?.regex,
                              data,
                              'text'
                            )
                          }
                          className="tt-input-fields"
                        />
                      </Form.Item>
                    }
                  </Col>
                );
              }
              if (data?.type === 'search') {
                console.log(
                  '---388477388477884774773----======---====SA',
                  data
                );
                return (
                  <>
                    <Col span={24} key={index}>
                      {
                        <Form.Item
                          label={<span>{data?.label}</span>}
                          // hasFeedback
                          // validateStatus={
                          //   data?.name === props.statusId
                          //     ? props.validationStatus
                          //     : ''
                          // }
                          className={classNames(
                            // 'tt-input-fields',
                            classes.input
                          )}
                          extra={
                            data?.name === props.statusId
                              ? props.validationStatus === 'success'
                                ? data?.executeSuccess
                                  ? data?.executeSuccess
                                  : ''
                                : props.validationStatus === 'validating'
                                ? 'Execution is in process'
                                : data?.executeFail
                                ? data?.executeFail
                                : ''
                              : ''
                          }
                          name={data?.name}
                          colon={false}
                          rules={[
                            {
                              message: 'Please Select'
                            },
                            {
                              required:
                                !data?.required || data?.required === 'false'
                                  ? false
                                  : true,
                              message: data?.errorMsg
                                ? data?.errorMsg
                                : 'Please Search and Select'
                            },
                            {
                              min:
                                data?.min && data?.min !== ''
                                  ? parseInt(data?.min)
                                  : '',
                              max:
                                data?.max && data?.max !== ''
                                  ? parseInt(data?.max)
                                  : '',
                              message: `${data?.name} must be between ${data?.min} and ${data?.max}`
                            },
                            {
                              pattern:
                                data?.regex && data?.regex !== ''
                                  ? new RegExp(data?.regex)
                                  : '',
                              message: 'Format is wrong'
                            }
                          ]}
                        >
                          {
                            <Select
                              showSearch
                              placeholder="Search"
                              getPopupContainer={(node) => node.parentNode}
                              filterOption={false}
                              style={{ width: 250 }}
                              onSearch={(str) =>
                                props.onSearchFetcher(str, data?.regex, data)
                              }
                             
                              className={classes.autoFill}
                              notFoundContent={
                                props.fetching ? <Spin size="small" /> : null
                              }
                              // options={props.searchOptions}
                              onChange={(value) => {
                                props.onSearchSelected(value, data);
                              }}
                            >
                              {' '}
                              {props.searchOptions[data?.name]?.length > 0 &&
                                props.searchOptions[data?.name].map(
                                  (item, indx) => {
                                    return (
                                      <Option
                                        key={indx}
                                        value={item.id ? item.id : item.value}
                                      >
                                        {item.label
                                          ? item.label
                                          : item.value
                                          ? item.value
                                          : item.id}
                                      </Option>
                                    );
                                  }
                                )}
                            </Select>
                          }
                        </Form.Item>
                      }
                      {data?.instructions && (
                        <div className="formcreationinstructions">
                          {data?.instructions}{' '}
                        </div>
                      )}
                    </Col>

                    {props.searchSettelementResp && (
                      <SearchDataRender
                        searchResp={
                          props.searchSettelementResp[data.name]
                            ? props.searchSettelementResp[data.name]
                            : {}
                        }
                      />
                    )}
                    {props.searchCommissionResp && (
                      <SearchDataRender
                        searchResp={
                          props.searchCommissionResp[data.name]
                            ? props.searchCommissionResp[data.name]
                            : {}
                        }
                      />
                    )}

                    {!props.contractModification && (
                      <SearchDataRender
                        searchResp={ 
                          props.searchResp[data.name]
                            ? props.searchResp[data.name]
                            : {}
                        }
                      />
                    )}
                    {/* <SearchDataRender
                      searchResp={
                        props.searchResp[data?.name]
                          ? props.searchResp[data?.name]
                          : {}
                      }
                    /> */}
                  </>
                );
              }
            })}
        </Row>
      </div>
      {previewVisible ? (
        <Modal
          visible={previewVisible}
          title={filename}
          footer={null}
          zIndex={1500}
          onCancel={() => setpreviewVisible(false)}
        >
          {DocumentView && blobPreview.value && (
            <Document
              // file={{
              //   url: `${DPRM_DMS}/${previewImage.name}`,
              //   httpHeaders: { Authorization: `Bearer ${getaccessToken()}` }
              // }}
              file={blobPreview.value}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          )}
          {!DocumentView && blobPreview.value && (
            <img
              alt="example"
              style={{ width: '100%' }}
              src={blobPreview.value}
            />
          )}
        </Modal>
      ) : (
        ''
      )}
      {displayCam ? (
        <Modal
          visible={true}
          title="Preview"
          onCancel={handleModalCancel}
          footer={null}
          width="60vw"
        >
          <div className="camera-capture">
            {/* <Camera
              onTakePhotoAnimationDone={handleTakePhoto}
              isFullscreen={isFullscreen}
              idealResolution={{ width: '40px', height: '100px' }}
            /> */}
          </div>
        </Modal>
      ) : (
        ''
      )}
      {isFileuploadDrawer && (
        // <Modal
        //   title="Document"
        //   placement={'bottom'}
        //   //closable={false}
        //   onClose={onDrawerClose}
        //   visible={isFileuploadDrawer}
        //   key={'bottom'}
        //   zIndex="300000"
        //   maskClosable={false}
        // >
        //   <FormUploadDrawer onSubmitDocument={onSubmitDocument} />
        // </Modal>

        <Drawer
          anchor={'bottom'}
          open={true}
          onClose={onDrawerClose}
          className={classes.drawerInner}
        >
          {/* <Drawer
          title="Document"
          placement={'bottom'}
          //closable={false}
          onClose={onDrawerClose}
          visible={isFileuploadDrawer}
          key={'bottom'}
          zIndex="300000"
          maskClosable={false}
        > */}
          <Box py={5}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Document
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={onDrawerClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <FormUploadDrawer onSubmitDocument={onSubmitDocument} uploadType={docType}/>
        </Drawer>
      )}
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },

  drawerInner: {
    '& .MuiDrawer-paperAnchorBottom': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? `${theme.palette.background.paper} !important`
          : ``
    }
  },
  container: {
    height: '90vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.main
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  input: {
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.black} !important`
        : ``,
    backgroundColor:
      theme.palette.type === 'dark'
        ? `${theme.palette.background.paper} !important`
        : ``,
    '& input': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.black} !important`
          : ``,
      backgroundColor:
        theme.palette.type === 'dark'
          ? `${theme.palette.background.paper} !important`
          : ``
    }
  },
  label: {
    '& .ant-form-item-label': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.black} !important`
          : ``
    }
  },
  select: {
    '& .ant-select-selection-item': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.black} !important`
          : ``
    }
  },
  autoFill: {
    '&.ant-select:not(.ant-select-customize-input) .ant-select-selector': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.common.black} !important`
          : ``,
      backgroundColor:
        theme.palette.type === 'dark'
          ? `${theme.palette.background.paper} !important`
          : ``
    }
    //  "& .ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector": {
    //   backgroundColor: theme.palette.type === 'dark'
    //       ? `${theme.palette.common.black} !important`
    //       : ``
    //    },
    //    "& .ant-select:not(.ant-select-customize-input) .ant-select-selector":{
    //     backgroundColor: theme.palette.type === 'dark'
    //     ? `${theme.palette.common.black} !important`
    //     : ``
    //    }
    // "&. ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    //     cursor: text;
    // }
    // .ant-select:not(.ant-select-customize-input) .ant-select-selector
  }
}));
export default Forms;

// export default connect(mapStateToProps, { setCaptureData })(Forms);

// const normFile = async (e, data) => {
//     let size = e.fileList.length > 0 ? e.fileList[0].size / 1024 / 1024 : 0
//     let file = e.fileList[0]
//     let fileList = []
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e && e.fileList;

// }
