import React, { useState } from "react";
import style from "../login-register/LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import checkboximg from "../../../public/assets/img/login/checkbox.svg";
import email_logo from "../../../public/assets/ad/email_logo.svg";
import GoogleSignUp from "../login-register/google-sign-up";
import Image from "next/image";
import { useCookies } from "react-cookie";
// import icon from '../../../public/assets/img/login/eye.svg'
import openicon from "../../../public/assets/img/login/Eyes.svg";
import openeye from "../../../public/assets/img/login/Eyes.svg";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  // checkboxField: Yup.boolean()
  //   .required("Please select the checkbox")
  //   .oneOf([true], "Please select the checkbox")
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginUser, {}] = useLoginUserMutation();
  const router = useRouter();
  const { redirect } = router.query;

  const [cookies, setCookie] = useCookies();

  const handleShow = () => {
    setShowPass(!showPass);
  };
  // react hook form
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: data.password,
    }).then((data) => {
      if (data?.data) {
        // Set data to cookies here
        // Cookies.set('user', JSON.stringify(data.data)); // Set the 'user' cookie with the 'data' object

        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds


        setCookie('userName', JSON.stringify(data.data.userName),{
          expires: expiryDate, // Set the cookie expiry time
          httpOnly: false, // Make the cookie HTTP-only
        }),
        
        // console.log("userName: " + JSON.stringify(data.data));
        
        // sessionStorage.setItem("authUser", JSON.stringify(data?.token));
        setCookie('authUser', JSON.stringify(data.data?.token),{
          expires: expiryDate, // Set the cookie expiry time
          httpOnly: false, // Make the cookie HTTP-only
        }),

        notifySuccess("Login successfully");
        // console.log(data);
        router.push(redirect || "/");
      } else {
        notifyError(data?.error?.data?.error);
        console.log(data);
      }
    }).catch((error)=>{
      console.log('error',error)
    })
    reset();
    // console.log(data)
  };
  return (
    <div className={style.login_container}>
      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <div className="tp-login-input-wrapper">
          <div className="tp-login-input-box">
            <div className="tp-login-input">
              <div>
                {/* <span>email</span> */}
                <input
                  {...register("email", { required: `Email is required!` })}
                  autocomplete="false"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Youraddress@gmail.com"
                />
              </div>
            </div>
            <div className={style.gmailicon}>
              <Image
                src={""}
                alt=""
                style={{ width: "20px", height: "17px" }}
              />
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="email">Email address</label>
            </div>
            <ErrorMsg msg={errors.email?.message} />
          </div>

          <div className="tp-login-input-box">
            <div className="tp-login-input">
              {/* <div> */}
              {/* <span>email</span> */}
              <input
                {...register("password", { required: `Password is required!` })}
                autocomplete="false"
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your Password"
              />
              {/* </div> */}
            </div>
            {/* eye */}
            {/* <div className="tp-login-input-eye mr-650 mt-30 ml-20" id="password-show-toggle"> */}
            <div className={style.icon}>
              <Image
                src={showPass ? "" : ""}
                alt=""
                onClick={handleShow}
                style={{ width: "20px", height: "17px" }}
              />
            </div>
            {/* </div> */}

            <div className="tp-login-input-title">
              <label htmlFor="email">Password</label>
            </div>
            <ErrorMsg msg={errors.password?.message} />
          </div>
          {/* password */}
          {/* <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input-box">
              <div className={style.emailplaceholder}>
                <label htmlFor="password" >Password</label>
                <input {...register("email", { required: `Password is required!` })} name="password" id="password" type="password" placeholder="Enter your Password" />
              </div>
              <div className={style.error}>
              <ErrorMsg msg={errors.password?.message}  /></div>
            </div>
            <div className="tp-login-input-title">

            </div>

          </div> */}
          {/* <div className="tp-login-input-box">
            <div className="p-relative">
              <div className={`${'tp-login-input'} ${style.emailplaceholder1}`}>
                <label className={style.email1}>Password</label>
                <input
                  {...register("password", { required: `Password is required!` })}
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                />

              </div>
              <div className="tp-login-input-eye mr-100" id="password-show-toggle">
                <div className={style.icon}>

                  <Image
                    src={showPass ? openicon : icon} alt="" onClick={handleShow} style={{ width: "20px", height: "17px" }} />
                </div>
              </div>
              <div className="tp-login-input-title">
              </div>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div> */}
          {/* </div> */}

          <br />
          <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
            {/* <div className={`${"tp-login-remeber align-center"}`}>
            <input id="remeber" type="checkbox" 
            {...register("checkboxField", { required: `Password is required!` })} name='checkboxField'
            />
            <label htmlFor="remeber" style={{position:"relative",top:"10px"}}>Keep me Signed In</label>
            <ErrorMsg msg={errors.checkboxField?.message} />
          </div> */}
            <div className="form-group row align-items-center">
              <div className="col-sm-12">
                <div className="form-check">
                  <input
                    id="remeber"
                    type="checkbox"
                    {...register("checkboxField", {
                      required: "Password is required!",
                    })}
                    name="checkboxField"
                    className={`${"form-check-input"} ${style.check}`}
                  />
                  <label
                    htmlFor="remeber"
                    className={`${"form-check-label"} ${style.keeptext}`}
                  >
                    Keep me Signed In
                  </label>
                </div>
                <div className={style.error}>
                  <ErrorMsg msg={errors.checkboxField?.message} />
                </div>
              </div>
            </div>

            <div className={"tp-login-forgot mr-40"}>
              <Link href="/forgot" className={style.forgot}>
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className={`${"tp-login-bottom"} ${style.button}`}>
            <button type="submit" className={style.login}>
              Login
            </button>
          </div>
          <br />
          <div className={style.google}>
            {" "}
            <GoogleSignUp />
          </div>
          {/* <div className={`${"tp-login-bottom"} ${style.googlebutton}`}>
          <img src={google} alt="" />
          <button type='submit' className={style.google_text}>Login With Google</button>
        </div> */}

          <br />
          <div className={style.accounttext}>
            <p>
              Don’t have an account?{" "}
              <Link href="/register">
                <span className={style.spantext}>Sign up </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
