import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Box,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Autocomplete, Checkboxes } from 'Components';
import { Check } from '@material-ui/icons';
import { useForm } from 'Hooks/Form';
import { useStateful, useBoolean } from 'react-hanger';
import { AxiosTemp } from 'Http';

const LeadAssignment = (props) => {
  const classes = useStyles();
  const managers = useStateful('');
  const selected = useStateful('');
  const roles = useStateful([]);
  const loading = useBoolean(true);

  const loadAccountManagers = async () => {
    loading.setTrue();
    const result = await AxiosTemp.get('/user?role=ROL1030');
    managers.setValue(
      result.data?.map((mang) => ({
        ...mang,
        label: mang.username,
        value: mang.id
      }))
    );
    loading.setFalse();
  };

  const handleChange = (e) => {
    props.onChange({
      target: {
        name: props.id,
        value: managers.value.filter((man) => man.id === e.target.value)[0]
      }
    });
  };

  React.useEffect(() => {
    loadAccountManagers();
  }, []);

  return (
    <React.Fragment>
      {loading.value ? (
        'Loading ...'
      ) : (
        <React.Fragment>
          <Box className={classes.header} mb={6}>
            <Grid container direction="row" alignItems="center" spacing={4}>
              <Grid item>
                <Typography className={classes.title} variant="h2">
                  {props.label}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton size="small" className={classes.icon}>
                  <Check />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container direction="row" spacing={10}>
              <Grid item xs={4}>
                <Autocomplete
                  name="name"
                  onChange={handleChange}
                  label="Name"
                  options={managers.value}
                />
              </Grid>
              {props.value?.email && (
                <Grid item xs={2}>
                  <Grid contianer direction="column">
                    <Grid item>
                      <Typography variant="subtitle1">Email</Typography>
                    </Grid>
                    <Grid item>{props.value?.email}</Grid>
                  </Grid>
                </Grid>
              )}
              {props.value?.mobileNumber && (
                <Grid item xs={2}>
                  <Grid contianer direction="column">
                    <Grid item>
                      <Typography variant="subtitle1">Mobile</Typography>
                    </Grid>
                    <Grid item>{props.value?.mobileNumber}</Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText
  }
}));

export default LeadAssignment;
