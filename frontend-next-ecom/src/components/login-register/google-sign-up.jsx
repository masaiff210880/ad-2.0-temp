import React from "react";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
// internal
import google_icon from "@assets/img/icon/login/google.svg";
import { useSignUpProviderMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";

const GoogleSignUp = () => {
  const [signUpProvider, {}] = useSignUpProviderMutation();
  const router = useRouter();
  const { redirect } = router.query;

  // handleGoogleSignIn
  const handleGoogleSignIn = (user) => {
    if (user) {
      signUpProvider(user?.credential).then((res) => {
        if (res?.data) {
          notifySuccess("Login success!");
          router.push(redirect || "/");
        } else {
          console.log("result error -->", res.error);
          notifyError(res.error?.message);
        }
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
      <GoogleLogin
        render={(renderProps) => (
          <a className="cursor-pointer" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ marginBottom: "" }}>
                <Image src={google_icon} alt="google_icon" />
              </div>
              <span className="text-dark">Sign in with Google</span>
            </div>
          </a>
        )}
        onSuccess={handleGoogleSignIn}
        onFailure={(err) =>
          notifyError(err?.message || "Something wrong on your auth setup!")
        }
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleSignUp;
