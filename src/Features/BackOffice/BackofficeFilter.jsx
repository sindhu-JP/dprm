import React, { useState } from 'react';
import { useStateful } from 'react-hanger';
import {
  Grid,
  Box,

  Typography,
  makeStyles,
Button,

} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import constants from '../../Features/constants/constants';
import { Trans } from '@lingui/react';
// import { CloseOutlined } from '@material-ui/icons';
import moment from 'moment'
import DashboardApi from 'Http/360/Api/Dashboard';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import Modal from '../../Store/Modals';

const fromDateValue = <Trans id="FROM DATE"></Trans>;
const toDateValue = <Trans id="TO DATE"></Trans>;


// import DateFnsUtils from '@date-io/date-fns';
// import locals file from date-fns


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
    borderRadius: theme.spacing(4),
    padding: "30px 40px",
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
  const filterValue = <Trans id="Filters"></Trans>;
  const applyValue = <Trans id="Apply"></Trans>;
  const clearValue = <Trans id="Clear"></Trans>;
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

    if (e.target.value === 'Custom') {
      setFilterObj({
        ...filterObj,
        modifiedDateFrom:  `${ moment(new Date()).format(
          'YYYY-MM-DD'
        )}T00:00:00.000Z`
      })
      setFilterObj({
        ...filterObj,
        modifiedDateTo:  `${ moment(new Date()).format(
          'YYYY-MM-DD'
        )}T00:00:00.000Z`
      })
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
    if(e.target.value === 'Custom') {
      setFilterObj({
        ...filterObj,
        resolutionFrom:  `${ moment(new Date()).format(
          'YYYY-MM-DD'
        )}T00:00:00.000Z`
      })
      setFilterObj({
        ...filterObj,
        resolutionTo:  `${ moment(new Date()).format(
          'YYYY-MM-DD'
        )}T00:00:00.000Z`
      })
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
    if (e.target.value === 'Custom') {
      setFilterObj({
        ...filterObj,
        fromDate:  `${ moment(new Date()).format(
          'YYYY-MM-DD'
        )}T00:00:00.000Z`
      })
      setFilterObj({
        ...filterObj,
        toDate:  `${ moment(new Date()).format(
          'YYYY-MM-DD'
        )}T00:00:00.000Z`
      })
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


  console.log(filterObj?.fromDate, "xcxcxc")

  return (
    <Box className={classes.root}>
    <Grid
      container
      direction="column"
      justify="center"
      spacing={8}
      className={classes.inner}
    >

<form>
<Grid item>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3">FILTERS</Typography>
            </Grid>

            <Grid item className={classes.closeIcon}>
              <CloseIcon onClick={onCancel} />
            </Grid>
          </Grid>
        </Grid>
  {/* {sumaryCardDetails?.columnId !== 'PartnerOrderSummary' && ( */}
  <Grid item className={classes.mTop}>
    <Box py={5}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={6}>
          {/* <MuiPickersUtilsProvider locale="en" utils={DateFnsUtils}> */}
          <KeyboardDatePicker
                      // clearable
                      disableFuture
                      required
                      format="dd/MM/yyyy"
                      value={filterObj?.fromDate ?  filterObj?.fromDate  : null}
                      // required
                      name="createdDate"
                      label={fromDateValue}
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
          {/* </MuiPickersUtilsProvider> */}
        </Grid>
        <Grid item xs={6}>
        <KeyboardDatePicker
                      // clearable
                      required
                      
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
                          )}T23:59:59.000Z`
                        })
                      }
                      strictCompareDates
                      // minDate={createdDate}
                    />
        </Grid>
      </Grid>
    </Box>
  </Grid>
  {/* )} */}
  <Grid item className={classes.mTop}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  variant="text"
                  color="secondary"
                  size="large"
                  style={{ fontSize: 15 }}
                  onClick={HandleClear}
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
                  onClick={HandleSubmit}
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
export default TicketFilter;





