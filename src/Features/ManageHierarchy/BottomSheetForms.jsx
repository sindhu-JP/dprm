import React, { useState } from 'react';
import { Drawer, makeStyles, Typography } from '@material-ui/core';

import CompanyDetails from '../Forms/CompanyDetails';
import { Box } from '@material-ui/core';
import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    width: '100vw',
    height: '90vh'
  }
}));
const BottomSheetForms = (props) => {
  const [showSheet, setShowSheet] = useState(false);
  const classes = useStyles();
  let formHeader;
  if (props.formIdentity === 'Add_Product') {
    formHeader = 'Add Product';
  } else if (props.formIdentity === 'Add_Contract') {
    formHeader = 'Add Contract';
  } else if (props.formIdentity === 'Tenant_Partner_Profile') {
    formHeader = 'Add Tenant';
  } else {
    formHeader = 'Add Tenant';
  }

  // useEffect(() => {

  // }, []);

  let parentNodeDetails = props.nodeDetails;
  // let filteredMaster;

  // if (Array.isArray(parentNodeDetails)) {
  //   const filter = () => {
  //     parentNodeDetails.find((item) => {
  //       if (item.pid != '') {
  //         filteredMaster = item;
  //         return filteredMaster;
  //       }
  //     });
  //   };
  //   return filter;
  // } else {
  //   filteredMaster = parentNodeDetails;
  // }

  let heading, userId, productCount;
  let data;
  if (Array.isArray(props.nodeDetails)) {
    let filteredElement = props.nodeDetails.find((item) => {
      if (item.pid !== '') {
        return item;
      }
    });
    data = filteredElement;
    // userId = filteredElement[0].userId;
    // productCount = filteredElement[0].productCount;
  } else {
    data = props.nodeDetails;
    // heading = props.nodeDetails.userName;
    // userId = props.nodeDetails.userId;
    // productCount = props.nodeDetails.productCount;
  }
  const handleClose = () => {
    props.open;
  };
  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={props.open}
      onClose={props.onClose}
      anchor={'bottom'}
      style={{ height: '95vh', width: '100vw' }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '18px'
        }}
      >
        <Typography
          style={{
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {formHeader}
        </Typography>
        <IconButton onClick={props.onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <CompanyDetails accordianDetails={data} />
      <BottomSheetFormFields
        partnerId={data}
        closeDrawer={props.onClose}
        formIdentity={props.formIdentity}
      />
    </Drawer>
  );
};

export default BottomSheetForms;
