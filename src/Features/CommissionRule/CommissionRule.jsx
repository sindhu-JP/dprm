import NavbarSettlement from 'Features/SettlementRule/NavbarSettlement';
import StepperCommission from 'Features/CommissionRule/StepperCommission';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TecnotreedigitalSales } from '../../Http/axios';
import { history } from 'Store';
import NavigateNext from '@material-ui/icons/NavigateNext';
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Factory from 'Factory/CommissionFactory';
import dashboardApi from 'Http/api/dashboard';
import CopyRightFooter from 'Components/CopyRightFooter/CopyRightFooter';
import '../../stories/button.css';
import axios from 'axios';
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
  footer: {
    overflow: 'auto'
  },
    btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
  },
  textOne: {
    width: '29.5vw',
    marginTop: '18px',
    marginRight: '16px'
  },
  textTwo: {
    width: '15vw',
    marginTop: '0px',
    marginRight: '16px'
  },
  formText: {
    width: '33%',
    top: '18px',
    left: '-6px'
  },
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(30)})`,
    overflow: 'auto',
    height: '75vh'
  }
}));
const CommissionRule = () => {
  const classes = useStyles();
  const [errorRangeFrom, setRangeFrom] = useState(false);
  const [errorRangeTo, setRangeTo] = useState(false);
  const [errorAmount, setRangeAmount] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [errorSubFee, setErrorSubFee] = useState(false);
  const [errorElFee, setErrorElFee] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageCode, setErrorMessageCode] = useState('');
  const [error_value, setError_value] = useState(false);
  const [error_value_text, setError_value_text] = useState('');
  const [errorMessageSubFee, setErrorMessageSubFee] = useState('');
  const [errorMessageElFee, setErrorMessageElFee] = useState('');
  const [errorMessageRangeFrom, setErrorMessageRangeFrom] = useState('');
  const [errorMessageRangeTo, setErrorMessageRangeTo] = useState('');
  const [errorMessageAmount, setErrorMessageAmount] = useState('');
  const [isSubmitting, setSubmitting] = useState(true);
  const [isDuplicate, setDuplicate] = useState(false);
  const [generatedCommissionCode, setGeneratedCommissionCode] = useState('');
  const [masterCurrency, setMasterCurrency] = useState([]);
  const [masterChannelName, setmasterChannelName] = useState([]);

  const commissionObj = CustomHooks.custUsestatefull([]);
  const commissiondetails = CustomHooks.custUsestatefull([]);
  const [CommissionCode, setCommissionCode] = CustomHooks.CustomUseState('');
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [channelList, setChannelList] = useState([]);

  const [channelNameError, setChanneNameError] = useState([]);


  const [data, setData] = useState({
    // settlementType: '',
    commissionRuleName: '',
    commissionRuleCode: '',
    // subscriptionFee: 0,
    currency: '',
    // oneTimeEnrollmentFee: 0,
    // settlementPeriod: '',
    // commissionMode: '',
    commissionType: '',
    commissionValue: '',
    //percentageOrAmount: '',
    commissionRuleRange: [
      {
        rangeFrom: 0,
        rangeTo: 0,
        rangeValue: 0,
        rangeType: ''
      }
    ],
    status: ''
  });

  const [inputFields, setInputFields] = useState([
    { rangeFrom: 1, rangeTo: '', rangeValue: '', rangeType: '' }
  ]);

  const [currency, setCurrency] = useState({
    selected: '',
    hasError: false
  });

  const [channelName, setChannelName] = useState({
    selected: '',
    hasError: false
  });

  const [commissionMode, setCommissionMode] = useState({
    selected: '',
    hasError: false
  });
  const [dspCommission, setDspCommission] = useState({
    selected: '',
    hasError: false
  });
  const [commissionType, setCommissionType] = useState({
    selected: '',
    hasError: false
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState([{ errorStatus: false, msg: '' }]);
  const [error1, setError1] = useState([{ errorStatus: false, msg: '' }]);
  const [error2, setError2] = useState([{ errorStatus: false, msg: '' }]);
  const [error3, setError3] = useState([{ errorStatus: false, msg: '' }]);
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
  const errorHandler3 = (index, status, errorMessage) => {
    const newArray3 = [...error3];
    newArray3[index] = { errorStatus: status, msg: errorMessage };
    setError3(newArray3);
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
      data.commissionRuleName === '' ||
      data.commissionRuleName === null ||
      data.commissionRuleName === undefined
    ) {
      setErrorName(true);
      setErrorMessageName('Required');
      return false;
    }
    if (
      data.currency === '' ||
      data.currency === null ||
      data.currency === undefined
    ) {
      setCurrency({
        selected: '',
        hasError: true
      });
      return false;
    }
    // if (
    //   channelName.selected === '' ||
    //   channelName.selected === null ||
    //   channelName.selected === undefined
    // ) {
    //   setChannelName({
    //     selected: '',
    //     hasError: true
    //   });
    //   return false;
    // }
    if (
      data.commissionType === '' ||
      data.commissionType === null ||
      data.commissionType === undefined
    ) {
      setCommissionType({
        selected: '',
        hasError: true
      });
      return false;
    }
    if (
      commissionType.selected === 'Flat' ||
      commissionType.selected === 'Percentage'
    ) {
      if (
        data.commissionValue === '' ||
        isNaN(data.commissionValue) ||
        data.commissionRuleName === null ||
        data.commissionRuleName === undefined ||
        data.commissionRuleName === 0
      ) {
        setError_value(true);
        setError_value_text('Required');

        return false;
      }
      return true;
    }
    return true;
  }

  const validAddedFeilds = (i)=>{
    let errorFeilds = false
    if(inputFields.length===0) return errorFeilds
    if(commissionType.selected==="Channel"&&!inputFields[i].channelName){
      const newError = [...error1]
      newError[i] = { errorStatus: true, msg: 'Required' }
      setError1(newError);
      errorFeilds = true
    }
    if(commissionType.selected!=="Channel"&&!inputFields[i]?.rangeFrom ){
      const newError = [...error]
      newError[i] = { errorStatus: true, msg: 'Required' }
      setError(newError);
      errorFeilds = true
    }
    if(commissionType.selected!=="Channel"&&!inputFields[i]?.rangeTo  ){
      const newError = [...error1]
      newError[i] = { errorStatus: true, msg: 'Required' }
      setError1(newError);
      errorFeilds = true
    }
    if(!inputFields[i]?.rangeValue ){
      const newError = [...error3]
      newError[i] = { errorStatus: true, msg: 'Required' }
      setError3(newError);
      errorFeilds = true
    }
    if(!inputFields[i]?.rangeType){
      const newError = [...error2]
      newError[i] = {errorStatus: true, msg: 'Required'}
      setError2(newError);
      errorFeilds = true
    }
    return errorFeilds
  }

  const onSubmit = (e) => {
    setIsSubmiting(true);
    if (!dataVerified()) {
      setIsSubmiting(false);
      return;
    }
    const userData = JSON.parse(localStorage.getItem('USER'));
    const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
    e.preventDefault();
    const channelCommission = inputFields.map(item=>({
      channelName:item.channelName,
      commissionType:item.rangeType,
      commissionValue: Number(item.rangeValue) || 0
    }))

    if(commissionType.selected==="Tier" || commissionType.selected==="Volume" ){ 

    let errorInFeilds = false
    inputFields.forEach((_,i)=>{
      if(validAddedFeilds(i))errorInFeilds = true
    })
    if(errorInFeilds){
      return setIsSubmiting(false);
    }
  }

    if(commissionType.selected==="Channel"){ 
    let channelCommissionError = false
    channelCommission.forEach(({channelName,commissionType,commissionValue},i)=>{
      const val = [...inputFields]
      if(!commissionValue) {
        val[i].errorFeild ='commissionValue'
        channelCommissionError= true
       }
      
      if(!commissionType){
        val[i].errorFeild ='commissionType'
        channelCommissionError= true
       }
       if(!channelName){
        val[i].errorFeild ='channelName'
        channelCommissionError= true
       }
      
      if(channelCommissionError){
        val[i].hasError = true
        val[i].errorMsg = 'Required'
        setInputFields(val)
      }
    })
    if(channelCommissionError){
      return setIsSubmiting(false);
    }
  }
    let workFlowId = 1623672260198;
    let userRole = localStorage.getItem('roleId');
    let Ebody = {};
    let accessToken;
    Ebody['workflowId'] = workFlowId;
    Ebody['userId'] = localStorage.getItem('signinId');
    Ebody['userRole'] = userRole;
    Ebody['executionModeStatus'] = false;
    Ebody['async'] = false;
    Ebody['Values'] = { ...data, channelCommission};
    Ebody['Values']['date'] = new Date();
    Ebody['Values']['userName'] = userData?.sub;
    Ebody['Values']['userId'] = Loginuser?.id;
    Ebody['Values']['subStatus'] = 'draft';
    Ebody['Values']['channel'] = 'DPRM';
    Ebody['Values']['acceptanceStatus'] = 'open';
    Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
    if(commissionType.selected==="Channel"){ 
      Ebody['Values']['commissionRuleRange'] = []
      Ebody['Values']['commissionValue'] = 0;

    }
    if(commissionType.selected==="Tier" || commissionType.selected==="Volume" ){ 
      Ebody['Values']['channelCommission'] = []
      Ebody['Values']['commissionValue'] = 0;
      Ebody['Values']['commissionRuleRange'] = inputFields.map(item=>{
        delete item.hasError
        delete item.errorMsg
        delete item.errorFeild

        return item
      })

    }

    TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
      .then((resp) => {
        console.log(resp.data);
        history.push({
          pathname: '/digital-prm-web-ui/commissionapproval',
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
      data.commissionRuleName === '' ||
      data.currency === '' ||
      data.commissionType === '' ||
      data.channelName === '' ||
      // data.percentageOrAmount === '' ||
      // data.commissionRuleName === '' ||
      // data.subscriptionFee === 0 ||
      // data.oneTimeEnrollmentFee === 0 ||
      // data.settlementPeriod === '' ||
      //data.commissionMode === '' ||
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
          onClick={onSubmit}
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
          onClick={onSubmit}
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
  
  const clearChannelError = ()=>{
    let values = [...inputFields];
    values = values.map(item=>({...item,hasError:false,errorMsg:'',errorFeild:''}))
    return values
  }
  const handleChannelName = (index,event) => {
      let values = clearChannelError()
      setError1(prev=>{
        const newError = [...prev]
        newError[index] = { errorStatus: false, msg: '' }
        return newError
      })
      const isAlreadyExist= inputFields.some(item=>item.channelName===event.target.value)
      if(isAlreadyExist){
        values[index].hasError = true
        values[index].errorFeild = 'channelName'
        values[index].errorMsg = `${event.target.value} already exist!` 
      } else{
        values[index][event.target.name] = event.target.value;
      }
      
      setInputFields(values);
  };


  const handleCommissionMode = (event) => {
    if (event.target.value === undefined) {
      setCommissionMode({
        selected: '',
        hasError: true
      });
    } else {
      setCommissionMode({
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


  const handleCommissionType = (event) => {
    //console.log('handleCommissionType', event.target.value);
    // setCommissionType({
    //   selected: event.target.value
    // });
    if (event.target.value === undefined) {
      setCommissionType({
        selected: '',
        hasError: true
      });
    } else {
      setCommissionType({
        selected: event.target.value,
        hasError: false
      });
    }
  };

  // set auto generated rule code
  const generatedCode = () => {
    TecnotreedigitalSales.get('/commissionRules/generatecommissioncode')
      .then((resp) => {
        setGeneratedCommissionCode(resp.data);
        setData({ ...data, ['commissionRuleCode']: resp.data });
      })
      .catch((error) => {});
  };
  useEffect(() => {
    generatedCode();
  }, []);
  useEffect(() => {
    setData({ ...data, ['commissionRuleCode']: generatedCommissionCode });
  }, []);
  const [select, setSelected]  = useState('');

  const [search, setSearch] = useState('');
  const [optionList,setOptionList] = useState([]);

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
              setErrorMessageName('Rule Name already exist');
            } else {
              setDuplicate(false);
            }
          })
          .catch((error) => {});
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [search]);


  useEffect(() => {
    if (commissionType === "Channel") {
      const channelListUrl = "https://dclm-mmp.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/masterdata?type=channel";
      const fetchChannelListData = async (url) => {
        try {
          const result = await axios.get(url);
          console.log(result)
          if (result.data) {
            setChannelList(result.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchChannelListData(channelListUrl);
    }
  }, [commissionType])

  const getCurrency = () => {
    TecnotreedigitalSales.get('masterdata?type=currency').then((resp) => {
      setMasterCurrency(resp.data[0].currency);
    });
  };
  const getChannelName = () => {
    TecnotreedigitalSales.get('masterdata?type=channel').then((resp) => {
      // setMasterCurrency(resp.data[0].currency);
       console.log('channeltyperep',resp);
      setmasterChannelName(resp.data[0].channel);


    });
  };

  useEffect(() => {
    getCurrency();
    getChannelName();
  }, []);
  useEffect(() => {
    if (
      data.commissionRuleName === '' ||
      data.currency === '' ||
      data.channelName === '' ||
      data.commissionType === '' ||
      isDuplicate
    ) {
      setIsBtnDisable(true);
    } else {
      setIsBtnDisable(false);
    }
  }, [
    data.commissionRuleName,
    data.currency,
    data.masterCurrency,
    data.commissionType,
    data.channelName,
    isDuplicate
  ]);
  const clearAllFeildErrors = ()=>{
    setError(prev=>prev.map((item)=>({...item,errorStatus:false,msg:''})))
    setError1(prev=>prev.map((item)=>({...item,errorStatus:false,msg:''})))
    setError2(prev=>prev.map((item)=>({...item,errorStatus:false,msg:''})))
    setError3(prev=>prev.map((item)=>({...item,errorStatus:false,msg:''})))
  }
  /**onChange for all the fields except add range */
  const handleChange = (event) => {
    if (event.target.name === 'commissionValue') {
      if (
        event.target.value === 0 ||
        event.target.value === '' ||
        event.target.value === isNaN
      ) {
        // setErrorName(true);
        setError_value(true);
        setError_value_text('value is required');
        // setErrorMessageName('Required');
      } else {
        setError_value(false);
        setError_value_text('');
      }
      let value = parseInt(event.target.value);
      setData({ ...data, [event.target.name]: value });
    } else {
      if (event.target.value.length === 0 || '') {
        setErrorName(true);
        setErrorMessageName('Required');
      } else {
        setErrorCode(false);
        setErrorMessageCode('');
        setErrorName(false);
        setErrorMessageName('');
      }
      setData({ ...data, [event.target.name]: event.target.value });
    }

    clearAllFeildErrors()

    // if (event.target.name === 'percentageOrAmount') {
    //   if (event.target.value === '' || 'undefined') {
    //     setPercentageAmount({
    //       selected: '',
    //       hasError: true
    //     });
    //   } else {
    //   }
    //   setData({ ...data, [event.target.name]: event.target.value });
    // }

    // // if(event.taget.name === 'commissionValue'){

    // // }

    // if (event.target.name === 'commissionRuleCode') {
    //   if (event.target.value.length === 0) {
    //     setErrorCode(true);
    //     setErrorMessageCode('Required');
    //   } else {
    //     setErrorCode(false);
    //     setErrorMessageCode('');
    //   }
    //   setData({ ...data, [event.target.name]: event.target.value });
    // }
    // if (event.target.name === 'commissionRuleName') {
    //   if (event.target.value.length === 0 || '') {
    //     setErrorName(true);
    //     setErrorMessageName('Required');
    //   } else {
    //     setErrorName(false);
    //     setErrorMessageName('');
    //     if (event.target.value.length >= 3) {
    //       setSearch(event.target.value);
    //     }
    //   }
    //   setData({ ...data, [event.target.name]: event.target.value });
    // }
    // if (event.target.name === 'commissionValue') {
    //   if (event.target.value.length === 0 || '') {
    //     setErrorName(true);
    //     setErrorMessageName('Required');
    //   } else {
    //     setErrorName(false);
    //     setErrorMessageName('');
    //     if (event.target.value.length >= 3) {
    //       setSearch(event.target.value);
    //     }
    //   }

    //   let value = parseInt(event.target.value);
    //   setData({ ...data, [event.target.name]: value });
    // }
    // if (event.target.name === 'currency') {
    //   if (event.target.value.length === 0 || '') {
    //     setErrorName(true);
    //     setErrorMessageName('Required');
    //   } else {
    //     setErrorName(false);
    //     setErrorMessageName('');
    //     if (event.target.value.length >= 3) {
    //       setSearch(event.target.value);
    //     }
    //   }

    //   let value = parseInt(event.target.value);
    //   setData({ ...data, [event.target.name]: event.target.value });
    // }
    // setData({ ...data, [event.target.name]: event.target.value });
  };

  /**onChange handler for Subscription fee and One time enrollment */
  const handleFees = (event) => {
    if (
      event.target.name === 'oneTimeEnrollmentFee' ||
      event.target.name === 'subscriptionFee'
    ) {
      let inputValue = parseInt(event.target.value);
      setData({ ...data, [event.target.name]: inputValue });
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

 const  deleteErrorAtIndex = (index)=>{
    setError(prev=>prev.filter((_,i)=>i!==index))
    setError1(prev=>prev.filter((_,i)=>i!==index))
    setError2(prev=>prev.filter((_,i)=>i!==index))
    setError3(prev=>prev.filter((_,i)=>i!==index))
  }

  /**To remove range fields from the view */
  const handleRemoveFields = (index) => {
    deleteErrorAtIndex(index)
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setData((data) => {
      return { ...data, ['commissionRuleRange']: values };
    });
  };

  const handleChangeInputSelect = (index, event) => {
    setError2(prev=>{
      const newError = [...prev]
      newError[index] = { errorStatus: false, msg: '' }
      return newError
    })

    const values = clearChannelError()
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    setData((data) => {
      return { ...data, ['commissionRuleRange']: inputFields, };
    });
  };
console.log('asda-erro',{error,error1,error2,error3});
  /**onChange for fields of Add Range button */
  const handleChangeInput = (index, event) => {
    const values =clearChannelError()
    if(event.target.name==='rangeValue')setError3(prev=>{
      const newError = [...prev]
      newError[index] = { errorStatus: false, msg: '' }
      return newError
    })
    if(event.target.name==='rangeTo')setError1(prev=>{
      const newError = [...prev]
      newError[index] = { errorStatus: false, msg: '' }
      return newError
    })
    if(event.target.name==='rangeFrom') setError(prev=>{
      const newError = [...prev]
      newError[index] = { errorStatus: false, msg: '' }
      return newError
    })
    let inputValue;
    if (isNaN(parseInt(event.target.value))) {
      inputValue = '';
    } else {
      inputValue = parseInt(event.target.value);
    }
    values[index][event.target.name] = inputValue;
    setInputFields(values);
    setData((data) => {
      return { ...data, ['commissionRuleRange']: inputFields};
    });

    if (inputFields[index].rangeFrom === '') {
      // errorHandler(index, true, 'Required');
    } else {
      errorHandler(index, false, '');

      if (index > 0) {
        if (inputFields[index].rangeFrom <= inputFields[index - 1].rangeTo) {
          errorHandler(index, true, 'Must be Greater than previous range');
        }
      }
    }

    // if (inputFields[index].rangeTo === '') {
    //   errorHandler1(index, true, 'Required');
    // } else {
    //   errorHandler1(index, false, '');
    // }

    // if (inputFields[index].rangeValue === '') {
    //   errorHandler2(index, true, 'Required');
    // } else {
    //   errorHandler2(index, false, '');
    // }
  };

  /**To add new range fields to the view */
  const handleAddFields = (event) => {
    let errorFeilds = false
    const idx = inputFields.length?inputFields.length-1 : 0
    if(validAddedFeilds(idx)) return;
    i=i+1;

    setError([...error, (error[i] = { errorStatus: false, msg: '' })]);
    setError1([...error1, (error1[i] = { errorStatus: false, msg: '' })]);
    setError2([...error2, (error2[i] = { errorStatus: false, msg: '' })]);
    setError3([...error3, (error3[i] = { errorStatus: false, msg: '' })]);
    setInputFields([
      ...inputFields,
      (inputFields[i] = {
        rangeFrom: '',
        rangeTo: '',
        rangeValue: '',
        rangeType: ''
      })
    ]);
  };

  const onchangeCode = async (e, value) => {
    if (e?.target?.value.length >= 2) {
      let data = await dashboardApi.CommissionRulesCode(e.target.value);
      commissiondetails.setValue(_.uniqWith(data, _.isEqual));
    }
  };
  const handleSelect = (e) => {
    setCommissionCode(e.target.value);
    let obj = _.filter(commissiondetails.value, [
      'commissionRuleCode',
      e.target.value
    ])[0];
    console.log('myobjg',obj)
    commissionObj.setValue(obj);
    setCommissionType({
      selected: obj?.commissionType,
      hasError: false
    });
    setData({
      ...data,
      ['currency']: obj.currency,
      ['channelName']: obj.channelName,
      ['commissionValue']: obj?.commissionValue,
      ['commissionType']: obj?.commissionType
    });
    setCurrency({
      ...currency,
      selected: obj?.currency,
      hasError: false
    }),
    setChannelName({
      ...channelName,
      selected: obj?.channelName,
      hasError: false
    }),
      se
      setError([...error, (error[i] = { errorStatus: false, msg: '' })]);
    setError1([...error1, (error1[i] = { errorStatus: false, msg: '' })]);
    setError2([...error2, (error2[i] = { errorStatus: false, msg: '' })]);
    setError3([...error2, (error2[i] = { errorStatus: false, msg: '' })]);
    // setInputFields(obj?.commissionRuleRange)
    // i++;
    for (i = 0; i <= obj?.commissionRuleRange.length - 1; i++) {
      //console.log('commissionRuleRange', obj?.commissionRuleRange[i]);
      setInputFields([
        // ...inputFields,
        (inputFields[i] = obj?.commissionRuleRange[i])
      ]);
    }
  };

  return (
    <div>
      <NavbarSettlement />
      <StepperCommission />
      <Box py={6} px={10} className={classes.homeContainer}>
        <Grid container direction="column">
          <Grid item>
            <Paper elevation={0}>
              <div style={{ width: 500 }}>
                <Autocomplete
                  //   multiple
                  options={
                    Factory.makeCommissionData(commissiondetails.value) || [{}]
                  }
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  onInputChange={(e) => onchangeCode(e)}
                  onSelect={(e) => handleSelect(e)}
                  getOptionSelected={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      //label="Commission Rule Code"
                      placeholder=" Search Commission Rule code"
                      margin="normal"
                      fullWidth
                      // value={"efr"}
                    />
                  )}
                />
              </div>
              <Typography variant="h4">Commission Rule Details</Typography>

              <div className="App">
                <div style={{ maxWidth: '100%', paddingTop: '12px' }}>
                  <div className={classes.root}>
                    <Grid container direction="column" xs="12">
                      {/*First Row*/}
                      <Grid item>
                        <Grid container direction="row" xs={12}>
                          <Grid item xs={4} style={{ padding: '22px' }}>
                            <TextField
                              required
                              name="commissionRuleName"
                              fullWidth
                              label="COMMISSION RULE NAME"
                              onChange={handleChange}
                              error={errorName}
                              helperText={errorMessageName}
                            />
                          </Grid>
                          <Grid item xs={4} style={{ padding: '22px' }}>
                            <TextField
                              required={true}
                              onChange={handleChange}
                              name="commissionRuleCode"
                              fullWidth
                              label="COMMISSION RULE CODE"
                              error={errorCode}
                              helperText={errorMessageCode}
                              value={generatedCommissionCode}
                              inputProps={{ readOnly: true }}
                            />
                          </Grid>
                          <Grid item xs={4} style={{ padding: '22px' }}>
                            <FormControl
                              fullWidth
                              error={currency.hasError}
                              required
                            >
                              <InputLabel id="">CURRENCY</InputLabel>
                              <Select
                                labelId=""
                                id=""
                                defaultValue=""
                                name="currency"
                                value={currency.selected}
                                onChange={handleChange}
                                onClick={(event) => handleCurrency(event)}
                              >
                                {masterCurrency.map((item) => {
                                  return (
                                    <MenuItem value={item.code}>
                                      {item.code}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {currency.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>

                        {/*Third Row*/}
                        <Grid container direction="row" xs={12}>
                          {/* <Grid item xs={4} style={{ padding: '22px' }}>
                            <FormControl
                              fullWidth
                              error={commissionMode.hasError}
                            >
                              <InputLabel id="">COMMISSION MODE</InputLabel>
                              <Select
                                labelId=""
                                name="commissionMode"
                                value={commissionMode.selected}
                                onChange={handleChange}
                                onClick={(event) => handleCommissionMode(event)}
                              >
                                <MenuItem value="Flat Fee">Flat Fee</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                                <MenuItem value="Revenue Shared">
                                  Revenue Shared
                                </MenuItem>
                              </Select>
                              {commissionMode.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid> */}
                          <Grid item xs={4} style={{ padding: '22px' }}  className='commissionTypedropdown'>
                            <FormControl
                              fullWidth
                              error={commissionType.hasError}
                              required
                            >
                              <InputLabel id="">COMMISSION TYPE</InputLabel>
                              <Select
                                labelId=""
                                name="commissionType"
                                onChange={handleChange}
                                value={commissionType.selected || ''}
                                onClick={(event) => handleCommissionType(event)}
                               
                              >
                                <MenuItem value="Flat">Flat</MenuItem>
                                <MenuItem value="Tier">Tier</MenuItem>
                                <MenuItem value="Volume">Volume</MenuItem>
                                <MenuItem value="Percentage">
                                  Percentage
                                </MenuItem>
                                <MenuItem value="Channel">
                                  Channel
                                </MenuItem>
                              </Select>
                              {commissionType.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid>
                          {commissionType.selected !== 'Tier' &&
                          commissionType.selected !== 'Channel' &&
                          commissionType.selected !== 'Volume' ? (
                            <Grid item xs={4} style={{ padding: '22px' }}>
                              <TextField
                                required
                                name="commissionValue"
                                fullWidth
                                label="COMMISSION VALUE"
                                onChange={handleChange}
                                onBlur={handleChange}
                                value={data?.commissionValue || ''}
                                error={error_value}
                                helperText={error_value_text}
                              />
                            </Grid>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>
                      {/* Add Range Dynamic Row */}

                      {commissionType.selected === 'Tier' ||
                      commissionType.selected === 'Volume' ? (
                        <form>
                          <div style={{ display: 'flex', paddingLeft: '22px' }}>
                            <div>
                              {inputFields.map((inputField, index) => (
                                <div key={index} style={{ display: 'flex' }}>
                                  <TextField
                                    fullWidth
                                    required={true}
                                    className={classes.textOne}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="rangeFrom"
                                    value={inputField?.rangeFrom}
                                    label="RANGE FROM"
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
                                    
                                    value={inputField.rangeTo}
                                    label="RANGE TO"
                                    name="rangeTo"
                                    error={error1[index].errorStatus}
                                    helperText={error1[index].msg}
                                  />

                                  <FormControl
                                    className={classes.formText}
                                    required
                                  >
                                    <InputLabel id="">
                                      PERCENTAGE OR FLAT
                                    </InputLabel>
                                    <Select
                                      required
                                      onChange={(event) =>
                                        handleChangeInputSelect(index, event)
                                      }
                                      name="rangeType"
                                      value={inputField.rangeType}
                                      error={error2[index].errorStatus}
                                      helperText={error2[index].msg}
                                    >
                                      <MenuItem value="Percentage">
                                        Percentage
                                      </MenuItem>
                                      <MenuItem value="Flat">Flat</MenuItem>
                                    </Select>
                                    {error2[index].errorStatus ? (
                                <FormHelperText style={{color:'#FF4757'}}>{error2[index].msg}</FormHelperText>
                              ) : (
                                ''
                              )}
                                  </FormControl>

                                  {inputField.rangeType === 'Percentage' ? (
                                    <TextField
                                    required
                                      className={classes.textTwo}
                                      onChange={(event) =>
                                        handleChangeInput(index, event)
                                      }
                                      
                                      value={inputField.rangeValue}
                                      label="PERCENTAGE"
                                      name="rangeValue"
                                      error={error3[index].errorStatus}
                                      helperText={error3[index].msg}
                                    />
                                  ) : (
                                    <TextField
                                    required
                                      className={classes.textTwo}
                                      onChange={(event) =>
                                        handleChangeInput(index, event)
                                      }
                                      name="rangeValue"
                                      value={inputField.rangeValue}
                                      label="FLAT"
                                      error={error3[index].errorStatus}
                                      helperText={error3[index].msg}
                                    />
                                  )}

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
                        </form>
                      ) : null}
                         {commissionType.selected === 'Channel' ? (
                        <form>
                        <div style={{display:'flex',paddingLeft: '22px' }}>
                          <div>
                            {inputFields.map((inputField, index) => (
                              <div key={index} style={{ display: 'flex',gap:'1rem'}}>
                                    <FormControl
                            className={classes.formText}
                              error={inputField.errorFeild==='channelName'||error1.hasError}
                              required
                              style={{ width: '30rem' }}
                            fullWidth
                            >
                              <InputLabel id="">CHANNEL</InputLabel>
                              <Select
                                labelId=""
                                id=""
                                defaultValue=""
                                name="channelName"
                                value={inputField.channelName}
                                onChange={(e)=>handleChannelName(index,e)}
                              >
                                {masterChannelName.map((item) => {
                                  return (
                                    <MenuItem value={item.code}>
                                      {item.code}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {inputField.errorFeild==='channelName' ? (
                                <FormHelperText style={{color:'#FF4757'}}>{inputField.errorMsg?inputField.errorMsg:'Required'}</FormHelperText>
                              ) : (
                                ''
                              )}
                               <FormHelperText style={{color:'#FF4757'}}>{error1[index].msg}</FormHelperText>
                            </FormControl>
                              
                        
{/* channeldrop */}
                                <FormControl
                                  className={classes.formText}
                                  style={{ width: '20rem' }}
                                  required
                                  fullWidth
                                >
                                  <InputLabel id="">
                                    PERCENTAGE OR FLAT
                                  </InputLabel>
                                  <Select
                                    required
                                    onChange={(event) =>
                                      handleChangeInputSelect(index, event)
                                    }
                                   
                                    name="rangeType"
                                    value={inputField.rangeType}
                                      error={error2[index].errorStatus||inputField.errorFeild==='commissionType'}
                                      helperText={error2[index].msg}
                                  >
                                    <MenuItem value="Percentage"  className='commisionruleDropdown'>
                                      <InputLabel id="" > Percentage</InputLabel>
                                     </MenuItem>
                                    <MenuItem value="Flat"  className='commisionruleDropdown'>
                                    <InputLabel id="" > Flat</InputLabel></MenuItem>
                                  </Select>
                                  {inputField.errorFeild==='commissionType' ? (
                                <FormHelperText style={{color:'#FF4757'}}>{inputField.errorMsg?inputField.errorMsg:'Required'}</FormHelperText>
                              ) : (
                                <></>
                              )}
                                                              <FormHelperText style={{color:'#FF4757'}}>{error2[index].msg}</FormHelperText>

                                </FormControl>

                                <FormControl
                                  className={classes.formText}
                                  style={{ width: '20rem' }}
                                  required
                                  fullWidth
                                  // error={inputField.errorFeild==='commissionValue'}
                                >
                                {inputField.rangeType === 'Percentage' ? (
                                  <TextField
                                  required
                                  fullWidth
                                    className={classes.textTwo}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    value={inputField.rangeValue}
                                    label="PERCENTAGE"
                                    name="rangeValue"
                                      error={inputField.errorFeild==='commissionValue'||error3[index].errorStatus}
                                      helperText={error3[index].msg}
                                  />
                                ) : (
                                  <TextField
                                  required
                                  fullWidth
                                    className={classes.textTwo}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    value={inputField.rangeValue}
                                    label="FLAT"
                                    name="rangeValue"
                                      error={inputField.errorFeild==='commissionValue'||error3[index].errorStatus}
                                      helperText={error3[index].msg}
                                  />
                                )}
                              </FormControl>
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
                      </form>
                      ) : null}
                    </Grid>
                  </div>
                </div>
              </div>

              <Grid
                container
                direction="row"
                justify="flex-end"
                style={{ paddingTop: '12px' }}
                spacing={4}
              >
                <Grid item>
                  <Button
                    variant="text"
                    color="secondary"
                    disabled={isSubmiting}
                     className={classes.btnClr}
                    onClick={navigateToPreviousPage}
                    //onClick={(event) => onCancel(event)}
                    // endIcon={<NavigateNext />}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  {/* <SubmitButton /> */}
                  <Button
                    disabled={isSubmiting}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={onSubmit}
                    endIcon={<NavigateNext />}
                  >
                    {isSubmiting ? <CircularProgress size={25} /> : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <CopyRightFooter />
      </Box>
    </div>
  );
};

export default CommissionRule;
