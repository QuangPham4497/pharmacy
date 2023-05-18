import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    error: "",
    load: false,
  },
  productDetail: {
    data: {},
    load: false,
    error: "",
  },
  similarproductList: {
    data: [],
    error: "",
    load: false,
  },
  createProductData: {
    load: false,
    error: "",
  },
  updateProductData: {
    load: false,
    error: "",
  },
  deleteProductData: {
    load: false,
    error: "",
  },
};

const productReducer = createReducer(initialState, {
  // GET_PRODUCT_LIST_REQUEST
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        load: true,
      },
    };
  },

  // GET_PRODUCT_LIST_SUCCESS
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, more } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: more ? [...state.productList.data, ...data] : data,
        meta: meta,
        load: false,
      },
    };
  },

  // GET_PRODUCT_LIST_FAIL
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        error: error,
        load: false,
      },
    };
  },

  // GET_PRODUCT_DETAIL_REQUEST
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: true,
      },
    };
  },

  // GET_PRODUCT_DETAIL_SUCCESS
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: data,
        load: false,
      },
    };
  },

  // GET_PRODUCT_DETAIL_FAIL
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        error: error,
        load: false,
      },
    };
  },

  // GET_SIMILAR_PRODUCT_LIST_REQUEST
  [REQUEST(PRODUCT_ACTION.GET_SIMILAR_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      similarproductList: {
        ...state.similarproductList,
        load: true,
      },
    };
  },
  // GET_SIMILAR_PRODUCT_LIST_SUCCESS
  [SUCCESS(PRODUCT_ACTION.GET_SIMILAR_PRODUCT_LIST)]: (state, action) => {
    const { data, limit } = action.payload;
    return {
      ...state,
      similarproductList: {
        ...state.similarproductList,
        data: data,
        limit: limit,
        load: false,
      },
    };
  },
  // GET_SIMILAR_PRODUCT_LIST_FAIL
  [FAIL(PRODUCT_ACTION.GET_SIMILAR_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      similarproductList: {
        ...state.similarproductList,
        error: error,
        load: false,
      },
    };
  },

  // CREATE_PRODUCT
  [REQUEST(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        load: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        load: false,
        error: error,
      },
    };
  },
  // UPDATE_PRODUCT
  [REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        load: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        load: false,
        error: error,
      },
    };
  },
  // DELETE_PRODUCT
  [REQUEST(PRODUCT_ACTION.DELETE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        load: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.DELETE_PRODUCT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        load: false,
        error: error,
      },
    };
  },
});

export default productReducer;
