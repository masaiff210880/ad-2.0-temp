import React, { useState } from "react";
import DetailScreen from "./DetailScreen";
import TableScreen from "./TableScreen";
const PurchaseReceipts = ({ data }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  }
  document.title = "Vendor List | American Distributors";
  return (
    <>
      {selectedRowData ? (
        <DetailScreen rowData={selectedRowData} />
      ) : (
        <TableScreen onRowClick={handleRowClick} data={data||[]} />
      )}
    </>
  );
};

export default PurchaseReceipts;
