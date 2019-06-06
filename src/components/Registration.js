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
    console.log(values);
    this.setState({ loading: true });
    let res = await this.props.register(values);
    if (res.success) {
      message.success("bolson shuu");
      this.setState({ loading: false });
    } else {
      message.error("boloogui shuu");
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
          phonE1: values.phoneE1.toString(),
          phonE2: "0"
        };
        this.register(data);
        /* try {
          res = this.props.register(data);
          if (res.status === "failed") {
            message.error(res.message);
            this.setState({ isLoading: false });
          } else {
            this.props.handleOk();
            message.success("Амжилттай бүртгүүллээ. Имэйлээ шалгана уу");
            return <Redirect to="/" />;
          }
        } catch (err) {
          console.log(err);
          message.error(err.message);
          this.setState({ isLoading: false });
        } */
      }
    });
  };

  register = async values => {
    this.setState({ loading: true });
    values.phonE1 = values.phone;
    values.phonE2 = 0;
    let res = await this.props.register(values);
    if (res.success) {
      message.success(res.message);
      this.setState({ loading: false });
    } else {
      message.error(res.message);
      this.setState({ loading: false });
    }
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
    console.log("ene yu we?", this.props);
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
                    message: "Овогоо бичнэ үү!"
                  },
                  {
                    min: 4,
                    message: "Хамгийн багадаа 4 үсэг байна."
                  },
                  {
                    max: 99,
                    message: "Хамгийн ихтэй 99 үсэг байна."
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
                    message: "Нэрээ бичнэ үү!"
                  },
                  {
                    min: 4,
                    message: "Хамгийн багадаа 4 үсэг байна."
                  },
                  {
                    max: 99,
                    message: "Хамгийн ихтэй 99 үсэг байна."
                  }
                ]
              })(<Input placeholder="Нэр" className="form-control" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Имэйлээ бичнэ үү!"
                  },
                  {
                    type: "email",
                    message: "Бодитой мэйл хаяг бичнэ үү!"
                  }
                ]
              })(<Input placeholder="И мэйл хаяг" className="form-control" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("phoneE1", {
                rules: [
                  {
                    required: true,
                    message: "Утасны дугаараа бичнэ үү!"
                  },
                  {
                    min: 8,
                    message: "Утасны дугаар 8 оронтой байна."
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Утас нь зөвхөн тоо байна"
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
                    message: "Нууц үгээ бичнэ үү!"
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
                  placeholder="Шинэ нууц үг"
                  className="form-control"
                />
              )}
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
            <button
              type="submit"
              className="btn btn-block btn-social btn-emart"
            >
              Имарт картаар бүртгүүлэх
            </button>
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
