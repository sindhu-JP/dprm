import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { useStateful } from 'react-hanger';
import { connect } from 'react-redux';
import Documentcontroller from 'Controllers/Documents';
import _ from 'lodash';
import { Document, Page } from 'react-pdf';
import IconButton from '@material-ui/core/IconButton';
import { Modal } from 'antd';
import config from 'config';
import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';
import moment from 'moment';
import { downloadBackOffice } from '../../../Http/api/documents';
import { downloadFile } from '../../../Hooks/FormSubmitHook';


const ProductDetails = ({
  values,
  preview,
  title,
  partnerDetails,
  productData,
  maintitle,
  DownloadPreview,
  contractPreview,
  ticket,
  requestId
}) => {
  console.log(values, productData, 'producedataxxx');
  //const [Product, setProduct] = React.useState();
  const [authImage, setImage] = React.useState();
  const [imageModal, setImageModal] = React.useState(false);
  const [previewObj, setPreviewObj] = React.useState('');
  const [PdfBlob, setPdfBlob] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState([]);
  const [resultData, setResultData] = React.useState({});
  const [numPages, setNumPages] = React.useState(20);
  const [modifyData, setModifyData] = React.useState({});
  const [imageLoader, setImageLoader] = React.useState(false);
  const classes = useStyles();
  //const [Product, setProduct] = React.useState();
  const Product = useStateful({});
  const blobPreview = useStateful({});

  const rangelist = ['Range From', 'Range To', 'Range Value'];
  // to get commission
  let mergeObj = { ...productData };
  // to get commission
  // console.log(productData, 'productdata');
  React.useEffect(() => {
    // console.log(productData, 'assemble');
    // let primaryDetails = {
    //   MOBILE_NUMBER: productData?.PrimaryContactDetails?.EMAIL_ID,
    //   EMAIL: productData?.PrimaryContactDetails?.MOBILE_NUMBER
    // };

    // let obj = {
    //   PartnerDetails: productData?.PartnerDetails || productData?.TenantDetails,
    //   sections: [
    //     productData?.sections[
    //       productData.sections?.indexOf('PartnerDetails')
    //     ] ||
    //       productData?.sections[productData.sections?.indexOf('TenantDetails')]
    //   ]
    // };
    Product.setValue(productData);
    // console.log(Product.value, 'produxx');
  }, [productData]);

  const PdfPreview = (url, item) => {
    setPreviewObj(url);
    setPdfBlob(url?.url);
    setImageModal(true);
    loadPDF(url);
    // if (contractPreview) {
    //   loadPDF(url?.thumbUrl);
    // }

    // window.open(url, '_blank');
  };

  const imagePreview = (url, item) => {
    // console.log(url?.url, "imagefri")
    setPdfBlob(url?.url);
    setImageModal(true);
    loadImage(url);
    // setPreviewObj(item);
  };
  const handleImageModal = () => {
    setImageModal(false);
  };

  console.log(resultData, 'givenchy');
  const download = (fileType) => {
    // const { downloadFile } = FormSubmitHook();

    downloadBackOffice(fileType)
      .then((response) => {
        downloadFile(response, fileType, 'csv');
      })
      .catch((err) => {});
  };

  const loadPDF = async (dataURL) => {
    setImageLoader(true);

    let endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${dataURL?.id}`;

    fetch(endpoint, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        'Content-Type': undefined
      }
    })
      .then((res) => {
        res.blob().then((b) => {
          let src = URL.createObjectURL(b);
          console.log(src, 'eweeee');
          setPdfBlob(src);
          setImageLoader(false);
        });
      })
      .catch((e) => {});
  };

  const loadImage = async (dataURL) => {
    setImageLoader(true);

    let endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${dataURL?.id}`;

    fetch(endpoint, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        'Content-Type': undefined
      }
    })
      .then((res) => {
        res.blob().then((b) => {
          let src = URL.createObjectURL(b);
          console.log(src, 'eweeee');
          blobPreview.setValue(src);
          setImageLoader(false);
        });
      })
      .catch((e) => {});
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    let array = [];
    for (var i = 1; i <= numPages; i++) {
      array.push(i);
    }
    setPageNumber(array);
  }

  const getfilePreview = (item, title) => {
    console.log(item, 'itemxxxx');
    // console.log(item, "krayyy")
    // if (!authImage) {
    //   getAuthorizedImage(item);
    // }

    let getFile = '';
    let extention = item?.name?.split('.');
    if (extention) {
      getFile = extention[extention?.length - 1];
    }
    // if (!authImage) {
    //   getAuthorizedImage(item);
    // }
    if (
      getFile === 'pdf' ||
      item?.mimeType?.includes('application/pdf') ||
      item?.mimeType?.includes('application/zip')
    ) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <div>
            <div>
              <Box className={classes.someBox}>
                <Grid container>
                  <Grid item container className={classes.content}>
                    <Grid item container className={classes.contentBox1}>
                      <Grid item style={{ alignSelf: 'center' }}></Grid>
                      <Grid item container className={classes.iconSpace}>
                        <Grid item className={classes.iconSpace1}>
                          <Grid item>
                            <IconButton
                              onClick={() => PdfPreview(item, authImage)}
                            >
                              <img src={ViewIcon} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => TriggerController(item)}>
                              <img src={DownloadIcon} />
                              {/* <GetAppIcon fontSize="small" /> */}
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      );
    } else if (
      getFile === 'png' ||
      getFile === 'jpg' ||
      getFile === 'jpeg' ||
      item?.mimeType?.includes('image/png') ||
      item?.mimeType?.includes('image/webp')||item?.mimeType?.includes('image/jpeg')
    ) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <div>
            <div>
              <Box className={classes.someBox}>
                <Grid container>
                  <Grid item container className={classes.content}>
                    <Grid item container className={classes.contentBox1}>
                      <Grid item style={{ alignSelf: 'center' }}>
                        {authImage ? (
                          <>
                            {/* // <img
                          //   src={authImage}
                          //   alt="address proof"
                          //   className={classes.img}
                          // /> */}
                            <img
                              src={ViewIcon}
                              alt="address proof"
                              className={classes.img}
                            />
                          </>
                        ) : (
                          <img
                            src={ViewIcon}
                            alt="address proof"
                            className={classes.img}
                          />
                        )}
                      </Grid>
                      <Grid item container className={classes.iconSpace}>
                        <Grid item className={classes.iconSpace1}>
                          <Grid item>
                            <IconButton
                              onClick={() => imagePreview(item, authImage)}
                            >
                              <img src={ViewIcon} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => TriggerController(item)}>
                              <img src={DownloadIcon} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      );
    }
  };

  const FetchProductlist = (data) => {
    if (
      (title !== 'UploadDocuments' && title !== 'AddAnotherContact') ||
      title === 'ContractDocuments'
    ) {
      let temp = { ...data };
      // console.log(temp, 'oya');
      return _.omit(temp, [
        'LOGIN_TYPE',
        'href',
        'Wallet_ID',
        'Partner_ID',
        'ROLE',
        'TENANT_ID',
        'My_Task',
        'Contract_Added',
        'PRODUCT_ID',
        'Onboarding_Status',
        'path',
        // 'commissionRuleRange',
        '@schemaLocation',
        '@baseType',
        'status',
        'SAME_AS_MASTER_CONTACT_DETAILS',
        'SAME_AS_MASTER',
        'lastModifiedDate',
        'Dynamic_Contract_Pdf',
        'Contract_SignOff',
        'Contract_Shared',
        'Contract_Current_Status',
        'Contract_Accepted',
        'Contract_Status',
        'CONTRACT_ID',
        'Commission_Code',
        'Settelement_Code',
        'cmId',
        'DTT_Category_Id',
        'DTT_Category_Name',
        'DTT_Group_Id',
        'DTT_Group_Name',
        'DTT_Master_Partner_Category_Id',
        'DTT_Master_Partner_Category_Name',
        'CONTRACT_MODIFY_COUNT',
        'CONTRACT_RENEWAL_COUNT',
        'CONTRACT_CANCEL_COUNT'
        // 'PARTNER_NAME'
      ]);
    } else {
      //  console.log(data, 'oya');
      return data;
    }
  };

  console.log(
    productData,
    'productionoxxxx',
    productData?.PartnerDetails?.Partner_ID
  );
  const TriggerController = (url) => {
    download(url.fileName);
  };
  // console.log(productData?.partnerName, 'proddduuuct');
  // console.log(values,'valkkkkkk')
  return (
    <>
      <Paper elevation={0}>
        {/* <Box p={4}> */}
          <Grid container spacing={4} direction="column">
            <Grid item>
              <Paper elevation={0} className={classes.border}>               
                  <Grid container spacing={4} alignItems="center">
                    <Grid item style={{ width: '100px' }} >
                      <Typography
                        variant="subtitle2"
                        className={classes.textColor}
                      >
                        REQUEST ID
                      </Typography>
                    </Grid>
                    <Grid item style={{ width: '25px' }}>
                      <Typography
                        variant="subtitle1"
                        className={classes.textColor}
                      >
                        :
                      </Typography>
                    </Grid>
                    <Grid item style={{ width: '75px' }}>
                      <Typography
                        variant="subtitle1"
                        className={classes.textColor}
                      >
                        {requestId}
                      </Typography>
                    </Grid>
                  </Grid>                
                <Grid
                  container
                  direction="row"
                  spacing={4}
                  className={classes.boxx}
                >
                  <Grid item>
                    <Typography variant="h2" className={classes.title}>
                      {'Manual Commissioning '} {values?.bulkType} {'- Request'}
                    </Typography>
                  </Grid>
                </Grid>
                <div>
                  <Typography variant="body1" className={classes.title}>
                    {'Created on'}{' '}
                    {moment(values?.createdDate).format('YYYY-MM-DD')} {'|'}{' '}
                    <span style={{ color: 'blue' }}>{'Ticket activity'}</span>
                  </Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={0} className={classes.border}>
                <Grid container direction="row" spacing={4}>
                  <Grid item>
                    <Typography variant="h2" className={classes.title}>
                      {'Partner Information'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid container spacing={12}>
                    <Grid item xs={12}>
                      <Grid container direction="row">
                        {/* {productData?.ResellerProfileCreation?.AgentDetails
                              ?.Agent_ID && (                          */}
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'PARTNER NAME'}
                          </Typography>
                          <Typography variant="subtitle2">
                            {productData?.PartnerDetails?.PARTNER_NAME}
                          </Typography>
                        </Grid>
                        {/* }} */}

                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'PARTNER ID'}
                          </Typography>
                          <Typography variant="subtitle2">
                            {productData?.PartnerDetails?.Partner_ID}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'PARTNER TYPE'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {productData?.PartnerDetails?.PARTNER_TYPE}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'PARTNER SUB TYPE'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {productData?.PartnerDetails?.PARTNER_SUB_TYPE}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'EMAIL ID'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {productData?.PrimaryContactDetails.EMAIL_ID}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'MOBILE NUMBER'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {productData?.PrimaryContactDetails.MOBILE_NUMBER}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={0} className={classes.border}>
                <Grid container direction="row" spacing={4}>
                  <Grid item>
                    <Typography variant="h2" className={classes.title}>
                      {'Manual Commissioning Details'}
                    </Typography>
                  </Grid>
                </Grid>
                <Paper style={{ margin: '20px' }}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item style={{ fontSize: '16px' }}>
                      <Typography variant="H4" className={classes.title}>
                        {'Period'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={4}>
                    <Grid
                      item
                      xs={4}
                      style={{
                        padding: '0.5rem'
                      }}
                    >
                      <Typography variant="subtitle2">{'FROM DATE'}</Typography>
                      <Typography variant="subtitle1">
                        {moment(values?.fromDate).format('YYYY-MM-DD')}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        padding: '0.5rem'
                      }}
                    >
                      <Typography variant="subtitle2">{'TO DATE'}</Typography>
                      <Typography variant="subtitle1">
                        {moment(values?.toDate).format('YYYY-MM-DD')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper style={{ margin: '20px' }}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item style={{ fontSize: '16px' }}>
                      <Typography variant="H4" className={classes.title}>
                        {'Event Details'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid container spacing={12}>
                      <Grid item xs={12}>
                        {values?.eventDetails.map((el) => (
                          <Grid container direction="row">
                            {/* {productData?.ResellerProfileCreation?.AgentDetails
                                ?.Agent_ID && (                          */}
                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'EVENT NAME'}
                              </Typography>
                              <Typography variant="subtitle2">
                                {el?.eventName}
                                {/* {
                                      productData?.ResellerProfileCreation
                                        ?.AgentDetails?.Agent_ID
                                    } */}
                              </Typography>
                            </Grid>
                            {/* }} */}

                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'UNIT UTILIZED'}
                              </Typography>
                              <Typography variant="subtitle2">
                                {el?.unitsUtilized}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'UNIT PRICE'}
                              </Typography>
                              <Typography variant="subtitle1">
                                {el?.unitPrice}{' '}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'TOTAL COMMISSION'}
                              </Typography>
                              <Typography variant="subtitle1">
                                {el?.totalCommission}
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper style={{ margin: '20px' }}>
                  <Grid container spacing={4}>
                    <Grid container spacing={12}>
                      <Grid item xs={12}>
                        <Grid container direction="row">
                          {/* {productData?.ResellerProfileCreation?.AgentDetails
                              ?.Agent_ID && (                          */}
                          <Grid
                            item
                            xs={12}
                            style={{
                              padding: '0.5rem',
                              fontSize: '16px'
                            }}
                          >
                            <Typography variant="H4">{'COMMENT'}</Typography>
                            <Typography
                              variant="subtitle2"
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {values?.comments}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Paper>
            </Grid>

            <Grid item>
              {values?.attachment?.lenth > 0 && (
                <Paper elevation={0} className={classes.border}>
                  {/* <Box px={5}> */}

                  <Grid container direction="row" spacing={4}>
                    {/* <Grid item>
              <img src={img} />
            </Grid> */}
                    <Grid item>
                      <Typography variant="h2" className={classes.title}>
                        {'Reciept'}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* </Box> */}

                  <Grid container spacing={4}>
                    <Grid container spacing={12}>
                      <Grid item xs={12}>
                        <Grid container direction="row">
                          {values?.attachment?.map((el) => (
                            <Grid xs container direction="row" spacing={5}>
                              <div>{getfilePreview(el)}</div>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>
          </Grid>
        {/* </Box> */}
      </Paper>
      <Modal
        title="Document Preview"
        centered
        visible={imageModal}
        // style={{ zIndex: 2000 }}
        footer={null}
        // width={800}
        onCancel={handleImageModal}
      >
        <>
          {imageLoader ? (
            <CircularProgress />
          ) : (
            <>
              {previewObj?.name?.split('.').pop() === 'pdf' ||
              (previewObj &&
                previewObj?.mimeType.includes('application/pdf')) ? (
                <Document file={PdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
                  {pageNumber.map((item) => {
                    return (
                      <React.Fragment>
                        <Page pageNumber={item} />
                      </React.Fragment>
                    );
                  })}
                </Document>
              ) : (
                <>
                  <img
                    src={blobPreview.value && blobPreview?.value}
                    alt="image"
                    style={{ width: '80%' }}
                  ></img>
                </>
              )}
            </>
          )}
        </>
      </Modal>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2'
    //  borderRadius:"0px"
  },
  boxx: {
    display: 'flex',
    width: '100%',
    flexwrap: 'wrap'
  },
  borderSecondary: {
    border: '1px solid #e2e2e2',
    width: '94%',
    marginLeft: '30px'
    //  borderRadius:"0px"
  },
  root: {
    width: theme.spacing(65),
    // height: "auto",
    display: 'flex',
    minHeight: '13rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    // overflow: "hidden",
    maxHeight: '20rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    // width: '90%',
    height: 'auto',
    overflow: 'hidden',
    display: 'flex'
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },

  img: {
    width: '180px',
    height: 100,

    overflow: 'hidden !important'
    // '&:hover': {
    //   transform: 'scale(1.5)',
    //   marginTop: '50px'
    // }
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  },
  pdfIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 40
    }
  },
  imageModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  someBox: {
    backgroundColor: theme.palette.background.paper,

    marginTop: '30px',

    borderRadius: '16px'
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contentBox1: {
    width: '180px',
    // height: '200px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? `#aaaaaa !important`
        : `${theme.palette.background.paper} !important`,
    //  marginLeft: '20px',
    boxShadow: '0px 1px 5px #00000029',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '600px',
    height: '35px'
  },
  iconSpace: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px'
  },
  iconSpace1: {
    width: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },
  textColor: {
    fontWeight: 600,
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.black} !important`
        : ``
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals
  }),
  {
    DownloadPreview: Documentcontroller.DownloadPreview
  }
)(ProductDetails);
