import React from 'react';
import Table from 'Components/Table/RenderTable';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';
export default function PotentialPartnerTable({
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
  getPotentialPartners
}) {
  return (
    <div>
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        // role={props.user?.role?.roleName}
        rows={hydrateRows(dashboardData?.partnerTable || [])}
        columns={PARTNER_TABLE_CONFIG.PotentialCustomers.columns}
        onRowAction={handleLeadAction}
        onRowClick={handleTableRowClick}
        onCountactions={onCountactions}
        loading={dashboardData.loading.partnerListLoading}
        totalCount={tableRowCount}
        BreackRowPoint={BreackRowPoint}
      />
    </div>
  );
}
