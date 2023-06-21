import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from 'config';
import { makeStyles } from '@material-ui/core/styles';
import SvgFile from 'lib/components/SvgFile';
const styles = makeStyles((theme) => ({
  mr10: {
    marginRight: theme.spacing(10)
  }
}));

const logo = {
  mtn: {
    name: 'mtn-logo',
    w: 80
  },
  stc: {
    name: 'stc-logo',
    w: 70,
    h: 45
  },
  tecnotree: {
    name: 'tt-logo',
    favicon: 'tt-favicon',
    w: 110
  },
  zbahrain: {
    name: 'zbahrain-logo',
    w: 110,
    h: 50
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
const Logo = ({ clickHandler, height = 51, width = 51 }) => {
  const classes = styles();
  const {
    name,
    w = width,
    h = height,
    favicon = name
  } = logo[config.appTheme] || logo['tecnotree'];

  useEffect(() => {
    // document.getElementById(
    //   'favicon'
    // ).href = `${config.basePath}/assets/icons/${favicon}.svg`;
  }, []);
  return (
    <Link to="/">
      <div onClick={()=>localStorage.setItem('selectedSidebarTab', "Home")}>
        <SvgFile iconName={name} iconHeight={h} iconWidth={w} />
      </div>
    </Link>
  );
};

export default Logo;
