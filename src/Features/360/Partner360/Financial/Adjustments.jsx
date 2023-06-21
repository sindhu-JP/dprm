import React from 'react';

import Table from '../../../../Components/Table/RenderTable';
import AdjustmentsConfig from 'lib/constants/Financial/ConfigTable';
export default function Adjustments(props) {
  return (
    <div>
      {/* <SearchBar/> */}
      <Table
        rows={props.AdjustmentList}
        page={props.page}
        rowsPerPage={props.rowsPerPage}
        handleChangePage={props.handleChangePage}
        handleChangeRowsPerPage={props.handleChangeRowsPerPage}
        columns={AdjustmentsConfig.adjustments.columns}
        onRowClick={props.handleAdjustmentRowClick}
        breackpoint={true}
        loading={props.invoiceLoader}
        totalCount={props.tableRowCount}
      />
    </div>
  );
}
