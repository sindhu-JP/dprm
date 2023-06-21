import _ from 'lodash';
import React from 'react';
import config from 'config';
import { connect } from 'react-redux';
import { Router as LowLevelRouter } from 'react-router';
import { Redirect, Switch, Route } from 'react-router-dom';

import { history } from 'Store';
import Home from 'Features/Home';
import Login from 'Features/Login';
import Test from 'Features/Test';
import Private from './Private';
// import Lead360 from 'Components/Lead360/Lead360';

import AuthController from 'Controllers/Auth';
import LeadsController from 'Controllers/Lead';
import HierarchyController from 'Controllers/Hierarchy';
import UsersController from 'Controllers/Users';
import EventsController from 'Controllers/Events';
import MasterdataController from 'Controllers/Masterdata';
// import Chickletrequests from 'Features/Requests/Chickletrequests';
import SessionOut from 'Components/401Dialog/SessionOut';
import ManageHierarchy from 'Features/ManageHierarchy/ManageHierarchy';
import FormFields from 'Features/Forms/FormFields';
import ContractDetails from 'Features/ContractDetails/ContractDetails';
import ContractSignOff from 'Features/ContractDetails/ContractSignOff';
import ViewContract from 'Features/ContractDetails/ViewContract';
import Payments from '../Features/Payments/ContractPayments';
import PaymentConfirmation from 'Features/ContractDetails/PaymentConfirmation';
import Partner360 from 'Features/360/Partner360/Partner360';
import Agent360 from "Features/360/Agent360/Partner360"
// import Partner360 from 'Features/360/Partner360/index';

// import PaymentConfirmation from 'Features/ContractDetails/PaymentConfirmation';
import SettlementRule from 'Features/SettlementRule/SettlementRule';
import Suspension from 'Features/Suspension/Suspension';
import Revoke from 'Features/Revoke/Revoke';
import CommissionRule from 'Features/CommissionRule/CommissionRule';
import SettlementApproval from '../Features/SettlementRule/SettlementApproval';
import SuspensionApproval from '../Features/Suspension/suspensionModal';
import LeadApproval from '../Features/Home/PartnerAndAgentInfo/LeadAproval';
import RevokeApproval from '../Features/Revoke/RevokeModal';
import CommissionApproval from 'Features/CommissionRule/CommissionApproval';
import UpdateCommissionRule from 'Features/CommissionRule/UpdateCommission';
import Reports from 'Features/Reports';
import OrdersRequests from 'Features/Orders&Requests/Orders-Requests';
import GroupAssignment from 'Features/GroupAssignment';
import BackOffice from 'Features/BackOffice';
import AgentSuccessModal from '../Components/Modals/AgentSuccessModal';
import AgentContractSuccess from '../Components/Modals/AgentContractSuccess';
import BulkUpload from 'Features/BulkUpload';
import UploadFile from 'Features/UploadFile';

import Help from 'Features/Help';
import BulkSuccess from 'Components/Modals/bulkSuccess';
import manualModal from 'Features/ManualComissioning/ManualModal';
import ManualPage from 'Features/ManualComissioning/Manual';
import PopupTable from 'Features/PopupTable';
const Dummy = () => <Redirect to={config.basePath} />;

const Router = ({
  authState,
  loadLeads,
  loadEvents,
  restoreSession,
  loadMasterdata,
  loadAccountManagers,
  loadHirarchy
}) => {
  const validateSession = async () => {
    const isValid = await AuthController.sessionIsValid();
    if (isValid) {
      restoreSession();
    } else {
      AuthController.initiateLogin(_.get(config, 'sso', {}));
    }
  };

  const initialize = (user, authState) => {
    // loadLeads({user,count:10, authState});
    loadEvents();
    loadMasterdata();
    loadAccountManagers();
    loadHirarchy({ name: user?.sub, user });
  };

  React.useEffect(() => {
    // if (authState.authenticated) {
    //   initialize(authState?.user, authState);
    // }
    //  if(authState.token.ACCESS_TOKEN){
    //   l //   const  payload={
    //     "username": null,
    //     "userRole": "RO0000",
    //     "executionModeStatus": false,
    //     "async": false,
    //     "workflowId": "1616757850432",
    //     "formIdentity": "User_Ageing",
    //     "stepIdentity": "User Ageing",
    //     "Values": {
    //     "User_Name":authState?.user?.sub,
    //     "loginId": "USER1",
    //     "merchantId": null,
    //     "accessToken": authState.token.ACCESS_TOKEN
    //     }
    //   }oadHirarchy({payload})
    //  }
  }, [authState]);

  return (
    <LowLevelRouter history={history} basename={config.basePath}>
      <Switch>
        <Route exact path="/" component={Dummy} />
        <Route exact path={`${config.basePath}auth`} component={Login} />
        <Route exact path={`${config.basePath}test`} component={Test} />
        <Route
          exact
          path={`${config.basePath}sessionout`}
          component={SessionOut}
        />
        {/* <Route exact path={`${config.basePath}payment`} component={Payment} /> */}

        <Route
          exact
          path={`${config.basePath}paymentconfirm`}
          component={PaymentConfirmation}
        />
        <Private
          exact
          path={`${config.basePath}360`}
          component={Partner360}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
             <Private
          exact
          path={`${config.basePath}agent/360`}
          component={Agent360}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}Orders&Requests`}
          component={OrdersRequests}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}PopupTables`}
          component={PopupTable}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}contracts`}
          component={ContractDetails}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}contractsignoff`}
          component={ContractSignOff}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}viewcontract`}
          component={ViewContract}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}payment`}
          component={Payments}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}SuccessPage`}
          component={(renderprops) => (
            <AgentSuccessModal
              {...renderprops}
              fromSuccess={authState?.salesUser}
            />
          )}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}dealer/SuccessPage`}
          component={(renderprops) => (
            <AgentSuccessModal
              {...renderprops}
              fromSuccess={authState?.salesUser}
            />
          )}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}ContractSuccessPage`}
          component={(renderprops) => (
            <AgentContractSuccess
              {...renderprops}
              fromSuccess={authState?.salesUser}
            />
          )}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
            <Private
          exact
          path={`${config.basePath}BulkSuccessPage`}
          component={(renderprops) => (
            <BulkSuccess
              {...renderprops}
              fromSuccess={authState?.salesUser}
            />
          )}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        {/* <Private
        exact
        path = {`${config.basePath}viewcontract`}
        component = {PaymentConfirmation}
        isAuthenticated={authState.authenticated}
        redirectTo="/login"
        callback={validateSession}
        /> */}
        {/* <Private
          exact
          path={`${config.basePath}360`}
          component={Lead360}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        /> */}
        <Private
          exact
          path={config.basePath}
          component={Home}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}resellerForms`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}agentForms`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms1`}
          component={FormFields}
          x
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms2`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms3`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms4`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}hierarchy`}
          component={ManageHierarchy}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}Reports`}
          component={Reports}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}GroupAssignment`}
          component={GroupAssignment}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}forms1`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms2`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}forms3`}
          component={FormFields}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}hierarchy`}
          component={ManageHierarchy}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}settlementRule`}
          component={SettlementRule}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}suspension`}
          component={Suspension}
          isAuthenticated={authState.authenticated}
          redirectTo="/suspension"
          callback={validateSession}
        />
          <Private
          exact
          path={`${config.basePath}manual`}
          component={ManualPage}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}revoke`}
          component={Revoke}
          isAuthenticated={authState.authenticated}
          redirectTo="/revoke"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}BackOffice`}
          component={BackOffice}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}BulkUpload`}
          component={BulkUpload}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private 
          exact
          path={`${config.basePath}UploadFile`}
          component={UploadFile}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}commissionRule`}
          component={CommissionRule}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}settlementapproval`}
          component={SettlementApproval}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}suspenseapproval`}
          component={SuspensionApproval}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}manualapproval`}
          component={manualModal}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}leadapproval`}
          component={LeadApproval}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}revokeapproval`}
          component={RevokeApproval}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />

        <Private
          exact
          path={`${config.basePath}commissionapproval`}
          component={CommissionApproval}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}updateCommissionRule`}
          component={UpdateCommissionRule}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
        <Private
          exact
          path={`${config.basePath}Help`}
          component={Help}
          isAuthenticated={authState.authenticated}
          redirectTo="/login"
          callback={validateSession}
        />
      </Switch>
    </LowLevelRouter>
  );
};

export default connect(
  (state) => ({
    authState: state.auth
  }),
  {
    loadEvents: EventsController.load,
    loadLeads: LeadsController.loadAll,
    loadMasterdata: MasterdataController.load,
    restoreSession: AuthController.restoreSession,
    loadHirarchy: HierarchyController.loadHirarchy,
    loadAccountManagers: UsersController.loadAccountManagers
  }
)(Router);
