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
import dayjs from 'dayjs';
import partnerAPi from 'Http/api/Partner';
import partnerFactory from 'Factory/Partner';
import _isEmpty from 'lodash/isEmpty';
import { getaccessToken, contractMangement } from 'Http/axios';

import IconButton from '@material-ui/core/IconButton';
import { Document, Page } from 'react-pdf';
import Documentcontroller from 'Controllers/Documents';
import { Modal } from 'antd';

import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';
import MTNSample from '../../../../public/assets/pdf/Dummy-03.pdf';
import config from 'config';
import { useEffect } from 'react';
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
  formIdentity
}) => {
  const partnerValues = values?.TaskMerger?.filter(
    (item) => item?.PartnerProfileCreation
  );

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
  const classes = useStyles();
  //const [Product, setProduct] = React.useState();
  const Product = useStateful({});
  const [imageLoader, setImageLoader] = React.useState(false);
  const blobPreview = useStateful({});

  const rangelist = ['Range From', 'Range To', 'Range Value'];
  // to get commission
  let mergeObj = { ...productData };

  const getcommissionRules = async (code) => {
    const details = await partnerAPi.getcommissionRules(code);
    commissionDetails.setValue(_.get(details, '[0]'));
    mergeObj = Object.assign({}, mergeObj || productData);
    if (productData['CommissionRuleDetails']) {
      mergeObj['CommissionRuleDetails'] = _.get(details, '[0]', {});
    } else {
      mergeObj['CommissionRulesDetails'] = _.get(details, '[0]', {});
    }

    Product.setValue(mergeObj);
  };

  // to get settlement

  const getSettlementRuleDetails = async (code) => {
    const details = await partnerAPi.SettlementRuleDetails(code);
    settlementDetails.setValue(_.get(details, '[0]'));
    mergeObj = Object.assign({}, mergeObj || productData);
    mergeObj['SettlementRuleDetails'] = _.get(details, '[0]', {});
    Product.setValue(mergeObj);
  };

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

  React.useEffect(() => {
    // settlement
    if (productData) {
      if (productData['SettlementRuleDetails']) {
        getSettlementRuleDetails(
          productData['SettlementRuleDetails'].Settlement_Rule
        );
      }
      if (productData['CommissionRuleDetails']) {
        getcommissionRules(
          productData['CommissionRuleDetails'].Commission_Rule
        );
      } else {
        const isDunningDetailsEmpty = Object.values(productData?.DunningDetails||{}).every(item=>!item)
        if(isDunningDetailsEmpty){
          let newProduct = JSON.parse(JSON.stringify(productData))
          const sections = newProduct.sections.filter(item=>item!=='DunningDetails')
          newProduct = {...productData,sections}
          delete newProduct.DunningDetails
          Product.setValue(newProduct);
        }else{
          Product.setValue(productData);
        }
      }
      // CommissionRulesDetails key name change
      if (productData['CommissionRulesDetails']) {
        getcommissionRules(
          productData['CommissionRulesDetails'].Commission_Rule
        );
      }
      if (preview) {
        // Product.setValue(productData)
      }
    }
  }, [maintitle, productData]);
  React.useEffect(() => {}, [Product]);
  const PdfPreview = (url, item, comptype) => {
    console.log(url, 'filename');
    setPreviewObj(url);
    setImageModal(true);
    if (contractPreview) {
      loadPDF(url, comptype);
    }
    // window.open(url, '_blank');
  };

  const imagePreview = (url, item, comptype) => {
    setPreviewObj(url);
    setImageModal(true);

    if (url.name) {
      getAuthorizedImage(url, comptype);
    }
    // setPreviewObj(item);
  };
  const handleImageModal = () => {
    setImageModal(false);
  };

  const loadPDF = (dataURL, comptype) => {
    let endpoint;
    setImageLoader(true);
    if (contractPreview && comptype !== 'MOU') {
      if (dataURL?.name) {
        endpoint = `${contractMangement}/${'fileuploads'}/${dataURL?.name}`;
      } else {
        endpoint = dataURL?.url;
      }
    } else {
      endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${dataURL?.id}`;
    }

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

  const getfilePreview = (item, title, comptype) => {
    // if (!authImage) {
    //   getAuthorizedImage(item);
    // }

    console.log(title,item, 'titlexxxlll');

    let getFile = '';
    let extention = item?.name?.split('.');
    if (extention) {
      getFile = extention[extention?.length - 1];
    }

    console.log(item, '5656');
    // if (!authImage) {
    //   getAuthorizedImage(item);
    // }
    if (
      getFile === 'pdf' ||
      item?.mimeType?.includes('application/pdf') ||
      item?.url?.includes('.pdf')
    ) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <div>
            <div>
              <Box className={classes.someBox}>
                <Grid container >
                  <Grid item container className={classes.content}>
                    <Grid item container className={classes.contentBox1}>
                      <Grid item style={{ alignSelf: 'center' }}>
                        {formIdentity === 'Add_Contract' || contractPreview ? (
                          <>
                            <Document file={MTNSample}>
                              <Page pageNumber={1} width={150} scale={1} />
                            </Document>
                          </>
                        ) : (
                          <Document
                            file={MTNSample}
                            // onLoadSuccess={onDocumentLoadSuccess}
                          >
                            <Page pageNumber={1} width={150} scale={1} />
                          </Document>
                        )}
                      </Grid>
                      <Grid item container className={classes.iconSpace}>
                        <Grid item className={classes.iconSpace1}>
                          <Grid item>
                            <IconButton
                              onClick={() =>
                                PdfPreview(item, authImage, comptype)
                              }
                            >
                              <img src={ViewIcon} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton
                              onClick={() => TriggerController(item, comptype)}
                            >
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
      item?.mimeType?.includes('image/png') ||item?.mimeType?.includes('image/jpeg')
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
                              onClick={() =>
                                imagePreview(item, authImage, comptype)
                              }
                            >
                              <img src={ViewIcon} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton
                              onClick={() => TriggerController(item, comptype)}
                            >
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
  const getAuthorizedImage = async (item, comptype) => {
    setImageLoader(true);
    let endpoint = '';
    if (contractPreview && comptype !== 'MOU') {
      endpoint = `${contractMangement}/${'fileuploads'}/${item?.name}`;
    } else {
      endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${item.id}`;
    }
    if (item) {
      return fetch(endpoint, {
        method: 'get',

        headers: {
          Authorization: `Bearer ${getaccessToken()}`,

          'Content-Type': undefined
        }
      }).then((res) => {
        if (res.ok) {        
          res.blob().then(async (b) => {
            let src = URL.createObjectURL(b);
            // return src;
            setImage(src);
            const base64 = await blobToBase64(b);
            blobPreview.setValue(base64);
            setImageLoader(false);
          });
        }
      });
    }
  };
  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const FetchProductlist = (data) => {
    console.log(data, "dataxxxx")
    if (
      (title !== 'UploadDocuments' && title !== 'AddAnotherContact') ||
      title === 'ContractDocuments'
    ) {
      let temp = { ...data };
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
        "channelCommission",
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
      return data;
    }
  };

  const TriggerController = (url, comptype) => {
    console.log(comptype, 'comtype');
    DownloadPreview({ url, contractPreview, comptype });
  };
  useEffect(() => {
    if (!_isEmpty(modifyData)) {
      Product.setValue(modifyData);
    }
  }, [modifyData]);

 


  return (
    <div style={{marginTop:'20px'}}>
      <Paper elevation={0} style={{paddingBottom:'0px'}}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              {/* <Grid item>
              <img src={img} />
            </Grid> */}
              <Grid item>
                <Typography variant="h1" className={classes.title}>
                  {maintitle === 'Partner Information'
                    ? _isEmpty(
                        partnerValues[0]?.PartnerProfileCreation?.PartnerDetails
                      )
                      ? ''
                      : maintitle
                    : maintitle}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4} direction="column">
            {Object.keys(Product.value).map((title) => {
              return (
                <>
                  {title === 'sections' ||
                  title === 'stepRefNo' ||
                  title === 'customStep' ||
                  title === 'stepIdentity' ||
                  title === 'status' ||
                  title === 'lastModifiedDate' ||
                  title === 'AddAnotherContact' ||
                  title === 'ContractModificationHistory' ? (
                    ''
                  ) : (
                    <>
                      <Grid item>
                        <Paper
                          elevation={0}
                          className={
                            partnerFactory.getCameltoSpace(title) ===
                            'Partner Details'
                              ? _isEmpty(
                                  partnerValues[0]?.PartnerProfileCreation
                                    ?.PartnerDetails
                                )
                                ? ''
                                : classes.border
                              : classes.border
                          }
                        >
                          {/* <Box px={5}> */}

                          <Grid container direction="row" spacing={4}>
                            {/* <Grid item>
              <img src={img} />
            </Grid> */}
                            <Grid item>
                              <Typography
                                variant="h2"
                                className={classes.title}
                              >
                                {partnerFactory.getCameltoSpace(title) ===
                                'Partner Details'
                                  ? _isEmpty(
                                      partnerValues[0]?.PartnerProfileCreation
                                        ?.PartnerDetails
                                    )
                                    ? ''
                                    : partnerFactory?.getCameltoSpace(title)
                                  : partnerFactory?.getCameltoSpace(title)}
                              </Typography>
                            </Grid>
                          </Grid>
                          {/* </Box> */}

                          <Grid container spacing={4}>
                            {Product.value[title] &&
                              Object.keys(
                                FetchProductlist(Product.value[title])
                              ).map((item) => {
                                console.log(item, "supp")
                                if (item === 'commissionRuleRange') {
                                  return (
                                    <Grid container spacing={12}>
                                      <Grid item xs={12}>
                                        <Grid container direction="row">
                                          {Product.value[title][
                                            'commissionType'
                                          ] === 'Tier' ||
                                          Product.value[title][
                                            'commissionType'
                                          ] === 'Volume' ? (
                                            <>
                                              {rangelist.map((labelName) => {
                                                return (
                                                  <Grid
                                                    item
                                                    xs={4}
                                                    style={{
                                                      padding: '0.5rem'
                                                    }}
                                                  >
                                                    <Typography variant="subtitle2">
                                                      {labelName}
                                                    </Typography>

                                                    {labelName ===
                                                    'Range From' ? (
                                                      <>
                                                        {Product.value[title][
                                                          item
                                                        ]?.map((range) => {
                                                          return (
                                                            <>
                                                              <Typography variant="subtitle1">
                                                                {
                                                                  range.rangeFrom
                                                                }
                                                              </Typography>
                                                            </>
                                                          );
                                                        })}
                                                      </>
                                                    ) : labelName ===
                                                      'Range To' ? (
                                                      <>
                                                        {Product.value[title][
                                                          item
                                                        ]?.map((range) => {
                                                          return (
                                                            <>
                                                              <Typography variant="subtitle1">
                                                                {range.rangeTo}
                                                              </Typography>
                                                            </>
                                                          );
                                                        })}
                                                      </>
                                                    ) : labelName ===
                                                      'Range Value' ? (
                                                      <>
                                                        {Product.value[title][
                                                          item
                                                        ]?.map((range) => {
                                                          return (
                                                            <>
                                                              <Typography variant="subtitle1">
                                                                {
                                                                  range.rangeValue
                                                                }
                                                              </Typography>
                                                            </>
                                                          );
                                                        })}
                                                      </>
                                                    ) : (
                                                      ''
                                                    )}
                                                  </Grid>
                                                );
                                              })}
                                            </>
                                          ) : null}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  );
                                } else {
                                  return (
                                    <Grid
                                      item
                                      xs={title !== 'UploadDocuments' ? 3 : ""}
                                      style={{ wordBreak: 'break-word' }}
                                    >
                                      <Grid container direction="column">
                                        <Grid item>
                                          <Typography
                                            variant="subtitle2"
                                            className={classes.subtitle2Changes}
                                            // style={{
                                            //   textTransform: 'uppercase'
                                            // }}
                                          >
                                            {item ===
                                              'SAME_AS_MASTER_CONTACT_DETAILS' ||
                                            item === 'SAME_AS_MASTER' ||
                                            item === 'LOGIN_TYPE' ||
                                            item === 'href' ||
                                            item === 'Wallet_ID' ||
                                            item === 'Partner_ID' ||
                                            item === 'ROLE' ||
                                            item === 'TENANT_ID' ||
                                            item === 'My_Task' ||
                                            item === 'Contract_Added' ||
                                            item === 'PRODUCT_ID' ||
                                            item === 'Onboarding_Status' ||
                                            item === 'path' ||
                                            item === 'commissionRuleRange' ||
                                            item === '@schemaLocation' ||
                                            item === '@baseType' ? (
                                              <></>
                                            ) : Product.value[title][
                                                'commissionType'
                                              ] === 'Volume' ||
                                              Product.value[title][
                                                'commissionType'
                                              ] === 'Tier' ? (
                                              item === 'commissionValue' ? (
                                                ''
                                              ) : (
                                                partnerFactory.removeUnderScore(
                                                  item
                                                )
                                              )
                                            ) : (
                                              <>
                                                {Product.value?.UploadDocuments
                                                  ? Product.value
                                                      ?.UploadDocuments[item]
                                                      ?.length === 0
                                                    ? ''
                                                    : partnerFactory.removeUnderScore(
                                                        item
                                                      )
                                                      
                                                  : partnerFactory.removeUnderScore(
                                                      item
                                                    )}
                                                    
                                              </>
                                            )}
                                          </Typography>
                                        </Grid>

                                        {title !== 'UploadDocuments' ||
                                        title === 'ContractDocuments' ? (
                                          <Grid item>
                                            <Typography variant="subtitle1">
                                              {
                                                Product.value[title][item] ? (
                                                  item === 'href' ||
                                                  item === 'path' ||
                                                  item === 'Wallet_ID' ||
                                                  item === 'Partner_ID' ||
                                                  item === 'My_Task' ||
                                                  item === 'ROLE' ||
                                                  item === 'TENANT_ID' ||
                                                  item === 'Contract_Added' ||
                                                  item === 'PRODUCT_ID' ||
                                                  item ===
                                                    'Onboarding_Status' ||
                                                  item === '@schemaLocation' ||
                                                  // item==="commissionRuleRange"||
                                                  item === '@baseType' ? (
                                                    <></>
                                                  ) : item ===
                                                    'commissionRuleRange' ? (
                                                    <></>
                                                  ) : item ===
                                                      'AVAILABLE_FROM' ||
                                                    item === 'AVAILABLE_TO' ||
                                                    item === 'START_DATE' ||
                                                    item === 'END_DATE' ||
                                                    item ===
                                                      'CONTRACT_VALIDITY' ||
                                                    item === 'createdDate' ||
                                                    item ===
                                                      'HierarchicalUser' ? (
                                                    <>
                                                      {dayjs(
                                                        Product.value[title][
                                                          item
                                                        ]
                                                      ).format('DD MMM YYYY')}
                                                    </>
                                                  ) : item ===
                                                    'settlementCycle' ? (
                                                    <>
                                                      {Product.value[title][
                                                        item
                                                      ].map((item) => {
                                                        return (
                                                          <>
                                                            {item.from} -{' '}
                                                            {item.to}
                                                          </>
                                                        );
                                                      })}
                                                    </>
                                                  ) : Product.value[title][
                                                      'commissionType'
                                                    ] === 'Volume' ||
                                                    Product.value[title][
                                                      'commissionType'
                                                    ] === 'Tier' ? (
                                                    item ===
                                                    'commissionValue' ? (
                                                      ' '
                                                    ) : (
                                                      Product.value[title][item]
                                                    )
                                                  ) : (
                                                    Product.value[title][item]
                                                  )
                                                ) : Product.value[title][
                                                    'commissionType'
                                                  ] === 'Volume' ||
                                                  Product.value[title][
                                                    'commissionType'
                                                  ] === 'Tier' ? (
                                                  item === 'commissionValue' ? (
                                                    ''
                                                  ) : (
                                                    '-'
                                                  )
                                                ) : (
                                                  '-'
                                                )
                                                // '-'
                                              }
                                            </Typography>
                                          </Grid>
                                        ) : (
                                          <Grid item>
                                            <Grid
                                              xs
                                              container
                                              direction="row"
                                              spacing={5}
                                            >
                                              {Array.isArray(
                                                Product.value[title][item]
                                              ) &&
                                                Product.value[title][item]?.map(
                                                  (itemx) => {
                                                    console.log(
                                                      Product.value[title][item],
                                                      title,
                                                      itemx,
                                                      item,
                                                      'check2323'
                                                    );
                                                    // if (
                                                    //   (formIdentity ===
                                                    //     'Add_Contract' ||
                                                    //     contractPreview) &&
                                                    //   title ===
                                                    //     'UploadDocuments' &&
                                                    //   item.dms?.uid
                                                    // ) {
                                                    //   return (
                                                    //     <Grid item>
                                                    //       <div>
                                                    //         {getfilePreview(
                                                    //           item,
                                                    //           title
                                                    //         )}
                                                    //       </div>
                                                    //     </Grid>
                                                    //   );
                                                    // } else {
                                                    //   return (
                                                    //     <Grid item>
                                                    //       <div>
                                                    //         {getfilePreview(
                                                    //           item,
                                                    //           title
                                                    //         )}
                                                    //       </div>
                                                    //     </Grid>
                                                    //   );
                                                    // }
                                                    return (
                                                      <Grid item>
                                                        <div>
                                                        {getfilePreview(
                                                            itemx,
                                                            title,
                                                            item
                                                          )}
                                                       
                                                        </div>
                                                    
                                            
                                                      </Grid>
                                                    );
                                                  }
                                                )}
                                            </Grid>
                                          </Grid>
                                        )}
                                      </Grid>
                                    </Grid>
                                  );
                                }
                              })}
                          </Grid>
                        </Paper>
                      </Grid>
                    </>
                  )}
                </>
              );
            })}
          </Grid>
        </Box>
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
          {formIdentity === 'Add_Contract' || contractPreview ? (
            <>
              {imageLoader ? (
                <CircularProgress />
              ) : (
                <>
                  {PdfBlob && previewObj?.name.includes('.pdf') ? (
                    <Document
                      file={PdfBlob}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      {pageNumber.map((item) => {
                        return (
                          <React.Fragment>
                            <Page pageNumber={item} />
                          </React.Fragment>
                        );
                      })}
                      {/* <Page pageNumber={pageNumber} /> */}
                    </Document>
                  ) : imageLoader ? ( <CircularProgress />) :  !_.isEmpty(blobPreview.value  && blobPreview?.value) ? (                   
                    <img
                      src={blobPreview.value && blobPreview?.value}
                      alt=" contract image"
                      style={{ width: '80%' }}
                    ></img>
                    ):( 'loading....')}
                </>
              )}
            </>
          ) : (
            <>
              {imageLoader ? (
                <CircularProgress />
              ) : (
                <>
                  {previewObj?.name?.split('.').pop() === 'pdf' ||
                  (previewObj &&
                    previewObj?.mimeType.includes('application/pdf')) ? (
                    <Document
                      file={PdfBlob}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      {pageNumber.map((item) => {
                        return (
                          <React.Fragment>
                            <Page pageNumber={item} />
                          </React.Fragment>
                        );
                      })}
                    </Document>
                 ) : !_.isEmpty(blobPreview.value  && blobPreview?.value) ? (                   
                    <img
                      src={  imageLoader ? ( <CircularProgress />) : (blobPreview.value && blobPreview?.value)}
                      alt=" contract image"
                      style={{ width: '80%' }}
                    ></img>
                  ): 'loading...' }
                </>
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
    </div>
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
  },
  subtitle2Changes: {
    textTransform: 'uppercase',
    '&.MuiTypography-subtitle2': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.primary.black} !important`
          : `#777777 !important`
    }
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
