import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import PartnerApi from 'Http/api/Partner';
import { useStateful } from 'react-hanger';

import { Grid, makeStyles } from '@material-ui/core';

import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';

import ContractDetails from 'Features/Forms/ContractDetails';
import { Typography } from '@material-ui/core';
import CommissionRuleDetail from '../TaskDetails/CommissionRuleDetails/CommissionRuleDetail';
// import SettlementRule from 'Features/TaskDetails/SettlementRuleDetails/SettlementRule';
import { isEmpty } from 'lodash';

import DocumentUpload from 'lib/components/DocumentUpload/DocumentUpload';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import contractAPI from 'Http/api/contract';

// import PartnerDetails from 'Features/LeadDetails/PartnerDetails';
const ProductContract = ({
  open,
  onClose,
  modalcontext,
  getproductLists,
  productrowlist,
  DownloadPreview
}) => {
  const classes = useStyles();
  const [settlementRuleDetails, setSettlementRuleDetails] = React.useState({});
  const [commissionRuleDetails, setCommissionRuleDetails] = React.useState({});
  const [partnerData, setPartnerdata] = React.useState({});

  const [contractDocument, setContractDocs] = React.useState({});

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
  const getPartnerDetail = async (id) => {
    if (id.substring(0, 2) === 'MP') {
      let Details = await PartnerApi.getPartnerDetails(id);
      setPartnerdata(Details);
    } else if (id.substring(0, 2) === 'TP') {
      let Details = await PartnerApi.getTenantDetails(id);
      setPartnerdata(Details);
    }
  };
  React.useEffect(() => {
    getCommissionRulesDetail(
      modalcontext?.details?.rowlist?.AddProduct?.CommissionRuleDetails
        ?.Commission_Rule
    );
  }, [modalcontext]);

  React.useEffect(() => {
    getPartnerDetail(modalcontext?.partnerdata?.id);
  }, [modalcontext]);

  React.useEffect(() => {
    getSettlementRulesDetail(
      partnerData[0]?.TenantProfileCreation?.SettlementRuleDetails
        ?.settlementCode ||
        partnerData[0]?.PartnerProfileCreation?.SettlementRuleDetails
          ?.settlementCode
    );
  }, [partnerData]);

  const documentDetails = async () => {
    let contractDocs = await contractAPI.getContractDocs();
    setContractDocs(contractDocs[0]);
  };
  const getDocumentDetails = async () => {

    console.log("here 3xc")
    let payload = {
      pageNumber: 0,
      pageSize: 30,
      sortDirection: 'DESC',
      sortField: 'createdDate',
      useSorting: true,
      categorySearchString: '',
      subCategorySearchString: '',
      lobSearchString:
        modalcontext?.details?.rowlist?.AddProduct?.ProductDetails?.PRODUCT_LOB,
      serviceRequestNameSearchString:
        modalcontext?.details?.rowlist?.AddProduct?.ProductDetails
          ?.PRODUCT_TECHNOLOGY,
      formTypeSearchString: `${modalcontext?.details?.rowlist?.AddProduct?.ProductDetails?.PRODUCT_LOB}${modalcontext?.details?.rowlist?.AddProduct?.ProductDetails?.PRODUCT_TECHNOLOGY}`,
      showSfdtx: false
    };
    let details = await contractAPI.getDocumentDetails(payload);
    setContractDocs(details?.content[0]);
  };
  React.useEffect(() => {
    // documentDetails();
    getDocumentDetails();
  }, []);

  const details = useStateful({});
  return (
    <div>
      <Buttonsheet
        open={true}
        onClose={onClose}
        header={'Adding contract for Product'}
      >
        <Grid container direction="row" style={{ paddingBottom: '18px' }}>
          <Grid item flexGrow={1}>
            <Grid item>
              <Typography variant="h4">
                {modalcontext?.partnerdata?.name} -
                {modalcontext?.partnerdata?.id}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                Product ID: {modalcontext?.details?.columns?.ProductID} |
                Products:
                {modalcontext?.partnerdata?.productCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" spacing={6}>
          <Grid item>
            <ContractDetails context={modalcontext} />
          </Grid>

          <Grid item>
            <Accordion
              disableGutters
              defaultExpanded={true}
              elevation={0}
              className={classes.paperSpace}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h2" className={classes.title}>
                  Commission Rule Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {!isEmpty(commissionRuleDetails) && (
                  <card className={classes.settBox}>
                    <Grid item>
                      <CommissionRuleDetail
                        maintitle={''}
                        commissionRuleDetails={commissionRuleDetails}
                      />
                    </Grid>
                  </card>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item>
            <BottomSheetFormFields
              partnerId={{ partnerId: modalcontext.partnerdata }}
              productId={{ rowData: modalcontext.details?.rowlist }}
              formIdentity="Add_Contract"
              contractType={modalcontext?.contractType}
              formStyle={true}
              message="Contract created successfully, Approval pending"
              settlementCode={
                partnerData && partnerData[0]?.TenantProfileCreation?.SettlementRuleDetails
                  ?.settlementCode ||
                  partnerData && partnerData[0]?.PartnerProfileCreation?.SettlementRuleDetails
                  ?.settlementCode
              }
              commissionCode={
                modalcontext?.details?.rowlist?.AddProduct
                  ?.CommissionRuleDetails?.Commission_Rule
              }
              contractDocument={contractDocument?.contractDocURL}
              CmsDetails={contractDocument}
              ProductForm={['ContractInformation','MinimumGuaranteeDetails', 'UploadDocuments']}
              onClose={onClose}
            />
          </Grid>

          <Grid item>
            <DocumentUpload
              maintitle={'Contract Documents'}
              documentDetails={contractDocument}
              context={modalcontext}
              DownloadPreview={DownloadPreview}
            />
          </Grid>
        </Grid>
      </Buttonsheet>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paperSpace: {
    borderRadius: '15px !important'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  settBox: {
    border: '1px solid #e2e2e2',
    borderRadius: '16px',
    width:'100%'
  }
}));

export default ProductContract;
