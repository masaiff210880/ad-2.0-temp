import React, { useState } from 'react';
import { Input } from 'reactstrap';
import drag from "../../assets/images/products/drag.svg";

const ImageUploader = ({ initialImage, onImageChange }) => {
  const [uploadedImage, setUploadedImage] = useState(initialImage);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        onImageChange(event.target.result); // Call the custom callback
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    onImageChange(null); // Call the custom callback
  };

  return (
    <div style={{ width: '111.361px', backgroundColor: '#E9EBEC', height: '111.360px', borderRadius: '5px' }}>
      {uploadedImage ? (
        <div style={{ position: 'relative' }}>
          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              width: '20px',
              height: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={removeImage}
          >
            &times;
          </span>
        </div>
      ) : (
        <>
          <label htmlFor="imageUpload" style={{ cursor: 'pointer' }}>
            <img src={drag} alt="Drag and drop" style={{ width: '50px', height: '50px', margin: '30px' }} />
            {/* <p>Drag &amp; Drop Image</p> */}
          </label>
          <Input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </>
      )}
    </div>
  );
};

export default ImageUploader;
