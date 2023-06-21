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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
// import FormHelperText from '@material-ui/core/FormHelperText';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import NavbarRevoke from './NavbarRevoke';
import ProductDetails from './preview';
import { TecnotreedigitalSales } from '../../Http/axios';
import StepperRevoke from './StepperRevoke';
import RevokeWarning from './RevokeWarning';
import NavigateNext from '@material-ui/icons/NavigateNext';
// import CopyRightFooter from 'Components/CopyRightFooter/CopyRightFooter';
import { useStore } from 'react-redux';
import workflowPayload from 'Factory/Worlflowpayload';
import moment from 'moment';

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
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    backgroundColor: '#EDEDF5',
    height: '100vh'
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
  bottomPaper: {
    display: 'flex',
    paddingLeft: '0 !important',
    justifyContent: 'space-between'
  },
  pageHead: {
    height: 'calc(100vh - 110px)',
    overflow: 'scroll',
    scrollBehavior: 'smooth',
    margin: '0',
    paddingTop: '10px'
  }
}));
const Revoke = (props) => {
  const classes = useStyles();
  const [openWarning, setOpenWarning] = React.useState(false);
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { location } = props;
  const userData = JSON.parse(localStorage.getItem('USER'));
  const [data, setData] = useState({
    startDate: null,
    endDate: null,
    revokeReasons: '',
    description: '',
    partner: location?.state?.partnerDetails,
    partnerId:
      location?.state?.partnerDetails?.PartnerDetails?.Partner_ID ||
      location?.state?.partnerDetails?.TenantDetails?.TENANT_ID,
    partnerType: location?.state?.partnerDetails?.PartnerDetails?.Partner_ID
      ? 'master'
      : 'tenant',
    suspendType: 'revoke',
    ...workflowPayload.returnWorkflowData(
      location?.state?.partnerDetails?.PartnerDetails?.Partner_ID ||
        location?.state?.partnerDetails?.TenantDetails?.TENANT_ID,
      location?.state?.partnerDetails?.PrimaryContactDetails?.EMAIL_ID,
      location?.state?.partnerDetails?.PrimaryContactDetails.MOBILE_NUMBER,
      location?.state?.partnerDetails?.PartnerDetails?.PARTNER_NAME ||
        location?.state?.partnerDetails?.TenantDetails?.TENANT_NAME,
      location?.state?.partnerDetails?.PrimaryContactDetails
        ?.PRIMARY_CONTACT_NAME,
      ''
    )
  });
  const store = useStore();
  const revoke_reasons =
    store.getState()?.master?.masterData?.revokeReasons || [];

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
      data.revokeReasons === '' ||
      data.revokeReasons === null ||
      data.revokeReasons === undefined
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

  const onSubmitRevoke = (e) => {
    setOpenWarning(false);
    // if (data?.description === '' || data?.revokeReasons === '') {
    //   setIsSubmiting(false);
    //   return;
    // }
    // if (!dataVerified()) {
    //
    //   return;
    // }
    setIsSubmiting(true);
    const userData = JSON.parse(localStorage.getItem('USER'));
    const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
    let workFlowId = 1671537263633;
    let userRole = localStorage.getItem('roleId');
    let Ebody = {};
    let accessToken;
    Ebody['workflowId'] = workFlowId;
    Ebody['userId'] = userData?.username;
    Ebody['userRole'] = userData?.roleName;
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
          pathname: '/digital-prm-web-ui/revokeapproval',
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
          onClick={onSubmitRevoke}
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
          onClick={onSubmitRevoke}
          endIcon={<NavigateNext />}
        >
          Submit
        </Button>
      );
    }
  }
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .max(500, 'Maximum 500 characters')
      .min(2, 'Must be More than 2 characters')
      .required('Required')
  });
  const getTextArea = (pprops) => (
    <TextField multiline={true} maxRwos={4} {...pprops} />
  );
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
  useEffect(() => {}, []);

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
  console.log(location?.state, 'locationRevoke');
  return (
    <div className={classes.divStyle}>
      <NavbarRevoke />

      <div className={classes.pageHead}>
        <StepperRevoke
          partnerType={
            location?.state?.partnerDetails?.PartnerDetails?.Partner_ID
          }
        />

        <ProductDetails
          maintitle={'Partner Information'}
          productData={location?.state?.partnerDetails}
          title={'PartnerDetails'}
          mobileNo={
            location?.state?.partnerDetails?.PrimaryContactDetails
              ?.MOBILE_NUMBER
          }
          email={
            location?.state?.partnerDetails?.PrimaryContactDetails?.EMAIL_ID
          }
        />

        <Formik
          initialValues={{
            requestedDate: new Date(),
            reason: '',
            description: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            // setFormPayload(values);
            console.log(values, 'chkhshgggWW');
            // handleYes(values)
            // setFeedBack(values.description);
            onSubmitRevoke(values);
          }}
          component={({ setFieldValue, values, errors, touched }) => (
            <Form
            // onSubmit={handleSubmitCloseAccount}
            >
              <Box py={6} px={10} className={classes.homeContainer}>
                <Grid container direction="column">
                  <Grid item>
                    <Paper className={classes.topItem}>
                      <Grid>
                        <Typography variant="h1" className={classes.text}>
                          Revoke Partner Suspensions
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
                                  <Grid item xs={4} style={{ padding: '20px' }}>
                                    <Typography>REQUEST DATE </Typography>
                                    <KeyboardDatePicker
                                      // clearable
                                      disablePast
                                      disabled
                                      // required
                                      format="dd/MM/yyyy"
                                      value={moment(new Date())}
                                      inputProps={{ readOnly: true }}
                                      // disabled
                                      // required

                                      name="requestedDate"
                                      onChange={(date) =>
                                        setFieldValue(
                                          'requestedDate',
                                          date.toISOString()
                                        )
                                      }
                                      // strictCompareDates
                                      fullWidth
                                    />
                                  </Grid>

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
                                      <InputLabel id="">REASON</InputLabel>
                                      <Select
                                        labelId=""
                                        id=""
                                        defaultValue=""
                                        name="reason"
                                        value={data?.revokeReasons}
                                        //   onChange={handleChange}
                                        className={classes.menuPaper}
                                        onClick={(event) => {
                                          setFieldValue(
                                            'reason',
                                            event.target.value
                                          );
                                          setData({
                                            ...data,
                                            revokeReasons:
                                              event.target.value
                                          });
                                        }}
                                        // required
                                      >
                                        {revoke_reasons?.map((item) => {
                                          return (
                                            <MenuItem value={item.code}>
                                              {item.code}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  direction="row"
                                  xs={12}
                                  spacing={6}
                                >
                                  <Grid item xs={12}>
                                    <Field
                                      required={true}
                                      name="description"
                                      fullWidth
                                      label="Description"
                                      placeholder="Details description of reason for de-active partner"
                                      variant="outlined"
                                      component={getTextArea}
                                      margin="normal"
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
                                    {errors.description &&
                                    touched.description ? (
                                      <div>{errors.description}</div>
                                    ) : null}
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
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

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
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  {/* <SubmitButton /> */}
                  <Button
                    disabled={isSubmiting}
                    // className={classes.proceedBtn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    endIcon={<NavigateNext />}
                    // onClick={handleSubmitCloseAccount}
                  >
                    {isSubmiting ? (
                      <CircularProgress size={25} style={{ color: 'green' }} />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
      {/* <Box>
        <CopyRightFooter />
      </Box> */}
      <RevokeWarning
        open={openWarning}
        handleSubmit={onSubmitRevoke}
        setOpen={setOpenWarning}
        partnerData={location?.state?.partnerDetails}
      />
    </div>
  );
};

export default withRouter(Revoke);
