import React from 'react';
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles
} from '@material-ui/core';

const Checkboxes = (props) => {
  const classes = useStyles();

  const handleChange = (e, value) => {
    let payload = {
      target: {
        name: props.id
      }
    };

    if (e.target.checked) {
      if (props.value) {
        payload.target.value = [...props.value, value];
      } else {
        payload.target.value = [value];
      }
      props.onChange(payload);
    } else {
      let arr = [...props.value];
      let index = arr.indexOf(value);

      if (index >= 0) {
        arr.splice(index, 1);
      }

      payload.target.value = arr;
      props.onChange(payload);
    }
  };

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography className={classes.title} variant="h4">
          {props.label}
        </Typography>
      </Grid>
      <Grid item>
        <FormGroup row>
          {props?.options?.map((option, key) => (
            <FormControlLabel
              key={key}
              label={option.label}
              onChange={(e) => handleChange(e, option.value)}
              checked={props.value?.includes(option.value)}
              control={<Checkbox />}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

Checkboxes.propTypes = {};
export default Checkboxes;
