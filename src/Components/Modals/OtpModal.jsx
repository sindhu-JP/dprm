import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import OtpInput from 'react-otp-input';
import CommonButton from 'lib/components/Button/CommonButtons';
import WorkFlowApi from 'Http/api/WorkflowApi';
import PayloadParser from 'Factory/PayloadConfig';
import { useStateful } from 'react-hanger';
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import transformFactory from 'Factory/CommissionFactory';
import DashboardController from 'Controllers/Dashboard';
import { connect} from 'react-redux';
const  OtpDialog = ({context,
    user,
    onCancel,
    onSubmit,
    modalId,
    title,
    type,
    duration,
    loading,
    parent,
    error,
    modalContext,
    open,
    setOpen,
    VerifyOtp}) => {
    const classes = useStyles();
    const description = useStateful('');
    const [Otp, setOtp] = React.useState('');
    const [loader, setloading] = React.useState(false);
   console.log(context,open, "yepaaaaa")
   const handleClose = () => {
    setOpen(false);
  };
    const otpDetails = useStateful({});
  
    const errorValue = useStateful({});
    const handleSubmit = async() => {
      
      console.log(Otp, "ddddddd", otpDetails)
      try {
        if (Otp) {
          const payload = {
            id: otpDetails.value?.id,
            otp: parseInt(Otp),
            data: {
              step: 'initial'
            }
          }; 
         
          console.log(payload, "ppp")
          VerifyOtp({
            payload: payload,
            context: context,
            fields: context?.fields || {}
          });
         
        setOpen(false)
         
        }
      }

      catch(error) {
        console.log(error)
      }
     
   
      // setOtp('');
      // onCancel();
    };
  
    React.useEffect(() => {
      if (!_.isEmpty(context)) {
        GenarateOtp();
      }
    }, [context]);
  
    const GenarateOtp = async () => {
     
      try {
        setloading(true);
        const res = await WorkFlowApi.ExcuteWorkflow(
          PayloadParser.genarateOtp(
            context?.partnerFulldetails?.PartnerProfileCreation
              ?.PrimaryContactDetails || context
          )
        );
           
        if (res?.apiResponse?.status === '200 OK') {
          setloading(false);
          otpDetails.setValue(JSON.parse(res?.workflowResponses['Generate OTP']));
        } else {
          setloading(false);
    
          errorValue.setValue('Pleae Try again');
        }
      }
    catch(error) {
  
      console.log(error, "erroror")
    }
    };
  

  return (
    <div>
    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      
        <DialogContent>
        <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={8}
        
      >
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography variant="h2" style={{ fontWeight: 'bold' }}>
                {/* {context?.id} */}
                Unique Code Validation
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Typography variant="h3">
                {' '}
                Please enter The unique code to verify Your account
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" style={{ color: 'green' }}>
                {' '}
                A unique code has been sent to{' '}
                {transformFactory.transformEntry(
                  context?.partnerFulldetails?.PartnerProfileCreation
                    ?.PrimaryContactDetails?.MOBILE_NUMBER ||
                    context?.phoneNumber,
                  'phone'
                )}{' '}
                &{' '}
                {transformFactory.transformEntry(
                  context?.partnerFulldetails?.PartnerProfileCreation
                    ?.PrimaryContactDetails?.EMAIL_ID || context?.email,
                  'email'
                )}{' '}
              </Typography>
            </Grid>
            {_.isEmpty(errorValue.value) && !loader ? (
              <Grid item>
                <OtpInput
                  // value={this.state.otp}
                  onChange={(otp) => setOtp(otp)}
                  className={classes.otpPaper} // border: '2px solid rgba(0,0,0,0.3)',
                  value={Otp}
                  isInputNum={true}
                  numInputs={6}
                  // isInputNum={true}
                  hasErrored={false}
                  separator={<span>-</span>}
                />
              </Grid>
            ) : (
              <Grid item>
                <CircularProgress size={50} style={{ color: 'blue' }} />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <Box py={3}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              spacing={4}
            >
              <Grid item>
                <CommonButton
                  disable={loading}
                  variant="text"
                  text={'Cancel'}
                  handleSubmit={onCancel}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disable={loader}
                  // loading={false}
                  handleSubmit={handleSubmit}
                  loading={loader}
                  text={"Verify"}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
       
        </DialogContent>
       
      </Dialog>
    </div>
  );
}


export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master,
    alertState: state.alert,
    hierarchy: state.hierarchy,
    authstate: state.auth,
    dashboardData: state.dashboardData,
    contractState: state.contracts,
    Masterdata: state.master?.masterData,
    Appearance: state.Appearance
  }),
  {

    VerifyOtp: DashboardController.VerifyOtpDashboard,

    
  }
)(OtpDialog);


const useStyles = makeStyles((theme) => ({
    root: {
      
 
      width: '300px',
      height: "261px"
  
    },
  
    error: {
      color: theme.palette.error.main
    },
    otpPaper: {
      width: '2.5rem',
      height: '3rem',
      margin: '5px ',
      fontSize: '2rem',
      color: theme.palette.common.gray,
      borderRadius: 4
    },
  
    inner: {
      width: '33rem',
      padding: theme.spacing(6),
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(4)
    },
  
    subtitle: {
      fontWeight: theme.typography.fontWeightMedium
    },
  
    textarea: {
      width: '100%',
      minWidth: '100%',
      maxWidth: theme.spacing(92),
      maxHeight: theme.spacing(104),
      border: `none`,
      color: theme.palette.text.primary,
      fontFamily: 'inherit'
    },
  
    mtop50: {
      marginTop: '50px'
    },
  
    submitBtn: {
      background: '#2626C0',
      width: '93px',
      color: 'white',
      borderRadius: '8px',
      fontSize: '16px',
      '&:hover': {
        background: '#2626C0'
      }
    },
  
    titleColor: {
      color: '#CECECE'
    }
  }));