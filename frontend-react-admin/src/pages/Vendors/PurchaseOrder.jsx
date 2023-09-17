import React, { useEffect, useState } from "react";
import PurchaseList from "./PurchaseList";
import SplitData from "./SplitData";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseSalesOrderData } from "../../slices/ecommerce/thunk";
import { createSelector } from "reselect";

const PurchaseOrder = ({ purchaseOrder }) => {
  
  const [selectedRowData, setSelectedRowData] = useState(null);
  const  [vendorSalesId, setVendorSalesId] = useState(null)
  const dispatch = useDispatch()

  const onRowClick = (rowData) => {
    setVendorSalesId(rowData?._id)
  }

  const singlePurchaseSalesData = createSelector(
    (state) => state.Ecommerce.singlePurchaseSalesOrder,
    (singlePurchaseSalesOrder) => singlePurchaseSalesOrder
  );

  const purchaseSingleSalesData = useSelector(singlePurchaseSalesData);

  useEffect(() => {
    setSelectedRowData(purchaseSingleSalesData);
  }, [purchaseSingleSalesData]);

  useEffect(() => {
    if (vendorSalesId !== undefined && vendorSalesId != null) {
      dispatch(getPurchaseSalesOrderData(vendorSalesId));
    }
  }, [dispatch, vendorSalesId]);

  return (
    <div>
      <div className="layout-width">
        <>
          {selectedRowData ? (
          <SplitData 
            rowData={selectedRowData || []}
            purchaseOrder={purchaseOrder || []}
          />
          ) : (
 
            <PurchaseList 
              purchaseOrder={purchaseOrder || []}
              onRowClick={onRowClick} 
            />
          )}
        </>
      </div>
    </div>
  );
};

export default PurchaseOrder;
