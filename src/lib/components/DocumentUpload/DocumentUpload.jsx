import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  IconButton,
  CircularProgress
} from '@material-ui/core';

import ViewIcon from 'Assets/Icons/view.svg';
import DownloadIcon from 'Assets/Icons/downloads.svg';
import { Modal } from 'antd';

import { Document, Page } from 'react-pdf';
import { contractMangement } from 'Http/axios';

// import { connect, useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2'
  },
  root: {
    width: theme.spacing(65),
    minHeight: '13rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    maxHeight: '25rem'
  },
  image: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden'
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
    width: '250px',
    height: '250px',
    backgroundColor: theme.palette.type === 'dark' ? `#aaaaaa !important` : `${theme.palette.background.paper} !important`, 
    // marginLeft: '20px',
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
  img: {
    width: '180px',
    height: '100px'
  }
}));
const DocumentUpload = ({
  maintitle,
  documentDetails,
  DownloadPreview,
  context
}) => {
  const classes = useStyles();
  const [previewObj, setPreviewObj] = React.useState();
  const [imageModal, setImageModal] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState([]);
  const [numPages, setNumPages] = React.useState(20);
  const [PdfBlob, setPdfBlob] = React.useState(null);
  const [loader, setLoader] = React.useState(false)
  const [authImage, setImage] = React.useState();
  let DOCURL = documentDetails?.contractDocURL;
  let contractPreview = true;

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  const handleImageModal = () => {
    setImageModal(false);
  };
  const imagePreview = (url, item) => {
    setImageModal(true);
  };

  React.useEffect(() => {
    loadPDF();
  }, [documentDetails?.contractDocURL]);

  const loadPDF = (dataURL) => {
    console.log(documentDetails, "docdetails")

    setLoader(true)
    if (documentDetails?.contractDocURL) {
      fetch(
        `${contractMangement}/${'fileuploads'}/${
          documentDetails?.contractDocURL
        }`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            'Content-Type': undefined
          }
        }
      )
        .then((res) => {
          setLoader(false)
          res.blob().then((b) => {
            let src = URL.createObjectURL(b);
            setPdfBlob(src);
            
          });
        })
        .catch((e) => {
          setLoader(false)
        });
    }
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    let array = [];
    for (var i = 1; i <= numPages; i++) {
      array.push(i);
    }
    setPageNumber(array);
  }

  const getAuthorizedImage = async (item) => {
    if (item) {
      return fetch(`${DPRM_DMS}/${item}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${getaccessToken()}`,
          'Content-Type': undefined
        }
      }).then((res) => {
        if (res.ok) {
          res.blob().then((b) => {
            let src = URL.createObjectURL(b);

            setImage(src);
          });
        }
      });
    }
  };

  const TriggerController = (url) => {
    //debugger;
    // getAuthorizedImage(url);

    DownloadPreview({ url: { name: url }, contractPreview });
  };

  return (
    <>
      <Paper elevation={0} style={{marginInline:'10px'}}>
        <Box p={4}>
          <Box mb={4}>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  {maintitle}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Box className={classes.someBox}>
              <Grid container>
                <Grid item container className={classes.content}>
                  <Grid item container className={classes.contentBox1}>
                    <Grid item style={{ alignSelf: 'center' }}>
                      <Typography variant="body2">Digital Services</Typography>
                    </Grid>
                    <Grid item style={{ alignSelf: 'center' }}>
                      {/* {documentDetails?.contractDocURL && (
                        <> {getBlob(documentDetails?.contractDocURL)}</>
                      )} */}

                      {PdfBlob ? (
                        <Document
                          file={PdfBlob}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={1} width={150} scale={1} />
                        </Document>
                      ) : null}
                      {/* {getBlob()} */}
                    </Grid>
                    <Grid item container className={classes.iconSpace}>
                      <Grid item className={classes.iconSpace1}>
                        <Grid item>
                          <IconButton>
                            <img
                              src={ViewIcon}
                              onClick={() => imagePreview()}
                            />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => TriggerController(DOCURL)}>
                            <img src={DownloadIcon} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Paper>
      <Modal
        title="Document Preview"
        centered
        visible={imageModal}
        zIndex={1500}
        footer={null}
        onCancel={handleImageModal}
      >
       {loader ? <CircularProgress /> : <Document file={PdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
          {pageNumber.map((item) => {
            return (
              <React.Fragment>
                <Page pageNumber={item} />
              </React.Fragment>
            );
          })}
          {/* <Page pageNumber={pageNumber} /> */}
        </Document>}
      </Modal>
    </>
  );
};

export default DocumentUpload;
