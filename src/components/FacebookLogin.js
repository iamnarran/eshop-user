import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import ls from "local-storage";

import { SOCIAL_IDS } from "../utils/consts";
// import { isLoggedIn } from "../utils/global";

class FacebookLogin extends React.Component {
  handleFacebookLoginClick = () => {
    console.log("facebook login button clicked");
  };

  handleFacebookLoginResponse = res => {
    if (res && res.userID) {
      ls.set("user", {
        userID: res.userID,
        name: res.name,
        email: res.email,
        picture: res.picture.data.url,
        expiresIn: new Date().getTime() + 1000 * 60 * 60 * 2
      });
      console.log(ls.get("user"));
      this.props.onLogin();
    } else {
      ls.remove("user");
      this.props.signOut();
    }
  };

  render() {
    // if (isLoggedIn) {
    //   return null;
    // } else {
    return (
      <ReactFacebookLogin
        appId={SOCIAL_IDS.facebook}
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.handleFacebookLoginClick}
        callback={this.handleFacebookLoginResponse}
        cssClass="btn btn-block btn-social btn-facebook"
        textButton="Facebook-р нэвтрэх"
      />
    );
    // }
  }
}

export default FacebookLogin;
