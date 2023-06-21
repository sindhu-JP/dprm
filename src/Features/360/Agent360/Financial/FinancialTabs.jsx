import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Settlements from './Settlements';
import Adjustments from './Adjustments';
import Invoice from './Invoice';
import partnerFactory from 'Factory/Partner';
import Transactions from './Transactions';
import { Trans } from '@lingui/react';
// import { ReactTable } from 'Components/ReactTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  tab: {
    font: 'normal normal medium 18px/21px Roboto',
    letterSpacing: '0px',
    opacity: '1',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '16px'
  },
  tabsroot: {
    '& .Mui-selected': {
      color: theme.palette.primary.black
    }
  }
}));

const FinancialTabs = ({
  customerInfo,
  quoteDetails,
  contractDetails,
  paymentlist,
  openModal,
  getInvoiceDetails,
  Adjustment,
  getSettlement,
  InvoiceDetails,
  Adjustmentdetails,
  Settlementdetails,
  user,
  partnerdetails,
  handleinvoiceAction,
  downloadInvoice,
  shareInvoice,
  getUnsettlementBal,
  invoiceLoader,
  balance,
  setOptions,
  handleRefresh,
  searchText,
  clearSearchInput,
  Paymentdetails,
  getTransaction,
  dashboardDetails,
  tableRowCount
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };

  const handleChangePage = (event, newPage) => {
    console.log('handleChangePage', { event, newPage })
    const walletId = partnerFactory.getWalletId(partnerdetails);
    const limit = rowsPerPage;
    setPage(newPage);
    switch (value) {
      case 0:
        console.log('details', InvoiceDetails)
        getInvoiceDetails({ id: walletId, offset: newPage, limit })
        break;
        case 1:
          console.log('details', Settlementdetails)
          getSettlement({ id: walletId, offset: newPage, limit });
          break;
          case 2:
        console.log('details', Adjustmentdetails)
        Adjustment({ id: walletId, offset: newPage, limit })
        break;
        case 3:
        console.log('details', Paymentdetails)
        getTransaction({ id: walletId, offset: newPage, limit })
        break;
      default:
        getInvoiceDetails({ id: walletId, offset: newPage, limit })
        break;
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const walletId = partnerFactory.getWalletId(partnerdetails);
    // props.loadLeads({
    //   user: props.user,
    //   count: event.target.value,
    //   usergrpinfo: props.hierarchy?.userInfo
    // });
    setRowsPerPage(+event.target.value);
    const limit = +event.target.value;
    setPage(0);
    switch (value) {
      case 0:
        getInvoiceDetails({ id: walletId, offset: 0, limit })
        break;
      case 1:
        getSettlement({ id: walletId, offset: 0, limit });
        break;
      case 2:
        Adjustment({ id: walletId, offset: 0, limit })
        break;
      case 3:
        getTransaction({ id: walletId, offset: 0, limit })
        break;
      default:
        getInvoiceDetails({ id: walletId, offset: 0, limit })
        break;
    }
  };

  const handleChange = (event, newValue) => {
    clearSearchInput()
    setValue(newValue);
    setPage(0);
    setRowsPerPage(10);
    let walletId = partnerFactory.getWalletId(partnerdetails);
    switch (newValue) {
      case 0:
        getInvoiceDetails({ id: walletId })
        setOptions([{
          name: 'Invoice Id',
          code: 'invoiceId',
          Type: 'invoice'
        }])
        break;
      case 1:
        getSettlement({ id: walletId });
        setOptions([{
          name: 'Settlement Id',
          code: 'settlementId',
          Type: 'settlement'
        }])
        break;
      case 2:
        Adjustment({ id: walletId })
        setOptions([{
          name: 'Adjustment Id',
          code: 'adjustmentId',
          Type: 'adjustment'
        }])
        break;
      case 3:
        getTransaction({ id: walletId })
        setOptions([{
          name: 'Transaction Id',
          code: 'id',
          Type: 'transaction'
        }])
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    let walletId = partnerFactory.getWalletId(partnerdetails);
    getInvoiceDetails({ id: walletId });
    Adjustment({ id: walletId });
    getSettlement({ id: walletId });
    getTransaction({ id: walletId });
  }, []);



  const maketablelist = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        rowlist: row?.list,
        columns: {
          ...row.columns,
          Payable: `${balance.currency}  ${row.columns.Payable}`,
          Receivable: `${balance.currency}  ${row.columns.Receivable}`,
          InvoiceTotal: `${balance.currency}  ${row.columns.InvoiceTotal}`,
          amount: `${balance.currency}  ${row.columns.amount}`,
          Agentname: user
        }
      });
    });

    return rows;
  };
  const handleAdjustmentRowClick = (actions, data) => {
    console.log('outputData', data);
    openModal({
      id: 'Paymentview',
      context: {
        details: data,
        component: 'Adjustment'
      }
    });
  };
  const handleSettlementRowClick = (actions, data) => {
    console.log('outputData', data);
    openModal({
      id: 'InvoicePreview',
      context: {
        details: data,
        component: 'Settlement',
        partner: partnerdetails
      }
    });
  };
  const handleInvoiceRowClick = (actions, data) => {
    console.log('outputData', data);
    openModal({
      id: 'InvoicePreview',
      context: {
        details: data,
        component: 'invoice',
        partner: partnerdetails
      }
    });
  };
  const handleTransactionRowClick = (actions, data) => {
    console.log('outputData', data);
    openModal({
      id: 'TransactionPreview',
      context: {
        details: data,
        component: 'Transaction',
        partner: partnerdetails
      }
    });
  };
  const handleInvoiceRowAction = (action, data) => {
    if (action.modalId) {
      openModal({
        id: action.modalId,
        context: {
          details: data,
          partner: partnerdetails
        }
      });
    } else if (action.actionType) {
      handleinvoiceAction(action, data, partnerdetails);
    }
  };

  const hydrateRows = (data) => {
    if (data) {
      let rows = [];

      console.log('hydrateRows', data);
      Object.values(data).map((row) => {
        rows.push({
          partnerDetails: row.partnerDetails,
          sections: row.sections,
          partners: row.partners,
          formType: row.formType,
          columns: {
            ...row.columns
          }
        });
      });

      return rows;
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'INVOICE ID',
        accessor: 'invoiceId', // accessor is the "key" in the data
      },
      {
        Header: 'DATE',
        accessor: 'date', // accessor is the "key" in the data
      },
      {
        Header: 'DUE DATE',
        accessor: 'dueDate', // accessor is the "key" in the data
      },
      {
        Header: 'PAYABLE',
        accessor: 'payableAmount',
      },
    ],
    []
  )

  const data = React.useMemo(
    () => {
      let list = [];
      Object.values(InvoiceDetails).forEach((item) => {
        list.push(item.list);
      })
      return list
    },
    [InvoiceDetails]
  )
  const [state, setState] = React.useState({});
  const forceReload = () => {
    setState(prev => ({ ...prev }))
  }

  useEffect(() => {
    forceReload()
  }, [Paymentdetails])
  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        // textColor="primary"
        className={classes.tabsroot}
      >
        <Tab
          className={classes.tab}
          label={<Trans id="INVOICE"></Trans>}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          label={<Trans id="SETTLEMENT"></Trans>}
          {...a11yProps(1)}
        />
        <Tab
          className={classes.tab}
          label={<Trans id="ADJUSTMENTS"></Trans>}
          {...a11yProps(2)}
        />
        <Tab
          className={classes.tab}
          label={<Trans id="TRANSACTIONS"></Trans>}
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel
        value={value}
        index={0}
        dir={theme.direction}
        type="invoice"
        getInvoiceDetails={getInvoiceDetails}
      >
        <Invoice
          InvoiceList={maketablelist(InvoiceDetails).reverse()}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleInvoiceRowClick={handleInvoiceRowClick}
          handleInvoiceRowAction={handleInvoiceRowAction}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          invoiceLoader={invoiceLoader}
          tableRowCount={tableRowCount?.invoiceCount}
        />
        {/* <ReactTable columns={columns} data={data} /> */}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Settlements
          settlementList={maketablelist(Settlementdetails).reverse()}
          page={page}
          rowsPerPage={rowsPerPage}
          handleSettlementRowClick={handleSettlementRowClick}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          invoiceLoader={invoiceLoader}
          balance={balance}
          tableRowCount={tableRowCount?.settlementCount}
        />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Adjustments
          AdjustmentList={maketablelist(Adjustmentdetails).reverse()}
          page={page}
          rowsPerPage={rowsPerPage}
          handleAdjustmentRowClick={handleAdjustmentRowClick}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          invoiceLoader={invoiceLoader}
          tableRowCount={tableRowCount?.adjustmentCount}
        />
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        <Transactions
          Paymentlist={maketablelist(Paymentdetails).reverse()}
          page={page}
          rowsPerPage={rowsPerPage}
          handleTransactionRowClick={handleTransactionRowClick}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          openModal={openModal}
          balance={balance}
          invoiceLoader={invoiceLoader}
          tableRowCount={tableRowCount?.transactionCount}
        />
      </TabPanel>
    </div>
  );
};

export default FinancialTabs;
