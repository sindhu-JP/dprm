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
import validationSchema from './Schema';
import ExistingLeadOverview from 'Features/PotentialLead/ExistingLeadOverview';
import ModalsStore from 'Store/Modals';
import { Select, TextField } from 'formik-material-ui';
import { useStateful } from 'react-hanger';
import LoadFactory from 'Factory/Lead';
import { useHistory } from 'react-router-dom';

import { TecnotreedigitalSales } from '../../Http/axios';
import Modals from 'Store/Modals';
import statuses from 'lib/constants/statuses';

import NavigateNext from '@material-ui/icons/NavigateNext';
import Alert from 'Store/Alert';

import Utils from 'Factory/Utils';
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
const PotentialLead = (props) => {
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
  const [existingPartnerDetails, setExistingPartnerDetails] = useState();
  const [duplicateMobile, setDuplicateMobile] = useState('');
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
        primaryContactName: data.primaryContactName,
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
      value: payload.primaryContactName,
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

  const duplicatePartnerCheck = async (payload, fields, formdata) => {
    let duplicateMob;
    const emailPayload = {
      checkType: 'mobile',
      checkData: payload.phoneNumber
    };
    let resdata = await TecnotreedigitalSales.post(
      `dsales/userduplicatecheck`,
      emailPayload
    );
    if (resdata.data.result === false) {
      await TecnotreedigitalSales.get(
        `duplicate/${queryString['Partner_Profile'].url}=${payload.partnerRegNo}&EMAIL_ID=${payload.email}`
      )
        .then((resp) => {
          if (resp.data[0].statuscode === '409') {
            setExistingPartnerDetails(resp.data[0]);
            setOpen(true);
          } else if (resp.data[0].statuscode === '200') {
            // if (!duplicateMob.result) {
            if (_.includes(statuses.OpcoStatus.Opco, props.opco)) {
              dispatch(
                Modals.open({
                  id: 'OtpVerification',
                  context: {
                    email: payload?.email,
                    phoneNumber: payload?.phoneNumber,
                    fields: fields,
                    formStep: formdata
                  }
                })
              );
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
            // }
          }
        })
        .catch((error) => {});
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: `Mobile Number already Exist`
        })
      );
    }
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
                {Utils.opcoEnable('FormFields') && (
                  <>
                    <Grid item>
                      <FormControl required style={{ width: '100%' }}>
                        <InputLabel htmlFor="age-simple">
                          <Trans> Partner Type</Trans>
                        </InputLabel>
                        <Field
                          required
                          fullWidth
                          name="Category"
                          label="Category"
                          component={Select}
                          value={values?.Category?.name}
                          onChange={(e, v) => {
                            setFieldValue(
                              'Category',
                              _.find(operator[0]?.partnerType, (item) => {
                                return item.code === e.target.value;
                              })
                            );
                          }}
                        >
                          {operator?.length > 0 &&
                            _.get(operator, '[0].partnerType', []).map((st) => (
                              <MenuItem key={st.name} value={st.code}>
                                {st.name}
                              </MenuItem>
                            ))}
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel htmlFor="age-simple">
                          <Trans> Partner Sub Type</Trans>
                        </InputLabel>
                        <Field
                          fullWidth
                          name="SubCategory"
                          label={<Trans>Sub Category</Trans>}
                          component={Select}
                          value={values?.SubCategory?.name}
                          onChange={(e) => {
                            setFieldValue(
                              'SubCategory',
                              _.find(values?.Category?.subType, (item) => {
                                return item.formIdentity === e.target.value;
                              })
                            );
                          }}
                        >
                          {operator?.length > 0 &&
                            values?.Category &&
                            values?.Category?.subType?.map((item) => {
                              return (
                                <MenuItem
                                  key={item.code}
                                  value={item.formIdentity}
                                >
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                        </Field>
                      </FormControl>
                    </Grid>
                  </>
                )}

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
)(PotentialLead);

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
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    padding:'6px 28px',
    '&.MuiButton-textSecondary':{
      color: '#000000',
    }
  },
  proceedBtn: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.main} !important`
        : `${theme.palette.primary.main} !important`
    // borderRadius: '5rem'
  }
}));
