import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@material-ui/core';

import { Trans } from '@lingui/react';
import _, { isEmpty } from 'lodash';
import { CommonButton } from '@tt-dcpq/dcpq-common-libs';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import validationSchema from '../../../Features/PotentialLead/Schema';
import ExistingLeadOverview from 'Features/PotentialLead/ExistingLeadOverview';
import ModalsStore from 'Store/Modals';
import { Select, TextField } from 'formik-material-ui';
import { useStateful } from 'react-hanger';
import LoadFactory from 'Factory/Lead';
import { useHistory } from 'react-router-dom';
import { TecnotreedigitalSales } from '../../../Http/axios';
// import Modals from 'Store/Modals';
import statuses from 'lib/constants/statuses';

import NavigateNext from '@material-ui/icons/NavigateNext';
// import Alert from 'Store/Alert';

import Utils from 'Factory/Utils';
import UploadDialog from 'Components/uploadDialog/dialog';

const queryString = {
  Hospital: {
    // url: `Hospital/HospitalProfileCreation?PARTNER_REGISTRATION_NUMBER`,
    url: `Partner_Profile/PartnerProfileCreation?PARTNER_REGISTRATION_NUMBER`
  },
  Pharmacy: {
    url: `Partner_Profile/PartnerProfileCreation?PARTNER_REGISTRATION_NUMBER`
  },
  Device_Provider: {
    url: `Device_Provider/DeviceProviderProfileCreation?PARTNER_REGISTRATION_NUMBER`
  },

  Diagnostic_Labs: {
    url: `Diagnostic_Labs/DiagnosticLabsProviderProfileCreation?PARTNER_REGISTRATION_NUMBER`
  },
  Partner_Profile: {
    url: `Partner_Profile/PartnerProfileCreation?PARTNER_REGISTRATION_NUMBER`
  }
};
const LeadPartner = (props) => {
  const classes = useStyles();
  const [values, setValue] = useState([]);
  const runverification = useStateful({});
  const [options, setoptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duplicatePartner, setDuplicatePartner] = useState({});
  const history = useHistory();
  const userInfo = useSelector((state) => state.hierarchy.userInfo);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [existingPartnerDetails, setExistingPartnerDetails] = useState();
  const [duplicateMobile, setDuplicateMobile] = useState('');
  const masterdata = useSelector((state) => state.master.data);
  
  const [catData, setCatData] = useState({
    parentCatData: [],
    subCatData: []
  });
  // console.log(
  //   props.masterdata.workflowIds.leadPartnerRegistration,
  //   'mastercra',
  //   props,
  //   "oooookkop"
  // );
  const [otpData, setOtpData] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let valueAlreadySelected = false;
    setValue((values) => [...values, e.target.value]);

    // values.map((val) => {
    //   if (val.code === e.target.value) {
    //     valueAlreadySelected = true;
    //   }
    // });

    if (valueAlreadySelected) {
      setValue(values.filter((val) => val.value !== e.target.value));
    } else {
      setValue([...values, e.target.value]);
      // values.filter((val) => val !== e.target.value);
    }
  };

  const handleDelete = (i) => {
    const filterData = values.filter((val, key) => val !== i);
    setValue(filterData);
  };

  const getCategoryOptions = async () => {
    setCatData({
      ...catData,
      parentCatData: props.masterdata.operator[1].partnerType
    });

    // setCat_Loading(false)
  };
  const onProceedLead = () => {
    props.openModal({ id: 'existingLead' });
  };

  const handleChangeformik = (name, e) => {
    runverification.setValue({
      ...runverification.value,
      [name]: e.target.value
    });
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    //  }else{

    if (Object.keys(userInfo).length > 0) {
      let data = userInfo?.lob?.split(',');
      let temp = LoadFactory.makeLobpayload(data);

      setoptions(_.get(temp, 'serviceType', []));
    } else {
      if (props.masterdata) {
        setoptions(_.get(props.masterdata, 'data.serviceType', []));
      }
    }

    getCategoryOptions();
    // }
  }, [props.masterdata, userInfo]);

  const Submitpayload = (data) => {
    // resetForm({});
    // email: "adcds@fff.asas"
    // name: "ascfaascsc"
    // partnerName: "raghava"
    // partnerRegNo: "12341234123213"
    // phoneNumber: "1234343124
    const payload = {
      // companyDetails: {
      companyName: data.partnerName,
      partnerRegNo: data.partnerRegNo,
      // },
      // primaryContactDetails: {
      name: data.name,
      email: data.email,
      // },
      phoneNumber: data.phoneNumber
    };

    let fields = [];
    let obj = {
      name: 'PARTNER_NAME',
      value: payload.companyName,
      editable: true
    };
    let partnerRegNo = {
      name: 'PARTNER_REGISTRATION_NUMBER',
      value: payload.partnerRegNo,
      editable: true
    };

    let primaryName = {
      name: 'PRIMARY_CONTACT_NAME',
      value: payload.name,
      editable: true
    };
    let primaryEmail = {
      name: 'EMAIL_ID',
      value: payload.email,
      editable: true
    };
    let primaryMobileNo = {
      name: 'MOBILE_NUMBER',
      value: payload.phoneNumber,
      editable: true
    };
    let partnerCategory = {
      name: 'PARTNER_TYPE',
      value: data.Category?.name,
      editable: true
    };
    let partnerSubCategory = {
      name: 'PARTNER_SUB_TYPE',
      value: data.SubCategory?.code,
      editable: true
    };

    if (Utils.opcoEnable('FormFields')) {
      fields.push(obj);
      fields.push(partnerRegNo);
      fields.push(primaryName);
      fields.push(primaryEmail);
      fields.push(primaryMobileNo);
      fields.push(partnerCategory);
      fields.push(partnerSubCategory);
    } else {
      fields.push(obj);
      fields.push(partnerRegNo);
      fields.push(primaryName);
      fields.push(primaryEmail);
      fields.push(primaryMobileNo);
    }

    duplicatePartnerCheck(payload, fields, data);
  };
  const duplicateEmailCheck = async (payload) => {
    const emailPayload = {
      checkType: 'mobile',
      checkData: payload.phoneNumber
    };
    await TecnotreedigitalSales.post(`dsales/userduplicatecheck`, emailPayload)
      .then((resp) => {
        setDuplicatePartner(resp.data);
      })
      .catch((err) => {});
  };
// const verifyDynamicPId = (data) => {
//   let token = localStorage.getItem('token');
//    return TecnotreedigitalSales.post('leadPartner/validate', data, {
//      headers: { Authorization: `Bearer ${token}` }
//      }).then((res)=> {
//       console.log(res, "res")
//      }).catch(err => console.log(err, "errxxeex"))
//    ;};
  const duplicatePartnerCheck = async (payload, fields, formdata) => {

    const emailPayload = {
          
      emailId: payload.email,
      mobile: payload.phoneNumber,
      registrationNumber: payload.partnerRegNo


      
    };
    // verifyDynamicPId(emailPayload).then(res => {
    //   console.log(res, "resssdddoviore")
    // }).catch((err)=> console.log(err, "sfwfvdfdvd"))



      {/*try {
        let duplicateMob;
        const emailPayload = {
          
          emailId: payload.email,
          mobile: payload.phoneNumber,
          registrationNumber: payload.partnerRegNo
    
    
          
        };
        let resdata = await TecnotreedigitalSales.post(
          `leadPartner/validate`,
          emailPayload
        )
       console.log(resdata, "cocococxxxzoz")
    
        if (resdata?.data?.status === '200') {
        
           // if (!duplicateMob.result) {
            if (_.includes(statuses.OpcoStatus.Opco, props.opco)) {
              setOpenForm(true);
    
              setOtpData({
                ...otpData,
                payload,
                fields,
                formdata,
                agentId: props.agentId,
                workflowIds:
                  props.masterdata?.workflowIds?.leadPartnerRegistration
              });
            } else {
              history.push({
                pathname: '/digital-prm-web-ui/forms',
                state: {
                  formIdentity: formdata?.SubCategory
                    ? formdata?.SubCategory?.formIdentity
                    : 'Partner_Profile',
                  fields: fields,
                  stepId: formdata?.SubCategory
                    ? formdata?.SubCategory?.stepIdentity
                    : 'PartnerProfileCreation',
                  isFields: true
                }
              });
            }
    
             }
             else {
              dispatch(
                Alert.open({
                  type: 'error',
                  message: `Mobile Number already Exist`
                })
              );
             }
      }
      catch(error) {

      //  console.log(error, "errorxxxx")

        // alert("heyoooxxxx")
        // console.log(error, "erroror", error?.response)
        // // setExistingPartnerDetails(resp.data);
        // setOpen(true);
   
      } */}
      
      
      TecnotreedigitalSales.post(
        `leadPartner/validate`,
        emailPayload)
        .then((response) => {
          console.log("resresponsesdsd: ", response);
          if (response?.data?.status === '200') {
        
            // if (!duplicateMob.result) {
             if (_.includes(statuses.OpcoStatus.Opco, props.opco)) {
               setOpenForm(true);
     
               setOtpData({
                 ...otpData,
                 payload,
                 fields,
                 formdata,
                 agentId: props.agentId,
                 workflowIds:
                   props.masterdata?.workflowIds?.leadPartnerRegistration
               });
             } else {
               history.push({
                 pathname: '/digital-prm-web-ui/forms',
                 state: {
                   formIdentity: formdata?.SubCategory
                     ? formdata?.SubCategory?.formIdentity
                     : 'Partner_Profile',
                   fields: fields,
                   stepId: formdata?.SubCategory
                     ? formdata?.SubCategory?.stepIdentity
                     : 'PartnerProfileCreation',
                   isFields: true
                 }
               });
             }
          }
              // else {
              //  dispatch(
              //    Alert.open({
              //      type: 'error',
              //      message: `Mobile Number already Exist`
              //    })
              //  );
              // }

        }).catch((error) => {
            console.log("errorrunning: ", error)
        })
      
       
        
  };
  const handleonMouseLeave = () => {
    if (
      runverification.value?.companyName &&
      runverification.value?.companyRegNo
    ) {
      const payload = {
        ...LoadFactory.makeBlackListCheckPayload({
          registrationNumber: runverification.value?.companyRegNo
        })
      };
    }
  };

  const handleReset = () => {
    setValue([]);
  };

  const { operator = [] } = props.Masterdata;

  const TelCo_Moments = () => {
    const payloadValues = {
      partnerName: '',
      partnerRegNo: '',
      primaryContactName: '',
      phoneNumber: '',
      email: ''
    };
    if (Utils.opcoEnable('FormFields')) {
      return {
        Category: {},
        SubCategory: {},
        ...payloadValues
      };
    }
    return payloadValues;
  };

  return (
    <div>
      <Formik
        ref={(ref) => (this.formik = ref)}
        initialValues={TelCo_Moments()}
        onChange={() => {}}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setIsLoading(true);
          setIsDisabled(true);
         // console.log('onsubmitt');

          setTimeout(() => {
            setIsDisabled(false);
            setIsLoading(false);
          }, 3000);

          Submitpayload(data);
        }}
      >
        {({ isSubmitting, data, setFieldValue, values }) => (
          <Box py={2} px={4}>
            <Form>
              <Grid container direction="column" spacing={8} justify="center">
                <Grid item>
                  <Field
                    required
                    fullWidth
                    name="partnerName"
                    label={<Trans>PARTNER NAME</Trans>}
                    variant="standard"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      setFieldValue('partnerName', e.target.value);
                      handleChangeformik('partnerName', e);
                    }}
                    component={TextField}
                    disabled={isDisabled}
                  />
                </Grid>

                <Grid item>
                  <Field
                    required
                    fullWidth
                    name="partnerRegNo"
                    label={<Trans id="PARTNER REGISTRATION NUMBER"></Trans>}
                    variant="standard"
                    style={{ width: '100%', paddingTop: '5px' }}
                    onChange={(e) => {
                      setFieldValue('partnerRegNo', e.target.value);
                      handleChangeformik('partnerRegNo', e);
                    }}
                    component={TextField}
                    disabled={isDisabled}
                  />
                </Grid>

                <>
                  <Grid item>
                    <FormControl required style={{ width: '100%' }}>
                      <InputLabel htmlFor="age-simple">
                        <Trans> PARTNER TYPE</Trans>
                      </InputLabel>
                      <Field
                        required
                        fullWidth
                        name="partnerType"
                        label="partnerType"
                        component={Select}
                        value={values?.Category?.name}
                        onChange={(e, v) => {
                         // console.log(e.target.value);
                          setFieldValue('partnerType', e.target.value);

                          setCatData({
                            ...catData,
                            subCatData: _.find(
                              catData.parentCatData,
                              (item) => {
                                return item.name === e.target.value;
                              }
                            )?.subType
                          });
                        }}
                      >
                        {catData.parentCatData?.length > 0 &&
                          catData.parentCatData.map((st) => (
                            <MenuItem key={st.code} value={st.name}>
                              {st.name}
                            </MenuItem>
                          ))}
                      </Field>
                    </FormControl>
                  </Grid>

                  {/* <Grid>
                  <Autocomplete
                    className={classes.formControl}
                    // disabled={cat_loading}
                    classes={{ paper: classes.autoComplete }}
                    options={catData.parentCatData}
                    getOptionLabel={(option) => option?.name}
                    onChange={(event, newValue) => {
                      console.log(newValue, 'newv');
                      setFieldValue('partnerType', newValue?.name);
                      setCatData({
                        ...catData,
                        subCatData: newValue?.subType
                      });
                    }}
                    renderInput={(params) => (
                      <TextComp
                        {...params}
                        label={'CATEGORY'}
                        placeholder="Select"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <></>
                        }}
                      />
                    )}
                  />
                </Grid> */}
                  <Grid item>
                    <FormControl style={{ width: '100%' }}>
                      <InputLabel htmlFor="age-simple">
                        <Trans> PARTNER SUB TYPE</Trans>
                      </InputLabel>
                      <Field
                        fullWidth
                        name="SubCategory"
                        label={<Trans>Sub Category</Trans>}
                        component={Select}
                        value={values?.SubCategory?.name}
                        onChange={(e) => {
                          setFieldValue('partnerSubType', e.target.value);
                        }}
                      >
                        {catData.subCatData?.length > 0 &&
                          catData.subCatData &&
                          catData.subCatData?.map((item) => {
                            return (
                              <MenuItem key={item.code} value={item.name}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                      </Field>
                    </FormControl>
                  </Grid>
                </>

                <Grid item>
                  <Field
                    required
                    fullWidth
                    name="name"
                    label={<Trans id="PRIMARY CONTACT NAME"></Trans>}
                    variant="standard"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      setFieldValue('primaryContactName', e.target.value);
                      handleChangeformik('name', e);
                    }}
                    component={TextField}
                    disabled={isDisabled}
                  />
                </Grid>

                <Grid item>
                  <Field
                    required
                    fullWidth
                    name="phoneNumber"
                    label={<Trans id="PHONE NUMBER"></Trans>}
                    variant="standard"
                    style={{ width: '100%' }}
                    type="number"
                    onChange={(e) => {
                      setFieldValue('phoneNumber', e.target.value);
                      handleChangeformik('phoneNumber', e);
                    }}
                    component={TextField}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item>
                  <Field
                    required
                    fullWidth
                    name="email"
                    label={<Trans id="EMAIL"></Trans>}
                    variant="standard"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      setFieldValue('email', e.target.value);
                      handleChangeformik('email', e);
                    }}
                    component={TextField}
                    disabled={isDisabled}
                  />
                </Grid>

                {/* <Grid>
                  <Autocomplete
                    className={classes.formControl}
                    classes={{ paper: classes.autoComplete }}
                    // ref={subcatref}
                    value={[]}
                    // defaultValue={catData.subCatData?.[0]?.title||''}
                    options={catData.subCatData}
                    getOptionLabel={(option) => option?.name}
                    onChange={(event, newValue) => {
                      console.log(newValue, 'newvxxx');
                      setFieldValue('subType', newValue?.name);
                    }}
                    renderInput={(params) => (
                      <TextComp
                        {...params}
                        label={'SUB CATEGORY'}
                        placeholder="Select"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <></>
                        }}
                      />
                    )}
                  />
                </Grid> */}
                {/*             <Grid item xs>
              <Box py={5}>
                <Grid container direction="row">
                  <Grid item xs>
                    <Grid container direction="column" spacing={5}>
                      <Autocomplete
                        className={classes.formControl}
                        // disabled={cat_loading}
                        classes={{ paper: classes.autoComplete }}
                        value={filterObj?.parentCategory || ''}
                        options={catData.parentCatData}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) => {
                          setFilterObj({
                            ...filterObj,
                            ['parentCategory']: newValue
                          });
                          if (newValue?.id) {
                            getSubCategoryOptions(newValue.id);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={'CATEGORY'}
                            placeholder="Select"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <></>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container direction="column" spacing={5}>
                      <Autocomplete
                        className={classes.formControl}
                        classes={{ paper: classes.autoComplete }}
                        // ref={subcatref}
                        value={filterObj?.subCategory || ''}
                        // defaultValue={catData.subCatData?.[0]?.title||''}
                        options={catData.subCatData}
                        getOptionLabel={(option) => {
                          // console.log({ option }, 'option');
                          if (option.hasOwnProperty('title')) {
                            return option.title;
                          }
                          return option;
                        }}
                        onChange={(event, newValue) => {
                          setFilterObj({
                            ...filterObj,
                            ['subCategory']: newValue
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={'SUB CATEGORY'}
                            placeholder="Select"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <></>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid> */}
                <Grid item mt={5}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="flex-end"
                    spacing={4}
                  >
                    <Grid item>
                      <CommonButton
                        variant="text"
                        color="secondary"
                        type={'reset'}
                        onClick={handleReset}
                        disabled={isDisabled}
                        className={classes.btnClr}
                        // endIcon={<NavigateNext />}
                      >
                        <Trans id="Clear"></Trans>
                      </CommonButton>
                    </Grid>
                    <Grid item>
                      <CommonButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<NavigateNext />}
                        disabled={isDisabled}
                        className={classes.proceedBtn}
                      >
                        {/* {props.loading ? 'Proceeding...' : 'Proceed'} */}
                        {isLoading ? (
                          <CircularProgress
                            size={25}
                            style={{ color: 'white' }}
                          />
                        ) : (
                          <Trans id="Proceed"></Trans>
                        )}
                      </CommonButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Box>
        )}
      </Formik>
      {/* {props.modalState.existingLead && ( */}

      {isEmpty(existingPartnerDetails) ? (
        <></>
      ) : (
        <>
          <ExistingLeadOverview
            open={open}
            onClose={onClose}
            dataSource={existingPartnerDetails}
          />
        </>
      )}

      {/* )} */}

      <UploadDialog
        open={openForm}
        otpData={otpData}
        setOpenForm={setOpenForm}
      />
    </div>
  );
};
export default connect(
  (state) => ({
    masterdata: state.master.masterData,
    modalState: state.modals,
    authState: state.auth
  }),
  {
    openModal: ModalsStore.open,
    closeModal: ModalsStore.close
  }
)(LeadPartner);

const useStyles = makeStyles((theme) => ({
  Paper: {
    height: '40rem'
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    width: theme.spacing(3),
    height: theme.spacing(3),
    '&:hover': {
      backgroundColor: theme.palette.error.light
    },
    '& svg': {
      width: theme.spacing(3),
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  },
  proceedBtn: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.main} !important`
        : `${theme.palette.primary.main} !important`
    // borderRadius: '5rem'
  },
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    padding:'6px 28px',
    '&.MuiButton-textSecondary':{
      color: '#000000',
    }
  }
}));
