import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Table from 'Components/Table/RenderTable';
import PRODUCT_TABLE from 'lib/constants/Financial/ConfigTable';
import { Trans } from '@lingui/react';

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
    // color: ' #57606F',
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

const TabsView = ({
  customerInfo,
  quoteDetails,
  contractDetails,
  paymentlist,
  requestTablerow,
  user,
  openModal,
  pendingRequestlist,
  children,
  productrowlist,
  Allproductrowlist,
  getProductoverview,
  setSearchType,
  getproductLists,
  totalCount,
  getproductAll,
  partnerdetails,
  loader
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // my task page list hanlding
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };

  // potential partner page list hanlding
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchType(event.target.innerText);
    if (newValue === 1) {
      getproductAll({
        id: _.get(partnerdetails, 'mainlist.partnerId', '...'),
        limit: 10,
        offset: 1
      });
    }
  };

  const hydratetaskrows = (data) => {
    let rows = [];

    Object.values(data).forEach((row) => {
      rows.push({
        rowlist: row.products,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };

  // const handleRowClick = (action, data) => {
  // openModal({
  //     id: 'Preview',
  //     context: {
  //       details: data
  //     }
  //   });
  // };

  const handleRowClick = (action, data) => {
    getProductoverview({
      url: `Add_Product/${_.get(data, 'rowlist._id', '')}/${_.get(
        data,
        'columns.ProductID',
        ''
      )}`
    });
  };

  React.useEffect(() => {
    getproductLists({ id: '', limit: 10, offset: 1 });
  }, []);

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
          label={<Trans id="PARTNER"></Trans>}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          label={<Trans id="ALL"></Trans>}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onRowClick={handleRowClick}
          rows={hydratetaskrows(productrowlist)}
          columns={PRODUCT_TABLE.productColumns.columns}
          breackpoint={true}
          BreackRowPoint={true}
          totalCount={totalCount}
          loader={loader}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onRowClick={handleRowClick}
          rows={hydratetaskrows(Allproductrowlist)}
          columns={PRODUCT_TABLE.productColumns.columns}
          breackpoint={true}
          BreackRowPoint={true}
          totalCount={totalCount}
        />
      </TabPanel>
    </div>
  );
};

export default TabsView;
