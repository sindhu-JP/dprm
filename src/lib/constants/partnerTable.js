import React from 'react';
import LeadActions from 'Components/Table/LeadActions';

import dayjs from 'dayjs';
import { Trans } from '@lingui/react';
import { Button } from '@material-ui/core';
import CountDownTimer from 'Features/PopupTable/CountDownTimer';
import Promote from 'Components/Table/PromoActions';


 
const PotentialCustomers = {
  columns: [
    {
      id: 'id',
      label: <Trans id="PARTNER ID"></Trans>
    },
    {
      id: 'partnerName',
      label: <Trans id="PARTNER NAME"></Trans>
    },
    {
      id: 'mobileNo',
      label: <Trans id="MOBILE NUMBER"></Trans>
    },

    {
      id: 'email',
      label: <Trans id="EMAIL"></Trans>
    },

    // {
    //   id: 'mytaskcount',
    //   label: 'PENDING TASK COUNT'
    // },
    {
      id: 'PARTNER_TYPE',
      label: <Trans id="PARTNER TYPE"></Trans>
    },
    {
      id: 'PARTNER_SUB_TYPE',
      label: <Trans id="PARTNER SUBTYPE"></Trans>
    },

    {
      id: 'startDate',
      label: <Trans id="CREATED DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
    },

    // {
    //     id: "enddate",
    //     label: "END DATE",
    //     format: (date) => dayjs(date).format("DD MMM YYYY"),
    //   },

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

const PotentialLead = {
  columns: [
    {
      id: 'leadId',
      label: <Trans id="LEAD ID"></Trans>
    },
    {
      id: 'partnerName',
      label: <Trans id="PARTNER NAME"></Trans>
    },
    {
      id: 'mobile',
      label: <Trans id="MOBILE NUMBER"></Trans>
    },

    {
      id: 'emailId',
      label: <Trans id="EMAIL"></Trans>
    },

    // {
    //   id: 'mytaskcount',
    //   label: 'PENDING TASK COUNT'
    // },
    
    {
      id: 'partnerSubType',
      label: <Trans id="PARTNER SUBTYPE"></Trans>
    },

    {
      id: 'createdDate',
      label: <Trans id="CREATED DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
    },

    // {
    //     id: "enddate",
    //     label: "END DATE",
    //     format: (date) => dayjs(date).format("DD MMM YYYY"),
    //   },
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

const PotentialReseller = {
  columns: [
    {
      id: 'id',
      label: <Trans id="Agent ID"></Trans>
    },
    {
      id: 'agentName',
      label: <Trans id="AGENT NAME"></Trans>
    },
    {
      id: 'mobileNo',
      label: <Trans id="MOBILE NUMBER"></Trans>
    },

    {
      id: 'email',
      label: <Trans id="EMAIL"></Trans> 
    },

    // {
    //   id: 'mytaskcount',
    //   label: 'PENDING TASK COUNT'
    // },
    {
      id: 'agentType',
      label: <Trans id="AGENT CATEGORY"></Trans>
    },
    
    {
      id: 'agentSubType',
      label: <Trans id="AGENT SUB CATEGORY"></Trans>
    },

    {
      id: 'startDate',
      label: <Trans id="CREATED DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
    },

    // {
    //     id: "enddate",
    //     label: "END DATE",
    //     format: (date) => dayjs(date).format("DD MMM YYYY"),
    //   },

    {
      id: 'status',
      label: <Trans id="STATUS"></Trans>,
      render: ({ status, role, action }) => {
        console.log(action, "actiedd", status)
          return (
          <LeadActions role={role} status={status} action={action}  reseller={true}/>
          )
      }
        
        // <Actions status={status} role={role} onClick={action} />
        
      
    }
  ]
};


const SelfcareCustomers = {
  columns: [
    {
      id: 'id',
      label: <Trans id="PARTNER ID"></Trans>
    },
    {
      id: 'partnerName',
      label: <Trans id="PARTNER NAME"></Trans>
    },
    {
      id: 'mobileNo',
      label: <Trans id="MOBILE NUMBER"></Trans>
    },

    {
      id: 'email',
      label: <Trans id="EMAIL"></Trans>
    },

    {
      id: 'startDate',
      label: <Trans id="START DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
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

const SelfcareResellerCustomers = {
  columns: [
    {
      id: 'id',
      label: <Trans id="AGENT ID"></Trans>
    },
    {
      id: 'agentName',
      label: <Trans id="AGENT NAME"></Trans>
    },
    {
      id: 'mobileNo',
      label: <Trans id="MOBILE NUMBER"></Trans>
    },

    {
      id: 'email',
      label: <Trans id="EMAIL"></Trans>
    },

    {
      id: 'startDate',
      label: <Trans id="START DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
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

const PotentialTenants = {
  columns: [
    {
      id: 'TenantId',
      label: <Trans id="TENANT ID"></Trans>
    },
    {
      id: 'id',
      label: <Trans id="PARTNER ID"></Trans>
    },
    {
      id: 'tenantName',
      label: <Trans id="TENANT NAME"></Trans>
    },
    {
      id: 'mobileNo',
      label: <Trans id="MOBILE NUMBER"></Trans>
    },

    {
      id: 'email',
      label: <Trans id="EMAIL"></Trans>
    },

    // {
    //   id: 'mytaskcount',
    //   label: <Trans id="MY TASK COUNT"></Trans>
    // },

    {
      id: 'startDate',
      label: <Trans id="START  DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
    },

    // {
    //     id: "enddate",
    //     label: "END DATE",
    //     format: (date) => dayjs(date).format("DD MMM YYYY"),
    //   },

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

const Mytasks = {
  columns: [
    {
      id: 'id',
      label: <Trans id="REQUEST ID"></Trans>
    },
    {
      id: 'partnerName',
      label: <Trans id="APPROVAL FOR"></Trans>
    },
    {
      id: 'ApprovalType',
      label: <Trans id="APPROVAL TYPE"></Trans>
    },

    {
      id: 'startDate',
      label: <Trans id="START  DATE"></Trans>,
      format: (startDate) => dayjs(startDate).format('DD MMM YYYY')
    },

    {
      id: 'Initiator',
      label: <Trans id="INITIATOR"></Trans>
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

const PopupProductTable ={
  columns :[
    {
      id: "id",
      label: <Trans id="PRODUCT ID"></Trans>,
    },
    {
      id: "productName",
      label: <Trans id="PRODUCT NAME"></Trans>,
    },
    {
      id: "otCharge",
      label: <Trans id="ONE TIME CHARGE"></Trans>,
    },
  
    {
      id: "recurringCharge",
      label: <Trans id="RECURRING CHARGE"></Trans>,
    },
    {
      id: "recurringDuration",
      label: <Trans id="RECURRING DURATION"></Trans>,
    },
  ],
  pendingColumns : [    {
    id: 'status',
    label: <Trans id="STATUS"></Trans>,
    render: ({ status}) => (
      <LeadActions status={status} disableMenu={true} />
    )
  }
  ,

  {
    id: "launch",
    label: <Trans id="Launch"></Trans>,
    render: (data) =>  (
      <Promote data={data}/>
    ),
  }],
  
  inProgressColumns:[
  {
    id: "view",
    label: <Trans id="VIEW DEATAILS"></Trans>,
    render: () => (
      <Button
        style={{
          borderRadius: "25px",
          padding: ".2rem 2rem",
          borderColor: "#ffba00",
        }}
        variant="outlined"
        size="medium"
      >
        View
      </Button>
    ),
  },
  {
    id: "timeLeft",
    label: <Trans id="TIMER"></Trans>,
    render: ({ status }) => (
      <>
           <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
        <img src={'/assets/images/timer.jpeg'} width={20}/> 
        <CountDownTimer status={status} />
      </div>
      </>
    )
  }]
}

const productColumns = {
  columns: [
    {
      id: 'ProductID',
      label: <Trans id="PRODUCT ID"></Trans>
    },
    {
      id: 'Productname',
      label: <Trans id="PRODUCT NAME"></Trans>
    },
    {
      id: 'id',
      label: <Trans id="PARTNER ID"></Trans>
    },
    {
      id: 'PartnerName',
      label: <Trans id="PARTNER NAME"></Trans>
    },

    {
      id: 'PRODUCT_LOB',
      label: <Trans id="PRODUCT LOB"></Trans>
    },
    {
      id: 'PRODUCT_TECHNOLOGY',
      label: <Trans id="'PRODUCT TECHNOLOGY'"></Trans>
    },

    {
      id: 'SubStatus',
      label: <Trans id="STATUS"></Trans>,
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActions role={role} status={status} action={action} />
      )
    }
  ]
};
export default {
  Mytasks,
  PopupProductTable,
  PotentialTenants,
  PotentialCustomers,
  SelfcareCustomers,
  SelfcareResellerCustomers,
  productColumns,
  PotentialLead,
  PotentialReseller
};
