import React, {useEffect, useState} from "react";
import PurchaseList from "../Customer/PurchaseList";
import SplitData from "../Customer/SplitData";
import {getOneSalesData} from "../../slices/ecommerce/thunk";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";

const PurchaseOrder = ({salesOrder}) => {
  const [salesId, setSalesID] = useState(null);
  const dispatch = useDispatch();

  const [selectedRowData, setSelectedRowData] = useState(null);
  const onRowClick = (rowData) => {
    setSalesID(rowData?._id);
  };

  const selectSingleSalesData = createSelector(
    (state) => state.Ecommerce.singleSalesOrder,
    (singleSalesOrder) => singleSalesOrder
  );

  const salesSinlgeData = useSelector(selectSingleSalesData);

  useEffect(() => {
    setSelectedRowData(salesSinlgeData);
  }, [salesSinlgeData]);

  useEffect(() => {
    if (salesId !== undefined && salesId != null) {
      dispatch(getOneSalesData(salesId));
    }
  }, [dispatch, salesId]);

  return (
    <div>
      <div className="layout-width">
        <>
          {selectedRowData ? (
            <SplitData
              rowData={selectedRowData || []}
              salesOrder={salesOrder || []}
            />
          ) : (
            <PurchaseList
              salesOrder={salesOrder || []}
              onRowClick={onRowClick}
            />  
          )}
        </>
      </div>
    </div>
  );
};

export default PurchaseOrder;
