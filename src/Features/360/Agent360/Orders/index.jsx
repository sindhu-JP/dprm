import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  makeStyles,
  useTheme,
  Box,
  Paper,

} from '@material-ui/core';
// import Table from '../../../../Components/Table/RenderTable';
// import ORDER_TABLE from 'lib/constants/Financial/ConfigTable';

//import SearchIcon from '@material-ui/icons/Search';
import { connect, useDispatch } from 'react-redux';

import { useBoolean } from 'react-hanger';
import Modal from 'Store/Modals';
import dashboardStore from 'Store/Dashboard';
import { Trans } from '@lingui/react';

import TableSearch from 'Components/TableSearch';
import {useStateful} from "react-hanger"
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ORDER_TABLE from 'lib/constants/Financial/ConfigTable';
import Table from 'Components/Table/RenderTable';



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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
const Orders = (props) => {

  const theme = useTheme();
  const onSelectValues = useStateful({});
  const { customerInfo, quoteDetails } = props;
  const [searchBy, setSearchBy] = React.useState('');
  const [qoute360ViewOpen, setQoute360ViewOpen] = React.useState(false);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const [quoteInfo, setQuoteInfo] = React.useState('');
  const enableSearch = useBoolean(false);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const SearchText = useStateful('');
  const [hasError, setHasError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(0);
  const [loader, setLoader] = useState(false);

  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const handleChangeRowsPerListPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerListPage(+event.target.value);
    setMyListPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    // props.loadLeads({
    //   user: props.user,
    //   count: event.target.value,
    //   usergrpinfo: props.hierarchy?.userInfo
    // });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleMenuOpen = () => {};
  const maketable = (data) => {
    console.log(data,"ordertrackingmm")
    let rows = [];

  data.length > 0 &&  data.map((row) => {
      rows.push({
        rowlist: row?.orders,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };
console.log(props, "checofd")
  const makemanualTable = (data) => {
    console.log(data,"ordertrackingmmm", props)
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        rowlist: row?.orders,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };

  const handleTableRowClick = (e, data) => {
    dispatch(
      Modal.open({
        id: 'OrderDetails',
        context: {
          details: data
        }
      })
    );
  };

  const handleChange = (event, newValue) => {
    props.manualOrderTracking({id: props.id,
      limit: 10,
      offset: 0,
      value,
      SearchQuery:  searchId || "",
      setLoader
    })
    setValue(newValue);
  };

  const handleSearch = () => {
    dispatch(
      dashboardStore.onTableSearch({
        id: 'Orders',
        context: {
          onSearch: props.OrderSearchlist,
          value: value
        }
      })
    );

    setValue('');
  };

  const handleRefresh = () => {
    dispatch(
      dashboardStore.onTableSearch({
        id: 'Orders',
        context: {
          onSearch: props.OrderSearchlist,
          value: ''
        }
      })
    );
  };
  const handleCloseSearch = () => {
    enableSearch.setFalse();
    dispatch(
      dashboardStore.onTableSearch({
        id: 'Orders',
        context: {
          onSearch: props.OrderSearchlist
          // value: e.target.value
        }
      })
    );
  };

  const onSearchTable = (search, value) => {

    if (value === 1) {
      props.manualOrderTracking({id: props.id,
        limit: 10,
        offset: 0,
        value,
        SearchQuery:  searchId || "",
        setLoader
      })
    }
    else {
      props.orderTracking({id: props.id,
        limit: 10,
        offset: 0,
        value,
        SearchQuery:  searchId || "",
        setLoader
      })
    }
   

  };

  useEffect(()=> {
    props.orderTracking({id: props.id})
    
  }, [])
  return (
    <Grid container direction="row" spacing={6}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box>
            <Grid container direction="column">
            <Box py={2}>
            <TableSearch
              SearchOptions={'Partner'}
              title={<Trans id="Contracts Details"></Trans>}
              onSelectValues={onSelectValues}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              // onsearch={onPartnersearch}
              clearFilters={null}
              handleRefresh={handleRefresh}
              filter={false}
              placeholder={'Tenant ID, Tenant Name, Mobile Number, Email'}
              partnerValue="partnerValue"
              onSearchTable={onSearchTable}
              TableSearchBar={true}
              setSearchId={setSearchId}
              searchText={SearchText}
              Options={[
                { name: 'Partner Id', code: 'partnerId' },
                { name: '  Order id', code: 'OrderId' },
                { name: 'Product Name', code: 'productName' },
                { name: 'Customer Id', code: 'CustomerId' }
              ]}
            />
          </Box>
            </Grid>


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
          label={<Trans id="NORMAL ORDERS"></Trans>}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          label={<Trans id="MANUAL ORDERS"></Trans>}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
             <Table
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              role={props.user?.role?.roleName}
              rows={maketable(props.orderList).reverse()}
              // // rows={Object.values(props.leadsState.tableRows)}
              columns={ORDER_TABLE.Orders.columns}
              // onRowAction={handleLeadAction}
              onRowClick={handleTableRowClick}
              breackpoint={true}
            />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
             <Table
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              role={props.user?.role?.roleName}
              rows={makemanualTable(props.manualOrderList).reverse()}
              // // rows={Object.values(props.leadsState.tableRows)}
              columns={ORDER_TABLE.manualOrders.columns}
              // onRowAction={handleLeadAction}
              onRowClick={handleTableRowClick}
              breackpoint={true}
              totalCount={props?.tableRowCount?.orderCount}

            />
      </TabPanel>
    </div>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  },
  alignments: {
    alignItems: 'center',
    gap: '10px'
  },
  spaceBtwn: {
    flex: 1
  }
}));

export default connect((state) => ({}), {})(Orders);
