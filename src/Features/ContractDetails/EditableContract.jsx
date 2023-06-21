import React, { useEffect } from 'react';
import { Drawer, makeStyles } from '@material-ui/core';

import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';
import { connect } from 'react-redux';
import contractController from 'Controllers/contract';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    width: '100vw',
    height: '90vh'
  }
}));
const EditableContract = (props) => {
  const classes = useStyles();
  let data;
  if (Array.isArray(props.masterData.partnerId)) {
    let filteredElement = props.masterData.partnerId.find((item) => {
      if (item.pid !== '') {
        return item;
      }
    });
    data = filteredElement;
    // userId = filteredElement[0].userId;
    // productCount = filteredElement[0].productCount;
  } else {
    data = props.masterData.partnerId;
    // heading = props.nodeDetails.userName;
    // userId = props.nodeDetails.userId;
    // productCount = props.nodeDetails.productCount;
  }
  useEffect(() => {
    if (props.callAPI !== undefined || props.callAPI !== false) {
      if (props.row.id !== '') {
        props.getContractDetails(props.row.id);
      }
    }
  }, []);

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={props.open}
      onClose={props.onClose}
      anchor={'bottom'}
      style={{ height: '95vh', width: '100vw' }}
    >
      {/* <ContractDetails details={props} /> */}

      {!_.isEmpty(props.contractState.contractDetails) ? (
        <BottomSheetFormFields
          partnerId={data}
          productId={props}
          formIdentity="Add_Contract"
          prefilledData={props.contractState.contractDetails}
          editable={true}
        />
      ) : (
        ''
      )}
    </Drawer>
  );
};
export default connect(
  (state) => ({
    contractState: state.contracts
  }),
  {
    getContractDetails: contractController.getContractDetails
  }
)(EditableContract);
