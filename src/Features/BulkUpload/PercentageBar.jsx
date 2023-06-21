import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    customBar: {
        background: '#E6E6E6',
        "&.MuiLinearProgress-root .MuiLinearProgress-barColorPrimary": {
          borderRadius: 5,
          backgroundColor: ({color}) => color || "#E6E6E6"
        }
      }
})
)



function PercentageBar({ value, color}) {
  const  classes = useStyles({color}); 
  return (
    <LinearProgress variant="determinate" value={value} className={classes.customBar} />
  );
}
export default PercentageBar;

