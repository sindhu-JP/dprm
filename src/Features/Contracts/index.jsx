import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';

import {
  Grid,
  Badge,
  makeStyles,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from '@material-ui/core';
import { Stepper } from 'lib/components';

import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';
import ModalsStore from 'Store/Modals';
import _ from 'lodash';

import PartnerController from 'Controllers/Partner';

import { CONTRACT_TABLE } from 'lib/constants';
import { Paper } from '@material-ui/core';
import Modal from 'Store/Modals';
import CompanyInfo from './CompanyInfo';
import PartnerApi from 'Http/api/Partner';
import PartnertApi from 'Http/api/Partner';
import PartnerFactory from 'Factory/Partner';
import Dashboardcontroller from 'Controllers/Dashboard';
import Factory from 'Factory/Partner';

import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import searchSvg from 'Assets/Icons/searchSvg.svg';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import dashboardStore from 'Store/Dashboard';
import Table from 'Components/Table/RenderTable';
import AlertActions from 'Store/Alert';
import PaymentApi from 'Http/api/Payment';
import _isEmpty from 'lodash/isEmpty';
const OpportunityFooter = ({ cart, error }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center" direction="row" spacing={10} mt={6}>
        <Grid item>
          <Badge color="error"></Badge>
        </Grid>
      </Grid>
    </>
  );
};

OpportunityFooter.defaultProps = {
  cart: {
    count: 0,
    upfront: 0,
    recurring: 0
  }
};

const Contracts = ({
  open,
  lead,
  onsumbitPayment,
  onClose,
  products,
  onSubmit,
  usersState,
  masterdata,
  submitting,
  loadProducts,
  leadsState,
  submitFeasibilityCheck,
  openModal,
  modalState,
  closeModal,
  id,
  user,
  subscriptiondata,
  autocheckfeasibility,
  // check,
  submitcheck,
  Alertopen,
  Opportunitydata,
  alertState,
  NewOppLead,
  authUser,
  subscriptionmodel,
  customerID,
  changePlandata,
  Steppersdata,
  vasdetails,
  loadvas,
  loadcontract,
  partnerState,
  contractTablelist,
  lists,
  context,
  page,
  handleChangePage,
  rowsPerPage,
  formData,
  handleChangeRowsPerPage,
  historypush,
  type,
  tableLoading,
  onSearchContract,
  OnboardStatusChnage,
  PartnerContractsList,
  ...props
}) => {
  const loading = useBoolean(true);
  const mainContext = useStateful({});
  const [amount, setAmount] = React.useState();
  const contractids = useStateful([]);
  const OnboardedPartner = useStateful({});
  const loader = useBoolean(false);
  const enableSearch = useBoolean(false);
  const dispatch = useDispatch();
  const [onBoardingStatus, setOnBoardingStatus] = useState('');
  const [oneTimeCharge, setOneTimeCharge] = useState('');
  const [partnerId, setPartnerId] = useState(context?.contractrow?.details?.id);
  const MasterPartnerstatus = useStateful({});  
  let data;
  if (Array.isArray(props?.location?.contractsData)) {
    let filteredElement = props.location.contractsData.map((item) => {
      if (item) {
        return item.CONTRACT_ID;
      }
    });
    data = filteredElement;
  } else {
    data = props?.location?.contractsData;
  }
  const CurrencyDetails = useStateful([]);
  const PartnerData = useStateful({});
  const [updatedstatus, setupdatedstatus] = React.useState(true);
  const AmountDetails = useStateful({});

  const Paernerlist = useStateful({});
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  let newObj = {};
  let getId1 = {};
  let getId2 = {};

  if (!_isEmpty(mainContext)) {
    newObj = mainContext;
    getId1 =
      newObj?.value?.details?.rowlist?.AddContractFor?.ContractInformation
        ?.Partner_ID;
    getId2 = newObj?.value?.contractrow?.details?.id;
  }
  const getstatusChanges = () => {
    let isValidatePartner = false;
    if (
      newObj?.value?.details?.rowlist?.AddContractFor?.ContractInformation?.Partner_ID.startsWith(
        'TP'
      ) ||
      newObj?.value?.contractrow?.details?.partnerType === 'tenant'
    ) {
      isValidatePartner = true;
    } else if (
      newObj?.value?.details?.rowlist?.AddContractFor?.ContractInformation?.Partner_ID.startsWith(
        'MP'
      ) ||
      newObj?.value?.contractrow?.details?.partnerType === 'master'
    ) {
      isValidatePartner = true;
    }

    return isValidatePartner;
  };
  const handleRefresh = () => {
    if (context) {
      if (
        context?.contractrow?.details?.partnerType === 'master' ||
        context?.contractrow?.details?.columns?.partnerId.substring(0, 2) ===
          'MP' ||
        context?.details?.contractrow?.details?.partnerId.substring(0, 2) ===
          'MP' ||
        context?.details?.columns?.partnerId.substring(0, 2) === 'MP'
      ) { 
        type.setValue({
          typeof: 'LINKEDFORM0Z7ZA170',
          id:
            context?.contractrow?.details?.id ||
            context?.contractrow?.details?.columns?.partnerId ||
            context?.details?.contractrow?.details?.partnerId ||
            context?.details?.columns?.partnerId
        });
        PartnerContractsList({
          type: 'LINKEDFORM0Z7ZA170',
          id:
            context?.contractrow?.details?.id ||
            context?.contractrow?.details?.columns?.partnerId ||
            context?.details?.contractrow?.details?.partnerId ||
            context?.details?.columns?.partnerId,
          typeOF: 'Partner'
        });
        // loadcontract({
        //   type: 'LINKEDFORM0Z7ZA170',
        //   id:
        //     context?.contractrow?.details?.id ||
        //     context?.contractrow?.details?.columns?.partnerId,
        //   typeOF: 'Partner'
        // });
      } else if (
        context?.contractrow?.details?.partnerType === 'tenant' ||
        context?.contractrow?.details?.columns?.partnerId.substring(0, 2) ===
          'TP' ||
        context?.details?.contractrow?.details?.partnerId.substring(0, 2) ===
          'TP' ||
        context?.details?.columns?.partnerId.substring(0, 2) === 'TP'
      ) {
        type.setValue({
          typeof: 'LINKEDFORMBO3OUB14',
          id:
            context?.contractrow?.details?.id ||
            context?.contractrow?.details?.columns?.partnerId ||
            context?.details?.contractrow?.details?.partnerId ||
            context?.details?.columns?.partnerId
        });
        // loadcontract({
        //   type: 'LINKEDFORMBO3OUB14',
        //   id:
        //     context?.contractrow?.details?.id ||
        //     context?.contractrow?.details?.columns?.partnerId,
        //   typeOF: 'Tenant'
        // });
        PartnerContractsList({
          type: 'LINKEDFORMBO3OUB14',
          id:
            context?.contractrow?.details?.id ||
            context?.contractrow?.details?.columns?.partnerId ||
            context?.details?.contractrow?.details?.partnerId ||
            context?.details?.columns?.partnerId,
          typeOF: 'Tenant'
        });
      }
      if (context?.contractrow?.details?.id) {
        getPartnerdetails(context?.contractrow?.details?.id);
      }
    } 
  };

  const handleSubmit = async () => {
    if (
      PartnerData.value?.PartnerProfileCreation?.EnrolmentCharges ||
      PartnerData.value?.TenantProfileCreation?.EnrolmentCharges
    ) {
      if (getstatusChanges()) {
        if (OnboardedPartner.value) {   
          await OnboardStatusChnage({
            walletdetails: '',
            partnerID:
              mainContext.value?.contractrow?.details?.partnerId ||
              newObj?.value?.details?.rowlist?.AddContractFor
                ?.ContractInformation?.Partner_ID ||
              newObj?.value?.contractrow?.details?.partnerId,
            Partnerlist: PartnerData.value,
            enrollementCharges: false
          });

          if (onBoardingStatus === 'PENDING') {
            if (
              newObj?.value?.details?.rowlist?.AddContractFor?.ContractInformation?.Partner_ID.startsWith(
                'TP'
              ) ||
              newObj?.value?.contractrow?.details?.partnerType === 'tenant'
            ) {
              await PaymentApi.tenentOnBoardingStatus(
                newObj?.value?.details?.rowlist?.AddContractFor
                  ?.ContractInformation?.Partner_ID ||
                  newObj?.value?.contractrow?.details?.partnerId
              );
            } else {             
              await PaymentApi.onBoardingStatus(
                newObj?.value?.details?.rowlist?.AddContractFor
                  ?.ContractInformation?.Partner_ID ||
                  newObj?.value?.contractrow?.details?.partnerId
              );
            }
          }
          dispatch(
            Modal.open({
              id: 'PaymentConformation',
              context: {
                id:
                  mainContext.value?.contractrow?.details?.partnerId ||
                  newObj?.value?.details?.rowlist?.AddContractFor
                    ?.ContractInformation?.Partner_ID,
                details: PartnerData.value
              }
            })
          );
          dispatch(Modal.close('contracts'));
        } else {
          openModal({
            id: 'ContractPayments',
            context: {
              details: mainContext.value
            }
          });
        }
      } else {
        dispatch(
          AlertActions.open({
            type: 'error',
            message: `Dear Tenant Partner You are not Allowed to Onboard now!!!!!
            Once your Master Partner is Onboarded Successfully Please try again`
          })
        );
      }
    } else {
      OnboardStatusChnage({
        walletdetails: '',
        partnerID:
          mainContext.value?.contractrow?.details?.partnerId ||
          newObj?.value?.details?.rowlist?.AddContractFor?.ContractInformation
            ?.Partner_ID,
        Partnerlist: PartnerData.value,
        enrollementCharges: false
      });
      dispatch(
        Modal.open({
          id: 'PaymentConformation',
          context: {
            id:
              mainContext.value?.contractrow?.details?.partnerId ||
              newObj?.value?.details?.rowlist?.AddContractFor
                ?.ContractInformation?.Partner_ID,
            details: PartnerData.value
          }
        })
      );
      dispatch(Modal.close('contracts'));
    }
  };

  const getmastercurrency = async () => {
    const currency = await PaymentApi.getCurrency();
    CurrencyDetails.setValue(_.get(currency, '[0][currency]', '[]'));
  };

  const maketable = (data) => {
    let rows = [];
    Object.values(data).map((row) => {
      if (row?.contractlist?.AddContractFor?.status === 'Approved') {
        rows.push({
          rowlist: row.contractlist,
          columns: {
            ...row.columns
          }
        });
      }
    });

    let updateStatus = true;
    //  let temp=[]

    for (var i = 0; i < rows.length; i++) {
      //  temp.push(rows[i].columns.id)
      if (
        rows[i].rowlist.AddContractFor.ContractInformation.Contract_SignOff ===
          'yes' &&
        rows[i].rowlist.AddContractFor.ContractInformation.Contract_Accepted ===
          'yes'
      ) {
        updateStatus = false;
      } else {
        updateStatus = true;
        break;
      }
    }
    setupdatedstatus(updateStatus);

    return rows;
  };

  const handleTaskAction = async (action, data) => {
   console.log(action, 'WYNWON')
    if (action?.modalId) {
      openModal({
        id: action.modalId,
        context: {
          details: data,
          partnerDetails: PartnerData.value,
          contractrow: {
            details: data
          }
        }
      });

      if (action.modalId === 'ShareContract') {
        const payload = {
          contractId: data?.columns?.id,
          productId: '',
          partnerId: data?.columns?.partnerId
        };

        const base64 = await PartnertApi.genereatepdf(payload);

        let payloadpdf = PartnerFactory.getfromdata(base64, data.rowlist);

        formData.setValue(payloadpdf);
      }
    } else if (
      action?.actionType &&
      typeof props[action.actionType] === 'function'
    ) {
      props[action.actionType]({
        url: {
          name: data?.rowlist?.AddContractFor?.ContractInformation
            ?.Dynamic_Contract_Pdf
        }
      });
    }
  };
  React.useEffect(() => {
    if (context?.contractrow) {
      if (context?.contractrow?.details?.partnerType === 'master') {
        type.setValue({
          typeof: 'LINKEDFORM0Z7ZA170',
          id: context?.contractrow?.details?.id
        });
        PartnerContractsList({
          type: 'LINKEDFORM0Z7ZA170',
          id: context?.contractrow?.details?.id,
          typeOF: 'Partner'
        });
        // loadcontract({
        //   type: 'LINKEDFORM0Z7ZA170',
        //   id: context?.contractrow?.details?.id,
        //   typeOF: 'Partner'
        // });
      } else if (context?.contractrow?.details?.partnerType === 'tenant') {
        type.setValue({
          typeof: 'LINKEDFORMBO3OUB14',
          id: context?.contractrow?.details?.id
        });
        // loadcontract({
        //   type: 'LINKEDFORMBO3OUB14',
        //   id: context?.contractrow?.details?.id,
        //   typeOF: 'Tenant'
        // });
        PartnerContractsList({
          type: 'LINKEDFORMBO3OUB14',
          id: context?.contractrow?.details?.id,
          typeOF: 'Tenant'
        });
      }
      if (context?.contractrow?.details?.id) {
        getPartnerdetails(context?.contractrow?.details?.id);
      }
    }
  }, [context]);
  const handleTaskRowClick = (actions, data) => {
    openModal({
      id: 'Contractpreview',
      context: {
        details: data,
        mainContext: PartnerData.value
      }
    });
  };

  React.useEffect(() => {
    if (!_.isEmpty(context.contractrow)) {
      OnboardedPartner;
      mainContext.setValue(context);
    }
  }, [context]);

  const getPartnerdetails = async (id) => {
    if (id.substring(0, 2) === 'MP') {
      let Details = await PartnerApi.getPartnerDetails(id);

      OnboardedPartner.setValue(
        Factory.getPartnerOnboard(
          _.get(Details, '[0].PartnerProfileCreation.EnrolmentCharges', '')
        )
      );

      setOnBoardingStatus(
        Details[0]?.PartnerProfileCreation?.PartnerDetails?.Onboarding_Status
      );

      PartnerData.setValue(_.get(Details, '[0]', ''));
    } else if (id.substring(0, 2) === 'TP') {
      let Details = await PartnerApi.getTenantDetails(id);
      if (!Details) return;
      OnboardedPartner.setValue(
        Factory.getPartnerOnboard(
          _.get(Details, '[0].TenantProfileCreation.EnrolmentCharges', '')
        )
      );
      setOnBoardingStatus(
        Details[0]?.TenantProfileCreation?.TenantDetails?.Onboarding_Status
      );
      PartnerData.setValue(_.get(Details, '[0]', ''));
    }
  };

  const getPartnerStauts = async (id) => {
    loader.setTrue();
    let Details = await PartnerApi.getPartnerDetails(id);

    MasterPartnerstatus.setValue(
      _.get(Details, '[0].PartnerProfileCreation', '')
    );
    loader.setFalse();
  };
  React.useEffect(() => {
    if (!PartnerData.value?.PartnerProfileCreation?.EnrolmentCharges) {
      OnboardedPartner.setValue(true);
    }
    if (PartnerData.value?.TenantProfileCreation?.EnrolmentCharges) {
      if (Array.isArray(PartnerData.value)) {
        OnboardedPartner.setValue(
          Factory.getPartnerOnboard(
            _.get(
              PartnerData.value,
              '[0].TenantProfileCreation.EnrolmentCharges',
              ''
            )
          )
        );
      } else {
        if (PartnerData.value?.TenantProfileCreation?.EnrolmentCharges) {
          OnboardedPartner.setValue(
            Factory.getPartnerOnboard(
              _.get(
                PartnerData.value,
                'TenantProfileCreation.EnrolmentCharges',
                ''
              )
            )
          );
        }
      }
    }
  }, [PartnerData.value]);
  React.useEffect(() => {
    if (updatedstatus) {
      getTenentDetails();
    } else {
      getPartnerDetails();
    }
  }, [updatedstatus]);

  const getTenentDetails = async (tenentId) => {
    if (
      context?.contractrow?.details?.partnerId.substring(0, 2) === 'TP' ||
      (tenentId && tenentId?.substring(0, 2) === 'TP')
    ) {
      loader.setTrue();
      const tenentDetails = await PaymentApi.getTenent(
        context?.contractrow?.details?.partnerId || tenentId
      );
      getPartnerStauts(
        _.get(
          tenentDetails,
          '[0].TenantProfileCreation.TenantDetails.Partner_ID',
          ''
        )
      );
      setOnBoardingStatus(
        tenentDetails[0].TenantProfileCreation.TenantDetails.Onboarding_Status
      );
      setOneTimeCharge(
        tenentDetails[0].TenantProfileCreation.EnrolmentCharges.ONE_TIME_CHARGES
      );
      loader.setFalse();
    }
  };

  const getPartnerDetails = async (id) => {
    loader.setTrue();
    const partnerDetails = await PaymentApi.getPartner(
      context?.contractrow?.details?.partnerId ||
        mainContext.value?.contractrow?.details?.partnerId ||
        context?.details?.columns?.partnerId ||
        context?.data?.Values?.Partner_ID
    );
    setOnBoardingStatus(
      partnerDetails[0]?.PartnerProfileCreation?.PartnerDetails
        ?.Onboarding_Status
    );
    setOneTimeCharge(
      partnerDetails[0]?.PartnerProfileCreation?.EnrolmentCharges
        ?.ONE_TIME_CHARGES || 0
    );
    loader.setFalse();
  };
  // const computeBtn=()=>{
  //   if(Array.isArray(PartnerData.value)){
  //    return  PartnerData.value?.[0]?.TenantProfileCreation?.EnrolmentCharges ? true:false
  //   }else{
  //     if(PartnerData.value?.TenantProfileCreation?.EnrolmentCharges){
  //     return  PartnerData.value?.TenantProfileCreation?.EnrolmentCharges ?true:false
  //   }
  // }
  // }
  return (
    <FullScreenDilaog open={true}>
      {/* <Backdroploader open={loader.value} /> */}
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={'22'}
            activeStep={onBoardingStatus === 'ACTIVE' ? 5 : 2}
            onClose={onClose}
            btndisabled={updatedstatus}
            historypush={historypush}
            partnerCompleted={onBoardingStatus === 'ACTIVE' ? true : false}
            paymentbtn={OnboardedPartner.value ? 'Proceed' : 'Payment'}
            isSubmitting={partnerState?.loading?.paymentloader}
            title="Partner Registration "
            footer={onBoardingStatus === 'ACTIVE' ? false : true}
            footerInfo={
              <>
                <Grid item>
                  <OpportunityFooter cart={0} />
                </Grid>
              </>
            }
            body={() => (
              <>
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <CompanyInfo
                      details={mainContext?.value.contractrow?.details}
                    />
                  </Grid>
                  <Grid item>
                    <Paper elevation={0}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Grid item></Grid>
                        <Grid item>
                          <Grid container>
                            <Grid item>
                              {enableSearch.value ? (
                                <>
                                  <Grid item>
                                    <TextField
                                      style={{ width: '400px' }}
                                      id="standard-basic"
                                      fullWidth
                                      onChange={(e) =>
                                        dispatch(
                                          dashboardStore.onTableSearch({
                                            id: 'Contractlist',
                                            context: {
                                              onSearch: onSearchContract,
                                              value: e.target.value
                                            }
                                          })
                                        )
                                      }
                                      placeholder="Search by Contract Details"
                                      InputProps={{
                                        disableunderline: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <IconButton>
                                              <img
                                                src={searchSvg}
                                                fontSize={'large'}
                                              />
                                            </IconButton>
                                          </InputAdornment>
                                        )
                                      }}
                                    />
                                    <Tooltip title="Close" placeholder="bottom">
                                      <CloseOutlinedIcon
                                        fontSize={'small'}
                                        onClick={() => {
                                          enableSearch.setFalse();

                                          dispatch(
                                            dashboardStore.onTableSearch({
                                              id: 'Contractlist',
                                              context: {
                                                onSearch: onSearchContract
                                              }
                                            })
                                          );
                                        }}
                                      />
                                    </Tooltip>
                                  </Grid>
                                </>
                              ) : (
                                <>
                                  <Tooltip title="Search" placeholder="bottom">
                                    <IconButton>
                                      <img
                                        src={searchSvg}
                                        fontSize={'large'}
                                        onClick={enableSearch.toggle}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            </Grid>
                            <Grid item>
                              <Tooltip title="Refresh" placeholder="bottom">
                                <IconButton>
                                  <img
                                    src={refreshIcon}
                                    // onClick={() => {
                                    //   // setenableSearch(false);
                                    //   handleRefresh();
                                    // }}
                                    onClick={handleRefresh}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Table
                        columns={CONTRACT_TABLE.Dashboardcontract.columns}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onRowAction={handleTaskAction}
                        onRowClick={handleTaskRowClick}
                        rows={maketable(props.dashboardData.contractTablelist)}
                        loading={tableLoading}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}
          />
        )}
      </HooksFormWrapper>
    </FullScreenDilaog>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main
  }
}));

export default connect(
  (state) => ({
    partnerState: state.partners,
    modalState: state.modals,
    dashboardData: state.dashboardData
  }),
  {
    openModal: ModalsStore.open,
    onsumbitPayment: PartnerController.SumbmitPayment,
    downloadContract: Dashboardcontroller.downloadContract,
    OnboardStatusChnage: PartnerController.OnboardStatusChnage
  }
)(Contracts);
