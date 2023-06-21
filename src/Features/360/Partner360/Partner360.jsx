import DashBoard360 from 'Features/Layout360/Dashboard360';
import React, { useState } from 'react';
import constant from 'lib/constants/constantview';
import DocumentController from 'Controllers/Documents';
import SimpleTabs from 'Features/360/Partner360/Tabs';
import ContractDetails from 'Features/360/Partner360/ContractDetails/ContractDetails';
import CustomerTickets from 'Features/360/Partner360/CustomerTickets/customerTickets';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Finacial from 'Features/360/Partner360/Financial/Financial';
import RecentRequests from 'Features/360/Partner360/RecentRequests/Requests';
import PartnerDetails from 'Features/360/Partner360/PartnerDetails/PartnerDetails';
import Orders from './Orders/index';
import { Collapse } from '@material-ui/core';
import SuccessModal from 'Components/SuccessModal';
import { useBoolean, useStateful } from 'react-hanger';
import { connect, useDispatch } from 'react-redux';
import DashboardController from 'Controllers/Dashboard';
import Contractpreview from 'Features/Contracts/Contractpreview';
import ModalsStore from 'Store/Modals';
import MytaskDetails from 'Features/TaskDetails/MytaskDetails';
import ProductList from './ProductList';
import TenantList from './TenantList';
import Preview from './Previews/Preview';
import OrderDetails from './OrderDetails/Orderdetails';
import DashboardApi from 'Http/360/Api/Dashboard';
import dashboardApi from 'Http/api/dashboard';
import Wallet from './Financial/Wallet';
import Approval from 'Components/Modals/Approval';
import { Modal } from 'lib/components';
import Paymentview from './Previews/paymentview';
import InvoicePreview from './Previews/InvoicePreview';
import SettlementPreview from './Previews/SettlementPreview';
import BillingAdjustment from './BillingAdjustment';
import InvoiceAdjustment from './BillingAdjustment/InvoiceAdjustment';
import BillingConformation from './BillingAdjustment/BillingConformation';
import ModifyContract from 'Features/ManageHierarchy/ModifyContract';
import AlertActions from 'Store/Alert';
import { Alert } from 'Components';
import PayInvoiceDetails from './Previews/PayInvoiceDetails';
import DigitalProductsList from './DigitalProductsList';
import BottomModalForm from './BottomModalForm';
import DashboardOverviewcontroller from 'Controllers/360/Dashboard';
import OtpVerification from 'Components/Modals/OtpVerification';
import PartnerTicket from 'Features/TroubleTicket/PartnerTickets';
import TroubleTicketController from 'Controllers/TroubleTicket';
import Users from './Users';
import AddProduct from 'Components/Modals/AddProduct';
import AddUser from './Previews/AddUser';
import PartnerRes from 'Factory/PartnerRes';
import CustomerTicket from 'Features/TroubleTicket/CustomerTicket';
import TicketFilter from 'Components/Modals/TicketFilter';
import config from 'config';
import ShareNotification from 'Components/Modals/ShareNotification';
import ShareContract from 'Components/Modals/ShareContract';
import PartnertApi from 'Http/api/Partner';
import PartnerFactory from 'Factory/Partner';
import ContractSignOff from 'Features/Contracts/ContractSignOff';
import Documents from 'Features/360/Partner360/Documents/Documents';
import Documentcontroller from 'Controllers/Documents';
import ReOpenAccount from 'Components/Modals/ReOpenAccount';
// import MasterdataController from 'Controllers/Masterdata';/
import MasterDataController from 'Controllers/Masterdata';
const Partner360 = (props) => {
  const classes = useStyles();
  const [TabsName, setTabname] = useState('');
  const [filterCount, setFilterCount] = useState({});
  const expand = useBoolean(false);
  const dispatch = useDispatch();
  const hideTenant = useBoolean(false);
  const hideProducts = useBoolean(false);
  const getPartnerId = useStateful({});
  const showTabs = useStateful([]);
  const balance = useStateful({});
  const Details = useStateful({});
  const hideTabProducts = useBoolean(false);
  const unsettledAmount = useStateful({});
  const formData = useStateful({});
  const type = useStateful({});
  const [catData, setCatData] = useState({ parentCatData: [], subCatData: [] });
  const handleTabs = (name) => {
    setTabname(name);
  };

  console.log(props, "preossossoss1")
  console.log(props, "asda1");
  const getwalletBal = async (id) => {
    let balc = await dashboardApi.getWalletdetails(id);
    balance.setValue(_.get(balc, '[0]', []));
    if (balc) {
      props.getPaymentlist({ id: _.get(balc, '[0].id', '') });
    }
  };
  // React.useEffect(()=>{

  //   if(!catData?.parentCatData.length){
  // (async ()=>{

  //   const data = await DashboardApi._getParentCategoryDetails().catch(err=>null);
  //   let res=[]
  //   data.length > 0 && data.map(itm=>{
  //     res.push({id:itm.id,title:itm.name})
  //   })
  //   console.log({ data }, 'dropdown data');
  //   setCatData({...catData,parentCatData:res})
  // })();
  //   }
  //   },[])

  const handleCloseModal = (id)=> {
    
   
    props.orderTracking({id: props.location.state?.detail?.mainlist?.partnerId})
   return props.closeModal('OrderDetails')
  }
  const getUnsettlementBal = async (id) => {
    let balc = await dashboardApi._getUnsettlebalance(id);
    unsettledAmount.setValue(balc);
  };
  const getCategoryOptions = async () => {
    const data = await DashboardApi._getParentCategoryDetails().catch(
      (err) => null
    );
    let res = [];
    data.length > 0 &&
      data.map((itm) => {
        res.push({ id: itm.id, title: itm.name });
      });
    setCatData({ ...catData, parentCatData: res });
    // setCat_Loading(false)
    // return [{title:'sample1'},{title:'sample2'}]
  };
  const getSubCategoryOptions = async (id) => {
    let data;
    if (id) {
      data = await DashboardApi._getSubCategoryDetails(id).catch((err) => null);
      let res = [];
      if (data.length > 0) {
        data.map((itm) => res.push({ id: itm.id, title: itm.name }));
      }
      setCatData({ ...catData, subCatData: res });
    }
    // return [{ title: 'sample1' }, { title: 'sample3' }];
  };
  React.useEffect(() => {
    if (props.location?.state?.detail) {
      console.log(props.location?.state?.detail, "menusss")
      props.DynamicMenulist();
      Details.setValue(props.location.state?.detail);
      const { details, mainlist } = props.location.state?.detail;
      if (details?.formIdentity === 'Partner_Profile' || props.location.state?.partnerType === "partner") {
        ///
        //  getUnsettlementBal(details?.PartnerProfileCreation?.PartnerDetails?.Wallet_ID)
        PartnerRes.DynamicMenulist(constant.MenuList);
        // props.DcmProductlist({ id: mainlist.partnerId });
        showTabs.setValue(
          FilterOutOpco(
            PartnerRes.DynamicMenulist(constant.MenuList, 'master'),
            details
          )
        );
        setTabname('PartnerDetails');
        getPartnerId.setValue(mainlist.partnerUid
          );
        hideTenant.setTrue();
       
        getwalletBal(mainlist.partnerUid
          );
        hideProducts.setTrue();
        // props.getproductLists({ id: mainlist.partnerId });
        // props.SearchAddContract({ id: mainlist.partnerId });
        // props.getTenantLists({ id: mainlist.partnerId });
        // props.getproductAll({ id: mainlist.partnerId });
      } else if (details?.formIdentity === 'Tenant_Partner_Profile') {
        // showTabs.setValue(constant.TenantTabs);
        showTabs.setValue(
          FilterOutOpco(
            PartnerRes.DynamicMenulist(constant.MenuList, 'tenant'),
            details
          )
        );
        setTabname('PartnerDetails');
        hideTabProducts.setTrue();
        getwalletBal(mainlist.partnerId);
       
        hideProducts.setTrue();
        getPartnerId.setValue(mainlist.partnerUid);
        // props.SearchAddContract({ id: mainlist.partnerId });
        // props.getproductLists({ id: mainlist.partnerId });
        // props.getproductAll({ id: mainlist.partnerId });
      } else if (details?.formIdentity === 'Add_Product') {
        // hideTenant.setTrue()
        setTabname('PartnerDetails');

        hideTenant.setTrue();
        hideProducts.setTrue();
        getPartnerId.setValue(mainlist.partnerUid);
        // showTabs.setValue(constant.PartnerProduct);

        showTabs.setValue(
          PartnerRes.DynamicMenulist(constant.MenuList, 'products')
        );
        //  // console.log(
        //     PartnerRes.DynamicMenulist(constant.MenuList, 'products'),
        //     'ioioss'
        //   );
        props.SearchAddContract({ id: mainlist.PARTNERID });
        props.orderTracking({ id: mainlist.partnerUid });
      }
    }
    props.getmasterdata();
  }, [props.location]);
  // get

  const handleTaskAction = async (action, partner) => {
    props.openModal({
      id: action.modalId,
      context: {
        data: partner.mytasks,

        row: partner.tasks
      }
    });
  };

  const getReturnedData = () => {
    let updoc = Details.value.details?.PartnerProfileCreation?.UploadDocuments;
    let arr;
    let objData2 = [];
    if (updoc) {
      arr = Object.values(updoc);
      let datas = arr.map((el) => el);

      for (var i = 0; i < datas.length; i++) {
        for (var j = 0; j < datas[i].length; j++) {
          objData2.push(datas[i][j]);
        }
      }
    }
    return objData2;
  };

  const handleShareContract = async (data) => {
    let formValue;
    const formpayload = {
      contractId: data?.CONTRACT_ID,
      productId: '',
      partnerId: data?.Partner_ID
    };

    const base64 = await PartnertApi.genereatepdf(formpayload);

    let payloadpdf = PartnerFactory.getfromdata(base64, data);
    formValue = payloadpdf;
    formData.setValue(payloadpdf);

    props.shareNotification({
      payload: formValue,
      type:
        data?.Partner_ID.substring(0, 2) === 'MP'
          ? 'LINKEDFORM0Z7ZA170'
          : 'LINKEDFORMBO3OUB14',
      id: data?.Partner_ID,
      // data?.Partner_ID.substring(0, 2) == 'MP'
      //   ? data?.Partner_ID
      //   : data?.Partner_ID,
      statustype: 'AddContractFor.ContractInformation.Contract_Shared',
      contractid: data?.CONTRACT_ID
    });
  };

  const handleloadcontracts = async (id) => {
    props.closeModal('ContractSignpreview');
    // await dashboard.UpdateStatus(
    //   id,
    //   'AddContractFor.ContractInformation.Contract_SignOff'
    // );

    // props.closeModal('ContractSignpreview');
    // props.ContractList({
    //   type: type.value.typeof,
    //   id: type.value.id
    // });
  };

  const FilterOutOpco = (data, list) => {
    if (
      list?.PartnerProfileCreation?.PartnerDetails?.PARTNER_TYPE ===
      config?.dev.server?.SMART_SERVICE_PARTNER_TYPE
    ) {
      return _.reject(data, (item) => item.name === 'Products');
    } else {
      return data;
    }
  };

  console.log(props, "props here")

  return (
    <DashBoard360
      expand={expand}
      partnerdetails={Details.value}
      TabsName={TabsName}
      handleTabs={handleTabs}
      hideProducts={hideProducts.value}
      hideTenant={hideTenant.value}
      balance={balance.value}
      user={props.authstate?.user}
      PartnerId={getPartnerId.value}
      // clearStore={()=>dispatch(Partner.clear())}
    >
      {showTabs.value ? (
        <SimpleTabs
          handleTabs={handleTabs}
          dynamictabs={showTabs.value}
          TabsName={TabsName}
          partnerdetails={Details.value}
        />
      ) : (
        ''
      )}
      <Collapse
        in={expand.value}
        timeout="auto"
        unmountOnExit
        style={{ position: 'relative', top: '-5rem', zIndex: 100, bottom: 0 }}
      >
        <Grid container direction="column">
          <Grid item>
            <Box px={2}>
              <Wallet
                radius={0}
                show={true}
                expand={expand}
                balance={balance.value}
              />
            </Box>
          </Grid>
        </Grid>
      </Collapse>

      {/* <TemporaryDrawer expand={expand} />3 */}

      <Box px={3} className={classes.homeContainer}>
        <Box px={3} py={10}>
          {TabsName === 'PartnerDetails' && (
            <PartnerDetails
              partnerdetails={Details.value}
              user={props.authstate.user}
            />
          )}

          {TabsName === 'Users' && (
            <Users
              partnerdetails={Details.value}
              TenentList_user={props.TenentList_user}
              MasterList_user={props.MasterList_user}
              user={props.authstate.user}
              TenantList={props.DashboardDetails.User_Tenantdetails}
              Masterlist={props.DashboardDetails.User_Masterdetails}
              loader={props.DashboardDetails.loading.usersListLoader}
            />
          )}
          {TabsName === 'CustomerTicket' && (
            <CustomerTicket
              user={props.authstate?.user}
              partnerdetails={Details.value}
            />
          )}

          {TabsName === 'Documents' && (
            <Documents
              partnerdetails={Details.value}
              openModal={props.openModal}
              DownloadPreview={props.DownloadPreview}
              downloadContract={props.downloadContract}
              onSearchcontractlist={props.DashboardDetails.onSearchcontractlist}
              constractlist={props.DashboardDetails.addcontractList}
              formData={formData}
              renderTable={getReturnedData}
            />
          )}

          {/* <CustomerTicket/> */}
          {TabsName === 'PartnerTicket' && (
            <PartnerTicket
              partnerdetails={Details.value}
              filterCount={filterCount}
              setFilterCount={setFilterCount}
              _LoadAllPartnerTickets={props._LoadAllPartnerTickets}
              // partnerdetails={Details.value}
              Load_filter_tickets={props.Load_filter_tickets}
              LoadAll_StatusTickets={props.LoadAll_StatusTickets}
              TotallInteractionCount={
                props.DashboardDetails?.TotallInteractionCount
              }
              TotalFilterCount={props.DashboardDetails?.TotalFilterCount
              }
              getCategoryOptions={getCategoryOptions}
              PartnerTicketlist={props.DashboardDetails?.PartnerTicketlist}
              TicketLoader={props.DashboardDetails.loading.TicketLoader}
            />
          )}
          {TabsName === 'Contracts' && (
            <ContractDetails
              partnerdetails={Details.value}
              openModal={props.openModal}
              downloadContract={props.downloadContract}
              onSearchcontractlist={props.DashboardDetails.onSearchcontractlist}
              constractlist={props.DashboardDetails.addcontractList}
              formData={formData}
              SearchAddContract={props.SearchAddContract}
              CommonCount={props.DashboardDetails.tableCount?.CommonCount}
            />
          )}
          {TabsName === 'Customer Feedback' && (
            <CustomerTickets
              partnerdetails={Details.value}
              openModal={props.openModal}
              downloadContract={props.downloadContract}
              onSearchcontractlist={
                props.DashboardDetails.onSearchcustomerTicketList
              }
              constractlist={props.DashboardDetails.customerTicketList}
              formData={formData}
              CustomerTicket={props.CustomerTicket}
              CommonCount={props.DashboardDetails.tableCount?.CommonCount}
              filterCustomerTicket={props.FilterCustomerTicket}
            />
          )}
          {TabsName === 'Financials' ? (
            <Finacial
              balance={balance.value}
              partnerdetails={Details.value}
              openModal={props.openModal}
              getInvoiceDetails={props.getInvoiceDetails}
              Adjustment={props.Adjustment}
              getSettlement={props.getSettlement}
              getTransaction={props.getTransaction}
              user={props.authstate?.user?.sub}
              PaymentDetails={props.DashboardDetails?.transactions}
              InvoiceDetails={props.DashboardDetails?.InvoiceDetails}
              Adjustmentdetails={props.DashboardDetails?.Adjustmentdetails}
              Settlementdetails={props.DashboardDetails?.Settlementdetails}
              getUnsettlementBal={getUnsettlementBal}
              downloadInvoice={props.downloadInvoice}
              shareInvoice={props.shareInvoice}
              WalletBalance={unsettledAmount.value?.unpaidamount}
              generateInvoicelink={props.generateInvoicelink}
              invoiceloader={props.DashboardDetails.loading.payment}
              tableRowCount={props.DashboardDetails.tableCount}
            />
          ) : (
            ''
          )}

          {TabsName === 'Requests' ? (
            <RecentRequests
              user={props.authstate.user}
              getRequestList={props.getRequestList}
              searchRequestList={props.searchRequestList}
              mainlist={Details.value?.mainlist}
              requestTablerow={props.DashboardDetails.requestTablerow}
              onSearchRequestlist={props.DashboardDetails.onSearchRequestlist}
              openModal={props.openModal}
              handleTaskAction={handleTaskAction}
              pendingRequestlist={props.DashboardDetails.pendingRequestlist}
              onSearchPendingRequestlist={
                props.DashboardDetails.onSearchPendingRequestlist
              }
              requestsLoader={props.DashboardDetails.loading.myTaskListLoading}
            />
          ) : (
            ''
          )}

          {TabsName === 'View Orders' && (
            <Orders
            orderList={props.DashboardDetails?.orderList}
            OrderSearchlist={props.DashboardDetails.OrderSearchlist}
            OrderSelfcareComplete={props.OrderSelfcareComplete}
            orderTracking={props.orderTracking}
            manualOrderTracking={props.manualOrderTracking}
            id={props.location.state?.detail.mainlist.partnerId}
            manualOrderList={props.DashboardDetails?.manualOrderList}
            tableRowCount={props.DashboardDetails.tableCount}
            />
          )}

          {TabsName === 'DCM' && (
            <DigitalProductsList
              partnerId={props.location.state?.detail?.mainlist?.partnerId}
              DcmProductlist={props.DcmProductlist}
              orderList={props.DashboardDetails?.DCMorderList}
              OrderSelfcareComplete={props.OrderSelfcareComplete}
            />
          )}
          {TabsName === 'Products' && hideTenant && (
            <ProductList
              partnerdetails={Details.value}
              productrowlist={props.DashboardDetails.productrowlist}
              openModal={props.openModal}
              hideTabProducts={hideTabProducts}
              Allproductrowlist={props.DashboardDetails.Allproductrowlist}
              getProductoverview={props.getProductoverview}
              onSearchproductrowlist={
                props.DashboardDetails.onSearchproductrowlist
              }
              AllonSearchproductrowlist={
                props.DashboardDetails.AllonSearchproductrowlist
              }
              getproductLists={props.getproductLists}
              CommonCount={props.DashboardDetails.tableCount?.CommonCount}
              getproductAll={props.getproductAll}
            />
          )}

          {TabsName === 'Tenants' && hideTenant && (
            <TenantList
              partnerdetails={Details.value}
              openModal={props.openModal}
              TenantsOverview={props.TenantsOverview}
              listOftenents={props.DashboardDetails.listOftenents}
              TenantSearchlist={props.DashboardDetails.TenantSearchlist}
              onSearchlistOftenents={
                props.DashboardDetails.onSearchlistOftenents
              }
              getTenantLists={props.getTenantLists}
              getTenantoverview={props.getTenantoverview}
              CommonCount={props.DashboardDetails.tableCount?.CommonCount}
            />
          )}

          {props.modalState.Contractpreview && (
            <Contractpreview
              open={props.modalState.Contractpreview}
              modalcontext={props.modalState?.context}
              onClose={() => props.closeModal('Contractpreview')}
            />
          )}
          {props.modalState.Preview && (
            <Preview
              open={props.modalState.Preview}
              modalcontext={props.modalState?.context}
              onClose={() => props.closeModal('Preview')}
            />
          )}
          {props.modalState.Paymentview && (
            <Paymentview
              open={props.modalState.Paymentview}
              modalcontext={props.modalState?.context}
              onClose={() => props.closeModal('Paymentview')}
              balance={balance.value}
            />
          )}
          {props.modalState.InvoicePreview && (
            <InvoicePreview
              open={props.modalState.InvoicePreview}
              modalcontext={props.modalState?.context}
              getOrderdetails={props.getOrderdetails}
              InvoicePreviewDetails={
                props.DashboardDetails.InvoicePreviewDetails
              }
              balance={balance.value}
              orderRowdetails={props.DashboardDetails.orderRowdetails}
              OrderProductlist={props.DashboardDetails.OrderProductlist}
              orderPayload={props.DashboardDetails.orderPayload}
              billingAdjustmentRow={props.DashboardDetails.billingAdjustmentRow}
              onClose={() => props.closeModal('InvoicePreview')}
            />
          )}
          {props.modalState.SettlementPreview && (
            <SettlementPreview
              open={props.modalState.SettlementPreview}
              modalcontext={props.modalState?.context}
              onClose={() => props.closeModal('SettlementPreview')}
            />
          )}

          {props.modalState.OrderDetails && (
            <OrderDetails
              open={props.modalState.OrderDetails}
              partnerdetails={Details.value}
              modalcontext={props.modalState?.context}
              onClose={handleCloseModal}
              OrderSelfcareComplete={props.OrderSelfcareComplete}
            />
          )}

          {props.modalState.TaskDetails && (
            <MytaskDetails
              open={props.modalState?.TaskDetails}
              context={props.modalState?.context?.taskdetails}
              onClose={() => props.closeModal('TaskDetails')}
              handleTaskAction={handleTaskAction}
            />
          )}
          {/* <OrderDetails/> */}

          {props.modalState.Approval && (
            <Modal id="Approval">
              {({ context, modalId, close }) => (
                <Approval
                  modalId={'Approval'}
                  user={props.authstate?.user?.sub}
                  onSubmit={props.taskApprove}
                  context={props.modalState.context.data}
                  onCancel={() => props.closeModal('Approval')}
                  loading={props.DashboardDetails.loading.approveLoader}
                />
              )}
            </Modal>
          )}

          {props.modalState.BillingAdjustment && (
            <BillingAdjustment
              open={props.modalState?.BillingAdjustment}
              context={props.modalState?.context}
              onClose={() => props.closeModal('BillingAdjustment')}
              getInvoiceDetails={props.getInvoiceDetails}
              InvoiceDetails={props.DashboardDetails?.InvoiceDetails}
            />
          )}

          {props.modalState.InvoiceAdjustment && (
            <InvoiceAdjustment
              open={props.modalState?.InvoiceAdjustment}
              OnsubmitBilliginAdjustment={props.OnsubmitBilliginAdjustment}
              context={props.modalState?.context}
              onClose={() => props.closeModal('InvoiceAdjustment')}
            />
          )}

          {props.modalState.PayInvoiceDetails && (
            <PayInvoiceDetails
              open={props.modalState?.PayInvoiceDetails}
              modalcontext={props.modalState?.context}
              getOrderdetails={props.getOrderdetails}
              InvoicePreviewDetails={
                props.DashboardDetails.InvoicePreviewDetails
              }
              OnpayInoice={props.OnpayInoice}
              loader={props.DashboardDetails.loading.payInvoice}
              onClose={() => props.closeModal('PayInvoiceDetails')}
            />
          )}

          {props.modalState.InvoiceAdjustment && (
            <InvoiceAdjustment
              open={props.modalState?.InvoiceAdjustment}
              OnsubmitBilliginAdjustment={props.OnsubmitBilliginAdjustment}
              context={props.modalState?.context}
              onClose={() => props.closeModal('InvoiceAdjustment')}
              loading={props.DashboardDetails.loading.billingAdjustment}
            />
          )}
          {props.modalState.BillingConformation && (
            <BillingConformation
              open={props.modalState?.BillingConformation}
              OnsubmitBilliginAdjustment={props.OnsubmitBilliginAdjustment}
              context={props.modalState?.context}
              onClose={() => props.closeModal('BillingConformation')}
            />
          )}

          {props.modalState.ModifyContract && (
            <ModifyContract
              open={props.modalState.ModifyContract}
              modalcontext={props.modalState?.context}
              onClose={() => props.closeModal('ModifyContract')}
            />
          )}
          <Alert
            open={props.alertState.open}
            onClose={props.closeAlert}
            message={props.alertState.message}
            type={props.alertState.type}
          />

          {props.modalState.bottomSheet && (
            <BottomModalForm
              open={props.modalState.bottomSheet}
              id={props.modalState?.context?.id}
              details={props.modalState?.context?.details}
              partnerDetails={props.modalState?.context?.partnerDetails}
              partnerFulldetails={props.modalState?.context?.partnerFulldetails}
              onClose={() => props.closeModal('bottomSheet')}
              docInfo={
                Details.value.details?.PartnerProfileCreation?.UploadDocuments
              }
            />
          )}

          {props.modalState.onReOpenAccountHandle && (
            <Modal id="onReOpenAccountHandle">
              {({ context, modalId, close }) => (
                <ReOpenAccount
                  modalId={'onReOpenAccountHandle'}
                  open={props.modalState.onReOpenAccountHandle}
                  masterData={props.masterdata}
                  getPotentialPartners={props.getPotentialPartners}
                  isThree60={true}
                  context={Details.value?.mainlist}
                  user={props.user}
                  subOpportunity={props.modalState?.leadViewData}
                  // onAction={handleReOpenAccount}
                  onCancel={() => props.closeModal('onReOpenAccountHandle')}
                  // Alertopen={props.Alertopen}
                  // openModal={props.openModal}
                  // onCloseConfirm={() => {
                  //   props.closeModal('onReOpenAccountHandle');
                  //   // props.loadLeads();
                  //   // setLeadViewOpen(false);
                  // }}
                />
              )}
            </Modal>
          )}

          <Modal></Modal>

          {props.modalState.OtpVerification && (
            <Modal id="OtpVerification">
              {({ context, modalId, close }) => (
                <OtpVerification
                  modalId={'OtpVerification'}
                  // user={props.authstate?.user?.sub}
                  // onSubmit={props.taskApprove}
                  VerifyOtp={props.VerifyOtp}
                  context={props.modalState?.formContext}
                  //  loading={props.dashboardData.loading?.VerifyOtpLoader}
                  onCancel={() => props.closeModal('OtpVerification')}
                  loading={props.DashboardDetails.loading.VerifyOtpLoader}
                />
              )}
            </Modal>
          )}
          {props.modalState.AddProduct && (
            <Modal id="AddProduct">
              {({ context, modalId, close }) => (
                <AddProduct
                  modalId={'OtpModal'}
                  user={props.authstate?.user}
                  masterParterDetails={Details.value}
                  // onSubmit={props.VerifyOTP}
                  // partnerid={props.match.params.id}

                  partnerdetails={Details.value}
                  onCancel={() => props.closeModal('AddProduct')}
                  loading={props.DashboardDetails.loading.Deactive}
                />
              )}
            </Modal>
          )}
          {props.modalState.TicketFilter && (
            <Modal id="TicketFilter">
              {({ context, modalId, close }) => (
                <TicketFilter
                  modalId={'TicketFilter'}
                  user={props.authstate?.user}
                  setFilterCount={setFilterCount}
                  masterParterDetails={Details.value}
                  DashboardData={props.DashboardDetails}
                  catData={catData}
                  getCategoryOptions={getCategoryOptions}
                  getSubCategoryOptions={getSubCategoryOptions}
                  // onSubmit={props.VerifyOTP}
                  // partnerid={props.match.params.id}
                  Load_filter_tickets={props.Load_filter_tickets}
                  partnerdetails={Details.value}
                  onCancel={() => props.closeModal('TicketFilter')}
                  loading={props.DashboardDetails.loading.Deactive}
                  sortFilter={true}
                  customFliter={true}
                />
              )}
            </Modal>
          )}

          {props.modalState.ShareNotification && (
            <Modal id="ShareNotification">
              {({ context, modalId, close }) => (
                <ShareNotification
                  modalId={'ShareNotification'}
                  user={props.authstate?.user}
                  masterParterDetails={Details.value}
                  onSubmit={props.shareInvoice}
                  // partnerid={props.match.params.id}
                  partnerdetails={Details.value}
                  context={props.modalState?.context}
                  onCancel={() => props.closeModal('ShareNotification')}
                  loading={props.DashboardDetails.loading.Deactive}
                />
              )}
            </Modal>
          )}

          {props.modalState.AddUser && (
            <AddUser
              open={props.modalState.AddUser}
              partnerdetails={Details.value}
              Add_user={props.Add_user}
              Modify_user={props.Modify_user}
              masterParterDetails={Details.value}
              loading={props.DashboardDetails.loading?.AddUser}
              modalcontext={props.modalState?.context}
              onClose={() => props.closeModal('AddUser')}
            />
          )}

          {props.modalState.ShareContract && (
            <ShareContract
              onClose={() => props.closeModal('ShareContract')}
              modalcontext={props.modalState?.context?.details}
              handleShareContract={handleShareContract}
              downloadpdf={props.downloadpdf}
              loading={props.DashboardDetails.loading?.shareContract}
              // downloadpdf={props.downloadpdf}
            />
          )}

          {props.modalState.ContractSignpreview && (
            <ContractSignOff
              open={props.modalState.ContractSignpreview}
              onClose={() => props.closeModal('ContractSignpreview')}
              modalcontext={props.modalState?.context}
              handleloadcontracts={handleloadcontracts}
            />
          )}
          {props.modalState.SuccessModal && (
            <Modal id="SuccessModal">
              <SuccessModal
                context={props.modalState?.context?.message}
                data={props.modalState?.context?.data}
                successFrom={'Partner_Profile'}
              />
            </Modal>
          )}
          {/* <OtpVerification/> */}
          {/* { props.modalState.DcmSpecification&&
          // <DcmSpecification open ={ props.modalState.DcmSpecification}
          //  id={props.modalState?.context?.id}

          //   details={props.modalState?.context?.details}
          //   partnerDetails={props.modalState?.context?.partnerDetails}
          //   partnerFulldetails={props.modalState?.context?.partnerFulldetails}
          //  onClose={()=>props.closeModal('bottomSheet')}
          // /> } */}

          {/* <DcmSpecification/> */}
        </Box>
      </Box>
      {/* <Box>
        <CopyRightFooter />
      </Box> */}
    </DashBoard360>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  },
  homeContainer: {
    // minHeight: `calc(100vh - ${theme.spacing(50)})`
    height: '56vh',
    paddingBottom: '20px',
    overflowY: 'scroll'
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master,
    alertState: state.alert,
    authstate: state.auth,
    DashboardDetails: state.dashboardData
  }),
  {
    Alertopen: AlertActions.open,
    openModal: ModalsStore.open,
    closeModal: ModalsStore.close,
    closeAlert: AlertActions.close,
    globalSeatch: DashboardController.globalSeatch,
    getproductLists: DashboardController.getproductLists,
    SearchAddContract: DashboardController.SearchAddContract,
    CustomerTicket: DashboardController.CustomerTickets,
    FilterCustomerTicket: DashboardController.FilterCustomerTickets,
    getTenantLists: DashboardController.getTenantLists,
    orderTracking: DashboardController.orderTracking,
    manualOrderTracking: DashboardController.ManualOrderTracking,
    getRequestList: DashboardController.getRequestList,
    searchRequestList: DashboardController.searchRequestList,
    taskApprove: DashboardController.taskApprove,
    getPaymentlist: DashboardController.getPaymentlist,
    getproductAll: DashboardController.getproductAll,
    TenantsOverview: DashboardController.TenantsOverview,
    getTenantoverview: DashboardController.getTenantoverview,
    getProductoverview: DashboardController.getProductoverview,
    getInvoiceDetails: DashboardController.getInvoiceDetails,
    Adjustment: DashboardController.Adjustment,
    getSettlement: DashboardController.getSettlement,
    getTransaction: DashboardController.getTransaction,
    getUnsettlementBal: DashboardController.getUnsettlementBal,
    OnsubmitBilliginAdjustment: DashboardController.OnsubmitBilliginAdjustment,
    getOrderdetails: DashboardController.getOrderdetails,
    downloadInvoice: DocumentController.downloadInvoice,
    shareInvoice: DocumentController.shareInvoice,
    OrderSelfcareComplete: DashboardController.OrderSelfcareComplete,
    generateInvoicelink: DocumentController.generateInvoicelink,
    downloadContract: DashboardController.downloadContract,
    OnpayInoice: DashboardController.OnpayInoice,
    DcmProductlist: DashboardController.DcmProductlist,
    DynamicMenulist: DashboardController.DynamicMenulist,
    VerifyOtp: DashboardController.VerifyOtp,
    _LoadAllPartnerTickets: TroubleTicketController.LoadAll_PartnerTickets,
    LoadAll_StatusTickets: TroubleTicketController.LoadAll_StatusTickets,
    Load_filter_tickets: TroubleTicketController.Load_filter_tickets,
    DownloadPreview: Documentcontroller.DownloadPreview,
    MasterList_user: DashboardOverviewcontroller.MasterList_user,
    TenentList_user: DashboardOverviewcontroller.TenentList_user,
    Add_user: DashboardOverviewcontroller.Add_user,
    Add_user: DashboardOverviewcontroller.Add_user,
    Modify_user: DashboardOverviewcontroller.Modify_user,
    getmasterdata: MasterDataController.getmasterdata,
    downloadpdf: DashboardController.contractLink,
    getPotentialPartners: DashboardController.getPotentialParnterList,
    getResellerPartners: DashboardController.getResellerPartners,
    shareNotification: DashboardController.shareNotification
  }
)(Partner360);
