import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSetState, useBoolean } from 'react-hanger';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import {
  Box,
  Grid,
  Drawer,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
  InputLabel
} from '@material-ui/core';
import UserSelector from './UserSelector';
import NavigateNext from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '30vw',
    height: '100vh',
    position: 'relative'
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  label: {
    fontWeight: theme.typography.fontWeightMedium
  },
  seperator: {
    borderBottom: '1px solid #DFDFDF',
    boxShadow: '0 16px 20px -15px rgba(0,0,0, 0.12)'
  },
  starmark: {
    color: 'red'
  },
  arrow: {
    marginTop: '4px',
    color: 'blue'
  }
}));
const EventForm = ({
  open,
  onClose,
  onCreate,
  users,
  eventState,
  leadsState,
  user
}) => {
  const classes = useStyles();
  const userSelectorOpen = useBoolean(false);
  const {
    state: event,
    setState,
    resetState
  } = useSetState({
    name: '',
    date: null,
    start: null,
    end: null,
    type: '',
    attendies: [],
    description: ''
  });
  // let [selectedLead, setSelectedLead] = useSetState([]);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const createEvent = (name) => (value) => {
    handleChange({ target: { name, value } });
  };

  const handleInvitation = (id) => {
    setState({
      attendies: id
    });
  };

  const handleClose = () => {
    resetState();
    onClose();
    setError('');
  };

  const handleSubmit = () => {
    if (
      event.attendies.length > 0 &&
      event.type &&
      event.description &&
      event.name
    ) {
      onCreate({
        ...event,
        attendies: leadsState.entities[event.attendies],
        organizer: user
      });
      handleClose();
    } else {
      setError('please fill the mandatory Fields');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box p={6} className={classes.root}>
        <Box mb={8} pb={4}>
          <Grid container spacing={4}>
            <Grid item onClick={handleClose}>
              <ArrowBackIcon className={classes.arrow} />
            </Grid>
            <Grid item>
              <Typography variant="h4">Schedule Follow Up</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container direction="column" spacing={6}>
            <Grid item className={classes.starmark}>
              {error}
            </Grid>
            <Grid item>
              <InputLabel>
                EVENT NAME <span className={classes.starmark}>*</span>
              </InputLabel>
              <TextField
                fullWidth
                name="name"
                size="medium"
                // label="Event Name"
                // variant="outlined"
                // helperText="Max 20 characters long."
                onChange={handleChange}
                value={event.name}
              />
            </Grid>
            <Grid item>
              <InputLabel>
                FOLLOW UP TYPE <span className={classes.starmark}>*</span>
              </InputLabel>

              <Select
                fullWidth
                value={event.type}
                displayEmpty
                onChange={handleChange}
                name="type"
                id="demo-simple-select-required"
                label="FOLLOW UP TYPE"
              >
                <MenuItem value="Call">Call</MenuItem>
                <MenuItem value="Meeting">Meeting</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>
                EVENT DESCRIPTION <span className={classes.starmark}>*</span>
              </InputLabel>
              <TextField
                // required
                fullWidth
                name="description"
                value={event.description}
                size="medium"
                multiline
                rows={2}
                // label="EVENT DESCRIPTION"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputLabel>DATE</InputLabel>
              <KeyboardDatePicker
                name="date"
                id="event-date"
                value={event.date}
                fullWidth
                onChange={createEvent('date')}
                KeyboardButtonProps={{
                  'aria-label': 'event date'
                }}
                disablePast
                format="dd/MM/yyyy"
              />
            </Grid>

            <Grid item>
              <InputLabel>START TIME</InputLabel>
              <KeyboardTimePicker
                fullWidth
                id="time-picker"
                value={event.start}
                onChange={createEvent('start')}
                KeyboardButtonProps={{
                  'aria-label': 'event start time'
                }}
                disablePast
              />
            </Grid>
            <Grid item>
              <InputLabel>END TIME</InputLabel>
              <KeyboardTimePicker
                fullWidth
                id="time-picker"
                value={event.end}
                onChange={createEvent('end')}
                KeyboardButtonProps={{
                  'aria-label': 'event end time'
                }}
                disablePast
              />
            </Grid>

            <Grid item>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                onClick={userSelectorOpen.toggle}
                style={{ width: '420px' }}
                startIcon={<ArrowBackIcon />}
              >
                {event.attendies.length > 0 ? 'Edit Attendee' : 'Add Attendee'}
              </Button>
            </Grid>

            {/* selected */}
          </Grid>
        </Box>
        <Box p={6} className={classes.controls}>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                size="medium"
                variant="text"
                color="primary"
                onClick={() => {
                  resetState();
                  setError('');
                }}
                endIcon={<NavigateNext />}
              >
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
                endIcon={<NavigateNext />}
              >
                {eventState.loading.creating ? 'Creating ...' : 'Create Event'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <UserSelector
        leads={leadsState}
        onSelect={handleInvitation}
        open={userSelectorOpen.value}
        selectedLead={event.attendies}
        onClose={userSelectorOpen.toggle}
      />
    </Drawer>
  );
};

export default connect(
  (state) => ({
    users: state.users,
    leadsState: state.leads,
    eventState: state.events
  }),
  null
)(EventForm);

// <Drawer anchor="right" open={open} onClose={handleClose}>
// <Box p={6} className={classes.root}>
//   <Box mb={8} pb={4} >
//     <Grid container justify="space-between">
//       <Grid item>
//         <Typography variant="h4">Schedule Follow Up</Typography>
//       </Grid>
//       <Grid item>
//         <IconButton onClick={handleClose}>
//           <ArrowBackIcon />
//         </IconButton>
//       </Grid>
//     </Grid>
//   </Box>
//   <Box>
//     <Grid container direction="column" spacing={4}>
//       <Grid item>
//         <TextField
//           fullWidth
//           name="name"
//           size="medium"
//           label="Event Name"
//           variant="outlined"
//           helperText="Max 20 characters long."
//           onChange={handleChange}
//         />
//       </Grid>
//       <Grid item>
//         <TextField
//           fullWidth
//           name="description"
//           size="medium"
//           label="Event Description"
//           variant="outlined"
//           onChange={handleChange}
//         />
//       </Grid>
//       <Grid item>
//         <Grid container justify="space-between" alignItems="center">
//           <Grid item xs={6}>
//             <Typography className={classes.label} variant="h6">
//               Date
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <KeyboardDatePicker
//               name="date"
//               margin="dense"
//               id="event-date"
//               format="MM/dd/yyyy"
//               value={event.date}
//               inputVariant="outlined"
//               onChange={createEvent("date")}
//               KeyboardButtonProps={{
//                 "aria-label": "event date",
//               }}
//               disablePast
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container justify="space-between" alignItems="center">
//           <Grid item xs={6}>
//             <Typography className={classes.label} variant="h6">
//               Start
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <KeyboardTimePicker
//               margin="dense"
//               inputVariant="outlined"
//               id="time-picker"
//               value={event.start}
//               onChange={createEvent("start")}
//               KeyboardButtonProps={{
//                 "aria-label": "event start time",
//               }}
//               disablePast
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container justify="space-between" alignItems="center">
//           <Grid item xs={6}>
//             <Typography className={classes.label} variant="h6">
//               End
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <KeyboardTimePicker
//               margin="dense"
//               inputVariant="outlined"
//               id="time-picker"
//               value={event.end}
//               onChange={createEvent("end")}
//               KeyboardButtonProps={{
//                 "aria-label": "event end time",
//               }}
//               disablePast
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container justify="space-between" alignItems="center">
//           <Grid item xs={6}>
//             <Typography className={classes.label} variant="h6">
//               Type
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Select
//               fullWidth
//               value={event.type}
//               displayEmpty
//               variant="outlined"
//               onChange={handleChange}
//               name="type"
//               margin="dense"
//             >
//               <MenuItem value="">None</MenuItem>
//               <MenuItem value="call">Call</MenuItem>
//               <MenuItem value="meeting">Meeting</MenuItem>
//               <MenuItem value="negotiation">Negotiation</MenuItem>
//             </Select>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container alignItems="center" justify="space-between">
//           <Grid item>
//             <Typography className={classes.label} variant="h6">
//               Attendee
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button
//               size="medium"
//               variant="contained"
//               color="primary"
//               onClick={userSelectorOpen.toggle}
//             >
//               {event.attendies.length > 0 ? "Edit Leads" : "Add Leads"}
//             </Button>
//           </Grid>

//         </Grid>
//       </Grid>
//       {/* selected */}

//     </Grid>
//   </Box>
//   <Box p={6} className={classes.controls}>
//     <Grid container justify="flex-end">
//       <Grid item>
//         <Button
//           size="medium"
//           variant="text"
//           color="primary"
//           onClick={resetState}
//         >
//           Reset
//         </Button>
//       </Grid>
//       <Grid item>
//         <Button
//           size="medium"
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//         >
//           {eventState.loading.creating ? "Creating ..." : "Create Event"}
//         </Button>
//       </Grid>
//     </Grid>
//   </Box>
// </Box>
// <UserSelector
//   leads={leadsState}
//   onSelect={handleInvitation}
//   open={userSelectorOpen.value}
//   selectedLead={event.attendies}
//   onClose={userSelectorOpen.toggle}
// />
// </Drawer>
