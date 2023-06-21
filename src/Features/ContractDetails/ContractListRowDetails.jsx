import React from 'react';
import {
  Drawer,
  makeStyles,
  Grid,
  Typography,
  Box,
  Paper
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const ContractListRowDetails = (props) => {
  const classes = useStyles();
  return (
    <>
      <Drawer
        open={props.open}
        onClose={props.onClose}
        anchor={'bottom'}
        style={{ height: '95vh', width: '100vw' }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '18px'
          }}
        >
          <Typography
            style={{
              fontSize: '18px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            View Contract Detail
          </Typography>
          <IconButton onClick={props.onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Paper elevation={0}>
          <Box p={4}>
            <Box mb={4}>
              <Grid container direction="row" spacing={4}>
                <Grid item>
                  <Typography variant="h2" className={classes.title}>
                    Contract Details
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">CONTRACT ID</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.CONTRACT_ID}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">CONTRACT_TYPE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.CONTRACT_TYPE}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">CONTRACT PERIOD</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.CONTRACT_PERIOD}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">START DATE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.START_DATE}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">END DATE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.END_DATE}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">
                      CONTRACT VALIDITY
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.CONTRACT_VALIDITY}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">NOTICE PERIOD</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.NOTICE_PERIOD}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">SETTLEMENT MODE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.SETTLEMENT_MODE}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">DSP COMMISSION</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.rowData.DSP_COMMISSION}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Drawer>
    </>
  );
};

export default ContractListRowDetails;
