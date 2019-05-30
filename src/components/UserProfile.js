import React from "react";
import { connect } from "react-redux";
import { Form, message, Input, Select, Divider } from "antd";
import "./userprofile.css";
import api from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const Option = Select.Option;

@connect(
  mapStateToProps,
  {}
)
class Component extends React.Component {
  state = {
    province: [],
    city: false,
    name: null,
    phone: null,
    homeaddress: [],
    districtOrSum: [],
    street: [],
    provid: null,
    distid: null,
    locid: null,
    userInfo: [],
    card: [],
    cardNoInput: "",
    mainAddress: [],
    provincenm: "",
    districtnm: "",
    committeenm: "",
    realAddress: ""
  };

  errorMsg = txt => {
    MySwal.fire({
      timer: 1500,
      type: "error",
      text: txt,
      animation: false,
      width: "25rem",
      showConfirmButton: false,
      confirmButtonColor: "#feb415"
    });
  };

  successMsg = txt => {
    MySwal.fire({
      timer: 1500,
      type: "success",
      title: "Амжилттай",
      text: txt,
      animation: false,
      width: "25rem",
      showConfirmButton: false,
      confirmButtonColor: "#feb415"
    });
  };

  componentDidMount() {
    this.getProvince();
    this.getUserInfo();
    this.getAddress();
    this.getUserData();
  }

  getValues = () => {
    this.props.form.setFieldsValue({
      lastname: this.state.userInfo.lastname,
      firstname: this.state.userInfo.firstname,
      email: this.state.userInfo.email,
      phone1: this.state.userInfo.phone1,
      phone2: this.state.userInfo.phone2,
      address: this.state.realAddress
    });
  };

  getUserData = async () => {
    await api.customer.findUserData({ id: this.props.user.id }).then(res => {
      if (res.success) {
        console.log(res.data);
        this.setState({ card: res.data.card });
      }
    });
  };

  getAddress = async () => {
    await api.customer.address({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        res.data.map((item, index) => {
          if (item.ismain) {
            this.setState({
              mainAddress: item,
              realAddress: item.address,
              provincenm: item.provincenm,
              districtnm: item.districtnm,
              committeenm: item.committeenm
            });
            this.props.form.setFieldsValue({
              address: item.address
            });
          }
        });
        this.setState({ homeaddress: res.data });
      } else {
        console.log("else");
      }
    });
  };

  getProvince = async () => {
    await api.location.findAll().then(res => {
      if (res.success) {
        this.setState({ province: res.data });
      } else {
        console.log("else");
      }
    });
  };

  getDistrict = async id => {
    await api.location.findLocationWidthId({ id: id }).then(res => {
      if (res.success) {
        this.setState({ districtOrSum: res.data });
      }
    });
  };

  getLocid = async () => {
    await api.location
      .findCommiteLocation({
        provid: this.state.provid,
        distid: this.state.distid
      })
      .then(res => {
        if (res.success) {
          this.setState({ street: res.data });
        }
      });
  };
  getUserInfo = async () => {
    api.customer.getCustomer({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        this.setState({ userInfo: res.data.info });
        this.getValues();
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let loc = this.state.locid
      ? this.state.locid
      : this.state.mainAddress.locid;
    const data = {
      id: this.props.user.id,
      username: this.state.userInfo.username,
      firstname: this.state.userInfo.firstname,
      imgnm: this.state.userInfo.imgnm,
      lastname: this.state.userInfo.lastname,
      email: this.state.userInfo.email,
      phonE1: this.state.userInfo.phone1,
      phonE2: this.state.userInfo.phone2,
      adrsid: this.state.mainAddress.id,
      locid: loc,
      address: this.state.realAddress
    };
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        api.customer.updateMainAddress(data).then(res => {
          if (res.success) {
            message.success("Амжилттай хадгаллаа.");
          } else {
            message.error("Амжилтгүй хадгаллаа.");
          }
        });
      }
    });
  };

  renderProvince() {
    const options = this.state.province.map((item, index) => {
      if (item.provinceid == "11") {
        return (
          <Option key={index} value={item.provinceid}>
            {item.provincenm}
          </Option>
        );
      } else {
        return (
          <Option key={index} value={item.provinceid}>
            {item.provincenm}
          </Option>
        );
      }
    });
    return options;
  }

  renderDistrict() {
    const options = this.state.districtOrSum.map((item, index) => {
      return (
        <Option key={index} value={item.districtid}>
          {item.districtnm}
        </Option>
      );
    });
    return options;
  }

  renderStreet() {
    const options = this.state.street.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          {item.committeenm}
        </Option>
      );
    });
    return options;
  }

  onChangeCity = async e => {
    this.state.province.map((item, index) => {
      if (item.provinceid == e) {
        this.setState({ provincenm: item.provincenm });
      }
    });
    await this.setState({ provid: e });
    this.getDistrict(e);
  };

  onChangeDistrict = async e => {
    await api.location
      .findCommiteLocation({
        provid: this.state.provid,
        distid: e
      })
      .then(res => {
        if (res.success) {
          this.setState({ street: res.data });
        }
      });
  };

  onStreet = async e => {
    this.setState({ locid: e });
  };

  onChangeLastname = e => {
    const data = {
      conymd: this.state.userInfo.conymd,
      email: this.state.userInfo.email,
      firstname: this.state.userInfo.firstname,
      id: this.state.userInfo.id,
      imgnm: this.state.userInfo.imgnm,
      insymd: this.state.userInfo.insymd,
      lastname: e.target.value,
      phone1: this.state.userInfo.phone1,
      phone2: this.state.userInfo.phone2,
      updymd: this.state.userInfo.updymd,
      username: this.state.userInfo.username
    };
    this.setState({ userInfo: data });
  };

  onChangeFirstname = e => {
    const data = {
      conymd: this.state.userInfo.conymd,
      email: this.state.userInfo.email,
      firstname: e.target.value,
      id: this.state.userInfo.id,
      imgnm: this.state.userInfo.imgnm,
      insymd: this.state.userInfo.insymd,
      lastname: this.state.userInfo.lastname,
      phone1: this.state.userInfo.phone1,
      phone2: this.state.userInfo.phone2,
      updymd: this.state.userInfo.updymd,
      username: this.state.userInfo.username
    };
    this.setState({ userInfo: data });
  };

  onChangeEmail = e => {
    const data = {
      conymd: this.state.userInfo.conymd,
      email: e.target.value,
      firstname: this.state.userInfo.firstname,
      id: this.state.userInfo.id,
      imgnm: this.state.userInfo.imgnm,
      insymd: this.state.userInfo.insymd,
      lastname: this.state.userInfo.lastname,
      phone1: this.state.userInfo.phone1,
      phone2: this.state.userInfo.phone2,
      updymd: this.state.userInfo.updymd,
      username: this.state.userInfo.username
    };
    this.setState({ userInfo: data });
  };

  onChangePhone1 = e => {
    const data = {
      conymd: this.state.userInfo.conymd,
      email: this.state.userInfo.email,
      firstname: this.state.userInfo.firstname,
      id: this.state.userInfo.id,
      imgnm: this.state.userInfo.imgnm,
      insymd: this.state.userInfo.insymd,
      lastname: this.state.userInfo.lastname,
      phone1: e.target.value,
      phone2: this.state.userInfo.phone2,
      updymd: this.state.userInfo.updymd,
      username: this.state.userInfo.username
    };
    this.setState({ userInfo: data });
  };

  onChangePhone2 = e => {
    const data = {
      conymd: this.state.userInfo.conymd,
      email: this.state.userInfo.email,
      firstname: this.state.userInfo.firstname,
      id: this.state.userInfo.id,
      imgnm: this.state.userInfo.imgnm,
      insymd: this.state.userInfo.insymd,
      lastname: this.state.userInfo.lastname,
      phone1: this.state.userInfo.phone1,
      phone2: e.target.value,
      updymd: this.state.userInfo.updymd,
      username: this.state.userInfo.username
    };
    this.setState({ userInfo: data });
  };

  onChangeAddress = e => {
    this.setState({ realAddress: e.target.value });
  };

  cardNoChange = e => {
    const { cardNoInput } = this.state;
    if (e.target.value.length <= 14) {
      this.setState({ cardNoInput: e.target.value });
    }
  };

  saveCustomerCard = async (e, refs) => {
    e.preventDefault();

    let cardpass = refs.cardpass.value;
    let cardno = refs.cardno.value;
    if (cardpass != "" && cardno != "") {
      let tmp = {
        custid: this.state.userInfo.id,
        cardno: cardno,
        pincode: cardpass
      };
      await api.checkout.saveCustomerCard(tmp).then(res => {
        if (res.success == true) {
          this.setState({ card: res.data });
          this.successMsg("Таны бүртгэлийг Ипойнт карттай амжилттай холболоо");
        } else {
          this.errorMsg(res.data);
        }
      });
    } else {
      this.errorMsg("Картын дугаар нууц үг оруулна уу ?");
    }
  };

  render() {
    const { getFieldDecorator, setFieldsInitialValue } = this.props.form;

    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Профайл хуудас</span>
          </p>
          <div className="user-profile-contain">
            <Form>
              <div className="row row10">
                <div className="col-xl-4">
                  <Form.Item>
                    {getFieldDecorator("lastname", {
                      rules: [
                        {
                          required: true,
                          message: "Овогоо оруулна уу"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Овог"
                        onChange={this.onChangeLastname}
                        name={"lastname"}
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="col-xl-4">
                  <Form.Item>
                    {getFieldDecorator("firstname", {
                      rules: [
                        {
                          required: true,
                          message: "Нэрээ оруулна уу"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Нэр"
                        onChange={this.onChangeFirstname}
                        name={"firstname"}
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="col-xl-4">
                  <Form.Item>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Имэйл оруулна оруулна уу"
                        },
                        {
                          type: "email",
                          message: "Зөв имэйл оруулна уу"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Имэйл"
                        onChange={this.onChangeEmail}
                        name={"email"}
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="col-xl-4">
                  <Form.Item>
                    {getFieldDecorator("phone1", {
                      rules: [
                        {
                          required: true,
                          message: "Нэрээ оруулна уу"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Утас 1"
                        onChange={this.onChangePhone1}
                        name={"phone1"}
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="col-xl-4">
                  <Form.Item>
                    {getFieldDecorator("phone2", {
                      rules: []
                    })(
                      <Input
                        placeholder="Утас 2"
                        onChange={this.onChangePhone2}
                        name={"phone2"}
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="col-xl-4" />

                <div className="col-xl-4">
                  <Form.Item>
                    <Select
                      onChange={this.onChangeCity}
                      placeholder={this.state.mainAddress.provincenm}
                    >
                      {this.renderProvince()}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-xl-4">
                  <Form.Item>
                    <Select
                      placeholder={this.state.mainAddress.districtnm}
                      onChange={this.onChangeDistrict}
                    >
                      {this.renderDistrict()}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-xl-4">
                  <Form.Item>
                    <Select
                      placeholder={this.state.mainAddress.committeenm}
                      onChange={this.onStreet}
                    >
                      {this.renderStreet()}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-xl-12">
                  <Form.Item>
                    {getFieldDecorator("address", {
                      rules: [
                        {
                          required: true,
                          message: "Гэрийн хаягaa оруулна уу"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Гэрийн хаяг"
                        onChange={this.onChangeAddress}
                        name={"address"}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="col-xl-12">
                <div
                  className="text-right marginBottom"
                  style={{ marginRight: "-9px" }}
                >
                  <button className="btn btn-dark" onClick={this.handleSubmit}>
                    <span className="text-uppercase">Хадгалах</span>
                  </button>
                </div>
              </div>
            </Form>

            <Divider />

            <div className="row row10">
              <div className="col-md-12">
                <p>Имарт карт</p>
              </div>
            </div>

            {this.state.card ? (
              <Form>
                <div className="row row10">
                  <div className="col-xl-6">
                    <input
                      value={this.state.card.cardno}
                      className="inputButton"
                      disabled
                      style={{ backgroundColor: "rgb(235, 235, 228)" }}
                    />
                  </div>

                  <div className="col-xl-6">
                    <input
                      className="inputButton"
                      type="password"
                      disabled
                      style={{ backgroundColor: "rgb(235, 235, 228)" }}
                    />
                  </div>
                </div>
              </Form>
            ) : (
              <Form>
                <div className="row row10">
                  <div className="col-xl-6">
                    <input
                      className="inputButton marginBottom"
                      type="text"
                      id="exampleInputEmail1"
                      name="cardno"
                      ref="cardno"
                      value={this.state.cardNoInput}
                      aria-describedby="emailHelp"
                      placeholder="Картын дугаар"
                      onChange={e => this.cardNoChange(e)}
                    />
                  </div>

                  <div className="col-xl-6 marginBottom">
                    <input
                      className="inputButton"
                      type="password"
                      ref="cardpass"
                      name="cardpass"
                      aria-describedby="emailHelp"
                      placeholder="Нууц үг"
                    />
                  </div>

                  <div className="col-xl-12">
                    <div className="text-right">
                      <button
                        className="btn btn-dark marginBottom"
                        onClick={e => this.saveCustomerCard(e, this.refs)}
                      >
                        <span className="text-uppercase">Холбох</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </div>
        </div>
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

export default Form.create({ name: "delivery" })(Component);
