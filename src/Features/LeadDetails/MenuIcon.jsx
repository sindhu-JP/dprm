import React from 'react';
import { useStateful } from 'react-hanger';
import STATUS from 'lib/constants/statuses';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';

const LeadActions = ({
  status: currentStatus,
  action: onAction,
  authpermisson
}) => {
  const actions = useStateful([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    let validActions = [];

    for (const [key, config] of Object.entries(STATUS.actions)) {
      const isValid = config.validFor.includes(currentStatus);
      const isNotPrimary =
        config.id !== STATUS.detailsPageActions[currentStatus]?.primary?.id;
      const isNotSecondary =
        config.id !== STATUS.detailsPageActions[currentStatus]?.secondary?.id;
      //  if(!LeadFactory.getpermissions(authpermisson?.permissions,config.permission)&& config.modalId === 'approveLead'&&isValid ){

      //   validActions.push(STATUS.permissionaction.approvalleadpermission)
      //  }

      if (isValid && isNotPrimary && isNotSecondary) {
        validActions.push(config);
      }
    }

    actions.setValue(validActions);
  }, [currentStatus]);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{ position: 'relative' }}
      justify="space-between"
    >
      {actions.value.length ? (
        <Grid item>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={onClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={onClose}
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
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1
  }
}));

export default LeadActions;
