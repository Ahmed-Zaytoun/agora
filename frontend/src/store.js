import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userAdminUpdateReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderUserListReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  //Product Reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreateReview: productCreateReviewReducer,
  //ADMIN
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,

  //Cart Reducers
  cart: cartReducer,

  //User Reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  //ADMIN
  userDelete: userDeleteReducer,
  userAdminUpdate: userAdminUpdateReducer,
  orderUserList: orderUserListReducer,

  //order Reducers
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  //ADMIN
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const userInfoFromStoragr = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

let cartItemsFromStorage = [];

if (userInfoFromStoragr !== null) {
  const { email } = userInfoFromStoragr;
  cartItemsFromStorage = localStorage.getItem(`cartItems-${email}`)
    ? JSON.parse(localStorage.getItem(`cartItems-${email}`))
    : [];
} else {
  cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
}

const shippingAddressFromStoragr = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStoragr,
  },
  userLogin: { userInfo: userInfoFromStoragr },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
