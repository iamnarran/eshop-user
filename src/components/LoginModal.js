import React from "react";
import { connect } from "react-redux";
import { Modal, Button, message } from "antd";
import { Link } from "react-router-dom";
import { EXPAND_LEFT } from "react-ladda";
import { createForm } from "rc-form";

import FacebookLogin from "./FacebookLogin";
import actions, { setUser } from "../actions/Login";
import RegisterModal from "./RegisterModal";

@connect(
  null,
  {
    login: actions.login,
    setUser
  }
)
class LoginModal extends React.Component {
  state = {
    visible: false,
    loading: false,
    isRegisterModalVisible: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleRegisterClick = () => {
    this.setState({ isRegisterModalVisible: true });
  };

  _submit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, form) => {
      if (!error) {
        this.setState({ loading: true });
        let res = null;
        try {
          res = await this.props.login(form);

          if (res.status === "failed") {
            message.error(res.message);
            this.setState({ loading: false });
          } else {
            // successful
            this.props.setUser(res.data);
            window.location.reload();
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
      <div>
        <Modal
          title="Нэвтрэх"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="modal-body">
            <form onSubmit={this._submit}>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                {getFieldDecorator("email", {
                  rule: [
                    {
                      required: true,
                      message: "Имэйл хаяг оруулна уу"
                    }
                  ],
                  initialValue: "tulgaa@datacare.mn"
                })(
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Имэйл"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                {getFieldDecorator("password", {
                  rule: [
                    {
                      required: true,
                      message: "Нууц үг оруулна уу"
                    }
                  ],
                  initialValue: "123123"
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
                <div className="row row10">
                  <div className="col-xl-6 pad10">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Сануулах
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-6 pad10">
                    <div className="text-right">
                      <Link to="" className="btn btn-link">
                        Нууц үгээ мартсан
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="primary"
                className="btn btn-block btn-login text-uppercase"
                loading={this.state.loading}
                onClick={this.toggle}
                data-style={EXPAND_LEFT}
                htmlType="submit"
              >
                Нэвтрэх
              </Button>
            </form>

            <span className="divide-maker">Эсвэл</span>

            <FacebookLogin onLogin={this.handleLogInSave} />
            {/* <GoogleLogin /> */}

            <button
              type="submit"
              className="btn btn-block btn-social btn-emart"
            >
              Имарт картаар нэвтрэх
            </button>

            <div className="text-center">
              <Link
                to=""
                className="btn btn-link"
                onClick={this.handleRegisterClick}
              >
                Та шинээр бүртгүүлэх бол ЭНД ДАРЖ бүртгүүлнэ үү
              </Link>
            </div>
          </div>
        </Modal>
        <RegisterModal visible={this.state.isRegisterModalVisible} />
      </div>
    );
  }
}

export default createForm()(LoginModal);
