import React,{useState} from 'react';
import {
  Box,
  Grid,
  Paper,
  // IconButton,
  Typography,
  makeStyles,
  // TextField,
  InputBase,
  InputAdornment,
  TablePagination,
  Tooltip,
  Badge,
  // Button
} from '@material-ui/core';
import Chicklets from 'Features/TroubleTicket/Components/Chicklets';
import { Trans } from '@lingui/react';
// import { Badge } from 'antd';
import classNames from 'classnames';
import filter from 'Assets/Icons/Filter.svg';
import SearchIcon from '@material-ui/icons/Search';
import TicketStatusCard from 'Features/TroubleTicket/Components/TicketStatusCard';
import getAssociate from 'Features/TroubleTicket/Components/DataFactory/Ticket';
import TicketDetailsWrapper from 'Features/TroubleTicket/Dashboard/TicketDetailsWrapper';
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import TicketApi from 'Http/api/TroubleTicketApis/TicketSystem';
import { useStateful } from 'react-hanger';
import Dashboard from 'Http/360/Api/Dashboard';
import Modals from 'Store/Modals';
import { useDispatch } from 'react-redux';
import Backdroploader from 'Components/Backdroploader';
import FilterChips from './FilterChips';
import { TecnotreeTroubleTicket } from 'Http/axios'
import constants from 'Features/constants/constants';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../../stories/button.css';
import img from 'Assets/Icons/Notes.svg';


const useTabStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0"
  }
});
const useStyles = makeStyles((theme) => ({
  underline: {
    '&:before': {
      borderBottom: 0,
      content: 'unset',
      position: 'unset'
    },
    '&:after': {
      borderBottom: 0,
      content: 'unset',
      position: 'unset'
    }
  },
  tabScroller: {
    position: 'sticky'
  },
  select: {
    padding: 0,
    color: theme.palette.success.main,
    borderRadius: '2px'
  },
  filterBadge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.type === 'dark' ? `#000000 !important` : ``
  },
  iconColor: {
    marginTop: theme.spacing(2)
  },
  filterIcon: { cursor: 'pointer' },
  emptyBox: {
    minHeight: '20rem'
  },
  toolbar: theme.mixins.toolbar,
  stickyLeftPane: {
    position: 'fixed',
    top: '7rem',
    maxWidth: '30.5%',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 'calc(100vh - 11rem)',
    minHeight: 'calc(100vh - 11rem)',
    paddingBottom: '4rem'
  },
  pagination: (props) => ({
    backgroundColor: theme.palette.background.main
  }),
  inputField: {
    border: `1px solid ${theme.palette.common.lightSilver}`,
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4),
    borderRadius: theme.spacing(4),
    width: '99%'
  },
  sort: {
    width: theme.spacing(10),
    fontSize: '1.7rem'
  },
  idText: {
    float: 'left',
    width: 11
  },
  idMargin: {
    marginRight: '40px',
    marginBottom: '-25px'
  },
  idAndIcon: {
    marginBottom: '-18px'
  },
  importExpIcon: {
    marginBottom: '20px'
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4),
    borderRadius: theme.spacing(4),
    width: '99%'
  },
  searchIcon: {
    stroke: theme.palette.icon.stroke
  },
  controls: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },
  menuItem: {
    paddingLeft: 6,
    paddingRight: 6,
    '&:first-child': {
      paddingTop: 0
    },
    '&:last-child': {
      paddingBottom: 0
    }
  },
  grayBackground: {
    backgroundColor: '#F3F4F9'
  },
  formControl: {
    width: '100%'
  },
  historyLabel: {
    color: '#1C00C8',
    opacity: 1
  },
  showCheckbox: {
    opacity: 1
  },
  hideCheckbox: {
    opacity: 0.4
  },
  centerText: {
    margin: 'auto'
  }
}));
const Scrollbar23 = [
    "All",
    "In-Progress",
    "Closed",
    "Cancel",
    
  ];

const showEmptyMessage = () => {
  
 
  //  const classes=useStyles()
  


  

  
  return (
    <Paper elevation={0} style={{ minHeight: '20rem' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={4}
        // className={classes.emptyBox}

        style={{ minHeight: '20rem' }}
      >
        <Grid item>
          <Typography variant="subtitle1">
            <Trans id="List is empty"></Trans>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default function PartnerTicket(props) {
  const {
    _LoadAllPartnerTickets,
    partnerdetails,
    TotallInteractionCount,
    TotalFilterCount,
    PartnerTicketlist,
    LoadAll_StatusTickets,
    TicketLoader,
    Load_filter_tickets
    // partnerdetails
  } = props;

  const classes = useStyles();
  const empty = {};
  const options = [
    {
      label: 'Today',
      value: 'oneday'
    },
    {
      label: 'Last week',
      value: 'oneweek'
    },
    {
      label: 'Last 1 Month',
      value: 'onemonth'
    },
    {
      label: 'Last 3 Month',
      value: 'threemonth'
    }
  ];
  
  const historyCheck = true;
  const ticketHistoryCount = 10;
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);

  const [limit, setlimit] = CustomHooks.CustomUseState(5);
  const [total_tkt_cards, setTotal_tkt_cards] = React.useState([]);
  const [text, setText] = React.useState('');
  const totallCount = useStateful([]);
  const categoryList = useStateful([]);
  const statusTabslist = useStateful([]);
  const ActiveTabs = useStateful('All');
  const ActiveIndex = useStateful(0);
  const [state,setState] = useState(Scrollbar23[0]);


  const filterpayload =  JSON.parse(localStorage.getItem("filter"))
  console.log(filterpayload, "filterpayload", props.filterCount?.count, limit)

  const selectedTicketdetails = useStateful({});
  const handleOffset = async (event, newPage) => {
    setPage(newPage);
    if(props.filterCount?.count > 0) {
      
      Load_filter_tickets({ id: filterpayload.id, dynamicURL: filterpayload.dynamicURL, limit, offset:limit * newPage });
    }
    else {
      
      let { payload } = await _LoadAllPartnerTickets({
        id: _.get(partnerdetails, 'mainlist.partnerId', '...'),
        limit: limit,
        offset: limit * newPage
      });
    }
  

    
  };

  const handlePageCount = async (limit) => {
    setPage(0);
    setlimit(limit);
    let { payload } = await _LoadAllPartnerTickets({
      id: _.get(partnerdetails, 'mainlist.partnerId', '...'),
      limit: limit,
      offset: limit * page
    });
  };

  const getAllCounts = async () => {
    const res = await Dashboard._getCategoryDetails();
    categoryList.setValue(res);

    let { payload } = await _LoadAllPartnerTickets({
      id: _.get(partnerdetails, 'mainlist.partnerId', '...')
    });
    let data = await Promise.all([
      TicketApi._loadAllPartnerTicketOpen(
        _.get(partnerdetails, 'mainlist.partnerId', '...')
      ),
      TicketApi._loadAllPartnerTicketclose(
        _.get(partnerdetails, 'mainlist.partnerId', '...')
      ),
      TicketApi._loadAllPartnerTicketResolve(
        _.get(partnerdetails, 'mainlist.partnerId', '...')
      )
    ]).then((results) => {
      return results;
    });

    const statusTabs = await TicketApi._getStatustabs(
      _.get(partnerdetails, 'mainlist.partnerId', '...')
    );
    statusTabslist.setValue(['All'].concat(statusTabs[0]?.status));
    totallCount.setValue(data);
  };

  React.useEffect(() => {
    if (!_.isEmpty(partnerdetails.mainlist)) {
      getAllCounts();
      // )
    }
  }, [partnerdetails?.mainlist]);

  const updateTicketObj = (data) => {
    let res = data.map((item) => {
      let name = categoryList?.value?.filter(
        (el) => el?.id === item?.category?.split(',')[1].replace(/\s/g, '')
      );    
      return {
        ...item,
        category: _.filter(categoryList.value, [
          'id',
          item?.category?.split(',')[0]
        ])[0]?.name,

        categoryitem: _.filter(categoryList.value, [
          'id',
          item?.category?.split(',')[0]
        ])[0],
        categoryname: name[0]?.name
      };
    });
    return res;
  };

  const activeTab = (item) => {
    ActiveTabs.setValue(item);

    LoadAll_StatusTickets({
      id: _.get(partnerdetails, 'mainlist.partnerId', '...'),
      status: item
    });
  };

  // const handleSearch = async () => {
  //   try {
  //     const { data } = await TecnotreeTroubleTicket.get(
  //       `troubleTicket/${text}?limit=5&offset=${offset}`
  //     );
 
  //     selectedTicketdetails.setValue(data[0]);
  //     setText('');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSearch = async (val) => {
    if (!text) {
      setTotal_tkt_cards(updateTicketObj(PartnerTicketlist));
      selectedTicketdetails.setValue(updateTicketObj(PartnerTicketlist)[0]);
      return;
    }
    // handleSearch();
    const { data } = await TecnotreeTroubleTicket.get(`troubleTicket/${text}`);
    selectedTicketdetails.setValue(updateTicketObj(data));
    const toUpperCase = text.toUpperCase();

    if (text <= 0) {
      setTotal_tkt_cards(updateTicketObj(data));
    } else {
      let res = updateTicketObj(data).filter((tkt) =>
        tkt.id.includes(toUpperCase)
      );
      setTotal_tkt_cards(res);
      selectedTicketdetails.setValue(res[0]);
    }
  };

  const handleTicketSelection = (ticket, index) => {
    ActiveIndex.setValue(index);
    selectedTicketdetails.setValue(ticket);
  };

  React.useEffect(() => {
    if (PartnerTicketlist.length > 0) {
      setTotal_tkt_cards(updateTicketObj(PartnerTicketlist));
      selectedTicketdetails.setValue(updateTicketObj(PartnerTicketlist)[0]);
    }
    }, [PartnerTicketlist]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
      <Backdroploader open={TicketLoader} />
      <Box py={5} px={4}>
        <Grid container direction="column" spacing={6}>
          <Grid item xs>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item style={{display:'flex',width: '191px',display: 'flex',justifyContent: 'space-between'}}>
              <Grid item>
                <img src={img} style={{width:'22px',height:'30px'}} />
              </Grid>
                <Typography style={{fontSize:'20px'}} variant="h6">
                  <Trans id="Partner Tickets"></Trans>
                </Typography>
              </Grid>
              {/* <Grid item>
                <Select value={'oneday'} options={options} />
              </Grid> */}
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid container direction="column">
              <Grid item>
                <Chicklets
                  showYesterdayCount={1}
                  cards={{
                    completedOrders: 744,
                    pendingOrders: 1730,
                    rejectedOrders: 2389,
                    totalOrders: 9204,
                    troubleTickets: 161
                  }}
                  options={[
                    {
                      titile: <Trans id="Total Interaction"></Trans>,
                      value: TotallInteractionCount || 0,
                      day: '607'
                    },

                    {
                      titile: <Trans id="Open Ticket"></Trans>,
                      value: _.get(totallCount.value, '[0]', 0),
                      day: '10'
                    },
                    {
                      titile: <Trans id="Closed Tickets"></Trans>,
                      value: _.get(totallCount.value, '[1]', 0),
                      day: '05'
                    },
                    {
                      titile: <Trans id="Resolved Tickets"></Trans>,
                      value: _.get(totallCount.value, '[2]', 0),
                      day: '10'
                    }
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <br></br>

          <Grid item xs>
            <Grid container spacing={2} alignItems='center'>
              <Grid className='scrollTab' item xs={3} style={{marginLeft:"-1rem"}} >
                <Tabs
                  classes={{ root: classes.root, scroller: classes.scroller }}
                  value={state}
                  onChange={(event, newValue) => {
                  setState(newValue);
                  }}
                  indicatorColor="none"
                  variant={"scrollable"}
                  scrollButtons={"on"}
                  style={{  justifyContent: "center",
                  display:'flex',
                  alignItems:'center'}}
                  className='newTicketStatus'
                >
                  {Scrollbar23.map((ele, index) => (
                      <Tab style={{height:"32px",minWidth:"unset",minHeight:"unset",padding:"1rem"}} key={index} label={ele} value={ele} />
                  ))}
                
                
                </Tabs>
                
                
              {/* <div className='scrollable-tabs-container'>
              <div className="left-arrow"><img src={ArrowIcon} style={{rotate:'90deg'}}/></div>
              <ul>
                <li><a>All</a></li>
                <li><a>In-Progress</a></li>
                <li><a>Closed</a></li>
                <li><a>Cancel</a></li>
              </ul>

              <div className="right-arrow"><img src={ArrowIcon} style={{rotate:'270deg'}}/></div>
              </div> */}
              </Grid>
              <Grid item xs={1}>
                <Grid
                  container
                  direction="row"
                  // spacing={2}
                  alignItems="center"
                  className={classes.tabScroller}
                  spacing={2}
                >

                  <Grid item xs={1} borderLeft='2px solid black' height='3rem'>
                    {/* <ScrollTabs
                      ActiveTabs={ActiveTabs.value}
                      options={statusTabslist.value}
                      activeTab={activeTab}
                    /> */}
                    <FilterChips
                      setFilterCount={props.setFilterCount}
                      filterData={props.filterCount}
                      partnerdetails={props.partnerdetails}
                      Load_filter_tickets={props.Load_filter_tickets}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <Grid
                      container
                      durection="row"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item xs={6} className={classes.filterIcon}>
                        <Badge
                          badgeContent={props.filterCount.count}
                          color="primary"
                          className={classes.filterBadge}
                          onClick={() => {
                            dispatch(
                              Modals.open({
                                id: 'TicketFilter'
                              })
                            );
                          }}
                        >
                          <Tooltip title="Filter" placeholder="bottom">
                            <img src={filter} />
                          </Tooltip>
                        </Badge>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid container direction="row" spacing={6}>
              <Grid item xs={4}>
                <Grid
                  container
                  direction="column"
                  wrap="nowrap"
                  spacing={4}
                  // className={enableSticky ? classes.stickyLeftPane : ''}
                >
                  <Grid>
                    <Box py={2}>
                      <InputBase
                        data-cy="searchForCustomers"
                        className={classNames(classes.inputField)}
                        id="inputBaseBar"
                        autoComplete="off"
                        placeholder="Search by Ticket Id"
                        onChange={(e) => setText(e.target.value)}
                        endAdornment={
                          <InputAdornment>
                            <Tooltip title="Search" placeholder="bottom">
                              <SearchIcon
                                className={classes.searchIcon}
                                onClick={onSearch}
                              />
                            </Tooltip>
                          </InputAdornment>
                        }
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <Grid container direction="row" spacing={6}>
                <Grid item xs={4}>
                  <Grid
                    container
                    direction="column"
                    wrap="nowrap"
                    spacing={4}
                    // className={enableSticky ? classes.stickyLeftPane : ''}
                  >
                    {!_.isEmpty(PartnerTicketlist) ? (
                      <>
                        <Grid item xs={12}>
                          {historyCheck ? (
                            PartnerTicketlist.length > 0 ? (
                              total_tkt_cards.map((ticket, index) => {
                                // const category = ticket.category
                                //   ? ticket.category.split(',')
                                //   : [];
                                const { associateId, customerType } =
                                  getAssociate.getAssociateIdWithCustomerType(
                                    ticket
                                  );
                                return (
                                  <TicketStatusCard
                                    key={index}
                                    index={index}
                                    requestLabel={
                                      <Trans id="Ticket ID"></Trans>
                                    }
                                    partnerdetails={partnerdetails}
                                    showWarningIcon={
                                      //   ticket.status === constants.priorities.HIGH
                                      'HIGH'
                                    }
                                    requestId={ticket.id}
                                    ticketItem={ticket}
                                    associateLabel={
                                      <Trans id="Service ID"></Trans>
                                    }
                                    serviceId={_.get(
                                      ticket,
                                      'publicIdentifier[0]',
                                      ''
                                    )}
                                    category={ticket?.category}
                                    showTime={true}
                                    time={moment(ticket.createdDate).format(
                                      constants.dateFormat.fullDateMonthWithTime
                                    )}
                                    selectedRow={ticket}
                                    type={customerType}
                                    associateId={associateId}
                                    // selected={
                                    //   ticket.id === this.state.selectedTicket
                                    // }
                                    onCardClick={handleTicketSelection}
                                    status={ticket.status}
                                    tooltip
                                    ActiveIndex={ActiveIndex.value}
                                  />
                                );
                              })
                            ) : (
                              <Box px={0} pb={6} pt={1}>
                                {showEmptyMessage()}
                              </Box>
                            )
                          ) : (
                            // tickets[activeTab]?.length > 0 ? (
                            //   tickets[activeTab].map((ticket, index) => {
                            //     const category = ticket.category
                            //       ? ticket.category.split(',')
                            //       : [];
                            //     const { associateId, customerType } =
                            //       getAssociate.getAssociateIdWithCustomerType(
                            //         ticket
                            //       );

                            //     return (
                            //       <TicketStatusCard
                            //         key={index}
                            //         requestLabel={<Trans>Ticket ID</Trans>}
                            //         showWarningIcon={
                            //           ticket.status === constants.priorities.HIGH
                            //         }
                            //         // requestId={ticket.id}
                            //         requestId={ticket.id}
                            //         associateLabel={<Trans>Service ID</Trans>}
                            //         serviceId={_get(
                            //           ticket,
                            //           'publicIdentifier[0]',
                            //           ''
                            //         )}
                            //         heading={_capitalize(
                            //           category
                            //             ? this.getNameOfCategory(category[0])
                            //             : ''
                            //         )}
                            //         showTime={showTime}
                            //         time={moment(ticket.createdDate).format(
                            //           constants.dateFormat.fullDateMonthWithTime
                            //         )}
                            //         selectedRow={ticket}
                            //         type={customerType}
                            //         associateId={associateId}
                            //         selected={
                            //           ticket.id === this.state.selectedTicket
                            //         }
                            //         onCardClick={() =>
                            //           this.handleTicketSelection(ticket)
                            //         }
                            //         status={ticket.status}
                            //         tooltip
                            //       />
                            //     );
                            //   })
                            // )

                            <Box px={0} pb={6} pt={1}>
                              {showEmptyMessage()}
                            </Box>
                          )}
                          <div className="ticketPagination">
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 20, 30, 50]}
                              component="div"
                              count={props.filterCount?.count > 0 ? TotalFilterCount: TotallInteractionCount }
                              rowsPerPage={limit}
                              page={page}
                              onPageChange={handleOffset}
                              onChangeRowsPerPage={(e, limit) =>
                                handlePageCount(e.target.value)
                              }
                             
                              backIconButtonProps={{
                                'aria-label': <Trans id="Previous Page"></Trans>
                              }}
                              nextIconButtonProps={{
                                'aria-label': <Trans id="Next Page"></Trans>
                              }}
                            />
                          </div>
                        </Grid>
                      </>
                    ) : (
                      <Box px={0} pb={6} pt={1}>
                        {showEmptyMessage()}
                      </Box>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  {PartnerTicketlist.length > 0 ? (
                    <TicketDetailsWrapper
                      partnerdetails={partnerdetails}
                      selectedTicketdetails={selectedTicketdetails.value}
                    />
                  ) : (
                    showEmptyMessage()
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
