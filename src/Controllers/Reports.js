import { createAsyncThunk } from '@reduxjs/toolkit';
// import dashboard from 'Http/api/dashboard';
import ReportsApi from 'Http/api/Reports';

const LoadAll_Partner_Reports = createAsyncThunk(
  'dashboard/Load_Reports',
  async () => {
    const data = await ReportsApi._parterReports().catch((err) => {});

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const LoadAll_PartnerProduct_Reports = createAsyncThunk(
  'dashboard/LoadAll_PartnerProduct_Reports',
  async ({ limit = 10, offset = 0, searchValue = '', SearchQuery = '' }) => {
    try {
      const data = await ReportsApi._ParterProductReports(
        limit,
        offset,
        searchValue,
        SearchQuery
      );

      let count = data.headers['x-count'];
      return {
        list: data?.data,
        xCount: count
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const LoadAll_PartnerOrder_Reports = createAsyncThunk(
  'dashboard/LoadAll_PartnerOrder_Reports',
  async ({ limit = 20, offset = 0, searchValue = '', SearchQuery = '' }) => {
    console.log("LoadAll_PartnerOrder_Reports", {searchValue, SearchQuery, offset, limit})
    const data = await ReportsApi._ParterOrderReports(
      limit,
      offset,
      searchValue,
      SearchQuery
    ).catch((err) => {});

    let count = data.headers['x-total-count'];

    return {
      list: data?.data.sort(
        (a, b) => Date.parse(b.activationDate) - Date.parse(a.activationDate)
      ),
      xCount: count
    };
  }
);

const _LoadAllPartnerSales_Reports = createAsyncThunk(
  'dashboard/_LoadAllPartnerSales_Reports',
  async ({ limit = 20, offset = 0, searchValue = '', SearchQuery = '' }) => {
    const data = await ReportsApi._ParterSalesReports(limit, offset, searchValue, SearchQuery).catch((err) => {});

    return {list: data?.data, xCount: data.headers['x-total-count']};
  }
);
const OnFilterSales_summary = createAsyncThunk(
  'dashboard/OnFilterSales_summary',
  async ({payload}) => {
    console.log('payload', payload)
    const data = await ReportsApi.OnFilterSalesReports(payload).catch((err) => {});
    return {list: data?.data, xCount: data.headers['x-total-count']};
  }
);

const OnFilter_summary = createAsyncThunk(
  'dashboard/OnFilter_summary',
  async ({ payload, Storeid, URL }) => {
    const res = await ReportsApi._OnfilterReports(payload, URL).catch(
      (err) => {}
    );

    console.log('res', res);

    // dispatch(getTenantLists({id:id}))
    //
    return { data: res.data, Storeid, xCount: res.headers['x-total-count'] };
  }
);
const OnFilterOrder_summary = createAsyncThunk(
  'dashboard/OnFilterOrder_summary',
  async ({ payload }) => {
    console.log('payload', payload)
    const data = await ReportsApi._OnfilterOrderReports(payload).catch(
      (err) => {}
    );

    const xCount = data?.headers['x-total-count'];

    return { data: data?.data, xCount };
  }
);

const OnFilterTroubleTicket_summary = createAsyncThunk(
  'dashboard/OnFilterTroubleTicket_summary',
  async ({ payload }) => {
    const data = await ReportsApi._OnfilterTroubleTicketReports(payload).catch(
      (err) => {}
    );
    const xCount = data?.headers['x-total-count'];
    let resObj = {
      data: data?.data,
      xCount
    };

    // dispatch(getTenantLists({id:id}))
    //
    return resObj;
  }
);

const OnFilterCustomerTicket_summary = createAsyncThunk(
  'dashboard/OnFilterCustomerTicket_summary',
  async ({ payload }) => {
    const data = await ReportsApi._OnfilterCustomerTicketReports(payload).catch(
      (err) => {}
    );

    // dispatch(getTenantLists({id:id}))
    //
    return data;
  }
);

const FilterByPartnerProductSummary = createAsyncThunk(
  'dashboard/FilterByPartnerProductSummary',
  async ({ payload }) => {
    try {
      const data = await ReportsApi._FilterByPartnerProductSummary(payload);
      console.log('FilterByPartnerProductSummary', data)
      return {list: data?.data, xCount: data?.headers['x-count']};
    } catch (error) {
      console.error('error******', error);
      return [];
    }
  }
);

const _LoadAllPartnerPayment_Reports = createAsyncThunk(
  'dashboard/_LoadAllPartnerPayment_Reports',
  async ({ limit = 20, offset = 0, searchValue = '', SearchQuery = '', fromDate, toDate }) => {
    try {
      const res = await ReportsApi._ParterPaymentReports(limit, offset, searchValue, SearchQuery, fromDate, toDate).catch((err) => {});
      return {data: res?.data, xCount: res?.headers['x-total-count']};
    } catch (error) {
      console.error('error******', error);
      return []
    }
  }
);
const _LoadAllPartnerRevenu_Reports = createAsyncThunk(
  'dashboard/_LoadAllPartnerRevenu_Reports',
  async ({ limit = 10, offset = 0, searchValue = '', SearchQuery = '' }) => {
    const res = await ReportsApi._ParterRevenuReports(limit, offset , searchValue , SearchQuery ).catch((err) => {});

    return {data: res?.data, xCount: res?.headers['x-total-count']};
  }
);

const _LoadAllPartnerSettelement_Reports = createAsyncThunk(
  'dashboard/_LoadAllPartnerSettelement_Reports',
  async ({ limit = 10, offset = 0, searchValue = '', SearchQuery = '' }) => {
    console.log('payload', {limit, offset});
    const res = await ReportsApi._ParterSettelementReports(limit, offset).catch(
      (err) => {}
    );

    // dispatch(getTenantLists({id:id}))
    //
    return {data: res.data, xCount: res.headers['x-total-count']};
  }
);

const _FilterByPartnerSummary = createAsyncThunk(
  'dashboard/_FilterByPartnerSummary',
  async ({ payload }) => {
    console.log('payload', payload)
    const data = await ReportsApi._FilterByPartnerSummaryApi(payload).catch(
      (err) => {}
    );
    
    const response = {
      list: data?.data,
      xCount: data?.headers['x-count']
    }
    return response;
  }
);

const _LoadAllPartnerTroubleTicket_Reports = createAsyncThunk(
  'dashboard/_LoadAllPartnerTroubleTicket_Reports',
  async ({ limit = 10, offset = 0, searchValue = '', SearchQuery = '' }) => {
    const data = await ReportsApi.PartnerTroubleTicketSummary(
      limit,
      offset,
      searchValue,
      SearchQuery
    ).catch((err) => {});

    const xCount = data?.headers['x-total-count'];

    return {
      list: data.data.sort(
        (a, b) => Date.parse(b.modifiedDate) - Date.parse(a.modifiedDate)
      ),
      xCount: xCount
    };
  }
);

const _LoadAllPartnerCustomerTicket_Reports = createAsyncThunk(
  'dashboard/_LoadAllPartnerCustomerTicket_Reports',
  async ({ limit = 10, offset = 0, searchValue = '', SearchQuery = '' }) => {
    const data = await ReportsApi.PartnerCustomerTicketSummary(
      limit,
      offset,
      searchValue,
      SearchQuery
    ).catch((err) => {});

    const xCount = data?.headers['x-total-count'];
    return {
      list: data.data.sort(
        (a, b) => Date.parse(b.modifiedDate) - Date.parse(a.modifiedDate)
      ),
      xCount: xCount
    };
  }
);

export default {
  LoadAll_Partner_Reports,
  LoadAll_PartnerProduct_Reports,
  LoadAll_PartnerOrder_Reports,
  OnFilter_summary,
  OnFilterOrder_summary,
  _LoadAllPartnerSales_Reports,
  _LoadAllPartnerPayment_Reports,
  _LoadAllPartnerRevenu_Reports,
  _LoadAllPartnerSettelement_Reports,
  _FilterByPartnerSummary,
  FilterByPartnerProductSummary,
  _LoadAllPartnerTroubleTicket_Reports,
  OnFilterTroubleTicket_summary,
  _LoadAllPartnerCustomerTicket_Reports,
  OnFilterCustomerTicket_summary,
  OnFilterSales_summary,
};
