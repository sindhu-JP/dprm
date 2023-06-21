import React from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Grid, Badge, makeStyles, Box } from '@material-ui/core';
import { Stepper } from 'lib/components';

import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';

import PaymentConfirmation from './PaymentConfirmation';
import DashboardController from 'Controllers/Dashboard';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main
  }
}));
const OpportunityFooter = ({ cart, error }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center" direction="row" spacing={10} mt={6}>
        <Grid item>
          <Badge color="error">
            <ShoppingCartIcon />
          </Badge>
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

const PaymentConformation = ({
  open,
  lead,
  onClose,
  products,
  partnerState,
  paymentdetails,
  modelState,
  historypush,
  getOverviewDetails,
  getTenantoverview,
  getPartneroverview
}) => {
  const loading = useBoolean(true);
  const CurrencyDetails = useStateful([]);
  const handleSubmit = () => {};

  return (
    <FullScreenDilaog open={true}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={'22'}
            activeStep={4}
            onClose={onClose}
            historypush={historypush}
            footer={false}
            isSubmitting={false}
            title="Partner Registration "
            footerInfo={
              <>
                <Grid item>
                  <OpportunityFooter cart={0} />
                </Grid>
              </>
            }
            body={() => (
              <>
                <Box />
                <PaymentConfirmation
                  paymentdetails={modelState.context}
                  getPartneroverview={getPartneroverview}
                  getTenantoverview={getTenantoverview}
                  getOverviewDetails={getOverviewDetails}
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

export default connect(
  (state) => ({
    partnerState: state.partners,
    modelState: state.modals
  }),
  {
    // onsumbitPayment:PartnerController.SumbmitPayment

    getOverviewDetails: DashboardController.getOverviewDetails,
    getTenantoverview: DashboardController.getTenantoverview,
    getPartneroverview: DashboardController.getPartneroverview
  }
)(PaymentConformation);
