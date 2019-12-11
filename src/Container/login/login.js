import React from "react";
import * as Actions from "../../Actions"
import LoginView from "../../Components/LoginView/loginView";
import { connect } from "react-redux"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      respMessage: '',
      respSuccess: false,
      onClick: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, actions) {
    const { email, password } = values
    const { dispatch } = this.props
    if (email && password) {
      dispatch(Actions.login({ email, password }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.response &&
      nextProps.response.error &&
      nextProps.response.error.data &&
      !nextProps.response.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.response.error.data.message
          ? nextProps.response.error.data.message
          : nextProps.response.error.data.error.message,
        respSuccess: true
      })
    } else {
      if (
        nextProps.response &&
        nextProps.response.data.data &&
        nextProps.response.data.data.success
      ) {
        this.setState({
          respMessage: nextProps.response.data.data.message,
          respSuccess: true
        })
        let access_token = JSON.stringify(
          nextProps.response.data.data.accessToken
        )
        localStorage.setItem('access_token', access_token)
        window.location.href = '/welcome-page'
      } else {
        this.setState({
          respMessage: nextProps.response.data.message,
          respSuccess: true
        })
      }
    }
  }

  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }

  render() {
    const { email, password, respSuccess, respMessage } = this.state;
    const { handleSubmit, handleClose } = this;
    let initialValues = {
      email, password
    }
    return (
      <LoginView
        initialValues = {initialValues}
        handleSubmit  = {handleSubmit}
        handleClose   = {handleClose}
        respSuccess   = {respSuccess}
        respMessage   = {respMessage}
      />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    response: state.loginResp
  }
}

export default connect(mapStateToProps)(Login);