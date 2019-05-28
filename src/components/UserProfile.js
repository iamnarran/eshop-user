import React from "react";
import { connect } from "react-redux";
import { Form, message, Input, Select } from "antd";
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
    cardNoInput: ""
  };

  errorMsg = txt => {
    /* MySwal.hideLoading(); */
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
    /* MySwal.hideLoading(); */
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
    this.getAddress();
    this.getUserInfo();
    this.getUserData();
  }

  getUserData = async () => {
    await api.customer.findUserData({ id: this.props.user.id }).then(res => {
      if (res.success) {
        this.setState({ card: res.data.card });
      }
    });
  };

  getAddress = async () => {
    await api.customer.address({ custid: this.props.user.id }).then(res => {
      if (res.success) {
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
        console.log(res.data);
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
          console.log(res);
        }
      });
  };
  getUserInfo = async () => {
    api.customer.getCustomer({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        this.setState({ userInfo: res.data.info });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.userInfo);
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
          console.log(res);
        }
      });
  };
  onStreet = async e => {
    this.setState({ locid: e });
    console.log(e);
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
    console.log(cardpass, cardno);
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
    const { getFieldDecorator } = this.props.form;
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
                  <input
                    placeholder="Овог"
                    defaultValue={this.state.userInfo.lastname}
                    className="inputButton"
                    onChange={this.onChangeLastname}
                  />
                </div>

                <div className="col-xl-4">
                  <input
                    placeholder="Нэр"
                    defaultValue={this.state.userInfo.firstname}
                    className="e-mart-input inputButton"
                    onChange={this.onChangeFirstname}
                  />
                </div>

                <div className="col-xl-4">
                  <input
                    placeholder="И-мэйл"
                    defaultValue={this.state.userInfo.email}
                    className="e-mart-input inputButton"
                    onChange={this.onChangeEmail}
                  />
                </div>

                <div className="col-xl-4">
                  <input
                    placeholder="Утас 1"
                    defaultValue={this.state.userInfo.phone1}
                    className="e-mart-input inputButton"
                    onChange={this.onChangePhone2}
                  />
                </div>

                <div className="col-xl-4">
                  <input
                    placeholder="Утас 2"
                    defaultValue={this.state.userInfo.phone2}
                    className="e-mart-input inputButton"
                    onChange={this.onChangePhone2}
                  />
                </div>

                <div className="col-xl-4" />

                <div className="col-xl-4 marginBottom">
                  <Select
                    defaultValue="Улаанбаатар хот"
                    onChange={this.onChangeCity}
                    placeholder="Хот/Аймаг"
                  >
                    {this.renderProvince()}
                  </Select>
                </div>

                <div className="col-xl-4 marginBottom">
                  <Select
                    placeholder="Сум/Дүүрэг"
                    defaultValue="Баянгол дүүрэг"
                    onChange={this.onChangeDistrict}
                  >
                    {this.renderDistrict()}
                  </Select>
                </div>

                <div className="col-xl-4 marginBottom">
                  <Select
                    defaultValue="4-р хороо"
                    placeholder="Баг/Хороо"
                    onChange={this.onStreet}
                  >
                    {this.renderStreet()}
                  </Select>
                </div>

                <div className="col-xl-12">
                  <input
                    placeholder="Гэрийн хаяг"
                    defaultValue="102-25"
                    className="e-mart-input inputButton"
                  />
                </div>
              </div>
            </Form>

            <div className="text-right">
              <button className="btn btn-dark">
                <span className="text-uppercase" onClick={this.handleSubmit}>
                  Хадгалах
                </span>
              </button>
            </div>
            <div className="row row10">
              <div className="col-xl-12 pad10">
                <p>И-март карт холбох</p>
              </div>
            </div>

            {this.state.card.status == 1 ? (
              <div className="row row10">
                <div className="col-xl-4 pad10">
                  <input
                    value={this.state.card.cardno}
                    className="inputButton"
                    disabled
                  />
                </div>
                <div className="col-xl-4 pad10">
                  <input value="****" className="inputButton" disabled />
                </div>
              </div>
            ) : (
              <div className="row row10">
                <div className="col-xl-4 pad10">
                  <input
                    className="e-mart-input inputButton"
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

                <div className="col-xl-4 pad10">
                  <input
                    className="e-mart-input inputButton"
                    type="password"
                    ref="cardpass"
                    name="cardpass"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Нууц үг"
                  />
                </div>

                <div className="col-xl-4 pad10">
                  <button
                    className="btn"
                    onClick={e => this.saveCustomerCard(e, this.refs)}
                  >
                    <span className="text-uppercase">Холбох</span>
                  </button>
                </div>
              </div>
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
