import React, { useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Button,
  Tooltip
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { TecnotreedigitalSales } from '../../Http/axios';
import { connect, useDispatch } from 'react-redux';
import DashboardController from '../../Controllers/Dashboard';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';

import { isEmpty } from 'lodash-es';

import PartnerViewDetails from 'Features/PartnerDetails';
import ContractViewDetails from 'Features/ContractViewDetails/ContractViewDetails';
import NavigateNext from '@material-ui/icons/NavigateNext';

import { useHistory } from 'react-router-dom';
import ProductViewDetails from 'Features/ProductViewDetails';
import Modal from 'Store/Modals';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '2rem',
    paddingLeft: '2rem'
  },
  heading: {
    fontSize: '15px',
    fontWeight: 600
  },
  aa: {
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }
}));
const Approvalsheet = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [btnType, setBtnType] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [approvalType, setApprovalType] = React.useState();
  const [approvalDrawer, setApprovalDrawer] = React.useState(false);
  const [partnerDetails, setPartnerDetails] = React.useState({});
  const [productDetails, setProductDetails] = React.useState({});
  const [contractDetails, setContractDetails] = React.useState({});
  const [description, setDescription] = React.useState('');
  let formIdentity = props.data.formIdentity;
  let Status = props.data.status;
  var retrievedObject = localStorage.getItem('USER');
  var userName = JSON.parse(retrievedObject).sub;
  const dispatch = useDispatch();

  useEffect(() => {
    // props.getPartnerActions({
    //   formId: formIdentity,
    //   Status: Status
    // });

    const getProductList = async (formIdentity, Status) => {
      await TecnotreedigitalSales.get(
        `/formIdentity?formIdentity=${formIdentity}&status=${Status}`
      )
        .then((resp) => {
          setBtnType(resp.data);
        })
        .catch((error) => {});
    };

    getProductList(formIdentity, Status);
  }, []);

  // let PartnerId;
  // if (props.data.customerInfo.Partner_ID) {
  //   PartnerId = props.data.customerInfo.Partner_ID;
  // } else {
  //   PartnerId = props.data.customerInfo.PARTNER_ID;
  // }

  useEffect(() => {
    const getPartnerDetails = async (PartnerId) => {
      await TecnotreedigitalSales.get(
        `/search/Partner_Profile?PartnerProfileCreation.PartnerDetails.Partner_ID=${PartnerId}`
      )
        .then((resp) => {
          setPartnerDetails(resp.data[0]);
        })
        .catch((error) => {});
    };
    const getProductDetails = async (ProductId) => {
      await TecnotreedigitalSales.get(
        `/search/Add_Product?AddProduct.ProductDetails.PRODUCT_ID=${ProductId}`
      )
        .then((resp) => {
          setProductDetails(resp.data[0]);
        })
        .catch((error) => {});
    };
    const getContractDetails = async (ContractId) => {
      await TecnotreedigitalSales.get(
        `/search/Add_Contract?AddContractFor.ContractInformation.CONTRACT_ID=${ContractId}`
      )
        .then((resp) => {
          setContractDetails(resp.data[0]);
        })
        .catch((error) => {});
    };

    if (props.data.formIdentity === 'Partner_Profile') {
      getPartnerDetails(props.data.customerInfo.PARTNER_ID);
    } else if (props.data.formIdentity === 'Add_Product') {
      getProductDetails(props.data.customerInfo.PRODUCT_ID);
    } else if (props.data.formIdentity === 'Add_Contract') {
      getContractDetails(props.data.customerInfo.CONTRACT_ID);  
    }
  }, [  ]);

  let reversedBtnType = btnType.slice(0).reverse();

  const handleButtonClick = (event) => {
    setOpen(true);
    setApprovalType(event.currentTarget.value);
  };
  const handleSubmitApproval = () => {
    props.updatePartnerStatus({
      ticketId: props.data.id,
      status: approvalType,
      exeId: props.data.taskInfoId,
      body: props.data,
      description: description
    });
    setOpen(false);
    history.push('/');
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleApprovalDrawer = () => {
  //   setApprovalDrawer(false);
  // };
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column">
          <Grid
            container
            direction="row"
            className={classes.header}
            justify="space-between"
          >
            <Grid item flexGrow={1}>
              <Grid item>
                <Typography variant="h4">View Details</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="Close" placeholder="bottom">
                <IconButton
                  onClick={() => dispatch(Modal.close('TaskApproval'))}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item>
            <Paper className={classes.aa}>
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Grid item>
                    <Typography variant="h4"> Approval</Typography>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="caption" className={classes.aa}>
                      Profile ID: | Products:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption" className={classes.aa}>
                      Coca-Cola India
                    </Typography>
                  </Grid> */}
                </Grid>
                <Grid item>
                  {reversedBtnType.map((btn) => {
                    return (
                      <>
                        <Button
                          variant={
                            btn.name === 'Reject' ? 'outlined' : 'contained'
                          }
                          style={{ marginRight: '10px', fontSize: '12px' }}
                          color="primary"
                          size="large"
                          onClick={handleButtonClick}
                          value={btn.name}
                        >
                          {btn.name}
                        </Button>
                      </>
                    );
                  })}
                </Grid>
              </Grid>
              {/* <Grid item>
                <Typography variant="caption">LOB -</Typography>
              </Grid> */}
            </Paper>
          </Grid>

          <Grid item>
            {isEmpty(productDetails) ? (
              <></>
            ) : (
              <ProductViewDetails productData={productDetails.AddProduct} />
            )}
          </Grid>
          <Grid item>
            {isEmpty(contractDetails) ? (
              <></>
            ) : (
              <>
                <ContractViewDetails
                  contractData={contractDetails.AddContractFor}
                />
              </>
            )}
          </Grid>
          <Grid item>
            {isEmpty(partnerDetails) ? (
              <></>
            ) : (
              <>
                <PartnerViewDetails
                  partnerData={partnerDetails.PartnerProfileCreation}
                />
              </>
            )}
          </Grid>

          {/* <Grid item className={classes.aa}>
              <PartnerDetails
                partnerData={partnerDetails.PartnerProfileCreation}
              />
            </Grid>

            <Grid item className={classes.aa}>
              <CompanyAddress
                companyData={partnerDetails.PartnerProfileCreation}
              />
            </Grid>
            <Grid item className={classes.aa}>
              <BillingDetails
                billingData={partnerDetails.PartnerProfileCreation}
              />
            </Grid>
            <Grid item className={classes.aa}>
              <PrimaryContactDetails
                primaryContactDetails={partnerDetails.PartnerProfileCreation}
              />
            </Grid>
            <Grid item className={classes.aa}>
              <AdditionalContact
                primaryContactDetails={partnerDetails.PartnerProfileCreation}
              />
            </Grid> */}
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4"> Approval</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                Partner Approval by {userName}
              </Typography>
            </Grid>
          </Grid>

          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Your description here"
          />
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              spacing={4}
              style={{ marginTop: '15px' }}
            >
              <Grid item>
                <Button
                  size="large"
                  variant="text"
                  color="#57606F"
                  type={'reset'}
                  endIcon={<NavigateNext />}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSubmitApproval}
                  value={approvalType}
                  endIcon={<NavigateNext />}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    actions: state.dashboardData.partnerActions,
    fetching: state.dashboardData.loading.partnerActionsLoading
  }),
  {
    getPartnerActions: DashboardController.getPartnerActions,
    updatePartnerStatus: DashboardController.updatePartnerStatus
  }
)(Approvalsheet);
