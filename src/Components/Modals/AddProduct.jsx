import React from 'react';
import _ from 'lodash';
import { useStateful } from 'react-hanger';
import { Autocomplete } from 'Components';
import { Grid, Box, Button, Typography, makeStyles } from '@material-ui/core';
import dashboardApi from 'Http/api/dashboard';
import CustomeHook from 'lib/CustomHooks/CustomHooks';
import Modals from 'Store/Modals';

const AddProduct = ({
  context,
  onCancel,
  onSubmit,
  accountManagers,
  parent,
  partnerdetails
}) => {
  const classes = useStyles();
  const mobile = useStateful('');
  const email = useStateful('');
  const reason = useStateful('');
  const selectedManager = useStateful({});
  const dispatch = CustomeHook.customUseDispatch();
  const onSelectValue = CustomeHook.custUsestatefull({});

  const handleSubmit = () => {
    dispatch(
      Modals.open({
        id: 'AddUser',
        context: onSelectValue.value
      })
    );
  };

  const handleSelect = (event, value) => {
    onSelectValue.setValue(event.target);
  };

  const fetchTenanatDetails = async () => {
    return await dashboardApi.getTenantdetails(
      _.get(partnerdetails, 'mainlist.partnerId', '')
    );
  };
  const { execute, status, value, error, loading } = CustomeHook.useAsync(
    fetchTenanatDetails,
    true
  );

  const verifylist = (data) => {
    return [
      {
        code: partnerdetails?.mainlist?.partnerId,
        name: partnerdetails?.mainlist?.partnerName,
        label: partnerdetails?.mainlist?.partnerName,
        list: partnerdetails?.details,
        status: 'MASTER PARTNER',
        Substatus: 'master',
        isMasterUser: true
      }
    ].concat(
      _.map(data, (item) => {
        return {
          code: item.TenantProfileCreation.TenantDetails?.TENANT_ID,
          name: item.TenantProfileCreation.TenantDetails?.TENANT_NAME,
          label: item.TenantProfileCreation.TenantDetails?.TENANT_NAME,
          list: item,
          status: 'TENANT PARTNER',
          Substatus: 'tenant',
          isTenantUser: true
        };
      })
    );
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={6}
        className={classes.inner}
      >
        <Grid item >
          <Typography variant="h4">Add User</Typography>
        </Grid>

        <Grid item>
          {!loading ? (
            <Autocomplete
              label="Search Partner/Tenant"
              onChange={handleSelect}
              options={verifylist(value) || []}
            />
          ) : (
            <Typography variant="h4"> Loading ... </Typography>
          )}
        </Grid>

        <Grid item></Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={4}
          >
            <Grid item>
              <Button
                onClick={onCancel}
                size="large"
                variant="text"
                color="secondary"
                className={classes.btnClr}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                variant="contained"
                // color="primary"
                style={{backgroundColor:'#ffcb05'}}
                size="large"
                disabled={_.isEmpty(onSelectValue.value) ? true : false}
              >
                {'Apply'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },

  subtitle: {
    fontWeight: theme.typography.fontWeightMedium
  },

  textarea: {
    width: '100%',
    minWidth: '100%',
    maxWidth: theme.spacing(92),
    maxHeight: theme.spacing(104),
    border: `none`,
    color: theme.palette.text.primary,
    fontFamily: 'inherit'
  }
}));

export default AddProduct;
