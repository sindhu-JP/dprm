import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/react';
import {
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { format, isAfter } from 'date-fns';
import constants from 'Features/constants/constants';
import { getDateTime } from '../functionalHelper';

const useStyles = makeStyles((theme) => ({
  helperText: {
    position: 'absolute',
    fontSize: '10px !important',
    textTransform: 'capitalize !important',
    whiteSpace: 'nowrap !important',
    color: 'red !important',
    top: '40px !important'
  },
  actionBtn: {
    marginTop: '20px !important'
  },
  timeBox: {
    position: 'relative',

    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: '10px !important',

        '& .MuiIconButton-root': {
          padding: '0 !important'
        },

        '& .MuiOutlinedInput-input': {
          padding: '13px 8px !important'
        }
      }
    }
  },
  timeIcon: {
    padding: 0,
    position: 'absolute',
    top: '20px',
    right: '10px'
  },

  timeInput: {
    fontSize: '12px !important'
  },
  helperTextTime: {
    fontSize: '10px !important',
    textTransform: 'capitalize !important',
    whiteSpace: 'nowrap !important',
    color: 'red !important',

    position: 'absolute',
    top: '42.5px',
    right: '33px'
  },
  textField: {
    '& p': {
      fontSize: '10px !important',
      textTransform: 'capitalize !important'
    }
  },
  saveButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    '& .MuiOutlinedInput-root': {
      paddingTop: '10px !important'
    }
  },
  selectEmpty: {
    // marginTop: theme.spacing(2)
  },
  timepicker: {
    margin: 0,
    paddingTop: 0,
    '& input': {
      color: theme.palette.text.primary,
      fontSize: theme.spacing(4),
      fontWeight: theme.typography.fontWeightRegular,
      padding: `${theme.spacing(4)} 0 ${theme.spacing(4)} ${theme.spacing(4)}`
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: theme.spacing(0.5)
    }
  },
  control: {
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  pillWrapper: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(4.5),
    width: theme.spacing(14),
    padding: `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(
      4
    )} ${theme.spacing(4)}`
  }
}));

const customKeyIcon = {
  'aria-label': 'change time',
  children: <AccessTimeIcon />
};

const CreateNote = ({ onSave, onCancel, priorities }) => {
  // return null
  let idNumber = Math.random();
  const classes = useStyles();
  const [noteText, setNoteText] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState('');
  const [priorityDropdownOpened, setPriorityDropdownOpened] = useState(false);
  const [priorityError, setPriorityError] = useState(false);

  const getPriorityDropdown = (
    onChange,
    classes,
    isPriorityOpened,
    setPriorityDropdownOpened,
    priorityError
  ) => {
    const priorities_local = [
      { name: 'High', code: 'high' },
      { name: 'Low', code: 'low' },
      { name: 'Medium', code: 'medium' },
      { name: 'Critical', code: 'critical' }
    ];
    return (
      <>
        <FormControl
          variant="filled"
          className={classes.formControl}
          error={priorityError}
          required
        >
          <InputLabel htmlFor="outlined-age-native-simple">Priority</InputLabel>
          <Select
            value={priority}
            onChange={onChange}
            className={classes.selectEmpty}
            inputProps={{
              name: 'priority',
              id: 'filled-priority-native-simple'
            }}
            onOpen={(evt) => setPriorityDropdownOpened(true)}
            onClose={(evt) => setPriorityDropdownOpened(false)}
            variant="outlined"
            classes={{ outlined: classes.pillWrapper }}
          >
            {(priorities_local || []).map((priorityItem) => (
              <MenuItem key={priorityItem.code} value={priorityItem.name}>
                {priorityItem.name}
              </MenuItem>
            ))}
          </Select>
          {priorityError && (
            <FormHelperText className={classes.helperText}>
              Please Enter!
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  };
  const handleNoteTextChange = (event) => {
    setNoteText(event.target.value);
  };

  const [timeError, setTimeError] = useState(false);
  const handleDateChange = (event) => {
    setDate(event);
  };

  const handleTimeChange = (e) => {
    setTimeError(false);
    const datePicked = format(date, 'MM/dd/yyyy');
    const dateTime = format(e, 'MM/dd/yyyy');

    const currentTime = new Date().getTime();

    if (datePicked === dateTime && isAfter(e, currentTime)) {
      setTime(e);
    } else if (datePicked !== dateTime) {
      setTime(e);
    } else {
      setTimeError(true);
      setTime(new Date());
    }
  };

  useEffect(() => {
    setTime(new Date());
    setTimeError(false);
  }, [date]);

  const handlePriorityChange = (event) => {
    setPriorityError(false);
    setPriority(event.target.value);
  };
  const saveNote = () => {
    if (!priority) {
      setPriorityError(true);
      return;
    }

    let date_new = `${getDateTime(date, 'DD MMM YYYY')} ${getDateTime(
      time,
      'HH:mm:ss'
    )} `;
    if (noteText && priority) {
      const noteObj = {
        priority,
        endDate: `${new Date(
          getDateTime(date_new, constants.dateFormat.fullDateMonthWithTime)
        ).toISOString()}`,
        text: noteText,
        status: 'open',
        id: idNumber
      };
      onSave(noteObj);
    }
  };
  const cancelNote = () => {
    onCancel();
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      spacing={2}
      direction="column"
    >
      <Grid item xs={12}>
        <TextField
          id="standard-multiline-static"
          autoFocus
          value={noteText}
          multiline
          rows={1}
          rowsMax={1}
          fullWidth
          placeholder={'Enter the note here'}
          onChange={handleNoteTextChange}
          // required={true}
          // set error to true if noteText is empty
          required={true}
          error={noteText ? false : true}
          helperText={noteText ? '' : 'Please Enter!'}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={12} className={classes.control}>
        <Grid
          container
          justifyContent="space-between"
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={5} className={classes.timeBox}>
            <KeyboardDatePicker
              clearable
              disablePast
              required
              autoOk={true}
              format="dd/MM/yyyy"
              value={date}
              // name="fromDate"
              label="DATE"
              inputVariant="outlined"
              onChange={handleDateChange}
              // strictCompareDates
              inputProps={{
                className: classes.timeInput
              }}
            />
          </Grid>
          <Grid item xs={4} className={classes.timeBox}>
            <KeyboardTimePicker
              clearable
              inputVariant="outlined"
              autoOk={true}
              required
              name="time"
              onChange={handleTimeChange}
              value={time}
              // fullWidth
              variant="contained"
              label="TIME"
              error={timeError}
              keyboardIcon={<AccessTimeIcon />}
              inputProps={{
                className: classes.timeInput
              }}
            />
            {timeError && (
              <FormHelperText className={classes.helperTextTime}>
                Time should be greater than current time!
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={3}>
            {getPriorityDropdown(
              handlePriorityChange,
              classes,
              priorityDropdownOpened,
              setPriorityDropdownOpened,
              priorityError
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.actionBtn}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={cancelNote}>
              <Trans id="Cancel"></Trans>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.saveButton}
              onClick={saveNote}
            >
              <Trans id="Save">Save</Trans>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CreateNote.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

CreateNote.defaultProps = {};

export default CreateNote;
