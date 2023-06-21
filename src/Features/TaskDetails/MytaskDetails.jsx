import React from 'react';

import {
  Grid,
  IconButton,
  Typography,
  Box,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { connect } from 'react-redux';
import LeadController from 'Controllers/Lead';
import { useStateful, useBoolean } from 'react-hanger';

import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import _, { isEmpty } from 'lodash';
import Workflow from './Workflow';
import PartnerApi from 'Http/api/Partner';
import PartnerDetails from 'Features/LeadDetails/PartnerDetails';
import ProductDetails from 'Features/TaskDetails/ProductDetails/Product';
import SettlementRule from 'Features/TaskDetails/SettlementRuleDetails/SettlementRule';
import CommissionRuleDetail from './CommissionRuleDetails/CommissionRuleDetail';
import BillingAdjustmentDetails from './BillingAdjustment';

const TaskDetails = (props) => {
  const [info, setInfo] = React.useState({});
  const [leadLevelSla, setleadLevelSla] = React.useState({});
  const [oppLevelSla, setoppLevelSla] = React.useState({});
  const alert = useStateful({ message: '', type: 'success' });
  const classes = useStyles();
  const alertOpen = useBoolean(false);
  const leadsubOpp = useStateful({});
  const Details = useStateful({});
  const Editproducts = useBoolean(false);
  const steppers = useStateful([]);
  const [isvalidStatus, setisvalidStatus] = React.useState('');
  const Taskdetails = useStateful({});
  const PartnerData = useStateful({});
  const ProdcutDetails = useStateful({});
  const ContractDetails = useStateful({});
  const localcontext = useStateful({});
  const TenantData = useStateful({});
  const [settlementRuleDetails, setSettlementRuleDetails] = React.useState({});
  const [commissionRuleDetails, setCommissionRuleDetails] = React.useState({});
  const BillingAdjustment = useStateful({});
  const updatedCommissionDetails = useStateful({});

  const getPartnerdetails = async (data) => {
    if (data?.customerInfo?.Partner_ID?.substring(0, 2) === 'MP') {
    
      let Details = await PartnerApi.getPartnerDetails(
        data?.customerInfo?.Partner_ID
      );

      PartnerData.setValue(_.get(Details, '[0]', ''));

      getCommissionRulesDetail(
        null,
        props.context.mytasks?.customerInfo?.commissionCode
      );
    } else if (data?.customerInfo?.Partner_ID?.substring(0, 2) === 'TP') {
      let Details = await PartnerApi.getTenantDetails(
        data?.customerInfo?.Partner_ID
      );
      getCommissionRulesDetail(
        null,
        props.context.mytasks?.customerInfo?.commissionCode
      );

      TenantData.setValue(_.get(Details, '[0]', ''));
    }
  };

  const getproductDetail = async (id) => {
    let Details = await PartnerApi.getProductDetails(id);

    ProdcutDetails.setValue(_.get(Details, '[0]', ''));
  };

  const getContractDetail = async (id) => {
    let Details = await PartnerApi.getContractDetails(id);

    ContractDetails.setValue(_.get(Details, '[0]', ''));
  };

  const getSettlementRulesDetail = async (id) => {
    let Details = await PartnerApi.getSettlementRuleDetails(id);

    setSettlementRuleDetails(Details);
  };
  const getCommissionRulesDetail = async (id, code) => {
    if (id) {
      let Details = await PartnerApi.getCommissionRuleDetails(id);

      setCommissionRuleDetails(Details);
    } else {
      let Details = await PartnerApi.getcommissionRules(code);
      updatedCommissionDetails.setValue(Details);
    }
  };
  const getAdjustmentDetails = async (id) => {
    let Details = await PartnerApi.getAdjustmentDetails(id);
    BillingAdjustment.setValue(_.get(Details, '[0]', {}));
  };
  React.useEffect(() => {
 
    console.log(props.context, "todayxxx")
    if (props.context) {
      Taskdetails.setValue(props.context);

      if (props.context?.mytasks) {
        getPartnerdetails(props?.context?.mytasks);
      }

      if (props.context?.mytasks?.customerInfo?.PRODUCT_ID) {
        getproductDetail(props.context?.mytasks?.customerInfo?.PRODUCT_ID);
      }
      if (props.context?.mytasks?.customerInfo?.CONTRACT_ID) {
        getContractDetail(props.context?.mytasks?.customerInfo?.CONTRACT_ID);
      }
      if (props.context?.mytasks?.customerInfo?.Settlment_ID) {
        getSettlementRulesDetail(
          props.context?.mytasks?.customerInfo?.Settlment_ID
        );
      }
      if (props.context?.mytasks?.customerInfo?.commissionId) {
        getCommissionRulesDetail(
          props.context?.mytasks?.customerInfo?.commissionId
        );
      }
    }

    if (props.context?.columns?.ApprovalType === 'Adjustment Approval') {
      getAdjustmentDetails(props.context?.mytasks?.customerInfo?.adjustmentId);
    }
  }, [props.context]);

  const UpdateContractsection = (data) => {
    return {
      ...data,
      UploadDocuments: {
        'Contract Document ': data?.UploadDocuments?.COMPANY_REGISTRATION
      }
    };
  };
  return (
    <Drawer anchor={'bottom'} open={props.open} onClose={props.onClose}>
      <Box className={classes.container}>
        <Box px={5} className={classes.header}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                View Details
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Close" placeholder="bottom">
                <IconButton onClick={props.onClose}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box px={10} py={5}>
          <Box>
            <Grid container direction="column" spacing={6}>
              <Grid item>
                <Workflow
                  partnerDetails={Taskdetails.value.mytasks}
                  contextDetails={Taskdetails.value}
                  handleTaskAction={props.handleTaskAction}
                  data={PartnerData.value?.PartnerProfileCreation}
                />
              </Grid>
              {!_.isEmpty(BillingAdjustment.value) && (
                <Grid item>
                  <BillingAdjustmentDetails
                    BillingAdjustment={BillingAdjustment.value}
                  />
                </Grid>
              )}

              {Object.keys(
                Taskdetails.value?.mytasks?.customerInfo
                  ?.PartnerProfileModification || {}
              ).length > 0 && (
                <Grid item>
                  <ProductDetails
                    maintitle={'Partner Profile Modification Details'}
                    productData={
                      Taskdetails.value?.mytasks?.customerInfo
                        ?.PartnerProfileModification
                    }
                  />
                </Grid>
              )}

              {PartnerData.value?.PartnerProfileCreation && (
                <>
                  {PartnerData.value?.PartnerProfileCreation?.sections.map(
                    (item) => {
                      return (
                        <Grid item>
                          <PartnerDetails
                            title={item}
                            partnerDetails={
                              PartnerData.value?.PartnerProfileCreation
                            }
                          />
                        </Grid>
                      );
                    }
                  )}
                </>
              )}

              {Object.keys(TenantData.value).length > 0 && (
                <Grid item>
                  <ProductDetails
                    maintitle={'Tenant Information'}
                    productData={TenantData.value?.TenantProfileCreation}
                  />
                </Grid>
              )}
              {Object.keys(ProdcutDetails.value).length > 0 && (
                <Grid item>
                  <ProductDetails
                    // title={item}
                    maintitle={'Product Information'}
                    productData={ProdcutDetails.value?.AddProduct}
                  />
                </Grid>
              )}

              {ContractDetails.value?.AddContractFor && (
                <>
                  <Grid item>
                    <ProductDetails
                      maintitle={'Contract Information'}
                      productData={UpdateContractsection(
                        ContractDetails.value?.AddContractFor
                      )}
                      contractPreview={true}
                    />
                  </Grid>
                </>
              )}

              {!isEmpty(settlementRuleDetails) && (
                <Grid item>
                  <SettlementRule
                    maintitle={'Settlement Rule Details'}
                    settlementRuleDetails={settlementRuleDetails}
                  />
                </Grid>
              )}

              {!isEmpty(commissionRuleDetails) && (
                <Grid item>
                  <CommissionRuleDetail
                    maintitle={'Commission Rule Details'}
                    commissionRuleDetails={commissionRuleDetails}
                  />
                </Grid>
              )}

              {!isEmpty(updatedCommissionDetails.value) &&
                props.context?.columns?.status === 'pending' &&
                props.context?.mytasks?.customerInfo?.updateType ===
                  'Commission' && (
                  <Grid item>
                    <CommissionRuleDetail
                      maintitle={' Updated Commission Rule Details'}
                      commissionRuleDetails={updatedCommissionDetails.value}
                    />
                  </Grid>
                )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  container: {
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.main
  },
  header: {
    backgroundColor: theme.palette.primary.bottomHeader,
    '& .MuiIconButton-root': {
      '& .MuiIconButton-label': {
        color: theme.palette.primary.primaryMainContrast
      }
    }
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.primaryMainContrast
  }
}));

export default connect(
  (state) => ({
    leadsState: state.leads
  }),
  {
    GetSlaTiming: LeadController.SlaTiming
  }
)(TaskDetails);
