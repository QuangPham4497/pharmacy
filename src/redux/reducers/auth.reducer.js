import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, AUTH_ACTION } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    error: "",
    load: true,
  },
  loginData: { error: "", load: false },
  registerData: { error: "", load: false },
};

const authReducer = createReducer(initialState, {
  // LOGIN
  [REQUEST(AUTH_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      loginData: {
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data.user,
      },
      loginData: {
        ...state.loginData,
        load: false,
      },
    };
  },

  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      loginData: {
        error: error,
        load: false,
      },
    };
  },

  // REGISTER
  [REQUEST(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        ...state.registerData,
        load: false,
      },
    };
  },

  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      registerData: {
        load: false,
        error: error,
      },
    };
  },

  // LOG OUT
  [REQUEST(AUTH_ACTION.LOGOUT)]: (state, action) => {
    localStorage.removeItem("accessToken");
    return {
      ...state,
      userInfo: {
        data: {},
        error: "",
        load: false,
      },
    };
  },

  //GET_USER_INFO
  [REQUEST(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        load: false,
      },
    };
  },

  [FAIL(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        error: error,
        load: false,
      },
    };
  },

  //UPDATE_USER_INFO
  [REQUEST(AUTH_ACTION.UPDATE_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(AUTH_ACTION.UPDATE_USER_INFO)]: (state, action) => {
    const { data, id } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        load: false,
      },
    };
  },

  [FAIL(AUTH_ACTION.UPDATE_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        error: error,
        load: false,
      },
    };
  },
});

export default authReducer;
