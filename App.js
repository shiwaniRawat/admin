import React, { Component } from "react";
import "./App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import LoginPageLanding from "./components/LoginPageLandingsection/LoginPageLanding";
import { connect } from "react-redux";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Nav from "./component/NavBar/Nav";
import Registration from "./container/Registeration/Registration";
import DashBoard from "./container/DashBoard/DashBoard";
import Products from "./container/Products/Products";
import Account from "./container/AccountPage/Account";
import AddProductPage from "./container/Products/addProduct/add";
import LoginPage from "./component/LoginPage/LoginPage";
// import Registration from "./container/RegistrationPage/Registration";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <Nav />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/registration"
              render={(props) =>
                this.props.UserStatus ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Registration {...props} />
                )
              }
            />
            <Route
              exact
              path="/"
              render={() =>
                this.props.UserStatus ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !this.props.UserStatus ? (
                  <LoginPage{...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                this.props.UserStatus ? (
                  <DashBoard {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/Products"
              render={(props) =>
                this.props.UserStatus ? (
                  <Products {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/accounts"
              render={(props) =>
                this.props.UserStatus ? (
                  <Account {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/Products/add"
              render={(props) =>
                this.props.UserStatus ? (
                  <AddProductPage {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapGlobalStateToProps = (globalState) => {
  return {
    UserStatus: globalState.IsUserLoggedIn,
  };
};

export default connect(mapGlobalStateToProps)(App);