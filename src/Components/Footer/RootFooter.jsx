import React from 'react';
import { Box,Grid, makeStyles } from '@material-ui/core';
import Logo from 'Components/Logo';
import config from 'config';
import mtnIcon from 'Assets/Icons/mtn-logo.svg';
import { default as logoYellow } from 'Assets/Icons/mtn-logo-yellow.svg';

// import SvgFile from 'lib/components/SvgFile';
// import Logo from 'Assets/Icons/tecnotree.svg';
// import LogoTech from '../../../public/assets/icons/Tecnotree.svg';
// import {mtnYellowIcon} from 'Assets/Icons/mtn-logo-yellow.svg';

const useStyles = makeStyles((theme) => ({
  logo: {
    //cursor:'pointer',
    width: theme.spacing(15),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '4.5rem',
      height: 'auto'
    }
  },
  footer: {
    // background:
    // theme.palette.type === 'dark'
    //   ? `${theme.palette.common.white} 0% 0% no-repeat padding-box !important`
    //   : `${theme.palette.primary.black} 0% 0% no-repeat padding-box`,

    background:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.white} 0% 0% no-repeat padding-box !important`
        : `#333 0% 0% no-repeat padding-box`,

    position: 'fixed',
    width: '95%',
    bottom: '0',
    color: 'white',
    zIndex: '999'
  },
  footerContainer: {
    height: '50px',
    alignItems: 'center',
    position: 'relative'
  },
  sponserText: {
    float: 'right',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '18rem',

  },
  whiteColor: {
    color: theme.palette.primary.contrastText
  }
}));
const logo = {
  mtn: {
    name: 'mtn-logo-yellow',
    w: 82,
    h: 55
  },
  stc: {
    name: 'stc-logo'
  },
  tecnotree: {
    name: 'tt-logo',
    favicon: 'tt-favicon',
    w: 110
  },
  zbahrain: {
    name: 'zbahrain-logo'
  },
  moments: {
    // name: 'Moments-logo-updated'
    // name: 'Moments-green-logo-01'
    name: 'TT-Moments_Green',
    // name: 'Moment-Icon',
    w: 110,
    h: 50
  }
};
function RootFooter(props) {
  const classes = useStyles();

  const {
    name,
    w = 70,
    h = 30,
    favicon = name
  } = logo[config.appTheme] || logo['tecnotree'];
  React.useEffect(() => {}, []);
  let LogoIcon = config.appTheme === 'mtn' ? mtnIcon : Logo;
  return (
    <footer className={classes.footer} id="footer">
      <Grid
        container
        className={classes.footerContainer}
        justifyContent="space-between"
      >
        <Grid item></Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <p style={{ margin: '0px' }} className={classes.whiteColor}>
            Ⓒ Copyright {new Date().getFullYear()}. Digital Partner Relationship
            Manager
          </p>
        </Grid>
        <Grid item>
          <div className={classes.sponserText}>
            <p style={{ margin: '0px' }} className={classes.whiteColor}>
              {' '}
              Powered By{' '}
              {/* <SvgFile iconName={name} iconHeight={h} iconWidth={w} />
              <img src={LogoTech} style={{ width: '100px' }} /> */}
            </p>
            <Box ml={4} className={classes.logo}>
          {/* <img src={Logo} /> */}
          {/* <mtnYellowIcon/> */}
          {/* <Logo iconName={mtnyellow} /> */}
          <img src={logoYellow} />
        </Box>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
}

export default RootFooter;
