import React, { useEffect } from 'react';
import './PartnerChart';
import PartnerChart from './PartnerChart';
import PartnerLayout from 'Layouts/Partner';
import ModalsStore from 'Store/Modals';
import './UserHierarchy.scss';
import Contracts from 'Features/Contracts';
import { connect, useDispatch } from 'react-redux';
import DashboardController from 'Controllers/Dashboard';
import Documentcontroller from 'Controllers/Documents';
import Contractpreview from 'Features/Contracts/Contractpreview';
import ContractSignOff from 'Features/Contracts/ContractSignOff';
import ShareContract from 'Components/Modals/ShareContract';
import { useStateful } from 'react-hanger';
import AlertActions from 'Store/Alert';
import Alert from 'Components/Alert';
import { useHistory } from 'react-router';
import ContractPayments from 'Features/Payments/ContractPayments';
import PaymentConformation from 'Components/PaymentConformation';
import FormsCreation from 'Features/ManageHierarchy/FormsCreation';
import ProductList from './ProductList';
import ProductContract from './ProductContract';
import ModifyContract from './ModifyContract';
import Approval from 'Components/Modals/Approval';
import { Modal } from 'lib/components';
import SuccessModal from 'Components/SuccessModal';
import DealerChart from './DealerChart';
const ManageHierarchy = (props) => {
  console.log(props, "properties")
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isRoute, setIsRoute] = React.useState(true);
  const [hierarchy, setHierarchy] = React.useState();
  const history = useHistory();
  const type = useStateful({});
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(Modal.close('leadView'));
  // }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formData = useStateful({});
  const handleloadcontracts = async (id) => {
    // await dashboard.UpdateStatus(
    //   id,
    //   'AddContractFor.ContractInformation.Contract_SignOff'
    // );
    props.closeModal('ContractSignpreview');
    props.PartnerContractsList({
      id: type.value.id
    });
    // props.ContractList({
    //   type: type.value.typeof,
    //   id: type.value.id
    // });
  };

  const handleShareContract = async (data, partnerDetails, productDetails) => {
    // await PartnerApi.executeProcess(payload.makepayloadexecuteProcess(data))
    // await PartnertApi.shareattachment(formData.value);
    const payload = {
      referenceId: data?.AddContractFor?.ContractInformation?.CONTRACT_ID,

      contractId: data?.AddContractFor?.ContractInformation?.cmId || '',
      formType: data?.AddContractFor?.ContractInformation?.PRODUCT_ID
        ? productDetails?.AddProduct?.ProductDetails?.PRODUCT_LOB.concat(
            productDetails?.AddProduct?.ProductDetails?.PRODUCT_TECHNOLOGY
          )
        : partnerDetails?.PartnerProfileCreation?.PartnerDetails?.PARTNER_TYPE.concat(
            partnerDetails?.PartnerProfileCreation?.PartnerDetails?.PARTNER_SUB_TYPE.split(
              /\s/
            ).join('')
          ) ||
          partnerDetails?.TenantProfileCreation?.TenantDetails?.TENANT_PARTNER_TYPE.concat(
            partnerDetails?.TenantProfileCreation?.TenantDetails?.TENANT_PARTNER_SUB_TYPE.split(
              /\s/
            ).join('')
          ),
      emailId:
        partnerDetails?.PartnerProfileCreation?.PrimaryContactDetails
          ?.EMAIL_ID ||
        partnerDetails?.TenantProfileCreation?.PrimaryContactDetails?.EMAIL_ID
    };

    const updateStatus = {
      contractid: data?.AddContractFor?.ContractInformation?.CONTRACT_ID,
      statustype: 'AddContractFor.ContractInformation.Contract_Shared',
      type: type.value.typeof,
      id: type.value.id
    };

    props.SendSdkTOCustomer({
      payload,
      contractid: data?.AddContractFor?.ContractInformation?.CONTRACT_ID,
      statustype: 'AddContractFor.ContractInformation.Contract_Shared',
      type: type.value.typeof,
      id: type.value.id,
      notificationPayload: partnerDetails,
      productDetails: productDetails
    });
  };
  useEffect(() => {
    if (props.location.state?.stepper === false) {
      setIsRoute(false);
    } else {
      setIsRoute(true);
    }
  }, []);

  return (
    <>
      <PartnerLayout activeIndex={1} isRoute={isRoute} partnerId={props.location.state?.partnerId}>
      

      {
        props.location.state?.partnerId?.toString().startsWith("MP") ? <PartnerChart setHierarchy={setHierarchy} hierarchy={hierarchy}   username={props.location.state?.partnerId} /> :  <DealerChart setHierarchy={setHierarchy} hierarchy={hierarchy}   username={props.location.state?.partnerId}/>
      }

    

        {props.modalState.contracts && (
          <Contracts
            loadcontract={props.ContractList}
            PartnerContractsList={props.PartnerContractsList}
            page={page}
            type={type}
            context={props.modalState.context}
            rowsPerPage={rowsPerPage}
            formData={formData}
            onClose={() => props.closeModal('contracts')}
            historypush={() => {
              props.closeModal('contracts');
              history.push('/');
            }}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            list={props?.dashboardData?.contractTablelist}
            tableLoading={props.dashboardData.loading.contractTableloader}
            onSearchContract={props.dashboardData.SearchContractTablelist}
          />
        )}
        {
          <Contractpreview
            open={props.modalState.Contractpreview}
            modalcontext={props.modalState?.context}
            onClose={() => props.closeModal('Contractpreview')}
          />
        }
        {props.modalState.ContractSignpreview && (
          <ContractSignOff
            open={props.modalState.ContractSignpreview}
            onClose={() => props.closeModal('ContractSignpreview')}
            modalcontext={props.modalState?.context} 
            handleloadcontracts={handleloadcontracts}
          />
        )}

        {props.modalState.ShareContract && (
          <ShareContract
            onClose={() => props.closeModal('ShareContract')}
            modalcontext={props.modalState?.context?.details}
            partnerDetails={props.modalState?.context?.partnerDetails}
            handleShareContract={handleShareContract}
            downloadpdf={props.downloadpdf}
            loading={props.dashboardData.loading?.shareContract}
            getProductOverview={props.getProductOverview}
            getproductLists={props.getproductLists}
          />
        )}
        {props.modalState.ContractPayments && (
          <ContractPayments
            open={props.modalState.ContractPayments}
            modalcontext={props.modalState?.context}
            onClose={() => props.closeModal('ContractPayments')}
            historypush={() => {
              props.closeModal('ContractPayments');
              history.push('/');
            }}
          />
        )}

        <Alert
          open={props.alertState.open}
          onClose={props.closeAlert}
          message={props.alertState.message}
          type={props.alertState.type}
        />
        {props.modalState && props.modalState.PaymentConformation && (
          <PaymentConformation
            paymentdetails={props.modalState.context}
            id={props.modalState?.context?.partnerId}
          />
        )}

        {props.modalState.FormsCreation && (
          <FormsCreation
            open={props.modalState.FormsCreation}
            modalcontext={props.modalState?.context}
            onClose={() => props.closeModal('FormsCreation')}
            setHierarchy={setHierarchy}
            DownloadPreview={props.DownloadPreview}
          />
        )}

        {props.modalState.ProductList && (
          <ProductList
            open={props.modalState.ProductList}
            getproductLists={props.getproductLists}
            productrowlist={props.dashboardData.productrowlist}
            modalcontext={props.modalState?.context}
            onClose={() => {
              props.closeModal('ProductList');
            }}
            PendingProdcutrow={props.dashboardData.PendingProdcutrow}
            getPendingProdcutlist={props.getPendingProdcutlist}
            openModal={props.openModal}
            user={props.authstate?.user?.sub}
          />
        )}

        {props.modalState.ProductContract && (
          <ProductContract
            open={props.modalState.ProductContract}
            modalcontext={props.modalState?.context}
            onClose={() => props.closeModal('ProductContract')}
            DownloadPreview={props.DownloadPreview}
          />
        )}
        {props.modalState.ModifyContract && (
          <ModifyContract
            open={props.modalState.ModifyContract}
            modalcontext={props.modalState?.context}
            onClose={() => props.closeModal('ModifyContract')}
          />
        )}
        {props.modalState.Approval && (
          <Modal id="Approval">
            {({ context, modalId, close }) => (
              <Approval
                modalId={'Approval'}
                user={props.authstate?.user?.sub}
                onSubmit={props.taskApprove}
                context={props.modalState.context.data}
                modalContext={props.modalState?.context}
                onCancel={() => props.closeModal('Approval')}
                loading={props.dashboardData.loading.approveLoader}
              />
            )}
          </Modal>
        )}

        {props.modalState.SuccessModal && (
          <Modal id="SuccessModal">
            <SuccessModal
              context={props.modalState?.context?.message}
              data={props.modalState?.context?.data}
              successFrom={'Hierarchy'}
            />
          </Modal>
        )}
      </PartnerLayout>
      {/* <BottomSheetForms /> */}
    </>
  );
};
export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data,
    alertState: state.alert,
    hierarchy: state.hierarchy,
    authstate: state.auth,
    dashboardData: state.dashboardData,
    contractState: state.contracts
  }),
  {
    openModal: ModalsStore.open,
    toggleSaveandExit: ModalsStore.toggleSaveandExit,
    closeModal: ModalsStore.close,
    ContractList: DashboardController.ContractList,
    shareNotification: DashboardController.shareNotification,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    getproductLists: DashboardController.getproductLists,
    downloadpdf: DashboardController.contractLink,
    DownloadPreview: Documentcontroller.DownloadPreview,
    taskApprove: DashboardController.taskApprove,
    getPendingProdcutlist: DashboardController.getPendingProdcutlist,
    SendSdkTOCustomer: DashboardController.SendSdkTOCustomer,
    getProductOverview: DashboardController.ProductsOverview,
    PartnerContractsList: DashboardController.PartnerContractsList
  }
)(ManageHierarchy);
