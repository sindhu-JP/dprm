import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import Partner from 'Http/api/Partner';
import { useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';
import IconButton from '@material-ui/core/IconButton';
import { Modal } from 'antd';
import moment from 'moment';
import { useStateful } from 'react-hanger';
import { downloadBackOffice } from '../../../../Http/api/documents';
import { downloadFile } from '../../../../Hooks/FormSubmitHook';
import config from 'config';

const ManualDetails = ({details}) => {

    console.log(details.columns?.id, "details")
    const [manualDetails, setManualDetails] = useState({})
    const [loader, setLoader] = useState(false)
    const [authImage, setImage] = React.useState();
    const [imageModal, setImageModal] = React.useState(false);
    const [previewObj, setPreviewObj] = React.useState('');
    const [PdfBlob, setPdfBlob] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState([]);
    
    const [numPages, setNumPages] = React.useState(20);
    const Product = useStateful({});
  const blobPreview = useStateful({});
    const [imageLoader, setImageLoader] = React.useState(false);
  const classes = useStyles();
  //const [Product, setProduct] = React.useState();

  // console.log(productData?.partnerName, 'proddduuuct');
  // console.log(values,'valkkkkkk')
  const download = (fileType) => {
    // const { downloadFile } = FormSubmitHook();

    downloadBackOffice(fileType)
      .then((response) => {
        downloadFile(response, fileType, 'csv');
      })
  }

  const loadPDF = async (dataURL) => {
    setImageLoader(true);

 
   
    let  endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${dataURL?.id}`;
    
 
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
          console.log(src, "eweeee")
          setPdfBlob(src);
          setImageLoader(false);
        });
      })
      .catch((e) => {});
  };

  

  const loadImage = async (dataURL) => {
    setImageLoader(true);

 
   
    let  endpoint = `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${dataURL?.id}`;
    
 
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
          console.log(src, "eweeee")
         blobPreview.setValue(src)
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

  const TriggerController = (url) => {
    download(url.fileName);
  };

const getManaualCommision = async()=> {
    try {
        setLoader(true)
        const data = await Partner.getManaualCommision(details?.columns?.id)
        console.log("manual details", data[0])
        setLoader(false)
        setManualDetails(data[0])
    }
    catch(error) {
         console.log(error)
    }
}

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
      item?.mimeType?.includes('image/png') ||
      item?.mimeType?.includes('image/webp')
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


useEffect(()=> {
    getManaualCommision()
}, [])
  return (
    <>
     {loader ? <div style={{display: "flex", justifyContent: "center"}}><CircularProgress  /> </div> : <Paper elevation={0}>
        <Box p={4}>
          <Grid container spacing={4} direction="column">
            <>
              <></>
              <>
                <Grid item>
                  <Paper elevation={0} className={classes.border}>
                    <Grid container direction="row" spacing={4}>
                      <Grid item style={{margin: "20px"}}>
                        <Typography variant="h2" className={classes.title}>
                          {'Manual Commissioning Details'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Paper style={{margin: "20px"}}>
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
                        <Typography variant="subtitle2">
                          {'FROM DATE'}
                        </Typography>
                        <Typography variant="subtitle1">{moment(manualDetails?.fromDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">{'TO DATE'}</Typography>
                        <Typography variant="subtitle1">{moment(manualDetails?.toDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                    </Grid>
                    </Paper>
                    <Paper style={{margin: "20px"}}>
                    <Grid container direction="row" spacing={4}>
                      <Grid item style={{ fontSize: '16px' }}>
                        <Typography variant="H4" className={classes.title}>
                          {'Event Details'}
                        </Typography>
                      </Grid>
                    </Grid>
                    {
                        manualDetails?.eventDetails?.map((item)=> (
                            <Grid container spacing={4}>
                            <Grid container spacing={12}>
                              <Grid item xs={12}>
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
                                      {item?.eventName}
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
                                      {item?.unitsUtilized}
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
                                      {item?.unitPrice}{' '}
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
                                      {item?.totalCommission}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
      
                        ))
                    }
                    </Paper>
              
                 <Paper style={{margin: "20px"}}>
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
                                {manualDetails?.comments}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                 </Paper>
                 { manualDetails?.attachment?.length > 0 &&  <Paper style={{margin: "20px"}}>
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
                              {manualDetails?.attachment?.map((el)=> (
                                <Grid xs container direction="row" spacing={5}>

                                 <div>{getfilePreview(el)}</div>
      
                                 </Grid>
                              ))}
                        
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>}
                 <>
                <>
                
                 
            
            
              </>
            </>
                  </Paper>
                </Grid>
              </>
              <></>
            </>
          </Grid>
        </Box>
      </Paper>}
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
            (previewObj && previewObj?.mimeType.includes('application/pdf')) ? (
              <Document
                file={PdfBlob }
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

export default ManualDetails;
