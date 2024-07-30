import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getCategoryListSaga(action) {
  try {
    // call API

    const result = yield axios.get(`http://localhost:4000/categories`, {
      params: {
        _embed: "products",
      },
    });

    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: "FAIL",
      },
    });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default function* categorySaga() {
  yield takeEvery("GET_CATEGORY_LIST_REQUEST", getCategoryListSaga);
}
