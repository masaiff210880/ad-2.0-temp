import React from "react";
import Link from "next/link";
// internal
import LoginForm from "../forms/login-form";
// import LoginShapes from "./login-shapes";
import GoogleSignUp from "./google-sign-up";
import style from '../login-register/Login.module.css'
import Smoking from "./Smoking";


const LoginArea = () => {

  return (
    <>

      <div className={style.background}>

        <section className="tp-login-area pb-140 p-relative z-index-1 fix">
          {/* <LoginShapes /> */}



          <div className={style.container}>
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className={style.mainlogin}>
                  <div>
                    <Smoking/>
                  
                  </div>
                  <div className="tp-login-wrapper">
                  <div className={style.heading}>
                    <h3 className="tp-login-title">Login to your account!</h3>
                    <br />
                    <LoginForm/>
                    
                  </div>
                  {/* <div className="tp-login-option">
                    <div className="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center">
                      <div className="tp-login-option-item has-google">
                     
                      </div>
                    </div>
                    <p>
                      Don’t have an account?{" "}
                    </p>
                    <div className="tp-login-mail text-center mb-40">
                    </div>
                  </div> */}
                </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
};

export default LoginArea;
