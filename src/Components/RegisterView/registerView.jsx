import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Snackbar } from '@material-ui/core'

const RegisterView = (props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={props.initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
          contact: Yup.number().required('contact is required')
        })}
        onSubmit={(values, actions) => {
          props.handleSubmit(values, actions)
        }}
        render={({ errors, status, touched }) => (
          <div
            className='row'
            style={{
              marginLeft: '130px',
              marginTop: '50px',
              marginRight: '-50px'
            }}
          >
            <div
              className='col-md-6 offset-md-3'
              style={{ maxWidth: '35%', position: 'absolute' }}
            >
              <Form>
                <div>
                  <h4>Register</h4>
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <Field
                    name='name'
                    type='text'
                    className={
                      'form-control' +
                      (errors.name && touched.name
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='contact'>Contact</label>
                  <Field
                    name='contact'
                    type='number'
                    className={
                      'form-control' +
                      (errors.contact && touched.contact ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='contact'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <Field
                    name='email'
                    type='email'
                    className={
                      'form-control' +
                      (errors.email && touched.email ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <Field
                    name='password'
                    type='password'
                    className={
                      'form-control' +
                      (errors.password && touched.password ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <Field
                    name='confirmPassword'
                    type='password'
                    className={
                      'form-control' +
                      (errors.confirmPassword && touched.confirmPassword
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name='confirmPassword'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='b ph4 pv2 input-reset ba b--black bg-transparent  pointer f6 dib'
                    type='submit'
                    value='Register'
                  />
                  <a
                    href='/sign_in'
                    className='b ph4 ba b--black bg-transparent pointer f6 dib'
                    style={{
                      marginLeft: '10px',
                      color: 'black',
                      paddingBottom: '5px',
                      paddingTop: '5px',
                      textDecoration: 'none'
                    }}
                  >
                    back
                  </a>
                </div>
              </Form>
              {
                props.respMessage.length  ?
                  props.respMessage.map(item => {
                    return (
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={props.handleClose}
                        open={props.respSuccess}
                        message={item.message}
                        autoHideDuration={4000}
                      />
                    )
                  }) : <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={props.handleClose}
                    open={props.respSuccess}
                    message={props.successMessage}
                    autoHideDuration={4000}
                  />
              }
            </div>
          </div>
        )}
      />
    </React.Fragment>
  )
}

export default RegisterView;