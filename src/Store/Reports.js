import { createSlice } from '@reduxjs/toolkit';
import ReportsController from 'Controllers/Reports';
import Utils from 'Factory/Utils';
import Partnerlist from 'Factory/Partner';
import partnerTable from 'Factory/PartnerTables';
import DashboardController from 'Controllers/Dashboard';
const dummyFormState = {
  values: {},
  fields: {},
  meta: {},
  canSubmit: false,
  errors: {},
  loading: false,
  submitting: false
};

const Reports = createSlice({
  name: 'Reports',
  initialState: {
    PartnerSummaryrow: [],
    PartnerProductSummary: [],
    PartnerOrderSummary: [],
    SummarySearchlist: [],
    PartnerReportsEntites: {},
    PartnerReportsIds: [],
    xCount: '',
    loading: {
      reportLoading: false
    },
    tableCount: {
      ReportsTableCount: ''
    }
  },
  reducers: {
    onReportsSearch: (state, { payload }) => {
      let data = {
        context: payload?.context?.onSearch,
        value: payload?.context?.value
      };

      if (payload.id === 'Reports') {
        if (payload?.context?.value?.length >= 2) {
          state.PartnerSummaryrow = Partnerlist.filterByvalueReports(data);
        } else {
          state.PartnerSummaryrow = payload.context.onSearch;
        }
      }
    }
  },
  extraReducers: {
    [ReportsController.LoadAll_Partner_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController.LoadAll_Partner_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = partnerTable.PartnerSummaryTable(
        Utils._makeMaplist(payload)
      );
      state.SummarySearchlist = partnerTable.PartnerSummaryTable(
        Utils._makeMaplist(payload)
      );
    },

    // updating my tasks list (status failure)
    [ReportsController.LoadAll_Partner_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },

    [ReportsController.LoadAll_PartnerOrder_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController.LoadAll_PartnerOrder_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = partnerTable.PartnerOrderSummaryTable(
        payload.list
      );
      state.SummarySearchlist = partnerTable.PartnerOrderSummaryTable(
        payload.list
      );
      state.tableCount.ReportsTableCount = payload.xCount;
    },

    [DashboardController.getPotentialParnterList.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      // state.errors.partnerListError = '';
    },

    //   updating potential partner list (rejected status)
    [DashboardController.getPotentialParnterList.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = partnerTable.PartnerSummaryTable([]);
      state.SummarySearchlist = partnerTable.PartnerSummaryTable([]);
      // state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [DashboardController.getPotentialParnterList.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      state.tableCount.ReportsTableCount = payload.xCount;
      if (payload.list) {
        state.PartnerSummaryrow = partnerTable.PartnerSummaryTable(
          payload.list
        );
        state.SummarySearchlist = partnerTable.PartnerSummaryTable(
          payload.list
        );
      }
    },

    [ReportsController._FilterByPartnerSummary.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      // state.errors.partnerListError = '';
    },

    //   updating potential partner list (rejected status)
    [ReportsController._FilterByPartnerSummary.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
      // state.errors.partnerListError = error.message;
    },
    //   updating potential partner list (success status)
    [ReportsController._FilterByPartnerSummary.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;

      let ids = [];
      let rows = {};
      let entities = {};
      let sections = [];
      state.tableCount.ReportsTableCount = payload.xCount;
      if (payload !== 'undefined') {
        state.PartnerSummaryrow = partnerTable.PartnerSummaryTable(payload?.list);
        state.SummarySearchlist = partnerTable.PartnerSummaryTable(payload?.list);
      } else {
        state.SummarySearchlist = [];
        state.PartnerSummaryrow = [];
      }
    },

    // updating my tasks list (status failure)
    [ReportsController.LoadAll_PartnerOrder_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },
    [ReportsController.LoadAll_PartnerProduct_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;

      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController.LoadAll_PartnerProduct_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.SummarySearchlist = partnerTable.PartnerProductSummaryTable(
        payload.list
      );
      state.PartnerSummaryrow = partnerTable.PartnerProductSummaryTable(
        payload.list
      );
      state.tableCount.ReportsTableCount = payload?.xCount;
    },

    // updating my tasks list (status failure)
    [ReportsController.LoadAll_PartnerProduct_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },
    [ReportsController.OnFilter_summary.pending]: (state, { payload }) => {
      state.loading.reportLoading = false;

      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController.OnFilter_summary.fulfilled]: (state, { payload }) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload?.xCount;


      if (payload?.Storeid === 'PartnerSummary') {      
        state.SummarySearchlist = partnerTable.PartnerSummaryTable(
          Utils._makeMaplist(payload?.data)
        );
        state.PartnerSummaryrow = partnerTable.PartnerSummaryTable(
          Utils._makeMaplist(payload?.data)
        );
      } else if (payload?.Storeid === 'partnerProductSummary') {
        state.SummarySearchlist = partnerTable.PartnerProductSummaryTable(
          Utils._makeMaplist(payload?.data)
        );
        state.PartnerSummaryrow = partnerTable.PartnerProductSummaryTable(
          Utils._makeMaplist(payload?.data)
        );
      } else if (payload?.Storeid === 'PartnerOrderSummary') {
        state.PartnerSummaryrow = partnerTable.PartnerOrderSummaryTable(
          payload?.data
        );
        state.SummarySearchlist = partnerTable.PartnerOrderSummaryTable(
          payload?.data
        );
      } else if (payload?.Storeid === 'PartnerRevenuSummary') {
        state.PartnerSummaryrow = partnerTable.PartnerRevenuSummaryTable(
          payload?.data
        );
        state.SummarySearchlist = partnerTable.PartnerRevenuSummaryTable(
          payload?.data
        );
      } else if (payload?.Storeid === 'PartnerSettlementSummary') {
        state.PartnerSummaryrow = partnerTable.PartnerSettelementSummaryTable(
          payload?.data
        );
        state.SummarySearchlist = partnerTable.PartnerSettelementSummaryTable(
          payload?.data
        );
      } else if (payload?.Storeid === 'PartnerPaymentSummary') {
        // state.PartnerSummaryrow = partnerTable.PartnerSettelementSummaryTable(
        //   payload?.data
        // );
        // state.SummarySearchlist = partnerTable.PartnerSettelementSummaryTable(
        //   payload?.data
        // );

        state.PartnerSummaryrow = partnerTable.PartnerPaymentSummaryTable(
          payload.data
        );
        state.SummarySearchlist = partnerTable.PartnerPaymentSummaryTable(
          payload.data
        );
      } else if (payload?.Storeid === 'PartnerSalesSummary') {
        state.PartnerSummaryrow = partnerTable.PartnerSalesSummaryTable(
          payload.data
        );
        state.SummarySearchlist = partnerTable.PartnerSalesSummaryTable(
          payload.data
        );
      }
    },

    // updating my tasks list (status failure)
    [ReportsController.OnFilter_summary.rejected]: (state, { error }) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    [ReportsController.OnFilterOrder_summary.pending]: (state, { payload }) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController.OnFilterOrder_summary.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload.xCount;
      state.PartnerSummaryrow = partnerTable.PartnerOrderSummaryTable(
        payload?.data
      );
      state.SummarySearchlist = partnerTable.PartnerOrderSummaryTable(
        payload?.data
      );
    },

    // updating my tasks list (status failure)
    [ReportsController.OnFilterOrder_summary.rejected]: (state, { error }) => {
      state.loading.reportLoading = false;
    },

    [ReportsController.FilterByPartnerProductSummary.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;

      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController.FilterByPartnerProductSummary.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload?.xCount;
      state.SummarySearchlist =
        partnerTable.PartnerProductSummaryTable(payload?.list);
      state.PartnerSummaryrow =
        partnerTable.PartnerProductSummaryTable(payload?.list);
    },

    // updating my tasks list (status failure)
    [ReportsController.FilterByPartnerProductSummary.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },
    [ReportsController._LoadAllPartnerSales_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController._LoadAllPartnerSales_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload?.xCount;
      state.PartnerSummaryrow = partnerTable.PartnerSalesSummaryTable(payload?.list);
      state.SummarySearchlist = partnerTable.PartnerSalesSummaryTable(payload?.list);
    },

    [ReportsController._LoadAllPartnerSales_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },


    [ReportsController.OnFilterSales_summary.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    [ReportsController.OnFilterSales_summary.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    },
    [ReportsController.OnFilterSales_summary.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload?.xCount;
      state.PartnerSummaryrow = partnerTable.PartnerSalesSummaryTable(payload?.list);
      state.SummarySearchlist = partnerTable.PartnerSalesSummaryTable(payload?.list);
    },

    // updating my tasks list (status failure)

    [ReportsController._LoadAllPartnerPayment_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController._LoadAllPartnerPayment_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.tableCount.ReportsTableCount = payload?.xCount;
      state.loading.reportLoading = false;
      state.PartnerSummaryrow =
        partnerTable.PartnerPaymentSummaryTable(payload?.data);
      state.SummarySearchlist =
        partnerTable.PartnerPaymentSummaryTable(payload?.data);
    },
    [ReportsController._LoadAllPartnerPayment_Reports.rejected]: (
      state,
      { error }
    ) => {
      setTimeout(() => {
        console.log('rejected', state.loading)
        state.loading.reportLoading = false;
      }, 1000)
    },

    [ReportsController._LoadAllPartnerRevenu_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },

    [ReportsController._LoadAllPartnerTroubleTicket_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },

    [ReportsController._LoadAllPartnerTroubleTicket_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload?.xCount;
      state.PartnerSummaryrow = partnerTable.PartnerTroubleTicketTable(
        payload?.list,
        false
      );
      state.SummarySearchlist = partnerTable.PartnerTroubleTicketTable(
        payload?.list,
        false
      );
      state.tableCount.ReportsTableCount = payload.xCount;
    },
    [ReportsController._LoadAllPartnerTroubleTicket_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = [];
    },

    [ReportsController._LoadAllPartnerCustomerTicket_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },

    [ReportsController._LoadAllPartnerCustomerTicket_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload?.xCount;
      state.PartnerSummaryrow = partnerTable.PartnerTroubleTicketTable(
        payload?.list,
        true
      );
      state.SummarySearchlist = partnerTable.PartnerTroubleTicketTable(
        payload?.list,
        true
      );
      state.tableCount.ReportsTableCount = payload?.xCount;
    },
    [ReportsController._LoadAllPartnerCustomerTicket_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = [];
    },

    [ReportsController.OnFilterTroubleTicket_summary.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },

    [ReportsController.OnFilterTroubleTicket_summary.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = partnerTable.PartnerTroubleTicketTable(
        payload?.data
      );
      state.SummarySearchlist = partnerTable.PartnerTroubleTicketTable(
        payload?.data
      );
      state.tableCount.ReportsTableCount = payload?.xCount;
    },
    [ReportsController.OnFilterTroubleTicket_summary.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = [];
    },

    [ReportsController.OnFilterCustomerTicket_summary.fulfilled]: (
      state,
      { payload }
    ) => {
      console.log('payload===---===--===&&&%%%%%&&&', payload);

      state.loading.reportLoading = false;
      state.PartnerSummaryrow = partnerTable.PartnerTroubleTicketTable(payload);
      state.SummarySearchlist = partnerTable.PartnerTroubleTicketTable(payload);
      state.tableCount.ReportsTableCount = payload?.xCount;
    },
    [ReportsController.OnFilterCustomerTicket_summary.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = [];
    },

    [ReportsController.OnFilterCustomerTicket_summary.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },

    // updating my tasks list (status success)
    [ReportsController._LoadAllPartnerRevenu_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.PartnerSummaryrow = partnerTable.PartnerRevenuSummaryTable(payload?.data);
      state.SummarySearchlist = partnerTable.PartnerRevenuSummaryTable(payload?.data);
      state.tableCount.ReportsTableCount = payload?.xCount;
    },

    // updating my tasks list (status failure)
    [ReportsController._LoadAllPartnerRevenu_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = true;
      setTimeout(() => {
        state.loading.reportLoading = false;
      }, 1000)
    },

    [ReportsController._LoadAllPartnerSettelement_Reports.pending]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = true;
      state.PartnerSummaryrow = [];
      state.SummarySearchlist = [];
    },
    // updating my tasks list (status success)
    [ReportsController._LoadAllPartnerSettelement_Reports.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading.reportLoading = false;
      state.tableCount.ReportsTableCount = payload.xCount;
      state.PartnerSummaryrow =
        partnerTable.PartnerSettelementSummaryTable(payload?.data);
      state.SummarySearchlist =
        partnerTable.PartnerSettelementSummaryTable(payload?.data);
    },

    // updating my tasks list (status failure)
    [ReportsController._LoadAllPartnerSettelement_Reports.rejected]: (
      state,
      { error }
    ) => {
      state.loading.reportLoading = false;
    }
  }
});

export { Reports };
export default Reports.actions;
