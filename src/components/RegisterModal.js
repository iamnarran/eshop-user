import React from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { createForm } from "rc-form";
import { Redirect } from "react-router-dom";
import Registration from "./Registration";

import actions, {
  showRegisterModal,
  hideRegisterModal
} from "../actions/register";

class RegisterModal extends React.Component {
  state = {
    isLoading: false
  };

  handleOk = () => {
    this.props.hideRegisterModal();
  };

  handleCancel = () => {
    this.props.hideRegisterModal();
  };

  render() {
    return (
      <Modal
        title="Бүртгүүлэх"
        visible={this.props.isVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        maskClosable={false}
        footer={[]}
      >
        <Registration handleOk={this.handleOk} onCancel={this.handleCancel} />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isVisible: state.auth.isRegisterModalVisible
  };
};

export default createForm()(
  connect(
    mapStateToProps,
    { register: actions.register, showRegisterModal, hideRegisterModal }
  )(RegisterModal)
);
