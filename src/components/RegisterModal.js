import React from "react";
import { connect } from "react-redux";
import { Modal, Button, message } from "antd";
import { EXPAND_LEFT } from "react-ladda";
import { createForm } from "rc-form";
import { Redirect } from "react-router-dom";

import FacebookLogin from "./FacebookLogin";
import actions from "../actions/Register";

@connect(
  null,
  {
    register: actions.register
  }
)
class RegisterModal extends React.Component {
  state = {
    loading: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  handleOk = e => {
    this.props.onVisibleChange(e);
  };

  handleCancel = e => {
    this.props.onVisibleChange(e);
  };

  _submit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, form) => {
      if (!error) {
        this.setState({ loading: true });
        let res = null;
        try {
          res = await this.props.register(form);
          console.log(res);

          if (res.status === "failed") {
            message.error(res.message);
            this.setState({ loading: false });
          } else {
            this.handleOk();
            return <Redirect to="/" />;
          }
        } catch (err) {
          console.log(err);
          message.error(err.message);
          this.setState({ loading: false });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Бүртгүүлэх"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
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
              {getFieldDecorator("phone", {
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
              loading={this.state.loading}
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

export default createForm()(RegisterModal);
