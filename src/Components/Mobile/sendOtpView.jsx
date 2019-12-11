import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Snackbar, Paper } from '@material-ui/core'

const SendOtpView = (props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={props.initialValues}
        validationSchema={Yup.object().shape({
          contact: Yup.number().required(' Mobile number is required'),
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
                    <h4>Mobile Number Login</h4>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='contact'>Contact</label>
                    <Field
                      name='contact'
                      type='number'
                      className={
                        'form-control' +
                        (errors.contact && touched.contact
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='contact'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='b ph4 pv2 input-reset ba b--black bg-transparent  pointer f6 dib'
                      type='submit'
                      value='sendotp'
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

export default SendOtpView;