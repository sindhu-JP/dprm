import React from 'react';

import Table from '../../../../Components/Table/RenderTable';
import StatementsConfig from 'lib/constants/Financial/ConfigTable';
export default function Settlements(props) {
  return (
    <div>
      {/* <SearchBar /> */}
      <Table
        rows={props.settlementList}
        page={props.page}
        rowsPerPage={props.rowsPerPage}
        handleChangePage={props.handleChangePage}
        handleChangeRowsPerPage={props.handleChangeRowsPerPage}
        //   rows={constant.settlement}
        // // rows={Object.values(props.leadsState.tableRows)}
        columns={StatementsConfig.Statemets.columns}
        // onRowAction={handleLeadAction}
        onRowClick={props.handleSettlementRowClick}
        breackpoint={true}
        loading={props.invoiceLoader}
        totalCount={props.tableRowCount}
      />
    </div>
  );
}
