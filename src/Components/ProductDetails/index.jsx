import { Box, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import Autocomplete from 'lib/components/Autocomplete';
import dashboard from 'Http/api/dashboard';
import { useStateful } from 'react-hanger';
import workflowPayload from 'Factory/Worlflowpayload';
import excuteWorkflow from 'Http/api/WorkflowApi';
import HooksFormWrapper from 'lib/components/HooksFormWrapper/HooksFormWrapper';
export default function index({ onClose, rowlist, workflowTrigger, loading }) {
  const list = useStateful({});
  const classes = useStyles();
  const dropdownlist = useStateful({});
  const productRowlist = useStateful({});
  // const loading = useBoolean(false);
  React.useEffect(() => {
    getdata();

    getworkflowdetails();
  }, []);

  const getdata = async () => {
    let res = await dashboard.getAlldropdown();
    list.setValue(res);
  };
  const getworkflowdetails = async () => {
    let res = await excuteWorkflow.ExcuteWorkflow(
      workflowPayload.productSpecificationDropdown('1635946360486')
    );
    const type = await excuteWorkflow.ExcuteWorkflow(
      workflowPayload.productSpecificationDropdown('1636522713165')
    );

    //  if(!_.isEmpty(res)){
    dropdownlist.setValue({
      productspec: _.map(res?.dynamicText, (item) => {
        return {
          name: item.label,
          code: item.id
        };
      }),
      businessType: _.map(type?.dynamicText, (item) => {
        return {
          name: item.label,
          code: item.id
        };
      })
    });
    // }
  };
  React.useEffect(() => {
    if (rowlist) {
      productRowlist.setValue(rowlist?.columns);
    }
  }, [rowlist]);

  const handleSubmit = async (values) => {
    workflowTrigger({
      payload: workflowPayload.dcmProductPayload(values, productRowlist.value)
    });
  };

  return (
    <div>
      <Buttonsheet
        open={true}
        onClose={onClose}
        header={'Product Configuration'}
      >
        <HooksFormWrapper
          onSubmit={handleSubmit}
          // validationSchema={Schema.dcmYupValidate}
        >
          {({ register, errors, control, setValue, reset }) => {
            return (
              <Grid container direction="column" spacing={5}>
                <Paper elevation={0}>
                  <Box p={4}>
                    <Box mb={4}>
                      <Grid container spacing={6}>
                        <Grid item>
                          <Typography variant="h2" className={classes.title}>
                            DCM Configuration
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid container spacing={6}>
                      <Grid item xs={4}>
                        <Autocomplete
                          required={true}
                          id="free-solo-demo"
                          error={!!errors.type}
                          helperText={_.get(errors, 'type', '')}
                          name={'BusinessType'}
                          options={dropdownlist.value?.businessType || []}
                          label="BUSINESS TYPE"
                          variant="standard"
                          control={control}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Autocomplete
                          required={true}
                          id="free-solo-demo"
                          error={!!errors.type}
                          helperText={_.get(errors, 'type', '')}
                          name={'type'}
                          options={dropdownlist.value?.productspec || []}
                          label="PRODUCT SPECIFICATION"
                          variant="standard"
                          control={control}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Autocomplete
                          // id="free-solo-demo"
                          required={true}
                          error={!!errors.marketSegment}
                          helperText={_.get(errors, 'marketSegment', '')}
                          name={'marketSegment'}
                          options={list.value?.Segment || []}
                          label="MARKET SEGMENT"
                          variant="standard"
                          control={control}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Autocomplete
                          // id="free-solo-demo"
                          required={true}
                          error={!!errors.channels}
                          helperText={_.get(errors, 'channels', '')}
                          name={'channels'}
                          options={list.value?.Channels || []}
                          label="CHANNELS"
                          variant="standard"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          // id="free-solo-demo"
                          error={!!errors.category}
                          helperText={_.get(errors, 'category', '')}
                          required={true}
                          name={'category'}
                          options={list.value?.Category || []}
                          label="CATEGORY"
                          variant="standard"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          // id="free-solo-demo"
                          currency
                          required={true}
                          error={!!errors.taxCategory}
                          helperText={_.get(errors, 'taxCategory', '')}
                          name={'taxCategory'}
                          options={list.value?.taxCategory || []}
                          label="TAX CATEGORY"
                          variant="standard"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          // id="free-solo-demo"
                          required={true}
                          error={!!errors.priceType}
                          helperText={_.get(errors, 'priceType', '')}
                          name={'priceType'}
                          options={list.value?.configservice || []}
                          label="PRICE TYPE"
                          variant="standard"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          id="free-solo-demo"
                          name={'charges'}
                          required={true}
                          error={!!errors.charges}
                          helperText={_.get(errors, 'charges', '')}
                          options={list.value?.charges || []}
                          label="CHARGES"
                          variant="standard"
                          control={control}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Box py={4}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      //   style={{ paddingTop: '12px' }}
                      spacing={4}
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          //   onClick={(event) => onCancel(event)}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Submitting ....' : 'Submit'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            );
          }}
        </HooksFormWrapper>

        <Grid container direction="column" spacing={6}></Grid>
      </Buttonsheet>
    </div>
  );
}

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
