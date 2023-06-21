import React, { useState } from 'react';
import { Grid, makeStyles, Box, Paper } from '@material-ui/core';
// import dayjs from 'dayjs';
import Table from '../../../../Components/Table/RenderTable';
import { CONTRACT_TABLE } from 'lib/constants';

//import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';

import ModalsStore from 'Store/Modals';
import PartnertApi from 'Http/api/Partner';
import PartnerFactory from 'Factory/Partner';

import TableSearch from 'Components/TableSearch';
import { useStateful } from 'react-hanger';
import { Trans } from '@lingui/react';
const ContractDetails = (props) => {
  const [page, setPage] = React.useState(0);

  const onSelectValues = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const SearchText = useStateful('');
  const [searchId, setSearchId] = useState('');
  const [loader, setLoader] = useState(false);

  const { partnerdetails } = props;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    props.SearchAddContract({
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

    props.SearchAddContract({
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
      rows.push({
        rowlist: row?.addContract,
        columns: {
          ...row.columns
        }
      });
    });
    console.log('--==--**&&**&&&**&&', data);
    return rows;
  };

  const handleRowClick = (action, data) => {
    props.openModal({
      id: 'Contractpreview',
      context: {
        details: data
      }
    });
  };

  const handleContractAction = async (action, data) => {
  
    if (action.modalId) {
      dispatch(
        ModalsStore.open({
          id: action.modalId,
          context: {
            formIdentity: 'Add_Contract',
            details: {
              rowlist: {
                ...data?.rowlist?.AddContractFor?.ContractInformation,
                ...props.partnerdetails?.details?.PartnerProfileCreation
                  ?.PrimaryContactDetails
              }
            },

            partnerdata: props.partnerdetails
          }
        })
      );
      if (action.modalId === 'ShareContract') {
        const payload = {
          contractId: data?.columns?.id,
          productId: '',
          partnerId: data?.columns?.partnerId
        };

        const base64 = await PartnertApi.genereatepdf(payload);
        let payloadpdf = PartnerFactory.getfromdata(base64, data.rowlist);
        props.formData.setValue(payloadpdf);
      }
    } else {
      if (action.actionType) {
        props[action.actionType]({
          url: {
            name: data?.rowlist?.AddContractFor?.ContractInformation
              ?.Dynamic_Contract_Pdf
          }
        });
      }
    }
  };

  // const onPartnersearch = (value) => {};
  const clearFilters = () => {
    FilterObj.setValue({});
  };

  const handleRefresh = () => {
    props.SearchAddContract({
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
    props.SearchAddContract({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: 10,
      offset: 0,
      value,
      searchQuery: searchId || '',
      setLoader: setLoader
    });
  };

  React.useEffect(() => {
    props.SearchAddContract({
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
              title={<Trans id="Contracts Details"></Trans>}
              onSelectValues={onSelectValues}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              // onsearch={onPartnersearch}
              clearFilters={clearFilters}
              handleRefresh={handleRefresh}
              filter={true}
              placeholder={'Tenant ID, Tenant Name, Mobile Number, Email'}
              partnerValue="partnerValue"
              onSearchTable={onSearchTable}
              TableSearchBar={true}
              setSearchId={setSearchId}
              searchText={SearchText}
              Options={[
                {
                  name: 'Contract Id',
                  code: 'AddContractFor.ContractInformation.CONTRACT_ID',
                  Type: 'Contract'
                },
                {
                  name: 'Partner Name/Product Name',
                  code: 'AddContractFor.ContractInformation.PRODUCT_NAME',
                  Type: 'Contract'
                }
              ]}
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
              rows={hydratetaskrows(props.constractlist)}
              columns={CONTRACT_TABLE.ContractCustomers.columns}
              onRowAction={handleContractAction}
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
  imglog: {
    width: '21px',
    height: '29px'
  },
  alignments: {
    alignItems: 'center',
    gap: '10px'
  },
  spaceBtwn: {
    flex: 1
  },
  menumodel: {
    marginTop: '8rem'
  }
}));

export default connect((state) => ({}), {})(ContractDetails);
