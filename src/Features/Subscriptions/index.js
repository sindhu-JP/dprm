import React from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean} from 'react-hanger';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  Grid,
  Typography,
  Badge,
  makeStyles  
} from '@material-ui/core';
import { SubscriptionStepper } from 'lib/components';
import OpportunityFactory from 'Factory/Opportunity';
import ProductsController from 'Controllers/Products';
import LeadsController from 'Controllers/Lead';
import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';
import ModalsStore from 'Store/Modals';
import _ from 'lodash';
import AlertActions from 'Store/Alert';
import LeadAPI from 'Http/api/leads';
import Selectsubscription from './SelectSubscription';
import STATUS from 'lib/constants/statuses';


const OpportunityFooter = ({ cart, error }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center" direction="row" spacing={10} mt={6}>
        <Grid item>
          <Badge color="error" badgeContent={cart.count}>
            <ShoppingCartIcon />
          </Badge>
        </Grid>
        {/* <Grid item>
        <Typography style={{ color: "#FB9919" }} variant="subtitle2">
          Upfront Charges {cart.upfront || "00"}.00 /-
        </Typography>
        <Typography style={{ color: "#A97FFF" }} variant="subtitle2">
          Monthly Rentals {cart.recurring || "00"}.00 /-
        </Typography>
      </Grid> */}
        {error && (
          <Grid item>
            <Typography className={classes.error} variant="body">
              {error}
            </Typography>
          </Grid>
        )}
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

const Subscriptions = ({
  open,
  lead,
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
  autocheckfeasibility,
  submitcheck,
  Alertopen,
  Opportunitydata,
  alertState,
  NewOppLead,
  authUser,
  data,
  companyname,
  companyreg,
  oppId,
  customerID,
  customerDetails,
  plan
}) => {
  // Prevents rendering of the page until all the values are available
  // so that default values for the fields can be set.
  const loading = useBoolean(true);
  const productIdentifierdetails = useStateful({});

  // List of dropdown options and other values used in form

  const details = useStateful({
    companyName: '',
    registrationNumber: ''
  });

  React.useEffect(() => {
    if (lead) {
      details.setValue(
        OpportunityFactory.makeOpportunityCreationDetails({
          masterdata,
          lead: lead,
          users: usersState.entities
        })
      );
    }

    if (data) {
      productIdentifierdetails.setValue(data);
    }
  }, [lead, data]);

  const selectProduct = async (data, customers) => {
    const res = await LeadAPI.publicIdentifier(data.publicIdentifier).catch(
      () => {}
    );
    productIdentifierdetails.setValue(_.get(res, '[0]', {}));
    // loading.setFalse()
  };

  const unselectproduct = () => {
    productIdentifierdetails.setValue({});
  };

  const handleSubmit = () => {
    openModal({
      id: plan === 'CHANGE_PLAN' ? 'opportunityCreation' : 'Addvas',
      context: {
        lead: lead,
        Subscription: productIdentifierdetails.value,

        NewOpp: false,

        payload: {
          serviceRequestType: 'CHANGE_PLAN'
        },
        Stepper: STATUS?.stepperlabel?.Opportunity
      }
    });
    closeModal('Subscriptions');
  };

  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <SubscriptionStepper
            id={oppId}
            activeStep={0}
            completedSteps={[' SELECT SUBSCRIPTION']}
            onClose={onClose}
            isSubmitting={submitting}
            title="Change plan  Request ID"
            footerInfo={
              <>
                <Grid item>
                  <OpportunityFooter />
                </Grid>
              </>
            }
            body={() =>
              loading.value ? (
                <Selectsubscription
                  control={control}
                  details={details.value}
                  data={productIdentifierdetails.value}
                  selectProduct={selectProduct}
                  unselectproduct={unselectproduct}
                  plan={plan}
                  customerDetails={customerDetails}
                />
              ) : (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item> Loading ... </Grid>
                </Grid>
              )
            }
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
    usersState: state.users,
    products: state.products,
    leadsState: state.leads,
    modalState: state.modals,
    masterdata: state.master.data,
    alertState: state.alert,
    authUser: state.auth.user
  }),
  {
    submitcheck: ModalsStore.submitcheck,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    check: ModalsStore.check,
    closeModal: ModalsStore.close,
    openModal: ModalsStore.open,
    loadProducts: ProductsController.load,
    submitFeasibilityCheck: LeadsController.manualFeasibilityRequired,
    autocheckfeasibility: LeadsController.autocheckfeasibility
  }
)(Subscriptions);
