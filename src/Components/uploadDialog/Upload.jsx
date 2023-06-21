import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';
import {
  // TecnotreedigitalSales,
  getaccessToken,

  // DAM_DMS,
  TecnotreeDms
} from '../../Http/axios';
import config from 'config';
import {
  Grid,
  IconButton,
  Typography,
  Box,
  makeStyles
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import FormUploadDrawer from '../../Features/Forms/FormUploadDrawer';

const UploadFile = ({ setUploadList, uploadList, type, setLoading, loading}) => {
  const classes = useStyles();
  
  const [imageUrl, setImageUrl] = useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileUploadData, setfileuploadData] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [fileDetails, setFileDetails] = useState({});
  const [isFileuploadDrawer, setIsFileuploadDrawer] = useState(false);

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const DynamicAxios = () => {
    return TecnotreeDms;
  };
  let imgUrl = ""
  const triggerUploadApi = (Uploadform, fileDetails, DocValues) => {
   
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
              imgUrl = res
              console.log(res, "resdsdsdxx")
              return res.blob()
            })
            .then(async (blob) => {
              
             // console.log(blob, 'blob');
              let objectURL = URL.createObjectURL(blob);    
              const base64 = await blobToBase64(blob);   

            //  console.log(objectURL, 'object url');

              // console.log(resp.data, 'response data');
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
             console.log(fileLst, 'file list');

              if(type==="COMPANY_REGISTRATION") {
              
                
                setUploadList({...uploadList, COMPANY_REGISTRATION: [...uploadList.COMPANY_REGISTRATION, ...fileLst]});
              }
              else {
              
                setUploadList({...uploadList, NATIONAL_ID: [...uploadList.NATIONAL_ID, ...fileLst]});
              }
                console.log(fileLst, "file")
              resolve(fileLst);
            });
          //   .then(async (res) => {

          //   console.log(res, 'results');

          //   if (res.status === 200) {
          //     const url = URL.createObjectURL(new Blob([res.data]));
          //     console.log(url, 'url');

          //     console.log(
          //       await blobToBase64(new Blob([res.data])).then((el) =>
          //         console.log(el, 'image base64')
          //       )
          //     );
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
          //       let ObjUpload = { ...uploadObj },to
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

      documentCharacteristic: [
        {
          name: 'documentType',

          value: 'Partner Onboard'
        },

        {
          name: 'partnerId'
        }
      ]
    };

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

    onError('error');
  };
  const onSubmitDocument = async (values) => {
    setLoading(true);
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
    let reslove = triggerUploadApi(uploadDoc, fileDetails, values);
    reslove
      .then(async (response) => {
        // let setObj = {},
        //   ObjUpload = { ...uploadObj };
        // ObjUpload[currentData.name] = [...response];
        // setUploadObj({ ...ObjUpload });
        // setObj[currentData.name] = response;
        // props.formRef.setFieldsValue(setObj);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      //  console.log(err, 'error');
        // message.error('Error in Upload File');
      });
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);

       // console.log(file.preview, 'prrrrr');
      }
      setPreviewOpen(true);
      setPreviewImage(file.url || file.preview);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      );
    } catch (error) {
    //  console.log(error, 'erroxxxxxx');
    }
  };
  const handleChange = ({ fileList: newFileList }) => {
   // console.log(newFileList, 'listers');
     setFileList(newFileList);
    // if(type==="COMPANY_REGISTRATION") {
    //   setUploadList({...uploadList, COMPANY_REGISTRATION: [...newFileList]});
    // }
    // else {
    //   setUploadList({...uploadList, NATIONAL_ID: [...newFileList]});
    // }
    
  };
  const onDrawerClose = () => {
    setIsFileuploadDrawer(false);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        multiple={true}
        onPreview={handlePreview}
        beforeUpload={(file) => {
          console.log(file)
          setFileDetails(file);
          setIsFileuploadDrawer(true);
        }}
        customRequest={(option) => dummyRequest(option)}
       
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
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

          <FormUploadDrawer onSubmitDocument={onSubmitDocument} loading={loading} uploadType={type} />
        </Drawer>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  drawerInner: {
    '& .MuiDrawer-paperAnchorBottom': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? `${theme.palette.background.paper} !important`
          : ``
    }
  }
}));
export default UploadFile;
