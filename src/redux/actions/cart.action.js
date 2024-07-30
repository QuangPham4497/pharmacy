import { createAction } from "@reduxjs/toolkit";
import { CART_ACTION, REQUEST } from "../constants";

export const addtocartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const updateAction = createAction(REQUEST(CART_ACTION.UPDATE_CART_ITEM));
export const deleteAction = createAction(REQUEST(CART_ACTION.DELETE_CART_ITEM));
