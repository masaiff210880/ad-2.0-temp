import { useState } from "react";
import { Hint } from "react-autocomplete-hint";
// internal
import { Search } from "@/svg";
import img_X1 from '@assets/img/instagram/img_X1.svg';
import img_X2 from '@assets/img/instagram/img_X2.svg';
import img_X3 from '@assets/img/instagram/img_X3.svg';
import img_X4 from '@assets/img/instagram/img_X4.svg';
import img_X5 from '@assets/img/instagram/img_X5.svg';
import img_X6 from '@assets/img/instagram/img_X6.svg';
import img_X7 from '@assets/img/instagram/img_X7.svg';
import img_X8 from '@assets/img/instagram/img_X8.svg';
import img_X9 from '@assets/img/instagram/img_X9.svg';
import img_X10 from '@assets/img/instagram/img_X10.svg';
import NiceSelect from "@/ui/nice-select";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";

const HeaderSearchForm = () => {
  const { setSearchText, setCategory, handleSubmit, searchText, category } = useSearchFormSubmit();

  // console.log('seach keyword',searchText,category)

  // selectHandle
  const selectCategoryHandle = (e) => {
    setCategory(e.value);
  };

  const [searchSuggestions, setSearchSuggestions] = useState([]);


  // auto hint text ;
  const [searchText1, setSearchText1] = useState("");
  const [hintOptions, setHintOptions] = useState(["BLAZY", "TWISTED", "SMOK", "SPECIAL", "SUORIN", "CROP", "MR SKY", "RAW", "BLINK"]);
  const [isGalleryOpen, setGalleryOpen] = useState(false);


  // Function to filter and update hint options based on user input
  const updateHintOptions = (input) => {
    // Filter the options based on user input
    const filteredOptions = ["BLAZY", "TWISTED", "SMOK"].filter((option) =>
      option.includes(input.toUpperCase())
    );
    setHintOptions(filteredOptions);
  };

  const openGallery = () => {
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    // Update suggestions based on user input
    const filteredOptions = hintOptions.filter((option) =>
      option.toUpperCase().includes(inputText.toUpperCase())
    );
    setSearchSuggestions(filteredOptions);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" d-flex align-items-center">
        <div className="tp-header-search-box">
          <Hint options={hintOptions}>
            <input
              onClick={openGallery}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              placeholder="Search something…"

            />
          </Hint>

          {/* Display the image gallery dropdown when isGalleryOpen is true */}
          {isGalleryOpen && (
            <div className="image-gallery d-flex j-content-center"
              style={{
                position: "absolute",
                gap:"10px",
                justifyContent: "space-around",
                top: "100%",
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 900,
                padding: "20px",
                cursor: "pointer",
                // border: "1px solid red",
                backgroundColor: "#f4f4f5"
              }}

            >
              {/* <h1 style={{color:"black", fontSize:"20px"}}>Top Products</h1> */}
           
              {/* Your image gallery content goes here */}
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 1" />
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 2" />
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 3" />
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 1" />
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 2" />
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 3" />
              <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcate_4.5bc1cf4e.gif&w=384&q=75" alt="Image 3" />
              
              
            </div>
          )}

          {/* Close the gallery when clicking outside of it */}
          {isGalleryOpen && (
            <div
              onClick={closeGallery}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 800, // Make sure this is below the gallery
              }}
            ></div>
          )}

        </div>

        <div className="tp-header-search-category">
          <NiceSelect
            options={[
              { value: "Select Category", text: "Select Category" },
              { value: "eliquids", text: "eliquids" },
              { value: "salt nic", text: "salt Nic" },
              { value: "disposable", text: "disposable" },
              { value: "herb/concentrate", text: "herb/concentrate" },
              { value: "glass", text: "glass" },
              { value: "smoke shop", text: "smoke shop" },
              { value: "cream charges/dispensers", text: "cream charges/dispensers" },
              { value: "vape shop", text: "vape shop" },
            ]}
            defaultCurrent={0}
            onChange={selectCategoryHandle}
            name="Select Category"
          />
        </div>
        <div className="tp-header-search-btn">
          <button type="submit">
            <Search />
          </button>
        </div>

      </div>
    </form>
  );
};

export default HeaderSearchForm;
