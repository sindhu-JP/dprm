// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
// import LeadUtils from 'lib/utils/lead';
// import { useStateful } from 'react-hanger';
// // const useStyles = makeStyles((theme) => ({
// //   title: {
// //     fontWeight: theme.typography.fontWeightBold
// //   }
// // }));
// import classNames from 'classnames';

// const ticketActivityStyles = makeStyles((theme) => ({
//   activity: {
//     padding: '10px 10px'
//   },
//   userName: {
//     color: '#67809F',
//     fontWeight: '600'
//   },
//   avatar: {
//     backgroundColor: '#4CC4EE',
//     color: 'white'
//   },
//   activityItem: {
//     alignItems: 'center'
//   },
//   activityContainer: {
//     maxHeight: '16rem',
//     overflowY: 'auto',
//     overflowX: 'hidden'
//   },
//   headingMarginBottom: {
//     marginBottom: '1.5rem'
//   }
// }));
// const TicketActivity = ({ activity }) => {

// const classes=ticketActivityStyles()
//   return (
//     <Paper elevation={0}>

// <Grid container direction="column" xs={12}>
//           <Box px={8} py={8}>
//             <Typography
//               variant="h2"
//               className={
//                 (classNames('grayText', 'light'), classes.headingMarginBottom)
//               }
//               gutterBottom
//             >
//               Ticket Activity
//             </Typography>
//             <Grid item className={classes.activityContainer}>
//               {activity?.length > 0
//                 ? activity.map((activityUI) => {
//                     return (
//                       <Grid
//                         container
//                         direction="column"
//                         justify="space-between"
//                         alignItem="center"
//                         spacing={1}
//                       >
//                         <Grid item>
//                           <Grid
//                             container
//                             direction="row"
//                             alignItem="center"
//                             // justify="space-between"
//                             className={classes.activityItem}
//                             // spacing={4}
//                           >
//                             <Grid item>
//                               <Avatar className={classes.avatar}>
//                                {activityUI?.author}
//                               </Avatar>
//                             </Grid>
//                             <Grid item>{activityUI.text}</Grid>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                     );
//                   })
//                 : null}
//             </Grid>
//           </Box>
//         </Grid>
//       {/* <Box p={4}>
//         <Box mb={4}>
//           <Typography variant="h2" >
//           Ticket Activity
//           </Typography>
//         </Box>

//         <Grid container spacing={4}>
//         <Grid item className={classes.activityContainer}>
//               {ticketActivityUIArr.length > 0
//                 ? ticketActivityUIArr.map((activityUI) => {
//                     return (
//                       <Grid
//                         container
//                         direction="column"
//                         justify="space-between"
//                         alignItem="center"
//                         spacing={1}
//                       >
//                         <Grid item>
//                           <Grid
//                             container
//                             direction="row"
//                             alignItem="center"
//                             // justify="space-between"
//                             className={classes.activityItem}
//                             // spacing={4}
//                           >
//                             <Grid item>
//                               <Avatar className={classes.avatar}>
//                                 {activityUI.activity.author
//                                   ? _uppercase(activityUI.activity.author[0])
//                                   : null}
//                               </Avatar>
//                             </Grid>
//                             <Grid item>{activityUI.ticketActivityUI}</Grid>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                     );
//                   })
//                 : null}
//             </Grid>
//         </Grid>
//       </Box> */}
//     </Paper>
//   );
// };

// export default TicketActivity;

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Avatar,
  makeStyles,
  Paper
} from '@material-ui/core';
// import { ticketActivityConstants } from 'trouble-ticket-management/common/constants/ticketActivity';
// import RootElement from 'trouble-ticket-management/360/components/OfferingDetails/RootElement';
import classNames from 'classnames';
// import ticketActivityStyles from './styles/ticketActivity.styles';
// import _uppercase from 'lodash/upperCase';
import moment from 'moment';
// import constants from 'trouble-ticket-management/common/constants/constants';

export const ticketActivityConstants = {
  STATUS: 'status',
  COMMENT: 'comment',
  ASSIGNEE: 'assignee',
  CHILD_TICKET: 'childTicket',
  CATEGORY_CHANGE: 'categoryChange',
  LOG_TICKET: 'logTicket',
  SLA_STATUS: 'slaStatus'
};

const ticketActivityStyles = makeStyles((theme) => ({
  activity: {
    padding: '10px 10px'
  },
  userName: {
    color: '#67809F',
    fontWeight: '600'
  },
  avatar: {
    backgroundColor: '#4CC4EE',
    color: 'white'
  },
  activityItem: {
    alignItems: 'center'
  },
  activityContainer: {
    maxHeight: '16rem',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  headingMarginBottom: {
    marginBottom: '1.5rem'
  }
}));

const TicketActivity = (props) => {
  const { ticket, activityRef } = props;
  const classes = ticketActivityStyles();
  const [ticketActivityUIArr, setTicketActivityUIArr] = useState({});
  // const classes=ticketActivityStyles()
  const ticketActivityComments = (activity) => {
    const { author, date, text } = activity;
    return (
      <Grid container direction="column" className={classes.activity}>
        <Grid item container direction="row">
          <Typography className={classes.userName}> {author}&nbsp; </Typography>
          <Typography> {text}&nbsp; </Typography>
          <Typography> {`on ${moment(date).format('LLL')}`}</Typography>
        </Grid>
        <Typography> {activity['@type']} </Typography>
      </Grid>
    );
  };

  const ticketActivityGeneral = (activity) => {
    if (activity) {
      const { author, date, text } = activity;
      return (
        <Grid container direction="row" className={classes.activity}>
          <Typography className={classes.userName}>{author}&nbsp;</Typography>
          <Typography>{text}&nbsp;</Typography>
          <Typography className={classes.userName}>
            {activity['@type']}&nbsp;
          </Typography>
          <Typography> {`on ${moment(date).format('LLL')}`}</Typography>
        </Grid>
      );
    } 
  };
  useEffect(() => {
    let ticketActivityUI;
    if (ticket.ticketActivity) {
      let activityUIARR = ticket.ticketActivity.map((activity, index) => {
        switch (activity?.action) {
          case ticketActivityConstants.STATUS:
          case ticketActivityConstants.ASSIGNEE:
          case ticketActivityConstants.CHILD_TICKET:
          case ticketActivityConstants.LOG_TICKET:
          case ticketActivityConstants.CATEGORY_CHANGE:
          case ticketActivityConstants.SLA_STATUS:
            ticketActivityUI = ticketActivityGeneral(activity);
            break;
          case ticketActivityConstants.COMMENT:
            ticketActivityUI = ticketActivityComments(activity);
            break;
          default:
            ticketActivityUI = ticketActivityGeneral(activity);
        }

        return { ticketActivityUI, activity };
      });
      setTicketActivityUIArr(activityUIARR);
    }
  }, [ticket]);
  return (
    <div ref={activityRef}>
      <Paper elevation={0}>
        <Grid container direction="column" xs={12}>
          <Box px={8} py={8}>
            <Typography
              variant="h2"
              className={
                (classNames('grayText', 'light'), classes.headingMarginBottom)
              }
              gutterBottom
            >
              Ticket Activity
            </Typography>
            <Grid item className={classes.activityContainer}>
              {ticketActivityUIArr.length > 0
                ? ticketActivityUIArr.map((activityUI) => {
                    return (
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItem="center"
                        spacing={1}
                      >
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            alignItem="center"
                            // justify="space-between"
                            className={classes.activityItem}
                            // spacing={4}
                          >
                            <Grid item>
                              <Avatar className={classes.avatar}>
                                {activityUI.activity?.author
                                  ? _.upperCase(activityUI.activity.author[0])
                                  : null}
                              </Avatar>
                            </Grid>
                            <Grid item>{activityUI.ticketActivityUI}</Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Box>
        </Grid>
      </Paper>
    </div>
  );
};

export default TicketActivity;
