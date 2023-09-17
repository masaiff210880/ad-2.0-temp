import {combineReducers} from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import EcommerceReducer from "./ecommerce/reducer";


// product
import productcreateSlice from "./products/createproduct/reducer"

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Account: AccountReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Product: productcreateSlice,
    Ecommerce : EcommerceReducer,
});

export default rootReducer;