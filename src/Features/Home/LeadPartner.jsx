import React, { useEffect } from 'react';
import Table from 'Components/Table/RenderTable';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';

export default function LeadTable({
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
  leadData,
  handleLead
}) {

    useEffect(() => {
            handleLead()
    },[])

  return (
    <div>
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        // role={props.user?.role?.roleName}
        rows={hydrateRows(leadData || [])}  
        columns={PARTNER_TABLE_CONFIG.PotentialLead.columns}
        onRowAction={handleLeadAction}
        onCountactions={onCountactions}
        loading={dashboardData}
        totalCount={tableRowCount}
        BreackRowPoint={BreackRowPoint}
      />
    </div>
  );
}
