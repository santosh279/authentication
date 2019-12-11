import { combineReducers } from "redux";
import { login, register, sendOtp, verifyOtp } from "./auth.reducer";

const authReducers = combineReducers({
  loginResp   : login,
  registerResp: register,
  sendOtpResp : sendOtp,
  verifyOtpResp   : verifyOtp
})

export default authReducers;