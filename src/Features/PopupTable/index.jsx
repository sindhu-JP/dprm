import React, { useEffect, useState } from 'react';
// import _ from 'lodash';

import { connect, useDispatch } from 'react-redux';
import { useStateful } from 'react-hanger';
import {
    Paper,
    Box,
    Grid,
    makeStyles,
    // Typography,
} from '@material-ui/core';

import { Navbar } from 'Components';
import DashboardLayout from 'Layouts/Dashboard';
import RootFooter from 'Components/Footer/RootFooter';
import TableSearch from 'Components/TableSearch';
import { Trans } from '@lingui/react';
import DashboardController from 'Controllers/Dashboard';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';
import PopupTable from './PopupTable';
import { error } from 'Store/PopupTable';

//  import Utils from 'Factory/Utils'
const OrderRequests = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navMessage = useStateful('');
    const handleParnerRefresh = () => {
        getPotentialPartners({ limit: 10, offset: 0 });
        SearchText.setValue('');
        FilterObj.setValue({});
        setPage(0);
        setRowsPerPage(10);
    };
    const [searchBy, setSearchBy] = React.useState('');
    const clearFilters = () => {
        FilterObj.setValue({});
    };

    
   

    useEffect(() => {
        dispatch(DashboardController.fetchStatusProducts({status:'PENDING',offset:0,key:'pending'}))
        dispatch(DashboardController.fetchStatusProducts({status:'INPROGRESS',offset:0,key:'inprogress'}))
    }, [])


    const [page, setPage] = useState(0);
    const [rowsTaskPerPage, setRowsTaskPerPage] = useState(5);

    const[page1,setPage1] = useState(0);
    // const[rowsTaskperPage1,setRowsTaskPerPage1] = useState(5);
console.log('asda',props.dashboardData)
    const handlePageChangePending = async (e, newPage) => {
        console.log('asda',newPage)
        const offset = rowsTaskPerPage * newPage
        
        try {
            dispatch(DashboardController.fetchStatusProducts({status:'PENDING',offset,key:'pending'}))
            setPage(newPage)
        }
        catch (err) {
            console.log(err)
            dispatch(error(err?.response?.data?.msg))
        }
    };

    const handlePageChangeProgress = async (e,newPage) =>{
        console.log('asda1',newPage);

        const offset = rowsTaskPerPage * newPage

        try {
            dispatch(DashboardController.fetchStatusProducts({status:'INPROGRESS',offset,key:'inprogress'}))
            setPage1(newPage)
        }
        catch (err) {
            console.log(err)
            dispatch(error(err?.response?.data?.msg))
        }

    
    }
 
    return (
        <DashboardLayout>
            <Grid container direction="column">
                <Navbar
                    message={navMessage.value}
                    user={props.user || props.authstate.user}
                    authstate={props.authstate}
                />
                <Box py={4}>
                    <Box py={6} px={10} className={classes.homeContainer}>
                        <Grid container direction="column" spacing={10}>
                            <Grid item xs style={{ paddingBottom: '10rem' }}>
                                <Grid container direction="row" spacing={6}>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={6}>
                                            <>
                                                {
                                                    props.pending?.length > 0 && <Grid item xs={12}>
                                                        <Paper elevation={0}>
                                                            {/* <Typography>LAUNCH PRODUCTS</Typography> */}
                                                            <Box py={2}>
                                                                <TableSearch
                                                                    SearchOptions={'Partner'}
                                                                    title={<Trans id="LAUNCH PRODUCTS"></Trans>}
                                                                    // onSelectValues={onSelectValues}
                                                                    searchBy={searchBy}
                                                                    setSearchBy={setSearchBy}
                                                                    // onsearch={onPartnersearch}
                                                                    clearFilters={clearFilters}
                                                                    handleRefresh={handleParnerRefresh}
                                                                    // FilterObj={FilterObj}
                                                                    // handlFilter={FilterApply}
                                                                    filter={'true'}
                                                                    placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
                                                                    partnerValue="partnerValue"
                                                                    // onSearchTable={onSearchTable}
                                                                    TableSearchBar={true}
                                                                    showStatus={true}
                                                                    Options={[
                                                                        {
                                                                            name: 'Partner Id',
                                                                            code: 'PartnerProfileCreation.PartnerDetails.Partner_ID',
                                                                            Type: 'Partner'
                                                                        },
                                                                        {
                                                                            name: 'Partner Name',
                                                                            code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
                                                                            Type: 'Partner'
                                                                        }
                                                                    ]}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <PopupTable loading={props.loading} data={props.pending}
                                                                    handlePageChange={handlePageChangePending} page={page} rowsTaskPerPage={rowsTaskPerPage}
                                                                    columns={[
                                                                        ...PARTNER_TABLE_CONFIG.PopupProductTable.columns,
                                                                        ...PARTNER_TABLE_CONFIG.PopupProductTable.pendingColumns,
                                                                    ]}
                                                                />
                                                            </Box>
                                                        </Paper>

                                                    </Grid>
                                                }
                                                {
                                                    props.inProgress?.length > 0 && <Grid item xs={12}>
                                                        <Paper elevation={0}>
                                                            {/* <Typography>RUNNING PROMOTIONS</Typography> */}
                                                            <Box py={2}>
                                                                <TableSearch
                                                                    SearchOptions={'Partner'}
                                                                    title={<Trans id="RUNNING PROMOTION"></Trans>}
                                                                    // onSelectValues={onSelectValues}
                                                                    searchBy={searchBy}
                                                                    setSearchBy={setSearchBy}
                                                                    // onsearch={onPartnersearch}
                                                                    clearFilters={clearFilters}
                                                                    handleRefresh={handleParnerRefresh}
                                                                    // FilterObj={FilterObj}
                                                                    // handlFilter={FilterApply}
                                                                    filter={'true'}
                                                                    placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
                                                                    partnerValue="partnerValue"
                                                                    // onSearchTable={onSearchTable}
                                                                    TableSearchBar={true}
                                                                    showStatus={true}
                                                                    Options={[
                                                                        {
                                                                            name: 'Partner Id',
                                                                            code: 'PartnerProfileCreation.PartnerDetails.Partner_ID',
                                                                            Type: 'Partner'
                                                                        },
                                                                        {
                                                                            name: 'Partner Name',
                                                                            code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
                                                                            Type: 'Partner'
                                                                        }
                                                                    ]}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <PopupTable loading={props.loading} data={props.inProgress}
                                                                  handlePageChange={handlePageChangeProgress} page={page1} rowsTaskPerPage={rowsTaskPerPage}
                                                                   columns={[
                                                                    ...PARTNER_TABLE_CONFIG.PopupProductTable.columns,
                                                                    ...PARTNER_TABLE_CONFIG.PopupProductTable.inProgressColumns,
                                                                ]} />
                                                            </Box>
                                                        </Paper>
                                                    </Grid>
                                                }
                                            </>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* <Box py={}4> </Box> */}
                        </Grid>

                        {/* <Box py={}4> </Box> */}
                    </Box>
                </Box>
            </Grid>
            <Box>
                <RootFooter />
            </Box>


        </DashboardLayout>
    );
};

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
        color: theme.palette.primary.black,
        opacity: 1
    },
    homeContainer: {
        maxHeight: `calc(100vh - ${theme.spacing(16)})`,
        overflowY: 'auto',
        overflowX: 'hidden'
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
        width: 340,
        minHeight: 200,
        maxHeight: 300
    },
    left: {
        paddingLeft: '16px'
    },
    right: {
        marginLeft: 'auto',
        paddingRight: '16px'
    },
    selectForm: {
        background: 'white'
    },

    selectRoot: {
        padding: ' 7px 30px',
        border: '1px solid rgba(0, 0, 0, 0.23)'
    }
}));

export default connect(
    (state) => ({
        usersState: state.users,
        authstate: state.auth,
        pending: state.dashboardData.popupTable.pending,
        inProgress: state.dashboardData.popupTable.inprogress,
        loading: state.dashboardData.loading.PopupTable,
        dashboardData:state.dashboardData
    })
)(OrderRequests);





