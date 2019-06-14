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
import Login from "./Login";

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
  };

  handleCancelReset = () => {
    this.setState({ isVisibleReset: !this.state.isVisibleReset });
  };

  handleSubmit = e => {
    e.preventDefault();
    api.customer.checkmail({ email: this.state.mail }).then(res => {
      if (res.success) {
        this.handleNotify("Та мэйл хаягаа шалгана уу");
        this.timer = setTimeout(() => this.handleCancelReset(), 1000);
      } else {
        this.handleNotify("Таны оруулсан мэйл буруу байна");
      }
    });
  };

  onChangeMail = e => {
    this.setState({ mail: e.target.value });
  };

  handleSocialSuccess = () => {
    this.handleOk();
    this.setRedirect();
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

    this.handleOk();
  };

  showRegisterModal = async => {
    this.props.showRegisterModal();
    this.handleCancel();
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
          <Login handleOk={this.handleOk} handleReset={this.handleReset} />

          <span className="divide-maker">Эсвэл</span>

          <FacebookLogin onSuccess={user => this.modifyDbAndRedux(user)} />
          <GoogleLogin onGoogleSuccess={this.handleSocialSuccess} />

          <div className="text-center">
            <Link
              to=""
              className="btn btn-link"
              onClick={this.showRegisterModal}
              /* onClick={this.props.showRegisterModal} */
            >
              Та шинээр бүртгүүлэх бол ЭНД ДАРЖ бүртгүүлнэ үү
            </Link>
          </div>
        </Modal>
        <Modal
          title="Нууц үг сэргээх"
          visible={this.state.isVisibleReset}
          onCancel={this.handleCancelReset}
          footer={[]}
        >
          <form onSubmit={this.handleSubmit}>
            <div>
              <Input
                placeholder="И-мэйл хаягаа оруулна уу"
                onChange={this.onChangeMail}
              />
            </div>
            <a
              className="btn btn-dark"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={this.handleSubmit}
            >
              <span className="text-uppercase">Цааш</span>
            </a>
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
