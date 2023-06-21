import React from 'react';
import { connect } from 'react-redux';
import { useStateful } from 'react-hanger';

import EventForm from './EventForm';
import EventDetail from './EventDetail';

import ModalActions from 'Store/Modals';
import EventController from 'Controllers/Events';

import {
  Box,
  Grid,
  Paper,
  Drawer,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useBoolean } from 'react-hanger';
import dayjs from 'dayjs';
import ScheduleIcon from '@material-ui/icons/Schedule';

import Statuses from 'lib/constants/statuses';
import _ from 'lodash';
// import { ReactComponent as Attendees } from 'Assets/Icons/attebdies.svg';

const Event = ({ event }) => {
  const classes = useStyles();
  const getStatusColor = (lead) => {
    return Statuses.eventColor[lead]?.color || 'blue';
  };

  return (
    <Box>
      <Grid
        container
        direction="column"
        spacing={4}
        className={classes.listItem}
      >
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="body1" className={classes.eventTitle}>
                {event.subject}
              </Typography>
            </Grid>
            {/* <Grid item>{event.type}</Grid> */}
            <Grid item>
              <Typography variant="body1">
                {dayjs(event.createdDate).format('DD MMM YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2">{event.descriptions}</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={3}>
              <div
                style={{
                  padding: '5px',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
                className={classes[getStatusColor(event?.eventType)]}
              >
                {_.get(event, 'eventType', '')}
              </div>
            </Grid>
            <Grid item xs={3}>
              {/* <Attendees /> */}
              {/* <Button
                startIcon={<Atendee fontSize="small" />}
              >
              </Button> */}
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ marginTop: '-7px' }}
                className={classes.button}
                startIcon={<ScheduleIcon fontSize="small" />}
              >
                {dayjs(event.createdDate).format('h:mm A')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const Calendar = ({
  createEvent,
  events,
  modal,
  openModal,
  closeModal,
  eventsState,
  authState
}) => {
  const classes = useStyles();
  const eventDetailOpen = useBoolean(true);
  const selectedFollowup = useStateful('');

  return (
    <React.Fragment>
      <Paper elevation={0}>
        <Box mb={6} pb={6}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">My Calendar</Typography>
            </Grid>
            <Grid item>
              <Button
                size="large"
                variant="text"
                color="primary"
                onClick={() => openModal({ id: 'eventForm' })}
              >
                Add Followup
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.list}>
          <Grid container direction="column" spacing={8}>
            {eventsState.ids.map((eventId, index) => (
              <Grid
                item
                key={index}
                onClick={() => {
                  selectedFollowup.setValue(eventId);
                  eventDetailOpen.setTrue();
                }}
              >
                <Event event={eventsState.entities[eventId]} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
      <EventForm
        onCreate={createEvent}
        open={modal.eventForm}
        loading={eventsState.loading.creating}
        onClose={() => closeModal('eventForm')}
        user={authState}
      />
      <Drawer
        anchor="right"
        open={eventDetailOpen.value && selectedFollowup.value}
      >
        <EventDetail
          onClose={eventDetailOpen.setFalse}
          followup={eventsState.entities[selectedFollowup.value]}
        />
      </Drawer>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  eventTitle: {
    fontWeight: theme.typography.fontWeightMedium
  },
  seperator: {
    borderBottom: '1px solid #DFDFDF',
    boxShadow: '0 16px 20px -15px rgba(0,0,0, 0.12)'
  },
  list: {
    maxHeight: '60rem',
    minHeight: '60rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    overflow: 'auto'
  },
  listItem: {
    cursor: 'pointer'
    // border: "1px solid #DFDFDF",
    // borderRadius: theme.spacing(2),
    // backgroundColor: theme.palette.background.main,
  },
  blue: {
    backgroundColor: '#566DE6',
    color: theme.palette.common.white
  },
  skyBlue: {
    backgroundColor: '#49B8E0',
    color: theme.palette.common.white
  },
  pink: {
    backgroundColor: '#ED59D3',
    color: theme.palette.common.white
  }
}));

export default connect(
  (state) => ({
    modal: state.modals,
    eventsState: state.events,
    authState: state.auth.user.sub
  }),
  {
    openModal: ModalActions.open,
    closeModal: ModalActions.close,
    createEvent: EventController.create
  }
)(Calendar);
