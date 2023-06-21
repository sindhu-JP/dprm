import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../../../../Components/Table/RenderTable';
import Request_TABLE from 'lib/constants/Financial/ConfigTable';
import { Trans } from '@lingui/react';
// import dashboardAPI from '../../../../Http/api/dashboard';

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

const RequestTabs = ({
  customerInfo,
  quoteDetails,
  contractDetails,
  paymentlist,
  requestTablerow,
  user,
  openModal,
  pendingRequestlist,
  setSearchType,
  loading,
  tableRowCount,
  handlePagination,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('newPage', newPage);
    handlePagination({pageNumber: newPage, pageSize: rowsPerPage})
  };


      const handleChangeRowsPerPage = (event) => {
    // props.loadLeads({
    //   user: props.user,
    //   count: event.target.value,
    //   usergrpinfo: props.hierarchy?.userInfo
    // });
    setRowsPerPage(+event.target.value);
    handlePagination({pageNumber: page, pageSize: +event.target.value})
  };
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchType(event.target.innerText);
  };

  const hydratetaskrows = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        mytasks: row.mytasks,
        tasks: row.tasks,

        columns: {
          ...row.columns,
          assignee: user?.sub
        }
      });
    });

    return rows;
  };
  const handleTaskRowClick = (action, partner) => {
    openModal({
      id: 'TaskDetails',
      context: {
        taskdetails: partner
      }
    });
  };

console.log('tableRowCount', tableRowCount);
  const handleApproved = async () => {
    // let data = await dashboardAPI.ApprovedProdcutlist(id);
    // console.log('approvedData', data);
    console.log('approvedData');
  };
  
  const handlePending = async () => {
    // let data = await dashboardAPI.PendingProdcutlist(id);
    // console.log('PendingProdcutlist', data);
    console.log('pendingData');
  };

  // useEffect(() => {
  //   console.log({requestTablerow, pendingRequestlist})
  // }, [requestTablerow, pendingRequestlist])

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
          label={<Trans id="APPROVED"></Trans>}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          label={<Trans id="PENDING"></Trans>}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rows={hydratetaskrows(requestTablerow).reverse()}
          // // rows={Object.values(props.leadsState.tableRows)}
          columns={Request_TABLE.Requests.columns}
          //   onRowAction={handleTaskAction}
          onRowClick={handleTaskRowClick}
          breackpoint={true}
          loading={loading}
          totalCount={tableRowCount}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rows={hydratetaskrows(pendingRequestlist).reverse()}
          // // rows={Object.values(props.leadsState.tableRows)}
          columns={Request_TABLE.PendingRequests.columns}
          //   onRowAction={handleTaskAction}
          onRowClick={handleTaskRowClick}
          breackpoint={true}
          actionsView={true}
          totalCount={tableRowCount}
        />
      </TabPanel>
    </div>
  );
};

export default RequestTabs;
