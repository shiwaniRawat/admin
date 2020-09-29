import React, { Component } from "react";
import RegistrationPage from "../../component/RegistrationPage/RegistrationPage";

class Registration extends Component {
  render() {
    return (
      <div>
        <RegistrationPage props={this.props}/>
      </div>
    );
  }
}

export default Registration;