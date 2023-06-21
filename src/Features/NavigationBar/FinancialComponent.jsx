import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import SvgIcon from 'common/components/SvgIcon';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '0em',
    zIndex: 99999
  },
  paper: {
    minWidth: '1em',
    backgroundColor: theme.palette.background.main,
    boxShadow: 'none',
    cursor: 'pointer',
    padding: '48px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    height: '96px',
    width: '96px',
    display: 'flex',
    background: `${theme.palette.icon.menuBackgroundInactive} 0% 0% no-repeat`,
    borderRadius: '20px',
    opacity: 1,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  optionLabel: {
    color: theme.palette.text.textSecondary,
    textAlign: 'center',
    marginTop: '15px',
    lineHeight: '21px'
  },
  optionCurrency: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    textAlign: 'center',
    display: 'inline'
  },
  optionPrice: {
    color: theme.palette.primary.main,
    lineHeight: '32px',
    textAlign: 'center',
    display: 'inline'
  },
  optionDate: { color: theme.palette.text.secondary, extAlign: 'center' },
  optionhover: { color: theme.palette.primary.main },
  activeBar: {
    width: '5.5em',
    backgroundColor: 'transparent',
    height: '5px',
    marginTop: '7px',
    borderRadius: '50px'
  },
  svg: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    verticalAlign: 'baseline',
    paddingTop: 20
  },
  activeIcon: { backgroundColor: theme.palette.primary.main },
  notClickable: { cursor: 'initial' }
});

const FinancialComponent = ({
  classes,
  options,
  onClick,
  active = 0,
  handleSelectedDropDownOption
}) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {options.map((obj, idx) => {
          return obj.map((item, index) => {
            return (
              <Grid item xs={4} sm={2} key={index}>
                <Paper
                  className={`${classes.paper} ${
                    item.clickable ? '' : classes.notClickable
                  }`}
                  onClick={() => {
                    item.clickable && handleSelectedDropDownOption(idx);
                    item.clickable && onClick();
                  }}
                >
                  <div
                    className={`${classes.icon} ${
                      active === idx ? classes.activeIcon : ''
                    }`}
                  >
                    <SvgIcon
                      iconName={item.icon}
                      // iconName="FinancialUnpaidInv" //{item.icon} uncomment this on svg css fix
                      hoverColor={classes.optionhover}
                      iconWidth="960"
                      className={classes.svg}
                    />
                  </div>
                  <span
                    className={`${classes.activeBar} ${
                      active === idx ? classes.activeIcon : ''
                    }`}
                  />
                  <Typography variant="body1" className={classes.optionLabel}>
                    {item.label}
                  </Typography>
                  <span>
                    <Typography
                      variant="body1"
                      className={classes.optionCurrency}
                    >
                      {item.currency}&nbsp;
                    </Typography>
                    {item.price ? (
                      <Typography
                        variant="h2"
                        className={classes.optionPrice}
                        display="inline"
                      >
                        {item.price}
                      </Typography>
                    ) : (
                      <Typography variant="h2" className={classes.optionPrice}>
                        0.00
                      </Typography>
                    )}
                  </span>
                  {item.date && item.price > 0 ? (
                    <Typography variant="body1" className={classes.optionDate}>
                      {item.date}
                    </Typography>
                  ) : null}
                </Paper>
              </Grid>
            );
          });
        })}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(FinancialComponent);
