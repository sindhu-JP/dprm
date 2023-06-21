import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import TicketDetails from './TicketDetails';
import CustomerDetails from './CustomerDetails';

import TicketActivity from './TicketActivity';

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
  }
}));
export default function TicketDetailsWrapper({
  selectedTicketdetails,
  partnerdetails
}) {
  const classes = styles();
  return (
    <div>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <TicketDetails
            values={selectedTicketdetails}
            partnerdetails={partnerdetails}
          />
        </Grid>
        <Grid item>
          <CustomerDetails values={partnerdetails} />
        </Grid>

        {/* <Grid item>
          <AdditionalDetails />
        </Grid>
         */}
        {/* <Grid item>
          <Workflowdetails />
        </Grid> */}
        <Grid item>
          <TicketActivity ticket={selectedTicketdetails} />
        </Grid>
      </Grid>
    </div>
  );
}
