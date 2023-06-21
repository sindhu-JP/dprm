import React from 'react';
import {
  Box,
  Grid,
  Paper, 
  Typography,
  makeStyles,
  TextField,
  InputAdornment
} from '@material-ui/core';
import _ from 'lodash';
import ProductDetails from './productDetails';
import { useBoolean, useStateful } from 'react-hanger';
import SearchIcon from '@material-ui/icons/Search';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import leads from 'Http/api/leads';
import SearchsubID from 'Components/SubscriptionSearch/SearchsubID';

const SubscriptionCard = ({
  productIdentifier,
  isInServiceRequest,
  isCustomer360,
  handleclickcard,
  selectProduct,
  unselectproduct,
  plan
}) => {
  const classes = useStyles();
  const enableSearch = useBoolean(false);
  const [showLoading, setshowLoading] = React.useState(true);
  const [handleAuth, sethandleAuth] = React.useState(false);
  const [handleOtp, sethandleOtp] = React.useState(false);
  const [searchText, setsearchText] = React.useState('');
  const [isMenuOpen, setisMenuOpen] = React.useState(false);
  const [relatedParty, setrelatedParty] = React.useState('');
  const customers = useStateful([]);
  const getSearch = async (res) => {
    const Details = await leads.getSearchCustomerdetails(
      _.get(res, '[0].customer.customerId', '')
    );
    if (Details) {
      let temp = [];
      let relatedParty = Details[0].relatedParty.map((item) => {
        if (item.role === 'ProfileOwner') {
          temp.push(item);
        }
      });

      setrelatedParty(_.get(temp, '[0]', ''));
    }
    customers.setValue(res);
    setisMenuOpen(true);
  };

  const keyPressed = async (event) => {
    const { value } = event.target;

    setsearchText(event.target.value);
    setisMenuOpen(false);
    // set(true)
    if (value.length >= 3) {
      setshowLoading(true);
      const res = await leads.searchsubscription({
        keyword: event.target.value
      });
      if (res?.length >= 0) {
        customers.setValue(res);
        setisMenuOpen(true);
      }
      //  set(true)
    }
  };
  const handleSearchResult = async (data, customers) => {
    selectProduct(data, customers);
    setsearchText('');
    enableSearch.toggle();
    // history.push({
    //   pathname: "/dlpm-web-ui/360",
    //   state: { detail: data },
    // });
  };
  const handleclear = () => {
    enableSearch.toggle();
    setsearchText('');
  };

  return (
    <Paper elevation={0} className={classes.paperh}>
      <Box p={4}>
        <Box mb={4} py={5}>
          <Grid container direction="row" spacing={4}>
            <Grid item>{/* <Refrel /> */}</Grid>
            <Grid>
              <Typography variant="h2">Select Subscription</Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={4}>
                  <>
                    <Grid item>
                      {/* <img src={img} className={classes.imglog} /> */}
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" className={classes.title}>
                        Total Subscription:2
                      </Typography>
                    </Grid>
                  </>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  spacing={4}
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <Grid item>
                        {enableSearch.value ? (
                          <Grid item>
                            <TextField
                              style={{ width: '400px' }}
                              id="standard-basic"
                              fullWidth
                              value={searchText}
                              onChange={keyPressed}
                              // placeholder="Search by Quote ID, Name"

                              InputProps={{
                                disableunderline: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon
                                      fontSize="small"
                                      className={classes.iconSearch}
                                    />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CloseOutlinedIcon
                                      fontSize="large"
                                      className={classes.iconSearch}
                                      onClick={handleclear}
                                    />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                        ) : (
                          <SearchIcon
                            fontSize={'large'}
                            onClick={enableSearch.toggle}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* taxdocument */}
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <Grid item>
                        {/* <img src={filter} onClick={handleMenuOpen} /> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* tax end */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {Object.keys(productIdentifier).length > 0 ? (
          <Box py={10}>
            <Grid item xs={12}>
              <ProductDetails
                data={productIdentifier}
                unselectproduct={unselectproduct}
              />
            </Grid>
          </Box>
        ) : (
          ''
        )}

        <Box py={10}>
          <Grid item mt={10}>
            {/* <SearchsubID/> */}

            {customers.value.length >= 0 && isMenuOpen ? (
              <SearchsubID
                // closeModal={clearSearch}
                relatedParty={relatedParty}
                customers={customers.value}
                searchText={searchText}
                showLoading={showLoading}
                // handleAuthDialog={handleAuthDialog}
                handleSearchResult={handleSearchResult}
              />
            ) : (
              // <Menu
              //   customers={customers.value}
              //   searchText={searchText}
              //   showLoading={showLoading}
              // />
              <>{/* <Typography>Loading...</Typography> */}</>
            )}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

SubscriptionCard.defaultProps = {
  customer: [],
  isInServiceRequest: false,
  isCustomer360: false,
  isrequestTab: false,
  isHomePage: true,
  isSkipUserAuthorization: false
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  },
  seperatorv1: {
    width: ' 0.01rem',
    height: '97px',
    backgroundColor: '#404040',
    opacity: '1',
    marginLeft: '15px'
  },
  paperh: {
    minHeight: '30rem',
    maxHeight: '50rem',
    overflowY: 'auto'
  },
  root: {
    width: theme.spacing(65),
    minHeight: '18rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    maxHeight: '25rem'
  },
  embedded: {
    display: 'block',
    width: '100%',
    height: '100'
  },
  closeIcon: {
    width: theme.spacing(8),
    cursor: 'pointer',
    color: theme.palette.text.primary
  },
  button: {
    backgroundColor: theme.palette.common.white
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  selectText: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    width: theme.spacing(4),
    color: theme.palette.common.silver,
    '& svg': {
      path: theme.palette.common.silver
    },
    '& path': {
      path: theme.palette.common.silver
    }
  },
  iconSearch: {
    cursor: 'pointer'
  },
  image: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden'
  },

  drawer: {
    backgroundColor: theme.palette.background.main
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(4)
  }
}));
export default SubscriptionCard;
