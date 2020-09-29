import React, { Component, createRef } from "react";
import classes from "./RegistrationPage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class RegistrationPage extends Component {
  state = {
    UserName: "",
    Password: "",
    Email: "",
    IsPassValid: false,
    IsUserNameValid: false,
    IsEmailValid: false,
  };

  username = React.createRef();
  password = React.createRef();
  email = React.createRef();

  defaultstate = () => {
    this.setState({
      UserName: "",
      Password: "",
      Email: "",
      IsPassValid: false,
      IsUserNameValid: false,
      IsEmailValid: false,
    });
    this.username.current.value = "";
    this.password.current.value = "";
    this.email.current.value = "";
  };

  isUserExist = (response) => {
    let arr = [];
    response.map((item) => {
      if (item.email == this.state.Email) {
        arr.push(item.email);
      }
    });

    if (arr.length !== 0) {
      return true;
    }
  };

  localStorageHandler = () => {
    let obj = {
      UserName: this.state.UserName,
      Password: this.state.Password,
    };

    localStorage.setItem("UserData", JSON.stringify(obj));
  };

  handleRegister = (e) => {
    e.preventDefault();
    if (
      this.state.IsEmailValid &&
      this.state.IsPassValid &&
      this.state.IsUserNameValid
    ) {
      axios
        .get("https://5ee90a15ca595700160298cc.mockapi.io/BackEnd")
        .then((response) => {
          this.isUserExist(response.data);
          if (this.isUserExist(response.data)) {
            alert("User Exist");
          } else {
            let UserData = {
              username: this.state.UserName,
              password: this.state.Password,
              email: this.state.Email,
            };

            axios
              .post(
                "https://5ee90a15ca595700160298cc.mockapi.io/BackEnd",
                UserData
              )
              .then((response) => {
                this.localStorageHandler();
                this.defaultstate();
                this.props.UserLoggedIn();
                alert("Registered Successful");
                this.props.props.history.push("/dashboard");
              })
              .catch((err) => {
                console.log("Request Failed");
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Enter Valid details");
    }
  };

  handleUserName = (e) => {
    const Validator = /^[a-zA-Z]{3,}([a-zA-Z0-9]{1,})?$/;

    if (e.target.value) {
      document
        .querySelector(".fall")
        .setAttribute("style", " display: block !important");
    }
    if (e.target.value.match(/^[a-zA-Z]{3,}/gm)) {
      document.querySelectorAll(".fall li")[0].style.color = "#00b700";
    } else {
      document.querySelectorAll(".fall li")[0].style.color = "#E15D44";
    }
    if (e.target.value.match(Validator)) {
      e.target.style.borderBottom = "4px solid #00b700";
      this.setState({
        UserName: e.target.value,
        IsUserNameValid: true,
      });
    } else {
      e.target.style.borderBottom = "4px solid #E15D44";
      return false;
    }
  };
  handlePassWord = (e) => {
    const PassWordValidator = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

    if (e.target.value) {
      document
        .querySelector(".passClass")
        .setAttribute("style", " display: block !important");
    }
    if (e.target.value.match(/^.{8,}$/gm)) {
      document.querySelectorAll(".passClass li")[0].style.color = "#00b700";
    } else {
      document.querySelectorAll(".passClass li")[0].style.color = "#E15D44";
    }
    if (e.target.value.match(/[0-9]{1,}/gm)) {
      document.querySelectorAll(".passClass li")[1].style.color = "#00b700";
    } else {
      document.querySelectorAll(".passClass li")[1].style.color = "#E15D44";
    }
    if (e.target.value.match(/[A-Z]{1,}/gm)) {
      document.querySelectorAll(".passClass li")[2].style.color = "#00b700";
    } else {
      document.querySelectorAll(".passClass li")[2].style.color = "#E15D44";
    }
    if (e.target.value.match(/[a-z]{1,}/gm)) {
      document.querySelectorAll(".passClass li")[3].style.color = "#00b700";
    } else {
      document.querySelectorAll(".passClass li")[3].style.color = "#E15D44";
    }
    if (e.target.value.match(/[^A-Za-z0-9]{1,}/gm)) {
      document.querySelectorAll(".passClass li")[4].style.color = "#00b700";
    } else {
      document.querySelectorAll(".passClass li")[4].style.color = "#E15D44";
    }
    if (e.target.value.match(PassWordValidator)) {
      e.target.style.borderBottom = "4px solid #00b700";
      this.setState({
        Password: e.target.value,
        IsPassValid: true,
      });
    } else {
      e.target.style.borderBottom = "4px solid #E15D44";
      return false;
    }
  };
  handleEmail = (e) => {
    e.preventDefault();
    const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.target.value.match(emailValidator)) {
      e.target.style.borderBottom = "4px solid #00b700";
      this.setState({
        Email: e.target.value,
        IsEmailValid: true,
      });
    } else {
      e.target.style.borderBottom = "4px solid #E15D44";
      return false;
    }
  };

  render() {
    return (
      <div className={classes.MainWrapper}>
        <form className={classes.RegistrationForm}>
          <h2>Welcome to Dashboard, Registration</h2>
          <div>
            <span>Username</span>
            <input
              ref={this.username}
              type="text"
              className={classes.username}
              onChange={this.handleUserName}
              required
            />
            <ul className={`${classes.loginVal}  fall `}>
              <li>Starts with not less than 3 characters</li>
              <li className={classes.ConditionLi1}>
                Numeric Characters are optional
              </li>
            </ul>
          </div>
          <div>
            <span>Password</span>
            <input
              ref={this.password}
              type="password"
              onChange={this.handlePassWord}
              required
            />
            <ul className={`${classes.passVal} passClass`}>
              <li>Not less than 8 characters</li>
              <li>Contains a digit</li>
              <li>Contains an uppercase letter</li>
              <li>Contains a lowercase letter</li>
              <li>A character not being alphanumeric</li>
            </ul>
          </div>
          <div>
            <span>Email</span>
            <input
              ref={this.email}
              type="Email"
              onChange={(e) => this.handleEmail(e)}
              required
            />
          </div>

          <div>
            <button type="hidden" onClick={this.handleRegister}>
              Register
            </button>
            <Link className={classes.btnLink} to="/login">
              <button className={classes.logbtn}>Login</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (Dispatch) => {
  return {
    UserLoggedIn: () => {
      Dispatch({ type: "USER_LOGGEDIN" });
    },
  };
};

export default connect(null, mapDispatchToProps)(RegistrationPage);