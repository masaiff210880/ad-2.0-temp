import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
// import Link from "next/link";
import style from "../../styles/registerForm.module.css";
// internal
// import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import upload_icon from "../../../public/assets/ad/upload_icon.svg";
import Image from "next/image";

// schema
const schema = Yup.object().shape({
  // userName: Yup.string().required('Username name is required'),
  email: Yup.string().required("Email is required").email().label("Email"),
  password: Yup.string().required("Password is Required").min(6).label(),
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]*$/, "First Name should only contain letters")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z\s]*$/, "Last Name should only contain letters")
    .required("Last Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});

const RegisterForm = () => {
  // const [showPass, setShowPass] = useState(false);
  const [registerUser, {}] = useRegisterUserMutation();
  const router = useRouter();
  const { redirect } = router.query;
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      licenseFor: "Shop",
      feinLicense: "XYZABC695847",
      feinNumber: "1235665",
      tobaccoLicense: "VPBXWE584747",
      businessLicense: "BZYMNE69584",
      governmentIssuedId: "5847586958",
      otpNumber: data.licenseFor,
      businessName: data.businessName,
      businessAddress: data.businessAddress,
      city: data.city,
      state: data.state,
      country: data.country,
      pinCode: data.pinCode,
    }).then((result) => {
      console.log('result',result)
      if (result?.data?.status) {
        notifySuccess(result?.data?.message);
        // console.log(result);
        setTimeout(()=>{
          router.push(redirect || "/login");
        },3000)
        reset();
      } 
    }).catch((error)=>{
      notifyError(error.message);
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className={style.register_heading}>Registration</h1>
        <div className={style.form_group_card}>
          <div className={style.form_group}>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">First Name</label>
                <span>*</span>
              </div>
              <input
                {...register("firstName", {
                  required: `First Name is required!`,
                })}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your First Name"
              />
              <ErrorMsg msg={errors.firstName?.message} />
            </div>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Last Name</label>
                <span>*</span>
              </div>
              <input
                {...register("lastName", {
                  required: `Last name is required!`,
                })}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your Last name"
              />
              <ErrorMsg msg={errors.lastName?.message} />
            </div>
          </div>
          <div className={style.form_group}>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Business Email</label>
                <span>*</span>
              </div>
              <input
                {...register("email", { required: `First Name is required!` })}
                id="email"
                name="email"
                type="text"
                placeholder="Enter your First Name"
              />
              <ErrorMsg msg={errors.email?.message} />
            </div>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Password</label>
                <span>*</span>
              </div>
              <input
                {...register("password", {
                  required: `Password is required!`,
                })}
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password"
              />
              <ErrorMsg msg={errors.password?.message} />
            </div>
          </div>
          <div className={style.form_group}>
            <div className={style.phone_country_code_flag}>
              <select id="countryCodeSelect">
                <option value="">
                  <Image src="" alt="" />
                  +91
                </option>
                <option value="">
                  <Image src="" alt="" />
                  +25
                </option>
                <option value="">
                  <Image src="" alt="" />
                  +81
                </option>
                <option value="">
                  <Image src="" alt="" />
                  +321
                </option>
              </select>
            </div>
            <div className={style.form_select_flag}>
              <div>
                <label htmlFor="validationTooltip01">Phone Number</label>
                <span>*</span>
              </div>
              <input
                {...register("phoneNumber", {
                  required: `Phone Number is required!`,
                })}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="000 000 0000"
              />
              <ErrorMsg msg={errors.phoneNumber?.message} />
            </div>
          </div>
        </div>
        <div className={style.horizontal_line}></div>
        <div className={style.image_format}>
          <div>
            <h1>Image Format: PNG, JPEG, PDF, GIF only</h1>
          </div>
          <div>
            <h1>Max size: 10 MB*</h1>
          </div>
        </div>
        {/* File Upload */}
        <div className={style.file_upload_card}>
          <div>
            <label htmlFor="">Upload FEIN License*</label>
            <div>
              {/* <div className={style.upload_shadows}><Image className={style.upload_icon} src={upload_icon} alt="upload_icon" width={'100%'} /></div> */}
              <div className={style.file_upload}>
                <Image
                  className={style.upload_icon}
                  src={upload_icon}
                  alt="upload_icon"
                />
                <input
                  type="file"
                  {...register("feinLicense", {
                    required: `Upload FEIN License* is required!`,
                  })}
                  id="feinLicense"
                  name="feinLicense"
                  accept=".png, .jpeg, .jpg, .pdf, .gif"
                />{" "}
                <h1 className={style.browse_file}>Drop image(s) here</h1>
                <span className={style.or_file}>or</span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">FEIN Number</label>
            <input
              placeholder="FEIN Number"
              {...register("feinNumber")}
              id="feinNumber"
              name="feinNumber"
            />
          </div>
        </div>
        {/* Upload Tabacco */}
        <div className={style.upload_tabacco}>
          <div className={style.file_upload_card}>
            <div>
              <label htmlFor="">Upload Tobacco License</label>
              <div>
                {/* <div className={style.upload_shadows}><Image className={style.upload_icon} src={upload_icon} alt="upload_icon" width={'100%'} /></div> */}
                <div className={style.file_upload}>
                  <Image
                    className={style.upload_icon}
                    src={upload_icon}
                    alt="upload_icon"
                  />
                  <input
                    type="file"
                    {...register("tobaccoLicense")}
                    id="tobaccoLicense"
                    name="tobaccoLicense"
                  />{" "}
                  <h1 className={style.browse_file}>Drop image(s) here</h1>
                  <span className={style.or_file}>or</span>
                </div>
              </div>
            </div>
          </div>
          <div className={style.file_upload_card}>
            <div>
              <label htmlFor="">Upload State Tax ID/ Business License</label>
              <div>
                {/* <div className={style.upload_shadows}><Image className={style.upload_icon} src={upload_icon} alt="upload_icon" width={'100%'} /></div> */}
                <div className={style.file_upload}>
                  <Image
                    className={style.upload_icon}
                    src={upload_icon}
                    alt="upload_icon"
                  />
                  <input
                    type="file"
                    {...register("businessLicense")}
                    id="businessLicense"
                    name="businessLicense"
                  />{" "}
                  <h1 className={style.browse_file}>Drop image(s) here</h1>
                  <span className={style.or_file}>or</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Government Issued Id */}
        <div>
          <div className={style.government_issued_id}>
            <div>
              <label htmlFor="">Upload State Tax ID/ Business License</label>
              <div>
                {/* <div className={style.upload_shadows}><Image className={style.upload_icon} src={upload_icon} alt="upload_icon" width={'100%'} /></div> */}
                <div className={style.business_upload}>
                  <Image
                    className={style.upload_icon}
                    src={upload_icon}
                    alt="upload_icon"
                  />
                  <input
                    type="file"
                    {...register("governmentIssuedId")}
                    id="governmentIssuedId"
                    name="governmentIssuedId"
                  />{" "}
                  <h1 className={style.browse_file}>Drop image(s) here</h1>
                  <span className={style.or_file}>or</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Business Details */}
        <div className={style.store_type}>
          <div className={style.form_group}>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Store Type</label>
                <span>*</span>
              </div>
              <select
                {...register("storeType")}
                id="storeType"
                name="storeType"
                type="text"
                placeholder="Enter your Email"
              >
                <option value="">Select Store Type</option>
                <option value="Distributor">Distributor</option>
              </select>
            </div>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">
                  Which Tobacco vapour or OTP License
                </label>
                <span>*</span>
              </div>
              <input
                {...register("licenseFor")}
                id="licenseFor"
                name="licenseFor"
                type="text"
                placeholder="Retailer"
              />
            </div>
          </div>
        </div>
        {/* Second Business Details */}
        <div className={style.horizontal_line_second}></div>
        <div className={style.business_details_inputs}>
          <div className={style.form_group}>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Business Name</label>
                <span>*</span>
              </div>
              <input
                {...register("businessName")}
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Enter your Business Name"
              />
            </div>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Business Address</label>
                <span>*</span>
              </div>
              <input
                {...register("businessAddress")}
                id="businessAddress"
                name="businessAddress"
                type="text"
                placeholder="Enter your Adress"
              />
            </div>
          </div>
          <div className={style.form_group}>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">City</label>
                <span>*</span>
              </div>
              <input
                {...register("city")}
                id="city"
                name="city"
                type="text"
                placeholder="City"
              />
            </div>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">State</label>
                <span>*</span>
              </div>
              <input
                {...register("state")}
                id="state"
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
          </div>
          <div className={style.form_group}>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Country</label>
                <span>*</span>
              </div>
              <input
                {...register("country")}
                id="country"
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
            <div className={style.form_inputs}>
              <div>
                <label htmlFor="validationTooltip01">Postcode Zip</label>
                <span>*</span>
              </div>
              <input
                {...register("pinCode")}
                id="pinCode"
                name="pinCode"
                type="text"
                placeholder="Postcode Zip"
              />
            </div>
          </div>
        </div>
      </div>
      <button className={style.submit_Btn}>Submit</button>
    </form>
  );
};

export default RegisterForm;
