import React from "react";
import SendOtpView from "../../Components/Mobile/sendOtpView"
import * as Actions from "../../Actions";
import { connect } from "react-redux";

class SendOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      respMessage: '',
      respSuccess: false,
      onClick: false,
      verify: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.sentOtp &&
      nextProps.sentOtp.error &&
      nextProps.sentOtp.error.data &&
      !nextProps.sentOtp.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.sentOtp.error.data.message
          ? nextProps.sentOtp.error.data.message
          : nextProps.sentOtp.error.data.error.message,
        respSuccess: true
      })
    } else {
      if (
        (nextProps.sentOtp &&
          nextProps.sentOtp.data.data &&
          nextProps.sentOtp.data.data.success)
      ) {
        this.setState({
          respMessage: nextProps.sentOtp.data.data.message,
          respSuccess: true,
          verify: true
        })
        let contact = JSON.stringify(
          nextProps.sentOtp.data.data.contact
        )
        localStorage.setItem('contact', contact)
        window.location.href = '/verify_otp'
      } else {
        this.setState({
          respMessage: nextProps.sentOtp.data.message,
          respSuccess: true
        })
      }
    }
  }

  handleSubmit(values, actions) {
    const { contact } = values
    const { dispatch } = this.props
    dispatch(Actions.sendOtp({ contact }))
  }


  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }

  render() {
    const { contact
      , respSuccess, respMessage, successMessage } = this.state;
    let initialValues = { contact }
    const { handleSubmit, handleClose } = this
    return (
      <SendOtpView
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        respSuccess={respSuccess}
        respMessage={respMessage}
        successMessage={successMessage}
      />
    )
  }
}


const mapState = (state) => {
  return {
    sentOtp: state.sendOtpResp
  }
}

export default connect(mapState)(SendOtp)