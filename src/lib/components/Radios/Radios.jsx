import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Radios = ({ type = 'single', value, checked, options }) => {
  return (
    <Box>
      {options.map((option, index) => (
        <FormControlLabel
          fullWidth
          value={option.value}
          control={
            <Radio color="primary" checked={value.includes(option.value)} />
          }
          label={option.label}
          labelPlacement="right"
        />
      ))}
    </Box>
  );
};

Radios.defaultProps = {
  type: 'single',
  value: [],
  options: []
};

Radios.propTypes = {
  type: PropTypes.oneOf(['single', 'group']),
  value: PropTypes.array,
  options: PropTypes.array
};
export default Radios;
