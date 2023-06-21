const frequentRequests = [
  {
    id: 'suspension',
    name: 'Suspension',
    icon: 'SIM_Lost'
  },
  {
    id: 'revokeService',
    name: 'Revoke Service',
    icon: 'New_Customer'
  },
  {
    id: 'logTicket',
    name: 'Log Ticket',
    icon: 'Log_Ticket',
    visibleIn: ['subscriptions']
  },
  {
    id: 'mnp',
    name: 'MNP',
    icon: 'SIM_Lost',
    visibleIn: ['dashboard']
  },
  {
    id: 'termination',
    name: 'Termination',
    icon: 'Damaged_Voucher'
  },
  {
    id: 'simChange',
    name: 'SIM Change',
    icon: 'SIM_Lost',
    visibleIn: ['dashboard']
  },
  {
    icon: 'Recharge',
    id: 'creditLimitManagement',
    name: 'Credit Limit Management'
  },
  {
    id: 'promiseToPay',
    icon: 'Bill_Payment',
    name: 'Promise To Pay',
    visibleIn: ['account']
  },
  {
    id: 'recharge',
    name: 'Recharge',
    icon: 'Bill_Payment'
  },
  {
    id: 'interimBill',
    name: 'Interim Bill',
    icon: 'Bill_Payment'
  },
  {
    icon: 'SIM_Lost',
    id: 'changeOfServiceId',
    name: 'Change of Service ID'
  }
];

export default frequentRequests;
