import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Input } from "antd";
import { Link, Redirect } from "react-router-dom";
import { createForm } from "rc-form";
import { css } from "glamor";

import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import actions, {
  setUser,
  showLoginModal,
  hideLoginModal
} from "../actions/login";
import { showRegisterModal } from "../actions/register";
import { updateCart } from "../actions/cart";
import withCart from "./HOC/withCart";
import storage from "../utils/storage";
import api from "../api";
import { toast } from "react-toastify";

class LoginModal extends React.Component {
  state = {
    shouldRedirect: false,
    isLoading: false,
    isVisibleReset: false,
    mail: ""
  };

  handleNotify = message =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });

  renderRedirect = () => {
    if (this.state.shouldRedirect) {
      return <Redirect to="/userprofile" />;
    }
  };

  setRedirect = () => {
    this.setState({ shouldRedirect: true });
  };

  handleOk = () => {
    this.props.hideLoginModal();
  };

  handleCancel = () => {
    this.props.hideLoginModal();
  };

  handleReset = () => {
    this.props.hideLoginModal();
    this.setState({ isVisibleReset: !this.state.isVisibleReset });
    console.log("reset");
  };

  handleOkReset = () => {
    this.setState({ isVisibleReset: !this.state.isVisibleReset });
  };

  handleCancelReset = () => {
    this.setState({ isVisibleReset: !this.state.isVisibleReset });
  };

  handleSubmit = () => {
    console.log("handle email", this.state.mail);
    this.handleNotify("Таны оруулсан мэйл буруу байна");
  };

  onChangeMail = e => {
    this.setState({ mail: e.target.value });
  };

  handleSocialSuccess = () => {
    this.handleOk();
    this.setRedirect();
  };

  handleLoggedInUser = user => {
    this.props.setUser(user);

    let productsInCart = this.props.cart.products;

    if (productsInCart.length) {
      productsInCart.forEach(prodInCart => {
        this.props.onUpdateCart(prodInCart, true);
      });
    }

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
      } else {
        console.log("failure", res);
        this.handleCancel();
        return;
      }
    });

    this.handleOk();
  };

  _submit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (error, form) => {
      if (!error) {
        this.setState({ isLoading: true });

        try {
          const res = await this.props.login(form);

          if (res.success) {
            storage.set("access_token", res.data[0].info.access_token);

            let customer = res.data[0].info.customerInfo;
            customer.token = res.data[0].info.access_token;

            this.handleLoggedInUser(customer);

            //   if (products.length) {
            //     products.forEach(prod => {
            //       const found = savedProducts.find(
            //         savedProd => savedProd.cd === prod.cd
            //       );

            //       if (found) {
            //         found.qty += prod.qty;
            //         this.props.onUpdateCart(found, true);
            //       } else {
            //         this.props.onUpdateCart(prod, true);
            //       }
            //     });

            //     api.cart.findAllProducts({ custid: customer.id }).then(res => {
            //       if (res.success) {
            //         console.log("success", res);
            //       } else {
            //         console.log("failure", res);
            //       }
            //     });
            //   } else {
            //     products = res.data[0].basket;
            //   }

            //   const qties = products.map(prod => prod.qty);
            //   const totalQty = qties.reduce((acc, cur) => acc + cur);

            //   const prices = products.map(prod => {
            //     const price =
            //       this.props.getUnitPrice(prod).sprice ||
            //       this.props.getUnitPrice(prod).price;

            //     return price * prod.qty;
            //   });
            //   const totalPrice = prices.reduce((acc, cur) => acc + cur);

            //   this.props.updateCart({
            //     products,
            //     totalQty,
            //     totalPrice
            //   });

            //   this.props.cart.totalQty = this.setState({ isLoading: false });
            //   this.handleOk();
            //   this.setRedirect();
            // } else {
            //   this.handleNotify("Таны нэвтрэх нэр эсвэл нууц үг буруу байна");
          } else {
            this.handleNotify(res.message);
          }
        } catch (err) {
          console.log(err);
          this.handleNotify(err.message);
          this.setState({ isLoading: false });
        }

        this.setState({ isLoading: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {this.renderRedirect()}
        <Modal
          title="Нэвтрэх"
          visible={this.props.isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[]}
        >
          <form onSubmit={this._submit}>
            <div className="form-group">
              <label htmlFor="email" className="sr-only">
                Имэйл
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
                Нууц үг
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
                      id="rememberMe"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="rememberMe"
                    >
                      Сануулах
                    </label>
                  </div>
                </div>
                <div className="col-xl-6 pad10">
                  <div className="text-right">
                    <a className="btn btn-link" onClick={this.handleReset}>
                      Нууц үгээ мартсан
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="primary"
              className="btn btn-block btn-login text-uppercase"
              htmlType="submit"
            >
              Нэвтрэх
            </Button>
          </form>

          <span className="divide-maker">Эсвэл</span>

          <FacebookLogin onSuccess={user => this.handleLoggedInUser(user)} />
          <GoogleLogin onGoogleSuccess={this.handleSocialSuccess} />

          <div className="text-center">
            <Link
              to=""
              className="btn btn-link"
              onClick={this.props.showRegisterModal}
            >
              Та шинээр бүртгүүлэх бол ЭНД ДАРЖ бүртгүүлнэ үү
            </Link>
          </div>
        </Modal>
        <Modal
          title="Нууц үг сэргээх"
          visible={this.state.isVisibleReset}
          onOk={this.handleOkReset}
          onCancel={this.handleCancelReset}
          footer={[
            <a
              className="btn btn-dark"
              style={{ width: "100%" }}
              onClick={this.handleSubmit}
            >
              <span className="text-uppercase">Цааш</span>
            </a>
          ]}
        >
          <form>
            <div>
              <Input
                placeholder="И-мэйл хаягаа оруулна уу"
                onChange={this.onChangeMail}
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isVisible: state.auth.isLoginModalVisible,
    cart: state.cart
  };
};

export default withCart(
  createForm()(
    connect(
      mapStateToProps,
      {
        login: actions.login,
        setUser,
        showLoginModal,
        hideLoginModal,
        showRegisterModal,
        updateCart
      }
    )(LoginModal)
  )
);
