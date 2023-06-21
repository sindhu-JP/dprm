import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Typography, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import { UploadDoc } from 'lib/components';
import { Controller, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useStateful } from 'react-hanger';
import { SvgIcon } from 'lib/components';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import LeadUtils from 'lib/utils/lead';
import UIDUtil from 'lib/utils/uid';
import Attachpreview from '../../LeadDetails/Attachpreview';
import { Documenturl } from 'Http/axios';

const UploadDocments = ({
  values,
  companyRegistrationNumber,
  data,
  attachment
}) => {
  const masterdata = useSelector((state) => state.master.data);
  const classes = useStyles();
  const [files, setfiles] = React.useState([]);
  const documentName = useStateful({});
  const FileUploadUid = useStateful([]);
  const oldAttachments = useStateful([]);
  const [ErrorState, setErrorState] = React.useState(true);
  // const ErrorState = useStateful({
  //   // POID: false,
  //   // companyRegistration: true,
  //   // purchaseOrder: false,
  // });

  React.useEffect(() => {
    if (attachment?.value) {
      let oldDoc = attachment?.value?.filter((doc) => !doc.path);
      if (oldDoc.length > 0) {
        oldAttachments.setValue(oldDoc);
        setErrorState(false);
      }
    }
  }, [attachment?.value]);

  // const [field, meta, helpers] = useField(;

  const updatestate = (name) => {
    ErrorState.setValue({
      ...ErrorState.value,
      [name]: false
    });
  };

  const handleChange = (name, value) => {
    // setfiles((files) => [...files, value]);
    setErrorState(false);
    attachment.setValue([...attachment.value, value]);

    // updatestate(value.documentSpecification.id);

    //  let docID=

    //   seterror( ErrorState=>{

    //      return{...ErrorState, companyRegistration:false
    //      }

    //   })

    // field.onChange({
    //   target: { name, value },
    // });
  };

  //   React.useEffect(() => {
  //     if (files.length >= 0) {
  //       props.onChange(files);
  //     }

  //     if (masterdata) {
  //       documentName.setValue(
  //         LeadUtils.DocumentsIds({
  //           data: masterdata,
  //         })
  //       );
  //     }

  //  if(props.documentcheck){
  //     const temp=[...props.documentcheck.identifications]
  //      let companyRegistration= temp.find(item=>item.idType==="companyRegistration")
  //      let purchaseOrder= temp.find(item=>item.idType==="purchaseOrder")
  //      let  OwnerId = temp.find(item=>item.idType==="contractForm")

  //       ErrorState.setValue({
  //         companyRegistration:companyRegistration.mandatory,
  //         POID:OwnerId.mandatory,
  //         purchaseOrder:purchaseOrder.mandatory
  //       })

  //  }
  //   }, [files, masterdata]);
  const handleupload = () => {
    const Uid = UIDUtil.generateUnsafeUID();

    FileUploadUid.setValue([...FileUploadUid.value, Uid]);
  };

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={6}>
          <Typography variant="h2" className={classes.title}>
            Upload Documents
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {oldAttachments.value &&
            oldAttachments?.value?.map((file) => {
              return (
                <Grid item spacing={4}>
                  <Grid item style={{ height: '30px', marginTop: 10 }}>
                    <Typography
                      align="center"
                      className={classes.title}
                      variant="h6"
                    >
                      {/* {file.id} */}
                      {file?.id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box className={classes.image} py={6}>
                      <div>
                        <Attachpreview
                          attachment={file}
                          documentId={file.id}
                          path={`${Documenturl}/document/download/${file.id}`}
                        />
                      </div>
                    </Box>

                    <Box px={1} pt={2}>
                      <Grid
                        container
                        justify="flex-end"
                        alignItems="center"
                        spacing={4}
                      >
                        <Grid item>
                          <Box px={1}>
                            <Grid
                              container
                              direction="row"
                              justify="flex-center"
                              spacing={4}
                            >
                              {/* <Grid item>
                                  <EditOutlinedIcon />
                                </Grid>

                                <Grid item>
                                  <VisibilityOutlinedIcon />
                                </Grid>
                                <Grid item>
                                  <DeleteIcon />
                                </Grid> */}
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
          {FileUploadUid.value.map((key) => {
            return (
              <Grid item key={key}>
                <UploadDoc
                  // companyregid={props.companyregid}
                  // ErrorState={ErrorState.value.purchaseOrder}
                  attachmentID={data?.id}
                  regNo={companyRegistrationNumber}
                  name="attachment.purchaseOrder"
                  label="Purchase Order"
                  file={_.get(values, 'purchaseOrder')}
                  onChange={(e) =>
                    handleChange('attachment.purchaseOrder', e.target.value)
                  }
                />
              </Grid>
            );
          })}
          <Grid item>
            <UploadDoc
              // companyregid={props.companyregid}
              ErrorState={ErrorState}
              // regNo={companyRegistrationNumber}
              attachmentID={data?.id}
              name="attachment.companyRegistration"
              label="Company Registration"
              file={_.get(values, 'companyRegistration')}
              onChange={(e) =>
                handleChange('attachment.companyRegistration', e.target.value)
              }
            />
          </Grid>

          <Grid item>
            <UploadDoc
              attachmentID={data?.id}
              name="attachment.profileOwnerIdProfoof"
              label="Profile Owner ID Proof"
              file={_.get(values, 'profileOwnerIdProfoof')}
              onChange={(e) =>
                handleChange('attachment.profileOwnerIdProfoof', e.target.value)
              }
            />
          </Grid>

          <Grid item>
            <Box
              className={classes.root}
              style={{ border: `1px solid #e2e2e2` }}
            >
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Box className={classes.inputWrapper}>
                    <Grid container direction="column" spacing={10} mt={15}>
                      <Grid item>
                        {/* <Scan /> */}
                        <ControlPointIcon
                          style={{ fontSize: '4rem' }}
                          color={'primary'}
                          onClick={handleupload}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  root: {
    width: theme.spacing(60),

    // border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    height: '18rem'
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '6rem',
    borderWidth: 2,
    borderRadius: 2,
    // borderColor: "#e2e2e2",
    // borderStyle: "dashed",
    backgroundColor: '#ffffff',
    color: theme.palette.common.textSecondary,
    outline: 'none',

    textAlign: 'center',
    minHeight: '150px',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  }
}));

UploadDocments.propTypes = {};
export default UploadDocments;
