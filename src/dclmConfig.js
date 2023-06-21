export default {
  basePath: "/digital-prm-web-ui/",
  dev: {
    apiConfig: {
      clickStream: {
        href: "/publish",
      },
      individual: {
        href: "/customer-service/partyManagement/v1/individual",
        strategy: "reduxFirst",
      },
      organization: {
        href: "/customer-service/partyManagement/v1/organization",
        strategy: "reduxFirst",
      },
      customer: {
        href: "/customer-service/customerManagement/v1/customer",
        strategy: "reduxFirst",
      },
      customerSearch: {
        href: "/customer-service/customerManagement/v1/search/customer",
        strategy: "reduxFirst",
      },
      ssoIndividual: {
        href: "/customer-service/partyManagement/v1/ssoIndividual",
        strategy: "networkFirst",
      },
      partyInteraction: {
        href: "/partyInteractionManagement/v1/partyInteraction",
        strategy: "networkFirst",
      },
      partyRole: {
        href: "/customer-service/partyRoleManagement/v1/partyRole",
        strategy: "reduxFirst",
      },
      registrationRequest: {
        href: "/customerInteractionService/v1/registrationRequest",
        strategy: "networkFirst",
      },
      partyInteractionUpdate: {
        href: "/partyInteractionManagement/v1/partyInteraction",
        strategy: "networkFirst",
      },
      productOffering: {
        href: "/dclm-product-catalog/product-offering",
        strategy: "reduxFirst",
      },
      productOfferingPrice: {
        href: "/dclm-product-catalog/product-offering-price",
        strategy: "reduxFirst",
      },
      productSpecification: {
        href: "/dclm-product-catalog/product-specification",
        strategy: "reduxFirst",
      },
      policyEvaluate: {
        href: "/dclm-product-catalog/policy/evaluate",
        strategy: "networkFirst",
      },
      ruleService: {
        href: "/rules-service/1/DAP/1",
        strategy: "reduxFirst",
      },
      uiSearch: {
        href: "/customerSearch",
        strategy: "networkFirst",
      },
      userTasks: {
        href: "/dom/user-taskss",
        strategy: "networkFirst",
      },
      billingAccount: {
        href: "/accountManagement/v1/account",
        strategy: "reduxFirst",
      },
      invoice: {
        href: "/customerBillManagement/v1/customerBill",
        strategy: "reduxFirst",
      },
      documentManagement: {
        href: "/documentManagement/v1/document",
        strategy: "reduxFirst",
      },
      productInventoryManagement: {
        href: "/productInventoryManagement/v1/product",
        strategy: "reduxFirst",
      },
      preValidateServiceRequest: {
        href: "/partyInteractionManagement/v1/partyInteraction/preValidate",
        strategy: "networkFirst",
      },
      addPlanProductRequest: {
        href: "/customerInteractionService/v1/addPlanProductRequest",
        strategy: "networkFirst",
      },
      addVasProductRequest: {
        href: "/partyInteractionManagement/v1/addVasProductRequest",
        strategy: "networkFirst",
      },
      suspendProductRequest: {
        href: "/customerInteractionService/v1/suspendProductRequest",
        strategy: "networkFirst",
      },
      simChangeRequest: {
        href: "/customerInteractionService/v1/simChangeRequest",
        strategy: "networkFirst",
      },
      terminateVasProductRequest: {
        href: "/partyInteractionManagement/v1/terminateVASProductRequest",
        strategy: "networkFirst",
      },
      changeCreditLimitRequest: {
        href: "/customerInteractionService/v1/changeCreditLimitRequest",
        strategy: "networkFirst",
      },
      transferOfOwnershipRequest: {
        href: "/customerInteractionService/v1/transferOfOwnershipRequest",
        strategy: "networkFirst",
      },
      documentUploadRequest: {
        href: "/dms",
        strategy: "networkFirst",
      },
      revokeSuspendProductRequest: {
        href: "/partyInteractionManagement/v1/revokeSuspendProductRequest",
        strategy: "networkFirst",
      },
      terminatePlanProductRequest: {
        href: "/partyInteractionManagement/v1/terminatePlanProductRequest",
        strategy: "networkFirst",
      },
      paymentAgainstInvoiceRequest: {
        href: "/customerInteractionService/v1/paymentAgainstInvoiceRequest",
        strategy: "networkFirst",
      },
      accountUpdateRequest: {
        href: "/customerInteractionService/v1/billingAccountUpdateRequest",
        strategy: "networkFirst",
      },
      customerRequestSpecification: {
        href: "/rulesManagement/customerRequestSpecification",
        strategy: "networkFirst",
      },
      productChangeRequest: {
        href: "/partyInteractionManagement/v1/ProductChangeRequest",
        strategy: "networkFirst",
      },
      changePlanProductRequest: {
        href: "/partyInteractionManagement/v1/changePlanProductRequest",
        strategy: "networkFirst",
      },
      modifyPlanProductRequest: {
        href: "/partyInteractionManagement/v1/modifyPlanProductRequest",
        strategy: "networkFirst",
      },
      resetPasswordRequest: {
        href: "/partyInteractionManagement/v1/resetPasswordRequest",
        strategy: "networkFirst",
      },
      relocateProductRequest: {
        href: "/partyInteractionManagement/v1/relocateProductRequest",
        strategy: "networkFirst",
      },
      getThirdPartyLinks: {
        href: "/web-ui-service/v1/thirdpartyLinks",
        strategy: "networkFirst",
      },
      troubleTicketManagement: {
        href: "/troubleTicketManagement/v1",
        strategy: "networkFirst",
      },
      logicalResourceInventoryManagement: {
        href: "/resourceInventoryManagement/v1/logicalResource",
        strategy: "networkFirst",
      },
      physicalResourceInventoryManagement: {
        href: "/resourceInventoryManagement/v1/physicalResource",
        strategy: "networkFirst",
      },
      masterData: {
        href: "/masterData",
        strategy: "networkFirst",
      },
      tsatMasterData: {
        href: "/v1/minsat",
        strategy: "networkFirst",
      },
      dcbsMasterData: {
        href: "/web-ui-service/v1/masterData",
        strategy: "networkFirst",
      },
      customerInformationUpdate: {
        href: "/partyInteractionManagement/v1/partyInteraction",
        strategy: "networkFirst",
      },
      customerInfoUpdate: {
        href: "/customerInteractionService/v1/customerInformationUpdateRequest",
        strategy: "networkFirst",
      },
      customerBillManagement: {
        href: "/customerBillManagement/v1/customerBill",
        strategy: "networkFirst",
      },
      partyInteractionSave: {
        href: "/partyInteractionManagement/v1",
        strategy: "networkFirst",
      },
      usageDetails: {
        href: "/usageDetails",
        strategy: "networkFirst",
      },
      promiseToPay: {
        href: "/customerInteractionService/v1/promiseToPayRequest",
        strategy: "networkFirst",
      },
      getInvoicesOfAnAccount: {
        href: "/customerBillManagement/v1/customerBill",
        strategy: "networkFirst",
      },
      paymentManagement: {
        href: "/paymentManagement/v1/payment",
        strategy: "networkFirst",
      },
      tSat: {
        href: "/tsat-ui",
        strategy: "networkFirst",
      },
      portInRequest: {
        href: "/customerInteractionService/v1/portInRequest",
        strategy: "networkFirst",
      },
      existingMSISDNInventoryCheck: {
        href:
          "/partyInteractionManagement/v1/partyInteraction/validate/existingMSISDNInventoryCheck",
        strategy: "networkFirst",
      },
      reportGenerator: {
        href: "/reportGenerator/v1/report",
        strategy: "networkFirst",
      },
      proformaGenerator: {
        href: "/reportGenerator/v3/report",
        strategy: "networkFirst",
      },
      serviceRequest: {
        href: "/customerInteractionService/v1",
        strategy: "networkFirst",
      },
      paymentTransaction: {
        href: "/paymentManagement/v1/paymentTransaction",
        strategy: "networkFirst",
      },
      usageApi: {
        href: "/usageApi/v1",
        strategy: "networkFirst",
      },
      recommendationOffers: {
        href: "/recommendation",
      },
      equipmentDetails: {
        href: "/integration-service/v1/deviceDetails",
        strategy: "networkFirst",
      },
      frequentlyDialledNumbers: {
        href: "/usageApi/v1/frequentDialedNumbers",
        strategy: "networkFirst",
      },
      daDetails: {
        href: "/usageApi/v1/daDetails",
        strategy: "networkFirst",
      },
      walletBalance: {
        href:
          "/3pp/http-proxy-connector/rest/v1/customer-identification/product",
        strategy: "networkFirst",
      },
      // Schema api
      customerSchema: {
        href: "/customer-service/customerManagement/v1/customer/schema",
        strategy: "reduxFirst",
      },
      bulkUpload: {
        href: "/bulkProcess/v1/bulkJob",
        strategy: "networkFirst",
      },
      pushGprs: {
        href: "/partyInteractionManagement/v1/pushGprsRequest",
        strategy: "networkFirst",
      },
      otpService: {
        href: "/otpService/v1/otp",
        strategy: "networkFirst",
      },
      accountManagement: {
        href: "/accountManagement/v1",
        strategy: "networkFirst",
      },
      invoiceDownload: {
        href: "/ngb/invoices/bills-view",
        strategy: "networkFirst",
      },
      productOrderManagement: {
        href: "/productOrderingManagement/v1",
        strategy: "networkFirst",
      },
      serviceLevelAgreement: {
        href: "/dcm/service-level-agreement-service/v1",
        strategy: "networkFirst",
      },
      productOfferingQualification: {
        href: "/dcm/product-offering-qualification/v1",
        strategy: "networkFirst",
      },
      paymentExchangeRate: {
        href: "/paymentManagement/v1/exchangeRate",
        strategy: "networkFirst",
      },
      drm: {
        href: "/drm/resource-pool/v1",
        strategy: "networkFirst",
      },
      customizationService: {
        href: "/dclm-customization-service/dms/tpr",
        strategy: "networkFirst",
      },
    },
  },
  sso: {
    opco: "mtng",
  },
};
