import React from "react";
import { connect } from "react-redux";
import { Icon, Tabs, Input, Form, Select } from "antd";
import api from "../../api";
import moment from "moment";
import { DatePicker } from "antd";

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const formatter = new Intl.NumberFormat("en-US");

@connect(mapStateToProps)
class DeliveryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAddress: [],
      addresstype: "edit",
      userInfo: [],
      userAddress: [],
      epointcard: null
    };
  }

  componentWillMount() {
    if (this.props.isLoggedIn == true) {
      this.getUserInfo(this.props.user);
    }
  }

  getUserInfo = async user => {
    await api.checkout.findUserData({ id: user.id }).then(res => {
      if (res.success == true) {
        if (res.data.addrs.length != 0) {
          res.data.addrs.map((item, i) => {
            if (item.ismain == 1) {
              this.setState({ defaultAddress: item });
            }
          });
          //this.state.defaultAddress.provinceid = 11;
          this.props.form.setFieldsInitialValue({
            address: this.state.defaultAddress.id,
            mainLocation: this.state.defaultAddress.provincenm,
            subLocation: this.state.defaultAddress.districtnm,
            commiteLocation: this.state.defaultAddress.committeenm
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

  renderMainLocation = () => {
    const { mainLocation } = this.props;
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

  renderSubLocation = e => {
    const { subLocation } = this.props;
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

  renderAddrsOption = () => {
    const { userAddress } = this.props;
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

  renderCommiteLocation = e => {
    const { commiteLocation } = this.props;
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

  addAddress = (value, event) => {
    const { addAddress } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addAddress(value, event, this.props.form);
      }
    });
    //changeAddressType("new");
    if (value == null) {
      this.props.form.resetFields();
      this.setState({ addresstype: "new" });
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

  getValue = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        return values;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { addresstype } = this.state;
    const {
      deliveryTypes,
      changeTab,
      onSubmit,
      onChangeMainLoc,
      onChangeSubLoc,
      addAddress,
      deliveryId,
      key,
      dateString,
      dateStringChange,
      addresstype
    } = this.props;
    const style = {
      color: "#feb415"
    };
    return (
      <Tabs onChange={e => changeTab(e, this.props.form)} defaultActiveKey="1">
        {deliveryTypes.map((item, i) => {
          let k = item.logo;
          if (deliveryId == item.id) {
            k = item.logo.split(".")[0] + "color." + item.logo.split(".")[1];
          }
          // k = item.logo.split(".")[0] + "color." + item.logo.split(".")[1];
          return (
            <TabPane
              tab={
                <div className="flex-this center">
                  <img
                    alt="icon"
                    //className={deliveryId == item.id ? "filteredImg" : ""}
                    width="40px"
                    height="40px"
                    src={require("../../scss/assets/images/demo/" + k)}
                  />
                  <p className="text">
                    <strong>{item.typenm}</strong>
                    <span>{formatter.format(item.price) + "₮"}</span>
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
                  onSubmit={e => onSubmit(e, this.props.form)}
                  name="delivery"
                >
                  <div className="row row10">
                    {item.id != 3 ? (
                      <div className="col-xl-12 col-md-12">
                        {addresstype == "new" ? (
                          <Form.Item>
                            {getFieldDecorator("addresstype", {
                              rules: [
                                {
                                  required: true,
                                  message: "Хаяг оруулна уу1"
                                }
                              ]
                            })(
                              <Input
                                type="text"
                                placeholder="Хаягаа сонгоно уу ?*"
                              />
                            )}
                          </Form.Item>
                        ) : (
                          <Form.Item>
                            {getFieldDecorator("address", {
                              rules: [
                                {
                                  required: true,
                                  message: "Хаяг оруулна уу"
                                }
                              ]
                            })(
                              <Select
                                onSelect={(value, event) =>
                                  addAddress(value, event, this.props.form)
                                }
                                placeholder="Хаягаа сонгоно уу ?"
                              >
                                {this.renderAddrsOption()}
                                <Option value={null}>
                                  <div
                                    style={{
                                      cursor: "pointer"
                                    }}
                                  >
                                    <Icon type="plus" /> Хаяг нэмэх
                                  </div>
                                </Option>
                              </Select>
                            )}
                          </Form.Item>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-xl-4 col-md-4">
                      <Form.Item>
                        {getFieldDecorator("mainLocation", {
                          rules: [
                            {
                              required: true,
                              message: "Хот/Аймаг сонгоно уу?"
                            }
                          ]
                        })(
                          <Select
                            placeholder="Хот/аймаг *"
                            className="col-md-12"
                            onChange={e => onChangeMainLoc(e, this.props.form)}
                          >
                            {this.renderMainLocation()}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 col-md-4">
                      <Form.Item>
                        {getFieldDecorator("subLocation", {
                          rules: [
                            {
                              required: true,
                              message: "Дүүрэг/Сум сонгоно уу?"
                            }
                          ]
                        })(
                          <Select
                            placeholder="Дүүрэг/Сум*"
                            onChange={e =>
                              onChangeSubLoc(e, this.props.form.validateFields)
                            }
                          >
                            {this.renderSubLocation()}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 col-md-4">
                      <Form.Item>
                        {getFieldDecorator("commiteLocation", {
                          rules: [
                            {
                              required: true,
                              message: "Хороо сонгоно уу?"
                            }
                          ]
                        })(
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
                              pattern: new RegExp("^[0-9]*$"),
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
                              pattern: new RegExp("^[0-9]*$"),
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
                  <div className="text-left">
                    <span
                      style={{
                        marginLeft: "10px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontWeight: "bold"
                      }}
                    >
                      Хүргэлтээр авах өдрөө сонгоно уу
                    </span>

                    <DatePicker
                      style={{ marginLeft: "10px" }}
                      format="YYYY-MM-DD"
                      showTime={false}
                      placeholder="Огноо сонгох"
                      defaultValue={moment(dateString, "YYYY-MM-DD")}
                      allowClear={false}
                      onChange={(date, dateString) =>
                        dateStringChange(date, dateString)
                      }
                      /*  disabledDate={disabledDate}
                      disabledTime={disabledDateTime} */
                    />
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
        })}
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
}

export default Form.create({ name: "checkoutdelivery" })(DeliveryPanel);
