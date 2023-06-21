import React from 'react';
import { useStateful } from 'react-hanger';
import {
  Box,
  Grid,
  Chip,
  Badge,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Autocomplete } from 'Components';
import CloseIcon from '@material-ui/icons/Close';

const Multiselect = ({ options, value, onChange, id, label }) => {
  const classes = useStyles();
  const selectedOptions = useStateful([]);

  const selectedValues = useStateful([]);

  const handleChange = (e) => {
    if (value?.includes(e.target.value)) {
      selectedOptions.setValue(
        selectedOptions.value.filter((opt) => opt.value !== e.target.value)
      );
      onChange({
        target: {
          name: id,
          value: value.filter((val) => val !== e.target.value)
        }
      });
    } else {
      options.map((opt) => {
        if (opt.value === e.target.value) {
          selectedOptions.setValue([...selectedOptions.value, opt]);

          onChange({
            target: {
              name: id,
              value: [...value, opt.value]
            }
          });
        }
      });
    }
  };

  const handleDelete = (opt) => {
    selectedOptions.setValue(
      selectedOptions.value.filter((val) => val.value !== opt.value)
    );
    onChange({
      target: {
        name: id,
        value: value.filter((val) => val !== opt.value)
      }
    });
  };

  return (
    <Box>
      <Grid container direction="column" spacing={8}>
        <Grid item>
          <Autocomplete
            label={label}
            options={options}
            onChange={handleChange}
            value={selectedOptions.value.map((val) => val.value)}
            name="lead"
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            {selectedOptions.value?.map((val) => (
              <Grid item>
                <Badge
                  badgeContent={
                    <IconButton
                      onClick={() => handleDelete(val)}
                      className={classes.delete}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  <Chip color="primary" label={val.label} />
                </Badge>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  delete: {
    backgroundColor: theme.palette.error.main,
    width: theme.spacing(3),
    height: theme.spacing(3),
    '&:hover': {
      backgroundColor: theme.palette.error.light
    },
    '& svg': {
      width: theme.spacing(3),
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  }
}));

Multiselect.defaultProps = {
  label: 'Account Manager',
  onChange: () => {},
  options: [],
  value: [],
  id: ''
};

export default Multiselect;
