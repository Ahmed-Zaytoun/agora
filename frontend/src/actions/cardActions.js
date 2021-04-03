import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// at to cart

export const addToCart = (id, qty, userEmail) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  if (userEmail !== null) {
    localStorage.setItem(
      `cartItems-${userEmail}`,
      JSON.stringify(getState().cart.cartItems)
    );
  } else {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  //change the local storage to the new cart
  const email = getState().userLogin.userInfo.email;
  if (email !== null) {
    console.log(email);
    localStorage.setItem(
      `cartItems-${email}`,
      JSON.stringify(getState().cart.cartItems)
    );
    console.log(JSON.stringify(getState().cart.cartItems));
  } else {
    //remove cart item from non user
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
