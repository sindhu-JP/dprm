import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import { Trans } from '@lingui/react';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useStateful } from 'react-hanger';
import { history } from 'Store';

import Modals from 'Store/Modals';
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
  }
});

const Quicklink = (props) => {
  const customerReq = useStateful([]);
  const dispatch = useDispatch();

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
console.log(props?.partnerdetails?.mainlist?.OnboardStatus,'jjjjjjjj')
  return (
    <div className={classes.mainWrapper} onMouseLeave={props.handlemounseCard}>
      <Paper
        elevation={1}
        variant="elevation"
        className={classes.paperContainer}
      >
        <Grid item>
          <Typography variant="h5" className={classes.title}>
            Quick Links
          </Typography>
          <List>
            {!props?.partnerdetails?.mainlist?.OnboardStatus ===
              'suspended' || !props?.partnerdetails?.mainlist?.OnboardStatus === 'CLOSED' && (
              <ListItem
                button
                onClick={() =>
                  dispatch(
                    Modals.open({
                      id: 'BillingAdjustment',
                      context: {
                        partner: props.partnerdetails
                      }
                    })
                  )
                }
              >
                <ListItemText>Billing Adjustment </ListItemText>
              </ListItem>
            )}
            {!props?.partnerdetails?.mainlist?.OnboardStatus ===
              'suspended' || !props?.partnerdetails?.mainlist?.OnboardStatus === 'CLOSED' && (
              <ListItem
                button
                onClick={() => {
                  history.push({
                    pathname: '/digital-prm-web-ui/updateCommissionRule',
                    state: {
                      details: props.partnerdetails
                    }
                  });
                }}
              >
                <ListItemText>Change Commission Rule </ListItemText>
              </ListItem>
            )}
            {props?.partnerdetails?.mainlist?.OnboardStatus === 'ACTIVE' && (
              <ListItem
                button
                onClick={() => {
                  history.push({
                    pathname: `/digital-prm-web-ui/suspension`,
                    state: {
                      partnerDetails:
                        props.partnerdetails?.details?.PartnerProfileCreation ||
                        props.partnerdetails?.details?.TenantProfileCreation
                    }
                  });
                }}
              >
                <ListItemText>
                  <Trans id="Suspend Partner/Tenant"></Trans>
                </ListItemText>
              </ListItem>
            )}
            {props?.partnerdetails?.mainlist?.OnboardStatus?.toLowerCase() ===
              'suspended' && (
              <ListItem
                button
                onClick={() => {
                  history.push({
                    pathname: `/digital-prm-web-ui/revoke`,
                    state: {
                      partnerDetails:
                        props.partnerdetails?.details?.PartnerProfileCreation ||
                        props.partnerdetails?.details?.TenantProfileCreation
                    }
                  });
                }}
                // onClick={handleClickOpenRevokePartner}
              >
                <ListItemText>
                  <Trans id="Revoke Suspension"></Trans>
                </ListItemText>
              </ListItem>
            )}
             {props?.partnerdetails?.mainlist?.OnboardStatus === 'CLOSED' && (
            <List>
              <ListItem>
                <ListItemText className={classes.subTitle}>
                  No Quick links
                </ListItemText>
              </ListItem>
            </List>
          )}

            {/* {props?.partnerdetails?.mainlist?.OnboardStatus?.toLowerCase() ===
              'closed' && (
              <ListItem
                button
                onClick={() =>
                  dispatch(
                    Modals.open({
                      id: 'onReOpenAccountHandle',
                      context: {
                        partner: props.partnerdetails
                      }
                    })
                  )
                }
              >
                <ListItemText>
                  <Trans id="Re-Active Account"></Trans>
                </ListItemText>
              </ListItem>
            )} */}
          </List>
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
    fontWeight: '600',
    // marginLeft: '1rem',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '14px',
    backgroundColor: theme.palette.background.paper
  },
  listItemText: {
    fontWeight: '600'
  },
  mainWrapper: {
    top: theme.spacing(24),
    right: '13rem',
    bottom: 0,
    zIndex: 10,
    position: 'absolute'
    //display: 'flex',
    // left: "16rem",/
    // backgroundColor: theme.palette.common.backdrop
  },
  paperContainer: {
    width: 290,
    height: 'auto',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    '& .MuiListItem-root': {
      '& .MuiTypography-body1': {
        color: theme.palette.primary.black,
        '&:hover': {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main
        }
      },

      '&:hover': {
        '& .MuiTypography-body1': {
          color: theme.palette.common.white
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
      }
    }
    // marginTop: theme.spacing(3),
    // width: theme.spacing(100),
    // // marginLeft: theme.spacing(85),
    // height: 'fit-content',
    // overflow: 'auto',
    // minHeight: theme.spacing(45),
    // borderRadius: '10px'
    // maxHeight: theme.spacing(195)
  }
  // filterSection: {
  //   marginTop: theme.spacing(5),
  // },
});

export default withStyles(styles)(Quicklink);
