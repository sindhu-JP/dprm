import _ from 'lodash';
import React from 'react';
import { useBoolean } from 'react-hanger';
import { Check } from '@material-ui/icons';
import { useWatch } from 'react-hook-form';
import { sectionValidator } from '../Schema';
import Autocomplete from 'lib/components/Autocomplete';
import {
  Grid,
  Typography,
  Paper,
  Box,
  IconButton,
  makeStyles,
  TextField,
  Button
} from '@material-ui/core';
import { Leads } from 'Http/api';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const LeadAssignmentView = ({
  register,
  errors,
  control,
  schema,
  options,
  user,
  Updatelead,
  leadOpen
}) => {
  const classes = useStyles();
  const sectionIsValid = useBoolean(false);
  const [response, setResponse] = React.useState([]);
  const [isEdit, setEdit] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState();

  const values = useWatch({
    control,
    name: 'assignment'
  });

  React.useEffect(() => {
    sectionValidator({
      value: { assignment: { ...values } },
      schema,
      sectionName: 'assignment',
      onFaliure: sectionIsValid.setFalse,
      onSuccess: sectionIsValid.setTrue
    });
    getEmailAndMobile(values?.name);
    setSelected(values?.name);
  }, [values]);

  const getEmailAndMobile = async (name) => {
    const getRes = await Leads.leadAssignmentEmailMobile(name);
    setResponse(getRes?.contactMedium);
  };
  const handleCancel = (user) => {
    setSelectedValue(null);
    setEdit(false);
  };
  const handleSave = () => {
    // Updatelead(selected)
    setEdit(false);
  };

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box className={classes.header} mb={6}>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item>
                  <Typography className={classes.title} variant="h2">
                    Lead Assignment
                  </Typography>
                </Grid>
                {sectionIsValid.value && (
                  <Grid item>
                    <IconButton size="small" className={classes.icon}>
                      <Check />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {/* edit part */}
            {!isEdit ? (
              <Grid item onClick={() => setEdit(true)}>
                <CreateOutlinedIcon />
              </Grid>
            ) : (
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  spacing={4}
                >
                  <Grid item>
                    <Button
                      variant="text"
                      size="large"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box>
          <Grid container direction="row" spacing={10}>
            <Grid item xs={4}>
              <Autocomplete
                required
                error={!!errors.assignment}
                helperText={_.get(errors, 'assignment.message', '')}
                name="assignment"
                options={options}
                variant="standard"
                control={control}
                label="Name"
                userData={user}
                disabledValue={!isEdit}
                // handlChangeLead={handleCancel}
                // selectedValue={selectedValue}
                existingValue={leadOpen?.leadAssignment?.name}
              />
            </Grid>

            {response?.map((item, i) => (
              <>
                {item?.medium.type === 'Mobile' && (
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      value={item?.medium.number}
                      variant="standard"
                      inputRef={register}
                      label="MobileNumber"
                      name="assignment.mobile"
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>
                )}
                {item?.medium.type === 'EmailAddress' && (
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      value={item?.medium.emailAddress}
                      variant="standard"
                      inputRef={register}
                      label="Email"
                      name="assignment.email"
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>
                )}
              </>
            ))}

            {/* {values?.name && (
              <Grid item xs={2}>
                <Grid contianer direction="column">
                  <Grid item>
                    <Typography variant="subtitle1">Name</Typography>
                  </Grid>
                  <Grid item>{values?.name}</Grid>
                </Grid>
              </Grid>
            )} */}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  }
}));

export default LeadAssignmentView;
