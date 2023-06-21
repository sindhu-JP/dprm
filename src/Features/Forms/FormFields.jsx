import React, { useState, useEffect } from 'react';
import {
  DPRM_DMS,
  getaccessToken,
  TecnotreedigitalSales,

  TecnotreeAgentManagement
} from '../../Http/axios';
import moment from 'moment';
import './FormFields.scss';
import * as _ from 'lodash';
import { LoadingSpin } from './LoadingSpin';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { Form, Button, Col, Row, Steps, Modal, message, Empty } from 'antd';
import Alert from 'Store/Alert';
import UtilsOpco from './UtilsOpco/OpcoIdentifier';
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
import FreeStep from './FreeStep';
// import Customstep from "../CustomStep/Customstep";
import { useLocation } from 'react-router-dom';
// import BulkUpload from "../BulkUpload/BulkUpload";
import config from 'config';
import PartnerLayout from '../../Layouts/Partner';
import CompanyDetails from './CompanyDetails';
import { useDispatch } from 'react-redux';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { useBoolean, useStateful } from 'react-hanger';
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

function FormFields(props) {
  let location = useLocation();
  const dispatch = useDispatch();
  const [stepList, setStepList] = useState([]);
  const [form] = Form.useForm();
  // const [sectionaddTrigger, setSectionTrigger] = useState(false);
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
  const [showAgentSuccess, setShowAgentSuccess] = useState(false);
  const [formType, setFormType] = useState('');
  const [FormDisplayData, setFormData] = useState([]);
  const [modalVisible, setModalVisibal] = useState(false);
  const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
  const [taskResponse, setTaskResponse] = useState({});
  const [formnaveInfo, setFormnaveInfo] = useState('');
  const [searchResp, setSearchResp] = useState({});
  const [searchCommissionResp, setSearchCommissionResp] = useState({});
  const [searchSettelementResp, setSearchSettelementResp] = useState({});
  const [fetching, setFetching] = useState(false);
  const [searchOptions, setSearchOptions] = useState({});
  const [docsInfo, setDocsInfo] = useState({});
  const buttonLoader = useBoolean(false);
  const [agentId, setAgentId] = useState('');
  const [agentid, setagentId] = useState(null)
  const PartnerDetails = useStateful({});
  const [loading, setLoading] = useState(false)
  console.log(location.state, form, 'vvvvvvvvv', location.state?.selfcarePartnerObj?.PartnerProfileCreation?.UploadDocuments?.KYC_DOCUMENTS  );
  let fields = location.state?.isFields ? location.state?.fields : [];

  const handleAgentOk = () => {
    setModalVisibal(true);
  };

  const handleAgentCancel = () => {
    setModalVisibal(false);
  };
  const handleProced = () => {
    //setModalVisibal(false);
    // setShowAgentSuccess(false);
    history.push('/');

    window.open(
      `${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`,
      '_blank'
    );
  };

  useEffect(() => {
    if (props.formName) {
      TecnotreedigitalSales.get(
        `/formnav/${props.formName ? props.formName : 'LeadInfo'}`
      )
        .then((resp) => {
          setFormnaveInfo(resp.data);
          let Tabs = Object.keys(resp.data.stepIdentity),
            list = resp.data.stepIdentity,
            Tabname = '';

          Tabs.sort((a, b) => list[a].formStepNo - list[b].formStepNo);
          Tabname = Tabs[currentTab];
          setTotalTab(Tabs.length);
          setTabList(Tabs);
          if (Tabname) {
            TecnotreedigitalSales.get(
              `/step?formIdentity=${props.formName ? props.formName : 'LeadInfo'
              }&stepIdentity=${Tabname}`
            )
              .then(async (response) => {
                if (response) {
                  await formatFormField(response.data).then((result) => {
                    LoadingSpin(false);
                    setStepList([result]);
                    getPartnerId([result]);
                  });
                }
              })
              .catch((err) => {
                LoadingSpin(false);
                message.error('error fetching data');
                // history.push('/');
              });
          } else {
            LoadingSpin(false);
            setIsEmpty(true);
          }
        })
        .catch((err) => {
          message.error('error fetching data');
          // history.push('/');
        });
    }
  }, [props]);

  useEffect(() => {
    console.log('loading updated', loading)
  }, [loading])


  console.log(location?.state?.selfcarePartnerObj, 'kkkkkiiijijj');
  console.log(location?.state?.agentForm, 'chhenenenenn')
  useEffect(() => {
    if (location.state && location.state.formIdentity) {
      // let payload;
      // if (location.state.isFields && location.state.fields) {
      // } else {
      //   payload = {
      //     formIdentity: `Partner_Profile`,
      //     stepIdentity: `PartnerProfileCreation`,
      //     fields: location.state.fields
      //   };
      // }

      let payload = {
        formIdentity: location.state.formIdentity,
        stepIdentity: location.state.stepId,
        fields
      };

      let fieldValue = [];
      let prefillValue = [];
      LoadingSpin(true);

      if (location.state.agentForm) {
        TecnotreedigitalSales.get(
          `/formnav/${location.state.formIdentity
            ? location.state.formIdentity
            : 'CaptureLeadInfo'
          }`
        )
          .then((resp) => {
            setFormnaveInfo(resp.data);
            let Tabs = Object.keys(resp.data.stepIdentity),
              list = resp.data.stepIdentity,
              Tabname = '';
            Tabs.sort((a, b) => list[a].formStepNo - list[b].formStepNo);
            Tabname = Tabs[currentTab];
            setTotalTab(Tabs.length);
            setTabList(Tabs);
            if (Tabname) {
              // TecnotreedigitalSales.post(`/stepvalue`, payload)
              TecnotreedigitalSales.get(
                `/step?formIdentity=${location.state.formIdentity
                  ? location.state.formIdentity
                  : 'CaptureLeadInfo'
                }&stepIdentity=${Tabname}`
              )

                .then(async (asyncResp) => {
                  if (asyncResp) {
                    setFormData(asyncResp.data[0]);
                    await formatFormField(asyncResp.data).then((result) => {
                      console.log("xpantialte, ", result)
                      LoadingSpin(false);
                      setStepList([result]);
                      fieldValue = result.fields;

                      console.log(fieldValue, 'KIEKIE')
                    });
                    if (location.state.agentForm) {
                      form.setFieldsValue({
                        ['CREDIT_DAYS']:
                          location?.state?.riskCategory?.creditDays
                      });
                      form.setFieldsValue({
                        ['CREDIT_LIMIT']:
                          location?.state?.riskCategory?.creditLimit
                      });
                      form.setFieldsValue({
                        ['RISK_CATEGORY']: location?.state?.riskCategory?.risk
                      });
                      let agentFirstname = {
                        ['FIRST_NAME']: location?.state?.formFields?.agentName
                      };
                      form.setFieldsValue(agentFirstname);

                      let agentLastname = {
                        ['LAST_NAME']:
                          location?.state?.formFields?.agentLastName
                      };
                      form.setFieldsValue(agentLastname);

                      let category = {
                        ['CATEGORY']: location.state.formFields.agentCategory
                      };
                      form.setFieldsValue(category);
                      let subcategory = {
                        ['SUB_CATEGORY']:
                          location.state.formFields.agentSubCategory
                      };
                      form.setFieldsValue(subcategory);
                      let niidOrPassport = {
                        ['NIID/PASSPORT/REFUGEE_ID_NUMBER']:
                          location.state.formFields.NID_passport_refugee_Id
                      };
                      form.setFieldsValue(niidOrPassport);
                      let agentMSISDN = {
                        ['AGENT_MOBILE_NUMBER']: location.state.formFields.agentMSISDN
                      };
                      form.setFieldsValue(agentMSISDN);
                      let agentEmail = {
                        ['EMAIL']: location.state.formFields.email
                      };
                      form.setFieldsValue(agentEmail);
                    }

                    if (location.state.isFields === true) {
                      let partnerName;
                      let partnerRegNo;
                      let primayName;
                      let primayEmail;
                      let primayMobileNo;
                      let partnerCategory;
                      let partnerSubCategory;
                      fieldValue.map((item) => {
                        let keys = item.name;
                        let value = item.value;
                        if (item.name === 'PARTNER_NAME') {
                          partnerName = {
                            [keys]: value,
                            editable: false
                          };

                          form.setFieldsValue(partnerName);
                        } else if (
                          item.name === 'PARTNER_REGISTRATION_NUMBER'
                        ) {
                          partnerRegNo = {
                            [keys]: value,
                            editable: false
                          };
                          form.setFieldsValue(partnerRegNo);
                        } else if (item.name === 'PRIMARY_CONTACT_NAME') {
                          primayName = {
                            [keys]: value,
                            editable: false
                          };
                          form.setFieldsValue(primayName);
                        } else if (item.name === 'EMAIL_ID') {
                          primayEmail = {
                            [keys]: value,
                            editable: false
                          };
                          form.setFieldsValue(primayEmail);
                        } else if (item.name === 'MOBILE_NUMBER') {
                          primayMobileNo = {
                            [keys]: value,
                            editable: false
                          };
                          form.setFieldsValue(primayMobileNo);
                        } else if (item.name === 'PARTNER_TYPE') {
                          form.setFieldsValue({
                            [keys]: value,
                            editable: false
                          });
                        } else if (item.name === 'PARTNER_SUB_TYPE') {
                          form.setFieldsValue({
                            [keys]: value,
                            editable: false
                          });
                        }
                      });
                    } else {
                      const UploadRes_Parser = async (data) => {
                        const obj = Object.assign({}, data);

                        // obj.UploadDocuments = {
                        //   COMPANY_REGISTRATION: await Promise.all(
                        //     _.map(
                        //       obj.UploadDocuments.COMPANY_REGISTRATION,
                        //       async (item) => {
                        //         return {
                        //           ...item,
                        //           url: await getBlob(item)
                        //         };
                        //       }
                        //     )
                        //   )
                        // };

                        return obj;
                      };
                      console.log(
                        location?.state?.selfcarePartnerObj,
                        'kkkkkiiijijj'
                      );

                      const predata = await UploadRes_Parser(
                        location?.state?.selfcarePartnerObj
                          ?.PartnerProfileCreation ||
                        location?.state?.selfcarePartnerObj
                          ?.ResellerProfileCreation
                      );

                      if (predata) {
                        Object.keys(predata).map((section) => {
                          setDocsInfo(predata);
                          Object.keys(predata[section]).map((item) => {
                            form.setFieldsValue({
                              [item]: predata[section][item]
                            });
                          });
                        });
                      }
                    }

                    let managerDetails;
                    var retrievedObject = localStorage.getItem('USER');
                    var userName = JSON.parse(retrievedObject).sub;
                    let managerKey = 'NAME';
                    let managerName = userName;
                    managerDetails = {
                      [managerKey]: managerName
                    };
                    form.setFieldsValue(managerDetails);
                    let managerEmail;
                    var retrievedObj = localStorage.getItem('USER');
                    var email = JSON.parse(retrievedObj).email;
                    let managerEmailKey = 'MANAGER_EMAIL';
                    let managerEmailValue = email;
                    managerEmail = {
                      [managerEmailKey]: managerEmailValue
                    };
                    form.setFieldsValue(managerEmail);

                    let managerMobile;
                    var retrieved = localStorage.getItem('USER');
                    var mobile = JSON.parse(retrieved).mobile;
                    let managerMobileKey = 'MOBILE_NO';
                    let managerMobileValue = mobile;
                    managerMobile = {
                      [managerMobileKey]: managerMobileValue
                    };
                    form.setFieldsValue(managerMobile);

                    if (
                      location.state &&
                      location.state.type &&
                      location.state.type === 'userProfile'
                    ) {
                      let userData = location.state.userData;
                      form.setFieldsValue(userData);
                    }
                  }
                })
                .catch((err) => {
                  LoadingSpin(false);
                  // history.push('/');
                });
            } else {
              LoadingSpin(false);
              setIsEmpty(true);
            }
          })
          .catch((err) => {
            message.error('error fetching data', 1);
            // history.push('/');
          });

        TecnotreeAgentManagement.post('/partnership/generateId')
          .then((res) => {
            setAgentId(res?.data?.id);
            PartnerDetails.setValue({
              obj: { id: res?.data?.id },
              agent: true
              // partnerDetials: location?.state?.fields
            });
          })
          .catch((err) => { });
      } else {
        TecnotreedigitalSales.get(
          `/formnav/${location.state.formIdentity
            ? location.state.formIdentity
            : 'CaptureLeadInfo'
          }`
        )
          .then((resp) => {
            setFormnaveInfo(resp.data);
            let Tabs = Object.keys(resp.data.stepIdentity),
              list = resp.data.stepIdentity,
              Tabname = '';
            Tabs.sort((a, b) => list[a].formStepNo - list[b].formStepNo);
            Tabname = Tabs[currentTab];
            setTotalTab(Tabs.length);
            setTabList(Tabs);
            if (Tabname) {
              TecnotreedigitalSales.post(`/stepvalue`, payload)
                // TecnotreedigitalSales.get(
                //   `/step?formIdentity=${
                //     location.state.formIdentity
                //       ? location.state.formIdentity
                //       : 'CaptureLeadInfo'
                //   }&stepIdentity=${Tabname}`
                // ) //Field_testing   123_testing  CaptureLeadInfo

                .then(async (asyncResp) => {
                  if (asyncResp) {
                    setFormData(asyncResp.data[0]);
                    await formatFormField(asyncResp.data).then((result) => {
                      LoadingSpin(false);
                      if(location.state?.selfcarePartnerObj?.PartnerProfileCreation?.UploadDocuments?.KYC_DOCUMENTS) {
                        result.sectionlist.section34.arr.push({
                          fId: 'multiupload',
                          instructions: '',
                          linkedTo: false,
                          max: '',
                          icon: 'fa fa-pencil-square-o',
                          autoFill: '',
                          tooltip: '',
                          formIdentity: '',
                          label: 'KYC DOCUMENTS',
                          type: 'multiUpload',
                          required: true,
                          errorMsg: '',
                          kyctype: [
                            {
                              checked: 'true',
                              id: '2',
                              label: '.pdf'
                            },
                            {
                              checked: 'false',
                              id: '4',
                              label: '.doc'
                            },
                            {
                              checked: 'true',
                              id: '6',
                              label: '.png'
                            },
                            {
                              checked: 'false',
                              id: '5',
                              label: '.docx'
                            },
                            {
                              checked: 'false',
                              id: '3',
                              label: '.csv'
                            },
                            {
                              checked: 'true',
                              id: '1',
                              label: '.jpeg'
                            }
                          ],
                          stepIdentity: '',
                          regex: '',
                          min: '',
                          name: 'KYC_DOCUMENTS',
                          placeholder: '',
                          id: '1625134151745',
                          value: '',
                          fieldType: 'Multi Upload',
                          order: 0
                        })
                      }
                
                      setStepList([result]);
                      console.log(result, "step results", )
                      fieldValue = result.fields;

                    });

                    if (location.state.isFields === true) {
                      location?.state?.fields?.map((item) => {
                        form.setFieldsValue({
                          [item.name]: item.value
                        });
                      });
                      let partnerName;
                      let partnerRegNo;
                      let primayName;
                      let primayEmail;
                      let primayMobileNo;
                      // fieldValue.map((item) => {
                      //   let keys = item.name;
                      //   let value = item.value;
                      //   if (item.name ='PARTNER_NAME') {
                      //     partnerName = {
                      //       [keys]: value,
                      //       editable: false
                      //     };

                      //     form.setFieldsValue(partnerName);
                      //   } else if (item.name ='PARTNER_REGISTRATION_NUMBER') {
                      //     partnerRegNo = {
                      //       [keys]: value,
                      //       editable: false
                      //     };
                      //     form.setFieldsValue(partnerRegNo);
                      //   } else if (item.name ='PRIMARY_CONTACT_NAME') {
                      //     primayName = {
                      //       [keys]: value,
                      //       editable: false
                      //     };
                      //     form.setFieldsValue(primayName);
                      //   } else if (item.name ='EMAIL_ID') {
                      //     primayEmail = {
                      //       [keys]: value,
                      //       editable: false
                      //     };
                      //     form.setFieldsValue(primayEmail);
                      //   } else if (item.name ='MOBILE_NUMBER') {
                      //     primayMobileNo = {
                      //       [keys]: value,
                      //       editable: false
                      //     };
                      //     form.setFieldsValue(primayMobileNo);
                      //   } else if (item.name ='PARTNER_TYPE') {
                      //     form.setFieldsValue({
                      //       ['PARTNER_TYPE']: value,
                      //       editable: false
                      //     });
                      //   } else if (item.name ='PARTNER_SUB_TYPE') {
                      //     form.setFieldsValue({
                      //       ['PARTNER_SUB_TYPE']: value,
                      //       editable: false
                      //     });
                      //   }
                      // });
                    } else {
                      const UploadRes_Parser = async (data) => {
                        const obj = Object.assign({}, data);

                        // obj.UploadDocuments = {
                        //   COMPANY_REGISTRATION: await Promise.all(
                        //     _.map(
                        //       obj.UploadDocuments.COMPANY_REGISTRATION,
                        //       async (item) => {
                        //         return {
                        //           ...item,
                        //           url: await getBlob(item)
                        //         };
                        //       }
                        //     )
                        //   )
                        // };

                        return obj;
                      };

                      const predata = await UploadRes_Parser(
                        location?.state?.selfcarePartnerObj
                          ?.PartnerProfileCreation ||
                        location?.state?.selfcarePartnerObj
                          ?.ResellerProfileCreation
                      );
                      if (predata) {
                        Object.keys(predata).map((section) => {
                          setDocsInfo(predata);
                          Object.keys(predata[section]).map((item) => {
                            form.setFieldsValue({
                              [item]: predata[section][item]
                            });
                          });
                        });
                      }
                    }
                    let managerDetails;
                    var retrievedObject = localStorage.getItem('USER');
                    var userName = JSON.parse(retrievedObject).sub;
                    let managerKey = 'NAME';
                    let managerName = userName;
                    managerDetails = {
                      [managerKey]: managerName
                    };
                    form.setFieldsValue(managerDetails);
                    let managerEmail;
                    var retrievedObjs = localStorage.getItem('USER');
                    var email = JSON.parse(retrievedObjs).email;
                    let managerEmailKey = 'MANAGER_EMAIL';
                    let managerEmailValue = email;
                    managerEmail = {
                      [managerEmailKey]: managerEmailValue
                    };
                    form.setFieldsValue(managerEmail);

                    let managerMobile;
                    var ret = localStorage.getItem('USER');
                    var mobile = JSON.parse(ret).mobile;
                    let managerMobileKey = 'MOBILE_NO';
                    let managerMobileValue = mobile;
                    managerMobile = {
                      [managerMobileKey]: managerMobileValue
                    };
                    form.setFieldsValue(managerMobile);

                    if (
                      location.state &&
                      location.state.type &&
                      location.state.type === 'userProfile'
                    ) {
                      let userData = location.state.userData;
                      form.setFieldsValue(userData);
                    }
                  }
                })
                .catch((err) => {
                  LoadingSpin(false);
                  // history.push('/');
                });
            } else {
              LoadingSpin(false);
              setIsEmpty(true);
            }
          })
          .catch((err) => {
            message.error('error fetching data', 1);
            // history.push('/');
          });
      }
    }
  }, [location.state && location.state.formIdentity]);

  useEffect(() => {
    let tabName = ListOfTabs[currentTab];
    if (currentTab < totalTab) {
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
  console.log(location?.state, location?.state?.formFields?.agentName, location?.state?.formFields?.agentLastName, "fields values")
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
    setCount((prev) => prev - 1);
    console.log("aseeredsdsds: ", stepList)
  };
  const DynamicAxios = () => {

    return TecnotreedigitalSales;

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
          Ebody['username'] = userName?.sub;
          Ebody['userId'] = '12356';
          Ebody['userRole'] = '123456';
          Ebody['executionModeStatus'] = false;
          Ebody['async'] = false;
          Ebody['workflowId'] = tempData.sectionlist[i].arr[j].workFlowId;
          Ebody['formIdentity'] = tempData.formIdentity;
          Ebody['stepIdentity'] = tempData.stepIdentity;
          Ebody['Values'] = {};
          Ebody['Values']['username'] = userName?.sub;
          Ebody['Values']['merchantId'] = '1234';
          Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');

          await DynamicAxios()
            .post('/bpmn/executeProcess', Ebody)

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
              `/submitstep?formIdentity=${tempData.sectionlist[i].arr[j].formIdentity}&stepIdentity=${stepId}&createdBy=${user.sub}&fieldName=${tempData.sectionlist[i].arr[j].name}`
            )
              .then((resp) => {
                tempData.sectionlist[i].arr[j].value =
                  resp.data.length > 0
                    ? resp.data[0][tempData.sectionlist[i].arr[j].name]
                    : '';
                form.setFieldsValue(resp.data[0]);
              })
              .catch((err) => (err) => { });
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
          location?.state?.agentForm
            ? await TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody).then((resp) => {

              console.log(resp?.data?.Values?.partnerRegId, "agentidxxx")
              setAgentId(resp?.data?.Values?.partnerRegId)
              let obj = {};
              obj[tempData.sectionlist[i].arr[j].name] =
                resp.data.notification[tempData.sectionlist[i].arr[j].name];
              form.setFieldsValue(obj);
              PartnerDetails.setValue({
                obj,
                partnerDetials: location?.state?.fields
              });
            }).catch((err) => {

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
            })
            : await TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
              .then((resp) => {


                let obj = {};
                obj[tempData.sectionlist[i].arr[j].name] =
                  resp.data.notification[tempData.sectionlist[i].arr[j].name];
                form.setFieldsValue(obj);
                PartnerDetails.setValue({
                  obj,
                  partnerDetials: location?.state?.fields
                });
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
    // PartnerDetails.setValue({ tempData });

    return tempData;
  };

  const triggerAPI = (
    body,
    FormDisplayData,
    userName,
    userRole,
    values,
    clickedButtonData
  ) => {
    const token = localStorage.getItem('ACCESS_TOKEN');



    // api/submitform

    buttonLoader.setTrue();
    if (!location?.state?.agentForm) {
      if (
        body?.PartnerProfileCreation?.EnrolmentCharges?.ONE_TIME_CHARGES === ''
      ) {
        body.PartnerProfileCreation.EnrolmentCharges.ONE_TIME_CHARGES = 0;
      }
      if (
        body.PartnerProfileCreation?.EnrolmentCharges?.RECURRING_CHARGES === ''
      ) {
        body.PartnerProfileCreation.EnrolmentCharges.RECURRING_CHARGES = 0;
      }

      if (body.PartnerProfileCreation?.SettlementRuleDetails) {
        body.PartnerProfileCreation.SettlementRuleDetails.settlementCode =
          body.PartnerProfileCreation.SettlementRuleDetails.Search;
        delete body.PartnerProfileCreation.SettlementRuleDetails.Search;
      }
    }

    if (location?.state?.agentForm && body?.AGENT_PROFILE_CREATION?.AgentDetails?.agentId) {
      body.AGENT_PROFILE_CREATION.AgentDetails.agentId = agentId;
    }

    if(location?.state?.agentId) {
      console.log(body, "egergergegegre")
      if(body.ResellerProfileCreation?.DealerDetails) {
        body.ResellerProfileCreation.DealerDetails.Agent_ID = location?.state?.agentId
      }
     else if(body.ResellerProfileCreation?.SubDealerDetails) {
        body.ResellerProfileCreation.SubDealerDetails.Agent_ID = location?.state?.agentId
      }
      else if(body.ResellerProfileCreation?.SubDealerEmployeeDetails) {
        body.ResellerProfileCreation.SubDealerEmployeeDetails.Agent_ID = location?.state?.agentId
      }

      
    }
   


   

    DynamicAxios()
      .post('/submit', UtilsOpco.VerifyOpco(body, location?.state), {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((respn) => {
        console.log(respn, "resller obj")
        if (respn) {
          form.resetFields();
          LoadingSpin(false);
          setSearchResp({});
          if (FormDisplayData.workFlowId && FormDisplayData.workFlowName) {
            let Ebody = {};

            Ebody['username'] = userName?.sub;
            Ebody['userId'] = localStorage.getItem('signinId');
            Ebody['userRole'] = userRole;
            Ebody['executionModeStatus'] = false;
            Ebody['async'] = false;
            Ebody['workflowId'] = FormDisplayData.workFlowId;
            Ebody['formIdentity'] = FormDisplayData.formIdentity;
            Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
            Ebody['Values'] = {
              ...values,
              ...workflowPayload.returnWorkflowData(
                values.Partner_ID,
                values.EMAIL_ID,
                values.MOBILE_NUMBER,
                values.PARTNER_NAME,
                values.PRIMARY_CONTACT_NAME,
                ''
              )
            };
            if (location?.state?.agentForm) {
              Ebody['Values']['agentId'] = agentId;
              Ebody['Values']['id'] = agentId;
              Ebody['Values']['pId'] =  Loginuser?.id
            }
            Ebody['Values']['agentUserId']  = location.state?.agentUserId
            Ebody['Values']['Agent_ID'] = location.state?.agentId
            Ebody['Values']['AGENT_NAME'] = `${location?.state?.formFields?.agentName} ${location?.state?.formFields?.agentLastName}`,
              Ebody['Values']["reseller"] = respn?.data
            // Ebody['Values']["resellerMini"] = true
            if (location.state?.agentForm) {
              //dprm - false
              Ebody['Values']['resellerMini'] = false;
            } else {
              //selfcare - true
              Ebody['Values']['resellerMini'] = true;
            }

            if (!location?.state?.agentForm) {
              if (Ebody['Values']['ONE_TIME_CHARGES'] === '') {
                Ebody['Values']['ONE_TIME_CHARGES'] = 0;
              }

              if (location.state?.isFields) {
                //dprm - false
                Ebody['Values']['prePartner'] = false;
              } else {
                //selfcare - true
                Ebody['Values']['prePartner'] = true;
              }
              Ebody['Values']['settlementCode'] =
                body.PartnerProfileCreation?.SettlementRuleDetails?.settlementCode;
            }

            Ebody['Values']['loginId'] = localStorage.getItem('id');
            Ebody['Values']['username'] = userName;
            Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
            Ebody['Values']['accessToken'] =
              localStorage.getItem('ACCESS_TOKEN');
            Ebody['Values']['date'] = new Date();
            Ebody['Values']['userName'] = userName?.sub;
            Ebody['Values']['userId'] = Loginuser?.id;
            Ebody['Values']['subStatus'] = 'draft';
            Ebody['Values']['channel'] = 'DPRM';
            Ebody['Values']['dprmUser'] = location?.state?.agentForm
              ? true
              : false;
            DynamicAxios()
              .post('/bpmn/executeProcess', Ebody)
              .then((resp) => {
                if (resp.data?.notification?.approvalRequired === 'false') {
                  dispatch(
                    Alert.open({
                      type: 'success',
                      message: `${resp.data?.notification?.message}`
                    })
                  );
                  if(FormDisplayData.formIdentity === "Dealers" || FormDisplayData.formIdentity ===  "Sub-Dealer_Shop" || FormDisplayData.formIdentity === "Sub-Dealer_Employee") {
                   
                    history.push({
                      pathname: '/digital-prm-web-ui/hierarchy',
                      state: {
                        partnerId: location.state?.agentUserId
                       
                      }
                    });
                  }
                  else {
                    history.push('/');
                  }
                 
                  return;
                }
                // console.log(resp.data?.notification?.approvalRequired, "responsexxxx")
                // message.success(`Success`, 1);

                let taskType = resp.data.taskType;
                if (taskType === 'FormTask') {
                  resp.data.Values.formIdentity
                    ? setFormIdentity(resp.data.Values.formIdentity)
                    : '';
                  setShowFormtaskModal(true);
                  let parseData = JSON.parse(resp.data.taskResponse);
                  setTaskResponse(parseData);
                }

                else if (location?.state?.agentForm) {

                  // setFormType('agent');
                  // setShowAgentSuccess(true);


                  history.push({
                    pathname: '/digital-prm-web-ui/ContractSuccessPage',
                    details: resp.data
                  });

                  // window
                  //   .open(
                  //     `${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`,
                  //     '_blank'
                  //   )
                  //   .focus();
                }



                else {
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
                      // setShowBlacklistModal(true);
                    } else if (
                      resp.data.notification.typeofResponse &&
                      resp.data.notification.typeofResponse === 'populate'
                    ) {
                      setFieldStatus(resp.data.notification.status);

                      form.setFieldsValue(resp.data.notification);
                      buttonLoader.setFalse();
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
                    buttonLoader.setFalse();
                  }
                  if (clickedButtonData.buttonType === 'save') {
                    let url = clickedButtonData.redirectUrl,
                      check = url ? url.includes('https://') : false;

                    if (check) {
                      window.location.replace(url);
                    } else if (clickedButtonData.redirectForm) {
                      props.history.push({
                        pathname: `${config.basePath}formSubmission`,
                        state: {
                          formIdentity: clickedButtonData.redirectForm
                        }
                      });
                    }

                    buttonLoader.setFalse();
                    setCurrentError({});
                  } else if (clickedButtonData.buttonType === 'proceed') {
                    setCurrentError({});
                    setCurrentTab(currentTab + 1);
                  }
                  // message.success(
                  //   `${
                  //     props.formName
                  //       ? 'Successfully submitted'
                  //       : 'Form Submitted..'
                  //   }`,
                  //   2

                  // );
                  
                  buttonLoader.setFalse();
                  if (!location?.state?.agentForm) {
                    console.log(resp.data.Values, resp.data, 'jjjjjjjjjjjjjjjj')
                    // dispatch(
                    //   Alert.open({
                    //     type: 'Success',
                    //     message:
                    //       'Master Partner created successfully, Approval pending'
                    //   })
                    // );
                    // history.push('/');
                    // setFormType('partner');
                    // setShowAgentSuccess(true);
                    let SuceessHandleUrl = `${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`;

                    history.push({
                      pathname: `${config.basePath}SuccessPage`,
                      state: {
                        formType: resp.data.Values.formIdentity === 'Reseller_Onboard' || resp.data.Values?.reseller?.formIdentity === 'Reseller_Onboard' ? 'reseller' : 'partner',
                        url: SuceessHandleUrl,
                        TicketID: resp.data.Values.ticketId,
                        PartnerName: resp.data.Values.PARTNER_NAME || resp.data.Values.FIRST_NAME + ' ' + resp.data.Values.LAST_NAME,
                        AgentID: resp.data.Values.Agent_ID,
                      }
                    });
                  } else {
                    // history.push('/');
                  }
                }
              })

              .catch((err) => {
                message.error(`Failed`, 1);
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
          } else {
            if (clickedButtonData.buttonType === 'save') {
              let url = clickedButtonData.redirectUrl,
                check = url ? url.includes('https://') : false;

              if (check) {
                window.location.replace(url);
              } else if (clickedButtonData.redirectForm) {
                props.history.push({
                  pathname: `${config.basePath}formSubmission`,
                  state: {
                    formIdentity: clickedButtonData.redirectForm
                  }
                });
              } else {
                props.formName ? '' : props.history.push('/');
              }
              setCurrentError({});
            } else if (clickedButtonData.buttonType === 'proceed') {
              setCurrentError({});
              setCurrentTab(currentTab + 1);
            }
            message.success(
              `${props.formName ? 'Successfully submitted' : 'Form Submitted..'
              }`,
              2
            );
          }
        }
      })
      .catch((err) => {
        LoadingSpin(false);
        message.error('Error in saving the Form', 1);
      });
  };
  const onFormFinish = (values) => {
    let data = Object.assign({}, values);
    if (values.ONE_TIME_CHARGES === '') {
      data.ONE_TIME_CHARGES = 0;
    } else {
      data.ONE_TIME_CHARGES = parseInt(values.ONE_TIME_CHARGES);
    }
    if (clickedButtonData.buttonType === 'cancel') {
      console.log('props from cancel')

      props.closeModal('createContract')
      // history.push('/');
      return;
    }

    let FormDisplayData = stepList[0];
    triggerFreeStep(data, FormDisplayData);
  };
  const getPartnerId = (data) => {
    let Obj = stepList[0];
  };

  const triggerFreeStep = (values, FormDisplayData) => {
    LoadingSpin(true);
    let sectionArr = [];
    let valueObj = {};
    let tempValue = {};

    FormDisplayData.column.forEach((col) => {
      let section = FormDisplayData.sectionlist[col];
      let secObj = FormDisplayData.sectionlist[col].arr.map((item) => {
        return {
          ...item,
          name:
            item?.label === 'TIN/TAX DOCUMENTS'
              ? 'TIN/TAX_RELATED_DOCUMENT'
              : item?.label === 'FINANCIAL STATEMENTS'
                ? 'FINANCIAL_DOCUMENTS'
                : item.name
        };
      });
      let sectionName = section.sectionName
        ? section.sectionName
        : section.sectiontitle;

      sectionArr.push(sectionName);

      let initialValue = {};

      secObj &&
        secObj.forEach((item) => {
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

    // if (sectionaddTrigger) {
    //   let obj = { ...valueObj };
    //   let newSectionArr = [...sectionArr];
    //   if (currentSectiontitle) {
    //     let filterArr = Object.keys(obj).filter((sec) =>
    //       sec.includes(currentSectiontitle)
    //     );

    //     delete obj[currentSectiontitle];
    //     obj[currentSectiontitle] = [];
    //     filterArr.forEach((sec) => {
    //       obj[currentSectiontitle].splice(0, 0, valueObj[sec]);
    //     });
    //   }
    //   let delteArr = Object.keys(obj).filter((sec) =>
    //     sec.includes(`${currentSectiontitle}_`)
    //   );
    //   delteArr.forEach((sec) => {
    //     delete obj[sec];
    //   });
    //   let deletedSection = newSectionArr.filter((sec) => {
    //     return delteArr.indexOf(sec) === -1;
    //   });
    //   valueObj = { ...obj };
    //   sectionArr = [...deletedSection];
    // }

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
        userName,
        userRole,
        tempValue,
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

  const triggerTecnotree = (
    body,
    FormDisplayData,
    userName,
    userRole,
    values,
    clickedButtonData
  ) => {
    // TecnotreedigitalSales/submitform
    TecnotreedigitalSales.post(
      `${clickedButtonData.TecnotreedigitalSales}`,
      body
    )
      .then((respn) => {
        if (respn) {
          form.resetFields();
          LoadingSpin(false);
          if (FormDisplayData.workFlowId && FormDisplayData.workFlowName) {
            let Ebody = {};

            Ebody['username'] = userName.sub;
            Ebody['userId'] = localStorage.getItem('signinId');
            Ebody['userRole'] = userRole;
            Ebody['executionModeStatus'] = false;
            Ebody['async'] = false;
            Ebody['workflowId'] = FormDisplayData.workFlowId;
            Ebody['formIdentity'] = FormDisplayData.formIdentity;
            Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
            Ebody['Values'] = { ...values };
            Ebody['Values']['loginId'] = localStorage.getItem('id');
            Ebody['Values']['username'] = userName;
            Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
            Ebody['Values']['accessToken'] =
              localStorage.getItem('ACCESS_TOKEN');
            TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
              .then((resp) => {
                message.success(`Success`, 1);
                let taskType = resp.data.taskType;
                if (taskType === 'FormTask') {
                  resp.data.Values.formIdentity
                    ? setFormIdentity(resp.data.Values.formIdentity)
                    : '';
                  setShowFormtaskModal(true);
                  let parseData = JSON.parse(resp.data.taskResponse);
                  setTaskResponse(parseData);
                } else {
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
                        setStatusId(resp.data.name);
                      } else {
                        setFieldStatus('error');
                        message.error(resp.data.notification.message, 1);
                        // LoadingSpin(false)
                        setStatusId(resp.data.name);
                      }
                    }
                  }
                  if (clickedButtonData.buttonType === 'save') {
                    let url = clickedButtonData.redirectUrl,
                      check = url ? url.includes('https://') : false;

                    if (check) {
                      window.location.replace(url);
                    } else if (clickedButtonData.redirectForm) {
                      props.history.push({
                        pathname: `${config.basePath}formSubmission`,
                        state: {
                          formIdentity: clickedButtonData.redirectForm
                        }
                      });
                    }
                    setCurrentError({});
                  } else if (clickedButtonData.buttonType === 'proceed') {
                    setCurrentError({});
                    setCurrentTab(currentTab + 1);
                  }
                  message.success(
                    `${props.formName
                      ? 'Successfully submitted'
                      : 'Form Submitted..'
                    }`,
                    2
                  );
                }
              })

              .catch((err) => {
                message.error(`Failed`, 1);
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
          } else {
            if (clickedButtonData.buttonType === 'save') {
              let url = clickedButtonData.redirectUrl,
                check = url ? url.includes('https://') : false;

              if (check) {
                window.location.replace(url);
              } else if (clickedButtonData.redirectForm) {
                props.history.push({
                  pathname: `${config.basePath}formSubmission`,
                  state: {
                    formIdentity: clickedButtonData.redirectForm
                  }
                });
              } else {
                props.formName ? '' : props.history.push('/');
              }
              setCurrentError({});
            } else if (clickedButtonData.buttonType === 'proceed') {
              setCurrentError({});
              setCurrentTab(currentTab + 1);
            }
            message.success(
              `${props.formName ? 'Successfully submitted' : 'Form Submitted..'
              }`,
              2
            );
          }
        }
      })
      .catch((err) => {
        LoadingSpin(false);
        message.error('Error in saving the Form', 1);
      });
  };

  // const onDropDownChange = (value, regex, data) => {
  //   if (
  //     value !== '' &&
  //     data.linkDropDown &&
  //     data.linkedWorkFlowId &&
  //     data.linkedWorkflowName
  //   ) {
  //     LoadingSpin(true);
  //     if (data.linkDropDown && data.dropDownName !== '') {
  //       let obj = {};
  //       if (data.getFieldata) {
  //         let fieldValue = form.getFieldValue();

  //         obj[data.getFieldata] = fieldValue[data.getFieldata];
  //       }
  //       let Ebody = {},
  //         userName =
  //           localStorage.getItem('USER') &&
  //           JSON.parse(localStorage.getItem('USER')).sub,
  //         userRole = localStorage.getItem('roleId'),
  //         newVal = {};
  //       newVal[data.name] = value;
  //       newVal = { ...obj, ...newVal };
  //       Ebody['username'] = userName.sub;
  //       Ebody['userId'] = localStorage.getItem('signinId');
  //       Ebody['userRole'] = userRole;
  //       Ebody['executionModeStatus'] = false;
  //       Ebody['async'] = false;
  //       Ebody['workflowId'] = data.linkedWorkFlowId;
  //       Ebody['formIdentity'] = FormDisplayData.formIdentity;
  //       Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
  //       Ebody['Values'] = { ...newVal };
  //       Ebody['Values']['username'] = userName;
  //       Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
  //       Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
  //       DynamicAxios()
  //         .post('/bpmn/executeProcess', Ebody)
  //         .then((resp) => {
  //           if (
  //             data.name === 'Commission_Rule_Details' ||
  //             data.name === 'Settlement_Rule_Details'
  //           ) {
  //             let respData = resp.data.outputArray['searchData']
  //               ? resp.data.outputArray['searchData']
  //               : {};
  //             respData = respData ? JSON.parse(respData) : {};

  //             let searchData = {
  //               [data.name]: { ...respData[0] }
  //             };
  //             data.name === 'Commission_Rule_Details'
  //               ? setSearchCommissionResp(searchData)
  //               : setSearchSettelementResp(searchData);
  //             // setSearchResp(searchData);
  //           }

  //           let step = stepList;
  //           let section = step[0].sectionlist,
  //             sectionArr = Object.keys(section);
  //           sectionArr.forEach((sec) => {
  //             return section[sec].arr.forEach((item) => {
  //               if (item.name === data.dropDownName) {
  //                 item.options = resp.data.dynamicText
  //                   ? resp.data.dynamicText
  //                   : [];
  //               }
  //             });
  //           });
  //           setStepList([...step]);
  //           let obj = {};
  //           obj[data.dropDownName] = '';

  //           form.setFieldsValue(obj);
  //           LoadingSpin(false);
  //         })
  //         .catch((err) => {
  //           setFieldStatus('error');
  //           setStatusId(data.name);
  //           LoadingSpin(false);
  //           if (err.response) {
  //             let Tecnotreeres = err.response.data
  //               ? err.response.data?.TecnotreeResponse
  //               : {};
  //             Modal.error({
  //               className: 'modal-error-content',
  //               title: 'This is an error message',
  //               content: (
  //                 <>
  //                   <Row>
  //                     <Col span={10}>
  //                       <b> Error Message : </b>{' '}
  //                     </Col>{' '}
  //                     <Col span={14}> {Tecnotreeres?.body} </Col>
  //                   </Row>
  //                   <Row>
  //                     <Col span={10}>
  //                       {' '}
  //                       <b>status Code : </b>{' '}
  //                     </Col>{' '}
  //                     <Col> {Tecnotreeres?.statusCode} </Col>
  //                   </Row>
  //                   <Row>
  //                     <Col span={10}>
  //                       {' '}
  //                       <b> Status Code Value : </b>
  //                     </Col>{' '}
  //                     <Col> {Tecnotreeres?.statusCodeValue} </Col>
  //                   </Row>
  //                 </>
  //               )
  //             });
  //           }
  //         });
  //     }
  //   }
  // };

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
            localStorage.getItem('USER') !== null &&
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
        DynamicAxios()
          .post('/bpmn/executeProcess', Ebody)
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
            if (resp.data.notification) {
              if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populate'
              ) {
                setFieldStatus(resp.data.notification.status);
                // setFieldValidation(
                //   data.name,
                //   resp.data.notification.status,
                //   'fieldName',
                //   '10'
                // );
                setStatusId(data.name);
                try {
                  let values = resp.data.notification
                    ? resp.data.notification
                    : {},
                    ParseObj = {},
                    arr = Object.keys(values);
                  arr.forEach((item) => {
                    let str = values[item],
                      ParseStr = '';
                    if (str.includes('[')) {
                      ParseStr = `${_.isArray(JSON.parse(values[item]))
                          ? JSON.parse(values[item])[0]
                          : ''
                        } `;
                      ParseObj[item] = ParseStr.trim();
                    }
                  });
                  values = Object.assign(values, ParseObj);
                  form.setFieldsValue(values);
                } catch (err) {
                  return err;
                  // console.log('error in values convert parse', err);
                }
                LoadingSpin(false);
              } else if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populateBlock'
              ) {
                let values = resp.data.notification
                  ? resp.data.notification
                  : {},
                  fieldArr = [],
                  arr = Object.keys(values);
                arr.forEach((item) => {
                  let str = item;
                  if (str.includes('**')) {
                    fieldArr.push(str);
                  }
                });
                try {
                  if (fieldArr.length > 0) {
                    const triggerStatus = async (
                      valuues,
                      tempname,
                      fieldValidationInf
                    ) => {
                      await setFieldStatus(valuues.status);
                      let nObj = {
                        fieldName: tempname,
                        fieldValidationStatus: valuues.status
                      };
                      fieldValidationInf[`${tempname}`] = { ...nObj };
                      return fieldValidationInf;
                    };
                    let fieldValidationInfo = { ...fieldValidationData },
                      updateValue = {};
                    (async () => {
                      await fieldArr.reduce(async (promise, field) => {
                        let tempname = values[field];
                        await promise;
                        updateValue = await triggerStatus(
                          values,
                          tempname,
                          fieldValidationInfo
                        );
                        fieldValidationInfo = { ...updateValue };
                      }, Promise.resolve());
                      // setFieldValidationData({ ...updateValue });
                    })();
                    LoadingSpin(false);
                    return;
                  }
                } catch (err) {
                  return err;
                  // console.log('Error at field Arr', err);
                }
                setFieldStatus(resp.data.notification.status);
                let tempFieldName = data.name ? data.name : '';
                let tempType = data.name ? 'fieldName' : 'onlyStatus';
                // setFieldValidation(
                //   tempFieldName,
                //   resp.data.notification.status,
                //   tempType,
                //   '11'
                // );
                setStatusId(data.name);
                try {
                  let tempData = stepList[0];
                  Object.keys(tempData.sectionlist).map((section) => {
                    tempData.sectionlist[section].arr.map((secdata) => {
                      if (
                        Object.keys(resp.data.notification).includes(
                          secdata.name
                        ) &&
                        resp.data.notification[secdata.name]
                      ) {
                        secdata.editable = true;
                      }
                    });
                  });
                  setStepList([tempData]);
                  form.setFieldsValue(resp.data.notification);
                  LoadingSpin(false);
                } catch (er) {
                  LoadingSpin(false);
                }
              } else if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populateUnBlock'
              ) {
                setFieldStatus(resp.data.notification.status);
                let tempFieldName = data.name ? data.name : '';
                let tempType = data.name ? 'fieldName' : 'onlyStatus';
                // setFieldValidation(
                //   tempFieldName,
                //   resp.data.notification.status,
                //   tempType,
                //   '12'
                // );
                setStatusId(data.name);
                try {
                  let tempData = stepList[0];
                  Object.keys(tempData.sectionlist).map((section) => {
                    tempData.sectionlist[section].arr.map((secdata) => {
                      if (
                        Object.keys(resp.data.notification).includes(
                          secdata.name
                        ) &&
                        resp.data.notification[secdata.name]
                      ) {
                        secdata.editable = false;
                      }
                    });
                  });
                  setStepList([tempData]);
                  form.setFieldsValue(resp.data.notification);
                  LoadingSpin(false);
                } catch (er) {
                  //  console.log('error in metod ', er);
                  LoadingSpin(false);
                }
              } else if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populateHide'
              ) {
                let values = resp.data.notification
                  ? resp.data.notification
                  : {},
                  fieldArr = [],
                  fieldArrN = [],
                  arr = Object.keys(values);
                arr.forEach((item) => {
                  let str = item;
                  if (str.includes('***')) {
                    fieldArr.push(str);
                  }
                  if (str.includes('##')) {
                    fieldArrN.push(str);
                  }
                });
                try {
                  if (fieldArr.length > 0) {
                    const triggerStatus = async (
                      valuues,
                      tempname,
                      fieldValidationInf
                    ) => {
                      await setFieldStatus(valuues.status);
                      let nObj = {
                        fieldName: tempname,
                        fieldValidationStatus: valuues.status
                      };
                      fieldValidationInf[`${tempname}`] = { ...nObj };
                      return fieldValidationInf;
                    };
                    let fieldValidationInfo = { ...fieldValidationData },
                      updateValue = {};
                    (async () => {
                      await fieldArr.reduce(async (promise, field) => {
                        let tempname = values[field];
                        await promise;
                        updateValue = await triggerStatus(
                          values,
                          tempname,
                          fieldValidationInfo
                        );
                        fieldValidationInfo = { ...updateValue };
                      }, Promise.resolve());
                      // setFieldValidationData({ ...updateValue });
                    })();
                    let tempData = stepList[0];
                    Object.keys(tempData.sectionlist).map((section) => {
                      let hideSectionName =
                        tempData.sectionlist[section].sectionName;
                      // console.log('hidesection name', hideSectionName);
                      let sectionFieldArrVal = [];
                      sectionFieldArr.map((field) => {
                        let tempVal = values[field];
                        sectionFieldArrVal.push(tempVal);
                      });
                      if (
                        Object.values(resp.data.notification).includes(
                          hideSectionName
                        ) &&
                        sectionFieldArrVal.includes(hideSectionName) /* &&
                          resp.data.notification[secdata.name] */
                      ) {
                        tempData.sectionlist[section]['isHidden'] = true;
                      }
                    });
                    Object.keys(tempData.sectionlist).map((section) => {
                      tempData.sectionlist[section].arr.map((secdata) => {
                        let fieldArrVal = [];
                        fieldArr.map((field) => {
                          let tempVal = values[field];
                          fieldArrVal.push(tempVal);
                        });
                        if (
                          Object.values(resp.data.notification).includes(
                            secdata.name
                          ) &&
                          fieldArrVal.includes(secdata.name) /* &&
                          resp.data.notification[secdata.name] */
                        ) {
                          secdata.type = 'hidden';
                          secdata.required = false;
                          form.resetFields([secdata.name]);
                        }
                      });
                    });
                    setStepList([tempData]);
                    form.setFieldsValue(resp.data.notification);
                    LoadingSpin(false);
                  }
                } catch (err) {
                  return err;
                  // console.log('Error at field Arr', err);
                }
                try {
                  if (fieldArrN.length > 0) {
                    const triggerStatus = async (
                      valuues,
                      tempname,
                      fieldValidationInf
                    ) => {
                      await setFieldStatus(valuues.status);
                      let nObj = {
                        fieldName: tempname,
                        fieldValidationStatus: valuues.status
                      };
                      fieldValidationInf[`${tempname}`] = { ...nObj };
                      return fieldValidationInf;
                    };
                    let fieldValidationInfo = { ...fieldValidationData },
                      updateValue = {};
                    (async () => {
                      await fieldArrN.reduce(async (promise, field) => {
                        let tempname = values[field];
                        await promise;
                        updateValue = await triggerStatus(
                          values,
                          tempname,
                          fieldValidationInfo
                        );
                        fieldValidationInfo = { ...updateValue };
                      }, Promise.resolve());
                      // setFieldValidationData({ ...updateValue });
                    })();
                    let tempData = stepList[0];
                    Object.keys(tempData.sectionlist).map((section) => {
                      tempData.sectionlist[section].arr.map((secdata) => {
                        let fieldArrValN = [];
                        fieldArrN.map((field) => {
                          let tempVal = values[field];
                          fieldArrValN.push(tempVal);
                        });
                        if (
                          Object.values(resp.data.notification).includes(
                            secdata.name
                          ) &&
                          fieldArrValN.includes(secdata.name) /* &&
                          resp.data.notification[secdata.name] */
                        ) {
                          if (secdata.fId === 'fileupload') {
                            secdata.type = 'upload';
                            secdata.required = true;
                          } else if (
                            secdata.fId === 'number' ||
                            secdata.fId === 'multiUpload' ||
                            secdata.fId === 'dropdown'
                          ) {
                            secdata.type = secdata.fId;
                            secdata.required = true;
                          } else {
                            secdata.type = 'text';
                            secdata.required = true;
                          }
                        }
                      });
                    });
                    setStepList([tempData]);
                    form.setFieldsValue(resp.data.notification);
                    LoadingSpin(false);
                    return;
                  }
                } catch (err) {
                  // console.log('Error at field Arr', err);
                  return err;
                }
                setFieldStatus(resp.data.notification.status);
                let tempFieldName = data.name ? data.name : '';
                let tempType = data.name ? 'fieldName' : 'onlyStatus';
                // setFieldValidation(
                //   tempFieldName,
                //   resp.data.notification.status,
                //   tempType,
                //   '11'
                // );
                setStatusId(data.name);
                try {
                  let tempData = stepList[0];
                  Object.keys(tempData.sectionlist).map((section) => {
                    tempData.sectionlist[section].arr.map((secdata) => {
                      if (
                        Object.keys(resp.data.notification).includes(
                          secdata.name
                        ) &&
                        resp.data.notification[secdata.name]
                      ) {
                        secdata.editable = true;
                      }
                    });
                  });
                  setStepList([tempData]);
                  form.setFieldsValue(resp.data.notification);
                  LoadingSpin(false);
                  //console.log('after value', [tempData]);
                } catch (er) {
                  // console.log('error in metod ', er);
                  LoadingSpin(false);
                }
              }
            }
            LoadingSpin(false);
          })
          .catch((err) => {
            setFieldStatus('error');
            setStatusId(data.name);
            // setFieldValidation(data.name, 'error', 'fieldName', '4');
            LoadingSpin(false);
            if (err.response) {
              let apires = err.response.data
                ? err.response.data?.apiResponse
                : {};
              Modal.error({
                className: 'modal-error-content',
                title: 'This is an error message',
                content: <ErrorComp apires={apires} />
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
        DynamicAxios()
          .post('/bpmn/executeProcess', Ebody)
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
    if (btnData.buttonType === "cancel") {
      setClickedButtonData(btnData)
    }
    else if(btnData.buttonType === "proceed") {
    
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setClickedButtonData(btnData);
      }, 1000)
    }
    else if(btnData.buttonType === "save") {
    
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setClickedButtonData(btnData);
      }, 1000)
    }
    else {
    
      setClickedButtonData(btnData);
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
      props.closeModal('createContract')
      console.log('props from cancel')

      // history.push('/');
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
          .then((resp) => { })
          .catch((err) => { });
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
          console.log("aseeredsdsds: ", tempDataMerge)
        } catch (ery) {
          return ery;
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

            // setSearchResp(obj);
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

          if (
            (obj?.Search && obj?.Search?.settlementRuleCode) ||
            obj?.Settlement_Rule
          ) {
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

  const getBlob = async (uri) => {
    let fileName = uri.url;
    let fileExtension;
    if (fileName) {
      fileExtension = fileName.split('.').pop();
    }

    if (fileExtension === 'pdf') {
      return `${DPRM_DMS}/${uri.name}`;
    } else {
      let response = await fetch(`${DPRM_DMS}/${uri.name}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${getaccessToken()}`,

          'Content-Type': undefined
        }
      })
        .then((response) => response)
        .then((result) => result)
        .catch((error) => (err) => { });

      const res = await response.blob();
      return URL.createObjectURL(res);
    }
  };

  function disabledDate(current, data) {
    return current && current < moment().startOf('day');
  }

  const onClose = () => {
    history.push('/');
  }

  const ErrorComp = ({ apires }) => {
    return (
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
    );
  };

  return (
    <>
      <PartnerLayout regId={'mp'}>
        {location.state?.formIdentity === 'Add_Product' ||
          location.state?.formIdentity === 'Tenant_Partner_Profile' ? (
          <CompanyDetails
            title={location.state.details.title}
            id={location.state.details.desp}
            email={location.state.details.email}
            mobile={location.state.details.mobile}
          />
        ) : (
          ''
        )}

        <div className="card-container">
          {isEmpty ? (
            <>
              <Empty
                style={{ height: '90vh' }}
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 200
                }}
                description={
                  <span>
                    No Step Data{' '}
                    <a
                      target="_blank"
                      href="https://master.d28j193frat4rk.amplifyapp.com/formCreation"
                      rel="noopener noreferrer"
                    >
                      Create new step
                    </a>
                  </span>
                }
              ></Empty>
            </>
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
                  <>
                    {/* <Customstep
                FormData={stepList[0]}
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
                form={form}
                onRecursiveLimitChange={onRecursiveLimitChange}
                type={
                  location.state &&
                  location.state.type &&
                  location.state.type === "userProfile"
                    ? "userProfile"
                    : ""
                }
              /> */}
                  </>
                ) : (
                  <>
                    <FreeStep
                      loading={loading}
                      buttonLoader={buttonLoader.value}
                      stepList={stepList}
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
                      type={
                        location.state &&
                          location.state.type &&
                          location.state.type === 'userProfile'
                          ? 'userProfile'
                          : ''
                      }
                      onSearchFetcher={onSearchFetcher}
                      fetching={fetching}
                      disabledDate={disabledDate}
                      searchOptions={searchOptions}
                      onSearchSelected={onSearchSelected}
                      searchResp={searchResp}
                      searchCommissionResp={searchCommissionResp}
                      searchSettelementResp={searchSettelementResp}
                      formRef={form}
                      docsInfo={docsInfo}
                      agentForm={location?.state?.agentForm}
                      dmsPayload={PartnerDetails?.value}
                      onClose={onClose}
                    />
                  </>
                )}
              </Form>
            </>
          )}
          {showBlackListModal ? (
            <Modal
              visible={showBlackListModal}
              closable={false}
              footer={null}
              maskClosable={false}
              className="dropdown-modal"
              maskStyle={{
                background: '#2F3542 0% 0% no-repeat',
                opacity: 0.87
              }}
            >
              <div className="popup-heading">
                <div className="popup-heading-msg">
                  {popoupData &&
                    popoupData.notification &&
                    popoupData.notification.header}
                </div>
                <div>
                  {popoupData.notification &&
                    popoupData.notification.status &&
                    popoupData.notification.status === 'success' ? (
                    <CheckCircleOutlined
                      style={{ fontSize: ' 40px', color: 'green' }}
                    />
                  ) : popoupData.notification.status === 'warning' ? (
                    <WarningOutlined
                      style={{ fontSize: ' 40px', color: '#ffc107' }}
                    />
                  ) : popoupData.notification.status === 'error' ? (
                    <CloseCircleOutlined
                      style={{ fontSize: ' 40px', color: 'tomato' }}
                    />
                  ) : (
                    ''
                  )}
                </div>

                <div>{popoupData && popoupData.notification.message}</div>
              </div>
              <Row
                gutter={[48, 16]}
                justify="space-between"
                style={{ marginTop: '30px' }}
              >
                {popoupData &&
                  popoupData.fieldData &&
                  popoupData.fieldData.map((item, index) => (
                    <Col span={12} key={index}>
                      <div className="popup-label">{item.label}</div>
                      <div className="popup-value">{item.value}</div>
                    </Col>
                  ))}
              </Row>
              <div style={{ textAlign: 'right', marginTop: 20 }}>
                {!seeBlacklistPopup ? (
                  <>
                    <Button
                      type="text"
                      className="cancel-btn"
                      onClick={onCancelClick}
                      endIcon={<NavigateNext />}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      className="submit-btn"
                      onClick={onCancelClick}
                      endIcon={<NavigateNext />}
                    >
                      Ok
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    className="submit-btn"
                    onClick={onCancelClick}
                    endIcon={<NavigateNext />}
                  >
                    Ok
                  </Button>
                )}
              </div>
            </Modal>
          ) : (
            ''
          )}

          <></>
          {/* {showFormtaskModal && (
      <FormtaskModal
        visible={showFormtaskModal}
        handleOk={handleFormtaskModalOk}
        handleCancel={handleFormtaskModalCancel}
        formIdentityName={formIdentity}
        onFormTaskFinish={onFormTaskFinish}
        taskResponse={taskResponse}
      />
    )} */}

          <Modal
            title="Bulkupload"
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            maskClosable={false}
          >
            {/* <BulkUpload
        formName={
          props.formName
            ? props.formName
            : location.state.formIdentity
            ? location.state.formIdentity
            : ""
        }
      /> */}
          </Modal>
        </div>
      </PartnerLayout>
    </>
  );
}

const mapStateToProps = (state) => ({
  userDetails: state.setExistingUserReducer.existingUser,
  CustomMidJson: state.getMIDCollection.CustomMidJson,
  captureData: state.setCaptureReducer.dataUri
});


export default FormFields

{
  /* <Row justify="end">
              {formnaveInfo &&
              formnaveInfo.formProperties &&
              formnaveInfo.formProperties.bulkUpload && (
                <Button
                  onClick={() => onBulkuploadClicked()}
                  type="primary"
                  style={{ marginRight: "20px", marginTop: "10px" }}
                >
                  Bulkupload
                </Button>
              )}
            </Row> */
}
{
  /* <div className="tt-dashboard-steps">
              <Steps size="small" current={currentTab}>
                {ListOfTabs &&
                  ListOfTabs.map((tab, index) => {
                    return <Step key={index} title={tab} />;
                  })}
              </Steps>
            </div> */
}
