import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import PartnerApi from 'Http/api/Partner';
import { useStateful } from 'react-hanger';

// import CompanyDetails from '../Forms/CompanyDetails';
import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';

import { Grid, makeStyles, Paper, Typography, Box } from '@material-ui/core';
import { isEmpty } from 'lodash';
import './UserHierarchy.scss';

import DocumentUpload from 'lib/components/DocumentUpload/DocumentUpload';

import contractAPI from 'Http/api/contract';

import ContractStepper from 'lib/components/ContractStepper/ContractStepper';
import CompanyLogo from '../../Assets/Icons/building.svg';

const FormsCreation = ({
  open,
  onClose,
  modalcontext,
  setHierarchy,
  backOffice,
  contractObj,
  contractModification,
  DownloadPreview
}) => {
  const details = useStateful({});
  const partnerDetails = useStateful({});
  const [settlementRuleDetails, setSettlementRuleDetails] = React.useState({});
  const [commissionRuleDetails, setCommissionRuleDetails] = React.useState({});

  const [contractDocument, setContractDocs] = React.useState({});

  console.log(modalcontext, "modalcontext")
  const classes = useStyles();
  React.useEffect(() => {
    if (modalcontext?.nodeDetails?.length > 0) {
      let filteredElement = modalcontext?.nodeDetails?.find((item) => {
        if (item.pid !== '') {
          return item;
        }
      });

      details.setValue(filteredElement);
    } else {
      details.setValue(modalcontext.nodeDetails);
    }
  }, [modalcontext]);

  React.useEffect(() => {
    if (!isEmpty(details.value)) {
      getPartnerdetails(details.value.partnerId);
    }
  }, [details]);

  const getPartnerdetails = async (id) => {
    if (details.value.partnerId.substring(0, 2) === 'MP') {
      let Details = await PartnerApi.getPartnerDetails(details.value.partnerId);

      partnerDetails.setValue(Details[0]);
    } else {
      let Details = await PartnerApi.getTenantDetails(details.value.partnerId);

      partnerDetails.setValue(Details[0]);
    }
  };

  const getCommissionRulesDetail = async (id) => {
    if (id) {
      let Details = await PartnerApi.getcommissionRules(id);

      setCommissionRuleDetails(Details);
    }
  };

  const getSettlementRulesDetail = async (id) => {
    if (id !== 'undefined') {
      let Details = await PartnerApi.SettlementRuleDetails(id);

      setSettlementRuleDetails(Details);
    }
  };

  React.useEffect(() => {
    if (contractModification) {
      getSettlementRulesDetail(
        contractObj?.AddContractFor?.ContractInformation?.Settelement_Code
      );
      getCommissionRulesDetail(
        contractObj?.AddContractFor?.ContractInformation?.Commission_Code
      );
    } else {
      getSettlementRulesDetail(
        partnerDetails.value?.TenantProfileCreation?.SettlementRuleDetails
          ?.settlementCode ||
          partnerDetails.value?.PartnerProfileCreation?.SettlementRuleDetails
            ?.settlementCode
      );

      getCommissionRulesDetail(
        partnerDetails.value?.TenantProfileCreation?.CommissionRulesDetails
          ?.Commission_Rule ||
          partnerDetails.value?.PartnerProfileCreation?.CommissionRuleDetails
            ?.Commission_Rule ||
          partnerDetails.value?.PartnerProfileCreation?.CommissionRulesDetails
            ?.Commission_Rule
      );
    }
  }, [partnerDetails]);

  const getDocumentDetails = async () => {
    console.log("here 2xc")
    let payload = {
      pageNumber: 0,
      pageSize: 30,
      sortDirection: 'DESC',
      sortField: 'createdDate',
      useSorting: true,
      categorySearchString:
        partnerDetails.value?.TenantProfileCreation?.TenantDetails
          ?.TENANT_PARTNER_TYPE ||
        partnerDetails.value?.PartnerProfileCreation?.PartnerDetails
          ?.PARTNER_TYPE,
      // 'BOT',
      subCategorySearchString:
        partnerDetails.value?.TenantProfileCreation?.TenantDetails
          ?.TENANT_PARTNER_SUB_TYPE ||
        partnerDetails.value?.PartnerProfileCreation?.PartnerDetails
          ?.PARTNER_SUB_TYPE,
      //'360 MALL',
      lobSearchString: '',
      serviceRequestNameSearchString: '',
      formTypeSearchString:
        // "BOT360MALL",
        partnerDetails.value?.TenantProfileCreation?.TenantDetails?.TENANT_PARTNER_TYPE.split(
          /\s/
        )
          .join('')
          .concat(
            partnerDetails.value?.TenantProfileCreation?.TenantDetails?.TENANT_PARTNER_SUB_TYPE.split(
              /\s/
            ).join('')
          ) ||
        partnerDetails.value?.PartnerProfileCreation?.PartnerDetails?.PARTNER_TYPE.split(
          /\s/
        )
          .join('')
          .concat(
            partnerDetails.value?.PartnerProfileCreation?.PartnerDetails?.PARTNER_SUB_TYPE.split(
              /\s/
            ).join('')
          ),

      showSfdtx: false
    };

    let details = await contractAPI.getDocumentDetails(payload);
    setContractDocs(details?.content[0]);
  };
  React.useEffect(() => {
    if (modalcontext?.formIdentity === 'Add_Contract') {
      if (!isEmpty(partnerDetails.value)) {
        getDocumentDetails();
      }
    }
  }, [partnerDetails, modalcontext?.formIdentity]);
  return (
    <div>
      <Buttonsheet open={open} onClose={onClose} header={modalcontext?.header}>
        {backOffice && <ContractStepper activeStep={0} />}

        <Grid container direction="column" spacing={6}>
          {/* {!isEmpty(partnerDetails.value) && partnerDetails.value && (
            <CompanyDetails
              accordianDetails={details.value}
              partnerDetails={partnerDetails}
            />
          )} */}
          {!isEmpty(partnerDetails.value) && partnerDetails.value && (
            <Box px={5} mt={5}>
              <Paper elevation={0} >
                <Grid container direction="column">
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          spacing={4}
                        >
                          <Grid item>
                            <img src={CompanyLogo} />
                          </Grid>
                          <Grid item>
                            <Typography variant={'h4'}>
                              {partnerDetails?.value?.PartnerProfileCreation
                                ?.PartnerDetails?.PARTNER_NAME ||
                                partnerDetails?.value?.TenantProfileCreation
                                  ?.TenantDetails?.TENANT_NAME}
                              -{' '}
                              {partnerDetails?.value?.PartnerProfileCreation
                                ?.PartnerDetails?.Partner_ID ||
                                partnerDetails?.value?.TenantProfileCreation
                                  ?.TenantDetails?.TENANT_ID}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}

          <Grid item className={classes.docSpace}>
            <BottomSheetFormFields
              partnerId={details.value}
              formname={
                modalcontext.formIdentity === 'Add_Contract'
                  ? 'partnerContract'
                  : ''
              }
              formStyle={false}
              commissionCode={
                details.value?.commissionCode
                  ? details.value?.commissionCode
                  : modalcontext?.nodeDetails?.commissionCode
                  ? modalcontext?.nodeDetails?.commissionCode
                  : null
              }
              settlementCode={
                modalcontext?.nodeDetails?.settlementCode
                  ? modalcontext?.nodeDetails?.settlementCode
                  : ''
              }
              docsInfo={modalcontext}
              contractType={modalcontext?.contractType || 'AddProduct'}
              message={modalcontext?.message}
              formIdentity={modalcontext.formIdentity}
              setHierarchy={setHierarchy}
              categoryList={
                partnerDetails.value?.PartnerProfileCreation?.PartnerDetails
              }
              onClose={onClose}
              CmsDetails={contractDocument}
              backOffice={backOffice}
              prefilledData={backOffice ? contractObj : ''}
              backOfficeContractData={backOffice ? contractObj : ''}
              contractModification={contractModification}
              contractDocument={contractDocument?.contractDocURL}
              ProductForm={modalcontext.formIdentity === 'Add_Contract' && ['ContractInformation', 'UploadDocuments', 'CommissionRuleDetails', 'SettlementRuleDetails']}
            />
          </Grid>
          <Grid item>
            {modalcontext.formIdentity === 'Add_Contract' && (
              <>
                <Grid item>
                  <DocumentUpload
                    maintitle={'Contract Documents'}
                    documentDetails={
                      contractModification
                        ? {
                            contractDocURL:
                              contractObj?.AddContractFor?.ContractInformation
                                ?.Dynamic_Contract_Pdf
                          }
                        : contractDocument
                    }
                    DownloadPreview={DownloadPreview}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Buttonsheet>
    </div>
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
    height: '90vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.main
  },
  settBox: {
    border: '1px solid #e2e2e2',
    borderRadius: '16px',
    width: '100%'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  paperSpace: {
    borderRadius: '15px !important'
  },
  docSpace:{
    paddingBottom:'4px !important'
  }
}));
export default FormsCreation;
