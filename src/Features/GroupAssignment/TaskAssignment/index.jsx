import React from 'react';
import { Paper, Box, Grid } from '@material-ui/core';
import Table from 'Components/Table/RenderTable';
import UserGroups from 'lib/constants/Financial/ConfigTable';
import TableSearch from 'Components/TableSearch';
import { useStateful } from 'react-hanger';
import produce from 'immer';
import { useDispatch } from 'react-redux';
import Modals from 'Store/Modals';
import { Trans } from '@lingui/react';
const TaskAssignment = (props) => {
  const [page, setPage] = React.useState(0);
  // const history = useHistory();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loader, setLoader] = React.useState(false);
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };

  const tableList = useStateful([]);
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
  const dropdowngroups = useStateful({});

  React.useEffect(() => {
    if (props.value) {
      props.gettaskassignWorkflow({ id: props.value, setLoader });
    }
  }, [props.value]);

  const hydrateRows = (data) => {
    if (data) {
      const industryTypes = {};
      let rows = [];

      Object.values(data).map((row) => {
        rows.push({
          list: row.list,
          columns: {
            ...row.columns
          },
          open: false
        });
      });

      // tableList.setValue(rows)
      return rows;
    }
  };

  const handleRefresh = () => {
    props.gettaskassignWorkflow({ id: props.value, setLoader });
  };
  const onsearch = () => {};
  const FilterApply = () => {};

  const handleOpenworkflowhistory = (data) => {
    props.gettaskassignWorkflowhistory({ id: data, setLoader });
    tableList.setValue(
      produce(tableList.value, (draft) => {
        draft[draft.findIndex((item) => item.list?._id === data)].open = true;
      })
    );
  };

  React.useEffect(() => {
    if (props.taskAssignWorkflowlist) {
      tableList.setValue(hydrateRows(props.taskAssignWorkflowlist));
    }
  }, [props.taskAssignWorkflowlist]);
  const handleCloseworkflowhistory = (data) => {
    tableList.setValue(
      produce(tableList.value, (draft) => {
        draft[draft.findIndex((item) => item.list?._id === data)].open = false;
      })
    );
  };
  const handleOpenworkflowAction = (row) => {
    dispatch(Modals.open({ id: 'ActionModal', context: row }));
  };
  return (
    <>
      <Grid container direction="row" spacing={6}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Box>
              <TableSearch
                SearchOptions={'mytasksOptions'}
                title={<Trans id="Task Assignment"></Trans>}
                onSelectValues={{}}
                searchBy={''}
                setSearchBy={''}
                onsearch={onsearch}
                handleRefresh={handleRefresh}
                FilterObj={{}}
                handlFilter={FilterApply}
                tableData={props.onSearchtaskAssignWorkflowlist}
                searchTab="Tasks"
                // filter={'true'}
                commonstatus={[]}
                placeholder={'Workflow Id, Workflow Name'}
              />
              <Table
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                // role={props.user?.role?.roleName}
                // rows={leads.value?.table?.rows || []}
                // rows={props.dashboardData.myTasks}

                // onRowAction={handlerowActions}
                // onRowClick={handleRowClick}
                rows={tableList.value || []}
                // rows={Object.values(props.leadsState.tableRows)}
                columns={UserGroups.TaskAssignment.columns}
                breackpoint={true}
                handleOpenworkflowhistory={handleOpenworkflowhistory}
                handleCloseworkflowhistory={handleCloseworkflowhistory}
                workflowHistory={props.workflowHistory}
                workFlowLoader={props.workFlowLoader}
                handleOpenworkflowAction={handleOpenworkflowAction}
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

export default TaskAssignment;
