import React, { useState, useEffect } from 'react';
import { TecnotreedigitalSales } from '../../Http/axios';
import moment from 'moment';
import './FormFields.scss';
import { LoadingSpin } from './LoadingSpin';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { Form, Button, Col, Row, Steps, Modal, message } from 'antd';
import { useHistory } from 'react-router-dom';
import config from 'config';
import FreeStep from './FreeStep';

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Model from 'Store/Modals';
import { useDispatch } from 'react-redux';
import partnerAPi from 'Http/api/Partner';
import Alert from 'Store/Alert';
import MasterPartner from 'Assets/Icons/MasterPartnerBlack.svg';
import ProductIcon from 'Assets/Icons/ProductIcon.svg';
import TenantPartner from 'Assets/Icons/TenantPartner.svg';
import Cart from 'Assets/Icons/CartIcon.svg';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { Box, makeStyles } from '@material-ui/core';
import { useBoolean } from 'react-hanger';
import SectionParser from 'Factory/Worlflowpayload';
import FactoryWorkflow from 'Factory/Worlflowpayload';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import workflowPayload from 'Factory/Worlflowpayload';
// import RemoveSection from './UseResParser';

const { Step } = Steps;
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

const useStyles = makeStyles((theme) => ({
  loaderClr: {
    color:
      theme.palette.type === 'dark' 
        ? `${theme.palette.common.black} !important`
        : 'primary'
  }
}));

function BottomSheetFormFields(props) {
  const [form] = Form.useForm();
  const [dealerMasterData, setDealerMasterData] = useState("")
  
  const masterdata = useSelector(
    (state) => state?.master?.masterData?.workflowIds
  );
  
  console.log('propxxxxxll', props, searchCommissionResp,masterdata, localStorage);


  let masterData = {}
  if(localStorage.masterdataAgentCat !== "undefined") {
    const master = localStorage.getItem("masterdataAgentCat")
    if(master !== null) {
      const data = JSON.parse(master)
      masterData = data
    }
  }
  let comCode;

  const getComCode = async(agent)=> {
    console.log(agent, "kkkkklll", masterData)
  let data = masterData.find((el)=> el.name === agent?.AGENT_TYPE)
    console.log(data, "comcodeXXXX")
    if(data) {
      comCode = data?.agentSubCategory?.find((el)=>  el.name === agent?.AGENT_SUB_TYPE)
    }
    console.log(data, comCode, "getcodexx",)

    const details = await partnerAPi.getcommissionRules(comCode?.commissionCode);
   console.log(details, "detailerxxxxx", _.get(details, '[0]'))
   delete _.get(details, '[0]')['@baseType']
   delete _.get(details, '[0]')['@schemaLocation']
   delete _.get(details, '[0]')['href']
   delete _.get(details, '[0]')['id']
   

    // Product.setValue({...productData, CommissionRuleDetails: _.get(details, '[0]', {})})
    setSearchResp({
      Commission_Rule:_.get(details, '[0]')
    }); 
    let commissionRuleKey = 'Commission_Rule';
   let Commission_Rule = {
      [commissionRuleKey]: comCode?.commissionCode
    };
    form.setFieldsValue(Commission_Rule);
     return comCode
   
  }
  const dispatch = useDispatch();
  let location = useLocation();
  const [stepList, setStepList] = useState([]);

  const [sectionaddTrigger, setSectionTrigger] = useState(false);
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
  const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
  const [taskResponse, setTaskResponse] = useState({});
  const [formnaveInfo, setFormnaveInfo] = useState('');
  const [prefillData, setPrefillData] = useState({});

  const [availableFrom, setAvailableFrom] = useState();
  const [availableTo, setAvailableTo] = useState();
  const [searchResp, setSearchResp] = useState({});
  const [fetching, setFetching] = useState(false);
  const [searchOptions, setSearchOptions] = useState({});
  const [dateOne, setDateOne] = useState('');
  const [dateTwo, setDateTwo] = useState('');
  const [contractDuration, setContractDuration] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [searchSettelementResp, setSearchSettelementResp] = useState({});
  const [searchCommissionResp, setSearchCommissionResp] = useState({});

  console.log(form.getFieldValue(), "formaxxxx")
  const handleHelp = () => {
    //  history.push(`${config.basePath}Help`)
    let helpOpen = window.open(`${config.basePath}Help`, '_blank');
    helpOpen.focus();
  };
  const classes = useStyles();
  // let updatedFDate;
  // let updatedTDate;
  const buttonLoader = useBoolean(false);
  useEffect(() => {
    if (props.formName) {
      // setIsEmpty(true);
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
              `/step?formIdentity=${
                props.formName ? props.formName : 'LeadInfo'
              }&stepIdentity=${Tabname}`
            )
              .then(async (response) => {
                if (response) {
                  await formatFormField(response.data).then((result) => {
                    LoadingSpin(false);
                    setStepList([result]);
                  });
                }
              })
              .catch((err) => {
                LoadingSpin(false);
                message.error('error fetching data');
                history.push('/');
              });
          } else {
            // LoadingSpin(false);
            setIsEmpty(true);
          }
        })
        .catch((err) => {
          message.error('error fetching data');
          history.push('/');
        });
    }

    getComCode(props?.partnerId)
  }, [props]);

  // for commission rule details prepopulate
  // useEffect(() => {
  //   let managerMobile;
  //   var retrievedObject = localStorage.getItem('USER');
  //   var mobile = JSON.parse(retrievedObject).mobile;
  //   let managerMobileKey = 'Commission_Rule';
  //   let managerMobileValue = mobile;
  //   managerMobile = {
  //     [managerMobileKey]: 'com00001'
  //   };
  //   form.setFieldsValue(managerMobile);
  // }, []);
  console.log(props.formIdentity, 'minorrrr');


  useEffect(() => {
    if (props?.partnerId?.partnerId || props?.partnerId?.Agent_ID) {
      localStorage.setItem('merchantId', props?.partnerId?.partnerId);
    }
    if (props && props.formIdentity) {
      setIsEmpty(true);
      TecnotreedigitalSales.get(
        `/formnav/${
          props.formIdentity ? props.formIdentity : 'CaptureLeadInfo'
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
            TecnotreedigitalSales.get(
              `/step?formIdentity=${
                props.formIdentity ? props.formIdentity : 'CaptureLeadInfo'
              }&stepIdentity=${Tabname}`
            )
              .then(async (asyncResp) => {
                if (asyncResp) {
                  console.log(asyncResp,'asyncRespasyncResp')
                  // if (props.contractModification) {
                  //   console.log('  props.formIdentity', props.formIdentity);
                  //   setFormData(
                  //     RemoveSection.Removedynamicformsection(
                  //       asyncResp.data[0],
                  //       props.formIdentity
                  //     )[0]
                  //   );
                  //   await formatFormField(
                  //     RemoveSection.Removedynamicformsection(
                  //       asyncResp.data[0],
                  //       props.formIdentity
                  //     )
                  //   ).then((result) => {
                  //     LoadingSpin(false);
                  //     setStepList([result]);
                  //   });
                  // } else {
                  //
                  // }
                  setDealerMasterData(asyncResp.data[0].workFlowId)
                  console.log( SectionParser.UpdateSectionForm(
                    asyncResp.data[0],
              "",
                    props.ProductForm
                  ))
                  setFormData(
                    SectionParser.UpdateSectionForm(
                      asyncResp.data[0],
                      "",
                      props.ProductForm,
                    )
                  );
                  await formatFormField(
                    SectionParser.UpdateSectionForm(
                      asyncResp.data[0],
                      "",
                      props.ProductForm
                    )
                
                  ).then((result) => {
                    LoadingSpin(false);
                     console.log(result , "Result")
                    setStepList([result]);
                  }).catch(err=>{
                     console.log(err , "ererrrrrrrrrrrr")
                  });

                  if (
                    props.formIdentity === 'Add_Product' ||
                    props.formIdentity === 'Add_Contract'
                  ) {
                    if (props.commissionCode !== undefined) {
                     
                      let Commission_Rule;
                      var retrievedObject = localStorage.getItem('USER');
                      var mobile = JSON.parse(retrievedObject).mobile;
                      let commissionRuleKey = 'Commission_Rule';
                      Commission_Rule = {
                        [commissionRuleKey]: props.commissionCode
                      }; 
                      form.setFieldsValue(Commission_Rule);
                    }
                    if (props.settlementCode !== 'undefined') {
                      let Settlement_Rule;
                      let settlementRuleKey = 'Settlement_Rule';
                      Settlement_Rule = {
                        [settlementRuleKey]: props.settlementCode
                      };
                      form.setFieldsValue(Settlement_Rule);
                    }
                  }

                  let relationshipManagerDetails;
                  var retrievedData = localStorage.getItem('USER');
                  var userName = JSON.parse(retrievedData).sub;
                  let relationshipManagerKey = 'NAME';
                  let relationshipManagerName = userName;
                  relationshipManagerDetails = {
                    [relationshipManagerKey]: relationshipManagerName
                  };

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
                  var mobileData = JSON.parse(retrieved).mobile;
                  let managerMobileKey = 'MOBILE_NO';
                  let managerMobileValue = mobileData;
                  managerMobile = {
                    [managerMobileKey]: managerMobileValue
                  };
                  form.setFieldsValue(managerMobile);

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
                    props.backOfficeContractData?.AddContractFor
                  );
                  if (predata) {
                    // form.setFieldsValue(
                    //   props.backOfficeContractData.ContractInformation
                    // );
                    // Object.keys(predata).map((section) => {
                    //   setDocsInfo(predata);
                    //   Object.keys(predata[section]).map((item) => {
                    //     form.setFieldsValue({
                    //       [item]: predata[section][item]
                    //     });
                    //   });
                    // });
                  }

                  //check this
                  if (relationshipManagerDetails) {
                    form.setFieldsValue(relationshipManagerDetails);
                  }
                  try {
                    let preData = props.backOfficeContractData?.AddContractFor
                      ?.ContractInformation
                      ? {
                          ...props.backOfficeContractData?.AddContractFor
                            .ContractInformation
                        }
                      : {};

                    preData['CONTRACT_VALIDITY'] = moment(
                      preData['CONTRACT_VALIDITY']
                    );
                    if (props.contractModification) {
                      preData['END_DATE'] = moment(preData['END_DATE']);
                      preData['START_DATE'] = moment(preData['START_DATE']);
                      setContractStartDate(moment(preData['START_DATE']));
                    }

                    form.setFieldsValue(preData);
                  } catch (erry) {
                    let error = 'err';
                  }

                  let managerDetails;
                  var retrievedObjects = localStorage.getItem('USER');
                  var userName1 = JSON.parse(retrievedObjects).sub;
                  let managerKey = 'SIGNED_BY';
                  let managerName = userName1;
                  managerDetails = {
                    [managerKey]: managerName
                  };
                  form.setFieldsValue(managerDetails);

                  let customerSignedBy;

                  let partnerKey = 'CUSTOMER_SIGNED_BY';
                  let partnerName = props.partnerName;
                  customerSignedBy = {
                    [partnerKey]: partnerName
                  };
                  form.setFieldsValue(customerSignedBy);
                  if (props && props.type && props.type === 'userProfile') {
                    let userData = props.userData;
                    form.setFieldsValue(userData);
                  }
                }
              })
              .catch((err) => {
                LoadingSpin(false);
                history.push('/');
              });
          } else {
            LoadingSpin(false);
            setIsEmpty(true);
          }
        })
        .catch((err) => {
          message.error('error fetching data', 1);
          history.push('/');
        });
    }
  }, [
    props && props.formIdentity,
    props.commissionCode && props.backOfficeContractData?.AddContractFor
  ]);

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
            history.push('/');
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
    // dispatch(Model.close('FormsCreation'));
    setShowBlacklistModal(false);
    setTimeout(() => {
      setSeeBlacklistPopup(false);
    }, 100);
    props.closeDrawer();

    // redirect to homepage
    // history.push('/');
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
          Ebody['Values'] = {
            // ...workflowPayload.returnWorkflowData(
            //   values.Partner_ID,
            //   values.EMAIL_ID,
            //   values.MOBILE_NUMBER,
            //   values.PARTNER_NAME,
            //   values.PRIMARY_CONTACT_NAME,
            //   ''
            // )
          };
          Ebody['Values']['username'] = userName.sub;
          Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
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
              props.reloadTableData();
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
              .catch((err) => err);
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
              props.reloadTableData();
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
        } else if (
          props.formIdentity === 'Add_Product' &&
          tempData.sectionlist[i].arr[j].type === 'search' &&
          // tempData.sectionlist[i].arr[j].name === 'Commission_Rule' &&
          tempData.sectionlist[i].arr[j].isSearchworkFlowId &&
          tempData.sectionlist[i].arr[j].isSearchworkFlowName &&
          props.commissionCode
        ) {
          let data = tempData.sectionlist[i].arr[j];
          onSearchSelected(props.commissionCode, data);
        } else if (
          props.contractModification &&
          tempData.sectionlist[i].arr[j].type === 'search' &&
          props.formIdentity === 'Add_Contract' &&
          tempData.sectionlist[i].arr[j].isSearchworkFlowId &&
          tempData.sectionlist[i].arr[j].name === 'Commission_Rule' &&
          props.commissionCode
        ) {
          let data = tempData.sectionlist[i].arr[j];
          onSearchSelected(props.commissionCode, data);
        } else if (
          props.contractModification &&
          props.formIdentity === 'Add_Contract' &&
          tempData.sectionlist[i].arr[j].name === 'Settlement_Rule' &&
          props.settlementCode
        ) {
          let data = tempData.sectionlist[i].arr[j];
          onSearchSelected(props.settlementCode, data);
        }
      }
    }
    setIsEmpty(false);
    return tempData;
  };

  // const onSubmit = (values) => {
  //   if (clickedButtonData.buttonType === "cancel") {
  //     history.push("/");
  //     return;
  //   }
  //   let FormDisplayData = stepList[0];

  //   if (
  //     clickedButtonData.buttonType === "onClick" ||
  //     clickedButtonData.buttonType === "save"
  //   ) {
  //     // if (clickedButtonData.methodType === "POST") {
  //     let body = values ? values : {};

  //     const token = localStorage.getItem("ACCESS_TOKEN");

  //     axios
  //       .post(clickedButtonData.Api, body, {
  //         headers: { Authorization: token },
  //       })
  //       .then((resp) => {
  //       })
  //       .catch((err) => {
  //       });
  //     // }
  //   } else {
  //     if (FormDisplayData.customStep) {
  //       FormDisplayData.stepCategory === "Recursive step"
  //         ? onCustomRecursiveFinish(values, FormDisplayData)
  //         : onCustomFinish(values, FormDisplayData);
  //     } else {
  //       triggerFreeStep(values, FormDisplayData);
  //     }
  //   }
  // };

  const getHierarchy = async (name) => {
    let id;

    if (props.partnerId.pid === '') {
      id = props.partnerId.id || props.partnerId;
    } else {
      id = props.partnerId.pid;
    }
    await TecnotreedigitalSales.get(
      `/auth/secure/getuserhierarchybyparent/${id || props.partnerId}`
    )
      .then((resp) => {
        let nodeData = [];
        resp.data.forEach((item) => {
          if (item.name.length > 15) {
            var count = 15;

            item.nametitle =
              item.name.slice(0, count) +
              (item.name.length > count ? '...' : '');
          } else {
            item.nametitle = item.name;
          }
          if (item.parentId) {
            item['pid'] = item.parentId;
          }

          if (item.partnerType === 'tenant') {
            item.img0 = TenantPartner;
            item.img3 = '';
            item.tenantCount = '';
          } else {
            item.img0 = MasterPartner;
            item.img3 = TenantPartner;
          }
          if (item.productCount !== '') {
            item.img1 = Cart;
          }

          if (item.img2 === 'ColoredNotesIcon') {
            item.img2 = ProductIcon;
          }
          if (item.partnerType === 'tenant') {
            item.img0 = TenantPartner;
            item.img3 = '';
            item.tenantCount = '';
          } else {
            item.img0 = MasterPartner;
            item.img3 = TenantPartner;
          }
          if (item.productCount !== '') {
            item.img1 = Cart;
          }

          if (item.img2 === 'ColoredNotesIcon') {
            item.img2 = ProductIcon;
          }

          nodeData.push(item);
        });
        // resp.data.forEach((item) => {
        //   if (item.parentId) {
        //     item['pid'] = item.parentId;
        //   }

        //   nodeData.push(item);
        // });

        props.setHierarchy(nodeData);
      })
      .catch((error) => {});
  };
  const triggerAPI = async (
    body,
    FormDisplayData,
    userName,
    userRole,
    values,
    clickedButtonData,
    stepdetails
  ) => {
    console.log(
      body,
      'dddddddoooooooodyyy',
      props,
      stepdetails?.UploadDocuments
    );
    buttonLoader.setTrue();

    const token = localStorage.getItem('ACCESS_TOKEN');
    if (props.contractModification) {
      TecnotreedigitalSales.post(
        '/bpmn/executeProcess',
        FactoryWorkflow.ContractModificationPayload(
          body,
          props.backOfficeContractData
        )
      )
        .then((resp) => {
          dispatch(Model.close('FormsCreation'));
          dispatch(Model.close('ProductList'));
          dispatch(Model.close('ProductContract'));
          dispatch(Model.close('ModifyContract'));
          LoadingSpin(false);
          dispatch(
            Model.open({
              id: 'SuccessModal',
              context: resp?.data
            })
          );

          dispatch(
            Alert.open({
              type: 'Success',
              message: 'Contract Modification Request Submitted Successfully'
            })
          );
        })

        .catch((err) => {});
    } else {
      let contractObj = {
        COMPANY_REGISTRATION: [
          {
            uid: 'rc-upload-1648721442067-2',
            name: props.contractDocument,
            status: 'done',
            url: 'http://dclm-mmp.cluster1.devtestlab2.tecnotree.com/digital-contract/digital-contract-management-service/v1/fileuploads/30ef8ff3-6e17-4898-b555-a2c834c15ef8mtng_contract-sample-4-filled.pdf',
            dms: {
              id: '62457f02a08f1a0be6df3fa6',
              issueDate: '2022-03-31T10:14:29.981Z',
              expiryDate: '2023-03-23T10:14:31.488Z',
              name: props.contractDocument,
              url: 'http://dclm-mmp.cluster1.devtestlab2.tecnotree.com/digital-contract/digital-contract-management-service/v1/fileuploads/30ef8ff3-6e17-4898-b555-a2c834c15ef8mtng_contract-sample-4-filled.pdf',
              uid: 'rc-upload-1648721442067-2',
              documentype: 'Signoff Document',
              documentName: 'yyiououi',
              status: 'active',
              issuePlace: 'tyutyutiu',
              issueBy: 'uyuiiutiu',
              registerationNumber: '68768767tytiy'
            }
          }
        ]
      };
      if (props.formIdentity === 'Tenant_Partner_Profile') {
        body.TenantProfileCreation.TenantDetails.Partner_ID =
          props.partnerId.id;
        // enable if settelement added in tenent forms

        // body.TenantProfileCreation?.SettlementRuleDetails?.settlementCode =
        //   body.TenantProfileCreation?.SettlementRuleDetails?.Search;
        // delete body.TenantProfileCreation?.SettlementRuleDetails?.Search;
        if (body?.TenantProfileCreation?.EnrolmentCharges?.ONE_TIME_CHARGES) {
          if (
            body.TenantProfileCreation.EnrolmentCharges.ONE_TIME_CHARGES === ''
          ) {
            body.TenantProfileCreation.EnrolmentCharges.ONE_TIME_CHARGES = 0;
          }
        }
        if (body?.TenantProfileCreation?.EnrolmentCharges?.RECURRING_CHARGES) {
          if (
            body.TenantProfileCreation.EnrolmentCharges.RECURRING_CHARGES === ''
          ) {
            body.TenantProfileCreation.EnrolmentCharges.RECURRING_CHARGES = 0;
          }
        }
      } else if (props.formIdentity === 'Add_Product') {
        body.AddProduct.ProductDetails.Partner_ID = props.partnerId.id;
        body.AddProduct.ProductDetails.PARTNER_NAME = props.partnerId.name;
      } else if (props.prefilledData) {
        // body.AddContractFor.ContractInformation.PRODUCT_ID =
        //   props.productId.contractState.contractDetails.AddContractFor.ContractInformation.PRODUCT_ID;
        // body.AddContractFor.ContractInformation.Partner_ID =
        //   props.partnerId.partnerId;
        body.refNoRegistartion = props.prefilledData.refNoRegistartion;
        body.createdDate = props.prefilledData.createdDate;
        body.lastModifiedDate = props.prefilledData.lastModifiedDate;
        body._id = props.prefilledData._id;

        // body.AddContractFor.ContractInformation.PARTNER_NAME =
        //   props.partnerId.name;
        // var obj = {
        //   ...props.prefilledData
        // };
        // obj.ContractInformation = console.log('BODDYDDYD', body);
      } else if (props.formIdentity === 'Add_Contract' && props.productId) {
        let sectionAdd;
        sectionAdd = body.AddContractFor.sections;
        //upload doc contract obj here for product
        sectionAdd.push('UploadDocuments');
        if (props.productId) {
          (body.AddContractFor.ContractInformation.Agent_ID =
            props.partnerId.Agent_ID),
            (body.AddContractFor.ContractInformation.Agent_Name =
              props.partnerId.FIRST_NAME + ' ' + props.partnerId.LAST_NAME);
          body.AddContractFor.ContractInformation.PRODUCT_ID =
            props.productId?.rowData?.AddProduct?.ProductDetails?.PRODUCT_ID;
          body.AddContractFor.ContractInformation.PRODUCT_NAME =
            props.productId?.rowData?.AddProduct?.ProductDetails?.PRODUCT_NAME;
          body.AddContractFor.ContractInformation.Partner_ID =
            props.partnerId?.partnerId?.partnerId;
          body.AddContractFor.ContractInformation.Partner_Name =
            props.partnerId?.partnerId?.name;
          body.AddContractFor.ContractInformation.Settelement_Code =
            props.settlementCode;
          body.AddContractFor.ContractInformation.cmId = props.CmsDetails?.id;
          console.log(stepdetails?.UploadDocuments, 'moudoc');
          body.AddContractFor.UploadDocuments = {
            ...contractObj,
            ...stepdetails?.UploadDocuments
          };
          console.log('submit payload', body.AddContractFor.UploadDocuments);
          // body.AddContractFor.PartnerDetails={
          //   PartnerName:props.productId.rowData.AddProduct.ProductDetails.PARTNER_NAME,
          //   PartnerId:props.productId.rowData.AddProduct.ProductDetails.Partner_ID,
          // }

          // body.AddContractFor.ProductDetails={
          //   ProductName:props.productId.rowData.AddProduct.ProductDetails.PRODUCT_NAME,
          //   ProductId:props.productId.rowData.AddProduct.ProductDetails.PRODUCT_ID,
          // }

          body.AddContractFor.ContractInformation.Commission_Code =
            props.commissionCode;
          // contract management document paylaod add
          if (props.commissionCode && props.settlementCode) {
            body.AddContractFor.sections = sectionAdd;
          }
          body.AddContractFor.UploadDocuments = contractObj;
        } else {
          body.AddContractFor.ContractInformation.Partner_ID =
            props.partnerId.id;
        }
      } else if (props.formIdentity === 'Add_Contract') {
        body.AddContractFor.UploadDocuments = {
          ...contractObj,
          ...stepdetails?.UploadDocuments
        };
        body.AddContractFor.ContractInformation.cmId = props?.CmsDetails?.id;
        body.AddContractFor.ContractInformation.Partner_ID = props.partnerId.id;
        body.AddContractFor.ContractInformation.Partner_Name =
          props.partnerId?.name;

        // body.AddContractFor.PartnerDetails = {
        //   PartnerName: props.partnerId.name,
        //   PartnerId: props.partnerId.id
        // };

        // body.AddContractFor.ContractInformation.PARTNER_NAME = props.partnerId.name;
        // body.AddContractFor.ContractInformation.PARTNER_ID = props.partnerId.id;
        // body.PartnerDetails.PARTNER_NAME = props.partnerId.name;
        // body.PartnerDetails.PARTNER_ID = props.partnerId.id;

        // body.AddContractFor.PRODUCT_NAME = props.productId.name;
        // body.AddContractFor.PRODUCT_ID = props.productId.id;
      } else if (props.formname === 'partnerContract') {
        body.AddContractFor.ContractInformation.Partner_ID = props.partnerId.id;
      } else if (props.formIdentity === 'Contract_Sign_Off') {
        body.contractsignoff.ContractSignoffDetails.CONTRACT_ID =
          props.contractId;
        body.contractsignoff.ContractSignoffDetails.Partner_ID =
          props.partnerId;
      }
      // body.AddProduct.ProductDetails.Partner_ID = props.partnerId.id;
      // api/submitform

      // editable contract form submit api

      if (props.prefilledData) {
        let id = props.prefilledData._id;
        TecnotreedigitalSales.put(`/submit/${props.formIdentity}/${id}`, body, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((respn) => {
            if (respn) {
              form.resetFields();
              LoadingSpin(false);
              setSearchResp({});

              if (FormDisplayData.workFlowId && FormDisplayData.workFlowName) {
                let Ebody = {};
                let parnterID;
                if (props.prefilledData.AddContractFor.ContractInformation) {
                  parnterID =
                    props.prefilledData.AddContractFor.ContractInformation
                      .Partner_ID;
                }

                Ebody['username'] = userName.sub;
                Ebody['userId'] = localStorage.getItem('signinId');
                Ebody['userRole'] = userRole;
                Ebody['executionModeStatus'] = false;
                Ebody['async'] = false;
                Ebody['workflowId'] = FormDisplayData.workFlowId;
                Ebody['formIdentity'] = FormDisplayData.formIdentity;
                Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
                Ebody['Values'] = { ...values };

                if (props.formIdentity === 'Tenant_Partner_Profile') {
                  Ebody['Values']['masterPartnerCatId'] =
                    props.categoryList?.DTT_Category_Id;

                  Ebody['Values']['masterPartnerCatName'] =
                    props.categoryList?.DTT_Category_Name;
                }

                if (props.productId) {
                  Ebody['Values']['PRODUCT_ID'] =
                    props.productId.contractState.contractDetails.AddContractFor.ContractInformation.PRODUCT_ID;
                  Ebody['Values']['CONTRACT_ID'] =
                    props.productId.contractState.contractDetails.AddContractFor.ContractInformation.CONTRACT_ID;
                }
                // if (props.contractId) {
                //   Ebody['Values']['CONTRACT_ID'] = props.contractId;
                // }
                // Ebody['Values']['PARTNER_NAME'] = props.partnerId.name;
                // Ebody['Values']['Partner_ID'] = parnterID;
                Ebody['Values']['loginId'] = localStorage.getItem('id');
                Ebody['Values']['username'] = userName;

                Ebody['Values']['merchantId'] =
                  localStorage.getItem('merchantId');
                Ebody['Values']['accessToken'] =
                  localStorage.getItem('ACCESS_TOKEN');
                TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
                  .then((resp) => {
                    dispatch(Model.close('FormsCreation'));
                    dispatch(Model.close('ProductList'));
                    dispatch(Model.close('ProductContract'));
                    dispatch(Model.close('ModifyContract'));

                    // props.closeDrawer();
                    // message.success(`Success`, 1);

                    let taskType = resp?.data?.taskType;
                    //props.closeDrawer();
                    if (taskType === 'FormTask') {
                      resp.data.Values.formIdentity
                        ? setFormIdentity(resp.data.Values.formIdentity)
                        : '';
                      // : console.log(
                      //     'form......... not there',
                      //     resp.data.Values.formIdentity
                      //   );
                      setShowFormtaskModal(true);
                      let parseData = JSON.parse(resp.data.taskResponse);
                      setTaskResponse(parseData);
                      if (
                        !props.partnerId?.Agent_ID.startsWith('AGENT') ||
                        !props.partnerId.startsWith('AGENT')
                      ) {
                        getHierarchy();
                      }

                      props.closeDrawer();
                      dispatch(Model.close({ id: 'ButtomDrawer' }));
                      dispatch(Model.close('FormsCreation'));
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

                          // history.push({
                          //   pathname: `/digital-prm-web-ui/`
                          // });
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
                            // props.closeDrawer();
                            dispatch(Model.close('FormsCreation'));
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
                        `${
                          props.formName
                            ? 'Successfully submitted'
                            : 'Form Submitted..'
                        }`,
                        2
                      );
                      //props.closeDrawer();
                      dispatch(Model.close({ id: 'ButtomDrawer' }));
                      // history.push('/');
                    }
                  })

                  .catch((err) => {
                    message.error(`Failed`, 1);
                    dispatch(Model.close({ id: 'ButtomDrawer' }));
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
                  `${
                    props.formName
                      ? 'Successfully submitted'
                      : 'Form Submitted..'
                  }`,
                  2
                );

                props.closeDrawer();
                dispatch(Model.close({ id: 'ButtomDrawer' }));
              }
            }
          })

          .catch((err) => {
            console.log(err, 'error1');
            LoadingSpin(false);
            message.error('Error in saving the Form', 1);
          });
      }

      //  other forms submit api
      else {
        if (
          props.formIdentity === 'Add_Contract' &&
          props.contractDocument === undefined
          //comented for temppppp
        ) {
          if (
            (props.contractDocument === undefined &&
              props.CmsDetails === undefined) ||
            (Object.keys(props.CmsDetails).length === 0 &&
              props.formIdentity === 'Add_Contract')
          ) {
            LoadingSpin(false);
            buttonLoader.setFalse();
            dispatch(
              Alert.open({
                type: 'error',
                message: 'Please add documents'
              })
            );
          }
        } else {
          if (props?.partnerId && props.formIdentity === 'Contract_Sign_Off') {
            body['contractsignoff']['ContractSignoffDetails']['Agent_ID'] =
              props?.partnerId;
          }
        }
        if (props.formIdentity === 'Add_Contract' && props.productId) {
          body.AddContractFor.UploadDocuments = {
            ...contractObj,
            ...stepdetails?.UploadDocuments
          };
        }

        console.log(body, 'payload for submit');
        TecnotreedigitalSales.post('/submit', body, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((respn) => {
            console.log(
              respn,
            
              respn?.data?.AddContractFor?.ContractInformation?.CONTRACT_ID
            );

            if (respn) {
              form.resetFields();
              LoadingSpin(false);
              setSearchResp({});

              // if (props.contractId) {
              //   props.handleloadcontracts(props.contractId);
              // }

              if (FormDisplayData.workFlowId && FormDisplayData.workFlowName) {
                let Ebody = {};
                let parnterID;
                if (props.partnerId?.id) {
                  parnterID = props.partnerId.id;
                } else if (props.formIdentity === 'Add_Contract') {
                  parnterID = props?.partnerId?.partnerId?.partnerId;
                } else if (
                  props.formIdentity === 'Add_Contract' ||
                  props.editable === 'true'
                ) {
                  parnterID =
                    props?.prefilledData?.AddContractFor?.ContractInformation
                      .Partner_ID;
                } else {
                  parnterID = props?.partnerId;
                }
                Ebody['username'] = userName.sub;
                Ebody['userId'] = localStorage.getItem('signinId');
                Ebody['userRole'] = userRole;
                Ebody['executionModeStatus'] = false;
                Ebody['async'] = false;
                if (props.formIdentity === 'Contract_Sign_Off') {
                  Ebody['workflowId'] =
                    props?.partnerId?.Agent_ID ||
                    props?.partnerId.includes('AG')
                      ? masterdata.resellerSignOffContract
                      : masterdata.partnerSignOffContract;
                } else {
                  Ebody['workflowId'] = props?.partnerId?.Agent_ID?.includes(
                    'AG'
                  )
                    ? masterdata?.resellerContractCreation
                    : masterdata?.partnerContractCreation;
                }
                if (props.formIdentity === 'Add_Product') {
                  Ebody['workflowId'] = masterdata.partnerProductCreation;
                }

                if (props.formIdentity === 'Tenant_Partner_Profile') {
                  Ebody['workflowId'] = masterdata.tenantPartnerCreation;
                }
                
                Ebody['formIdentity'] = FormDisplayData.formIdentity;
                Ebody['stepIdentity'] = FormDisplayData.stepIdentity;
                Ebody['Values'] = {
                  ...values,
                  ...workflowPayload.returnWorkflowData(
                    props.backOfficeContractData?.AddContractFor
                      ?.ContractInformation?.Partner_ID || props.partnerId?.id,
                    props.partnerId?.email,
                    props.partnerId?.mobile,
                    props.backOfficeContractData?.AddContractFor
                      ?.ContractInformation.PARTNER_NAME ||
                      props.partnerId?.name,
                    '',
                    props?.contractId || ''
                  )
                };
                if (props.formIdentity === 'Add_Contract') {
                  Ebody['Values']['CONTRACT_ID'] =
                    respn?.data?.AddContractFor?.ContractInformation?.CONTRACT_ID;
                }

                if (Ebody['Values']['ONE_TIME_CHARGES'] === '') {
                  Ebody['Values']['ONE_TIME_CHARGES'] = 0;
                }
                if (props.formIdentity === 'Add_Contract' && props.productId) {
                  Ebody['Values']['PARTNER_NAME'] =
                    props.partnerId?.name || props.partnerId?.partnerId?.name;

                  // Ebody['Values']['PARTNER_NAME'] =
                  //   props.partnerId.partnerId.name;
                  Ebody['Values']['PRODUCT_ID'] =
                    props.productId?.rowData?.AddProduct?.ProductDetails?.PRODUCT_ID;
                } else if (props.formIdentity === 'Add_Product') {
                  Ebody['Values']['PARTNER_NAME'] = props.partnerId?.name;

                  // Ebody['Values']['acceptanceStatus'] = 'open';
                } else if (props.formIdentity === 'Add_Contract') {
                  Ebody['Values']['PARTNER_NAME'] = props.partnerId?.name;

                  // Ebody['Values']['PARTNER_NAME'] = props.partnerId.name;
                }
                if (props.formIdentity === 'Add_Contract') {
                  Ebody['Values']['contract'] = respn?.data;
                }

                if (
                  props.contractId &&
                  !(props.formIdentity === 'Add_Contract')
                ) {
                  Ebody['Values']['CONTRACT_ID'] = props.contractId;
                  Ebody['Values']['PARTNER_NAME'] = props.partnerId?.name;
                  // Ebody['Values']['Partner_Name'] = props.props.partnerId.name;
                }

                if (props.formIdentity === 'Tenant_Partner_Profile') {
                  Ebody['Values']['settlementCode'] =
                    body?.TenantProfileCreation?.SettlementRuleDetails?.settlementCode;
                  Ebody['Values']['masterPartnerCatId'] =
                    props.categoryList?.DTT_Category_Id;

                  Ebody['Values']['masterPartnerCatName'] =
                    props.categoryList?.DTT_Category_Name;

                  // Ebody['Values']['Wallet_Bal'] =
                  //   -body.TenantProfileCreation.ENROLMENTCHARGES.ONE_TIME_CHARGES;
                }
                if (
                  props.backOffice &&
                  props.formIdentity === 'Add_Contract' &&
                  props.backOfficeContractData?.AddContractFor
                    ?.ContractInformation
                ) {
                  Ebody['Values']['Partner_ID'] =
                    props.backOfficeContractData?.AddContractFor?.ContractInformation?.Partner_ID;
                  Ebody['Values']['PARTNER_NAME'] =
                    props.backOfficeContractData?.AddContractFor?.ContractInformation?.PARTNER_NAME;
                }

                if (props.contractType) {
                  if (props.contractType === 'ProductContract') {
                    Ebody['Values']['contractType'] =
                      'Product Contract Approval';
                  } else {
                    Ebody['Values']['contractType'] =
                      'Partner Contract Approval';
                  }
                }
                Ebody['Values']['Partner_ID'] = parnterID;
                Ebody['Values']['loginId'] = localStorage.getItem('id');
                Ebody['Values']['username'] = userName;
                Ebody['Values']['merchantId'] =
                  localStorage.getItem('merchantId');
                Ebody['Values']['date'] = new Date();
                Ebody['Values']['userName'] = userName?.sub;
                Ebody['Values']['userId'] = Loginuser?.id;
                if(props.formIdentity === props?.docsInfo?.formType) {
                  Ebody['workflowId'] = dealerMasterData
                  Ebody['Values']['Agent_ID'] = body?.ResellerProfileCreation?.SubDealerShopDetails?.Agent_ID || body?.ResellerProfileCreation?.SubDealerEmployeeDetails.Agent_ID
                  Ebody['Values']['agentId'] = body?.ResellerProfileCreation?.SubDealerShopDetails?.Agent_ID || body?.ResellerProfileCreation?.SubDealerEmployeeDetails.Agent_ID
                  Ebody['Values']['pId'] = props.docsInfo?.pid            
                }
                else {
                  Ebody['Values']['Agent_ID'] =
                  props?.partnerId?.Agent_ID || props?.partnerId;
                }
    
                Ebody['Values']['Agent_Name'] =
                  props?.partnerName ||
                  props?.partnerId?.FIRST_NAME +
                    ' ' +
                    props?.partnerId?.LAST_NAME;
                Ebody['Values']['agentEmail'] =
                  props?.modalcontext?.agentObj?.AgentDetails?.EMAIL;
                Ebody['Values']['agentMobile'] =
                  props?.modalcontext?.agentObj?.AgentDetails?.MSISDN;
                Ebody['Values']['subStatus'] = 'draft';
                Ebody['Values']['channel'] = 'DPRM';
                Ebody['Values']['accessToken'] =
                  localStorage.getItem('ACCESS_TOKEN');
                  TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
                  .then((resp) => {
                    console.log(
                      resp,
                      resp.data?.apiResponse?.statusCodeValue,
                      'response'
                    );

                    if (resp.data?.notification?.approvalRequired === 'false') {
                      dispatch(
                        Alert.open({
                          type: 'success',
                          message: `${resp.data?.notification?.message}`
                        })
                      );

                      dispatch(Model.close('FormsCreation'));
                      dispatch(Model.close('ProductList'));
                      dispatch(Model.close('ProductContract'));
                      dispatch(Model.close('ModifyContract'));
                      dispatch(Model.close('createContract'));

                      return;
                    } else if (
                      resp.data?.apiResponse?.statusCodeValue === 200
                    ) {
                      buttonLoader.setFalse();
                      dispatch(Model.close('createContract'));
                      dispatch(Model.close('FormsCreation'));
                      dispatch(Model.close('ProductContract'));
                      console.log(
                        props,
                        props?.partnerId,
                        props.partnerId?.formIdentity,
                        props.partnerId?.formIdentity,
                        'ch3eckkkkkkkkkkkkkkkk24'
                      );

                      // if(props.formIdentity === "Add_Contract") {
                      //   history.push({
                      //     pathname: '/digital-prm-web-ui/ContractSuccessPage',
                      //     details: resp.data
                      //   })
                      // }

                      if (props.partnerId?.Agent_ID && !props.message) {
                        history.push({
                          pathname: '/digital-prm-web-ui/ContractSuccessPage',
                          details: resp.data
                        });
                                         
                      } 
                      else if(props.partnerId?.Agent_ID && props.message){
                        dispatch(
                          Alert.open({
                            type: 'Success',
                            message: props.message || {}
                          })
                        );  
                      }
                      else if (!props?.partnerId?.Agent_ID) {
                        // history.push({
                        //   pathname: '/digital-prm-web-ui',
                        //   details: resp.data
                        // });
                        dispatch(
                          Alert.open({
                            type: 'Success',
                            message: props.message
                          })
                        );
                        dispatch(
                          Model.open({
                            id: 'SuccessModal',
                            context: {
                              message: props.message,
                              data: resp?.data || {}
                            }
                            // reqId:resp?.data?.notification?.requestId
                          })
                        );
                      }

                      // if(!(props.formIdentity === "Add_Contract" && !(props?.partnerId?.Agent_ID || props?.partnerId))) {
                      //   dispatch(
                      //     Model.open({
                      //       id: 'SuccessModal',
                      //       context: {
                      //         message: props.message,
                      //         data: resp?.data || {}
                      //       }
                      //       // reqId:resp?.data?.notification?.requestId
                      //     })
                      //   );
                      // }
                    } else {
                      buttonLoader.setFalse();
                      dispatch(
                        Alert.open({
                          type: 'error',
                          message: 'Please try again'
                        })
                      );

                      dispatch(Model.close('ContractSignpreview'));
                      dispatch(Model.close('SuccessModal'));
                      dispatch(Model.close('createContract'));
                      dispatch(Model.close('FormsCreation'));
                      dispatch(Model.close('ProductContract'));
                    }


                    if (props.formIdentity === 'Add_Contract') {
                      TecnotreedigitalSales.post(
                        '/bpmn/executeProcess',
                        FactoryWorkflow.ExtraCmsUpdatePayload(
                          values?.CONTRACT_ID,
                          parnterID,
                          props?.partnerId?.Agent_ID
                        )
                      )
                        .then(() => {})
                        .catch((err) => err);
                    }
                    if (!props.partnerId?.Agent_ID) {
                      props?.handleloadcontracts &&
                        props.handleloadcontracts(props.contractId);

                      buttonLoader.setFalse();
                      dispatch(Model.close('FormsCreation'));
                      dispatch(Model.close('ProductList'));
                      dispatch(Model.close('ProductContract'));

                      // dispatch(
                      //   Alert.open({
                      //     type: 'Success',
                      //     message: props.message
                      //   })
                      // );
                    }
                    let taskType = resp?.data?.taskType;

                    if (
                      !props.partnerId?.Agent_ID?.startsWith('AGENT')
                      
                    ) {
                      getHierarchy();
                    }
                    if (taskType === 'FormTask') {
                      resp.data.Values.formIdentity
                        ? resp.data.Values.formIdentity
                        : '';
                      setShowFormtaskModal(true);
                      let parseData = JSON.parse(resp.data.taskResponse);
                      setTaskResponse(parseData);

                      if (
                        !props.partnerId?.Agent_ID.startsWith('AGENT') 
                        
                      ) {
                        getHierarchy();
                      }
                      props.closeDrawer();
                      dispatch(Model.close({ id: 'ButtomDrawer' }));
                      if (props.formIdentity === 'Tenant_Partner_Profile') {
                        dispatch(Model.close('FormsCreation'));
                      }
                    } else {
                      if (resp.data.notification) {
                        if (
                          resp.data.notification.typeofResponse &&
                          resp.data.notification.typeofResponse === 'popup'
                        ) {
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
                          if (resp?.data?.taskType === 'Hold') {
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
                          // dispatch(Model.close('FormsCreation'));
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
                            // setFieldStatus('error');
                            // message.error(resp.data.notification.message, 1);
                            // LoadingSpin(false)
                            // setStatusId(resp.data.name);
                          }
                        }
                      }
                    }
                  })

                  .catch((err) => {
                    console.log(err, 'errrrrrrrr24');
                    // message.error(`Failed here in else `, 3);
                    dispatch(Model.close({ id: 'ButtomDrawer' }));
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
                  `${
                    props.formName
                      ? 'Successfully submitted'
                      : 'Form Submitted..'
                  }`,
                  2
                );

                props.closeDrawer();

                dispatch(Model.close('ContractSignpreview'));
                dispatch(Model.close('FormsCreation'));
              }
            }
          })

          .catch((err) => {
            LoadingSpin(false);
            console.log(err, 'error2');
            message.error('Error in saving the Form', 1);
          });
      }
    }
  };
  const onFormFinish = (values) => {
    let body = values ? values : {};

    // const token = localStorage.getItem("ACCESS_TOKEN");
    // const getBodyData = getBody(body);
    // TecnotreedigitalSales.post("/submit", ...getBody(body))
    //   .then((resp) => {
    //   })
    //   .catch((err) => {
    //   });
    // if (clickedButtonData.buttonType === 'cancel') {
    //   history.push('/');
    //   return;
    // }
    // let FormDisplayData = stepList[0];
    // if (clickedButtonData.buttonType === 'onClick') {
    //   if (clickedButtonData.methodType === 'POST') {
    //     let body = values ? values : {};
    //     TecnotreedigitalSales.post(clickedButtonData.Api, body)
    //       .then((resp) => {
    //       })
    //       .catch((err) => {
    //       });
    //   }
    // } else {
    //   if (FormDisplayData.customStep) {
    //     FormDisplayData.stepCategory === 'Recursive step'
    //       ? onCustomRecursiveFinish(values, FormDisplayData)
    //       : onCustomFinish(values, FormDisplayData);
    //   } else {

    let data = Object.assign({}, values);
    if (values.ONE_TIME_CHARGES === '') {
      data.ONE_TIME_CHARGES = 0;
    } else {
      data.ONE_TIME_CHARGES = parseInt(values.ONE_TIME_CHARGES);
    }
    // data.ONE_TIME_CHARGES = parseInt(values.ONE_TIME_CHARGES);
    let FormDisplayData = stepList[0];
    triggerFreeStep(data, FormDisplayData);

    //   }
    // }
    // refresh
  };

  const onCustomRecursiveFinish = (values, FormDisplayData) => {
    let arr = FormDisplayData.stepProperties.RecursiveCard;
    let Mid = localStorage.getItem('Mid');
    let Pid = localStorage.getItem('Pid');
    let userDetails = localStorage.getItem('userDetails');
    let CustomeMid = localStorage.getItem('CustomeMid');
    // new Date().getTime() % 100

    arr = arr.map((user) => {
      return {
        id: user.id,
        key: user.recursivekey,
        value: values[user.recursiveValue]
      };
    });
    if (userDetails.indexOf('CustomeMid') !== -1) {
      userDetails = JSON.parse(userDetails);
    } else {
      userDetails = {};
      userDetails['CustomeMid'] = CustomeMid;
      userDetails['arr'] = arr;
    }

    let CustomMidJson = props.CustomMidJson,
      sectionArr = [],
      valueObj = {};

    let obj = CustomMidJson.steps ? CustomMidJson[CustomMidJson.steps[0]] : {};
    FormDisplayData.column.forEach((col) => {
      let section = FormDisplayData.sectionlist[col];
      let initialValue = {};

      sectionArr.push(section.sectiontitle);
      section &&
        section.arr.forEach((item) => {
          if (item.type === 'capture') {
            values[item.name] = props.captureData;
          } else {
            valueObj[section.sectiontitle] = {};
            valueObj[section.sectiontitle] = {
              ...initialValue,
              [item.name]: values[item.name] ? values[item.name] : ''
            };
            initialValue = {
              ...initialValue,
              [item.name]: values[item.name] ? values[item.name] : ''
            };
          }
        });
    });
    let StepDetails = {};
    console.log(valueObj, 'viewobj');
    valueObj = { ...valueObj, userDetails };
    StepDetails['sections'] = sectionArr;
    StepDetails['stepIdentity'] = FormDisplayData.stepIdentity;
    StepDetails['customStep'] = true;
    StepDetails['midStep'] = [];
    StepDetails['mid'] = [];
    if (obj.customStep) {
      let mid = obj.mid;
      let midStep = obj.midStep;
      let CheckMid = mid.includes(CustomeMid);
      if (!CheckMid) {
        mid.push(CustomeMid);
        midStep.push(valueObj);
        StepDetails['mid'] = mid;
        StepDetails['midStep'] = midStep;
      } else {
        midStep.forEach((step, index) => {
          if (step.userDetails.CustomeMid === CustomeMid) {
            midStep[index] = valueObj;
          }
        });
        StepDetails['mid'] = mid;
        StepDetails['midStep'] = midStep;
      }
    } else {
      StepDetails['mid'].push(CustomeMid);
      StepDetails['midStep'].push(valueObj);
    }

    let trimstepId = FormDisplayData.stepIdentity
      .split(' ')
      .filter((s) => s)
      .join('');
    let body = getBody(FormDisplayData, trimstepId, sectionArr, StepDetails);
    let getName = FormDisplayData.stepIdentity;

    if (getName) {
      message.loading('Action in progress..', 2.0).then(() => {
        // TecnotreedigitalSales/submitform
        TecnotreedigitalSales.post('/submit', body)
          .then((resp) => {
            if (resp) {
              let data = resp.data;
              let Midcollection = [];

              let object = data[data.steps[0]];

              Midcollection = object.midStep;

              props.getMidCollection(Midcollection);

              props.getCustomMidJson(resp.data);
              props.SetCustomDisplay(false);
              localStorage.setItem('userDetails', '');
              localStorage.setItem('CustomeMid', '');
              // props.onRecursiveImgClick(false);
              form.resetFields();
            }
          })
          .catch((err) => {
            console.log(err, 'error3');
            message.error('Error in saving the Form');
          });
      });
    } else {
      props.getCustomMidJson({});
      history.push(`${config.basePath}businessType`);
    }
  };

  const onCustomFinish = (values, FormDisplayData) => {
    let userDetails = localStorage.getItem('userDetails');
    let Mid = localStorage.getItem('Mid');
    let Pid = localStorage.getItem('Pid');
    let CustomeMid = localStorage.getItem('CustomeMid');

    if (userDetails.indexOf('name') !== -1) {
      userDetails = JSON.parse(userDetails);
    } else {
      message.error('Error in creating MID , Please create again');
      props.SetCustomDisplay(false);
      return;
    }
    let CustomMidJson = props.CustomMidJson,
      sectionArr = [],
      valueObj = {};
    let initialValue = {};
    let obj = CustomMidJson.steps ? CustomMidJson[CustomMidJson.steps[0]] : {};
    FormDisplayData.column.forEach((col) => {
      let section = FormDisplayData.sectionlist[col];
      sectionArr.push(section.sectiontitle);
      section &&
        section.arr.forEach((item) => {
          if (item.type === 'capture') {
            values[item.name] = props.captureData;
          } else {
            valueObj[section.sectiontitle] = {};
            valueObj[section.sectiontitle] = {
              ...initialValue,
              [item.name]: values[item.name] ? values[item.name] : ''
            };
            initialValue = {
              ...initialValue,
              [item.name]: values[item.name] ? values[item.name] : ''
            };
          }
        });
    });
    let StepDetails = {};
    valueObj = { ...valueObj, userDetails };
    StepDetails['sections'] = sectionArr;
    StepDetails['stepIdentity'] = FormDisplayData.stepIdentity;
    StepDetails['customStep'] = true;
    StepDetails['midStep'] = [];
    StepDetails['mid'] = [];
    if (obj.customStep) {
      let mid = obj.mid;
      let midStep = obj.midStep;
      let CheckMid = mid.includes(CustomeMid);
      if (!CheckMid) {
        mid.push(CustomeMid);
        midStep.push(valueObj);
        StepDetails['mid'] = mid;
        StepDetails['midStep'] = midStep;
      } else {
        midStep.forEach((step, index) => {
          if (step.userDetails.customerId === CustomeMid) {
            midStep[index] = valueObj;
          }
        });
        StepDetails['mid'] = mid;
        StepDetails['midStep'] = midStep;
      }
    } else {
      StepDetails['mid'].push(CustomeMid);
      StepDetails['midStep'].push(valueObj);
    }

    let trimstepId = FormDisplayData.stepIdentity
      .split(' ')
      .filter((s) => s)
      .join('');
    let body = getBody(FormDisplayData, trimstepId, sectionArr, StepDetails);
    // body.AddProduct.ProductDetails.Partner_ID = "MP12B64Y";
    let getName = FormDisplayData.stepIdentity;

    if (getName) {
      message.loading('Action in progress..', 2.0).then(() => {
        // let payload = {
        //   ...body,
        //   partner_id: props.partnerId,
        // };
        // TecnotreedigitalSales/submitform
        TecnotreedigitalSales.post('/submit', body)
          .then((resp) => {
            if (resp) {
              let data = resp.data;
              let Midcollection = [];
              let objct = data[data.steps[0]];
              Midcollection = objct.midStep;
              props.getMidCollection(Midcollection);
              props.getCustomMidJson(resp.data);
              props.SetCustomDisplay(false);
              localStorage.setItem('userDetails', '');
              form.resetFields();
            }
          })
          .catch((err) => {
            console.log(err, 'error4');
            message.error('Error in saving the Form');
          });
      });
    } else {
      props.getCustomMidJson({});
      history.push(`${config.basePath}businessType`);
    }
  };

  const triggerFreeStep = (values, FormDisplayData) => {
    LoadingSpin(true);
    let sectionArr = [];
    let valueObj = {};
    let tempValue = {};
    FormDisplayData.column.forEach((col) => {
      let section = FormDisplayData.sectionlist[col];

      console.log(values, 'valaxxxx', FormDisplayData.column);
      let secObj = FormDisplayData.sectionlist[col].arr.map((item) => {
        return {
          ...item,
          name:
            item?.label === 'TIN/TAX DOCUMENTS'
              ? 'TIN/TAX_DOCUMENT'
              : item?.label === 'FINANCIAL STATEMENTS'
              ? 'FINANCIAL_DOCUMENTS'
              : item.name
        };
      });
      let sectionName = section?.sectionName
        ? section?.sectionName
        : section?.sectiontitle;

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

    let StepDetails = {};
    StepDetails['sections'] = sectionArr;
    StepDetails['stepIdentity'] = FormDisplayData.stepIdentity;
    StepDetails['customStep'] = false;
    StepDetails['status'] = 'pending';

    console.log(valueObj, 'valueobj');
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
    let body = getBody(FormDisplayData, trimstepId, sectionArr, StepDetails);

    let getName = FormDisplayData.stepIdentity;
    if (getName) {
      triggerAPI(
        body,
        FormDisplayData,
        userName,
        userRole,
        tempValue,
        clickedButtonData,
        StepDetails
      );
    }
    console.log(body, ' console.log(body) console.log(body) console.log(body)');
  };

  const getBody = (FormDisplayData, trimstepId, sectionArr, StepDetails) => {
    console.log(StepDetails, 'steppers', trimstepId);
    let body = {};
    let comCode = {
      CommisionRuleDetails: {
        Commission_Rule: props.commissionCode
      }
      // Commission_Rule: {}
    };

    if (props.editable === true) {
      body['mid'] = '';
      body['pid'] = '';
      body['formIdentity'] = FormDisplayData.formIdentity;
      body['formName'] = FormDisplayData.formName;
      body['steps'] = [`${trimstepId}`];
      body['_id'] = props.prefilledData._id;
      body[`${trimstepId}`] = {};
      body[`${trimstepId}`]['stepIdentity'] = FormDisplayData.stepIdentity;
      body[`${trimstepId}`][`section`] = [...sectionArr];
      body[`${trimstepId}`] = { ...StepDetails, ...comCode };
      if (props.paramsList && props.paramsList.length !== 0) {
        body['paramsList'] = props.paramsList;
      }
    } else {
      body['mid'] = '';
      body['pid'] = '';
      body['formIdentity'] = FormDisplayData.formIdentity;
      body['formName'] = FormDisplayData.formName;
      body['steps'] = [`${trimstepId}`];

      // body['AddContractFor']['stepRefNo'] = '';
      body[`${trimstepId}`] = {};
      body[`${trimstepId}`]['stepIdentity'] = FormDisplayData.stepIdentity;
      body[`${trimstepId}`][`section`] = [...sectionArr];
      console.log(StepDetails, 'stepdetails');
      body[`${trimstepId}`] = { ...StepDetails };
      // body[`${trimstepId}`]["UploadDocuments"] = [...]
      // body.AddProduct.ProductDetails.Partner_ID = props.partnerId;

      if (props.paramsList && props.paramsList.length !== 0) {
        body['paramsList'] = props.paramsList;
      }
    }

    console.log(body, 'JEKKERS');
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
                        setStatusId(resp.data.name);
                      } else {
                        setFieldStatus('error');
                        message.error(resp.data.notification.message, 1);
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
                    `${
                      props.formName
                        ? 'Successfully submitted'
                        : 'Form Submitted..'
                    }`,
                    2
                  );
                }
                props.reloadTableData();
              })

              .catch((err) => {
                message.error(`Failed`, 1);
                dispatch(Model.close({ id: 'ButtomDrawer' }));
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
              `${
                props.formName ? 'Successfully submitted' : 'Form Submitted..'
              }`,
              2
            );
          }
        }
      })
      .catch((err) => {
        LoadingSpin(false);
        console.log(err, 'error5');
        message.error('Error in saving the Form', 1);
      });
  };

  // const onDropDownChange = (value, regex, data) => {
  //   if (data.name === 'CONTRACT_PERIOD') {
  //     setContractDuration(value);
  //     if (contractStartDate && value) {
  //       getEndDate(contractStartDate, value);
  //     }
  //   }

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
  //       TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
  //         .then((resp) => {
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
    if (data.name === 'CONTRACT_PERIOD') {
      setContractDuration(value);
      if (contractStartDate && value) {
        getEndDate(contractStartDate, value);
      }
    }
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
                      ParseStr = `${
                        _.isArray(JSON.parse(values[item]))
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
                  props.reloadTableData();
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
                  // console.log('error in metod ', er);
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
                  //  console.log('Error at field Arr', err);
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
                  console.log('Error at field Arr', err);
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
              } else if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populateBlock'
              ) {
                setFieldStatus(resp.data.notification.status);
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

                try {
                  let tempData = stepList[0];
                  Object.keys(tempData.sectionlist).map((section) => {
                    tempData.sectionlist[section].arr.map((secdata) => {
                      if (
                        Object.keys(resp.data.notification).includes(
                          secdata.name
                        )
                      ) {
                        secdata.editable = false;
                      }
                    });
                  });
                  setStepList([tempData]);
                  form.setFieldsValue(resp.data.notification);
                  LoadingSpin(false);
                } catch (er) {
                  LoadingSpin(false);
                }
              } else {
                if (resp.data.notification.status === 'success') {
                  setFieldStatus('success');
                  message.success(resp.data.notification.message, 1);
                  setStatusId(data.name);
                } else {
                  setFieldStatus('error');
                  message.error(resp.data.notification.message, 1);
                  setStatusId(data.name);
                }
              }
            } else {
              setFieldStatus('success');
              LoadingSpin(false);
              setStatusId(data.name);
            }
            props.reloadTableData();
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
            } else if (
              resp.data.notification.typeofResponse &&
              resp.data.notification.typeofResponse === 'populateBlock'
            ) {
              if (value) {
                setFieldStatus(resp.data.notification.status);
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
              } else if (!value) {
                const removeValue = resp.data.notification;
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
                Object.keys(removeValue).map((item) => {
                  form.setFieldsValue({
                    [item]: null,
                    editable: false
                  });
                });
                //form.setFieldsValue(null);
                LoadingSpin(false);
              }
            } else if (
              resp.data.notification.typeofResponse &&
              resp.data.notification.typeofResponse === 'populateUnBlock'
            ) {
              setFieldStatus(resp.data.notification.status);

              try {
                let tempData = stepList[0];
                Object.keys(tempData.sectionlist).map((section) => {
                  tempData.sectionlist[section].arr.map((secdata) => {
                    if (
                      Object.keys(resp.data.notification).includes(secdata.name)
                    ) {
                      secdata.editable = false;
                    }
                  });
                });
                setStepList([tempData]);
                form.setFieldsValue(resp.data.notification);
                LoadingSpin(false);
              } catch (er) {
                LoadingSpin(false);
              }
            } else {
              if (resp.data.notification.status === 'success') {
                setFieldStatus('success');
                message.success(resp.data.notification.message, 1);
                setStatusId(data.name);
              } else {
                setFieldStatus('error');
                message.error(resp.data.notification.message, 1);
                setStatusId(data.name);
              }
            }
          } else {
            setFieldStatus('success');
            LoadingSpin(false);
            setStatusId(data.name);
          }
          props.reloadTableData();
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
    // }
    // else if(!value){
    //   try {

    //     setStepList([tempData]);
    //     form.setFieldsValue(null);
    //     LoadingSpin(false);
    //   } catch (er) {
    //     LoadingSpin(false);
    //   }
    // }
    //  else {
    //   setFieldStatus('');
    //   LoadingSpin(false);
    //   setStatusId('');
    // }
  };

  const [stateDate, setStateDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const getEndDate = (contractStartDate, contractDuration) => {
    let payload = {
      date: contractStartDate,
      duration: contractDuration
    };
    TecnotreedigitalSales.post('/date/dateconversion', payload)
      .then((resp) => {
        let contractEndDate = resp.data.contractEndDate;
        let convertedEndDate = {
          END_DATE: moment(contractEndDate)
        };
        form.setFieldsValue(convertedEndDate);
      })
      .catch((err) => {
        return err;
      });
  };

  const onInputChange = (value, regex, data, fieldType) => {
    if (fieldType === 'datepicker') {
      setOnChangeDate(value, data);

      if (data.name === 'START_DATE') {
        setContractStartDate(value);
        setAvailableTo();
        setStateDate(value);
        if (contractDuration && value) {
          getEndDate(value, contractDuration);
        }
      } else if (data.name === 'END_DATE') {
        setendDate(value);
      } else if (data.name === 'AVAILABLE_FROM') {
        setAvailableFrom(value);
      } else if (data.name === 'AVAILABLE_TO') {
        setAvailableTo(value);
      }
    }
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

  const setOnChangeDate = (value, data) => {
    if (data.name === 'END_DATE') {
      setDateOne(value);
    } else {
      // let customDate = dateOne;
      // return value < moment(customDate, 'YYYY-MM-DD');
    }
  };

  function disabledDate(current, data) {
    return current && current < moment().startOf('day');
    //  console.log(moment(stateDate, "YYYY-MM-DD").isAfter((moment(current, "YYYY-MM-DD")), moment(endDate,'YYYY-MM-DD' ).isBefore(moment(current,'YYYY-MM-DD'))))
    //  if(moment(stateDate).isAfter((moment(current))&&moment(current).isBefore(moment(endDate)))){
    //     console.log('object', "succes");

    //  }else{
    //     console.log('erree232')
    //  }

    // if (moment(current).format('YYYY-MM-DD')
    //  .isAfter( moment(stateDate).format('YYYY-MM-DD'))&&
    //  moment(endDate).format('YYYY-MM-DD')< moment(current).format('YYYY-MM-DD')&&
    //   data === 'CONTRACT_VALIDITY'
    // ) {
    //   console.log('succes')
    // } else {
    //   console.log('eeerr');
    // }

    // if (
    //   data === 'CONTRACT_VALIDITY' ||
    //   data === 'AVAILABLE_TO' ||
    //   data === 'AVAILABLE_FROM'
    // ) {
    //   return current && current < moment().startOf('day');
    //   // return (
    //   //   moment(current, 'YYYY-MM-DD') >
    //   //     moment(stateDate, 'YYYY-MM-DD').startOf('day') &&
    //   //   moment(endDate, 'YYYY-MM-DD').startOf('day') <
    //   //     moment(current, 'YYYY-MM-DD')
    //   // );
    // } else {
    //   return current && current < moment().startOf('day');
    // }
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
                setStatusId(data.name);
              } else {
                setFieldStatus('error');
                message.error(resp.data.notification.message, 1);
                setStatusId(data.name);
              }
            } else {
              setFieldStatus('success');
              LoadingSpin(false);
              setStatusId(data.name);
            }
            props.reloadTableData();
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
              } else if (
                resp.data.notification.typeofResponse &&
                resp.data.notification.typeofResponse === 'populateBlock'
              ) {
                setFieldStatus(resp.data.notification.status);
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

                try {
                  let tempData = stepList[0];
                  Object.keys(tempData.sectionlist).map((section) => {
                    tempData.sectionlist[section].arr.map((secdata) => {
                      if (
                        Object.keys(resp.data.notification).includes(
                          secdata.name
                        )
                      ) {
                        secdata.editable = false;
                      }
                    });
                  });
                  setStepList([tempData]);
                  form.setFieldsValue(resp.data.notification);
                  LoadingSpin(false);
                } catch (er) {
                  LoadingSpin(false);
                }
              } else {
                if (resp.data.notification.status === 'success') {
                  setFieldStatus('success');
                  message.success(resp.data.notification.message, 1);
                  setStatusId(data.name);
                } else {
                  setFieldStatus('error');
                  message.error(resp.data.notification.message, 1);
                  setStatusId(data.name);
                }
              }
            } else {
              setFieldStatus('success');
              LoadingSpin(false);
              setStatusId(data.name);
            }
            props.reloadTableData();
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
              props.reloadTableData();
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
    if (btnData.buttonType === 'cancel' || btnData.label === 'Cancel') {
      dispatch(Model.close('ProductContract'));
      dispatch(Model.close('AddProduct'));
      dispatch(Model.close('FormsCreation'));
      dispatch(Model.close('ContractSignpreview'));
      if (props.formIdentity === 'Add_Product') {
        // console.log(`inside add product`)
        props.onClose();
        dispatch(Model.close('AddProduct'));
        setClickedButtonData(btnData);
        return;
      }
      // console.log('inside cancel')
      // dispatch(Model.close('ProductContract'));
    }
    setClickedButtonData(btnData);
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

  const onFinishFailed = (errorFields) => {
    if (clickedButtonData && clickedButtonData.buttonType === 'cancel') {
      history.push('/');
      return;
    }

    validateSection(errorFields).then((resp) => {
      setCurrentError(resp);
    });
  };

  const handleFormtaskModalOk = () => {
    setShowFormtaskModal(false);
  };

  const handleFormtaskModalCancel = () => {
    setShowFormtaskModal(false);
  };

  const onFormTaskFinish = () => {
    setShowFormtaskModal(false);
    if (clickedButtonData.buttonType === 'save') {
      setCurrentError({});
      setCurrentTab(currentTab);
    } else if (clickedButtonData.buttonType === 'proceed') {
      setCurrentError({});
      setCurrentTab(currentTab + 1);
    }
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
                setStatusId(resp.data.name);
              } else {
                setFieldStatus('error');
                message.error(resp.data.notification.message, 1);
                setStatusId(resp.data.name);
              }
            }
          }
          props.reloadTableData();
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
          .then((resp) => {
            return resp;
          })
          .catch((err) => {
            return err;
          });
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
          setSectionTrigger(true);
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

  const onBulkuploadClicked = () => {
    setModalVisibal(true);
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
        Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
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
            props.reloadTableData();
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
      Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
      Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
      TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
        .then((resp) => {
          let respData = resp.data.outputArray[data.outputServiceKey]
            ? resp.data.outputArray[data.outputServiceKey]
            : {};
          respData = respData ? JSON.parse(respData) : {};

          let obj = { ...searchResp };
          obj[data.name] = respData[0] ? respData[0] : {};

          setSearchResp(obj);
          // setSearchCommissionResp(obj);
          if (props.contractModification) {
            data?.name === 'Commission_Rule'
              ? setSearchCommissionResp(obj)
              : setSearchSettelementResp(obj);
          }
          // setFieldStatus('success');
          // setStatusId(data.name);
          setFetching(false);
          LoadingSpin(false);
          props.reloadTableData();
        })
        .catch((err) => {
          setFieldStatus('error');
          setStatusId(data.name);
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
    <>
      <Box
        py={10}
        className={props.formStyle ? 'freestep-box' : 'freestep-box'}
      >
        <div className="card-container">
          {isEmpty ? (
            <>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                direction="column"
                spacing="6"
              >
                <Grid item>
                  <CircularProgress
                    color="primary"
                    size={80}
                    className={classes.loaderClr}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h2">Loading ...</Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Form
                {...layout}
                form={form}
                name={ListOfTabs[currentTab]}
                scrollToFirstError
                onFinish={onFormFinish}
                // onSubmit={onSubmit}
                onFinishFailed={onFinishFailed}
              >
                {stepList[0] && stepList[0].customStep ? (
                  <></>
                ) : (
                  <>
                    <FreeStep
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
                        props && props.type && props.type === 'userProfile'
                          ? 'userProfile'
                          : ''
                      }
                      onSearchFetcher={onSearchFetcher}
                      fetching={fetching}
                      searchOptions={searchOptions}
                      onSearchSelected={onSearchSelected}
                      searchResp={searchResp}
                      disabledDate={disabledDate}
                      formRef={form}
                      formStyle={props.formStyle}
                      modifyContract={
                        props.backOfficeContractData ? true : false
                      }
                      searchSettelementResp={searchSettelementResp}
                      searchCommissionResp={searchCommissionResp}
                      contractModification={props.contractModification}
                      availableFrom={availableFrom}
                      availableTo={availableTo}
                      onClose={props.onClose}
                    />
                  </>
                )}
              </Form>
            </>
          )}
          {showBlackListModal ? (
            <Modal
              visible={showBlackListModal}
              closable={true}
              footer={null}
              zIndex={1300}
              maskClosable={false}
              className="dropdown-modal"
              maskStyle={{
                background: '#2F3542 0% 0% no-repeat',
                opacity: 0.87
              }}
              onCancel={onCancelClick}
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
                    {/* <Button
                      type="text"
                      className="cancel-btn"
                      onClick={onCancelClick}
                      endIcon={<NavigateNext />}
                    >
                      Cancel
                    </Button> */}
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
        </div>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  userDetails: state.setExistingUserReducer.existingUser,
  CustomMidJson: state.getMIDCollection.CustomMidJson,
  captureData: state.setCaptureReducer.dataUri
});

export default BottomSheetFormFields;
