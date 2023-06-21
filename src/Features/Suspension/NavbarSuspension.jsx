import React from 'react';

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import { ArrowBack, PersonAddDisabled, Help } from '@material-ui/icons';
// import Logo from 'Assets/Icons/Logo.svg';
import { useHistory } from 'react-router-dom';
import Logo from 'Components/Logo';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.gray} !important`
        : theme.palette.common.white
  },
  spacer: {
    flexGrow: 1
  },
  logo: {
    width: theme.spacing(40),
    '& > img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      height: 'auto'
    }
  },
  iconClr: {
    '& .MuiIconButton-label': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.primary.black} !important`
          : '#757575'
    }
  },
  divider: {
    margin: theme.spacing(0, 4),
    height: '3.6rem'
  },
  req: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  }
}));
const NavbarSuspension = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const navigateToPreviousPage = () => {
    history.goBack();
  };
  const navigateToHome = () => {
    history.push('/');
  };

  return (
    <AppBar className={classes.root} position="relative">
      <Toolbar>
        <IconButton
          edge="start"
          onClick={navigateToPreviousPage}
          className={classes.iconClr}
        >
          <ArrowBack />
        </IconButton>
        <Box ml={4} className={classes.logo} onClick={navigateToHome}>
          <Logo />
        </Box>
        <Divider orientation="vertical" className={classes.divider} />
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            wrap="nowrap"
            spacing={6}
          >
            <Grid item>
              {/* <Typography className={classes.req} variant="h6">
                Settlement Rule Creation - REQ12345EFJ
              </Typography> */}
            </Grid>
            <Grid item>
              {/* <Chip
                // avatar={Edit}
                color="primary"
                variant="outlined"
                label="Draft"
              /> */}
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.spacer} />
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
          >
            <Grid item>
              <IconButton size="medium" className={classes.iconClr}>
                <PersonAddDisabled />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="medium" className={classes.iconClr}>
                <Help />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarSuspension;
