import React from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Button, AutoComplete, message } from "antd";
import api from "../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

  errorMsg = txt => {
    /* MySwal.hideLoading(); */
    MySwal.fire({
      timer: 1500,
      type: "error",
      text: txt,
      animation: false,
      width: "25rem",
      showConfirmButton: false,
      confirmButtonColor: "#feb415"
    });
  };

  successMsg = txt => {
    /* MySwal.hideLoading(); */
    MySwal.fire({
      timer: 1500,
      type: "success",
      title: "Амжилттай",
      text: txt,
      animation: false,
      width: "25rem",
      showConfirmButton: false,
      confirmButtonColor: "#feb415"
    });
  };

  changePass = async user => {
    const params = {
      email: this.props.user.email,
      oldPass: user.oldPassword,
      NewPass: user.password
    };

    await api.customer.passreset(params).then(res => {
      if (res.success) {
        this.successMsg("Нууц үг амжилттай солигдлоо.");
        this.props.form.resetFields();
        /*  this.props.history.push("/userprofile"); */
      } else {
        message.success(res.message);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let temp = [];
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
                    },
                    {
                      min: 4,
                      message: "Нууц үг хамгийн багадаа 4 оронтой байна."
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
                    },
                    {
                      min: 4,
                      message: "Нууц үг хамгийн багадаа 4 оронтой байна."
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
                <button className="btn btn-dark" onClick={this.handleSubmit}>
                  <span className="text-uppercase">Хадгалах</span>
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
