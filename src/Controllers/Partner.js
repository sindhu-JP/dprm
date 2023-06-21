import Alert from 'Store/Alert';
import Modal from 'Store/Modals';

import { createAsyncThunk } from '@reduxjs/toolkit';

import partnerApi from 'Http/api/Partner';
import dashboardAPI from 'Http/api/dashboard';
import workflowPayload from 'Factory/Worlflowpayload';
const SumbmitPayment = createAsyncThunk(
  'partners/SumbmitPayment',
  async ({ payload, walletid }, { dispatch }) => {
    const partner = await partnerApi.payment(payload);

    dispatch(
      Alert.open({
        type: 'success',
        message: 'Payment added successfully'
      })
    );

    // dispatch(Modal.close('contracts'));

    return { partner, walletdetail };
  }
);

const OnboardStatusChnage = createAsyncThunk(
  'partners/OnboardStatusChnage',
  async (
    {
      walletdetails,
      partnerID,
      Partnerlist,
      enrollementCharges,
      oneTimeCharge,
      walletId,
      securityDeposit,
      paymentType,
      partnerType
    },
    { dispatch }
  ) => {   
    const payloadworkflow = {
      workflowId: '1644853912184',
      userId: '',
      userRole: '',

      executionModeStatus: false,
      async: false,
      Values: {
        accessToken: localStorage.getItem('ACCESS_TOKEN'),
        partnerType:
          partnerType || partnerID.startsWith('TP') ? 'tenent' : 'master',
        Partner_ID:
          partnerID ||
          Partnerlist?.PartnerProfileCreation?.PartnerDetails?.Partner_ID,
        enrollementCharges: enrollementCharges ? true : false,
        oneTimeCharges: oneTimeCharge || 0,
        walletId:
          walletId ||
          Partnerlist?.PartnerProfileCreation?.PartnerDetails?.Wallet_ID,
        securityDeposit: securityDeposit || 0,
        paymentType: paymentType || 'Cash',
        ...workflowPayload.returnWorkflowData(
          partnerID ||
            Partnerlist?.PartnerProfileCreation?.PartnerDetails?.Partner_ID,
          Partnerlist?.PartnerProfileCreation?.PrimaryContactDetails
            ?.EMAIL_ID ||
            Partnerlist?.TenantProfileCreation?.PrimaryContactDetails?.EMAIL_ID,
          Partnerlist?.PartnerProfileCreation?.PrimaryContactDetails
            .MOBILE_NUMBER ||
            Partnerlist?.TenantProfileCreation?.PrimaryContactDetails
              .MOBILE_NUMBER,
          Partnerlist?.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME ||
            Partnerlist?.TenantProfileCreation?.TenantDetails?.TENANT_NAME,
          Partnerlist?.PartnerProfileCreation?.PrimaryContactDetails
            ?.PRIMARY_CONTACT_NAME ||
            Partnerlist?.TenantProfileCreation?.PrimaryContactDetails
              ?.PRIMARY_CONTACT_NAME,
          ''
        )
      }
    };
    await dashboardAPI.workflowTrigger(payloadworkflow);
    // if (
    //   Partnerlist?.PartnerProfileCreation?.PartnerDetails?.Onboarding_Status ===
    //     'ACTIVE' ||
    //   Partnerlist?.TenantProfileCreation?.TenantDetails?.Onboarding_Status ===
    //     'ACTIVE'
    // ) {
    dispatch(
      Modal.open({
        id: 'PaymentConformation',
        context: {
          id: partnerID,
          details: Partnerlist
        }
      })
    );
    // }

    dispatch(Modal.close('contracts'));
    dispatch(Modal.close('ContractPayments'));

    return walletdetails;
  }
);

export default { SumbmitPayment, OnboardStatusChnage };
