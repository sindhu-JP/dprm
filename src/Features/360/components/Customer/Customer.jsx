import React from 'react';

import { useStateful } from 'react-hanger';
import { connect } from 'react-redux';
import LeadController from 'Controllers/Lead';
import ExistingLeadOverview from 'Features/PotentialLead/ExistingLeadOverview';
import ModalsStore from 'Store/Modals';
// import OpportunityCreation from 'Features/OpportunityCreation';
const Dashboard = ({
  customerInfo,
  Quotetablerow,
  Contracttablerow,

  modalState,

  closeModal
}) => {
  const quoteDetails = useStateful({});

  const loadQuoteDetails = (id) => {
    Quotetablerow({ id });
    Contracttablerow({ id });
    // const res = await Leads.getleadidDetails(customerInfo?.id);

    // quoteDetails.setValue(res);
  };

  React.useEffect(() => {
    if (customerInfo?.id) {
      loadQuoteDetails(customerInfo?.id);
    }
  }, [customerInfo]);

  return (
    <>
      {modalState.existingLead && (
        <ExistingLeadOverview
          open={modalState.existingLead}
          // user={props.authState.user}
          existingOpp={modalState.existingOpportunity.lead}
          opportunity={modalState.existingOpportunity.status}
          checklob={modalState.existingOpportunity.duplicateLob}
          onClose={() => closeModal('existingLead')}
        />
      )}
      {/* {modalState.opportunityCreation && (
        <OpportunityCreation
          open={modalState.opportunityCreation}
          lead={modalState?.context?.lead}
          NewOppLead={modalState?.context?.NewOpp}
          onClose={() => closeModal('opportunityCreation')}
          onSubmit={createOpportunity}
          customerID={modalState?.context?.customerID}
          Steppersdata={modalState?.modalStepper}
          changePlandata={modalState?.context?.payload}
          subscriptiondata={modalState?.context?.Subscription}
          user={modalState?.context?.user}
          Opportunitydata={modalState?.OpportunityContext?.OppData}
          submitting={leadsState.loading.opportunityCreation}
          error={leadsState.errors.opportunityCreation}
        />
      )} */}
    </>
  );
};

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads
    // usersState: state.users,
    // masterdata: state.master.data,
  }),
  {
    closeModal: ModalsStore.close,
    Duplicatechecklead: LeadController.Duplicatechecklead,
    Updateattdoc: LeadController.Updateattachment,
    Quotetablerow: LeadController.Quotetablerow,
    Contracttablerow: LeadController.Contracttablerow,
    createOpportunity: LeadController.createOpportunity
  }
)(Dashboard);
