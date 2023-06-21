import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';

import ContractTable from '../../Components/Table/ContractTable';
// import Seam from './Seam'

const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    width: '100vw',
    height: '90vh'
  }
}));
const BottomSheetForms = (props) => {
  const [showSheet, setShowSheet] = useState(true);

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
  // const getCellValues = () => {
  // };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <Company accordianDetails={data} /> */}
        {/* <Seam accordianDetails={data} /> */}
        <ContractTable data={data} />
      </Dialog>
    </div>
  );
};
export default BottomSheetForms;
