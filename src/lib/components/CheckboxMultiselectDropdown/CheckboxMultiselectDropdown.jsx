import React from 'react';

import {
  MenuItem,
  Checkbox,
  Button,
  Menu,
  FormGroup,
  FormControlLabel,
  makeStyles
} from '@material-ui/core';
import { SvgIcon } from 'lib/components';

const CheckboxMultiselectDropdown = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="medium"
        color="primary"
        variant="outlined"
        className={classes.button}
        endIcon={<SvgIcon className={classes.icon} iconName="chevron_left" />}
      >
        LOB
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <FormGroup column>
          {props?.options?.map((option, key) => (
            <MenuItem key={key}>
              <FormControlLabel
                label={option.label}
                onChange={() => {}}
                checked={true}
                control={<Checkbox />}
              />
            </MenuItem>
          ))}
        </FormGroup>
      </Menu>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: theme.spacing(8)
  },
  icon: {}
}));

CheckboxMultiselectDropdown.defaultProps = {
  options: [
    {
      label: 'Mobile',
      value: 'mobile'
    },
    {
      label: 'IPTV',
      value: 'iptv'
    },
    {
      label: 'Broadband',
      value: 'broadband'
    }
  ]
};

CheckboxMultiselectDropdown.propTypes = {};
export default CheckboxMultiselectDropdown;
