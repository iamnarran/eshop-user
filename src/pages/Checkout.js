import React from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Icon,
  Tabs,
  Radio,
  Input,
  Form,
  Select,
  message,
  Divider
} from "antd";
import storage from "../utils/storage";
import api from "../api";
import LoginModal from "../components/LoginModal";
import actions from "../actions/checkout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withCart from "../components/HOC/withCart";
import { IMAGE } from "../utils/consts";
const MySwal = withReactContent(Swal);
const Option = Select.Option;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const formatter = new Intl.NumberFormat("en-US");
@connect(
  mapStateToProps,
  { saveUserAddress: actions.saveUserAddress, sentPayment: actions.sentPayment }
)
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresstype: "edit",
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
      isLoginModalVisible: false,
      mainLocation: [],
      subLocation: [],
      chosenInfo: [],
      commiteLocation: [],
      companyInfo: [],
      epointcard: null,
      useEpoint: false,
      epointUsedPoint: 0
    };
  }

  componentWillMount() {
    const { deliveryTypes, paymentTypes, bankInfo } = this.props.container;
    const { cart } = this.props;
    if (this.props.isLoggedIn == true) {
      this.getUserInfo(this.props.user);
    }
    this.getMainLocation();

    this.setState({
      products: cart,
      delivery: deliveryTypes[0],
      chosenPayment: paymentTypes[0],
      chosenBankInfo: bankInfo[0]
    });
  }

  getMainLocation = async () => {
    await api.location.findAll({}).then(res => {
      if (res.success == true) {
        this.setState({ mainLocation: res.data });
      }
    });
  };

  toggleLoginModal = e => {
    // e.preventDefault();
    this.setState({ isLoginModalVisible: !this.state.isLoginModalVisible });
  };

  showLoginModal = e => {
    e.preventDefault();
    this.setState({ isLoginModalVisible: true });
  };

  getUserInfo = async user => {
    await api.checkout.findUserData({ id: user.id }).then(res => {
      if (res.success == true) {
        if (res.data.addrs.length != 0) {
          res.data.addrs.map((item, i) => {
            if (item.ismain == 1) {
              this.setState({ defaultAddress: item });
            }
          });
          this.props.form.setFieldsInitialValue({
            address: this.state.defaultAddress.id,
            mainLocation: res.data.addrs[0].provincenm,
            subLocation: res.data.addrs[0].districtnm,
            commiteLocation: res.data.addrs[0].committeenm
          });
        }

        this.props.form.setFieldsInitialValue({
          lastName: res.data.info.firstname,
          phone1: res.data.info.phone1,
          phone2: res.data.info.phone2
        });

        this.setState({
          addresstype: res.data.addrs.length === 0 ? "new" : "edit",
          userInfo: res.data.info,
          userAddress: res.data.addrs,
          epointcard: res.data.card
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

  saveCustomerCard = async e => {
    e.preventDefault();
    let cardpass = this.refs.cardpass.value;
    let cardno = this.refs.cardno.value;
    await api.checkout
      .saveCustomerCard({
        custid: this.state.userInfo.id,
        cardno: cardno,
        pincode: cardpass
      })
      .then(res => {
        if (res.success == true) {
          message.success(res.data);
        } else {
          message.error(res.data);
        }
      });
  };

  addAddress = (value, event) => {
    if (value == null) {
      this.setState({ addresstype: "new" });
      this.props.form.setFieldsInitialValue({
        address: "",
        mainLocation: "",
        subLocation: "",
        commiteLocation: ""
      });
    } else {
      this.getLocs(value);
    }
  };

  getLocs = async id => {
    await api.checkout.getlocs({ locid: id }).then(res => {
      if (res.success == true) {
        this.props.form.setFieldsInitialValue({
          address: res.data.address,
          mainLocation: res.data.provincenm,
          subLocation: res.data.districtnm,
          commiteLocation: res.data.committeenm
        });
      } else {
        console.log("aldaa");
      }
    });
  };

  getCompanyRegno = async e => {
    e.preventDefault();
    let regno = this.refs.regno.value;
    await api.checkout.getCompanyRegno({ regNo: regno }).then(res => {
      if (res.success == true) {
        res.data.regno = regno;
        this.setState({ companyInfo: res.data });
      } else {
        console.log("aldaa");
      }
    });
  };

  handleEditCompany = e => {
    e.preventDefault();
    this.setState({ companyInfo: [] });
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

  renderMainLocation = () => {
    const { mainLocation } = this.state;
    let tmp;
    if (mainLocation.length != 0) {
      tmp = mainLocation.map((item, i) => {
        return (
          <Option key={i} value={item.provinceid}>
            {item.provincenm}
          </Option>
        );
      });
    }
    return tmp;
  };

  plusRadioChanged = e => {
    this.setState({ chosenPlusRadio: e.target.id });
  };

  onSubmit = e => {
    e.preventDefault();
    const { defaultAddress, userAddress, addresstype } = this.state;
    let tmp = [];
    let chosenInfo = {};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (e.target.name == "delivery") {
          chosenInfo.address = values.address;
          chosenInfo.lastName = values.lastName;
          chosenInfo.mainLocation = values.mainLocation;
          chosenInfo.subLocation = values.subLocation;
          chosenInfo.phone1 = values.phone1;
          chosenInfo.phone2 = values.phone2;
          chosenInfo.commiteLocation = values.commiteLocation;
          tmp.push("3");
          if (values.address == defaultAddress.address) {
            values.address = defaultAddress.id;
          }
          try {
            if (addresstype == "new") {
              let adrs = {};
              adrs.custid = this.state.userInfo.id;
              adrs.locid = values.commiteLocation;
              adrs.address = values.address;
              adrs.isenable = "Идэвхтэй";
              this.setUser(adrs);
            }
          } catch (err) {
            console.log(err);
          }
        } else if (e.target.name == "payment") {
          tmp.push("4");
        }
        this.setState({
          collapseType: e.target.name,
          activeKey: tmp,
          chosenInfo: chosenInfo
        });
      } else {
        console.log("error");
      }
    });
  };

  setUser = async adrs => {
    const res = await this.props.saveUserAddress(adrs);
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
    const { chosenPayment } = this.state;
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
            {chosenPayment.id == 1 && item.id == 1 ? (
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
          /* <TabPane
            tab={
              <span>
                <Icon type="android" />
                {item.banknm}
              </span>
            }
            key={item.bankid}
          >
            {item.account}
          </TabPane> */
          <RadioButton value={item.bankid} key={i}>
            <p>{item.banknm}</p>
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

  generateNoat = (total, deliver, usedpoint) => {
    let noat = ((total + deliver - usedpoint) / 110) * 10;
    return noat.toFixed(2);
  };

  onChangeMainLoc = e => {
    api.location.findLocationWidthId({ id: e }).then(res => {
      if (res.success == true) {
        this.setState({ subLocation: res.data });
      }
    });
  };

  onChangeSubLoc = e => {
    this.props.form.validateFields((err, values) => {
      if (values.mainLocation != "") {
        api.location
          .findCommiteLocation({ provid: values.mainLocation, distid: e })
          .then(res => {
            if (res.success == true) {
              this.setState({ commiteLocation: res.data });
            }
          });
      }
    });
  };

  renderSubLocation = e => {
    const { subLocation } = this.state;
    let tmp;
    if (subLocation.length !== 0) {
      tmp = subLocation.map((item, i) => {
        return (
          <Option key={i} value={item.districtid}>
            {item.districtnm}
          </Option>
        );
      });
    }
    return tmp;
  };

  renderCommiteLocation = e => {
    const { commiteLocation } = this.state;
    let tmp;
    if (commiteLocation.length !== 0) {
      tmp = commiteLocation.map((item, i) => {
        return (
          <Option key={i} value={item.id}>
            {item.committeenm}
          </Option>
        );
      });
    }
    return tmp;
  };

  renderReturnTab = () => {
    let tmp = (
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <Icon type="apple" />
              Tab 1
            </span>
          }
          key="1"
        >
          Tab 1
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="android" />
              Tab 2
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
      </Tabs>
    );

    return tmp;
  };

  handleUserEpoint = async e => {
    e.preventDefault();
    const { epointcard, delivery, products } = this.state;
    let point = epointcard.point;
    const { value: password } = await Swal.fire({
      title: "Нууц үг",
      input: "password",
      width: "20rem",
      confirmButtonText: "Ok",
      cancelButtonText: "Болих",
      inputPlaceholder: "Картын нууц үгээ оруулна уу ?",
      showCancelButton: true,
      inputAttributes: {
        maxlength: 4,
        autocapitalize: "off",
        autocorrect: "off"
      }
    });

    if (password) {
      await api.checkout
        .checkpass({ cardno: epointcard.cardno, pincode: password })
        .then(res => {
          if (res.success == true) {
            let tmp = epointcard;
            if (
              (delivery.price + products.totalPrice) / 2 >=
              epointcard.point
            ) {
              tmp.point = 0;
              this.setState({
                epointUsedPoint: point,
                epointcard: tmp
              });
            } else {
              tmp.point =
                tmp.point - (delivery.price + products.totalPrice) / 2;
              this.setState({
                epointUsedPoint: (delivery.price + products.totalPrice) / 2,
                epointcard: tmp
              });
            }
            this.setState({ useEpoint: true });
          } else {
            message.error(res.message);
          }
        });
      // Swal.fire("Entered password: " + password);
    }
  };

  sentPaymentF = async tmp => {
    const res = await this.props.sentPayment(tmp);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { products, epointcard, epointUsedPoint, companyInfo } = this.state;
    let tmp = {};
    tmp.custid = this.state.userInfo.id;
    tmp.deliveryTypeId = this.state.delivery.id;
    tmp.custAddressId = null;
    tmp.phone1 = this.state.chosenInfo.phone1;
    tmp.phone2 = this.state.chosenInfo.phone2;
    tmp.paymentType = this.state.chosenPayment.id;
    tmp.bankId = this.state.chosenBankInfo.bankid;
    tmp.accountId = this.state.chosenBankInfo.account;

    tmp.cardNo = epointcard.cardno;
    tmp.usedPoint = epointUsedPoint;
    tmp.items = [];
    products.products.map((item, i) => {
      tmp.items.push(item);
    });
    if (companyInfo.length == 0) {
      tmp.companyRegNo = "";
      tmp.companyName = "";
    } else {
      tmp.companyRegNo = companyInfo.regno;
      tmp.companyName = companyInfo.name;
    }
    this.sentPaymentF(tmp);

    //sentPayment

    /*  Swal.fire({
      title: "<strong>HTML <u>example</u></strong>",
      type: "info",
      html: "<Icon type='apple' />",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down"
    }); */
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
      chosenPlusRadio,
      epointcard,
      companyInfo,
      epointUsedPoint,
      useEpoint,
      addresstype
    } = this.state;
    const { isLoggedIn } = this.props;
    const deliver1 = delivery == [] ? 0 : delivery.price;
    const usedpoint = useEpoint == true ? epointUsedPoint : 0;
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
                        {isLoggedIn == false ? (
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
                                        <img
                                          alt="icon"
                                          src={require("../scss/assets/images/demo/" +
                                            item.logo)}
                                        />
                                        <p className="text">
                                          <strong>{item.typenm}</strong>
                                          <span>
                                            {formatter.format(item.price) + "₮"}
                                          </span>
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
                                      <p className="text">{item.featuretxt}</p>
                                      <Form
                                        onSubmit={this.onSubmit}
                                        name="delivery"
                                      >
                                        <div className="row row10">
                                          {item.id != 3 ? (
                                            <div className="col-xl-12 col-md-12">
                                              <Form.Item>
                                                {getFieldDecorator("address", {
                                                  rules: [
                                                    {
                                                      required: true,
                                                      message: "Хаяг оруулна уу"
                                                    }
                                                  ]
                                                })(
                                                  addresstype == "new" ? (
                                                    <Input
                                                      type="text"
                                                      placeholder="Хаягаа сонгоно уу ?*"
                                                    />
                                                  ) : (
                                                    <Select
                                                      onSelect={(
                                                        value,
                                                        event
                                                      ) =>
                                                        this.addAddress(
                                                          value,
                                                          event
                                                        )
                                                      }
                                                      placeholder="Хаягаа сонгоно уу ?"
                                                    >
                                                      {this.renderAddrsOption()}
                                                      <Option value={null}>
                                                        {/*  <Divider
                                                          style={{
                                                            margin: "4px 0"
                                                          }}
                                                        /> */}
                                                        <div
                                                          style={{
                                                            cursor: "pointer"
                                                          }}
                                                        >
                                                          <Icon type="plus" />{" "}
                                                          Хаяг нэмэх
                                                        </div>
                                                      </Option>
                                                    </Select>
                                                  )
                                                )}
                                              </Form.Item>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          <div className="col-xl-4 col-md-4">
                                            <Form.Item>
                                              {getFieldDecorator(
                                                "mainLocation",
                                                {
                                                  rules: [
                                                    {
                                                      required: true,
                                                      message:
                                                        "Хот/Аймаг сонгоно уу?"
                                                    }
                                                  ]
                                                }
                                              )(
                                                <Select
                                                  placeholder="Хот/аймаг *"
                                                  className="col-md-12"
                                                  onChange={
                                                    this.onChangeMainLoc
                                                  }
                                                >
                                                  {this.renderMainLocation()}
                                                </Select>
                                              )}
                                            </Form.Item>
                                          </div>
                                          <div className="col-xl-4 col-md-4">
                                            <Form.Item>
                                              {getFieldDecorator(
                                                "subLocation",
                                                {
                                                  rules: [
                                                    {
                                                      required: true,
                                                      message:
                                                        "Дүүрэг/Сум сонгоно уу?"
                                                    }
                                                  ]
                                                }
                                              )(
                                                <Select
                                                  placeholder="Дүүрэг/Сум*"
                                                  onChange={this.onChangeSubLoc}
                                                >
                                                  {this.renderSubLocation()}
                                                </Select>
                                              )}
                                            </Form.Item>
                                          </div>
                                          <div className="col-xl-4 col-md-4">
                                            <Form.Item>
                                              {getFieldDecorator(
                                                "commiteLocation",
                                                {
                                                  rules: [
                                                    {
                                                      required: true,
                                                      message:
                                                        "Хороо сонгоно уу?"
                                                    }
                                                  ]
                                                }
                                              )(
                                                <Select placeholder="Хороо*">
                                                  {this.renderCommiteLocation()}
                                                </Select>
                                              )}
                                            </Form.Item>
                                          </div>
                                          <div className="col-xl-4 col-md-4">
                                            <Form.Item>
                                              {getFieldDecorator("lastName", {
                                                rules: [
                                                  {
                                                    required: true,
                                                    message: "Нэр оруулна уу?"
                                                  }
                                                ]
                                              })(
                                                <Input
                                                  type="text"
                                                  placeholder="Нэр*"
                                                  className="col-md-12"
                                                />
                                              )}
                                            </Form.Item>
                                          </div>
                                          <div className="col-xl-4 col-md-4">
                                            <Form.Item>
                                              {getFieldDecorator("phone1", {
                                                rules: [
                                                  {
                                                    required: true,
                                                    message: "Утас оруулна уу"
                                                  }
                                                ]
                                              })(
                                                <Input
                                                  type="text"
                                                  placeholder="Утас*"
                                                  className="col-md-12"
                                                />
                                              )}
                                            </Form.Item>
                                          </div>
                                          <div className="col-xl-4 col-md-4">
                                            <Form.Item>
                                              {getFieldDecorator("phone2", {
                                                rules: [
                                                  {
                                                    required: true,
                                                    message: "Утас оруулна уу"
                                                  }
                                                ]
                                              })(
                                                <Input
                                                  type="text"
                                                  placeholder="Утас*"
                                                  className="col-md-12"
                                                />
                                              )}
                                            </Form.Item>
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
                                      {companyInfo.length == 0 ? (
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          name="regno"
                                          ref="regno"
                                          aria-describedby="emailHelp"
                                          placeholder="Байгууллагын регистэр"
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          name="regno"
                                          ref="regno"
                                          value={companyInfo.name}
                                          aria-describedby="emailHelp"
                                          placeholder="Байгууллагын регистэр"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {companyInfo.length == 0 ? (
                                  <button
                                    className="btn btn-main solid"
                                    onClick={this.getCompanyRegno}
                                  >
                                    <span className="text-uppercase">
                                      Холбох
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    className="btn"
                                    onClick={this.handleEditCompany}
                                  >
                                    <span className="text-uppercase">
                                      Засах
                                    </span>
                                  </button>
                                )}
                              </form>
                            ) : (
                              ""
                            )}
                            {epointcard == null ? (
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
                                          name="cardno"
                                          ref="cardno"
                                          aria-describedby="emailHelp"
                                          placeholder="Картын дугаар"
                                        />
                                        <input
                                          type="password"
                                          ref="cardpass"
                                          name="cardpass"
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
                                    onClick={this.saveCustomerCard}
                                  >
                                    <span className="text-uppercase">
                                      Холбох
                                    </span>
                                  </button>
                                </form>
                              </div>
                            ) : (
                              <div>
                                <p className="title">
                                  <strong>Оноо</strong>
                                </p>
                                <form>
                                  <div className="row row10">
                                    <div className="col-xl-6 pad10">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          value={
                                            epointcard.status == 1
                                              ? epointcard.point
                                              : epointcard.cardno
                                          }
                                          name="cardInfo"
                                          ref="cardInfo"
                                          aria-describedby="emailHelp"
                                          placeholder="Картын дугаар"
                                        />
                                        {epointcard.status == 0 ? (
                                          <label>
                                            Таны карт идэвхгүй болсон байна.
                                            Хэрэглэгчийн үйлчилгээний төвд
                                            хандаж картаа шинэчилүүлнэ үү.
                                          </label>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-gray solid"
                                    onClick={this.handleUserEpoint}
                                  >
                                    <span className="text-uppercase">
                                      Ашиглах
                                    </span>
                                  </button>
                                </form>
                              </div>
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
                      <span>
                        Бараа ({formatter.format(products.totalQty)}):
                      </span>
                      <strong>{formatter.format(products.totalPrice)}₮</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Хүргэлтийн үнэ:</span>
                      <strong>{formatter.format(deliver1)}₮</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Имарт карт оноо:</span>
                      <strong style={{ color: "red" }}>
                        {"-" + formatter.format(usedpoint)}₮
                      </strong>
                    </p>
                    <hr />
                    <p className="text flex-space">
                      <span>Нийт дүн:</span>
                      <strong>
                        {formatter.format(
                          products.totalPrice + deliver1 - usedpoint
                        )}
                        ₮
                      </strong>
                    </p>
                    <p className="text flex-space">
                      <span>НӨАТ:</span>
                      <strong>
                        {formatter.format(
                          this.generateNoat(
                            products.totalPrice,
                            deliver1,
                            usedpoint
                          )
                        )}
                        ₮
                      </strong>
                    </p>
                    {/*   <p className="text text-center">
                      <span>89,000₮-с дээш бол хүргэлт үнэгүй</span>
                    </p> */}
                    <button
                      className="btn btn-main btn-block"
                      onClick={this.handleSubmit}
                    >
                      <span className="text-uppercase">Тооцоо хийх</span>
                    </button>
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
    user: state.auth.user,
    cart: state.cart
  };
}

export default Form.create({ name: "checkout" })(Checkout);
