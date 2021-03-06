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

  handleReset = () => {
    this.props.hideLoginModal();
    this.setState({ isVisibleReset: !this.state.isVisibleReset });
  };

  saveToDb = products => {
    return products.reduce((acc, next) => {
      return acc.then(() => {
        return this.props.onUpdateCart(next, true);
      });
    }, Promise.resolve());
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
        } else {
          console.log("failure", res);
          this.handleCancel();
          return;
        }
      });
    });

    this.props.handleOk();
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

            this.modifyDbAndRedux(customer);
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
            ]
            /* initialValue: "tulgaa@datacare.mn" */
          })(
            <input
              autoComplete="off"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="И-мэйл"
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
            ]
            /* initialValue: "123123" */
          })(
            <input
              type="password"
              autoComplete="off"
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
                <label className="custom-control-label" htmlFor="rememberMe">
                  Сануулах
                </label>
              </div>
            </div>
            <div className="col-xl-6 pad10">
              <div className="text-right">
                <Link
                  to=""
                  className="btn btn-link"
                  onClick={this.props.handleReset}
                >
                  Нууц үгээ мартсан
                </Link>
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
        updateCart
      }
    )(LoginModal)
  )
);
