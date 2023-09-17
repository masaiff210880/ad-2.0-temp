import React, { useState } from 'react'
import SearchHeaderTab from './SearchHeaderTab'
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap';
import silver from "../../assets/images/silver.svg";
import gold from "../../assets/images/gold.svg";
import platinum from "../../assets/images/platinum.svg";
import Sort from "../../assets/images/Sort.svg";
import plus_circle from '../../assets/images/products/plus_circle.svg'
import style from "../../styles/products/Addproduct.module.css"

import { Link } from 'react-router-dom';
import { Select, TextField } from '@material-ui/core';

const Variant = (props) => {
  console.log(props.products);

  // const {data} = props;
  // console.log(data)
  const [selectedFiles, setselectedFiles] = useState([]);
  const [attributeCombinations, setAttributeCombinations] = useState([]);
  const [selectedMulti, setselectedMulti] = useState(null);
  const SingleOptions = [
    { value: "apple", label: "apple" },
    { value: "kiwi", label: "kiwi" },
    { value: "avacado", label: "avacado" },
    { value: "banana", label: "banana" },
    { value: "green", label: "green" },
  ];

  const ColorOptions = [
    { value: "red", label: "red" },
    { value: "black", label: "black" },
    { value: "blue", label: "blue" },
    { value: "orange", label: "orange" },
    { value: "white", label: "white" },
  ];


  const handleMulti = (selectedMulti) => {
    setselectedMulti(selectedMulti);
  }


  const NotOptions = [
    { value: "", label: "Not Option" },
  ];

  const deleteRow = (index) => {
    const updatedSelectedMulti = [...selectedMulti];
    updatedSelectedMulti.splice(index, 1);
    setselectedMulti(updatedSelectedMulti);
  };

  const handleAddCombination = () => {
    const newCombination = {
      attributes: "Flavours", // Default value
      options: [
        // { value: 'apple', label: 'apple' },
        // { value: 'kiwi', label: 'kiwi' },
        // { value: 'avacado', label: 'avacado' },
        // { value: 'banana', label: 'banana' },
        // { value: 'green', label: 'green' },
      ],
    };
    setAttributeCombinations([...attributeCombinations, newCombination]);
  };


  const handleAttributeChange = (index, selectedOption) => {
    const updatedCombinations = [...attributeCombinations];
    updatedCombinations[index].attributes = selectedOption.value;
    setAttributeCombinations(updatedCombinations);
    console.log("attribvute color", updatedCombinations);
  };

  const handleOptionChange = (index, selectedOptions) => {
    const updatedCombinations = [...attributeCombinations];
    updatedCombinations[index].options = selectedOptions;
    setAttributeCombinations(updatedCombinations);
  };

  // Saveing Attributes
  const [selectedAttribute, setSelectedAttribute] = useState(""); // State for selected attribute

  const handleAttributes = (event) => {
    setSelectedAttribute(event.target.value);
    setselectedMulti([]); // Clear selected options when attribute changes
  };


  // bulk actions
  // const [selectAll, setSelectAll] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);

  // // Function to handle checkbox click in the table header
  // const handleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   if (!selectAll) {
  //     setSelectedRows(data.map(row => row.id));
  //   } else {
  //     setSelectedRows([]);
  //   }
  // };

  // // Function to handle individual row selection
  // const handleRowSelection = (rowId) => {
  //   if (selectedRows.includes(rowId)) {
  //     setSelectedRows(selectedRows.filter(id => id !== rowId));
  //   } else {
  //     setSelectedRows([...selectedRows, rowId]);
  //   }
  // };

  // Step 1: Add a state variable to keep track of selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Step 2: Create a function to handle the selection of items
  const handleSelectItem = (item) => {
    const selectedIndex = selectedItems.indexOf(item);
    if (selectedIndex === -1) {
      // Item is not selected, so add it to the selectedItems array
      setSelectedItems([...selectedItems, item]);
    } else {
      // Item is already selected, so remove it from the selectedItems array
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };

  // Step 4: Add a "Select All" checkbox to select all items
  const handleSelectAll = () => {
    if (props.products && props.products.length > 0) {
      if (selectedItems.length === props.products.length) {
        // All items are already selected, so deselect them all
        setSelectedItems([]);
      } else {
        // Select all items
        setSelectedItems(props.products);
      }
    }
  };

  return (
    <>
      {/* search header tab */}
      <SearchHeaderTab />

      {/* variant */}
      <div>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Variant Products</h5>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card">
              <table className="table align-middle table-nowrap table-striped-columns mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: "46px" }}>

                      
                          <div className="form-check">
                            {/* Checkbox for "Select All" */}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="selectAllCheckbox"
                              checked={props.products && selectedItems.length === props.products.length}
                              onChange={handleSelectAll}
                            />
                           
                          </div>
                       

                    </th>
                    <th scope="col" style={{ color: "#1D73AC" }}>VARIANT  NAME <span style={{ color: "red" }}>* </span><img src={Sort} alt="" /></th>
                    <th scope="col" style={{ color: "#1D73AC" }}>SKU <img src={Sort} alt="" /></th>
                    <th scope="col" style={{ color: "#1D73AC" }}>UPC <img src={Sort} alt="" /> </th>
                    <th scope="col" style={{ color: "#1D73AC" }}>Cost Price <span style={{ color: "red" }}>*</span> <img src={Sort} alt="" /></th>
                    <th scope="col" style={{ textAlign: "center", marginBottom: "15px", color: "#1D73AC" }}>Selling Price<span style={{ color: "red" }}>*
                    </span>

                      <div style={{ display: "flex", justifyContent: "center", gap: "50px", margin: '5px 0px 5px 11px', color: "black" }}>
                        <td><img src={silver} alt="" /> Silver</td>
                        <td><img src={gold} alt="" /> Gold</td>
                        <td> <img src={platinum} alt="" /> Platinum</td>
                      </div>

                    </th>
                    <th scope="col" style={{ width: "150px", color: "#1D73AC" }}>Stock in hand</th>
                    <th scope="col" style={{ width: "150px", color: "#1D73AC" }}>Stock
                      Available</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.products?.map((item, i) => (
                    <tr key={item?._id}>
                      <td>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id={`cardtableCheck${i}`}
                            checked={selectedItems.includes(item)}
                            onChange={() => handleSelectItem(item)} />
                          <label className="form-check-label" htmlFor={`cardtableCheck${i}`}></label>
                        </div>
                      </td>
                      <td><a href="#" className="fw-medium">{item?.name}</a></td>
                      <td>{item?.sku}</td>
                      <td>{item?.productUPC}</td>
                      <td>{item?.costPrice}</td>
                      <td>
                        <tr style={{ display: "flex", justifyContent: "space-around", }}>
                          <td><span className="badge bg-primary-subtle text-dark fs-6"><img src={silver} alt="" /> {item?.price.levelOne}</span></td>
                          <td><span className="badge bg-warning-subtle text-dark fs-6" ><img src={gold} alt="" /> {item?.price.levelOne}</span></td>
                          <td><span className="badge bg-info-subtle text-dark fs-6"><img src={platinum} alt="" /> {item?.price.levelOne}</span></td>
                        </tr>
                      </td>
                      <td>
                        <td>{item?.handsOnQuantity}</td>
                      </td>
                      <td>{item?.stock_quantity}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

          </CardBody>
        </Card>

      </div >

    </>
  )
}

export default Variant