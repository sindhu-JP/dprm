import React, { useState } from 'react';
import {
  Box,
  Button,
  makeStyles,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { TecnotreedigitalSales } from '../../Http/axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Model from 'Store/Modals';
import Alert from 'Store/Alert';
import workflowPayload from 'Factory/Worlflowpayload';
import { history } from 'Store';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  text: {
    fontWeight: 'bold'
    // color: '#ffffff'
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
    // marginBottom: '40px'
    marginTop: '40vh'
  },
  topItem: {
    margin: '1.5rem 8.5rem',
    padding: '35px'
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
  cancelBtn: {
    fontSize: '12px'
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
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
  space: {
    padding: '20px'
  }
}));

const ReOpenAccount = (props) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    startDate: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    endDate: '',
    closingReason: '',
    description: '',

    ...workflowPayload.returnWorkflowData()
    //   location?.state?.partnerDetails?.PartnerDetails?.Partner_ID ||
    //     location?.state?.partnerDetails?.TenantDetails?.TENANT_ID,
    //   location?.state?.partnerDetails?.PrimaryContactDetails?.EMAIL_ID,
    //   location?.state?.partnerDetails?.PrimaryContactDetails?.MOBILE_NUMBER,
    //   location?.state?.partnerDetails?.PartnerDetails?.PARTNER_NAME ||
    //     location?.state?.partnerDetails?.TenantDetails?.TENANT_NAME,
    //   location?.state?.partnerDetails?.PrimaryContactDetails
    //     ?.PRIMARY_CONTACT_NAME,
    //   ''
  });
  const redirectToLogin = async () => {
    setIsLoading(false);
    dispatch(
      Alert.open(
        {
          type: 'success',
          message: 'Partner Account Re-Activated Successfully!'
        },
        1000
      )
    );
    if (props.isThree60) {
      history.push('/');
    } else {
      props.getPotentialPartners({ limit: 10, offset: 0 });
    }
    // history.push({
    //     pathname: '/digital-dprm-web-ui/'
    //   });
  };
  const handleYes = async () => {
  
    let apiObj = {
      ...workflowPayload.returnWorkflowData(),
      startDate: data.startDate,
      endDate: data.endDate,
      closingReason: data.closingReason,
      closeType: 'open',
      description: data.description,
      partnerId:
        props.context?.PartnerDetails?.Partner_ID || props.context?.partnerId,
      partnerName:
        props.context?.PartnerDetails?.PARTNER_NAME ||
        props.context?.partnerName,
      partnerType: 'master',
      userName: 'dprmAdminUser',
      partnerPrimaryContactName:
        props.context?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME ||
        props?.context?.primarycontactName,
      partnerPrimaryContactEmail:
        props.context?.PrimaryContactDetails?.EMAIL_ID || props?.context?.email,
      partnerPrimaryContactMobile:
        props.context?.PrimaryContactDetails?.MOBILE_NUMBER ||
        props?.context?.mobileNo

      //   username: props.authState.userData.username,
      //   partnerType: props.authState.userData.partnerType
      // partnerType
    };
    
    
    const reOpenAccountWorkflowId =
      props.masterData.masterData?.workflowIds?.closeAccount;
    setIsLoading(true);
    TecnotreedigitalSales.post(
      '/bpmn/executeProcess',
      workflowPayload.closeAccountPayload(reOpenAccountWorkflowId, apiObj)
    )
      .then((res) => {
        if (res.data?.apiResponse.status === '200 OK') {
          redirectToLogin();
          dispatch(Model.close('onReOpenAccountHandle'));
        }
      })
      .catch((err) =>  err );

    // await dispatch(auth.reset());
    // await Storage.clear();
    // history.push({
    //   pathname: '/digital-selfcare-web-ui/'
    // });
  };
  return (
    <>
      <Box px={5} className={classes.root}>
        <Grid
          container
          direction="column"
          spacing={2}
          className={classes.inner}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h2">
              Please confirm to Re-Activate the Account!!
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={4}
          className={classes.inner}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={4}
            >
              <Grid item>
                <Button
                  //    onCancel={() => props.onCloseConfirm()}
                  onClick={(e) => props.onCancel()}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  No
                </Button>
              </Grid>
              <Grid item>
                <Button
                  //   onClick={handleRedirect}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleYes}
                >
                  {/* Yes */}
                  {isLoading ? <CircularProgress size={25} /> : 'Yes'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ReOpenAccount;
