// import defaultVariables from '../../../public/styles/defaultVariables'

const constants = {
  oAuth: {
    ACCESS_TOKEN: 'access_token',
    ID_TOKEN: 'id_token',
    EXPIRES_AT: 'expires_at',
    REFRESH_TOKEN: 'refresh_token'
  },
  dateFormat: {
    full: 'DD MMM YYYY hh:mm A',
    fullWithSec: 'DD-MMM-YYYY hh:mm:ss A',
    date: 'DD MMM YYYY',
    reverseDate: 'YYYY-MM-DD',
    time: 'hh:mm A',
    timeWithSec: 'hh:mm:ss A',
    fullDateMonthWithTime: 'DD MMM YYYY HH:mm',
    fullDateMonth: 'DD MMM YYYY',
    dob: 'DD-MM-YYYY',
    dateMonth: 'DD MMMM',
    fullMonth: 'MMM',
    fullDay: 'dddd',
    dateYear: 'YYYY',
    shortData: 'DD-MMM, YYYY',
    invoiceDate: 'DD MMM.YYYY',
    onlyTime: 'hh:mm:ss'
  },
  dateFormatFa: {
    full: 'jDD jMMM jYYYY hh:mm A',
    fullWithSec: 'jDD-jMMM-jYYYY hh:mm:ss A',
    date: 'jDD jMMM jYYYY',
    time: 'hh:mm A',
    timeWithSec: 'hh:mm:ss A',
    dob: 'jDD-jMM-jYYYY',
    dateMonth: 'jDD jMMMM',
    fullDateMonthWithTime: 'jDD jMMM jYYYY HH:mm',
    fullDateMonth: 'jDD jMMM jYYYY',
    dateYear: 'jYYYY',
    fullDate: 'jDD jMM jYYYY',
    reverseDate: 'jYYYY-jMM-jDD',
    onlyTime: 'hh:mm:ss'
  },
  DOBFormat: 'DD-MM-YYYY',
  DOBFormatFa: 'jDD-jMM-jYYYY',
  ContactTimeFormat: 'h a',
  searchString: {
    is: '=',
    'is greaterthan': '>'
  },
  customer: 'Customer',
  mother: 'mother',
  father: 'father',
  registration: 'Registration',
  documentPurposes: ['POID', 'addressProof', 'ageProof'],
  documentFields: {
    passport: [
      'documentType',
      'idNumber',
      'issueDate',
      'expiryDate',
      'placeOfIssue'
    ],
    nationalId: ['documentType', 'idNumber', 'issueDate', 'placeOfIssue'],
    drivingLicense: [
      'documentType',
      'idNumber',
      'issueDate',
      'expiryDate',
      'placeOfIssue'
    ]
  },
  documentTypes: {
    NATIONALID: 'nationalId',
    PASSPORT: 'passport',
    COMPANYREGISTRATION: 'companyRegistration'
  },
  year: 'year',
  month: 'month',
  businessType: {
    PREPAID: 'Prepaid',
    POSTPAID: 'Postpaid'
  },
  addressTypes: {
    // Need to be removed
    installationAddress: 'installationAddress',
    residentailAddress: 'residentialAddress',
    billingAddress: 'billingAddress',
    postalAddress: 'postalAddress',
    foreignAddress: 'foreignAddress'
  },
  addressFormats: {
    poBox: 'POBox',
    street: 'Street'
  },
  // TODO will be removed soon Please Use customertype at line below this
  customerTypes: {
    individual: 'I',
    retail: 'Retail',
    corporate: 'B',
    organization: 'Organization'
  },
  marketSegment: {
    corporate: 'EB',
    retail: 'Retail'
  },
  customerType: {
    individual: 'Individual',
    corporate: 'Organization'
  },
  customerStages: {
    customerCapture: 'customerCapture',
    accountCapture: 'accountCapture'
  },
  fileSpecs: {
    maxSize: 2048000,
    type: ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'],
    allowedTypes: ['image/*', '.xls', '.xlsx', '.doc', '.docx', '.pdf', '.txt'],
    allowedTypesRegex:
      /(\.jpg|\.jpeg|\.png|\.gif|\.xls|\.xlsx|\.doc|\.docx|\.pdf|\.txt)$/i
  },
  requestTable: {
    showDocuments: ['RegistrationRequest']
  },
  requestStatus: {
    draft: 'draft'
  },
  minAge: 18,
  chequeValidDate: 3,
  fieldLengths: {
    companyRegistrationNumber: 100,
    name: 120,
    middleAndLastName: 100,
    branchName: 30,
    mobile: 10,
    fixedLine: 10,
    email: 100,
    landmark: 100,
    pincode: 10,
    address: 100,
    idNumber: 30,
    cheque: 6,
    amount: 14,
    relation: 30,
    issuePlace: 30,
    fbId: 100,
    twitterHandle: 100,
    description: 30,
    commentNote: 250,
    OTP: 6,
    creditCard: 5,
    debitCard: 5,
    phoneWithHyphens: 12,
    denylistNote: 100
  },
  regex: {
    mobile: /^(\+91-|\+91|0)?\d{10}$/,
    phone: /^(\+91-|\+91|0)?\d{10}$/,
    phoneWithHyphens: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
    name: /^[A-Za-z,-.'&]*(\s[A-Za-z,-.'?&][A-Za-z,-.'&]*)+$/,
    shortName: /^[a-zA-Z ,-.'&]*$/,
    numbers: /^[0-9]*$/,
    amount: /^[0-9]*\.?([0-9]{1,2})$/,
    text: /^[a-zA-Z0-9,-.'&\/# ]*$/,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/,
    emailWithMaxLength:
      /^(?=.{1,100}$)[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/,
    alphabetsAndNumbers: /^[a-zA-Z0-9]*$/,
    socialHandle: /^[a-zA-Z0-9,-._#:/]*$/,
    alphabetsOnly: /^[a-zA-Z]*$/,
    idRegex: /^[a-zA-Z0-9,-.'&\/# ]*$/,
    url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    commaSeparatedEmails:
      /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/
  },
  regexFarsi: {
    shortName: /^[\u0600-\u06FF\s]+$/
  },

  customerActionsStatuses: ['inProgress', 'Trouble Ticket'],
  allowMultiplePaymentTypes: true,
  searchTags: [
    {
      title: 'Line of Business',
      id: 'lineOfBusiness',
      show: true,
      path: ''
    },
    {
      title: 'Technology',
      id: 'technology',
      show: true,
      path: ''
    },
    {
      title: 'Business Type',
      id: 'businessType',
      show: true,
      path: ''
    },
    {
      title: 'Category',
      id: 'category',
      show: true,
      path: ''
    },
    {
      title: 'Sub Category',
      id: 'subCategory',
      show: true,
      path: ''
    }
  ],
  interactionMenu: ['Cancel'],
  status: {
    DRAFT: 'draft',
    CAPTURED: 'captured',
    CREATED: 'created',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ACKNOWLEDGED: 'acknowledged',
    PARTIAL: 'partial',
    FAILED: 'failed',
    INPROGRESS: 'inProgress',
    PENDING: 'pending',
    UPLOADED: 'uploaded',
    COMPLETED: 'completed',
    FULFILLED: 'fulfilled',
    SUSPENDED: 'suspended',
    SOFT_SUSPENDED: 'softSuspended',
    TERMINATED: 'terminated',
    PENDINGACTIVE: 'pendingActive',
    PENDINGTERMINATE: 'pendingTerminate',
    ABORTED: 'aborted',
    RECEIVED: 'received',
    VERIFIED: 'verified',
    VALIDATED: 'validated',
    INITIALIZED: 'initialized',
    DECEASED: 'deceased',
    ASSESSINGCANCELLATION: 'assessingCancellation',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
    CANCELLED: 'cancelled',
    CLOSED: 'closed',
    HELD: 'held',
    OPEN: 'open',
    INPROGRESSESCALATED: 'inProgressEscalated',
    INPROGRESSREOPENED: 'inProgressReopened',
    RECENT: 'recent',
    PAYMENTPENDING: 'paymentPending'
  },
  troubleTicketTypes: {
    COMPLAINT: 'Complaint',
    QUERY: 'Query',
    REQUEST: 'Request'
  },
  //   troubleTicketStatusColors: {
  //     open: defaultVariables.textPrimary,
  //     cancelled: defaultVariables.errorMain,
  //     rejected: defaultVariables.errorMain,
  //     inProgress: defaultVariables.warningMain,
  //     held: defaultVariables.warningMain,
  //     inProgressEscalated: defaultVariables.warningMain,
  //     resolved: defaultVariables.successMain,
  //     closed: defaultVariables.successMain,
  //     inProgressReopened: defaultVariables.warningMain
  //   },
  pendingActionStatuses: ['draft', 'completed'],
  statuses: {
    // TODO: change Active to Launched to get the new offering with new pricing models
    // Launched: 'Launched,Active' //Uncomment to query both old and new offerings
    Launched: 'Launched'
  },
  LOCAL_STORAGE_LANG_KEY: 'appLanguage',
  AGENT_ROLE: 'CSRAgent',
  authenticationQuestionAndAns: [
    {
      ques: "What's your National ID?"
    }
  ],
  NOTES: 'Maximum 250 characters are allowed',
  serviceRequestType: {
    CUSTOMER_UPDATE: 'CustomerInformationUpdateRequest',
    BILLING_ACCOUNT_UPDATE: 'BillingAccountUpdateRequest',
    REGISTRATION: 'RegistrationRequest',
    ADD_VAS: 'AddVasProductRequest',
    ADD_SERVICE: 'AddPlanProductRequest',
    CHANGE_OF_PLAN: 'ChangePlanProductRequest',
    CREDIT_LIMIT: 'ChangeCreditLimitRequest',
    REVOKE_SUSPENSION: 'RevokeSuspendProductRequest',
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
    CHANGE_ACCOUNT_CREDIT_LIMIT: 'ChangeAccountCreditLimitRequest'
  },
  oldServiceRequests: [
    'SimChangeRequest',
    'TransferOfOwnershipRequest',
    'PaymentAgainstInvoiceRequest',
    'PortInRequest',
    'AddVasProductRequest',
    'TerminateVASProductRequest',
    'AddPlanProductRequest',
    'SuspendProductRequest'
  ],
  ORDER_ITEM_ACTIONS: {
    NO_CHANGE: 'noChange',
    ADD: 'add',
    DELETE: 'delete',
    MODIFY: 'modify'
  },
  ORDER_ITEM_ACTION_SUB_TYPES: {
    RegistrationRequest: '',
    AddVasProductRequest: 'addVAS',
    AddPlanProductRequest: '',
    ChangePlanProductRequest: 'changePlan',
    RevokeSuspendProductRequest: 'revokeSuspension',
    SuspendProductRequest: 'suspension',
    SimChangeRequest: 'changeSIM',
    TerminatePlanProductRequest: 'termination',
    TerminateVASProductRequest: 'deleteVAS',
    TransferOfOwnershipRequest: 'transferOfOwnership',
    CorporateRegistrationRequest: '',
    ChangeLanguageRequest: 'changeLanguage',
    ChangeOfServiceIdRequest: 'changeOfServiceId',
    SoftSuspendProductRequest: 'softSuspension',
    ResetPasswordRequest: '',
    PreToPostRequest: 'preToPost',
    PostToPreRequest: 'postToPre',
    BarUnbarRequest: '',
    RelocateProductRequest: 'relocateProduct',
    TRANSFER_OF_OWNERSHIP: 'transferOfOwnership',
    MODIFY_PLAN: 'modifyPlan',
    CREDIT_LIMIT: 'changeCreditLimit'
  },
  productKeyAtributes: [
    'MSISDNProductSpec',
    'FXLNumProductSpec',
    'UserAccessProductSpec',
    'GoodsProductSpec',
    'UsageVolumeProductSpec'
  ],
  productsWithAddressSpec: ['SiteProductSpec'],
  productSpecificationForChangeOfService: [
    'MSISDNProductSpec',
    'FXLNumProductSpec'
  ],
  rowsPerPage: [5, 10, 15, 20, 25],
  totalNoOfRows: 50,
  inventoryKeyAttributes: {
    FIXED_TELEPHONE_NUMBER: 'FixedTelephoneNumber',
    MSISDN: 'MSISDN'
  },
  productOfferingPrice: [
    'OneTimeChargeProdOfferPriceCharge',
    'RecurringChargeProdOfferPriceCharge'
  ],
  specificationName: 'customerImage',
  iconNames: {
    account: 'User-Account',
    mobile: 'GSM',
    broadband: 'Broadband-1',
    iptv: 'Play',
    fixedline: 'LandLine',
    notes: 'Notes',
    wallet: 'Wallet',
    error: 'ohno'
  },
  troubleTicketDoc: {
    size: 5120000,
    types: '.doc,.xls,.pdf,.txt,.jpg,.png'
  },
  PARTY_INTERACTION_TYPES: {
    PRODUCT_ORDER: 'ProductOrder',
    SERVICE_ORDER: 'ServiceOrderIntegration',
    BILLING_ACCOUNT: 'BillingAccount',
    CUSTOMER: 'Customer',
    INDIVIDUAL: 'Individual',
    ORGANIZATION: 'Organization',
    PAYMENT: 'Payment',
    DOCUMENT: 'Document',
    PUSHGPRS: 'GprsSettingsIntegration',
    DUNNING: 'Dunning'
  },
  productPriceBaseType: {
    CHARGE: 'ProdOfferPriceCharge',
    ALTERATION: 'ProdOfferPriceChargeAlteration'
  },
  productPriceType: {
    UPFRONT: 'OneTimeChargeProdOfferPriceCharge',
    RECURRING: 'RecurringChargeProdOfferPriceCharge',
    USAGE: 'SimpleUsageProdOfferPriceCharge',
    TARRIF: 'TariffUsageProdOfferPriceCharge',
    DISCOUNT: 'DiscountProdOfferPriceChargeAlteration',
    ALLOWANCE: 'AllownaceProdOfferPriceChargeAlteration',
    REPLACEMENT: 'ReplacementProdOfferPriceChargeAlteration'
  },
  actionPriceTypes: {
    UPFRONT: {
      add: ['OneTimeCharge', 'Charge', 'Deposit'],
      modify: ['OneTimeCharge', 'Fee', 'Penalty', 'Charge', 'Deposit'],
      delete: ['OneTimeCharge', 'Fee', 'Penalty', 'Charge']
    },
    RECURRING: {
      add: ['Recurring', 'Rental', 'AdvancedRental', 'Installment'],
      modify: ['Recurring', 'Rental', 'AdvancedRental', 'Installment'],
      delete: []
    }
  },
  priceTypes: ['oneTimeCharge', 'Fee', 'Penalty', 'Charge', 'Deposit'],
  offeringType: {
    PLAN: 'Plan',
    VAS: 'VAS'
  },
  languages: [
    {
      label: 'English',
      value: 'English',
      langVal: 'en',
      iconName: 'Flag-India.png'
    },
    {
      label: 'Inglés',
      value: 'Spanish',
      langVal: 'es',
      iconName: 'Flag-spanish.png'
    },
    {
      label: 'فارسی',
      value: 'Farsi',
      langVal: 'fa',
      iconName: 'Flag-Iran.png'
    }
  ],
  priorities: {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High'
  },
  priceType: {
    RENTAL: 'Rental',
    ADVANCED_RENTAL: 'AdvancedRental'
  },
  usageConsumptionDataType: {
    fixedline: ['Voice', 'Data'],
    mobile: ['Voice', 'SMS', 'Data'],
    broadband: ['Data']
  },
  ALLOWANCES_CARDS: ['broadband', 'iptv', 'mobile', 'fixedline'],
  characteristicsNames: {
    SIM_TYPE: 'SIMType',
    SIM_NUMBER: 'SIMNumber',
    MSISDN: 'MSISDN',
    FXL_NUMBER: 'FXLNumber',
    ON_NET_MSSIDN: 'OnNetMSISDN',
    OFF_NET_MSSIDN: 'OffNetMSISDN',
    OLD_SIM_NUMBER: 'oldSIMNumber',
    OLD_SERVICE_ID: 'oldServiceId',
    SITE: 'Site Count',
    SITE1: 'Site Count'
  },
  characteristicsTypes: {
    SIM_TYPE: 'SIMType',
    SIM_NUMBER: 'SIM',
    MSISDN: 'MSISDN',
    FXL_NUMBER: 'FXLNumber'
  },
  LOB: {
    MOBILE: 'Mobile',
    FIXED_LINE: 'FixedLine'
  },
  RESOURCE_STATUS: {
    AVAILABLE: 'Available',
    UNAVAILABLE: 'Unavailable'
  },
  SELECT_SUBSCRIPTION: 'Select Subscription',
  BARUNBAR: {
    refferedType: {
      PERMANENTSERVICE: 'PermanentService',
      SUPPLEMENTARYSERVICE: 'SupplementaryService',
      REFILL: 'Refill'
    }
  },
  REFFERED_TYPES: {
    SERVICE_CLASS_CHANGE: 'serviceClassChange'
  },
  corporateRegistration: {
    // In EB, the backend is asking for Organization instead of Organisation
    organization: 'Organization',
    profileManager: 'ProfileManager',
    contactPerson: 'ContactPerson',
    accountManager: 'AccountManager',
    profileOwner: 'ProfileOwner',
    company: 'company',
    corporate: 'Corporate',
    keyAccountManager: 'KeyAccountManager',
    accountOwner: 'AccountOwner'
  },
  ALLOWEDTYPES: [
    'image/png',
    'image/jpg',
    'text/plain',
    'application/pdf',
    'application/docx',
    'application/xsls',
    'application/txt',
    'application/doc'
  ],
  channel: [
    {
      role: 'interaction creation',
      name: 'DCLM',
      _id: 'DCLM',
      type: 'DCLM'
    }
  ],
  resourceCharacteristics: {
    imsiNumber: 'imsiNumber',
    pin1Number: 'pin1Number',
    pin2Number: 'pin2Number',
    kiNumber: 'kiNumber',
    imeinumber: 'imeinumber',
    PUK1: 'PUK1',
    PUK2: 'PUK2'
  },
  offerViewType: {
    CARD: 'CARD',
    LIST: 'LIST'
  },
  paymentMethods: {
    CHEQUE: 'cheque',
    CREDITCARD: 'creditCard',
    DEBITCARD: 'debitCard',
    CASH: 'cash'
  },
  presentationMedia: {
    POST: 'Paper',
    EMAIL: 'Email',
    VOICE: 'Voice',
    EINVOICE: 'Einvoice'
  },
  paymentConfig: {
    allowAddToInvoicePayment: true,
    allowMobilePayment: true
  },
  dunningStatus: {
    EXCLUDED: 'Excluded',
    INCLUDED: 'Included'
  },
  paymentOptions: {
    payNow: { name: 'Pay Now', code: 'payNow' },
    payLater: { name: 'Pay Later', code: 'payLater' }
  },
  // TODO - To be removed after implementing the startdate and enddate in utils.js (addAccount in hierarchy)
  dates: {
    pastDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    ).toISOString(),
    futureDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 5)
    ).toISOString()
  },
  searchOfferBy: {
    CODE: {
      id: 'CODE',
      value: 'code'
    },
    NAME: { id: 'NAME', value: 'q' },
    SPEED: {
      id: 'SPEED',
      value: 'productSpecification.productSpecCharacteristic.name'
    },
    DATA: {
      id: 'DATA',
      value: 'productSpecification.productSpecCharacteristic.name'
    },
    TPS: {
      id: 'TPS',
      value: 'productSpecification.productSpecCharacteristic.name'
    }
  },
  referredTypes: {
    DUNNINGSCHEDULE: 'DunningSchedule'
  },
  roles: {
    RELATIONSHIPMANAGER: 'relationshipManager',
    ssoUser: 'SSOUser'
  },
  target: {
    SERVICE: 'service'
  },
  OVERRIDESTATUS: {
    PENDINGAPPROVAL: 'pendingApproval',
    APPROVED: 'approved',
    REJECTED: 'rejected'
  },
  // CONFIG TYPES for using API URLs
  configType: {
    REGISTRATION_REQUEST: 'registrationRequest',
    CUSTOMER_INFORMATION_UPDATE: 'customerInformationUpdate',
    RULES_SERVICE: 'ruleService',
    DOCUMENT_UPLOAD_REQUEST: 'documentUploadRequest',
    DOCUMENT_MANAGEMENT: 'documentManagement',
    PARTY_INTERACTION: 'partyInteraction',
    MASTER_DATA: 'masterData',
    TSAT_MASTER_DATA: 'tsatMasterData',
    DCBS_MASTER_DATA: 'dcbsMasterData',
    TROUBLE_TICKET_MANAGEMENT: 'troubleTicketManagement',
    PREVALIDATE_SERVICE_REQUEST: 'preValidateServiceRequest',
    LOGICAL_RESOURCE_INVENTORY_MANAGEMENT: 'logicalResourceInventoryManagement',
    PHYSICAL_RESOURCE_INVENTORY_MANAGEMENT:
      'physicalResourceInventoryManagement',
    SERVICE_REQUEST: 'serviceRequest',
    PRODUCT_OFFERING: 'productOffering',
    USAGE_API: 'usageApi',
    GET_THIRD_PARTY_LINKS: 'getThirdPartyLinks',
    PROMISE_TO_PAY: 'promiseToPay',
    BILLING_ACCOUNT: 'billingAccount',
    PAYMENT_MANAGEMENT: 'paymentManagement',
    PRODUCT_INVENTORY_MANAGEMENT: 'productInventoryManagement',
    PAYMENT_TRANSACTION: 'paymentTransaction',
    FREQUENTLY_DIALLED_NUMBERS: 'frequentlyDialledNumbers',
    CUSTOMER_INFO_UPDATE: 'customerInfoUpdate',
    BULK_UPLOAD: 'bulkUpload',
    PUSH_GPRS: 'pushGprs',
    REPORT_GENERATOR: 'reportGenerator',
    CUSTOMER_BILL_MANAGEMENT: 'customerBillManagement',
    PROFORMA_GENERATOR: 'proformaGenerator',
    USER_TASKS: 'userTasks',
    PARTY_ROLE: 'partyRole',
    DOWNLOAD_INVOICE: 'invoiceDownload',
    PRODUCT_ORDER_MANAGEMENT: 'productOrderManagement',
    SERVICE_LEVEL_AGREEMENT: 'serviceLevelAgreement',
    PRODUCT_QUALIFICATION: 'productOfferingQualification'
  },
  addressRoles: {
    RESIDENCE: 'ResidenceAddress',
    PERMANENT: 'PermanentAddress',
    OFFICE: 'OfficeAddress',
    INSTALLATION: 'InstallationAddress',
    BILLING: 'BillingAddress',
    SERVICE: 'ServiceAddress'
  },
  contactMediumTypes: {
    PHONE: 'Phone',
    EMAILADDRESS: 'EmailAddress',
    ADDRESS: 'Address',
    MOBILE: 'mobile',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram'
  },
  relationshipTypes: {
    DEPENDENCY: 'dependency',
    ADDON: 'addon'
  },
  waiveOffAllowedTypes: ['OneTimeCharge', 'Deposit'],
  approvalStatusTypes: {
    APPROVED: 'approved',
    REJECTED: 'rejected'
  },
  interactionItemPendingStatuses: [
    'paymentPending',
    'pendingApproval',
    'pendingUpload'
  ],
  singleOfferSelection: [
    {
      type: 'LoB',
      value: 'M2M'
    }
  ],
  otpTimerLimit: {
    minutes: 2,
    seconds: 0
  },
  placeHolderValue: '---',
  placeHolderObject: [{ name: '', label: '---', code: '0', id: '0' }]
};

export default constants;
