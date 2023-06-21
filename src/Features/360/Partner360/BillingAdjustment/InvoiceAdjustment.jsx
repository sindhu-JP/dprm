import React from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';

import { makeStyles } from '@material-ui/core';
import { Stepper } from 'lib/components';
import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';

import _ from 'lodash';
import constant from 'lib/constants/statuses';

import AlertActions from 'Store/Alert';
import PartnerController from 'Controllers/Partner';

import { useDispatch } from 'react-redux';
import dashboardApi from 'Http/api/dashboard';
import InvoiceAdjustmentView from './InvoiceAdjustmentView';
import MakePayload from 'Factory/PartnerPayload';

const InvoiceAdjustment = ({
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
  context,
  OnsubmitBilliginAdjustment,
  loading,
  ...props
}) => {
  const [amount, setAmount] = React.useState();

  const addpayment = useBoolean(false);
  const dispatch = useDispatch();
  const reasonDetails = useStateful([]);
  const adjustmentdetails = useStateful([]);
  const ChargeItemdetails = useStateful([]);
  const CurrencyDetails = useStateful([]);
  const AdjustmentfromDetails = useStateful({});
  const contextDetails = useStateful({});
  let userName =
    localStorage.getItem('USER') &&
    JSON.parse(localStorage.getItem('USER')).sub;
  const Loginuser = JSON.parse(localStorage.getItem('loginUser'));
  const handleSubmit = () => {
    const payload = {
      invoiceId: context?.details?.columns?.id,
      partnerId: context?.partner?.mainlist?.partnerId,

      walletId:
        context?.partner?.details?.PartnerProfileCreation?.PartnerDetails
          ?.Wallet_ID ||
        context?.partner?.details?.TenantProfileCreation?.TenantDetails
          ?.Wallet_ID,
      adjustmentType: AdjustmentfromDetails.value?.adjustmentType,
      chargeItem: AdjustmentfromDetails.value?.chargeItem,
      adjustmentAmount: parseInt(AdjustmentfromDetails.value?.adjustmentAmount),
      reason: AdjustmentfromDetails.value?.reason,
      desc: AdjustmentfromDetails.value?.desc,
      PARTNER_NAME: _.get(
        contextDetails.value?.partner,
        'mainlist.partnerName',
        ''
      ),
      currentDate: new Date(),
      //  date = new Date();
      userName: userName,
      userId: Loginuser?.id,
      subStatus: 'draft',
      channel: 'DPRM'
    };

    OnsubmitBilliginAdjustment({
      body: MakePayload.makeBillingAdjustment(payload)
    });
  };

  const getdetails = async () => {
    let data = await Promise.all([
      dashboardApi.getReasondetails(),
      dashboardApi.getchargeItemsdetails(),
      dashboardApi.getAdjustmentdetails()
    ]);
    reasonDetails.setValue(_.get(data, '[0]', []));
    ChargeItemdetails.setValue(_.get(data, '[1]', []));

    adjustmentdetails.setValue(_.get(data, '[2]', []));
  };
  React.useEffect(() => {
    getdetails();
  }, []);

  React.useEffect(() => {
    if (context) {
      contextDetails.setValue(context);
    }
  }, [context]);

  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={context?.details?.columns?.id}
            activeStep={1}
            onClose={onClose}
            Steppersdata={constant.stepperlabel.adjustmentSteps}
            isSubmitting={loading}
            historypush={historypush}
            title="Billing Adjustment Request "
            footer={true}
            footerInfo={<></>}
            body={() => (
              <>
                <InvoiceAdjustmentView
                  context={contextDetails.value}
                  AdjustmentfromDetails={AdjustmentfromDetails}
                  reasonDetails={reasonDetails.value}
                  adjustmentdetails={adjustmentdetails.value}
                  ChargeItemdetails={ChargeItemdetails.value}
                />
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
    Alertopen: AlertActions.open
  }
)(InvoiceAdjustment);
