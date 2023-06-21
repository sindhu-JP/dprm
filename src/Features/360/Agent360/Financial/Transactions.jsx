import React from 'react';
import Table from '../../../../Components/Table/RenderTable';
import PaymentsConfig from 'lib/constants/Financial/ConfigTable';
// import maketablerow from 'Factory/PartnerTables';
export default function Transactions({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  Paymentlist,
  openModal,
  invoiceLoader,
  balance,
  tableRowCount,
}) {
  console.log('Paymentlist', Paymentlist)
  console.log('tableRowCount', tableRowCount)

  // getSettlement Settlementdetails
  // getTransaction paymentTablelist Paymentdetails 

  const handleTableRowClick = (actions, data) => {
    openModal({
      id: 'Paymentview',
      context: {
        details: data,
        component: 'transaction'
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
        rows={Paymentlist}
        columns={PaymentsConfig.transactions.columns}
        onRowClick={handleTableRowClick}
        // breackpoint={true}
        loading={invoiceLoader}
        totalCount={tableRowCount}
      />
    </div>
  );
}
