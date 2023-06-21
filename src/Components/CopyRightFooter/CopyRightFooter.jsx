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
import { Box,Grid, makeStyles } from '@material-ui/core';
import Logo from 'Components/Logo';
import config from 'config';
// import SvgFile from 'lib/components/SvgFile';
import mtnIcon from 'Assets/Icons/mtn-logo.svg';

// import Logo from 'Assets/Icons/tecnotree.svg';
// import LogoTech from '../../../public/assets/icons/Tecnotree.svg';
const useStyles = makeStyles((theme) => ({
  logo: {
    //cursor:'pointer',
    width: theme.spacing(15),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '80%',
      height: 'auto',
      marginLeft: '40%'
    }
  },
  footer: {
    backgroundColor: theme.palette.type === 'dark'
    ? `${theme.palette.common.gray} !important`
    :theme.palette.common.black,
    // position: 'fixed',
    // width: '100%',
    // bottom: '0',
    // color: 'white',
    // zIndex: '999'
  },
  footerContainer: {
    height: '50px',
    alignItems: 'center'
    // position: 'relative'
  },
  sponserText: {
    // float: 'right',
    padding: '0px 20px',
    // display: 'flex',
    width: '18rem',
    height: '40px',
    alignItems: 'center',
    display:'flex'
  },
  whiteColor: {
    color: theme.palette.primary.contrastText
  }
}));
const logo = {
  mtn: {
    name: 'mtn-logo-yellow'
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
  }
};
function CopyRightFooter(props) {
  const classes = useStyles();

  const {
    name,
    w = 40,
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
            Ⓒ Copyright {new Date().getFullYear()}. Digital partner Relationship
            Manager
          </p>
        </Grid>
        <Grid item>
          <div className={classes.sponserText}>
            <p style={{ margin: '0px' }} className={classes.whiteColor}>
              {' '}
              Powered By{' '}
              {/* <SvgFile iconName={name} iconHeight={h} iconWidth={w} /> */}
              {/* <img src={LogoTech} style={{ width: '100px' }} /> */}
            </p>
            <Box ml={4} className={classes.logo}>
          {/* <img src={Logo} /> */}
          <Logo />
        </Box>          
          </div>
        </Grid>
      </Grid>
    </footer>
  );
}

export default CopyRightFooter;
