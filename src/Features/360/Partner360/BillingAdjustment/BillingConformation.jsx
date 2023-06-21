import React from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';
import { makeStyles } from '@material-ui/core';
import { Stepper } from 'lib/components';

import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';
import constant from 'lib/constants/statuses';

import AlertActions from 'Store/Alert';
import PartnerController from 'Controllers/Partner';

import { useDispatch } from 'react-redux';

import ConformationView from './ConformationView';

const BillingConformation = ({
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
  ...props
}) => {
  const loading = useBoolean(true);
  const [amount, setAmount] = React.useState();
  const addpayment = useBoolean(false);
  const dispatch = useDispatch();
  const reasonDetails = useStateful([]);
  const adjustmentdetails = useStateful([]);
  const ChargeItemdetails = useStateful([]);
  const CurrencyDetails = useStateful([]);
  const AdjustmentfromDetails = useStateful({});

  console.log(context, "context of comn,", props.modalState, props)
  const handleSubmit = () => {};
  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={context?.details?.columns?.id}
            activeStep={2}
            onClose={onClose}
            Steppersdata={constant.stepperlabel.adjustmentSteps}
            isSubmitting={partnerState?.loading?.paymentloader}
            historypush={historypush}
            title="Billing Adjustment Request "
            footer={false}
            body={() => (
              <>
                <ConformationView context={context?.details} />
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
)(BillingConformation);
