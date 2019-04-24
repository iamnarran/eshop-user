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
import api from "../../api";
import LoginModal from "../../components/LoginModal";
import actions from "../../actions/checkout";
import DeliveryInfo from "./DeliveryInfo";
import SwalModals from "./SwalModals";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withCart from "../../components/HOC/withCart";
import { IMAGE } from "../../utils/consts";
const MySwal = withReactContent(Swal);
const Option = Select.Option;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const formatter = new Intl.NumberFormat("en-US");

class DeliveryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  render() {
    //const { getFieldDecorator } = this.props.form;
    const {
      deliveryTypes,
      changeTab,
      onSubmit,
      addresstype,
      onChangeMainLoc,
      onChangeSubLoc,
      addAddress,
      getFieldDecorator,
      key
    } = this.props;

    return (
      <Panel header={this.deliveryInfo()} showArrow={false} key={key}>
        <Tabs onChange={e => changeTab(e)}>
          {deliveryTypes.map((item, i) => {
            return (
              <TabPane
                tab={
                  <div className="flex-this center">
                    <img
                      alt="icon"
                      src={require("../../scss/assets/images/demo/" +
                        item.logo)}
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

                  <Form onSubmit={e => onSubmit(e)} name="delivery">
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
                                  onSelect={(value, event) =>
                                    addAddress(value, event)
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
                              )
                            )}
                          </Form.Item>
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
                              onChange={e => onChangeMainLoc}
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
                              onChange={e => onChangeSubLoc}
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
          })}
        </Tabs>
      </Panel>
    );
  }
}

export default DeliveryPanel;
