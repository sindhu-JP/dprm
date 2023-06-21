import React, { useState } from 'react';
import { useStateful } from 'react-hanger';
import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  Divider,
  Radio,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@material-ui/core';
import constants from '../../Features/constants/constants';
import CloseIcon from '@material-ui/icons/Close';
// import { CloseOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import DashboardApi from 'Http/360/Api/Dashboard';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import Modal from '../../Store/Modals';
import moment from 'moment';
import { Trans } from '@lingui/react';
// import { KeyboardDatePicker } from 'formik-material-ui-pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },

  error: {
    color: theme.palette.error.main
  },
  formControl: {
    maxWidth: '18rem',
    marginTop: '8px'
  },
  autoComplete: {
    borderRadius: '0px'
  },
  inner: {
    width: '50rem',
    padding: theme.spacing(6),
    height: 'auto',
    // overflow:'y-axis',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },
  bodyStyle: {
    height: '30rem',
    overflow: 'scroll'
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
  },
  closeIcon: { cursor: 'pointer' },

  mtop50: {
    marginTop: '50px'
  },

  submitBtn: {
    background: '#2626C0',
    width: '93px',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    '&:hover': {
      background: '#2626C0'
    }
  },

  titleColor: {
    color: '#CECECE'
  }
}));

const TicketFilter = (props) => {
  const {
    context,
    user,
    onCancel,
    onSubmit,
    modalId,
    title,
    type,
    duration,
    loading,
    parent,
    error,
    modalContext,
    partnerdetails,
    Load_filter_tickets,
    sortFilter,
    customFilter
  } = props;
  const classes = useStyles();
  const description = useStateful('');
  const { OPEN, INPROGRESS, CLOSED, REJECTED, RESOLVED } = constants.status;
  const priorityList = [
    { title: 'High', value: 'High' },
    { title: 'Medium', value: 'Medium' },
    { title: 'Low', value: 'Low' }
  ];
  const Statuslist = [
    { code: 'Complaint', name: 'All', checked: true, value: 'all' },
    { code: 'Query', name: 'In-Progress', checked: false, value: INPROGRESS },
    { code: 'Request', name: 'Open', checked: false, value: OPEN },
    { code: 'Request', name: 'Closed', checked: false, value: CLOSED },
    { code: 'Request', name: 'Reopen', checked: false, value: 'reOpen' },
    { code: 'Request', name: 'Rejected', checked: false, value: REJECTED },
    { code: 'Request', name: 'Resolved', checked: false, value: RESOLVED }
  ];
  const ticketTypeList = [
    { title: 'Complaint', value: 'Complaint' },
    { title: 'Query', value: 'Query' },
    { title: 'Request', value: 'Request' },
    { title: 'Fault', value: 'Fault' }
  ];
  // const StatusQuery = [
  //   { code: 'Complaint', name: 'On-Hold', checked: true },
  //   { code: 'Query', name: 'Open', checked: false },
  //   { code: 'Request', name: 'Resolved', checked: false },
  //   { code: 'Request', name: 'Rejected', checked: false }
  // ];
  const sortBy = [
    { title: 'Created Date By Ascending', value: 'createdDate' },
    { title: 'Created Date By Descending', value: '-createdDate' },
    { title: 'Modified Date By Ascending', value: 'modifiedDate' },
    { title: 'Modified Date By Descending', value: '-modifiedDate' },
    { title: 'Resolution Date By Ascending', value: 'resolutionDate' },
    { title: 'Resolution Date By Descending', value: '-resolutionDate' }
  ];
  const [filterObj, setFilterObj] = useState({});
  const [dateRange, setDateRange] = useState('');
  const [dateModRange, setModDate] = useState('');
  const [dateRes, setDateRes] = useState('');
  const [resDate, setResDate] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [modDateCustom, setModDateCustom] = useState('');
  const [resDateCustom, setResDateCustom] = useState('');
  const [activeDate, setActiveDate] = useState('');
  const [catData, setCatData] = useState({
    parentCatData: [],
    subCatData: []
  });
  // const [cat_loading,setCat_Loading]=useState(true)
  const dispatch = useDispatch();

  const fromDateValue = <Trans id="FROM DATE"></Trans>;
  const toDateValue = <Trans id="TO DATE"></Trans>;

  const getCategoryOptions = async (type) => {
    const data = await DashboardApi._getParentCategoryDetails(type).catch(
      (err) => null
    );
    let res = [];
    data.length > 0 &&
      data.map((itm) => {
        res.push({ id: itm.id, title: itm.name });
      });
    setCatData({ ...catData, parentCatData: res });

    // setCat_Loading(false)
  };
  const getSubCategoryOptions = async (type) => {
    let data;

    if (type) {
      data = await DashboardApi._getSubCategoryDetails(type);
      let res = [];
      data.length > 0 &&
        data.map((itm) => {
          res.push({ id: itm.id, title: itm.name });
        });
      setCatData({ ...catData, subCatData: res });
    }
  };
  React.useEffect(() => {
    if (catData?.subCatData?.length > 0) {
      setFilterObj({ ...filterObj, subCategory: catData.subCatData[0] });
    }
    if (catData?.subCatData?.length === 0 || !filterObj.parentCategory) {
      setFilterObj({ ...filterObj, subCategory: '' });
    }



 
 
  }, [catData.subCatData]);
  const HandleClear = () => {
    setFilterObj({});
    setActiveDate('');
    setDateRange('');
    setModDate('');
    setResDate('');
  };
  var date = new Date();
  const updateModDate = (e) => {
    setActiveDate('modified');
    // date object
    setModDate(e.target.value);
    if (e.target.value === 'Last 6 Months') {
      const targetDate = moment(date)
        .subtract(6, 'months')
        .toDate()
        .toISOString();
      setFilterObj({
        ...filterObj,
        modifiedDate: targetDate
      });
    }

    if (e.target.value === 'Last 30 Days') {
      const targetDate = moment(date)
        .subtract(30, 'days')
        .toDate()
        .toISOString();
      setFilterObj({
        ...filterObj,
        modifiedDate: targetDate
      });
    }

 
  };

  const updateModDateCustom = (date) => {
    // date object
    setModDateCustom(date);

    setFilterObj({
      ...filterObj,
      modifiedDateFrom: date.toISOString()
    });
  };
  const updateResDateCustom = (date) => {
    // date object
    setResDateCustom(date);

    setFilterObj({
      ...filterObj,
      resolutionDate: date.toISOString()
    });
  };
  const updatCustom = (date) => {
    setCustomDate(date);

    setFilterObj({
      ...filterObj,
      fromDate: date
    });

    setFilterObj({
      ...filterObj,
      toDate: date
    });
  };
  const updateResDate = (e) => {
    setActiveDate('resolution');
    // date object
    setResDate(e.target.value);
    if (e.target.value === 'Last 6 Months') {
      const targetDate = moment(date)
        .subtract(6, 'months')
        .toDate()
        .toISOString();
      setFilterObj({
        ...filterObj,
        resolutionDate: targetDate
      });
    }
    if (e.target.value === 'Last 30 Days') {
      const targetDate = moment(date)
        .subtract(30, 'days')
        .toDate()
        .toISOString();
      setFilterObj({
        ...filterObj,
        resolutionDate: targetDate
      });
    }
    
  };
  const updateDate = (e) => {
    // date object
    setDateRange(e.target.value);
    setActiveDate('created');
    if (e.target.value === 'Last 6 Months') {
      const targetDate = moment(date)
        .subtract(6, 'months')
        .toDate()
        .toISOString();
      setFilterObj({
        ...filterObj,
        createdDate: targetDate
      });
    }
    if (e.target.value === 'Last 30 Days') {
      const targetDate = moment(date)
        .subtract(30, 'days')
        .toDate()
        .toISOString();
      setFilterObj({
        ...filterObj,
        createdDate: targetDate
      });
    }

  };

  
  const HandleSubmit = async () => {
    let data = [];
    let catArr = [];
    let filtercount = 0;
    let dynamicURL = '';
    let filtercontent = {};
    Object.keys(filterObj).map((key) => {
      

      let sort = sortFilter ? 'sort=-modifiedDate' : '';

      if (key === 'createdDate') {
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&${key}%3E${filterObj[key]}`;

        sort = '';
      }
      if (key === 'fromDate') {
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&createdDate%3E${filterObj[key]}`;
        sort = '';
      }
      if (key === 'toDate') {
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&createdDate%3C${filterObj[key]}`;
        sort = '';
      }
      if (key === 'modifiedDateFrom') {
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&modifiedDate%3E${filterObj[key]}`;
        sort = '';
      }
      if (key === 'modifiedDateTo') {
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&modifiedDate%3C${filterObj[key]}`;
        sort = '';
      }
      if (key === 'resolutionTo') {
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&resolutionDate%3C${filterObj[key]}`;
        sort = '';
      }
      if (key === 'resolutionFrom') {
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&resolutionDate%3E${filterObj[key]}`;
        sort = '';
      }
      if (key === 'modifiedDate') {
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&${key}%3E${filterObj[key]}`;
        sort = '';
      }
      if (key === 'resolutionDate') {
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key] };
        dynamicURL = dynamicURL + `&${sort}&${key}%3E${filterObj[key]}`;
        sort = '';
      }

      if (key === 'status') {
        if (filterObj.status !== 'all') {
          filtercount++;
          filtercontent = { ...filtercontent, [key]: filterObj[key] };
          dynamicURL = dynamicURL + `&${key}=${filterObj[key]}`;
        }
      } else if (key !== 'priority') {
        if (
          key.toLowerCase() !== 'parentcategory' &&
          key.toLowerCase() !== 'subcategory' &&
          key.toLowerCase() !== 'sort' &&
          key.toLowerCase() !== 'createddate' &&
          key.toLowerCase() !== 'modifieddate' &&
          key.toLowerCase() !== 'resolutiondate' &&
          key.toLowerCase() !== 'fromdate' &&
          key.toLowerCase() !== 'todate' &&
          key.toLowerCase() !== 'modifieddateto' &&
          key.toLowerCase() !== 'modifieddatefrom' &&
          key.toLowerCase() !== 'resolutionto' &&
          key.toLowerCase() !== 'resolutionfrom'
        ) {
          filtercount++;
          filtercontent = { ...filtercontent, [key]: filterObj[key] };
          dynamicURL = dynamicURL + `&${key}=${filterObj[key]}`;
        }
      }
      if (key.toLowerCase() === 'sort') {
        dynamicURL = dynamicURL + `&${key}=${filterObj[key].value}`;
        filtercount++;
        filtercontent = { ...filtercontent, [key]: filterObj[key].value };
      }
      if (key === 'priority') {
        filtercount++;
        const pr_arr = Object.keys(filterObj.priority).filter(
          (key) => filterObj.priority[key]
        );
        pr_arr.forEach((itm) => {
          dynamicURL = dynamicURL + `&priority=${itm}`;
        });
        filtercontent = { ...filtercontent, [key]: pr_arr[0] };
        
      }

      if (key.toLowerCase().includes('category')) {
        if (filterObj[key]) {
          catArr.push(filterObj[key].id);
        }
      }
    });
    if (catArr.length) {
      filtercount++;
      filtercontent = {
        ...filtercontent,
        category: {
          parentCategory: filterObj.parentCategory,
          subCategory: filterObj.subCategory
        }
      };
      dynamicURL += `&category*=${catArr.toString()}`;
    }


    
    dynamicURL = dynamicURL.substring(1);

    //  data = await TicketSystem._getFilterData(partnerdetails.mainlist.partnerId, dynamicURL)

    const payloadxx = {
      id: partnerdetails.mainlist.partnerId,
      dynamicURL: dynamicURL,
      filtercount
    }

    localStorage.setItem("filter", JSON.stringify(payloadxx));

    Load_filter_tickets({ id: partnerdetails.mainlist.partnerId, dynamicURL });
    dispatch(Modal.close('TicketFilter'));
    props.setFilterCount({ count: filtercount, content: filtercontent });
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={8}
        className={classes.inner}
      >
        <Grid item>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3">ALL FILTERS</Typography>
            </Grid>

            <Grid item className={classes.closeIcon}>
              <CloseIcon onClick={onCancel} />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item className={classes.bodyStyle}>
          {customFilter && (
            <Grid item xs>
              <Box py={5}>
                <Grid container direction="row">
                  <Grid item xs>
                    <Grid container direction="column" spacing={5}>
                      <Autocomplete
                        className={classes.formControl}
                        classes={{ paper: classes.autoComplete }}
                        value={filterObj?.ticketType || ''}
                        options={ticketTypeList}
                        getOptionLabel={(option) => {
                          if (option.hasOwnProperty('title')) {
                            return option.title;
                          }
                          return option;
                        }}
                        onChange={(event, newValue) => {
                          getCategoryOptions(newValue?.value);
                          setFilterObj({
                            ...filterObj,
                            ['ticketType']: newValue?.value || ''
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={'Ticket Type'}
                            placeholder="Select"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <></>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container direction="column" spacing={5}>
                      <Autocomplete
                        className={classes.formControl}
                        classes={{ paper: classes.autoComplete }}
                        options={sortBy}
                        value={filterObj?.sortBy?.title || ''}
                        getOptionLabel={(option) => {
                          if (option.hasOwnProperty('title')) {
                            return option.title;
                          }
                          return option;
                        }}
                        onChange={(event, newValue) =>
                          setFilterObj({
                            ...filterObj,
                            ['sort']: newValue || ''
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={'Sort'}
                            placeholder="Select"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <></>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}

          {customFilter && (
            <Grid item xs>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography variant="body1">Status</Typography>
                </Grid>
                <Grid item>
                  <Box my={3} mx={5}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="ticketType"
                        className="inSameline"
                        value={filterObj?.status || ''}
                        onChange={(e) => {
                          setFilterObj({
                            ...filterObj,
                            status: e.target.value
                          });
                        }}
                      >
                        {Statuslist &&
                          Statuslist.map((item, index) => {
                            return (
                              <FormControlLabel
                                key={item.code}
                                // checked={item[item.value]}
                                // disabled={!item.checked}
                                value={item.value}
                                control={<Radio />}
                                label={item.name}
                              />
                            );
                          })}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>

                {/* <Grid item>
                <Box my={3} mx={5}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      name="ticketType"
                      className="inSameline"
                      // onChange={(e) => {
                      //   handleSelect(e, setType);
                      //   setSearchCategory('');
                      //   setCategory([]);
                      //   setSubCategory([]);
                      //   loadCategoriesList(e.target.value);
                      //   loadSubcategories(e.target.value);
                      // // }}
                      // value={type}
                    >
                      {StatusQuery &&
                        StatusQuery.map((item, index) => {
                          return (
                            <FormControlLabel
                              key={item.code}
                              // checked={item.checked}
                              // disabled={!item.checked}
                              // value={item.name}
                              control={<Radio />}
                              label={item.name}
                            />
                          );
                        })}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid> */}
              </Grid>
            </Grid>
          )}

          
            {<Grid item>
              <Typography variant="body1">Priority</Typography>
            </Grid>}
{/*         
          <FormControl component={'fieldset'}>
          <RadioGroup
          name={`priority`}
            value={filterObj.priority}
            onChange={(e) =>{setFilterObj({ ...filterObj, priority: e.target.value })}
               
              
            }
          >
            <Grid container direction="row">
              {priorityList.map((itm, index) => (
                // <Grid item xs={3} key={index + 'priority'}>
                  <FormControlLabel
                  key={index + 'priority'}
                    value={itm.value}
                    label={itm.title}
                    control={<Checkbox />}
                  />
                // </Grid>
              ))}
            </Grid>
          </RadioGroup>
          </FormControl> */}
          
            <FormGroup row>
              {priorityList &&
                priorityList.map((item, index) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filterObj?.priority?.[item.value] || false}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                         
                            setFilterObj({
                              ...filterObj,
                              priority: {
                                ...filterObj?.priority,
                                [value]: checked
                              }
                            });
                       
                          }}
                          name="checkedA"
                          value={item.value}
                        />
                      }
                      label={item.title}
                    />
                  );
                })}
            </FormGroup>
       
          <Grid item xs={12} style={{ marginTop: '30px' }}>
            <Grid container direction="column" justify="space-between">
              <Grid item>
                <Typography variant="body1">CREATION DATE RANGE</Typography>
              </Grid>
              <RadioGroup value={dateRange} onChange={(e) => updateDate(e)}>
                <Grid container direction="row">
                  {['Last 30 Days', 'Last 6 Months', 'Custom'].map(
                    (item, index) => (
                      <Grid item xs={3} key={index + 'CREATION DATE RANGE'}>
                        <FormControlLabel
                          value={item}
                          label={item}
                          disabled={
                            !(activeDate === 'created' || activeDate === '')
                          }
                          control={<Radio />}
                        />
                      </Grid>
                    )
                  )} 
                </Grid>
              </RadioGroup>
              {dateRange.toLowerCase() === 'custom' && (
                <Grid container direction="row" spacing={4} style={{marginBottom: "20px"}}>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      // clearable
                      disableFuture
                      required
                      format="dd/MM/yyyy"
                      value={filterObj?.fromDate ?  filterObj?.fromDate  : null}
                       label={fromDateValue}
                      // required
                      name="createdDate"
                      onChange={(date) =>
                        setFilterObj({
                          ...filterObj,
                          fromDate:  `${moment(date).format(
                            'YYYY-MM-DD'
                          )}T00:00:00.000Z`
                        })
                      }
                      strictCompareDates
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      // clearable
                      required
                      disableFuture
                      value={filterObj?.toDate ? filterObj?.toDate : null}
                      name="toDate"
                      format="dd/MM/yyyy"
                      label={toDateValue}
                      // required
                      onChange={(date) =>
                        setFilterObj({
                          ...filterObj,
                          toDate: `${moment(date).format(
                            'YYYY-MM-DD'
                          )}T00:00:00.000Z`
                        })
                      }
                      strictCompareDates
                      // minDate={createdDate}
                    />
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Typography variant="body1">MODIFIED DATE RANGE</Typography>
              </Grid>
              <RadioGroup
                value={dateModRange}
                onChange={(e) => updateModDate(e)}
              >
                <Grid container direction="row">
                  {['Last 30 Days', 'Last 6 Months', 'Custom'].map(
                    (item, index) => (
                      <Grid item xs={3} key={index + 'MODIFIED DATE RANGE'}>
                        <FormControlLabel
                          value={item}
                          label={item}
                          disabled={
                            !(activeDate === 'modified' || activeDate === '')
                          }
                          control={<Radio />}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </RadioGroup>
              {dateModRange.toLowerCase() === 'custom' && (
                <Grid container direction="row" spacing={4}>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      // clearable
                      disableFuture
                      required
                      format="dd/MM/yyyy"
                      value={ filterObj?.modifiedDateFrom  ? filterObj?.modifiedDateFrom  : null}
                      // required
                      name="createdDate"
                      label={fromDateValue}
                      // label="FROM DATE"
                      onChange={(date) =>
                        setFilterObj({
                          ...filterObj,
                          modifiedDateFrom:  `${moment(date).format(
                            'YYYY-MM-DD'
                          )}T00:00:00.000Z`
                        })
                      }
                      strictCompareDates
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      // clearable
                      required
                      disableFuture
                      value={filterObj?.modifiedDateTo  ? filterObj?.modifiedDateTo  : null}
                      name="toDate"
                      format="dd/MM/yyyy"
                      // required
                      label={toDateValue}
                      onChange={(date) =>
                        setFilterObj({
                          ...filterObj,
                          modifiedDateTo:`${moment(date).format(
                            'YYYY-MM-DD'
                          )}T00:00:00.000Z`
                        })
                      }
                      strictCompareDates
                      // minDate={createdDate}
                    />
                  </Grid>
                </Grid>
              )}

              {customFilter && (
                <Grid item>
                  <Typography variant="body1">RESOLVED DATE RANGE</Typography>
                </Grid>
              )}
              {customFilter && (
                <RadioGroup value={resDate} onChange={(e) => updateResDate(e)}>
                  <Grid container direction="row">
                    {['Last 30 Days', 'Last 6 Months', 'Custom'].map(
                      (item, index) => (
                        <Grid item xs={3} key={index + 'RESOLVED DATE RANGE'}>
                          <FormControlLabel
                            value={item}
                            disabled={
                              !(
                                activeDate === 'resolution' || activeDate === ''
                              )
                            }
                            label={item}
                            control={<Radio />}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </RadioGroup>
              )}
              {customFilter && resDate.toLowerCase() === 'custom' && (
                <Grid container direction="row" spacing={4}>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      // clearable
                      disableFuture
                      required
                      format="dd/MM/yyyy"
                      value={ filterObj?.resolutionFrom  ? filterObj?.resolutionFrom  : null}
                      label={fromDateValue}
                      // required
                      name="createdDate"
                      onChange={(date) =>
                        setFilterObj({
                          ...filterObj,
                          resolutionFrom: `${moment(date).format(
                            'YYYY-MM-DD'
                          )}T00:00:00.000Z`
                        })
                      }
                      strictCompareDates
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      // clearable
                      required
                      disableFuture
                      value={ filterObj?.resolutionTo  ? filterObj?.resolutionTo  : null}
                      name="toDate"
                      format="dd/MM/yyyy"
                      label={toDateValue}
                      // required
                      onChange={(date) =>
                        setFilterObj({
                          ...filterObj,
                          resolutionTo: `${moment(date).format(
                            'YYYY-MM-DD'
                          )}T00:00:00.000Z`
                        })
                      }
                      strictCompareDates
                      // minDate={createdDate}
                    />
                  </Grid>
                </Grid>
              )}

              {/* <Grid item mt={20}>
                <Typography variant="body1">OTHER FILTERS</Typography>
              </Grid>
              <FormGroup row>
                {[
                  { title: 'Partner Tickets', value: 'Partner Tickets' },
                  { title: 'Global Tickets', value: 'Global Tickets' },
                  { title: 'Escalated Tickets', value: 'Escalated Tickets' }
                ].map((item, index) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            filterObj?.otherFilters?.[item.value] || false
                          }
                          onChange={(e) => {
                            const { value, checked } = e.target;

                            setFilterObj({
                              ...filterObj,
                              otherFilters: {
                                ...filterObj?.otherFilters,
                                [value]: checked
                              }
                            });
                          }}
                          name="checkedA"
                          value={item.value}
                        />
                      }
                      label={item.title}
                    />
                  );
                })}
              </FormGroup> */}
              {/* <RadioGroup
                value={filterObj?.otherFilters ||''}
                onChange={(e) =>
                  setFilterObj({ ...filterObj, otherFilters: e.target.value })
                }
              >
                <Grid container direction="row">
                  {[
                    'Partner Tickets',
                    'Global Tickets',
                    'Escalated Tickets'
                  ].map((item, index) => (
                    <Grid item xs={3} key={index + 'OTHER FILTERS'}>
                      <FormControlLabel
                        value={item}
                        label={item}
                        control={<Checkbox 
                           checked={filterObj?.otherFilters?.[item.value] || false}
                          />}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup> */}
            </Grid>
          </Grid>
          {customFilter && (
            <Grid item xs>
              <Box py={5}>
                <Grid container direction="row">
                  <Grid item xs>
                    <Grid container direction="column" spacing={5}>
                      <Autocomplete
                        className={classes.formControl}
                        // disabled={cat_loading}
                        classes={{ paper: classes.autoComplete }}
                        value={filterObj?.parentCategory || ''}
                        options={catData.parentCatData}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) => {
                          setFilterObj({
                            ...filterObj,
                            ['parentCategory']: newValue
                          });
                          if (newValue?.id) {
                            getSubCategoryOptions(newValue.id);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={'CATEGORY'}
                            placeholder="Select"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <></>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container direction="column" spacing={5}>
                      <Autocomplete
                        className={classes.formControl}
                        classes={{ paper: classes.autoComplete }}
                        // ref={subcatref}
                        value={filterObj?.subCategory || ''}
                        // defaultValue={catData.subCatData?.[0]?.title||''}
                        options={catData.subCatData}
                        getOptionLabel={(option) => {
                          // console.log({ option }, 'option');
                          if (option.hasOwnProperty('title')) {
                            return option.title;
                          }
                          return option;
                        }}
                        onChange={(event, newValue) => {
                          setFilterObj({
                            ...filterObj,
                            ['subCategory']: newValue
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={'SUB CATEGORY'}
                            placeholder="Select"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <></>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
        <Divider />
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
                onClick={HandleClear}
                size="large"
                variant="text"
                color="secondary"
              >
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={HandleSubmit}
                variant="contained"
                color="primary"
                size="large"
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default TicketFilter;
