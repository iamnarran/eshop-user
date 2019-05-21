import React from "react";
import { Form, message, Input, Select } from "antd";
import api from "../api";
const Option = Select.Option;
class Component extends React.Component {
  state = {
    cityOrProvince: [],
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
          districtOrSum: res.data
        });
        this.onChangeCity("11"); //defualt UB
      }
    });
  }

  onChangeCity = e => {
    const { districtOrSum } = this.state;
    let tmp = [];

    districtOrSum.map(i => {
      if (i.provinceid === e) {
        tmp.push(i);
      }
      return "";
    });
    this.setState({ districtOrSum: tmp });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success("Хүргэлтийн хаяг амжилттай бүртгэгдлээ");
      }
    });
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
    const { cityOrProvince, districtOrSum } = this.state;
    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Профайл хуудас</span>
          </p>
          <div className="user-profile-contain">
            <form>
              <div className="row row10">
                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("fname", {
                        rules: [
                          {
                            required: true,
                            message: "Овогоо заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="Овог"
                          onChange={this.handleName}
                          value={name}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("lname", {
                        rules: [
                          {
                            required: true,
                            message: "Нэрээ заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="Нэр"
                          onChange={this.handleName}
                          value={name}
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
                            message: "Утасаа заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="Утас"
                          onChange={this.handleName}
                          value={phone}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message: "Имейл хаягаа заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="Имейл"
                          onChange={this.handleName}
                          value={name}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-12 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "Нууц үгээ заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="Нууц үг"
                          onChange={this.handleHomeAddress}
                          value={homeaddress}
                          type={"password"}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Select
                      label="Хот/Аймаг"
                      option={cityOrProvince}
                      city
                      onChange={this.onChangeCity}
                    />
                  </div>
                </div>

                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Select label="Сум/Дүүрэг" option={districtOrSum} />
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
                      })(
                        <Input
                          label="Гэрийн хаяг"
                          onChange={this.handleHomeAddress}
                          value={homeaddress}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-12 pad10">
                  <b>И-март карт холбох</b>
                </div>
                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("emart-card-number", {
                        rules: [
                          {
                            required: true,
                            message: "И-март картын дугаараа заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="И-март картын дугаар"
                          onChange={this.handleName}
                          value={name}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <Form.Item>
                      {getFieldDecorator("emart-card-pass", {
                        rules: [
                          {
                            required: true,
                            message:
                              "И-март картын нууц үгээ заавал оруулна уу!"
                          }
                        ]
                      })(
                        <Input
                          label="И-март картын нууц үг"
                          onChange={this.handleName}
                          value={name}
                          type={"password"}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
            </form>
            <div className="text-right">
              <button className="btn btn-dark">
                <span className="text-uppercase" onClick={this.handleSubmit}>
                  Хадгалах
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const App = Form.create({ name: "profile" })(Component);
export default App;
