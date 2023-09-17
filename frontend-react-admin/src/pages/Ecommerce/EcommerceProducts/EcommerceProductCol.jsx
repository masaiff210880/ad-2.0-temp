import React, { useState } from "react";
import empty_stock from "../../../assets/productIcon/empty_stock.svg";
import half_stock from "../../../assets/productIcon/half_stock.svg";
import full_stock from "../../../assets/productIcon/full_stock.svg";
import { Link } from "react-router-dom";
import { Input, Label } from "reactstrap";
const Rating = (cell) => {
  return (
    <React.Fragment>
      <span>
        <span className="badge bg-light text-body fs-12 fw-medium">
          <i className="mdi mdi-star text-warning me-1"></i>
          {cell.value}
        </span>
        <br />
        <span className="badge bg-light text-body fs-12 fw-medium">
          <i className="mdi mdi-star text-warning me-1"></i>
          {cell.value}
        </span>
      </span>
    </React.Fragment>
  );
};

const Stock = ({ cell, expandedRows, toggleRowExpanded }) => {
  const isExpanded = expandedRows[cell.row.id];

  return (
    <React.Fragment>
      <span>
        <span className="text-body fs-12 fw-medium">
          <Link to="#" className="btn btn-sm " onClick={(e) => {
              e.stopPropagation(); 
              toggleRowExpanded(cell.row.id);
            }}>
            {isExpanded ? " " : " "} 
            <span className="me-2">
              <img
                src={
                  cell.row.original.stock_quantity === 0
                    ? empty_stock
                    : cell.row.original.stock_quantity >= 2000
                    ? half_stock
                    : full_stock
                }
                alt=""
              />
            </span>
            <span className="stock_value">
              {cell.row.original.stock_quantity}
            </span>
          </Link>
          {cell.value}
        </span>
      </span>
    </React.Fragment>
  );
};
const Published = (cell) => {

  const disable = cell?.row?.original?.disable;
  const handleStatus = () => {
    // console.log(disable)
   
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center align-items-center">
        <div className="form-check form-switch form-switch-right form-switch-md">
          <Input className="form-check-input code-switcher" type="checkbox"  
          onChange={handleStatus} />
        </div>
      </div>
    </React.Fragment>
  );
};

const Price = (cell) => {
  // console.log('cell price',cell.row.original.price)
  return (
    <React.Fragment>
      <div className="d-flex flex-column align-items-start">
        <span className="badge bg_gray text-body fs-12 fw-medium mb-2">
          <i className="mdi mdi-star text-warning me-1 gray_icon"></i>
          {`$ ${cell?.row?.original?.price?.levelOne}`}
        </span>
        <span className="badge bg_yellow text-body fs-12 fw-medium mb-2">
          <i className="mdi mdi-star text-warning me-1"></i>
          {`$ ${cell?.row?.original?.price?.levelTwo}`}
        </span>
        <span className="badge bg_primary text-body fs-12 fw-medium mb-2">
          <i className="mdi mdi-star text-warning me-1 primary_icon"></i>
          {`$ ${cell?.row?.original?.price?.levelThree}`}
        </span>
      </div>
    </React.Fragment>
  );
};

export { Rating, Published, Price, Stock };
