import React from 'react';
import { Paper, Box, Grid } from '@material-ui/core';
import Table from 'Components/Table/RenderTable';
import UserGroups from 'lib/constants/Financial/ConfigTable';
import TableSearch from 'Components/TableSearch';
import { useStateful } from 'react-hanger';

import { useDispatch } from 'react-redux';
import Modals from 'Store/Modals';
const Users = (props) => {
  const [page, setPage] = React.useState(0);
  // const history = useHistory();
  // const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loader, setLoader] = React.useState(false);
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const handleChangeRowsPerListPage = (event) => {
    setRowsPerListPage(+event.target.value);
    setMyListPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Dispatch = useDispatch();
  const dropdowngroups = useStateful({});

  React.useEffect(() => {
    if (props.value) {
      props.getuserGrouplist({ id: props.value, setLoader });
    }
  }, [props.value]);

  const hydrateRows = (data) => {
    const industryTypes = {};
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        list: row.list,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };

  const handleRefresh = () => {
    props.getuserGrouplist({ id: props.value, setLoader });
  };
  const onsearch = () => {};
  const FilterApply = () => {};

  const handlerowActions = (actions, data) => {
    Dispatch(
      Modals.open({
        id: 'EditUser',
        context: data
      })
    );
    props.Unavailablerow.setValue(data?.list);
    // if (actions.modalId === 'Available') {
    //   props.UserSetAvailable({
    //     payload: produce(data.list, (draft) => {
    //       draft.availbility = 'Available';
    //     })
    //   });
    // } else if (actions.modalId === 'Un Available') {
    //   Dispatch(
    //     Modals.open({
    //       id: 'Setunavailable'
    //     })
    //   );

    //   props.Unavailablerow.setValue(data?.list);

    //   //   props.UserSetUnAvailable({
    //   //     payload:produce(data.list, draft=>{
    //   //       draft.availbility='Un Available'
    //   //     })
    //   //  })
    // } else if (actions.modalId === 'Edit') {
    //   Dispatch(
    //     Modals.open({
    //       id: 'EditUser',
    //       context: data
    //     })
    //   );
    //   props.Unavailablerow.setValue(data?.list);
    // }
  };
  return (
    <>
      <Grid container direction="row" spacing={6}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Box>
              <TableSearch
                SearchOptions={'mytasksOptions'}
                title="Users"
                onSelectValues={{}}
                searchBy={''}
                setSearchBy={''}
                onsearch={onsearch}
                handleRefresh={handleRefresh}
                FilterObj={{}}
                handlFilter={FilterApply}
                tableData={props.onSearchuserGroupsRow}
                // filter={'true'}
                searchTab="Users"
                commonstatus={[]}
                placeholder={'User Name, Email, Mobile Number'}
              />
              <Table
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                // role={props.user?.role?.roleName}
                // rows={leads.value?.table?.rows || []}
                // rows={props.dashboardData.myTasks}

                onRowAction={handlerowActions}
                // onRowClick={handleRowClick}
                rows={hydrateRows(props.userGroupsRow).reverse()}
                //   // // rows={Object.values(props.leadsState.tableRows)}
                columns={UserGroups.UserGroups.columns}
                breackpoint={true}
                loader={loader}
                //  onRowAction={handleLeadAction}
                // onRowClick={handleTableRowClick}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
