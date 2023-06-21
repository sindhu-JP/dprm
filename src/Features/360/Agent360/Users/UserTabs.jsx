import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from 'Components/Table/RenderTable';
import PRODUCT_TABLE from 'lib/constants/Financial/ConfigTable';
import SignOff from 'Assets/Icons/Notes.svg';
import CustomerTicket from 'Assets/Icons/CustomerTicket.svg';
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import Modals from 'Store/Modals';
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
    color: ' #999999',
    opacity: '1',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '16px',
    '& .MuiTab-wrapper': {
      flexDirection: 'row'
    }
  },
  tabIcons: {
    paddingRight: 10
  },
  tabsroot: {
    '& .Mui-selected': {
      // color: '#57606F',
      color: theme.palette.primary.black,
      fontSize: '18px'
    }
  }
}));

const UserTabs = ({
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
  tabName,
  isOverview,
  TenantList,
  Masterlist,
  loader
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = CustomHooks.customUseDispatch();

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
  };

  const hydratetaskrows = (data) => {
    if (data) {
      let rows = [];

      Object.values(data).map((row) => {
        rows.push({
          rowlist: row.rowlist,
          columns: {
            ...row.columns
          }
        });
      });

      return rows;
    }
  };
  const usersTabLabels = {
    master: <Trans id="MASTER"></Trans>,
    tenant: <Trans id="TENANT"></Trans>
  };
  const handleRowClick = (e, row) => {
    dispatch(
      Modals.open({
        id: 'AddUser',
        context: {
          code: row?.rowlist?.partnerId || row?.rowlist?.tenantPartnerId,
          name: row?.columns?.Name,
          label: row?.columns?.Name,
          list: row?.rowlist,
          EditUser: true,
          user_fun: 'Modify_user'
        }
      })
    );
  };
  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        className={classes.tabsroot}
        // TabIndicatorProps={
        //   isOverview ? { style: { background: '#FFCC00' } } : ''
        // }
        // textColor={isOverview ? '#FFCC00' : 'primary'}
        // className={isOverview ? classes.tabsroot : ''}
      >
        {tabName && isOverview
          ? Object.values(tabName).map((tab, index) => {
              return (
                <Tab
                  className={classes.tab}
                  label={
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item>
                        {tab === 'Sign-Off' ? (
                          <img src={SignOff} className={classes.tabIcons} />
                        ) : tab === 'Partner Tickets' ? (
                          <img
                            src={CustomerTicket}
                            className={classes.tabIcons}
                          />
                        ) : tab === 'Customer Tickets' ? (
                          <img
                            src={CustomerTicket}
                            className={classes.tabIcons}
                          />
                        ) : (
                          ''
                        )}
                      </Grid>
                      <Grid item>{tab}</Grid>
                    </Grid>
                  }
                  {...a11yProps(index)}
                />
              );
            })
          : Object.values(usersTabLabels).map((tab, index) => {
              return (
                <Tab
                  className={classes.tab}
                  label={tab}
                  {...a11yProps(index)}
                />
              );
            })}
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onRowClick={handleRowClick}
          rows={hydratetaskrows(Masterlist)?.reverse()}
          columns={PRODUCT_TABLE.UserMasterTable.columns}
          loading={loader}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onRowClick={handleRowClick}
          rows={hydratetaskrows(TenantList)?.reverse()}
          columns={PRODUCT_TABLE.UserTenantTable.columns}
          loading={loader}
        />
      </TabPanel>
    </div>
  );
};

export default UserTabs;
