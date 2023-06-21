import { Trans } from '@lingui/react';
import React from 'react';
const Opco = {
  MTN: {
    value: 'mtn'
  },
  stc: {
    value: 'stc'
  },
  tenotree: {
    value: 'Tecnotree'
  },
  zbahrain: {
    value: 'zbahrain'
  },
  moments: {
    value: 'moments'
  }
};

const MenuList = {
  partnerDetails: {
    label: <Trans id="Partner Details"></Trans>,
    name: 'PartnerDetails',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['master']
  },
  agentDetails: {
    label: <Trans id="Agent Details"></Trans>,
    name: 'AgentDetails',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['agent']
  },

  

  MainTenantTab: {
    label: <Trans id="Tenant Details"></Trans>,
    name: 'PartnerDetails',
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['tenant'],
    visible: true
  },

  MainProductTabs: {
    label: <Trans id="Product Details"></Trans>,
    name: 'PartnerDetails',
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['products'],

    visible: true
  },

  TenantTab: {
    label: <Trans id="Tenants"></Trans>,
    name: 'Tenants',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['master']
  },
  productTab: {
    label: <Trans id="Products"></Trans>,
    name: 'Products',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['tenant', 'master']
  },

  contractTab: {
    label: <Trans id="Contracts"></Trans>,
    name: 'Contracts',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['tenant', 'master', 'products']
  },
  RequestTab: {
    label: <Trans id="Requests"></Trans>,
    name: 'Requests',
    visible: true,
    valid: [Opco.MTN.value, Opco.stc.value, Opco.zbahrain.value],
    validator: ['tenant', 'master', 'products']
  }, 

  OrderTab: { 
    label: <Trans id="View Orders"></Trans>,
    name: 'View Orders',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['tenant', 'master', 'products']
  },
  Finacials: {
    label: <Trans id="Financials"></Trans>,
    name: 'Financials',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['tenant', 'master']
  },

  UserTab: {
    label: <Trans id="Users"></Trans>,
    name: 'Users',
    isvisible: false,
    valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
    validator: ['master'],
    action: () => {
      handleChange(null, 2);
    }
  },
  PartnerTicketTab: {
    label: <Trans id="Partner Ticket"></Trans>,
    name: 'PartnerTicket',
    isvisible: false,
    valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
    validator: ['master']
  },
  DocumentsTab: {
    label: <Trans id="Documents"></Trans>,
    name: 'Documents',
    isvisible: false,
    valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
    validator: ['master', 'agent']
  },

  CustomerTicketTabs: {
    label: <Trans id="Customer Feedback"></Trans>,
    name: 'Customer Feedback',
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['products'],

    visible: true
  },

  // CustomerTicketTab: {
  //   label: 'Customer Ticket',
  //   name: 'CustomerTicket',
  //   isvisible: false,
  //   valid: [Opco.MTN.value],
  //   validator: ['master']
  // }
};

const RouterPath = {
  home: {
    label: <Trans id="Home"></Trans>,
    name: 'Home',
    url: '',
    visible: true,
    valid: [
      Opco.MTN.value,
      Opco.stc.value,
      Opco.zbahrain.value,
      Opco.moments.value
    ],
    validator: ['dashboard'],
    iconName: 'HomeIcon'
  },

  Orders: {
    label: <Trans id="Customer Orders"></Trans>,
    name: 'Orders&Request',
    url: 'Orders&Requests',
    valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
    validator: ['dashboard'],
    visible: true,
    iconName: 'Orders_Request'
  },

  TaskAssignment: {
    label: <Trans id="Group 360"></Trans>,
    name: 'GroupAssignment',
    url: 'GroupAssignment',
    valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
    visible: true,
    iconName: 'Orders_Request',
    validator: ['dashboard']
  },

  BackOffice: {
    label: <Trans id="Back Office"></Trans>,
    name: 'BackOffice', 
    url: 'BackOffice',
    valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
    visible: true,
    iconName: 'Orders_Request',
    validator: ['dashboard']
  },

  // BulkUpload: {
  //   label: <Trans id="Bulk"></Trans>,
  //   name: 'BulkUpload', 
  //   url: 'BulkUpload',
  //   valid: [Opco.MTN.value, Opco.zbahrain.value, Opco.moments.value],
  //   visible: true,
  //   iconName: 'Bulk_Icon',
  //   validator: ['dashboard']
  // }

  // CustomerTicketTab: {
  //   label: 'Customer Ticket',
  //   name: 'CustomerTicket',
  //   isvisible: false,
  //   valid: [Opco.MTN.value],
  //   validator: ['master']
  // }
};

export default { MenuList, RouterPath };
