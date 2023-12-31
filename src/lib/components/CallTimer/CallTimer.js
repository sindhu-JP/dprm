/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import AvTimerOutlinedIcon from '@material-ui/icons/AvTimerOutlined';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
// import { convertMS } from 'common/utils/dateUtil';
 const convertMS = (milliseconds) => {
    var day;
    var hour;
    var minute;
    var seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds %= 60;
    hour = Math.floor(minute / 60);
    minute %= 60;
    day = Math.floor(hour / 24);
    hour %= 24;
    return {
      day: padStart(day, 2, '0'),
      hour: padStart(hour, 2, '0'),
      minute: padStart(minute, 2, '0'),
      seconds: padStart(seconds, 2, '0')
    };
  };
const styles = (theme) => ({
  timer: {
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.paper
    },
    width: 104,
    maxHeight: 35,
    marginLeft: 20,
    marginRight: 15
  },
  relative: {
    position: 'relative'
  },
  avgTimeLabel: {
    marginTop: 28
  },
  timerRoot: {
    // TODO: Need to replace the color after theme fix merge
    boxShadow: `1px 1px 3px ${theme.palette.text.primary}88`,
    backgroundColor: theme.palette.common.white
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: 500
  }
});
class CallTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      callDropFlag: false
    };
  }

  componentDidMount() {
    const {
      callTimer,
      activeCustomer,
      startCustomerTimer,
      customerId
    } = this.props;
    if (callTimer) {
      this.startTimer(callTimer.startTime);
    } else {
      const time = new Date().getTime()
      this.startTimer(time);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick(startTime) {
    const currentTime = new Date().getTime();
    const timerElapsed = Math.floor((currentTime - startTime) / 1000);
    this.setState({ count: timerElapsed });
  }

  startTimer(startTime) {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this, startTime), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.props.onStopTimer();
  }

  render() {
    const { classes, callTimer } = this.props;
    let callDuration;

    if (callTimer) {
      const { hour, minute, seconds } = convertMS(
        dayjs().diff(dayjs(callTimer.startTime))
      );
      callDuration = `${hour}:${minute}:${seconds}`;
    }
    if (!this.state.count) {
      return null;
    }
    
    return (
      <Chip
        classes={{
          root: classes.timerRoot,
          label: classes.timerLabel
        }}
        label={callDuration}
        icon={<AvTimerOutlinedIcon />}
      />
    );
  }
}

export default withStyles(styles)(CallTimer);
