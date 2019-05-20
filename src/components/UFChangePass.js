import React from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Button, AutoComplete } from "antd";
import api from "../api";
import { toast } from "react-toastify";
import { css } from "glamor";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@connect(
  mapStateToProps,
  {}
)
class Component extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleNotify = message =>
    toast(message, {
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });
  changePass = async user => {
    const params = {
      email: this.props.user.email,
      oldPass: user.oldPassword,
      NewPass: user.password
    };

    await api.customer.passreset(params).then(res => {
      if (res.success) {
        this.handleNotify(res.message);
      } else {
        this.handleNotify(res.message);
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.changePass(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("props", this.props);
    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Нууц үг солих</span>
          </p>
          <div className="user-profile-contain">
            <Form>
              <Form.Item hasFeedback>
                {getFieldDecorator("oldPassword", {
                  rules: [
                    {
                      required: true,
                      message: "Хуучин нууц үг!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password placeholder="Хуучин нууц үг" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Шинэ нууц үг!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password placeholder="Шинэ нууц үг" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Шинэ нууц үгээ дахин давтах!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    onBlur={this.handleConfirmBlur}
                    placeholder="Шинэ нууц үгээ дахин давтах"
                  />
                )}
              </Form.Item>
              <div className="text-right">
                <button className="btn btn-dark">
                  <span className="text-uppercase" onClick={this.handleSubmit}>
                    Хадгалах
                  </span>
                </button>
              </div>
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
