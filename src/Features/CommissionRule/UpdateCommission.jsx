import NavbarSettlement from 'Features/SettlementRule/NavbarSettlement';
import StepperCommission from 'Features/CommissionRule/StepperCommission';
import React, { useState } from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { TecnotreedigitalSales } from '../../Http/axios';
import { Modal } from 'lib/components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import dashboardApi from 'Http/api/dashboard';
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import Factory from 'Factory/CommissionFactory';
import CommissionRuleDetail from 'Features/TaskDetails/CommissionRuleDetails/CommissionRuleDetail';
import CommissionModal from 'Components/Modals/CommissionModal';
import { connect } from 'react-redux';
import update from 'update-immutable';
import Modals from 'Store/Modals';
import { CircularProgress } from '@material-ui/core';
import workflowPayload from 'Factory/Worlflowpayload';

const UpdateCommission = (props) => {
  const [CommissionCode, setCommissionCode] = CustomHooks.CustomUseState('');
  const commissiondetails = CustomHooks.custUsestatefull([]);
  const [updateResponse, setUpdateResponse] = useState('');
  const distpatch = CustomHooks.customUseDispatch();
  const isLoading = CustomHooks.CustomUseBoolean(false);
  const classes = useStyles();
  const commissionObj = CustomHooks.custUsestatefull([]);
  const { details } = props.location.state.details;

  const onchangeCode = async (e, value) => {
    if (e?.target?.value.length >= 2) {
      let data = await dashboardApi.CommissionRulesCode(e.target.value);
      commissiondetails.setValue(_.uniqWith(data, _.isEqual));
    }
  };
  // async function getDataFromApi(){
  //   let data = await dashboardApi.CommissionRulesCode("");
  //   return _.uniqWith(data, _.isEqual);
  // }
  const getCommissiondetails = async (code) => {
    let data = await dashboardApi.CommissionRulesCode(code);

    commissionObj.setValue(data);
  };
  React.useEffect(() => {
    if (
      details?.PartnerProfileCreation?.CommissionRulesDetails
        ?.Commission_Rule ||
      details?.TenantProfileCreation?.CommissionRulesDetails?.Commission_Rule
    ) {
      getCommissiondetails(
        details?.PartnerProfileCreation?.CommissionRulesDetails
          ?.Commission_Rule ||
          details?.TenantProfileCreation?.CommissionRulesDetails
            ?.Commission_Rule
      );
    }
  }, [details]);

  const handleSelect = (e) => {
    setCommissionCode(e.target.value);
    commissionObj.setValue(
      _.filter(commissiondetails.value, ['commissionRuleCode', e.target.value])
    );
  };

  const OnsubmitCommission = (e) => {
    const localUserName = JSON.parse(localStorage.getItem('user'));
    isLoading.setTrue();
    TecnotreedigitalSales.post(
      '/bpmn/executeProcess',

      update(
        {},
        {
          $merge: {
            workflowId: 1633608900945,
            userId: localStorage.getItem('signinId'),
            userRole: localStorage.getItem('roleId'),

            executionModeStatus: false,
            async: false,
            Values: {
              //   $merge: {
              Partner_ID: props.location.state.details?.mainlist.partnerId,
              Commission_Rule: CommissionCode,
              accessToken: localStorage.getItem('ACCESS_TOKEN'),
              PARTNER_NAME: props.location.state.details?.mainlist.partnerName,
              merchantId: props.location.state.details?.mainlist.partnerId,
              ...workflowPayload.returnWorkflowData(
                props.location.state.details?.mainlist.partnerId,
                props.location.state.details?.mainlist.email,
                props.location.state.details?.mainlist.mobileNo,
                props.location.state.details?.mainlist.partnerName,
                props.location.state.details?.mainlist.primarycontactName,
                ''
              )
              //optionalId: props.location.state.details.partnerId
              //   }
            }
          }
        }
      )
    )
      .then((resp) => {
        isLoading.setFalse();
        // history.push({
        //   pathname: '/digital-selfcare-web-ui/commissionapproval',
        //   details: resp.data
        // });
        setUpdateResponse(resp.data);
        if (resp.status === 200) {
          distpatch(
            Modals.open({
              id: 'CommissionModal'
            })
          );
        }
      })
      .catch((error) => {
        isLoading.setFalse();
      });
  };
  return (
    <div>
      <NavbarSettlement />
      <StepperCommission />
      <Box px={6} py={7} className={classes.homeContainer}>
        <Paper elevation={1}>
          <Box p={3}>
            <Box mb={4}>
              <Grid container spacing={6}>
                <Grid item>
                  <Typography variant="h2" className={classes.title}>
                    Commission Rule Details
                  </Typography>
                </Grid>
                {/* {sectionIsValid.value && ( */}
                <Grid item>
                  <IconButton size="small" className={classes.icon}>
                    {/* <Check />  */}
                  </IconButton>
                </Grid>
                {/* )} */}
              </Grid>
            </Box>

            <Grid container spacing={6}>
              <Grid item xs={4}>
                {/* <div style={{ width: 500 }}>
                  <Autocomplete
                    //   multiple
                    // options={
                    // commissiondetails?.value?.length >0 ?  Factory.makeCommissionData(commissiondetails.value):Factory.makeCommissionData(getDataFromApi()) || []
                    // }
                    options={
                      Factory.makeCommissionData(commissiondetails.value) || []
                    }
                    defaultValue={{
                      title:
                        props.location.state.details?.details
                          ?.PartnerProfileCreation?.CommissionRulesDetails
                          ?.Commission_Rule ||
                        props.location.state.details?.details
                          ?.TenantProfileCreation?.CommissionRulesDetails
                          ?.Commission_Rule
                    }}
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
                </div> */}

                <Autocomplete
                  id="combo-box-demo"
                  options={Factory.makeCommissionData(commissiondetails.value)}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  onInputChange={(e) => onchangeCode(e)}
                  onSelect={(e) => handleSelect(e)}
                  defaultValue={{
                    title:
                      props.location.state.details?.details
                        ?.PartnerProfileCreation?.CommissionRulesDetails
                        ?.Commission_Rule ||
                      props.location.state.details?.details
                        ?.TenantProfileCreation?.CommissionRulesDetails
                        ?.Commission_Rule
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Combo box"
                      placeholder=" Search Commission Rule code"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>

            {commissionObj.value.length > 0 ? (
              <Box>
                <CommissionRuleDetail
                  commissionRuleDetails={commissionObj.value}
                  maintitle={'Commission Details'}
                />

                <Box py={4}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    //   style={{ paddingTop: '12px' }}
                    spacing={4}
                  >
                    <Grid item>
                      {/* <Button
                        variant="outlined"
                        color="primary"
                        //   onClick={(event) => onCancel(event)}
                      >
                        Cancel
                      </Button> */}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isLoading.value}
                        onClick={OnsubmitCommission}
                      >
                        {isLoading.value ? 'Submitting...' : 'Submit'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ) : (
              <>
                {isLoading.value && (
                  <Grid container direction="row" justifyContent="center">
                    <Grid item>
                      <CircularProgress color="primary" size={50} />
                    </Grid>
                  </Grid>
                )}{' '}
                {'Please Select the Commission Rule code, Ex: COM'}
              </>
            )}
          </Box>
        </Paper>

        {props.modalState.CommissionModal && (
          <Modal id="CommissionModal">
            {({ context, modalId, close }) => (
              <CommissionModal
                modalId={'CommissionModal'}
                resData={updateResponse}
                //   user={props.authstate?.user}
                //   onSubmit={props.VerifyOTP}
                //   partnerid={props.match.params.id}
                //   onCancel={() => props.closeModal('CommissionModal')}
                //   loading={props.DashboardDetails.loading.Deactive}
              />
            )}
          </Modal>
        )}
      </Box>
    </div>
  );
};

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
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(30)})`,
    overflow: 'auto',
    height: '75vh'
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals
  }),
  {}
)(UpdateCommission);
