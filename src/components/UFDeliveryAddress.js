import React from "react";
import { connect } from "react-redux";
import { Form, message, Input, Select } from "antd";
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
    name: null,
    phone: null,
    homeaddress: [],
    districtOrSum: [],
    street: [],
    provid: null,
    distid: null,
    locid: null
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

  saveAddress = async data => {
    api.customer.saveAddress(data).then(res => {
      if (res.success) {
        this.getAddress();
      }
    });
  };

  componentDidMount() {
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
          phonE1: values.phone
        };
        this.saveAddress(data);
        message.success("Хүргэлтийн хаяг амжилттай бүртгэгдлээ");
      }
    });
  };

  renderProvince() {
    const options = this.state.province.map((item, index) => {
      return (
        <Option key={index} value={item.provinceid}>
          {item.provincenm}
        </Option>
      );
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

  onDelete = (e, item) => {
    console.log(item);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, phone, homeaddress } = this.state;
    let tableList = null;
    tableList = this.state.homeaddress.map((item, index) => {
      return (
        <tr key={index} style={{ padding: "70px" }}>
          <td>{item.name}</td>
          <td>{item.phone1}</td>
          <td>{item.provincenm}</td>
          <td>{item.districtnm}</td>
          <td>{item.address}</td>
          <td>
            <div className="action">
              <ul className="list-unstyled flex-this end">
                <li>
                  <a onClick={e => this.onDelete(e, item)}>
                    <i className="fa fa-times" aria-hidden="true" />
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
                <div className="col-xl-6 pad10">
                  <div className="e-mart-input">
                    <Form.Item>
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Нэрээ заавал оруулна уу!"
                          }
                        ]
                      })(<Input placeholder="Нэр" />)}
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
                            message: "Утасаа заавал оруулна уу!"
                          }
                        ]
                      })(<Input placeholder="Утас" />)}
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row row10">
                <div className="col-xl-4 pad10">
                  <div className="form-group">
                    <Select
                      defaultValue="Хот/Аймаг"
                      onChange={this.onChangeCity}
                      placeholder="Хот/Аймаг"
                    >
                      {this.renderProvince()}
                    </Select>
                  </div>
                </div>
                <div className="col-xl-4 pad10">
                  <div className="form-group">
                    <Select
                      defaultValue="Сум/Дүүрэг"
                      placeholder="Сум/Дүүрэг"
                      onChange={this.onChangeDistrict}
                    >
                      {this.renderDistrict()}
                    </Select>
                  </div>
                </div>
                <div className="col-xl-4 pad10">
                  <div className="form-group">
                    <Select
                      defaultValue="Баг/Хороо"
                      placeholder="Баг/Хороо"
                      onChange={this.onStreet}
                    >
                      {this.renderStreet()}
                    </Select>
                  </div>
                </div>
                <div className="col-xl-12 pad10">
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
              <button className="btn btn-dark">
                <span className="text-uppercase" onClick={this.handleSubmit}>
                  Хадгалах
                </span>
              </button>
            </div>
            <div className="delivery-address">
              <p className="title">
                <span>Бүртгэлтэй хаягууд</span>
              </p>
              <table style={{ width: "100%" }} className="table bordered">
                <tbody>{tableList}</tbody>
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
