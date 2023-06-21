import React from 'react';
import SVG from 'react-inlinesvg';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import config from 'config';
import urlJoin from 'url-join';

const styles = (theme) => {
  return {
    icon: {
      verticalAlign: 'middle',
      '& ': {
        height: (props) => props.iconHeight || props.iconWidth || 24,
        width: (props) => props.iconWidth || 24,
        fill: (props) => props.iconColor || theme.palette.common.white
      },
      '&:hover': {
        fill: (props) => props.hoverColor || theme.palette.icon.filled
      }
    }
  };
};

const SvgIcon = (props) => {
  const { classes } = props;
  const { iconName } = props;
  const src = urlJoin(config.basePath, 'assets/icons', `${iconName}.svg`);
  return (
    <SVG
      src={src}
      // cacheGetRequests
      cacheRequests
      className={classNames(classes.icon, props.className)}
    />
  );
};

export default withStyles(styles)(SvgIcon);
