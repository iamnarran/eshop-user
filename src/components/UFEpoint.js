import React from "react";
import { connect } from "react-redux";
import api from "../api";
import { Form, Icon, Input, Button } from "antd";

@connect(
  mapStateToProps,
  {}
)
class Component extends React.Component {
  state = {
    loading: true
  };

  getData = async () => {};

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>ePoint карт</span>
          </p>
          <div className="user-profile-contain">
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Input placeholder="Username" />
              <Input type="password" placeholder="Password" />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
}

export default Form.create({ name: "delivery" })(Component);
