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
import config from 'config';
import IconButton from '@material-ui/core/IconButton';
import { Modal } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';
import moment from 'moment';
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
  console.log(productData, values, 'productDataproductData');

  //const [Product, setProduct] = React.useState();
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
  // console.log(productData?.partnerName, 'proddduuuct');
  // console.log(values,'valkkkkkk')
  return (
    <>
      <Paper elevation={0}>
        {/* <Box p={4}> */}
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Paper elevation={0} className={classes.border}>
              <Grid container direction="row" spacing={4}>
                <Grid item>
                  <Typography variant="h2" className={classes.title}>
                    {'Agent Details'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Grid container direction="row">
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.Agent_ID && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'AGENT ID'}
                          </Typography>
                          <Typography variant="subtitle2">
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.Agent_ID
                            }
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.FIRST_NAME && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">{'NAME'}</Typography>
                          <Typography variant="subtitle2">
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.FIRST_NAME
                            }
                            {'  '}
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.LAST_NAME
                            }
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.EMAIL && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">{'EMAIL'}</Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.EMAIL
                            }
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.AGENT_MOBILE_NUMBER && (
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
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.AGENT_MOBILE_NUMBER
                            }
                            {/* {productData?.partnerPrimaryContactMobile} */}
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.NATIONALITY && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'NATIONALITY'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.NATIONALITY
                            }
                            {/* {productData?.requestedDate} */}
                          </Typography>
                        </Grid>
                      )}
                      {/* <Grid
                              item
                              xs={4}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'NIID/PASSPORT/REFUGEE_ID_NUMBER'}
                              </Typography>
                              <Typography variant="subtitle1">
                              {productData?.ResellerProfileCreation?.AgentDetails?.NIID}
                              </Typography>
                            </Grid>                            */}
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.AGENT_SUB_TYPE && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'AGENT SUB TYPE'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.AGENT_SUB_TYPE
                            }
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.AgentDetails
                        ?.AGENT_TYPE && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'AGENT TYPE'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation?.AgentDetails
                                ?.AGENT_TYPE
                            }
                          </Typography>
                        </Grid>
                      )}
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
                    {'Address Information'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Grid container direction="row">
                      {productData?.ResellerProfileCreation?.AddressInformation
                        ?.ADDRESS_LINE_1 && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'ADDRESS LINE 1'}
                          </Typography>
                          <Typography variant="subtitle2">
                            {
                              productData?.ResellerProfileCreation
                                ?.AddressInformation?.ADDRESS_LINE_1
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.AddressInformation
                        ?.CITY && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">{'CITY'}</Typography>
                          <Typography variant="subtitle2">
                            {
                              productData?.ResellerProfileCreation
                                ?.AddressInformation?.CITY
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.AddressInformation
                        ?.COUNTRY && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'COUNTRY'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.AddressInformation?.COUNTRY
                            }
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.AddressInformation
                        ?.PROVINCE && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'PROVINCE'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.AddressInformation?.PROVINCE
                            }
                            {/* {productData?.partnerPrimaryContactMobile} */}
                          </Typography>
                        </Grid>
                      )}
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
                    {'Billling Details'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Grid container direction="row">
                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BANK_ACCOUNT_NUMBER && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BANK ACCOUNT NUMBER'}
                          </Typography>
                          <Typography variant="subtitle2">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BANK_ACCOUNT_NUMBER
                            }
                            {/* {productData?.partnerName} */}
                          </Typography>
                        </Grid>
                      )}
                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BANK_NAME && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BANK NAME'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BANK_NAME
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BANK_OWNER_NAME && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BANK OWNER NAME'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BANK_OWNER_NAME
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BILLING_CURRENCY && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BILLING CURRENCY'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BILLING_CURRENCY
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BILLING_NAME && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BILLING NAME'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BILLING_NAME
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BILLING_PREFERRED_LANGUAGE && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BILLING PREFERRED LANGUAGE'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BILLING_PREFERRED_LANGUAGE
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BILLING_REGION && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BILLING REGION'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BILLING_REGION
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.BRANCH_NAME && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'BRANCH NAME'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.BRANCH_NAME
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.Billing_Region && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'Billing Region'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.Billing_Region
                            }
                          </Typography>
                        </Grid>
                      )}

                      {productData?.ResellerProfileCreation?.BillingDetails
                        ?.PERIODICITY && (
                        <Grid
                          item
                          xs={4}
                          style={{
                            padding: '0.5rem'
                          }}
                        >
                          <Typography variant="subtitle2">
                            {'PERIODICITY'}
                          </Typography>
                          <Typography variant="subtitle1">
                            {
                              productData?.ResellerProfileCreation
                                ?.BillingDetails?.PERIODICITY
                            }
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <>
            {!_isEmpty(
              productData?.ResellerProfileCreation?.AnotherContactInformation
                ?.NAME ||
                productData?.ResellerProfileCreation?.AnotherContactInformation
                  ?.EMAIL_ADDRESS ||
                productData?.ResellerProfileCreation?.AnotherContactInformation
                  ?.MOBILE_NUMBER
            ) && (
              <Grid item>
                <Paper elevation={0} className={classes.border}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item>
                      <Typography variant="h2" className={classes.title}>
                        {'Another Contact Information'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid container spacing={12}>
                      <Grid item xs={12}>
                        <Grid container direction="row">
                          {productData?.ResellerProfileCreation
                            ?.AnotherContactInformation?.NAME ? (
                            <Grid
                              item
                              xs={4}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'NAME'}
                              </Typography>

                              <Typography variant="subtitle2">
                                {
                                  productData?.ResellerProfileCreation
                                    ?.AnotherContactInformation?.NAME
                                }
                              </Typography>
                            </Grid>
                          ) : (
                            ''
                          )}

                          {productData?.ResellerProfileCreation
                            ?.AnotherContactInformation?.EMAIL_ADDRESS ? (
                            <Grid
                              item
                              xs={4}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'EMAIL ADDRESS'}
                              </Typography>
                              <Typography variant="subtitle2">
                                {
                                  productData?.ResellerProfileCreation
                                    ?.AnotherContactInformation?.EMAIL_ADDRESS
                                }
                              </Typography>
                            </Grid>
                          ) : (
                            ''
                          )}

                          {productData?.ResellerProfileCreation
                            ?.AnotherContactInformation?.MOBILE_NUMBER ? (
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
                                {
                                  productData?.ResellerProfileCreation
                                    ?.AnotherContactInformation?.MOBILE_NUMBER
                                }
                              </Typography>
                            </Grid>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </>
          <>
            {!_isEmpty(
              productData?.ResellerProfileCreation?.OptionalDetails
                ?.DATE_OF_BIRTH ||
                productData?.ResellerProfileCreation?.OptionalDetails?.GENDER
            ) && (
              <Grid item>
                <Paper elevation={0} className={classes.border}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item>
                      <Typography variant="h2" className={classes.title}>
                        {'Optional Details'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid container spacing={12}>
                      <Grid item xs={12}>
                        <Grid container direction="row">
                          {productData?.ResellerProfileCreation?.OptionalDetails
                            ?.DATE_OF_BIRTH && (
                            <Grid
                              item
                              xs={4}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'DATE OF BIRTH'}
                              </Typography>
                              <Typography variant="subtitle2">
                                {moment(
                                  productData?.ResellerProfileCreation
                                    ?.OptionalDetails?.DATE_OF_BIRTH
                                ).format('YYYY-MM-DD')}
                              </Typography>
                            </Grid>
                          )}
                          {productData?.ResellerProfileCreation?.OptionalDetails
                            ?.GENDER && (
                            <Grid
                              item
                              xs={4}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="subtitle2">
                                {'GENDER'}
                              </Typography>
                              <Typography variant="subtitle1">
                                {(productData?.ResellerProfileCreation
                                  ?.OptionalDetails?.GENDER === 'F' &&
                                  'FEMALE') ||
                                  (productData?.ResellerProfileCreation
                                    ?.OptionalDetails?.GENDER === 'M' &&
                                    'MALE') ||
                                  (productData?.ResellerProfileCreation
                                    ?.OptionalDetails?.GENDER === 'O' &&
                                    'OTHERS') ||
                                  (productData?.ResellerProfileCreation
                                    ?.OptionalDetails?.GENDER === 'T' &&
                                    'TRANSCENDER')}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </>

          <Grid item>
            <Paper elevation={0} className={classes.border}>
              {/* <Box px={5}> */}

              <Grid container direction="row" spacing={4}>
                {/* <Grid item>
              <img src={img} />
            </Grid> */}
                {/* <Grid item>
                        <Typography variant="h2" className={classes.title}>
                          {'Upload Documents'}
                        </Typography>
                      </Grid> */}
              </Grid>
              {/* </Box> */}

              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Box container>
                      <Typography
                        variant="h3"
                        style={{ marginTop: '10px', marginLeft: '10px' }}
                      >
                        Upload Documents
                      </Typography>
                      <Grid xs container direction="row" spacing={5}>
                        {!_isEmpty(
                          productData?.ResellerProfileCreation?.UploadDocuments
                        ) &&
                          Object.keys(
                            productData?.ResellerProfileCreation
                              ?.UploadDocuments
                          ).map((itemx) => {
                            return (
                              <Box
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  rowGap: '10px',
                                  margin: '20px'
                                }}
                              >
                                {productData?.ResellerProfileCreation?.UploadDocuments[
                                  itemx
                                ]?.map((item) => {
                                  //  console.log(item,itemx, "otttttxx")
                                  return (
                                    <Box>
                                      <Box>
                                        <Typography
                                          variant="h6"
                                          className={classes.title}
                                        >
                                          {itemx}
                                        </Typography>
                                      </Box>
                                      <div>
                                        {getfilePreview(
                                          item,
                                          'UploadDocuments'
                                        )}
                                      </div>
                                    </Box>
                                  );
                                })}
                              </Box>
                            );
                          })}
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
              ) : !_.isEmpty(blobPreview.value) ? (
                <img
                  src={PdfBlob}
                  alt="image"
                  style={{ height: '200px' }}
                ></img>
              ) : (
                'loadling....'
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
    fontWeight: theme.typography.fontWeightBold,
    color: '#777777'
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
