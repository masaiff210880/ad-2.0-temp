import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
// import Link from "next/link";

// internal
// import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";

// schema
const schema = Yup.object().shape({
  bemail: Yup.string().required('Business Email is required').email().label("Email"),
  phone_number: Yup.string().required('Phone number is required').matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  feinLicense: Yup
    .mixed().required('FEIN License is required ')
    .test('fileSize', 'FEIN License is required', (value) => {
      if (!value) return true;
      return value[0]?.size <= 5242880;
    }),
  fein_number: Yup.string().required('FEIN number is required'),
  tobaccoLicense: Yup
    .mixed().required('Tobacco License is required ')
    .test('fileSize', 'Tobacco License is required', (value) => {
      if (!value) return true;
      return value[0]?.size <= 5242880;
    }),
  businessLicense: Yup
    .mixed().required('Tobacco License is required ')
    .test('fileSize', 'Tobacco License is required', (value) => {
      if (!value) return true;
      return value[0]?.size <= 5242880;
    }),
    governmentIssuedId: Yup
    .mixed().required('Government Issued Id is required ')
    .test('fileSize', 'Government Issued Id is required', (value) => {
      if (!value) return true;
      return value[0]?.size <= 5242880;
    }),
    storetype: Yup.string().required('Store Type is required'),
    licenseFor: Yup.string().required('License For is required'),
    businessName: Yup.string().required('Business Name is required'),
    businessAddress: Yup.string().required('Business Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required')
    // .oneOf([true], "You must agree to the terms and conditions to proceed.")
    // .label("Terms and Conditions"),
});

const RegisterfurtherForm = () => {
  // const [showPass, setShowPass] = useState(false);
  const [registerUser, { }] = useRegisterUserMutation();
  const router = useRouter();
  const { redirect } = router.query;
  // react hook form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = (data) => {
    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      bemail: data.bemail,
      phone_number: data.phone_number,

    }).then((result) => {
      if (result?.error) {
        notifyError("Register Failed");
      } else {
        notifySuccess(result?.data?.message);
        // router.push(redirect || "/");
      }
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("bemail", { required: `Business Email is required!` })}
              id="bemail"
              name="bemail"
              type="email"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="bemail">Business Email</label>
          </div>
          <ErrorMsg msg={errors.bemail?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("phone_number", { required: `Phone Number is required!` })}
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="phone_number">Phone Number</label>
          </div>
          <ErrorMsg msg={errors.phone_number?.message} />
        </div>


        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input-title">
              <label htmlFor="feinLicense">Upload FEIN License</label>
              <div className="tp-login-bottom">
                <input {...register("feinLicense", { required: `FEIN License is required!` })}
                  type='file'
                  className="tp-login-btn"
                  id="feinLicense"
                  name="feinLicense"
                />
                {/* <label >No file chosen</label> */}
              </div>
            </div>
            <ErrorMsg msg={errors.feinLicense?.message} />
          </div>
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("fein_number", { required: `FEIN Number is required!` })}
              id="fein_number"
              name="fein_number"
              type="text"
              placeholder="FEIN Number"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="fein_number">FEIN Number</label>
          </div>
          <ErrorMsg msg={errors.fein_number?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input-title">
              <label htmlFor="tobaccoLicense">Upload Tobacco License</label>
              <div className="tp-login-bottom">
                <input
                  {...register("tobaccoLicense", { required: `Tobacco License is required!` })}
                  type='file'
                  className="tp-login-btn"
                  id="tobaccoLicense"
                  name="tobaccoLicense"
                />
                {/* <label >No file chosen</label> */}
              </div>
            </div>
            <ErrorMsg msg={errors.tobaccoLicense?.message} />
          </div>
        </div>

        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input-title">
              <label htmlFor="tobaccoLicense">Upload Business License</label>
              <div className="tp-login-bottom">
                <input
                  {...register("businessLicense", { required: `Business License is required!` })}
                  type='file'
                  className="tp-login-btn"
                  id="businessLicense"
                  name="businessLicense"
                />
                {/* <label >No file chosen</label> */}
              </div>
            </div>
            <ErrorMsg msg={errors.businessLicense?.message} />
          </div>
        </div>

        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input-title">
              <label htmlFor="tobaccoLicense">Upload Government Issued Id</label>
              <div className="tp-login-bottom">
                <input
                  {...register("businessLicense", { required: `Government Issued Id is required!` })}
                  type='file'
                  className="tp-login-btn"
                  id="governmentIssuedId"
                  name="governmentIssuedId"
                />
                {/* <label >No file chosen</label> */}
              </div>
            </div>
            <ErrorMsg msg={errors.governmentIssuedId?.message} />
          </div>
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <select
              {...register("storetype", { required: `Store Type is required!` })}
              id="storetype"
              name="storetype">
              <option value="">Select Store Type</option>
              <option value="Distributor">Distributor</option>
              <option value="Smoke/Vape">Smoke/Vape</option>
              <option value="Chain">Chain</option>
              <option value="C-Store/Gas/Liq">C-Store/Gas/Liq</option>
              <option value="Dispensary">Dispensary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="storetype">Store Type</label>
          </div>
          <ErrorMsg msg={errors.storetype?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <select
              {...register("licenseFor", { required: `License For is required!` })}
              id="licenseFor"
              name="licenseFor">
              <option value="">Select License For</option>
              <option value="Retailer">Retailer</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Neither (Smoke shop only)">Neither (Smoke shop only)</option>
            </select>
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="licenseFor">License For</label>
          </div>
          <ErrorMsg msg={errors.licenseFor?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("businessName", { required: `Business Name is required!` })}
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Business Name"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="businessName">Business Name</label>
          </div>
          <ErrorMsg msg={errors.businessName?.message} />
        </div>
        {/* Address */}
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("businessAddress", { required: `Business Address is required!` })}
              id="businessAddress"
              name="businessAddress"
              type="text"
              placeholder="Business Address"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="businessAddress">Business Address</label>
          </div>
          <ErrorMsg msg={errors.businessAddress?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("country", { required: `Country is required!` })}
              id="country"
              name="country"
              type="text"
              placeholder="Country"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="country">Country</label>
          </div>
          <ErrorMsg msg={errors.country?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("state", { required: `State is required!` })}
              id="state"
              name="state"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="state">State</label>
          </div>
          <ErrorMsg msg={errors.state?.message} />
        </div>


        <div className="tp-login-bottom">
          <button type='submit' className="tp-login-btn w-100">Sign Up</button>
        </div>
      </div>




      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="shofy@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Bussiness E-mail</label>
            
          </div>

           <ErrorMsg msg={errors.email?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="shofy@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Phone Number</label>
            
          </div>

           <ErrorMsg msg={errors.email?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">

              <label htmlFor="password">Upload FEIN Licence</label>
              <div className="tp-login-bottom">
                <button type='submit' className="tp-login-btn">Choose file</button>

                <label >No file chosen</label>
              </div>

    
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="123456789"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">FIEN Number</label>
            
          </div>

           <ErrorMsg msg={errors.email?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">

              <label htmlFor="password">Upload Tobacco Licence</label>
              <div className="tp-login-bottom">
                <button type='submit' className="tp-login-btn">Choose file</button>

                <label >No file chosen</label>
              </div>

    
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">

              <label htmlFor="password">Upload State Tax ID / Business License</label>
              <div className="tp-login-bottom">
                <button type='submit' className="tp-login-btn">Choose file</button>

                <label >No file chosen</label>
              </div>

    
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">

              <label htmlFor="password">Government Issued ID / Business</label>
              <div className="tp-login-bottom">
                <button type='submit' className="tp-login-btn">Choose file</button>

                <label >No file chosen</label>
              </div>

    
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="Retailier"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Store Type</label>
            
          </div>

           <ErrorMsg msg={errors.email?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="Retailier"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Which Tobacco, Vapor or OTP license do you hold for this location?</label>
            
          </div>

           <ErrorMsg msg={errors.email?.message} />
        </div> */}


      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name", { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Business Name</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name", { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Business Address</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name", { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">City</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name", { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">State</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name", { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Country </label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name", { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Shahnewaz Sakil"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Postcode / Zip</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div> */}

      {/* <div className="tp-login-input-box">
          <div className="tp-login-input">

          <div className="tp-login-input-title">
            <label htmlFor="name">Privacy Policy</label>
          </div>
         
          </div>
        </div> */}



      {/* <label htmlFor="remember">
            Privacy Policy
          </label> */}
      {/* <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input
            {...register("remember", {
              required: `Terms and Conditions is required!`,
            })}
            id="remember"
            name="remember"
            type="checkbox"
          />
          <label htmlFor="remember">
          Your personal data will be used to support your experience throughout this 
          website, to manage access to your account, and for other purposes described 
          in our <a href="#">Privacy Policy</a>.
          </label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div> */}

      {/* <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          Sign Up
        </button>
      </div> */}
    </form>
  );
};

export default RegisterfurtherForm;
