import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/auth-bg-img/AD-Logo.svg";
import line from "../../assets/auth-bg-img/Line.svg";
import withRouter from "../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser, socialLogin, resetLoginFlag } from "../../slices/thunks";
import { createSelector } from "reselect";

const Login = (props) => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state;
  const loginpageData = createSelector(selectLayoutState, (state) => ({
    user: state.Account.user,
    error: state.Login.error,
    loading: state.Login.loading,
    errorMsg: state.Login.errorMsg,
  }));

  const { user, error, loading, errorMsg } = useSelector(loginpageData);

  // console.log('login',user)

  const [userLogin, setUserLogin] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    if (user && user) {
      const updatedUserData =
        process.env.REACT_APP_DEFAULTAUTH === "firebase"
          ? user.multiFactor.user.email
          : user.user.email;
      const updatedUserPassword =
        process.env.REACT_APP_DEFAULTAUTH === "firebase"
          ? ""
          : user.user.confirm_password;
      setUserLogin({
        email: updatedUserData,
        password: updatedUserPassword,
      });
    }
  }, [user]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userLogin.email || "",
      password: userLogin.password || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values, props.router.navigate));
        // Show success message after successful login
        setShowSuccessMessage(true);
      } catch (error) {
        // Display error toast when login fails
        showToast("Login failed. Please check your credentials.", "error");
      }
    },
  });

  const showToast = (message, type = 'success') => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Close after 3 seconds
    });
  };

  const signIn = (type) => {
    dispatch(socialLogin(type, props.router.navigate));
  };

  const socialResponse = (type) => {
    signIn(type);
  };

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(resetLoginFlag());
      }, 3000);
    }
  }, [dispatch, errorMsg]);

  document.title = "American Distributors llc";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={6}>
                <Card className="form-card-div mt-4">
                  <CardBody>
                    <img src={logo} alt="Ad-logo" className="ad-logo-img" />
                    <h1 className="card-Text">Streamline.</h1>
                    <h1 className="card-Text">Simplify.</h1>
                    <h1 className="card-Text">Succeed.</h1>
                    <img
                      src={line}
                      alt="white-line"
                      style={{ marginLeft: "39px", marginBottom: "15px" }}
                    />
                    <h1 className="card-Text-2">
                      Unleash the Power of Efficient Inventory Management.
                    </h1>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={6}>
                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={12}>
                    <Card className="card-login-div">
                      <CardBody className="p-4">
                        <div className="text-center mt-2">
                          <h5 className="text-primary" align="left" style={{ marginLeft: "8px" }}>Login to Your Account</h5>
                          <p className="text-muted" align="left" style={{ marginLeft: "8px" }}>
                            Sign in to continue to American Distributors.
                          </p>
                        </div>
                        {error && error ? (
                          <Alert color="danger"> {error} </Alert>
                        ) : null}
                        <div className="p-2 mt-4">
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              validation.handleSubmit();
                              return false;
                            }}
                            action="#"
                          >
                            <div className="mb-3">
                              <Label htmlFor="email" className="form-label">
                                Email Address
                              </Label>
                              <Input
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                              <div className="float-end">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <Label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <Input
                                  name="password"
                                  value={validation.values.password || ""}
                                  type={passwordShow ? "text" : "password"}
                                  className="form-control pe-5"
                                  placeholder="Enter Password"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  invalid={
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.password &&
                                  validation.errors.password ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.password}
                                    </FormFeedback>
                                  ) : null}
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                  type="button"
                                  id="password-addon"
                                  onClick={() => setPasswordShow(!passwordShow)}
                                >
                                  <i className="ri-eye-fill align-middle"></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                color="success"
                                disabled={loading}
                                className="btn btn-success w-100"
                                type="submit"
                              >
                                {loading ? (
                                  <Spinner size="sm" className="me-2">
                                    {" "}
                                    Loading...{" "}
                                  </Spinner>
                                ) : null}
                                Login
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">
                                  Login with
                                </h5>
                              </div>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-primary btn-icon me-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    socialResponse("facebook");
                                  }}
                                >
                                  <i className="ri-facebook-fill fs-16" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-danger btn-icon me-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    socialResponse("google");
                                  }}
                                >
                                  <i className="ri-google-fill fs-16" />
                                </Link>
                                <Button color="dark" className="btn-icon">
                                  <i className="ri-github-fill fs-16"></i>
                                </Button>{" "}
                                <Button color="info" className="btn-icon">
                                  <i className="ri-twitter-fill fs-16"></i>
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                Don't have an account ?{" "}
                                <Link
                                  to="/register"
                                  className="fw-semibold text-primary text-decoration-underline"
                                >
                                  {" "}
                                  Signup{" "}
                                </Link>{" "}
                              </p>
                            </div>
                          </Form>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(Login);
