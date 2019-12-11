import * as Types from "../Constants";

const initialState = {
  success: false,
  error: {},
  data: {}
}

export const login = function (state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...initialState,
        success: true,
        data: action.payload
      }
    case Types.LOGIN_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

export const register = function (state = initialState, action) {
  switch (action.type) {
    case Types.REGISTER_SUCCESS:
      return {
        ...initialState,
        success: true,
        data: action.payload
      }
    case Types.REGISTER_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

export const sendOtp = function (state = initialState, action) {
  switch (action.type) {
    case Types.SEND_OTP_SUCCESS:
      return {
        ...initialState,
        success: true,
        data: action.payload
      }
    case Types.SEND_OTP_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

export const verifyOtp = function (state = initialState, action) {
  switch (action.type) {
    case Types.VERIFY_OTP_SUCCESS:
      return {
        ...initialState,
        success: true,
        data: action.payload
      }
    case Types.VERIFY_OTP_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default:
      return state
  }
}