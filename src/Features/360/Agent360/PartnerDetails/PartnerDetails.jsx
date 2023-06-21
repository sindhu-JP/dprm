import React, { useState, Fragment, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-scroll';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useStateful } from 'react-hanger';
import PartnerDetailsview from 'Features/LeadDetails/PartnerDetails';
import AgentDetails from '../OrderDetails/AgentDetails';
const ListItemLink = (props) => <ListItem button component="a" {...props} />;
import CameltoSpace from 'Factory/Partner';
const PartnerDetails = (props) => {
  const [selectedRow, setSelectedRow] = useState(0);
  // const [scroll, setScroll] = useState('');
  // let items = [];
  const classes = useStyles();
  const details = React.createRef();
  const address = React.createRef();
  const billing = React.createRef();
  const scroll = React.createRef();
  const leftsidemenu = useStateful([]);

  // const handleListItemClick = (event, index, name) => {
  //   setSelectedRow(index);
  //   setScroll(id);
  //   scroll.current.scrollIntoView({ behavior: 'smooth' });

  // };

  const myRef = useRef([]);
  const executeScroll = (index, value) => scrollToRef(index, value);
  const handleListItemClick = (index, name) => {
    setSelectedRow(index);
    let items = {};
    const domNode = ReactDOM.findDOMNode(items[name]);
    if (domNode) {
      domNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        top: '100px'
      });
    }

    // if (scrollRef.current) {
    //   scrollRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'nearest'
    //   });
    // }
  };

  React.useEffect(() => {
    if (props.partnerdetails) {
      let temp = [];

      const { details } = props.partnerdetails;
      _.map(
        details?.ResellerProfileCreation?.sections,
        (item) => {
          temp.push({
            name: item,
            sectionId: item,
            // icon:,
            id: item
          });
        }
      );

      leftsidemenu.setValue(temp);
    }
  }, [props.partnerdetails]);
  const fulldetails = {
    createdBy: props?.user?.sub,
    date: props.partnerdetails?.details?.createdDate,

    cannelName: 'DPRM'
  };

  const scrollToRef = (index, value) => {
    if (myRef.current[index]) {
      // myRef.current.scrollIntoView({
      //     behavior: 'smooth',
      //     block: 'center'
      //   });
      myRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const FetchTitles = (data) => {
    return data.filter((title) => title.name !== 'AddAnotherContact');
  };

  const sideMenuTitles = React.useMemo(
    () => FetchTitles(leftsidemenu.value),
    [leftsidemenu]
  );

  return (
    <Grid container spacing={6} className={classes.root}>
      {/* Sidebar Start */}
      <Grid item xs={12} md={3}>
        <Paper elevation={0} variant="elevation" className={classes.sideBar}>
          <div>
            <List className={classNames('pt0', 'pb0')}>
              {sideMenuTitles.map((item, index) => (
                <Fragment key={index}>
                  <Link
                    className={classes.ListItem}
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-150}
                    duration={500}
                  >
                    <ListItemLink
                      component="a"
                      onClick={() => {
                        handleListItemClick(index, item.name),
                          executeScroll(index, item.name);
                      }}
                      selected={selectedRow === index}
                      className={classNames(
                        classes.listItem,
                        selectedRow === index ? classes.selectedLink : null
                      )}
                      style={{ fontWeight: 'bold' }}
                    >
                      <ListItemIcon
                        className={classNames(
                          classes.listItemIcon,
                          selectedRow === index ? classes.selectedRow : ''
                        )}
                      >
                        {/* <img
                                 src={item.icon}
                                 className={classes.iconsize}
                               /> */}
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            gutterBottom
                            variant="body1"
                            className={classNames(
                              classes.listItemText,
                              selectedRow === index ? classes.selectedRow : null
                            )}
                          >
                            {CameltoSpace.getCameltoSpace(item.name)}
                          </Typography>
                        }
                      />
                    </ListItemLink>
                  </Link>

                  {index !== sideMenuTitles.length - 1 && (
                    <Divider className={classes.divider} />
                  )}
                </Fragment>
              ))}
            </List>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={9} className={classes.overFlow}>
        <Grid container spacing={6} className={classes.overFlow}>
          {props.partnerdetails.details?.ResellerProfileCreation &&
            props.partnerdetails.details.ResellerProfileCreation?.sections?.map(
              (item, index) => {
                return (
                  <Grid item xs={12}>
                    <div id={item} ref={(ref) => (myRef.current[index] = ref)}>
                      <PartnerDetailsview
                        title={item}
                        partnerDetails={
                          props.partnerdetails.details.ResellerProfileCreation
                        }
                        Edit={true}
                        partnerFulldetails={props.partnerdetails.details}
                        status={
                          props.partnerdetails?.details?.ResellerProfileCreation
                            ?.DealerDetails?.Onboarding_Status
                        }
                      />
                    </div>
                  </Grid>
                );
              }
            )}

          {props.partnerdetails.details?.TenantProfileCreation?.sections?.map(
            (item, index) => {
              return (
                <Grid item xs={12}>
                  <div id={item} ref={(ref) => (myRef.current[index] = ref)}>
                    <PartnerDetailsview
                      title={item}
                      partnerDetails={
                        props.partnerdetails.details?.TenantProfileCreation ||
                        {}
                      }
                    />
                  </div>
                </Grid>
              );
            }
          )}
          {props.partnerdetails.details?.AddProduct?.sections?.map(
            (item, index) => {
              return (
                <Grid item xs={12}>
                  <div id={item} ref={(ref) => (myRef.current[index] = ref)}>
                    <PartnerDetailsview
                      title={item}
                      partnerDetails={
                        props.partnerdetails.details?.AddProduct || {}
                      }
                    />
                  </div>
                </Grid>
              );
            }
          )}
          {props.partnerdetails.details?.AddProduct ? (
            <></>
          ) : (
            <Grid item xs={12}>
              <AgentDetails agentdetails={fulldetails} channelName="DPRM" />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '1rem'
  },
  sideBar: {
    position: 'sticky',
    // top: '75px',
    padding: '0.65rem 0'
  },
  iconsize: {
    width: '22px',
    height: '20px'
  },
  selectedRow: {
    // color: theme.palette.primary.main
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.white} !important`
        : `${theme.palette.primary.main} !important`
    // borderRight: `5px solid ${theme.palette.primary.main}`
  },
  selectedLink: {
    fill: theme.palette.primary.main,
    fontWeight: 'bold',
    borderRight:
      theme.palette.type === 'dark'
        ? `8px solid ${theme.palette.common.white}`
        : `8px solid ${theme.palette.primary.main}`,
    backgroundColor:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.main} !important`
        : `#ebebeb !important`
  },
  listItemText: {
    color: theme.palette.primary.black,
    fontWeight: 'bold'
  },
  listItemIcon: {},
  listItem: {
    fontWeight: 'bold',
    '&:hover': {
      background:
        theme.palette.type === 'dark'
          ? `#aaaaaa !important`
          : `${theme.palette.common.white} !important`,
      color: '#4933D3'
    },
    '&:hover $listItemText': {
      color: theme.palette.primary.main
      // color:"#4933D3"
    },
    '&:hover $listItemIcon': {
      fill: theme.palette.primary.main
      // color:"#4933D3".
    }
  },
  divider: {
    height: 4,
    backgroundColor: theme.palette.background.default
  },
  overFlow: {
    // overflowX: 'scroll'
  },
  headerName: {
    color: theme.palette.text.secondary
  },
  contentName: {
    color: theme.palette.text.primary
  },
  headerTitle: {
    color: theme.palette.text.primary,
    textAlign: 'left',
    letterSpacing: 0,
    marginLeft: theme.spacing(4)
  },
  rootSpacing: {
    marginBottom: theme.spacing(6)
  },
  saveButton: {
    width: 92,
    height: 40,
    borderRadius: 8,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  cancelButton: {
    width: 92,
    height: 40,
    marginRight: theme.spacing(6),
    background: 'transparent',
    '&:hover': {
      background: 'transparent'
    }
  },
  sectionTitle: {
    color: theme.palette.common.gray
  },
  modalRootTitle: {
    display: 'none'
  },
  dialogClassName: {
    padding: theme.spacing(12, 32)
  },
  checkCircle: {
    display: 'block',
    margin: '0 auto',
    width: theme.spacing(32),
    height: theme.spacing(32),
    fill: theme.palette.success.main,
    textAlign: 'center'
  },
  modalTitle: {
    color: theme.palette.success.main,
    textAlign: 'center'
  },
  dialogContent: {
    width: '100%'
  },
  warningIcon: {
    fill: theme.palette.error.main
  },
  boxShadow: {
    boxShadow: `0px 0px 6px ${theme.palette.common.grayShadow}`,
    borderRadius: theme.spacing(4)
  },
  buttonProgress: {
    position: 'absolute',
    color: theme.palette.success.main
  },
  text: {
    color: theme.palette.primaryMain
  }
}));
export default PartnerDetails;
