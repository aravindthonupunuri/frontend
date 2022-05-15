import React, { Component } from 'react';
import axios from "axios";
import Loader from "../../common-components/Loader";
import Error from "../../common-components/Error";
import Success from "../../common-components/Success";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        name: '',
        password: '',
        cpassword: '',
        isLoading: false,
        errorMessage: '',
        successMessage: ''
    }
  };

  handleSignUp = async () => {
    const {
      email, password, name, cpassword
    } = this.state 
    const user = {
      name,
      email,
      password,
      isAdmin: false,
      rewardPoints: 1,
    };
    //console.log(user);
    this.setState({isLoading: true});
    this.setState({errorMessage: ""})
    this.setState({successMessage: ""})
    if (!name) {
      this.setState({errorMessage: "Name is a required field"})
      this.setState({isLoading: false});
    } else if (!email) {
      this.setState({errorMessage: "Email is a required field"})
      this.setState({isLoading: false});
    } else if (!password || !cpassword) {
      this.setState({errorMessage: "Please enter both the password"})
      this.setState({isLoading: false});
    } else if (password !== cpassword) {
      this.setState({errorMessage: "Passwords do not match"})
      this.setState({isLoading: false});
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      this.setState({errorMessage: "Password need to be 6 to 16 character including at least one number , one letter and special character in it"})
      this.setState({isLoading: false});
    } else if (name.length < 4) {
      this.setState({errorMessage: "Name is too short"})
      this.setState({isLoading: false});
    } else if (/\d/.test(name)) {
      this.setState({errorMessage: "Name cannot contain numeric characters"})
      this.setState({isLoading: false});
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({errorMessage: "Please use a valid email address!"})
      this.setState({isLoading: false});
    } else {
      try {
        const result = (
          await axios.post("http://localhost:8080/api/customer/register", user)
        ).data;
        console.log(result);
        this.setState({
          name: '',
          email: '',
          password: '',
          cpassword: '',
          successMessage: result
        });
      } catch (error) {
        console.log(error);
        this.setState({errorMessage: error})
      }
      this.setState({isLoading: false});
  }
}

  render() {
    const {
      email, password, name, cpassword, successMessage, isLoading, errorMessage
    } = this.state 
    return (
      <div>
      {isLoading && <Loader></Loader>}
      {errorMessage.length > 0 && <Error msg={errorMessage}></Error>}
      <div className='login-main'></div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {successMessage.length > 0 && <Success msg={successMessage}></Success>}
          <div
            className="bs"
            style={{
              marginTop: "-100%",
              marginLeft: "5%",
              backgroundColor: "white",
            }}
          >
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                this.setState({name: e.target.value});
              }}
            />
            <br></br>

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
            <br></br>

            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                this.setState({cpassword: e.target.value});
              }}
            />
            <br></br>

            {isLoading ? (
              <div>Registering... Please Wait...</div>
            ) : (
              <button
                style={{
                  border: "none",
                  marginLeft: "41%",
                }}
                className="btn btn-primary mt-3"
                onClick={this.handleSignUp}
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default SignUp;

