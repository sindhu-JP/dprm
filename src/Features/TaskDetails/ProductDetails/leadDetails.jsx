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

import _ from 'lodash';
import { connect } from 'react-redux';

// import { contractMangement } from 'Http/axios';
import { Document, Page } from 'react-pdf';
import config from 'config';
import IconButton from '@material-ui/core/IconButton';
import { Modal } from 'antd';
import Documentcontroller from 'Controllers/Documents';
import _isEmpty from 'lodash/isEmpty';
import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';

// import { Trans } from '@lingui/macro';

const ProductDetails = ({
  values,
  preview,
  title,
  partnerDetails,
  productData,
  maintitle,
  DownloadPreview,
  contractPreview,
  ticket
}) => {
  const commissionDetails = useStateful({});
  const settlementDetails = useStateful({});
  // const Product = useStateful({});
  const [authImage, setImage] = React.useState();
  const [imageModal, setImageModal] = React.useState(false);
  const [previewObj, setPreviewObj] = React.useState('');
  const [PdfBlob, setPdfBlob] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState([]);
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

  //console.log(productData, 'productdata');

  //   const getcommissionRules = async (code) => {
  //     const details = await partnerAPi.getcommissionRules(code);
  //     console.log(details, 'details');
  //     commissionDetails.setValue(_.get(details, '[0]'));
  //     mergeObj = Object.assign({}, mergeObj || productData);
  //     if (productData['CommissionRuleDetails']) {
  //       mergeObj['CommissionRuleDetails'] = _.get(details, '[0]', {});
  //     } else {
  //       mergeObj['CommissionRulesDetails'] = _.get(details, '[0]', {});
  //     }

  //     Product.setValue(mergeObj);
  //   };

  // to get settlement

  //   const getSettlementRuleDetails = async (code) => {
  //     const details = await partnerAPi.SettlementRuleDetails(code);
  //     console.log(details, 'detailsxxx');
  //     settlementDetails.setValue(_.get(details, '[0]'));
  //     mergeObj = Object.assign({}, mergeObj || productData);
  //     mergeObj['SettlementRuleDetails'] = _.get(details, '[0]', {});
  //     Product.setValue(mergeObj);
  //   };

  // const getSettlementRuleDetails = async (code) => {
  //   const details = await partnerAPi.SettlementRuleDetails(code);
  //   settlementDetails.setValue(_.get(details, '[0]'));
  //   let mergeObj = Object.assign({}, productData);
  //   mergeObj['SettlementRuleDetails'] = _.get(details, '[0]', {});

  //   Product.setValue(mergeObj);
  // };
  // const getcommissionRules = async (code) => {

  //   const details = await partnerAPi.getcommissionRules(code);
  //   settlementDetails.setValue(_.get(details, '[0]'));
  //   let mergeObj = Object.assign({}, productData);
  //   if (productData['CommissionRuleDetails']) {
  //     mergeObj['CommissionRulesDetails'] = _.get(details, '[0]', {});
  //   } else {
  //     mergeObj['CommissionRuleDetails'] = _.get(details, '[0]', {});
  //   }

  //   Product.setValue(mergeObj);
  // };

  // React.useEffect(() => {
  //   // settlement
  //   if (productData) {
  //     if (productData['SettlementRuleDetails']) {
  //       getSettlementRuleDetails(
  //         productData['SettlementRuleDetails'].Settlement_Rule
  //       );
  //     }
  //     if (productData['CommissionRuleDetails']) {
  //       getcommissionRules(
  //         productData['CommissionRuleDetails'].Commission_Rule
  //       );
  //     } else {
  //       Product.setValue(productData);
  //     }
  //     // CommissionRulesDetails key name change
  //     if (productData['CommissionRulesDetails']) {
  //       getcommissionRules(
  //         productData['CommissionRulesDetails'].Commission_Rule
  //       );
  //     }
  //     if (preview) {
  //       // Product.setValue(productData)
  //     }
  //   }
  // }, [maintitle, productData]);
  React.useEffect(() => {
    //  console.log(productData, 'assemble');
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

  console.log(productData, 'productData');
  const PdfPreview = (url, item) => {
    setPreviewObj(url);
    setPdfBlob(url?.url);
    setImageModal(true);
    // if (contractPreview) {
    //   loadPDF(url?.thumbUrl);
    // }

    // window.open(url, '_blank');
  };

  const imagePreview = (url, item) => {
    // console.log(url?.url, "imagefri")
    setPdfBlob(url?.url);
    setImageModal(true);
    loadPDF(url?.id);

    // setPreviewObj(item);
  };
  const handleImageModal = () => {
    setImageModal(false);
  };

  const loadPDF = (dataURL) => {
    setImageLoader(true);
    setPdfBlob(dataURL);

    fetch(
      `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${dataURL}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          'Content-Type': undefined
        }
      }
    )
      .then((res) => {
        res.blob().then((b) => {
          let src = URL.createObjectURL(b);
          setPdfBlob(src);
          setImageLoader(false);
        });
      })
      .catch((e) => {
        setImageLoader(false);
      });
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
  //   const getAuthorizedImage = async (item) => {
  //     let endpoint = '';
  //     if (contractPreview) {
  //       // endpoint=`${contractMangement}/${'fileuploads'}/${item?.name}`
  //     } else {
  //       endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${item.id}`;
  //     }
  //     if (item) {
  //       return fetch(endpoint, {
  //         method: 'get',

  //         headers: {
  //           Authorization: `Bearer ${getaccessToken()}`,

  //           'Content-Type': undefined
  //         }
  //       }).then((res) => {
  //         if (res.ok) {
  //           res.blob().then(async (b) => {
  //             let src = URL.createObjectURL(b);
  //             // return src;
  //             setImage(src);
  //             const base64 = await blobToBase64(b);
  //             blobPreview.setValue(base64);

  //             // console.log(base64, 'blob');
  //           });
  //         }
  //       });
  //     }
  //   };
  //   function blobToBase64(blob) {
  //     // console.log(blob, "nolb")
  //     return new Promise((resolve, _) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => resolve(reader.result);
  //       reader.readAsDataURL(blob);
  //     });
  //   }

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

  const TriggerController = (url) => {
    DownloadPreview({ url, contractPreview });
  };

  // console.log(Product.value, 'proddduuuct');
  return (
    <>
      <Paper elevation={0}>
        {/* <Box p={4}> */}
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Paper elevation={0} className={classes.border}>
              {/* <Box px={5}> */}

              <Grid container direction="row" spacing={4}>
                {/* <Grid item>
              <img src={img} />
            </Grid> */}
                <Grid item>
                  <Typography variant="h2" className={classes.title}>
                    {'Partner Information'}
                  </Typography>
                </Grid>
              </Grid>
              {/* </Box> */}

              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Grid container direction="row">
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
                          {Product.value?.partnerName}
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
                          {'PARTNER MOBILE'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {Product.value?.mobile}
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
                          {Product.value?.partnerType}
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
                          {Product.value?.partnerSubType}
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
                          {'PARTNER EMAIL'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {Product.value?.email}
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
                          {'PARTNER REGISTRATION NUMBER'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {Product.value?.registrationNumber}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">{'LEAD ID'}</Typography>
                        <Typography variant="subtitle1">
                          {Product.value?.id}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem',
                          wordBreak:'break-word'
                        }}
                      >
                        <Typography variant="subtitle2">
                          {'DESCRIPTION'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {ticket?.statusChange
                            ? ticket?.statusChange[0]?.changeReason
                            : '--'}
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
              {/* <Box px={5}> */}

              <Grid container direction="row" spacing={4}>
                {/* <Grid item>
              <img src={img} />
            </Grid> */}
                {/* <Grid item>
                        <Typography variant="h2" className={classes.title}>
                          {'Upload Documentss'}
                        </Typography>
                      </Grid> */}
              </Grid>
              {/* </Box> */}

              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Box>
                      <Typography
                        variant="h3"
                        style={{ marginTop: '10px', marginLeft: '20px' }}
                      >
                        Upload Documents
                      </Typography>
                      <Grid xs container direction="row">
                        {!_isEmpty(productData.UploadDocuments) &&
                          Object.keys(productData.UploadDocuments).map(
                            (itemx) => {
                              return (
                                <Box
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '10px',
                                    margin: '20px'
                                  }}
                                >
                                  {productData.UploadDocuments[itemx]?.map(
                                    (item) => {
                                      return (
                                        <Grid item>
                                          <Grid item>
                                            <Typography
                                              variant="h6"
                                              className={classes.title}
                                            >
                                              {itemx}
                                            </Typography>
                                          </Grid>
                                          <div>
                                            {getfilePreview(
                                              item,
                                              'UploadDocuments'
                                            )}
                                          </div>
                                        </Grid>
                                      );
                                    }
                                  )}
                                </Box>
                              );
                            }
                          )}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
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
              {PdfBlob && PdfBlob?.includes('application/pdf') ? (
                <Document file={PdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
                  {pageNumber.map((item) => {
                    return (
                      <React.Fragment>
                        <Page pageNumber={item} />
                      </React.Fragment>
                    );
                  })}
                  {/* <Page pageNumber={pageNumber} /> */}
                </Document>
              ) : (
                <img
                  src={PdfBlob}
                  alt="image"
                  style={{ height: '200px' }}
                ></img>
              )}
            </>
          )}
        </>
      </Modal>
      {/* <Modal
        open={imageModal}
        onClose={handleImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.imageModal} px={5}>
          <Grid
            container
            direction="column"
            spacing={2}
            className={classes.inner}
            alignItems="center"
          >
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography variant="h2">Document Preview</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleImageModal}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item>
              {previewObj?.name?.split('.').pop() == 'pdf' ? (
                <Document
                  file={{
                    url: `${DPRM_DMS}/${previewObj.name}`,
                    httpHeaders: { Authorization: `Bearer ${getaccessToken()}` }
                  }}
                >
                  <Page pageNumber={1} width={150} scale={1} />
                </Document>
              ) : (
                <img
                  src={authImage}
                  alt="image"
                  style={{ height: '200px' }}
                ></img>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal> */}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  border: {
    border: '1px solid #e2e2e2'
    //  borderRadius:"0px"
  },
  borderSecondary: {
    border: '1px solid #e2e2e2',
    width: '94%',
    marginLeft: '30px'
    //  borderRadius:"0px"
  },
  img: {
    height: '108px'
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
