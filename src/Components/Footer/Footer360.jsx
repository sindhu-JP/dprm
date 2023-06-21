// import React from 'react';
// import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
// import Logo from 'Components/Logo';
// const CopyRightFooter = () => {
//   const classes = useStyles();
//   return (
//     <Box px={2} className={classes.root}>
//       <Grid container justifyContent="space-between" alignItems="center">
//         <Grid item>
//           <Logo />
//         </Grid>
//         <Grid item>
//           <Typography variant="h4">
//             Digital Partner Relationship Manager.
//           </Typography>
//         </Grid>
//         <Grid item>
//           <Typography variant="h4">Copyright 2022</Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: '#E2E5E8'
//   }
// }));

// export default CopyRightFooter;
import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Logo from 'Components/Logo';
import config from 'config';
import SvgFile from 'lib/components/SvgFile';
import mtnIcon from 'Assets/Icons/mtn-logo.svg';
import { Trans } from '@lingui/react';
// import Logo from 'Assets/Icons/tecnotree.svg';
const useStyles = makeStyles((theme) => ({
  logo: {
    //cursor:'pointer',
    width: theme.spacing(15),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '60%',
      height: 'auto',
      marginLeft: '40%'
    }
  },
  footer: {
    background:
    theme.palette.type === 'dark'
      ? `#E2E5E8 0% 0% no-repeat padding-box !important`
      : `${theme.palette.primary.black} 0% 0% no-repeat padding-box`,
    // position: 'fixed',
    // width: '100%',
    // bottom: '0',
    // color: 'white',
    // zIndex: '999'
  },
  footerIcon:{
    fill:  `${theme.palette.common.white} !important`
  },
  footerContainer: {
    height: '50px',
    alignItems: 'center'
    // position: 'relative'
  },
  sponserText: {
    float: 'right',
    padding: '0px 20px',
    display: 'flex',
    height: '40px',
    alignItems: 'center'
  },
  whiteColor: {
    color: `${theme.palette.common.white} !important`
  }
}));
const logo = {
  mtn: {
    name: 'mtn-logo'
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
function Footer360(props) {
  const classes = useStyles();

  const {
    name,
    w = 80,
    h = 40,
    favicon = name
  } = logo[config.appTheme] || logo['tecnotree'];
  React.useEffect(() => {}, []);
  let LogoIcon = config.appTheme === 'mtn' ? mtnIcon : Logo;
  return (
    <footer className={classes.footer} id="footer">
      <Box px={4}>
        <Grid
          container
          className={classes.footerContainer}
          justifyContent="space-between"
        >
          <Grid item >
            <SvgFile iconName={name} iconHeight={h} iconWidth={w} className={classes.footerIcon}  />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <p style={{ margin: '0px' }} className={classes.whiteColor}>
              <Trans id=" Digital Partner Relationship Manager"></Trans>
            </p>
          </Grid>
          <Grid item>
            <div className={classes.sponserText}>
              <p style={{ margin: '0px' }} className={classes.whiteColor}>
                Ⓒ <Trans id="Copyright"></Trans> {new Date().getFullYear()}.
              </p>

              {/* <SvgFile iconName={name} iconHeight={h} iconWidth={w} /> */}
              {/* <img src={LogoIcon} style={{ width: '20px' }} /> */}
            </div>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}

export default Footer360;
