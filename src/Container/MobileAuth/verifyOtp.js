import React from "react";
import * as Actions from "../../Actions";
import { connect } from "react-redux";
import VerifyOtp from "../../Components/Mobile/verifyOtp";

class CheckOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      contact: "",
      respMessage: '',
      respSuccess: false,
      onClick: false,
      verify: false

    }
    this.handleVerifyOnSubmit = this.handleVerifyOnSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.verifyOtp &&
      nextProps.verifyOtp.error &&
      nextProps.verifyOtp.error.data &&
      !nextProps.verifyOtp.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.verifyOtp.error.data.message
          ? nextProps.verifyOtp.error.data.message
          : nextProps.verifyOtp.error.data.error.message,
        respSuccess: true
      })
    } else {
      if (
        (nextProps.verifyOtp &&
          nextProps.verifyOtp.data &&
          nextProps.verifyOtp.data.success)
      ) {
        this.setState({
          respMessage: nextProps.verifyOtp.data.message,
          respSuccess: true,
          verify: true,
          contact: nextProps.verifyOtp.data.contact
        })
        localStorage.setItem("access_token", "mobile_login");
        window.location.href = '/welcome-page'
      } else {
        this.setState({
          respMessage: nextProps.verifyOtp.data.message,
          respSuccess: true
        })
      }
    }
  }

  handleVerifyOnSubmit = (values, actions) => {
    const { otp } = values
    const contact = localStorage.getItem("contact");
    const { dispatch } = this.props
    dispatch(Actions.verifyOtp({ contact, otp }))
  }

  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }

  render() {
    const { contact
      , respSuccess, respMessage, otp } = this.state;
    let initialValues = { otp }
    const { handleClose, handleVerifyOnSubmit } = this
    return (
      <VerifyOtp
        contact={contact}
        initialValues={initialValues}
        handleVerifyOnSubmit={handleVerifyOnSubmit}
        respMessage={respMessage}
        respSuccess={respSuccess}
        handleClose={handleClose}
      />
    )
  }
}


const mapState = (state) => {
  return {
    verifyOtp: state.verifyOtpResp
  }
}

export default connect(mapState)(CheckOtp)