import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Button, Divider, Grid, Paper } from '@material-ui/core';
import { useStateful } from 'react-hanger';
import FaceIcon from '@material-ui/icons/Face';

//  import { connect } from "react-redux";
// import { ReactComponent as Quick } from "Assets/Icons/quicklinks.svg";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import config from 'config';
const Subscriptiondata = [
  'Add Opportunity',
  'Add Vas',
  'Serivce of Interest Updation',
  'Subscription Modification',
  'Plan Change'
];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  darkText: {
    color: '#000'
  },
  lightText: {
    color: '#fff'
  }
});

const Logout = (props) => {
  const customerReq = useStateful([]);

  // const masterdata = useSelector((state) => state.master.data);
  //   const classes = styles();
  const { classes } = props;
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  React.useState(() => {
    if (props.data) {
      let temp = [];
      const vas = props.data?.customerRequest?.map((item) => {
        if (item.code === 'ModifyPlanProductRequest') {
          let obj = Object.assign({}, item, {
            id: 'productConfiguration',
            payload: { serviceRequestType: 'SUBSCRIPTION_MODIFICATION' }
          });
          temp.push(obj);
        } else if (item.code === 'AddVasProductRequest') {
          let obj = Object.assign({}, item, {
            id: 'Addvas',
            payload: { serviceRequestType: 'ADD_VAS' }
          });
          temp.push(obj);
        } else if (item.code === 'ChangePlanProductRequest') {
          let obj = Object.assign({}, item, {
            id: 'opportunityCreation',
            payload: { serviceRequestType: 'CHANGE_PLAN' }
          });

          temp.push(obj);
          // }else if(item.code==="ChangeOfServiceIdRequest"){
          //   temp.push(item.name)
        }
      });

      //  const addvas= masterdata.customerRequest.map(item==="")
      customerReq.setValue(temp);
    }
  }, [props.data]);

  const handleHelp = () => {
    //  history.push(`${config.basePath}Help`)
    let helpOpen = window.open(`${config.basePath}Help`, '_blank');
    helpOpen.focus();
  };
  return (
    <div className={classes.mainWrapper} onMouseLeave={props.handlemounseCard}>
      <Paper
        elevation={1}
        variant="elevation"
        className={classes.paperContainer}
      >
        <Grid
          container
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs>
            <Grid
              container
              direction="column"
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <FaceIcon
                  style={{
                    color: config.appTheme === 'moments' ? '#000' : ''
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant={config.appTheme === 'moments' ? 'body2' : 'body1'}
                  className={
                    config.appTheme === 'moments'
                      ? classes.darkText
                      : classes.lightText
                  }
                >
                  {props.user}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            fullWidth
            style={{
              width: '160px',
              marginTop: '10px',
              backgroundColor: config.appTheme === 'moments' ? '#000' : '#fff'
            }}
          />
          {/* <Divider fullWidth color="primary" /> */}
          {/* <Grid item>{props.mode==="Dark"?
            <Button startIcon={<SettingsIcon />} onClick={()=>props.handleDarkClose("Dark")}>
              LIGHT THEME
            </Button>: <Button startIcon={<SettingsIcon />} onClick={()=>props.handleDarkClose("light")}>
            DARK THEME
            </Button>}
          </Grid> */}

          <Grid item>
            <Button
              className={
                config.appTheme === 'moments'
                  ? classes.darkText
                  : classes.lightText
              }
              startIcon={<ContactSupportIcon />}
              onClick={handleHelp}
            >
              HELP
            </Button>
          </Grid>
          <Grid item>
            <Button startIcon={<ExitToAppIcon />} onClick={props.onClick}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const styles = (theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    fontWeight: '700',
    // marginLeft: '1rem',
    backgroundColor: 'white',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '14px'
  },
  listItemText: {
    fontWeight: '600'
  },
  mainWrapper: {
    top: theme.spacing(30),
    right: '1rem',
    bottom: 0,
    zIndex: 10,
    position: 'absolute'
    // backgroundColor: theme.palette.common.backdrop
  },
  dividerSpace: {
    backgroundColor: '#ffffff'
  },
  paperContainer: {
    width: 180,
    height: 'auto',
    padding: 0,
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '& .MuiButton-root': {
      padding: 0,
      '& .MuiButton-label': {
        paddingTop: 6,
        paddingBottom: 6,
        color: `${
          config.appTheme === 'moments'
            ? '#000'
            : theme.palette.primary.contrastText
        }`,
        '&:hover': {
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.primary.main
        }
      }
    },
    '& .MuiTypography-body1': {
      color: theme.palette.primary.contrastText
    }
    // marginTop: theme.spacing(3),
    // width: theme.spacing(100),
    // // marginLeft: theme.spacing(85),
    // height: 'fit-content',
    // overflow: 'auto',
    // minHeight: theme.spacing(45),
    // borderRadius: '10px',
    // maxHeight: theme.spacing(195)
  }
  // paperContainer: {
  //   width: 180,
  //   height: 'auto',
  //   padding: 0,
  //   // backgroundColor: theme.palette.primary.black,
  //   // '& .MuiListItem-root': {
  //   //   '& .MuiTypography-body1': {
  //   //     color: theme.palette.primary.contrastText,
  //   //     '&:hover': {
  //   //       color: theme.palette.primary.black
  //   //     }
  //   //   },

  //   //   '&:hover': {
  //   //     '& .MuiTypography-body1': {
  //   //       color: theme.palette.primary.black
  //   //     },
  //   //     backgroundColor: theme.palette.primary.main,
  //   //     color: theme.palette.primary.black
  //   //   }
  //   // }
  //   // marginTop: theme.spacing(3),
  //   // width: theme.spacing(100),
  //   // // marginLeft: theme.spacing(85),
  //   // height: 'fit-content',
  //   // overflow: 'auto',
  //   // minHeight: theme.spacing(45),
  //   // borderRadius: '10px'
  //   // maxHeight: theme.spacing(195)
  // }
  // filterSection: {
  //   marginTop: theme.spacing(5),
  // },
});

export default withStyles(styles)(Logout);
