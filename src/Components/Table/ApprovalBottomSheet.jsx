import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import Approvalsheet from './Approvalsheet';

const ApprovalBottomSheet = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={props.open}
      onClose={props.onClose}
      anchor={'bottom'}
      style={{ height: '95vh', width: '100vw' }}
    >
      <Approvalsheet
        data={props?.data}
        row={props.rowData}
        closeDrawer={props.onClose}
      />
    </Drawer>
  );
};
export default ApprovalBottomSheet;
const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'white',
    width: '100vw',
    height: '90vh'
  }
}));
