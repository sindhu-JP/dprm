import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import PartnerApi from 'Http/api/Partner';
import { useStateful } from 'react-hanger';
import { Grid } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import ProductDetails from './ProductDetails';
import AgentDetails from './AgentDetails';
import productApi from 'Http/api/Partner';
import ProductFactory from 'Factory/Partner';
import CustomerDetails from './CustomerDetails';
import DashboardApi from 'Http/api/dashboard';
import parseRes from 'Factory/PartnerRes';
import ManualDetails from './ManualDetails';
const OrderDetails = ({
  open,
  onClose,
  modalcontext,
  getproductLists,
  productrowlist,
  partnerdetails,
  OrderSelfcareComplete
}) => {

  console.log(modalcontext, "modalcontext")
  const Productdetails = useStateful({});
  const { details } = modalcontext;
  const engagedPartyObj = useStateful({});
  const fullProductdetails = useStateful({});
  const commissionRules = useStateful({});
  const Address = useStateful({});
  const AccountOwnerDetails = useStateful({});
  const getProductdetails = async () => {
    if (details?.rowlist?.productType !== 'SmartLocation') {
      let data = await productApi.getProductDetails(
        _.get(details, 'columns.productID', '')
      );
      fullProductdetails.setValue(_.get(data, '[0]', {}));
      Productdetails.setValue({
        ...ProductFactory.productdetails(_.get(data, '[0]', {}))
      });
      if (data) {
        getcommissionRules(
          _.get(
            data,
            '[0].AddProduct.CommissionRuleDetails.Commission_Rule',
            ''
          ),
          _.get(data, '[0]', {})
        );
      }
    } else {
      if (
        partnerdetails?.details?.PartnerProfileCreation
          ?.CommissionRulesDetails ||
        partnerdetails?.details?.TenantProfileCreation?.CommissionRulesDetails
      ) {
        getcommissionRules(
          partnerdetails?.details?.PartnerProfileCreation
            ?.CommissionRulesDetails?.Commission_Rule ||
            partnerdetails?.details?.TenantProfileCreation
              ?.CommissionRulesDetails?.Commission_Rule
        );
      }
    }
  };

  const getcommissionRules = async (code, data) => {
    const details = await productApi.getcommissionRules(code);
    console.log(details, "vnvnvnvnv")
    commissionRules.setValue(_.get(details, '[0]'));
    let CommitssonDetails = _.get(details, '[0]');
    if (modalcontext?.details?.rowlist?.subStatus === 'Created') {
      CompleteOrder(CommitssonDetails, data);
    } else {
      // CompleteOrder(CommitssonDetails, data);
    }
  };

  React.useEffect(() => {
    if (modalcontext) {
      getSmartlocationDetails();
      getProductdetails();
      ReletedpartyDetails();
    }
  }, []);
  const CompleteOrder = (CommitssonDetails, data) => {
    const payload = {
      walletId:
        _.get(
          partnerdetails.details,
          'PartnerProfileCreation.PartnerDetails.Wallet_ID',
          ''
        ) ||
        _.get(
          partnerdetails.details,
          'TenantProfileCreation.TenantDetails.Wallet_ID',
          ''
        ),
        channel:modalcontext?.details?.rowlist?.orderChannel,
        channelCommission: CommitssonDetails?.channelCommission,
      commissionRuleName: CommitssonDetails?.commissionRuleName,
      currency: CommitssonDetails?.currency,
      commissionType: CommitssonDetails?.commissionType,
      commissionValue: CommitssonDetails?.commissionValue,
      commissionMode: CommitssonDetails?.commissionRuleName,
      status: 'Approved',
      // subStatus:"Completed",
      commissionRuleRange: CommitssonDetails?.commissionRuleRange,
      invoiceId: _.get(modalcontext.details, 'rowlist.invoiceId'),
      orderItemId: _.get(modalcontext.details, 'rowlist.orderItemId', ''),
      partnerName:
        _.get(data, 'AddProduct.ProductDetails.PARTNER_NAME', '') ||
        _.get(
          partnerdetails.details,
          'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
          ''
        ) ||
        _.get(
          partnerdetails.details,
          'TenantProfileCreation.TenantDetails.TENANT_NAME',
          ''
        ),
      productName: _.get(data, 'AddProduct.ProductDetails.PRODUCT_NAME', ''),
      partnerId:
        _.get(data, 'AddProduct.ProductDetails.Partner_ID', '') ||
        _.get(
          partnerdetails.details,
          'PartnerProfileCreation.PartnerDetails.Partner_ID',
          ''
        ) ||
        _.get(
          partnerdetails.details,
          'TenantProfileCreation.TenantDetails.TENANT_ID',
          ''
        ),
      eventStatus: 'completed',
      orderId: _.get(modalcontext.details, 'rowlist.orderId', ''),
      productId: _.get(modalcontext.details, 'rowlist.productId', ''),
      customerId: _.get(modalcontext.details, 'rowlist.customerId', ''),
      purchaseDate: _.get(modalcontext.details, 'rowlist.purchaseDate', ''),
      address: _.get(modalcontext.details, 'rowlist.address', ''),
      activationDate: '14/02/2020',
      serviceId: _.get(modalcontext.details, 'rowlist.serviceId', ''),
      comments: _.get(modalcontext.details, 'rowlist.comments', ''),
      paymentdetails: {
        paidAmount:
          _.get(data, 'AddProduct.PricingDetails.ONE_TIME_CHARGE', '0') ||
          _.get(modalcontext.details, 'rowlist.paymentdetails.paidAmount', ''),

        unpaidAmount: _.get(
          modalcontext.details,
          'rowlist.paymentdetails.unpaidAmount',
          ''
        ),

        invoiceDate: ''
      },
      agentdetails: _.get(modalcontext.details, 'rowlist.agentdetails'),
      customerBillingCycle: _.get(
        modalcontext.details,
        'rowlist.customerLifeCycle',
        []
      ),
      pricingDetails: {
        currency:
          _.get(data, 'AddProduct.PricingDetails.CURRENCY', '') ||
          _.get(modalcontext.details, 'rowlist.pricingDetails.currency', ''),
        oneTimeCharge:
          _.get(data, 'AddProduct.PricingDetails.ONE_TIME_CHARGE', '') ||
          _.get(
            modalcontext.details,
            'rowlist.pricingDetails.oneTimeCharge',
            ''
          ),
        recurringCharge:
          _.get(data, 'AddProduct.PricingDetails.RECURRING_CHARGE', '') ||
          _.get(
            modalcontext.details,
            'rowlist.pricingDetails.recurringCharge',
            ''
          ),
        recurringDuration:
          _.get(data, 'AddProduct.PricingDetails.RECURRING_DURATION', '') ||
          _.get(
            modalcontext.details,
            'rowlist.pricingDetails.recurringDuration',
            ''
          )
      }
    };
    OrderSelfcareComplete({
      payload,
      trackingid: _.get(modalcontext.details, 'rowlist.id', '')
    });
  };
  const ReletedpartyDetails = async () => {
    const details = await DashboardApi.getCustomerDetails(
      _.get(modalcontext.details, 'rowlist.customerId', '')
    );

    engagedPartyObj.setValue(_.get(details, '[0]', ''));

    Address.setValue({
      ...parseRes.makeInstallationAdress(_.get(details, '[0].engagedParty', {}))
    });
    AccountOwnerDetails.setValue({
      ...parseRes.OwnerDetails(_.get(details, '[0].relatedParty', {}))
    });
  };
  const getSmartlocationDetails = async () => {
    let data = await PartnerApi.getSmartlocation(
      _.get(modalcontext.details, 'rowlist.orderId', '')
    );

    const updateobj = {
      productName: _.get(data, '[0].productName'),
      lob: 'DigitalServices',
      productId: _.get(data, '[0].productId'),

      technology: _.get(data, '[0].productType'),

      sublist: {
        'PRODUCT NAME': _.get(data, '[0].productName'),
        LOB: 'DigitalServices',
        'PRODUCT ID': _.get(data, '[0].productId'),
        'AVAILABLE FROM': '-',
        'AVAILABLE TO': '-',
        TECHNOLOGY: _.get(data, '[0].productType'),
        //  "PRODUCT TECHNOLOGY":_.get(data, "[0].productType"),
        'PARTNER NAME': _.get(data, '[0].partnerName')
      }
    };

    if (details?.rowlist?.productType === 'SmartLocation') {
      Productdetails.setValue(updateobj);
    }
  };

  return (
    <div>
      <Buttonsheet open={true} onClose={onClose} header={' ORDER DETAILS'}>
        <Grid container direction="column" spacing={6}>
          <Grid item>
            <Typography variant="h2">
              {details?.rowlist?.productName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              ORDER ID: {details?.columns?.id} | ORDER TYPE:{' '}
              {details?.rowlist?.orderType}
            </Typography>
          </Grid>

         {!details?.columns?.totalCommission && <Grid item>
            <CustomerDetails
              Details={details?.rowlist}
              engagedPartyObj={engagedPartyObj.value}
              Address={Address.value}
              AccountOwnerDetails={AccountOwnerDetails.value}
            />
          </Grid>}
          {/* {!_.isEmpty(details?.rowlist?.productId) && ( */}
      {!details?.columns?.totalCommission &&    <Grid item>
            <ProductDetails
              Productdetails={Productdetails.value}
              paymentDatails={details?.rowlist?.paymentdetails}
              CompleteOrder={CompleteOrder}
              status={modalcontext?.details?.rowlist?.status}
            />
          </Grid>}
          {/* )} */}
          

         {!details?.columns?.totalCommission && <Grid item>
            {/* <AgentDetails agentdetails={details?.rowlist?.agentdetails} /> */}
            <AgentDetails
            Details={details?.rowlist}
              agentdetails={modalcontext?.details?.rowlist?.agentdetails}
              channelName="DCLM"
            />
          </Grid>
}
         {details?.columns?.totalCommission && <Grid item>
            {/* <AgentDetails agentdetails={details?.rowlist?.agentdetails} /> */}
           <ManualDetails details={details}/>
          </Grid>}

          {/* <Grid item>
            <Comments />
          </Grid> */}
          {/* <Grid item xs={12}>
            <CopyRightFooter />
          </Grid> */}
        </Grid>
      </Buttonsheet>
    </div>
  );
};

export default OrderDetails;
