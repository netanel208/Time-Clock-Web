import React, {useState, useEffect} from "react";
import "../../../index.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import { createBrowserHistory } from 'history';
import { useHistory } from "react-router-dom";
import classnames from "classnames";


const LoginPage = (props) => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [errors, setErrors] = useState({});
  let history = useHistory();

  //Working in 1st iteration:
  useEffect(() => {
    if(props.auth.isAuthenticated){
      history.push("/home");
      history.go(0);
    }
    if(props.errors){
      setErrors(props.errors);
    }
  },[history]);

  const submitHandler = (e) => {
    e.preventDefault();
    email = document.getElementById("email").value;
    password = document.getElementById("password").value
    const userData = {
      email: email,
      password: password
    };
    console.log(userData);

    props.loginUser(userData); // since we handle the redirect
  };

  return (
    <div className="wrapper-login">
      <form onSubmit={submitHandler} className="login-form">
        <label className="title">Welcome to App!</label>
        <label className="field">Email:</label>
        <input type="email" id="email" className="field" placeholder="email@email.com" />
        <label className="field">Password:</label>
        <input type="password" id="password" className="field" placeholder="********" />
        <input type="submit" className="button" />
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
