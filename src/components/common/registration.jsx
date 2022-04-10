import React from "react";
import FormState from "./formstate";
import Joi from "joi-browser";
import Button from "./button";
import { register } from "../../services/userService";
import { getCurrentUser } from "../../services/authService";

class Registration extends FormState {
  state = {
    data: {
      firstName: "",
      lastName: "",
      username: "",
      role: "user",
      password: "",
      confirm_password: "",
    },
    errors: {},
    roles: [{ role: "user" }, { role: "admin" }],
    admin: false,
  };

  schema = {
    username: Joi.string().required().max(255).email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("Confirm Password")
      .options({
        language: {
          any: {
            allowOnly: "!!Passwords do not match",
          },
        },
      }),
    firstName: Joi.string().required().max(255).label("First Name"),
    lastName: Joi.string().required().max(255).label("Last Name"),
    role: Joi.string().required().max(20).label("Role").default("user"),
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (user !== null) {
      this.setState({ admin: user.role === "admin" });
    }
    document.getElementById("firstName").focus();
  }

  doSubmit = async () => {
    try {
      console.info(this.state.data);
      await register(this.state.data);
      window.location = "/success?msgType=registration";
    } catch (ex) {
      // if (ex.response && ex.response.status === 400) {
      //   const errors = { ...this.state.errors };
      //   errors.username = ex.response.data;
      //   console.info(errors);
      //this.setState({ errors });
      //}
    }
  };

  handleClear = () => {
    const data = {
      firstName: "",
      lastName: "",
      username: "",
      role: "user",
      password: "",
      confirm_password: "",
    };
    this.setState({ data });
  };

  render() {
    const { roles, admin } = this.state;

    return (
      <React.Fragment>
        <div className="authFormsContainer">
          <h3>Register User</h3>
          <form
            id="myform"
            onSubmit={this.handleSubmit}
            style={{ width: "100%" }}
            autoComplete="off"
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ width: "100%" }}>
                {this.renderInput(
                  "firstName",
                  "First Name",
                  "pencil-alt",
                  "white",
                  "whitelabel"
                )}
                {this.renderInput(
                  "lastName",
                  "Last Name",
                  "pencil-alt",
                  "white",
                  "whitelabel"
                )}
                {admin &&
                  this.renderSelect(
                    "role",
                    "Role",
                    roles,
                    "role",
                    "role",
                    "clipboard-list",
                    "white",
                    "whitelabel"
                  )}
              </div>
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
              {this.renderInput(
                "confirm_password",
                "Confirm Password",
                "pencil-alt",
                "white",
                "whitelabel",
                "password"
              )}
            </div>
            <div style={{ width: "60%" }}>
              {this.renderButton("SUBMIT", "smile", "button primary", false)}
              <Button
                title="CLEAR"
                icon="ban"
                color="white"
                className="button primary"
                onPress={this.handleClear}
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Registration;
