import React from 'react';
import LeadActions from 'Components/Table/LeadActions';

import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';

import LeadActionHide from 'Features/360/360QuoteDetails/LeadActionHide';

/**
  LEAD_APPROVAL - orange
  OPPORTUNITY_CREATION - orange
  LEAD_DROPPED - red
*/

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1
  },
  LEAD_APPROVAL: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  OPPORTUNITY_CREATION: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  MANUAL_FEASIBLE_CHECK: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  MANUAL_FEASIBILITY: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  WAREHOUSE_APPROVAL: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  APPROVAL: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  QUOTE_GENERATE: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  SHARE: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  CREATE_CONTRACT: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  ONBOARDING: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  QUOTE_EXPIRED: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  LEAD_DROPPED: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  FEASIBILITY_FAILED: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  REJECTED_FROM_WAREHOUSE: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  APPROVED_FROM_WAREHOUSE: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  CUSTOMER_ACCEPTANCE: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  QUOTE_REJECTED: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  }
  // QUOTE_EXPIRED: {
  //   backgroundColor: theme.palette.error.main,
  //   color: theme.palette.common.white
  // }
}));

const Statemets = {
  columns: [
    {
      id: 'settlementId',
      label: 'SETTLEMENT ID'
    },
    {
      id: 'settlementDate',
      label: ' SETTLEMENT DATE',
      format: (settlementDate) => dayjs(settlementDate).format('DD MMM YYYY')
    },
    {
      id: 'Description',
      label: 'DESCRIPTION'
    },

    {
      id: 'amount',
      label: 'AMOUNT',
      value: 'negative'
    }

    // {
    //   id: "status",
    //   label: "STATUS",
    //   render: ({ status, role, action }) => (
    //     // <Actions status={status} role={role} onClick={action} />
    //     <LeadActionHide role={role} status={status} action={action} />
    //   ),
    // },
  ]
};

const adjustments = {
  columns: [
    {
      id: 'id',
      label: 'ADJUSTMENT ID   '
    },
    {
      id: 'Date',
      label: 'DATE ',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },
    {
      id: 'method',
      label: 'METHOD'
    },
    {
      id: 'Agentname',
      label: ' AGENT NAME'
    },

    {
      id: 'amount',
      label: 'AMOUNT'
    }

    // {
    //   id: 'Debit',
    //   label: 'DEBIT'
    // },
    // {
    //   id: 'amount',
    //   label: 'AMOUNT'
    // },

    // {
    //   id: "status",
    //   label: "STATUS",
    //   render: ({ status, role, action }) => (
    //     // <Actions status={status} role={role} onClick={action} />
    //     <LeadActionHide role={role} status={status} action={action} />
    //   ),
    // },
  ]
};

const payments = {
  columns: [
    {
      id: 'id',
      label: 'REFERENCE ID'
    },
    {
      id: 'Date',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },
    {
      id: 'method',
      label: 'METHOD'
    },

    {
      id: 'amount',
      label: 'AMOUNT',
      value: 'negative'
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }

    // {
    //   id: "status",
    //   label: "STATUS",
    //   render: ({ status, role, action }) => (
    //     // <Actions status={status} role={role} onClick={action} />
    //     <LeadActionHide role={role} status={status} action={action} />
    //   ),
    // },
  ]
};

const Requests = {
  columns: [
    {
      id: 'id',
      label: 'Request ID'
    },
    {
      id: 'RequestType',
      label: 'REQUEST TYPE  '
    },
    {
      id: 'startDate',
      label: ' START DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'assignee',
      label: ' ASSIGNEE'
    },

    // {
    //   id: "status",
    //   label: "STATUS",
    // },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};

const Orders = {
  columns: [
    {
      id: 'id',
      label: 'ORDER ID'
    },
    {
      id: 'partnerId',
      label: 'PARTNER ID'
    },
    {
      id: 'customerID',
      label: ' CUSTOMER ID'
    },

    {
      id: 'productName',
      label: 'PRODUCT NAME'
    },

    {
      id: 'productID',
      label: 'PRODUCT ID'
    },

    {
      id: 'PurchaseDate',
      label: 'PURCHASE DATE',
      format: (PurchaseDate) => dayjs(PurchaseDate).format('DD MMM YYYY')
    },

    // {
    //   id: 'partnerShare',
    //   label: 'PARTNER SHARE'
    // },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};

const manualOrders = {
  columns: [
    {
      id: 'id',
      label: 'ORDER ID'
    },
    {
      id: 'partnerId',
      label: 'PARTNER ID'
    },

    {
      id: 'PurchaseDate',
      label: 'PURCHASE DATE',
      format: (PurchaseDate) => dayjs(PurchaseDate).format('DD MMM YYYY')
    },
    {
      id: 'eventDetails',
      label: 'TOTAL EVENTS'
    },
    {
      id: 'totalCommission',
      label: 'TOTAL COMMISSION'
    },


    // {
    //   id: 'partnerShare',
    //   label: 'PARTNER SHARE'
    // },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};

const DCM = {
  columns: [
    {
      id: 'id',
      label: 'PRODUCT ID'
    },
    {
      id: 'partnerId',
      label: 'PARTNER ID'
    },
    {
      id: 'productName',
      label: 'PRODUCT NAME'
    },

    {
      id: 'productTechnology',
      label: 'PRODUCT TECHNOLOGY'
    },
    {
      id: 'productLOB',
      label: 'PRODUCT LOB'
    },

    {
      id: 'createdDate',
      label: 'CREATED DATE',
      format: (createdDate) => dayjs(createdDate).format('DD MMM YYYY')
    },

    {
      id: 'productionSpecificationType',
      label: 'PRODUCT SPECIFICATION TYPE'
    },
    // {
    //   id: 'partnerShare',
    //   label: 'PARTNER SHARE'
    // },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};

const productColumns = {
  columns: [
    {
      id: 'ProductID',
      label: 'PRODUCT ID'
    },
    {
      id: 'Productname',
      label: 'PRODUCT NAME'
    },
    {
      id: 'PartnerName',
      label: 'PARTNER NAME'
    },

    {
      id: 'OnetimeCharge',
      label: 'ONE TIME CHARGE'
    },
    {
      id: 'RecurringCharge',
      label: 'RECURRING CHARGE'
    },

    {
      id: 'RecurringDuration',
      label: 'RECURRING DURATION'
    },
    {
      id: 'OnboardStatus',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }

    // {
    //   id: "ContractExpiry",
    //   label: "CONTRACT EXPIRY",
    // },
  ]
};

const tenantColumns = {
  columns: [
    {
      id: 'TenantID',
      label: 'TENANT ID'
    },
    {
      id: 'TenantName',
      label: 'TENANT NAME'
    },
    {
      id: 'PrimaryContactName',
      label: 'PRIMARY CONTACT NAME'
    },

    {
      id: 'ManagerName',
      label: 'PARTNER RELATIONSHIP MANAGER NAME'
    },
    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }

    // {
    //   id: "ContractExpiry",
    //   label: "CONTRACT EXPIRY",
    // },
  ]
};

const productList = {
  columns: [
    {
      id: 'id',
      label: 'PARTNER ID'
    },
    {
      id: 'ProductID',
      label: 'PRODUCT ID'
    },
    {
      id: 'Productname',
      label: 'PRODUCT NAME'
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};

const Invoice = {
  columns: [
    {
      id: 'id',
      label: 'INVOICE ID'
    },
    {
      id: 'date',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },
    {
      id: 'dueDate',
      label: 'DUE DATE',
      format: (dueDate) => dayjs(dueDate).format('DD MMM YYYY')
    },

    {
      id: 'Payable',
      label: 'PAYABLE'
    },
    {
      id: 'Receivable',
      label: 'RECEIVABLE'
    },
    {
      id: 'InvoiceTotal',
      label: 'INVOICE TOTAL',
      value: 'negative'
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action, onDownloadAction }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions
          role={role}
          status={status}
          action={action}
          onDownloadAction={onDownloadAction}
          donwload={true}
          Breackpoint={true}
        />
      )
    }
  ]
};

const transactions = {
  columns: [
    {
      id: 'id',
      label: 'TRANSACTION ID '
    },
    {
      id: 'data',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'purposeOfTranx',
      label: 'PURPOSE OF TRANSACTION'
    },
    {
      id: 'balance',
      label: 'AVAILABLE BALANCE',
    },

    // {
    //   id: "status",
    //   label: "STATUS",
    //   render: ({ status, role, action }) => (
    //     // <Actions status={status} role={role} onClick={action} />
    //     <LeadActionHide role={role} status={status} action={action} />
    //   ),
    // },
  ]
};

const OrderTracking = {
  columns: [
    {
      id: 'CustomerId',
      label: 'CUSTOMER ID '
    },
    {
      id: 'OrderId',
      label: 'ORDER ID '
    },
    {
      id: 'Purchasedata',
      label: 'DATE',
      format: (Purchasedata) => dayjs(Purchasedata).format('DD MMM YYYY')
    },
    {
      id: 'Receivedamount',
      label: 'RECEIVED AMOUNT'
    }
  ]
};
const BillingAdjustments = {
  columns: [
    {
      id: 'Date',
      label: 'DATE',
      format: (Purchasedata) => dayjs(Purchasedata).format('DD MMM YYYY')
    },

    {
      id: 'InvoiceID',
      label: 'INVOICE ID '
    },
    {
      id: 'Adjustmenttype',
      label: 'ADJUSTMENT TYPE '
    },

    {
      id: 'Reason',
      label: 'REASON'
    },

    {
      id: 'Amount',
      label: 'AMOUNT',
      color: ''
    }
  ]
};

const PendingRequests = {
  columns: [
    {
      id: 'id',
      label: 'Request ID'
    },
    {
      id: 'RequestType',
      label: 'REQUEST TYPE  '
    },
    {
      id: 'startDate',
      label: ' START DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'assignee',
      label: ' ASSIGNEE'
    },

    // {
    //   id: "status",
    //   label: "STATUS",
    // },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ]
};
// const PartnerSummary = {
//   columns: [
//     {
//       id: 'id',
//       label: 'PARTNER ID'
//     },
//     {
//       id: 'ProductID',
//       label: 'PARTNER NAME'
//     },
//     {
//       id: 'Productname',
//       label: 'PARTNER TYPE'
//     },
//     {
//       id: 'Productname',
//       label: 'SUB TYPE'
//     },

//     {
//       id: 'status',
//       label: 'STATUS',
//       render: ({ status, role, action }) => (
//         // <Actions status={status} role={role} onClick={action} />
//         <LeadActions role={role} status={status} action={action} />
//       )
//     }
//   ]
// }

const UserMasterTable = {
  columns: [
    {
      id: 'Name',
      label: 'NAME'
    },

    {
      id: 'email',
      label: 'USER EMAIL'
    },
    {
      id: 'mobileNo',
      label: 'MOBILE NO.'
    },

    {
      id: 'PartnerId',
      label: 'PARTNER ID'
    },
    {
      id: 'Partnername',
      label: 'PARTNER NAME'
    }

    // {
    //   id: "ContractExpiry",
    //   label: "CONTRACT EXPIRY",
    // },
  ]
};

const UserTenantTable = {
  columns: [
    {
      id: 'Name',
      label: 'NAME'
    },

    {
      id: 'email',
      label: 'USER EMAIL'
    },
    {
      id: 'mobileNo',
      label: 'MOBILE NO.'
    },
    {
      id: 'TenantID',
      label: 'TENANT ID'
    },
    {
      id: 'Tenantname',
      label: 'TENANT NAME'
    }
  ]
};

const PartnerSummary = {
  columns: [
    {
      id: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      id: 'Partner_Name',
      label: 'PARTNER NAME'
    },
    {
      id: 'Partner_mobileNo',
      label: 'MOBILE NUMBER'
    },
    {
      id: 'email',
      label: 'EMAIL'
    },

    {
      id: 'date',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ],
  headers: [
    {
      key: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      key: 'Partner_Name',
      label: 'PARTNER NAME'
    },
    {
      key: 'Partner_mobileNo',
      label: 'MOBILE NUMBER'
    },
    {
      key: 'email',
      label: 'EMAIL'
    },

    {
      key: 'date',
      label: 'DATE'
    },

    {
      key: 'status',
      label: 'STATUS'
    }
  ],
  PDF_HEADERS: [
    'PARTNER ID',
    'PARTNER NAME',
    'Partner MobileNo',
    'EMAIL',
    'DATE',
    'STATUS'
  ]
};

const partnerProductSummary = {
  columns: [
    {
      id: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      id: 'Product_ID',
      label: 'PRODUCT ID'
    },

    {
      id: 'Product_Name',
      label: 'PRODUCT NAME'
    },
    {
      id: 'Product_LoB',
      label: 'PRODUCT LOB'
    },
    {
      id: 'Quantity',
      label: 'QUANTITY'
    },
    {
      id: 'date',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ],

  headers: [
    {
      key: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      key: 'Product_ID',
      label: 'PRODUCT ID'
    },
    {
      key: 'Product_Name',
      label: 'PRODUCT NAME'
    },
    {
      key: 'Product_LoB',
      label: 'PRODUCT LOB'
    },
    {
      key: 'Quantity',
      label: 'QUANTITY'
    },
    {
      key: 'date',
      label: 'DATE'
    },

    {
      key: 'status',
      label: 'STATUS'
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};

const PartnerOrderSummary = {
  columns: [
    {
      id: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      id: 'Order_ID',
      label: 'ORDER ID'
    },
    {
      id: 'Product_Name',
      label: 'PRODUCT NAME'
    },
    {
      id: 'Customer_ID',
      label: 'CUSTOMER ID'
    },
    {
      id: 'date',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ],

  headers: [
    {
      key: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      key: 'Order_ID',
      label: 'ORDER ID'
    },
    {
      key: 'Product_Name',
      label: 'PRODUCT NAME'
    },
    {
      key: 'Customer_ID',
      label: 'CUSTOMER ID'
    },
    {
      key: 'date',
      label: 'DATE'
    },

    {
      key: 'status',
      label: 'STATUS'
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};

const PartnerSalesSummary = {
  columns: [
    {
      id: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      id: 'Partner_Name',
      label: 'PARTNER NAME'
    },
    {
      id: 'Product_Sold',
      label: 'NUMBER OF PRODUCTS SOLD'
    },
    {
      id: 'Target_achieved',
      label: 'TARGET ACHIEVED'
    }
    // {
    //   id: "date",
    //   label: "DATE",
    //   format: (date) => dayjs(date).format('DD MMM YYYY')
    // },
  ],

  headers: [
    {
      key: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      key: 'Partner_Name',
      label: 'PARTNER NAME'
    },
    {
      key: 'Product_Sold',
      label: 'NUMBER OF PRODUCTS SOLD'
    },
    {
      key: 'Target_achieved',
      label: 'TARGET ACHIEVED'
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};

const PartnerPaymentSummary = {
  columns: [
    {
      id: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      id: 'Partner_Name',
      label: 'PARTNER NAME'
    },
    {
      id: 'invoiceId',
      label: 'INVOICE ID'
    },
    {
      id: 'amountPaid',
      label: 'AMOUNT PAID'
    },
    {
      id: 'amountDue',
      label: 'AMOUNT DUE'
    },
    {
      id: 'date',
      label: 'DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },
    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ],

  headers: [
    {
      key: 'Partner_ID',
      label: 'PARTNER ID'
    },

    {
      key: 'Partner_Name',
      label: 'PARTNER NAME'
    },
    {
      key: 'invoiceId',
      label: 'INVOICE ID'
    },
    {
      key: 'amountPaid',
      label: 'AMOUNT PAID'
    },
    {
      key: 'amountDue',
      label: 'AMOUNT DUE'
    },
    {
      key: 'date',
      label: 'DATE'
      // format: (date) => dayjs(date).format('DD MMM YYYY')
    },
    {
      key: 'status',
      label: 'STATUS'
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};

const PartnerRevenuSummary = {
  columns: [
    // {
    //   id: 'linkedFormId',
    //   label: 'ID '
    // },

    {
      id: 'partnerId',
      label: 'PARTNER ID'
    },

    {
      id: 'partnerName',
      label: 'PARTNER NAME'
    },
    {
      id: 'productSold',
      label: 'PRODUCT SOLD'
    },
    {
      id: 'salesRevenu',
      label: 'SALES REVENU'
    }
  ],

  headers: [
    {
      key: 'partnerId',
      label: 'PARTNER ID'
    },

    {
      key: 'partnerName',
      label: 'PARTNER NAME'
    },
    {
      key: 'productSold',
      label: 'PRODUCT SOLD'
    },
    {
      key: 'salesRevenu',
      label: 'SALES REVENU'
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};



const PartnerTroubleTicketSummary = {
  columns: [

    {
      id: 'TicketID',
      label: 'Ticket ID'
    },

    {
      id: 'PartnerID',
      label: 'Partner ID'
    },
    {
      id: 'TicketType',
      label: 'Ticket Type'
    },
    {
      id: 'CreateDate',
      label: 'Ticket Creation Date ',
      format: (CreateDate) => dayjs(CreateDate).format('DD MMM YYYY')
    },
    {
      id: 'ModifyDate',
      label: ' Last Modification Date ',
      format: (ModifyDate) => dayjs(ModifyDate).format('DD MMM YYYY')
    },
    {
      id: 'LastModifiedby',
      label:'Last Modified by'
    },    
   
    
    {
      id: 'ResolutionDate',
      label: 'Resolution Date',
      // format: (ResolutionDate) => dayjs(ResolutionDate).format('DD MMM YYYY')
    },
    {
      id: 'status',
      label: 'Ticket Status',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ],

  headers: [
    {
      key: 'TicketID',
      label: 'Ticket ID'
    },

    {
      key: 'PartnerID',
      label: 'Partner ID'
    },
    {
      key: 'TicketType',
      label: 'Ticket Type'
    },
    {
      key: 'CreateDate',
      label: 'Ticket Creation Date'
    },
    {
      key: 'ModifyDate',
      label: ' Last Modification Date ',
    },
    {
      key: 'LastModifiedby',
      label: ' Last Modified by ',
    },

    {
      key: 'ResolutionDate',
      label: 'Resolution Date'
    },
    {
      key: 'status',
      label: 'Ticket Status',
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};


const PartnerCustomerTicketSummary = {
  columns: [

    {
      id: 'TicketID',
      label: 'Ticket ID'
    },

    {
      id: 'PartnerID',
      label: 'Customer ID'
    },
    {
      id: 'PartnerName',
      label: 'Customer Name'
    },
    {
      id: 'TicketType',
      label: 'Ticket Type'
    },
    {
      id: 'CreateDate',
      label: 'Ticket Creation Date ',
      format: (CreateDate) => dayjs(CreateDate).format('DD MMM YYYY')
    },
    {
      id: 'ModifyDate',
      label: ' Last Modification Date ',
      format: (ModifyDate) => dayjs(ModifyDate).format('DD MMM YYYY')
    },
    {
      id: 'LastModifiedby',
      label:'Last Modified by'
    },    
   
    
    {
      id: 'ResolutionDate',
      label: 'Resolution Date',
      // format: (ResolutionDate) => dayjs(ResolutionDate).format('DD MMM YYYY')
    },
    {
      id: 'status',
      label: 'Ticket Status',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide role={role} status={status} action={action} />
      )
    }
  ],

  headers: [
    {
      key: 'TicketID',
      label: 'Ticket ID'
    },
    {
      key: 'PartnerID',
      label: 'Customer ID'
    },
    {
      key: 'PartnerName',
      label: 'Customer Name'
    },
    {
      key: 'TicketType',
      label: 'Ticket Type'
    },
    {
      key: 'CreateDate',
      label: 'Ticket Creation Date'
    },
    {
      key: 'ModifyDate',
      label: ' Last Modification Date ',
    },
    {
      key: 'LastModifiedby',
      label: ' Last Modified by ',
    },
    {
      key: 'ResolutionDate',
      label: 'Resolution Date'
    },
    {
      key: 'status',
      label: 'Ticket Status',
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};




const PartnerSettlementSummary = {
  columns: [
    // {
    //   id: 'id',
    //   label: ' SETTELEMENT ID '
    // },

    {
      id: 'partnerId',
      label: 'PARTNER ID'
    },

    {
      id: 'partnerName',
      label: 'PARTNER NAME'
    },
    {
      id: 'date',
      label: 'SETTLEMENT DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },
    {
      id: 'payableAmount',
      label: 'PAYABLE AMOUNT'
    },
    {
      id: 'receivable',
      label: 'RECEIVABLE'
    },

    {
      id: 'amountDue',
      label: 'AMOUNT DUE'
    }
  ],

  headers: [
    // {
    //   key: 'id',
    //   label: 'ID '
    // },

    {
      key: 'partnerId',
      label: 'PARTNER ID'
    },

    {
      key: 'partnerName',
      label: 'PARTNER NAME'
    },
    {
      key: 'date',
      label: 'SETTELEMENT DATE'
    },

    {
      key: 'payableAmount',
      label: 'PAYABLE AMOUNT'
    },
    {
      key: 'receivable',
      label: 'RECEIVABLE'
    },
    {
      key: 'amountDue',
      label: 'AMOUNT  DUE'
    }
  ]
  // PDF_HEADERS:_.map(columns, ['label'])
};

const UserGroups = {
  columns: [
    {
      id: 'username',
      label: 'USER NAME'
    },
    {
      id: 'email',
      label: 'EMAIL'
    },
    {
      id: 'mobile',
      label: 'MOBILE'
    },

    {
      id: 'active_tasks',
      label: 'ACTIVE TASK'
    },
    // {
    //   id: 'pushed_task',
    //   label: 'PAUSED TASK BANDWIDTH'
    // },
    {
      id: 'current_task',
      label: 'CURRENT TASK'
    },

    {
      id: 'status',
      label: 'AVAILABILITY STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }

    // {
    //   id: "ContractExpiry",
    //   label: "CONTRACT EXPIRY",
    // },
  ]
};

const TaskAssignment = {
  columns: [
    {
      id: 'SLNO',
      label: 'SL NO'
    },
    {
      id: 'WORKFLOW_ID',
      label: 'WORKFLOW ID'
    },
    {
      id: 'workflowName',
      label: '	WORKFLOW NAME'
    },

    {
      id: 'Workflow',
      label: 'WORKFLOW'
    }
    // {
    //   id: 'status',
    //   label: 'Action',
    //   render: ({ status, role, action }) => (
    //     // <Actions status={status} role={role} onClick={action} />
    //     <LeadActions role={role} status={status} action={action} />
    //   )
    // }

    // {
    //   id: 'ACTIONS',
    //   label: 'ACTIONS'
    // },
  ]
};
export default {
  Statemets,
  adjustments,
  payments,
  Requests,
  Orders,
  tenantColumns,
  productColumns,
  productList,
  Invoice,
  transactions,
  OrderTracking,
  BillingAdjustments,
  PendingRequests,
  DCM,
  PartnerSummary,
  UserTenantTable,
  UserMasterTable,
  // partnerSummary,
  partnerProductSummary,
  PartnerOrderSummary,
  PartnerSalesSummary,
  PartnerPaymentSummary,
  PartnerRevenuSummary,
  // PartnerRevenuSummary,
  PartnerSettlementSummary,
  UserGroups,
  TaskAssignment,
  PartnerTroubleTicketSummary,
  PartnerCustomerTicketSummary,
  manualOrders
};
