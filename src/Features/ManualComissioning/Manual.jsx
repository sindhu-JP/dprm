import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { history } from 'Store';
import config from 'config';
import { LoadingSpin } from './LoadingSpin';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  TextareaAutosize,
  IconButton,
  InputLabel,
} from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import FormUploadDrawer from '../../Features/Forms/FormUploadDrawer';
import CloseIcon from '@material-ui/icons/Close';
// import FormHelperText from '@material-ui/core/FormHelperText';
import { KeyboardDatePicker } from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';
import { TecnotreedigitalSales } from '../../Http/axios';
import { useStore } from 'react-redux';
import NavigateNext from '@material-ui/icons/NavigateNext';
import * as Yup from 'yup';
// import ArrowForward from '@material-ui/icons/ArrowForward';
// import CopyRightFooter from 'Components/CopyRightFooter/CopyRightFooter';
import ProductDetails from './preview';
import workflowPayload from 'Factory/Worlflowpayload';
import masterdata from 'Http/api/masterdata';
import moment from 'moment';
import NavbarManual from './NavbarManual';
import StepperManual from './StepperManual';
import ManualWarning from './ManualWarning';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import {
  // TecnotreedigitalSales,
  getaccessToken,

  // DAM_DMS,
  TecnotreeDms
} from '../../Http/axios';
import {Formik,Form} from "formik"


 
const SaveManual = Yup.object().shape({
  fromDate: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  toDate: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  comments: Yup.string().min(2, 'Too Short!')
  .max(300, 'Too Long!').required('Required'),
  eventInformation: Yup.array().required("Required")
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  outerColumn: {
    height: 'auto',
    padding: theme.spacing(2)
  },
  centerColumn: {
    height: 'auto',
    padding: theme.spacing(2)
  },
  menuPaper: {
    maxHeight: 130
  },
  homeContainer: {
    // maxHeight: `calc(100vh - ${theme.spacing(30)})`,
    // overflowY: 'auto',
    // overflowX: 'hidden',
    padding: '0',
    marginBottom: '40px'
  },
  topItem: {
    margin: '1.5rem 8.5rem'
  },
  divStyle: {
    backgroundColor: '#EDEDF5',
    height: '100vh',
    paddingBottom: '0'
  },
  proceedBtn: {
    fontSize: '12px',
    background: theme.palette.primary.main,

    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  btnClr: {
    fontSize: '12px',
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
  },
  actionContainer: {
    backgroundColor: 'white',
    padding: '0 40px',
    height: '50px',
    width: '100vw',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center'
  },
  pageHead: {
    height: 'calc(100vh - 110px)',
    overflow: 'scroll',
    scrollBehavior: 'smooth',
    margin: '0',
    paddingTop: '10px'
  },
  menuPaper: {
    '& .MuiMenu-paper': {
      top: '370px !important'
    }
  },
  footer: {
    position: 'fixed',
    padding: '10px',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.common.white
  },
  boxSpacing: {
    '& .MuiOutlinedInput-inputMultiline': {
      height: '5rem !important ',
      overflow: 'auto !important'
    }
  },
}));

// MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded
const Manual = (props) => {
  const [openWarning, setOpenWarning] = React.useState(false);
  const classes = useStyles();
const [title, setTitle] = useState("Upload files here")

  const [errorName, setErrorName] = useState("")
  const [errorFigure, setFigure] = useState("");
  const [errorRangeTo, setRangeTo] = useState(false);
  const [errorAmount, setRangeAmount] = useState(false);

  const [errorCode, setErrorCode] = useState("");
  const [validToDate, setValidTodate] = useState(true)
  const [errorSubFee, setErrorSubFee] = useState(false);
  const [errorElFee, setErrorElFee] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [errorMessageName, setErrorMessageName] = useState(false);
  const [errorMessageCode, setErrorMessageCode] = useState('');
  const [errorMessageSubFee, setErrorMessageSubFee] = useState('');
  const [errorMessageElFee, setErrorMessageElFee] = useState('');
  const [errorMessageRangeFrom, setErrorMessageRangeFrom] = useState('');
  const [errorMessageRangeTo, setErrorMessageRangeTo] = useState('');
  const [errorMessageAmount, setErrorMessageAmount] = useState('');
  const [isSubmitting, setSubmitting] = useState(true);
  const [previewImage, setPreviewImage] = useState('');
  const [isDuplicate, setDuplicate] = useState(false);
  const [hasDuplicate, setHasDuplicate] = useState(false)
  const [settlementCycleData, setSettlementCycleData] = useState([]);
  const [generatedSettlementCode, setGeneratedSettlementCode] = useState('');
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [submitBtn, setSubmitBtn] = useState(false)
  const [masterCurrency, setMasterCurrency] = useState([]);
  const [fileUploadData, setfileuploadData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileDetails, setFileDetails] = useState({});
  const [documentPreview, setDocumentPreview] = useState({})
  const [masterData, setMasterData] = useState('');
  const [currentDuplicate, setCurrentDuplicate] = useState("")
  const [period, setPeriod] = useState("")

  const [disableDate, setDisableDate] = useState(true)
  const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [fileDoc, setFileDoc] = useState([]);
    const [loader, setLoader] = useState(false)
    const [events, setEvents] = useState([]);
    const [comments, setComments] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const [numPages, setNumPages] = useState(null);
    const [eventInformation, setEventInformation] = useState([{
      totalCommission: "",
      unitPrice: "",
      unitsUtilized: "",
      eventName: ""
    }])
    const [periodicityData, setPeriodicityData] = useState([])
    const today = new Date();
    const [eventObject, setEventObject] = useState({totalCommission: "",
      unitPrice: "",
      unitsUtilized: "",
      eventName: ""})
      const [placeHoldereventObject, setPlaceHolderEventObject] = useState({totalCommission: "",
      unitPrice: "",
      unitsUtilized: "",
      eventName: ""})
    const [isFileuploadDrawer, setIsFileuploadDrawer] = useState(false);
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .max(500, 'Maximum 500 characters')
      .min(2, 'Must be More than 2 characters')
      .required('Required')
  });
  const userData = JSON.parse(localStorage.getItem('USER'));
  const { location } = props;
  const [data, setData] = useState({
    startDate: null,
    endDate: null,
    comments: 'wdwqdwqdwdw vddv',
    description: '',
   
    partnerId:
      location?.state?.partnerDetails?.PartnerDetails?.Partner_ID ||
      location?.state?.partnerDetails?.TenantDetails?.TENANT_ID,

    partnerType: location?.state?.partnerDetails?.PartnerDetails?.Partner_ID
      ? 'master'
      : 'tenant',

    ...workflowPayload.returnWorkflowData(
      location?.state?.partnerDetails?.PartnerDetails?.Partner_ID ||
        location?.state?.partnerDetails?.TenantDetails?.TENANT_ID,
      location?.state?.partnerDetails?.PrimaryContactDetails?.EMAIL_ID,
      location?.state?.partnerDetails?.PrimaryContactDetails?.MOBILE_NUMBER,
      location?.state?.partnerDetails?.PartnerDetails?.PARTNER_NAME ||
        location?.state?.partnerDetails?.TenantDetails?.TENANT_NAME,
      location?.state?.partnerDetails?.PrimaryContactDetails
        ?.PRIMARY_CONTACT_NAME,
      ''
    )
  });

  // const periodicity = [
  //   {
  //     name: "Daily",
  //     code: "daily"
  //   },
  //   {
  //     name: "Weekly",
  //     code: "weekly"
  //   },
  //   {
  //     name: "Monthly",
  //     code: "monthly"
  //   },
  //   {
  //     name: "Yearly",
  //     code: "yearly"
  //   }
  // ]
  const handleGetMasterData = async () => {
    const data = await masterdata.DprmMasterdata();
    console.log(data, "datazzz")
    setMasterData(data[0].masterData?.workflowIds?.partnerSuspension);
     setPeriodicityData(data[0].masterData?.manualCommissionPeriodicity)
     console.log(periodicityData,data[0].masterData, "periodicitydata")
     setMasterData(data[0].masterData)
  };
  useEffect(() => {
    handleGetMasterData();
  }, []);

  const store = useStore();

  const reasons = [
    {
        code : "Monthly",
        name : "Monthly"
    },
    {
        code : "Quarterly",
        name: "Quarterly"
    },
    {
        code : "Half-Yearly",
        name : "Half-Yearly"
    },
    {
        code: "Yearly",
        name : "Yearly"
    }
];
  const handleCancel = () => setPreviewOpen(false);
  const [inputFields, setInputFields] = useState([
    { rangeFrom: '', rangeTo: '', amount: '' }
  ]);
  const [inputCycles, setInputCycles] = useState({ from: 0, to: 0 });

  const [percentageAmount, setPercentageAmount] = useState({
    selected: '',
    hasError: false
  });
  const [currency, setCurrency] = useState({
    selected: '',
    hasError: false
  });
  const [settlementPeriod, setSettlementPeriod] = useState({
    selected: '',
    hasError: false
  });
  const [settlementMode, setSettlementMode] = useState({
    selected: '',
    hasError: false
  });
  const [dspCommission, setDspCommission] = useState({
    selected: '',
    hasError: false
  });
  const [settlementCycle, setSettlementCycle] = useState({
    selected: '',
    hasError: false
  });
  const [settlementStartDate, setSettlementStartDate] = useState({
    selected: '',
    hasError: false
  });
  const [settlementDueDate, setSettlementDueDate] = useState({
    selected: '',
    hasError: false
  });
  const [isEmpty, setIsEmpty] = useState({
    hasError: false
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState([{ errorStatus: false, msg: '' }]);
  const [error1, setError1] = useState([{ errorStatus: false, msg: '' }]);
  const [error2, setError2] = useState([{ errorStatus: false, msg: '' }]);
  let i = 0;

  const errorHandler = (index, status, errorMessage) => {
    const newArray = [...error];
    newArray[index] = { errorStatus: status, msg: errorMessage };
    setError(newArray);
  };
  const errorHandler1 = (index, status, errorMessage) => {
    const newArray1 = [...error1];
    newArray1[index] = { errorStatus: status, msg: errorMessage };
    setError1(newArray1);
  };
  const errorHandler2 = (index, status, errorMessage) => {
    const newArray2 = [...error2];
    newArray2[index] = { errorStatus: status, msg: errorMessage };
    setError2(newArray2);
  };

  const handleChangeDocuments = ({file, fileList: newFileList }) => {
    console.log(file, "filrsssss")
    // console.log(newFileList, 'listers');
   
     // if(type==="COMPANY_REGISTRATION") {
     //   setUploadList({...uploadList, COMPANY_REGISTRATION: [...newFileList]});
     // }
     // else {
     //   setUploadList({...uploadList, NATIONAL_ID: [...newFileList]});
     // }


  console.log(file, "filerxxx")

     
   };

   function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

 console.log(fileList, "file list type")
   const getBase64 = (file) =>
   new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
   });

   const handlePreview = async (file) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);

       // console.log(file.preview, 'prrrrr');
      }
      setPreviewOpen(true);
      setPreviewImage(file.url || file.preview);
      setDocumentPreview(file)
      if(file.mimeTypes.includes("application/pdf")) {
        setPreviewImage(file.url || file.preview);
      }

   
   
     
      console.log(file, "preview")
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      );
    } catch (error) {
    //  console.log(error, 'erroxxxxxx');
    }
  };

  // const onCancel = (event) => {
  //   event.preventDefault();
  //   window.location.reload();
  // };
  const navigateToPreviousPage = () => {
    history.goBack();
  };
  function dataVerified() {
    if (
      data.suspensionReasons === '' ||
      data.suspensionReasons === null ||
      data.suspensionReasons === undefined
    ) {
      setErrorName(true);
      setErrorMessageName('Required');
      return false;
    }
    if (
      data.description === '' ||
      data.description === null ||
      data.description === undefined
    ) {
      return false;
    }

    return true;
  }

  const handleClickOpen = () => {
    setOpenWarning(true);
  };
  const getTextArea = (pprops) => (
    <TextField multiline={true} maxRwos={4} {...pprops} />
  );
  const onSubmitManual = async (e, values) => {    
  


    setIsSubmiting(true);
    const userData = JSON.parse(localStorage.getItem('USER'));
    const Loginuser = JSON.parse(localStorage.getItem('loginUser'));

    let userRole = localStorage.getItem('roleId');
    let Ebody = {};
    let accessToken;
    Ebody['workflowId'] = "1681297509068"
    Ebody['userId'] = userData?.username;
    Ebody['userRole'] = userData?.roleName;
    Ebody['executionModeStatus'] = false;
    Ebody['async'] = false;
    Ebody['Values'] = {  ...workflowPayload.returnWorkflowData(
      location?.state?.partnerDetails?.PartnerDetails?.Partner_ID ||
        location?.state?.partnerDetails?.TenantDetails?.TENANT_ID,
      location?.state?.partnerDetails?.PrimaryContactDetails?.EMAIL_ID,
      location?.state?.partnerDetails?.PrimaryContactDetails?.MOBILE_NUMBER,
      location?.state?.partnerDetails?.PartnerDetails?.PARTNER_NAME ||
        location?.state?.partnerDetails?.TenantDetails?.TENANT_NAME,
      location?.state?.partnerDetails?.PrimaryContactDetails
        ?.PRIMARY_CONTACT_NAME,
      ''
    )}
    Ebody['Values']['date'] = new Date();
    Ebody['Values']['userName'] = userData?.sub;
    Ebody['Values']['userId'] = Loginuser?.id;
    Ebody['Values']['subStatus'] = 'draft';
    Ebody['Values']['channel'] = 'DPRM';
    Ebody['Values']['acceptanceStatus'] = 'open';
    Ebody['Values']['status'] = "PENDING";
    Ebody['Values']['comments'] = comments;
    Ebody['Values']['eventDetails'] = eventInformation;
    Ebody['Values']['attachment'] = fileList;
    Ebody['Values']['fromDate'] = fromDate;
    Ebody['Values']['toDate'] = toDate;
    Ebody['Values']['manualCommission'] = {
      toDate,
      fromDate,
      comments,
      eventDetails: eventInformation,
      attachment:fileList,
      status: "PENDING",
      relatedParty: [
        {
           role:"DSPUser",
           id: Loginuser?.id,
           name:userData?.username
          
           },
           {
           id:location?.state?.partnerDetails?.PartnerDetails?.Partner_ID,
           name:location?.state?.partnerDetails?.PartnerDetails?.PARTNER_NAME,
           role:"partner"
          
          
           }
          
      ]


    };
    Ebody['Values']['partner'] = location?.state?.partnerDetails;
 
  

    Ebody['Values']["relatedParty"] = [
      {
         role:"DSPUser",
         id: Loginuser?.id,
         name:userData?.username
        
         },
         {
         id:location?.state?.partnerDetails?.PartnerDetails?.Partner_ID,
         name:location?.state?.partnerDetails?.PartnerDetails?.PARTNER_NAME,
         role:"partner"
        
        
         }
        
    ]

    Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');

    TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
      .then((resp) => {
        history.push({
          pathname: '/digital-prm-web-ui/manualapproval',
          details: resp.data
        });
      })
      .catch((error) => {
        setIsSubmiting(false);
        setErrorName(true);
        setErrorMessageName('Rule Name already exist');
      });
    setIsBtnDisable(true);
  };
  function SubmitButton() {
    if (
      data.settlementRuleCode === '' ||
      data.currency === '' ||
      //data.dspCommisionType === '' ||
      // data.percentageOrAmount === '' ||
      data.settlementRuleName === '' ||
      // data.subscriptionFee === 0 ||
      //data.oneTimeEnrollmentFee === 0 ||
      data.settlementPeriod === '' ||
      data.settlementCycle.length === 0 ||
      data.settlementDate === '' ||
      data.settlementDueDate === '' ||
      //data.settlementMode === '' ||
      // data.settlementRange[i].rangeFrom === '' ||
      // data.settlementRange[i].rangeFrom === 0 ||
      // data.settlementRange[i].rangeTo === '' ||
      // data.settlementRange[i].rangeTo === 0 ||
      // data.settlementRange[i].amount === '' ||
      // data.settlementRange[i].amount === 0 ||
      isDuplicate
    ) {
      return (
        <Button
          disabled={true}
          variant="outlined"
          color="primary"
          onClick={onSubmitManual}
          endIcon={<NavigateNext />}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button
          disabled={false}
          variant="outlined"
          color="primary"
          onClick={onSubmitManual}
          endIcon={<NavigateNext />}
        >
          Submit
        </Button>
      );
    }
  }

  const handleSelectPercentage = (event) => {
    if (event.target.value === undefined) {
      setPercentageAmount({
        selected: '',
        hasError: true
      });
    } else {
      setPercentageAmount({
        selected: event.target.value,
        hasError: false
      });
    }
  };

  const handleCurrency = (event) => {
    if (event.target.value === undefined) {
      setCurrency({
        selected: '',
        hasError: true
      });
    } else {
      setCurrency({
        selected: event.target.value,
        hasError: false
      });
    }
  };

  const handleSettlementMode = (event) => {
    if (event.target.value === undefined) {
      setSettlementMode({
        selected: '',
        hasError: true
      });
    } else {
      setSettlementMode({
        selected: event.target.value,
        hasError: false
      });
    }
  };

  const handleSettlementPeriod = (event) => {
    if (event.target.value === undefined) {
      setSettlementPeriod({
        selected: '',
        hasError: true
      });
    } else {
      setSettlementPeriod({
        selected: event.target.value,
        hasError: false
      });
    }
  };

  const handleDspCommision = (event) => {
    if (event.target.value === undefined) {
      setDspCommission({
        selected: '',
        hasError: true
      });
    } else {
      setDspCommission({
        selected: event.target.value,
        hasError: false
      });
    }
  };

  const handleSettlementStartDate = (event) => {
    if (event.target.value === undefined) {
      setSettlementStartDate({
        selected: '',
        hasError: true
      });
    } else {
      setSettlementStartDate({
        selected: '',
        hasError: false
      });
    }
    setSettlementDate(event);
  };
  const handleSettlementDueDate = (event) => {
    if (event.target.value === undefined) {
      setIsEmpty({
        hasError: true
      });
      // setSettlementDueDate({
      //   selected: '',
      //   hasError: true
      // });
    } else {
      setIsEmpty({
        hasError: false
      });
      // setSettlementDueDate({
      //   selected: '',
      //   hasError: false
      // });
    }
    setSettlementDueDate(event);
  };
  const handleSettlementCycle = (event) => {
    if (event.target.value === undefined) {
      setSettlementCycle({
        selected: '',
        hasError: true
      });
    } else {
      // setSettlementCycle({
      //   selected: event.target.value,
      //   hasError: false
      // });
    }
  };

  const onDrawerClose = () => {
    setIsFileuploadDrawer(false);
  };
const dummyRequest =  (options) => {
 
  const { onSuccess, onError, file, onProgress } = options;
  console.log(file, "filerxxx")
  let metadata = {
    lifecycleState: 'draft',

    documentSpecification: {
      id: 'DPRM'
    },

    relatedParty: [
      {
        id: null,

        name: null,

        role: 'DSP-USER',

        '@referredType': 'USER',

        engagedParty: {}
      }
    ],

    documentCharacteristic: [
      {
        name: 'documentType',

        value: 'Partner Onboard'
      },

      {
        name: 'partnerId'
      }
    ]
  };

  const Uploadform = new FormData();
  Uploadform.append('file', file);
  Uploadform.append('name', file.name);
  Uploadform.append('id', file.uid);
  Uploadform.append('description', 'sdasdsad');
  Uploadform.append('productName', 'BussinessAccount');
  Uploadform.append('folderName', 'Testbusinessaccount');
  Uploadform.append('metadata', JSON.stringify(metadata));
  // let result = await triggerUploadApi(Uploadform, file, data?.type);
  setfileuploadData(Uploadform);
  // setIsFileuploadDrawer(true);
  // setCurrentData(data);
  // setFileDetails(file);
  onSuccess('result');

  onError('error');
};

console.log(fileUploadData, "file uplod data")
  const [search, setSearch] = useState('');
  const generatedCode = () => {
    TecnotreedigitalSales.get('/settlementRules/generatesetcode')
      .then((resp) => {
        setGeneratedSettlementCode(resp.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
  
    generatedCode();
  }, []);
  // useEffect(() => {



  // }, [eventInformation, comments]);

  useEffect(() => {
    if (search.length === 0 || '') {
      setErrorName(false);
      setErrorMessageName('');
      setDuplicate(false);
    } else {
      const timer = setTimeout(() => {
        TecnotreedigitalSales.post(
          `/settlementrules/duplicateSettlementCheck`,
          {
            checkType: 'settlementRuleName',
            checkData: search
          }
        )
          .then((resp) => {
            if (resp.data.result) {
              setDuplicate(true);
              setErrorName(true);
              setErrorMessageName('Rule Name already exists');
            } else {
              setDuplicate(false);
            }
          })
          .catch((error) => {});
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [search]);
  const getSettlementCycle = () => {
    TecnotreedigitalSales.get('masterdata?type=settlementCycle').then(
      (resp) => {
        setSettlementCycleData(resp.data[0].settlementCycle);
      }
    );
  };
  const getPeriodicity = () => {};
  const getCurrency = () => {
    TecnotreedigitalSales.get('masterdata?type=currency').then((resp) => {
      setMasterCurrency(resp.data[0].currency);
    });
  };

  /**onChange for all the fields except add range */
  const handleChange = (event) => {
    if (event.target.name === 'percentageOrAmount') {
      if (event.target.value === '') {
        setPercentageAmount({
          selected: '',
          hasError: true
        });
      }
    }

    if (event.target.name === 'settlementRuleCode') {
      if (event.target.value.length === 0) {
        setErrorCode(true);
        setErrorMessageCode('Required');
      } else {
        setErrorCode(false);
        setErrorMessageCode('');
      }
    }
    if (event.target.name === 'settlementRuleName') {
      if (event.target.value.length === 0 || '') {
        setErrorName(true);
        setErrorMessageName('Required');
      } else {
        setErrorName(false);
        setErrorMessageName('');
        if (event.target.value.length >= 3) {
          setSearch(event.target.value);
        }
      }
    }
  };

  /**onChange handler for Subscription fee and One time enrollment */
  const handleFees = (event) => {
    if (
      event.target.name === 'oneTimeEnrollmentFee' ||
      event.target.name === 'subscriptionFee'
    ) {
      let inputValue = parseInt(event.target.value);
    }

    if (event.target.name === 'subscriptionFee') {
      if (event.target.value.length === 0) {
        setErrorSubFee(true);
        setErrorMessageSubFee('Required');
      } else {
        setErrorSubFee(false);
        setErrorMessageSubFee('');
      }
    }

    if (event.target.name === 'oneTimeEnrollmentFee') {
      if (event.target.value.length === 0) {
        setErrorElFee(true);
        setErrorMessageElFee('Required');
      } else {
        setErrorSubFee(false);
        setErrorMessageElFee('');
      }
    }
  };

  // const handleCycleChanges = (event) => {
  //   const values = [...inputCycles];
  //   values[]
  //   setInputCycles(values);
  //   setData({
  //     ...data,
  //     ['settlementCycle']: { from: event.target.value, to: event.target.value }
  //   });
  // };
  const onSubmitDocument = async (values) => {
    LoadingSpin(true);

    let cdata = currentData,
    dsm = {},
    uploadDoc = fileUploadData;

    dsm = { ...values };
    dsm['name'] = fileDetails.name;
    dsm['uid'] = fileDetails.uid;
    dsm['status'] = 'active';

    dsm = JSON.stringify(dsm);

    uploadDoc.append('dms', dsm);
    setIsFileuploadDrawer(false);
    let reslove = triggerUploadApi(uploadDoc, fileDetails, values);
    reslove
      .then(async (response) => {
        // let setObj = {},
        //   ObjUpload = { ...uploadObj };
        // ObjUpload[currentData.name] = [...response];
        // setUploadObj({ ...ObjUpload });
        // setObj[currentData.name] = response;
        // props.formRef.setFieldsValue(setObj);
        LoadingSpin(false);
      })
      .catch((err) => {
        console.log(err, "error")
        LoadingSpin(false)
      //  console.log(err, 'error');
        // message.error('Error in Upload File');
      });
  };

  const handleDateValidity =(date)=> {
    let dates = date
    if(period === "Daily") {
      // if(moment(date).add(1, 'days').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
      //   setFromDate(date)
      //   setToDate(null)
      //   dates = fromDate
      //   setToDate(moment(dates).add(1, 'days').format('YYYY-MM-DD'))
      //  }
      //  else {
      //   dates = date
      //   setFromDate(date)
       
      //   setToDate(moment(dates).add(1, 'days').format('YYYY-MM-DD'))
      // }

      if(moment(date) > moment(new Date()).format('YYYY-MM-DD')) {
       setValidTodate(false)
      }
      else {
        setValidTodate(true)
      }
      setFromDate(date)
      setToDate(moment(dates))
      setIsBtnDisable(false)
      setValidTodate(true)
    }

    if(period === "Weekly") {
      // if(moment(date).add(7, 'days').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
      //   // setFromDate(fromDate)
      //   setFromDate(date)
      //   setToDate(moment(dates).add(7, 'days').format('YYYY-MM-DD'))
      //   dates = fromDate
      // }
      // else {
      //   dates = date
      //   setFromDate(date)
      //   setToDate(moment(dates).add(7, 'days').format('YYYY-MM-DD'))
        
      // }

      if(moment(date).add(6, 'days').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
        setValidTodate(false)
      }
      else {
        setValidTodate(true)
      }
      
      setFromDate(date)
      setToDate(moment(dates).add(6, 'days'))
    }
 
    if(period === "Monthly") {
      // if(moment(date).add(1, 'M').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
      //   dates = fromDate
      //   setFromDate(date)
      //   setToDate(moment(date).add(1, 'M').format('YYYY-MM-DD'))
       
      // }
      // else {
      //   dates = date
      //   setFromDate(date)
      //   setToDate(moment(date).add(1, 'M').format('YYYY-MM-DD'))
      // }

      if(moment(date).add(29, 'days').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
        setValidTodate(false)
      }
      else {
        setValidTodate(true)
      }
      setFromDate(date)
      setToDate(moment(date).add(29, 'days'))
    }
    if(period === "Yearly") {
      // if(moment(date).add(1, 'y').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
      //   dates = fromDate
      //   setFromDate(fromDate)
       
      //   setToDate(moment(dates).add(1, 'y').format('YYYY-MM-DD'))
      // }
      // else {
      //   dates = date
      //   setFromDate(date)
      //   setToDate(moment(dates).add(1, 'y').format('YYYY-MM-DD'))
      // }
      if(moment(date).add(364, 'days').format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) { 
        setValidTodate(false)
      }
      else {
        setValidTodate(true)
      }
      setFromDate(date)
      setToDate(moment(dates).add(364, 'days'))
    }
    
   


  }

  const handlePeriod = (event)=> {
    setDisableDate(false)
    setPeriod(event.target.value)

    if(event.target.value === "Daily") {
      setFromDate(null)
      setToDate(null)
    }
    else if(event.target.value === "Weekly") {
      setFromDate(null)
      setToDate(null)
    }

    else if(event.target.value === "  Wonthly") {
      setFromDate(null)
      setToDate(null)
      
    }  else if(event.target.value === "Yearly") {
      setFromDate(null)
      setToDate(null)
      
    }

  }
  const handleChangeCyles = (event) => {
    var selectedRange = event.target.value;
    var selectedRangeSplit = selectedRange.split('-');
    const values = { ...inputCycles };
    values.from = selectedRangeSplit[0];
    values.to = selectedRangeSplit[1];
    data.settlementCycle.length = 0;
    // const l = data.settlementCycle.length - 1;
    // const ff = data.settlementCycle.splice(0, l);
    // setData((data) => {
    //   return { ...data, ['settlementCycle']: ff };
    // });
    // const d = { ...data };
    // delete d.settlementCycle;
    // d.settlementCycle.push(values);
    // setData({ ...data }, d);
    //setData({ ...data }, data.settlementCycle.push(values));
    setData(
      { ...data, settlementDate: selectedRangeSplit[0] },
      data.settlementCycle.push(values)
    );

    // setData((data) => {
    //   {
    //     data.settlementCycles.push(values);
    //   }
    // });

    // setData((data) => {
    //   {
    //     data['settlementCycles'] = values;
    //   }
    // });
    setSelectedRangeFrom(values.from);
    setSelectedRangeTo(values.to);
    // setSettlementDate(values.from);
    setInputCycles('');
  };

  const disableButton = ()=> {
    if(fromDate === null || toDate === null || validToDate === false || fileList.length === 0) {
      return true
    }
  }
  const handleAddEvents = ()=> {
    
      setEventInformation(prevState => [...prevState, eventObject])
        setEventObject({totalCommission: "",
        unitPrice: "",
        unitsUtilized: "",
        eventName: ""})
 
  }
  const handleClickCycle = (e) => {
    if (e.target.value === undefined) {
      setSettlementCycle({
        selected: '',
        hasError: true
      });
    } else {
      setSettlementCycle({
        selected: '',
        hasError: false
      });
    }
    setInputCycles({ from: 0, to: 0 });
  };
  
  const handleRemove = (index)=> {

    setEventInformation([
      ...eventInformation.slice(0, index),
      ...eventInformation.slice(index + 1)
    ])
  }
  console.log(eventInformation, "eventinformation")
  /**onChange for fields of Add Range button */
  const handleChangeInput = (index, event) => {

console.log(event.target.value)

   if(parseInt(event.target.value) < 1) {
    if(event.target.name === "unitPrice") {
      setFigure("unit price should be more than 0")

    }
    else if(event.target.name === "unitsUtilized"){
      setErrorCode("unit utilized should be more than 0")
    }
   
   }
   
    else if(event.target.name === "unitPrice"){
      setFigure("")
    }
     else if(event.target.name === "unitsUtilized"){
      setErrorCode("")
    }
   
   

    
    const values = [...eventInformation];
    let inputValue;
    if (isNaN(parseInt(event.target.value))) {
      inputValue = '';
    } else {
      inputValue = parseInt(event.target.value);
    }
    values[index][event.target.name] = inputValue;
    setEventInformation(values);

    if( parseInt(eventInformation[index].unitPrice) >= 1 && parseInt(event.target.value) >= 1 && parseInt(eventInformation[index].unitsUtilized) >= 1){
    
      let total = parseInt(eventInformation[index].unitPrice) * parseInt(eventInformation[index].unitsUtilized)

      if(total > 1) {
        values[index]['totalCommission'] =  parseInt(eventInformation[index].unitPrice) * parseInt(eventInformation[index].unitsUtilized)
      }
    
    }
    else {
      values[index]['totalCommission'] = ""
    }
    if(parseInt(eventInformation[index].unitsUtilized) >= 1 && parseInt(event.target.value) >= 1 && parseInt(eventInformation[index].unitPrice) >= 1){

      let total = parseInt(eventInformation[index].unitsUtilized) * parseInt(eventInformation[index].unitPrice)
      if(total >= 1) {
        values[index]['totalCommission'] =  parseInt(eventInformation[index].unitsUtilized) * parseInt(eventInformation[index].unitPrice)
      }
  
    }

    else {
      values[index]['totalCommission'] = ""
    }
    
    


 

    // setData((data) => {
    //   return { ...data, ['ev']: inputFields };
    // });

   // setData((data) => {
    //   return { ...data, ['ev']: inputFields };
    // });

    if (eventInformation[index] === '') {
      errorHandler(index, true, 'Required');
    } else {
      errorHandler(index, false, '');

      // if (index > index) {
      //   if (inputFields[index].eventName || inputFields[index - 1].rangeTo) {
      //     errorHandler(index, true, 'Must be Greater than previous range');
      //   }
      // }
    }

    if ( inputFields[index].totalCommission === "" || inputFields[index].unitPrice === "" || inputFields[index].unitsUtilized === ""  ) {
      errorHandler1(index, true, 'Required');
    } else {
      errorHandler1(index, false, '');
    }

    // if (inputFields[index].amount === '') {
    //   errorHandler2(index, true, 'Required');
    // } else {
    //   errorHandler2(index, false, '');

    //   // if (
    //   //   inputFields[index].amount > inputFields[index].rangeTo ||
    //   //   inputFields[index].amount < inputFields[index].rangeFrom
    //   // ) {
    //   // } else {
    //   //   errorHandler2(index, false, '');
    //   // }
    // }
  };

  useEffect(()=> {

    const checkForDuplicates = (arr) => {
      return arr.some((item, index) => {
        return arr.filter((_, idx) => idx !== index)
          .some((subItem) => {
            return  (subItem.eventName=== item.eventName)
          });
      });
    };

   const hasDuplicates = checkForDuplicates(eventInformation);

   console.log("duplicare", hasDuplicates)

if (hasDuplicates) {
  setHasDuplicate(true)
  console.log("e dey happen")
  setErrorMessageName(true)
  setHasDuplicate(false)
} 
else {
  setErrorMessageName(false)
}
   eventInformation.forEach((el)=> {
    console.log(el, "el0x", hasDuplicate)
    if(el.unitPrice === "" || el.eventName === "" || el.totalCommission === "" || el.unitsUtilized === "" || comments === "" || hasDuplicates === true || toDate === null || fromDate === null || parseInt(el.unitPrice) < 1 ||  parseInt(el.unitsUtilized) < 1) {
      setSubmitBtn(false)
      setIsBtnDisable(true)
    }
    else {
      setSubmitBtn(true)
      setIsBtnDisable(false)
    }
        if(hasDuplicates === true) {
      setIsBtnDisable(true)
    }
    else {
      setIsBtnDisable(false)
    }
  })

  }, [eventInformation, comments, toDate, fromDate])
  const handleChangeInputEvent = (index, event) => {


    console.log(eventInformation, "tiktak")
   const checkEVentDuplicate = eventInformation.find(((el)=> el.eventName === event.target.value))

   console.log(checkEVentDuplicate, "here")
  
   //////save once found in an array

if (checkEVentDuplicate) {
  console.log('duplicates found')
  console.log("yoooqwowaasa")
    setCurrentDuplicate(checkEVentDuplicate)
    setErrMessage("Please enter unique name")
}

// for (let i = 0; i < eventInformation.length; i++) {
//   const currentObject = eventInformation[i];
//   const currentPair = [currentObject.id, currentObject.eventName];

//   const isDuplicate = uniquePairs.some(pair => pair[0] === currentPair[0] && pair[1] === currentPair[1]);

//   if (!isDuplicate) {
//     uniquePairs.push(currentPair);
   
//   } else {
//     setErrMessage("please select unique name")
//     console.log(`Duplicate found: ${currentPair}`);
//   }
// }



    
  
    const values = [...eventInformation];
    let inputValue;

    inputValue = event.target.value
    values[index][event.target.name] = inputValue;

    setEventInformation(values);

    // setData((data) => {
    //   return { ...data, ['ev']: inputFields };
    // });

    eventInformation.forEach((el)=> {
      console.log(el, "el")
      if(el.unitPrice === "" || el.eventName === "" || el.totalCommission === "" || el.unitsUtilized === "") {
        setIsBtnDisable(true)
      }
      else {
        setIsBtnDisable(false)
      }
    })

    if (eventInformation[index] === '') {
      errorHandler(index, true, 'Required');
    } else {
      errorHandler(index, false, '');

      // if (index > 0) {
      //   if (inputFields[index].eventName || inputFields[index - 1].rangeTo) {
      //     errorHandler(index, true, 'Must be Greater than previous range');
      //   }
      // }
    }


    // if (inputFields[index].amount === '') {
    //   errorHandler2(index, true, 'Required');
    // } else {
    //   errorHandler2(index, false, '');

    //   // if (
    //   //   inputFields[index].amount > inputFields[index].rangeTo ||
    //   //   inputFields[index].amount < inputFields[index].rangeFrom
    //   // ) {
    //   // } else {
    //   //   errorHandler2(index, false, '');
    //   // }
    // }
  };
  /**To add new range fields to the view */


  const handleAddFields = (event) => {
    i++;

    setError([...error, (error[i] = { errorStatus: false, msg: '' })]);
    setError1([...error1, (error1[i] = { errorStatus: false, msg: '' })]);
    setError2([...error2, (error2[i] = { errorStatus: false, msg: '' })]);
    setEventInformation([
      ...eventInformation,
      (inputFields[i] = { eventName: '',  unitPrice: '', unitsUtilized: '' })
    ]);
  };
  const DynamicAxios = () => {
    return TecnotreeDms;
  };
  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const triggerUploadApi = (Uploadform, Cdata, fileDetails, DocValues) => {
    return new Promise(function (resolve, reject) {
      DynamicAxios()
        .post(`document/upload`, Uploadform)
        .then((resp) => {
          console.log(resp, 'ressaassscsxss');
          fetch(
            // `${props.agentForm ?  : DPRM_DMS}/${resp.data?.id}`,
            `${config.dev.server.dclm_base_url}/documentManagement/v1/document/download/${resp.data?.id}`,
            {
              method: 'get',
              headers: {
                Authorization: `Bearer ${getaccessToken()}`
              }
            }
          )
            .then((res) => {
              console.log(res, 'ressscsxss');
              return res.blob();
            })
            .then(async (blob) => {
              let objectURL = URL.createObjectURL(blob);

              const base64 = await blobToBase64(blob);
              setFileDoc((oldArray) => [...oldArray, base64]);
              setImagePreview(resp.data?.id);
              let fileLst = [
                {
                  uid: fileDetails.uid,
                  name: resp.data?.fileName,
                  status: "done",
                  createDate: resp.data?.createdDate,
                  mimeType: _.get(resp.data?.attachment, '[0].mimeType', ''),
                  url: objectURL,
                  id: resp.data?.id,
                  expiryDate: DocValues?.expiryDate,
                  name: _.get(resp.data.attachment, '[0].name', ''),

                  dms: {}
                }
              ];
              if (Cdata?.type === 'multiUpload') {
                let ObjUpload = { ...uploadObj },
                  list = ObjUpload[Cdata?.name]
                    ? [...ObjUpload[Cdata?.name]]
                    : [];

                fileLst = [...fileLst, ...list];x 
              }

              // console.log(fileLst, resp?.data, "file listxx")
              setFileList([...fileList, {
                uid: fileDetails.uid,
                name: resp.data?.fileName,
                status: "done",
                createDate: resp.data?.createdDate,
                mimeType: _.get(resp.data?.attachment, '[0].mimeType', ''),
                url: objectURL,
                id: resp.data?.id,
                expiryDate: DocValues?.expiryDate,
                name: _.get(resp.data.attachment, '[0].name', ''),

                dms: {}
              }])
              resolve(fileLst);
            });
          //   .then(async (res) => {

          //   if (res.status === 200) {
          //     const url = URL.createObjectURL(new Blob([res.data]));

          //     setImagePreview(resp.data?.id);
          //     let fileLst = [
          //       {
          //         uid: fileDetails.uid,
          //         name: resp.data?.fileName,
          //         status: 'done',
          //         url: url,

          //         dms: resp.data?.dms ? resp.data?.dms : {}
          //       }
          //     ];
          //     if (Cdata?.type === 'multiUpload') {
          //       let ObjUpload = { ...uploadObj },
          //         list = ObjUpload[Cdata?.name]
          //           ? [...ObjUpload[Cdata?.name]]
          //           : [];

          //       fileLst = [...fileLst, ...list];
          //     }
          //     resolve(fileLst);
          //   }
          // });
        })
        .catch((err) => {
          console.log("errorxxx", err)
          reject(err.response);
        });
    });
  };

  const handleCommission = (e)=> {
    const re = /[0-9]+/g;
    if(re.test(e.target.value === '' || e.target.value)) {
      setEventObject({...eventObject, totalCommission: e.target.value})
    }
  }
  const handleGenerateOrders = (e)=> {
    setPlaceHolderEventObject({...eventObject, unitsUtilized: e.target.value})
    console.log(eventObject.unitPrice, "gogogo")
    setEventObject({...eventObject, unitsUtilized: e.target.value}) 
   
    if(eventObject.unitPrice){
    
      setEventObject({...eventObject, totalCommission: parseInt(eventObject.unitPrice) * parseInt(e.target.value), unitsUtilized: e.target.value})
      setPlaceHolderEventObject({...eventObject, totalCommission: parseInt(eventObject.unitPrice) * parseInt(e.target.value), unitsUtilized: e.target.value})
    }
    
   
  }
  const handleunitPrice = (e)=> {
    setPlaceHolderEventObject({...eventObject, unitPrice: e.target.value})
    setEventObject({...eventObject, unitPrice: e.target.value})
    if(eventObject.unitsUtilized) { 
      setEventObject({...eventObject, totalCommission: parseInt(eventObject.unitsUtilized) * parseInt(e.target.value), unitPrice: e.target.value})
      setPlaceHolderEventObject({...eventObject, totalCommission: parseInt(eventObject.unitsUtilized) * parseInt(e.target.value), unitPrice: e.target.value})
    }
   
  }

  const handleEventName = (e)=> {
    setEventObject({...eventObject, eventName: e.target.value})
    setPlaceHolderEventObject({...eventObject, eventName: e.target.value})
  }

  console.log(eventObject, "eveobect", toDate)
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className={classes.divStyle}>
      <NavbarManual />

      <div className={classes.pageHead}>
      <Formik
        initialValues={{
        comments: comments,
        fromDate: fromDate,
        toDate: toDate,
        events: eventInformation,
      }}

      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
       
      }}
      validationSchema={SaveManual}
   
    
      >
       
       {({ errors, touched }) => (
        <Form>
        <StepperManual
          partnerType={
            location?.state?.partnerDetails?.PartnerDetails?.Partner_ID
          }
        />
        <ProductDetails
          maintitle={'Partner Information'}
          productData={
            location?.state?.partnerDetails || location?.state?.partnerDetails
          }
          mobileNo={
            location?.state?.partnerDetails?.PrimaryContactDetails
              ?.MOBILE_NUMBER
          }
          email={
            location?.state?.partnerDetails?.PrimaryContactDetails?.EMAIL_ID
          }
          title={'PartnerDetails'}
        />

      
           <>
           <Box py={6} px={10} className={classes.homeContainer}>
                <Grid container direction="column">
                  <Grid item>
                    <Paper className={classes.topItem}>
                      <Grid>
                        <Typography variant="h1" className={classes.text}>
                          Manual Commissioning Details
                        </Typography>
                      </Grid>
           
                      <div className={classes.space}>
                        <div style={{ maxWidth: '100%', paddingTop: '12px' }}>
                          <div className={classes.root}>
                          
                            <Grid container direction="column" xs="12">
                              {/*First Row*/}
                              <Grid
                                item
                                style={{
                                  paddingLeft: '15px',
                                  paddingBottom: '22px'
                                }}
                              >
                                <Grid
                                  container
                                  direction="row"
                                  xs={12}
                                  spacing={6}
                                  

                                >
                                     <Grid
                                    item
                                    xs={4}
                                    style={{
                                      padding: '20px',
                                      marginTop: '8px'
                                    }}
                                  >
                                    <FormControl
                                      fullWidth
                                      // error={currency.hasError}
                                      required={true}
                                    >
                                      <InputLabel id="">PERIODICTY</InputLabel>
                                      <Select
                                        labelId=""
                                        id=""
                                        defaultValue=""
                                        name="reason"
                                        value={period}
                                        //   onChange={handleChange}
                                        className={classes.menuPaper}
                                        onChange={(event) => {
                                          console.log(event.target.value)
                                         handlePeriod(event)
                                        }}
                                         required
                                      >
                                        {periodicityData?.map((item) => {
                                          return (
                                            <MenuItem value={item.code}>
                                              {item.code}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={4} style={{ padding: '20px' }}>
                                    <Typography style={{color: "grey"}}>FROM DATE </Typography>
                                    <KeyboardDatePicker
                                      // clearable
                                      
                                       required
                                      format="dd/MM/yyyy"
                                      disabled={disableDate}
                                      disableFuture
                                      value={fromDate}
                                      inputProps={{ readOnly: true }}
                                      // disabled
                                      // required
                                      onChange={(date)=> handleDateValidity(date)}
                                      name="requestedDate"
                                      maxDate={today.setDate(today.getDate() - 1)}
                                      // onChange={(date) =>
                                      //   setFieldValue(
                                      //     'requestedDate',
                                      //     date.toISOString()
                                      //   )
                                      // }
                                      // strictCompareDates
                                      fullWidth
                                    />
                                    
                                  </Grid>
                                  <Grid item xs={4} style={{ padding: '20px' }}>
                                    <Typography style={{color: "grey"}}>
                                      TO DATE{' '}
                                      <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <KeyboardDatePicker
                                      // clearable
                                      // disableFuture
                                      disableFuture={true}
                                      format="dd/MM/yyyy"
                                      value={toDate}
                                      onChange={(date)=> setToDate(date)}
                                    
                                      minDateMessage={
                                        'please a date after request date'
                                      }
                                      maxDateMessage={
                                        `TO DATE SHOULD BE LESS THAN TODAY'S DATE `
                                      }
                                      maxDate={today.setDate(today.getDate())}
                                      disabled
                                      required
                                      name="endDate"
                                      // onChange={(date) => {
                                      //   setData({
                                      //     ...data,
                                      //     endDate: date.toISOString()
                                      //   });
                                      //   setFieldValue(
                                      //     'endDate',
                                      //     date.toISOString()
                                      //   );
                                      // }}
                                      strictCompareDates
                                      fullWidth
                                    />
                                  </Grid>
                            
                                </Grid>
{/*                             
                             <div>
                            
                          
                               <Grid  container
                                  direction="row"
                                  xs={12}
                                  spacing={6}>
                                <Grid
                                    item
                                    xs={4}
                                    style={{
                                      padding: '20px',
                                      marginTop: '8px'
                                    }}
                                  >
                                    <FormControl
                                      fullWidth
                                      // error={currency.hasError}
                                      required={true}
                                    >
                                      
                                      <TextField  required value={eventObject.eventName} id="standard-basic" label="Events Name" onChange={handleEventName}/>
                                    </FormControl>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    style={{
                                      padding: '20px',
                                      marginTop: '8px'
                                    }}
                                  >
                                     <FormControl
                                      fullWidth
                                      // error={currency.hasError}
                                      required={true}
                                    >
                                 <TextField required type="number" value={eventObject.unitsUtilized} id="standard-basic" label="Generated Orders" onChange={handleGenerateOrders}/>
                                    </FormControl>
                                   
                                    </Grid>
                                    <Grid
                                    item
                                    xs={2}
                                    style={{
                                      padding: '20px',
                                      marginTop: '8px'
                                    }}
                                  >
                                     <FormControl
                                      fullWidth
                                      // error={currency.hasError}
                                      required={true}
                                    >
                                    <TextField required type="number"value={eventObject.unitPrice} id="standard-basic" label="unitPrice/Unit" onChange={handleunitPrice}/>
                                    </FormControl>
                                    
                                    </Grid>
                                    <Grid
                                    item
                                    xs={2}
                                    style={{
                                      padding: '20px',
                                      marginTop: '8px'
                                    }}
                                  >
                                       <FormControl
                                      fullWidth
                                      // error={currency.hasError}
                                      required={true}
                                    >
                                   <TextField type="number" value={eventObject.totalCommission}  required disabled placeholder='Total Commission' id="standard-basic" label="Total Commission" onChange={handleCommission}/>
                                    </FormControl>
                                    
                                    </Grid>
                                          
                                   <Grid item   xs={2}
                                    style={{
                                      padding: '39px 5px',
                                      marginTop: '8px'
                                    }}>
                                 {eventInformation?.length === 0 && <Button
                                     onClick={handleAddEvents}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                  
                                  >
                                    ADD
                                  </Button>}
                                </Grid>
                                </Grid>
                          </div> */}
                      
                        {
                            eventInformation?.length ? eventInformation.map((inputField, index)=> (
                                   
                              <Grid  container
                              direction="row"
                              xs={12}
                              spacing={6}>
                            <Grid
                                item
                                xs={3}
                                style={{
                                  padding: '20px',
                                  marginTop: '8px'
                                }}
                              >
                                <FormControl
                                  fullWidth
                                  // error={currency.hasError}
                                  required={true}
                                >
                                  
                                  <TextField
                                 
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInputEvent(index, event)
                                    }
                                    type="text"
                                    name="eventName"
                                    value={inputField?.eventName}
                                    label="EVENT NAME"
                                    
                                   // error={error1[index].errorStatus}
                                    // helperText={error[index].msg}
                                  />
                                 {errorMessageName  && eventInformation[index].eventName === currentDuplicate.eventName && <InputLabel style={{color: "red", marginTop: "30px", fontSize:"12px"}}>{errMessage}</InputLabel>}
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                style={{
                                  padding: '20px',
                                  marginTop: '8px'
                                }}
                              >
                                  <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    type="number"
                                    name="unitPrice"
                                    value={inputField.unitPrice}
                                    label="UNIT PRICE"
                                    // error={error1[index].errorStatus}
                                    // helperText={error1[index].msg}
                                  />
                                 {errorFigure && <InputLabel style={{color: "red", marginTop: "30px", fontSize:"12px"}}>{errorFigure}</InputLabel>}
                                </Grid>
                                <Grid
                                item
                                xs={3}
                                style={{
                                  padding: '20px',
                                  marginTop: '8px'
                                }}
                              >
                                <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="unitsUtilized"
                                    value={inputField.unitsUtilized}
                                    label="UNITS UTILIZED"
                                    type="number"
                                    // error={error1[index].errorStatus}
                                    // helperText={error1[index].msg}
                                  />
                                  {errorCode && <InputLabel style={{color: "red", marginTop: "30px", fontSize:"12px"}}>{errorCode}</InputLabel>}
                                </Grid>
                                <Grid
                                item
                                xs={2}
                                style={{
                                  padding: '20px',
                                  marginTop: '8px'
                                }}
                              >
                                <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    disabled
                                    name="totalCommission"
                                    value={inputField.totalCommission}
                                    label="TOTAL COMMISSION"
                                    type="number"
                                    // error={error1[index].errorStatus}
                                    // helperText={error1[index].msg}
                                  />
                                </Grid>
                          
                                {eventInformation.length > 1  && <Grid item   xs={1}
                                    style={{
                                      padding: '39px',
                                      marginTop: '8px'
                                    }}>
                                  <Button
                                     onClick={()=> handleRemove(index)}
                                    size="large"
                                    variant="outlined"
                                    color="primary"
                                  
                                  >
                                    REMOVE
                                  </Button>
                                </Grid>}
                      
                            </Grid>
                            )) : null
                          }

                              <div style={{display: "flex", justifyContent: "space-between"}}>
                              <Grid item   xs={2}
                                    style={{
                                      paddingBottom: '30px',

                                    }}>
                                 {eventInformation?.length > 0 && <Button
                                     onClick={handleAddEvents}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                  
                                  >
                                    ADD MORE
                                  </Button>}
                                </Grid>

                                {eventInformation?.length > 1 &&  <Grid item   xs={2}
                                    style={{
                                      paddingBottom: '30px',
                                      display: "flex",
                                      
                                    }}>
                                 <TextField
                                    style={{width: "100px"}}
                                    required={true}
                                    className={classes.textOne}
                                    fullWidth
                                    disabled
                                    name="totalCommission"
                                    value={eventInformation.map(item => item.totalCommission).reduce((prev, next) => prev + next)}
                                    label="TOTAL"
                                    type="number"
                                    // error={error1[index].errorStatus}
                                    // helperText={error1[index].msg}
                                  />
                                </Grid>}
                              </div>
                          

                                {/* <form>
                          <div style={{ display: 'flex', paddingLeft: '22px' }}>
                            <div>
                              {eventInformation.map((inputField, index) => (
                                <div key={index} style={{ display: 'flex' }}>
                                  <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="eventName"
                                    value={inputField?.eventName}
                                    label="EVENTS NAME"
                                    error={error[index].errorStatus}
                                    helperText={error[index].msg}
                                  />
                                  <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="unitPrice"
                                    value={inputField.unitPrice}
                                    label="UNIT PRICE"
                                    error={error1[index].errorStatus}
                                    helperText={error1[index].msg}
                                  />
                                    <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="unitsUtilized"
                                    value={inputField.unitsUtilized}
                                    label="UNIT UTILIZED"
                                    error={error1[index].errorStatus}
                                    helperText={error1[index].msg}
                                  />
                                 

                       
                                  <Button
                                    style={{ marginTop: '40px' }}
                                    color="primary"
                                    onClick={() => handleRemoveFields(index)}
                                  >
                                    -Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div>
                              <Button
                                style={{ marginTop: '40px' }}
                                color="primary"
                                onClick={(event) => handleAddFields(event)}
                              >
                                +ADD
                              </Button>
                            </div>
                          </div>
                        </form> */}

                                <Grid
                                  container
                                  direction="row"
                                  xs={12}
                                  spacing={6}
                                >
                                  <Grid item xs={12}>
                                    <InputLabel style={{marginBottom: "5px"}}>Comments<span style={{color: "red"}}>*</span></InputLabel>
                                    <TextareaAutosize
                                    onChange={(e)=> setComments(e.target.value)}
                                      required={true}
                                      name="description"
                                      fullWidth
                                      label="Comment"
                                      placeholder="Additional comments goes here..."
                                      variant="outlined"
                                     maxLength={500}
                                      style={{whiteSpace: "pre-wrap",height: "70px", width: "100%", border: "solid 1px #ffcb05", fontSize: "16px",padding: "10px", ":hover": {color: "#ffcb05"}}}
                                      className={classes.boxSpacing}
                                      validate={(value) => {
                                        try {
                                          Yup.reach(
                                            validationSchema,
                                            'description'
                                          ).validateSync(value, {
                                            strict: true
                                          });
                                          return '';
                                        } catch (error) {
                                          return error.message;
                                        }
                                      }}
                                      // error={errorCode}
                                      // helperText={errorMessageCode}
                                      // value={data?.description}/s
                                      // inputProps={{ readOnly: false }}
                                    />
                                 
                                    <Typography variant="subtitle2">
                                      Limit must be below 500 charactors
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                           
                            
                          </div>
                        </div>
                      </div>
                      
                      <Paper elevation={1} className={classes.uploadContainer}>
                        <div style={{display: "flex", width: "100%", margin: "5px 10px"}}>
                        <Typography>Reciept <span style={{color: "red"}}>*</span></Typography>
                        </div>
              
                <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChangeDocuments}
                multiple={true}
                accept=".pdf,.jpeg,.jpg,.png"
                onPreview={handlePreview}
                customRequest={dummyRequest}
                beforeUpload={(file) => { 
                  console.log(file, "gilerxx")
                  setFileDetails(file);
                  setIsFileuploadDrawer(true);
                }}
          >
                {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
            {documentPreview?.mimeType && documentPreview?.mimeType?.includes("application/pdf") ? (
            <Document
              // file={{
              //   url: `${DPRM_DMS}/${previewImage.name}`,
              //   httpHeaders: { Authorization: `Bearer ${getaccessToken()}` }
              // }}
              file={previewImage}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          ) : <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />}
     
      </Modal>
      {isFileuploadDrawer && (
        // <Modal
        //   title="Document"
        //   placement={'bottom'}
        //   //closable={false}
        //   onClose={onDrawerClose}
        //   visible={isFileuploadDrawer}
        //   key={'bottom'}
        //   zIndex="300000"
        //   maskClosable={false}
        // >
        //   <FormUploadDrawer onSubmitDocument={onSubmitDocument} />
        // </Modal>

        <Drawer
          anchor={'bottom'}
          open={true}
          onClose={onDrawerClose}
          className={classes.drawerInner}
        >
          {/* <Drawer
          title="Document"
          placement={'bottom'}
          //closable={false}
          onClose={onDrawerClose}
          visible={isFileuploadDrawer}
          key={'bottom'}
          zIndex="300000"
          maskClosable={false}
        > */}
          <Box py={5}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h2" className={classes.title}>
                  Document
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={onDrawerClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <FormUploadDrawer onSubmitDocument={onSubmitDocument} uploadType="reciept"/>
        </Drawer>
      )}
              </Paper>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
           </>
             

              <Grid
                container
                direction="row"
                justify="flex-end"
                className={classes.footer}
                spacing={4}
              >
                <Grid item>
                  <Button
                    variant="text"
                    color="secondary"
                    className={classes.btnClr}
                    onClick={navigateToPreviousPage}
                    disabled={isSubmiting}
                  >
                    CANCEL
                  </Button>
                </Grid>
                <Grid item>
                  {/* <SubmitButton /> */}
                  <Button
                     disabled={isBtnDisable || disableButton()}
                    // className={classes.proceedBtn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    endIcon={<NavigateNext />}
                      onClick={submitBtn ? onSubmitManual : ""}
                    
                  >
                    {isSubmiting ? (
                      <CircularProgress size={25} style={{ color: 'green' }} />
                    ) : (
                      'SUBMIT'
                    )}
                  </Button>
                </Grid>
              </Grid>
                  </Form>
       )}
              </Formik>
            
      </div>     
      <ManualWarning
        open={openWarning}
        handleSubmit={onSubmitManual}
        setOpen={setOpenWarning}
        partnerData={location?.state?.partnerDetails}
      />
    </div>
  );
};

export default withRouter(Manual);
