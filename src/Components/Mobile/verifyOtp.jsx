import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Snackbar, Paper } from '@material-ui/core'

const VerifyOtp = (props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={props.initialValues}
        validationSchema={Yup.object().shape({
          otp: Yup.number().min(4).required('OTP is required'),
        })}
        onSubmit={(values, actions) => {
          props.handleVerifyOnSubmit(values, actions)
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
                    <h4>Verify your OTP to Login</h4>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='otp'>OTP</label>
                    <Field
                      name='otp'
                      type='number'
                      className={
                        'form-control' +
                        (errors.otp && touched.otp
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='otp'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='b ph4 pv2 input-reset ba b--black bg-transparent  pointer f6 dib'
                      type='submit'
                      value='Verify OTP'
                    />
                    <a
                      href='/send_otp'
                      className='b ph4 ba b--black bg-transparent pointer f6 dib'
                      style={{
                        marginLeft: '10px',
                        color: 'black',
                        paddingBottom: '5px',
                        paddingTop: '5px',
                        textDecoration: 'none'
                      }}
                    >
                      Retry
                  </a>
                  </div>
                </Form>
              </div>
            </Paper>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={props.handleClose}
              open={props.respSuccess}
              message={props.respMessage}
              autoHideDuration={4000}
            />
          </div>
        )}
      />
    </React.Fragment>
  )
}

export default VerifyOtp;