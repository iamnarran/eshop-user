import React from "react";
import api from "../api";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { IMAGE } from "../utils/consts";
import { toast } from "react-toastify";
import { css } from "glamor";
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isShow: []
    };
  }

  handleNotify = message =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });

  componentWillMount() {
    console.log("res");
    api.customer
      .putchangepass({
        id: this.props.match.params.id,
        password: "1234"
      })
      .then(res => {
        this.setState({ isShow: res });
        if (res.success) {
        } else {
          this.props.history.push("/");
        }
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        api.customer
          .putchangepass({
            id: this.props.match.params.id,
            password: values.password
          })
          .then(res => {
            if (res.success) {
              this.handleNotify("Нууц үг амжилттай солигдоо.");
              this.props.history.push("/");
            } else {
              this.handleNotify("Нууц үг солих амжилтгүй");
            }
          });
      }
    });
  };
  render() {
    const { staticInfo } = this.props.container;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="top-container">
        <div className="section">
          {this.state.res.success ? (
            <div className="col-md-12">
              <center>
                <div className="content">
                  <div className="text-center">
                    <img
                      alt="image"
                      src={IMAGE + staticInfo.logopath}
                      width="150px"
                    />
                    <h4 className="title">
                      <span className="text-uppercase">НУУЦ ҮГ СЭРГЭЭХ</span>
                    </h4>
                    <p>Та нууц үгээ оруулна уу!</p>
                  </div>
                </div>
                <div className="col-xl-2">
                  <Form onSubmit={this.handleSubmit} className="login-form">
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
                  </Form>
                  <div>
                    <button
                      className="btn btn-dark"
                      style={{ width: "100%" }}
                      onClick={this.handleSubmit}
                    >
                      <span className="text-uppercase">Хадгалах</span>
                    </button>
                  </div>
                </div>
              </center>
            </div>
          ) : (
            <p />
          )}
        </div>
      </div>
    );
  }
}
const App = Form.create({ name: "delivery" })(ResetPassword);
export default App;
