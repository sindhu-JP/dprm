import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { useStateful } from 'react-hanger';
import SearchIcon from '@material-ui/icons/Search';
import {
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography,
  InputAdornment,
  TextField,
  Badge,
  ClickAwayListener,
  IconButton
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { Leads } from 'Http/api';

import { TABLE_CONFIG } from 'lib/constants';
import { SUB_TABLE } from 'lib/constants';

import { useBoolean } from 'react-hanger';

import ExistingTable from 'Components/Table/ExistingTable';

const Home = (props) => {
  const [leadInfo, setLeadInfo] = React.useState('');
  const [leadViewOpen, setLeadViewOpen] = React.useState(false);
  const classes = useStyles();
  const leads = useStateful({});
  const navMessage = useStateful('');
  const duration = useStateful('oneday');
  const rerender = useStateful('erwer');
  const enableSearch = useBoolean(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // const toggleForm = () => setFormOpen(!formOpen);
  // const [leadClassification, setLeadClassification] = React.useState("");
  const [fromDate, handleDateChangeFrom] = React.useState(null);
  const [toDate, handleDateChangeTo] = React.useState(null);
  // const [statusFilter, setStatusFilter] = React.useState("")
  const [invisible, setInvisible] = React.useState(true);
  // const selectedLobs = useStateful({});
  const updatatedLobs = useStateful({});

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const onHandleFilterChange = (value, name) => {
    if (value.target) {
      updatatedLobs.setValue({
        ...updatatedLobs.value,
        [name]: value.target.value
      });
    } else {
      updatatedLobs.setValue({
        ...updatatedLobs.value,
        [name]: value
      });
    }
  };
  const unselectLob = async (lob) => {
    let temp = { ...updatatedLobs.value };
    delete temp[lob];
    // reloadProducts(temp);
    updatatedLobs.setValue(temp);
    // selectedLobs.setValue(temp);
    handleFilter(temp);
  };

  const handleFilter = (data) => {
    updatatedLobs.setValue(data);
    // const { filterParams } = selectedLobs.value ? selectedLobs.value : '';
    // const { leadClassification1, statusFilter1 } = selectedLobs.value
    const newFilter = {
      url:
        data.leadClassification &&
        data.fromDate &&
        data.toDate &&
        data.statusFilter
          ? `&companyDetails.leadClassification=${
              data.leadClassification
            }&createdDate>${data.fromDate.toISOString()}&createdDate<${data.toDate.toISOString()}&status=${
              data.statusFilter
            }`
          : data.leadClassification && data.fromDate && data.toDate
          ? `&companyDetails.leadClassification=${
              data.leadClassification
            }&createdDate>${data.fromDate.toISOString()}&createdDate<${data.toDate.toISOString()}`
          : data.leadClassification && data.statusFilter
          ? `&companyDetails.leadClassification=${data.leadClassification}&status=${data.statusFilter}`
          : data.fromDate && data.toDate && data.statusFilter
          ? `&createdDate>${fromDate.toISOString()}&createdDate<${data.toDate.toISOString()}&status=${
              data.statusFilter
            }`
          : data.fromDate && data.toDate
          ? `&createdDate>${data.fromDate.toISOString()}&createdDate<${data.toDate.toISOString()}`
          : data.statusFilter
          ? `&status=${data.statusFilter}`
          : data.leadClassification
          ? `&companyDetails.leadClassification=${data.leadClassification}`
          : ''
    };
    props.LeadTableFilter(newFilter.url);
    handleClickAway();
    setInvisible(false);
  };
  const handleRefresh = () => {
    props.loadLeads({ user: props.user });
    setInvisible(true);
    // setLeadClassification("");
    // setStatusFilter("");
    handleDateChangeFrom(null);
    handleDateChangeTo(null);
    handleClickAway();
    updatatedLobs.setValue({});
    // selectedLobs.setValue({})
  };

  const setuser = useStateful({});
  // const onLeadClassiFication = async (data) => {
  //   const data= leads
  //   // const res = await Leads.updateLeadClassiFication(modalData.value.data.id, {
  //   //   // status: "LEAD_CLASSIFICATION",
  //   //   ...data,
  //   // });
  //   // props.alert({
  //   //   message: `Lead Classification changed successfully.`,
  //   //   type: "success",
  //   // });
  //   // loadLeads();
  //   // rerender.setValue(new Date().toISOString());
  //   // setLeadClassiFicationOpen(false);
  // };

  const handleTableRowClick = (event, row) => {
    props.openModal({
      id: 'leadView',
      context: {
        lead: row.data,
        user: props.user
      }
    });
  };

  const checkQuoteValidity = async (list) => {
    let requests = [];
    let expiredLeads = [];

    for (let lead of list) {
      if (lead.quote) {
        let cdate = dayjs(new Date()).format('DD MMM YYYY');
        let vdate = dayjs(lead.quote.validity).format('DD MMM YYYY');

        if (cdate >= vdate && lead.status !== 'QUOTE_EXPIRED') {
          expiredLeads.push(lead.id);
        }
      }
    }

    if (expiredLeads.length > 0) {
      requests = expiredLeads.map((id) =>
        Leads.updateStatus(id, { status: 'QUOTE_EXPIRED' })
      );

      await Promise.all(requests).then((res) => props.loadLeads());
    }
  };

  React.useEffect(() => {
    if (leads.value && leads.value.data) {
      // checkQuoteValidity(leads.value.data);
    }
  }, [leads.value]);

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleLeadAction = async (action, lead) => {
    const { openModal, downloadQuote } = props;

    if (action.modalId) {
      openModal({
        id: action.modalId,

        quoteUpdate: false,

        context: {
          lead: lead.data,
          quoteId: lead?.data.quoteRef?.id,
          user: props.user,
          duration: duration.value
        }
      });

      if (action.actionBlob) {
        props[action.actionBlob]({
          quoteId: lead?.data.quoteRef?.id
        });
      }
    } else if (
      action.actionType &&
      typeof props[action.actionType] === 'function'
    ) {
      props[action.actionType]({
        quoteUpdate: false,
        duration: duration.value,
        id: lead.data.id,
        duration: duration.value,
        quoteId: lead?.data?.quoteRef?.id,
        status: action.nextStatus,
        user: props.user
      });
    }
  };

  const hydrateRows = (data) => {
    const industryTypes = {};
    let rows = [];

    _.get(props.masterdata, 'industry', []).forEach((type) => {
      industryTypes[type.code] = type.name;
    });

    Object.values(data).map((row) => {
      rows.push({
        data: row.data,
        columns: {
          ...row.columns,
          industryType: industryTypes[row.columns.industryType]
        }
      });
    });

    return rows;
  };

  const getdate = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12) greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';
    return greet;
  };

  const Onsearchvalue = (e) => {
    if (e.target.value.length > 3) {
      props.OnLeadSearch(e.target.value);
    }

    //  }else if(e.target.value<=0) {
    //

    //  }
  };

  const closeSearch = () => {
    enableSearch.toggle();

    props.loadLeads({ user: props.user });
  };

  return (
    <Grid item>
      <Grid container direction="row" spacing={6}>
        <Grid item xs={8}>
          <Paper elevation={0}>
            <Box>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={4}
                      >
                        {enableSearch.value ? (
                          <Grid item>
                            <TextField
                              style={{ width: '400px' }}
                              id="standard-basic"
                              onChange={Onsearchvalue}
                              fullWidth
                              placeholder="Search by Lead Name "
                              InputProps={{
                                disableunderline: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon
                                      fontSize="large"
                                      className={classes.iconSearch}
                                    />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                        ) : (
                          <>
                            <Grid item>
                              <Box pl={2} py={4}>
                                <Typography variant="h2">
                                  Potential Opportunities
                                </Typography>
                              </Box>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                        spacing={4}
                      >
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            spacing={4}
                          >
                            <Grid item>
                              {enableSearch.value ? (
                                <CloseOutlinedIcon
                                  fontSize={'small'}
                                  onClick={closeSearch}
                                />
                              ) : (
                                <SearchIcon
                                  fontSize={'large'}
                                  onClick={enableSearch.toggle}
                                />
                              )}
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="space-between"
                                spacing={4}
                              >
                                {/* <Grid item>
                                        <img src={filter} onClick={handleMenuOpen} />
                                      </Grid> */}
                                <ClickAwayListener
                                  onClickAway={handleClickAway}
                                >
                                  <Grid
                                    container
                                    className={classes.root}
                                    alignItems="baseline"
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <IconButton onClick={handleClick}>
                                        <Badge
                                          variant="dot"
                                          invisible={invisible}
                                          color="error"
                                        >
                                          {/* <img src={filter} /> */}
                                        </Badge>
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                </ClickAwayListener>
                              </Grid>
                            </Grid>
                            <Grid item onClick={handleRefresh}>
                              {/* <RefreshIcon /> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* filter status */}

              <ExistingTable
                role={props.userdata?.role?.roleName}
                // rows={leads.value?.table?.rows || []}
                rows={hydrateRows(props.leadsState.exitingtablerow)}
                // rows={Object.values(props.leadsState.tableRows)}
                Subcolumns={SUB_TABLE.PotentialCustomers.columns}
                columns={TABLE_CONFIG.PotentialCustomers.columns}
                onRowAction={handleLeadAction}
                onRowClick={handleTableRowClick}
                subTable={hydrateRows(props.leadsState.subTablerow)}
              />
            </Box>
            e
          </Paper>
        </Grid>
        <Grid item xs={4}>
          {/* <Calendar /> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  welcomeMessage: {
    fontWeight: theme.typography.fontWeightLight
  },
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(16)})`,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  table: {
    backgroundColor: theme.palette.common.white,
    '& > thead': {
      backgroundColor: theme.palette.common.white
    }
  },
  icons: {
    cursor: 'pointer'
  },
  //for filter css
  root: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(18),
    right: 0
  },
  paper: {
    // padding: 0,
    width: 340,
    height: 350
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data
  }),
  {}
)(Home);
