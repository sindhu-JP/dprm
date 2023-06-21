import React, { useState, useEffect } from 'react';
import { TecnotreedigitalSales } from 'Http/axios';

// import './FormFields.scss';
import '../../../Forms/FormFields.scss';
import * as _ from 'lodash';
import { LoadingSpin } from 'Features/Forms/LoadingSpin';

import { Form, Col, Row, Steps, Modal, message, Typography } from 'antd';
// import { onRecursiveImgClick } from '../../redux/actions/CustomFormAction';
// import {
//   setTabValueAction,
//   setTabTotalAction,
//   getMidCollection,
//   SetCustomDisplay,
//   saveExistingUser,
//   getCustomMidJson
// } from '../../redux/actions/CreateFormAction';
import { useHistory } from 'react-router-dom';
// import FormtaskModal from "./FormtaskModal";
import FreeStep from 'Features/Forms/FreeStep';
import Model from 'Store/Modals';
// import Customstep from "../CustomStep/Customstep";
import { useLocation } from 'react-router-dom';

import Alert from 'Store/Alert';
import { useDispatch } from 'react-redux';

import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import SectionParser from 'Factory/Worlflowpayload';

import { CircularProgress, Grid } from '@material-ui/core';
import { useBoolean } from 'react-hanger';
import workflowPayload from 'Factory/Worlflowpayload';

const { Step } = Steps;

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

function BottomModalForm(props) {
  let location = useLocation();
  const dispatch = useDispatch();
  const [stepList, setStepList] = useState([]);
  const [form] = Form.useForm();
  const [sectionCount, setCount] = useState(1);
  const [currentSectiontitle, setSectionTitle] = useState('');
  const [fieldStatus, setFieldStatus] = useState('');
  const [statusId, setStatusId] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [ListOfTabs, setTabList] = useState([]);
  const history = useHistory();
  const [clickedButtonData, setClickedButtonData] = useState('');
  const [totalTab, setTotalTab] = useState(1);
  const [currentError, setCurrentError] = useState({});
  const [showBlackListModal, setShowBlacklistModal] = useState(false);
  const [seeBlacklistPopup, setSeeBlacklistPopup] = useState(false);
  const [popoupData, setPopupData] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [showFormtaskModal, setShowFormtaskModal] = useState(false);
  const [formIdentity, setFormIdentity] = useState('');
  const [FormDisplayData, setFormData] = useState([]);
  const [modalVisible, setModalVisibal] = useState(false);
  const [taskResponse, setTaskResponse] = useState({});
  const [formnaveInfo, setFormnaveInfo] = useState('');
  const [searchResp, setSearchResp] = useState({});
  const [fetching, setFetching] = useState(false);
  const [searchOptions, setSearchOptions] = useState({});
  const [docsInfo, setDocsInfo] = useState({});
  let fields = location.state.isFields ? location.state.fields : [];
  const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
  const buttonLoader = useBoolean(false);

  useEffect(() => {
    if (props.id || props.details) {
      let payload = {
        formIdentity: `Partner_Profile`,
        stepIdentity: `PartnerProfileCreation`,
        fields: []
      };

      let fieldValue = [];
      let prefillValue = [];

      //   if (Tabname) {
      TecnotreedigitalSales.post(`/stepvalue`, payload)

        .then(async (asyncResp) => {
          if (asyncResp) {
            let v = SectionParser.UpdateSectionForm(
              asyncResp.data[0],
              props.id
            );
            setFormData(
              SectionParser.UpdateSectionForm(asyncResp.data[0], props.id)
            );
            await formatFormField(
              SectionParser.UpdateSectionForm(asyncResp.data[0], props.id)
            ).then((result) => {
              LoadingSpin(false);
              setStepList([result]);
              fieldValue = result.fields;
            });

            form.setFieldsValue(props.details);
          }
        })
        .catch((err) => {
          LoadingSpin(false);
          // history.push('/');
        });
    }
  }, [props.id]);

  useEffect(() => {
    let tabName = ListOfTabs[currentTab];
    if (currentTab < totalTab) {
      setIsEmpty(true);
      if (tabName) {
        TecnotreedigitalSales.get(`/step?stepIdentity=${tabName}`)
          .then(async (resp) => {
            if (resp) {
              await formatFormField(resp.data).then((result) => {
                LoadingSpin(false);
                setStepList([result]);
              });
            }
          })
          .catch((err) => {
            LoadingSpin(false);
            message.error('error fetching data', 1);
            // history.push('/');
          });
      }
    }
  }, [currentTab]);

  const onRegNumberClick = (data) => {
    // if(companyRegNumber !==""){
    setShowBlacklistModal(true);
    // }
  };

  const onCancelClick = () => {
    setShowBlacklistModal(false);
    setTimeout(() => {
      setSeeBlacklistPopup(false);
    }, 100);
  };
  const onDeleteSection = (name, section) => {
    let sectionName = name,
      tempdata = _.cloneDeep(stepList[0]);
    let indx = tempdata.column.indexOf(section);

    tempdata.column.forEach((sec) => {
      let obj = tempdata.sectionlist[sec];
      if (obj.sectionName === sectionName) {
        delete tempdata.sectionlist[sec];
      }
    });
    tempdata.column.splice(indx, 1);

    setStepList([tempdata]);
  };
  const formatFormField = async (data) => {
    let tempData = data[0];

    for (let i in tempData.sectionlist) {
      for (let j = 0; j < tempData.sectionlist[i].arr.length; j++) {
        if (
          tempData.sectionlist[i].arr[j].isApiData &&
          (tempData.sectionlist[i].arr[j].type === 'dropdown' ||
            tempData.sectionlist[i].arr[j].type === 'MultiSelect')
        ) {
          let userName =
              localStorage.getItem('USER') &&
              JSON.parse(localStorage.getItem('USER')).sub,
            userRole = localStorage.getItem('roleId'),
            Ebody = {};
          Ebody['username'] = userName.sub;
          Ebody['userId'] = '12356';
          Ebody['userRole'] = '123456';
          Ebody['executionModeStatus'] = false;
          Ebody['async'] = false;
          Ebody['workflowId'] = tempData.sectionlist[i].arr[j].workFlowId;
          Ebody['formIdentity'] = tempData.formIdentity;
          Ebody['stepIdentity'] = tempData.stepIdentity;
          Ebody['Values'] = {};
          Ebody['Values']['username'] = userName.sub;
          Ebody['Values']['merchantId'] = '1234';
          Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
          await TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
            .then((resp) => {
              if (resp.data.dynamicText && resp.data.dynamicText.length > 0) {
                resp.data.dynamicText.forEach((item) => {
                  if (item.label) {
                    item['value'] = item.label;
                  }
                });
              }
              tempData.sectionlist[i].arr[j].options = resp.data.dynamicText
                ? resp.data.dynamicText
                : [];
            })
            .catch((err) => {
              if (err.response) {
                let Tecnotreeres = err.response.data
                  ? err.response.data?.TecnotreeResponse
                  : {};
                Modal.error({
                  className: 'modal-error-content',
                  title: 'This is an error message',
                  content: (
                    <>
                      <Row>
                        <Col span={10}>
                          <b> Error Message : </b>{' '}
                        </Col>{' '}
                        <Col span={14}> {Tecnotreeres?.body} </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          {' '}
                          <b>status Code : </b>{' '}
                        </Col>{' '}
                        <Col> {Tecnotreeres?.statusCode} </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          {' '}
                          <b> Status Code Value : </b>
                        </Col>{' '}
                        <Col> {Tecnotreeres?.statusCodeValue} </Col>
                      </Row>
                    </>
                  )
                });
              }
            });
        } else if (tempData.sectionlist[i].arr[j].linkedForm) {
          let user = JSON.parse(localStorage.getItem('USER'));
          let isLogin = localStorage.getItem('isLogin');
          if (isLogin) {
            let stepId = tempData.sectionlist[i].arr[j].stepIdentity
              .split(' ')
              .filter((s) => s)
              .join('');
            await TecnotreedigitalSales.get(
              `/t
              ?formIdentity=${tempData.sectionlist[i].arr[j].formIdentity}&stepIdentity=${stepId}&createdBy=${user.sub}&fieldName=${tempData.sectionlist[i].arr[j].name}`
            )
              .then((resp) => {
                tempData.sectionlist[i].arr[j].value =
                  resp.data.length > 0
                    ? resp.data[0][tempData.sectionlist[i].arr[j].name]
                    : '';
                form.setFieldsValue(resp.data[0]);
              })
              .catch((err) => {});
          }
        } else if (
          (tempData.sectionlist[i].arr[j].type === 'text' ||
            tempData.sectionlist[i].arr[j].type === 'hidden') &&
          tempData.sectionlist[i].arr[j].isApiData &&
          tempData.sectionlist[i].arr[j].onLoad
        ) {
          let userName =
              localStorage.getItem('USER') &&
              JSON.parse(localStorage.getItem('USER')).sub,
            userRole = localStorage.getItem('roleId'),
            Ebody = {};
          Ebody['username'] = userName.sub;
          Ebody['userId'] = localStorage.getItem('signinId');
          Ebody['userRole'] = userRole;
          Ebody['executionModeStatus'] = false;
          Ebody['async'] = false;
          Ebody['workflowId'] = tempData.sectionlist[i].arr[j].workFlowId;
          Ebody['formIdentity'] = data.formIdentity;
          Ebody['stepIdentity'] = data.stepIdentity;
          Ebody['Values'] = {};
          Ebody['Values']['username'] = userName;
          Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
          Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
          await TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
            .then((resp) => {
              let obj = {};
              obj[tempData.sectionlist[i].arr[j].name] =
                resp.data.notification[tempData.sectionlist[i].arr[j].name];
              form.setFieldsValue(obj);
            })
            .catch((err) => {
              if (err.response) {
                let Tecnotreeres = err.response.data
                  ? err.response.data?.TecnotreeResponse
                  : {};
                Modal.error({
                  className: 'modal-error-content',
                  title: 'This is an error message',
                  content: (
                    <>
                      <Row>
                        <Col span={10}>
                          <b> Error Message : </b>{' '}
                        </Col>{' '}
                        <Col span={14}> {Tecnotreeres?.body} </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          {' '}
                          <b>status Code : </b>{' '}
                        </Col>{' '}
                        <Col> {Tecnotreeres?.statusCode} </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          {' '}
                          <b> Status Code Value : </b>
                        </Col>{' '}
                        <Col> {Tecnotreeres?.statusCodeValue} </Col>
                      </Row>
                    </>
                  )
                });
              }
            });
        }
      }
    }
    setIsEmpty(false);

    return tempData;
  };

  const triggerAPI = async (
    body,
    FormDisplayData,

    // userRole,
    values,
    clickedButtonData
  ) => {
    buttonLoader.setTrue();
    let userName =
      localStorage.getItem('USER') &&
      JSON.parse(localStorage.getItem('USER')).sub;
    let userRole = localStorage.getItem('role');
    let Ebody = {};
    Ebody['username'] = userName.sub;
    Ebody['userId'] = '';
    Ebody['userRole'] = '';
    Ebody['executionModeStatus'] = false;
    Ebody['async'] = false;
    Ebody['workflowId'] = 1638337797870;
    Ebody['formIdentity'] = '';
    Ebody['stepIdentity'] = '';

    Ebody['Values'] = {
      status: 'pending',
      PARTNER_NAME:
        props.partnerFulldetails?.PartnerProfileCreation?.PartnerDetails
          ?.PARTNER_NAME,
      Partner_ID:
        props.partnerFulldetails?.PartnerProfileCreation?.PartnerDetails
          ?.Partner_ID,
      ...SectionParser.makeFormDetails(
        body,
        props.partnerDetails,
        props.id,
        props.partnerFulldetails
      ),
      ...workflowPayload.returnWorkflowData(
        props.partnerFulldetails?.PartnerProfileCreation?.PartnerDetails
          ?.Partner_ID,
        props.partnerFulldetails?.PartnerProfileCreation?.PrimaryContactDetails
          ?.EMAIL_ID,
        props.partnerFulldetails?.PartnerProfileCreation?.PrimaryContactDetails
          ?.MOBILE_NUMBER,
        props.partnerFulldetails?.PartnerProfileCreation?.PartnerDetails
          ?.PARTNER_NAME,
        props.partnerFulldetails?.PartnerProfileCreation?.PrimaryContactDetails
          ?.PRIMARY_CONTACT_NAME,
        ''
      )
    };
    Ebody['Values']['date'] = new Date();
    Ebody['Values']['userName'] = userName;
    Ebody['Values']['userId'] = Loginuser?.id;
    Ebody['Values']['subStatus'] = 'draft';
    Ebody['Values']['channel'] = 'DPRM';
    Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');

    let result = await TecnotreedigitalSales.post(
      '/bpmn/executeProcess',
      Ebody
    ).catch((error) => {
      // console.log('error', error, 'catched');
    });
    // dispatch(Model.close('SuccessModal'));
   
    if (result?.data?.apiResponse?.status === '200 OK') {
      // dispatch(Model.close('FormsCreation'));
      // dispatch(Model.close('ProductList'));
      // dispatch(Model.close('ProductContract'));
      // dispatch(Model.close('ModifyContract'));

      dispatch(
        Model.open({
          id: 'SuccessModal',
          type: 'success',
          context: {
            message:
              'Partner Profile Modification Request Submitted, Approval pending!!',
            // message: props.message,
            data: result?.data || {}
          }
        })
      );
      buttonLoader.setFalse();
      props.onClose();
      dispatch(
        Alert.open({
          type: 'success',
          message:
            'Partner Profile Modification Request Submitted, Approval pending!!'
        })
      );
    } else {
      buttonLoader.setFalse();
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please try again!!'
        })
      );
    }
  };
  const onFormFinish = (values) => {
    let data = Object.assign({}, values);
    if (values.ONE_TIME_CHARGES === '') {
      data.ONE_TIME_CHARGES = 0;
    } else {
      data.ONE_TIME_CHARGES = parseInt(values.ONE_TIME_CHARGES);
    }
    if (clickedButtonData.buttonType === 'cancel') {
      history.push('/');
      return;
    }

    let FormDisplayData = stepList[0];
    triggerFreeStep(data, FormDisplayData);
  };

  const triggerFreeStep = (values, FormDisplayData) => {
    let sectionArr = [];
    let valueObj = {};
    let tempValue = {};
    if (!values['TIN/TAX_DOCUMENT']) {
      values['TIN/TAX_DOCUMENT'] =
        props?.docInfo['TIN/TAX_DOCUMENT'];
    }

    if (!values.FINANCIAL_DOCUMENTS) {
      values.FINANCIAL_DOCUMENTS = props?.docInfo?.FINANCIAL_DOCUMENTS;
    }

    FormDisplayData.column.forEach((col) => {
      let section = FormDisplayData.sectionlist[col];
      let sectionName = section?.sectionName
        ? section?.sectionName
        : section?.sectiontitle;
      sectionArr.push(sectionName);

      let initialValue = {};

      section &&
        section.arr.forEach((item) => {
          if (item.type === 'capture') {
            values[item.name] = props.captureData;

            valueObj[sectionName] = {
              ...initialValue,

              [item.name]: values[item.name] ? values[item.name] : ''
            };

            initialValue = {
              ...initialValue,

              [item.name]: values[item.name] ? values[item.name] : ''
            };
          }

          if (item.type === 'upload') {
            if (values[item.name]) {
              values[item.name] = values[item.name]
                ? values[item.name].fileList
                  ? values[item.name].fileList
                  : values[item.name]
                : [];
              valueObj[sectionName] = {
                ...initialValue,
                [item.name]: values[item.name] ? values[item.name] : []
              };
              initialValue = {
                ...initialValue,
                [item.name]: values[item.name] ? values[item.name] : []
              };
            }
          }
          if (item.type === 'multiUpload') {
            values[item.name] = values[item.name]
              ? values[item.name].fileList
                ? values[item.name].fileList
                : values[item.name]
              : [];

            valueObj[sectionName] = {
              ...initialValue,
              [item.name]: values[item.name] ? values[item.name] : []
            };
            initialValue = {
              ...initialValue,
              [item.name]: values[item.name] ? values[item.name] : []
            };
          } else if (item.type === 'switch') {
            valueObj[sectionName] = {
              ...initialValue,

              [item.name]: values[item.name] ? values[item.name] : false
            };

            initialValue = {
              ...initialValue,

              [item.name]: values[item.name] ? values[item.name] : false
            };
          } else {
            valueObj[sectionName] = {
              ...initialValue,

              [item.name]: values[item.name] ? values[item.name] : ''
            };

            initialValue = {
              ...initialValue,

              [item.name]: values[item.name] ? values[item.name] : ''
            };
          }
        });

      tempValue = { ...tempValue, ...initialValue };
    });

    let StepDetails = {};
    StepDetails['sections'] = sectionArr;
    StepDetails['stepIdentity'] = FormDisplayData.stepIdentity;
    StepDetails['customStep'] = false;
    StepDetails['status'] = 'pending';
    StepDetails = { ...StepDetails, ...valueObj };

    let Mid = localStorage.getItem('Mid');
    let Pid = localStorage.getItem('Pid');
    let userName =
      localStorage.getItem('USER') &&
      JSON.parse(localStorage.getItem('USER')).sub;
    let userRole = localStorage.getItem('roleId');
    let trimstepId = FormDisplayData.stepIdentity
      .split(' ')
      .filter((s) => s)
      .join('');
    let body = getBody(
      // Mid,
      // Pid,
      FormDisplayData,
      trimstepId,
      sectionArr,
      StepDetails
    );
    let getName = FormDisplayData.stepIdentity;
    if (getName) {
      triggerAPI(
        body,
        FormDisplayData,
        // userName,
        userRole,
        // tempValue,
        clickedButtonData
      );
    }
  };

  const getBody = (FormDisplayData, trimstepId, sectionArr, StepDetails) => {
    let body = {};
    body['mid'] = '';
    body['pid'] = '';
    body['formIdentity'] = FormDisplayData.formIdentity;
    body['formName'] = FormDisplayData.formName;
    body['steps'] = [`${trimstepId}`];
    body[`${trimstepId}`] = {};
    body[`${trimstepId}`]['stepIdentity'] = FormDisplayData.stepIdentity;
    body[`${trimstepId}`][`section`] = [...sectionArr];
    body[`${trimstepId}`] = { ...StepDetails };

    if (props.paramsList && props.paramsList.length !== 0) {
      body['paramsList'] = props.paramsList;
    }
    return body;
  };

  const onDropDownChange = (value, regex, data) => {
    if (
      value !== '' &&
      data.linkDropDown &&
      data.linkedWorkFlowId &&
      data.linkedWorkflowName
    ) {
      LoadingSpin(true);
      if (data.linkDropDown && data.dropDownName !== '') {
        let obj = {};
        if (data.getFieldata) {
          let fieldValue = form.getFieldValue();

          obj[data.getFieldata] = fieldValue[data.getFieldata];
        }
        let Ebody = {},
          userName =
            localStorage.getItem('USER') &&
            JSON.parse(localStorage.getItem('USER')).sub,
          userRole = localStorage.getItem('roleId'),
          newVal = {};
        newVal[data.name] = value;
        newVal = { ...obj, ...newVal };
        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = data.linkedWorkFlowId;
        Ebody['formIdentity'] = FormDisplayData.formIdentity;
        Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
        Ebody['Values'] = { ...newVal };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            let step = stepList;
            let section = step[0].sectionlist,
              sectionArr = Object.keys(section);
            sectionArr.forEach((sec) => {
              return section[sec].arr.forEach((item) => {
                if (item.name === data.dropDownName) {
                  item.options = resp.data.dynamicText
                    ? resp.data.dynamicText
                    : [];
                }
              });
            });
            setStepList([...step]);
            let obj = {};
            obj[data.dropDownName] = '';
            form.setFieldsValue(obj);
            LoadingSpin(false);
          })
          .catch((err) => {
            setFieldStatus('error');
            setStatusId(data.name);
            LoadingSpin(false);
            if (err.response) {
              let Tecnotreeres = err.response.data
                ? err.response.data?.TecnotreeResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: (
                  <>
                    <Row>
                      <Col span={10}>
                        <b> Error Message : </b>{' '}
                      </Col>{' '}
                      <Col span={14}> {Tecnotreeres?.body} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b>status Code : </b>{' '}
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCode} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b> Status Code Value : </b>
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCodeValue} </Col>
                    </Row>
                  </>
                )
              });
            }
          });
      }
    }
  };

  const validateField = (val, regx, min, max, data) => {
    let validate = regx.test(val);
    if (validate && min <= max && val.length >= min && val.length <= max) {
      if (data.isApiData && data.workFlowId && data.workflowName) {
        setFieldStatus('validating');
        setStatusId(data.name);
        LoadingSpin(true, data.label);
        let userName =
            localStorage.getItem('USER') &&
            JSON.parse(localStorage.getItem('USER')).sub,
          userRole = localStorage.getItem('roleId'),
          Ebody = {},
          newVal = {};
        newVal[data.name] = val;

        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = data.workFlowId;
        Ebody['formIdentity'] = FormDisplayData.formIdentity;
        Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
        Ebody['Values'] = { ...newVal };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            if (resp.data.notification) {
              if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'popup'
              ) {
                setFieldStatus(resp.data.notification.status);
                setStatusId(data.name);
                let tempData = [];
                for (let object in resp.data.notification) {
                  if (object.startsWith('*')) {
                    let temp = {
                      label: object.substring(1),
                      value: resp.data.notification[object]
                    };
                    tempData.push(temp);
                  }
                }
                if (resp.data.taskType === 'Hold') {
                  let temp = {
                    label: 'Resume on',
                    value: resp.data.hold.resumeOn
                      ? resp.data.hold.resumeOn
                      : ''
                  };
                  tempData.push(temp);
                }
                let finalData = {
                  notification: resp.data.notification,
                  fieldData: tempData
                };
                setPopupData(finalData);
                LoadingSpin(false);
                setShowBlacklistModal(true);
              } else if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populate'
              ) {
                setFieldStatus(resp.data.notification.status);

                form.setFieldsValue(resp.data.notification);

                LoadingSpin(false);
              } else {
                if (resp.data.notification.status === 'success') {
                  setFieldStatus('success');
                  message.success(resp.data.notification.message, 1);
                  // LoadingSpin(false)
                  setStatusId(data.name);
                } else {
                  setFieldStatus('error');
                  message.error(resp.data.notification.message, 1);
                  // LoadingSpin(false)
                  setStatusId(data.name);
                }
              }
            } else {
              setFieldStatus('success');
              LoadingSpin(false);
              setStatusId(data.name);
            }
          })
          .catch((err) => {
            setFieldStatus('error');
            LoadingSpin(false);
            setStatusId(data.name);

            if (err.response) {
              let Tecnotreeres = err.response.data
                ? err.response.data?.TecnotreeResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: (
                  <>
                    <Row>
                      <Col span={10}>
                        <b> Error Message : </b>{' '}
                      </Col>{' '}
                      <Col span={14}> {Tecnotreeres?.body} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b>status Code : </b>{' '}
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCode} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b> Status Code Value : </b>
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCodeValue} </Col>
                    </Row>
                  </>
                )
              });
            }
          });
      }
    }
  };

  const onSwitchTrigger = (value, regex, data) => {
    let val = value;
    if (value) {
      if (data.isApiData && data.workFlowId && data.workflowName) {
        setFieldStatus('validating');
        setStatusId(data.name);
        LoadingSpin(true, data.label);
        let userName =
          localStorage.getItem('USER') &&
          JSON.parse(localStorage.getItem('USER')).sub;
        let userRole = localStorage.getItem('role');
        let Ebody = {};
        let newVal = {};
        newVal[data.name] = val;
        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = data.workFlowId;
        Ebody['formIdentity'] = FormDisplayData.formIdentity;
        Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
        Ebody['Values'] = { ...newVal };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            if (resp.data.notification) {
              if (resp.data.notification.status === 'success') {
                setFieldStatus('success');
                message.success(resp.data.notification.message, 1);
                // LoadingSpin(false)
                setStatusId(data.name);
              } else {
                setFieldStatus('error');
                message.error(resp.data.notification.message, 1);
                // LoadingSpin(false)
                setStatusId(data.name);
              }
            } else {
              setFieldStatus('success');
              LoadingSpin(false);
              setStatusId(data.name);
            }
          })
          .catch((err) => {
            setFieldStatus('error');
            LoadingSpin(false);
            setStatusId(data.name);

            if (err.response) {
              let Tecnotreeres = err.response.data
                ? err.response.data?.TecnotreeResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: (
                  <>
                    <Row>
                      <Col span={10}>
                        <b> Error Message : </b>{' '}
                      </Col>{' '}
                      <Col span={14}> {Tecnotreeres?.body} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b>status Code : </b>{' '}
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCode} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b> Status Code Value : </b>
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCodeValue} </Col>
                    </Row>
                  </>
                )
              });
            }
          });
      }
    } else {
      setFieldStatus('');
      LoadingSpin(false);
      setStatusId('');
    }
  };

  const onInputChange = (value, regex, data, fieldType) => {
    let val = value,
      regx = new RegExp(regex),
      min = parseInt(data.min),
      max = parseInt(data.max);
    if (
      fieldType === 'text' ||
      fieldType === 'number' ||
      fieldType === 'email' ||
      fieldType === 'password'
    ) {
      validateField(val, regx, min, max, data);
    }
  };

  const onRadioChange = (value, regex, data, fieldType) => {
    let val = value;

    if (value) {
      if (data.isApiData && data.workFlowId && data.workflowName) {
        setFieldStatus('validating');
        setStatusId(data.name);
        LoadingSpin(true, data.label);
        let userName =
          localStorage.getItem('USER') &&
          JSON.parse(localStorage.getItem('USER')).sub;
        let userRole = localStorage.getItem('role');
        let Ebody = {};
        let newVal = {};
        newVal[data.name] = val;
        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = data.workFlowId;
        Ebody['formIdentity'] = FormDisplayData.formIdentity;
        Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
        Ebody['Values'] = { ...newVal };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            if (resp.data.notification) {
              if (resp.data.notification.status === 'success') {
                setFieldStatus('success');
                message.success(resp.data.notification.message, 1);
                // LoadingSpin(false)
                setStatusId(data.name);
              } else {
                setFieldStatus('error');
                message.error(resp.data.notification.message, 1);
                // LoadingSpin(false)
                setStatusId(data.name);
              }
            } else {
              setFieldStatus('success');
              LoadingSpin(false);
              setStatusId(data.name);
            }
          })
          .catch((err) => {
            setFieldStatus('error');
            LoadingSpin(false);
            setStatusId(data.name);
            if (err.response) {
              let Tecnotreeres = err.response.data
                ? err.response.data?.TecnotreeResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: (
                  <>
                    <Row>
                      <Col span={10}>
                        <b> Error Message : </b>{' '}
                      </Col>{' '}
                      <Col span={14}> {Tecnotreeres?.body} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b>status Code : </b>{' '}
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCode} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b> Status Code Value : </b>
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCodeValue} </Col>
                    </Row>
                  </>
                )
              });
            }
          });
      }
    } else {
      setFieldStatus('');
      LoadingSpin(false);
      setStatusId('');
    }
  };

  const onCheckBoxChange = (value, data) => {
    let val = value;

    if (val.length > 0) {
      if (data.isApiData && data.workFlowId && data.workflowName) {
        setFieldStatus('validating');
        setStatusId(data.name);
        LoadingSpin(true, data.label);
        let userName =
          localStorage.getItem('USER') &&
          JSON.parse(localStorage.getItem('USER')).sub;
        let userRole = localStorage.getItem('role');
        let Ebody = {};
        let newVal = {};
        newVal[data.name] = val;
        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = data.workFlowId;
        Ebody['formIdentity'] = FormDisplayData.formIdentity;
        Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
        Ebody['Values'] = { ...newVal };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            setFieldStatus('success');
            LoadingSpin(false);
            setStatusId(data.name);
          })
          .catch((err) => {
            setFieldStatus('error');
            LoadingSpin(false);
            setStatusId(data.name);
            if (err.response) {
              let Tecnotreeres = err.response.data
                ? err.response.data?.TecnotreeResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: (
                  <>
                    <Row>
                      <Col span={10}>
                        <b> Error Message : </b>{' '}
                      </Col>{' '}
                      <Col span={14}> {Tecnotreeres?.body} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b>status Code : </b>{' '}
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCode} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b> Status Code Value : </b>
                      </Col>{' '}
                      <Col> {Tecnotreeres?.statusCodeValue} </Col>
                    </Row>
                  </>
                )
              });
            }
          });
      }
    } else {
      setFieldStatus('');
      LoadingSpin(false);
      setStatusId('');
    }
  };

  const onMultiDropDownChange = (value, regex, data) => {
    let val = value;
    if (val.length > 0) {
      if (
        data.linkDropDown &&
        data.linkedWorkFlowId &&
        data.linkedWorkflowName
      ) {
        LoadingSpin(true);
        if (data.linkDropDown && data.dropDownName !== '') {
          let Ebody = {},
            userName =
              localStorage.getItem('USER') &&
              JSON.parse(localStorage.getItem('USER')).sub,
            userRole = localStorage.getItem('roleId'),
            newVal = {};
          newVal[data.name] = value;
          Ebody['username'] = userName.sub;
          Ebody['userId'] = localStorage.getItem('signinId');
          Ebody['userRole'] = userRole;
          Ebody['executionModeStatus'] = false;
          Ebody['async'] = false;
          Ebody['workflowId'] = data.linkedWorkFlowId;
          Ebody['formIdentity'] = FormDisplayData.formIdentity;
          Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
          Ebody['Values'] = { ...newVal };
          Ebody['Values']['username'] = userName;
          Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
          Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
          TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
            .then((resp) => {
              let step = stepList;
              let section = step[0].sectionlist,
                sectionArr = Object.keys(section);
              sectionArr.forEach((sec) => {
                return section[sec].arr.forEach((item) => {
                  if (item.name === data.dropDownName) {
                    item.options = resp.data.dynamicText
                      ? resp.data.dynamicText
                      : [];
                  }
                });
              });
              setStepList([...step]);
              let obj = {};
              obj[data.dropDownName] = '';
              form.setFieldsValue(obj);
              LoadingSpin(false);
            })
            .catch((err) => {
              setFieldStatus('error');
              setStatusId(data.name);
              LoadingSpin(false);
              if (err.response) {
                let Tecnotreeres = err.response.data
                  ? err.response.data?.TecnotreeResponse
                  : {};
                Modal.error({
                  className: 'modal-error-content',
                  title: 'This is an error message',
                  content: (
                    <>
                      <Row>
                        <Col span={10}>
                          <b> Error Message : </b>{' '}
                        </Col>{' '}
                        <Col span={14}> {Tecnotreeres?.body} </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          {' '}
                          <b>status Code : </b>{' '}
                        </Col>{' '}
                        <Col> {Tecnotreeres?.statusCode} </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          {' '}
                          <b> Status Code Value : </b>
                        </Col>{' '}
                        <Col> {Tecnotreeres?.statusCodeValue} </Col>
                      </Row>
                    </>
                  )
                });
              }
            });
        }
      }
    } else {
      setFieldStatus('');
      LoadingSpin(false);
      setStatusId('');
    }
  };

  const onDynamicBtnClick = (btnData) => {
    setClickedButtonData(btnData);
    if (btnData.buttonType === 'cancel') {
      props.onClose();
    }
  };

  const validateSection = async (errorFields) => {
    let tempData = stepList;
    let temp = {};
    let finalObj = {};
    if (errorFields) {
      for (let i in tempData[0].sectionlist) {
        for (let k = 0; k < errorFields.errorFields.length; k++) {
          let found = await tempData[0].sectionlist[i].arr.find(
            (element) => element.name === errorFields.errorFields[k].name[0]
          );
          if (found) {
            temp[tempData[0].sectionlist[i].sectiontitle] =
              tempData[0].sectionlist[i].sectiontitle;
            finalObj = { ...temp, ...finalObj };
            break;
          }
        }
      }
    }
    return finalObj;
  };

  // const currentError = {
  //   "section1":"section1"
  // }

  const onFinishFailed = (errorFields) => {
    if (clickedButtonData && clickedButtonData.buttonType === 'cancel') {
      history.push('/');
      return;
    }
    validateSection(errorFields).then((resp) => {
      setCurrentError(resp);
    });
  };

  const onTrriggerBtnClick = (data, sectionTitle, sectionIndex) => {
    let val = '';
    if (data.isApiData && data.workFlowId && data.workflowName) {
      setFieldStatus('validating');
      setStatusId(data.name);
      LoadingSpin(true, data.label);
      let userName =
        localStorage.getItem('USER') &&
        JSON.parse(localStorage.getItem('USER')).sub;
      let userRole = localStorage.getItem('role');
      let Ebody = {};
      let newVal = {};
      newVal[data.name] = val;
      Ebody['username'] = userName.sub;
      Ebody['userId'] = localStorage.getItem('signinId');
      Ebody['userRole'] = userRole;
      Ebody['executionModeStatus'] = false;
      Ebody['async'] = false;
      Ebody['workflowId'] = data.workFlowId;
      Ebody['formIdentity'] = FormDisplayData.formIdentity;
      Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
      Ebody['Values'] = { ...newVal };
      Ebody['Values']['username'] = userName;
      Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
      Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
      TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
        .then((resp) => {
          if (resp.data.notification) {
            if (
              resp.data.notification.typeofResponse &&
              resp.data.notification.typeofResponse === 'popup'
            ) {
              // setFieldStatus(resp.data.notification.status)
              // setStatusId(resp.data.name)
              let tempData = [];
              for (let object in resp.data.notification) {
                if (object.startsWith('*')) {
                  let temp = {
                    label: object.substring(1),
                    value: resp.data.notification[object]
                  };
                  tempData.push(temp);
                }
              }
              if (resp.data.taskType === 'Hold') {
                let temp = {
                  label: 'Resume on',
                  value: resp.data.hold.resumeOn ? resp.data.hold.resumeOn : ''
                };
                tempData.push(temp);
              }
              let finalData = {
                notification: resp.data.notification,
                fieldData: tempData
              };
              setPopupData(finalData);
              LoadingSpin(false);
              setShowBlacklistModal(true);
            } else if (
              resp.data.notification.typeofResponse &&
              resp.data.notification.typeofResponse === 'populate'
            ) {
              setFieldStatus(resp.data.notification.status);

              form.setFieldsValue(resp.data.notification);

              LoadingSpin(false);
            } else {
              if (resp.data.notification.status === 'success') {
                setFieldStatus('success');
                message.success(resp.data.notification.message, 1);
                // LoadingSpin(false)
                setStatusId(resp.data.name);
              } else {
                setFieldStatus('error');
                message.error(resp.data.notification.message, 1);
                // LoadingSpin(false)
                setStatusId(resp.data.name);
              }
            }
          }
        })
        .catch((err) => {
          setFieldStatus('error');
          LoadingSpin(false);
          setStatusId(data.name);
          if (err.response) {
            let apires = err.response.data
              ? err.response.data?.apiResponse
              : {};
            Modal.error({
              className: 'modal-error-content',
              title: 'This is an error message',
              content: (
                <>
                  <Row>
                    <Col span={10}>
                      <b> Error Message : </b>{' '}
                    </Col>{' '}
                    <Col span={14}> {apires?.body} </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      {' '}
                      <b>status Code : </b>{' '}
                    </Col>{' '}
                    <Col> {apires?.statusCode} </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      {' '}
                      <b> Status Code Value : </b>
                    </Col>{' '}
                    <Col> {apires?.statusCodeValue} </Col>
                  </Row>
                </>
              )
            });
          }
        });
    } else if (data.buttonType === 'onClick') {
      if (data.methodType === 'POST') {
        let body = taskResponse.values ? taskResponse.values : {};
        TecnotreedigitalSales.post(data.Api, body)
          .then((resp) => {})
          .catch((err) => {});
      }
    } else if (data.buttonType === 'sectionAdd') {
      if (data.sectionName) {
        try {
          let tempdata = _.cloneDeep(stepList[0]),
            tempDataMerge = { ...stepList[0] },
            selectedArr = [],
            time = new Date().getTime();
          time = time % 10000;

          tempdata.column.forEach((sec) => {
            let sectn = tempdata.sectionlist[sec];

            if (sectn.sectionName === data.sectionName) {
              selectedArr = [...sectn.arr];
            }
          });

          let arrSelect = selectedArr.map((item) => {
            item.name = `${item.name}_${sectionCount}`;
            item['value'] = '';
            item['defaultValue'] = '';
            item['disableField'] = false;
            item['editable'] = false;
            return item;
          });

          let indx = tempdata.column.indexOf(sectionIndex);

          tempDataMerge.column.splice(indx, 0, `section${time}`);
          let arr = [];
          arr.push(`section${time}`);
          let section = {};
          section['arr'] = [...arrSelect];
          section['sectiontitle'] = `${data.sectionName}_${sectionCount}`;
          section['sectionName'] = `${data.sectionName}_${sectionCount}`;
          section['isDelete'] = true;
          arr.push(section);

          let keyValues = Object.entries(tempDataMerge.sectionlist);
          keyValues.splice(indx, 0, arr);

          let newObj = Object.fromEntries(keyValues);

          tempDataMerge.sectionlist = { ...newObj };

          setCount((prev) => prev + 1);
          setStepList([tempDataMerge]);
          // setSectionTrigger(true);
          setSectionTitle(data.sectionName);
          // setSectionModal(false)
        } catch (ery) {
          let error = 'err';
        }
      }
    }
  };

  const onRecursiveLimitChange = (value) => {
    let step = stepList[0];
    step.stepProperties.RecursiveLimit = value;

    setStepList([step]);
  };

  const handleOk = () => {
    setModalVisibal(false);
  };

  const handleCancel = () => {
    setModalVisibal(false);
  };

  const onSearchFetcher = (str, regex, data) => {
    let val = str,
      regx = new RegExp(regex),
      min = parseInt(data.min),
      max = parseInt(data.max),
      validate = regx.test(val);

    if (validate && min <= max && val.length >= min && val.length <= max) {
      if (data.isApiData && data.workFlowId && data.workflowName) {
        setSearchOptions([]);
        setFetching(true);
        let Ebody = {},
          userName =
            localStorage.getItem('USER') &&
            JSON.parse(localStorage.getItem('USER')).sub,
          userRole = localStorage.getItem('roleId'),
          newVal = {};
        newVal[data.name] = val;
        Ebody['username'] = userName.sub;
        Ebody['userId'] = localStorage.getItem('signinId');
        Ebody['userRole'] = userRole;
        Ebody['executionModeStatus'] = false;
        Ebody['async'] = false;
        Ebody['workflowId'] = data.workFlowId;
        Ebody['formIdentity'] = FormDisplayData.formIdentity;
        Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
        Ebody['Values'] = { ...newVal };
        Ebody['Values']['username'] = userName;
        Ebody['Values']['merchantId'] = '123456';
        Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
        TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
          .then((resp) => {
            let arr = [],
              searchObj = { ...searchOptions };
            if (resp.data.dynamicText) {
              arr = resp.data.dynamicText;
            }

            searchObj[data.name] = [...arr];

            setSearchOptions(searchObj);
            setFetching(false);
            // setFieldStatus('success');
            // setStatusId(data.name);
          })
          .catch((err) => {
            setFieldStatus('error');
            setStatusId(data.name);
            LoadingSpin(false);
            setFetching(false);
            if (err.response) {
              let apires = err.response.data
                ? err.response.data?.apiResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: (
                  <>
                    <Row>
                      <Col span={10}>
                        <b> Error Message : </b>{' '}
                      </Col>{' '}
                      <Col span={14}> {apires?.body} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b>status Code : </b>{' '}
                      </Col>{' '}
                      <Col> {apires?.statusCode} </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {' '}
                        <b> Status Code Value : </b>
                      </Col>{' '}
                      <Col> {apires?.statusCodeValue} </Col>
                    </Row>
                  </>
                )
              });
            }
          });
      }
    }
  };

  const onSearchSelected = (value, data) => {
    if (
      data.isSearchSelect &&
      data.isSearchworkFlowId &&
      data.isSearchworkFlowName
    ) {
      LoadingSpin(true);
      setFetching(true);
      let Ebody = {},
        userName =
          localStorage.getItem('USER') &&
          JSON.parse(localStorage.getItem('USER')).sub,
        userRole = localStorage.getItem('roleId'),
        newVal = {};
      newVal[data.name] = value;
      Ebody['username'] = userName.sub;
      Ebody['userId'] = localStorage.getItem('signinId');
      Ebody['userRole'] = userRole;
      Ebody['executionModeStatus'] = false;
      Ebody['async'] = false;
      Ebody['workflowId'] = data.isSearchworkFlowId;
      Ebody['formIdentity'] = FormDisplayData.formIdentity;
      Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
      Ebody['Values'] = { ...newVal };
      Ebody['Values']['username'] = userName;
      Ebody['Values']['merchantId'] = '1234556';
      Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
      TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
        .then((resp) => {
          let respData = resp.data.outputArray[data.outputServiceKey]
            ? resp.data.outputArray[data.outputServiceKey]
            : {};
          respData = respData ? JSON.parse(respData) : {};
          let obj = { ...searchResp };
          obj[data.name] = respData[0] ? respData[0] : {};
          //  setSearchResp(obj);

          if (obj?.Search && obj?.Search?.settlementRuleCode) {
            setSearchResp(obj);
            // setSearchResp({ Search: Utils.getFetchdetails(obj, location) });
          } else if (obj?.Commission_Rule) {
            setSearchResp(obj);
          }
          // setSearchResp(obj);

          // setFieldStatus('success');
          // setStatusId(data.name);
          setFetching(false);

          LoadingSpin(false);
        })
        .catch((err) => {
          setFieldStatus('error');
          setStatusId(data.name);
          setFetching(false);
          LoadingSpin(false);
          if (err.response) {
            let apires = err.response.data
              ? err.response.data?.apiResponse
              : {};
            Modal.error({
              className: 'modal-error-content',
              title: 'This is an error message',
              content: (
                <>
                  <Row>
                    <Col span={10}>
                      <b> Error Message : </b>{' '}
                    </Col>{' '}
                    <Col span={14}> {apires?.body} </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      {' '}
                      <b>status Code : </b>{' '}
                    </Col>{' '}
                    <Col> {apires?.statusCode} </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      {' '}
                      <b> Status Code Value : </b>
                    </Col>{' '}
                    <Col> {apires?.statusCodeValue} </Col>
                  </Row>
                </>
              )
            });
          }
        });
    }
  };

  return (
    <Buttonsheet
      open={props.open}
      title={'Edit'}
      onClose={props.onClose}
      heightvalue={'60vh'}
    >
      <div className="card-container">
        {isEmpty ? (
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="column"
            spacing="6"
          >
            <Grid item>
              <CircularProgress color="primary" size={50} />
            </Grid>
            <Grid item>
              <Typography variant="h2">Loading ...</Typography>
            </Grid>
          </Grid>
        ) : (
          <>
            <Form
              {...layout}
              form={form}
              name={ListOfTabs[currentTab]}
              scrollToFirstError
              onFinish={onFormFinish}
              onFinishFailed={onFinishFailed}
            >
              {stepList[0] && stepList[0].customStep ? (
                <></>
              ) : (
                <>
                  <FreeStep
                    stepList={stepList}
                    buttonLoader={buttonLoader.value}
                    currentError={currentError}
                    onInputChange={onInputChange}
                    onDropDownChange={onDropDownChange}
                    onSwitchTrigger={onSwitchTrigger}
                    onRadioChange={onRadioChange}
                    onCheckBoxChange={onCheckBoxChange}
                    onMultiDropDownChange={onMultiDropDownChange}
                    fieldStatus={fieldStatus}
                    statusId={statusId}
                    onRegNumberClick={onRegNumberClick}
                    onDynamicBtnClick={onDynamicBtnClick}
                    onTrriggerBtnClick={onTrriggerBtnClick}
                    onDeleteSection={onDeleteSection}
                    onCloseModal={props.onClose}
                    type={
                      location.state &&
                      location.state.type &&
                      location.state.type === 'userProfile'
                        ? 'userProfile'
                        : ''
                    }
                    onSearchFetcher={onSearchFetcher}
                    fetching={fetching}
                    searchOptions={searchOptions}
                    onSearchSelected={onSearchSelected}
                    searchResp={searchResp}
                    formRef={form}
                    docsInfo={docsInfo}
                    partnerDetails={props.partnerDetails}
                  />
                </>
              )}
            </Form>
          </>
        )}
      </div>
    </Buttonsheet>
  );
}

const mapStateToProps = (state) => ({
  userDetails: state.setExistingUserReducer.existingUser,
  CustomMidJson: state.getMIDCollection.CustomMidJson,
  captureData: state.setCaptureReducer.dataUri
});

export default BottomModalForm;
