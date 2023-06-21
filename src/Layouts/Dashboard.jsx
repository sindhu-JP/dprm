import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Sidebar } from 'Components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden'
  },
  main: {
    backgroundColor: theme.palette.background.main,
    maxHeight: '100vh',
    overflow: 'auto',
    width: '94.5% !important',
    maxWidth: '94.5% !important',
    flexBasis: '94.5% !important'
  },
  sidebar: {
    width: '5.5% !important',
    maxWidth: '5.5% !important',
    flexBasis: '5.5% !important',
    backgroundColor: theme.palette.primary.main
  }
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item xs={1} className={classes.sidebar}>
        <Sidebar />
      </Grid>
      <Grid item style={{ flexGrow: 1 }} className={classes.main} xs={11}>
        {children}
      </Grid>
      {/* <Grid item xs={12}>
        <CopyRightFooter />
      </Grid> */}
    </Grid>
  );
};

export default DashboardLayout;
