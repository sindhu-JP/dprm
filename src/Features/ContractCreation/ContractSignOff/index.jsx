import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Grid, Typography, Badge, makeStyles } from '@material-ui/core';

import { Stepper } from 'lib/components';
import OpportunityFactory from 'Factory/Opportunity';
import ProductsController from 'Controllers/Products';
import LeadsController from 'Controllers/Lead';

import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';
import ModalsStore from 'Store/Modals';

import AlertActions from 'Store/Alert';

import ContractSignoffview from './ContractSignoffview';
import LeadsAPI from 'Http/api/leads';

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

const ContractSignOff = ({
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

  Steppersdata,
  autocheckfeasibility,
  // check,
  submitcheck,
  Alertopen,
  alertState,
  createContract,
  oppQuote,
  ContractSignoff,
  getContractdetails,
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

  const attachment = useStateful([]);
  const contractDetail = useStateful({});

  const [oppstatus, setOppstatus] = useState('ONBOARDING');

  const constractID = useStateful({});
  const [formData, setformData] = React.useState({});
  const [isExist, setisExist] = React.useState(false);
  const Opportunity = useStateful({});

  const [isSaveAndExit, setisSaveAndExit] = React.useState(false);
  const [method, setmethod] = useState('patch');
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

        loading.setFalse();
        setleadid(lead.id);
        setOppID(oppQuote?.id);
      }
    }

    // if (oppQuote?.quoteRef?.id && !contractDetail.value?.contractSignOffDetails) {
    //   getDetails();
    //

    if (oppQuote) {
      Opportunity.setValue(oppQuote);
    }

    leaddata.setValue(lead);
    // }
  }, [lead, usersState, masterdata, lead, loading, leadsState, oppQuote]);

  React.useEffect(() => {
    if (modalState.IsSubmitInSaveAndExitModal) {
      handleSubmit(formData);
    }
  }, [modalState.IsSubmitInSaveAndExitModal]);
  // Update cart whenver a product or vas is added or removed
  const handleSubmitvie = () => {};
  const handleSubmit = (values) => {
    if (attachment.value.length > 0) {
      if (modalState.IsSaveAndExit && !modalState.IsSubmitInSaveAndExitModal) {
        toggleSaveandExit({ key: 'IsSaveAndExitModalOpen', value: true });
        setformData(values);
      } else {
        const payload = {
          contractSignOffDetails: {
            poReferenceNumber: values.PoNumber,
            lgReferenceNumber: values.LgNumber,
            signedBy: values.SIGNEDBY,
            customersignedBy: values.CUSTOMERSIGNEDBY,
            attachment: attachment.value
          }
        };

        ContractSignoff({
          id: contractDetail.value?.id,
          payload: payload,
          quoteId: Opportunity.value?.quoteRef?.id,
          contractId: Opportunity.value?.contract?.id,
          oppId: Opportunity.value?.id,
          leadid: leaddata.value?.id,
          user: user,
          method: method,
          isSaveAndExit: modalState.IsSaveAndExit,
          parent: parent
        });
        toggleSaveandExit({ key: 'IsSubmitInSaveAndExitModal', value: false });
      }
    }
  };

  React.useEffect(() => {
    if (
      oppQuote?.quoteRef?.id &&
      !contractDetail.value?.contractSignOffDetails
    ) {
      getDetails();
    }
  }, [oppQuote?.quoteRef?.id]);

  let submitMyForm = null;

  const handleSubmitMyForm = (e) => {
    if (submitMyForm) {
      submitMyForm(e);
    }
  };
  const bindSubmitForm = (submitForm) => {
    submitMyForm = submitForm;
  };

  const getDetails = async () => {
    // const res = await LeadsAPI.GetcontractDetails({
    //   qouteId: oppQuote?.quoteRef?.id,
    // }).catch((err) => console.log(err));
    // let contractData = await getContractdetails({ qouteId: oppQuote?.quoteRef?.id,})
    // contractDetail.setValue(contractData.payload[0]);
    // loading.setFalse();

    const res = await LeadsAPI.GetcontractDetails({
      qouteId: oppQuote?.quoteRef?.id
    }).catch((err) => {});
    res[0]?.contractSignOffDetails ? setisExist(true) : setisExist(false);

    contractDetail.setValue(res[0]);
    res[0]?.contractSignOffDetails &&
      attachment.setValue(res[0]?.contractSignOffDetails?.attachment);

    // if (_.get(res, "[0].contractSignOffDetails", "")) {
    //   setmethod("put");
    // }
  };

  // React.useEffect(() => {
  //   if (props.leadInfo || props.subOpportunity) {
  //     setInfo(props.leadInfo);
  //     leadsubOpp.setValue(props.subOpportunity);

  //     getDetails();
  //   }
  // }, [props.leadInfo]);
  // const updateDetails=useStateful({})
  //   React.useEffect(()=>{

  //      if(contractDetail.value){

  //       updateDetails.setValue(data.contractSignOffDetails)
  //      }

  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper onSubmit={handleSubmitMyForm}>
        {({ register, errors, control, setValue }) => (
          <Stepper
            id={leadID}
            activeStep={5}
            completedSteps={['Quote Approval']}
            onClose={onClose}
            isSubmitting={submitting}
            onClickSaveAndExit={() =>
              toggleSaveandExit({ key: 'IsSaveAndExit', value: true })
            }
            Steppersdata={Steppersdata}
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
                <ContractSignoffview
                  control={control}
                  register={register}
                  formErrors={errors}
                  updateForm={setValue}
                  formOptions={formOptions.value}
                  details={details.value}
                  lead={leaddata.value}
                  masterdata={masterdata}
                  constractId={constractID.value}
                  openleadview={openModal}
                  createContract={createContract}
                  open={modalState.buttomsheet}
                  showbutton={leadsState?.loading.showbutton}
                  data={contractDetail.value}
                  submitting={leadsState.loading.contractloading}
                  error={leadsState.errors.contractError}
                  onclose={() => closeModal('buttomsheet')}
                  oppQuote={oppQuote}
                  handleSubmit={handleSubmit}
                  bindSubmitForm={bindSubmitForm}
                  user={user}
                  isExist={isExist}
                  attachment={attachment}
                  updatedetail={contractDetail.value?.contractSignOffDetails}
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
    alertState: state.alert
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
    autocheckfeasibility: LeadsController.autocheckfeasibility,
    ContractSignoff: LeadsController.ContractSignoff,
    getContractdetails: LeadsController.getContractdetails
  }
)(ContractSignOff);
