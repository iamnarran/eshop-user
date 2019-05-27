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

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <div className="user-profile-contain">
            <div className="row row10">
              <div className="col-xl-4 pad10">
                <p>Та Имартын карт холбоогүй байна. </p>
              </div>
              <div className="col-xl-4 pad10">
                <div className="text-right">
                  <button className="btn btn-dark">
                    <span
                      className="text-uppercase"
                      onClick={this.handleSubmit}
                    >
                      Хадгалах
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <Form>
              <div className="row row10">
                <div className="col-xl-4 pad10">
                  <div className="e-mart-input">
                    <Form.Item>
                      {getFieldDecorator("kartNo", {
                        rules: [
                          {
                            required: true,
                            message: "Имарт картын дугаар заавал оруулна уу!"
                          }
                        ]
                      })(<Input placeholder="Имарт картын дугаар" />)}
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-4 pad10">
                  <div className="e-mart-input">
                    <Form.Item>
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "Нууц үгээ заавал оруулна уу!"
                          }
                        ]
                      })(<Input placeholder="Нууц үг" />)}
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
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
