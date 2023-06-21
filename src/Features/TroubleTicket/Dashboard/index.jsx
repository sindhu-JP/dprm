import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
  TablePagination,
  Tooltip
} from '@material-ui/core';
import Chicklets from '../Components/Chicklets';
import { Trans } from '@lingui/react';
import { Select } from 'Components';
import ScrollTabs from 'Features/TroubleTicket/Components/ScrollTabs';
import { Badge } from 'antd';
import filter from 'Assets/Icons/Filter.svg';
import SearchIcon from '@material-ui/icons/Search';
import TicketStatusCard from '../Components/TicketStatusCard';
import dummydata from 'Features/TroubleTicket/Components/Dummydata';
import getAssociate from 'Features/TroubleTicket/Components/DataFactory/Ticket';
import TicketDetailsWrapper from './TicketDetailsWrapper';
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
    width: theme.spacing(10),
    height: theme.spacing(10)
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
export default function Dashboard() {
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

  return (
    <div>
      <Box py={5} px={4}>
        <Grid container direction="column" spacing={6}>
          <Grid item xs>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">CUSTOMER TICKETS</Typography>
              </Grid>
              <Grid item>
                <Select
                  value={'oneday'}
                  // onChange={(e) => duration.setValue(e.target.value)}
                  options={options}
                />
              </Grid>
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
                    { titile: 'Total Interaction', value: '432', day: '607' },
                    {
                      titile: 'Avg Handling Time',
                      value: '5m 2s',
                      day: '5m 2s'
                    },
                    { titile: 'Open Ticket', value: '10', day: '10' },
                    { titile: 'Closed Tickets', value: '05', day: '05' },
                    { titile: 'Resolved Tickets', value: '10', day: '10' }
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid container>
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  // spacing={2}
                  alignItems="center"
                  className={classes.tabScroller}
                >
                  <Grid item xs={11}>
                    <ScrollTabs />
                  </Grid>

                  <Grid item xs={1}>
                    <Grid
                      container
                      durection="row"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item xs={6} className={classes.filterIcon}>
                        <Badge
                          badgeContent={0}
                          color="primary"
                          className={classes.filterBadge}
                          //   onClick={this.toggleFilterDialog}
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

          <Grid item xs={4}>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                space={6}
              >
                <Grid>
                  <TextField
                    data-cy="searchForCustomers"
                    id="inputBaseBar"
                    autoComplete="off"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                  />
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
                  {!_.isEmpty(dummydata.dummy) ? (
                    <>
                      <Grid item xs={12}>
                        {historyCheck ? (
                          dummydata.dummy.length > 0 ? (
                            dummydata.dummy.map((ticket, index) => {
                              const category = ticket.category
                                ? ticket.category.split(',')
                                : [];
                              const { associateId, customerType } =
                                getAssociate.getAssociateIdWithCustomerType(
                                  ticket
                                );

                              return (
                                <TicketStatusCard
                                  key={index}
                                  requestLabel={<Trans id="Ticket ID"></Trans>}
                                  showWarningIcon={
                                    //   ticket.status === constants.priorities.HIGH
                                    'HIGH'
                                  }
                                  // requestId={ticket.id}
                                  requestId={ticket.id}
                                  associateLabel={
                                    <Trans id="Service ID"></Trans>
                                  }
                                  serviceId={_.get(
                                    ticket,
                                    'publicIdentifier[0]',
                                    ''
                                  )}
                                  // heading={_capitalize(
                                  //   category
                                  //     ? this.getNameOfCategory(category[0])
                                  //     : ''
                                  // )}
                                  showTime={true}
                                  // time={moment(ticket.createdDate).format(
                                  //   constants.dateFormat.fullDateMonthWithTime
                                  // )}
                                  selectedRow={ticket}
                                  type={customerType}
                                  associateId={associateId}
                                  // selected={
                                  //   ticket.id === this.state.selectedTicket
                                  // }
                                  // onCardClick={() =>
                                  //   this.handleTicketSelection(ticket)
                                  // }
                                  status={ticket.status}
                                  tooltip
                                />
                              );
                            })
                          ) : (
                            <Box px={0} pb={6} pt={1}>
                              {this.showEmptyMessage()}
                            </Box>
                          )
                        ) : tickets[activeTab]?.length > 0 ? (
                          tickets[activeTab].map((ticket, index) => {
                            const category = ticket.category
                              ? ticket.category.split(',')
                              : [];
                            const { associateId, customerType } =
                              getAssociate.getAssociateIdWithCustomerType(
                                ticket
                              );

                            return (
                              <TicketStatusCard
                                key={index}
                                requestLabel={<Trans id="Ticket ID"></Trans>}
                                showWarningIcon={
                                  ticket.status === constants.priorities.HIGH
                                }
                                // requestId={ticket.id}
                                requestId={ticket.id}
                                associateLabel={<Trans id="Service ID"></Trans>}
                                serviceId={_get(
                                  ticket,
                                  'publicIdentifier[0]',
                                  ''
                                )}
                                heading={_capitalize(
                                  category
                                    ? this.getNameOfCategory(category[0])
                                    : ''
                                )}
                                showTime={showTime}
                                time={moment(ticket.createdDate).format(
                                  constants.dateFormat.fullDateMonthWithTime
                                )}
                                selectedRow={ticket}
                                type={customerType}
                                associateId={associateId}
                                selected={
                                  ticket.id === this.state.selectedTicket
                                }
                                onCardClick={() =>
                                  this.handleTicketSelection(ticket)
                                }
                                status={ticket.status}
                                tooltip
                              />
                            );
                          })
                        ) : (
                          <Box px={0} pb={6} pt={1}>
                            {/* {this.showEmptyMessage()} */}
                          </Box>
                        )}
                        <div className="ticketPagination">
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 30, 50]}
                            component="div"
                            count={
                              !historyCheck
                                ? tickets[activeTab]?.count
                                : ticketHistoryCount
                            }
                            rowsPerPage={5}
                            //   page={offset}
                            //   onChangePage={(e, offset) =>
                            //     this.handleOffset(offset)
                            //   }
                            //   onChangeRowsPerPage={(e, limit) =>
                            //     this.handlePageCount(e.target.value)
                            //   }
                            labelDisplayedRows={({ from, to, count }) => {
                              return `${from > 9 ? from : `0${from || 0}`}-${
                                to > 9 ? to : `0${to || 0}`
                              } of ${count !== -1 ? count || 0 : 0}`;
                            }}
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
                      {/* {this.showEmptyMessage()} */}
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <TicketDetailsWrapper />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
