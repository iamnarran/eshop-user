import React from "react";
import { connect } from "react-redux";
import { Modal, Button, message } from "antd";
import { EXPAND_LEFT } from "react-ladda";
import { createForm } from "rc-form";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { css } from "glamor";
import api from "../api";

import actions, {
  showRegisterModal,
  hideRegisterModal
} from "../actions/register";

class RegisterModal extends React.Component {
  state = {
    isLoading: false
  };

  handleNotify = message =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });

  handleOk = () => {
    this.props.hideRegisterModal();
  };

  handleCancel = () => {
    this.props.hideRegisterModal();
  };

  _submit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (error, form) => {
      if (!error) {
        const data = {
          firstname: form.firstname.toString(),
          lastname: form.lastname.toString(),
          email: form.email.toString(),
          password: form.password.toString(),
          phonE1: form.phoneE1.toString()
        };
        this.setState({ isLoading: true });
        let res = null;

        try {
          console.log(data);
          res = await this.props.register(data);
          if (res.status === "failed") {
            message.error(res.message);
            this.setState({ isLoading: false });
          } else {
            this.handleOk();
            this.handleNotify("Амжилттай бүртгүүллээ. Имэйлээ шалгана уу");
            return <Redirect to="/" />;
          }
        } catch (err) {
          console.log(err);
          message.error(err.message);
          this.setState({ isLoading: false });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Бүртгүүлэх"
        visible={this.props.isVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        maskClosable={false}
        footer={[]}
      >
        <div className="modal-body">
          <form onSubmit={this._submit}>
            <div className="form-group">
              <label htmlFor="lastname" className="sr-only">
                Овог
              </label>
              {getFieldDecorator("lastname", {
                rule: [
                  {
                    required: true,
                    message: "Овог оруулна уу"
                  }
                ]
              })(
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Овог"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="sr-only">
                Нэр
              </label>
              {getFieldDecorator("firstname", {
                rule: [
                  {
                    required: true,
                    message: "Нэр оруулна уу"
                  }
                ]
              })(
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Нэр"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="sr-only">
                Имэйл
              </label>
              {getFieldDecorator("email", {
                rule: [
                  {
                    required: true,
                    message: "Имэйл оруулна уу"
                  }
                ]
              })(
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Имэйл хаяг"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="sr-only">
                Утасны дугаар
              </label>
              {getFieldDecorator("phoneE1", {
                rule: [
                  {
                    required: true,
                    message: "Утасны дугаар оруулна уу"
                  }
                ]
              })(
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Утасны дугаар"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only">
                Нууц үг
              </label>
              {getFieldDecorator("password", {
                rule: [
                  {
                    required: true,
                    message: "Нууц үг оруулна уу"
                  }
                ]
              })(
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="passwordHelp"
                  placeholder="Нууц үг"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="passwordRepeat" className="sr-only">
                Нууц үг давтах
              </label>
              {getFieldDecorator("passwordRepeat", {
                rule: [
                  {
                    required: true,
                    message: "Нууц үг оруулна уу"
                  }
                ]
              })(
                <input
                  type="password"
                  className="form-control"
                  id="passwordRepeat"
                  aria-describedby="passwordHelp"
                  placeholder="Нууц үг давтах"
                />
              )}
            </div>
            <Button
              type="primary"
              className="btn btn-block btn-login text-uppercase"
              isLoading={this.state.isLoading}
              data-style={EXPAND_LEFT}
              htmlType="submit"
            >
              Бүртгүүлэх
            </Button>
          </form>
          <span className="divide-maker">Эсвэл</span>
          <button
            type="submit"
            className="btn btn-block btn-social btn-facebook"
          >
            <span>Facebook-р бүртгүүлэх</span>
          </button>
          <button type="submit" className="btn btn-block btn-social btn-gmail">
            Gmail-р бүртгүүлэх
          </button>
          <button type="submit" className="btn btn-block btn-social btn-emart">
            Имарт картаар бүртгүүлэх
          </button>
        </div>
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
