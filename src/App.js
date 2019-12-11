import React from 'react';
import { Redirect, Switch, BrowserRouter as Router, Route } from "react-router-dom"
import Login from './Container/login/login';
import Register from './Container/Register/register';
import SendOtp from './Container/MobileAuth/sendOtp';
import CheckOtp from './Container/MobileAuth/verifyOtp';
import Dashboard from './Components/Dashboard/dashboard';


const isAuth = () => {
  let access_token = localStorage.getItem("access_token");
  if (access_token) {
    return true;
  }
  return false;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Router>
        <Switch>
          {
            isAuth() ?
              <Route
                path="/welcome-page"
                component={Dashboard} />
              :
              <Route exact path="/"
                render={
                  () => <Redirect to="/sign_in" />
                } />
          }
          <Route path="/sign_in" component={Login} ></Route>
          <Route exact path='/register' component={Register} />
          <Route exact path='/send_otp' component={SendOtp} />
          <Route path='/verify_otp' component={CheckOtp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
