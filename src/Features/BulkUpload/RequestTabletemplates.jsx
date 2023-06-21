import React ,{useState, useEffect} from 'react'
import { Trans } from '@lingui/react'
import {connect} from 'react-redux'
import TableSearch from '../../Components/TableSearch';
import DashboardController from 'Controllers/Dashboard';
import { useStateful } from 'react-hanger';
import Table from 'Components/Table/RenderTable';
import HideActions from 'Components/Table/HideActions';
import Actions from 'Components/Table/Actions';
import { Paper, Box } from '@material-ui/core';
import dayjs from "dayjs"


const RequestTabletemplates = (props) => {
    const onSelectValues = useStateful({});
    const [searchBy, setSearchBy] = React.useState('');
    const FilterObj = useStateful({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loader, setLoader] = useState(false);

  const [uploadData, setUploadData] = useState([])

  const SearchText = useStateful({});
  const SearchQuery = useStateful({});


    const onSearchTable = (search, value) => {
      SearchText.setValue(value);
      SearchQuery.setValue(search);

      props.getSearchUploadHistoryList({
        limit: rowsPerPage,
        offset: page,
        searchValue: value,
        SearchQuery: search
      });
      
      // props.orderTracking({ limit: rowsPerPage, offset: page, value: value });
    };
    const handleRefresh = () => {
        // setPage(0);
        // setRowsPerPage(10);
        // props.orderTracking({ limit: 10, offset: 0, setLoader });
    };

    const FilterApply = (limitValue, offsetvalue) => {

      };


    useEffect(() => {
      //getdata()
      props.getUploadHistoryList({ limit: 10, offset: 0 })
    }, [])

    useEffect(() => {
      console.log("asdewqe: ", props.dashboardData.uploadHistoryTable)
    })

    const handlFilterApply = () => {

    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      props.getUploadHistoryList({ limit: 10, offset: newPage })
    };

      const handleChangeRowsPerPage = (event) => {
      };
      const handleTableRowClick = (event, row) => {};

      const RequestHeader = {
        columns: [
          {
            id: 'createdDate',
            label: 'Processed Date',
            format: (PurchaseDate) => dayjs(PurchaseDate).format('DD MMM YYYY')
          },
          {
            id: 'requestId',
            label: 'Request ID'
          },

          {
            id: 'bulkType',
            label: 'Bulk Type'
          },
    
      
          {
            id: 'totalRecords',
            label: 'Uploaded'
          },

          {
            id: 'totalProcessed',
            label: 'Processed'
          },
          {
            id: 'totalFailure',
            label: 'Rejected'
          },
          {
            id: 'status',
            label: 'Status',
            render: ({ status, role, action }) => (
              // <Actions status={status} role={role} onClick={action} />
              <HideActions role={role} status={status} action={action} />
            )
          },

          {
            id: 'actions',
            label: 'Actions',
            render: (data) => (
              <Actions data={data} />
            )
          }
        ]
      };

      const onUploadHistorysearch = (value) => {

      };

      const clearFilters = () => {
        FilterObj.setValue({});
      };

      const handleParnerRefresh = () => {

      };


    const hydratetaskrows = (data) => {
      let rows = [];
  
      Object.values(data).map((row) => {
        rows.push({
          mytasks: row.mytasks,
          tasks: row.tasks,
  
          columns: {
            ...row.columns,
            Initiator: props.user?.sub
          }
        });
      });
  
      return rows;
    };
    

    return (
        <Paper elevation={0} style={{width:'100%'}}>


        <Box py={2}>
          <TableSearch
            SearchOptions={'Partner'}
            title={<Trans id="Upload History"></Trans>}
            onSelectValues={onSelectValues}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            onsearch={onUploadHistorysearch}
            clearFilters={clearFilters}
            handleRefresh={handleParnerRefresh}
            FilterObj={FilterObj}
            handlFilter={FilterApply}
            filter={'true'}
            placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
            partnerValue="partnerValue"
            onSearchTable={onSearchTable}
            TableSearchBar={true}
            showStatus={true}
            Options={[

              {
                name: 'Request ID',
                code: 'requestId',
                Type: 'Partner'
              },

              {
                name: 'Request Type',
                code: 'requestType',
                Type: 'Partner'
              },

              {
                name: 'Status',
                code: 'status',
                Type: 'Partner'
              }
            ]}
          />
        </Box>
          <Table
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            role={'John'}
            rows={hydratetaskrows(props.dashboardData.uploadHistoryTable || [])}
            columns={RequestHeader.columns}
            onRowClick={handleTableRowClick}
            breackpoint={true}
            totalCount={100}
            loader={loader}
          />

        </Paper>
    )
}

export default connect(
  (state) => ({
    dashboardData: state.dashboardData,
  }),
  {

    getUploadHistoryList: DashboardController.getUploadHistoryList,
    getSearchUploadHistoryList: DashboardController.getSearchUploadHistoryList
  }
)(RequestTabletemplates);

