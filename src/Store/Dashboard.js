import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import DashboardController from 'Controllers/Dashboard';
import bulkUpload from 'Controllers/bulkUpload';
// import PartnerTables from 'Factory/PartnerTables';
import PartnerTable from 'Factory/PartnerTables';
import Partnerlist from 'Factory/Partner';
import _ from 'lodash';
import TroubleTicketController from 'Controllers/TroubleTicket';
const dashboardadapter = createEntityAdapter();
import DashboardControllerview from 'Controllers/360/Dashboard';
import config from 'config';
const dashboardData = createSlice({
  name: 'dashBoardData',
  initialState: dashboardadapter.getInitialState({
    partners: [],
    allNotes: [],
    agentGenerateID: null,
    newregistration: false,
    myTasks: [],
    partnerDetails: {},
    partnerActions: [],
    TenantSections: [],
    PartnerTableCount: '',
    TenantIds: [],
    Tenantentities: {},
    TenantTable: {},
    TenantSearchTable: {},
    PendingProdcutrow: {},
    Opco: config.appTheme,
    LogTicketPartnerDetails: [],
    uploadHistoryTable: {},
    updateHistorySearchTable: {},
    OrderSearchlist: {},
    bulkuploads: {},
    OrderTotallCount: {},
    backOfficeCounts: {},
    LogTicketProductDetails: [],
    manulTaskTotalcount: '',
    showPartner: false,
    DynamicMenuItem: {},
    partnerTable: {},
    SelfcareTable: {},
    SelfcareResellerTable: {},
    SelfCareDealerTable: {},
    partnerSearchTable: {},
    SelfcareSearchTable: {},
    SelfcareResellerSearchTable: {},
    partnerIds: [],
    SelfcareIds: [],
    SelfcareResellerIds: [],
    onSearchproductrowlist: {},
    productrowlist: {},
    Allproductrowlist: {},
    AllonSearchproductrowlist: {},
    partnerentities: {},
    SelfcareEntities: {},
    SelfcareResellerEntities: {},
    partnerSections: [],
    SelfcareSections: [],
    SelfcareResellerSections: [],
    partnerAgentSections: [],
    partnerAgentIds: [],
    partnerAgententities: [],
    partnerAgentTable: [],
    partnerAgentSearchTable: [],
    PartnersearchList: [],
    AgentSearchlist: [],
    TenantSearchlist: [],
    addProductlist: {},
    mytaskIds: [],
    orderIds: [],
    DCMorderIds: [],
    addcontractList: {},
    customerTicketList: {},
    onSearchcontractlist: {},
    onSearchcustomerTicketList: {},
    customerIds: {},
    addcontractlistIds: [],
    listOftenents: {},
    orderList: {},
    manualOrderList: {},
    DCMorderList: {},
    onSearchlistOftenents: {},
    OrderProductlist: [],
    orderPayload: {},
    contractIds: [],
    contractEntities: {},
    contractTablelist: {},
    SearchContractTablelist: {},
    contractsections: [],
    mytaskentities: {},
    mytaskTablerow: {},
    mytaskTablesearchrow: {},
    TenantSearchrow: {},
    requestIds: [],
    requestEntities: {},
    requestTablerow: {},
    pendingRequestlist: {},
    onSearchRequestlist: {},
    onSearchPendingRequestlist: {},
    paymentTablelist: {},
    potentialDealerList: {},
    InvoiceDetails: {},
    Adjustmentdetails: {},
    Settlementdetails: {},
    InvoicePreviewDetails: {},
    transactions: {},
    otpdetails: {},
    orderRowdetails: [],
    billingAdjustmentRow: [],
    updateDashboard: false,
    TotallInteractionCount: '',
    TotalFilterCount: '', 
    PartnerTicketlist: [],
    PartnerTicketItems: {},
    PartnerEntities: [],
    User_Tenantdetails: {},
    User_Masterdetails: {},
    ChickletCount: {},
    SalesSummaryGraph: [],
    WalletBalance: '',
    tabs: 'Home',
    agentValidate: {},
    popupTable:{
      pending:[],
      inprogress:[]
    },
    existAgentData: false,
    errors: {
      partnerListError: '',
      myTaskListError: '',
      partnerActionsError: '',
      executionError: '',
      contractTableerror: '',
      shareContract: '',
      searcherror: '',
      order: '',
      payment: '',
      billingAdjustment: '',
      payInvoice: '',
      MenuItem: '',
      agentValidateLoading: false,
      agentValidateError: '',
      popupTable:'',
    },
    loading: {
      partnerListLoading: false,
      myTaskListLoading: false,
      partnerActionsLoading: false,
      approveLoader: false,
      contractTableloader: false,
      shareContract: false,
      searchloader: false,
      payment: false,
      order: '',
      billingAdjustment: false,
      payInvoice: false,
      workflow: false,
      MenuItem: false,
      VerifyOtpLoader: false,
      AddUser: false,
      TicketLoader: false,
      summaryGraphLoading: false,
      usersListLoader: false,
      popupTable:false,
    },

    tableCount: {
      PartnerCount: '',
      orderCount: '',
      CommonCount: '',
      resellerCount: '',
      selfcareCount: '',
      AgentCount: '',
      transactionCount: 0,
      invoiceCount: 0,
      settlementCount: 0,
      adjustmentCount: 0,
      leadCount: '',
    }
  }),

  reducers: {
    tabChange: (state, { payload }) => {
      state.tabs = payload.value;
    },

    search: (state, { payload }) => {
      if (payload) {
        state.PartnersearchList = payload.context;
        state.TenantSearchlist = payload.context;
      }
    },
    clear: (state, { payload }) => {
      (state.addcontractList = {}),
        (state.listOftenents = {}),
        (state.productrowlist = {});
      state.Allproductrowlist = {};
      state.productrowlist = {};
    },

    partnerSearch: (state, { payload }) => {
      if (payload.id === 'Mytask') {
        state.mytaskTablerow = Partnerlist.filterByvalue(payload);
      } else if (payload.id === 'partner') {
        state.partnerTable = Partnerlist.filterByvalue(payload);
      } else if (payload.id === 'Tenant') {
        state.TenantTable = Partnerlist.filterByvalue(payload);
      } else if (payload.id === 'Orders') {
        if (payload?.value?.length >= 2) {
          state.orderList = Partnerlist.filterByvalue(payload);
        } else {
          state.orderList = payload.context;
        }
      }
    },
    onTableSearch: (state, { payload }) => {
      let data = {
        context: payload?.context?.onSearch,
        value: payload?.context?.value
      };
      if (payload.id === 'Contracts') {
        if (payload?.context?.value?.length >= 2) {
          state.addcontractList = Partnerlist.filterByvalue(data);
        } else {
          state.addcontractList = payload.context.onSearch;
        }
      } else if (payload.id === 'Tenants') {
        if (payload?.context?.value?.length >= 2) {
          state.listOftenents = Partnerlist.filterByvalue(data);
        } else {
          state.listOftenents = payload.context.onSearch;
        }
      } else if (payload.id === 'Products') {
        if (payload?.context?.value?.length >= 2) {
          if (payload?.context?.type === 'ALL') {
            state.Allproductrowlist = Partnerlist.filterByvalue(data);
          }
          if (payload?.context?.type === 'PARTNER') {
            state.productrowlist = Partnerlist.filterByvalue(data);
          }
        } else {
          if (payload?.context?.type === 'ALL') {
            state.Allproductrowlist = payload.context.onSearch;
          }
          if (payload?.context?.type === 'PARTNER') {
            state.productrowlist = payload.context.onSearch;
          }
        }
      } else if (payload.id === 'Requests') {
        if (payload?.context?.value?.length >= 2) {
          if (payload?.context?.type === 'APPROVED') {
            state.requestTablerow = Partnerlist.filterByvalue(data);
          }
          if (payload?.context?.type === 'PENDING') {
            state.pendingRequestlist = Partnerlist.filterByvalue(data);
          }
        } else {
          if (payload?.context?.type === 'APPROVED') {
            state.requestTablerow = payload.context.onSearch;
          }
          if (payload?.context?.type === 'PENDING') {
            state.pendingRequestlist = payload.context.onSearch;
          }
        }
      } else if (payload.id === 'Orders') {
        if (payload?.context?.value?.length >= 2) {
          state.orderList = Partnerlist.filterByvalue(data);
        } else {
          state.orderList = payload.context.onSearch;
        }
      } else if (payload.id === 'Contractlist') {
        if (payload?.context?.value?.length >= 2) {
          state.contractTablelist = Partnerlist.filterByvalue(data);
        } else {
          state.contractTablelist = payload.context.onSearch;
        }
      }
    }
  },
  extraReducers: {
    //   updating potential partner list (pending status)

    //  potential list

        // updating my tasks list (status pending)
        [DashboardController.getUploadHistoryList.pending]: (state, { payload }) => {
          state.loading.myTaskListLoading = true;
          state.errors.myTaskListError = '';
        },
        // updating my tasks list (status success)
        [DashboardController.getUploadHistoryList.fulfilled]: (state, { payload }) => {
          state.myTasks = payload?.data;
          state.manulTaskTotalcount = payload.xcount;
          state.errors.myTaskListError = '';
          state.loading.myTaskListLoading = false;
    
          let taskIds = [];
          let taskrows = {};
          let taskentities = {};
          if (payload) {
            console.log("weqwew: ", payload)
            _.map(payload?.list, (item) => {
              taskIds.push(item.id);
              taskentities[item.id] = item;
              taskrows[item.id] = PartnerTable.makeHistoryRows(item);
              console.log("adqweqwe")
            });


          }
    
          (state.mytaskIds = taskIds),
            (state.mytaskentitie = taskentities),
            (state.mytaskTablerow = taskrows);
            state.uploadHistoryTable = taskrows;
            state.updateHistorySearchTable = taskrows;
        },
    
        // updating my tasks list (status failure)
        [DashboardController.getUploadHistoryList.rejected]: (state, { error }) => {
          state.errors.myTaskListError = error.message;
          state.loading.myTaskListLoading = false;
          state.uploadHistoryTable = [];
        },
    

    // [DashboardController.getUploadHistoryList.pending]: (
    //   state,
    //   { payload }
    // ) => {
    //   state.loading.partnerListLoading = true;
    //   state.errors.partnerListError = '';
    //   // state.tableCount.PartnerCount=''
    // },

    // //   updating potential partner list (rejected status)
    // [DashboardController.getUploadHistoryList.rejected]: (
    //   state,
    //   { error }
    // ) => {
    //   state.loading.partnerListLoading = false;
    //   state.errors.partnerListError = error.message;
    //   state.uploadHistoryTable = [];
    // },
    // //   updating potential partner list (success status)
    // [DashboardController.getUploadHistoryList.fulfilled]: (
    //   state,
    //   { payload }
    // ) => {
    //   console.log("SDWEQE: ", payload)
    //   state.loading.partnerListLoading = false;
    //   state.errors.partnerListError = '';
    //   state.partners = payload?.list;
    //   state.updateDashboard = false;
    //   state.tableCount.PartnerCount = payload?.xCount;
    //   let ids = [];
    //   let rows = {};
    //   let entities = {};
    //   let sections = [];
    //   if (payload?.list) {
    //     _.map(payload.list, (item) => {
    //       // ids.push(item[item?.steps[0]]['PartnerDetails']['Partner_ID']);
    //       // if (sections.length === 0) {
    //       //   sections.push(...item[item?.steps[0]].sections);
    //       // }
    //       // entities[item[item.steps[0]]['PartnerDetails']['Partner_ID']] = item;
    //       // rows[item[item.steps[0]]['PartnerDetails']['Partner_ID']] =
    //       //   uploadHistoryTable.makeTablerows(item);
    //       rows[item['_id']] = PartnerTable.makeTablerows(item);
    //     });

    //     (state.partnerSections = sections),
    //       (state.partnerIds = ids),
    //       (state.partnerentities = entities);
    //     state.uploadHistoryTable = rows;
    //     state.updateHistorySearchTable = rows;
    //   }
    // },

    [DashboardController.getPotentialParnterList.pending]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
      // state.tableCount.PartnerCount=''
    },

    //   updating potential partner list (rejected status)
    [DashboardController.getPotentialParnterList.rejected]: (
      state,
      { error }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
      state.partnerTable = [];
    },
    //   updating potential partner list (success status)
    [DashboardController.getPotentialParnterList.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload?.list;
      state.updateDashboard = false;
      state.tableCount.PartnerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload.list, (item) => {
          ids.push(item[item?.steps[0]]['PartnerDetails']['Partner_ID']);
          if (sections.length === 0) {
            sections.push(...item[item?.steps[0]].sections);
          }
          entities[item[item.steps[0]]['PartnerDetails']['Partner_ID']] = item;
          rows[item[item.steps[0]]['PartnerDetails']['Partner_ID']] =
            PartnerTable.makeTablerows(item);
        });

        (state.partnerSections = sections),
          (state.partnerIds = ids),
          (state.partnerentities = entities);
        state.partnerTable = rows;
        state.partnerSearchTable = rows;
      }
    },

    [DashboardController.FilterByPartner.pending]: (state, { payload }) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
      // state.tableCount.PartnerCount=''
    },

    //   updating potential partner list (rejected status)
    [DashboardController.FilterByPartner.rejected]: (state, { error }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [DashboardController.FilterByPartner.fulfilled]: (state, { payload }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload?.list;
      state.updateDashboard = false;
      state.tableCount.PartnerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload.list, (item) => {
          ids.push(item[item?.steps[0]]['PartnerDetails']['Partner_ID']);
          if (sections.length === 0) {
            sections.push(...item[item?.steps[0]].sections);
          }
          entities[item[item.steps[0]]['PartnerDetails']['Partner_ID']] = item;
          rows[item[item.steps[0]]['PartnerDetails']['Partner_ID']] =
            PartnerTable.makeTablerows(item);
        });

        (state.partnerSections = sections),
          (state.partnerIds = ids),
          (state.partnerentities = entities);
        state.partnerTable = rows;
        state.partnerSearchTable = rows;
      }
    },

    [DashboardController.GetselfCareEnrolmentList.pending]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
    },

    //   updating potential partner list (rejected status)
    [DashboardController.GetselfCareEnrolmentList.rejected]: (
      state,
      { error }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [DashboardController.GetselfCareEnrolmentList.fulfilled]: (
      state,
      { payload }
    ) => {
      // console.log(payload, ";paylodaselfff")
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload?.list;
      state.tableCount.selfcareCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item?.PartnerProfileCreation?.PartnerDetails?.Partner_ID);
          if (sections.length === 0) {
            console.log(item, "gerttt")
            sections.push(...item.PartnerProfileCreation?.sections);
          }

          entities[item.PartnerProfileCreation.PartnerDetails.Partner_ID] =
            item;
          rows[item.PartnerProfileCreation.PartnerDetails.Partner_ID] =
            PartnerTable.SelfcareTablerows(item);
        });
      }
      (state.SelfcareSections = sections),
        (state.SelfcareIds = ids),
        (state.SelfcareEntities = entities);
      state.SelfcareTable = rows;
      state.SelfcareSearchTable = rows;
    },

     //   updating AgentResllr potential partner list (rejected status)
     [DashboardController.getResellerPartners.rejected]: (
      state,
      { error }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
      state.partnerTable = [];
    },
    //   updating AgentResllr potential partner list (success status)
    [DashboardController.getResellerPartners.fulfilled]: (
      state,
      { payload }
    ) => { 
      state.tableCount.resellerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          console.log(item, "rowsitem")
          ids.push(item.ResellerProfileCreation.AgentDetails?.Agent_ID
          );
          if (sections.length === 0) {
            console.log(item, "gerttt")
            sections.push(...item.ResellerProfileCreation?.sections
            );
          }
            

          entities[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          ] =
            item;
          rows[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          ] =
            PartnerTable.SelfcareResellerTablerows(item);
        });
      }

        
      (state.SelfcareResellerSections = sections),
        (state.SelfcareResellerIds = ids),
        (state.SelfcareResellerEntities = entities);
      state.SelfcareResellerTable = rows;
      state.SelfcareResellerSearchTable = rows;
      
    },

    [DashboardController.getPotentialDealer.fulfilled]: (
      state,
      { payload }
    ) => { 
      console.log(payload, "payloaddealer")
      state.tableCount.resellerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item?.partnerId
          );
          // if (sections.length === 0) {
          //   console.log(item, "gerttt")
          //   sections.push(...item.ResellerProfileCreation?.sections
          //   );
          // }
            

          entities[item.partnerId
          ] =
            item;
          rows[item.partnerId
          ] =
            PartnerTable.ResellerDealerTbale(item);
        });
      }

      //  console.log(rows, "rows")
      (state.SelfcareResellerSections = sections),
        (state.SelfcareResellerIds = ids),
        (state.SelfcareResellerEntities = entities);
      state.potentialDealerList = rows;
      state.SelfcareResellerSearchTable = rows;
      
    }, 
     //   updating AgentResllr potential partner list (rejected status)
     [DashboardController.FilterByAgent.rejected]: (
      state,
      { error }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
      state.partnerTable = [];
    },
    //   updating AgentResllr potential partner list (success status)
    [DashboardController.FilterByAgent.fulfilled]: (
      state,
      { payload }
    ) => { 
      state.tableCount.resellerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item?.ResellerProfileCreation?.AgentDetails?.Agent_ID
          );
          if (sections.length === 0) {
            console.log(item, "gerttt")
            sections.push(...item.ResellerProfileCreation?.sections
            );
          }
            

          entities[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          ] =
            item;
          rows[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          ] =
            PartnerTable.SelfcareResellerTablerows(item);
        });
      }

      //  console.log(rows, "rows")
      (state.SelfcareResellerSections = sections),
        (state.SelfcareResellerIds = ids),
        (state.SelfcareResellerEntities = entities);
      state.SelfcareResellerTable = rows;
      state.SelfcareResellerSearchTable = rows;
      
    },

    [DashboardController.FilterByDealer.fulfilled]: (
      state,
      { payload }
    ) => { 
      state.tableCount.resellerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item?.partnerId
          );
          if (sections.length === 0) {
            console.log(item, "gerttt")
            sections.push(...item.ResellerProfileCreation?.sections
            );
          }
            

          entities[item?.partnerId
          ] =
            item;
          rows[item?.partnerId
          ] =
            PartnerTable.ResellerDealerTbale(item);
        });
      }

      //  console.log(rows, "rows")
      (state.SelfcareResellerSections = sections),
        (state.SelfcareResellerIds = ids),
        (state.SelfcareResellerEntities = entities);
      state.SelfcareResellerTable = rows;
      state.SelfcareResellerSearchTable = rows;
      
    }, 
     //   updating Agent-Leads  (rejected status)
     [DashboardController.getPartnerLead.pending]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
      // state.tableCount.PartnerCount=''
    },

    //   updating potential partner list (rejected status)
    [DashboardController.getPartnerLead.rejected]: (
      state,
      { error }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
      state.partnerTable = [];
    },
    //   updating potential partner list (success status)
    [DashboardController.getPartnerLead.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload?.list;
      state.updateDashboard = false;
      state.tableCount.leadCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload.list, (item) => {
          ids.push(item[item?.steps[0]]['PartnerDetails']['Partner_ID']);
          if (sections.length === 0) {
            sections.push(...item[item?.steps[0]].sections);
          }
          entities[item[item.steps[0]]['PartnerDetails']['Partner_ID']] = item;
          rows[item[item.steps[0]]['PartnerDetails']['Partner_ID']] =
            PartnerTable.makeTablerows(item);
        });

        (state.partnerSections = sections),
          (state.partnerIds = ids),
          (state.partnerentities = entities);
        state.partnerTable = rows;
        state.partnerSearchTable = rows;
      }
    },

    //   updating Agent-Leads  (rejected status)
    //  [DashboardController.FilterByPartner.rejected]: (
    //   state,
    //   { error }
    // ) => {
    //   state.loading.partnerListLoading = false;
    //   state.errors.partnerListError = error.message;
    //   state.partnerTable = [];
    // },


    //   updating Agent-Leads  (success status)
    // [DashboardController.FilterByPartner.fulfilled]: (
    //   state,
    //   { payload }
    // ) => { 
    //   state.tableCount.resellerCount = payload?.xCount;
    //   state.loading.partnerListLoading = false;
    //   let ids = [];
    //   let rows = {};
    //   let entities = {};
    //   let sections = [];
    //   if (payload?.list) {
    //     _.map(payload?.list, (item) => {
    //       ids.push(item?.ResellerProfileCreation?.AgentDetails?.Agent_ID
    //       );
    //       if (sections.length === 0) {
    //         console.log(item, "gerttt")
    //         sections.push(...item.ResellerProfileCreation?.sections
    //         );
    //       }
            

    //       entities[item.ResellerProfileCreation.AgentDetails?.Agent_ID
    //       ] =
    //         item;
    //       rows[item.ResellerProfileCreation.AgentDetails?.Agent_ID
    //       ] =
    //         PartnerTable.SelfcareResellerTablerows(item);
    //     });
    //   }

    //   (state.SelfcareResellerSections = sections),
    //     (state.SelfcareResellerIds = ids),
    //     (state.SelfcareResellerEntities = entities);
    //   state.SelfcareResellerTable = rows;
    //   state.SelfcareResellerSearchTable = rows;
      
    // }, 

    [bulkUpload.getBulkUpload.fulfilled]: (
      state,
      { payload }
    ) => { 
     
      // state.tableCount.uploadCount= payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {

          state.bulkuploads = item;

          // ids.push(item?.ResellerProfileCreation?.AgentDetails?.Agent_ID
          // );
          // if (sections.length === 0) {
          //   console.log(item, "gerttt")
          //   sections.push(...item.ResellerProfileCreation?.sections
          //   );
          // }
            

          // entities[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          // ] =
          //   item;
          // rows[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          // ] =
          //   PartnerTable.SelfcareResellerTablerows(item);
        });
      }

      //  console.log(rows, "rows")
      // (state.SelfcareResellerSections = sections),
      //   (state.SelfcareResellerIds = ids),
      //   (state.SelfcareResellerEntities = entities);
      // state.SelfcareResellerTable = rows;
      // state.SelfcareResellerSearchTable = rows;
      
    }, 
   

    // #Resellar
    [DashboardController.GetSelfCareResellerEnrollmentList.pending]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
    },

    //   updating potential partner list (rejected status)
    [DashboardController.GetSelfCareResellerEnrollmentList.rejected]: (
      state,
      { error }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [DashboardController.GetSelfCareResellerEnrollmentList.fulfilled]: (
      state,
      { payload }
    ) => {
      console.log(payload.list, "paylocvdappuuuu")
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload?.list;
      state.updateDashboard = false;
      state.tableCount.resellerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item?.ResellerProfileCreation?.AgentDetails?.Agent_ID
          );
          if (sections.length === 0) {
            console.log(item, "gerttt")
            sections.push(...item.ResellerProfileCreation?.Agent_ID
            );
          }

          entities[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          ] =
            item;
          rows[item.ResellerProfileCreation.AgentDetails?.Agent_ID
          ] =
            PartnerTable.SelfcareResellerTablerows(item);
        });
      }
      (state.SelfcareResellerSections = sections),
        (state.SelfcareResellerIds = ids),
        (state.SelfcareResellerEntities = entities);
      state.SelfcareResellerTable = rows;
      state.SelfcareResellerSearchTable = rows;
    },
      [DashboardController.GetSelfCareResellerEnrollmentList.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload?.list;
      state.updateDashboard = false;

      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        console.log("payeeee", payload)
        _.map(payload?.list, (item) => {
          ids.push(item?.ResellerProfileCreation?.AgentDetails?.Agent_ID);
          if (sections.length === 0) {
            console.log(item, "gerttt")
            sections.push(...item.ResellerProfileCreation?.sections);
          }

          entities[item.ResellerProfileCreation.AgentDetails.Agent_ID] =
            item;
          rows[item.ResellerProfileCreation.AgentDetails.Agent_ID] =
            PartnerTable.SelfcareResellerTablerows(item);
        });
      }
      (state.SelfcareResellerSections = sections),
        (state.SelfcareResellerIds = ids),
        (state.SelfcareResellerEntities = entities);
      state.SelfcareResellerTable = rows;
      state.SelfcareResellerSearchTable = rows;
    },


    // tenants

    [DashboardController.getTenantsList.pending]: (state, { payload }) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
      // state.tableCount.PartnerCount=''
    },

    //   updating potential partner list (rejected status)
    [DashboardController.getTenantsList.rejected]: (state, { error }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
      state.TenantTable = [];
    },
    //   updating potential partner list (success status)
    [DashboardController.getTenantsList.fulfilled]: (state, { payload }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload;
      state.updateDashboard = false;
      state.tableCount.PartnerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item.TenantProfileCreation?.TenantDetails?.TENANT_ID);
          if (sections.length === 0) {
            sections.push(...item.TenantProfileCreation.sections);
          }

          entities[item.TenantProfileCreation?.TenantDetails?.TENANT_ID] = item;
          rows[item.TenantProfileCreation?.TenantDetails?.TENANT_ID] =
            PartnerTable.makeTenantTablerows(item);
        });
      }
      (state.TenantSections = sections),
        (state.TenantIds = ids),
        (state.Tenantentities = entities);
      state.TenantTable = rows;
      state.TenantSearchTable = rows;
    },

    [DashboardController.FilterByTenant.pending]: (state, { payload }) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
      // state.tableCount.PartnerCount=''
    },

    //   updating potential partner list (rejected status)
    [DashboardController.FilterByTenant.rejected]: (state, { error }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [DashboardController.FilterByTenant.fulfilled]: (state, { payload }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload;
      state.updateDashboard = false;
      state.tableCount.PartnerCount = payload?.xCount;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item.TenantProfileCreation?.TenantDetails?.TENANT_ID);
          if (sections.length === 0) {
            sections.push(...item.TenantProfileCreation.sections);
          }
          entities[item.TenantProfileCreation?.TenantDetails?.TENANT_ID] = item;
          rows[item.TenantProfileCreation?.TenantDetails?.TENANT_ID] =
            PartnerTable.makeTenantTablerows(item);
        });
      }
      (state.TenantSections = sections),
        (state.TenantIds = ids),
        (state.Tenantentities = entities);
      state.TenantTable = rows;
      state.TenantSearchTable = rows;
    },

    // PartnerFilterByvalue

    [DashboardController.PartnerFilterByvalue.pending]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = true;
      state.errors.partnerListError = '';
    },

    //   updating potential partner list (rejected status)
    [DashboardController.PartnerFilterByvalue.rejected]: (state, { error }) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [DashboardController.PartnerFilterByvalue.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.partnerListLoading = false;
      state.errors.partnerListError = '';
      state.partners = payload;
      state.updateDashboard = false;

      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      if (payload) {
        _.map(payload, (item) => {
          ids.push(item.PartnerProfileCreation.PartnerDetails.Partner_ID);
          if (sections.length === 0) {
            sections.push(...item.PartnerProfileCreation.sections);
          }

          entities[item.PartnerProfileCreation.PartnerDetails.Partner_ID] =
            item;
          rows[item.PartnerProfileCreation.PartnerDetails.Partner_ID] =
            PartnerTable.makeTablerows(item);
        });
      }
      (state.partnerSections = sections),
        (state.partnerIds = ids),
        (state.partnerentities = entities);
      state.partnerTable = rows;
      state.partnerSearchTable = rows;
    },

    //   Task list

    // updating my tasks list (status pending)
    [DashboardController.getMyTaskLIst.pending]: (state, { payload }) => {
      state.loading.myTaskListLoading = true;
      state.errors.myTaskListError = '';
    },
    // updating my tasks list (status success)
    [DashboardController.getMyTaskLIst.fulfilled]: (state, { payload }) => {
      state.myTasks = payload?.data;
      state.manulTaskTotalcount = payload.xcount;
      state.errors.myTaskListError = '';
      state.loading.myTaskListLoading = false;

      let taskIds = [];
      let taskrows = {};
      let taskentities = {};
      if (payload) {
        console.log("weqwew: ", payload)
        _.map(payload?.data, (item) => {
          taskIds.push(item.id);
          taskentities[item.id] = item;
          taskrows[item.id] = PartnerTable.makeTaskrows(item);
        });
      }

      (state.mytaskIds = taskIds),
        (state.mytaskentitie = taskentities),
        (state.mytaskTablerow = taskrows);
      state.mytaskTablesearchrow = taskrows;
    },

    // updating my tasks list (status failure)
    [DashboardController.getMyTaskLIst.rejected]: (state, { error }) => {
      state.errors.myTaskListError = error.message;
      state.loading.myTaskListLoading = false;
    },

    //  search Filter List (mytask)

    [DashboardController.filterMyTask.pending]: (state, { payload }) => {
      state.loading.myTaskListLoading = true;
      state.errors.myTaskListError = '';
    },
    // updating my tasks list (status success)
    [DashboardController.filterMyTask.fulfilled]: (state, { payload }) => {
      state.myTasks = payload.data;
      state.errors.myTaskListError = '';
      state.loading.myTaskListLoading = false;
      state.manulTaskTotalcount = payload.xcount;
      let taskIds = [];
      let taskrows = {};
      let taskentities = {};
      if (payload) {
        _.map(payload?.data, (item) => {
          taskIds.push(item.id);
          taskentities[item.id] = item;
          taskrows[item.id] = PartnerTable.makeTaskrows(item);
        });
      }

      (state.mytaskIds = taskIds),
        (state.mytaskentitie = taskentities),
        (state.mytaskTablerow = taskrows);
      state.mytaskTablesearchrow = taskrows;
    },

    // updating my tasks list (status failure)
    [DashboardController.filterMyTask.rejected]: (state, { error }) => {
      state.errors.myTaskListError = error.message;
      state.loading.myTaskListLoading = false;
    },

    //  show Partener dailog

    // update partner dialog (status success)
    [DashboardController.showPartnerDialog.fulfilled]: (
      state,
      { payload = {} }
    ) => {
      state.showPartner = true;
      state.partnerDetails = payload.payload;
    },
    [DashboardController.showPartnerDialog.pending]: (state, { payload }) => {
      state.showPartner = false;
      //   state.partnerDetails = payload;
    },
    [DashboardController.showPartnerDialog.rejected]: (state, { payload }) => {
      state.showPartner = false;
      //   state.partnerDetails = payload;
    },

    [DashboardController.hidePartnerDialog.fulfilled]: (state, { payload }) => {
      state.showPartner = false;
      state.partnerDetails = payload;
    },
    // get action types for partner (pending status)
    [DashboardController.getPartnerActions.pending]: (state, { payload }) => {
      state.partnerAction = [];
      state.loading.partnerActionsLoading = true;
      state.errors.partnerActionsError = '';
    },
    // get action types for partner (success status)
    [DashboardController.getPartnerActions.fulfilled]: (state, { payload }) => {
      state.loading.partnerActionsLoading = false;
      state.errors.partnerActionsError = '';
      state.partnerActions = payload;
      //     {'name':'raghaba'},
      //     {'name':'reddy'},

      // ]
    },
    // get action types for partner (rejected status)
    [DashboardController.getPartnerActions.rejected]: (state, { error }) => {
      state.loading.partnerActionsLoading = false;
      state.errors.partnerActionsError = error.message;
    },
    //   get partner workflow execution response (pending status)
    [DashboardController.taskApprove.pending]: (state, { payload }) => {
      state.loading.approveLoader = true;
      state.errors.executionError = '';
    },
    //   get partner workflow execution response (fullfilled status)
    [DashboardController.taskApprove.fulfilled]: (state, { payload }) => {
      // state.updateDashboard = true;
      state.loading.approveLoader = false;
      state.errors.executionError = '';

      // (state.mytaskIds = taskIds),
      (state.mytaskentitie[payload.id] = payload),
        (state.mytaskTablerow[payload.id] = PartnerTable.makeTaskrows(payload));
      state.requestTablerow[payload.id] =
        PartnerTable.makeRequestTablerows(payload);
    },
    //   get partner workflow execution response (rejected status)
    [DashboardController.taskApprove.rejected]: (state, { error }) => {
      state.loading.contractTableloader = false;
      state.errors.contractTableerror = error.message;
    },

    [DashboardController.ContractList.pending]: (state, { payload }) => {
      // state.loading.contractTableloader = true;
      state.errors.contractTableerror = '';
      // state.contractTablelist = {};
    },
    //   get partner workflow execution response (fullfilled status)
    [DashboardController.ContractList.fulfilled]: (state, { payload }) => {
      let ids = [];
      let partnerIds = [];
      let entities = {};
      let rowlist = {};

      if (!_.isEmpty(payload[0])) {
        payload[0].rowList.map((rowitem) => {
          let obj = {};
          payload[0][rowitem].forEach((item) => {
            obj = { ...obj, ...item };
            if (item.CONTRACT_ID) {
              partnerIds.push(item.Partner_ID);
              ids.push(item.CONTRACT_ID);
              entities[item.CONTRACT_ID] = item;
            }
          });
          rowlist[obj.CONTRACT_ID] = PartnerTable.makecontractTable(obj);
        });
      }

      (state.contractIds = ids), (state.contractEntities = entities);
      // state.contractTablelist = rowlist;
      // state.SearchContractTablelist = rowlist;
      // state.loading.contractTableloader = false;
    },
    //   get partner workflow execution response (rejected status)
    [DashboardController.ContractList.rejected]: (state, { error }) => {
      state.loading.approveLoader = false;
      state.errors.executionError = error.message;
      // state.loading.contractTableloader = false;
    },

    [DashboardController.PartnerContractsList.pending]: (
      state,
      { payload }
    ) => {
      state.loading.contractTableloader = true;
      state.errors.contractTableerror = '';
      state.contractTablelist = {};
    },
    //   get partner workflow execution response (fullfilled status)
    [DashboardController.PartnerContractsList.fulfilled]: (
      state,
      { payload }
    ) => {
      let ids = [];
      let partnerIds = [];
      let entities = {};
      let rowlist = {};
      let addcontractIds = [];

      if (payload?.list) {
        _.map(payload?.list, (item) => {
          addcontractIds.push(
            item.AddContractFor.ContractInformation?.CONTRACT_ID
          );
          rowlist[item.AddContractFor.ContractInformation.CONTRACT_ID] =
            PartnerTable.makecontractTable(item);
        });
      }

      state.tableCount.CommonCount = payload?.xCount;
      state.contractIds = addcontractIds;
      state.contractTablelist = rowlist;
      state.SearchContractTablelist = rowlist;
      state.loading.contractTableloader = false;
    },

    //   get partner workflow execution response (rejected status)
    [DashboardController.PartnerContractsList.rejected]: (state, { error }) => {
      state.loading.approveLoader = false;
      state.errors.executionError = error.message;
      state.loading.contractTableloader = false;
    },

    [DashboardController.shareNotification.pending]: (state, { payload }) => {
      state.loading.shareContract = true;
      state.errors.shareContract = '';
    },
    [DashboardController.shareNotification.fulfilled]: (state, { payload }) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdata
    },
    [DashboardController.shareNotification.rejected]: (state, { error }) => {
      state.loading.shareContract = false;
      state.errors.shareContract = error.message;
    },

    [DashboardController.globalSeatch.pending]: (state, { payload }) => {
      state.loading.searchloader = true;
      state.errors.searcherror = '';
    },
    [DashboardController.globalSeatch.fulfilled]: (state, { payload }) => {
      state.loading.searchloader = false;
      if (payload) {
        let partnerList = {};
        let Tenantlist = {};
        let productlist = {};
        let agentList = {}

        payload.map((item) => {
          if (item.formIdentity === 'Partner_Profile') {
            partnerList[item.PartnerProfileCreation.PartnerDetails.Partner_ID] =
              Partnerlist.makesearchList(item);
          } else if (item.formIdentity === 'Tenant_Partner_Profile') {
            Tenantlist[item.TenantProfileCreation.TenantDetails.TENANT_ID] =
              Partnerlist.makeTenantsearchList(item);
          } else if (item.formIdentity === 'Add_Product') {
            productlist[item.AddProduct.ProductDetails.PRODUCT_ID] =
              Partnerlist.makeproductsearchList(item);
          }
          else if (item.formIdentity === 'Dealers') {
            agentList[item.ResellerProfileCreation.DealerDetails.Agent_ID] =
            Partnerlist.makeagentsearchList(item);
          }
        });

        (state.PartnersearchList = partnerList),
          (state.TenantSearchlist = Tenantlist);
          (state.AgentSearchlist = agentList);
        state.addProductlist = productlist;
      }

      // state.quoteDetailsdata = payload.resdata
    },
    [DashboardController.globalSeatch.rejected]: (state, { error }) => {
      state.loading.searchloader = false;
      state.errors.searcherror = error.message;
    },

    [DashboardController.Onsearch_LogTicket.pending]: (state, { payload }) => {
      state.loading.searchloader = true;
      state.errors.searcherror = '';
    },
    [DashboardController.Onsearch_LogTicket.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.searchloader = false;
      if (payload) {
        let partnerList = [];

        payload.map((item) => {
          if (item.formIdentity === 'Partner_Profile') {
            partnerList.push(Partnerlist.makePartnerlist(item));
          } else if (item.formIdentity === 'Tenant_Partner_Profile') {
            partnerList.push(Partnerlist.makeTenantlist(item));
          }
        });

        state.LogTicketPartnerDetails = partnerList;
      }

      // state.quoteDetailsdata = payload.resdata
    },
    [DashboardController.Onsearch_LogTicket.rejected]: (state, { error }) => {
      state.loading.searchloader = false;
      state.errors.searcherror = error.message;
    },

    [DashboardController.PartnerProducts_LogTicket.pending]: (
      state,
      { payload }
    ) => {
      state.loading.searchloader = true;
      state.errors.searcherror = '';
      state.LogTicketProductDetails = [];
    },
    [DashboardController.PartnerProducts_LogTicket.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.searchloader = false;
      if (payload) {
        let productlist = [];

        payload.map((item) => {
          if (item.formIdentity === 'Add_Product') {
            productlist.push(Partnerlist.makeProductlistView(item));
          }
        });

        state.LogTicketProductDetails = productlist;
      }

      // state.quoteDetailsdata = payload.resdata
    },
    [DashboardController.PartnerProducts_LogTicket.rejected]: (
      state,
      { error }
    ) => {
      state.loading.searchloader = false;
      state.errors.searcherror = error.message;
    },

    // OVerview

    [DashboardController.TenantsOverview.pending]: (state, { payload }) => {
      state.loading.searchloader = true;
      state.errors.searcherror = '';
      state.TenantSearchlist = {};
    },
    [DashboardController.TenantsOverview.fulfilled]: (state, { payload }) => {
      state.loading.searchloader = false;
      if (payload) {
        let partnerList = {};
        let Tenantlist = {};
        let productlist = {};

        payload.map((item) => {
          if (item.formIdentity === 'Tenant_Partner_Profile') {
            Tenantlist[item.TenantProfileCreation.TenantDetails.TENANT_ID] =
              Partnerlist.makeTenantsearchList(item);
          }
        });

        state.TenantSearchlist = Tenantlist;
      }

      // state.quoteDetailsdata = payload.resdata
    },
    [DashboardController.TenantsOverview.rejected]: (state, { error }) => {
      state.loading.searchloader = false;
      state.errors.searcherror = error.message;
    },

    [DashboardController.ProductsOverview.pending]: (state, { payload }) => {
      state.loading.searchloader = true;
      state.errors.searcherror = '';
      state.addProductlist = {};
    },
    [DashboardController.ProductsOverview.fulfilled]: (state, { payload }) => {
      state.loading.searchloader = false;
      if (payload) {
        let productlist = {};

        payload.map((item) => {
          if (item.formIdentity === 'Add_Product') {
            productlist[item.AddProduct.ProductDetails.PRODUCT_ID] =
              Partnerlist.makeproductsearchList(item);
          }
        });

        state.addProductlist = productlist;
      }

      // state.quoteDetailsdata = payload.resdata
    },
    [DashboardController.ProductsOverview.rejected]: (state, { error }) => {
      state.loading.searchloader = false;
      state.errors.searcherror = error.message;
    },

    // search

    [DashboardController.SearchAddContract.pending]: (state, { payload }) => {
      // state.loading.shareContract = true;
      state.errors.shareContract = '';
      state.addcontractList = {};
    },
    [DashboardController.SearchAddContract.fulfilled]: (state, { payload }) => {
      // state.loading.shareContract = false;

      let addcontractIds = [];
      let rowlist = {};
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          addcontractIds.push(
            item.AddContractFor.ContractInformation?.CONTRACT_ID
          );
          rowlist[item.AddContractFor.ContractInformation.CONTRACT_ID] =
            PartnerTable.makeaddContractFor(item);
        });
        (state.addcontractList = rowlist),
          (state.onSearchcontractlist = rowlist),
          (state.addcontractlistIds = addcontractIds);
        state.tableCount.CommonCount = payload?.xCount;
      }
    },
    [DashboardController.FilterCustomerTickets.fulfilled]: (
      state,
      { payload }
    ) => {
      // state.loading.shareContract = false;
      /// console.log(payload, 'custick');
      let customerIds = [];
      let rowlist = {};
      if (payload?.list) {
        console.log(payload?.list, "payees")
        _.map(payload?.list, (item, i) => {
          customerIds.push(item.productId);
          rowlist[item.id] = PartnerTable.makecustomerow(item, i);
        });
        (state.customerTicketList = rowlist),
          (state.onSearchcustomerTicketList = rowlist),
          (state.customerIds = customerIds);
        state.tableCount.CommonCount = payload?.xCount;
      }
    },
    [DashboardController.CustomerTickets.fulfilled]: (state, { payload }) => {
      // state.loading.shareContract = false;
      //  console.log(payload, 'custick');
      let customerIds = [];
      let rowlist = {};
      if (payload?.list) {
        console.log(payload?.list, "paylist")
        _.map(payload?.list, (item, i) => {
          customerIds.push(item.productId);
          console.log(item.productId, "mainguy")
          rowlist[item.id] = PartnerTable.makecustomerow(item, i);
          console.log(rowlist, "rowlist", PartnerTable.makecustomerow(item, i), "test")
        });

        (state.customerTicketList = rowlist),
          (state.onSearchcustomerTicketList = rowlist),
          
          (state.customerIds = customerIds);
        state.tableCount.CommonCount = payload?.xCount;
      }
    },
    [DashboardController.CustomerTickets.pending]: (state, { payload }) => {
      // state.loading.shareContract = true;
      state.errors.shareContract = '';
      state.customerTicketList = {};
    },
    [DashboardController.FilterCustomerTickets.pending]: (
      state,
      { payload }
    ) => {
      // state.loading.shareContract = true;
      state.errors.shareContract = '';
      state.customerTicketList = {};
    },

    [DashboardController.SearchAddContract.rejected]: (state, { error }) => {
      // state.loading.shareContract = false;
      state.errors.shareContract = error.message;
    },

    [DashboardController.getproductLists.pending]: (state, { payload }) => {
      state.loading.shareContract = true;
      state.errors.shareContract = '';
      state.productrowlist = {};
    },
    [DashboardController.getproductLists.fulfilled]: (state, { payload }) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdata

      let rowlist = {};
      let productrowlist = {};
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          rowlist[item.AddProduct.ProductDetails.PRODUCT_ID] =
            PartnerTable.makeproductsrow(item);
        });
        state.productrowlist = rowlist;

        state.onSearchproductrowlist = rowlist;
        state.tableCount.CommonCount = payload?.xCount;
      }
    },
    [DashboardController.getproductLists.rejected]: (state, { error }) => {
      state.loading.shareContract = false;
      state.errors.shareContract = error.message;
    },

    // getall

    [DashboardController.getproductAll.pending]: (state, { payload }) => {
      state.loading.shareContract = true;
      state.errors.shareContract = '';
      state.Allproductrowlist = {};
    },
    [DashboardController.getproductAll.fulfilled]: (state, { payload }) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdata

      let rowlist = {};
      let productrowlist = {};
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          rowlist[item.AddProduct.ProductDetails.PRODUCT_ID] =
            PartnerTable.makeproductsrow(item);
        });
        state.Allproductrowlist = rowlist;

        state.AllonSearchproductrowlist = rowlist;
        state.tableCount.CommonCount = payload?.xCount;
      }
    },
    [DashboardController.getproductAll.rejected]: (state, { error }) => {
      state.loading.shareContract = false;
      state.errors.shareContract = error.message;
    },

    // tenantlist

    [DashboardController.getTenantLists.pending]: (state, { payload }) => {
      state.loading.shareContract = true;
      state.errors.shareContract = '';
      state.listOftenents = {};
    },
    [DashboardController.getTenantLists.fulfilled]: (state, { payload }) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdata

      let rowlist = {};
      if (payload?.list) {
        _.map(payload?.list, (item) => {
          rowlist[item.TenantProfileCreation.TenantDetails.TENANT_ID] =
            PartnerTable.makeTenantrow(item);
        });
        state.listOftenents = rowlist;
        state.onSearchlistOftenents = rowlist;
        state.tableCount.CommonCount = payload.xCount;
      }
    },
    [DashboardController.getTenantLists.rejected]: (state, { error }) => {
      state.loading.shareContract = false;
      state.errors.shareContract = error.message;
    },

    [DashboardController.orderTracking.pending]: (state, { payload }) => {
      state.loading.order = true;
      state.errors.order = '';
      state.orderList = {};
      state.OrderSearchlist = {};
    },
    [DashboardController.orderTracking.fulfilled]: (state, { payload }) => {
    
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdat

      let rowlist = {};
      let ids = [];

      if (payload?.list) {
        state.orderList =   _.map(payload?.list, (item) => {
          ids.push(item.orderId);

          rowlist[item.orderId] = PartnerTable.makeOrderRow(item);
        });

        console.log(rowlist, "roweee")

        (state.orderList = rowlist),
        (state.OrderSearchlist = rowlist),
        
        (state.orderIds = ids);
        (state.tableCount.orderCount = payload?.xCount);
      } else {
        rowlist =  _.map(payload, (item) => {
          ids.push(item.orderId);

          console.log(PartnerTable.makeOrderRow(item), "jijimngd")
         return rowlist[item.orderId] = PartnerTable.makeOrderRow(item);
        });


        // console.log(state.orderList, "gyngn23")
         (state.orderList = rowlist),
          (state.OrderSearchlist = rowlist),
          (state.tableCount.orderCount = payload?.xCount);
          (state.orderIds = ids);
       
      }

      //  let
      //  if(payload){

      //  }
    },

    [DashboardController.ManualOrderTracking.pending]: (state, { payload }) => {
      state.loading.order = true;
      state.errors.order = '';
      state.manualOrderList = {};
      state.OrderSearchlist = {};
    },

    [DashboardController.ManualOrderTracking.fulfilled]: (state, { payload }) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdat

      let rowlist = {};
      let ids = [];

      if (payload?.list) {
        rowlist =  _.map(payload?.list, (item) => {
          ids.push(item.orderId);

        return  rowlist[item.orderId] = PartnerTable.makeManualOrderRow(item);
        });

        state.orderIds = ids
        state.manualOrderList = rowlist;
        state.OrderSearchlist = rowlist;
        state.tableCount.orderCount = payload?.xCount;
      } else {
        rowlist =  _.map(payload, (item) => {
          ids.push(item.orderId);
          console.log(PartnerTable.makeManualOrderRow(item), "jijimngd")
        return  rowlist[item.orderId] = PartnerTable.makeManualOrderRow(item);
        });

        console.log(payload, "countxxx")

        state.orderIds = ids
        state.manualOrderList = rowlist;
        state.OrderSearchlist = rowlist;
        state.tableCount.orderCount = payload?.xCount;
      }

      //  let
      //  if(payload){

      //  }
    },

    [DashboardController.FilterByorderTracking.pending]: (
      state,
      { payload }
    ) => {
      state.loading.order = true;
      state.errors.order = '';
      state.orderList = {};
      state.OrderSearchlist = {};
    },
    [DashboardController.FilterByorderTracking.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdat

      let rowlist = {};
      let ids = [];

      if (payload?.list) {
        _.map(payload?.list, (item) => {
          ids.push(item.orderId);

          rowlist[item.orderId] = PartnerTable.makeOrderRow(item);
        });

        state.orderIds = ids;
        state.orderList = rowlist;
        state.OrderSearchlist = rowlist;
        state.tableCount.orderCount = payload?.xCount;
      }

      //  let
      //  if(payload){

      //  }
    },

    [DashboardController.DcmProductlist.pending]: (state, { payload }) => {
      state.loading.order = true;
      state.errors.order = '';
      state.DCMorderList = {};
    },
    [DashboardController.DcmProductlist.fulfilled]: (state, { payload }) => {
      state.loading.shareContract = false;
      // state.quoteDetailsdata = payload.resdat

      let rowlist = {};
      let ids = [];

      if (payload) {
        _.map(payload, (item) => {
          ids.push(item.producId);

          rowlist[item.producId] = PartnerTable.makeDCMOrderRow(item);
        });

        state.DCMorderIds = ids;
        state.DCMorderList = rowlist;
      }

      //  let
      //  if(payload){

      //  }
    },

    [DashboardController.DcmProductlist.rejected]: (state, { error }) => {
      state.loading.order = false;
      state.errors.order = error.message;
    },

    [DashboardController.workflowTrigger.pending]: (state, { payload }) => {
      state.loading.workflow = true;
      state.errors.order = '';
    },
    [DashboardController.workflowTrigger.fulfilled]: (state, { payload }) => {
      state.loading.workflow = false;
    },

    [DashboardController.workflowTrigger.rejected]: (state, { error }) => {
      state.loading.order = false;
      state.errors.order = error.message;
    },

    [DashboardController.workflowTrigger.rejected]: (state, { error }) => {
      state.loading.workflow = false;
      state.errors.order = error.message;
    },

    // getrequestList

    [DashboardController.getRequestList.pending]: (state, { payload }) => {
      state.loading.myTaskListLoading = true;
      state.errors.myTaskListError = '';
      state.requestTablerow = {};
      state.pendingRequestlist = {};
    },
    // updating my tasks list (status success)
    [DashboardController.getRequestList.fulfilled]: (state, { payload }) => {
      const list = payload?.data;
      state.myTasks = list;
      state.errors.myTaskListError = '';
      state.loading.myTaskListLoading = false;
      state.tableCount.productCount = payload?.xCount;
      // state.tableCount.commonCount = payload.xCount

      let taskIds = [];
      let Approvetaskrows = {};
      let taskentities = {};
      let pendingrowlist = {};
      if (list?.length) {
        _.map(list, (item) => {
          taskIds.push(item.id);
          taskentities[item.id] = item;
          if (item.status === 'Approve') {
            Approvetaskrows[item.id] = PartnerTable.makeRequestTablerows(item);
          } else if (item.status === 'pending') {
            pendingrowlist[item.id] = PartnerTable.makeRequestTablerows(item);
          }
        });
      }

        (state.requestIds = taskIds),
        (state.requestEntities = taskentities),
        (state.requestTablerow = Approvetaskrows);
      state.pendingRequestlist = pendingrowlist;
      state.onSearchPendingRequestlist = pendingrowlist;
      state.onSearchRequestlist = Approvetaskrows;
    },

    // updating my tasks list (status failure)
    [DashboardController.getRequestList.rejected]: (state, { error }) => {
      state.errors.myTaskListError = error.message;
      state.loading.myTaskListLoading = false;
    },

    [DashboardController.getPaymentlist.pending]: (state, { payload }) => {
      state.loading.payment = true;
      state.errors.payment = '';
      state.paymentTablelist = {};
    },
    [DashboardController.getPaymentlist.fulfilled]: (state, { payload }) => {
      state.loading.payment = false;

      let rowlist = {};

      if (payload) {
        _.map(payload, (item) => {
          //  if(item.depositAmount !=="0"&&item.withdrawAmount !=="0"){
          if (
            parseInt(item.depositAmount) === 0 &&
            parseInt(item.withdrawAmount) === 0
          ) {
            // rowlist[item.id] = PartnerTable.makepaymentRow(item);
          } else {
            rowlist[item.id] = PartnerTable.makepaymentRow(item);
          }
        });

        state.paymentTablelist = rowlist;
      }
    },
    [DashboardController.getPaymentlist.rejected]: (state, { error }) => {
      state.loading.payment = false;
      state.errors.payment = error.message;
    },

    [DashboardController.getInvoiceDetails.pending]: (state, { payload }) => {
      state.loading.payment = true;
      state.errors.payment = '';
      state.InvoiceDetails = {};
    },
    [DashboardController.getInvoiceDetails.fulfilled]: (state, { payload }) => {
      state.loading.payment = false;
      const list = payload?.list;
      state.tableCount.invoiceCount = payload?.xCount;
      let rowlist = {};
      if (list) {
        _.map(list, (item) => {
          if (item.invoiceId) {
            rowlist[item.id] = PartnerTable.makeInvoicerow(item);
          }
        });

        state.InvoiceDetails = rowlist;
        state.WalletBalance = _.get(payload, '[0].ledgerBalance', '00');
      }
    },
    [DashboardController.getInvoiceDetails.rejected]: (state, { error }) => {
      state.loading.payment = false;
      state.errors.payment = error.message;
    },
    

    // getTransaction
    [DashboardController.getTransaction.pending]: (state, { payload }) => {
      state.loading.payment = true;
      state.errors.payment = '';
      state.InvoiceDetails = {};
    },
    [DashboardController.getTransaction.fulfilled]: (state, { payload }) => {
      state.loading.payment = false;

      console.log('getTransaction payload', payload)
      const list = payload?.list;
      const xCount = payload?.xCount;
      state.tableCount.transactionCount = xCount
      let rowlist = {};

      if (list) {
        _.map(list, (item) => {
          if (item.orderId) {
            rowlist[item.id] = PartnerTable.makeTransactionRow(item);
          }
        });
        state.transactions = rowlist;
      }
    },
    [DashboardController.getTransaction.rejected]: (state, { error }) => {
      state.loading.payment = false;
      state.errors.payment = error.message;
    },
    // update INvoice details

    [DashboardController.OnpayInoice.pending]: (state, { payload }) => {
      state.loading.payInvoice = true;
      state.errors.payInvoice = '';
    },
    [DashboardController.OnpayInoice.fulfilled]: (state, { payload }) => {
      state.loading.payInvoice = false;
      if (payload) {
        state.InvoiceDetails[payload.id] = PartnerTable.makeInvoicerow(payload);
      }
    },
    [DashboardController.OnpayInoice.rejected]: (state, { error }) => {
      state.loading.payInvoice = false;
      state.errors.payInvoice = error.message;
    },

    [DashboardController.Adjustment.pending]: (state, { payload }) => {
      state.loading.payment = true;
      state.errors.payment = '';
      state.Adjustmentdetails = {};
    },
    [DashboardController.Adjustment.fulfilled]: (state, { payload }) => {
      state.loading.payment = false;
      const list = payload?.list;
      const xCount = payload?.xCount;
      state.tableCount.adjustmentCount = xCount
      let rowlist = {};
      if (list) {
        _.map(list, (item) => {
          if (item.id) {
            rowlist[item.id] = PartnerTable.makeAdjustmentRow(item);
          }
        });

        state.Adjustmentdetails = rowlist;
      }
    },
    [DashboardController.Adjustment.rejected]: (state, { error }) => {
      state.loading.payment = false;
      state.errors.payment = error.message;
    },

    [DashboardController.getSettlement.pending]: (state, { payload }) => {
      state.loading.payment = true;
      state.errors.payment = '';
    },
    [DashboardController.getSettlement.fulfilled]: (state, { payload }) => {
      state.loading.payment = false;
      let rowlist = {};
      const list = payload?.list;
      const xCount = payload?.xCount;
      state.tableCount.settlementCount = xCount

      if (list) {
        _.map(list, (item) => {
          rowlist[item.id] = PartnerTable.makeSettlementrow(item);
        });

        state.Settlementdetails = rowlist;
      }
    },
    [DashboardController.getSettlement.rejected]: (state, { error }) => {
      state.loading.payment = false;
      state.errors.payment = error.message;
    },

    [DashboardController.OnsubmitBilliginAdjustment.pending]: (
      state,
      { payload }
    ) => {
      state.loading.billingAdjustment = true;
      state.errors.billingAdjustment = '';
    },
    [DashboardController.OnsubmitBilliginAdjustment.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.billingAdjustment = false;
    },
    [DashboardController.OnsubmitBilliginAdjustment.rejected]: (
      state,
      { error }
    ) => {
      state.loading.billingAdjustment = false;
      state.errors.billingAdjustment = error.message;
    },

    [DashboardController.getOrderdetails.pending]: (state, { payload }) => {
      state.loading.billingAdjustment = true;
      state.errors.billingAdjustment = '';
    },
    [DashboardController.getOrderdetails.fulfilled]: (state, { payload }) => {
      state.loading.billingAdjustment = false;
      state.InvoicePreviewDetails = payload;

      let rowlist = [];
      let productId = [];
      let productlist = [];
      let AdjustmentRow = [];
      if (payload) {
        _.map(payload.products, (item) => {
          productId.push(item.productId);
          productlist.push(item);
          _.map(item.OrderDetails, (list) => {
            rowlist.push(PartnerTable.makeProductrowList(list, item, payload));
          });

          _.map(payload.adjustmentDetails, (item) => {
            AdjustmentRow.push(
              PartnerTable.makebillingAdjustmentList(item, payload)
            );
          });
        });

        state.orderRowdetails = rowlist;
        state.OrderProductlist = productlist;
        state.orderPayload = payload;
        state.billingAdjustmentRow = AdjustmentRow;
      }
    },
    [DashboardController.getOrderdetails.rejected]: (state, { error }) => {
      state.loading.billingAdjustment = false;
      state.errors.billingAdjustment = error.message;
    },
    [DashboardController.storeAllNotes.pending]: (state, { payload }) => {
      state.notesLoading = true;
    },
    [DashboardController.storeAllNotes.fulfilled]: (state, { payload }) => {
      state.allNotes = payload;
      state.notesLoading = false;
    },
    [DashboardController.storeAllNotes.rejected]: (state, { error }) => {
      state.notesLoading = false;
      state.errors.notesMsg = error.message;
    },

    [DashboardController.OrderSelfcareComplete.pending]: (
      state,
      { payload }
    ) => {
      state.loading.order = true;
      state.errors.order = '';
    },
    [DashboardController.OrderSelfcareComplete.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.order = false;
      // state.quoteDetailsdata = payload.resdat
      state.orderList[payload.orderId] = PartnerTable.makeOrderRow(payload);
    },

    [DashboardController.OrderSelfcareComplete.rejected]: (
      state,
      { error }
    ) => {
      state.loading.order = false;
      state.errors.order = error.message;
    },

    [DashboardController.getPendingProdcutlist.pending]: (
      state,
      { payload }
    ) => {
      state.loading.myTaskListLoading = true;
      state.errors.myTaskListError = '';
    },
    // updating my tasks list (status success)
    [DashboardController.getPendingProdcutlist.fulfilled]: (
      state,
      { payload }
    ) => {
      state.myTasks = payload;
      state.errors.myTaskListError = '';
      state.loading.myTaskListLoading = false;
      let taskrows = {};

      if (payload) {
        _.map(payload, (item) => {
          taskrows[item.id] = PartnerTable.makeTaskrows(item);
        });
      }

      state.PendingProdcutrow = taskrows;
    },

    // updating my tasks list (status failure)
    [DashboardController.getPendingProdcutlist.rejected]: (
      state,
      { error }
    ) => {
      state.errors.myTaskListError = error.message;
      state.loading.myTaskListLoading = false;
    },

    [DashboardController.DynamicMenulist.pending]: (state, { payload }) => {
      state.loading.MenuItem = true;
      state.errors.MenuItem = '';
    },
    // updating my tasks list (status success)
    [DashboardController.DynamicMenulist.fulfilled]: (state, { payload }) => {
      state.loading.MenuItem = false;
      state.DynamicMenuItem = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.DynamicMenulist.rejected]: (state, { error }) => {
      state.loading.MenuItem = false;
    },

    [DashboardController.VerifyOtp.pending]: (state, { payload }) => {
      state.loading.VerifyOtpLoader = true;
      state.errors.MenuItem = '';
    },
    // updating my tasks list (status success)
    [DashboardController.VerifyOtp.fulfilled]: (state, { payload }) => {
      state.loading.VerifyOtpLoader = false;
      state.otpdetails = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.VerifyOtp.rejected]: (state, { error }) => {
      state.loading.VerifyOtpLoader = false;
    },

    [DashboardController.VerifyOtpDashboard.pending]: (state, { payload }) => {
      state.loading.VerifyOtpLoader = true;
      state.errors.MenuItem = '';
    },
    // updating my tasks list (status success)
    [DashboardController.VerifyOtpDashboard.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.VerifyOtpLoader = false;
      state.otpdetails = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.VerifyOtpDashboard.rejected]: (state, { error }) => {
      state.loading.VerifyOtpLoader = false;
    },

    [TroubleTicketController.LoadAll_PartnerTickets.pending]: (
      state,
      { payload }
    ) => {
      state.loading.TicketLoader = true;
      state.errors.MenuItem = '';
    },
    // updating my tasks list (status success)
    [TroubleTicketController.LoadAll_PartnerTickets.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.TicketLoader = false;
      (state.PartnerTicketList = payload.data),
        (state.PartnerEntities = payload.data),
        (state.PartnerTicketlist = payload.data),
        (state.PartnerTicketItems = payload.data);
      state.TotallInteractionCount = payload.xCount;
    },

    // updating my tasks list (status failure)
    [TroubleTicketController.LoadAll_PartnerTickets.rejected]: (
      state,
      { error }
    ) => {
      state.loading.TicketLoader = false;
    },

    [TroubleTicketController.LoadAll_StatusTickets.pending]: (
      state,
      { payload }
    ) => {
      state.loading.TicketLoader = true;
      state.errors.MenuItem = '';
    },
    // updating my tasks list (status success)
    [TroubleTicketController.LoadAll_StatusTickets.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.TicketLoader = false;
      (state.PartnerTicketList = payload.data),
        (state.PartnerEntities = payload.data),
        (state.PartnerTicketlist = payload.data),
        (state.PartnerTicketItems = payload.data);
      state.TotallInteractionCount = payload.xCount;
    },
    // updating my tasks list (status failure)
    [TroubleTicketController.LoadAll_StatusTickets.rejected]: (
      state,
      { error }
    ) => {
      state.loading.TicketLoader = false;
    },
    [TroubleTicketController.Load_filter_tickets.pending]: (
      state,
      { payload }
    ) => {
      state.loading.TicketLoader = true;
      state.errors.MenuItem = '';
    },
    [TroubleTicketController.Load_filter_tickets.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.TicketLoader = false;
      (state.PartnerTicketList = payload.data),
        (state.PartnerEntities = payload.data),
        (state.PartnerTicketlist = payload.data),
        (state.PartnerTicketItems = payload.data);
       state.TotalFilterCount = payload.xCount;
    },
    [TroubleTicketController.Load_filter_tickets.rejected]: (
      state,
      { error }
    ) => {
      //console.log({ error, state });
      state.loading.TicketLoader = false;
    },

    [DashboardControllerview.Add_user.pending]: (state, { payload }) => {
      state.loading.AddUser = true;
      state.errors.Deactive = '';
    },
    // updating my tasks list (status success)
    [DashboardControllerview.Add_user.fulfilled]: (state, { payload }) => {
      state.loading.AddUser = false;
    },

    // updating my tasks list (status failure)
    [DashboardControllerview.Add_user.rejected]: (state, { error }) => {
      state.errors.Deactive = error.message;
      state.loading.AddUser = false;
    },

    [DashboardControllerview.MasterList_user.pending]: (state, { payload }) => {
      // state.loading.AddUser = true;
      // state.errors.Deactive = '';
      state.loading.usersListLoader = true;
    },
    // updating my tasks list (status success)
    [DashboardControllerview.MasterList_user.fulfilled]: (
      state,
      { payload }
    ) => {
      let rowlist = {};

      if (payload) {
        _.map(payload, (item) => {
          rowlist[item.id] = PartnerTable.User_MasterTable(item);
        });
        // state.loading.AddUser = false;
        state.User_Masterdetails = rowlist;
        state.loading.usersListLoader = false;
      }
    },

    // updating my tasks list (status failure)
    [DashboardControllerview.MasterList_user.rejected]: (state, { error }) => {
      // state.errors.Deactive = error.message;
      // state.loading.AddUser = false;
      state.loading.usersListLoader = false;
    },

    [DashboardControllerview.TenentList_user.pending]: (state, { payload }) => {
      state.errors.Deactive = '';
      state.loading.usersListLoader = true;
    },
    // updating my tasks list (status success)
    [DashboardControllerview.TenentList_user.fulfilled]: (
      state,
      { payload }
    ) => {
      let rowlist = {};

      if (payload) {
        _.map(payload, (item) => {
          rowlist[item.id] = PartnerTable.User_TenantTable(item);
        });
        // state.loading.AddUser = false;
        state.User_Tenantdetails = rowlist;
        state.loading.usersListLoader = false;
      }
    },

    // updating my tasks list (status failure)
    [DashboardControllerview.TenentList_user.rejected]: (state, { error }) => {
      state.errors.Deactive = error.message;
      state.loading.usersListLoader = true;
    },

    [DashboardController.AllgetPartnerCounts.pending]: (state, { payload }) => {
      state.errors.Deactive = '';
    },
    // updating my tasks list (status success)
    [DashboardController.AllgetPartnerCounts.fulfilled]: (
      state,
      { payload }
    ) => {
      state.ChickletCount = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.AllgetPartnerCounts.rejected]: (state, { error }) => {
      state.errors.Deactive = error.message;
    },
    [DashboardController.backOfficeDashboardCounts.pending]: (
      state,
      { payload }
    ) => {
      state.errors.Deactive = '';
    },
    // updating my tasks list (status success)
    [DashboardController.backOfficeDashboardCounts.fulfilled]: (
      state,
      { payload }
    ) => {
      state.ChickletCount = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.backOfficeDashboardCounts.rejected]: (
      state,
      { error }
    ) => {
      state.errors.Deactive = error.message;
    },
    [DashboardController.getPartnerCounts.pending]: (state, { payload }) => {
      state.errors.Deactive = '';
    },
    // updating my tasks list (status success)
    [DashboardController.getPartnerCounts.fulfilled]: (state, { payload }) => {
      state.ChickletCount = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.getPartnerCounts.rejected]: (state, { error }) => {
      state.errors.Deactive = error.message;
    },

    [DashboardController.PartnerSalesSummarygraph.pending]: (
      state,
      { payload }
    ) => {
      state.errors.Deactive = '';
      state.loading.summaryGraphLoading = true;
    },
    // updating my tasks list (status success)
    [DashboardController.PartnerSalesSummarygraph.fulfilled]: (
      state,
      { payload }
    ) => {
      state.SalesSummaryGraph = _.map(payload, (item) => {
        return {
          value: parseInt(item.productSold),
          network: item.partnerName
        };
      });
      state.loading.summaryGraphLoading = false;
    },

    // updating my tasks list (status failure)
    [DashboardController.PartnerSalesSummarygraph.rejected]: (
      state,
      { error }
    ) => {
      state.errors.Deactive = error.message;
      state.loading.summaryGraphLoading = false;
    },

    [DashboardController.PartnerSalesSummarygraphFilter.pending]: (
      state,
      { payload }
    ) => {
      state.errors.Deactive = '';
      state.loading.summaryGraphLoading = true;
    },
    // updating my tasks list (status success)
    [DashboardController.PartnerSalesSummarygraphFilter.fulfilled]: (
      state,
      { payload }
    ) => {
      state.SalesSummaryGraph = _.map(payload, (item) => {
        return {
          value: parseInt(item.productSold),
          network: item.partnerName
        };
      });
      state.loading.summaryGraphLoading = false;
    },


    //updating statusProduct

    [DashboardController.fetchStatusProducts.rejected]:(
      state,
      {error}
    ) =>{
      state.errors.popupTable =  error.message
      state.loading.popupTable =  false;
    },
    [DashboardController.fetchStatusProducts.pending]:(state, { payload }) => {
      state.errors.popupTable = '';
      state.loading.popupTable = true;
    },
    [DashboardController.fetchStatusProducts.fulfilled]:(state, { payload }) => {
      state.popupTable[payload.key] = payload.data;
     
      state.loading.popupTable = false;
    },

    // updating my tasks list (status failure)
    [DashboardController.PartnerSalesSummarygraphFilter.rejected]: (
      state,
      { error }
    ) => {
      state.errors.Deactive = error.message;
      state.loading.summaryGraphLoading = false;
    },

    [DashboardController.getAllorderCounts.pending]: (state, { payload }) => {
      state.errors.Deactive = '';
      state.loading.shareContract = true;
    },
    // updating my tasks list (status success)
    [DashboardController.getAllorderCounts.fulfilled]: (state, { payload }) => {
      state.OrderTotallCount = payload;
      state.loading.shareContract = false;
    },

    // updating my tasks list (status failure)
    [DashboardController.getAllorderCounts.rejected]: (state, { error }) => {
      state.errors.Deactive = error.message;
      state.loading.shareContract = false;
    },

    [DashboardController.getOrderCounts.pending]: (state, { payload }) => {
      state.errors.Deactive = '';
    },
    // updating my tasks list (status success)
    [DashboardController.getOrderCounts.fulfilled]: (state, { payload }) => {
      state.OrderTotallCount = payload;
    },

    // updating my tasks list (status failure)
    [DashboardController.getOrderCounts.rejected]: (state, { error }) => {
      state.errors.Deactive = error.message;
    },

    [DashboardController.validateAgent.pending]: (state) => {
      state.filterList = [];
      state.loading.agentValidateLoading = true;
      state.errors.agentValidateError = '';
      state.existAgentData = false;
    },
    [DashboardController.validateAgent.rejected]: (state, { error }) => {
      state.loading.agentValidateLoading = false;
      // state.errors.agentValidateError = error.message;
      state.existAgentData = false;
    },
    [DashboardController.validateAgent.fulfilled]: (state, { payload }) => {
      state.loading.agentValidateLoading = false;
      // state.agentValidate = payload?.data?.rica_Evds || payload?.data?.riEv_Ambassador || payload?.data?.upgarding
      if (payload?.data?.rica_Evds) {
        state.agentValidate = payload?.data?.rica_Evds;
      } else if (payload?.data?.riEv_Ambassador) {
        state.agentValidate = payload?.data?.riEv_Ambassador;
      } else if (payload?.data?.upgrading) {
        state.agentValidate = payload?.data?.upgrading;
      } else if (payload?.data?.ambassador) {
        state.agentValidate = payload?.data?.ambassador;
      } else if (payload?.data?.newAgentRegistration) {
        state.agentValidate = payload?.data?.newAgentRegistration;
      } else if (payload?.data?.inValidMsisdn) {
        state.errors.agentValidateError = true;
        state.agentValidate = payload?.data?.inValidMsisdn;
      }

      if (
        payload?.data?.rica_Evds ||
        payload?.data?.riEv_Ambassador ||
        payload?.data?.ambassador
      ) {
        state.upgrade = false;
        state.existAgentData = true;
      } else if (payload?.data?.upgrading) {
        state.upgrade = true;
        state.existAgentData = true;
      } else if (payload?.data?.newAgentRegistration) {
        state.newregistration = true;
      }
    },
    //generate agent id
    [DashboardController.createAgentId.pending]: (state) => {
      // state.filterList = []
      // state.loading.filterLoading = true;
      // state.errors.filterError = '';
    },
    [DashboardController.createAgentId.rejected]: (state, { error }) => {
      // state.loading.filterLoading = false;
      // state.errors.filterError = error.message;
    },
    [DashboardController.createAgentId.fulfilled]: (state, { payload }) => {
      state.existAgentData = false;
      state.newregistration = false;
      state.agentGenerateID = payload.data;
    }
  }
});

export { dashboardData };
export default dashboardData.actions;
