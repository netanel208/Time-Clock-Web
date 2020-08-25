import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./components/Layout.component";
import LoginPage from "./components/Pages/LoginPage/LoginPage.component";
import "./index.css";
import HomePage from "./components/Pages/HomePage/HomePage.component";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage.component";
import NotFoundPage from "./components/Pages/NotFoundPage/NotFoundPage.component";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  // const [isAuth, setIsAuth] = useState(false);
  const home = () => {
    return (
      <Layout>
        <HomePage />
      </Layout>
    );};

  const profile = () => {
    return (
      <Layout>
        <ProfilePage />
      </Layout>
    );
  };

  return (
    <Provider store={store}>
      <div className="wrapper-common">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />

            <Route exact path="/login">
              <LoginPage login={true} />
            </Route>

            <PrivateRoute exact path="/home" component={home} />
            <PrivateRoute exact path="/profile" component={profile} />

            {/* <Route path="/home">
              <Layout>
                <HomePage />
              </Layout>
            </Route> */}

            {/* <Route path="/profile">
              <Layout>
                <ProfilePage />
              </Layout>
            </Route> */}

            <Route path="/about">
              <Layout>
                <div></div>
              </Layout>
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
