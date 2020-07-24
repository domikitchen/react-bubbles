import React from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  onChange = evt => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [evt.target.name]: evt.target.value
      }
    })
  }

  login = evt => {
    evt.preventDefault();
    
    axiosWithAuth().post(`/api/login`, {
      username: this.state.credentials.username,
      password: this.state.credentials.password
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.payload);
        this.props.history.push(`/protected`);

      })
      .catch(error => {
        console.log(error);
      })
  };

  render() {
    return (
      <div>
        <form onSubmit = {this.login}>
          <label>
              Username: 
            <input
              type = "text"
              name = "username"
              value = {this.state.credentials.username}
              onChange = {this.onChange}
              placeholder = "username..."
            />
          </label>
          <label>
              Password:
            <input
              type = "password"
              name = "password"
              value = {this.state.credentials.password}
              onChange = {this.onChange}
              placeholder = "password..."
            />
          </label>
          <button onClick = {this.login}>LogIn</button>
        </form>
      </div>
    );
  }
};

export default Login;
