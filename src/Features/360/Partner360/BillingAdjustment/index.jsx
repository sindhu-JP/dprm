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

import partnerFactory from 'Factory/Partner';
import BillingAdjustmentview from './BillingAdjustmentview';

const BillingAdjustment = ({
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
  InvoiceDetails,
  getInvoiceDetails,
  context,
  ...props
}) => {
  const loading = useBoolean(true);
  const [amount, setAmount] = React.useState();
  const addpayment = useBoolean(false);
  const dispatch = useDispatch();
  const CurrencyDetails = useStateful([]);
  const handleSubmit = () => {};
  React.useEffect(() => {
    getInvoiceDetails({ id: partnerFactory.getWalletId(context?.partner) });
  }, []);

  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={''}
            activeStep={0}
            onClose={onClose}
            Steppersdata={constant.stepperlabel.adjustmentSteps}
            isSubmitting={partnerState?.loading?.paymentloader}
            historypush={historypush}
            title=" "
            footer={false}
            footerInfo={<></>}
            body={() => (
              <>
                <BillingAdjustmentview
                  context={context}
                  InvoiceDetails={InvoiceDetails}
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
)(BillingAdjustment);
