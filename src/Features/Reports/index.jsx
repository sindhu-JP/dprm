import React from 'react';
import PartnerLayout from 'Layouts/Partner';
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  ClickAwayListener,
  InputBase,
  Tooltip
} from '@material-ui/core';
// import ORDER_TABLE from 'Components/Table/RenderTable';
import Table from 'Components/Table/RenderTable';
import SUMMARY from 'lib/constants/Financial/ConfigTable';
import DashboardController from 'Controllers/Dashboard';
import ReportsController from 'Controllers/Reports';
import SummaryCard from './SummaryCurd';
import { connect, useDispatch } from 'react-redux';
import { useStateful, useBoolean } from 'react-hanger';
import Backdroploader from 'Components/Backdroploader';
//import filter from 'Assets/Icons/Filter.svg';
import filterSvg from 'Assets/Icons/filterSvg.svg';
import searchSvg from 'Assets/Icons/searchSvg.svg';
import SearchIcon from '@material-ui/icons/Search';

import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import ReportSrore from 'Store/Reports';

import ReportsFilter from 'Components/ReportsFilter';
import moment from 'moment';
import classNames from 'classnames';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { pdf } from 'lib/utils';
import MenuItemPaper from 'Components/MenuItemPaper';
// import Alert from 'Store/Alert';
import Alert from 'Components/Alert';

import ModalsStore from 'Store/Modals';
import AlertActions from 'Store/Alert';
import CopyRightFooter from 'Components/CopyRightFooter/CopyRightFooter';
import CloseIcon from '@material-ui/icons/Close';
import SearchBar from 'Components/TableSearch/SearchBar';
import { Trans } from '@lingui/react';
const useStyles = makeStyles((theme) => ({
  snackBar: {
    color: 'gray',
    borderColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '16px'
  },
  welcomeMessage: {
    fontWeight: theme.typography.fontWeightBold,
    font: 'normal normal medium 20px/24px Roboto',
    letterSpacing: '0px',
    color: '#57606F',
    opacity: 1
  },
  homeContainer: {
    maxHeight: `calc(100vh - ${theme.spacing(30)})`,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '85vh'
  },
  table: {
    backgroundColor: theme.palette.common.white,
    '& > thead': {
      backgroundColor: theme.palette.common.white
    }
  },
  icons: {
    cursor: 'pointer'
  },
  //for filter css
  root: {
    position: 'relative'
  },
  reports: {
    marginRight: '3rem',
    background: 'white',
    borderRadius: '0px',
    top: '2px',
    fontSize: '1.0rem'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(18),
    right: 0
  },
  paper: {
    // padding: 0,
    width: 390,
    // minHeight: 480,
    // maxHeight: 550

    height: 'auto'
  },
  left: {
    paddingLeft: '16px'
  },
  right: {
    marginLeft: 'auto',
    paddingRight: '16px'
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4),
    borderRadius: theme.spacing(4),
    width: '99%'
  },
  searchIcon: {
    stroke: theme.palette.icon.stroke
  }
}));

const INITIAL_FILTER_OBJ = { fromDate: null, toDate: null };

function Reports(props) {
  const {
    _LoadAllPartner_Reports,
    Reports,
    onReportsSearch,
    openModal,
    alertState,
    closeAlert,
    Alertopen
  } = props;
  console.log(Reports, 'ReportsReportsReportsReports');
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const [enableSearch, setenableSearch] = React.useState(false);
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const [fromDate, handleDateChangeFrom] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [Searchtext, setSearchtext] = React.useState('');
  const [toDate, handleDateChangeTo] = React.useState(null);
  const [text, settext] = React.useState('');
  const FilterObj = useStateful(INITIAL_FILTER_OBJ);
  const showFilter = useBoolean(false);

  const sumaryCardDetails = useStateful({
    name: <Trans id="Partner Summary"></Trans>,
    code: 'getPotentialPartners',
    subtitle: <Trans id="Partner's basic Information & their status."></Trans>,
    columnId: 'PartnerSummary',
    fun: 'FilterByPartnerSummary',
    payload: 'PartnerPayload',
    pageable: true,
    Options: [
      {
        name: 'Partner Id',
        code: 'PartnerProfileCreation.PartnerDetails.Partner_ID'
      },
      {
        name: 'Partner Name',
        code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME'
      },
      {
        name: 'Email',
        code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID'
      },
      {
        name: 'Mobile',
        code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER'
      }
    ],
    SearchEnable: true,
    // linkedFormId: 'LINKEDFORMAA9Y3S26',
    searchParams: 'Parnter ID, Partner Name, Mobile Number, Email'
  });
  const selectedCard = useStateful(0);

  const CardItem = useStateful('PartnerSummary');
  const [searchValueBy, setSearchValueBy] = React.useState('');
  const [SearchText, setText] = React.useState('');
  const SearchByText = useStateful({});
  const Summarylistitem = useStateful([]);
  const SearchQuery = useStateful({});
  // const [text, setText] = useState('' || '')
  const listOfSummary = useStateful([
    {
      name: <Trans id="Partner Summary"></Trans>,
      code: 'getPotentialPartners',
      pageable: true,
      SearchEnable: true,
      subtitle: (
        <Trans id="Partner's basic Information & their status ."></Trans>
      ),
      columnId: 'PartnerSummary',
      Options: [
        {
          name: 'Partner Id',
          code: 'PartnerProfileCreation.PartnerDetails.Partner_ID'
        },
        {
          name: 'Partner Name',
          code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME'
        },
        {
          name: 'Email',
          code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID'
        },
        {
          name: 'Mobile',
          code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER'
        }
      ],
      // linkedFormId: 'LINKEDFORMAA9Y3S26',
      searchParams: 'Parnter ID, Partner Name, Mobile Number, Email',
      fun: 'FilterByPartnerSummary',
      payload: 'PartnerPayload'
    },
    {
      name: <Trans id="Partner Product Summary"></Trans>,
      code: '_LoadAllPartnerProduct_Reports',
      subtitle: (
        <Trans id="Partner's product information and their periodical product sale."></Trans>
      ),
      columnId: 'partnerProductSummary',
      pageable: true,
      SearchEnable: true,
      Orderpageable: true,
      Options: [
        { name: 'Partner Id', code: 'AddProduct.ProductDetails.Partner_ID' },
        { name: 'Product Id', code: 'AddProduct.ProductDetails.PRODUCT_ID' },
        {
          name: 'Product Name',
          code: 'AddProduct.ProductDetails.PRODUCT_NAME'
        },
        { name: 'Product LOB', code: 'AddProduct.ProductDetails.PRODUCT_LOB' }
      ],
      // linkedFormId: 'LINKEDFORM7F2L7027',
      fun: 'FilterByPartnerProductSummary',
      payload: 'ProductPayload',
      searchParams: 'Parnter ID, Product ID, Product Name, Product LOB'
    },
    {
      name: <Trans id="Partner Order Summary"></Trans>,
      code: '_LoadAllPartnerOrder_Reports',
      subtitle: (
        <Trans id="Information of order placed against each product and periodical order history."></Trans>
      ),
      columnId: 'PartnerOrderSummary',
      pageable: true,
      SearchEnable: true,
      Options: [
        { name: 'Partner Id', code: 'partnerId' },
        { name: '  Order id', code: 'OrderId' },
        { name: 'Product Name', code: 'productName' },
        { name: 'Customer Id', code: 'CustomerId' }
      ],
      // linkedFormId:"LINKEDFORMAA9Y3S26",
      searchParams: 'Parnter ID, Order ID, Product Name, Customer ID',
      fun: 'OnFilterOrder_summary',
      payload: 'OrderPayload'
    },
    {
      name: <Trans id="Partner Sales Summary"></Trans>,
      code: '_LoadAllPartnerSales_Reports',
      pageable: true,
      SearchEnable: true,
      subtitle: (
        <Trans id="Holistic view of sales progress achieved by multiple partners."></Trans>
      ),
      columnId: 'PartnerSalesSummary',
      Options: [
        {
          name: 'Partner Id',
          code: 'PartnerProfileCreation.PartnerDetails.Partner_ID'
        },
        {
          name: 'Partner Name',
          code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME'
        },
        {
          name: 'Email',
          code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID'
        },
        {
          name: 'Mobile',
          code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER'
        }
      ],
      // linkedFormId: 'LINKEDFORMAA9Y3S2',
      searchParams: 'Parnter ID, Partner Name, Mobile Number, Email',
      // URL: 'partner-sales-summary-filter',
      fun: 'OnFilterSales_summary',
      payload: 'PartnerSalesSummaryPayload'
    },
    {
      name: <Trans id="Partner Payment Summary"></Trans>,
      code: '_LoadAllPartnerPayment_Reports',
      // fun: '_LoadAllPartnerPayment_Reports',
      SearchEnable: true,
      subtitle: (
        <Trans id="Summarized view of payment made against the partner invoices."></Trans>
      ),
      columnId: 'PartnerPaymentSummary',
      Options: [
        {
          name: 'Partner Id',
          code: 'PartnerProfileCreation.PartnerDetails.Partner_ID'
        },
        {
          name: 'Partner Name',
          code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME'
        },
        {
          name: 'Email',
          code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID'
        },
        {
          name: 'Mobile',
          code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER'
        }
      ],
      // linkedFormId:"LINKEDFORMAA9Y3S2",
      URL: 'partner-payment-summary-filter',
      searchParams: 'Parnter ID, Partner Name, Mobile Number, Email',
      fun: 'FilterByPartnerSummary',
      payload: 'PartnerPayload'
    },

    {
      name: <Trans id="Revenue Summary"></Trans>,
      code: '_LoadAllPartnerRevenu_Reports',
      SearchEnable: true,
      // SearchEnable: true,
       Options: [
        { name: 'Partner Id', code: 'partnerId' },
        { name: '  Order id', code: 'OrderId' },
        { name: 'Product Name', code: 'productName' },
        { name: 'Customer Id', code: 'CustomerId' }
       ],
      subtitle: (
        <Trans id="Consolidated revenue of all the products launched and sold across channels."></Trans>
      ),
      columnId: 'PartnerRevenuSummary',
      // linkedFormId:"LINKEDFORMAA9Y3S2",
      URL: 'partner-revenu-summary-filter',
      searchParams: 'Parnter ID, Parnter Name'
    },
    {
      name: <Trans id="Partner Settlement Summary"></Trans>,
      code: '_LoadAllPartnerSettelement_Reports',
      SearchEnable: true,
      Options: [
        {
          name: 'Partner Id',
          code: 'PartnerProfileCreation.PartnerDetails.Partner_ID'
        },
        {
          name: 'Partner Name',
          code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME'
        },
        {
          name: 'Email',
          code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID'
        },
        {
          name: 'Mobile',
          code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER'
        }
      ],
      subtitle: (
        <Trans id="View of partner accounts which are due for final settlements."></Trans>
      ),
      columnId: 'PartnerSettlementSummary',
      // linkedFormId:"LINKEDFORMAA9Y3S2",
      URL: 'partner-settelement-summary-filter',
      searchParams: 'Parnter ID, Parnter Name',
      pageable: true
    },

    {
      name: <Trans id="Partner Trouble Ticket Summary"></Trans>,
      code: '_LoadAllPartnerTroubleTicket_Reports',
      subtitle: <Trans id="Partner Trouble Ticket Summary"></Trans>,
      columnId: 'PartnerTroubleTicketSummary',
      // linkedFormId:"LINKEDFORMAA9Y3S2",
      // URL: 'troubleTicket?LoB=DPRM&sort=-createdDate',
      searchParams: 'Ticket ID, Ticket name',
      pageable: true,
      Orderpageable: true,
      SearchEnable: true,
      Options: [
        { name: 'Ticket Id', code: 'id' },
        { name: 'Partner id', code: 'relatedParty.id' },

        { name: 'Ticket Type', code: 'ticketType' }
      ],
      fun: 'OnFilterTroubleTicket_summary',
      payload: 'TroubleTicketPayload'
    },
    {
      name: <Trans id="Partner Customer Ticket Summary"></Trans>,
      code: '_LoadAllPartnerCustomerTicket_Reports',
      subtitle: <Trans id="Partner Customer Ticket Summary"></Trans>,
      columnId: 'PartnerCustomerTicketSummary',
      Options: [
        { name: 'Ticket Id', code: 'id' },
        { name: 'Customer id', code: 'relatedParty.id' },
        { name: 'Customer Name', code: 'relatedParty.name' },
        { name: 'Ticket Type', code: 'ticketType' }
      ],
      // linkedFormId:"LINKEDFORMAA9Y3S2",
      // URL: 'troubleTicket?LoB=DPRM&sort=-createdDate',
      searchParams: 'Ticket ID, Ticket name',
      pageable: true,
      SearchEnable: true,
      Orderpageable: true,
      fun: 'OnFilterCustomerTicket_summary',
      payload: 'CustomerTicketPayload'
    }
  ]);

  // Ticket?type=PartnerCustomerTicket&limit=10000
  React.useEffect(() => {
    props.getPotentialPartners({ limit: rowsPerPage, offset: 0 });
    Summarylistitem.setValue(listOfSummary.value);
  }, []);
  const handleToggle = () => {
    showFilter.toggle();
    setOpen(false);
  };
  const onCardClick = (item, index) => {
    setSearchtext('');
    setPage(0);
    setRowsPerPage(10);
    settext('');
    setenableSearch(false);
    FilterObj.setValue(INITIAL_FILTER_OBJ);
    selectedCard.setValue(index);
    sumaryCardDetails.setValue(item);
    CardItem.setValue(item.columnId);
    if (typeof props[item.code] === 'function' && !item.pageable) {
      props[item.code]();
    }
    {
      props[item.code]({
        limit: 10,
        offset: 0
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    console.log('handleChangePage');
    setPage(newPage);
    if (
      FilterObj?.value?.fromDate ||
      FilterObj?.value?.toDate ||
      FilterObj?.value?.status
    ) {
      const payloadsummary = {
        PartnerSummary: {
          Onboarding_Status: FilterObj.value?.status,
          PARTNER_SUB_TYPE: FilterObj.value?.PARTNER_SUB_TYPE?.code || '',
          PARTNER_TYPE: FilterObj.value?.PARTNER_TYPE?.code || '',
          limit: rowsPerPage,
          offset: newPage
        },
        partnerProductSummary: {
          status: FilterObj.value?.status,
          PRODUCT_LOB: FilterObj.value?.lob?.code,
          PRODUCT_TECHNOLOGY: FilterObj.value?.technology?.code,
          limit: rowsPerPage,
          offset: newPage
        },
        PartnerOrderSummary: {
          status: FilterObj.value?.orderTrackingstatus,
          limit: rowsPerPage,
          offset: newPage
        },
        PartnerSalesSummary: {
          status: FilterObj.value?.status,
          limit: rowsPerPage,
          offset: newPage
        },
        PartnerPaymentSummary: {
          search: { status: FilterObj.value?.paymentStatus },
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          },
          limit: rowsPerPage,
          offset: newPage,
          sql: false
        },
        PartnerRevenuSummary: {
          linkedFormId: 'APILISTPAGEQ1KCP6177',
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          },
          limit: rowsPerPage,
          offset: newPage,
          sql: false
        },
        PartnerSalesSummary: {
          // linkedFormId: 'LINKEDFORMAA9Y3S2',
          search: {},
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : '',
            limit: rowsPerPage,
            offset: newPage,
            sql: false
          },
          limit: rowsPerPage,
          offset: newPage
        },
        PartnerTroubleTicketSummary: {
          search: {},
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : '',
            limit: rowsPerPage,
            offset: newPage,
            sql: false
          }
        },

        PartnerSettlementSummary: {
          linkedFormId: 'APILISTPAGEQ1KCP6177',
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : '',
            limit: rowsPerPage,
            offset: newPage,
            sql: false
          }
        },

        PartnerCustomerTicketSummary: {
          search: {},
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : '',
            limit: rowsPerPage,
            offset: newPage,
            sql: false
          }
        }
      };

      if (dateFormat()) {
        showFilter.setFalse();
        if (sumaryCardDetails.value?.linkedFormId) {
          const payload = {
            linkedFormId: sumaryCardDetails.value?.linkedFormId,
            search: payloadsummary[sumaryCardDetails.value?.columnId],

            dateRange: {
              startDate: FilterObj.value?.fromDate
                ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
                : '',
              endDate: FilterObj.value?.toDate
                ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
                : ''
            },
            limit: rowsPerPage,
            offset: newPage,
            sql: false
          };

          props.OnFilter_summary({
            payload,
            Storeid: sumaryCardDetails?.value?.columnId
          });
        } else if (sumaryCardDetails.value?.URL) {
          props.OnFilter_summary({
            payload: payloadsummary[sumaryCardDetails.value?.columnId],
            Storeid: sumaryCardDetails?.value?.columnId,
            URL: sumaryCardDetails.value?.URL
          });
        }
        //FilterObj.setValue({});
        else if (sumaryCardDetails.value?.fun) {
          console.log('hello');

          const DateFormat = {
            createDate: [
              FilterObj.value?.fromDate
                ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
                : null,

              FilterObj.value?.toDate
                ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
                : null
            ],
            fromDate: FilterObj.value?.fromDate
              ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
              : null,
            toDate: FilterObj.value?.toDate
              ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
              : null
          };
          const Obj = {
            OrderPayload: {
              fromDate: FilterObj.value?.fromDate
                ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
                : null,
              toDate: FilterObj.value?.toDate
                ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
                : null,
              status: FilterObj.value?.orderTrackingstatus,
              limit: rowsPerPage,
              offset: newPage
            },

            PartnerPayload: {
              ...DateFormat,
              Onboarding_Status: FilterObj.value?.status,
              PARTNER_SUB_TYPE: FilterObj.value?.PARTNER_SUB_TYPE?.code || '',
              limit: rowsPerPage,
              offset: newPage,
              sql: false,
              PARTNER_TYPE: FilterObj.value?.PARTNER_TYPE?.code || '',
              fromDate: FilterObj.value?.fromDate
                ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
                : null,
              toDate: FilterObj.value?.toDate
                ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
                : null
            },
            PartnerSalesSummaryPayload: {
              ...DateFormat,
              status: FilterObj.value?.status,
              limit: rowsPerPage,
              offset: newPage
            },
            ProductPayload: {
              status: FilterObj.value?.status,
              PRODUCT_LOB: FilterObj.value?.lob?.code,
              limit: rowsPerPage,
              offset: newPage,
              sql: false,
              ...DateFormat
            },
            TroubleTicketPayload: {
              status: FilterObj.value?.TroubleTicketStatus,
              limit: rowsPerPage,
              offset: newPage,
              ...DateFormat
            },
            CustomerTicketPayload: {
              status: FilterObj.value?.TroubleTicketStatus,
              limit: rowsPerPage,
              offset: newPage,
              ...DateFormat
            }
          };

          props[sumaryCardDetails.value?.fun]({
            payload: _.pickBy(Obj[sumaryCardDetails.value.payload], _.identity)
          });
          // FilterObj.setValue({});
        }
      }
    } else {
      if (sumaryCardDetails.value?.pageable) {
        // const status = FilterObj.value?.TroubleTicketStatus ||
        if (
          FilterObj.value?.status ||
          FilterObj.value?.orderTrackingstatus ||
          FilterObj.value?.PARTNER_TYPE?.code
        ) {
          console.log('sumaryCardDetails', { sumaryCardDetails, FilterObj });
          props[sumaryCardDetails.value?.fun]({
            payload: {
              limit: rowsPerPage,
              offset: newPage,
              searchValue: SearchByText.value,
              SearchQuery: SearchQuery.value,
              status:
                FilterObj.value?.status || FilterObj.value?.orderTrackingstatus,
              PARTNER_TYPE: FilterObj.value?.PARTNER_TYPE?.code || ''
            }
          });
        } else {
          console.log('sumaryCardDetails2', { sumaryCardDetails, FilterObj });
          props[sumaryCardDetails.value?.code]({
            limit: rowsPerPage,
            offset: newPage,
            searchValue: SearchByText.value,
            SearchQuery: SearchQuery.value
          });
        }
      }
    }
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('here2', FilterObj);
    setRowsPerPage(+event.target.value);
    setPage(0);
    if (sumaryCardDetails.value?.pageable) {
      if (
        FilterObj.value?.status ||
        FilterObj.value?.fromDate ||
        FilterObj.value?.toDate ||
        FilterObj.value?.orderTrackingstatus ||
        FilterObj.value?.PARTNER_TYPE?.code ||
        FilterObj.value?.TroubleTicketStatus
      ) {
        console.log('here3', FilterObj);
        props[sumaryCardDetails.value?.fun]({
          payload: {
            limit: event.target.value,
            offset: 0,
            searchValue: SearchByText.value,
            SearchQuery: SearchQuery.value,
            status:
              FilterObj.value?.status ||
              FilterObj.value?.orderTrackingstatus ||
              FilterObj.value?.TroubleTicketStatus,
            fromDate: FilterObj.value?.fromDate
              ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
              : null,
            toDate: FilterObj.value?.toDate
              ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
              : null,
            Onboarding_Status: FilterObj.value?.status,
            PARTNER_SUB_TYPE: FilterObj.value?.PARTNER_SUB_TYPE?.code || '',
            PARTNER_TYPE: FilterObj.value?.PARTNER_TYPE?.code || '',
            PRODUCT_LOB: FilterObj.value?.lob?.code,
            PRODUCT_TECHNOLOGY: FilterObj.value?.technology?.code
          }
        });
        // else if(!sumaryCardDetails.value?.fun){
        //   props[sumaryCardDetails.value?.code]({
        //     limit: event.target.value,
        //     offset: 0,
        //     searchValue: SearchByText.value,
        //     SearchQuery: SearchQuery.value,
        //     status: FilterObj.value?.status}
        //   );
        // }
        return;
      }
      console.log('here4', FilterObj);
      props[sumaryCardDetails.value?.code]({
        limit: event.target.value,
        offset: 0,
        searchValue: SearchByText.value,
        SearchQuery: SearchQuery.value,
        status: FilterObj.value?.status
      });
    } else {
      console.log('here5', FilterObj);

      props[sumaryCardDetails.value?.code]({
        limit: event.target.value,
        offset: 0,
        searchValue: SearchByText.value,
        SearchQuery: SearchQuery.value,
        status: FilterObj.value?.status,
        fromDate: FilterObj.value?.fromDate
          ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
          : null,
        toDate: FilterObj.value?.toDate
          ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
          : null
      });
    }
  };

  const ColumChange = (data) => {
    if (data) {
      return _.map(data, (item) => {
        return {
          columns: item
        };
      });
    }
  };

  function sortByDate(a, b) {
    if (a.columns.date < b.columns.date) {
      return 1;
    }
    if (a.columns.date > b.columns.date) {
      return -1;
    }
    return 0;
  }

  const sorted = ColumChange(Reports?.PartnerSummaryrow).sort(sortByDate);
  const handleRefresh = (item) => {
    console.log('item', item);
    setText('');
    SearchByText.setValue('');
    setSearchtext('');
    setPage(0);
    setRowsPerPage(10);
    settext('');
    setSearchValueBy('');
    FilterObj.setValue(INITIAL_FILTER_OBJ);

    if (
      typeof props[item] === 'function' &&
      !sumaryCardDetails.value?.pageable
    ) {
      props[item]();
    } else {
      props[item]({ limit: 10, offset: 0 });
    }
  };
  const dateFormat = () => {
    const Pick = _.pickBy(FilterObj.value, _.identity);
    if (Pick?.fromDate || Pick?.toDate) {
      if (Pick?.fromDate && Pick?.toDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const handleFilterApply = () => {
    console.log('handleFilterApply');
    if (!_.isEmpty(FilterObj.value)) {
      setPage(0);
      setRowsPerPage(10);
      console.log('here', FilterObj);
      const payloadsummary = {
        PartnerSummary: {
          Onboarding_Status: FilterObj.value?.status,
          PARTNER_SUB_TYPE: FilterObj.value?.PARTNER_SUB_TYPE?.code || '',
          PARTNER_TYPE: FilterObj.value?.PARTNER_TYPE?.code || ''
        },
        partnerProductSummary: {
          status: FilterObj.value?.status,
          PRODUCT_LOB: FilterObj.value?.lob?.code,
          PRODUCT_TECHNOLOGY: FilterObj.value?.technology?.code
        },
        PartnerOrderSummary: {
          status: FilterObj.value?.orderTrackingstatus
        },
        PartnerSalesSummary: {
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        },
        PartnerPaymentSummary: {
          search: { status: FilterObj.value?.paymentStatus },

          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        },

        PartnerRevenuSummary: {
          linkedFormId: 'APILISTPAGEQ1KCP6177',

          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        },
        PartnerSalesSummary: {
          // linkedFormId: 'LINKEDFORMAA9Y3S2',
          search: {},
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        },
        PartnerTroubleTicketSummary: {
          search: {},
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        },

        PartnerSettlementSummary: {
          linkedFormId: 'APILISTPAGEQ1KCP6177',

          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        },

        PartnerCustomerTicketSummary: {
          search: {},
          dateRange: {
            startDate: FilterObj.value?.fromDate
              ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
              : '',
            endDate: FilterObj.value?.toDate
              ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
              : ''
          }
        }
      };

      const isDateFormat = dateFormat();
      console.log('isDateFormat', { isDateFormat, sumaryCardDetails });

      if (isDateFormat) {
        showFilter.setFalse();
        if (sumaryCardDetails.value?.linkedFormId) {
          const payload = {
            linkedFormId: sumaryCardDetails.value?.linkedFormId,
            search: payloadsummary[sumaryCardDetails.value?.columnId],

            dateRange: {
              startDate: FilterObj.value?.fromDate
                ? moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')
                : '',
              endDate: FilterObj.value?.toDate
                ? moment(FilterObj.value?.toDate).format('YYYY-MM-DD')
                : ''
            },
            limit: rowsPerPage,
            offset: page,
            sql: false
          };

          props.OnFilter_summary({
            payload,
            Storeid: sumaryCardDetails?.value?.columnId
          });
        } else if (sumaryCardDetails.value?.URL) {
          props.OnFilter_summary({
            payload: payloadsummary[sumaryCardDetails.value?.columnId],
            Storeid: sumaryCardDetails?.value?.columnId,
            URL: sumaryCardDetails.value?.URL
          });
          //FilterObj.setValue({});
        } else if (sumaryCardDetails.value?.fun) {
          const DateFormat = {
            createDate: [
              FilterObj.value?.fromDate
                ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
                : null,

              FilterObj.value?.toDate
                ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
                : null
            ],
            fromDate: FilterObj.value?.fromDate
              ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
              : null,
            toDate: FilterObj.value?.toDate
              ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
              : null
          };
          const Obj = {
            OrderPayload: {
              fromDate: FilterObj.value?.fromDate
                ? `${moment(FilterObj.value?.fromDate).format('YYYY-MM-DD')}`
                : null,
              toDate: FilterObj.value?.toDate
                ? `${moment(FilterObj.value?.toDate).format('YYYY-MM-DD')}`
                : null,
              status: FilterObj.value?.orderTrackingstatus
            },
            PartnerPayload: {
              ...DateFormat,
              Onboarding_Status: FilterObj.value?.status,
              PARTNER_SUB_TYPE: FilterObj.value?.PARTNER_SUB_TYPE?.code || '',
              PARTNER_TYPE: FilterObj.value?.PARTNER_TYPE?.code || ''
            },
            PartnerSalesSummaryPayload: {
              ...DateFormat
            },
            ProductPayload: {
              status: FilterObj.value?.status,
              PRODUCT_LOB: FilterObj.value?.lob?.code,
              ...DateFormat
            },
            TroubleTicketPayload: {
              status: FilterObj.value?.TroubleTicketStatus,
              ...DateFormat
            },
            CustomerTicketPayload: {
              status: FilterObj.value?.TroubleTicketStatus,
              ...DateFormat
            }
          };
          console.log('Obj', { Obj, fun: sumaryCardDetails.value?.fun });
          props[sumaryCardDetails.value?.fun]({
            payload: _.pickBy(Obj[sumaryCardDetails.value.payload], _.identity)
          });
          // FilterObj.setValue({});
        }
      }
    }
  };

  const downloadreports = (formatlist, subformatlist) => {
    pdf.exportPDF({
      subformatlist,
      pdfdata: Reports?.PartnerSummaryrow,
      headersdata: SUMMARY[CardItem.value].columns,
      name: sumaryCardDetails.value?.name
    });
  };

  const onSearchChange = (e) => {
    setSearchtext(e.target.value);
    if (e.target.value.length >= 2) {
      let temp = _.filter(listOfSummary.value, (items) => {
        const savageMatch =
          JSON.stringify(items)
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) !== -1;
        if (savageMatch) return savageMatch;
      });

      selectedCard.setValue('');
      Summarylistitem.setValue(temp);
    } else {
      Summarylistitem.setValue(listOfSummary.value);
      selectedCard.setValue(0);
      // _LoadAllPartner_Reports();
    }
  };
  const handleClose = () => {
    Summarylistitem.setValue(listOfSummary.value);
    selectedCard.setValue(0);
    setSearchtext('');
  };
  const reverseData = (data) => {
    if (data) {
      return _.map(data, (item) => {
        return {
          ...item
        };
      });
    }
  };

  const onSearchTable = (search, value) => {
    SearchByText.setValue(value);
    SearchQuery.setValue(search);
    if (sumaryCardDetails.value.code) {
      props[sumaryCardDetails.value.code]({
        limit: rowsPerPage,
        offset: page,
        searchValue: value,
        SearchQuery: search
      });
    }
  };
  const handleClickAway = () => {
    showFilter.setFalse();
  };

  return (
    <div>
      <PartnerLayout activeIndex={1} isRoute={false}>
        <Backdroploader open={Reports.loading.reportLoading} />
        <Box py={2} px={6} className={classes.homeContainer}>
          <Grid container direction="column" spacing={10}>
            <Grid
              container
              alignItems="center"
              xs={12}
              style={{ paddingTop: '10px' }}
              justifyContent="space-between"
            >
              <Grid style={{marginLeft:'20px'}}>
                <Typography variant="h1">
                  <Trans id="Reports"></Trans>{' '}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs>
              <Grid
                container
                direction="row"
                xs={12}
                spacing={10}
                style={{ paddingTop: '5px' }}
              >
                <Grid item xs={3} style={{ height: '100vh', overflow: 'auto' }}>
                  <Grid container direction="column" spacing={1}>
                    <Box py={2} />
                    <Grid item>
                      <Box py={2}>
                        <InputBase
                          name="newComment"
                          className={classNames(classes.input)}
                          fullwidth
                          value={Searchtext}
                          placeholder={'Search by reports name  '}
                          // value={searchId}
                          onChange={onSearchChange}
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon className={classes.searchIcon} />
                            </InputAdornment>
                          }
                          endAdornment={
                            Searchtext.length >= 2 && (
                              <>
                                <IconButton size="small">
                                  <CloseIcon onClick={handleClose} />
                                </IconButton>
                              </>
                            )
                          }
                        />
                      </Box>
                    </Grid>
                    {Summarylistitem.value.map((item, index) => {
                      return (
                        <Grid item>
                          <SummaryCard
                            item={item}
                            index={index}
                            selectedCardValue={selectedCard.value}
                            onCardClick={onCardClick}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>

                <Grid item xs={9}>
                  <Grid container direction="column" spacing={5}>
                    <Grid item>
                      <Typography variant="h2">
                        {' '}
                        {sumaryCardDetails.value?.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {sumaryCardDetails.value?.subtitle}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Paper elevation={0} style={{ width: '70vw' }}>
                        <Box>
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
                                    {/* {enableSearch.value ? (
                        <Grid item>
                          <TextField
                            style={{ width: '400px' }}
                            id="standard-basic"
                            fullWidth
                            placeholder="Search by Quote ID, Name"
                            InputProps={{
                              disableunderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon
                                    fontSize="large"
                                    className={classes.iconSearch}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      ) : ( */}
                                    <>
                                      <Grid item>
                                        {/* <img src={img} className={classes.imglog} /> */}
                                      </Grid>
                                      <Grid item>
                                        <Typography
                                          variant="h2"
                                          className={classes.title}
                                        >
                                          {sumaryCardDetails.value?.name}
                                        </Typography>
                                      </Grid>
                                    </>
                                  </Grid>
                                </Grid>

                                <Grid item>
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justify="space-between"
                                    spacing={4}
                                  >
                                    <Grid item>
                                      <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justify="space-between"
                                        spacing={4}
                                      >
                                        <Grid item></Grid>
                                      </Grid>
                                    </Grid>
                                    {/* taxdocument */}
                                    <Grid item>
                                      <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justify="space-between"
                                        spacing={2}
                                      >
                                        {sumaryCardDetails.value
                                          ?.SearchEnable ? (
                                          <>
                                            <Grid item>
                                              <SearchBar
                                                Options={
                                                  sumaryCardDetails.value
                                                    ?.Options
                                                }
                                                onSearchTable={onSearchTable}
                                                setText={setText}
                                                text={SearchText}
                                                setSearchBy={setSearchValueBy}
                                                searchBy={searchValueBy}
                                              />
                                            </Grid>
                                          </>
                                        ) : (
                                          <>
                                            {enableSearch ? (
                                              <Grid item>
                                                <Tooltip
                                                  title={`Search by ${sumaryCardDetails?.value.searchParams}`}
                                                  placeholder="bottom"
                                                >
                                                  <TextField
                                                    style={{ width: '400px' }}
                                                    id="standard-basic"
                                                    fullWidth
                                                    value={text}
                                                    onChange={(e) => {
                                                      dispatch(
                                                        onReportsSearch({
                                                          id: 'Reports',
                                                          context: {
                                                            onSearch:
                                                              Reports?.SummarySearchlist,
                                                            value:
                                                              e.target.value
                                                          }
                                                        })
                                                      );
                                                      settext(e.target.value);
                                                    }}
                                                    placeholder={`Search by ${sumaryCardDetails?.value.searchParams}`}
                                                    InputProps={{
                                                      disableunderline: true,
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          <Tooltip
                                                            title="Search"
                                                            placeholder="bottom"
                                                          >
                                                            <img
                                                              src={searchSvg}
                                                              fontSize="large"
                                                            />
                                                            {/* <SearchIcon
                                                        fontSize="large"
                                                        className={
                                                          classes.iconSearch
                                                        }
                                                      /> */}
                                                          </Tooltip>
                                                        </InputAdornment>
                                                      )
                                                    }}
                                                  />
                                                </Tooltip>
                                              </Grid>
                                            ) : (
                                              <Grid item>
                                                <Tooltip
                                                  title="Search"
                                                  placeholder="bottom"
                                                >
                                                  <IconButton>
                                                    {/* <SearchIcon
                                                  onClick={() =>
                                                    setenableSearch(
                                                      !enableSearch
                                                    )
                                                  }
                                                /> */}
                                                    <img
                                                      src={searchSvg}
                                                      onClick={() =>
                                                        setenableSearch(
                                                          !enableSearch
                                                        )
                                                      }
                                                    />
                                                  </IconButton>
                                                </Tooltip>
                                              </Grid>
                                            )}
                                          </>
                                        )}

                                        <Grid item>
                                          <MenuItemPaper
                                            sumaryCardDetails={
                                              sumaryCardDetails
                                            }
                                            downloadreports={downloadreports}
                                            PartnerSummaryrow={reverseData(
                                              Reports?.PartnerSummaryrow
                                            )}
                                            SUMMARY={SUMMARY}
                                            CardItem={CardItem.value}
                                            Alertopen={Alertopen}
                                            showFilter={showFilter.value}
                                            setOpen={setOpen}
                                            open={open}
                                            filter={showFilter}
                                          />
                                        </Grid>

                                        <Grid item>
                                          <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            justify="space-between"
                                            spacing={4}
                                          >
                                            <ClickAwayListener
                                              onClickAway={handleClickAway}
                                            >
                                              <Grid
                                                container
                                                className={classes.root}
                                                alignItems="baseline"
                                                spacing={1}
                                              >
                                                <Grid item>
                                                  <Tooltip
                                                    title="Filter"
                                                    placeholder="bottom"
                                                  >
                                                    <IconButton
                                                      onClick={handleToggle}
                                                    >
                                                      <img
                                                        alt="filter"
                                                        src={filterSvg}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </Grid>

                                                {showFilter.value && !open && (
                                                  <Grid
                                                    item
                                                    className={classes.dropdown}
                                                  >
                                                    <Paper
                                                      className={classes.paper}
                                                    >
                                                      <ReportsFilter
                                                        sumaryCardDetails={
                                                          sumaryCardDetails.value
                                                        }
                                                        handlFilterApply={
                                                          handleFilterApply
                                                        }
                                                        FilterObj={FilterObj}
                                                        showFilter={showFilter}
                                                      />
                                                    </Paper>{' '}
                                                  </Grid>
                                                )}
                                              </Grid>
                                            </ClickAwayListener>
                                          </Grid>
                                        </Grid>

                                        <Grid item>
                                          <Tooltip
                                            title="Refresh"
                                            placeholder="bottom"
                                          >
                                            <IconButton
                                              onClick={() => {
                                                setenableSearch(false);
                                                handleRefresh(
                                                  sumaryCardDetails.value?.code
                                                );
                                              }}
                                            >
                                              <img
                                                src={refreshIcon}
                                                alt="refresh"
                                              />
                                              {/* <RefreshSharpIcon
                                                onClick={() => {
                                                  setenableSearch(false);

                                                  handleRefresh(
                                                    sumaryCardDetails.value
                                                      ?.code
                                                  );
                                                }}
                                              /> */}
                                            </IconButton>
                                          </Tooltip>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    {/* tax end */}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Table
                            columns={SUMMARY[CardItem.value].columns}
                            rows={ColumChange(Reports?.PartnerSummaryrow || [])}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            loading={Reports?.loading.reportLoading}
                            BreackRowPoint={true}
                            breackpoint={true}
                            totalCount={
                              props.Reports?.tableCount.ReportsTableCount
                            }
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Alert
          open={alertState.open}
          onClose={closeAlert}
          message={alertState.message}
          type={alertState.type}
        />
      </PartnerLayout>
      <Box>
        <CopyRightFooter />
      </Box>
    </div>
  );
}

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data,
    alertState: state.alert,
    hierarchy: state.hierarchy,
    authstate: state.auth,
    dashboardData: state.dashboardData,
    contractState: state.contracts,
    Reports: state.Reports
  }),
  {
    onReportsSearch: ReportSrore.onReportsSearch,
    _LoadAllPartner_Reports: ReportsController.LoadAll_Partner_Reports,
    _LoadAllPartnerProduct_Reports:
      ReportsController.LoadAll_PartnerProduct_Reports,
    _LoadAllPartnerOrder_Reports:
      ReportsController.LoadAll_PartnerOrder_Reports,
    OnFilter_summary: ReportsController.OnFilter_summary,
    OnFilterOrder_summary: ReportsController.OnFilterOrder_summary,
    OnFilterTroubleTicket_summary:
      ReportsController.OnFilterTroubleTicket_summary,
    _LoadAllPartnerSales_Reports:
      ReportsController._LoadAllPartnerSales_Reports,
    OnFilterSales_summary: ReportsController.OnFilterSales_summary,
    _LoadAllPartnerPayment_Reports:
      ReportsController._LoadAllPartnerPayment_Reports,
    _LoadAllPartnerRevenu_Reports:
      ReportsController._LoadAllPartnerRevenu_Reports,
    _LoadAllPartnerSettelement_Reports:
      ReportsController._LoadAllPartnerSettelement_Reports,
    openModal: ModalsStore.open,
    // toggleSaveandExit: ModalsStore.toggleSaveandExit,
    closeModal: ModalsStore.close,
    closeAlert: AlertActions.close,
    Alertopen: AlertActions.open,
    getPotentialPartners: DashboardController.getPotentialParnterList,

    FilterByPartnerSummary: ReportsController._FilterByPartnerSummary,
    FilterByPartnerProductSummary:
      ReportsController.FilterByPartnerProductSummary,
    _LoadAllPartnerTroubleTicket_Reports:
      ReportsController._LoadAllPartnerTroubleTicket_Reports,
    OnFilterCustomerTicket_summary:
      ReportsController.OnFilterCustomerTicket_summary,
    _LoadAllPartnerCustomerTicket_Reports:
      ReportsController._LoadAllPartnerCustomerTicket_Reports
  }
)(Reports);
