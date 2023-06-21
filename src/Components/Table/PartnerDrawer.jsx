import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  Box,
  Typography,
  SwipeableDrawer,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    width: '45vw',
    height: '100vh'
  }
}));
const PartnerDrawer = (props) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    setDialog(props.dialogOpen);
  }, [props.dialogOpen]);

  const Details = ({ title, val }) => {
    return (
      <Box
        px={16}
        py={4}
        container
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          style={{ textAlign: 'left', alignSelf: 'center' }}
          variant="body1"
        >
          {title}{' '}
        </Typography>
        <Typography
          style={{ textAlign: 'left', alignSelf: 'center' }}
          variant="body1"
        >
          {val}{' '}
        </Typography>
      </Box>
    );
  };
  let fields;

  if (
    props.data.customerInfo.CONTRACT_ID &&
    props.data.customerInfo.CONTRACT_PERIOD &&
    props.data.customerInfo.CONTRACT_TYPE
  ) {
    fields = (
      <>
        <Details title="TICKET ID" val={`${props.data.id}`} />
        <Details
          title="CONTRACT_ID"
          val={`${props.data.customerInfo.CONTRACT_ID}`}
        />
        <Details
          title="PARTNER_ID"
          val={`${props.data.customerInfo.Partner_ID}`}
        />
        <Details
          title="CONTRACT_PERIOD"
          val={`${props.data.customerInfo.CONTRACT_PERIOD}`}
        />

        <Details
          title="CONTRACT_TYPE"
          val={`${props.data.customerInfo.CONTRACT_TYPE}`}
        />
        <Details
          title="CONTRACT_VALIDITY"
          val={`${props.data.customerInfo.CONTRACT_VALIDITY}`}
        />

        <Details title="CURRENCY" val={`${props.data.customerInfo.CURRENCY}`} />
        <Details
          title="DSP_COMMISSION"
          val={`${props.data.customerInfo.DSP_COMMISSION}`}
        />

        <Details
          title="MINIMUM_GUARANTEE"
          val={`${props.data.customerInfo.MINIMUM_GUARANTEE}`}
        />
        <Details
          title="NOTICE_PERIOD"
          val={`${props.data.customerInfo.NOTICE_PERIOD}`}
        />

        <Details
          title="ONE_TIME_ENROLLMENT_FEE"
          val={`${props.data.customerInfo.ONE_TIME_ENROLLMENT_FEE}`}
        />
        <Details
          title="AGREEMENT_DESCRIPTION"
          val={`${props.data.customerInfo.AGREEMENT_DESCRIPTION}`}
        />

        <Details
          title="REVENUE_SHARING_PERCENTAGE"
          val={`${props.data.customerInfo.REVENUE_SHARING_PERCENTAGE}`}
        />
        <Details
          title="SETTLEMENT_MODE"
          val={`${props.data.customerInfo.SETTLEMENT_MODE}`}
        />

        <Details
          title="SUBSCRIPTION_FEE"
          val={`${props.data.customerInfo.SUBSCRIPTION_FEE}`}
        />
        <Details
          title="START_DATE"
          val={`${props.data.customerInfo.START_DATE}`}
        />

        <Details
          title="SUBSCRIPTION_FEE"
          val={`${props.data.customerInfo.SUBSCRIPTION_FEE}`}
        />
        <Details
          title="START_DATE"
          val={`${props.data.customerInfo.START_DATE}`}
        />

        <Details title="END_DATE" val={`${props.data.customerInfo.END_DATE}`} />
      </>
    );
  } else if (
    props.data.customerInfo.PRODUCT_NAME ||
    props.data.customerInfo.PRODUCT_ID ||
    props.data.customerInfo.PRODUCT_LOB
  ) {
    fields = (
      <>
        <Details title="TICKET ID" val={`${props.data.id}`} />
        <Details
          title="Partner_ID"
          val={`${props.data.customerInfo.Partner_ID}`}
        />
        <Details
          title="PRODUCT_NAME"
          val={`${props.data.customerInfo.PRODUCT_NAME}`}
        />
        <Details
          title="PRODUCT_ID"
          val={`${props.data.customerInfo.PRODUCT_ID}`}
        />
        <Details
          title="PRODUCT_LOB"
          val={`${props.data.customerInfo.PRODUCT_LOB}`}
        />
        <Details
          title="PRODUCT_TECHNOLOGY"
          val={`${props.data.customerInfo.PRODUCT_TECHNOLOGY}`}
        />
        <Details
          title="RECURRING_CHARGES"
          val={`${props.data.customerInfo.RECURRING_CHARGES}`}
        />
        <Details
          title="ONE_TIME_CHARGE"
          val={`${props.data.customerInfo.ONE_TIME_CHARGE}`}
        />

        <Details
          title="AVAILABLE_FROM"
          val={`${props.data.customerInfo.AVAILABLE_FROM}`}
        />
        <Details
          title="AVAILABLE_TO"
          val={`${props.data.customerInfo.AVAILABLE_TO}`}
        />
        <Details title="CURRENCY" val={`${props.data.customerInfo.CURRENCY}`} />
      </>
    );
  } else {
    fields = (
      <>
        <Details title="TICKET ID" val={`${props.data.id}`} />
        <Details
          title="PARTNER_NAME"
          val={`${props.data.customerInfo.PARTNER_NAME}`}
        />
        <Details
          title="ORGANISATION"
          val={`${props.data.customerInfo.ORGANISATION}`}
        />
        {/* {props.data.customerInfo.CONTRACT_ID && (
          <Details
            title="cONTRACid"
            val={`${props.data.customerInfo.CONTRACT_ID}`}
          />
        )} */}
        <Details
          title="PARTNER_REGISTRATION_NUMBER"
          val={`${props.data.customerInfo.PARTNER_REGISTRATION_NUMBER}`}
        />
        <Details
          title="PARTNER_ID"
          val={`${props.data.customerInfo.PARTNER_ID}`}
        />
        <Details
          title="PARTNER_TYPE"
          val={`${props.data.customerInfo.PARTNER_TYPE}`}
        />
        <Details title="SUB_TYPE" val={`${props.data.customerInfo.SUB_TYPE}`} />
        <Details title="groupId" val={`${props.data.customerInfo.groupId}`} />
        <Details
          title="groupName"
          val={`${props.data.customerInfo.groupName}`}
        />
        <Details title="status" val={`${props.data.status}`} />
      </>
    );
  }

  return (
    <SwipeableDrawer
      classes={{ paper: classes.paper }}
      anchor={'right'}
      open={dialog}
      onClose={() => setDialog(false)}
    >
      <Box
        container
        px={5}
        py={5}
        style={{ height: '100vh', overflowX: 'hidden', overflowY: 'auto' }}
      >
        <Box
          style={{ display: 'flex', justifyContent: 'space-between' }}
          container
        >
          <h1>Ticket Details</h1>
          <IconButton
            fontSize={24}
            onClick={() => {
              setDialog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {fields}
        status
      </Box>
      {/* Company_Registration: "#Company_Registration"
INDUSTRY_TYPE: "#INDUSTRY_TYPE"
ORGANISATION: "#ORGANISATION"
PARTNER_ID: "PIDOXAV36KF"
PARTNER_NAME: "#PARTNER_NAME"
PARTNER_REGISTRATION_NUMBER: "#PARTNER_REGISTRATION_NUMBER"
PARTNER_TYPE: "#PARTNER_TYPE"
SUB_TYPE: "#SUB_TYPE"
groupId: "GRP1008"
groupName: "PARTNER Approval"
ticketDescription: "Master Partner Approval"
ticketName: "Master Partner Approval"  */}
    </SwipeableDrawer>
  );
};

export default connect((state) => ({
  data: state.dashboardData.partnerDetails
}))(PartnerDrawer);
