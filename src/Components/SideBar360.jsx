import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import { history } from 'Store';
import { useBoolean } from 'react-hanger';

import { Avatar } from '@material-ui/core';
// import LeftDrawer from './LeftDrawer';
import icon from 'Assets/Icons/company.svg';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

import { ListItemIcon } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import product from 'Assets/Icons/product.svg';
import tenant from 'Assets/Icons/TenantPartner.svg';

const useStyles = makeStyles((theme) => ({
  themeColorBackground: {
    background:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.white} 0% 0% no-repeat padding-box !important`
        : `${theme.palette.primary.black} 0% 0% no-repeat padding-box`
  },
  iconName: {
    textTransform: 'capitialize'
  },
  chip: {
    background: 'red',
    color: 'white',
    marginLeft: '11px',
    width: '28px',
    height: '15px',
    marginTop: '1px'
  },
  logo: {
    width: theme.spacing(15),
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '60%',
      height: 'auto',
      marginLeft: '40%'
    }
  },
  cbtn: {
    display: 'block',
    width: '80%',
    // maxWidth:,
    margin: '0 auto',
    padding: theme.spacing(7, 0)
  },
  buttonActive: {
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.common.black,
    background: theme.palette.common.selectedGray
  },
  dashboardIcon: {
    fontSize: theme.spacing(6),
    color: theme.palette.common.black
  },
  text: {
    color: '#FFFFFF'
  },
  title: {
    color: theme.palette.common.black
  },
  menuIcon: {
    textAlign: 'center',
    // marginTop: '20px',
    cursor: 'pointer'
  },
  menuIconItem: {
    fontSize: '26px'
  },
  menucolor: {
    backgroundColor: '#1C1EC8',
    height: '162px'
  },
  menuSearch: {
    backgroundColor: '#2CFEE8',
    height: '50px'
  },
  img: {
    width: '19px'
  }
  // root: {
  //   '&$selected': {
  //     backgroundColor: '#1400C8',
  //     borderLeft: '5px solid #1400C8',
  //     '&:hover': {
  //       backgroundColor: 'red',
  //       borderLeft: '5px solid #1400C8'
  //     }
  //   }
  // }
}));
const SideBar360 = (props) => {
  const classes = useStyles();

  const showDrawer = useBoolean(false);
  const handleMouse = () => showDrawer.setTrue();
  const handleleave = () => showDrawer.setFalse();

  const [value, setvalue] = React.useState(1);
  const handlRoute = (pathname) => {
    history.push({
      pathname: pathname
    });
    showDrawer.setFalse();
  };

  const { partnerdetails } = props;

  const handleListItemClick = (value) => {
    setvalue(value);
  };

  // const ListItem = withStyles({
  //   root: {
  //     '&$selected': {
  //       backgroundColor: 'red',
  //       color: 'white',
  //       '& .MuiListItemIcon-root': {
  //         color: 'white'
  //       }
  //     },
  //     '&$selected:hover': {
  //       backgroundColor: 'purple',
  //       color: 'white',
  //       '& .MuiListItemIcon-root': {
  //         color: 'white'
  //       }
  //     },
  //     '&:hover': {
  //       backgroundColor: 'blue',
  //       color: 'white',
  //       '& .MuiListItemIcon-root': {
  //         color: 'white'
  //       }
  //     }
  //   },
  //   selected: {}
  // })(MuiListItem);
  return (
    <div
      style={{ height: '60%' }}
      className={classNames(classes.themeColorBackground, 'sideMenuBar')}
      onMouseLeave={handleleave}
    >
      <Box py={6} px={2} className={classes.menucolor}>
        <Grid item>
          <Box className={classes.logo}>{/* <img src={Logo}  /> */}</Box>
        </Grid>
        <Grid item onMouseOver={handleMouse}>
          <Box className={classes.menuIcon}>
            <Box py={1}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <Avatar
                    style={{
                      height: '50px',
                      width: '50px',
                      backgroundColor: '#D8E2EF'
                    }}
                  >
                    <img alt="Remy Sharp" src={icon}></img>
                  </Avatar>
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1" className={classes.text}>
                    {`${_.get(
                      partnerdetails,
                      'mainlist.partnerName',
                      '...'
                    ).substring(0, 5)}...`}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body2" className={classes.text}>
                    {_.get(partnerdetails, 'mainlist.partnerId', '...')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item></Grid>
      </Box>

      <Box>
        <List component="nav" aria-label="main mailbox folders">
          {props.hideProducts && (
            <ListItem
              button
              classes={{ root: classes.root, selected: classes.selected }}
              selected={props.TabsName === 'Products'}
              onClick={() => props.handleTabs('Products')}
            >
              <ListItemIcon>
                <img src={product} style={{ height: '18px' }} />
                <Chip
                  label={_.get(partnerdetails, 'details.productCount', '0')}
                  color="error"
                  className={classes.chip}
                  size="small"
                />
              </ListItemIcon>
              {/* <ListItemText primary="Cash" /> */}
            </ListItem>
          )}
          {props.hideTenant && (
            <ListItem
              classes={{ root: classes.root, selected: classes.selected }}
              // selected
              button
              // selected={vaulue === 2}
              selected={props.TabsName === 'Tenants'}
              onClick={() => props.handleTabs('Tenants')}
            >
              <ListItemIcon>
                <img src={tenant} className={classes.img} />
                <Chip
                  label={_.get(partnerdetails, 'details.tenantCount', '0')}
                  color="error"
                  className={classes.chip}
                  size="small"
                />
              </ListItemIcon>
            </ListItem>
          )}
        </List>
      </Box>

      {/* <LeftDrawer
        handleRoute={handlRoute}
        open={showDrawer.value}
        handleleave={handleleave}
        handleTabs={props.handleTabs}
        showDrawer={showDrawer}
        hideProducts={props.hideProducts}
         hideTenant={props.hideTenant}
        partnerdetails={partnerdetails}
      /> */}
    </div>
  );
};

// Sidebar.propTypes = {};
// export default Sidebar;

// import React from "react";
// import PropTypes from "prop-types";
// import { Box, makeStyles } from "@material-ui/core";

// const Sidebar = (props) => {
//   const classes = useStyles();

//   return (
//     <Box px={8} className={classes.root}>
//       hello
//     </Box>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "#333333",
//     minHeight: "100vh",
//   },
// }));

SideBar360.propTypes = {};
export default SideBar360;
