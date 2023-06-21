import { createSlice } from '@reduxjs/toolkit';

const Modals = createSlice({
  name: 'modals',
  initialState: {
    Uid: '',
    context: {},
    enteredData: {},
    subContext: {},
    quoteviewdata: {},
    leadViewData: {},
    checkquantity: [],
    qualified: '',
    modalStepper: [],
    Address: {},
    vascontext: [],
    OpportunityContext: {},
    existingOpportunity: {},
    updateItems: {},
    CustomerDetails: {},
    checkproducts: [],

    formContext: {},
    dropLead: false,
    leadView: false,
    quoteview: false,
    eventForm: false,
    shareQuote: false,
    approveLead: false,
    quoteReject: false,
    rejectQuote: false,
    leadCreation: false,
    reassignLead: false,
    quoteApproval: false,
    shareQuotation: false,
    quoteGeneration: false,
    feasibilityForm: false,
    quoteApprovalSent: false,
    feasibilityComplete: false,
    customerRejection: false,
    // quoteApprovalSent: false,
    onReOpenAccountHandle:false,
    customerAcceptence: false,
    leadClassification: false,
    opportunityCreation: false,
    productConfiguration: false,
    duplicateModel: false,
    Blacklist: false,
    ContractCreation: false,
    Checkfeacibility: false,
    buttomsheet: false,
    existingoverview: false,
    existingLead: false,
    ContractSignoff: false,
    reopenLead: false,
    dropOpportunity: false,
    Addvas: false,
    vasOpen: false,
    ServiceUpdate: false,
    DependencyProduct: false,
    IsSaveAndExit: false,
    IsSaveAndExitModalOpen: false,
    IsSubmitInSaveAndExitModal: false,
    CustomerOverview: false,
    reassignApproval: false,
    PaymentConformation: false,
    ButtomDrawer: false,
    ViewContract: false,
    TaskApproval: false,
    Approval: false,
    FormSuccessModal: false,
    SuccessModal: false,
    ContractSuccessModal: false,
    TaskDetails: false,
    ShareContract: false,
    AgentShareContract:false,
    Contractpreview: false,
    ContractSignpreview: false,
    contracts: false,
    ContractPayments: false,
    Preview: false,
    FormsCreation: false,
    ProductList: false,
    ProductContract: false,
    OrderDetails: false,
    Paymentview: false,
    InvoicePreview: false,
    BillingAdjustment: false,
    InvoiceAdjustment: false,
    BillingConformation: false,
    ModifyContract: false,
    OrderComplete: false,
    PayInvoiceDetails: false,
    ProductDetails: false,
    bottomSheet: false,
    DcmSpecification: false,
    OtpVerification: false,
    LogTicket: false,
    AddProduct: false,
    AddUser: false,
    TicketFilter: false,
    Setunavailable: false,
    EditUser: false,
    ActionModal: false,
    ApprovalReason: false,
    ShareNotification: false,
    createContract: false
  },
  reducers: {
    open: (state, { payload }) => {
      
      state[payload.id] = true;
      if (payload.context) {
        if (payload.id === 'leadView') {
          state.leadViewData = payload.context;
        } else if (payload.id === 'quoteview') {
          state.quoteviewdata = payload.context;
        } else if (payload.id === 'Checkfeacibility') {
          state.checkproducts = payload.productconfig;       
        } else if (payload.id === 'existingLead') {
          state.existingOpportunity = payload.context;
        } else if (payload.id === 'CustomerOverview') {
          state.CustomerDetails = payload.context;
        } else if (payload.id === 'leadCreation') {
          state.enteredData = payload.data;
        } else if (payload.id === 'PaymentConformation') {
          state.context = payload.context;
        } else if (payload.id === 'OtpVerification') {
          state.formContext = payload.context;
        } else {
          state.context = payload.context;
        }
        if (payload.context.Stepper) {
          state.modalStepper = payload.context.Stepper;
        }
      }

      state.context = payload.context;
      state.enteredData = payload.data;
    },

    existingOpenModel: (state, { payload }) => {
      state[payload.id] = true;
      if (payload.id === 'opportunityCreation') {
        state.context = payload.context;
        state.OpportunityContext = payload.context;
      }
    },
    close: (state, { payload }) => {
      state[payload] = false;
      if (payload.id === 'Checkfeacibility') {
        state[payload.id] = false;
        state.updateItems = payload.items;
      } else if (payload === 'bottomSheet') {
        state.formContext = {};
      }
    },
    buttomdraweropen: (state, { payload }) => {
      state[payload.id] = true;
    },

    check: (state, { payload }) => {
      if (payload.id === 'checked') {
        let obj = { ...state.checkproducts };
      }
    },
    submitcheck: (state, { payload }) => {
      if (payload.id === 'submit') {
        state.Address = payload.Address;
        state.Uid = payload.Uid;
        state.qualified = payload.qualified;
      }
    },
    opensubscription: (state, { payload }) => {
      state[payload.id] = true;
      state.subcontext = payload.context;
    },

    vasOpen: (state, { payload }) => {
      state[payload.id] = true;
      state.vascontext = payload.context;
    },

    toggleSaveandExit: (state, { payload }) => {
      state[payload.key] = payload.value;
    }
  }
});

export { Modals };
export default Modals.actions;


// } else if (payload.id === 'SuccessModal') {
//   state.SuccessModal = payload.context;
