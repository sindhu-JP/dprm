import React from 'react';
import { Dialog, Typography, Grid, Button } from '@material-ui/core';
import { TecnotreedigitalSales } from '../../Http/axios';

import ContractShareSuccessModal from './ContractShareSuccessModal';

const ContractShareDialog = (props) => {
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);
  const [DialogOpen, setDialogOpen] = React.useState();
  const handleShareClick = async (data) => {
    let workFlowId = 1618923957892;
    let userRole = localStorage.getItem('roleId');
    let Ebody = {};
    let accessToken;
    Ebody['workflowId'] = workFlowId;
    Ebody['userId'] = localStorage.getItem('signinId');
    Ebody['userRole'] = userRole;
    Ebody['executionModeStatus'] = false;
    Ebody['async'] = false;
    Ebody['Values'] = {};
    Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
    Ebody['Values']['CONTRACT_ID'] = data.CONTRACT_ID;
    Ebody['Values']['MOBILE_NUMBER'] = data.MOBILE_NUMBER;
    Ebody['Values']['PARTNER_NAME'] = data.PARTNER_NAME;
    Ebody['Values']['Partner_ID'] = data.Partner_ID;
    Ebody['Values']['url'] =
      'http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/0052ec98-fe07-46a3-8776-319c3a0f9993assigngrouptouser.png';

    await TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
      .then((resp) => {
        props.onClose(false);
        setSuccessDialogOpen(true);
      })
      .catch((error) => {});

    props.handleShareContract();
  };
  const successDialogClose = () => {
    setSuccessDialogOpen(false);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <h1>Contract Share Details</h1>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">PARTNER NAME</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {props.rowData.PARTNER_NAME}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">EMAIL ID</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{props.rowData.EMAIL_ID}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">Mobile Number</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {props.rowData.MOBILE_NUMBER}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">WhatsApp</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {props.rowData.MOBILE_NUMBER}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">Document Link</Typography>
            </Grid>
            <Grid item>
              <Button
                href="http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/0052ec98-fe07-46a3-8776-319c3a0f9993assigngrouptouser.png"
                color="primary"
                target="_blank"
                rel="noopener"
              >
                Link
              </Button>
            </Grid>
          </Grid>
          <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  handleShareClick(props.rowData);
                }}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      <ContractShareSuccessModal
        open={successDialogOpen}
        onClose={successDialogClose}
      />
    </div>
  );
};

export default ContractShareDialog;
