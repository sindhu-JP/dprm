import _ from 'lodash';
import React from 'react';
import { useStateful } from 'react-hanger';

import STATUS from 'lib/constants/statuses';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1
  },
  maingrid: {
    // width: 'max-content',
    position: 'relative'
  },
  orange: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  Un_Available: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white
  },
  Unavailble: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white
  },
  Available: {
    backgroundColor: '#ABC13C',
    color: theme.palette.common.white
  },
  blue: {
    backgroundColor: ' #1400C8',
    color: theme.palette.common.white
  },
  paperSpace: {
    '& .MuiMenu-paper': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.common.gray
          : theme.palette.primary.black,
      // backgroundColor: theme.palette.background.paper,
      padding: 0
    }
  },
  chipLabel: {
    '& .MuiChip-label': {
      // color: 'white'
    },
    // '&.MuiChip-sizeSmall' :{
    //   width:'65px'
    // }
  },
  iconStyle: {
    color: theme.palette.type === 'dark' ? '#fff !important' : '#757575'
  }
}));
const LeadActions = ({
  status: currentStatus,
  action: onAction,
  Breackpoint: breackpoint,
  reseller,
  disableMenu
}) => {
  const classes = useStyles();
  const actions = useStateful([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userInfo = useSelector((state) => state.hierarchy.userInfo);

  const authpermisson = useSelector((state) => state.auth.user);

  const open = Boolean(anchorEl);

  const onClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const onClose = (event, action) => {
    event.stopPropagation();
    setAnchorEl(null);

    onAction(action);
  };

  React.useEffect(() => {
    console.log(reseller, currentStatus, "checkingactive")
    if(reseller && currentStatus === "ACTIVE") {

     
      return ;
    }
    else {
      let validActions = [];
      let finalActions = [];
      if(reseller) {
        delete STATUS.actions.download_contract
      }
      for (const [key, config] of Object.entries(STATUS.actions)) {
        
        if (config.validFor.includes(currentStatus)) {
          // if (authpermisson) {
          // if (
          //   config.approvalRequiredForLead ||
          //   config.approvalRequiredForQuote
          // ) {
          //   if (
          //     config.approvalRequiredForQuote ===
          //     userInfo.approvalRequiredForQuote
          //   ) {
          //     validActions.push(config)
          //   } else if (
          //     config.approvalRequiredForLead ===
          //     userInfo.approvalRequiredForLead
          //   ) {
          //     validActions.push(config)
          //   }
          // } else {
          //   validActions.push(config)
          // }
  
          // if (
          //     Leadfactory.getpermissions(
          //       authpermisson?.permissions,
          //       config.permission,
          //     )
          //   ) {
          //     validActions.push(config)
  
          //   // } else {
          //   //   validActions.push(config)
          //   //   if (
          //   //   (  config.modalId === 'approveLead' || config.modalId === 'quoteApproval') &&
          //   //     !Leadfactory.getpermissions(
          //   //       authpermisson?.permissions,
          //   //       config.permission,
          //   //     )
          //   //   ) {
          //   //     validActions.push(STATUS.permissionaction.approvalleadpermission)
          //   //   }
          //   }
          // } else {
          validActions.push(config);
          // }
        }
      }
  
      // if('current user is not account manager') {
      //   for(action in validActions) [
      //     if(action.onlyForAccountManger) {
      //       finalActions.push(action)
      //     }
      //   ]
      // } else {
      //   finalActions = validActions
      // }
  
      actions.setValue(validActions);
    }
    
  }, [currentStatus, authpermisson, reseller]);

  console.log(actions, "actonit")
  return (
    <Grid
      container
      xs={12}
      direction="row"
      alignItems="center"
      justify="space-between"
      className={classes.maingrid}
    >
      <Grid item xs={8}>
        {currentStatus ? (
          <Chip
            style={{
              minWidth: breackpoint ? '4.31rem' : '4.31rem',
              fontSize: breackpoint ? '10px' : '9px'
            }}
            label={currentStatus}
            size="small"
            className={`${
              classes[_.get(STATUS.statuses, `${currentStatus}.color`, '')]
            } ${classes.chipLabel}`}
          />
        ) : (
          ''
        )}
      </Grid>
      {!disableMenu&&currentStatus ? (
        <>
          {actions.value.length ? (
            <Grid item xs={4}>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={onClick}
              >
                <MoreVertIcon className={classes.iconStyle} />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={onClose}
                className={classes.paperSpace}
              >
                {actions.value.map((option) => (
                  <MenuItem key={option.id} onClick={(e) => onClose(e, option)}>
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default LeadActions;
