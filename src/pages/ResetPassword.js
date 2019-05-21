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
      loading: false
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
              this.handleNotify("Амжилттай нууц үг солигдлоо.");
              this.props.history.push("/");
            } else {
              this.handleNotify("Оролдлого амжилтгүй.");
            }
          });
      }
    });
  };
  render() {
    console.log("props", this.props);
    const { staticInfo } = this.props.container;
    const { getFieldDecorator } = this.props.form;
    console.log("id", this.props.match.params.id);
    return (
      <div className="top-container">
        <div className="section">
          <div className="col-md-12">
            <center>
              <div
                className="logo"
                style={{ width: "15%", marginBottom: "5%" }}
              >
                <img
                  style={{ width: "100%" }}
                  alt="logo"
                  src={IMAGE + staticInfo.logopath}
                />
              </div>
              <h2>Нууц үг сэргээх</h2>
              <p>Та нууц үгээ оруулна уу!</p>
              <div className="col-md-4">
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
        </div>
      </div>
    );
  }
}
const App = Form.create({ name: "delivery" })(ResetPassword);
export default App;
