import React from "react";
import { connect } from "react-redux";
import { Form, message, Input, Select } from "antd";
import { Link } from "react-router-dom";
import api from "../api";
const Option = Select.Option;

@connect(
  mapStateToProps,
  {}
)
class Component extends React.Component {
  state = {
    province: [],
    city: false,
    phone: null,
    homeaddress: [],
    districtOrSum: [],
    street: [],
    provid: null,
    distid: null,
    locid: null,

    mainLocation: [],
    commiteLocation: []
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

  saveAddress = async data => {
    await api.customer.saveAddress(data).then(res => {
      if (res.success) {
        this.getAddress();
        message.success("Хүргэлтийн хаяг амжилттай бүртгэгдлээ");
        this.props.form.resetFields();
      } else {
        message.success(res.success);
      }
    });
  };

  componentDidMount() {
    api.location.findAll({}).then(res => {
      if (res.success == true) {
        this.setState({ mainLocation: res.data });
      }
    });
    this.getProvince();
    this.getAddress();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          custid: this.props.user.id,
          locid: this.state.locid,
          address: values.homeaddress,
          name: values.name,
          phonE1: values.phone1,
          phonE2: values.phone2
        };
        if (data.locid == null) {
          message.success("Хүргэлтийн хаягаа сонгоно уу");
        } else {
          this.saveAddress(data);
        }
      }
    });
  };

  onDelete = async (e, item) => {
    await api.customer
      .deleteAddress({ id: item.id, custid: this.props.user.id })
      .then(res => {
        if (res.success) {
          this.getAddress();
          message.success("Хүргэлтийн хаяг амжилттай устлаа.");
        } else {
          message.error(res.data);
        }
      });
  };

  /* render location */
  onStreet = async e => {
    console.log(e);
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
    console.log(this.state.mainLocation);
    const { getFieldDecorator } = this.props.form;
    /* const { name, phone, homeaddress } = this.state; */
    let tableList = null;
    tableList = this.state.homeaddress.map((item, index) => {
      return (
        <tr key={index} style={{ width: "100%", padding: "70px" }}>
          <td style={{ width: "5%" }}>{item.name}</td>
          <td style={{ width: "5%" }}>{item.phone1}</td>
          <td style={{ width: "15%" }}>{item.provincenm}</td>
          <td style={{ width: "10%" }}>{item.districtnm}</td>
          <td style={{ width: "10%" }}>{item.address}</td>
          <td style={{ width: "5%" }}>
            <div className="action">
              <ul className="list-unstyled flex-this end">
                <li>
                  <a onClick={e => this.onDelete(e, item)}>
                    <i
                      className="fa fa-times"
                      aria-hidden="true"
                      style={{ color: "black" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Хүргэлтийн хаяг</span>
          </p>
          <div className="user-profile-contain">
            <Form>
              <div className="row row10">
                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Нэрээ заавал оруулна уу"
                          }
                        ]
                      })(<Input placeholder="Нэр" />)}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("phone1", {
                        rules: [
                          {
                            required: true,
                            message: "Утсаа заавал оруулна уу! "
                          },
                          {
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Утсаа зөв оруулна уу! "
                          },
                          {
                            len: 8,
                            message: "Утасны дугаар 8 оронтой байх ёстой! "
                          }
                        ]
                      })(<Input placeholder="Утас 1" />)}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-4" style={{ marginBottom: "-9px" }}>
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("phone2", {
                        rules: [
                          {
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Утас зөв оруулна уу! "
                          },
                          {
                            len: 8,
                            message: "Утасны дугаар 8 оронтой байх ёстой! "
                          }
                        ]
                      })(<Input placeholder="Утас 2" />)}
                    </Form.Item>
                  </div>
                </div>

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

                <div className="col-xl-12">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("homeaddress", {
                        rules: [
                          {
                            required: true,
                            message: "Гэрийн хаягаа заавал оруулна уу!"
                          }
                        ]
                      })(<Input placeholder="Гэрийн хаяг" />)}
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
            <div className="text-right">
              <button className="btn btn-dark" onClick={this.handleSubmit}>
                <span className="text-uppercase">Хадгалах</span>
              </button>
            </div>
            <div className="delivery-address">
              <p className="title">
                <span>Бүртгэлтэй хаягууд</span>
              </p>
              <table style={{ width: "100%" }} className="table bordered">
                <div
                  className="frame frameMargin"
                  style={{
                    maxHeight: "300px",
                    overflow: "auto",
                    minHeight: "auto"
                  }}
                >
                  <tbody style={{ width: "100%" }}>{tableList}</tbody>
                </div>
              </table>
            </div>
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
