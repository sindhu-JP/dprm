import React from 'react';
import LeadActions from 'Components/Table/LeadActions';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import ContractActions from 'Components/Table/ContractActions';
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

const Documents = {
  columns: [
    {
      id: 'createDate',
      label: <Trans id="CREATED DATE"></Trans>,
      format: (createDate) => dayjs(createDate).format('DD MMM YYYY')
    },
    {
      id: 'id',
      label: <Trans id="ID"></Trans>
    },

    {
      id: 'documentType',
      label: <Trans id="DOCUMENT TYPE"></Trans>
    },

    {
      id: 'name',
      label: <Trans id="NAME"></Trans>
    },
    {
      id: 'uid',
      label: <Trans id="DMS REFERENCE ID"></Trans>
    },
    {
      id: 'expiryDate',
      label: <Trans id="EXPIRY DATE"></Trans>,
      format: (expiryDate) => dayjs(expiryDate).format('DD MMM YYYY')
    },

    {
      id: 'status',
      label: <Trans id="STATUS"></Trans>,
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    },

    {
      id: 'doc',
      label: <Trans id="ACTION"></Trans>
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
      label: '	PARTNER ID'
    },
    {
      id: 'partnerName',
      label: 'PARTNER NAME'
    },

    {
      id: 'Startdate',
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
      label: 'Actions',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <ContractActions role={role} status={status} action={action} />
      )
    }
  ]
};

const MyTaskContractList = {
  columns: [
    {
      id: 'id',
      label: 'CONTRACT ID'
    },
    // {
    //   id: 'PartnerID',
    //   label: 'PARTNER ID'
    // },
    {
      id: 'Contract',
      label: 'CONTRACT'
    },
    {
      id: 'ContractType',
      label: 'CONTRACT TYPE'
    },
    {
      id: 'ContractPeriod',
      label: 'CONTRACT PERIOD'
    },

    {
      id: 'Startdate',
      label: 'START  DATE',
      format: (date) => dayjs(date).format('DD MMM YYYY')
    },

    // {
    //   id: 'enddate',
    //   label: 'END DATE',
    //   format: (date) => dayjs(date).format('DD MMM YYYY')
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

export default {
  Documents,
  Dashboardcontract,
  MyTaskContractList
};
