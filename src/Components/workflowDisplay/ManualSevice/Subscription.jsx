import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import { Trans } from '@lingui/react';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Grid, Paper } from '@material-ui/core';
import { useStateful } from 'react-hanger';
import { history } from 'Store';
import PartnerSearch from 'Features/Suspension/PatrtnerList';
import RevokePartnerSearch from 'Features/Revoke/RevokePartnerList';
import ManualComission from "Features/ManualComissioning/ManualCommissioning"
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

const Subscription = (props) => {
  const customerReq = useStateful([]);

  const [openPartner, setOpenPartner] = React.useState(false);
  const [openList, setOpenList] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [openCommision, setOpenCommision] = React.useState(false)
  const handleClickOpenPartner = () => {    
    setOpenPartner(true);
    setOpenList(true);
    setScroll('paper');
  };

  const handleClickOpenCommision = () => {    
    setOpenCommision(true);
  };
  console.log(openPartner,'openPartneropenPartneropenPartner')
  const [openRevokePartner, setOpenRevokePartner] = React.useState(false);

  const handleClickOpenRevokePartner = () => {
    setOpenRevokePartner(true);
    setOpenList(true);
  };

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

  return (
    <div className={classes.mainWrapper} onMouseLeave={props.handlemounseCard}>
      <Paper
        elevation={1}
        variant="elevation"
        className={classes.paperContainer}
      >
        <Grid item>
          <Typography variant="h3" className={classes.title}>
            <Trans id="Quick Links"> </Trans>
          </Typography>
          <List>
            <ListItem
              button
              onClick={() => history.push('/digital-prm-web-ui/settlementRule')}
            >
              <ListItemText>
                <Trans id="Settlement Rule Creation"></Trans>
              </ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/digital-prm-web-ui/commissionRule')}
            >
              <ListItemText>
                <Trans id="Commission Rule Creation"></Trans>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleClickOpenPartner}>
              <ListItemText>
                <Trans id="Suspend Partner/Tenant"></Trans>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleClickOpenRevokePartner}>
              <ListItemText>
                <Trans id="Revoke Suspension"></Trans>
              </ListItemText>
            </ListItem>
            {/* <ListItem
              button
              onClick={handleClickOpenCommision}
            >
              <ListItemText>
                
                <Trans id="CommisCommission "></Trans>
                </ListItemText>
            </ListItem> */}
          </List>
        </Grid>

        {/* <List>
          {customerReq &&
            customerReq.value?.map((item) => (
              <ListItem
                button
                onClick={() => props.handleListItemClick(item)}
                key={item}
              >
                <ListItemText
                  primary={item.name}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            ))}
        </List> */}
      </Paper>
      <PartnerSearch
        open={openPartner}
        setOpen={setOpenPartner}
        setListOpen={setOpenList}
        scroll={scroll}
      />
      <ManualComission
        open={openCommision}
        setOpen={setOpenCommision}

        scroll={scroll}
      />
      <RevokePartnerSearch
        open={openRevokePartner}
        setOpen={setOpenRevokePartner}
        scroll={scroll}
      />
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
    backgroundColor: theme.palette.background.paper,
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '14px'
  },
  listItemText: {
    fontWeight: '600'
  },
  mainWrapper: {
    top: theme.spacing(19),
    right: '14rem',
    bottom: 0,
    zIndex: 10,
    position: 'absolute'
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

export default withStyles(styles)(Subscription);
