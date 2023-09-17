import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  FormFeedback,
  Spinner,
} from "reactstrap";
import AuthSlider from "../authCarousel";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { loginUser } from "../../../slices/thunks";

const CoverSignIn = (props) => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state;
  const loginpageData = createSelector(selectLayoutState, (state) => ({
    user: state.Account.user,
    error: state.Login.error,
    loading: state.Login.loading,
    errorMsg: state.Login.errorMsg,
  }));

  const { user, error, loading, errorMsg } = useSelector(loginpageData);

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [passwordShow, setPasswordShow] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userLogin.email || "",
      password: userLogin.password || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values,props.router.navigate));
    },
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = (values) => {
   
    console.log(props.router.navigate)
    dispatch(loginUser(values,props.router.navigate));
  
    // Navigate programmatically after successful login
   
  };
  

  useEffect(() => {
    if (user) {
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

  document.title = "Cover SignIn | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">
                            Login to Your Account
                          </h5>
                          <p className="text-muted">
                            Sign in to continue to American Distributors.
                          </p>
                        </div>

                        <div className="mt-4">
                          <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                          >
                            {({ isSubmitting }) => (
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  validation.handleSubmit();
                                }}
                              >
                                <div className="mb-3">
                                  <Label htmlFor="email" className="form-label">
                                    Email Address
                                  </Label>
                                  <Input
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    type="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email}
                                    invalid={
                                      validation.touched.email &&
                                      !!validation.errors.email
                                    }
                                  />
                                  <FormFeedback>
                                    {validation.errors.email}
                                  </FormFeedback>
                                </div>

                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="password-input"
                                  >
                                    Password
                                  </label>
                                  <div className="position-relative auth-pass-inputgroup">
                                    <Input
                                      type={passwordShow ? "text" : "password"}
                                      className="form-control pe-5 password-input"
                                      placeholder="Enter password"
                                      id="password-input"
                                      name="password"
                                      value={validation.values.password}
                                      onBlur={validation.handleBlur}
                                      onChange={validation.handleChange}
                                      invalid={
                                        validation.errors.password &&
                                        validation.touched.password
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.errors.password &&
                                    validation.touched.password ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.password}
                                      </FormFeedback>
                                    ) : null}
                                    <Button
                                      color="link"
                                      onClick={() =>
                                        setPasswordShow(!passwordShow)
                                      }
                                      className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                      type="button"
                                      id="password-addon"
                                    >
                                      <i className="ri-eye-fill align-middle"></i>
                                    </Button>
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
                                    disabled={loading || !validation.isValid}
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
                              </Form>
                            )}
                          </Formik>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>

                          <div>
                            <Button color="primary" className="btn-icon me-1">
                              <i className="ri-facebook-fill fs-16"></i>
                            </Button>
                            <Button color="danger" className="btn-icon me-1">
                              <i className="ri-google-fill fs-16"></i>
                            </Button>
                            <Button color="dark" className="btn-icon me-1">
                              <i className="ri-github-fill fs-16"></i>
                            </Button>
                            <Button color="info" className="btn-icon">
                              <i className="ri-twitter-fill fs-16"></i>
                            </Button>
                          </div>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <a
                              href="/auth-signup-cover"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Signup
                            </a>{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <footer className="footer">
          {/* <Container>
              <Row>
                  <Col lg={12}>
                      <div className="text-center">
                          <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                      </div>
                  </Col>
              </Row>
          </Container> */}
        </footer>
      </div>
    </React.Fragment>
  );
};

export default CoverSignIn;
