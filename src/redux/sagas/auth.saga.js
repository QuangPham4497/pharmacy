import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/login`, data);

    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield callback(result.data.user.role);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
    notification.success({
      message: "Đăng nhập thành công!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  } catch (e) {
    // console.log("🚀 ~ file: auth.saga.js:32 ~ function*loginSaga ~ e:", e);
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Email hoac password khong dung!",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/register`, data);

    yield callback();

    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    notification.success({
      message: "Đăng kí thành công!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  } catch (e) {
    // console.log("🚀 ~ file: auth.saga.js:65 ~ function*registerSaga ~ e:", e);
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);

    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: "Loi!",
      },
    });
  }
}

function* updateUserInfoSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, data);

    yield put({
      type: SUCCESS(AUTH_ACTION.UPDATE_USER_INFO),
      payload: {
        data: result.data,
      },
    });
    notification.success({
      message: "Lưu thông tin thành công!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.UPDATE_USER_INFO),
      payload: {
        error: "Loi!",
      },
    });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.UPDATE_USER_INFO), updateUserInfoSaga);
}
