import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Box, Tooltip } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import wallet from 'Assets/Icons/walletIcon.svg';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  drawerPaper: {
    top: '10rem',
    left: '6.5rem',
    right: '0.5rem'
  },
  Paperbox: {
    height: '120px'
  },
  grid: {
    marginTop: '1rem'
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: true
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={props.expand.value}
            onClose={toggleDrawer(anchor, false)}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <Box className={classes.Paperbox} px={6} py={2}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Tooltip title="Close" placeholder="bottom">
                    <CloseIcon onClick={props.expand.toggle} />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                spacing={15}
                justify="space-between"
                className={classes.grid}
              >
                <Grid item>
                  <Grid xs container direction="row" spacing={2}>
                    <Grid item>
                      <img src={wallet} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Wallet Details</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid xs container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2" color="primary">
                        Wallet ID : 987654321
                      </Typography>
                    </Grid>
                    <Grid item justify="center">
                      <Typography variant="subtitle2">
                        Today's summary 26 Jan 2021 09:12:32
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid xs container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">
                        Ledger Balance
                      </Typography>
                    </Grid>
                    <Grid item justify="center">
                      <Typography variant="subtitle2">KWD 1000.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    available Balance KWD 800.00
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
