//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

// action
import {
    productCreateFailed,
    productCreateSuccessful,
    resetProductFlagChange,
    apiErrorChange
//   registerUserSuccessful,
//   registerUserFailed,
//   resetRegisterFlagChange,
//   apiErrorChange
} from "./reducer";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
export const createProduct = (user) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = fireBaseBackend.createProduct(user.email, user.password);
      // yield put(registerUserSuccessful(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   response = postJwtRegister('/post-jwt-register', user);
      // yield put(registerUserSuccessful(response));
    } else if (process.env.REACT_APP_API_URL) {
      response = postFakeRegister(user);
      const data = await response;

      if (data.message === "success") {
        dispatch(productCreateSuccessful(data));
      } else {
        dispatch(productCreateFailed(data));
      }
    }
  } catch (error) {
    dispatch(productCreateFailed(error));
  }
};

export const resetProductFlag = () => {
  try {
    const response = resetProductFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const productError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};