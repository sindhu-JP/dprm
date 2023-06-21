import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useStateful } from 'react-hanger';
import LeadDetails from 'lib/utils/lead';

import Telegram from 'Assets/Icons/Telegram.svg';
import whatsapp from 'Assets/Icons/whatsapp.svg';
import SMS from 'Assets/Icons/SMS.svg';
import email from 'Assets/Icons/mail.svg';

const Icons = {
  telegram: Telegram,
  sms: SMS,
  email: email,
  whatsapp: whatsapp
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const PrimaryContact = ({ values }) => {
  const classes = useStyles();
  const contact = useStateful({});

  React.useEffect(() => {
    if (values) {
      contact.setValue(
        LeadDetails.primaryContactDetails({
          contactDetails: values
        })
      );
    }
  }, [values]);

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            {/* <Grid item>
            
              <img src={Manager} />
            </Grid> */}
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                {values.title ? values.title : 'Primary Contact Details'}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.firstName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Last Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Mobile Number</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{contact.value.mobile}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* 2nd row */}
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Email</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{contact.value.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Whatsapp</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.whatsapp}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Designation</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.designation}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">phone Number</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.phoneNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">extension Number</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.extensionNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Department</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {contact.value.department}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {contact.value.mediums && (
          <React.Fragment>
            <Box mb={6} mt={12}>
              <Typography variant="h4" className={classes.title}>
                Contact Medium
              </Typography>
            </Box>

            <Grid container spacing={6}>
              {contact.value.mediums.map((medium) => (
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <img src={Icons[medium.icon]} />
                    </Grid>

                    <Grid item>{medium.label}</Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        )}
      </Box>
    </Paper>
  );
};

export default PrimaryContact;
