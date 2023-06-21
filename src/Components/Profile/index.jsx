import React from 'react';
import {
  Grid,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  makeStyles
} from '@material-ui/core';
import config from 'config';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Help from '@material-ui/icons/Help';
import Face from '@material-ui/icons/Face';
import AuthController from 'Controllers/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Trans } from '@lingui/react';

import LanguageController from 'Store/Language';
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.common.white,
    height: '60px',
    background: `${theme.palette.common.white} 0% 0% no-repeat padding-box`,
    boxShadow: `0px 1px 2px #4933D31A`,
    opacity: 1
  },
  logo: {
    width: theme.spacing(30),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      height: 'auto'
    }
  },
  avatar: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontSize: theme.spacing(4)
  },
  divider: { marginLeft: 10, marginRight: 10, background: '#E0E0E0' },
  menuDivider: { marginTop: 10, marginBottom: 10, background: '#E0E0E0' },
  img: {
    cursor: 'pointer'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: theme.palette.common.white
  }
}));
export default function index(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [AvatarChar, setAvatarChar] = React.useState('');
  const profileObj = localStorage.getItem('loginUser');
  const { language } = useSelector((state) => state.Language);
  const [lang, setLang] = React.useState(null);
  React.useEffect(() => {
    const username = JSON.parse(profileObj)?.username;
    username?.split('')[0] && setAvatarChar(username?.split('')[0]);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHelp = () => {
    //  history.push(`${config.basePath}Help`)
    let helpOpen = window.open(`${config.basePath}Help`, '_blank');
    helpOpen.focus();
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onLogout = () => {
    AuthController.logout(config.sso);
  };
  const AllLanguage = [
    { key: 'en', name: 'English', code: 'EN' },
    { key: 'ar', name: 'Arabic', code: 'AR' },
    { key: 'hi', name: 'Hindi', code: 'HI' }
  ];
  return (
    <>
      <Grid
        item
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '1rem'
        }}
      >
        <Avatar className={classes.avatar} onClick={handleMenuOpen}>
          {/* {createInitials(props.user?.sub)}  */}
          {AvatarChar.toUpperCase()}
        </Avatar>
      </Grid>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} className={classes.center}>
            <Face fontSize={'large'} className={classes.icon} />
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Typography variant="h5" className={classes.icon}>
              {JSON.parse(profileObj)?.username}
            </Typography>
          </Grid>
        </Grid>
        <Divider size={1} className={classes.menuDivider} />

        
        <MenuItem onClick={handleHelp}>
          <ListItemIcon>
            <Help fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <Trans id="Help"></Trans>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <Trans id="Logout"></Trans>
        </MenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={lang}
        keepMounted
        open={Boolean(lang)}
        onClose={() => setLang(null)}
      >
        {AllLanguage.map((item) => {
          return (
            <MenuItem
              key={item.key}
              onClick={() => {
                setLang(null);
                // dispatch({
                //   type: 'SET_LANGUAGE',
                //   payload: { language: item.key }
                // });

                dispatch(
                  LanguageController.setLanguage({ language: item.key })
                );
              }}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>

      <Grid
        item
        style={{
          display: 'flex',
          alignItems: 'center',
          // paddingRight: '1rem',
          cursor: 'pointer'
        }}
        onClick={(e) => setLang(e.currentTarget)}
      >
        <Typography>
          {AllLanguage.find((item) => item.key === language).code}
        </Typography>
      </Grid>
    </>
  );
}
