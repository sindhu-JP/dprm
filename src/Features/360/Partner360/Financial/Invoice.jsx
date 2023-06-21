import React from 'react';

import Table from '../../../../Components/Table/RenderTable';
import INVOICE_TABLE from 'lib/constants/Financial/ConfigTable';

export default function Invoice(props) {
  return (
    <div>
      {/* <SearchBar/> */}
      <Table
        rows={props.InvoiceList}
        page={props.page}
        rowsPerPage={props.rowsPerPage}
        handleChangePage={props.handleChangePage}
        handleChangeRowsPerPage={props.handleChangeRowsPerPage}
        columns={INVOICE_TABLE.Invoice.columns}
        onRowAction={props.handleInvoiceRowAction}
        onRowClick={props.handleInvoiceRowClick}
        breackpoint={true}
        loading={props.invoiceLoader}
        totalCount={props.tableRowCount}
      />
    </div>
  );
}
