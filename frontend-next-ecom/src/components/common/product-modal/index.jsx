import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";

// internal
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsThumbWrapper from "@/components/product-details/details-thumb-wrapper";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "calc(100% - 300px)",
  },
};

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector(
    (state) => state.productModal
  );
  // console.log('product Item',productItem)
  const { featuredImage, galleryImage,status } = productItem || {};
  const [activeImg, setActiveImg] = useState(featuredImage);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    setActiveImg(featuredImage);
    dispatch(initialOrderQuantity())
    setLoading(false)
  }, [featuredImage,dispatch]);

  // handle image active
  const handleImageActive = (item) => {
    // console.log('item',item)
    setActiveImg(item?.featuredImage);
    setLoading(true)
  };

  return (
    <div>
       

     

      {/* <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(handleModalClose())}
        style={customStyles}
        contentLabel="Product Modal"
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex">
            <button
              onClick={() => dispatch(handleModalClose())}
              type="button"
              className="tp-product-modal-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
        
            <DetailsThumbWrapper
              activeImg={activeImg}
              handleImageActive={handleImageActive}
              imageURLs={galleryImage}
              imgWidth={416}
              imgHeight={480}
              loading={loading}
              status={status}
            />
           
            <DetailsWrapper
              productItem={productItem}
              handleImageActive={handleImageActive}
              activeImg={activeImg}
            />
          
          </div>
        </div>
      </ReactModal> */}
    </div>
  );
};

export default ProductModal;
