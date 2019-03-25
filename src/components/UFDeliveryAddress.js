import React from "react";
import { Form, message, Input, Select } from "antd";
import api from "../api";
const Option = Select.Option;
class Component extends React.Component {
  state = {
    cityOrProvince: [],
    districtOrSums: [],
    districtOrSum: [],
    city: false,
    name: null,
    phone: null,
    homeaddress: null
  };

  componentDidMount() {
    api.location.findAll().then(res => {
      if (res.success) {
        const cityOrProvince = [];
        const map = new Map();
        res.data.map(index => {
          if (!map.has(index.provinceid)) {
            map.set(index.provinceid, true);
            cityOrProvince.push(index);
          }
          return "";
        });
        this.setState({
          cityOrProvince: cityOrProvince,
          districtOrSum: res.data,
          districtOrSums: res.data
        });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success("Хүргэлтийн хаяг амжилттай бүртгэгдлээ");
      }
    });
  };

  onChangeCity = e => {
    let tmp = [];
    this.state.districtOrSums.map(i => {
      if (i.provinceid === e) {
        tmp.push(i);
      }
      return "";
    });
    this.setState({ districtOrSum: tmp });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handlePhone = e => {
    this.setState({ phone: e.target.value });
  };
  handleHomeAddress = e => {
    this.setState({ homeaddress: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, phone, homeaddress } = this.state;
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
                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Select
                      defaultValue="Хот/Аймаг"
                      onChange={this.onChangeCity}
                      placeholder="Хот/Аймаг"
                    >
                      {this.state.cityOrProvince.map((item, index) => {
                        return (
                          <Option key={index} value={item.provinceid}>
                            {item.provincenm}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Select defaultValue="Хот/Аймаг" placeholder="Хот/Аймаг">
                      {this.state.districtOrSum.map((item, index) => {
                        return <Option value={index}>{item.districtnm}</Option>;
                      })}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const App = Form.create({ name: "delivery" })(Component);
export default App;
