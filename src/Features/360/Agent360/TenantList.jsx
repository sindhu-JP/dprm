import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  // Typography,
  Box,
  Paper
} from '@material-ui/core';
import Table from '../../../Components/Table/RenderTable';
import TENANT_TABLE from 'lib/constants/Financial/ConfigTable';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useStateful } from 'react-hanger';
import TableSearch from 'Components/TableSearch';
import { Trans } from '@lingui/react';
const TenantList = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const onSelectValues = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const SearchText = useStateful('');
  const [searchId, setSearchId] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage); 
    props.getTenantLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: rowsPerPage,
      offset: newPage + 1,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    props.getTenantLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: event.target.value,
      offset: page,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  };

  const hydraterows = (data) => {
    let rows = [];
    Object.values(data).map((row) => {
      rows.push({
        rowlist: row.Tenants,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };

  const handleRowClick = async (action, data) => {
    props.getTenantoverview({
      url: `Tenant_Partner_Profile/${_.get(data, 'rowlist._id', '')}/${_.get(
        data,
        'columns.TenantID',
        ''
      )}`
    });
  };

  const onPartnersearch = (value) => {};
  const clearFilters = () => {
    FilterObj.setValue({});
  };

  const handleRefresh = () => {
    props.getTenantLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: 10,
      offset: 0,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
    SearchText.setValue('');
    // FilterObj.setValue({});
    setPage(0);
    setRowsPerPage(10);
  };
  const onSearchTable = (search, value) => {
    props.getTenantLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: 10,
      offset: 0,
      value: value,
      searchQuery: searchId || '',
      setLoader: setLoader
    });
  };
  React.useEffect(() => {
    props.getTenantLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: 10,
      offset: 0,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  }, []);
  return (
    <Grid container direction="row" spacing={6}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box py={2}>
            <TableSearch
              SearchOptions={'Partner'}
              title={<Trans id="Tenants"></Trans>}
              onSelectValues={onSelectValues}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              onsearch={onPartnersearch}
              clearFilters={clearFilters}
              handleRefresh={handleRefresh}
              filter={true}
              partnerValue="partnerValue"
              onSearchTable={onSearchTable}
              TableSearchBar={true}
              searchText={SearchText}
              Options={[
                {
                  name: 'Tenant Id',
                  code: 'TenantProfileCreation.TenantDetails.TENANT_ID',
                  Type: 'Partner'
                },
                {
                  name: 'Tenant Name',
                  code: 'TenantProfileCreation.TenantDetails.TENANT_NAME',
                  Type: 'Partner'
                }
              ]}
              setSearchId={setSearchId}
            />
          </Box>
          <Box>
            <Table
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              role={props.user?.role?.roleName}
              onRowClick={handleRowClick}
              rows={hydraterows(props.listOftenents)}
              columns={TENANT_TABLE.tenantColumns.columns}
              breackpoint={true}
              BreackRowPoint={true}
              totalCount={props.CommonCount}
              loader={loader}
            />
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
  alignments: {
    alignItems: 'center',
    gap: '10px'
  },
  spaceBtwn: {
    flex: 1
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  }
}));

export default connect((state) => ({}), {})(TenantList);
