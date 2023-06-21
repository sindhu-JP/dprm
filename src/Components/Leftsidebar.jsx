import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Logo from 'Assets/Icons/Logo.svg';

import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  root: {
    //   backgroundColor: theme.palette.common.white,
    height: '50px'
  },
  logo: {
    width: '18rem',
    '& img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      marginLeft: '2rem',
      height: 'auto',
      overflow: 'hidden'
    }
  },

  img: {
    cursor: 'pointer'
  }
});

export default function LeftSideDrawer({ open, handleleave, handleRoute }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      //   className={clsx(classes.list, {
      //     [classes.fullList]: anchor === 'top' || anchor === 'bottom',.
      //   })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={'left'} open={open} onClose={handleleave} width={400}>
            <div>
              <Box py={4}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Box className={classes.logo}>
                      <img src={Logo} style={{ width: '180px' }} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box py={6}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.root}
                >
                  {/* <ListItem button onClick={() => history.push("/")}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => history.push("/digital-prm-web-ui/requests")}
                  >
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Service  Requests" />
                  </ListItem> */}

                  {/* <ListItem
                    button
                    onClick={() =>
                      history.push({
                        pathname: "/digital-prm-web-ui/forms",
                        state: {
                          formIdentity: "Partner_Profile",
                          // stepId: "PartnerProfileCreation",
                        },
                      })
                    }
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Master Partner" />
                  </ListItem> */}

                  {/* <ListItem
                    button
                    onClick={() =>
                      history.push({
                        pathname: "/digital-prm-web-ui/forms1",
                        state: {
                          formIdentity: "Add_Product",
                          // stepId: "AddProduct",
                        },
                      })
                    }
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Product Form" />
                  </ListItem> */}

                  {/* <ListItem
                    button
                    onClick={() =>
                      history.push({
                        pathname: "/digital-prm-web-ui/forms2",
                        state: {
                          formIdentity: "Add_Contract",
                          // stepId: "AddContractFor",
                        },
                      })
                    }
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Add Contract" />
                  </ListItem> */}

                  {/* <ListItem
                    button
                    onClick={() =>
                      history.push({
                        pathname: "/digital-prm-web-ui/forms4",
                        state: {
                          formIdentity: "Contract_Sign_Off",
                          // stepId: "AddContractFor",
                        },
                      })
                    }
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Contract signOff" />
                  </ListItem> */}

                  {/* <ListItem
                    button
                    onClick={() =>
                      history.push({
                        pathname: "/digital-prm-web-ui/forms3",
                        state: {
                          formIdentity: "Tenant_Partner_Profile",
                          // stepId: "PartnerProfileCreation",
                        },
                      })
                    }
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Tenent Partner" />
                  </ListItem> */}
                  {/* <ListItem
                    button
                    onClick={() => {
                      history.push({
                        pathname: '/digital-prm-web-ui/hierarchy',
                        state: {
                          partnerId: '',
                          adminUser: 'dprmAdminUser'
                        }
                      });
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Hierarchy" />
                  </ListItem> */}
                  {/*Contract Details*/}
                  {/* <ListItem
                    button
                    onClick={() =>
                      history.push("/digital-prm-web-ui/contracts")
                    }
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contract Details" />
                  </ListItem> */}
                  {/* <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem> */}
                </List>
              </Box>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
