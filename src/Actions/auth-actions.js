import axios from "axios";
import * as Types from "../Constants";

const API_URL = `http://localhost:3001`;

export function login(loginData) {
  let request = axios(`${API_URL}/auth/sign_in`, {
    method: 'POST',
    data: loginData
  })
  return dispatch => {
    request
      .then(res => {
        if (
          res.data &&
          res.data.data &&
          res.data.data.success &&
          res.statusText === 'OK'
        ) {
          return dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.LOGIN_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        return dispatch({
          type: Types.LOGIN_FAIL,
          payload: error.response
        })
      })
  }
}

export function register(registerData) {
  let request = axios(`${API_URL}/auth/sign_up`, {
    method: 'POST',
    data: registerData
  })
  return dispatch => {
    request
      .then(res => {
        if (
          res.data &&
          res.data.success &&
          res.data.message
        ) {
          return dispatch({
            type: Types.REGISTER_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.REGISTER_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          return dispatch({
            type: Types.REGISTER_FAIL,
            payload: error.response
          })
        }
      })
  }
}

export const sendOtp = (contact) => {
  let request = axios(`${API_URL}/auth/send_otp`, {
    method: 'POST',
    data: contact
  })
  return dispatch => {
    request
      .then(res => {
        console.log("response insde", res)
        if (
          res.data &&
          res.data.data.success &&
          res.data.data.message
        ) {
          return dispatch({
            type: Types.SEND_OTP_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.SEND_OTP_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        return dispatch({
          type: Types.SEND_OTP_FAIL,
          payload: error.response
        })
      })
  }
}

export const verifyOtp = (verifyData) => {
  let request = axios(`${API_URL}/auth/verify_otp?contact=${verifyData.contact}&otp=${verifyData.otp}`, {
    method: 'GET'
  })
  return dispatch => {
    request
      .then(res => {
        if (
          res.data &&
          res.data.success &&
          res.data.message
        ) {
          return dispatch({
            type: Types.VERIFY_OTP_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.VERIFY_OTP_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        return dispatch({
          type: Types.VERIFY_OTP_FAIL,
          payload: error.response
        })
      })
  }
}

