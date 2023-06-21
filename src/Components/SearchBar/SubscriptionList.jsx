import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Typography, Avatar } from '@material-ui/core';

import { STATUS_COLOR_VALUES } from './Timelines';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  root: {},
  status: {
    borderRadius: theme.spacing(2),
    border: `${theme.spacing(0.3)} solid`,
    padding: theme.spacing(1, 2),
    color: theme.palette.secondary.contrastText,
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: theme.spacing(8),
    marginLeft: 15
  },
  borderRight: {
    borderRight: `${theme.spacing(0.3)} solid ${theme.palette.text.primary}`
  },
  highlight: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  searchedText: {
    color: theme.palette.primary.main
  },
  ...STATUS_COLOR_VALUES(theme, 'color'),
  avatarPlaceholder: {
    backgroundColor: theme.palette.text.heading,
    width: 48,
    height: 50,
    borderRadius: theme.spacing(20)
  },
  productsSpacing: {
    marginLeft: 10
  },
  iconSize: {
    height: '14px !important',
    display: 'inline',
    color: '#57606f'
  },
  textblod: {
    fontWeight: 'bold'
  }
});
const highlightSearchedText = (classes, value, searchText) => {
  const searchTextStr = searchText || '';
  const indexVal = (value || '')
    .toLowerCase()
    .indexOf(searchTextStr.toLowerCase());
  if (searchTextStr.toLowerCase() === (value || '').toLowerCase()) {
    return <span className={classes.searchedText}>{value}</span>;
  }
  if (indexVal > -1) {
    const splitVal = value.substr(indexVal, searchTextStr.length);
    const valArr = value.split(splitVal);
    return valArr.map((item, idx) => {
      if (item && idx < valArr.length - 1) {
        return (
          <>
            {item}
            <span className={classes.searchedText}>{splitVal}</span>
          </>
        );
      }
      if (item === '') {
        return <span className={classes.searchedText}>{splitVal}</span>;
      }
      return <>{item}</>;
    });
  }
  return value;
};

const SubscriptionList = ({
  classes,
  status,
  accountType,
  mobileNumber,
  mail,
  OppId,
  lob,
  primaryContact,
  // serviceofintrest,
  onCustomerClick,
  fullName,
  identificationId,
  customerId,
  productItem,
  filterName,
  accountId,
  searchText,
  quote,
  customers,
  CRN
}) => {
  const onLinkClick = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    onCustomerClick();
  };
  return (
    <Link href="" onClick={onLinkClick} underline="none">
      <Grid
        container
        direction="row"
        className={classes.root}
        alignItems="center"
      >
        <Grid item xs={1} md={1}>
          <Avatar className={classes.avatarPlaceholder}>
            {/* {fullName &&
              fullName
                .split(' ')
                .splice(0, 2)
                .map(a => a[0])
                .join('')
                .toUpperCase()} */}
          </Avatar>
        </Grid>
        <Grid item xs={11} md={11}>
          <Grid container direction="row">
            <Grid item>
              <Grid container direction="row" spacing={5}>
                {fullName ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      {highlightSearchedText(classes, fullName, searchText)}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};

export default withStyles(styles)(SubscriptionList);
