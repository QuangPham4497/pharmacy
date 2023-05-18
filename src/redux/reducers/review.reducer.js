import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, REVIEW_ACTION } from "../constants";

const initialState = {
  reviewList: {
    data: [],
    error: "",
    load: false,
  },
  sendReviewData: {
    load: false,
    error: "",
  },
};

const reviewReducer = createReducer(initialState, {
  [REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        load: true,
      },
    };
  },

  [SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        data: data,
        load: false,
      },
    };
  },

  [FAIL(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        error: error,
        load: false,
      },
    };
  },

  //send review
  [REQUEST(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    return {
      ...state,
      sendReviewData: {
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    return {
      ...state,
      sendReviewData: {
        ...state.sendReviewData,
        load: false,
      },
    };
  },

  [FAIL(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      sendReviewData: {
        error: error,
        load: false,
      },
    };
  },
});

export default reviewReducer;
