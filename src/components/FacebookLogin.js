import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactFacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";

import { setUser } from "../actions/login";
import { SOCIAL_IDS } from "../utils/consts";

class FacebookLogin extends React.Component {
  state = {
    shouldRedirect: false
  };

  renderRedirect = () => {
    if (this.state.shouldRedirect) {
      return <Redirect to="/userprofile" />;
    }
  };

  setRedirect = () => {
    this.setState({ shouldRedirect: true });
  };

  handleFbClick = () => {
    console.log("facebook login button clicked");
  };

  handleFbLoginResponse = res => {
    if (res && res.userID) {
      const user = {
        email: res.email,
        firstname: res.name.split(" ")[0],
        lastname: res.name.split(" ").length > 1 ? res.name.split(" ")[1] : "",
        picture: res.picture
      };

      this.props.setUser(user);
      this.props.onFbClick();
      this.setRedirect();
    } else {
      this.notify("Холбогдох үед алдаа гарлаа");
    }
  };

  notify = message => toast(message, { autoClose: 5000 });

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <ReactFacebookLogin
          appId={SOCIAL_IDS.facebook}
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.handleFbClick}
          callback={this.handleFbLoginResponse}
          cssClass="btn btn-block btn-social btn-facebook"
          textButton="Facebook-р нэвтрэх"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(FacebookLogin);
