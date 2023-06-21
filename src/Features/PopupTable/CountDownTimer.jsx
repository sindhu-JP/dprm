const { Typography } = require("@material-ui/core");
const { useCountdown } = require("./useCountDown");
import React from 'react';
const CountDownTimer = ({ status }) => {
    const timer = useCountdown(status);
  
    const timeLeftString = (timer) => {
        if(timer&&timer?.length===0) return '-'
        if (timer[0]) return `${timer[0]} Days Left`;
        if (timer[1]) return `${timer[1]}.${timer[2]}.${timer[3]} Hours Left`;
        if (timer[2]) return `${timer[2]}.${timer[3]} Minutes Left`;
        if (timer[3]) return `${timer[3]} Seconds Left`;
        return "-";
    };
    return (
      <Typography
        style={{
          color: "red",
        }}
        variant="p"
      >
        {timeLeftString(timer)}
      </Typography>
    );
  };

  export default CountDownTimer