import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import ls from "local-storage";

import { SOCIAL_IDS } from "../utils/consts";

class FacebookLogin extends React.Component {
  handleFacebookLoginClick = () => {
    console.log("facebook login button clicked");
  };

  handleFacebookLoginResponse = res => {
    console.log("now", new Date().getTime());
    console.log("expiresIn", new Date().getTime() + 60 * 60 * 2);

    if (res && res.userID) {
      ls.set("user", {
        userID: res.userID,
        name: res.name,
        email: res.email,
        picture: res.picture.data.url,
        expiresIn: new Date().getTime() + 1000 * 60 * 60 * 2
      });
      this.props.onLogin();
    } else {
      this.props.signOut();
    }
  };

  isExpired = expiresIn => {
    const now = new Date().getTime();
    return expiresIn < now;
  };

  render() {
    if (ls.get("user") && !this.isExpired(ls.get("user").expiresIn)) {
      return null;
    } else {
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
    }
  }
}

export default FacebookLogin;
