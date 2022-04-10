import React from "react";
import Joi from "joi-browser";

import FormState from "./formstate";
import { login } from "../../services/authService";

class Login extends FormState {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().max(255).email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    try {
      console.info("doSubmit...");
      const { data } = this.state;
      await login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="authFormsContainer">
            <h3>Sign In</h3>
            <form
              id="myform"
              onSubmit={this.handleSubmit}
              style={{ width: "100%" }}
            >
              <div style={{ marginBottom: "20px" }}>
                {this.renderInput(
                  "username",
                  "Email",
                  "pencil-alt",
                  "white",
                  "whitelabel"
                )}
                {this.renderInput(
                  "password",
                  "Password",
                  "pencil-alt",
                  "white",
                  "whitelabel",
                  "password"
                )}
              </div>
              <div style={{ width: "60%" }}>
                {this.renderButton("LOGIN", "smile", "button primary", false)}
              </div>
            </form>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
export default Login;
