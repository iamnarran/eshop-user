import React from "react";
import { connect } from "react-redux";
import { Input, Form, Button, message } from "antd";
import actions from "../../actions/register";
import { EXPAND_LEFT } from "react-ladda";
@connect(
  null,
  {
    register: actions.register
  }
)
class LoginRegisterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
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
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="content-container">
          <div className="socials flex-this flex-wrap">
            <button type="submit" className="btn btn-social btn-facebook">
              <span>Facebook-р бүртгүүлэх</span>
            </button>
            <button type="submit" className="btn btn-social btn-gmail">
              <span>Gmail-р бүртгүүлэх</span>
            </button>
          </div>
          <span className="divide-maker">Эсвэл</span>
          <Form onSubmit={this.onSubmit}>
            <div className="row row10">
              <div className="col-xl-6 pad10">
                <Form.Item>
                  {getFieldDecorator("firstname", {
                    rules: [
                      {
                        required: true,
                        message: "Овог оруулна уу ?"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="Овог*"
                      className="form-control"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="col-xl-6 pad10">
                <Form.Item>
                  {getFieldDecorator("lastname", {
                    rules: [
                      {
                        required: true,
                        message: "Нэр оруулна уу ?"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="Нэр*"
                      className="form-control"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="col-xl-12 pad10">
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "И мэйл оруулна уу ?"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="И мэйл*"
                      className="form-control"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="col-xl-6 pad10">
                <Form.Item>
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "Утас оруулна уу ?"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="Утас*"
                      className="form-control"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="col-xl-12 pad10">
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Нууц үг оруулна уу ?"
                      }
                    ]
                  })(
                    <Input
                      type="password"
                      placeholder="Нууц үг*"
                      className="form-control"
                    />
                  )}
                </Form.Item>
              </div>
            </div>
            <Button
              className="btn btn-login text-uppercase"
              loading={this.state.loading}
              size={"large"}
              data-style={EXPAND_LEFT}
              htmlType="submit"
            >
              Бүртгүүлэх
            </Button>
            {/*  <button
              className="btn btn-dark btn-bigger"
              loading={this.state.loading}
              data-style={EXPAND_LEFT}
              type="submit"
            >
              <span className="text-uppercase">Бүртгүүлэх</span>
            </button> */}
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "checkoutregister" })(LoginRegisterPanel);
