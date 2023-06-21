import _ from 'lodash';
import dayjs from 'dayjs';

const makeTablentities = (data) => {
  let partnerDetails = {};
  let TenantDetails = {};
  if (data?.PartnerProfileCreation) {
    data?.PartnerProfileCreation?.sections?.map((item) => {
      partnerDetails = {
        ...partnerDetails,
        [item]: data.PartnerProfileCreation[item],
        status: 'MANAGE_HIERARCHY'
      };
    });

    return partnerDetails;
  } else {
    data.TenantProfileCreation.sections.map((item) => {
      TenantDetails = {
        ...TenantDetails,
        [item]: data.TenantProfileCreation[item],
        status: data?.TenantProfileCreation?.TenantDetails?.Onboarding_Status
      };
    });

    return TenantDetails;
  }
};

const makeResellerTablentities = (data) => {
  let resellerDetails = {};
  if (data?.ResellerProfileCreation) {
    data?.ResellerProfileCreation?.sections?.map((item) => {
      resellerDetails = {
        ...resellerDetails,
        [item]: data.ResellerProfileCreation[item],
        status: 'MANAGE_HIERARCHY'
      };
    });

    return resellerDetails;
  }
};

const makeTablerows = (data) => {
  //debugger;
  const [stepsValue] = data?.steps;
  const [initialValue] = data[stepsValue].sections;


  let row = {};
  let columns = {};
  if (data) {
    columns.id = data[stepsValue]['PartnerDetails'].Partner_ID;
    columns.partnerName = data[stepsValue]['PartnerDetails'].PARTNER_NAME;
    columns.mobileNo = data[stepsValue].PrimaryContactDetails?.MOBILE_NUMBER;
    columns.email = data[stepsValue].PrimaryContactDetails?.EMAIL_ID;
    columns.startDate = data?.createdDate;
    // columns.status = _.upperFirst(data?.stepsValue?.status);
    columns.status = data[stepsValue]['PartnerDetails']?.Onboarding_Status;
    // columns.mytaskcount = data[stepsValue]["PartnerDetails"].My_Task;
    columns.PARTNER_TYPE = data[stepsValue]['PartnerDetails'].PARTNER_TYPE;
    columns.PARTNER_SUB_TYPE =
      data[stepsValue]['PartnerDetails'].PARTNER_SUB_TYPE;
  }
  row = {
    columns,
    sections: data[stepsValue].sections,
    partners: data,
    partnerDetails: makeTablentities(data),
    formType: 'PARNTER '
  };
  return row;
};

const SelfcareTablerows = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.PartnerProfileCreation?.PartnerDetails?.Partner_ID;
    columns.partnerName =
      data?.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME;
    columns.mobileNo =
      data?.PartnerProfileCreation?.PrimaryContactDetails?.MOBILE_NUMBER;
    columns.email =
      data?.PartnerProfileCreation?.PrimaryContactDetails?.EMAIL_ID;
    columns.startDate = data?.createdDate;
    columns.status = _.upperFirst(data?.PartnerProfileCreation?.status);
    // columns.mytaskcount = data?.PartnerProfileCreation?.PartnerDetails?.My_Task;
  }
  row = {
    columns,
    sections: data.PartnerProfileCreation?.sections,
    partners: data,
    partnerDetails: makeTablentities(data),
    formType: 'SELFCARE_PARNTER'
  };
  return row;
};


const SelfcareResellerTablerows = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    // columns.id = data?.ResellerProfileCreation?.AgentDetails?.id;
    columns.id = data?.ResellerProfileCreation?.AgentDetails?.Agent_ID;
    columns.agentName =
      data?.ResellerProfileCreation?.AgentDetails?.FIRST_NAME; {' '}
      data?.ResellerProfileCreation?.AgentDetails?.LAST_NAME;
    columns.mobileNo =
      data?.ResellerProfileCreation?.AgentDetails?.AGENT_MOBILE_NUMBER;
    columns.email =
      data?.ResellerProfileCreation?.AgentDetails?.EMAIL;
    columns.startDate = data?.createdDate;
    columns.status = _.upperFirst(data?.ResellerProfileCreation?.AgentDetails?.Onboarding_Status) || _.upperFirst(data?.ResellerProfileCreation?.status);
    columns.agentSubType = data?.ResellerProfileCreation?.AgentDetails?.AGENT_SUB_TYPE || data?.ResellerProfileCreation?.AgentDetails?.SUB_CATEGORY;
    columns.agentType = data?.ResellerProfileCreation?.AgentDetails?.AGENT_TYPE || data?.ResellerProfileCreation?.AgentDetails?.CATEGORY;
    // columns.mytaskcount = data?.PartnerProfileCreation?.PartnerDetails?.My_Task;
  }
  row = {
    columns,
    sections: data.ResellerProfileCreation?.sections,
    partners: data,
    partnerDetails: makeResellerTablentities(data),
    formType: 'SELFCARE_PARNTER'
  };
  return row;
};

const ResellerDealerTbale = (data) => {
  let row = {};
  let columns = {};
  console.log(data, "dataxxx")
  if (data) {
    // columns.id = data?.ResellerProfileCreation?.AgentDetails?.id;
    columns.id = data?.partnerId;
    columns.agentName =
      data?.firstName; {' '}
      data?.lastName;
    columns.mobileNo =
      data?.mobile;
    columns.email =
      data?.email;
    columns.startDate = data?.createdDate;
    columns.status = data.status;
    columns.agentSubType = data?.agentSubCat;
    columns.agentType = data?.agentCat;
    // columns.mytaskcount = data?.PartnerProfileCreation?.PartnerDetails?.My_Task;
  }
  row = {
    columns,
    partners: data,

    formType: 'RESELLER_AGENT'
  };
  return row;
};



const makeTenantTablerows = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.TenantProfileCreation?.TenantDetails?.Partner_ID;
    columns.TenantId = data?.TenantProfileCreation?.TenantDetails?.TENANT_ID;
    columns.tenantName =
      data?.TenantProfileCreation?.TenantDetails?.TENANT_NAME;
    columns.mobileNo =
      data?.TenantProfileCreation?.PrimaryContactDetails?.MOBILE_NUMBER;
    columns.email =
      data?.TenantProfileCreation?.PrimaryContactDetails?.EMAIL_ID;
    columns.startDate = data?.createdDate;
    columns.status =
      data?.TenantProfileCreation?.TenantDetails?.Onboarding_Status;
    columns.mytaskcount = data?.TenantProfileCreation?.TenantDetails?.My_Task;
  }
  row = {
    columns,
    sections: data?.TenantProfileCreation?.sections,
    partners: data,
    partnerDetails: makeTablentities(data),
    formType: 'TENANT'
  };
  return row;
};

const makeRequestTablerows = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.customerInfo?.ticketId;

    // columns.partnerName = data?.customerInfo?.PARTNER_NAME;
    columns.RequestType = data?.customerInfo?.ticketName;

    columns.startDate = data?.createdDate;
    columns.assignee =
      data?.PartnerProfileCreation?.PrimaryContactDetails?.EMAIL_ID;
    columns.status = data?.status;
  }
  row = {
    columns,

    mytasks: data,
    tasks: columns
  };
  return row;
};

const makeTaskrows = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.id;
    columns.partnerName =
      data?.customerInfo?.PARTNER_NAME ||
      data?.customerInfo?.Settlment_Name ||
      data?.customerInfo?.commissionRuleName;
    data?.customerInfo?.PARTNER_NAME || data?.customerInfo?.Settlment_Name;
    columns.ApprovalType = data?.customerInfo?.ticketName;

    columns.startDate = data?.createdDate;
    columns.Initiator =
      data?.PartnerProfileCreation?.PrimaryContactDetails?.EMAIL_ID;
    columns.status = data?.status;
  }
  row = {
    columns,

    mytasks: data,
    tasks: columns
  };
  return row;
};


const makeHistoryRows = (data) => {
  console.log("sadasd: ", data)
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.id;
    columns.createdDate = data.createdDate
    columns.requestId = data.requestId
    columns.status = data?.status;
    columns.totalFailure = data.totalFailure
    columns.bulkType = data.bulkType
    columns.totalRecords = data.totalRecords
    columns.totalProcessed = data.totalProcessed
    columns.totalFailure = data.totalFailure,
    columns.actions = 'View More'

  }
  row = {
    columns,

    mytasks: data,
    tasks: columns
  };
  return row;
}

const makecontractTable = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.AddContractFor?.ContractInformation?.CONTRACT_ID;
    columns.partnerId = data?.AddContractFor?.ContractInformation?.Partner_ID;
    // columns.partnerOrProductName =
    //   data?.AddContractFor?.ContractInformation?.PRODUCT_ID !== ''
    //     ? data?.AddContractFor?.ContractInformation?.PRODUCT_NAME
    //     : data?.AddContractFor?.ContractInformation?.Partner_Name ||
    //     data?.AddContractFor?.ContractModificationHistory?.Partner_Name;
    columns.productName = data?.AddContractFor?.ContractInformation
      ?.PRODUCT_NAME
      ? data?.AddContractFor?.ContractInformation?.PRODUCT_NAME
      : data?.AddContractFor?.ContractModificationHistory?.PRODUCT_NAME ||
      (data?.AddContractFor?.ContractModificationHistory?.PRODUCT_ID === ''
        ? '-'
        : '-');
    columns.partnerName = data?.AddContractFor?.ContractInformation
      ?.Partner_Name
      ? data?.AddContractFor?.ContractInformation?.Partner_Name
      : data?.AddContractFor?.ContractModificationHistory?.Partner_Name;

    columns.Contract =
      data?.AddContractFor?.ContractInformation?.PRODUCT_ID === ''
        ? 'Partner'
        : 'Product';
    columns.partnerName =
      data?.AddContractFor?.ContractInformation?.Partner_Name ||
      data?.AddContractFor?.ContractInformation?.TENANT_NAME;
    columns.startDate = data?.AddContractFor?.ContractInformation?.START_DATE;
    columns.enddate = data?.AddContractFor?.ContractInformation?.END_DATE;
    columns.status =
      data?.AddContractFor?.ContractInformation?.Contract_Current_Status;
  }
  row = {
    columns,
    contractlist: data
  };

  return row;
};

const makeaddContractFor = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id =
      data?.AddContractFor?.ContractInformation?.CONTRACT_ID || data?.productId;
    columns.PartnerID = data?.AddContractFor?.ContractInformation?.Partner_ID;
    columns.partnerId = data?.AddContractFor?.ContractInformation?.Partner_ID;
    columns.partnerOrProductName =
      data?.AddContractFor?.ContractInformation?.PRODUCT_ID !== ''
        ? data?.AddContractFor?.ContractInformation?.PRODUCT_NAME
        : data?.AddContractFor?.ContractInformation?.Partner_Name;
    // data?.AddContractFor?.ContractInformation?.Partner_Name !== ''
    //   ? data?.AddContractFor?.ContractInformation?.Partner_Name
    //   : '';
    columns.Contract =
      data?.AddContractFor?.ContractInformation?.PRODUCT_ID !== ''
        ? 'Product'
        : 'Partner';
    columns.ContractType =
      data?.AddContractFor?.ContractInformation?.CONTRACT_TYPE;
    columns.ContractPeriod =
      data?.AddContractFor?.ContractInformation?.CONTRACT_PERIOD;
    columns.Signoffdate =
      data?.AddContractFor?.ContractInformation?.lastModifiedDate;

    columns.productId = data?.AddContractFor?.ContractInformation?.PRODUCT_ID;

    columns.startDate = data?.AddContractFor?.ContractInformation?.START_DATE;
    columns.enddate = data?.AddContractFor?.ContractInformation?.END_DATE;
    columns.status =
      data?.AddContractFor?.ContractInformation?.Contract_Current_Status;
  }
  row = {
    columns,
    addContract: data
  };

  return row;
};

const makeproductsrow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.ProductID = data?.AddProduct?.ProductDetails?.PRODUCT_ID;
    columns.Productname = data?.AddProduct?.ProductDetails?.PRODUCT_NAME;
    columns.PartnerName = data?.AddProduct?.ProductDetails?.PARTNER_NAME;
    columns.OnetimeCharge = data?.AddProduct?.PricingDetails?.ONE_TIME_CHARGE;
    columns.RecurringCharge =
      data?.AddProduct?.PricingDetails?.RECURRING_CHARGE;
    columns.id = data?.AddProduct?.ProductDetails?.Partner_ID;

    columns.PRODUCT_LOB = data?.AddProduct?.ProductDetails?.PRODUCT_LOB;
    columns.PRODUCT_TECHNOLOGY =
      data?.AddProduct?.ProductDetails?.PRODUCT_TECHNOLOGY;
    columns.RecurringDuration =
      data?.AddProduct?.PricingDetails?.RECURRING_DURATION;
    columns.ContractExpiry = '';
    columns.validate = data?.AddProduct?.status;
    columns.OnboardStatus = data?.AddProduct?.ProductDetails?.Onboard_Status;
    columns.SubStatus =
      data.AddProduct?.ProductDetails?.Dcm_Product_Configured === 'yes'
        ? 'DCM_PRODUCT_CONFIGURED'
        : data?.AddProduct?.status?.toUpperCase();
    if (data.AddProduct?.ProductDetails?.Contract_Added === 'no') {
      columns.status = 'CREATE_CONTRACT';
    } else if (data.AddProduct?.ProductDetails?.Contract_Added === 'yes') {
      columns.status = 'CONTRACT_CREATED';
      // columns.status="ADD_CONTRACT"
    } else if (data.AddProduct?.ProductDetails?.Contract_Added === 'pending') {
      columns.status = 'PENDING_CONTRACT';
    }
  }
  row = {
    columns,
    products: data
  };

  return row;
};

const makecustomerow = (data,i) => {
  let row = {};
  let columns = {};
  console.log(i, "ogini")
  if (data) {
   
    columns.id= i + 1
    columns.customerId = data?.customerId;
    columns.customerName = data?.customerName;
    columns.customerReview = data?.customerReview;
    columns.createdDate = data?.createdDate
  }
  row = {
    columns,
    products: data
  };
  //console.log(row, 'ROSAXXX');
  return row;
};

const makeTenantrow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.TenantID = data?.TenantProfileCreation?.TenantDetails?.TENANT_ID;
    columns.TenantName =
      data?.TenantProfileCreation?.TenantDetails?.TENANT_NAME;
    columns.PrimaryContactName =
      data?.TenantProfileCreation?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME;
    columns.ManagerName =
      data?.TenantProfileCreation?.PartnerRelationshipManager?.NAME;
    columns.ContractExpiry =
      data?.TenantProfileCreation?.PricingDetails?.RECURRING_CHARGE;
    columns.status =
      data?.TenantProfileCreation?.TenantDetails?.Onboarding_Status;
  }
  row = {
    columns,
    Tenants: data
  };

  return row;
};

const makeOrderRow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.orderId;
    columns.customerID = data?.customerId;

    columns.productName = data?.productName;
    columns.productID = data?.productId || '--';
    columns.PurchaseDate = data?.purchaseDate;
    columns.partnerId = data?.partnerId;

    // columns.partnerShare = '';

    columns.status = data?.subStatus;
  }
  row = {
    columns,
    orders: data
  };

  return row;
};

const makeDCMOrderRow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.producId;
    columns.productName = data?.productName;

    columns.productLOB = data?.productLOB;
    columns.productID = data?.productId || '--';
    columns.partnerId = data?.partnerId;

    columns.productTechnology = data?.productTechnology;
    columns.createdDate = data?.createdDate;
    columns.productionSpecificationType = data?.productionSpecificationType;
    // columns.partnerShare = '';

    columns.status = data?.lifeCycle;
  }
  row = {
    columns,
    orders: data
  };

  return row;
};

const makepaymentRow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.id;
    columns.Date = data?.createdDate;
    columns.method = 'Cash';
    columns.purposeOfTranx = data?.purposeOfTranx;

    columns.credit = `${data?.depositAmount}`;
    columns.Debit = `${data?.withdrawAmount}`;
    columns.Availablebalance = `${_.round(data?.balance, 2)}`;
    // columns.partnerShare = '';

    columns.status = data?.status;
    columns.negative = data?.balance;
  }
  row = {
    columns,
    list: data
  };

  return row;
};

const TableRow = (data, balance) => {
  let rows = [];

  Object.values(data).map((row) => {
    rows.push({
      rowlist: row?.list,
      columns: {
        ...row.columns,
        credit: `${balance.currency}  ${row.columns.credit}`,
        Debit: `${balance.currency}  ${row.columns.Debit}`,
        Availablebalance: `${balance.currency}  ${row.columns.Availablebalance}`
      }
    });
  });

  return rows;
};

const makeSettlementrow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.invoiceId;
    columns.settlementId = data?.settlementId;
    columns.settlementDate = data?.settlementDate;
    columns.Description = data?.description;
    columns.amount = `${data?.settlementAmount}`;
    columns.negative = data?.settlementAmount;
  }
  row = {
    columns,
    list: data
  };
  return row;
};
const makeAdjustmentRow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.adjustmentId;
    columns.Date = data?.createdDate;
    (columns.method = data?.method),
      // (columns.amount = `KWD ${data?.amount}.00`);
      (columns.Agentname = '');
    columns.Description = data?.description;
    columns.amount =
      data?.method === 'credit'
        ? `KWD ${data?.creditAmount}`
        : `KWD ${data?.debitAmount}`;
    columns.Debit = `KWD ${data?.debitAmount}`;
  }
  row = {
    columns,
    list: data
  };
  return row;
};
const makeInvoicerow = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.id = data?.invoiceId;
    columns.date = data?.createdDate;
    columns.dueDate = data?.dueDate;
    columns.InvoiceTotal = ` ${_.round(data?.invoiceAmount, 2)}`;
    columns.negative = data?.invoiceAmount;
    columns.Payable = `${data?.payableAmount}`;
    columns.Receivable = `${_.round(data?.receivableAmount, 2)}`;
    (columns.status = data?.status),
      (columns.statusNegitive = data?.invoiceAmount);
  }
  row = {
    columns,
    list: data
  };
  return row;
};

const makeProductrowList = (data, item, payload) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.CustomerId = data?.CustomerId;
    (columns.OrderId = data?.OrderId),
      (columns.Purchasedata = data?.Purchasedata);
    columns.Receivedamount = `KWD ${data?.Receivedamount}`;
  }
  row = {
    columns,
    list: data,
    product: item,
    rowlist: payload
  };
  return row;
};

const makebillingAdjustmentList = (data, payload) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.Date = data?.date;
    (columns.InvoiceID = data?.newInvoiceId),
      (columns.Adjustmenttype = data?.method);
    columns.Reason = data?.description;
    columns.Amount =
      data?.method === 'credit'
        ? `KWD ${data?.creditAmount}`
        : `KWD ${data?.debitAmount}`;
    columns.Eventcolor = data?.method === 'credit' ? 'green' : 'red';
  }
  row = {
    columns,

    rowlist: payload
  };
  return row;
};

const User_TenantTable = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.TenantID = data?.partnerId;
    (columns.Tenantname = data?.tenantPartnerName),
      (columns.Name = data?.partnerName);
    columns.email = data?.email;
    (columns.mobileNo = data?.mobile), (columns.Associated = '');
    (columns.Substatus = 'master'), (columns.isMasterUser = true);
  }
  row = {
    columns,

    rowlist: data
  };
  return row;
};
const User_MasterTable = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.PartnerId = data?.partnerId;
    (columns.Partnername = data?.masterPartnerName),
      (columns.Name = data?.partnerName);
    columns.email = data?.email;
    (columns.mobileNo = data?.mobile),
      (columns.Associated = ''),
      // columns.status:"TENANT PARTNER",
      (columns.Substatus = 'tenant'),
      (columns.isTenantUse = true);
  }
  row = {
    columns,

    rowlist: data
  };
  return row;
};

const PartnerSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      const { PartnerDetails, PrimaryContactDetails } =
        data?.PartnerProfileCreation;
      row.push({
        Partner_ID: PartnerDetails?.Partner_ID,
        Partner_Name: PartnerDetails?.PARTNER_NAME,
        Partner_mobileNo: PrimaryContactDetails?.MOBILE_NUMBER,
        PARTNER_TYPE: PartnerDetails?.PARTNER_TYPE,
        email: PrimaryContactDetails?.EMAIL_ID,
        PARTNER_SUB_TYPE: PartnerDetails?.PARTNER_SUB_TYPE,
        date: DateFormat(data?.createdDate),
        status: PartnerDetails?.Onboarding_Status,
        mainrow: data,
        pdflist: [
          PartnerDetails?.Partner_ID,
          PartnerDetails?.PARTNER_NAME,
          PrimaryContactDetails?.MOBILE_NUMBER,
          PrimaryContactDetails?.EMAIL_ID,
          DateFormat(data?.createdDate),
          PartnerDetails?.Onboarding_Status
        ]
      });
    });
  }

  return row;
};
const PartnerProductSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      const { ProductDetails } = data?.AddProduct;
      row.push({
        Partner_ID: ProductDetails?.Partner_ID,
        Product_ID: ProductDetails?.PRODUCT_ID,
        Product_Name: ProductDetails?.PRODUCT_NAME,
        Product_LoB: ProductDetails?.PRODUCT_LOB,
        date: ProductDetails?.PRODUCT_NAME,
        Quantity: 1,

        date: DateFormat(data?.createdDate),

        status: ProductDetails?.Onboard_Status,

        pdflist: [
          ProductDetails?.Partner_ID,
          ProductDetails?.PRODUCT_ID,
          ProductDetails?.PRODUCT_NAME,
          ProductDetails?.PRODUCT_LOB,
          '1',
          DateFormat(data?.createdDate),
          ProductDetails?.Onboard_Status
        ]
      });
    });
  }

  return row;
};

const PartnerOrderSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      row.push({
        Partner_ID: data?.partnerId,

        Order_ID: data?.orderId,
        Product_Name: data?.productName,
        Customer_ID: data?.customerId,

        date: DateFormat(data?.activationDate),

        status: data?.status,
        pdflist: [
          data?.partnerId,
          data?.orderId,
          data?.productName,
          data?.customerId,
          DateFormat(data?.activationDate),
          data?.status
        ]
      });
    });
  }

  return row;
};

const PartnerSalesSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      row.push({
        Partner_ID: data?.partnerId,

        Partner_Name: data?.partnerName,

        Product_Sold: data?.productSold,

        Target_achieved: data?.targetAchieved,
        date: '',
        pdflist: [
          data?.partnerId,
          data?.partnerName,
          data?.productSold,
          data?.targetAchieved
        ]
      });
    });
  }

  return row;
};

const PartnerPaymentSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      row.push({
        Partner_ID: data?.partnerId,

        Partner_Name: data?.partnerName,
        invoiceId: data?.invoiceId,
        amountPaid: data?.amountPaid,
        amountDue: data?.amountDue,
        date: DateFormat(data?.date),
        status: data?.status,
        pdflist: [
          data?.partnerId,
          data?.partnerName,
          data?.invoiceId,
          data?.amountPaid,
          data?.amountDue,
          DateFormat(data?.date),
          data?.status
        ]
      });
    });
  }

  return row;
};
const PartnerRevenuSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      row.push({
        partnerId: data?.partnerId,
        partnerName: data?.partnerName,
        productSold: data?.productSold,

        salesRevenu: data?.salesRevenu,
        date: DateFormat(data?.date),
        pdflist: [
          data?.linkedFormId,
          data?.partnerId,
          data?.partnerName,
          data?.productSold,
          data?.salesRevenu,
          DateFormat(data?.date)
        ]
      });
    });
  }

  return row;
};

const PartnerSettelementSummaryTable = (list) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      row.push({
        amountDue: data?.amountDue,

        partnerId: data?.partnerId,
        partnerName: data?.partnerName,
        receivable: data?.receivable,

        id: data?.id,
        date: DateFormat(data?.settelementDate),
        payableAmount: data?.payableAmount,
        pdflist: [
          // data.id,
          data?.partnerId,
          data?.partnerName,
          DateFormat(data?.settelementDate),
          data?.payableAmount,
          data?.receivable,
          data?.amountDue
        ]
      });
    });
  }

  return row;
};

const PartnerTroubleTicketTable = (list, customer) => {
  let row = [];
  let columns = {};
  if (list) {
    _.map(list, (data) => {
      row.push({
        TicketID: data?.id,

        PartnerID: _.get(data?.relatedParty, '[0].id'),
        TicketType: data?.ticketType,
        PartnerName: _.filter(data?.relatedParty, ['role', 'Customer'])[0]
          ?.name,

        LastModifiedby: _.last(data?.ticketActivity).author,
        CreateDate: DateFormat(data?.createdDate),
        ModifyDate: DateFormat(data?.modifiedDate),
        ResolutionDate: data?.resolutionDate
          ? DateFormat(data?.resolutionDate)
          : '-',
        status: data?.status,

        pdflist:
          customer === true
            ? [
              data?.id,
              _.get(data?.relatedParty, '[0].id'),
              _.filter(data?.relatedParty, ['role', 'Customer'])[0]?.name,
              data?.ticketType,

              DateFormat(data?.createdDate),
              DateFormat(data?.modifiedDate),
              _.last(data?.ticketActivity).author,
              data?.resolutionDate ? DateFormat(data?.resolutionDate) : '-',

              data?.status
            ]
            : [
              data?.id,
              _.get(data?.relatedParty, '[0].id'),

              data?.ticketType,

              DateFormat(data?.createdDate),
              DateFormat(data?.modifiedDate),
              _.last(data?.ticketActivity).author,
              data?.resolutionDate ? DateFormat(data?.resolutionDate) : '-',

              data?.status
            ]
      });
    });
  }

  return row;
};

const userGroupTable = (data) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.username = data?.username;
    columns.email = data?.email;
    (columns.mobile = data?.mobile),
      (columns.task_bandwidth = data?.activeTasks);
    columns.pushed_task = data?.pausedTasks;
    columns.current_task = data?.currentTasks;
    columns.active_tasks = data?.activeTasks;
    columns.status = data?.availbility;
  }
  row = {
    columns,
    list: data
  };

  return row;
};

const TaskworkflowTable = (data, index) => {
  let row = {};
  let columns = {};
  if (data) {
    columns.SLNO = index + 1;
    (columns.WORKFLOW_ID = data?._id), (columns.workflowName = data?.name);

    columns.Workflow = 'workflow';
    //columns.ACTIONS = 'Settings';

    columns.status = data?.availbility;
  }
  row = {
    columns,
    list: data
  };

  return row;
};

const DateFormat = (date) => dayjs(date).format('DD MMM YYYY');
export default {
  makeInvoicerow,
  makeAdjustmentRow,
  makeSettlementrow,
  makeaddContractFor,
  makeTablentities,
  makeResellerTablentities,
  makeTablerows,
  makeTaskrows,
  makeHistoryRows,
  makecontractTable,
  makeproductsrow,
  makeTenantrow,
  makeOrderRow,
  makecustomerow,
  makeRequestTablerows,
  makepaymentRow,
  TableRow,
  makeProductrowList,
  makeTenantTablerows,
  makebillingAdjustmentList,
  SelfcareTablerows,
  SelfcareResellerTablerows,
  makeDCMOrderRow,
  User_TenantTable,
  User_MasterTable,
  PartnerSummaryTable,
  PartnerProductSummaryTable,
  PartnerOrderSummaryTable,
  PartnerSalesSummaryTable,
  PartnerPaymentSummaryTable,
  PartnerRevenuSummaryTable,
  PartnerSettelementSummaryTable,
  userGroupTable,
  TaskworkflowTable,
  PartnerTroubleTicketTable,
  ResellerDealerTbale
};
