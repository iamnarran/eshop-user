import React from "react";
import { connect } from "react-redux";
import ReactFacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";

import { setUser } from "../actions/login";
import { SOCIAL_IDS } from "../utils/consts";

class FacebookLogin extends React.Component {
  handleFbLoginResponse = res => {
    if (res && res.userID) {
      const user = {
        email: res.email,
        firstname: res.name.split(" ")[0],
        lastname: res.name.split(" ").length > 1 ? res.name.split(" ")[1] : "",
        picture: res.picture
      };

      this.props.setUser(user);
      this.props.onFbSuccess();
    } else {
      this.notify("Холбогдох үед алдаа гарлаа");
    }
  };

  notify = message => toast(message, { autoClose: 5000 });

  render() {
    return (
      <ReactFacebookLogin
        appId={SOCIAL_IDS.facebook}
        autoLoad={true}
        fields="name,email,picture"
        callback={this.handleFbLoginResponse}
        cssClass="btn btn-block btn-social btn-facebook"
        textButton="Facebook-р нэвтрэх"
      />
    );
  }
}

export default connect(
  null,
  { setUser }
)(FacebookLogin);
