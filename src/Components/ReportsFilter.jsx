import React from 'react';
// import { Autocomplete } from 'Components';
import { useStateful } from 'react-hanger';
import {
  Button,
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Chip
} from '@material-ui/core';
import {
  KeyboardDatePicker
  // MuiPickersUtilsProvider
} from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import locals file from date-fns
import statuses from 'lib/constants/statuses';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Trans, useLingui } from '@lingui/react';
import Reports from 'Http/api/Reports';
import '../stories/button.css';

const AutocompleteWrapper = ({
  options,
  handleDropdown,
  label,
  id,
  clearData,
  value,
  uid
}) => {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        options={options || []}
        filterSelectedOptions
        fullWidth
        value={value}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            // className={classes.input}
            {...params}
            value={value}
            size="small"
            placeholder="Favorites"
            margin="normal"
            label={label}
            fullWidth
          />
        )}
        onChange={(e, v, reason) => {
          if (reason === 'clear') {
            clearData(id, uid);
          } else {
            //       if (v && typeof onChange === 'function') {
            // onChange({ target: { name, value: v.value, ...v } });
            //       }

            handleDropdown({
              target: { name: v.name, value: v.value, ...v },
              columId: id
            });
          }
        }}
      />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  mTop: {
    marginTop: '20px'
  },
  chipStyles: {
    '&.MuiChip-outlined': {
      border: '1px solid #ffcb05 !important',
      backgroundColor: theme.palette.type === 'dark' ? '#555555' : '#ffffff'
    },
    '&.MuiChip-colorPrimary': {
      color: '#000000'
      // theme.palette.type === 'dark'
      //   ? `${theme.palette.common.gray} !important`
      //   :'#000000',
    }
    // },
  },
  btnClr: {
    border:  theme.palette.type === 'dark' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.main}` ,
    borderRadius: '28px',
    padding:'7px 23px',
    '&.MuiButton-textSecondary':{
      color: '#000000'
    }
  },
  dateFilter: {
    '& .MuiPickersModal-dialogRoot': {
      padding: '0px !important'
    }
  }
  // picrDate:{
  //   '& .MuiPickersDay-daySelected': {
  //             color:'000000'
  //       // '&:hover': {
  //       //   backgroundColor: vars.palette.secondaryMain
  //       // }
  //   },
  // }
}));
const ReportsFilter = ({
  handleFilter,

  leadClassification,
  statusFilter,
  fromDate,
  toDate,
  handleDateChangeTo,
  handleDateChangeFrom,

  masterdata,
  options,
  statusField,
  FilterObj,
  handlFilterApply,
  showFilter,
  sumaryCardDetails = {},
  StatusList,
  partnerValue,
  commonstatus = [],
  tenantValue,
  clearFilters,
  potentialTenats,
  showStatus
}) => {
  const classes = useStyles();
  const { i18n } = useLingui();

  const Approvel = useStateful([
    { name: 'Approved', code: 'Approved', checked: false },
    { name: 'Rejected', code: 'Rejected', checked: false }
  ]);

  const Technology = useStateful([]);
  const NormalDashBoardStatus = useStateful([]);

  const lobList = useStateful([]);
  const fetchDropdownlist = useStateful([]);

  const selectedDropdownlist = useStateful([]);
  const status = potentialTenats
    ? useStateful([
        { name: i18n.t`Active`, code: 'Active', checked: false },
        { name: i18n.t`Pending`, code: 'Pending', checked: false }
        // { name: 'Suspended', code: 'Suspended', checked: false },
        // { name: 'Rejected', code: 'Rejected', checked: false }
      ])
    : useStateful([
        { name: i18n.t`Active`, code: 'Active', checked: false },
        { name: i18n.t`Pending`, code: 'Pending', checked: false },
        // { name: 'Suspended', code: 'Suspended', checked: false },
        { name: i18n.t`Rejected`, code: 'Rejected', checked: false }
      ]);

  const productStatus = useStateful([
    { name: 'Active', code: 'ACTIVE', checked: false },
    { name: 'Pending', code: 'PENDING', checked: false }
    // { name: 'Suspended', code: 'Suspended', checked: false },
    // { name: 'Rejected', code: 'Rejected', checked: false }
  ]);

  const paymentStatus = useStateful([
    { name: 'Unpaid', code: 'Unpaid', checked: false },
    { name: 'Paid', code: 'Paid', checked: false }
  ]);
  const orderTrackingstatus = useStateful([
    { name: 'created', code: 'created', checked: false },
    { name: 'completed', code: 'completed', checked: false },
    { name: 'Terminated', code: 'Terminated', checked: false },
    { name: 'ADD_VAS', code: 'ADD_VAS', checked: false }
  ]);
  const TroubleTicketStatus = useStateful([
    { name: 'open', code: 'open', checked: false },
    { name: 'closed', code: 'closed', checked: false },
    { name: 'inProgress', code: 'inProgress', checked: false },

    { name: 'resolved', code: 'resolved', checked: false },
    { name: 'rejected', code: 'rejected', checked: false }
  ]);
  const commonChipStatus = useStateful([]);

  const filterValue = <Trans id="Filters"></Trans>;
  const clearValue = <Trans id="Clear"></Trans>;
  const applyValue = <Trans id="Apply"></Trans>;
  const fromDateValue = <Trans id="FROM DATE"></Trans>;
  const toDateValue = <Trans id="TO DATE"></Trans>;

  const handleStatus = (value, data, id) => {
    FilterObj.setValue({
      ...FilterObj.value,
      [id]: value.code
    });
    let temp = _.map(data, (item) => {
      if (item.code === value.code) {
        return {
          ...item,
          checked: true
        };
      } else {
        return {
          ...item,
          checked: false
        };
      }
    });
    if (id === 'orderTrackingstatus') {
      orderTrackingstatus.setValue(temp);
    } else if (id === 'paymentStatus') {
      paymentStatus.setValue(temp);
    } else if (id === 'TroubleTicketStatus') {
      TroubleTicketStatus.setValue(temp);
    } else {
      status.setValue(temp);
    }
  };

  const onHandleFilterChange = (date, value) => {
    FilterObj.setValue({
      ...FilterObj.value,
      [value]: date || null
    });
  };
  const handleClear = () => {
    showFilter.setFalse();
    FilterObj.setValue({});
    let temp = _.map(status.value, (item) => {
      return {
        ...item,
        checked: false
      };
    });
    status.setValue(temp);
    clearFilters();
  };

  const getLob = async () => {
    if (sumaryCardDetails?.columnId === 'PartnerSummary') {
      const res = await Reports._getpartnerType();
      fetchDropdownlist.setValue({ partnerType: res[0].partnerType });
    } else if (sumaryCardDetails?.columnId === 'partnerProductSummary') {
      const res = await Reports._getListOfLob();
      fetchDropdownlist.setValue({ serviceType: res[0]?.serviceType });
    }
  };

  React.useEffect(() => {
    getLob();
  }, []);

  React.useEffect(() => {
    if (commonstatus?.length > 0) {
      commonChipStatus.setValue(commonstatus);
    }
  }, []);
  const handleDropdown = async (v, id) => {
    FilterObj.setValue({
      ...FilterObj.value,
      [v.columId]: v.target
    });

    selectedDropdownlist.se;
    if (v.columId === 'PARTNER_TYPE') {
      selectedDropdownlist.setValue({
        ...selectedDropdownlist.value,
        subtype: v.target.subType
      });
    } else if (v.columId === 'lob') {
      selectedDropdownlist.setValue({
        ...selectedDropdownlist.value,
        technology: v.target.technologyType
      });
    }
  };

  const clearData = (id, uid) => {
    FilterObj.setValue({
      ...FilterObj.value,
      [id]: '',
      [uid]: ''
    });
  };

  const handleDashBoardStatus = (value, id, data) => {
    FilterObj.setValue({
      ...FilterObj.value,
      [id]: value.code
    });
    let temp = _.map(data, (item) => {
      if (item.code === value.code) {
        return {
          ...item,
          checked: true
        };
      } else {
        return {
          ...item,
          checked: false
        };
      }
    });
    status.setValue(temp);
  };

  const HandleCommonFilter = (value, id, data) => {
    FilterObj.setValue({
      ...FilterObj.value,
      [id]: value.code
    });
    let temp = _.map(data, (item) => {
      if (item.code === value.code) {
        return {
          ...item,
          checked: true
        };
      } else {
        return {
          ...item,
          checked: false
        };
      }
    });
    commonChipStatus.setValue(temp);
  };

  // const handleFilterHere = async () => {
  //   await handlFilterApply();
  //   handleClear();
  // }
  return (
    <Box m={3}>
      <Grid direction="column" spacing={8}>
        <form>
          <Grid item>
            <Typography variant="h2">{filterValue}</Typography>
          </Grid>

          {/* {sumaryCardDetails?.columnId !== 'PartnerOrderSummary' && ( */}
          <Grid item className={classes.mTop}>
            <Box py={5}>
              <Grid container direction="row" spacing={4}>
                <Grid item xs={6}>
                  {/* <MuiPickersUtilsProvider locale="en" utils={DateFnsUtils}> */}
                  <KeyboardDatePicker
                    // className={classes.picrDate}
                    // clearable
                    disableFuture
                    required
                    // autoOk={true}
                    format="dd/MM/yyyy"
                    value={
                      FilterObj?.value?.fromDate
                        ? FilterObj.value?.fromDate
                        : null
                    }
                    // required
                    name="fromDate"
                    label={fromDateValue}
                    className={classes.dateFilter}
                    onChange={(date) => onHandleFilterChange(date, 'fromDate')}
                    strictCompareDates
                  />
                  {/* </MuiPickersUtilsProvider> */}
                </Grid>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    //  className={classes.picrDate}
                    // clearable
                    required
                    // autoOk={true}
                    disableFuture
                    value={
                      FilterObj?.value?.toDate ? FilterObj.value?.toDate : null
                    }
                    name="toDate"
                    format="dd/MM/yyyy"
                    label={toDateValue}
                    className={classes.dateFilter}
                    // required
                    onChange={(date) => onHandleFilterChange(date, 'toDate')}
                    strictCompareDates
                    // minDate={fromDate}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* )} */}

          {sumaryCardDetails?.columnId === 'PartnerOrderSummary' && (
            <>
              <Grid item>
                <Typography variant="h4">Status</Typography>
              </Grid>

              <Grid item>
                <Box py={4}>
                  <Grid container direction="row" spacing={2}>
                    {orderTrackingstatus?.value.map((item) => {
                      return (
                        <Grid item>
                          <Chip
                            variant={item.checked ? 'default' : 'outlined'}
                            size="medium"
                            color={item.checked ? 'primary' : ''}
                            label={item.code}
                            className={classes.chipStyles}
                            onClick={() =>
                              handleStatus(
                                item,
                                orderTrackingstatus.value,
                                'orderTrackingstatus'
                              )
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </>
          )}

          {showStatus &&
            statuses.DashBoardStatus[partnerValue] === 'partnerStatus' && (
              <>
                <Grid item>
                  <Typography variant="h4">
                    <Trans id="Status"></Trans>
                  </Typography>
                </Grid>

                <Grid item>
                  <Box py={4}>
                    <Grid container direction="row" spacing={2}>
                      {status?.value.map((item) => {
                        return (
                          <Grid item>
                            <Chip
                              variant={item.checked ? 'default' : 'outlined'}
                              size="medium"
                              style={{ fontSize: 15 }}
                              color={item.checked ? 'primary' : ''}
                              className={classes.chipStyles}
                              label={item.name}
                              onClick={() =>
                                handleDashBoardStatus(
                                  item,
                                  statuses.DashBoardStatus[partnerValue],
                                  status?.value
                                )
                              }
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Grid>
              </>
            )}

          {commonChipStatus.value.length > 0 && (
            <>
              <Grid item>
                <Typography variant="h4">Status</Typography>
              </Grid>

              <Grid item>
                <Box py={4}>
                  <Grid container direction="row" spacing={2}>
                    {commonChipStatus?.value.map((item) => {
                      return (
                        <Grid item>
                          <Chip
                            variant={item.checked ? 'default' : 'outlined'}
                            size="medium"
                            style={{ fontSize: 15 }}
                            color={item.checked ? 'primary' : ''}
                            className={classes.chipStyles}
                            label={item.code}
                            onClick={() =>
                              HandleCommonFilter(
                                item,
                                'status',
                                commonChipStatus?.value
                              )
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </>
          )}

          {sumaryCardDetails?.columnId === 'PartnerPaymentSummary' && (
            <>
              <Grid item>
                <Typography variant="h4">Status</Typography>
              </Grid>

              <Grid item>
                <Box py={4}>
                  <Grid container direction="row" spacing={2}>
                    {paymentStatus.value.map((item) => {
                      return (
                        <Grid item>
                          <Chip
                            variant={item.checked ? 'default' : 'outlined'}
                            size="medium"
                            style={{ fontSize: 15 }}
                            color={item.checked ? 'primary' : ''}
                            className={classes.chipStyles}
                            label={item.code}
                            onClick={() =>
                              handleStatus(
                                item,
                                paymentStatus.value,
                                'paymentStatus'
                              )
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </>
          )}

          {_.includes(
            ['PartnerTroubleTicketSummary', 'PartnerCustomerTicketSummary'],
            sumaryCardDetails?.columnId
          ) && (
            <>
              <Grid item>
                <Typography variant="h4">Status</Typography>
              </Grid>

              <Grid item>
                <Box py={4}>
                  <Grid container direction="row" spacing={2}>
                    {TroubleTicketStatus.value.map((item) => {
                      return (
                        <Grid item>
                          <Chip
                            variant={item.checked ? 'default' : 'outlined'}
                            size="medium"
                            style={{ fontSize: 15 }}
                            color={item.checked ? 'primary' : ''}
                            className={classes.chipStyles}
                            label={item.code}
                            onClick={() =>
                              handleStatus(
                                item,
                                TroubleTicketStatus.value,
                                'TroubleTicketStatus'
                              )
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </>
          )}

          {sumaryCardDetails?.columnId === 'PartnerSummary' && (
            <>
              <Grid item>
                <Typography variant="h4">Category</Typography>
              </Grid>

              <Grid item>
                <Box py={1}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={6}>
                      <AutocompleteWrapper
                        options={fetchDropdownlist?.value?.partnerType || []}
                        id={'PARTNER_TYPE'}
                        label={'PARTNER TYPE'}
                        clearData={clearData}
                        uid={'PARTNER_SUB_TYPE'}
                        handleDropdown={handleDropdown}
                        value={FilterObj.value?.PARTNER_TYPE?.name}
                      />
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item>
                <Typography variant="h4">Status</Typography>
              </Grid>

              <Grid item>
                <Box py={4}>
                  <Grid container direction="row" spacing={2}>
                    {status.value.map((item) => {
                      return (
                        <Grid item>
                          <Chip
                            variant={item.checked ? 'default' : 'outlined'}
                            size="medium"
                            style={{ fontSize: 15 }}
                            color={item.checked ? 'primary' : ''}
                            className={classes.chipStyles}
                            label={item.code}
                            onClick={() =>
                              handleStatus(item, status.value, 'status')
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </>
          )}
          {sumaryCardDetails?.columnId === 'partnerProductSummary' && (
            <Grid item>
              <Box py={2}>
                <Grid container direction="column" spacing={2}>
                  <Grid item >
                    <div style={{ width: 300}} className='lobDropdown'>
                      <AutocompleteWrapper
                        options={fetchDropdownlist.value?.serviceType || []}
                        id={'lob'}
                        label={'LOB'}
                        clearData={clearData}
                        value={FilterObj?.value?.lob?.name}
                        handleDropdown={handleDropdown}
                      />
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">Status</Typography>
                  </Grid>

                  <Grid item>
                    <Box py={4}>
                      <Grid container direction="row" spacing={2}>
                        {status.value.map((item) => {
                          return (
                            <Grid item>
                              <Chip
                                variant={item.checked ? 'default' : 'outlined'}
                                size="medium"
                                style={{ fontSize: 15 }}
                                color={item.checked ? 'primary' : ''}
                                className={classes.chipStyles}
                                label={item.code}
                                onClick={() =>
                                  handleStatus(item, status.value, 'status')
                                }
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Grid>
                  {/* <Grid item>
                    <AutocompleteWrapper
                      options={selectedDropdownlist.value?.technology || []}
                      id={'technology'}
                      label={'TECHNOLOGY'} value={FilterObj?.value?.technology?.name}
                      clearData={clearData}
                      handleDropdown={handleDropdown}
                    />
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          )}
          <Grid item className={classes.mTop}>
            <Grid container justify="flex-end" spacing={3}>
              <Grid item>
                <Button
                  variant="text"
                  color="secondary"
                  size="large"
                  style={{ fontSize: 15 }}
                  className={classes.btnClr}
                  onClick={handleClear}
                >
                  {clearValue}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ fontSize: 15 }}
                  onClick={handlFilterApply}
                >
                  {applyValue}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

export default ReportsFilter;
