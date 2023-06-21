import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import circleBase from '../../Assets/Icons/circleBase.svg'
import PercentageBar from './PercentageBar'
import colors from '../../Assets/colors';

const useStyles = makeStyles(() => ({
  card: {
    width: '32%',
    marginRight: '5px',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    '& body2': {
        marginBottom: 15,
        color: colors.gold,
      },
  },
  top: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      '& h5': {
          fontSize: '18px',
          color: '#FFCC00',
        },
    },
    percent:{
        margin:'0.5rem 0',
    },
    token:{
        marginTop:'0.5rem',
    }

}));




function UploadCard({data}) {
    const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent>
        <div className={classes.top}>
          <IconButton aria-label="edit">
            <img src={circleBase} alt="bulk-icon"  />
          </IconButton>

          <Typography variant="h5">
            Reference No: {data.referenceNum}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          {data.stat}
        </Typography>
        <Typography className={classes.percent} variant="body2" component="p" >
          {data.percentage}%
        </Typography>
        <PercentageBar value={data.percentage} color={data.color} className={classes.bar}/>
        <Typography variant="body2" component="p" className={classes.token}>
          {data.token}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UploadCard;
