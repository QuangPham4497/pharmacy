import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, CART_ACTION, SUCCESS, ORDER_ACTION } from "../constants";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};

const cartReducer = createReducer(initialState, {
  //Add item
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { id, quantity } = action.payload;
    const newCartList = [...state.cartList];
    const existId = state.cartList.findIndex((item) => item.id === id);

    if (existId !== -1) {
      newCartList.splice(existId, 1, {
        ...state.cartList[existId],
        quantity: state.cartList[existId].quantity + quantity,
      });
    } else {
      newCartList.push(action.payload);
    }

    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
  // update item
  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const { id, quantity } = action.payload;
    const newCartList = [...state.cartList];
    const productId = state.cartList.findIndex((item) => item.id === id);
    newCartList.splice(productId, 1, {
      ...state.cartList[productId],
      quantity: quantity,
    });
    return {
      ...state,
      cartList: newCartList,
    };
  },
  //delete item
  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { id } = action.payload;
    const productId = state.cartList.findIndex((item) => item.id === id);
    const newCartList = [...state.cartList];
    newCartList.splice(productId, 1);

    return {
      ...state,
      cartList: newCartList,
    };
  },
  // order product success
  [SUCCESS(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    localStorage.removeItem("cartList");
    return {
      ...state,
      cartList: [],
    };
  },
});

export default cartReducer;
