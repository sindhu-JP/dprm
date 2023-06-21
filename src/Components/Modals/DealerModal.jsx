import React, {useState} from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch } from 'react-redux';


import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import Modals from 'Store/Modals';
import {
    TecnotreedigitalSales,

  } from 'Http/axios';
import {
  Grid,
  Box,
  Button,

  CircularProgress,
  makeStyles
} from '@material-ui/core';
import masterdata from 'Http/api/masterdata';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { agentValidationSchema } from 'Features/PotentialLead/Schema';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Trans } from '@lingui/react';
import { useStateful } from 'react-hanger';
// import { history } from 'Store';
import { withStyles } from '@material-ui/core/styles';
import OtpDialog from './OtpModal';
import "./dealer.css"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
    
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
    }
  }));


  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon style={{fontSize: "20px"}}/>
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

export default function DealerDialog({open, setOpen, nodeId, dealerType, agentID, getHierarchy}) {
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setValue(0);
    setOpen(false)

  };
  const [agentAllCat, setAgentAllCat] = useState([]);
  const [agentAllSubCat, setAllAgentSubCat] = useState([]);
  
  const [loading, setLoading] = useState(null);
  const [formType, setFormType] = useState({})
  const [agentCategory, setAgentCategory] = useState([])
  const [value, setValue] = useState(0);
  const [openDealer, setOpenDealer] =  useState(false)
  const [context, setContext] = useState({})
  const runverification = useStateful({});

  const handleChangeformik = (name, e) => {
    runverification.setValue({
      ...runverification.value,
      [name]: e.target.value
    });
  };
  const handleMasterData = async()=> {
    const masterData = await masterdata.DprmMasterdata()

    console.log(masterData, "quickdosu")
   
        setAgentCategory(masterData[0])
        setAgentAllCat(masterData[0]?.masterData?.agentCategory);
      
  }

  console.log(agentCategory, "lyzzzz")

  React.useEffect(() => {
    handleMasterData()
  }, []);

  const handleDuplicateCheck = async (values) => {

    try {
      let payload = {
        mobileNumber: values.agentMSISDN,
        email: values.email,
        firstName: values.agentName,
        agentLastName: values.agentLastName,
        nationalIdNumber: values.NID_passport_refugee_Id

      }
      setContext({
        email: values.email,
        phoneNumber: values.agentMSISDN,
        fields: [],
        formStep: values,
        agent: true,
        formType,
        nodeId,
        agentID,
        dealerType,
        getHierarchy

      })
      console.log(values, "anotherthanxxxx")
      const data = await TecnotreedigitalSales.post('/resellerMini/duplicateCheck', payload)
      if (data) {
        
        setLoading(false)
        console.log(payload, "payeee")
        setOpen(false)
        setOpenDealer(true)
        
        // dispatch(

        //   Modals.open({
        //     id: 'OtpVerification',
        //     context: {
        //       email: values.email,
        //       phoneNumber: values.agentMSISDN,
        //       fields: [],
        //       formStep: values,
        //       agent: true,
        //       formType,
        //       nodeId,
        //       dealerType
        //     }
        //   })
        // );
        // handleGenerateID(values); 
      }
      console.log("data value", data)


    }
    catch (error) {
      console.log(error, "errrrrrxx")
    }

  };


  const classes = useStyles();
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

  return (
    <div>
  
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      
      <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{width: "400px"}}>
      <h4  style={{fontSize: "20px"}}> {dealerType === "subDealerEmployee" ? "Add Sub Dealer Employee" : "Add Sub Dealer"}</h4>
      </DialogTitle>
      
        <DialogContent dividers>
       
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
            {({ isSubmitting, data, setFieldValue, handleSubmit, values, resetForm }) => (
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
                          onClick={resetForm}
                          style={{border: "1px solid #ffcb05", borderRadius: "5rem"}}
                          
                        // disabled={isDisabled}
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
        </DialogContent>
        
      </Dialog>

      <OtpDialog context={context} open={openDealer} setOpen={setOpenDealer} loading={loading}/>
    </div>
  );
}
