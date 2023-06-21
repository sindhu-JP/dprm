import React, { useState } from 'react';
import { Grid, makeStyles, Box, Paper } from '@material-ui/core';
import Table from '../../../Components/Table/RenderTable';
import PRODUCT_TABLE from 'lib/constants/Financial/ConfigTable';

import { connect } from 'react-redux';

// import LeadActionHide from 'Features/360/360QuoteDetails/LeadActionHide';
import _ from 'lodash';
import { Trans } from '@lingui/react';
import TabsView from 'Components/TabsView';
import TableSearch from 'Components/TableSearch';
import { useStateful } from 'react-hanger';
import img from 'Assets/Icons/AddProductIcon.svg';

const ProductList = (props) => {
  const [page, setPage] = React.useState(0);

  const onSelectValues = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const SearchText = useStateful('');
  const [searchId, setSearchId] = useState('');
  const [loader, setLoader] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.getproductLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: rowsPerPage,
      offset: newPage,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);

    props.getproductLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: event.target.value,
      offset: page,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  };

  const hydratetaskrows = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      return rows.push({
        rowlist: row.products,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };

  const handleRowClick = (action, data) => {
    props.getProductoverview({
      url: `Add_Product/${_.get(data, 'rowlist._id', '')}/${_.get(
        data,
        'columns.ProductID',
        ''
      )}`
    });
  };
  const [searchType, setSearchType] = React.useState('PARTNER');
  // const handleChange = (e) => {
  //   if (searchType === 'ALL') {
  //     dispatch(
  //       dashboardStore.onTableSearch({
  //         id: 'Products',
  //         context: {
  //           onSearch: props.AllonSearchproductrowlist,
  //           value: e.target.value,
  //           type: 'ALL'
  //         }
  //       })
  //     );
  //   } else if (searchType === 'PARTNER') {
  //     dispatch(
  //       dashboardStore.onTableSearch({
  //         id: 'Products',
  //         context: {
  //           onSearch: props.onSearchproductrowlist,
  //           value: e.target.value,
  //           type: 'PARTNER'
  //         }
  //       })
  //     );
  //   }
  // };

  const onPartnersearch = (value) => {};
  const clearFilters = () => {
    FilterObj.setValue({});
  };

  const handleRefresh = () => {
    props.getproductLists({
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
    SearchText.setValue(value);

    props.getproductLists({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: 10,
      offset: 0,
      value: value,
      searchQuery: searchId || '',
      setLoader: setLoader
    });
  };
  React.useEffect(() => {
    props.getproductLists({
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
              title={<Trans id="Products"></Trans>}
              onSelectValues={onSelectValues}
              searchBy={searchBy}           
              setSearchBy={setSearchBy}
              onsearch={onPartnersearch}
              clearFilters={clearFilters}
              handleRefresh={handleRefresh}
              filter={true}
              placeholder={'Tenant ID, Tenant Name, Mobile Number, Email'}
              partnerValue="partnerValue"
              onSearchTable={onSearchTable}
              TableSearchBar={true}
              searchText={SearchText}
              Options={[
                {
                  name: 'Product Id',
                  code: 'AddProduct.ProductDetails.PRODUCT_ID',
                  Type: 'Product'
                },
                {
                  name: 'Product Name',
                  code: 'AddProduct.ProductDetails.PRODUCT_NAME',
                  Type: 'Product'
                }
              ]}
              setSearchId={setSearchId}
              showIcon={true}
              tabIcon={img}
            />
          </Box>
          <Box>
            {!props.hideTabProducts.value ? (
              <TabsView
                productrowlist={props.productrowlist}
                openModal={props.openModal}
                getProductoverview={props.getProductoverview}
                Allproductrowlist={props.Allproductrowlist}
                searchType={searchType}
                getproductLists={props.getproductLists}
                setSearchType={setSearchType}
                partnerdetails={props.partnerdetails}
                totalCount={props.CommonCount}
                getproductAll={props.getproductAll}
                loader={loader}
              />
            ) : (
              <Table
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onRowClick={handleRowClick}
                rows={hydratetaskrows(props.productrowlist)}
                //   // // rows={Object.values(props.leadsState.tableRows)}
                columns={PRODUCT_TABLE.productColumns.columns}
                breackpoint={true}
                BreackRowPoint={true}
                totalCount={props.CommonCount}
                loader={loader}
              />
            )}
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

export default connect((state) => ({}), {})(ProductList);
