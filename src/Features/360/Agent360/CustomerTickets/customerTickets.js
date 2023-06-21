import React, { useState } from 'react';
import { Grid, makeStyles, Box, Paper } from '@material-ui/core';
// import dayjs from 'dayjs';
import Table from '../../../../Components/Table/RenderTable';
import { CONTRACT_TABLE } from 'lib/constants';

//import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import moment from 'moment';
import ModalsStore from 'Store/Modals';
import PartnertApi from 'Http/api/Partner';
import PartnerFactory from 'Factory/Partner';

import TableSearch from 'Components/TableSearch';
import { useStateful } from 'react-hanger';
import { Trans } from '@lingui/react';
const CustomerTickets = (props) => {
 //console.log(props, 'prooosssss');
  const [page, setPage] = React.useState(0);

  const onSelectValues = useStateful({});
  const [searchBy, setSearchBy] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const SearchText = useStateful('');
  const [searchId, setSearchId] = useState('');
  const [loader, setLoader] = useState(false);
  const FilterObj = useStateful({});
  const { partnerdetails } = props;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    props.CustomerTicket({
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

    props.CustomerTicket({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: event.target.value,
      offset: page,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  };

  const hydratetaskrows = (data) => {
   // console.log(data, 'xxxxxcxc');
    let rows = [];
    console.log(data, "mending")
    Object.values(data).map((row) => {
      rows.push({
        rowlist: row?.products,
        columns: {
          ...row.columns
        }
      });
    });

    console.log(rows, "rowlist")
    return rows;
  };

  console.log(hydratetaskrows(props.constractlist), "rowsdara")
  const handleRowClick = (action, data) => {
    props.openModal({
      id: 'Contractpreview',
      context: {
        details: data
      }
    });
  };

  console.log(hydratetaskrows(props.constractlist), "twoxaxsxa")
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
    props.CustomerTicket({
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
   // console.log(searchId, 'cvcc', searchBy);
    SearchText.setValue(value);
    props.CustomerTicket({
      id: _.get(props.partnerdetails, 'mainlist.partnerId', '...'),
      limit: 10,
      offset: 0,
      value,
      searchQuery: searchId || '',
      setLoader: setLoader
    });
  };

  React.useEffect(() => {
    props.CustomerTicket({
      id: _.get(props.partnerdetails, 'mainlist.productId', '...'),
      limit: 10,
      offset: 0,
      value: '',
      searchQuery: '',
      setLoader: setLoader
    });
  }, []);

  const handlFilterApply = () => {
    const payload = {
      fromDate: FilterObj.value?.fromDate
        ? `${moment(FilterObj.value?.fromDate).format(
            'YYYY-MM-DD'
          )}T00:00:00.000Z`
        : null,
      toDate: FilterObj.value?.toDate
        ? `${moment(FilterObj.value?.toDate).format(
            'YYYY-MM-DD'
          )}T24:00:00.000Z`
        : null
    };
    FilterObj.setValue({});
    props.filterCustomerTicket({
      id: _.get(props.partnerdetails, 'mainlist.productId', '...'),
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      limit: '10',
      offset: '0',
      setLoader: setLoader
    });
  };
  return (
    <Grid container direction="row" spacing={6}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box py={2}>
            <TableSearch
              SearchOptions={'Partner'}
              title={<Trans id="Customer Feedback"></Trans>}
              onSelectValues={onSelectValues}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              // onsearch={onPartnersearch}
              clearFilters={clearFilters}
              handleRefresh={handleRefresh}
              FilterObj={FilterObj}
              filter={'false'}
              customerFilter={true}
              placeholder={'Customer Id, Customer Name'}
              partnerValue="partnerValue"
              onSearchTable={onSearchTable}
              TableSearchBar={true}
              setSearchId={setSearchId}
              searchText={SearchText}
              Options={[
                {
                  name: 'Customer Id',
                  code: '&customerId',
                  Type: 'CustomerTicket'
                },
                {
                  name: 'Customer Name',
                  code: '&customerName',
                  Type: 'CustomerTicket'
                }
              ]}
              handlFilter={handlFilterApply}
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
              columns={CONTRACT_TABLE.CustomerTickets.columns}
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

export default connect((state) => ({}), {})(CustomerTickets);
