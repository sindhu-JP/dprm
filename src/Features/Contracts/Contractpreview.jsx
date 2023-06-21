import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import PartnerApi from 'Http/api/Partner';
import { useStateful } from 'react-hanger';
import { Grid } from '@material-ui/core';
import ProductDetails from 'Features/TaskDetails/ProductDetails/Product';

export default function Contractpreview({ open, onClose, modalcontext }) {
  const ContractDetails = useStateful({});
  const PartnerData = useStateful({});
  const TenantData = useStateful({});
  const ProdcutDetails = useStateful({});
  const { details } = modalcontext;
  const getContractDetail = async (id) => {
    if (
      details?.id?.startsWith('CR') ||
      details?.columns?.id?.startsWith('CR')
    ) {
      let Details = await PartnerApi.getContractDetails(
        details?.id || details?.columns?.id
      );   
      ContractDetails.setValue(_.get(Details, '[0]', ''));
    } else {
      return;
    }
  };

  React.useEffect(() => {
    getContractDetail();
    getPartnerdetails();
    getproductDetail();
  }, [modalcontext]);

  const getPartnerdetails = async (data) => {
    if (details?.partnerId?.substring(0, 2) === 'MP') {
      let Details = await PartnerApi.getPartnerDetails(
        details?.partnerId || modalcontext?.contractrow?.details?.id
      );

      PartnerData.setValue(_.get(Details, '[0]', ''));
    } else if (details?.partnerId?.substring(0, 2) === 'TP') {
      let Details = await PartnerApi.getTenantDetails(
        details?.partnerId || modalcontext?.contractrow?.details?.id
      );

      PartnerData.setValue(_.get(Details, '[0]', ''));
    }
  };

  const getproductDetail = async (id) => {
    if (id?.substring(0, 2) === 'PR') {
      let Details = await PartnerApi.getProductDetails(
        details?.rowlist?.PRODUCT_ID ||
          modalcontext?.details?.rowlist?.AddContractFor?.ContractInformation
            ?.PRODUCT_ID
      );

      ProdcutDetails.setValue(_.get(Details, '[0]', ''));
    }
  };
  const UpdateContractsection = (data) => {
    return {
      ...data,
      UploadDocuments: {
        'Contract Document ': data?.UploadDocuments?.COMPANY_REGISTRATION
      }
    };
  };
  return (
    <div>
      <Buttonsheet open={open} onClose={onClose}>
        <Grid container direction="column" spacing={6}>
          {/* {PartnerData.value?.PartnerProfileCreation && (
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
             {PartnerData.value?.TenantProfileCreation && (
            <>
              {PartnerData.value?.TenantProfileCreation?.sections.map(
                (item) => {
                  return (
                    <Grid item>
                      <PartnerDetails
                        title={item}
                        partnerDetails={
                          PartnerData.value?.TenantProfileCreation
                        }
                      />
                    </Grid>
                  );
                }
              )}
            </>
          )}

          {Object.keys(ProdcutDetails.value).length > 0 && (
            <Grid item>
              <ProductDetails
                // title={item}
                maintitle={'Product Information'}
                productData={ProdcutDetails.value?.AddProduct}
              />
            </Grid>
          )} */}

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
        </Grid>
      </Buttonsheet>
    </div>
  );
}
