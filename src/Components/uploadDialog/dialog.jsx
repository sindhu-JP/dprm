import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import { IconButton, Typography } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import UploadForm from './uploadForm';
import CloseIcon from '@material-ui/icons/Close';
import { styled } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Modals from 'Store/Modals';
import {  LoadingOutlined } from '@ant-design/icons';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    marginTop: "20px"
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};
export default function UploadDialog({ open, otpData, setOpenForm }) {
  const [loading, setLoading] = useState(false);
  const [uploadList, setUploadList] = useState({COMPANY_REGISTRATION: [], NATIONAL_ID: []});
  const dispatch = useDispatch();
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {

    // let docuemts = Object.keys(uploadList).map(el => uploadList[el]).filter(el => {
    //   el.filter(el => {
    //     console.log(el, "elooooooo")
    //     return el.status !== "error"
    //   })
      
    // })
    setOpenForm(false);
    dispatch(
      Modals.open({
        id: 'OtpVerification',
        context: {
          email: otpData?.payload?.email,
          phoneNumber: otpData?.payload?.phoneNumber,
          fields: otpData?.fields,
          formStep: otpData?.formdata,
          leadPartner: true,
          workflowIds: otpData?.workflowIds,
          documents: uploadList,
          agentId: otpData?.agentId
        }
      })
    );
  };
//console.log(uploadList, "uploadList", otpData, "cxcccc")
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            maxWidth: '1000px',
            padding: '20px 20px',
            width: '500px'
          }
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography style={{ fontSize: '20px' }}>
                {'Upload Documents'}
              </Typography>
            </div>
            <div style={{ marginTop: '-10px' }}>
            
              <IconButton onClick={() => setOpenForm(false)} >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </BootstrapDialogTitle>
        <DialogContent>
      <UploadForm setUploadList={setUploadList} uploadList={uploadList} setLoading={setLoading}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            variant="contained"
            
          >
            {loading ? <LoadingOutlined /> : "Proceed"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
