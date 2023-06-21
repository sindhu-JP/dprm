import React from 'react';

import {
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

/**
  LEAD_APPROVAL - orange
  OPPORTUNITY_CREATION - orange
  LEAD_DROPPED - red
*/

const validAccountManagerActions = [
  'LEAD_CLASSIFICATION',
  'DOWNLOAD_QUOTATION',
  'SHARE_QUOTATION_ACTION',
  'REASSIGNED',
  'QUOTE_MODIFY',
  'LEAD_DROPPED',
  'ADD_OPPORTUNITY',
  'ONBOARDING_ACTION',
  'QUOTE_GENERATE',
  'QUOTE_APPROVAL'
];
const options = [
  {
    value: 'OPPORTUNITY_CREATION',
    label: 'Approve Lead',
    filter: 'LEAD_APPROVAL'
  },

  {
    value: 'ONBOARDING_ACTION',
    label: 'Start Onboarding',
    filter: 'ONBOARDING'
  },
  {
    value: 'CUSTOMER_ACCEPTED',
    label: 'Customer Accepted',
    filter: 'CUSTOMER_ACCEPTANCE'
  },
  {
    value: 'CUSTOMER_REJECTED',
    label: 'Cusomter Rejected',
    filter: 'CUSTOMER_ACCEPTANCE'
  },

  {
    value: 'APPROVED_FROM_WAREHOUSE',
    label: 'Approve',
    filter: 'WAREHOUSE_APPROVAL'
  },
  {
    value: 'REJECTED_FROM_WAREHOUSE',
    label: 'Reject',
    filter: 'WAREHOUSE_APPROVAL'
  },
  {
    value: 'ADD_OPPORTUNITY',
    label: 'Add Opportunity',
    filter: 'OPPORTUNITY_CREATION,APPROVED_FROM_WAREHOUSE'
  },
  {
    value: 'QUOTE_APPROVAL',
    label: 'Generate Quote',
    filter: 'QUOTE_GENERATE'
  },
  {
    value: 'QUOTE_APPROVAL',
    label: 'Revise Quote',
    filter: 'QUOTE_EXPIRED'
  },

  {
    value: 'SHARE_QUOTATION_ACTION',
    label: 'Share Quotation',
    filter: 'SHARE_QUOTATION'
  },
  {
    value: 'DOWNLOAD_QUOTATION',
    label: 'Download Quotation',
    filter: 'SHARE_QUOTATION,CUSTOMER_ACCEPTANCE,QUOTE_APPROVAL'
  },
  {
    value: 'LEAD_CLASSIFICATION',
    label: 'Lead Classification',
    filter:
      'APPROVED_FROM_WAREHOUSE,QUOTE_REJECTED,SHARE_QUOTATION,QUOTE_APPROVAL'
  },

  {
    value: 'LEAD_CLASSIFICATION',
    label: 'Lead Classification',
    filter: 'QUOTE_EXPIRED,CUSTOMER_ACCEPTANCE,QUOTE_GENERATE'
  },

  {
    value: 'CREATE_QUOTE',
    label: 'Create Quote',
    filter: 'QUOTE_REJECTED'
  },

  {
    value: 'SHARE_QUOTATION',
    label: 'Approve Quote',
    filter: 'QUOTE_APPROVAL'
  },
  {
    value: 'QUOTE_REJECTED',
    label: 'Reject Quote',
    filter: 'QUOTE_APPROVAL'
  },
  {
    value: 'QUOTE_MODIFY',
    label: 'Modify Quote',
    filter: 'QUOTE_APPROVAL,CUSTOMER_ACCEPTANCE'
  },
  {
    value: 'WAREHOUSE_APPROVAL',
    label: 'Feasibility Complete',
    filter: 'MANUAL_FEASIBILITY,MANUAL_FEASIBLE_CHECK'
  },
  {
    value: 'FEASIBILITY_FAILED',
    label: 'Feasibility Failed',
    filter: 'MANUAL_FEASIBILITY,MANUAL_FEASIBLE_CHECK'
  },
  {
    value: 'REASSIGNED',
    label: 'Reassign Lead',
    filter:
      'QUOTE_EXPIRED,QUOTE_REJECTED,QUOTE_APPROVAL,CUSTOMER_ACCEPTANCE,SHARE_QUOTATION,QUOTE_GENERATE,OPPORTUNITY_CREATION,ADD_OPPORTUNITY,LEAD_APPROVAL,MANUAL_FEASIBILITY,WAREHOUSE_APPROVAL,APPROVED_FROM_WAREHOUSE'
  },
  {
    value: 'LEAD_DROPPED',
    label: 'Drop lead',
    filter:
      'QUOTE_EXPIRED,APPROVED_FROM_WAREHOUSE,QUOTE_GENERATE,QUOTE_REJECTED,QUOTE_APPROVAL,CUSTOMER_ACCEPTANCE,SHARE_QUOTATION,LEAD_APPROVAL,ADD_OPPORTUNITY,OPPORTUNITY_CREATION'
  }
];
const useStyles = makeStyles((theme) => ({
  root: {
    '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px)':
      {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1
      }
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
  },
  // QUOTE_EXPIRED: {
  //   backgroundColor: theme.palette.error.main,
  //   color: theme.palette.common.white
  // },
  CONTRACT_SIGN_OFF: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  SERVICE_ADDED: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },

  LEAD_GENERATION: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  }
}));
const Actions = ({ status, onClick, role }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, action) => {
    e.stopPropagation();
    setAnchorEl(null);
    onClick(action || e);
  };

  const validOptions = () => {
    let temp = options.filter((opt) => opt.filter.includes(status));

    // if (role !== "ADMIN") {
    //   return temp.filter((opt) =>
    //     validAccountManagerActions.includes(opt.value)
    //   );
    // }

    return temp;
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{ position: 'relative' }}
      justify="space-between"
    >
      <Grid item>
        <Chip
          style={{ minWidth: '3.31rem' }}
          label={status}
          size="small"
          className={classes[status]}
        />
      </Grid>
      {validOptions().length ? (
        <Grid item>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {validOptions().map((option) => (
              <MenuItem
                key={option.value}
                onClick={(e) => handleClose(e, option)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
};

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' }
];

const myTask = {
  columns: [
    {
      label: 'REQUEST ID'
    },
    {
      label: 'PARTNER NAME'
    },
    {
      label: 'APPROVAL TYPE'
    },
    {
      label: 'START DATE'
    },
    {
      label: 'INITIATOR'
    },
    {
      label: 'STATUS'
    },
    {
      label: ''
    }
  ]
};
const PotentialCustomers = {
  columns: [
    {
      label: 'PARTNER ID'
    },
    {
      label: 'PARTNER NAME'
    },
    {
      label: 'MOBILE'
    },
    {
      label: 'EMAIL'
    },
    {
      label: 'START DATE'
    },
    {
      label: 'STATUS'
    },
    {
      label: ''
    }
    // {
    //   id: "companyName",
    //   label: "NAME",
    // },

    // {
    //   id: "opportunity",
    //   label:"OPPORTUNITY ID"
    // },

    // {
    //   id: "leadClassification",
    //   label: "LEAD CLASSIFICATION",
    // },
    // {
    //   id: "lob",
    //   label: "LOB",
    // },
    // {
    //   id: "serviceRequestType",
    //   label: "REQUEST TYPE",
    // },
    // // {
    // //   id: "industryType",
    // //   label: "INDUSTRY TYPE",
    // // },
    // {
    //   id: "date",
    //   label: "DATE",
    //   format: (date) => dayjs(date).format("DD MMM YYYY"),
    // },
    // {
    //   id: "status",
    //   label: "STATUS",
    //   render: ({ status, role, action }) => (
    //     // <Actions status={status} role={role} onClick={action} />
    //     <LeadActions role={role} status={status} action={action} />
    //   ),
    // },
  ]
};

export default {
  PotentialCustomers,
  myTask
};
