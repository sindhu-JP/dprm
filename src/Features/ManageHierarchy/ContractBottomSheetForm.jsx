import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';

import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';
import ContractDetails from 'Features/Forms/ContractDetails';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    width: '100vw',
    height: '90vh'
  }
}));
const BottomSheetForms = (props) => {
  const classes = useStyles();

  let data;
  if (Array.isArray(props.masterData.data)) {
    let filteredElement = props.masterData.data.find((item) => {
      if (item.pid !== '') {
        return item;
      }
    });
    data = filteredElement;
    // userId = filteredElement[0].userId;
    // productCount = filteredElement[0].productCount;
  } else {
    data = props.masterData.data;
    // heading = props.nodeDetails.userName;
    // userId = props.nodeDetails.userId;
    // productCount = props.nodeDetails.productCount;
  }
  // useEffect(() => {
  //   if (props.callAPI !== undefined || props.callAPI !== false) {
  //   }
  // }, []);
  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={props.open}
      onClose={props.onClose}
      anchor={'bottom'}
      style={{ height: '95vh', width: '100vw' }}
    >
      <ContractDetails details={props} />

      <BottomSheetFormFields
        partnerId={data}
        productId={props}
        formIdentity="Add_Contract"
      />
    </Drawer>
  );
};
export default BottomSheetForms;
