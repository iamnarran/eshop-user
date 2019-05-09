import React from "react";
import { connect } from "react-redux";
import { Modal, Button, message } from "antd";
import { Link, Redirect } from "react-router-dom";
import { createForm } from "rc-form";

import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import actions, {
  setUser,
  showLoginModal,
  hideLoginModal
} from "../actions/login";
import RegisterModal from "./RegisterModal";
import storage from "../utils/storage";
import withCart from "./HOC/withCart";

class LoginModal extends React.Component {
  state = {
    shouldRedirect: false,
    isLoading: false,
    isRegisterModalVisible: false
  };

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

  handleSocialSuccess = () => {
    this.handleOk();
    this.setRedirect();
  };

  toggleRegisterModal = () => {
    this.setState({
      isRegisterModalVisible: !this.state.isRegisterModalVisible
    });
  };

  showRegisterModal = () => {
    this.setState({ isRegisterModalVisible: true });
  };

  hideRegisterModal = () => {
    this.setState({ isRegisterModalVisible: false });
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
            this.props.setUser(res.data[0].info.customerInfo);

            // this.props.cart.products.forEach(prod => {
            //   this.props.onUpdateCart(prod);
            // });

            // const qties = res.data[0].basket.map(prod => prod.qty);
            // const totalQty = qties.reduce((acc, cur) => acc + cur);

            // const prices = res.data[0].basket.map(prod => {
            //   const price =
            //     this.getUnitPrice(prod).sprice || this.getUnitPrice(prod).price;

            //   return price * prod.qty;
            // });
            // const totalPrice = prices.reduce((acc, cur) => acc + cur);

            // this.props.updateCart({
            //   products: cart.products,
            //   totalQty,
            //   totalPrice
            // });

            this.props.cart.totalQty = this.setState({ isLoading: false });
            this.handleOk();
            this.setRedirect();
          } else {
            message.error("Таны нэвтрэх нэр эсвэл нууц үг буруу байна");
            this.setState({ isLoading: false });
          }
        } catch (err) {
          console.log(err);
          message.error(err.message);
          this.setState({ isLoading: false });
        }
      }
    });
  };

  getUnitPrice = product => {
    if (product.sprice) {
      if (product.issalekg && product.kgproduct[0]) {
        // Хямдарсан бөгөөд кг-ын бараа
        return {
          price: product.kgproduct[0].salegramprice,
          sprice: product.kgproduct[0].salegramprice
        };
      }

      // Хямдарсан бараа
      return { price: product.price, sprice: product.sprice };
    }

    if (product.issalekg && product.kgproduct[0]) {
      // Хямдраагүй бөгөөд кг-ын бараа
      return { price: product.kgproduct[0].salegramprice, sprice: null };
    }

    // Хямдраагүй бараа
    return { price: product.price, sprice: null };
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
        >
          <div className="modal-body">
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
                      <Link to="" className="btn btn-link">
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

            <span className="divide-maker">Эсвэл</span>

            <FacebookLogin onFbSuccess={this.handleSocialSuccess} />
            <GoogleLogin onGoogleSuccess={this.handleSocialSuccess} />

            <div className="text-center">
              <Link
                to=""
                className="btn btn-link"
                onClick={this.showRegisterModal}
              >
                Та шинээр бүртгүүлэх бол ЭНД ДАРЖ бүртгүүлнэ үү
              </Link>
            </div>
          </div>
        </Modal>
        <RegisterModal
          onVisibilityChange={this.toggleRegisterModal}
          visible={this.state.isRegisterModalVisible}
        />
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
        hideLoginModal
      }
    )(LoginModal)
  )
);
