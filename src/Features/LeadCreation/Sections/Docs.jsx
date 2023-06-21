import React from 'react';
import _ from 'lodash';

import { Typography, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import { FileUpload } from 'lib/components';
import { Controller, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useStateful } from 'react-hanger';

import { Documenturl } from 'Http/axios';
import Attachpreview from '../../LeadDetails/Attachpreview';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import UIDUtil from 'lib/utils/uid';
import LeadUtils from 'lib/utils/lead';

const Docs = (props, { values, companyRegistrationNumber }) => {
  const masterdata = useSelector((state) => state.master.data);
  const classes = useStyles();
  const [files, setfiles] = React.useState([]);
  const documentName = useStateful({});
  const ErrorState = useStateful({
    // POID: false,
    // companyRegistration: true,
    // purchaseOrder: false,
  });

  // const [field, meta, helpers] = useField(props);
  const FileUploadUid = useStateful([]);

  const updatestate = (name) => {
    ErrorState.setValue({
      ...ErrorState.value,
      [name]: false
    });
  };
  const handleChange = (name, value) => {
    setfiles((files) => [...files, value]);

    updatestate(value.documentSpecification.id);

    //  let docID=

    //   seterror( ErrorState=>{

    //      return{...ErrorState, companyRegistration:false
    //      }

    //   })

    // field.onChange({
    //   target: { name, value },
    // });
  };

  React.useEffect(() => {
    if (files.length >= 0) {
      props.onChange(files);
    }

    if (masterdata) {
      documentName.setValue(
        LeadUtils.DocumentsIds({
          data: masterdata
        })
      );
    }
  }, [files, masterdata]);

  React.useEffect(() => {
    if (props.documentcheck) {
      const temp = [...props.documentcheck.identifications];
      let companyRegistration = temp.find(
        (item) => item.idType === 'companyRegistration'
      );
      let purchaseOrder = temp.find((item) => item.idType === 'purchaseOrder');
      let OwnerId = temp.find((item) => item.idType === 'contractForm');

      ErrorState.setValue({
        companyRegistration: companyRegistration.mandatory,
        POID: OwnerId.mandatory,
        purchaseOrder: purchaseOrder.mandatory
      });
    }
  }, []);

  React.useEffect(() => {
    if (props?.leadOpen?.attachment) {
      props.onChange(props?.leadOpen?.attachment);
      setfiles(props?.leadOpen?.attachment);
    }
  }, [props.leadOpen]);

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
        {props.drop && props.leadOpen?.attachment && (
          <Grid container direction="row" spacing={4}>
            {props.leadOpen?.attachment.map((file) => {
              return (
                <Grid item>
                  <Box className={classes.root} marginLeft={10}>
                    <Grid container spacing={4}>
                      <Grid item style={{ height: '30px', marginTop: 10 }}>
                        <Typography
                          align="center"
                          className={classes.title}
                          variant="h6"
                          style={{ marginLeft: '40px' }}
                        >
                          {/* {file.id} */}
                          {file.documentSpecification?.id}
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
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              );
            })}

            <Grid item>
              {FileUploadUid.value.map((key, i) => {
                if (i <= 2) {
                  return (
                    <Grid item key={key}>
                      <FileUpload
                        companyregid={props.companyregid}
                        expiryDate={props.expiryDate}
                        ErrorState={ErrorState.value.purchaseOrder}
                        attachmentID={documentName.value.purchaseOrder}
                        regNo={companyRegistrationNumber}
                        name="attachment.purchaseOrder"
                        label="Purchase Order"
                        file={_.get(values, 'purchaseOrder')}
                        onChange={(e) =>
                          handleChange(
                            'attachment.purchaseOrder',
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  );
                }
              })}
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
        )}
        {!props.drop && (
          <Grid container spacing={4}>
            <Grid item>
              <FileUpload
                companyregid={props.companyregid}
                expiryDate={props.expiryDate}
                ErrorState={ErrorState.value.companyRegistration}
                regNo={companyRegistrationNumber}
                attachmentID={documentName.value.companyRegistration}
                name="attachment.companyRegistration"
                label="Company Registration"
                file={_.get(values, 'companyRegistration')}
                onChange={(e) =>
                  handleChange('attachment.companyRegistration', e.target.value)
                }
              />
            </Grid>
            {/* <Grid item>
            <FileUpload
              regNo={companyRegistrationNumber}
              attachmentID="ChamberofCommerceCertificate"
              name="attachment.chamberOfCommerceCertificate"
              label="Chamber of Commerce Certificate"
              file={_.get(values, "chamberOfCommerceCertificate")}
              onChange={(e) =>
                handleChange(
                  "attachment.chamberOfCommerceCertificate",
                  e.target.value
                )
              }
            />
          </Grid> */}
            <Grid item>
              <FileUpload
                companyregid={props.companyregid}
                expiryDate={props.expiryDate}
                ErrorState={ErrorState.value.POID}
                regNo={companyRegistrationNumber}
                attachmentID={documentName.value.POID}
                name="attachment.profileOwnerIdProfoof"
                label="Profile Owner ID Proof"
                file={_.get(values, 'profileOwnerIdProfoof')}
                onChange={(e) =>
                  handleChange(
                    'attachment.profileOwnerIdProfoof',
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid item>
              <FileUpload
                companyregid={props.companyregid}
                expiryDate={props.expiryDate}
                ErrorState={ErrorState.value.purchaseOrder}
                attachmentID={documentName.value.purchaseOrder}
                regNo={companyRegistrationNumber}
                name="attachment.purchaseOrder"
                label="Purchase Order"
                file={_.get(values, 'purchaseOrder')}
                onChange={(e) =>
                  handleChange('attachment.purchaseOrder', e.target.value)
                }
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

const DocController = ({
  control,
  options,
  documentcheck,
  companyregid,
  leadOpen,
  drop,
  expiryDate
}) => {
  const values = useWatch({
    control,
    name: 'attachment'
  });

  return (
    <Controller
      control={control}
      name="attachment"
      rules={{ required: true }}
      render={({ onChange, onBlur, value, name, ref }) => (
        <Docs
          onChange={onChange}
          options={options}
          documentcheck={documentcheck}
          values={values}
          companyregid={companyregid}
          leadOpen={leadOpen}
          drop={drop}
          expiryDate={expiryDate}
        />
      )}
    />
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
    height: '16rem'
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
    minHeight: '140px',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  }
}));

DocController.propTypes = {};
export default DocController;
