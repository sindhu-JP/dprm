import React from 'react';
import Table from 'Components/Table/RenderTable';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';
export default function TenantPartners({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleLeadAction,
  handleTableRowClick,
  onCountactions,
  dashboardData,
  hydrateRows,
  getTenantsList,
  BreackRowPoint,
  tableRowCount
}) {
  React.useEffect(() => {
    getTenantsList({ limit: 10, offset: 0 });
  }, []);
  return (
    <div>
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        // role={props.user?.role?.roleName}
        rows={hydrateRows(dashboardData?.TenantTable || [])}
        columns={PARTNER_TABLE_CONFIG.PotentialTenants.columns}
        onRowAction={handleLeadAction}
        onRowClick={handleTableRowClick}
        totalCount={tableRowCount}
        BreackRowPoint={BreackRowPoint}
        onCountactions={onCountactions}
        loading={dashboardData.loading.partnerListLoading}
      />
    </div>
  );
}
