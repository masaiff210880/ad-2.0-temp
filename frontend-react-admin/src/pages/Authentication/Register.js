import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/auth-bg-img/AD-Logo.svg";
import line from "../../assets/auth-bg-img/Line.svg";

// action
import { registerUser, apiError, resetRegisterFlag } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images
// import logoLight from "../../assets/images/ad-logo.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
// import ResjAuth from "../AuthenticationInner/ResjAuth";

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      first_name: "",
      password: "",
      //   confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      first_name: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
      //   confirm_password: Yup.string()
      //     .oneOf([Yup.ref("password")], "Passwords do not match")
      //     .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
      console.log(values);
    },
  });

  const selectLayoutState = (state) => state.Account;
  const registerdatatype = createSelector(selectLayoutState, (account) => ({
    success: account.success,
    error: account.error,
  }));
  // Inside your component
  const { error, success } = useSelector(registerdatatype);

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => history("/login"), 3000);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, error, history]);

  document.title = "American Distributors llc ";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={6}>
                <Card className="form-card-div-2 mt-4">
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
                  <Card className="card-signup-div">
                    <CardBody className="p-4">
                      <div className="text-center mt-2">
                        <h5 className="text-primary">Create New Account</h5>
                        <p className="text-muted">
                          Get your American Distributors account now
                        </p>
                      </div>
                      <div className="p-2 mt-4">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();  
                            return false;
                          }}
                          className="needs-validation"
                          action="#"
                        >
                          {success && success ? (
                            <>
                              {toast("Your Redirect To Login Page...", {
                                position: "top-right",
                                hideProgressBar: false,
                                className: "bg-success text-white",
                                progress: undefined,
                                toastId: "",
                              })}
                              <ToastContainer autoClose={2000} limit={1} />
                              <Alert color="success">
                                Register User Successfully and Your Redirect To
                                Login Page...
                              </Alert>
                            </>
                          ) : null}

                          {error && error ? (
                            <Alert color="danger">
                              <div>
                                Email has been Register Before, Please Use
                                Another Email Address...{" "}
                              </div>
                            </Alert>
                          ) : null}

                          <div className="mb-3">
                            <Label htmlFor="useremail" className="form-label">
                              Email <span className="text-danger">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter Email Address"
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
                                <div>{validation.errors.email}</div>
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="username" className="form-label">
                              Username <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="first_name"
                              type="text"
                              placeholder="Enter Username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.first_name || ""}
                              invalid={
                                validation.touched.first_name &&
                                validation.errors.first_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.first_name &&
                            validation.errors.first_name ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.first_name}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label
                              htmlFor="userpassword"
                              className="form-label"
                            >
                              Password <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
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
                                <div>{validation.errors.password}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          {/* <div className="mb-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirm_password || ""}
                            invalid={
                              validation.touched.confirm_password &&
                              validation.errors.confirm_password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.confirm_password &&
                          validation.errors.confirm_password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.confirm_password}</div>
                            </FormFeedback>
                          ) : null}
                        </div> */}

                          <div className="mb-4">
                            <p className="mb-0 fs-12 text-muted fst-italic">
                              By registering you agree to the American Distributors
                              <Link
                                to="#"
                                className="text-primary text-decoration-underline fst-normal fw-medium"
                              >
                                  Terms of Use
                              </Link>
                            </p>
                          </div>

                          <div className="mt-4">
                            <button
                              className="btn btn-success w-100"
                              type="submit"
                            >
                              Sign Up
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <div className="signin-other-title">
                              <h5 className="fs-13 mb-4 title text-muted">
                              Already you have an account ? 
                              <Link
                                  to="/login"
                                  className="fw-semibold text-primary text-decoration-underline"
                                >
                                  {" "}
                                  Login{" "}
                                </Link>{" "}
                              </h5>
                            </div>

                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-icon waves-effect waves-light"
                              >
                                <i className="ri-facebook-fill fs-16"></i>
                              </button>{" "}
                              <button
                                type="button"
                                className="btn btn-danger btn-icon waves-effect waves-light"
                              >
                                <i className="ri-google-fill fs-16"></i>
                              </button>{" "}
                              <button
                                type="button"
                                className="btn btn-dark btn-icon waves-effect waves-light"
                              >
                                <i className="ri-github-fill fs-16"></i>
                              </button>{" "}
                              <button
                                type="button"
                                className="btn btn-info btn-icon waves-effect waves-light"
                              >
                                <i className="ri-twitter-fill fs-16"></i>
                              </button>
                            </div>
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
    </React.Fragment>
  );
};

export default Register;
