import React from 'react';
import Table from 'Components/Table/RenderTable';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';

export default function ResellerTable({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleLeadAction,
  handleTableRowClick,
  onCountactions,
  dashboardData,
  hydrateRows,
  tableRowCount,
  BreackRowPoint,
  getResellerPartners,
  loader,
  setLoader
}) {

React.useEffect(()=>{
  
  getResellerPartners({ limit: 10, offset: 0, setLoader   });

}, [])
    


  return (
    <div>
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        // role={props.user?.role?.roleName}
        rows={hydrateRows(dashboardData)} 
        columns={PARTNER_TABLE_CONFIG.PotentialReseller.columns}
        onRowAction={handleLeadAction}
        onRowClick={handleTableRowClick}
        onCountactions={onCountactions}
        loading={dashboardData}
        totalCount={tableRowCount}
        BreackRowPoint={BreackRowPoint}
        loader={loader}
      />
    </div>
  );
}
