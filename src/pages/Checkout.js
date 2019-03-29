import React from "react";
import { connect } from "react-redux";
import { Collapse, Icon, Tabs, Radio, Input, Form, Select } from "antd";
import storage from "../utils/storage";
import api from "../api";
import instant from "../scss/assets/images/demo/1.png";
import simple from "../scss/assets/images/demo/1.png";
import visit from "../scss/assets/images/demo/1.png";
import LoginModal from "../components/LoginModal";
const Option = Select.Option;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(mapStateToProps)
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      collapse: [],
      collapseKey: [],
      collapseType: null,
      activeKey: ["1"],
      userInfo: [],
      userAddress: [],
      delivery: [],
      defaultAddress: "",
      chosenDelivery: [],
      chosenPayment: [],
      chosenBankInfo: [],
      cardno: null,
      chosenPlusRadio: 1,
      isLoginModalVisible: false
    };
  }

  componentWillMount() {
    const { deliveryTypes, paymentTypes } = this.props.container;
    if (this.props.isLoggedIn == true) {
      this.getUserInfo(this.props.user);
    }

    let cart = storage.get("cart")
      ? storage.get("cart")
      : { products: [], totalQty: 0, totalPrice: 0 };
    this.setState({
      products: cart,
      delivery: deliveryTypes[0],
      chosenPayment: paymentTypes[0]
    });
  }

  toggleLoginModal = e => {
    e.preventDefault();
    this.setState({ isLoginModalVisible: !this.state.isLoginModalVisible });
  };

  showLoginModal = e => {
    e.preventDefault();
    this.setState({ isLoginModalVisible: true });
  };

  getUserInfo = async user => {
    await api.checkout.findUserData({ id: user.id }).then(res => {
      if (res.success == true) {
        res.data.addrs.map((item, i) => {
          if (item.ismain == 1) {
            this.setState({ defaultAddress: item });
          }
        });
        this.setState({
          userInfo: res.data.info,
          userAddress: res.data.addrs,
          cardno: res.data.cardno
        });
      }
    });
  };

  changeRadio = e => {
    const { paymentTypes } = this.props.container;
    if (paymentTypes !== 0) {
      paymentTypes.map((item, i) => {
        if (item.id == e.target.id) {
          this.setState({ chosenPayment: item });
        }
      });
    }
  };

  paymentType = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-credit-card" aria-hidden="true" />
            <span>Төлбөрийн төрөл</span>
          </a>
        </h5>
      </div>
    );
  };

  optionType = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-plus-square" aria-hidden="true" />
            <span>Нэмэлт сонголт</span>
          </a>
        </h5>
      </div>
    );
  };

  renderAddrsOption = () => {
    const { userAddress } = this.state;
    let tmp;
    if (userAddress.length !== 0) {
      tmp = userAddress.map((item, i) => {
        return (
          <Option key={i} value={item.id}>
            {item.address}
          </Option>
        );
      });
    }
    return tmp;
  };

  customerTab = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-user" aria-hidden="true" />
            <span>Хэрэглэгчээр бүртгүүлэх</span>
          </a>
        </h5>
        <div className="title-button text-right">
          {/* <p className="text">Бүртгэлтэй бол:</p> */}
          <a onClick={this.showLoginModal} className="btn btn-gray solid">
            <span className="text-uppercase">Нэвтрэх</span>
          </a>
        </div>
      </div>
    );
  };

  deliveryInfo = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-credit-card" aria-hidden="true" />
            <span>Хүргэлтийн төрөл</span>
          </a>
        </h5>
      </div>
    );
  };

  callback = key => {
    this.setState({
      activeKey: key
    });
  };

  plusRadioChanged = e => {
    this.setState({ chosenPlusRadio: e.target.id });
  };

  onSubmit = e => {
    e.preventDefault();
    const { defaultAddress } = this.state;
    let tmp = [];
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (e.target.name == "delivery") {
          tmp.push("3");
          if (values.address == defaultAddress.address) {
            values.address = defaultAddress.id;
          }
          this.setState({ chosenDelivery: values });
        } else if (e.target.name == "payment") {
          tmp.push("4");
        }

        this.setState({
          collapseType: e.target.name,
          activeKey: tmp
        });
      } else {
        console.log("error");
      }
    });
  };

  changeTab = e => {
    const { deliveryTypes } = this.props.container;
    deliveryTypes.map((item, i) => {
      if (item.id == e) {
        this.setState({ delivery: item });
      }
    });
  };

  renderPaymentTypes = () => {
    const { paymentTypes } = this.props.container;
    let tmp;
    if (paymentTypes.length !== 0) {
      tmp = paymentTypes.map((item, i) => {
        return (
          <label className="card radio-card" key={i}>
            <div className="radio-button-container">
              <input
                className="form-check-input radio-button"
                type="radio"
                name="paymentRadios"
                defaultChecked={item.id == 1 ? true : false}
                id={item.id}
                onChange={this.changeRadio}
              />
            </div>
            <h5 className="title radio-button-title">
              <i className={item.imgnm} aria-hidden="true" />
              <p>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </p>
            </h5>
          </label>
        );
      });
    }

    return tmp;
  };

  renderBankInfo = () => {
    const { bankInfo } = this.props.container;
    let tmp;
    if (bankInfo !== 0) {
      tmp = bankInfo.map((item, i) => {
        return (
          <RadioButton value={item.bankid} key={i}>
            {item.banknm}
          </RadioButton>
        );
      });
    }
    return tmp;
  };

  bankRadioChange = e => {
    const { bankInfo } = this.props.container;
    if (bankInfo.length !== 0) {
      bankInfo.map((item, i) => {
        if (item.bankid == e.target.value) {
          this.setState({ chosenBankInfo: item });
        }
      });
    }
  };

  generateNoat = (total, deliver) => {
    let noat = ((total + deliver) / 110) * 10;
    return noat.toFixed(2);
  };

  render() {
    const {
      userInfo,
      delivery,
      userAddress,
      defaultAddress,
      chosenPayment,
      products,
      cardno,
      chosenPlusRadio
    } = this.state;
    const deliver1 = delivery == [] ? 0 : delivery.price;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="section section-gray">
        <div className="container pad10">
          <div className="checkout-container">
            <div className="btn btn-gray">
              <i className="fa fa-chevron-left" aria-hidden="true">
                {" "}
              </i>
              <span className="text-uppercase">Захиалга засах</span>
            </div>
            <div className="row row10">
              <div className="col-lg-8 pad10">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <Collapse
                        accordion
                        activeKey={this.state.activeKey}
                        onChange={this.callback}
                      >
                        {userInfo.length == 0 ? (
                          <Panel
                            showArrow={false}
                            header={this.customerTab()}
                            key="1"
                          >
                            <div>
                              <div className="content-container">
                                <div className="socials flex-this flex-wrap">
                                  <button
                                    type="submit"
                                    className="btn btn-social btn-facebook"
                                  >
                                    <span>Facebook-р бүртгүүлэх</span>
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-social btn-gmail"
                                  >
                                    <span>Gmail-р бүртгүүлэх</span>
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-social btn-emart"
                                  >
                                    <span>Имарт картаар бүртгүүлэх</span>
                                  </button>
                                </div>
                                <span className="divide-maker">Эсвэл</span>
                                <form>
                                  <button
                                    type="submit"
                                    className="btn btn-dark btn-bigger"
                                  >
                                    <span className="text-uppercase">
                                      Бүртгүүлэх
                                    </span>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </Panel>
                        ) : (
                          ""
                        )}

                        <Panel
                          header={this.deliveryInfo()}
                          showArrow={false}
                          key="2"
                        >
                          <Tabs onChange={this.changeTab}>
                            {this.props.container.deliveryTypes.map(
                              (item, i) => {
                                return (
                                  <TabPane
                                    tab={
                                      <div className="flex-this center">
                                        <img alt="icon" src={instant} />
                                        <p className="text">
                                          <strong>{item.typenm}</strong>
                                          <span>{item.price + "₮"}</span>
                                        </p>
                                      </div>
                                    }
                                    key={item.id}
                                  >
                                    <div
                                      className="tab-pane active"
                                      id="home"
                                      role="tabpanel"
                                      aria-labelledby="home-tab"
                                    >
                                      <p className="text">
                                        Энийг хүргэлт (48 цагийн дотор) - 89,000
                                        төгрөгнөөс дээш бараа авсан тохиолдолд
                                        үнэгүй
                                      </p>
                                      <Form
                                        onSubmit={this.onSubmit}
                                        name="delivery"
                                      >
                                        <div className="row row10">
                                          {item.id != 3 ? (
                                            <div className="col-xl-12 pad10">
                                              <div className="form-group">
                                                <Form.Item>
                                                  {getFieldDecorator(
                                                    "address",
                                                    {
                                                      initialValue:
                                                        defaultAddress.address,
                                                      rules: [
                                                        {
                                                          required: true,
                                                          message:
                                                            "Хаяг оруулна уу"
                                                        }
                                                      ]
                                                    }
                                                  )(
                                                    <Select
                                                      placeholder="Хаягаа сонгоно уу ?"
                                                      size="large"
                                                    >
                                                      {this.renderAddrsOption()}
                                                    </Select>
                                                  )}
                                                </Form.Item>
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          )}

                                          <div className="col-xl-6 pad10">
                                            <div className="form-group">
                                              <Form.Item>
                                                {getFieldDecorator("lastName", {
                                                  rules: [
                                                    {
                                                      required: true,
                                                      message: "Овог оруулна уу"
                                                    }
                                                  ]
                                                })(
                                                  <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Овог*"
                                                  />
                                                )}
                                              </Form.Item>
                                            </div>
                                          </div>

                                          <div className="col-xl-6 pad10">
                                            <div className="form-group">
                                              <Form.Item>
                                                {getFieldDecorator("phone", {
                                                  rules: [
                                                    {
                                                      required: true,
                                                      message: "Утас оруулна уу"
                                                    }
                                                  ]
                                                })(
                                                  <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Утас*"
                                                  />
                                                )}
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="text-right">
                                          <button
                                            className="btn btn-main"
                                            name="delivery"
                                            type="submit"
                                          >
                                            Дараах
                                          </button>
                                        </div>
                                      </Form>
                                    </div>
                                  </TabPane>
                                );
                              }
                            )}
                          </Tabs>
                        </Panel>
                        <Panel
                          header={this.paymentType()}
                          showArrow={false}
                          key="3"
                          disabled={
                            this.state.collapseType === "delivery" ||
                            this.state.collapseType === "payment"
                              ? false
                              : true
                          }
                        >
                          <Form onSubmit={this.onSubmit} name="payment">
                            <div className="content-container">
                              {this.renderPaymentTypes()}
                              {chosenPayment.id == 1 ? (
                                <RadioGroup
                                  buttonStyle="solid"
                                  defaultValue={1}
                                  size="large"
                                  onChange={this.bankRadioChange}
                                >
                                  {this.renderBankInfo()}
                                </RadioGroup>
                              ) : (
                                ""
                              )}
                            </div>
                            <hr />
                            <div className="text-right">
                              <button
                                className="btn btn-main"
                                name="payment"
                                type="submit"
                              >
                                Дараах
                              </button>
                            </div>
                          </Form>
                        </Panel>
                        <Panel
                          header={this.optionType()}
                          showArrow={false}
                          key="4"
                          disabled={
                            this.state.collapseType === "payment" ? false : true
                          }
                        >
                          <div className="content-container payment">
                            <p className="title">
                              <strong>НӨАТ</strong>
                            </p>
                            <div className="hand-pay flex-this">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  defaultChecked
                                  name="plusRadios"
                                  id="1"
                                  onChange={this.plusRadioChanged}
                                />
                                <label className="form-check-label">
                                  Хувь хүн
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="plusRadios"
                                  id="2"
                                  onChange={this.plusRadioChanged}
                                />
                                <label className="form-check-label">
                                  Байгууллага
                                </label>
                              </div>
                            </div>
                            {chosenPlusRadio == 2 ? (
                              <form>
                                <div className="row row10">
                                  <div className="col-xl-6 pad10">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Байгууллагын регистэр"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button className="btn btn-gray solid">
                                  <span className="text-uppercase">
                                    Ашиглах
                                  </span>
                                </button>
                                <button className="btn btn-main solid">
                                  <span className="text-uppercase">Холбох</span>
                                </button>
                                <button className="btn ">
                                  <span className="text-uppercase">Засах</span>
                                </button>
                              </form>
                            ) : (
                              ""
                            )}
                            {cardno == null ? (
                              <div>
                                <p className="title">
                                  <strong>Имарт картаа холбох</strong>
                                </p>
                                <form>
                                  <div className="row row10">
                                    <div className="col-xl-6 pad10">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Картын дугаар"
                                        />
                                        <input
                                          type="password"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Нууц үг"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-gray solid"
                                  >
                                    <span className="text-uppercase">
                                      Холбох
                                    </span>
                                  </button>
                                </form>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pad10">
                <div className="block right-panel">
                  {" "}
                  <p className="title">
                    <strong>
                      {userInfo.length == 0
                        ? ""
                        : userInfo.lastname + " " + userInfo.firstname}
                    </strong>
                  </p>
                  <hr />
                  <div className="content">
                    <p className="title">
                      <strong>Хүргэлтийн мэдээлэл</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Хүргэлтийн төрөл</span>
                      <strong>{delivery == [] ? "" : delivery.typenm}</strong>
                    </p>
                    <p className="text flex-this">
                      <i className="fa fa-user" aria-hidden="true" />
                      <span>
                        {userInfo.length == 0
                          ? ""
                          : userInfo.lastname + " " + userInfo.firstname}
                      </span>
                    </p>
                    <p className="text flex-this">
                      <i className="fa fa-phone" aria-hidden="true" />
                      <span>{userInfo.length == 0 ? "" : userInfo.phone}</span>
                    </p>
                    <p className="text flex-this">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                      <span>
                        Улаанбаатар хот, Баянзүрх дүүрэг, 17 хороо, 35-р байр, 5
                        давхар, 37 тоот, код - 8759
                      </span>
                    </p>
                  </div>
                  <hr />
                  <div className="content">
                    <p className="title">
                      <strong>Төлөх дүн</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Бараа ({products.totalQty}):</span>
                      <strong>{products.totalPrice}₮</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Хүргэлтийн үнэ:</span>
                      <strong>{deliver1}₮</strong>
                    </p>
                    <hr />
                    <p className="text flex-space">
                      <span>Нийт дүн:</span>
                      <strong>{products.totalPrice + deliver1}₮</strong>
                    </p>
                    <p className="text flex-space">
                      <span>НӨАТ:</span>
                      <strong>
                        {this.generateNoat(products.totalPrice, deliver1)}₮
                      </strong>
                    </p>
                    <p className="text text-center">
                      <span>89,000₮-с дээш бол хүргэлт үнэгүй</span>
                    </p>
                    <a href="#" className="btn btn-main btn-block">
                      <span className="text-uppercase">Тооцоо хийх</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoginModal
          onVisibilityChange={this.toggleLoginModal}
          visible={this.state.isLoginModalVisible}
        />
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

export default Form.create({ name: "checkout" })(Checkout);
