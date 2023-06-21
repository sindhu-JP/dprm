import React, { useCallback, useState } from "react";
import Dayjs from "dayjs";
import PropTypes from "prop-types";
import { useBoolean, useStateful } from "react-hanger";
import { useDropzone } from "react-dropzone";
import { DateTimePicker } from "@material-ui/pickers";
import _ from "lodash";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Divider, IconButton, InputAdornment } from "@material-ui/core";
import config from "config";
import NavigateNext from '@material-ui/icons/NavigateNext';
import {
  Box,
  Grid,
  Typography,
  Drawer,
  Button,
  TextField,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { SvgIcon } from "lib/components";
import { useUpload } from "lib/components/FileUpload/useUpload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Document, Page } from "react-pdf";
import { attachToken, getaccessToken } from "Http/axios";
import { Trans } from "@lingui/macro";
import { Link } from "react-router-dom";

import constants from "../../../Features/constants/constants";
import DocumentPreview from "../../../Features/LeadCreation/Sections/DocuPreview";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from '@material-ui/core/Backdrop';

import { ReactComponent as Scan } from "Assets/Icons/Scan.svg";

import CircularProgress from '@material-ui/core/CircularProgress';


   const UploadDoc = ({
  name,
  label,
  id,
  onChange,
  file,
  regNo,
  ErrorState,
  attachmentID,
  companyregid
}) => {
  const classes = useStyles();
  const drawerOpen = useBoolean(true);
  const preview = useStateful("");
  const [imgsrc, setimgsrc] = useState("");
  const [fileurl, seturl] = useState("");
  const [loadingOpen, setloadingOpen] = useState(false);
  const upload = useUpload({
    initialState: file && {
      companyRegistrationNumber: file.companyRegistrationNumber || regNo,
      issueDate: file.issueDate,
      expiryDate: file.expiryDate,
      issuePlace: file.issuePlace,
      issuedBy: file.issuedBy,
    },
    name,
    attachmentID,
    companyregid,
    onGetDetails: drawerOpen.toggle,
    onSuccess: onChange,
    setloadingOpen,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: upload.start,
  });

  const loadPreview = async (file) => {
    preview.setValue(file);
  };

  React.useEffect(() => {
    if (upload.fomrdatavalue) {
      loadPreview(_.get(upload.fomrdatavalue?.attachment, "[0].href", ""));
    }
  }, [upload.fomrdatavalue]);

  React.useEffect(() => {
    upload.updateDetails({
      target: {
        name: "companyRegistrationNumber",
        value: regNo,
      },
    });
  }, [regNo]);



  return (
    <Box className={classes.root} p={4}
      style={ErrorState === true ? { border: `1px solid red`, } : { border: `1px solid #e2e2e2` }}


    >
      <Grid container direction="column" spacing={4}>
        <Grid item style={{ minHeight: "70px" }}>
          <Typography align="center" className={classes.title} variant="h6">
            {/* {label} */}
          {name}
          </Typography>
        </Grid>
        <Divider/>
        <Grid item>
          {preview.value ? (
            <Box className={classes.image}>
              <div>
                <DocumentPreview
                  attachment={upload.fomrdatavalue.attachment}
                  documentId={upload.fomrdatavalue.id}
                  path={preview.value}
                />
              </div>
            </Box>
          ) : (
              <Box {...getRootProps()} className={classes.inputWrapper}>
                <input {...getInputProps()} />
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <Scan />
                  </Grid>
                  <Grid item>
                    <Typography display="inline" variant="body2">
                      Drop your files here or
                  </Typography>
                    <Typography
                      display="inline"
                      variant="body2"
                      className={classes.selectText}
                    >
                      Select a File
                  </Typography>
                  </Grid>
                  <Grid item>
                    {ErrorState === true ?
                      <Typography
                        display="inline"
                        variant="body2"
                        style={{ color: "red" }}
                      >
                        Document Required
                  </Typography> : ""}

                  </Grid>
                </Grid>
              </Box>
            )}
          <Box px={1} pt={2}>
            <Grid container justify="flex-end" alignItems="center" spacing={4}>
              <Grid item>
                {/* <input {...getInputProps()} /> */}
                {/* <EditIcon/> */}
                {/* <SvgIcon className={classes.iconSmall} iconName="Edit" /> */}
              </Grid>
              <Grid item>
                {/* <SvgIcon className={classes.iconSmall} iconName="Doc" /> */}
                {/* <DeleteIcon/> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>




      <Backdrop className={classes.backdrop} open={loadingOpen} >
        <CircularProgress color="inherit" />
        <Drawer
          anchor="bottom"
          open={upload.detailsNeeded}
          onClose={upload.cancel}
        >



          <Box className={classes.drawer}>

            {/* <Box className={classes.progress}></Box> */}
            <Box className={classes.details} p={10}>
              <Grid container direction="column" spacing={6}>
                <Grid item>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography variant="h2">
                        {"Contract Details"}
                      </Typography>
                    </Grid>
                    <Grid item onClick={upload.cancel}>
                      <CloseIcon />
                      {/* <SvgIcon iconName="close" className={classes.closeIcon} /> */}
                    </Grid>
                  </Grid>
                </Grid>



                <Grid item>
                  <Grid container spacing={10}>
                    <Grid item xs={3}>
                      <TextField
                        required
                        name="companyRegistrationNumber"
                        onChange={upload.updateDetails}
                        // value={companyregid}
                        // value={upload.details["companyRegistrationNumber"]}
                        value={companyregid ? companyregid : upload.details["companyRegistrationNumber"]}
                        fullWidth
                        label="Contract Id"
                        disabled={companyregid ? true : false}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <KeyboardDatePicker
                        required
                        name="issueDate"
                        disableToolbar
                        disableFuture
                        format="MM/dd/yyyy"
                        label="ISSUE DATE"
                        value={upload.details["issueDate"]}
                        onChange={(e) => {
                          upload.updateDetails({
                            target: {
                              name: "issueDate",
                              value: e,
                            },
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <KeyboardDatePicker
                        required
                        disableToolbar
                        format="MM/dd/yyyy"
                        label="SIGN oF DATE"
                        disablePast
                        value={upload.details["expiryDate"]}
                        onChange={(e) => {
                          upload.updateDetails({
                            target: {
                              name: "expiryDate",
                              value: e,
                            },
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        required
                        name="issuePlace"
                        value={upload.details["issuePlace"]}
                        onChange={upload.updateDetails}
                        fullWidth
                        label="ISSUE PLACE"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      {/* <TextField
                        required
                        name="issuedBy"
                        onChange={upload.updateDetails}
                        value={upload.details["issuedBy"]}
                        fullWidth
                        label="ISSUED BY"
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ alignSelf: "flex-end" }}>
                  <Button
                    // onClick={() => { upload.submitDetails, setloadingOpen(true) }}
                    onClick={() => {
                      upload.submitDetails();
                      setloadingOpen(true);
                    }}
                    className={classes.button}
                    variant="outlined"
                    size="large"
                    color="primary"
                    endIcon={<NavigateNext />}
                  >
                    Done
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Drawer>
      </Backdrop>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(60),
    height: "auto",
    // border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  embedded: {
    display: "block",
    width: "100%",
    height: "100",
  },
  closeIcon: {
    width: theme.spacing(8),
    cursor: "pointer",
    color: theme.palette.text.primary,
  },
  button: {
    backgroundColor: theme.palette.common.white,
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  selectText: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    width: theme.spacing(4),
    color: theme.palette.common.silver,
    "& svg": {
      path: theme.palette.common.silver,
    },
    "& path": {
      path: theme.palette.common.silver,
    },
  },
  image: {
    width: "100%",
    height: "auto",
    overflow: "hidden",
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },
  inputWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#e2e2e2",
    borderStyle: "dashed",
    backgroundColor: "#ffffff",
    color: theme.palette.common.textSecondary,
    outline: "none",
    transition: "border .24s ease-in-out",
    textAlign: "center",
    minHeight: "150px",
    cursor: "pointer",
    "& span": {
      color: theme.palette.primary.main,
      fontSize: "16px",
      fontWeight: theme.typography.fontWeightBold,
    },
  },

  drawer: {
    backgroundColor: theme.palette.background.main,
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(4),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

UploadDoc.defaultProps = {
  title: "Quotation Proof",
};
export default UploadDoc;
