// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import dashboardAPI from '../../Http/api/dashboard';
// import PotentialPartnerTable from '../Home/PotentialPartnerTable';
// import TenantPartners from '../Home/TenantPartner';
// import TableSearch from 'Components/TableSearch';
// import { useStateful } from 'react-hanger';
// // import Dashboard from 'Store/Dashboard';
// import { useDispatch } from 'react-redux';
// import moment from 'moment';
// import { Trans } from '@lingui/react';
// import LeadTable from '../Home/LeadPartner';
// import ResellerTable from '../Home/ResellerPartner';
// function TabPanel(props) {
//   const { children, value, index, type, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: '100%'
//   },
//   tab: {
//     font: 'normal normal medium 18px/21px Roboto',
//     letterSpacing: '0px',
//     // color: ' #57606F',
//     opacity: '1',
//     fontWeight: theme.typography.fontWeightBold,
//     fontSize: '16px'
//     // color:theme.palette.common.white
//   },
//   tabsroot: {
//     '& .Mui-selected': {
//       color: theme.palette.primary.black
//     }
//   }
// }));

// const PartnerTabs = ({
//   customerInfo,
//   quoteDetails,
//   contractDetails,
//   paymentlist,
//   requestTablerow,
//   user,
//   openModal,
//   pendingRequestlist,
//   children,
//   productrowlist,
//   Allproductrowlist,
//   getProductoverview,
//   dashboardData,
//   onCountactions,
//   handleLeadAction,
//   getPartnerLead,
//   getResellerPartners,
//   handleTableRowClick,
//   getPotentialPartners,
//   getTenantsList,
//   FilterByPartner,
//   FilterByTenant,
//   tableRowCount
// }) => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const onSelectValues = useStateful({});
//   const FilterObj = useStateful({});
//   const [searchBy, setSearchBy] = React.useState('');
//   const [page, setPage] = React.useState(0);
//   const [leadData, setLeadTable] = useState([]);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [loadData, setLoadData] = useState(false);
//   const SearchText = useStateful({});
//   const SearchQuery = useStateful({});
//   // my task page list hanlding
//   const dispatch = useDispatch();
//   const handleChangeListPage = (event, newPage) => {
//     setMyListPage(newPage);
//   };

//   // console.log(searchBy, "oteyyyyyyy")
//   // potential partner page list hanlding
//   const handleChangePage = async (event, newPage) => {
//     setPage(newPage);
//     // if (value === 0) {
//     //   getPotentialPartners({ limit: rowsPerPage, offset: newPage,  searchValue: SearchText.value  });
//     // } else {
//     //   getTenantsList({ limit: rowsPerPage, offset: newPage,  searchValue: SearchText.value  });
//     // }

//     if (value === 0) {
//       if (_.isEmpty(FilterObj.value)) {
//         getPotentialPartners({
//           limit: rowsPerPage,
//           offset: newPage,
//           searchValue: SearchText.value,
//           SearchQuery: SearchQuery.value
//         });
//       } else {
//         FilterApply(null, newPage);
//       }
//     } else if (value === 1) {
//       if (_.isEmpty(FilterObj.value)) {
//         getTenantsList({
//           limit: rowsPerPage,
//           offset: newPage,
//           searchValue: SearchText.value,
//           SearchQuery: SearchQuery.value
//         });
//       } else {
//         TenantFilterApply(null, newPage);
//       }
//     } else if (value === 2) {
//       if (_.isEmpty(FilterObj.value)) {
//         const { data } = await dashboardAPI.getPartnerLead(
//           rowsPerPage,
//           newPage,
//           SearchText.value,
//           SearchQuery.value
//         );
//         setLeadTable(data);
//         //console.log(data, "awilo")
//       }
//     } else if (value === 3) {
//       if (_.isEmpty(FilterObj.value)) {
//         getResellerPartners({
//           limit: rowsPerPage,
//           offset: newPage,
//           searchValue: SearchText.value,
//           SearchQuery: SearchQuery.value
//         });
//       } else {
//         FilterApply(null, newPage);
//       }
//     }
//   };

//   const handleChangeRowsPerPage = async (event) => {
//     setRowsPerPage(+event.target.value);
//     if (value === 0) {
//       if (_.isEmpty(FilterObj.value)) {
//         getPotentialPartners({
//           limit: event.target.value,
//           offset: page,
//           searchValue: SearchText.value,
//           SearchQuery: SearchQuery.value
//         });
//       } else {
//         FilterApply(event.target.value, null);
//       }
//     } else if (value === 1) {
//       if (_.isEmpty(FilterObj.value)) {
//         getTenantsList({
//           limit: event.target.value,
//           offset: page,
//           searchValue: SearchText.value,
//           SearchQuery: SearchQuery.value
//         });
//       } else {
//         TenantFilterApply(event.target.value, null);
//       }
//     } else if (value === 2) {
//       if (_.isEmpty(FilterObj.value)) {
//         try {
//           setLoadData(true);
//           const { data } = await dashboardAPI.getPartnerLead(
//             rowsPerPage,
//             newPage,
//             SearchText.value,
//             SearchQuery.value
//           );
//           setLeadTable(data);
//           setLoadData(false);
//           // console.log(data, "awilo")
//         } catch (error) {
//           // console.log(error)
//         }
//       }
//     } else if (value === 3) {
//       if (_.isEmpty(FilterObj.value)) {        
//         getResellerPartners({
//           limit: event.target.value,
//           offset: page,
//           searchValue: SearchText.value,
//           SearchQuery: SearchQuery.value
//         });       
//       } else {
//         FilterApply(event.target.value, null);
//       }
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     setPage(0);
//     setRowsPerPage(10);
//   };

//   const hydrateRows = (data) => {
//     if (data) {
//       let rows = [];

//       console.log(data, 'tospi');
//       Object.values(data).map((row) => {
//         rows.push({
//           partnerDetails: row.partnerDetails,
//           sections: row.sections,
//           partners: row.partners,
//           formType: row.formType,
//           columns: {
//             ...row.columns
//           }
//         });
//       });

//       return rows;
//     }
//   };

//   const hydrateLead = (data) => {
//     if (data) {
//       let rows = [];
//       data.map((row) => {
//         rows.push({
//           columns: {
//             ...row
//           }
//         });
//       });

//       return rows;
//     }
//   };

//   const handleLead = async () => {
//     setLoadData(true);
//     try {
//       const { data } = await dashboardAPI.getPartnerLead(10, '0', '', '');
//       setLeadTable(data);
//       setLoadData(false);
//     } catch (error) {
//       // console.log(error)
//       setLoadData(false);
//     }
//   };

//   const onTenantsearch = (value) => {
//     getTenantsList({
//       limit: rowsPerPage,
//       offset: page,
//       searchValue: SearchText.value,
//       SearchQuery: SearchQuery.value
//     });
//   };

//   const onPartnersearch = (value) => {
//     getPotentialPartners({
//       limit: rowsPerPage,
//       offset: page,
//       searchValue: value
//     });

//     // dispatch(
//     //   Dashboard.partnerSearch({
//     //     id: 'partner',
//     //     context: dashboardData.partnerSearchTable,
//     //     value: value
//     //   })
//     // );
//   };

//   const onResellerPartnerSearch = (value) => {
//     getResellerPartners({
//       limit: rowsPerPage,
//       offset: page,
//       searchValue: value
//     });
//   };

//   const handleParnerRefresh = () => {
//     getPotentialPartners({ limit: 10, offset: 0 });
//     SearchText.setValue('');
//     FilterObj.setValue({});
//     setPage(0);
//     setRowsPerPage(10);
//   };
//   const handleResellerPartnerRefresh = () => {
//     getResellerPartners({ limit: 10, offset: 0 });
//     SearchText.setValue('');
//     FilterObj.setValue({});
//     setPage(0);
//     setRowsPerPage(10);
//   };

//   const handleLeadRefresh = async () => {
//     setLoadData(true);
//     try {
//       const { data } = await dashboardAPI.getPartnerLead(10, '0', '', '');
//       setLeadTable(data);
//       setLoadData(false);
//     } catch (error) {
//       //  console.log(error)
//       setLoadData(false);
//     }

//     //console.log(data, "awilo")
//     SearchText.setValue('');
//     FilterObj.setValue({});
//     setPage(0);
//     setRowsPerPage(10);
//   };

//   const handleTenantRefresh = () => {
//     FilterObj.setValue({});
//     SearchText.setValue('');
//     setPage(0);
//     setRowsPerPage(10);
//     getTenantsList({ limit: 10, offset: 0 });
//   };

//   const Onchange = () => {};

//   const FilterApply = (limitValue, offsetvalue) => {
//     const payload = {
//       fromDate: FilterObj.value?.fromDate
//         ? `${moment(FilterObj.value?.fromDate).format(
//             'YYYY-MM-DD'
//           )}T00:00:00.000Z`
//         : null,
//       toDate: FilterObj.value?.toDate
//         ? `${moment(FilterObj.value?.toDate).format(
//             'YYYY-MM-DD'
//           )}T24:00:00.000Z`
//         : null,
//       status: FilterObj.value?.partnerStatus,
//       limit: limitValue || rowsPerPage,
//       offset: offsetvalue || page
//     };

//     FilterByPartner({ payload: payload });
//     // FilterObj.setValue({});
//   };

//   // const ResellerFilterApply = (limitValue, offsetvalue) => {
//   //   const payload = {
//   //     fromDate: FilterObj.value?.fromDate
//   //       ? `${moment(FilterObj.value?.fromDate).format(
//   //           'YYYY-MM-DD'
//   //         )}T00:00:00.000Z`
//   //       : null,
//   //     toDate: FilterObj.value?.toDate
//   //       ? `${moment(FilterObj.value?.toDate).format(
//   //           'YYYY-MM-DD'
//   //         )}T24:00:00.000Z`
//   //       : null,
//   //     status: FilterObj.value?.partnerStatus,
//   //     limit: limitValue || rowsPerPage,
//   //     offset: offsetvalue || page
//   //   };

//   //   FilterByPartner({ payload: payload });
//   //   // FilterObj.setValue({});
//   // };

//   const FilterLeadApply = async (limitValue, offsetvalue) => {
//     const payload = {
//       fromDate: FilterObj.value?.fromDate
//         ? `${moment(FilterObj.value?.fromDate).format(
//             'YYYY-MM-DD'
//           )}T00:00:00.000Z`
//         : null,
//       toDate: FilterObj.value?.toDate
//         ? `${moment(FilterObj.value?.toDate).format(
//             'YYYY-MM-DD'
//           )}T24:00:00.000Z`
//         : null,
//       status: FilterObj.value?.partnerStatus,
//       limit: limitValue || rowsPerPage,
//       offset: offsetvalue || page
//     };

//     try {
//       setLoadData(true);
//       const { data } = await dashboardAPI.FilterLead(payload);
//       setLeadTable(data);
//       setLoadData(false);
//     } catch (error) {
//       setLoadData(false);
//     }

//     // FilterByPartner({ payload: payload });
//     // FilterObj.setValue({});
//   };

//   const TenantFilterApply = (parama, paramb) => {
//     const payload = {
//       fromDate: FilterObj.value?.fromDate
//         ? `${moment(FilterObj.value?.fromDate).format(
//             'YYYY-MM-DD'
//           )}T00:00:00.000Z`
//         : null,
//       toDate: FilterObj.value?.toDate
//         ? `${moment(FilterObj.value?.toDate).format(
//             'YYYY-MM-DD'
//           )}T24:00:00.000Z`
//         : null,
//       status: FilterObj.value?.partnerStatus,
//       limit: rowsPerPage,
//       offset: page
//     };

//     FilterByTenant({ payload: payload });
//     // FilterObj.setValue({});
//   };

//   const onSearchTable = async (search, value) => {
//     SearchText.setValue(value);
//     SearchQuery.setValue(search);
//     if (search.Type === 'Partner') {
//       getPotentialPartners({
//         limit: rowsPerPage,
//         offset: 0,
//         searchValue: value,
//         SearchQuery: search
//       });
//     } else if (search.Type === 'Tenant') {
//       getTenantsList({
//         limit: rowsPerPage,
//         offset: 0,
//         searchValue: value,
//         SearchQuery: search
//       });
//     } else if (search.Type === '') {
//       getTenantsList({
//         limit: rowsPerPage,
//         offset: 0,
//         searchValue: value,
//         SearchQuery: search
//       });
//     } else if (search.Type === 'Lead') {
//       try {
//         setLoadData(true);
//         const { data } = await dashboardAPI.getPartnerLead(
//           rowsPerPage,
//           0,
//           value,
//           search?.code
//         );
//         setLeadTable(data);
//         setLoadData(false);
//       } catch (error) {
//         //console.log("error")
//       }
//     } else if (search.Type === 'Agent') {    
//       getResellerPartners({
//         limit: rowsPerPage,
//         offset: 0,
//         searchValue: value,
//         SearchQuery: search
//       });      
//     }
//   };
//   const clearFilters = () => {
//     FilterObj.setValue({});
//   };

//   console.log(dashboardData, 'dashboar');
//   return (
//     <div className={classes.root}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         indicatorColor="primary"
//         // textColor="primary"
//         className={classes.tabsroot}
//       >
//         <Tab
//           className={classes.tab}
//           label={<Trans id="Potential Partners"></Trans>}
//           {...a11yProps(0)}
//         />
//         <Tab
//           className={classes.tab}
//           label={<Trans id="Potential Tenants"></Trans>}
//           {...a11yProps(1)}
//         />
//         <Tab
//           className={classes.tab}
//           label={<Trans id="Potential Leads"></Trans>}
//           {...a11yProps(2)}
//         />
//         <Tab
//           className={classes.tab}
//           label={<Trans id="Potential Agents"></Trans>}
//           {...a11yProps(2)}
//         />
//       </Tabs>
//       <TabPanel
//         value={value}
//         index={0}
//         dir={theme.direction}
//         type="Partner"
//         getPotentialPartners={getPotentialPartners}
//         getTenantsList={getTenantsList}
//       >
//         <Box py={2}>
//           <TableSearch
//             SearchOptions={'Partner'}
//             title={<Trans id="Potential Partners"></Trans>}
//             onSelectValues={onSelectValues}
//             searchBy={searchBy}
//             setSearchBy={setSearchBy}
//             onsearch={onPartnersearch}
//             clearFilters={clearFilters}
//             handleRefresh={handleParnerRefresh}
//             FilterObj={FilterObj}
//             handlFilter={FilterApply}
//             filter={'true'}
//             placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
//             partnerValue="partnerValue"
//             onSearchTable={onSearchTable}
//             TableSearchBar={true}
//             showStatus={true}
//             Options={[
//               {
//                 name: 'Partner Id',
//                 code: 'PartnerProfileCreation.PartnerDetails.Partner_ID',
//                 Type: 'Partner'
//               },
//               {
//                 name: 'Partner Name',
//                 code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
//                 Type: 'Partner'
//               },
//               {
//                 name: 'Email',
//                 code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID',
//                 Type: 'Partner'
//               },
//               {
//                 name: 'Mobile',
//                 code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER',
//                 Type: 'Partner'
//               }
//             ]}
//           />
//         </Box>
//         <PotentialPartnerTable
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//           handleLeadAction={handleLeadAction}
//           handleTableRowClick={handleTableRowClick}
//           onCountactions={onCountactions}
//           hydrateRows={hydrateRows}
//           dashboardData={dashboardData}
//           tableRowCount={tableRowCount}
//           BreackRowPoint={true}
//           getPotentialPartners={getPotentialPartners}
//         />
//       </TabPanel>
//       <TabPanel
//         value={value}
//         index={1}
//         dir={theme.direction}
//         type="Tenant"
//         getPotentialPartners={getPotentialPartners}
//         getTenantsList={getTenantsList}
//       >
//         <Box py={2}>
//           <TableSearch
//             SearchOptions={'Tenants'}
//             title={<Trans id="Potential Tenants"></Trans>}
//             onSelectValues={onSelectValues}
//             searchBy={searchBy}
//             clearFilters={clearFilters}
//             TenantProfileCreation
//             showStatus={true}
//             Options={[
//               {
//                 name: 'Partner  Id',
//                 code: 'TenantProfileCreation.TenantDetails.Partner_ID',
//                 Type: 'Tenant'
//               },
//               {
//                 name: 'Tenant Id',
//                 code: 'TenantProfileCreation.TenantDetails.TENANT_ID',
//                 Type: 'Tenant'
//               },
//               {
//                 name: 'Tenant Name',
//                 code: 'TenantProfileCreation.TenantDetails.TENANT_NAME',
//                 Type: 'Tenant'
//               },
//               {
//                 name: 'Email',
//                 code: 'TenantProfileCreation.TenantDetails.EMAIL_ID',
//                 Type: 'Tenant'
//               },
//               {
//                 name: 'Mobile',
//                 code: 'TenantProfileCreation.TenantDetails.MOBILE_NUMBER',
//                 Type: 'Tenant'
//               }
//             ]}
//             onSearchTable={onSearchTable}
//             setSearchBy={setSearchBy}
//             onsearch={onTenantsearch}
//             handleRefresh={handleTenantRefresh}
//             FilterObj={FilterObj}
//             handlFilter={TenantFilterApply}
//             filter={'true'}
//             tenantValue="tenantValue"
//             partnerValue="partnerValue"
//             placeholder={'Tenant ID, Tenant Name, Mobile Number, Email'}
//             TableSearchBar={true}
//           />
//         </Box>
//         <TenantPartners
//           hydrateRows={hydrateRows}
//           dashboardData={dashboardData}
//           page={page}
//           getTenantsList={getTenantsList}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//           handleLeadAction={handleLeadAction}
//           handleTableRowClick={handleTableRowClick}
//           tableRowCount={tableRowCount}
//           BreackRowPoint={true}
//           // onCountactions={onCountactions}
//         />
//       </TabPanel>
//       <TabPanel
//         value={value}
//         index={2}
//         dir={theme.direction}
//         type="LeadPartner"
//         getPartnerLead={getPartnerLead}
//       >
//         <Box py={2}>
//           <TableSearch
//             SearchOptions={'Lead'}
//             title={<Trans id="Potential Partners Lead"></Trans>}
//             onSelectValues={onSelectValues}
//             searchBy={searchBy}
//             setSearchBy={setSearchBy}
//             setSearchId={setSearchBy}
//             onsearch={onPartnersearch}
//             clearFilters={clearFilters}
//             handleRefresh={handleLeadRefresh}
//             FilterObj={FilterObj}
//             handlFilter={FilterLeadApply}
//             filter={'true'}
//             placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
//             partnerValue="partnerValue"
//             onSearchTable={onSearchTable}
//             TableSearchBar={true}
//             showStatus={false}
//             Options={[
//               {
//                 name: 'Lead Id',
//                 code: 'leadId',
//                 Type: 'Lead'
//               },
//               {
//                 name: 'Mobile',
//                 code: 'mobile',
//                 Type: 'Lead'
//               },
//               {
//                 name: 'Email',
//                 code: 'emailId',
//                 Type: 'Lead'
//               }
//             ]}
//           />
//         </Box>
//         <LeadTable
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//           handleLeadAction={handleLeadAction}
//           handleTableRowClick={handleTableRowClick}
//           onCountactions={onCountactions}
//           hydrateRows={hydrateLead}
//           dashboardData={loadData}
//           tableRowCount={tableRowCount}
//           BreackRowPoint={true}
//           getPotentialPartners={getPotentialPartners}
//           leadData={leadData}
//           handleLead={handleLead}
//         />
//       </TabPanel>
//       <TabPanel
//         value={value}
//         index={3}
//         dir={theme.direction}
//         type="Agent"
//         getResellerPartners={getResellerPartners}
//       >
//         <Box py={2}>
//           <TableSearch
//             SearchOptions={'Agent'}
//             title={<Trans id="Potential Agents"></Trans>}
//             onSelectValues={onSelectValues}
//             searchBy={searchBy}
//             setSearchBy={setSearchBy}
//             onsearch={onResellerPartnerSearch}
//             clearFilters={clearFilters}
//             handleRefresh={handleResellerPartnerRefresh}
//             FilterObj={FilterObj}
//             handlFilter={FilterApply}
//             filter={'true'}
//             placeholder={'Agent ID, Agent Name, Mobile Number, Email'}
//             partnerValue="partnerValue"
//             onSearchTable={onSearchTable}
//             TableSearchBar={true}
//             showStatus={true}
//             Options={[
//               {
//                 name: 'Agent Id',
//                 code: 'ResellerProfileCreation?.AgentDetails?.Agent_ID',
//                 Type: 'Agent'
//               },
//               {
//                 name: 'Agent Name',
//                 code: 'ResellerProfileCreation?.AgentDetails?.FIRST_NAME',
//                 Type: 'Agent'
//               },
//               {
//                 name: 'Email',
//                 code: 'ResellerProfileCreation?.AgentDetails?.EMAIL',
//                 Type: 'Agent'
//               },
//               {
//                 name: 'Mobile',
//                 code: 'ResellerProfileCreation?.AgentDetails?.MSISDN',
//                 Type: 'Agent'
//               }
//             ]}
//           />
//         </Box>
//         <ResellerTable
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//           handleLeadAction={handleLeadAction}
//           handleTableRowClick={handleTableRowClick}
//           onCountactions={onCountactions}
//           hydrateRows={hydrateRows}
//           dashboardData={dashboardData}
//           tableRowCount={tableRowCount}
//           BreackRowPoint={true}
//           getResellerPartners={getResellerPartners}
//         />
//       </TabPanel>
//     </div>
//   );
// };

// export default PartnerTabs;
