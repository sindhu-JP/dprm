import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const CustomAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const ContractShareSuccessModal = (props) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={props.open}
        autoHideDuration={4000}
        onClose={props.onClose}
      >
        <CustomAlert onClose={props.onClose} severity="success">
          Contract Share successfully!
        </CustomAlert>
      </Snackbar>
      {/* </Dialog> */}
    </div>
  );
};

export default ContractShareSuccessModal;
