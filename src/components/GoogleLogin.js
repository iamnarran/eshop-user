import React from "react";
import ReactGoogleLogin from "react-google-login";

import { SOCIAL_IDS } from "../utils/consts";

class GoogleLogin extends React.Component {
  state = {
    isLoggedIn: false,
    userId: "",
    name: "",
    email: "",
    picture: ""
  };

  onGoogleLoginSuccess = res => {
    console.log(res);
    // this.setState({ isLoggedIn: true });
  };

  onGoogleLoginFailure = err => {
    console.log(err);
    // console.log("failure");
  };

  render() {
    let gContent;

    if (this.state.isLoggedIn) {
      gContent = null;
    } else {
      gContent = (
        <ReactGoogleLogin
          clientId={SOCIAL_IDS.google}
          buttonText="Login"
          onSuccess={this.onGoogleLoginSuccess}
          onFailure={this.onGoogleLoginFailure}
          render={renderProps => (
            <button
              className="btn btn-block btn-social btn-gmail"
              onClick={renderProps.onClick}
            >
              Gmail-р нэвтрэх
            </button>
          )}
        />
      );
    }

    return <div>{gContent}</div>;
  }
}

export default GoogleLogin;
