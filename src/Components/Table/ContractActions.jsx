import React from 'react';
import { useStateful } from 'react-hanger';

import STATUS from 'lib/constants/statuses';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const ContractActions = ({
  status: currentStatus,
  action: onAction,
  onDownloadAction: onDownloadAction,
  donwload
}) => {
  const classes = useStyles();
  const actions = useStateful([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dynamicactions = useStateful([]);
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
    let validActions = [];
    let finalActions = [];

    for (const [key, config] of Object.entries(STATUS.actions)) {
      if (config.validFor.includes(currentStatus)) {
        validActions.push(config);
      }
    }

    actions.setValue(validActions);

    if (
      currentStatus?.Contract_Accepted === 'no' &&
      currentStatus.Contract_Shared !== 'yes' &&
      currentStatus?.Contract_SignOff === 'no'
    ) {
      // alert('show contract share option only');
      dynamicactions.setValue([STATUS.actions.Contract_Shared]);
    } else if (
      currentStatus?.Contract_Accepted === 'yes' &&
      currentStatus.Contract_SignOff === 'no'
    ) {
      // alert('show modify contract & contract signoff option only')
      dynamicactions.setValue([
        STATUS.actions.Contract_SignOff
        //STATUS.actions.Modify_contract
      ]);
    } else if (
      currentStatus?.Contract_Accepted === 'yes' &&
      currentStatus.Contract_SignOff === 'yes' &&
      currentStatus.Contract_Shared === 'yes'
    ) {
      dynamicactions.setValue([STATUS.actions.download_contract]);
    } else if (currentStatus?.INVOICE === 'yes') {
      dynamicactions.setValue([
        STATUS.actions.INVOICEPRINT,
        STATUS.actions.INVOICELISTSHARE,
        STATUS.actions.InvioceDownload,
        STATUS.actions.BillingAdjustment
      ]);
    }
  }, [currentStatus]);

  const download = () => {
    onDownloadAction();
  };
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="space-between"
      className={classes.maingrid}
    >
      <Grid item>
        {/* {currentStatus ? (
          <Chip
            style={{ minWidth: '10.31rem' }}
            label={currentStatus}
            size="small"
            className={
              classes[_.get(STATUS.statuses, `${currentStatus}.color`, '')]
            }
          />
        ) : (
          ''
        )} */}
        {/* {donwload ? (
          <Tooltip title="Download">
            <IconButton onClick={() => download()}>
              <PlayForWorkSharpIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )} */}
      </Grid>
      {/* {currentStatus ? (
        <Grid>
          {actions.value.length ? ( */}
      <Grid item>
        <Tooltip title="Actions">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={onClick}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={onClose}
          className={classes.paperSpace}
        >
          {dynamicactions.value &&
            dynamicactions.value?.map((item) => {
              return (
                <MenuItem onClick={(e) => onClose(e, item)}>
                  {item.label}
                </MenuItem>
              );
            })}
          {/* {currentStatus.Contract_SignOff === 'no' ? (
                <MenuItem
                  onClick={(e) =>
                    onClose(e, STATUS.actions['Contract_SignOff'])
                  }
                >
                  {STATUS.actions['Contract_SignOff'].label}
                </MenuItem>
              ) : (
                ''
              )}
              {currentStatus.Contract_Shared === 'no' ? (
                <MenuItem
                  onClick={(e) => onClose(e, STATUS.actions['Contract_Shared'])}
                >
                  {STATUS.actions['Contract_Shared'].label}
                </MenuItem>
              ) : (
                ''
              )}
            </Menu> */}
        </Menu>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1
  },
  paperSpace: {
    color: 'white',
    '& .MuiMenu-paper': {
      backgroundColor: theme.palette.primary.black,
      padding: 0
    }
  },

  maingrid: {
    width: 'max-content',
    position: 'relative'
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  }
}));

export default ContractActions;
