import React, { useRef, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch } from 'react-redux';
import Modals from 'Store/Modals';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import { useStateful } from 'react-hanger';
import { useSelector } from 'react-redux';
import NavigateNext from '@material-ui/icons/NavigateNext';
import PotentialLead from 'Features/PotentialLead/PotentialLead';
import LeadPartner from './LeadPartner';
import SvgFile from 'lib/components/SvgFile';
import { agentValidationSchema } from 'Features/PotentialLead/Schema';
import { Formik, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Trans } from '@lingui/react';
import Utils from 'Factory/Utils';
import {
  TecnotreeAgentManagement,
  TecnotreedigitalSales,
  TTDamFormURL
} from 'Http/axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  tab: {
    font: 'normal normal medium 18px/21px Roboto',
    letterSpacing: '0px',
    // color: ' #57606F',
    opacity: '1',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '16px',
    minWidth: 130,
    width: 100,
    textTransform: 'capitalize',
  },
  tabsroot: {
    '& .Mui-selected': {
      color: theme.palette.primary.black
    }
  },
  Paper: {
    height: '40rem'
  },
  selectroot: {
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.black,
      '&:hover': {
        color: theme.palette.primary.contrastText
      }
    },

    padding: 0,
    maxHeight: '200px',
    '& ul': {
      backgroundColor: theme.palette.primary.black
    },
    '& li': {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.black
      },
      '& MuiTypography-root': {
        color: 'white'
      }
    },

    '& .MuiPaper-root': {
      padding: 0
    }
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

const AgentManagement = ({
  runLeadVerification,
  Duplicatechecklead,
  myTaskListLoading,
  user,
  opco,
  validateAgent,
  agentValidateError,
  masterDataLoad,
  masterdata,
  createAgentId,
  agentId,
  Masterdata
}) => {

  // console.log("props from agent form", props)

  const dispatch = useDispatch()
  const [value, setValue] = useState(0);
  const [agentAllCat, setAgentAllCat] = useState([]);
  const [agentAllSubCat, setAllAgentSubCat] = useState([]);
  const [agentID, setAgentId] = useState();
  const [loading, setLoading] = useState(null);
  const [formType, setFormType] = useState({})

  const loader = useRef(false);
  const classes = useStyles();
  const runverification = useStateful({});
  const theme = useTheme();
  const history = useHistory();
  const { ThemeType } = useSelector((state) => state.Appearance);
  const handleReset = () => {
    setValue(0);
  };
  const handleChangeformik = (name, e) => {
    runverification.setValue({
      ...runverification.value,
      [name]: e.target.value
    });
  };
  const handleGenerateID = (values) => {
    TecnotreeAgentManagement.post('/partnership/generateId')
      .then((res) => {
        setAgentId(res?.data?.id);
        handleGenerateScore(res?.data?.id, values);
      })
      .catch((err) => { });
  };

  const handleDuplicateCheck = async (values) => {

    try {
      let payload = {
        mobileNumber: values.agentMSISDN,
        email: values.email,
        firstName: values.agentName,
        agentLastName: values.agentLastName,
        nationalIdNumber: values.NID_passport_refugee_Id

      }
      console.log(values, "anotherthanxxxx")
      const data = await TecnotreedigitalSales.post('/resellerMini/duplicateCheck', payload)
      if (data) {
        setLoading(false)
        console.log(payload, "payeee")
        dispatch(
          Modals.open({
            id: 'OtpVerification',
            context: {
              email: values.email,
              phoneNumber: values.agentMSISDN,
              fields: [],
              formStep: values,
              agent: true,
              formType

            }
          })
        );
        // handleGenerateID(values); 
      }
      console.log("data value", data)


    }
    catch (error) {
      console.log(error, "errrrrrxx")
    }

  };

  const handleGenerateLeadID = () => {
    TecnotreedigitalSales.get('/partnerreidgenarate/LEAD')
      .then((res) => {
        setAgentId(res.data?.partnerRegId)

      })
      .catch((err) => { });
  };

  const handleGenerateScore = async (Id, values) => {
    try {
      const { data } = await TTDamFormURL.post(
        `creditscores/generateCreditScore?uniqueId=${Id}&ratId=RJJ5XZKYJ200&eventName=CustomerInfoCreditScoreCreationNotification`,
        {
          partnerType: values.agentCategory,
          subPartnerType: values.agentSubCategory
        }
      );
      handleRiskData(data?.currentScore, values);
    } catch (error) {
      return error
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRiskData = async (score, values) => {
    setLoading(false);
    try {
      const { data } = await TecnotreedigitalSales.get(
        `masterdata/partnerRiskCategoryData?code=${score}`
      );
      setLoading(true);
      sendData(values, data[0]?.riskCategoryData);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  const sendData = (values, riskCategory) => {
    const payload = {
      firstName: values?.agentName,
      lastName: values?.agentLastName,
      // "middleName": data.middleName,
      // "givenName": "Vishwas",
      email: values?.email,
      agentPublicIdentier: values?.agentMSISDN,
      category: values?.agentCategory,
      subCategory: values?.agentSubCategory,

      '@type':
        values.agentSub === 'EVDS'
          ? 'E'
          : values.agentSub === 'RICA'
            ? 'R'
            : values.agentSub === 'Ambassador'
              ? 'A'
              : '',
      nationalId: values?.NID_passport_refugee_Id
    };
    // history.push({
    //    pathname:`${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`
    // })

    // window.open(`${config.dev.server?.dclm_base_url}${config.dev.server.AgentPath}`, '_blank').focus();
    let formName;
    // if (
    //   values?.agentSubCategory === 'EVDS' ||
    //   values?.agentSubCategory === 'RICA'
    // ) {
    //   formName = 'OnboardingUI';
    // } else if (values?.agentSubCategory === 'Ambassador') {
    //   formName = 'Ambassador_Onboard';
    // }

 
      const validation = validateAgent({
        payload,
        formIdentity: "Reseller_Onboard",
        stepId: "ResellerProfileCreation",
        agentId: agentId?.id,
        formFields: values,
        riskCategory
      });
    
   
    handleReset();
  };
  const submitAgentForm = (values) => {
    setLoading(true);
    console.log("loading before", loading)


    handleDuplicateCheck(values)

    console.log('loading after', loading)


    //  if (res?.data?.inValidMsisdn) {
    //    dispatch(
    //      Alert.open({
    //        type: 'error',
    //        message: 'Invalid Msisdn'
    //      })
    //    );

    //    // window.location.replace(
    //    //   `${config.dev.server.dclm_base_url}/dprm-agent-web-ui/`
    //    // );
    //  } else {
    //    history.push({
    //      pathname: '/digital-prm-web-ui/agentForms',
    //      state: {
    //        formIdentity: formIdentity,
    //        // fields: fields,
    //        stepId: stepId,
    //        agentId: agentId,
    //        agentForm: true,
    //        formFields: formFields
    //        // isFields: true
    //      }
    //    });
    //  }
    // if (agentValidateError) {
    //   console.log('REDIRECT NOWWW');
    // }
    // history.push({
    //   pathname: '/digital-prm-web-ui/agentForms',
    //   state: {
    //     formIdentity: 'Partner_Profile',
    //     // fields: fields,
    //     stepId: 'PartnerProfileCreation'
    //     // isFields: true
    //   }
    // });
  };


  React.useEffect(() => {

    handleGenerateLeadID()
    // masterDataLoad();
  }, []);
  React.useEffect(() => {
    if (masterdata && masterdata?.masterData) {
      setAgentAllCat(masterdata?.masterData?.agentCategory);
    }
  }, [masterdata]);

  React.useEffect(() => {
    console.log('loading updated', loading)
  }, [loading])

  // React.useEffect(() => {
  //   createAgentId();
  // }, []);
  // const [PartnerTabs, setPartnerTabs] = React.useState([]);
  // React.useState(() => {
  //   if (_.includes(statuses.OpcoStatus.Opco, props.opco)) {
  //     console.log();
  //     setPartnerTabs();
  //   }
  // }, []);
  return (
    <Paper elevation={0} className={classes.Paper} style={{ height: '100%' }}>
      <Grid container direction="column" spacing={8} justify="center">
        <Grid item>
          <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item>
              {ThemeType === 'dark' ? (
                <SvgFile iconName="PotentialInfo-lite" iconWidth={30} />
              ) : (
                <SvgFile iconName="PotentialInfo" iconWidth={30} />
              )}
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {Utils.Opcochanges() ? (
                  <Trans id="Potential Partner / Agent Info "></Trans>
                ) : (
                  <Trans id="Potential Parnter"></Trans>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        className={classes.tabsroot}
        aria-label="disabled tabs example"
      >
        <Tab label={<Trans id="Partner"></Trans>} className={classes.tab} />
        {Utils.opcoEnable('AgentCreation') && (
          <Tab label={<Trans id="Agent"></Trans>} className={classes.tab} />
        )}
        <Tab
          label={<Trans id="Lead partner"></Trans>}
          className={classes.tab}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Box>
          <PotentialLead
            runLeadVerification={runLeadVerification}
            Duplicatechecklead={Duplicatechecklead}
            // loading={leadsState.loading.PreFillData}
            Masterdata={Masterdata}
            user={user}
            opco={opco}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Box>
          <Formik
            initialValues={{
              agentName: '',
              agentLastName: '',
              agentMSISDN: '',
              agentCategory: '',
              agentSubCategory: '',
              email: '',
              NID_passport_refugee_Id: ''
            }}
            validationSchema={agentValidationSchema}
            onSubmit={(values) => {
              submitAgentForm(values);
            }}
          >
            {({ isSubmitting, data, setFieldValue, handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={8} justify="center">
                  <Grid item>
                    <Field
                      required
                      fullWidth
                      name="agentName"
                      label={<Trans id="AGENT NAME"></Trans>}
                      variant="standard"
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setFieldValue('agentName', e.target.value);
                        handleChangeformik('agentName', e);
                      }}
                      component={TextField}
                    // disabled={isDisabled}
                    />
                  </Grid>

                  <Grid item>
                    <Field
                      required
                      fullWidth
                      name="agentLastName"
                      label={<Trans id="AGENT LASTNAME"></Trans>}
                      variant="standard"
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setFieldValue('agentLastName', e.target.value);
                        handleChangeformik('agentLastName', e);
                      }}
                      component={TextField}
                    // disabled={isDisabled}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      required
                      fullWidth
                      name="agentMSISDN"
                      label={<Trans id="AGENT MOBILE NUMBER"></Trans>}
                      variant="standard"
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setFieldValue('agentMSISDN', e.target.value);
                        handleChangeformik('agentMSISDN', e);
                      }}
                      component={TextField}
                    // disabled={isDisabled}
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
                    // disabled={isDisabled}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl
                      // required
                      fullWidth
                    >
                      <InputLabel id="">
                        <Trans id="AGENT CATEGORY"></Trans>
                      </InputLabel>
                      <Select
                        className={classes.selectroot}
                        labelId=""
                        id=""
                        defaultValue=""
                        name="agentCategory"
                        style={{ width: '100%' }}
                        // value={values.reason}
                        // onChange={handleChange}
                        onChange={(e, i) => {
                          console.log(e.target.value, "letnoo", i)
                          setFieldValue('agentCategory', masterdata.masterData.agentCategory[e.target.value]?.code);
                          setAllAgentSubCat(
                            masterdata.masterData.agentCategory[e.target.value]
                              .agentSubCategory
                          );

                        }}
                      // onClick={(event) => handleCurrency(event)}
                      >
                        {/* <MenuItem value={10}>10</MenuItem> */}
                        {agentAllCat &&
                          agentAllCat.map((optn, index) => {
                            return (
                              <MenuItem value={index}>{optn.name}</MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl
                      // required
                      fullWidth
                    >
                      <InputLabel id="">
                        <Trans id="AGENT SUBCATEGORY"></Trans>
                      </InputLabel>
                      <Select
                        labelId=""
                        id=""
                        defaultValue=""
                        name="agentSubCategory"
                        style={{ width: '100%' }}
                        // value={values.reason}
                        // onChange={handleChange}
                        onChange={(e) => {
                          setFieldValue('agentSubCategory',agentAllSubCat[e.target.value].code)
                          setFormType({...formType, formIdentity: agentAllSubCat[e.target.value].formIdentity, stepIdentity: agentAllSubCat[e.target.value].stepIdentity, level: agentAllSubCat[e.target.value].level})
                        }
                         

                        }
                      // onClick={(event) => handleCurrency(event)}
                      >
                        {/* <MenuItem value={1}>1</MenuItem> */}
                        {agentAllSubCat &&
                          agentAllSubCat.map((optn, index) => {
                            return (
                              <MenuItem value={index}>{optn.name}</MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
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
                        <Button
                          variant="text"
                          color="secondary"
                          type={'reset'}
                          onClick={handleReset}
                        // disabled={isDisabled}
                        className={classes.btnClr}
                        >
                          <Trans id="Clear"></Trans>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          endIcon={<NavigateNext />}
                        // disabled={isDisabled}
                        >
                          {loading ? (
                            <CircularProgress size={25} style={{ color: 'green' }} />
                          )
                            : <Trans id="Proceed"></Trans>

                          }
                          {/* {props.loading ? 'Proceeding...' : 'Proceed'} */}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <LeadPartner
          runLeadVerification={runLeadVerification}
          Duplicatechecklead={Duplicatechecklead}
          // loading={leadsState.loading.PreFillData}
          Masterdata={Masterdata}
          user={user}
          opco={opco}
          agentId={agentID}
        />
      </TabPanel>
    </Paper>
  );
};


export default AgentManagement;
