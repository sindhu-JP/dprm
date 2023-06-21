import React from 'react';

import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Chip
} from '@material-ui/core';

import moment from 'moment';
import Statuses from 'lib/constants/statuses';
const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '124px',
    padding: '24px',
    backgroundColor: theme.palette.background.highlight,
    boxShadow: 'none',
    marginBottom: '16px',
    maxWidth: '99%',
    cursor: 'pointer'
  },
  cardWrapper: {
    margin: '0',
    height: '100%',
    paddingTop: '0',
    paddingBottom: '0'
  },
  statusSection: {
    flex: '0.1'
  },
  headerTitle: {
    width: 190,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  contentSection: {
    flex: '2'
  },
  leftContent: {
    justifyContent: 'space-evenly'
  },
  statusSpan: {
    width: '4px',
    background: `${theme.palette.common.white} 0% 0% no-repeat padding-box`,
    borderRadius: '50px',
    height: '100%',
    marginRight: '12px'
  },
  chip: {
    color: 'white',
    textTransform: 'capitalize'
  },
  redStatus: {
    backgroundColor: theme.palette.error.main
  },
  orangeStatus: {
    backgroundColor: theme.palette.warning.main
  },
  captureStatus: {
    backgroundColor: theme.palette.secondary.main
  },
  greenStatus: {
    backgroundColor: theme.palette.success.main
  },
  greyStatus: {
    backgroundColor: theme.palette.common.lightSilver
  },
  subTitle: {
    marginRight: '0.2em'
  },
  typeCss: {
    color: theme.palette.text.primary,
    paddingTop: '0.7em'
  },
  activeCard: {
    backgroundColor: theme.palette.common.white,
    height: '128px',
    marginRight: -6,
    maxWidth: '100%'
  },
  warningIcon: {
    color: theme.palette.warning.main
  },
  ticketID: {
    color: '#999999',
    fontWeight: 300,
    fontSize: '12px'
  },
  associateHeading: {
    marginLeft: '-2px'
  },
  bg: {
    background: 'red !important'
  },
  green: {
    backgroundColor: theme.palette.success.main
  },
  red: {
    backgroundColor: theme.palette.error.main
  },
  orange: {
    backgroundColor: theme.palette.common.gold
  },
  captionChanges: {    
    '&.MuiTypography-caption': {
      color: theme.palette.type === 'dark'
      ? `${theme.palette.primary.black} !important`
      : `#777777 !important`, 
    }
  }
}));
const TicketDetails = ({ values, partnerdetails }) => {
  const classes = styles();
  const getStatusColor = (lead) => {
    return Statuses.statuses[lead?.status]?.color || 'orange';
  };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={6} style={{ alignItems: 'center' }}>
            <Grid item>
              <Typography variant="h2">Ticket Details</Typography>
            </Grid>

            <Grid item>
              <Chip
                className={classes[getStatusColor(values)].concat(' ', classes.chip)}
                label={_.get(values, 'status', '')}
              />
            </Grid>
          </Grid>

        </Box>

        {/* <Grid container spacing={4}> */}

        <Grid
          item
          container
          direction="column"
          spacing={6}
          // className={classNames(classes.contentSection, classes.leftContent)}
        >
          {/* <Grid item xs>
            <Grid container direction="row" spacing={2}>
              
            </Grid>
          </Grid> */}

          <Grid item xs>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Typography variant="h4">
                  {'Ticket ID'}: {values?.id}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="caption">|</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {'Ticket Type'}: {values?.ticketType}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  {values?.category} - {values?.categoryname}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h4">
                  {_.get(partnerdetails, 'mainlist.partnerName', '...')}-{' '}
                  {_.get(partnerdetails, 'mainlist.partnerId', '...')}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="caption" className={classes.captionChanges} >
                  Created on: {moment(values?.createdDate).format('LLL')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" style={{paddingLeft:'15px'}} className={classes.captionChanges}>
                  Description: {values?.description}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              {/* <Typography variant="h2">
                groups -{moment(values?.createdDate).format('LLL')};
              </Typography> */}
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}

        {/* </Grid> */}
      </Box>
    </Paper>
  );
};

export default TicketDetails;
