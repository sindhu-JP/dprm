import React from 'react';
import LeadActions from 'Components/Table/LeadActions';

import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import { Trans } from '@lingui/react';

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
  //   color: theme.palette.common.white,
  // },
}));

const ContractCustomers = {
  columns: [
    {
      id: 'id',
      label: <Trans id="CONTRACT ID"></Trans>
    },
    {
      id: 'PartnerID',
      label: <Trans id="PARTNER ID"></Trans>
    },
    {
      id: 'partnerOrProductName',
      label: <Trans id="PARTNER/PRODUCT NAME"></Trans>
    },
    {
      id: 'Contract',
      label: <Trans id="CONTRACT"></Trans>
    },
    {
      id: 'ContractType',
      label: <Trans id="CONTRACT TYPE"></Trans>
    },
    {
      id: 'ContractPeriod',
      label: <Trans id="CONTRACT PERIOD"></Trans>
    },

    {
      id: 'startDate',
      label: <Trans id="START  DATE"></Trans>,
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'enddate',
      label: <Trans id="END DATE"></Trans>,
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'status',
      label: <Trans id="STATUS"></Trans>,
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};

const CustomerTickets = {
  columns: [
    {
      id: 'id',
      label: <Trans id="SL.NO"></Trans>
    },
    {
      id: 'customerId',
      label: <Trans id="CUSTOMER ID"></Trans>
    },
    {
      id: 'customerName',
      label: <Trans id="CUSTOMER NAME"></Trans>
    },
    {
      id: 'customerReview',
      label: <Trans id="CUSTOMER FEEDBACK"></Trans>
    },

    {
      id: 'createdDate',
      label: <Trans id="START DATE"></Trans>,
      format: (date) => dayjs(date).format('DD MMM YYYY')
    }
  ]
};

const Dashboardcontract = {
  columns: [
    {
      id: 'id',
      label: 'CONTRACT ID'
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
      id: 'partnerName',
      label: 'PARTNER NAME'
    },
    {
      id: 'Contract',
      label: 'CONTRACT'
    },
    // {
    //   id: 'partnerName',
    //   label: 'PARTNER NAME'
    // },
    {
      id: 'startDate',
      label: 'START  DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    {
      id: 'enddate',
      label: 'END DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
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
export default {
  ContractCustomers,
  Dashboardcontract,
  CustomerTickets
};
