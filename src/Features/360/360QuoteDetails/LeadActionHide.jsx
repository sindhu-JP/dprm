import _ from 'lodash';
import React from 'react';
import { useStateful } from 'react-hanger';
import STATUS from 'lib/constants/statuses';
import { Grid, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1
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
  },
  chipLabel: {
    '& .MuiChip-label': {
      color: 'white'
    }
  }
}));
const LeadActionHide = ({ status: currentStatus, action: onAction }) => {
  const classes = useStyles();
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
    let finalActions = [];

    for (const [key, config] of Object.entries(STATUS.actions)) {
      if (config.validFor.includes(currentStatus)) {
        validActions.push(config);
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
  }, [currentStatus]);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{ position: 'relative' }}
      justify="space-between"
    >
      <Grid item>
        {currentStatus ? (
          <Chip
            style={{ minWidth: '2.31rem' }}
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
      {/* {currentStatus ? <>
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
                        ""
                    )}
            </> : ""} */}
    </Grid>
  );
};

export default LeadActionHide;
