import { TecnotreedigitalSales, TecnotreeTroubleTicket } from './../axios';

import Utils from 'Factory/Utils';
import QueryString from 'Utils/QueryString';
// import { Masterdata } from 'lib/utils';

const _parterReports = async () => {
  return await TecnotreedigitalSales.get(`/list/LINKEDFORMAA9Y3S26`)
    .then((res) => res.data)
    .catch((err) => {});
};
const _ParterProductReports = async (limit, offset, value, SearchQuery) => {
  return await TecnotreedigitalSales.get(
    `/search/Add_Product?AddProduct.status=Approved&${QueryString.queryObj({
      limit: limit,
      [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
    })}&offset=${offset}`
  )
    .then((res) => (res ? res : null))
    .catch((err) => null);
};
const PartnerTroubleTicketSummary = async (
  limit,
  offset,
  value,
  SearchQuery
) => {
  return await TecnotreeTroubleTicket.get(
    `/troubleTicket?sort=-createdDate&LoB=DPRM&${QueryString.queryObj({
      limit,

      [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
    })}&offset=${offset}`
  )
    .then((res) => res)
    .catch((err) => {});
};

const PartnerCustomerTicketSummary = async (
  limit,
  offset,
  value,
  SearchQuery
) => {
  return await TecnotreeTroubleTicket.get(
    `/troubleTicket?sort=-createdDate&type=PartnerCustomerTicket&${QueryString.queryObj({
      limit,
      [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
    })}&offset=${offset}`
  )
    .then((res) => res)
    .catch((err) => {});
};
const _ParterOrderReports = async (limit, offset, value, SearchQuery) => {
  return await TecnotreedigitalSales.get(
    `/orderTracking?sort=-createdDate&${QueryString.queryObj({
      limit: limit,
      [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
    })}&offset=${offset}&orderChannel=dclm`
  )
    .then((res) => res)
    .catch((err) => {});
};

const _ParterSalesReports = async (limit, offset, value, SearchQuery) => {
  return await TecnotreedigitalSales.get(`/reports/partner-sales-summary?sort=-createdDate&${QueryString.queryObj({
    limit,
    [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
  })}&offset=${offset}`)
    .then((res) => res)
    .catch((err) => {});
};
// PartnerOrderSummary   PartnerTroubleTicketSummary PartnerCustomerTicketSummary
const OnFilterSalesReports = async (payload) => {
  let endPoint =  `/reports/partner-sales-summary?sort=-createdDate&createdDate>${
    payload.fromDate
  }T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&status=${
    payload.status
  }&offset=${payload.offset ? payload.offset : 0}&limit=${
    payload.limit ? payload.limit : '10'
  }`;

  const data = await TecnotreedigitalSales.get(endPoint).then((res) => res).catch((err) => {});
  console.log('data', data)
  return data;
};

const _ParterPaymentReports = async (limit, offset, value, SearchQuery, fromDate, toDate) => {
  const date = toDate && fromDate ? `&createdDate>${
    fromDate
  }T00:00:00.000Z&createdDate<${toDate}T24:00:00.000Z` : '';

  return await TecnotreedigitalSales.get(`/reports/partner-payment-summary?${QueryString.queryObj({
    limit,
    [SearchQuery?.code]: _.isEmpty(SearchQuery) ? '' : value
  })}&offset=${offset}${date}`)
    .then((res) => res)
    .catch((err) => {});
};

const _ParterRevenuReports = async (limit, offset) => {
  return await TecnotreedigitalSales.get(`/reports/partner-revenu-summary?limit=${limit ?? 10}&offset=${offset ?? 0}`)
    .then((res) => res)
    .catch((err) => {});
};

const _ParterSettelementReports = async (limit, offset) => {
  const pageSize = limit ? limit : 10;
  const pageIndex = offset ? offset : 0;
return await TecnotreedigitalSales.get(`/reports/partner-settelement-summary?limit=${pageSize}&offset=${pageIndex}`)
    .then((res) => res )
    .catch((err) => {});
};

const _OnfilterReports = async (payload, URL) => {
  if (URL) {
    return await TecnotreedigitalSales.post(`/reports/${URL}`, payload)
      .then((res) => res)
      .catch((err) => {});
  } else {
    return await TecnotreedigitalSales.post(`/filterlist`, payload)
      .then((res) => res)
      .catch((err) => {});
  }
};

const _getListOfLob = async () => {
  return await TecnotreedigitalSales.get(`/masterdata?type=serviceType`)
    .then((res) => res.data)
    .catch((err) => {});
};
const _getpartnerType = async () => {
  return await TecnotreedigitalSales.get(`/masterdata/operator?operator=STC`)
    .then((res) => res.data)
    .catch((err) => {});
};
const _getpartnersubType = async (type) => {
  return await TecnotreedigitalSales.get(
    `masterdata/operator?operator=STC&partnerType=${type}`
  )
    .then((res) => res.data)
    .catch((err) => {});
};
const _OnfilterOrderReports = async (payload) => {
  let endPoint = '';
  if (payload.fromDate && payload.toDate && !payload.status) {
    endPoint = `/orderTracking?createdDate>${payload.fromDate}T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  } else if (payload.fromDate && payload.toDate && payload.status) {
    endPoint = `/orderTracking?sort=-createdDate&sort=-createdDate&createdDate>${
      payload.fromDate
    }T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&status=${
      payload.status
    }&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  } else if (payload.status) {
    endPoint = `/orderTracking?sort=-createdDate&status=${payload.status}&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  }
  const data = await TecnotreedigitalSales.get(endPoint).then((res) => res);
  return data;
};
const _OnfilterTroubleTicketReports = async (payload) => {
  let endPoint = '';
  if (payload.fromDate && payload.toDate && !payload.status) {
    endPoint = `/troubleTicket?sort=-createdDate&createdDate>${payload.fromDate}T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&LoB=DPRM&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : 10
    }`;
  } else if (payload.fromDate && payload.toDate && payload.status) {
    endPoint = `/troubleTicket?sort=-createdDate&createdDate>${
      payload.fromDate
    }T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&status=${
      payload.status
    }&LoB=DPRM&offset=${payload.offset ? payload.offset : '1'}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  } else if (payload.status) {
    endPoint = `/troubleTicket?sort=-createdDate&status=${payload.status}&LoB=DPRM&offset=${payload.offset ? payload.offset : '1'}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  }
  const data = await TecnotreeTroubleTicket.get(endPoint).then((res) => res);
  return data;
};

const _OnfilterCustomerTicketReports = async (payload) => {
  console.log('payload', payload)
  let endPoint = '';
  if (payload.fromDate && payload.toDate && !payload.status) {
    endPoint = `/troubleTicket?sort=-createdDate&type=PartnerCustomerTicket&createdDate>${payload.fromDate}T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : 10
    }`;
  } else if (payload.fromDate && payload.toDate && payload.status) {
    endPoint = `/troubleTicket?sort=-createdDate&type=PartnerCustomerTicket&createdDate>${
      payload.fromDate
    }T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&status=${
      payload.status
    }&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : 10
    }`;
  } else if (payload.status) {
    endPoint = `/troubleTicket?sort=-createdDate&type=PartnerCustomerTicket&status=${payload.status}&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : 10
    }`;
  }
  const data = await TecnotreeTroubleTicket.get(endPoint).then(
    (res) => res.data
  );
  return data;
};
const _FilterByPartnerSummaryApi = async (payload) => {
  const makepayload = {
    Onboarding_Status: payload?.Onboarding_Status || payload?.status,
    PARTNER_SUB_TYPE: payload?.PARTNER_SUB_TYPE || '',
    PARTNER_TYPE: payload?.PARTNER_TYPE || ''
  };
  let endPoint = '';
  console.log('payload', payload);

   if (
    payload.fromDate &&
    payload.toDate &&
    (payload.Onboarding_Status ||
      payload.PARTNER_SUB_TYPE ||
      payload.PARTNER_TYPE)
  ) {
    
    endPoint = `/search/Partner_Profile?PartnerProfileCreation.status=Approved&createdDate>${
      payload.fromDate
    }T00:00:00.000Z&createdDate<${
      payload.toDate
    }T24:00:00.000Z&${Utils.getUpdatedURL(
      makepayload,
      'PartnerProfileCreation.PartnerDetails'
    )}&limit=${
      payload.limit ? payload.limit : 10}&offset=${payload.offset ? payload.offset : 0}`;
  }
  else if (
    payload.fromDate &&
    payload.toDate
  ) {
    endPoint = `/search/Partner_Profile?PartnerProfileCreation.status=Approved&createdDate>${payload.fromDate}T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&limit=${
      payload.limit ? payload.limit : 10}&offset=${payload.offset ? payload.offset : 0}`;
  } else {
    endPoint = `/search/Partner_Profile?${Utils.getUpdatedURL(
      makepayload,
      'PartnerProfileCreation.PartnerDetails'
      )}&limit=${
        payload.limit ? payload.limit : 10}&offset=${payload.offset ? payload.offset : 0}`;
  }
  const data = await TecnotreedigitalSales.get(endPoint)
    .then((res) => res)
    .catch((err) => {});
  return data;
};

const _FilterByPartnerProductSummary = async (payload) => {
  const makepayload = {
    Onboard_Status: payload?.status,
    // payload?.status == 'Active'
    //   ? 'ACTIVE'
    //   : 'Pending'
    //   ? 'PENDING'
    //   : payload?.status,
    PRODUCT_LOB: payload?.PRODUCT_LOB || ''
  };
  let endPoint = '';
  if (
    payload.fromDate &&
    payload.toDate &&
    (payload.status || payload.PRODUCT_LOB)
  ) {
    endPoint = `/search/Add_Product?createdDate>${
      payload.fromDate
    }T00:00:00.000Z&createdDate<${
      payload.toDate
    }T24:00:00.000Z&${Utils.getUpdatedURL(
      makepayload,
      'AddProduct.ProductDetails'
    )}&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  } 
  else if (
    payload.fromDate &&
    payload.toDate
  ) {
    endPoint = `/search/Add_Product?AddProduct.status=Approved&createdDate>${payload.fromDate}T00:00:00.000Z&createdDate<${payload.toDate}T24:00:00.000Z&offset=${payload.offset ? payload.offset : 0}&limit=${
      payload.limit ? payload.limit : '10'
    }`;
  } 
  else {
    endPoint = `/search/Add_Product?${Utils.getUpdatedURL(
      makepayload,
      'AddProduct.ProductDetails'
    )}&offset=${payload.offset ? payload.offset : 0 }&limit=${
      payload.limit ? payload.limit : 10
    }`;
  }
  const data = await TecnotreedigitalSales.get(endPoint).then(
    (res) => res
  );

  return data;
};

export default {
  _parterReports,
  _ParterProductReports,
  _ParterOrderReports,
  _OnfilterReports,
  _getListOfLob,
  _getpartnerType,
  _getpartnersubType,
  _OnfilterOrderReports,
  _ParterSalesReports,
  _ParterPaymentReports,
  _ParterRevenuReports,
  _ParterSettelementReports,
  _FilterByPartnerSummaryApi,
  _FilterByPartnerProductSummary,
  PartnerTroubleTicketSummary,
  _OnfilterTroubleTicketReports,
  PartnerCustomerTicketSummary,
  _OnfilterCustomerTicketReports,
  OnFilterSalesReports
};

// /manualtask
