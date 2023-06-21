import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Paper,
  Tooltip
} from '@material-ui/core';

import dayjs from 'dayjs';

import { connect } from 'react-redux';

// import dayjs from 'dayjs'
// import ProjectOverview from 'Features/ProjectManagement/ProjectOverview';
import _ from 'lodash';
import { useBoolean } from 'react-hanger';
import wallet from 'Assets/Icons/walletIcon.svg';
import { Close } from '@material-ui/icons';
import { Trans } from '@lingui/react';

const Wallet = (props) => {
  const { customerInfo, quoteDetails } = props;
  const [qoute360ViewOpen, setQoute360ViewOpen] = React.useState(false);
  const [quoteInfo, setQuoteInfo] = React.useState('');
  const enableSearch = useBoolean(false);
  const classes = useStyles();
  const handleMenuOpen = () => {};
  return (
    <Box py={3}>
      <Grid container direction="column">
        <Grid item>
          <Paper elevation="0" style={{ borderRadius: props.radius }}>
            {props.show ? (
              <Grid container direction="row" justify="flex-end">
                <Grid item>
                  <Tooltip title="Close" placeholder="bottom">
                    <Close onClick={() => props.expand.setFalse()} />
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              ''
            )}
            <Grid
              container
              direction="row"
              spacing={15}
              className={classes.grid}
              alignContent="center"
            >
              <Grid item xs={3}>
                <Grid xs container direction="row" spacing={3}>
                  <Grid item>
                    <img src={wallet} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.text}>
                      <Trans id="Wallet Details"></Trans>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid xs container direction="column">
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      className={classes.subtitle}
                    >
                      <Trans id="Wallet ID"></Trans> :{' '}
                      {_.get(props.balance, 'id', '--')}
                    </Typography>
                  </Grid>
                  <Grid item justify="center">
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle}
                    >
                      <Trans id="Today's summary"></Trans>
                      {dayjs(props.balance?.createdDate).format('DD MMM YYYY')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {props.unsettledAmount ? (
                <Grid item xs={3}>
                  <Grid xs container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2" className={classes.title}>
                        <Trans id=" UNSETTLED BALANCE"></Trans>
                      </Typography>
                    </Grid>
                    <Grid item justify="center">
                      <Typography variant="subtitle2" className={classes.title}>
                        {props.balance?.currency} {props.WalletBalance || '00'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}
              <Grid item xs={3}>
                <Typography variant="h6" className={classes.text}>
                  {' '}
                  <Trans id="AVAILABLE BALANCE :  "></Trans>{' '} {props.balance?.currency}{' '}{' '}
                  {_.round(_.get(props.balance, 'balance', '0.00'), 2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  },
  text: {
    marginTop: '6px',
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default connect((state) => ({}), {})(Wallet);
