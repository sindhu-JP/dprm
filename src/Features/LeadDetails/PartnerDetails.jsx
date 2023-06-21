import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { useStateful } from 'react-hanger';

import { getaccessToken } from 'Http/axios';

import _ from 'lodash';
import { connect, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Document, Page } from 'react-pdf';
import partnerAPi from 'Http/api/Partner';
import partnerFactory from 'Factory/Partner';
import IconButton from '@material-ui/core/IconButton';
import Documentcontroller from 'Controllers/Documents';
import { Modal } from 'antd';

import EditIcon from '@material-ui/icons/Edit';
import './PartnerDetails.scss';

import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';
import produce from 'immer';
// import MTNSample from 'Assets/pdf/Dummy-03.pdf';
import MTNSample from '../../../public/assets/pdf/Dummy-03.pdf';
import statuses from 'lib/constants/statuses';
import config from 'config';
import Modals from 'Store/Modals';
const PartnerDetails = ({
  values,
  title,
  partnerDetails,
  partnerFulldetails,
  Edit,
  DownloadPreview,
  agentData, 
  status = 'Pending'
}) => {

  console.log(partnerDetails, "pdetails", title)
  const rangelist = ['Range From', 'Range To', 'Range Type', 'Range Value'];
  const settlementDetails = useStateful({});
  const [imageModal, setImageModal] = React.useState(false);
  const [previewObj, setPreviewObj] = React.useState();
  const dispatch = useDispatch();
  const Partner = useStateful({});
  const [authImage, setImage] = React.useState();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const onClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const onClose = (event, action, data, fullDetails) => {
    // event.stopPropagation();blobPreview
    setAnchorEl(null);
    // action==="CompanyAddress"? _.omit(fullDetails, [action, "UploadDocuments"]): _.omit(fullDetails, [action]),
    if (action) {
      dispatch(
        Modals.open({
          id: 'OtpVerification',
          context: {
            id: action,
            details: produce(data, (draft) => {
              delete draft.COUNTRY;
            }),
            partnerDetails:
              action === 'CompanyAddress'
                ? _.omit(fullDetails, [action, 'UploadDocuments'])
                : _.omit(fullDetails, [action]),
            partnerFulldetails: partnerFulldetails
          }
        })
      );
    }
    // onAction(action);
  };
  const getSettlementRuleDetails = async (code) => {
    const details = await partnerAPi.SettlementRuleDetails(code);
    settlementDetails.setValue(_.get(details, '[0]'));
    let mergeObj = Object.assign({}, partnerDetails);
    mergeObj['SettlementRuleDetails'] = _.get(details, '[0]', {});
    Partner.setValue(mergeObj);
  };
  const getcommissionRules = async (code) => {
    const details = await partnerAPi.getcommissionRules(code);
    settlementDetails.setValue(_.get(details, '[0]'));
    let mergeObj = Object.assign({}, partnerDetails);
    if (title === 'CommissionRulesDetails') {
      mergeObj['CommissionRulesDetails'] = _.get(details, '[0]', {});
    } else {
      mergeObj['CommissionRuleDetails'] = _.get(details, '[0]', {});
    }

    Partner.setValue(mergeObj);
  };

  React.useEffect(() => {
    if (partnerDetails && title === 'SettlementRuleDetails') {
      Object.keys(partnerDetails[title]).map((item) => {
        getSettlementRuleDetails(partnerDetails[title][item]);
      });
    }

    if (partnerDetails && title === 'CommissionRulesDetails') {
      Object.keys(partnerDetails[title]).map((item) => {
        getcommissionRules(partnerDetails[title][item]);
      });
    } else {
      Partner.setValue(partnerDetails);
    }
    if (partnerDetails && title === 'CommissionRuleDetails') {
      Object.keys(partnerDetails[title]).map((item) => {
        getcommissionRules(partnerDetails[title][item]);
      });
    }
  }, [title, partnerDetails]);

  const PdfPreview = (url, item) => {
    setPreviewObj(url);
    setImageModal(true);
    getAuthorizedImage(url);
  };

  const imagePreview = (url, item) => {
    setPreviewObj(url);
    setImageModal(true);
    getAuthorizedImage(url);
    // setPreviewObj(item);
  };
  const handleImageModal = () => {
    setImageModal(false);
  };
  const [numPages, setNumPages] = React.useState(20);
  const [pageNumber, setPageNumber] = React.useState([]);
  const blobPreview = useStateful({});
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    let array = [];
    for (var i = 1; i <= numPages; i++) {
      array.push(i);
    }
    setPageNumber(array);
  }

  const getfilePreview = (item, index) => {
    let extention = item?.name?.split('.');

    let getFile = extention && extention[extention?.length - 1];

    if (item?.mimeType?.includes('application/pdf')) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <div>
            <div>
              <Box className={classes.someBox}>
                <Grid container style={{ padding: '20px' }}>
                  {/* <Grid item container className={classes.header}>
                    <Grid item style={{ width: '35px' }}>
                      <img
                        src={DocExpiring}
                        alt="wallet details"
                        className={classes.headerImg}
                      />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.headerText} variant="h6">
                        Documents Uploaded
                      </Typography>
                    </Grid>
                  </Grid> */}
                  <Grid item container className={classes.content}>
                    <Grid item container className={classes.contentBox1}>
                      {/* <Grid item style={{ alignSelf: 'center' }}>
                        <Typography variant="body2" className={classes.add}>
                          Address proof
                        </Typography>
                      </Grid> */}
                      <Grid item style={{ alignSelf: 'center' }}>
                        {/* <Document
                          file={{
                            url: `${DPRM_DMS}/${item.name}`,
                            httpHeaders: {
                              Authorization: `Bearer ${getaccessToken()}`
                            }
                          }}
                          // onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={1} width={150} scale={1} />
                        </Document> */}
                        <Document file={MTNSample}>
                          <Page pageNumber={1} width={150} scale={1} />
                        </Document>
                      </Grid>
                      <Grid item container className={classes.iconSpace}>
                        <Grid item className={classes.iconSpace1}>
                          <Grid item>
                            <IconButton
                              onClick={() => PdfPreview(item, authImage)}
                            >
                              <img src={ViewIcon} />
                               {/*<VisibilityIcon
                                fontSize="small"
                                onClick={() => imagePreview(item, authImage)}
                               />*/} 
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
      item?.mimeType?.includes('image/png') ||
      item?.mimeType?.includes('image/jpeg')
    ) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <div>
            <div>
              <Box className={classes.someBox}>
                <Grid container style={{ padding: '20px' }}>
                  <Grid item container className={classes.content}>
                    <Grid item container className={classes.contentBox1}>
                      <Grid
                        item
                        style={{
                          alignSelf: 'center'
                        }}
                      >
                        {item?.url && (
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
                              {/* <VisibilityIcon
                                fontSize="small"
                                onClick={() => imagePreview(item, authImage)}
                              /> */}
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
    }
  };

  const getAuthorizedImage = async (item) => {
    blobPreview.setValue({});
    if (item) {
      return fetch(
        `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${item.id}`,
        {
          method: 'get',

          headers: {
            Authorization: `Bearer ${getaccessToken()}`,

            'Content-Type': undefined
          }
        }
      ).then((res) => {
        if (res.ok) {
          res.blob().then(async (b) => {
            let src = URL.createObjectURL(b);
            //  if(item.mimeType==='image/png'){

            //   blobPreview.setValue(src);
            //  }else{
            const base64 = await blobToBase64(b);
            blobPreview.setValue(base64);
            //  }
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

  const FetchParnterlist = (data) => {
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
        'status',
        'SAME_AS_MASTER_CONTACT_DETAILS',
        'SAME_AS_MASTER',
        'DTT_Category_Id',
        'DTT_Category_Name',
        'DTT_Group_Id',
        'DTT_Group_Name',
        'CONTRACT_RENEWAL_COUNT',
        'PARTNER_NAME',
        'CONTRACT_MODIFY_COUNT',
        'Partner_Suspension_Request'
      ]);
    } else {
      return data;
    }
  };

  const TriggerController = (url) => {
    DownloadPreview({ url, contractPreview: false });
  };

  const handleEdit = (e, action, data, fullDetails, partnerFulldetails) => {
    if (action) {
      dispatch(
        Modals.open({
          id: 'OtpVerification',
          context: {
            id: action,
            details: produce(data, (draft) => {
              delete draft.COUNTRY;
            }),
            partnerDetails:
              action === 'CompanyAddress'
                ? _.omit(fullDetails, [action, 'UploadDocuments'])
                : _.omit(fullDetails, [action]),
            partnerFulldetails: partnerFulldetails
          }
        })
      );
    }
  };

  const checkDoctype = (item) => {
    if (item === 'FINANCIAL_DOCUMENTS') {
      if (Partner?.value?.UploadDocuments?.FINANCIAL_DOCUMENTS?.length > 0) {
        return item;
      } else {
        return null;
      }
    } else if (item === 'COMPANY_REGISTRATION') {
      if (Partner?.value?.UploadDocuments?.COMPANY_REGISTRATION?.length > 0) {
        return item;
      } else {
        return null;
      }
    }  else if (item === 'TIN/TAX_DOCUMENT') {
    //  console.log(item, 'tt');
      if (Partner?.value?.UploadDocuments['TIN/TAX_DOCUMENT']?.length > 0) {
        return item;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  return (
    <>
      {title === 'AddAnotherContact' ? (
        <></>
      ) : (
        <Paper elevation={0}>
          <Box p={4}>
            <Box mb={4}>
              <Grid
                container
                direction="row"
                spacing={4}
                justifyContent="space-between"
              >
                {/* <Grid item>
              <img src={img} />
            </Grid> */}
                <Grid item>
                  <Typography variant="h1" className={classes.title}>
                    {partnerFactory.getCameltoSpace(title)}
                  </Typography>
                </Grid>
                {statuses.EditActions[config.appTheme][title] ? (
                  <>
                    {Edit && status === 'ACTIVE' ? (
                      <>
                        <Grid item>
                          <Tooltip title="Edit" placeholder="bottom">
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(e) =>
                                handleEdit(
                                  e,
                                  title,
                                  Partner.value[title],
                                  Partner.value,
                                  partnerFulldetails
                                )
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          {/* <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={onClose}
                          >
                              <MenuItem
                                onClick={(e) =>
                                  onClose(
                                    e,
                                    title,
                                    Partner.value[title],
                                    Partner.value,
                                    partnerFulldetails
                                  )
                                }
                              >
                                {'Edit'}
                              </MenuItem>
                          </Menu> */}
                        </Grid>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </Box>

            <Grid container spacing={4}>
              {title &&
                Partner.value &&
                Partner.value[title] &&
                Object.keys(FetchParnterlist(Partner.value[title])).map(
                  (item) => {
                  //  console.log(Partner.value, 'lololo');
                    if (item === 'commissionRuleRange') {
                      if (
                        Partner.value[title]['commissionType'] === 'Volume' ||
                        Partner.value[title]['commissionType'] === 'Tier'
                      ) {
                        return (
                          <Grid container spacing={12}>
                            <Grid item xs={12}>
                              <Grid container direction="row">
                                {rangelist.map((labelName) => {
                                  return (
                                    <Grid
                                      item
                                      xs={3}
                                      style={{ padding: '0.5rem' }}
                                    >
                                      <Typography variant="subtitle2">
                                        {labelName}
                                      </Typography>

                                      {labelName === 'Range From' ? (
                                        <>
                                          {Partner.value[title][item]?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeFrom}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : labelName === 'Range To' ? (
                                        <>
                                          {Partner.value[title][item]?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeTo}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : labelName === 'Range Value' ? (
                                        <>
                                          {Partner.value[title][item]?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeValue}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : labelName === 'Range Type' ? (
                                        <>
                                          {Partner.value[title][item]?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeType}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : (
                                        ''
                                      )}
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return (
                        <Grid item xs={4}>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography
                                variant="subtitle2"
                                // style={{ textTransform: 'uppercase' }}
                                className={classes.subtitle2Changes}
                              >
                                {Partner.value[title]['commissionType'] ===
                                  'Volume' ||
                                Partner.value[title]['commissionType'] ===
                                  'Tier'
                                  ? item === 'commissionValue'
                                    ? ''
                                    : partnerFactory.removeUnderScore(item)
                                  : item === 'COMPANY_REGISTRATION' ||
                                    item === 'FINANCIAL_DOCUMENTS' ||
                                    item === 'TIN/TAX_DOCUMENT' ||
                                    item === 'TIN/TAX_RELATED_DOCUMENT'
                                  ? checkDoctype(item)
                                  : partnerFactory.removeUnderScore(item)}
                              </Typography>
                            </Grid>

                            {(title !== 'UploadDocuments' &&
                              title !== 'AddAnotherContact') ||
                            title === 'ContractDocuments' ? (
                              <>
                                <Grid item>
                                  {item !== 'commissionRuleRange' ? (
                                    <Typography variant="subtitle1">
                                      {Partner.value[title][item] ? (
                                        Partner.value[title][item] ===
                                        'HierarchicalUser' ? (
                                          <></>
                                        ) : item === 'settlementCycle' ? (
                                          <>
                                            {Partner.value[title][item].map(
                                              (item) => {
                                                return (
                                                  <>
                                                    {item.from} - {item.to}
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        ) : item === 'CONTACT_MEDIUM' ? (
                                          <>
                                            {Partner.value[title][
                                              item
                                            ].toString()}
                                          </>
                                        ) : item === 'AVAILABLE_FROM' ||
                                          item === 'AVAILABLE_TO' ||
                                          item === 'START_DATE' ||
                                          item === 'END_DATE' ||
                                          item === 'CONTRACT_VALIDITY' ||
                                          item === 'createdDate' ? (
                                          <>
                                            {dayjs(
                                              Partner.value[title][item]
                                            ).format('DD MMM YYYY')}
                                          </>
                                        ) : Partner.value[title][
                                            'commissionType'
                                          ] === 'Volume' ||
                                          Partner.value[title][
                                            'commissionType'
                                          ] === 'Tier' ? (
                                          item === 'commissionValue' ? (
                                            ' '
                                          ) : (
                                            Partner.value[title][item]
                                          )
                                        ) : (
                                          Partner.value[title][item]
                                        )
                                      ) : Partner.value[title][
                                          'commissionType'
                                        ] === 'Volume' ||
                                        Partner.value[title][
                                          'commissionType'
                                        ] === 'Tier' ? (
                                        item === 'commissionValue' ? (
                                          ''
                                        ) : (
                                          '-'
                                        )
                                      ) : (
                                        '-'
                                      )}
                                    </Typography>
                                  ) : item === 'commissionRuleRange' ? (
                                    <></>
                                  ) : (
                                    ''
                                  )}
                                </Grid>
                              </>
                            ) : title === 'UploadDocuments' ||
                              title === 'ContractDocuments' ? (
                              <>
                                <Grid item xs>
                                  <Grid container direction="row" spacing={3}>
                                    {Partner?.value[title][item].length > 0 &&
                                      Partner?.value[title][item]?.map(
                                        (itemx, index) => {                                        
                                          return (
                                            <Grid item xs>
                                              {/* <div> */}
                                              {getfilePreview(itemx, index)}
                                              {/* </div> */}
                                            </Grid>
                                          );
                                        }
                                      )}
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              ''
                            )}
                          </Grid>
                        </Grid>
                      );
                    }
                  }
                )}
            </Grid>
          </Box>
        </Paper>
      )}

      <Modal
        title="Document Preview"
        centered
        visible={imageModal}
        // style={{ zIndex: 2000 }}
        footer={null}
        // width={800}
        onCancel={handleImageModal}
      >
        {!_.isEmpty(blobPreview.value) &&
        previewObj &&
        previewObj?.mimeType?.includes('application/pdf') ? (
          <Document
            file={blobPreview.value && blobPreview?.value}
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
        ) : !_.isEmpty(blobPreview.value) ? (
          <img
            src={blobPreview.value}
            alt="image"
            style={{ width: '80%' }}
          ></img>
        ) : (
          'loading....'
        )}
      </Modal>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  img: {
    height: '75px'
  },
  root: {
    width: theme.spacing(75),
    display: 'flex',
    minHeight: '10rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    maxHeight: '20rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 'auto',
    overflow: 'hidden',
    display: 'flex'
  },

  img: {
    width: '180px',
    height: '75px'
  },

  pdfIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 40
    }
  },
  btnClr: {
    // filter: 'green !important',
    // '.MuiIconButton-root':{
    //   filter:"green"
    // }
    // filter: invert(1)
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
    width: '210px',
    height: '200px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? `#aaaaaa !important`
        : `${theme.palette.background.paper} !important`,
    marginLeft: '20px',
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
)(PartnerDetails);
