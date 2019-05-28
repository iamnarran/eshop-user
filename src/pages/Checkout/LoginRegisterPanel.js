import React from "react";
import { connect } from "react-redux";
import { Input, Form, Button, message, Tabs } from "antd";
import actions from "../../actions/register";
import { EXPAND_LEFT } from "react-ladda";
import Swal from "sweetalert2";
import { css } from "glamor";
import withReactContent from "sweetalert2-react-content";
import SwalModals from "./SwalModals";
import storage from "../../utils/storage";
import api from "../../api";
import actionsreg, { setUser } from "../../actions/login";
import { toast } from "react-toastify";
import { updateCart } from "../../actions/cart";

const TabPane = Tabs.TabPane;
const MySwal = withReactContent(Swal);

@connect(
  mapStateToProps,
  {
    setUser: setUser,
    register: actions.register,
    login: actionsreg.login,
    updateCart
  }
)
class LoginRegisterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      defaultActiveKey: 1
    };
  }

  saveToDb = products => {
    return products.reduce((acc, next) => {
      return acc.then(() => {
        return this.props.onUpdateCart(next, true);
      });
    }, Promise.resolve());
  };

  agreementApprove = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.register(values);
      }
    });

    MySwal.close();
  };

  toRegister = () => {
    this.setState({ defaultActiveKey: 2 });
  };

  agreementCancel = e => {
    e.preventDefault();
    MySwal.close();
  };

  openAgreement = () => {
    MySwal.fire({
      html: (
        <SwalModals
          type={"agreement"}
          agreementApprove={this.agreementApprove}
          agreementCancel={this.agreementCancel}
        />
      ),
      width: "38em",
      animation: false,
      button: false,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      showCloseButton: true,
      allowOutsideClick: false,
      closeOnEsc: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.openAgreement();
      }
    });
  };

  modifyDbAndRedux = async user => {
    await this.props.setUser(user);
    let productsInCart = this.props.cart.products;
    this.saveToDb(productsInCart).then(() => {
      api.cart.findAllProducts({ custid: user.id }).then(res => {
        if (res.success) {
          const products = res.data;

          let totalQty = 0;
          let totalPrice = 0;
          if (products.length) {
            const qties = products.map(prod => prod.qty);
            totalQty = qties.reduce((acc, cur) => acc + cur);

            const prices = products.map(prod => {
              const price =
                this.props.getUnitPrice(prod).sprice ||
                this.props.getUnitPrice(prod).price;

              return price * prod.qty;
            });
            totalPrice = prices.reduce((acc, cur) => acc + cur);
          }

          this.props.updateCart({
            products,
            totalQty,
            totalPrice
          });
        }
      });
    });
  };

  handleNotify = message =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });

  onSubmitLogin = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, form) => {
      this.setState({ isLoading: true });
      try {
        let tmp = {
          email: form.email,
          password: form.password
        };
        const res = await this.props.login(tmp);
        if (res.success) {
          storage.set("access_token", res.data[0].info.access_token);

          let customer = res.data[0].info.customerInfo;
          customer.token = res.data[0].info.access_token;
          //this.modifyDbAndRedux(customer);
        } else {
          this.handleNotify(res.message);
        }
      } catch (err) {
        console.log(err);
        this.handleNotify(err.message);
        this.setState({ isLoading: false });
      }

      this.setState({ isLoading: false });
    });
  };

  changeTab = e => {
    this.setState({ defaultActiveKey: e });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Tabs
        onChange={this.changeTab}
        defaultActiveKey={"1"}
        activeKey={this.state.defaultActiveKey.toString()}
        className="checkout-reg-tab"
      >
        <TabPane
          tab={
            <div className="flex-this center">
              <img
                alt="icon"
                width="40px"
                height="40px"
                src={require("../../scss/assets/images/demo/login.png")}
              />
              <p className="text">
                <strong>{"Нэвтрэх"}</strong>
              </p>
            </div>
          }
          key={1}
        >
          <div className="content-container">
            <Form onSubmit={this.onSubmitLogin}>
              <div className="row row10">
                <div className="offset-md-3 col-md-6 pad10">
                  <Form.Item style={{ marginBottom: "10px" }}>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Имэйл уу ?"
                        }
                      ]
                    })(
                      <Input
                        type="text"
                        placeholder="Имэйл*"
                        className="form-control"
                      />
                    )}
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "10px" }}>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Нууц үг уу ?"
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
                  <Button
                    className="btn btn-login text-uppercase"
                    loading={this.state.loading}
                    size={"large"}
                    data-style={EXPAND_LEFT}
                    htmlType="submit"
                  >
                    Нэвтрэх
                  </Button>
                  <label style={{ float: "right" }}>
                    <a>Нууц үгээ мартсан</a>
                  </label>
                  <button
                    type="submit"
                    className="btn btn-social btn-facebook"
                    style={{ width: "100%", marginTop: "5px" }}
                  >
                    <span>Facebook-р нэвтрэх</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-social btn-gmail"
                    style={{ width: "100%" }}
                  >
                    <span>Gmail-р нэвтрэх</span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </TabPane>
        <TabPane
          tab={
            <div className="flex-this center">
              <img
                alt="icon"
                width="40px"
                height="40px"
                src={require("../../scss/assets/images/demo/user.png")}
              />
              <p className="text">
                <strong>{"Бүртгүүлэх"}</strong>
              </p>
            </div>
          }
          key={2}
        >
          <div className="content-container">
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
                <div className="col-xl-6 pad10">
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
                <div className="col-xl-6 pad10">
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
                <div className="col-xl-6 pad10">
                  <Form.Item>
                    {getFieldDecorator("confirmpassword", {
                      rules: [
                        {
                          required: true,
                          message: "Нууц үг оруулна уу ?"
                        }
                      ]
                    })(
                      <Input
                        type="password"
                        placeholder="Нууц үг давт*"
                        className="form-control"
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row row10">
                <Button
                  className="btn btn-login text-uppercase"
                  loading={this.state.loading}
                  size={"large"}
                  data-style={EXPAND_LEFT}
                  htmlType="submit"
                  style={{ padding: "5px 50px", marginLeft: "17em" }}
                >
                  Бүртгүүлэх
                </Button>
              </div>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default Form.create({ name: "checkoutregister" })(LoginRegisterPanel);
