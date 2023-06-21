import React from 'react';
import { Grid, Box, Button, Typography, makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import Pending from 'Assets/Icons/Pending_confirmation.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  label: {
    fontWeight: theme.palette.fontWeightBold
  },
  inner: {
    width: theme.spacing(120),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },
  dot: {
    backgroundColor: '#FFA369',
    borderRadius: '50%',
    width: '55px',
    height: '55px',
    display: 'inline-block'
  },
  mtop70: {
    marginTop: '55px'
  }
}));
const QouteApprovalSent = ({ details, onSubmit }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.inner}
        alignItems="center"
      >
        <Grid item>
          {/* <span className={classes.dot}></span> */}
          {/* <Pending /> */}
          <img src={Pending} />
        </Grid>
        <Grid item>
          <Typography variant="h2" style={{ color: '#FFA369' }}>
            Approval Pending
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" style={{ fontSize: '15px' }}>
            Quotation & Contract sent for manager approval
          </Typography>
        </Grid>

        <Grid item xs={10} style={{ width: '100%' }}>
          <Grid
            container
            direction="column"
            // spacing={2}
            // style={{ width: "100%" }}
          >
            <Grid item>
              <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" className={classes.label}>
                    Quote ID
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" className={classes.label}>
                    {details.quoteId}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* contarct */}
            <Grid item>
              <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" className={classes.label}>
                    Contract ID
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" className={classes.label}>
                    {details.contractId}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" className={classes.label}>
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" className={classes.label}>
                    {/* {details.validity} */}
                    {dayjs(details.validity).format('DD MMM YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" className={classes.label}>
                    Total Price
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" className={classes.label}>
                    {details.unit} {parseInt(details.total)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" className={classes.label}>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" className={classes.label}>
                    Approval pending
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* {Object.keys(props.details).map((item, i) => (
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={4}
                  index={i}
                  wrap="nowrap"
                >
                  <Grid item xs={6}>
                    <Typography style={{ textAlign: "right" }} variant="h6">
                      {item}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography style={{ textAlign: "center" }} variant="h6">
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography style={{ textAlign: "left" }} variant="h6">
                      {props.details[item]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))} */}
          </Grid>
        </Grid>

        <Grid item className={classes.mtop70}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            spacing={4}
          >
            <Grid item>
              {/* <Button
                size="large"
                variant="text"
                color="secondary"
              >
                Create New Lead
              </Button> */}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onSubmit}
              >
                OK
                {/* Go Back To Dashboard */}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QouteApprovalSent;
