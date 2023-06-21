import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Partner360Header from 'Features/360/Partner360/Partner360Header';

import Footer360 from 'Components/Footer/Footer360';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'auto'
  },
  main: {
    backgroundColor: theme.palette.background.main,
    //maxHeight: '100vh',
    overflowY: 'hidden'
    // width: '94.5% !important',
    // maxWidth: '94.5% !important',
    // flexBasis: '94.5% !important'
  },
  sidebar: {
    width: '5.5% !important',
    maxWidth: '5.5% !important',
    flexBasis: '5.5% !important'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
}));
const DashBoard360 = ({
  children,
  expand,
  partnerdetails,
  TabsName,
  handleTabs,
  hideTenant,
  hideProducts,
  clearStore,
  balance,
  PartnerId,
  user
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item className={classes.main} xs={12}>
        <Partner360Header
          expand={expand}
          partnerdetails={partnerdetails}
          PartnerId={PartnerId}
          balance={balance}
          user={user}
        />
        {children}
      </Grid>
      <Grid item xs={12} className={classes.footer}>
        <Footer360 />
      </Grid>
      {/* <Grid item xs={12}>
        <CopyRightFooter />
      </Grid> */}
    </Grid>
  );
};

export default DashBoard360;
