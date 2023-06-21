import React, { Component } from 'react';

import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import {
  ProductConfiguration as OrderCapture,
  convertProductOfferingPrice,
  AllowanceSection
} from '@tt-dclm/dclm-web-ui-presales';
import { Products } from 'Http/api';
import { connect } from 'react-redux';

import { makeStyles, Grid } from '@material-ui/core';
import Form from 'Store/Form';
import ModalsStore from 'Store/Modals';
import { Stepper } from 'lib/components';
import FullScreenDilaog from 'Components/Dialogs/FullScreenDialog';

import OpportunityFactory from 'Factory/Opportunity';
import HooksFormWrapper from 'lib/components/HooksFormWrapper/HooksFormWrapper';
import LeadAPI from 'Http/api/leads';

import ChangeProduct from './ChangeProduct';

import LeadFactory from 'Factory/Lead';
import _ from 'lodash';
// import { Trans } from '@lingui/macro';
const formId = 'quoteGenerationForm';

class ProductConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentId: '',
      productItems: {},
      LeadID: '',
      formOptions: {},
      details: {},
      productIdentifier: {},
      loadingdata: false,
      Opportunity: {},
      oppId: '',
      status: 'QUOTE_GENERATE',
      isFormSubmitted: false,
      addvas: [],
      loadproducts: [],
      characteristics: [],
      orderItemlist: [],
      serviceRequest: {},
      showcharacteristics: false
    };
  }

  componentDidMount() {
    if (this.props?.servicedata) {
      this.setState({
        Opportunity: this.props.servicedata,
        LeadID: this.props?.lead?.id
      });
    }
    if (this.props.oppData) {
      this.setState({
        LeadID: this.props.lead.id,

        loadingdata: true,
        Opportunity: this.props.oppData
      });

      if (this.props.oppData?.quote) {
        if (this.props.oppData?.quote?.orderItem?.length >= 0) {
          this.setState({
            status: 'MODIFY_QUOTE'
          });
        }
      }
    }
    if (this.props.oppData && this.props.oppData?.products) {
      let data = this.props.oppData?.products.map((item) => {
        if (item.lob === 'ICTServices') {
          this.setState({
            status: 'MANUAL_FEASIBILITY'
          });
        }
      });

      this.setState({
        products: this.props.oppData?.products || []
      });
    }
    //  else {
    //   if (this.props.lead.serviceOfInterest.products) {
    //     this.setState({
    //       products:
    //         Object.values(this.props.lead.serviceOfInterest.products) || [],
    //     });
    //   }
    // }

    if (this.props?.oppData?.publicIdentifier) {
      this.getproductIdentifier(this.props?.oppData?.publicIdentifier);
    }

    if (this.props.subscriptiondata) {
      this.getproductIdentifier(this.props.subscriptiondata.publicIdentifier);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.oppData && this.props.oppData?.products) {
      if (
        !_isEqual(this.props.oppData?.products, prevProps.oppData?.products)
      ) {
        this.setState({
          products: this.props.oppData?.products
        });
      }
    }

    if (
      this.props?.modalState?.IsSubmitInSaveAndExitModal &&
      this.props?.modalState?.IsSaveAndExit &&
      !this.props?.modalState?.IsSaveAndExitModalOpen
    ) {
      if (!this.state.isFormSubmitted) {
        this.setState({ isFormSubmitted: true }, () => this.handleSubmit());
      }
    }

    // else {
    //   if (
    //     this.props.lead.serviceOfInterest.products &&
    //     !_isEqual(
    //       this.props.lead.serviceOfInterest.products,
    //       prevProps.lead.serviceOfInterest.products
    //     )
    //   ) {
    //     this.setState({
    //       products:
    //         Object.values(this.props.lead.serviceOfInterest.products) || [],
    //     });
    //   }
    // }
  }

  productConfigurationDetails = null;
  updateProductOrder = (details) => {
    this.productConfigurationDetails = details;
  };

  getFullProductOffering = async (offerId) => {
    const product = await Products.getFullProduct(offerId);
    return convertProductOfferingPrice(product);
  };

  getOrderlist = (data) => {
    if (this.props.oppData?.serviceRequestType === 'ONBOARDING') {
      return data;
    } else {
      for (var i = 0; i < data.orderItem.length; i++) {
        // data.orderItem[i].actionSubTyp = "";
        if (this.props?.oppData?.serviceRequestType === 'CHANGE_PLAN') {
          data.orderItem[i].actionSubType = 'changePlan';
        } else if (this.props?.oppData?.serviceRequestType === 'ADD_VAS') {
          data.orderItem[i].actionSubType = 'addVAS';
          let obj = Object.assign({}, data.orderItem[i].product, {
            productRelationship: [
              {
                product: {
                  id: this.state.productIdentifier?.id,

                  '@referredType': 'Product',

                  '@schemaLocation': '',

                  href: ''
                },

                type: 'reliesOn',

                relationshipType: 'reliesOn'
              }
            ]
          });

          data.orderItem[i].product = obj;
        } else {
          data.orderItem[i].actionSubType = 'modifyPlan';
          data.orderItem[i].action = 'noChange';

          let obj = Object.assign({}, data.orderItem[i].product, {
            id: this.state.productIdentifier?.id
          });
          data.orderItem[i].product = obj;

          for (var k = 0; k < data.orderItem[i]?.orderItem?.length; k++) {
            data.orderItem[i].orderItem[k].actionSubType = 'modifyPlan';
            data.orderItem[i].orderItem[k].action = 'modify';

            let obj = Object.assign(
              {},
              data.orderItem[i].orderItem[k].product,
              {
                id: this.state.productIdentifier?.id
              }
            );
            data.orderItem[i].orderItem[k].product = obj;
          }
        }
      }

      return data;
    }
  };

  getorderitem = (payload) => {
    if (
      this.props.changePlandata?.serviceRequestType ===
      'SUBSCRIPTION_MODIFICATION'
    ) {
      this.setState({
        orderItemlist: OpportunityFactory.modifyplanpayload(payload),
        showcharacteristics: true
      });
    }
  };
  getnewpayload = async (data) => {
    let payload = {};

    return payload;
  };

  handleSubmit = (e) => {
    const { submitForm, isValid, values, serviceRequest, errors } =
      this.productConfigurationDetails;

    if (isValid && _isEmpty(errors)) {
      if (
        this.props?.modalState?.IsSaveAndExit &&
        !this.props?.modalState?.IsSubmitInSaveAndExitModal
      ) {
        this.props.toggleSaveandExit({
          key: 'IsSaveAndExitModalOpen',
          value: true
        });
      } else {
        if (
          this.props.changePlandata?.serviceRequestType ===
          'SUBSCRIPTION_MODIFICATION'
        ) {
          if (
            LeadFactory.getSRrequest(
              this.props.lead?.opportunities,
              this.props.changePlandata
            )
          ) {
            this.props.modifyPlan({
              id: this.state.LeadID,
              leaddata: this.props.lead,
              user: this.props.userdata,
              duration: this.props?.duration,
              status: this.state.status,
              oppId: this.state.oppId,
              parent: this.props.parent,
              quote: {
                ...this.getOrderlist(
                  this.productConfigurationDetails?.values.item
                )
              },
              opportunities: [
                {
                  id: this.state.oppId,
                  publicIdentifier:
                    this.props.subscriptiondata?.publicIdentifier,
                  status: this.state.status,
                  lob: this.state.productIdentifier?.LoB,
                  serviceRequestType: 'SUBSCRIPTION_MODIFICATION',

                  date: new Date().toISOString(),

                  products: [
                    {
                      id: this.state.productIdentifier?.productOffering?.id,
                      name: this.state.productIdentifier?.productOffering?.name,
                      businessType: [this.state.productIdentifier.businessType],
                      lob: this.state.productIdentifier?.LoB
                    }
                  ],
                  // orderItem: this.state.orderItemlist.orderItem,
                  quote: {
                    ...this.getOrderlist(
                      this.productConfigurationDetails?.values.item
                    )
                  }
                }
              ]
            });

            this.setState({ isFormSubmitted: false });
            this.props.toggleSaveandExit({
              key: 'IsSubmitInSaveAndExitModal',
              value: false
            });
          } else {
            this.props.Alertopen({
              type: 'error',
              message: `Please wait while one of your Service Request is due  `
            });
          }
        } else {
          this.props.onSubmit({
            id: this.state.LeadID,
            leaddata: this.props.lead,
            user: this.props.user,
            duration: this.props?.duration,
            status: this.state.status,
            oppId: this.state.Opportunity?.id,
            parent: this.props.parent,
            changeplan: this.props.changePlandata,
            contract: this.state.Opportunity?.contract,
            status: this.props?.modalState?.IsSaveAndExit
              ? 'PRODUCT_CONFIGURATION'
              : this.state.status,
            isSaveAndExit: this.props?.modalState?.IsSaveAndExit,
            // quote: {
            //   ...this.productConfigurationDetails?.values.item,
            // },
            quote: {
              ...this.getOrderlist(
                this.productConfigurationDetails?.values.item
              )
            }
          });
          this.setState({ isFormSubmitted: false });
          this.props.toggleSaveandExit({
            key: 'IsSubmitInSaveAndExitModal',
            value: false
          });
        }
      }
    } else {
      if (
        this.productConfigurationDetails &&
        this.productConfigurationDetails.submitForm
      ) {
        this.productConfigurationDetails.submitForm(e);
      }
    }
  };
  handleLeadClasification = (data) => {
    // setClassification(data.code);
  };
  handleLeadAssignment = (data) => {
    // captureLead.setValue({ ...captureLead.value, leadAssignment: data });
  };

  getproductIdentifier = async (id) => {
    const oppId = await LeadAPI.getoppurtunityId().catch((err) => {});
    const res = await LeadAPI.publicIdentifier(id).catch((err) => {});

    let temp = [];

    let payload = {
      id: _.get(res, '[0].productOffering.id', ''),
      productId: _.get(res, '[0].id', '')
    };

    this.getorderitem(payload);
    const resdata = await LeadAPI.productInvertory(
      _.get(res, '[0].id', '')
    ).catch((err) => {});

    if (resdata.length) {
      // Auto populate productInventory Items into serviceRequest

      const characteristics = [];
      let productId = '';
      for (const data of resdata) {
        for (const relation of _.get(data, 'productRelationship', {})) {
          if (_.get(relation, 'product.characteristic', []).length) {
            productId = _.get(relation, 'product.id', []);
            characteristics.push(
              ..._.get(relation, 'product.characteristic', [])
            );
          }
        }
      }
      characteristics.length && this.setState({ characteristics, productId });
    }

    this.setState({
      serviceRequest: _.get(res, '[0]', ''),
      oppId: oppId.id,
      productIdentifier: _.get(res, '[0]', ''),

      loadproducts: [
        {
          id: _.get(res, '[0].productOffering.id', ''),
          name: _.get(res, '[0].productOffering.name', '')
        }
      ],

      loadingdata: true
    });
  };

  render() {
    const { products } = this.state;

    const {
      recurringPeriods = null,
      activatedVia = null,
      open,
      onSubmit,
      lead,
      loading,
      Steppersdata,
      onClose
    } = this.props;

    const {
      currentId,
      LeadID,
      productOffering,
      addvas,
      loadproducts,
      serviceRequest,
      showcharacteristics
    } = this.state;

    const customerType = 'Organization';

    return (
      <FullScreenDilaog open={open}>
        <HooksFormWrapper onSubmit={this.handleSubmit}>
          {({ register, errors, control, setValue }) => (
            <Stepper
              id={LeadID}
              // id={currentId.value}
              title="Create Lead"
              onClose={onClose}
              // onMainAction={this.handleSubmit}
              isSubmitting={loading}
              Steppersdata={Steppersdata}
              onClickSaveAndExit={() =>
                this.props.toggleSaveandExit({
                  key: 'IsSaveAndExit',
                  value: true
                })
              }
              activeStep={2}
              completedSteps={['OPPORTUNITY_CREATION']}
              footerInfo={
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  spacing={10}
                ></Grid>
              }
              body={() =>
                this.state.loadingdata ? (
                  <>
                    <Grid container direction="column" spacing={4}>
                      {/* <Grid item>
                          <CompanyCard
                            handleLeadClasification={
                              this.handleLeadClasification
                            }
                            handleLeadAssignment={this.handleLeadAssignment}
                            register={register}
                            formOptions={this.state.formOptions}
                            control={control}
                            details={this.state.details}
                          />
                        </Grid> */}
                      {Object.keys(this.state.productIdentifier).length > 0 ? (
                        <Grid item>
                          <ChangeProduct data={this.state.productIdentifier} />
                        </Grid>
                      ) : (
                        ''
                      )}
                      {this.state.characteristics.length > 0 &&
                      showcharacteristics ? (
                        <Grid item>
                          <AllowanceSection
                            characteristicData={this.state.characteristics}
                            title={'Current Characteristics'}
                          />
                        </Grid>
                      ) : (
                        ''
                      )}

                      <Grid item>
                        <OrderCapture
                          products={
                            this.props.changePlandata?.serviceRequestType ===
                            'SUBSCRIPTION_MODIFICATION'
                              ? loadproducts
                              : products
                          }
                          customerType={customerType}
                          getFullProductOffering={this.getFullProductOffering}
                          recurringPeriods={recurringPeriods}
                          onProductConfigurationChange={this.updateProductOrder}
                          activatedVia={activatedVia}
                          isDocumentCaptureRequired={false}
                          isLocationCaptureRequired={false}
                          isInventoryCaptureRequired={false}
                          serviceRequest={serviceRequest}
                          requestType={serviceRequest['@type']}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item> Loading ... </Grid>
                  </Grid>
                )
              }
            />
          )}
        </HooksFormWrapper>
      </FullScreenDilaog>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main
  },
  step: {
    '& $completed': {
      color: '#2ED573'
    },
    '& $active': {
      color: '#FFA502'
    },
    '& $disabled': {
      color: 'red'
    }
  },
  alternativeLabel: {},
  active: {},
  completed: {},
  disabled: {}
}));
const mapState = (state) => ({
  masterdata: state.master.data,
  fieldData: state.fieldData.data,
  auth: state.auth.user,
  usersState: state.users,
  modalState: state.modals
});
const mapActions = {
  addNewForm: Form.add,
  initializeFormMetadata: Form.initMetadata,
  addMetadata: Form.addMetadata,
  updateFields: Form.updateFields,
  updateFormValues: Form.updateValues,
  openModal: ModalsStore.open,
  closeModal: ModalsStore.close,
  toggleSaveandExit: ModalsStore.toggleSaveandExit
};

export default connect(mapState, mapActions)(ProductConfiguration);

// export default ProductConfiguration;
