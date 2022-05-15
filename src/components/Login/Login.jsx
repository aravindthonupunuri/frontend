import React, { Component } from 'react';
import axios from "axios";
import Loader from "../../common-components/Loader";
import Error from "../../common-components/Error";
require('./Login.css')

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        isLoading: false,
        errorMessage: '',
        successMessage: ''
    }
}
handelLogin = async () => {
  this.setState({isLoading: true});
  const {
    email, password
  } = this.state
    const user = {
      email,
      password,
    };
    if (!email) {
      this.setState({errorMessage: "Email is a required field"})
    } else if (!password) {
      this.setState({errorMessage: "Please enter the password"})
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      this.setState({ errorMessage : "Password need to be 6 to 16 character including at least one number , one letter and special character in it"});
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({ errorMessage: "Please use a valid email address!"});
    } else {
      console.log(user)
      try {
        const result = (
          await axios.post("http://localhost:8080/api/customer/login", user)
        ).data;
        console.log("In post login");
        console.log(result);
        localStorage.setItem("currentUserName", JSON.stringify(result.name));
        localStorage.setItem("currentUserId", JSON.stringify(result.id));
        localStorage.setItem("isAdmin", JSON.stringify(result.admin));
        localStorage.setItem("rewards", JSON.stringify(result.rewardPoints));

debugger;
        window.location.href = "/admin";
      } catch (error) {
        console.log(error);
        this.setState({errorMessage: "Invalid Credentials"})
      }
      this.setState({isLoading: false});
    }
}
  render() {
    const {
      email, password, isLoading, errorMessage
    } = this.state
    return (
      <div>
        {isLoading && <Loader></Loader>}
        <div className="login-main"></div>
        <div className="row justify-content-center mt-5" style={{ height: "30%", }}>
          <div className="col-md-5 mt-5">
            {errorMessage.length > 0 && <Error msg={errorMessage}></Error>}
            <div
              style={{
                marginTop: "-100%",
                marginLeft: "15%",
                backgroundColor: "#478dc3",
              }}
              className="bs"
            >
              <h2>Login</h2>

              <input
                type="text"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  this.setState({email: e.target.value});
                }}
              />
              <br></br>

              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  this.setState({password: e.target.value});
                }}
              />
              {isLoading ? (
                <div>Login...Please Wait...</div>
              ) : (
                <button
                  style={{ border: "none", marginLeft: "41%" }}
                  className="btn btn-primary mt-3"
                  onClick={this.handelLogin}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
