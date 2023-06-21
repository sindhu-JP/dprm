import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Grid, Typography, Badge, makeStyles } from '@material-ui/core';
import LeadsAPI from 'Http/api/leads';
import { Stepper } from 'lib/components';
import OpportunityFactory from 'Factory/Opportunity';
import ProductsController from 'Controllers/Products';
import LeadsController from 'Controllers/Lead';
import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';

import ModalsStore from 'Store/Modals';

import AlertActions from 'Store/Alert';

import LeadFactory from 'Factory/Lead';
import CreateContractView from './CreateContractView';
import LeadAPI from 'Http/api/leads';

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

const CreateContraction = ({
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
  toggleSaveandExit,
  id,
  user,
  authstate,

  autocheckfeasibility,
  // check,
  submitcheck,
  Alertopen,
  alertState,
  createContract,
  oppQuote,
  Buttonlabel,
  Steppersdata,
  parent
}) => {
  // Prevents rendering of the page until all the values are available
  // so that default values for the fields can be set.
  const loading = useBoolean(true);

  // List of dropdown options and other values used in form
  const formOptions = useStateful({});
  const [lobkey, setlobkey] = React.useState('');
  const [leadID, setleadid] = React.useState('');

  const [error, seterror] = React.useState('');
  const details = useStateful({});
  const leaddata = useStateful({});
  const contractDetail = useStateful({});
  const showDatafield = useBoolean(false);

  const [oppstatus, setOppstatus] = useState('ONBOARDING');
  const [isNewContract, setIsNewContract] = React.useState(true);
  const constractID = useStateful({});
  const [updateStatus, setUpdatestatus] = useState('APPROVAL');
  const [ButtonLabel, setButtonLabel] = useState('');
  let action = { permission: 'dlpm.lp.quote.v1.approve' };
  const [OppID, setOppID] = useState('');
  // Details of the cart
  const cart = useStateful({
    count: 0,
    upfront: 0,
    recurring: 0
  });

  // List of default values and other values to be used in the form
  // derived from the lead.

  // Initialize data for the opportunity creation page.
  React.useEffect(() => {
    if (lead && masterdata && usersState.ids.length) {
      if (lead) {
        details.setValue(
          OpportunityFactory.makeOpportunityCreationDetails({
            masterdata,
            lead: lead,
            users: usersState.entities
          })
        );

        formOptions.setValue(
          OpportunityFactory.makeOpportunityCreationFormoptions({
            masterdata,
            users: usersState
          })
        );
        leaddata.setValue(lead);

        loading.setFalse();
        setleadid(lead.id);
        setOppID(oppQuote?.id);
      }
    }

    if (leadsState?.contractData) {
      contractDetail.setValue(leadsState?.contractData);
    }

    //  if(_.get(lead, "customerId","")){
    //     setOppstatus("ADD_SERVICE")
    //  }

    if (lead) {
      if (lead?.relatedParty) {
        let vas = lead?.relatedParty?.map((item) => {
          if (item.role === 'Customer') {
            setOppstatus('ADD_SERVICE');
          }
        });
      }

      if (Buttonlabel) {
        setButtonLabel(Buttonlabel);
      }
    }

    if (oppQuote) {
      if (oppQuote.serviceRequestType) {
        showDatafield.setTrue();
      }
    }

    if (authstate?.user) {
      if (LeadFactory.getpermissions(authstate?.user, action)) {
        setUpdatestatus('SHARE');
      }
    }
  }, [lead, usersState, masterdata, lead, loading, leadsState, authstate]);

  // Update cart whenver a product or vas is added or removed
  const handleSubmit = () => {
    if (!isNewContract) {
      if (modalState.IsSaveAndExit && !modalState.IsSubmitInSaveAndExitModal) {
        toggleSaveandExit({ key: 'IsSaveAndExitModalOpen', value: true });
      } else {
        seterror('');
        onSubmit({
          id: leadID,
          oppId: OppID,
          user,
          status: oppstatus,
          quoteId: oppQuote?.quoteRef?.id,
          quote: oppQuote?.quoteRef,
          contractId: constractID.value,
          isSaveAndExit: modalState.IsSaveAndExit,
          updateStatus: updateStatus,
          parent: parent
        });
        toggleSaveandExit({ key: 'IsSubmitInSaveAndExitModal', value: false });
      }
    } else {
      seterror(' Contract   creation is manadatory  ');
    }
  };
  React.useEffect(() => {
    if (oppQuote.status === 'MODIFY_CONTRACT') {
      ganerateID();
      setIsNewContract(true);
    } else {
      if (oppQuote?.contract?.id) {
        getCotractData();
      } else {
        ganerateID();
        setIsNewContract(true);
      }
    }
  }, []);

  const getCotractData = async () => {
    const res = await LeadsAPI.GetcontractDetails({
      qouteId: oppQuote?.quoteRef?.id
    });

    // let contractData =  await LeadAPI.getContractDetailesById(oppQuote.contract.id).catch(console.log);
    contractDetail.setValue(res[0]);
    setIsNewContract(false);
    constractID.setValue(oppQuote.contract?.id);
  };

  const ganerateID = async () => {
    const contract = await LeadAPI.getcontractID();

    constractID.setValue(contract?.id);
  };

  React.useEffect(() => {
    if (modalState.IsSubmitInSaveAndExitModal) {
      handleSubmit();
    }
  }, [modalState.IsSubmitInSaveAndExitModal]);
  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmit}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={leadID}
            activeStep={4}
            completedSteps={['Quote Approval']}
            onClose={onClose}
            isSubmitting={submitting}
            Steppersdata={Steppersdata}
            onClickSaveAndExit={() =>
              toggleSaveandExit({ key: 'IsSaveAndExit', value: true })
            }
            title="Create Lead"
            footerInfo={
              <>
                <Grid item>
                  <OpportunityFooter cart={cart.value} error={error} />
                </Grid>
              </>
            }
            body={() =>
              !loading.value ? (
                <CreateContractView
                  control={control}
                  register={register}
                  formErrors={errors}
                  updateForm={setValue}
                  formOptions={formOptions.value}
                  details={details.value}
                  lead={leaddata.value}
                  masterdata={masterdata}
                  constractId={constractID.value}
                  openModal={openModal}
                  createContract={(data) => {
                    createContract(data);
                    setIsNewContract(false);
                  }}
                  open={modalState.buttomsheet}
                  showbutton={leadsState?.loading.showbutton}
                  data={contractDetail.value}
                  submitting={leadsState.loading.contractloading}
                  error={leadsState.errors.contractError}
                  onclose={() => closeModal('buttomsheet')}
                  oppQuote={oppQuote}
                  Buttonlabel={ButtonLabel}
                  showDatafield={showDatafield.value}
                  isNewContract={isNewContract}
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
    authstate: state.auth
  }),
  {
    submitcheck: ModalsStore.submitcheck,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    check: ModalsStore.check,
    toggleSaveandExit: ModalsStore.toggleSaveandExit,
    closedrawer: ModalsStore.closedrawer,
    closeModal: ModalsStore.close,
    openModal: ModalsStore.open,
    loadProducts: ProductsController.load,
    createContract: LeadsController.createContract,
    submitFeasibilityCheck: LeadsController.manualFeasibilityRequired,
    autocheckfeasibility: LeadsController.autocheckfeasibility
  }
)(CreateContraction);
