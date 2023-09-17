import React from "react";
// import Link from "next/link";
// internal
// import LoginShapes from "./login-shapes";
import RegisterForm from "../forms/register-form";
// import GoogleSignUp from "./google-sign-up";
import style from '../../styles/register.module.css'
import RegisterInfo from "@/pages/registerInfo";
import registerHeader from '../../../public/assets/ad/register_heading.svg';

const RegisterArea = () => {
  return (
    <>
      <section className={`${'tp-login-area pb-140 p-relative z-index-1 fix'} ${style.registerContainer}`}>
        {/* <LoginShapes /> */}
        <div className="container">
          <div className={`${'row justify-content-center'} ${style.main_container}`}>
            <RegisterInfo topHeader={registerHeader} />
            <div className={`${'col-xl-6 col-lg-8'} ${style.login_container}`}>
              {/* <div className={`${'tp-login-wrapper'}`}>
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Sign Up American Distrubutors</h3>
                  <p>
                    Already have an account?{" "}
                    <span>
                      <Link href="/login">Sign In</Link>
                    </span>
                  </p>
                </div>
                <div className="tp-login-option">
                  <div className="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center">
                    <div className="tp-login-option-item has-google">
                      <GoogleSignUp/>
                    </div>
                  </div>
                  <div className="tp-login-mail text-center mb-40">
                    <p>
                      or Sign up with <a href="#">Email</a>
                    </p>
                  </div>
                </div>
              </div> */}
              <div>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterArea;
