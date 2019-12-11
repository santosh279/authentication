import React from "react";
import RegisterView from "../../Components/RegisterView/registerView"
import * as Actions from "../../Actions";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      contact: "",
      name: '',
      confirmPassword: '',
      successMessage: '',
      respMessage : [],
      respSuccess: false,
      onClick: false,

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.register &&
      nextProps.register.error &&
      nextProps.register.error.data &&
      !nextProps.register.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.register.error.data.error,
        respSuccess: true
      }, () => {
        console.log(this.state.respMessage)
      })
    } else {
      if (
        nextProps.response &&
        nextProps.register.data &&
        nextProps.register.data.success &&
        nextProps.register.statusText === 'Created'
      ) {
        this.setState({
          respMessage: nextProps.register.data.message,
          respSuccess: true
        })
      } else {
        this.setState({
          successMessage: nextProps.register.data.message,
          respSuccess: true
        })
      }
    }
  }

  handleSubmit(values, actions) {
    const { email, password, confirmPassword, contact, name } = values
    const { dispatch } = this.props
    dispatch(Actions.register({ email, password, confirmPassword, contact, name }))
  }

  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }

  render() {
    const { email, password, contact, name, 
      confirmPassword, respSuccess, respMessage, successMessage  } = this.state;
    let initialValues = {
      email, password, contact, name, confirmPassword
    }
    const { handleSubmit, handleClose } = this
    return (
      <RegisterView
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleClose   = {handleClose}
        respSuccess   = {respSuccess}
        respMessage   = {respMessage}
        successMessage = { successMessage }
      />
    )
  }
}


const mapState = (state) => {
  return {
    register: state.registerResp
  }
}

export default connect(mapState)(Register)