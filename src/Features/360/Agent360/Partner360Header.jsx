import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import {
  Grid,
  Box,
  makeStyles,
  Avatar,
  Typography,
  Tooltip,
  ClickAwayListener
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Logout from 'Components/Modals/Logout';
import AuthStore from 'Store/Auth';
// import stcBackground from 'Assets/Icons/stcBackground.svg';
// import stcBackgroundLite from 'Assets/Icons/stcBackgroundLite.svg';
import Statuses from 'lib/constants/statuses';

// import setting from 'Assets/Icons/setting.svg';
import thirdparty from 'Assets/Icons/thirdparty.svg';

import { Chip } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import wallet from 'Assets/Icons/wallet.svg';
import { Timer } from '@tt-dcpq/dcpq-common-libs';
import { useHistory } from 'react-router';
// import PhoneIcon from 'Assets/Icons/call.svg';
import config from 'config';
import AuthController from 'Controllers/Auth';
import Quicklink from 'Components/Modals/Quicklink';
import Logo from 'Components/Logo';
import { Trans } from '@lingui/react';
import Setting from 'Components/Setting';
const Partner360Header = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mode, setMode] = React.useState('light');
  const { ThemeType } = useSelector((state) => state.Appearance);
  const dispatch = useDispatch();
  const [openMenu, setmenu] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(!anchorEl);
  };
  const handleClickAway = () => {
    setAnchorEl(false);
  };

  const handleClickAwayy = () => {
    setmenu(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDarkClose = (value) => {
    dispatch(AuthStore.DarkTheme(value));
    setAnchorEl(false);
  };

  const onLogout = () => {
    handleClose();
    AuthController.logout(config.sso);
  };
  const { partnerdetails, balance } = props;

  const handleroute = () => {
    history.push({
      pathname: '/digital-prm-web-ui/hierarchy',
      state: {
        partnerId: props?.PartnerId,
        stepper: false
      }
    });
  };
  const createInitials = (username) => {
    return username ? username.split('')[0].toUpperCase() : '';
  };
  const getStatusColor = (onboard_status) => {
    return Statuses.statuses[onboard_status]?.color || 'orange';
  };
  const isAdmin = () => {
    const Id = _.get(partnerdetails, 'mainlist.partnerId', '...');
    return Id.substring(0, 2) === 'MP';
  };

  const PerformanceStatus = ({status}) => {
    return (
      <>
      {
        status &&
        <Box style={{
          backgroundColor: status.toLowerCase() === 'good' ? '#2ED573' : 
            status.toLowerCase() === 'poor' ? 'red' :
            status.toLowerCase() === 'medium' ? 'yellow' : 'blue',
          width: '100px',
          height: '25px',
          borderRadius: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}><Typography style={{color: 'white', fontSize: '14px',}}>{status}</Typography></Box>
      }
      </>
    )
  }

  return (
    <div
      className={classes.backgrdImg}
    >
      <Box px={8} className={classes.root}>
        <Box py={6} style={{ paddingTop: '0' }}>
          <Grid container direction="column" my={4} spacing={4}>
            <Grid
              container
              spacing={4}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Grid item>
                <Box className={classes.logo}>
        

                  <Logo height={90} width={210} />
                </Box>
              </Grid>
              <Grid item>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  light="true"
                  flexItem="true"
                />
              </Grid>
              <Grid item>
                {/* {isAdmin() ? (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={handleroute}
                >
                  Manage Hierarchy
                </Button>
              ) : (
                ''
              )} */}
                {props?.partnerdetails?.mainlist?.OnboardStatus ===
                  'SUSPENDED' ||
                props?.partnerdetails?.mainlist?.OnboardStatus === 'CLOSED' ? (
                  ''
                ) : (
                  <Button
                    variant="outlined"
                    // color="primary"
                    className={classes.button}
                    onClick={handleroute}
                  >
                    <Trans id="Manage Hierarchy"></Trans>
                  </Button>
                )}
              </Grid>
              <Grid item className={classes.grow}>
                <div />
              </Grid>
              <Grid
                item
                xs={12}
                sm
                container
                spacing={6}
                className={classes.paper}
              >
                <Grid item xs container direction="column"></Grid>

                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                    //paddingRight: '16px'
                  }}
                >

                  <Grid container direction="row" spacing={2} component="Paper">
                  
                    <Timer />
                  </Grid>

                </Grid>
            
                <ClickAwayListener onClickAway={handleClickAwayy}>
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                      //paddingRight: '16px'
                    }}
                  >
                    {/* <Notification /> */}
                    <Tooltip title="Quick Links" placeholder="bottom">
                      <img
                        src={thirdparty}
                        className={classes.img}
                        onClick={() => setmenu(!openMenu)}
                      />
                    </Tooltip>
                  </Grid>
                </ClickAwayListener>
                <></>
                <Grid item>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                        //paddingRight: '1rem'
                      }}
                    >
                      <Tooltip title="Menu" placeholder="bottom">
                        <Avatar
                          className={classes.avatar}
                          onClick={handleMenuOpen}
                        >
                          {createInitials(props.user?.sub)}
                        </Avatar>
                      </Tooltip>
                      {anchorEl && (
                        <Logout
                          open={anchorEl}
                          onClick={onLogout}
                          user={props.user?.sub}
                          handleClose={handleClose}
                          handleDarkClose={handleDarkClose}
                          mode={mode}
                        />
                      )}
                    </Grid>
                  </ClickAwayListener>
                </Grid>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                    //paddingRight: '16px'
                  }}
                >
                  <Setting />
                </Grid>
              </Grid>
            </Grid>

            <Grid item mt={3}>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{ display: 'flex', alignItems: 'center' }}
              y={4}
            >
              <Box>
                <Box
                  container
                  alignItems="center"
                  style={{ marginBottom: '10px', display: 'flex', columnGap: '20px' }}
                >
                  <Box>
                    <Typography variant="h2" className={classes.title}>
                      {_.get(partnerdetails, 'mainlist.partnerName', '...')}-
                      {_.get(partnerdetails, 'mainlist.partnerId', '...')}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      size="small"
                      label={
                        partnerdetails?.details?.AddProduct
                          ? _.get(
                              partnerdetails,
                              'details.AddProduct.ProductDetails.Onboard_Status',
                              ''
                            )
                          : _.get(partnerdetails, 'mainlist.OnboardStatus')
                      }
                      className={
                        partnerdetails?.details?.AddProduct
                          ? classes[
                              getStatusColor(
                                _.get(
                                  partnerdetails,
                                  'details.AddProduct.ProductDetails.Onboard_Status',
                                  ''
                                )
                              )
                            ]
                          : classes[
                              getStatusColor(
                                _.get(
                                  partnerdetails,
                                  'mainlist.OnboardStatus',
                                  ''
                                )
                              )
                            ]
                      }
                      // style={{ minWidth: '6.31rem', marginLeft: '10px' }}
                    />
                  </Box>
                </Box>
                {partnerdetails?.details?.formIdentity !== 'Add_Product' ? (
                  <>
                    <Box style={{display: 'flex', alignItems: 'center', position: 'relative', columnGap: '20px'}}>
                      <Typography
                        variant="caption"
                        className={classes.itemsDetails}
                      >
                        Contract:{' '}
                        {_.get(partnerdetails, 'details.contractCount', '0')} |
                        Products:{' '}
                        {_.get(partnerdetails, 'details.productCount', '0')},
                        Contracts:{' '}
                        {_.get(partnerdetails, 'details.contractCount', '0')}
                        {isAdmin()
                          ? ' | Tenants: ' +
                            _.get(partnerdetails, 'details.tenantCount', '0')
                          : ' '}
                      </Typography>

                      <PerformanceStatus 
                        status={_.get(partnerdetails, 'details.PartnerProfileCreation.PartnerDetails.Performance_Status',)} 
                      />
                    </Box>
                  </>
                ) : (
                  ''
                )}
              </Box>

              {partnerdetails?.details?.formIdentity !== 'Add_Product' ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sm
                    container
                    className={classes.paper}
                    spacing={8}
                  >
                    <Grid item xs container direction="column"></Grid>

                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '25px'
                      }}
                    >
                      <Grid item>
                        {/* <Badge
                    badgeContent={4}
                    color="error"
                    className={classes.badge}
                  >
                    
                  </Badge> */}
                        {/* <img src={invoice} className={classes.notes} /> */}
                      </Grid>
                      <Grid container direction="column">
                        {/* <Typography item fontWeight="bold" className={classes.title}>
                    Tax Document
                  </Typography> */}
                        {/* <Typography item variant="caption" color="error">
                    Not Uploaded
                  </Typography> */}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '16px'
                      }}
                    >
                      <Grid item spacing={5}>
                        {/* <img src={invoice} className={classes.notes} /> */}
                      </Grid>
                      <Grid container direction="column">
                        {/* <Typography item fontWeight="bold" className={classes.title}>
                    Invoice
                  </Typography> */}
                        {/* <Typography item variant="caption" color="error">
                    Not Paid
                  </Typography> */}
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      style={{
                        display: 'flex',
                        // alignItems: 'center',
                        paddingRight: '16px'
                      }}
                    >
                      <Grid item spacing={5}>
                        <Tooltip title="Wallet" placeholder="bottom">
                          <img
                            src={wallet}
                            className={classes.notes}
                            onClick={props.expand.toggle}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid container direction="column">
                        <Typography
                          Typography
                          item
                          fontWeight="bold"
                          className={classes.title}
                        >
                          Wallet
                        </Typography>
                        <Typography item variant="caption">
                          {balance?.currency} {''} :{_.round(_.get(props.balance, 'balance', '0.00'), 2)}                      
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '16px'
                      }}
                    >
                      <Grid item style={{ transform: 'rotate(90)' }}>
                        <ChevronRightIcon />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Box>
        {openMenu && <Quicklink partnerdetails={props.partnerdetails} />}
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.common.white,
    // height: '140px',
  },
  title: {
    fontWeight: '600'
  },
  Chip: {
    color: 'white',
    backgroundColor: '#2ED573'
  },
  paperSpace: {
    '& .MuiMenu-paper': {
      backgroundColor: theme.palette.primary.black,
      padding: 0
    }
  },
  backgrdImg: {
    // background:
    //   theme.palette.type === 'dark'
    //     ? `url('${stcBackgroundLite}')`
    //     : `url('${stcBackground}')`,
    // backgroundRepeat: 'no-repeat',
    // backgroundAttachment: 'fixed',
    // backgroundPosition: 'top right'
  },
  grow: {
    flexGrow: 1
  },
  status: {
    backgroundColor: '#30D973',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    width: '40px'
  },
  logo: {
    width: theme.spacing(50),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      height: 'auto'
    }
  },
  avatar: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: theme.spacing(4)
  },
  img: {
    cursor: 'pointer'
  },
  notes: {
    width: theme.spacing(8),
    marginRight: '10px',
    height: 'auto'
  },
  button: {
    height: '22px',
    color: theme.palette.primary.black,
    padding: '20px 34px',
    '&:hover': {
      backgroundColor: '#1400C8',
      color: theme.palette.common.white
    }
  },
  badge: {
    fontSize: '2px',
    right: '-5px'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  itemsDetails: {
    color: theme.palette.common.black
  }
}));

export default Partner360Header;
