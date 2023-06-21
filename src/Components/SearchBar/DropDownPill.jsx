import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Box
} from '@material-ui/core';
import dayjs from 'dayjs';
import { Trans } from '@lingui/react';

const styles = (theme) => ({
  roundPill: {
    borderRadius: theme.spacing(10)
  },
  supTextCross: {
    position: 'absolute',
    fontSize: theme.spacing(4),
    background: theme.palette.error.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: theme.spacing(40),
    fontWeight: theme.typography.fontWeightBold,
    height: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    marginLeft: `-${theme.spacing(4)}`,
    width: theme.spacing(6),
    cursor: 'pointer'
  },
  dialogBox: {
    width: theme.spacing(90),
    padding: `${theme.spacing(3)} ${theme.spacing(10)}`,
    marginTop: theme.spacing(30)
  },
  title: {
    fontSize: theme.spacing(5),
    textTransform: 'uppercase'
  },
  menuRoot: {
    outline: 'none'
  }
});

const DropDownPill = ({
  onMenuBtnClick,
  onClose,
  pillText,
  inputTitle,
  open,
  selected,
  onApply,
  id,
  classes,
  defaultTextValue,
  type,
  partyType = []
}) => {
  const [text, setText] = useState(
    typeof defaultTextValue === 'object'
      ? dayjs(defaultTextValue).format('DD-MM-YYYY')
      : ''
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setText(defaultTextValue || '');
  }, [open]);

  const updateText = (e) => {
    setText(e.target.value);
  };

  const onApplyDropDown = (id, value) => {
    if (selected === value) {
      onApply(id, '');
    } else {
      onApply(id, value);
    }
  };

  const onMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    onMenuBtnClick();
  };

  return (
    <>
      <Button
        variant={selected ? 'contained' : 'outlined'}
        color={selected ? 'primary' : ''}
        onClick={onMenuClick}
        className={classes.roundPill}
        id="menu-pill-btn"
      >
        <Typography variant={selected ? 'button' : 'subtitle2'}>
          {typeof selected === 'object'
            ? dayjs(selected).format('DD-MM-YYYY')
            : selected || pillText}
        </Typography>
      </Button>
      {selected && (
        <span
          className={classes.supTextCross}
          onClick={() => {
            setText('');
            onApply(id, '');
          }}
        >
          <Typography variant="subtitle2">x</Typography>
        </span>
      )}
      <Menu
        id={`customer-simple-menu-${id}`}
        keepMounted
        open={open}
        onClose={onClose}
        classes={{ paper: classes.dialogBox }}
        anchorEl={anchorEl}
      >
        {type === 'dropdown' ? (
          <MenuList className={classes.menuRoot}>
            {partyType.map((item, i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={() => onApplyDropDown(id, item.code)}
                  selected={item.code === selected}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </MenuList>
        ) : (
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography className={classes.title} variant="caption">
                {inputTitle}:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={updateText}
                value={text}
                role="menu"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item>
              <Box mt={5}>
                <Grid container direction="row" spacing={6} justify="center">
                  <Grid item>
                    <Button onClick={() => setText('')}>
                      <Typography variant="button">
                        <Trans id="Clear"></Trans>
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onApply(id, text)}
                    >
                      <Typography variant="button">
                        <Trans id="Apply"></Trans>
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}{' '}
      </Menu>
    </>
  );
};

export default withStyles(styles)(DropDownPill);
