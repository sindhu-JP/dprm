import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { Trans } from '@lingui/react';
import { STATUS_COLOR_VALUES } from './Timelines';
import Link from '@material-ui/core/Link';
import classNames from 'classnames';
import VerticalSeparator from './VerticalSeparator';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import ProductIcon from 'Assets/Icons/ProductIcon.svg';
import product from 'Assets/Icons/product.svg';
import tenant from 'Assets/Icons/TenantPartner.svg';
const styles = (theme) => ({
  root: {
    marginBottom: '15px',
    border: '1px solid #ced4da',
    padding: '10px 0 10px 10px',
    borderRadius: '10px'
  },
  status: {
    borderRadius: theme.spacing(4),
    border: `${theme.spacing(0.3)} solid`,
    padding: theme.spacing(1, 4),
    // color: theme.palette.success.main,
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: theme.spacing(8),
    marginLeft: 15,
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
    height: '16px !important',
    display: 'inline',
    color: '#57606f'
  },
  icon: {
    height: '18px !important',
    display: 'inline',
    color: '#57606f',
    marginTop: '2px'
  },
  textblod: {
    fontWeight: 'bold'
  },
  img: {
    width: '20px'
  },
  ACTIVE: {
    color: '#ffffff',
    backgroundColor: '#2ED573',

  },
  PENDING: {
    
    color: '#ffffff',
    backgroundColor: theme.palette.warning.main
  },
  Approved: {
    color: '#ffffff',
    backgroundColor: theme.palette.success.main
  },
  email: {
    display: 'flex',
    alignItems: 'center',

    '& > *:last-child': {
      marginLeft: '5px'
    }
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
const SearchCustomerListItem = ({
  classes,
  status,
  accountType,
  mobileNumber,
  mail,
  leadId,
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
  CRN,
  lob,
  technology,
  partnerId,
  productCount,
  tenantCount,
  contractCount
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
                    <Typography
                      variant="body1"
                      display="inline"
                      style={{ fontSize: '0.8125rem' }}
                      // variant="caption"
                      className={classNames(classes.status, classes[status])}
                    >
                      {highlightSearchedText(classes, status, searchText)}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {leadId ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="Partner ID"></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(classes, leadId, searchText)}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {lob ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="LOB"></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(classes, lob, searchText)}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}
                {technology ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="Product Technology"> </Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(classes, technology, searchText)}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {partnerId ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="Partner ID "></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(classes, partnerId, searchText)}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {CRN ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="Company RegNo"></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(classes, CRN, searchText)}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {quote ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="Quote ID"></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(classes, quote, searchText)}
                      </span>
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid container direction="row" spacing={5}>
                {primaryContact ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="Primary Contact"></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(
                          classes,
                          primaryContact,
                          searchText
                        )}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {identificationId ? (
                  <Grid item>
                    <Typography variant="h6" display="inline">
                      <Trans id="National ID"></Trans>:{'  '}
                      {highlightSearchedText(
                        classes,
                        identificationId,
                        searchText
                      )}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {/* {accountType ? (
                  <Grid item>
                    <Typography variant="body1" display="inline">
                      <Trans>Customer Type</Trans>:
                    </Typography>{' '}
                    <Typography
                      variant="body1"
                      className={
                        filterName === 'category' ? classes.highlight : ''
                      }
                      display="inline"
                    >
                      {highlightSearchedText(classes, accountType, searchText)}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null} */}

                {mobileNumber ? (
                  <Grid item>
                    <PhoneIcon className={classes.iconSize} />

                    <Typography
                      variant="h6"
                      display="inline"
                      className={
                        filterName === 'contact' ? classes.highlight : ''
                      }
                    >
                      {highlightSearchedText(classes, mobileNumber, searchText)}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {mail ? (
                  <Grid item className={classes.email}>
                    <EmailIcon className={classes.iconSize} />
                    <Typography
                      variant="h6"
                      className={
                        filterName === 'email' ? classes.highlight : ''
                      }
                      display="inline"
                    >
                      {highlightSearchedText(classes, mail, searchText)}
                    </Typography>
                  </Grid>
                ) : null}

                {/* {productItem && (
                  <Grid item>
                    {productItem.accountId && (
                      <>
                        <VerticalSeparator />
                        <Typography
                          variant="body1"
                          className={classNames(classes.productsSpacing)}
                          display="inline"
                        >
                          <Trans> Account</Trans>:{' '}
                          {highlightSearchedText(
                            classes,
                            productItem.accountId,
                            searchText
                          )}
                        </Typography>
                      </>
                    )}
                    <VerticalSeparator />
                    <Typography
                      variant="body1"
                      className={classNames(classes.productsSpacing)}
                      display="inline"
                    >
                      <Trans>Service ID</Trans>: {productItem.publicIdentifier}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classNames(classes.status, classes[status])}
                    >
                      {productItem.status}
                    </Typography>
                  </Grid>
                )} */}
              </Grid>

              {/*    count */}

              <Grid container direction="row" spacing={5}>
                {contractCount ? (
                  <Grid item>
                    <img src={ProductIcon} />
                    &nbsp;&nbsp;
                    <Typography variant="h6" display="inline">
                      <Trans id="Contract Count"></Trans>:{'  '}
                      <span style={{ fontWeight: '600' }}>
                        {highlightSearchedText(
                          classes,
                          contractCount,
                          searchText
                        )}
                      </span>
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {productCount ? (
                  <Grid item>
                    <img src={product} style={{ height: '18px' }} />{' '}
                    &nbsp;&nbsp;
                    <Typography variant="h6" display="inline">
                      <Trans id="Product Count"></Trans>:{'  '}
                      {highlightSearchedText(classes, productCount, searchText)}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}
                {tenantCount ? (
                  <Grid item>
                    <img src={tenant} className={classes.img} />
                    &nbsp;&nbsp;
                    <Typography variant="h6" display="inline">
                      <Trans id="Tenant Count"></Trans>:{'  '}
                      {highlightSearchedText(classes, tenantCount, searchText)}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null}

                {/* {accountType ? (
                  <Grid item>
                    <Typography variant="body1" display="inline">
                      <Trans>Customer Type</Trans>:
                    </Typography>{' '}
                    <Typography
                      variant="body1"
                      className={
                        filterName === 'category' ? classes.highlight : ''
                      }
                      display="inline"
                    >
                      {highlightSearchedText(classes, accountType, searchText)}
                    </Typography>
                    <VerticalSeparator />
                  </Grid>
                ) : null} */}

                {/* {mail ? (
                  <Grid item>
                    <EmailIcon className={classes.iconSize} />
                    <Typography
                      variant="h6"
                      className={
                        filterName === 'email' ? classes.highlight : ''
                      }
                      display="inline"
                    >
                      {highlightSearchedText(classes, mail, searchText)}
                    </Typography>
                  </Grid>
                ) : null} */}

                {/* {productItem && (
                  <Grid item>
                    {productItem.accountId && (
                      <>
                        <VerticalSeparator />
                        <Typography
                          variant="body1"
                          className={classNames(classes.productsSpacing)}
                          display="inline"
                        >
                          <Trans> Account</Trans>:{' '}
                          {highlightSearchedText(
                            classes,
                            productItem.accountId,
                            searchText
                          )}
                        </Typography>
                      </>
                    )}
                    <VerticalSeparator />
                    <Typography
                      variant="body1"
                      className={classNames(classes.productsSpacing)}
                      display="inline"
                    >
                      <Trans>Service ID</Trans>: {productItem.publicIdentifier}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classNames(classes.status, classes[status])}
                    >
                      {productItem.status}
                    </Typography>
                  </Grid>
                )} */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};

export default withStyles(styles)(SearchCustomerListItem);
