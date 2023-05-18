import { createAction } from "@reduxjs/toolkit";
import { REVIEW_ACTION, REQUEST } from "../constants";

export const sendReviewAction = createAction(
  REQUEST(REVIEW_ACTION.SEND_REVIEW)
);
export const getReviewListAction = createAction(
  REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)
);
