import React from 'react';
import { Dialog, Typography, Grid, Button, Link } from '@material-ui/core';

import PartnerApi from 'Http/api/Partner';
import { useStateful } from 'react-hanger';
import payload from 'Factory/PartnerPayload';
// import ContractShareSuccessModal from './ContractShareSuccessModal';
const ShareContract = (props) => {
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);
  const [DialogOpen, setDialogOpen] = React.useState();
  const ProdcutDetails = useStateful({});
  const handleShareClick = async (data) => {
    // let workFlowId = 1618923957892;
    // let userRole = localStorage.getItem('roleId');
    // let Ebody = {};
    // let accessToken;
    // Ebody['workflowId'] = workFlowId;
    // Ebody['userId'] = localStorage.getItem('signinId');
    // Ebody['userRole'] = userRole;
    // Ebody['executionModeStatus'] = false;
    // Ebody['async'] = false;
    // Ebody['Values'] = {};
    // Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
    // Ebody['Values']['CONTRACT_ID'] = data.CONTRACT_ID;
    // Ebody['Values']['MOBILE_NUMBER'] = data.MOBILE_NUMBER;
    // Ebody['Values']['PARTNER_NAME'] = data.PARTNER_NAME;
    // Ebody['Values']['Partner_ID'] = data.Partner_ID;
    // Ebody['Values']['url'] =
    //   'http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/0052ec98-fe07-46a3-8776-319c3a0f9993assigngrouptouser.png';

    let Data = PartnerApi.executeProcess(
      ...payload.makepayloadexecuteProcess(data)
    );

    //   await TecnotreedigitalSales.post('/bpmn/executeProcess', Ebody)
    //   .then((resp) => {
    //     props.onClose(false);
    //     setSuccessDialogOpen(true);
    //   })
    //   .catch((error) => {
    //     console.log('Error');
    //   });
  };
  const successDialogClose = () => {
    setSuccessDialogOpen(false);
  };
  const getProductDetails = async () => {
    let Details = await PartnerApi.getProductDetails(
      props.modalcontext?.rowlist?.AddContractFor?.ContractInformation
        ?.PRODUCT_ID
    );

    ProdcutDetails.setValue(_.get(Details, '[0]', ''));
  };
  React.useEffect(() => {
    if (
      props.modalcontext?.rowlist?.AddContractFor?.ContractInformation
        ?.PRODUCT_ID
    ) {
      // Product contract
      // props.getproductLists({ id: props.modalcontext?.rowlist?.PRODUCT_ID });
      getProductDetails();
    }
  }, []);
  return (
    <div>
      <Dialog
        open={true}
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
                {props.partnerDetails?.PartnerProfileCreation?.PartnerDetails
                  ?.PARTNER_NAME ||
                  props.partnerDetails?.TenantProfileCreation?.TenantDetails
                    ?.TENANT_NAME}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">EMAIL ID</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {props.partnerDetails?.PartnerProfileCreation
                  ?.PrimaryContactDetails?.EMAIL_ID ||
                  props.partnerDetails?.TenantProfileCreation
                    ?.PrimaryContactDetails?.EMAIL_ID}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">Mobile Number</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {props.partnerDetails?.PartnerProfileCreation
                  ?.PrimaryContactDetails?.MOBILE_NUMBER ||
                  props.partnerDetails?.TenantProfileCreation
                    ?.PrimaryContactDetails?.MOBILE_NUMBER}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">WhatsApp</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {props.partnerDetails?.PartnerProfileCreation
                  ?.PrimaryContactDetails?.MOBILE_NUMBER ||
                  props.partnerDetails?.TenantProfileCreation
                    ?.PrimaryContactDetails?.MOBILE_NUMBER}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="subtitle2">Document Link</Typography>
            </Grid>
            <Grid item>
              {/* <Button
                // href="http://dclm.cluster1.devtestlab2.tecnotree.com/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/v1/fileupload/0052ec98-fe07-46a3-8776-319c3a0f9993assigngrouptouser.png"
                color="primary"
                target="_blank"
                rel="noopener"
                onClick={() =>
                  props.downloadpdf({ id: props.modalcontext?.columns?.id })
                }
              >
                Link
              </Button> */}
              <Link
                component="button"
                style={{ color: 'blue', fontSize: '16px' }}
                target="_blank"
                color="primary"
                rel="noopener"
                variant="body2"
                onClick={() =>
                  props.downloadpdf({
                    id: props.modalcontext?.rowlist?.AddContractFor
                      ?.ContractInformation?.Dynamic_Contract_Pdf
                  })
                }
              >
                Link
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            style={{ display: 'flex', justifyContent: 'center' }}
            spacing={3}
          >
            <Grid item style={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={props.onClose}
                disabled={props.loading}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={props.loading ? true : false}
                onClick={() => {
                  props.handleShareContract(
                    props.modalcontext?.rowlist,
                    props.partnerDetails,
                    ProdcutDetails.value
                  );
                }}
              >
                {props.loading ? 'Sharing ...' : 'Share'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default ShareContract;
