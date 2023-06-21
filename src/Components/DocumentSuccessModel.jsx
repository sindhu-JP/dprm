import React from 'react';
import {
  Button,
  Paper,
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
// import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import successCheck from 'Assets/Icons/successCheck.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.main
  },
  buttonWidth: {
    width: '120px'
  }
}));

const DocumentSuccessModal = (props) => {
  const classes = useStyles();
  const data = [
    { name: 'Document Type', value: 'Passport' },
    { name: 'Request ID', value: 'R66363D' },
    { name: 'Date & Time', value: '10 July 2022 22:00 pm' },
    { name: 'Document ID', value: 'Passport' },
    { name: 'Document Type', value: 'PAS4538478' },
    { name: 'Expiry Date', value: '21 October 2035' },
    { name: 'DMS Reference Id', value: 'DFWE357848' }
  ];
  const { onClose } = props;
  return (
    <div>
      <div className={classes.root}>
        <Box
          py={6}
          px={10}
          style={{
            maxHeight: '100vh',
            overflow: 'hidden'
          }}
        >
          <Grid container direction="column">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '70vh' }}
            >
              <Paper elevation={0}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={4}
                >
                  <Grid item>
                    <img src={successCheck} height="60px" width="60px" />
                    {/* <CheckCircleRoundedIcon
                                            fontSize="large"
                                            style={{ color: '#59cf59', height: "40px", width: "40px" }}
                                        /> */}
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">
                      Document Uploaded Successfully
                    </Typography>
                  </Grid>
                  <Grid item>
                    {data.map((item) => (
                      <Grid container justify="space-between">
                        <Grid item>
                          <Grid container alignItems="flex-start">
                            <Grid item>
                              <Typography variant="subtitle2">
                                {item.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Typography variant="subtitle2">{':'}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="flex-end">
                            <Grid item>
                              <Typography variant="subtitle2">
                                {item.value}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={6}
                  style={{
                    justifyContent: 'center',
                    marginTop: '50px'
                  }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.buttonWidth}
                      onClick={onClose}
                      // onClick={() => dispatch(Modal.close('BillingConformation'))}
                    >
                      Done
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default DocumentSuccessModal;
