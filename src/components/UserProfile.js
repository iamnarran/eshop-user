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
    info: [],
    cardNoInput: "",

    mainLocation: [],
    commiteLocation: [],
    subLocation: [],

    locid: null
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
    this.getData();
    this.getAddress();
    this.setData();
  }

  getData() {
    api.customer.getCustomer({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        this.props.form.setFieldsValue({
          lastname: res.data.info.lastname,
          firstname: res.data.info.firstname,
          email: res.data.info.email,
          phone1: res.data.info.phone1,
          phone2: res.data.info.phone2
        });
      }
    });
  }

  getAddress() {
    api.customer.address({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        res.data.map((item, index) => {
          if (item.ismain) {
            this.setState({ mainAddress: item });
            this.props.form.setFieldsValue({
              address: item.address,
              mainLocation: item.provincenm,
              subLocation: item.districtnm,
              commiteLocation: item.committeenm
            });
          }
        });
      } else {
        console.log("else");
      }
    });
    api.location.findAll({}).then(res => {
      if (res.success == true) {
        this.setState({ mainLocation: res.data });
      }
    });
  }

  setData = async () => {
    /* this.props.form.setFieldsValue({
      lastname: this.state.info.lastname,
      firstname: this.state.info.firstname,
      email: this.state.info.email,
      phone1: this.state.info.phone1,
      phone2: this.state.info.phone2,
      address: this.state.mainAddress.address,
      mainLocation: this.state.mainAddress.provincenm,
      subLocation: this.state.mainAddress.districtnm,
      commiteLocation: this.state.mainAddress.committeenm
    }); */
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("value", values);
        let loc = this.state.locid
          ? this.state.locid
          : this.state.mainAddress.locid;
        const data = {
          id: this.props.user.id,
          username: this.state.info.username,
          firstname: values.firstname,
          imgnm: this.state.info.imgnm,
          lastname: values.lastname,
          email: values.email,
          phonE1: values.phone1,
          phonE2: values.phone2,
          locid: loc,
          address: values.address,
          adrsid: this.state.mainAddress.id
        };
        console.log("data", data);
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

  saveCustomerCard = async (e, refs) => {
    e.preventDefault();
    let cardpass = refs.cardpass.value;
    let cardno = refs.cardno.value;
    if (cardpass != "" && cardno != "") {
      let tmp = {
        custid: this.props.user.id,
        cardno: cardno,
        pincode: cardpass
      };
      this.saveCard(tmp);
    } else {
      this.errorMsg("Картын дугаар нууц үг оруулна уу ?");
    }
  };

  cardNoChange = e => {
    const { cardNoInput } = this.state;
    if (e.target.value.length <= 14) {
      this.setState({ cardNoInput: e.target.value });
    }
  };

  saveCard = async tmp => {
    await api.checkout.saveCustomerCard(tmp).then(res => {
      if (res.success == true) {
        this.setState({ card: res.data });
        this.successMsg("Таны бүртгэлийг Ипойнт карттай амжилттай холболоо");
      } else {
        this.errorMsg(res.data);
      }
    });
  };

  /* main Location */
  onStreet = async e => {
    this.setState({ locid: e });
  };

  renderMainLocation = () => {
    let tmp;
    if (this.state.mainLocation.length != 0) {
      tmp = this.state.mainLocation.map((item, i) => {
        return (
          <Option key={i} value={item.provinceid}>
            {item.provincenm}
          </Option>
        );
      });
    }
    return tmp;
  };

  renderSubLocation = e => {
    let tmp;
    if (this.state.subLocation !== undefined) {
      tmp = this.state.subLocation.map((item, i) => {
        return (
          <Option key={i} value={item.districtid}>
            {item.districtnm}
          </Option>
        );
      });
    }
    return tmp;
  };

  onChangeMainLoc = (e, form) => {
    api.location.findLocationWidthId({ id: e }).then(res => {
      if (res.success == true) {
        this.setState({ subLocation: res.data });
      }
    });
  };

  onChangeSubLoc = (e, validateFields, e1) => {
    if (e1 == undefined) {
      validateFields((err, values) => {
        if (values.mainLocation !== "") {
          api.location
            .findCommiteLocation({ provid: values.mainLocation, distid: e })
            .then(res => {
              if (res.success == true) {
                this.setState({ commiteLocation: res.data });
              }
            });
        }
      });
    } else {
      api.location.findCommiteLocation({ provid: e1, distid: e }).then(res => {
        if (res.success == true) {
          this.setState({ commiteLocation: res.data });
        }
      });
    }
  };

  renderCommiteLocation = e => {
    let tmp;
    if (this.state.commiteLocation.length !== 0) {
      tmp = this.state.commiteLocation.map((item, i) => {
        return (
          <Option key={i} value={item.id}>
            {item.committeenm}
          </Option>
        );
      });
    }
    return tmp;
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
                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("lastname", {
                        rules: [
                          {
                            required: true,
                            message: "Овгоо заавал оруулна уу! "
                          }
                        ]
                      })(<Input placeholder="Овог" />)}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("firstname", {
                        rules: [
                          {
                            required: true,
                            message: "Нэрээ заавал оруулна уу! "
                          }
                        ]
                      })(<Input placeholder="Нэр" />)}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            type: "email",
                            message: "Зөв имэйл оруулна уу! "
                          }
                        ]
                      })(<Input placeholder="Имэйл" />)}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("phone1", {
                        rules: [
                          {
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            len: 8,
                            message: "Утсаа заавал оруулна уу! "
                          }
                        ]
                      })(<Input placeholder="Утас 1" />)}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("phone2", {
                        rules: [
                          {
                            pattern: new RegExp("^[0-9]*$"),
                            len: 8,
                            message: "Утасны дугаар 8 оронтой байх ёстой! "
                          }
                        ]
                      })(<Input placeholder="Утас 2" />)}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }} />

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("mainLocation", {
                        rules: [
                          {
                            required: true,
                            message: "Хот/аймаг сонгоно уу!"
                          }
                        ]
                      })(
                        <Select
                          placeholder="Хот/аймаг *"
                          showSearch
                          optionFilterProp="children"
                          className="col-md-12"
                          onChange={e =>
                            this.onChangeMainLoc(e, this.props.form)
                          }
                        >
                          {this.renderMainLocation()}
                        </Select>
                      )}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("subLocation", {
                        rules: [
                          {
                            required: true,
                            message: "Дүүрэг/Сум сонгоно уу!"
                          }
                        ]
                      })(
                        <Select
                          showSearch
                          optionFilterProp="children"
                          placeholder="Дүүрэг/Сум *"
                          onChange={e =>
                            this.onChangeSubLoc(
                              e,
                              this.props.form.validateFields,
                              undefined
                            )
                          }
                        >
                          {this.renderSubLocation()}
                        </Select>
                      )}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("commiteLocation", {
                        rules: [
                          { required: true, message: "Хороо сонгоно уу!" }
                        ]
                      })(
                        <Select
                          placeholder="Хороо *"
                          showSearch
                          optionFilterProp="children"
                          onChange={this.onStreet}
                        >
                          {this.renderCommiteLocation()}
                        </Select>
                      )}
                    </Form.Item>
                  </div>{" "}
                </div>

                <div className="col-xl-12" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("address", {
                        rules: [
                          {
                            required: true,
                            message: "Гэрийн хаягaa заавал оруулна уу! "
                          }
                        ]
                      })(
                        <Input
                          placeholder="Гэрийн хаяг"
                          /* onChange={this.onChangeAddress} */
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="form-group">
                    <div className="text-right marginBottom">
                      <button
                        className="btn btn-dark"
                        onClick={this.handleSubmit}
                      >
                        <span className="text-uppercase">Хадгалах</span>
                      </button>
                    </div>
                  </div>
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
                  <div className="col-xl-6" style={{ marginBottom: "-9px" }}>
                    <input
                      value={this.state.card.cardno}
                      className="inputButton"
                      disabled
                      style={{ backgroundColor: "rgb(235, 235, 228)" }}
                    />
                  </div>

                  <div className="col-xl-6" style={{ marginBottom: "-9px" }}>
                    <input
                      className="inputButton"
                      type="password"
                      placeholder="*****"
                      disabled
                      style={{ backgroundColor: "rgb(235, 235, 228)" }}
                    />
                  </div>
                </div>
              </Form>
            ) : (
              <Form>
                <div className="row row10">
                  <div className="col-xl-6" style={{ marginBottom: "-9px" }}>
                    <input
                      autoComplete="off"
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
                      autoComplete="off"
                      className="inputButton"
                      type="password"
                      ref="cardpass"
                      name="cardpass"
                      placeholder="Нууц үг"
                    />
                  </div>

                  <div className="col-xl-12">
                    <div className="text-right">
                      <button
                        className="btn btn-dark marginBottom"
                        style={{ width: "108.28px" }}
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
