import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Snackbar, Paper } from '@material-ui/core'

const LoginView = (props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={props.initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email is required'),
          password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .required('Password is required')
        })}
        onSubmit={(values, actions) => {
          props.handleSubmit(values, actions)
          actions.resetForm(props.initialValues)
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
            <Paper style={{ with: '10%' }}>
              <div
                className='col-md-6 offset-md-3'
                style={{ maxWidth: '35%', position: 'absolute' }}
              >
                <Form>
                  <div>
                    <h4>Login</h4>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <Field
                      name='email'
                      type='email'
                      className={
                        'form-control' +
                        (errors.email && touched.email
                          ? ' is-invalid'
                          : '')
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
                        (errors.password && touched.password
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>
                  <div className='form-group'>
                    <div className=''>
                      <input
                        className='b ph3 pv2 input-reset ba b--black bg-transparent  pointer f6 dib'
                        type='submit'
                        value='Sign in'
                      />
                      
                      <span>&nbsp;&nbsp; or &nbsp;
                        <a className="link dim black" href="/send_otp">Mobile Number Sign In</a>
                      </span>
                    </div> 
                    <div className='lh-copy mt3'>
                      <a href='/register' className='f6 link dim black db'>
                        Sign up
                      </a>
                    </div>
                  </div>
                </Form>
              </div>
            </Paper>
            <Snackbar
              anchorOrigin     = {{ vertical: 'top', horizontal: 'right' }}
              onClose          = {props.handleClose}
              open             = {props.respSuccess}
              message          = {props.respMessage}
              autoHideDuration = {4000}
            />
          </div>
        )}
      />
    </React.Fragment>
  )
}

export default LoginView