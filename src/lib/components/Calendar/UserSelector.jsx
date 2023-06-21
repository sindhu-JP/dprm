import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Box,
  Grid,
  Typography,
  IconButton,
  Drawer,
  makeStyles
} from '@material-ui/core';
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
  lead: {
    cursor: 'pointer',
    border: '1px solid #DFDFDF',
    borderRadius: theme.spacing(2),
    backgroundColor: '#DFDFDF'
  },
  leadSelected: {
    // backgroundColor: "#ffffff",
    boxShadow: '0 16px 20px -15px rgba(0,0,0, 0.12)',
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.main
  }
}));
const User = ({ lead, selected, onSelect }) => {
  const classes = useStyles();

  return (
    <Box
      p={4}
      onClick={() => onSelect(lead.id)}
      className={classNames(classes.lead, selected ? classes.leadSelected : '')}
    >
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.label} variant="h6">
            {_.get(lead, 'companyDetails.companyName', 'Lead')}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" className={classes.label}>
                    Name
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {_.get(lead, 'primaryContactDetails.name', '')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" className={classes.label}>
                    Email
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {_.get(lead, 'primaryContactDetails.email', '')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" className={classes.label}>
                    Mobile
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {_.get(lead, 'primaryContactDetails.mobileNumber', '')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const UserSelector = ({ open, onClose, leads, selectedLead, onSelect }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={6} className={classes.root}>
        <Box mb={8} pb={4} className={classes.seperator}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="h4">Add Attendee</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container direction="column" spacing={2}>
            {leads.ids.map((leadId, index) => (
              <Grid item key={leadId}>
                <User
                  onSelect={onSelect}
                  lead={leads.entities[leadId]}
                  selected={selectedLead === leadId}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserSelector;
