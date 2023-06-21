import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  makeStyles,
  Button
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LeadUtils from "lib/utils/lead";
import dayjs from "dayjs";
import ScheduleIcon from '@material-ui/icons/Schedule';
import TodayIcon from '@material-ui/icons/Today';
import { useSelector } from "react-redux";
import { useStateful } from "react-hanger";

const EventDetail = ({ onClose, followup }) => {
  const classes = useStyles();
  const masterdata = useSelector((state) => state.master.data);
  const address = useStateful({});

  React.useEffect(() => {
    if (followup.companyAddress) {
      address.setValue(
        LeadUtils.getPrimaryAddress({
          addressDetails: followup.companyAddress,
          masterdata,
        })
      );
    }
  }, [followup.companyAddress]);

  return (
    <Box className={classes.root} p={6}>
      <Box mb={4} pb={4} >
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">{followup.subject}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {/* <Box mb={2}>
          <Typography className={classes.label} variant="h6">
            Attendees
          </Typography>
        </Box> */}
        <Grid container direction="column" spacing={4}>
          {followup &&
            followup.cust?.map((attendie, index) => (
              <>
                <Grid item>
                  <Typography className={classes.label} variant="h6">
                    Attendees
                  </Typography>
                </Grid>
                <Grid item key={index}>
                  <Grid container direction="row" spacing={4} wrap="nowrap">
                    <Grid item xs={4}>
                      <Typography variant="h6">Name</Typography>
                      <Typography>{attendie.name}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h6">Email</Typography>
                      <Typography>{attendie.email}</Typography>
                    </Grid>
                    {attendie.mobile && (
                      <Grid item xs={3}>
                        <Typography variant="h6">Mobile No.</Typography>
                        <Typography>{attendie.mobile}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </>
            ))}

          <Grid item>
            <Typography className={classes.label} variant="h6">
              Description
                  </Typography>
            <Typography>{followup.descriptions}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.label} variant="h6">
              LeadName
                  </Typography>
            <Typography>{followup.companyDetails?.companyName}</Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.label} variant="h6">Company Details</Typography>
          </Grid>
          <Grid item>
            {/* <Grid container direction="row"></Grid> */}
            <Typography>{followup.companyDetails?.companyName},
            {followup.companyDetails?.companyRegistrationNumber},
            {followup.companyDetails?.customerCategory},
            {followup.companyDetails?.customerSubCategory},
            {followup.companyDetails?.leadClassification}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.label} variant="h6">Address</Typography>
          </Grid>
          <Grid item >
            <Grid container direction="row" spacing={4} wrap="nowrap">
              <Grid item >
                <Typography>{address.value.formattedAddress}</Typography>
                {/* <Typography>{followup.companyAddress?.addressLine1},
                {followup.companyAddress?.country},
                {followup.companyAddress?.stateOrProvince},
                  {followup.companyAddress?.city},
                  {followup.companyAddress?.postcode}

                </Typography> */}
              </Grid>
              {/* )} */}
            </Grid>
          </Grid>

          {/* //date & time */}
          <Grid item>
            <Typography className={classes.label} variant="h6">Date And Time</Typography>
          </Grid>
          <Grid item >
            <Grid container direction="row" spacing={4} >
              <Grid item><Button
                className={classes.button}
                startIcon={<TodayIcon fontSize="small" />}
              >
                {dayjs(followup.createdDate).format("DD MMM YYYY")}
              </Button>
              </Grid>
              <Grid item><Button
                className={classes.button}
                startIcon={<ScheduleIcon fontSize="small" />}
              >
                {dayjs(followup.createdDate).format("h:mm A")}
              </Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Box >
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "30vw",
    height: "100vh",
    position: "relative",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  seperator: {
    borderBottom: "1px solid #DFDFDF",
    boxShadow: "0 16px 20px -15px rgba(0,0,0, 0.12)",
  },
}));

export default EventDetail;
