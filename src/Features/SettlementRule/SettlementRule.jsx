import React, { useState, useEffect } from 'react';

import { history } from 'Store';

import { withRouter } from 'react-router-dom';
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

import NavbarSettlement from './NavbarSettlement';
import StepperSettlement from './StepperSettlement';
import { TecnotreedigitalSales } from '../../Http/axios';

import NavigateNext from '@material-ui/icons/NavigateNext';
import CopyRightFooter from 'Components/CopyRightFooter/CopyRightFooter';
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
    maxHeight: `calc(100vh - ${theme.spacing(30)})`,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '75vh'
  },
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
  },
}));
const SettlementRule = (props) => {
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
  const [errorMessageSubFee, setErrorMessageSubFee] = useState('');
  const [errorMessageElFee, setErrorMessageElFee] = useState('');
  const [errorMessageRangeFrom, setErrorMessageRangeFrom] = useState('');
  const [errorMessageRangeTo, setErrorMessageRangeTo] = useState('');
  const [errorMessageAmount, setErrorMessageAmount] = useState('');
  const [isSubmitting, setSubmitting] = useState(true);
  const [isDuplicate, setDuplicate] = useState(false);
  const [settlementCycleData, setSettlementCycleData] = useState([]);
  const [generatedSettlementCode, setGeneratedSettlementCode] = useState('');
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [masterCurrency, setMasterCurrency] = useState([]);
  const [masterPeriodicity, setMasterPeriodicity] = useState([]);
  const [selectedRangeFrom, setSelectedRangeFrom] = useState('');
  const [selectedRangeTo, setSelectedRangeTo] = useState('');
  const [data, setData] = useState({
    // settlementType: '',
    settlementRuleName: '',
    settlementRuleCode: generatedSettlementCode,
    //subscriptionFee: 0,
    currency: '',
    //oneTimeEnrollmentFee: 0,
    settlementPeriod: '',
    //settlementMode: '',
    // dspCommisionType: '',
    //settlementCycle: [{ from: 0, to: 0 }],
    settlementDate: '',
    settlementDueDate: '',
    settlementCycle: []

    //   percentageOrAmount: '',
    //   settlementRange: [
    //     {
    //       rangeFrom: 0,
    //       rangeTo: 0,
    //       amount: 0
    //     }
    //   ],
    //   status: ''
  });

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

  // const onCancel = (event) => {
  //   event.preventDefault();
  //   window.location.reload();
  // };
  const navigateToPreviousPage = () => {
    history.goBack();
  };
  function dataVerified() {
    if (
      data.settlementRuleName === '' ||
      data.settlementRuleName === null ||
      data.settlementRuleName === undefined
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
    if (
      data.settlementDate === '' ||
      data.settlementDate === null ||
      data.settlementDate === undefined
    ) {
      setSettlementStartDate({
        selected: '',
        hasError: true
      });
      return false;
    }
    if (
      data.settlementDueDate === '' ||
      data.settlementDueDate === null ||
      data.settlementDueDate === undefined
    ) {
      setSettlementDueDate({
        selected: '',
        hasError: true
      });
      return false;
    }
    if (
      data.settlementPeriod === '' ||
      data.settlementPeriod === null ||
      data.settlementPeriod === undefined
    ) {
      setSettlementPeriod({
        selected: '',
        hasError: true
      });
      return false;
    }
    if (!data.settlementCycle.length > 0) {
      setSettlementCycle({
        selected: '',
        hasError: true
      });
      return false;
    }
    return true;
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
    let workFlowId = 1621257381181;
    let userRole = localStorage.getItem('roleId');
    let Ebody = {};
    let accessToken;
    Ebody['workflowId'] = workFlowId;
    Ebody['userId'] = localStorage.getItem('signinId');
    Ebody['userRole'] = userRole;
    Ebody['executionModeStatus'] = false;
    Ebody['async'] = false;
    Ebody['Values'] = { ...data };
    Ebody['Values']['date'] = new Date();
    Ebody['Values']['userName'] = userData?.sub;
    Ebody['Values']['userId'] = Loginuser?.id;
    Ebody['Values']['subStatus'] = 'draft';
    Ebody['Values']['channel'] = 'DPRM';
    Ebody['Values']['acceptanceStatus'] = 'open';

    Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');

    TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
      .then((resp) => {
        history.push({
          pathname: '/digital-prm-web-ui/settlementapproval',
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
      //// data.settlementRange[i].amount === 0 ||
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
      // console.log('setStateCycle--', event.target.value);
      // console.log('as--', settlementCycle);
      // console.log(data);
      // setSettlementCycle({
      //   selected: event.target.value,
      //   hasError: false
      // });
    }
  };

  const [search, setSearch] = useState('');
  const generatedCode = () => {
    TecnotreedigitalSales.get('/settlementRules/generatesetcode')
      .then((resp) => {
        setGeneratedSettlementCode(resp.data);
        setData({ ...data, ['settlementRuleCode']: resp.data });
      })
      .catch((error) => {});
  };
  useEffect(() => {
    generatedCode();
  }, []);
  useEffect(() => {
    setData({ ...data, ['settlementRuleCode']: generatedSettlementCode });
  }, []);

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
  const getPeriodicity = () => {
    TecnotreedigitalSales.get('masterdata?type=periodicity').then((resp) => {
      setMasterPeriodicity(resp.data[0].periodicity);
    });
  };
  const getCurrency = () => {
    TecnotreedigitalSales.get('masterdata?type=currency').then((resp) => {
      setMasterCurrency(resp.data[0].currency);
    });
  };

  useEffect(() => {
    getSettlementCycle();
    getCurrency();
    getPeriodicity();
  }, []);
  useEffect(() => {
    if (
      data.settlementRuleCode === '' ||
      data.currency === '' ||
      data.settlementRuleName === '' ||
      data.settlementPeriod === '' ||
      data.settlementCycle.length === 0 ||
      data.settlementDate === '' ||
      data.settlementDueDate === '' ||
      isDuplicate
    ) {
      setIsBtnDisable(true);
    } else {
      setIsBtnDisable(false);
    }
  }, [
    data.settlementRuleCode,
    data.currency,
    data.settlementRuleName,
    data.settlementPeriod,
    data.settlementDate,
    data.settlementDueDate,
    isDuplicate
  ]);

  const items = ['asd', 'qwewqe', 'zxcz'];

  const dates = [];
  function defaultDays() {
    for (i = 1; i < 32; i++) {
      dates.push(i);
    }
  }
  defaultDays();
  //  console.log(dates, "ree", selectedRangeFrom)

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

    setData({ ...data, [event.target.name]: event.target.value });
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

  // const handleCycleChanges = (event) => {
  //   const values = [...inputCycles];
  //   values[]
  //   setInputCycles(values);
  //   setData({
  //     ...data,
  //     ['settlementCycle']: { from: event.target.value, to: event.target.value }
  //   });
  // };

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

  /**onChange for fields of Add Range button */
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    let inputValue;
    if (isNaN(parseInt(event.target.value))) {
      inputValue = '';
    } else {
      inputValue = parseInt(event.target.value);
    }
    values[index][event.target.name] = inputValue;
    setInputFields(values);

    setData((data) => {
      return { ...data, ['settlementRange']: inputFields };
    });

    if (inputFields[index].rangeFrom === '') {
      errorHandler(index, true, 'Required');
    } else {
      errorHandler(index, false, '');

      if (index > 0) {
        if (inputFields[index].rangeFrom <= inputFields[index - 1].rangeTo) {
          errorHandler(index, true, 'Must be Greater than previous range');
        }
      }
    }

    if (inputFields[index].rangeTo === '') {
      errorHandler1(index, true, 'Required');
    } else {
      errorHandler1(index, false, '');
    }

    if (inputFields[index].amount === '') {
      errorHandler2(index, true, 'Required');
    } else {
      errorHandler2(index, false, '');

      // if (
      //   inputFields[index].amount > inputFields[index].rangeTo ||
      //   inputFields[index].amount < inputFields[index].rangeFrom
      // ) {
      // } else {
      //   errorHandler2(index, false, '');
      // }
    }
  };

  /**To add new range fields to the view */
  const handleAddFields = (event) => {
    i++;

    setError([...error, (error[i] = { errorStatus: false, msg: '' })]);
    setError1([...error1, (error1[i] = { errorStatus: false, msg: '' })]);
    setError2([...error2, (error2[i] = { errorStatus: false, msg: '' })]);
    setInputFields([
      ...inputFields,
      (inputFields[i] = { rangeFrom: '', rangeTo: '', amount: '' })
    ]);
  };

  return (
    <div>
      <NavbarSettlement />
      <StepperSettlement />
      <Box py={6} px={10} className={classes.homeContainer}>
        {/* <Form> */}
        <Grid container direction="column">
          <Grid item>
            <Paper>
              <Typography variant="h4">Settlement Rule Details</Typography>
              {/* <form> */}
              <div className="App">
                <div style={{ maxWidth: '100%', paddingTop: '12px' }}>
                  <div className={classes.root}>
                    <Grid container direction="column" xs="12">
                      {/*First Row*/}
                      <Grid
                        item
                        style={{ paddingLeft: '15px', paddingBottom: '22px' }}
                      >
                        <Grid container direction="row" xs={12} spacing={6}>
                          <Grid item xs={4} style={{ padding: '20px' }}>
                            <TextField
                              required
                              name="settlementRuleName"
                              fullWidth
                              label="SETTLEMENT RULE NAME"
                              onChange={handleChange}
                              error={errorName}
                              helperText={errorMessageName}
                            />
                          </Grid>
                          <Grid item xs={4} style={{ padding: '20px' }}>
                            <TextField
                              required={true}
                              //onChange={handleChange}
                              name="settlementRuleCode"
                              fullWidth
                              label="SETTLEMENT RULE CODE"
                              error={errorCode}
                              helperText={errorMessageCode}
                              value={generatedSettlementCode}
                              inputProps={{ readOnly: true }}
                            />
                          </Grid>
                          <Grid item xs={4} style={{ padding: '20px' }}>
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
                        {/*Second Row*/}
                        <Grid container direction="row" xs={12} spacing={6}>
                          {/* <Grid item xs={4}>
                            <TextField
                              required
                              name="subscriptionFee"
                              fullWidth
                              label="SUBSCRIPTION FEE"
                              onChange={handleFees}
                              error={errorSubFee}
                              helperText={errorMessageSubFee}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              required
                              onChange={handleFees}
                              name="oneTimeEnrollmentFee"
                              fullWidth
                              label="ONE TIME ENROLLMENT FEE"
                              error={errorElFee}
                              helperText={errorMessageElFee}
                            />
                          </Grid> */}
                          <Grid item xs={4} style={{ padding: '20px' }}>
                            <FormControl
                              fullWidth
                              error={settlementPeriod.hasError}
                              required
                            >
                              <InputLabel id="">SETTLEMENT PERIOD</InputLabel>
                              <Select
                                labelId=""
                                id=""
                                name="settlementPeriod"
                                onChange={handleChange}
                                onClick={(event) =>
                                  handleSettlementPeriod(event)
                                }
                                value={settlementPeriod.selected}
                              >
                                {/* <MenuItem value="Weekly">Weekly</MenuItem> */}
                                {/* {masterPeriodicity.map((item) => {
                                  return (
                                    <MenuItem value={item.name}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })} */}
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                {/* <MenuItem value="Bi Monthly">
                                  Bi Monthly
                                </MenuItem>
                                <MenuItem value="Yearly">Yearly</MenuItem> */}
                              </Select>
                              {settlementPeriod.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={4} style={{ padding: '20px' }}>
                            <FormControl
                              fullWidth
                              error={settlementCycle.hasError}
                              required
                            >
                              <InputLabel id="">SETTLEMENT CYCLE</InputLabel>
                              <Select
                                labelId=""
                                name="settlementCycle"
                                onChange={handleChangeCyles}
                                //value={dspCommission.selected}
                                onClick={(event) => handleClickCycle(event)}
                              >
                                {settlementCycleData.map((item) => {
                                  return (
                                    <MenuItem value={item.name}>
                                      {' '}
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {settlementCycle.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={4} style={{ padding: '20px' }}>
                            <FormControl
                              fullWidth
                              error={settlementStartDate.hasError}
                              required
                            >
                              <InputLabel id="">
                                SETTLEMENT START DATE
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  classes: { paper: classes.menuPaper }
                                }}
                                labelId=""
                                name="settlementDate"
                                disabled
                                onChange={handleChange}
                                value={data.settlementDate || ''}
                                onClick={(event) =>
                                  handleSettlementStartDate(event)
                                }
                                // onClick={(event) => setSettlementDate(event)}
                              >
                                {dates.map((item) => {
                                  // if (item === selectedRangeFrom) {
                                  return (
                                    <MenuItem value={item.toString()}>
                                      {' '}
                                      {item}
                                    </MenuItem>
                                  );
                                  // }
                                })}
                              </Select>

                              {settlementStartDate.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid>
                          {/* <Grid item xs={4} style={{ padding: '20px' }}>
                            <FormControl
                              fullWidth
                              error={settlementMode.hasError}
                            >
                              <InputLabel id="">SETTLEMENT MODE</InputLabel>
                              <Select
                                labelId=""
                                name="settlementMode"
                                value={settlementMode.selected}
                                onChange={handleChange}
                                onClick={(event) => handleSettlementMode(event)}
                              >
                                <MenuItem value="Flat Fee">Flat Fee</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                                <MenuItem value="Revenue Shared">
                                  Revenue Shared
                                </MenuItem>
                              </Select>
                              {settlementMode.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid> */}
                          {/* <Grid item xs={4} style={{ padding: '20px' }}>
                            <FormControl
                              fullWidth
                              error={dspCommission.hasError}
                            >
                              <InputLabel id="">DSP COMMISSION TYPE</InputLabel>
                              <Select
                                labelId=""
                                name="dspCommisionType"
                                onChange={handleChange}
                                value={dspCommission.selected}
                                onClick={(event) => handleDspCommision(event)}
                              >
                                <MenuItem value="Volume">Volume</MenuItem>
                                <MenuItem value="Tier">Tier</MenuItem>
                              </Select>
                              {dspCommission.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid> */}
                        </Grid>
                        {/*Third Row*/}
                        <Grid container direction="row" xs={12} spacing={6}>
                          <Grid item xs={4} style={{ padding: '20px' }}>
                            <FormControl
                              fullWidth
                              error={settlementDueDate.hasError}
                              required
                            >
                              <InputLabel id="">SETTLEMENT DUE DATE</InputLabel>
                              <Select
                                MenuProps={{
                                  classes: { paper: classes.menuPaper }
                                }}
                                labelId=""
                                name="settlementDueDate"
                                onChange={handleChange}
                                //value={dspCommission.selected}
                                // onClick={(event) => setSettlementDueDate(event)}
                                onClick={(event) =>
                                  handleSettlementDueDate(event)
                                }
                              >
                                {dates.map((item) => {
                                  if (item >= selectedRangeFrom)
                                    return (
                                      <MenuItem value={item.toString()}>
                                        {' '}
                                        {item}
                                      </MenuItem>
                                    );
                                })}
                              </Select>
                              {isEmpty.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid>
                          {/* <Grid item xs={4}>
                            <FormControl
                              fullWidth
                              error={percentageAmount.hasError}
                            >
                              <InputLabel id="">
                                PERCENTAGE OR AMOUNT
                              </InputLabel>
                              <Select
                                required={true}
                                name="percentageOrAmount"
                                onChange={handleChange}
                                onClick={(event) =>
                                  handleSelectPercentage(event)
                                }
                                value={percentageAmount.selected}
                              >
                                <MenuItem value="Percentage">
                                  Percentage
                                </MenuItem>
                                <MenuItem value="Amount">Amount</MenuItem>
                              </Select>
                              {percentageAmount.hasError ? (
                                <FormHelperText>Required</FormHelperText>
                              ) : (
                                ''
                              )}
                            </FormControl>
                          </Grid> */}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        xs={12}
                        spacing={6}
                      ></Grid>

                      {/*Add Range Dynamic Row */}

                      {/* {percentageAmount.selected === 'Amount' ? (
                        <form>
                          <div style={{ display: 'flex' }}>
                            <div>
                              {inputFields.map((inputField, index) => (
                                <div key={index} style={{ display: 'flex' }}>
                                  <TextField
                                    fullWidth
                                    required={true}
                                    style={{
                                      width: '29.5vw',
                                      marginTop: '16px',
                                      marginRight: '16px'
                                    }}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="rangeFrom"
                                    value={inputField.rangeFrom}
                                    label="RANGE FROM"
                                    error={error[index].errorStatus}
                                    helperText={error[index].msg}
                                  />
                                  <TextField
                                    fullWidth
                                    required={true}
                                    style={{
                                      width: '29.5vw',
                                      marginTop: '16px',
                                      marginRight: '16px'
                                    }}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="rangeTo"
                                    value={inputField.rangeTo}
                                    label="RANGE TO"
                                    error={error1[index].errorStatus}
                                    helperText={error1[index].msg}
                                  />
                                  <TextField
                                    style={{
                                      width: '15vw',
                                      marginTop: '16px',
                                      marginRight: '16px'
                                    }}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="amount"
                                    value={inputField.amount}
                                    label="AMOUNT"
                                    error={error2[index].errorStatus}
                                    helperText={error2[index].msg}
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              <Button
                                style={{ marginTop: '40px' }}
                                color="primary"
                                onClick={(event) => handleAddFields(event)}
                              >
                                +ADD RANGE
                              </Button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form>
                          <div style={{ display: 'flex' }}>
                            <div>
                              {inputFields.map((inputField, index) => (
                                <div key={index} style={{ display: 'flex' }}>
                                  <TextField
                                    fullWidth
                                    required={true}
                                    style={{
                                      width: '29.5vw',
                                      marginTop: '16px',
                                      marginRight: '16px'
                                    }}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="rangeFrom"
                                    value={inputField.rangeFrom}
                                    label="RANGE FROM"
                                    error={error[index].errorStatus}
                                    helperText={error[index].msg}
                                  />
                                  <TextField
                                    fullWidth
                                    required={true}
                                    style={{
                                      width: '29.5vw',
                                      marginTop: '16px',
                                      marginRight: '16px'
                                    }}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="rangeTo"
                                    value={inputField.rangeTo}
                                    label="RANGE TO"
                                    error={error1[index].errorStatus}
                                    helperText={error1[index].msg}
                                  />
                                  <TextField
                                    style={{
                                      width: '15vw',
                                      marginTop: '16px',
                                      marginRight: '16px'
                                    }}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                    name="amount"
                                    value={inputField.amount}
                                    label="PERCENTAGE"
                                    error={error2[index].errorStatus}
                                    helperText={error2[index].msg}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          %
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              <Button
                                style={{ marginTop: '40px' }}
                                color="primary"
                                onClick={(event) => handleAddFields(event)}
                              >
                                +ADD RANGE
                              </Button>
                            </div>
                          </div>
                        </form>
                      )} */}
                    </Grid>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </Paper>

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
                  onClick={navigateToPreviousPage}
                  disabled={isSubmiting}
                  className={classes.btnClr}
                  // onClick={(event) => onCancel(event)}
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
          </Grid>
        </Grid>
        {/* </Form> */}
      </Box>

      <Box>
        <CopyRightFooter />
      </Box>
    </div>
  );
};

export default withRouter(SettlementRule);
