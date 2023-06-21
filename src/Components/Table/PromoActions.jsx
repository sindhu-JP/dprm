import React from 'react';
import { makeStyles } from '@material-ui/core';
import { TecnotreedigitalSales } from 'Http/axios';
import {Button} from '@material-ui/core';
import { LoadingSpin } from 'Features/Forms/LoadingSpin';
import { useDispatch } from 'react-redux';
import Alert from 'Store/Alert';
const  Promote = ({data}) => {

    const dispatch = useDispatch()
    console.log(data, "xxxxxxx")

   
  const onSubmitPromo = async (values) => {    
    LoadingSpin(true)
    

    TecnotreedigitalSales.get(`troubleTicket/${data.data.columns.taskId}`).then((resp)=> {
        console.log(resp?.data[0]?.workFlowRef[0]?.taskInfoId, "heyxxxxxx")

        

        TecnotreedigitalSales.get(`RBAC/get_executionResponse/${resp?.data[0]?.workFlowRef[0]?.taskInfoId}`).then((resp)=> {
           resp.data.Values.acceptanceStatus = "Approve"

            const payload = {
                
                ...resp.data,
                async: false,
                acceptanceStatus: "Approve"
            }
            console.log(payload, "playloaders")
            console.log(resp?.data?.Values, "data")
                            TecnotreedigitalSales.post(
                    'bpmn/executeProcess', payload)
                        .then((resp) => {
                    console.log(resp, "responseccccc")
                    LoadingSpin(false)
                    dispatch(
                        Alert.open({
                          type: 'success',
                          message: 'Product Launch Successfully!'
                        })
                      );
                })
                .catch((error) => {
                    // setIsSubmiting(false);
                    dispatch(
                        Alert.open({
                          type: 'error',
                          message: 'Error Launching Product!'
                        })
                      );
                });
                    })
    })





    
    // if (data?.description === '' || data?.suspensionReasons === '') {
    //   setIsSubmiting(false);
    //   return;
    // }
    // if (!dataVerified()) {
    //
    //   return;
    // }
  
//     const userData = JSON.parse(localStorage.getItem('USER'));
//     const Loginuser = JSON.parse(localStorage.getItem('loginUser'));

//     let userRole = localStorage.getItem('roleId');
//     let Ebody = {};
//     let accessToken;
//     Ebody['workflowId'] = masterdata[0]?.masterData?.workflowIds?.productPromotion;
//     Ebody['userId'] = userData?.username;
//     Ebody['userRole'] = userData?.roleName;
//     Ebody['executionModeStatus'] = false;
//     Ebody['async'] = false;
//     Ebody['Values'] = { ...Values, ...Workflowpayload.returnWorkflowData()};
   
//     Ebody['Values']['date'] = new Date();
//     Ebody['Values']['userName'] = userData?.sub;
//     Ebody['Values']['userId'] = Loginuser?.id;
//     Ebody['Values']['subStatus'] = 'draft';
//     Ebody['Values']['channel'] = 'DPRM';
//     Ebody['Values']['acceptanceStatus'] = 'open';

//     Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');

//     TecnotreedigitalSales.post(
//         '/dtt/dprm/executeprocess', Ebody)
//       .then((resp) => {
//         console.log(resp, "responseccccc")
//         LoadingSpin(false)
//         history.push({
//           pathname: '/digital-selfcare-web-ui/SuccessPromotion',
//           state: {
// details: resp.data,
//           }
          
          
//         });
//       })
//       .catch((error) => {
//         // setIsSubmiting(false);
//         // setErrorName(true);
//         // setErrorMessageName('Rule Name already exist');
//       });

//     setIsBtnDisable(true);
  };

  const classes = useStyles();

  return (
    <Button
    style={{
      borderRadius: "25px",
      padding: ".2rem 1.2rem",
      background: "#ffba00",
      borderColor: "#ffba00",
    }}
    variant="outlined"
    size="medium"
    onClick={onSubmitPromo}
  >
    Launch
  </Button>

  )
}

const useStyles = makeStyles((theme) => ({

  container: {
    backgroundColor: 'lightblue',
    color: 'blue',
    fontWeight: 'bold'
  },
}))

export default  Promote