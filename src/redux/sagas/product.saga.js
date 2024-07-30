import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

function* getProductListSaga(action) {
  try {
    // call API
    const { page, limit, more, categoryId, searchKey, sort } = action.payload;

    // const sortParam = sort && {
    //   _sort: sort.split(".")[0],
    //   _order: sort.split(".")[1],
    // };

    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _page: page,
        _limit: limit,
        categoryId: categoryId,
        q: searchKey,
        ...(sort && {
          _sort: sort.split(".")[0],
          _order: sort.split(".")[1],
        }),
      },
    });

    yield put({
      type:
        // "GET_PRODUCT_LIST_SUCCESS"
        SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type:
        // "GET_PRODUCT_LIST_FAIL"
        FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        error: "FAIL",
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;

    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
      },
    });

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "FAIL",
      },
    });
  }
}

function* getSimilarProductListSaga(action) {
  try {
    const { similarProductId, limit } = action.payload;

    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _limit: limit,
        categoryId: similarProductId,
      },
    });

    yield put({
      type:
        // "GET_SIMILAR_PRODUCT_LIST_SUCCESS"
        SUCCESS(PRODUCT_ACTION.GET_SIMILAR_PRODUCT_LIST),
      payload: {
        data: result.data,
        limit: limit,
      },
    });
  } catch (e) {
    yield put({
      type:
        // "GET_SIMILAR_PRODUCT_LIST_FAIL"
        FAIL(PRODUCT_ACTION.GET_SIMILAR_PRODUCT_LIST),
      payload: {
        error: "FAIL",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data, images, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", data);
    for (let i = 0; i < images.length; i++) {
      yield axios.post("http://localhost:4000/images", {
        ...images[i],
        productId: result.data.id,
      });
    }
    yield callback();
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default function* productSaga() {
  yield debounce(
    500,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_SIMILAR_PRODUCT_LIST),
    getSimilarProductListSaga
  );
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
}
