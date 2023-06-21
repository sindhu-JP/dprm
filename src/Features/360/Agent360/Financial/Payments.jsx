import React from 'react';
import Table from '../../../../Components/Table/RenderTable';
import PaymentsConfig from 'lib/constants/Financial/ConfigTable';
import maketablerow from 'Factory/PartnerTables';
export default function Payments({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  paymentlist,
  openModal
}) {
  const handleTableRowClick = (actions, data) => {
    openModal({
      id: 'Paymentview',
      context: {
        details: data
      }
    });
  };
  return (
    <div>
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rows={maketablerow.TableRow(paymentlist)}
        columns={PaymentsConfig.payments.columns}
        onRowClick={handleTableRowClick}
        breackpoint={true}
      />
    </div>
  );
}
