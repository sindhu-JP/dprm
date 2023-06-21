import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useSetState, useStateful, useBoolean } from 'react-hanger';
import { useHistory } from 'react-router-dom';
import LeadAPI from 'Http/api/leads';
import LeadUtils from 'lib/utils/lead';
import { Stepper } from 'lib/components';
import LeadsController from 'Controllers/Lead';
import HooksFormWrapper from 'lib/components/HooksFormWrapper';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';
import ModalsStore from 'Store/Modals';
import ValidationSchema from './Schema';

// import ServiceOfInterest from './Sections/ServiceOfInterest';
// import ConsumptionPattern from './Sections/ConsumptionPattern';
// import ReferralInformation from './Sections/ReferralInformation';

// import AdditionalContactWrapper from './Sections/AdditionalContactWrapper';

import LeadFactory from 'Factory/Lead';

const LeadCreation = (props) => {
  const history = useHistory();
  const { state: dropdownOptions, setState: updateOptions } = useSetState({});
  const {
    open,
    onClose,
    masterdata,
    leadsState,
    createLead,
    UpdateLead,
    usersState,
    authState,
    runLeadVerification,
    leadOpen,
    openModal,
    modalState,
    toggleSaveandExit,
    closeModal,
    parent
  } = props;

  const leadId = useStateful('');
  const [companyregNo, setregNo] = React.useState('');
  const [drop, setdrop] = React.useState(false);
  const [formDataCopy, setFormValues] = React.useState(false);

  const [expiryDate, setexpiryDate] = React.useState('');
  const [updateStatus, setUpdatedStatus] = React.useState('LEAD_APPROVAL');
  const validatingcontact = useBoolean(true);

  const userInfo = useSelector((state) => state.hierarchy.userInfo);
  const [Arry, setArry] = React.useState([
    { name: 'Email', code: 'email' },
    { name: 'Whatsapp', code: 'whatsapp' },
    { name: 'SMS', code: 'sms' },
    { name: 'Telegram', code: 'telegram' }
  ]);

  let action = { permission: 'dlpm.lp.lead.v1.approve' };
  const getLeadId = async () => {
    const id = await LeadAPI.nextId().catch((err) => {});
    leadId.setValue(id);
  };

  React.useEffect(() => {
    if (modalState.IsSubmitInSaveAndExitModal) {
      handleSubmit(formDataCopy);
    }
  }, [modalState.IsSubmitInSaveAndExitModal]);

  const handleSubmit = (values, event) => {
    if (validatingcontact.value) {
      if (modalState.IsSaveAndExit && !modalState.IsSubmitInSaveAndExitModal) {
        toggleSaveandExit({ key: 'IsSaveAndExitModalOpen', value: true });
        setFormValues(values);
      } else {
        if (!drop) {
          createLead({
            id: leadId.value,
            data: values,
            parent: parent,
            status: modalState.IsSaveAndExit ? 'LEAD_GENERATION' : updateStatus,
            isSaveAndExit: modalState.IsSaveAndExit
          });
          toggleSaveandExit({
            key: 'IsSubmitInSaveAndExitModal',
            value: false
          });
        } else {
          UpdateLead({
            id: leadOpen?.id,
            data: values,
            status: modalState.IsSaveAndExit ? 'LEAD_GENERATION' : updateStatus,
            isSaveAndExit: modalState.IsSaveAndExit,
            parent: parent
          });
          toggleSaveandExit({
            key: 'IsSubmitInSaveAndExitModal',
            value: false
          });
        }
      }
    }
  };

  React.useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      let data = userInfo?.lob?.split(',');
      updateOptions({
        ...LeadUtils.getLeadFormOptions({
          masterData: masterdata.data,
          leads: leadsState,
          users: usersState,
          user: authState.user,
          hierarchyLob: LeadFactory.makeLobpayload(data)
        })
      });
    } else {
      updateOptions({
        ...LeadUtils.getLeadFormOptions({
          masterData: masterdata.data,
          leads: leadsState,
          users: usersState,
          user: authState.user
        })
      });
    }

    if (LeadFactory.getpermissions(authState?.user, action)) {
      setUpdatedStatus('OPPORTUNITY_CREATION');
    }
  }, [masterdata, leadsState, usersState, userInfo, authState]);

  React.useEffect(() => {
    getLeadId();
    if (leadOpen) {
      setdrop(true);
    }
  }, []);

  React.useEffect(() => {
    if (leadOpen) {
      let objectKeys = Object.keys(
        leadOpen?.primaryContactDetails?.contactMedium
      );

      let data = [...Arry];
      for (var i = 0; i < data.length; i++) {
        data[i].isActive = false;
        for (var j = 0; j < objectKeys.length; j++) {
          if (data[i].code === objectKeys[j]) {
            data[i].isActive = true;
          }
        }
      }
      setArry(data);
    }
  }, [leadOpen]);

  const companyreg = ({ companyName, registrationNumber, payload }) => {
    setregNo(registrationNumber);
  };

  React.useEffect(() => {
    if (leadsState.PreFillData?.companyDetails?.companyRegistrationNumber) {
      setregNo(leadsState.PreFillData.companyDetails.companyRegistrationNumber);
    }
  }, [leadsState]);

  let fields = [];
  let obj = {
    name: 'PARTNER_NAME',
    value: props.data.name,
    editable: false
  };
  fields.push(obj);
  // React.useEffect(() => {
  //   const getPrepopulate = async (formIdentity, Status) => {
  //     await TecnotreedigitalSales.get(
  //       `/formIdentity?formIdentity=${formIdentity}&status=${Status}`
  //     )
  //       .then((resp) => {
  //         setBtnType(resp.data);
  //       })
  //       .catch((error) => {
  //         console.log('Error');
  //       });
  //   };

  //   getPrepopulate(formIdentity, );
  // }, []);

  return (
    <FullScreenDilaog open={open}>
      <HooksFormWrapper
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
      >
        {({ register, errors, control, setValue, reset }) => {
          return (
            <Stepper
              id={leadId.value}
              isSubmitting={leadsState.loading.creating}
              onClose={onClose}
              onClickSaveAndExit={() =>
                toggleSaveandExit({ key: 'IsSaveAndExit', value: true })
              }
              body={() =>
                history.push({
                  pathname: '/digital-prm-web-ui/forms',
                  state: {
                    formIdentity: 'Partner_Profile'
                    // fields: fields,
                    // stepId: 'PartnerProfileCreation',
                    // isFields: true
                  }
                })
              }
            />
          );
        }}
      </HooksFormWrapper>
    </FullScreenDilaog>
  );
};

export default connect(
  (state) => ({
    leadsState: state.leads,
    modalState: state.modals,
    masterdata: state.master,
    usersState: state.users,
    authState: state.auth
  }),
  {
    openModal: ModalsStore.open,
    createLead: LeadsController.create,
    UpdateLead: LeadsController.updateLead,
    runLeadVerification: LeadsController.runLeadVerification,
    closeModal: ModalsStore.close,
    toggleSaveandExit: ModalsStore.toggleSaveandExit
  }
)(LeadCreation);
