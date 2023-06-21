import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';

import { Grid, makeStyles, Box } from '@material-ui/core';
import { Stepper } from 'lib/components';

import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';

import _ from 'lodash';

import PaymentsView from './PaymentsView';
import PaymentApi from 'Http/api/Payment';
import Alert from 'Store/Alert';
import AlertActions from 'Store/Alert';
import PartnerController from 'Controllers/Partner';

import { useDispatch } from 'react-redux';
import dashboardApi from 'Http/api/dashboard';

const OpportunityFooter = ({ cart, error }) => {
  const classes = useStyles();

  return (
    <>
      {/* <Grid container alignItems="center" direction="row" spacing={10} mt={6}>
        <Grid item>
          <Badge color="error">
            <ShoppingCartIcon />
          </Badge>
        </Grid>
      </Grid> */}
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

const ContractPayments = ({
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
  partnerState,
  modalcontext,
  dashboardData,
  historypush,
  OnboardStatusChnage,

  ...props
}) => {
  const loading = useBoolean(true);
  const [amount, setAmount] = React.useState();
  const [onBoardingStatus, setOnBoardingStatus] = useState('');
  const [oneTimeCharge, setOneTimeCharge] = useState('');
  const [btnDisableVal, SetbtnDisableVal] = useState(false);
  const addpayment = useBoolean(true);
  const dispatch = useDispatch();
  const selectedCard = useStateful(0);
  const selectedPaymentMode = useStateful('Cash');
  const Partnerlist = useStateful({});
  const WalletDetails = useStateful({});
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

  const AmountDetails = useStateful({});
  const balance = useStateful({});
  const Comments = useStateful('');

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const checkPartnerType = (modalcontext) => {
    if (modalcontext?.details?.contractrow?.details?.columns?.partnerId) {
      if (
        modalcontext?.details?.contractrow?.details?.columns?.partnerId?.substring(
          0,
          2
        ) === 'MP'
      ) {
        return 'master';
      } else {
        return 'tenent';
      }
    } else if (modalcontext?.details?.contractrow?.details?.partnerId) {
      if (
        modalcontext?.details?.contractrow?.details?.partnerId?.substring(
          0,
          2
        ) === 'MP'
      ) {
        return 'master';
      } else {
        return 'tenent';
      }
    }
  };

  const checkPartnerId = (modalcontext) => {
    if (modalcontext?.details?.contractrow?.details?.columns?.partnerId) {
      return modalcontext?.details?.contractrow?.details?.columns?.partnerId;
    } else {
      return modalcontext?.details?.contractrow?.details?.partnerId;
    }
  };

  const handleSubmit = async () => {
    let oneTimeandSecurity = balance.value?.ONE_TIME_CHARGES;

    if (oneTimeandSecurity >= 0) {
      //update onboarding status of the partner

      if (onBoardingStatus === 'PENDING') {
        let paymentAmount = parseInt(AmountDetails.value.amount);
        let walletBal = -parseInt(balance.value.balance);
        let oneTimeChargeAmount = -parseInt(oneTimeCharge);

        // update tenentOnboarding status
        if (
          modalcontext?.details?.contractrow?.details?.partnerType ===
            'tenant' ||
          modalcontext?.details?.contractrow?.details?.partnerId?.startsWith(
            'TP'
          ) ||
          modalcontext?.details?.contractrow?.details?.rowlist?.AddContractFor?.ContractInformation?.Partner_ID?.startsWith(
            'TP'
          )
        ) {
          await PaymentApi.tenentOnBoardingStatus(
            modalcontext?.details?.contractrow?.details?.partnerId ||
              modalcontext?.details?.contractrow?.details?.rowlist
                ?.AddContractFor?.ContractInformation?.Partner_ID
          );
        } else {
          // update MPOnboarding status
          await PaymentApi.onBoardingStatus(
            modalcontext?.details?.contractrow?.details?.partnerId ||
              modalcontext?.details?.contractrow?.details?.rowlist
                ?.AddContractFor?.ContractInformation?.Partner_ID
          );
        }
      } else {
        // update MPOnboarding status

        if (
          modalcontext?.details?.contractrow?.details?.partnerType ===
            'tenant' ||
          modalcontext?.details?.contractrow?.details?.partnerId?.startsWith(
            'TP'
          ) ||
          modalcontext?.details?.contractrow?.details?.rowlist?.AddContractFor?.ContractInformation?.Partner_ID?.startsWith(
            'TP'
          )
        ) {
          await PaymentApi.tenentOnBoardingStatus(
            modalcontext?.details?.contractrow?.details?.partnerId ||
              modalcontext?.details?.contractrow?.details?.rowlist
                ?.AddContractFor?.ContractInformation?.Partner_ID
          );
        } else {
          await PaymentApi.onBoardingStatus(
            modalcontext?.details?.contractrow?.details?.partnerId ||
              modalcontext?.details?.contractrow?.details?.rowlist
                ?.AddContractFor?.ContractInformation?.Partner_ID
          );
        }
      }

      OnboardStatusChnage({
        walletdetails: partnerState.paymentDetails,
        partnerID: checkPartnerId(modalcontext),
        Partnerlist: Partnerlist.value,
        enrollementCharges: true,
        oneTimeCharge: oneTimeCharge,
        walletId:
          Partnerlist.value?.PartnerProfileCreation?.PartnerDetails
            ?.Wallet_ID ||
          Partnerlist.value?.TenantProfileCreation?.TenantDetails?.Wallet_ID,
        securityDeposit:
          Partnerlist.value?.PartnerProfileCreation?.EnrolmentCharges
            ?.SECURITY_DEPOSIT ||
          Partnerlist.value?.TenantProfileCreation?.EnrolmentCharges
            ?.SECURITY_DEPOSIT,
        paymentType: selectedPaymentMode.value,
        partnerType: checkPartnerType(modalcontext)
      });
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please Add payment'
        })
      );
    }
  };

  const handleaddPayment = () => {
    if (_.values(AmountDetails).every(_.isEmpty)) {
      addpayment.setFalse();
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please Add payment'
        })
      );
    } else {
      const payload = {
        paymentType: selectedPaymentMode.value,
        amount: parseInt(AmountDetails.value.amount),
        partnerId: modalcontext?.details.contractrow?.details?.partnerId,
        contractIds: dashboardData.contractIds,
        currencyType: AmountDetails.value.currencyType,

        remarks: 'Fund Credited',
        purposeOfTranx: 'Payment towards Partner enrolment'
      };
      onsumbitPayment({
        payload,
        walletid:
          Partnerlist.value?.PartnerProfileCreation?.PartnerDetails
            ?.Wallet_ID ||
          Partnerlist.value?.TenantProfileCreation?.TenantDetails?.Wallet_ID
      });
      AmountDetails.setValue({
        ...AmountDetails.value,
        amount: ''
      });
      addpayment.setTrue();
    }
  };
  const getmastercurrency = async () => {
    const currency = await PaymentApi.getCurrency();
    CurrencyDetails.setValue(_.get(currency, '[0][currency]', '[]'));
  };
  React.useEffect(() => {
    getmastercurrency();
    // getwalletBal();
  }, []);

  const getwalletBal = async () => {
    let balc = await dashboardApi.getWalletdetails(
      modalcontext?.details?.contractrow?.details?.id
    );
    WalletDetails.setValue(_.get(balc, '[0]', []));

    // balance.setValue(_.get(balc, '[0]', []));
  };

  //partnerdetails

  const getPartnerDetails = async (data) => {
    const partnerDetails = await PaymentApi.getPartner(
      modalcontext?.details?.contractrow?.details?.partnerId ||
        modalcontext?.details?.contractrow?.details?.columns?.partnerId
    );
    setOnBoardingStatus(
      partnerDetails[0].PartnerProfileCreation.PartnerDetails.Onboarding_Status
    );
    balance.setValue(partnerDetails[0].PartnerProfileCreation.EnrolmentCharges);
    setOneTimeCharge(
      partnerDetails[0].PartnerProfileCreation.EnrolmentCharges.ONE_TIME_CHARGES
    );
    Partnerlist.setValue(_.get(partnerDetails, '[0]', {}));
  };

  // tenent Details

  const getTenentDetails = async (data) => {
    const tenentDetails = await PaymentApi.getTenent(
      modalcontext?.details?.contractrow?.details?.partnerId ||
        modalcontext?.details?.contractrow?.details?.columns?.partnerId
    );


    setOnBoardingStatus(
      tenentDetails[0]?.TenantProfileCreation?.TenantDetails?.Onboarding_Status
    );
    balance.setValue(tenentDetails[0]?.TenantProfileCreation?.EnrolmentCharges);
    setOneTimeCharge(
      tenentDetails[0]?.TenantProfileCreation?.EnrolmentCharges
        ?.ONE_TIME_CHARGES
    );
    Partnerlist.setValue(_.get(tenentDetails, '[0]', {}));
  };

  React.useEffect(() => {
    if (
      modalcontext?.details?.contractrow?.details?.partnerType === 'tenant' ||
      modalcontext?.details?.contractrow?.details?.rowlist?.Partner_ID?.substring(
        0,
        2
      ) === 'TP' ||
      modalcontext?.details?.contractrow?.details?.columns?.partnerId?.substring(
        0,
        2
      ) === 'TP'
    ) {
      getTenentDetails(
        modalcontext?.details?.contractrow?.details?.partnerId ||
          modalcontext?.details?.contractrow?.details?.rowlist?.TENANT_ID ||
          modalcontext?.details?.contractrow?.details?.columns?.partnerId
      );
    } else {
      getPartnerDetails(
        modalcontext?.details?.contractrow?.details?.partnerId ||
          modalcontext?.details?.contractrow?.details?.columns?.partnerId
      );
    }
  }, []);


  React.useEffect(() => {
    if (partnerState?.walletDetails) {
      // balance.setValue(_.get(partnerState, 'walletDetails', {}));
    }
  }, [partnerState.walletDetails]);
  const getButtonstatus = () => {
    let data = Math.sign(balance.value?.balance) === -1 ? true : false;

    return data;
  };

  const handlePaymentTypeSelected = (seletedCardItem, index) => {
    selectedCard.setValue(index);
    selectedPaymentMode.setValue(seletedCardItem?.name);
  };

  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={''}
            activeStep={3}
            onClose={onClose}
            btndisabled={btnDisableVal}
            SetbtnDisableVal={SetbtnDisableVal}
            historypush={historypush}
            title="Partner Registration "
            footer={true}
            footerInfo={
              <>
                <Grid item>
                  <OpportunityFooter cart={0} />
                </Grid>
              </>
            }
            body={() => (
              <>
                <PaymentsView
                  currencydata={CurrencyDetails.value}
                  amount={handleAmount}
                  addpayment={addpayment}
                  balance={balance.value}
                  onBoardingStatus={onBoardingStatus}
                  AmountDetails={AmountDetails}
                  handleaddPayment={handleaddPayment}
                  loading={partnerState?.loading?.paymentloader}
                  SetbtnDisableVal={SetbtnDisableVal}
                  selectedCard={selectedCard.value}
                  handlePaymentTypeSelected={handlePaymentTypeSelected}
                  Comments={Comments}
                />

                <Box py={10}></Box>
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
    onsumbitPayment: PartnerController.SumbmitPayment,
    Alertopen: AlertActions.open,
    OnboardStatusChnage: PartnerController.OnboardStatusChnage
  }
)(ContractPayments);
