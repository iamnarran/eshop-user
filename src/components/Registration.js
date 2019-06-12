import React from "react";
import { connect } from "react-redux";
import { Form, Input, Select, AutoComplete, message } from "antd";
import api from "../api";
import { Redirect } from "react-router-dom";
import actions from "../actions/register";

@connect(
  mapStateToProps,
  { register: actions.register }
)
class Component extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    isLoading: false
  };

  register = async values => {
    this.setState({ loading: true });
    let res = await this.props.register(values);
    if (res.success) {
      message.success("Амжилттай бүртгүүллээ. Та мэйл ээ шалгана уу! ");
      this.props.handleOk();
      this.setState({ loading: false });
    } else {
      message.error(res.data);
      this.setState({ loading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let temp = [];

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          firstname: values.firstname.toString(),
          lastname: values.lastname.toString(),
          email: values.email.toString(),
          password: values.password.toString(),
          phonE1: values.phonE1,
          phonE2: "0"
        };
        this.register(data);
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
      callback("Шинэ нууц үгээ зөв давтана уу");
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
    return (
      <div className="user-menu-content">
        <div className="user-profile-contain">
          <Form>
            <Form.Item>
              {getFieldDecorator("firstname", {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: "Хамгийн ихтэй 50 үсэг байна."
                  }
                ]
              })(
                <Input
                  placeholder="Овог"
                  className="form-control"
                  autoComplete="off"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("lastname", {
                rules: [
                  {
                    required: true,
                    message: "Нэрээ заавал оруулна уу!"
                  }
                ]
              })(<Input placeholder="Нэр" className="form-control" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    type: "email",
                    message: "Имэйлээ хаягаа оруулна уу!"
                  }
                ]
              })(<Input placeholder="И мэйл хаяг" className="form-control" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("phonE1", {
                rules: [
                  {
                    required: true,
                    min: 8,
                    max: 8,
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Утасны дугаараа оруулна уу!"
                  }
                ]
              })(
                <Input
                  placeholder="Утасны дугаар"
                  className="form-control"
                  autoComplete="off"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Нууц үгээ заавал оруулна уу!"
                  },
                  {
                    validator: this.validateToNextPassword
                  },
                  {
                    min: 4,
                    message: "Нууц үг хамгийн багадаа 4 оронтой байна."
                  }
                ]
              })(
                <Input.Password
                  placeholder="Нууц үг"
                  className="form-control"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Нууц үгээ дахин давтах!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  onBlur={this.handleConfirmBlur}
                  placeholder="Нууц үгээ дахин давтах!"
                  className="form-control"
                />
              )}
            </Form.Item>

            <button
              className="btn btn-block btn-login text-uppercase"
              onClick={this.handleSubmit}
              isLoading={this.state.isLoading}
            >
              Бүртгүүлэх
            </button>
            <span className="divide-maker">Эсвэл</span>
            <button
              type="submit"
              className="btn btn-block btn-social btn-facebook"
            >
              <span>Facebook-р бүртгүүлэх</span>
            </button>
            <button
              type="submit"
              className="btn btn-block btn-social btn-gmail"
            >
              Gmail-р бүртгүүлэх
            </button>
            {/*  <button
              type="submit"
              className="btn btn-block btn-social btn-emart"
            >
              Имарт картаар бүртгүүлэх
            </button> */}
          </Form>
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
