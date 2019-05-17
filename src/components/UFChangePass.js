/* import React from "react";
import { TextField, Select } from "../";
import { Form, message } from "antd";

class Component extends React.Component {
  state = {
    oldpass: null,
    newpass: null,
    renewpass: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success("Нууц үг амжиллтаЙ солигдлоо");
      }
    });
  };

  handleOldPass = e => {
    this.setState({ oldpass: e.target.value });
  };
  handleNewPass = e => {
    this.setState({ newpass: e.target.value });
  };
  handleReNewPass = e => {
    this.setState({ renewpass: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { oldpass, newpass, renewpass } = this.state;
    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Нууц үг солих</span>
          </p>
          <div className="user-profile-contain">
            <form>
              <div className="row row10">
                <div className="col-xl-12 pad10">
                  <div className="e-mart-input">
                    <Form.Item>
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Хуучин нууц үгээ заавал оруулна уу!"
                          }
                        ]
                      })(
                        <TextField
                          label="Хуучин нууц үг"
                          onChange={this.handleOldPass}
                          value={oldpass}
                          type={"password"}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-12 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("phone", {
                        rules: [
                          {
                            required: true,
                            message: "Шинэ нууц үгээ заавал оруулна уу!"
                          }
                        ]
                      })(
                        <TextField
                          label="Шинэ нууц үг"
                          onChange={this.handleNewPass}
                          value={newpass}
                          type={"password"}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-12 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("phone", {
                        rules: [
                          {
                            required: true,
                            message:
                              "Баталгаажуулах нууц үгээ заавал оруулна уу!"
                          }
                        ]
                      })(
                        <TextField
                          label="Нууц үг баталгаажуулах"
                          onChange={this.handleReNewPass}
                          value={renewpass}
                          type={"password"}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
            </form>
            <div className="text-right">
              <button className="btn btn-dark">
                <span className="text-uppercase" onClick={this.handleSubmit}>
                  Хадгалах
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const App = Form.create({ name: "delivery" })(Component);
export default App; */

import React from "react";
import { Form, Input, Select, Button, AutoComplete } from "antd";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];

class Component extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values.password.length);
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

export default Form.create({ name: "delivery" })(Component);
