import React from 'react';
import { Trans } from '@lingui/react';

const statuses = {
  LEAD_DROPPED: {
    value: 'LEAD_DROPPED',
    color: 'red'
  },
  LEAD_APPROVAL: {
    value: 'LEAD_APPROVAL',
    color: 'orange'
  },
  APPROVAL: {
    value: 'APPROVAL',
    color: 'orange'
  },
  APPROVED: {
    value: 'APPROVED',
    color: 'green'
  },
  QUOTE_GENERATE: {
    value: 'QUOTE_GENERATE',
    color: 'orange'
  },
  // APPROVAL: {
  //   value: 'APPROVAL',
  //   color: 'orange'
  // },
  QUOTE_REJECTED: {
    value: 'QUOTE_REJECTED',
    color: 'red'
  },
  ['Modify Contract']: {
    value: 'Modify Contract',
    color: 'orange'
  },
  ['PENDING ACCEPTANCE']:{
    value: 'PENDING ACCEPTANCE',
    color: 'orange'
  },
  QUOTE_EXPIRED: {
    value: 'QUOTE_EXPIRED',
    color: 'red'
  },
  SHARE: {
    value: 'SHARE',
    color: 'orange'
  },
  CUSTOMER_ACCEPTANCE: {
    value: 'CUSTOMER_ACCEPTANCE',
    color: 'orange'
  },

  CUSTOMER_ACCEPTED: {
    value: 'CUSTOMER_ACCEPTED',
    color: 'green'
  },
  CUSTOMER_REJECTED: {
    value: 'CUSTOMER_REJECTED',
    color: 'red'
  },
  ONBOARDING: {
    value: 'ONBOARDING',
    color: 'orange'
  },

  ONBOARDED: {
    value: 'ONBOARDED',
    color: 'green'
  },
  ADD_SERVICE: {
    value: 'ADD_SERVICE',
    color: 'orange'
  },
  CREATE_CONTRACT: {
    value: 'CREATE_CONTRACT',
    color: 'orange'
  },
  WAREHOUSE_APPROVAL: {
    value: 'WAREHOUSE_APPROVAL',
    color: 'orange'
  },
  FEASIBILITY_FAILED: {
    value: 'FEASIBILITY_FAILED',
    color: 'red'
  },

  OPPORTUNITY_CREATION: {
    value: 'OPPORTUNITY_CREATION',
    color: 'orange'
  },
  APPROVED_FROM_WAREHOUSE: {
    value: 'APPROVED_FROM_WAREHOUSE',
    color: 'green'
  },
  REJECTED_FROM_WAREHOUSE: {
    value: 'REJECTED_FROM_WAREHOUSE',
    color: 'red'
  },
  MANUAL_FEASIBILITY: {
    value: 'MANUAL_FEASIBILITY',
    color: 'orange'
  },

  PRODUCT_CONFIGURATION: {
    value: 'PRODUCT_CONFIGURATION',
    color: 'orange'
  },
  CONTRACT_SIGN_OFF: {
    value: 'CONTRACT_SIGN_OFF ',
    color: 'orange'
  },
  SERVICE_ADDED: {
    value: 'SERVICE_ADDED',
    color: 'green'
  },
  CONTRACT_EXPIRED: {
    value: 'CONTRACT_EXPIRED',
    color: 'red'
  },

  REVISE_CONTRACT: {
    value: 'REVISE_CONTRACT',
    color: 'orange'
  },

  LEAD_RE_OPEN: {
    value: 'LEAD_RE_OPEN ',
    color: 'orange'
  },
  LEAD_GENERATION: {
    value: 'LEAD_GENERATION',
    color: 'orange'
  },
  DROP_OPPORTUNITY: {
    value: 'DROP_OPPORTUNITY',
    color: 'red'
  },

  CHANGE_PLAN: {
    value: 'CHANGE_PLAN',
    color: 'orange'
  },
  completed: {
    value: 'completed',
    color: 'green'
  },
  created: {
    value: 'created',
    color: 'orange'
  },
  Created: {
    value: 'Created',
    color: 'orange'
  },
  Completed: {
    value: 'Completed',
    color: 'green'
  },
  ADD_VAS: {
    value: 'ADD_VAS',
    color: 'orange'
  },
  Pending: {
    value: 'Pending',
    color: 'orange'
  },
  PENDING: {
    value: 'Pending',
    color: 'orange'
  },
  Failed: {
    value: 'Failed',
    color: 'red'
  },
  Draft: {
    value: 'Draft',
    color: 'gray'
  },
  MODIFY_QUOTE: {
    value: 'MODIFY_QUOTE',
    color: 'orange'
  },
  MODIFY_CONTRACT: {
    values: 'MODIFY_CONTRACT',
    color: 'orange'
  },
  CANCELLED: {
    values: 'CANCELLED',
    color: 'red'
  },
  PLAN_ADDED: {
    values: 'PLAN_ADDED',
    color: 'green'
  },
  SUBSCRIPTION_MODIFICATION: {
    values: 'SUBSCRIPTION_MODIFICATION',
    color: 'orange'
  },
  VAS_ADDED: {
    values: 'VAS_ADDED',
    color: 'green'
  },

  'In test': {
    values: 'In test',
    color: 'orange'
  },
  'Pending For Approval': {
    values: 'Pending For Approval',
    color: 'orange'
  },
  'Pending Modify Contract': {
    values: 'Pending Modify Contract',
    color: 'orange'
  }, 
  Initial: {
    values: 'Initial',
    color: 'orange'
  },
  Active: {
    values: 'Active',
    color: 'green'
  },
  Launched: {
    values: 'Launched',
    color: 'green'
  },
  Product_Config_DCM: {
    values: 'Product_Config_DCM',
    color: 'orange'
  },
  ACTIVE: {
    values: 'ACTIVE',
    color: 'green'
  },

  DE_ACTIVE: {
    values: 'DE_ACTIVE',
    color: 'red'
  },
  MANAGE_HIERARCHY: {
    values: 'MANAGE_HIERARCHY',
    color: 'orange'
  },
  Approve: {
    value: 'Approve',
    color: 'green'
  },
  Reject: {
    value: 'Reject',
    color: 'red'
  },
  pending: {
    value: 'Pending',
    color: 'orange'
  },
  Approved: {
    value: 'Approved',
    color: 'orange'
  },
  ['CREATE CONTRACT']: {
    value: 'CREATE CONTRACT',
    color: 'orange'
  },
  ['AGENT ACCEPTANCE']: {
    value: 'AGENT ACCEPTANCE',
    color: 'orange'
  },
  ['CONTRACT APPROVED']: {
    value: 'CONTRACT APPROVED',
    color: 'orange'
  },
  ['SHARE CONTRACT']:{
    value: 'SHARE CONTRACT',
    color: 'orange' 
  },
  ['SIGN OFF']:{
    value: 'SIGN OFF',
    color: 'orange'
  },
  ['PAYMENT PENDING']:{
    value: 'PAYMENT PENDING',
    color: 'orange'
  },
  Pending_Acceptance: {
    value: 'Pending_Acceptance',
    color: 'orange'
  },
  Pending_Approval: {
    value: 'Pending_Approval',
    color: 'orange'
  },
  Cancel_Contract: {
    value: 'Cancel_Contract',
    color: 'red'
  },
  Accepted: {
    value: 'Accepted',
    color: 'orange'
  },
  ADD_CONTRACT: {
    value: 'ADD_CONTRACT',
    color: 'orange'
  },
  CONTRACT_ADDED: {
    value: 'CONTRACT_ADDED',
    color: 'green'
  },
  uploaded: {
    value: 'uploaded',
    color: 'orange'
  },
  created: {
    value: 'created',
    color: 'orange'
  },
  Successful: {
    value: 'Successful',
    color: 'green'
  },
  Rejected: {
    value: 'Rejected',
    color: 'red'
  },
  Terminated: {
    value: 'Terminated',
    color: 'red'
  },
  REJECTED: {
    value: 'REJECTED',
    color: 'red'
  },
  CONTRACT_CREATED: {
    value: 'CONTRACT_CREATED',
    color: 'green'
  },
  PENDING_CONTRACT: {
    value: 'PENDING_CONTRACT',
    color: 'orange'
  },
  open: {
    value: 'open',
    color: 'orange'
  },

  inProgress: {
    value: 'inProgress',
    color: 'orange'
  },
  Unpaid: {
    value: 'Unpaid',
    color: 'red'
  },
  Paid: {
    value: 'Paid',
    color: 'green'
  },
  DCM_PRODUCT_CONFIGURED: {
    value: 'DCM_PRODUCT_CONFIGURED',
    color: 'blue'
  },
  Available: {
    value: 'Available',
    color: 'Available'
  },
  ['Unavailble']: {
    value: 'Unavailble',
    color: 'orange'
  },
  done: {
    value: 'done',
    color: 'green'
  },
  rejected: {
    value: 'rejected',
    color: 'red'
  },
  resolved: {
    value: 'resolved',
    color: 'green'
  },
  closed: {
    value: 'closed',
    color: 'green'
  },
  SUSPENDED: {
    value: 'SUSPENDED',
    color: 'red'
  },
  CLOSED: {
    value: 'CLOSED',
    color: 'red'
  } 
};

const approvalstatus = {
  approveLead: {
    id: 1,
    label: 'Approve Lead',

    approval: true,
    onlyForAccountManger: true,
    approvalRequiredForLead: '',
    nextStatus: statuses.OPPORTUNITY_CREATION.value,
    validFor: [statuses.LEAD_APPROVAL.value],
    modalId: 'approveLead'
  },
  approveQuote: {
    id: 13,
    approval: true,
    label: ' F',
    modalId: 'quoteApproval',
    approvalRequiredForQuote: '',

    nextStatus: statuses.SHARE.value,
    validFor: [statuses.APPROVAL.value, 'APPROVAL']
  }
};

const permissionaction = {
  approvalleadpermission: {
    id: 36,
    label: 'Reassign for Approval',
    //  permission:"dlpm.lp.quote.v1.F",

    nextStatus: 'OPPORTUNITY_CREATION',
    validFor: ['LEAD_APPROVAL'],
    modalId: 'reassignApproval'
  }
};
const actions = {
  Product_APPROVED: {
    id: 1001,
    label: 'Product configuration',
    validFor: [''],
    modalId: 'ProductConfiguration'
  },
  InitialState: {
    id: 1002,
    label: 'In-Test',
    validFor: ['Initial'],
    modalId: 'In test'
  },

  setAvailable: {
    id: 1008,
    label: ' Set Available & UnAvailable',
    validFor: ['Unavailble', 'Un Available', 'Available'],
    modalId: 'Available'
  },

  // Edituser:{
  //   id: 1005,
  //   label: ' Edit',
  //   validFor: ["Available", "Un Available", "Unavailble"],
  //   modalId: 'Edit'
  // },
  // setUnAvailable:{
  //   id: 1006,
  //   label: ' Set UnAvailable Period',
  //   validFor: ["Un Available", "Available", "Unavailble"],
  //   modalId: 'Un Available'
  // },

  LaunchedState: {
    id: 1003,
    label: 'Launched',
    validFor: [''],
    modalId: 'Launched'
  },
  Active: {
    id: 1004,
    label: 'Active',
    modalId: 'Active',
    validFor: ['In test']
  },

  FLead: {
    id: 1,
    label: 'F Lead',
    permission: 'dlpm.lp.lead.v1.F',
    approval: true,
    onlyForAccountManger: true,
    approvalRequiredForLead: true,
    nextStatus: statuses.OPPORTUNITY_CREATION.value,
    validFor: [statuses.LEAD_APPROVAL.value],
    modalId: 'approveLead'
  },

  customerAccepted: {
    approval: true,
    id: 2,
    modalId: 'customerAcceptence',
    actionblob: 'customerAcceptence',
    label: 'Customer Accepted',
    onlyForAccountManger: false,
    nextStatus: 'ONBOARDING',
    validFor: ['CUSTOMER_ACCEPTANCE']
  },
  ContractCreactNewMenu: {
    id: 2002,
    modalId: 'createContract',
    label: 'Add Contract',
    nextStatus: '',
    href: 'contract',
    // actionType: 'Create Contract',
    validFor: ['CREATE CONTRACT']
  },
  customerRejected: {
    id: 3,
    approval: true,
    modalId: 'customerRejection',
    actionblob: 'customerRejection',
    label: 'Customer Rejected',
    nextStatus: 'QUOTE_REJECTED',
    validFor: ['CUSTOMER_ACCEPTANCE','Share Contract']
  },
  approveFromWarehouse: {
    id: 4,
    approval: true,
    label: 'Approve',
    nextStatus: statuses.APPROVED_FROM_WAREHOUSE.value,
    validFor: [statuses.WAREHOUSE_APPROVAL.value]
  },
  rejectFromWarehouse: {
    id: 5,
    approval: true,
    label: 'Reject',
    nextStatus: statuses.REJECTED_FROM_WAREHOUSE.value,
    validFor: [statuses.WAREHOUSE_APPROVAL.value]
  },
  ModifiContract: {
    id: 49,
    approval: true,
    label: 'Modify Contract',
    modalId: 'ModifyContract',
    nextStatus: statuses.REJECTED_FROM_WAREHOUSE.value,
    validFor: ['']
  },

  addOpportunity: {
    id: 6,
    approval: true,
    label: 'Add Opportunity',
    nextStatus: '',
    modalId: 'opportunityCreation',
    actionType: 'ADD_OPPORTUNITY',
    validFor: [
      statuses.OPPORTUNITY_CREATION.value,
      'FEASIBILITY_FAILED',
      statuses.APPROVED_FROM_WAREHOUSE.value
    ]
  },

  OpportunityCreation: {
    id: 35,
    approval: true,
    label: 'Add Opportunity',
    nextStatus: '',
    modalId: 'opportunityCreation',
    actionType: 'ADD_OPPORTUNITY',
    validFor: ['FEASIBILITY_FAILED']
  },
  generateQuote: {
    id: 7,
    approval: true,
    label: 'Generate Quote',
    modalId: 'quoteGeneration',
    nextStatus: statuses.APPROVAL.value,
    validFor: [statuses.QUOTE_GENERATE.value]
  },
  reviseQuote: {
    id: 8,
    approval: true,
    label: 'Revise Quote',
    nextStatus: statuses.APPROVAL.value,
    validFor: ['']
  },
  feasibilityComplete: {
    id: 9,
    approval: true,
    // permission:"dlpm.lp.lead.v1.manualFeasibility",
    label: 'Feasibility Complete',
    modalId: 'feasibilityComplete',
    actionType: 'approveManualFeasibility',
    // nextStatus: statuses.WAREHOUSE_APPROVAL.value,
    validFor: ['MANUAL_FEASIBILITY', 'MANUAL_FEASIBLE_CHECK']
  },
  feasibilityFailed: {
    id: 10,
    approval: true,
    label: 'Feasibility Failed',
    secondaryLabel: 'Reject',
    actionType: 'ManualFeasibilityFailed',
    // nextStatus: statuses.FEASIBILITY_FAILED.value,
    validFor: ['MANUAL_FEASIBILITY']
  },
  modifyQuote: {
    id: 11,
    approval: true,
    label: 'Modify Quote',
    modalId: 'quoteGeneration',
    nextStatus: 'MODIFY_QUOTE',
    validFor: ['MODIFY_QUOTE']
  },

  managehierarchy: {
    id: 37,
    approval: true,
    label: <Trans id="Manage Hierarchy"></Trans>,
    nextStatus: '',

    modalId: 'manageHierarchy',
    validFor: ['Active','PENDING', 'ACTIVE']
  },
  
  // reOpenAccount: {
  //   id: 42,
  //   approval: true,
  //   label: ' "Re-Active Account',
  //   modalId: 'onReOpenAccountHandle',
  //   // actionType: 'Sharecontract',
  //   nextStatus: '',
  //   validFor: ['CLOSED']
  // },

  Deactive: {
    id: 37,
    approval: true,
    label: 'De-Active',
    nextStatus: '',

    actionType: 'DeactiveAccount',
    validFor: ['']
  },
  approvaltask: {
    id: 38,
    approval: true,
    label: 'Accept',
    nextStatus: '',
    typeLabel: 'Approved',
    status: 'Approve',
    modalId: 'Approval',
    validFor: ['pending']
  },

  masterForm: {
    id: 38,
    approval: true,
    label: 'On-Board',
    nextStatus: '',

    modalId: 'Masterform',
    validFor: ['Pending']
  },

  rejectTask: {
    id: 39,
    approval: true,
    label: 'Reject',
    typeLabel: 'Reject',
    nextStatus: '',

    status: 'Reject',
    modalId: 'Approval',
    validFor: ['pending']
  },
  ModifyContract: {
    id: 34,
    approval: true,
    label: 'Modify Contract',
    nextStatus: '',
    actionType: 'Create Contract',

    modalId: 'ContractCreation',
    validFor: ['MODIFY_CONTRACT']
  },
  rejectQuote: {
    id: 12,
    approval: true,
    accountManager: true,
    label: 'Reject',

    modalId: 'quoteReject',
    nextStatus: statuses.QUOTE_REJECTED.value,
    validFor: [statuses.APPROVAL.value, 'APPROVAL']
  },

  approveQuote: {
    id: 13,
    approval: true,
    label: ' Approve',
    modalId: 'quoteApproval',
    approvalRequiredForQuote: true,
    // permission:"dlpm.lp.quote.v1.quote,",
    nextStatus: statuses.SHARE.value,
    validFor: [statuses.APPROVAL.value, 'APPROVAL']
  },
  createQuote: {
    id: 14,
    approval: true,
    label: 'Revise Quote',
    modalId: 'quoteGeneration',
    nextStatus: '',
    actionType: 'CREATE_QUOTE',
    validFor: ['QUOTE_EXPIRED', 'CUSTOMER_REJECTED', 'QUOTE_REJECTED']
  },

  ContractApproval: {
    id: 25,
    approval: true,
    label: 'Contract Approval',
    modalId: 'ContractApproval',
    nextStatus: '',
    actionType: 'APPROVAL',
    validFor: []
  },
  ContractSignoff: {
    id: 26,
    approval: true,
    label: 'Contract Sign-off',
    modalId: 'ContractSignoff',
    nextStatus: '',
    actionType: 'CONTRACT_SIGN_OFF ',
    validFor: ['CONTRACT_SIGN_OFF', 'SIGN OFF']
  },

  leadClassification: {
    id: 15,
    approval: true,
    label: 'Lead Classification',
    nextStatus: '',
    actionType: 'LEAD_CLASSIFICATION',
    modalId: 'leadClassification',
    validFor: [
      statuses.APPROVED_FROM_WAREHOUSE.value,
      // statuses.QUOTE_REJECTED.value,
      statuses.SHARE.value,
      statuses.APPROVAL.value,
      'PRODUCT_CONFIGURATION',
      'QUOTE_GENERATE',
      'LEAD_APPROVAL',
      'OPPORTUNITY_CREATION',

      'CUSTOMER_REJECTED',
      'MANUAL_FEASIBILITY',
      'APPROVAL',
      'CONTRACT_SIGN_OFF',
      'LEAD_DROPPED',
      'LEAD_GENERATION'
    ]
  },

  downloadQuote: {
    id: 16,
    approval: true,
    label: 'Download ',
    nextStatus: '',
    actionType: 'downloadQuote',
    validFor: [
      statuses.SHARE.value,
      statuses.CUSTOMER_ACCEPTANCE.value,
      statuses.APPROVAL.value,
      'CUSTOMER_REJECTED',
      'QUOTE_REJECTED',
      'CUSTOMER_ACCEPTED',
      'APPROVAL',
      'CONTRACT_SIGN_OFF'
      // "QUOTE_EXPIRED"
    ]
  },
  shareQuotation: {
    id: 17,
    approval: true,
    label: 'Share',
    nextStatus: '',
    modalId: 'shareQuotation',
    actionBlob: 'shareAttachment',
    actionType: 'SHARE',
    validFor: [statuses.SHARE.value, 'CUSTOMER_REJECTED']
  },
  startOnbarding: {
    id: 20,
    approval: true,
    label: 'Start Registration',
    nextStatus: 'ONBOARDED',
    actionType: 'startonboarding',

    // modalId: "startOnboarding",
    validFor: ['ONBOARDING']
  },

  ONBOARDED: {
    id: 22,
    approval: true,
    label: 'Start Registration',
    nextStatus: '',
    actionType: 'Onborded',

    // modalId: "startOnboarding",
    validFor: ['']
  },

  SERVICE_ADDED: {
    id: 27,
    approval: true,
    label: 'Serivice',
    nextStatus: '',
    actionType: 'Onborded',

    // modalId: "startOnboarding",
    validFor: ['']
  },
  ADDSERVICE: {
    id: 24,
    approval: true,
    label: 'Start Add Service',
    nextStatus: '',
    actionType: 'startonboarding',

    // modalId: "startOnboarding",
    validFor: ['ADD_SERVICE']
  },

  createContract: {
    id: 23,
    approval: true,
    label: 'Create Contract',
    nextStatus: '',
    actionType: 'Create Contract',

    modalId: 'ContractCreation',
    validFor: ['']
  },
  dropLead: {
    id: 18,
    approval: true,
    label: 'Drop Lead',
    nextStatus: statuses.LEAD_DROPPED.value,
    modalId: 'dropLead',
    validFor: [
      statuses.LEAD_APPROVAL.value
      // statuses.QUOTE_EXPIRED.value,
      // statuses.APPROVED_FROM_WAREHOUSE.value,
      // statuses.QUOTE_GENERATE.value,
      // statuses.APPROVAL.value,
      // statuses.CUSTOMER_ACCEPTANCE.value,
      // statuses.SHARE.value,

      // statuses.OPPORTUNITY_CREATION.value,
      // statuses.MANUAL_FEASIBILITY.value,
      // "ONBOARDING",
      // "ADD_OPPORTUNITY",
      // "APPROVAL",
      // "PRODUCT_CONFIGURATION",
      // "CONTRACT_SIGN_OFF"
    ]
  },
  reassignLead: {
    id: 19,
    approval: true,
    label: 'Reassign Lead',
    nextStatus: '',
    actionType: 'REASSING_LEAD',
    modalId: 'reassignLead',
    validFor: [
      statuses.QUOTE_EXPIRED.value,
      // statuses.QUOTE_REJECTED.value,
      statuses.APPROVAL.value,
      statuses.CUSTOMER_ACCEPTANCE.value,
      statuses.SHARE.value,
      statuses.QUOTE_GENERATE.value,
      statuses.OPPORTUNITY_CREATION.value,
      statuses.LEAD_APPROVAL.value,
      statuses.WAREHOUSE_APPROVAL.value,
      statuses.APPROVED_FROM_WAREHOUSE.value,
      'ONBOARDING',
      'MANUAL_FEASIBILITY',
      'ADD_OPPORTUNITY',
      'PRODUCT_CONFIGURATION',
      'CONTRACT_SIGN_OFF',
      'LEAD_DROPPED',
      'LEAD_GENERATION'
    ]
  },
  // addOpportunity: {
  //   id: 6,
  //   approval: true,
  //   label: 'Add Opportunity',
  //   nextStatus: '',
  //   modalId: 'opportunityCreation',
  //   actionType: 'ADD_OPPORTUNITY',
  //   validFor: [
  //     statuses.OPPORTUNITY_CREATION.value,
  //     statuses.APPROVED_FROM_WAREHOUSE.value
  //   ]
  // },
  ProductConfiguration: {
    id: 21,
    approval: true,
    label: 'Product Configuration',
    modalId: 'productConfiguration',
    actionType: 'PRODUCT_CONFIGURATION',
    nextStatus: '',
    validFor: ['PRODUCT_CONFIGURATION', '']
  },
  ContractExpired: {
    id: 28,
    approval: true,
    label: 'Revise Contract',
    modalId: 'ContractCreation',
    actionType: 'CONTRACT_EXPIRED',

    nextStatus: '',
    validFor: ['CONTRACT_EXPIRED', '']
  },

  ReviseContract: {
    id: 29,
    approval: true,
    label: 'Revise Contract',
    modalId: 'ContractCreation',
    actionType: 'Revise Contract',
    nextStatus: 'REVISE_CONTRACT',
    validFor: ['REVISE_CONTRACT', '']
  },

  leadReOpen: {
    id: 30,
    approval: true,
    label: 'Re-open Lead',
    // onlyForAccountManger: true,
    // nextStatus: statuses.Lead_Generation.value,
    validFor: [statuses.LEAD_DROPPED.value],
    modalId: 'reopenLead'
  },
  LeadGeneration: {
    id: 31,
    approval: true,
    label: 'Lead Generation',
    validFor: [statuses.LEAD_GENERATION.value],
    modalId: 'leadCreation'
  },
  DropOpportunity: {
    id: 32,
    approval: true,
    label: 'Drop Opportunity',
    validFor: [
      statuses.QUOTE_EXPIRED.value,
      statuses.APPROVED_FROM_WAREHOUSE.value,
      statuses.QUOTE_GENERATE.value,
      statuses.APPROVAL.value,
      statuses.CUSTOMER_ACCEPTANCE.value,
      statuses.SHARE.value,

      // statuses.OPPORTUNITY_CREATION.value,
      statuses.MANUAL_FEASIBILITY.value,
      'ONBOARDING',
      'ADD_OPPORTUNITY',
      'APPROVAL',
      'PRODUCT_CONFIGURATION',
      'CONTRACT_SIGN_OFF'
    ],
    modalId: 'dropOpportunity'
  },
  ChangePlan: {
    id: 30,
    approval: true,
    label: 'Change Plan',
    // modalId: "ChangePlan",
    actionType: 'startonboarding',
    nextStatus: 'CHANGE_PLAN',
    validFor: ['CHANGE_PLAN', '']
  },

  INVOICEPRINT: {
    id: 46,
    approval: true,
    label: 'Print',

    actionType: 'generateInvoicelink',
    // actionType: 'Sharecontract',
    nextStatus: 'Yes',
    validFor: ['Unpaid', 'Paid']
  },
  INVOICELISTSHARE: {
    id: 47,
    approval: true,
    label: 'Share',
    modalId: 'ShareNotification',
    // actionType: 'shareInvoice',
    // actionType: 'Sharecontract',
    nextStatus: 'Yes',
    validFor: ['Unpaid', 'Paid']
  },

  BillingAdjustment: {
    id: 48,
    approval: true,
    label: 'Billing Adjustment',
    modalId: 'InvoiceAdjustment',

    nextStatus: 'Yes',
    validFor: ['Unpaid', 'Paid']
  },
  InvioceDownload: {
    id: 50,
    approval: true,
    label: 'Download',
    // modalId: "Share",
    type: 'downloadinvoice',
    actionBlob: 'downloadInvoice',
    actionType: 'downloadInvoice',
    nextStatus: 'Yes',
    validFor: ['Unpaid', 'Paid']
  },

  Contract_Shared: {
    id: 40,
    approval: true,
    label: 'Share Contract',
    modalId: 'ShareContract',
    // actionType: 'Sharecontract',
    nextStatus: 'Yes',
    validFor: ['Yes', 'Approved','SHARE CONTRACT']
  },
  Modify_contract: {
    id: 42,
    approval: true,
    label: 'Modify Contract',
    modalId: 'ContractSignpreview',
    // actionType: 'Sharecontract',
    nextStatus: 'no',
    validFor: ['']
  },
  download_contract: {
    id: 43,
    approval: true,
    label: 'Download Contract',
    // modalId: "DownloadContract",
    actionType: 'downloadContract',
    nextStatus: 'no',
    validFor: ['Active', 'Agent Accpetance', 'Sign Off', 'Payment Pending']
  },

  Addcontract: {
    id: 44,
    approval: true,
    label: 'Add Contract',
    modalId: 'ProductContract',
    actionType: 'AddContract',
    nextStatus: 'no',
    validFor: ['CREATE_CONTRACT']
  },
  Make_Payment:{
    id:100,
    approval: true,
    label: 'Make payment',
    // actionType: 'makePayment',
    href:'/payment',
    nextStatus: 'no',  
    validFor: ['Payment Pending'] 
  },
  Contract_SignOff: {
    id: 41,
    approval: true,
    label: 'Contract Sign-off',
    modalId: 'ContractSignpreview',
    actionType: 'ContractSignpreview',
    nextStatus: 'NO',
    validFor: ['Accepted','Sign Off']
  },

  Unpaidpayment: {
    id: 45,
    approval: true,
    label: 'Pay Invoice ',
    modalId: 'PayInvoiceDetails',
    // actionType: 'ContractSignpreview',
    nextStatus: 'Unpaid',
    validFor: ['Unpaid', '']
  }
};

const stepperlabel = {
  Opportunity: [
    ' SELECT SUBSCRIPTION',
    'OPPORTUNITY CREATION',
    'PRODUCT  CONFIGURATION ',
    'QUOTE GENERATION',
    'CREATE CONTRACT',

    'CONTRACT SIGN OFF'
  ],
  vas: [
    ' SELECT SUBSCRIPTION',
    'ADD VAS',
    'PRODUCT  CONFIGURATION ',
    'QUOTE GENERATION',
    'CREATE CONTRACT',

    'CONTRACT SIGN OFF'
  ],

  steps: [
    'LEAD GENERATION',
    'OPPORTUNITY CREATION',
    'PRODUCT  CONFIGURATION ',
    'QUOTE GENERATION',
    'CREATE CONTRACT',

    'CONTRACT SIGN OFF',

    'CUSTOMER ACCEPTANCE ',

    'ONBOARDING'
  ],
  adjustmentSteps: ['INVOICE SELECTION', 'INVOICE ADJUSTMENT', 'CONFIRMATION']
};

const valideforstatus = [
  'APPROVAL',
  'CUSTOMER_REJECTED',
  'QUOTE_REJECTED',
  'CUSTOMER_ACCEPTANCE',
  'QUOTE_EXPIRED',
  'SHARE',
  'CONTRACT_APPROVAL',
  'ONBOARDING',
  'ADD_SERVICE',

  'CONTRACT_EXPIRED',
  'CONTRACT_SIGN_OFF',

  'CHANGE_PLAN',
  'ADD_VAS',
  'SERVICE_ADDED',
  'MODIFY_CONTRACT'
];
const AfterStatus = [
  // "LEAD_APPROVAL",
  'CHANGE_PLAN',
  'ADD_VAS',
  'ADD_SERVICE',
  'ADD_SERVICE',
  'SERVICE_ADDED',
  'ONBOARDING',
  'ONBOARDED'
];

const detailsPageActions = {
  APPROVAL: {
    primary: actions.approveQuote,
    secondary: actions.rejectQuote
  },
  LEAD_APPROVAL: {
    primary: actions.approveLead,
    secondary: actions.drop
  },
  OPPORTUNITY_CREATION: {
    primary: actions.addOpportunity
  },
  QUOTE_GENERATE: {
    primary: actions.generateQuote
  },
  MANUAL_FEASIBILITY: {
    primary: actions.feasibilityComplete,
    secondary: actions.feasibilityFailed
  },
  WAREHOUSE_APPROVAL: {
    primary: actions.approveFromWarehouse,
    secondary: actions.rejectFromWarehouse
  },
  SHARE: {
    primary: actions.shareQuotation
  },
  ONBOARDING: {
    primary: actions.startOnbarding
  },
  CUSTOMER_ACCEPTANCE: {
    primary: actions.customerAccepted
  },
  PRODUCT_CONFIGURATION: {
    primary: actions.ProductConfiguration
  },
  LEAD_DROPPED: {
    primary: actions.leadReOpen
  },
  LEAD_GENERATION: {
    primary: actions.LeadGeneration
  },

  pending: {
    primary: actions.approvaltask,
    secondary: actions.rejectTask
  },

  ['CREATE CONTRACT']: {
    primary: actions.ContractCreactNewMenu
  },
  ['SHARE CONTRACT']: {
    primary: actions.Contract_Shared
  },
  ['SIGN OFF']: {
    primary: actions.Contract_SignOff
  },
  ['PAYMENT PENDING']: {
    primary: actions.Make_Payment
  }

  // ONBOARDED: {

  //   primary: actions.ONBOARDED,
  //   secondary: actions.ONBOARDED,
  // }
};

const tabledata = [
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      contractname: 'ORD00555',
      ContractType: 'Auto-Renewal',
      ContractPeriod: '12 Months',
      Signoffdate: '11 May 2020 11:30 AM',
      Startdate: '11 May 2020 11:30 AM',
      enddate: '11 May 2020 11:30 AM',
      status: 'APPROVAL'
    }
  }
];

const request = [
  {
    columns: {
      id: 'SRQ00666',
      RequestType: 'New Registration',
      Startdate: '11 May 2020 11:30 AM',
      assignee: 'Jessica Pearson',
      status: 'Product_Config_DCM'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      RequestType: 'New Registration',
      Startdate: '11 May 2020 11:30 AM',
      assignee: 'Jessica Pearson',
      status: 'Product_Config_DCM'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      RequestType: 'New Registration',
      Startdate: '11 May 2020 11:30 AM',
      assignee: 'Jessica Pearson',
      status: 'Product_Config_DCM'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      RequestType: 'New Registration',
      Startdate: '11 May 2020 11:30 AM',
      assignee: 'Jessica Pearson',
      status: 'Product_Config_DCM'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      RequestType: 'New Registration',
      Startdate: '11 May 2020 11:30 AM',
      assignee: 'Jessica Pearson',
      status: 'Product_Config_DCM'
    }
  }
];

const serviceRequestType = {
  CUSTOMER_UPDATE: 'CustomerInformationUpdateRequest',
  BILLING_ACCOUNT_UPDATE: 'BillingAccountUpdateRequest',
  REGISTRATION: 'RegistrationRequest',
  ADD_VAS: 'AddVasProductRequest',
  ADD_SERVICE: 'AddPlanProductRequest',
  CHANGE_OF_PLAN: 'ChangePlanProductRequest',
  CREDIT_LIMIT: 'ChangeCreditLimitRequest',
  REVOKE_SUSPENSION: 'RevokeSuspendProductRequest',
  REVERT_SUSPENSION: 'ReverseSuspendProductRequest',
  REVERT_SOFT_SUSPENSION: 'ReverseSoftSuspendProductRequest',
  REVERT_TERMINATION: 'ReverseTerminateProductRequest',
  SUSPENSION: 'SuspendProductRequest',
  SIM_CHANGE: 'SimChangeRequest',
  TERMINATION: 'TerminatePlanProductRequest',
  MANAGE_VAS: {
    TERMINATE: 'TerminateVASProductRequest'
  },
  PROMISE_TO_PAY: 'PromiseToPayRequest',
  PORT_IN_REQUEST: 'PortInRequest',
  PAY_BILL: 'PaymentAgainstInvoiceRequest',
  TRANSFER_OF_OWNERSHIP: 'TransferOfOwnershipRequest',
  CORPORATE_REGISTRATION: 'CorporateRegistrationRequest',
  CHANGE_OF_LANGUAGE: 'ChangeLanguageRequest',
  CHANGE_OF_SERVICE_ID: 'ChangeOfServiceIdRequest',
  SOFT_SUSPENSION: 'SoftSuspendProductRequest',
  RESET_PASSWORD: 'ResetPasswordRequest',
  LOCATION_TRANSFER: 'RelocateProductRequest',
  PRE_TO_POST_REQUEST: 'PreToPostRequest',
  POST_TO_PRE_REQUEST: 'PostToPreRequest',
  BAR_UNBAR: 'BarUnbarRequest',
  SERVICE_CLASS_CHANGE: 'ServiceClassChangeRequest',
  PUSH_GPRRS: 'PushGprsRequest',
  DUNNING: 'HoldUnholdDunningRequest',
  TROUBLE_TICKET: 'TroubleTicketRequest',
  MODIFY_PLAN: 'ModifyPlanProductRequest',
  CHANGE_ACCOUNT_CREDIT_LIMIT: 'ChangeAccountCreditLimitRequest',
  BILLING_ADJUSTMENT: 'BillingAdjustmentRequest',
  MODIFY_ORDER: 'ModifyOrder',
  PIN_PUK_REQUEST: 'PinPukRequest',
  PAYMENT_REVERSAL: 'PaymentReversalRequest',
  LOYALTY_ONBOARD_REQUEST: 'LoyaltyOnBoardMemberRequest',
  REVOKE_SOFT_SUSPENSION: 'RevokeSoftSuspendProductRequest',
  GROUP_DATA_SHARE: 'GroupDataShareManageConsumerRequest',
  WALLET_PIN_RESET: 'WalletPinResetRequest',
  BLOCK_UNBLOCK_WALLET: 'WalletStateChangeRequest',
  EQUIPMENT_CHANGE: 'EquipmentChangeRequest',
  NOTIFICATION_REQUEST: 'NotificationRequest',
  LINK_DELINK: 'LinkDelink',
  DLPM_ADD_SERVICE: 'DLPMAddService',
  LINK_PRODUCT_USER: 'LinkProductUserRequest',
  MODIFY_PRICE_REQUEST: 'ModifyPriceRequest',
  REVERT_CHANGE_OF_PLAN: 'ReverseChangePlanProductRequest',
  DLPM_ADD_VAS: 'DLPMAddVas',
  DLPM_CHANGE_PLAN: 'DLPMChangePlan',
  NOMINATE_PROFILE_OWNER: 'NominateProfileOwner',
  NOMINATE_ACCOUNT_OWNER: 'NominateAccountOwner',
  DND_REQUEST: 'DNDRequest',
  CORPORATE_PORT_IN: 'CorporatePortInRequest',
  DOCUMENT_UPLOAD_REQUEST: 'DocumentUploadRequest'
};
const payments = [
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      method: 'Cheque',
      amount: 'KWD 500.00',
      status: 'Active'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      method: 'Cheque',
      amount: 'KWD 500.00',
      status: 'Active'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      method: 'Cheque',
      amount: 'KWD 500.00',
      status: 'Active'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      method: 'Cheque',
      amount: 'KWD 500.00',
      status: 'Active'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      method: 'Cheque',
      amount: 'KWD 500.00',
      status: 'Active'
    }
  }
];

const adjustments = [
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      type: 'Credit',
      amount: 'KWD 500.00',
      Agentname: 'Jessica Pearson'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      type: 'Credit',
      amount: 'KWD 500.00',
      Agentname: 'Jessica Pearson'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      type: 'Transfer',
      amount: 'KWD 500.00',
      Agentname: 'Jessica Pearson'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      type: 'Debit',
      amount: 'KWD 500.00',
      Agentname: 'Jessica Pearson'
    }
  },
  {
    columns: {
      id: 'SRQ00666',
      Date: '11 May 2020 11:30 AM',
      type: 'Debit',
      amount: 'KWD 500.00',
      Agentname: 'Jessica Pearson'
    }
  }
];

const settlement = [
  {
    columns: {
      CustomerName: 'Himanshu',
      SubscriptionID: 'SRQ00666',
      ProductName: 'GSM',
      PurchaseDate: '11 May 2020 11:30 AM',
      Settlementperiod: 'Monthly',
      ReceivedAmount: 'KWD 500.00',
      PercentageAmount: 'KWD 500.00',
      Partnershare: 'KWD 500.00'
    }
  },
  {
    columns: {
      CustomerName: 'Himanshu',
      SubscriptionID: 'SRQ00666',
      ProductName: 'GSM',
      PurchaseDate: '11 May 2020 11:30 AM',
      Settlementperiod: 'Monthly',
      ReceivedAmount: 'KWD 500.00',
      PercentageAmount: 'KWD 500.00',
      Partnershare: 'KWD 500.00'
    }
  },
  {
    columns: {
      CustomerName: 'Himanshu',
      SubscriptionID: 'SRQ00666',
      ProductName: 'MOBILE',
      PurchaseDate: '11 May 2020 11:30 AM',
      Settlementperiod: 'Monthly',
      ReceivedAmount: 'KWD 500.00',
      PercentageAmount: 'KWD 500.00',
      Partnershare: 'KWD 500.00'
    }
  },
  {
    columns: {
      CustomerName: 'Himanshu',
      SubscriptionID: 'SRQ00666',
      ProductName: 'GSM',
      PurchaseDate: '11 May 2020 11:30 AM',
      Settlementperiod: 'Monthly',
      ReceivedAmount: 'KWD 500.00',
      PercentageAmount: 'KWD 500.00',
      Partnershare: 'KWD 500.00'
    }
  },
  {
    columns: {
      CustomerName: 'Himanshu',
      SubscriptionID: 'SRQ00666',
      ProductName: 'GSM',
      PurchaseDate: '11 May 2020 11:30 AM',
      Settlementperiod: 'Monthly',
      ReceivedAmount: 'KWD 500.00',
      PercentageAmount: 'KWD 500.00',
      Partnershare: 'KWD 500.00'
    }
  }
];

const ApprovalIndex = {
  Approve: 2,
  pending: 1
};
const chnageplanstepperIndex = {
  OPPORTUNITY_CREATION: 1,

  PRODUCT_CONFIGURATION: 1,
  // QUOTE_GENERATE: 4,
  QUOTE_GENERATE: 2,

  CONTRACT_EXPIRED: 3,
  APPROVAL: 3,
  MANUAL_FEASIBILITY: 1,

  CONTRACT_SIGN_OFF: 4,
  CREATE_CONTRACT: 3,
  CUSTOMER_ACCEPTANCE: 5,
  // CREATE_CONTRACT: 3,
  SHARE: 4,
  // CONTRACT_EXPIRED: 3,
  QUOTE_REJECTED: 3,
  QUOTE_EXPIRED: 3,
  CHANGE_PLAN: 5,
  PLAN_ADDED: 5,
  ADD_VAS: 5,
  VAS_ADDED: 5
};

const stepperIndex = {
  LEAD_DROPPED: 0,
  LEAD_APPROVAL: 1,
  OPPORTUNITY_CREATION: 2,
  MANUAL_FEASIBILITY: 3,
  PRODUCT_CONFIGURATION: 4,
  // QUOTE_GENERATE: 4,
  QUOTE_GENERATE: 5,
  APPROVAL: 7,
  CONTRACT_EXPIRED: 5,
  // APPROVAL: 7,

  QUOTE_REJECTED: 5,
  SHARE: 8,
  QUOTE_EXPIRED: 5,
  // APPROVAL: 7,
  CUSTOMER_ACCEPTANCE: 10,
  CUSTOMER_ACCEPTED: 10,
  CREATE_CONTRACT: 6,
  MODIFY_CONTRACT: 6,
  CUSTOMER_REJECTED: 10,
  CONTRACT_SIGN_OFF: 9,
  ADD_SERVICE: 11,
  ONBOARDED: 12,
  ONBOARDING: 11,
  PLAN_ADDED: 11,
  // MANUAL_FEASIBILITY: 3,
  SERVICE_ADDED: 11,
  // ADD_SERVICE: 11,
  REVISE_CONTRACT: 7,
  CHANGE_PLAN: 12,
  MODIFY_QUOTE: 5
};
const docStatus = {
  uploaded: {
    value: 'uploaded',
    color: 'orange'
  }
};

const eventColor = {
  Call: {
    value: 'Call',
    color: 'pink'
  },
  Meeting: {
    value: 'Meeting',
    color: 'skyBlue'
  },
  Email: {
    value: 'Email',
    color: 'blue'
  }
};

const dynamicsteps = [
  {
    id: 1,
    label: 'LEAD GENERATION',
    status: 'LEAD_GENERATION',
    changeDate: ''
  },
  {
    id: 2,
    label: 'LEAD APPROVAL',
    status: 'LEAD_APPROVAL',
    changeDate: ''
  },
  {
    id: 3,
    label: 'OPPORTUNITY CREATION',
    status: 'OPPORTUNITY_CREATION',
    changeDate: ''
  },

  {
    id: 4,
    label: 'PRODUCT CONFIGURATION',
    status: 'PRODUCT_CONFIGURATION',
    changeDate: ''
  },
  {
    id: 5,
    label: 'MANUAL FEASIBILITY',
    status: 'MANUAL_FEASIBILITY',
    changeDate: ''
  },

  {
    id: 6,
    label: 'QUOTE GENERATE',
    status: 'QUOTE_GENERATE',
    changeDate: ''
  },
  {
    id: 7,
    label: 'Create CONTRACT ',
    status: 'CREATE_CONTRACT',
    changeDate: ''
  },
  {
    id: 8,
    label: 'APPROVAL',
    status: 'APPROVAL',
    changeDate: ''
  },
  {
    id: 9,
    label: 'SHARE',
    status: 'SHARE',
    changeDate: ''
  },
  {
    id: 10,
    label: 'CONTRACT SIGN OFF',
    status: 'CONTRACT_SIGN_OFF',
    changeDate: ''
  },
  {
    id: 11,
    label: 'CUSTOMER ACCEPTANCE',
    status: 'CUSTOMER_ACCEPTANCE',
    changeDate: ''
  },
  {
    id: 12,
    label: 'ONBOARDING',
    status: 'ONBOARDING',
    changeDate: ''
  }
];

const thorwErrormsg = {
  master: {
    type: 'Partner'
  },
  tenant: {
    type: 'Tenant'
  }
};
const EditActions = {
  mtn: {
    PartnerDetails: {
      value: [{ name: 'Edit', code: 'Edit' }]
    },
    CompanyAddress: {
      value: [{ name: 'Edit', code: 'Edit' }]
    },
    BillingDetails: {
      value: [{ name: 'Edit', code: 'Edit' }]
    },
    PrimaryContactDetails: {
      value: [{ name: 'Edit', code: 'Edit' }]
    }
  },
  stc: {},
  tecnotree: {},
  zbahrain: {},
  moments: {}
};
const OpcoStatus = {
  Opco: ['mtn', 'moments']
};

const TableSearchOptions = {
  OrderTracking: [
    { id: 1, name: 'Customer ID', url: 'CustomerID' },
    { id: 2, name: 'Product Name', url: 'ProductName' },

    { id: 3, name: 'Product ID', url: 'ProductID' }
  ],
  mytasksOptions: [
    { id: 1, name: 'Request ID', url: 'CustomerID' },
    { id: 2, name: 'Approvel Type', url: 'ProductName' }
  ],
  Partner: [
    { id: 1, name: 'Partner ID', url: 'CustomerID' },
    { id: 2, name: 'Partner Name', url: 'ProductName' }
  ],
  Tenants: [
    { id: 1, name: 'Tenant ID', url: 'CustomerID' },
    { id: 2, name: 'Tanent Name', url: 'ProductName' }
  ]
};

const DashBoardStatus = {
  partnerValue: 'partnerStatus',
  tenantValue: 'TenantStatus'
};
export default {
  dynamicsteps,
  // dynamicStepperdata,
  actions,
  statuses,
  stepperIndex,
  detailsPageActions,
  docStatus,
  eventColor,
  stepperlabel,
  chnageplanstepperIndex,
  tabledata,
  valideforstatus,
  AfterStatus,
  approvalstatus,
  permissionaction,
  request,
  payments,
  adjustments,
  settlement,
  ApprovalIndex,
  thorwErrormsg,
  EditActions,
  serviceRequestType,
  OpcoStatus,

  TableSearchOptions,
  DashBoardStatus
  // dynamicsteps
};
