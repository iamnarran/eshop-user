import React from "react";
import { Collapse, Icon, Tabs, Radio, Input, Form } from "antd";

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      collapse: [],
      collapseKey: [],
      collapseType: null,
      activeKey: ["1"]
    };
  }

  onClick = () => {
    console.log("aa");
  };

  changeRadio = e => {
    if (e.target.id == "exampleRadios13") {
    }
  };

  paymentType = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a
            href="#"
            className="collapsed  flex-this"
            role="button"
            data-toggle="collapse"
            data-target="#block3"
            aria-expanded="false"
            aria-controls="block3"
          >
            <i className="fa fa-credit-card" aria-hidden="true" />
            <span>Төлбөрийн төрөл</span>
          </a>
        </h5>
      </div>
    );
  };

  optionType = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a
            href="#"
            className="collapsed flex-this"
            role="button"
            data-toggle="collapse"
            data-target="#block4"
            aria-expanded="false"
            aria-controls="block4"
          >
            <i className="fa fa-plus-square" aria-hidden="true" />
            <span>Нэмэлт сонголт</span>
          </a>
        </h5>
      </div>
    );
  };

  customerTab = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a
            className="collapsed flex-this"
            role="button"
            data-toggle="collapse"
            data-target="#block1"
            aria-expanded="false"
            aria-controls="block1"
          >
            <i className="fa fa-user" aria-hidden="true" />
            <span>Хэрэглэгчээр бүртгүүлэх</span>
          </a>
        </h5>
        <div className="title-button text-right">
          <p className="text">Бүртгэлтэй бол:</p>
          <a className="btn btn-gray solid">
            <span className="text-uppercase">Нэвтрэх</span>
          </a>
        </div>
      </div>
    );
  };

  deliveryInfo = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a
            href="#"
            className="collapsed  flex-this"
            role="button"
            data-toggle="collapse"
            data-target="#block3"
            aria-expanded="false"
            aria-controls="block3"
          >
            <i className="fa fa-credit-card" aria-hidden="true" />
            <span>Хүргэлтийн төрөл</span>
          </a>
        </h5>
      </div>
    );
  };

  callback = key => {
    console.log(key);
    this.setState({
      activeKey: key
    });
  };

  handleClick = e => {
    e.preventDefault();
    let tmp = [];
    if (e.target.name === "delivery") {
      tmp.push("3");
    } else if (e.target.name === "payment") {
      tmp.push("4");
    }
    this.setState({
      collapseType: e.target.name,
      activeKey: tmp
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      } else {
        console.log("error");
      }
    });
  };

  render() {
    //const { getFieldDecorator } = this.props.form;
    return (
      <div className="section section-gray">
        <div className="container pad10">
          <div className="checkout-container">
            <div className="btn btn-gray">
              <i className="fa fa-chevron-left" aria-hidden="true">
                {" "}
              </i>
              <span className="text-uppercase">Захиалга засах</span>
            </div>
            <div className="row row10">
              <div className="col-lg-8 pad10">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <Collapse
                        accordion
                        activeKey={this.state.activeKey}
                        onChange={this.callback}
                      >
                        <Panel
                          showArrow={false}
                          header={this.customerTab()}
                          key="1"
                        >
                          <div>
                            <div
                              id="block1"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                            >
                              <div className="content-container">
                                <div className="socials flex-this flex-wrap">
                                  <button
                                    type="submit"
                                    className="btn btn-social btn-facebook"
                                  >
                                    <span>Facebook-р бүртгүүлэх</span>
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-social btn-gmail"
                                  >
                                    <span>Gmail-р бүртгүүлэх</span>
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-social btn-emart"
                                  >
                                    <span>Имарт картаар бүртгүүлэх</span>
                                  </button>
                                </div>
                                <span className="divide-maker">Эсвэл</span>
                                <form>
                                  <div className="row row10">
                                    <div className="col-xl-6 pad10">
                                      <div className="form-group">
                                        <label
                                          htmlFor="exampleInputEmail1"
                                          className="sr-only"
                                        >
                                          Email address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Овог*"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-xl-6 pad10">
                                      <div className="form-group">
                                        <label
                                          htmlFor="exampleInputEmail1"
                                          className="sr-only"
                                        >
                                          Email address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Овог*"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-xl-12 pad10">
                                      <div className="form-group">
                                        <label
                                          htmlFor="exampleInputEmail1"
                                          className="sr-only"
                                        >
                                          Email address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Овог*"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-xl-6 pad10">
                                      <div className="form-group">
                                        <label
                                          htmlFor="exampleInputEmail1"
                                          className="sr-only"
                                        >
                                          Email address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Овог*"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-xl-12 pad10">
                                      <div className="form-group">
                                        <label
                                          htmlFor="exampleInputEmail1"
                                          className="sr-only"
                                        >
                                          Email address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputEmail1"
                                          aria-describedby="emailHelp"
                                          placeholder="Овог*"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-dark btn-bigger"
                                  >
                                    <span className="text-uppercase">
                                      Бүртгүүлэх
                                    </span>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Panel>
                        <Panel
                          header={this.deliveryInfo()}
                          showArrow={false}
                          key="2"
                        >
                          <Tabs>
                            {this.props.container.deliveryTypes.map(
                              (item, i) => {
                                console.log(item);
                                return (
                                  <TabPane
                                    tab={
                                      <div className="flex-this center">
                                        <img
                                          alt="icon"
                                          src="images/demo/1.png"
                                        />
                                        <p className="text">
                                          <strong>{item.typenm}</strong>
                                          <span>{item.price + "₮"}</span>
                                        </p>
                                      </div>
                                    }
                                    key={i}
                                  >
                                    <div
                                      className="tab-pane active"
                                      id="home"
                                      role="tabpanel"
                                      aria-labelledby="home-tab"
                                    >
                                      <p className="text">
                                        Энийг хүргэлт (48 цагийн дотор) - 89,000
                                        төгрөгнөөс дээш бараа авсан тохиолдолд
                                        үнэгүй
                                      </p>
                                      <Form
                                        {...formItemLayout}
                                        onSubmit={this.onSubmit}
                                      >
                                        <div className="row row10">
                                          <div className="col-xl-6 pad10" />
                                          <div className="col-xl-6 pad10">
                                            <div className="form-group">
                                              <label
                                                htmlFor="exampleInputEmail1"
                                                className="sr-only"
                                              >
                                                Email address
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Овог*"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-xl-12 pad10">
                                            <div className="form-group">
                                              <label
                                                htmlFor="exampleInputEmail1"
                                                className="sr-only"
                                              >
                                                Email address
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Овог*"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="text-right">
                                          <button
                                            className="btn btn-main"
                                            name="delivery"
                                            htmlType="submit"
                                            onClick={this.handleClick}
                                          >
                                            Дараах
                                          </button>
                                        </div>
                                      </Form>
                                    </div>
                                  </TabPane>
                                );
                              }
                            )}
                          </Tabs>
                        </Panel>
                        <Panel
                          header={this.paymentType()}
                          showArrow={false}
                          key="3"
                          disabled={
                            this.state.collapseType === "delivery"
                              ? false
                              : true
                          }
                        >
                          <div className="content-container">
                            <label
                              className="card radio-card"
                              htmlFor="exampleRadios13"
                            >
                              <div className="radio-button-container">
                                <input
                                  className="form-check-input radio-button"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios13"
                                  value="option1"
                                  onChange={this.changeRadio}
                                />
                              </div>
                              <h5 className="title radio-button-title">
                                <i
                                  className="fa fa-credit-card"
                                  aria-hidden="true"
                                />
                                <p>
                                  <strong>Төлбөрийн карт</strong>
                                  <span>И-пин код оруулж төлөх</span>
                                </p>
                              </h5>
                            </label>
                            <label
                              className="card radio-card"
                              htmlFor="exampleRadios14"
                            >
                              <div className="radio-button-container">
                                <input
                                  className="form-check-input radio-button"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios14"
                                  value="option1"
                                  onChange={this.changeRadio}
                                />
                              </div>
                              <h5 className="title radio-button-title">
                                <i
                                  className="fa fa-envelope"
                                  aria-hidden="true"
                                />
                                <p>
                                  <strong>Мэссэж банк</strong>
                                  <span>И-пин код оруулж төлөх</span>
                                </p>
                              </h5>
                            </label>

                            <label
                              className="card radio-card"
                              htmlFor="exampleRadios15"
                            >
                              <div className="radio-button-container">
                                <input
                                  className="form-check-input radio-button"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios15"
                                  value="option1"
                                  onChange={this.changeRadio}
                                />
                              </div>
                              <h5 className="title radio-button-title">
                                <i
                                  className="fa fa-qrcode"
                                  aria-hidden="true"
                                />
                                <p>
                                  <strong>Qpay</strong>
                                  <span>И-пин код оруулж төлөх</span>
                                </p>
                              </h5>
                            </label>
                          </div>
                          <hr />
                          <div className="text-right">
                            <button
                              className="btn btn-main"
                              name="payment"
                              onClick={this.handleClick}
                            >
                              Дараах
                            </button>
                          </div>
                        </Panel>
                        <Panel
                          header={this.optionType()}
                          showArrow={false}
                          key="4"
                          disabled={
                            this.state.collapseType === "payment" ? false : true
                          }
                        >
                          <div
                            id="block4"
                            className="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordionExample"
                          >
                            <div className="content-container payment">
                              <p className="title">
                                <strong>НӨАТ</strong>
                              </p>
                              <div
                                id="collapseFour"
                                className="collapse show"
                                aria-labelledby="headingFour2"
                                data-parent="#accordionExample2"
                              >
                                <div className="hand-pay flex-this">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios1"
                                      id="exampleRadios16"
                                      value="option1"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios16"
                                    >
                                      Хувь хүн
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios1"
                                      id="exampleRadios17"
                                      value="option2"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios17"
                                    >
                                      Байгууллага
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-content">
                                <div
                                  className="tab-pane"
                                  id="home1"
                                  role="tabpanel"
                                  aria-labelledby="home-tab1"
                                >
                                  <p className="title">
                                    <strong>Имарт картаа холбох</strong>
                                  </p>
                                  <form>
                                    <div className="row row10">
                                      <div className="col-xl-6 pad10">
                                        <div className="form-group">
                                          <label
                                            htmlFor="exampleInputEmail1"
                                            className="sr-only"
                                          >
                                            Email address
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Овог*"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row row10">
                                      <div className="col-xl-6 pad10">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Овог*"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button className="btn btn-gray solid">
                                      <span className="text-uppercase">
                                        Холбох
                                      </span>
                                    </button>
                                  </form>
                                  <p className="title">
                                    <strong>Купоны дугаар ашиглах</strong>
                                  </p>
                                  <form>
                                    <div className="row row10">
                                      <div className="col-xl-6 pad10">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Овог*"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button className="btn btn-gray solid">
                                      <span className="text-uppercase">
                                        Ашиглах
                                      </span>
                                    </button>
                                  </form>
                                </div>
                                <div
                                  className="tab-pane active"
                                  id="profile1"
                                  role="tabpanel"
                                  aria-labelledby="profile-tab1"
                                >
                                  <form>
                                    <div className="row row10">
                                      <div className="col-xl-6 pad10">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Байгууллагын регистэр"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button className="btn btn-gray solid">
                                      <span className="text-uppercase">
                                        Ашиглах
                                      </span>
                                    </button>
                                    <button className="btn btn-main solid">
                                      <span className="text-uppercase">
                                        Холбох
                                      </span>
                                    </button>
                                    <button className="btn ">
                                      <span className="text-uppercase">
                                        Засах
                                      </span>
                                    </button>
                                  </form>
                                  <p className="title">
                                    <strong>Купоны дугаар ашиглах</strong>
                                  </p>
                                  <form>
                                    <div className="row row10">
                                      <div className="col-xl-6 pad10">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Купоны дугаар"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-gray solid"
                                    >
                                      <span className="text-uppercase">
                                        Ашиглах
                                      </span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pad10">
                <div className="block right-panel">
                  <p className="title">
                    <strong>Болд ГАНЗОРИГ</strong>
                  </p>
                  <hr />
                  <div className="content">
                    <p className="title">
                      <strong>Хүргэлтийн мэдээлэл</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Хүргэлтийн төрөл</span>
                      <strong>Энгийн</strong>
                    </p>
                    <p className="text flex-this">
                      <i className="fa fa-user" aria-hidden="true" />
                      <span>Болд Ганзориг</span>
                    </p>
                    <p className="text flex-this">
                      <i className="fa fa-phone" aria-hidden="true" />
                      <span>9911 9911</span>
                    </p>
                    <p className="text flex-this">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                      <span>
                        Улаанбаатар хот, Баянзүрх дүүрэг, 17 хороо, 35-р байр, 5
                        давхар, 37 тоот, код - 8759
                      </span>
                    </p>
                  </div>
                  <hr />
                  <div className="content">
                    <p className="title">
                      <strong>Төлөх дүн</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Бараа (2):</span>
                      <strong>11,400₮</strong>
                    </p>
                    <p className="text flex-space">
                      <span>Хүргэлтийн үнэ:</span>
                      <strong>3,000₮</strong>
                    </p>
                    <hr />
                    <p className="text flex-space">
                      <span>Нийт дүн:</span>
                      <strong>14,400₮</strong>
                    </p>
                    <p className="text flex-space">
                      <span>НӨАТ:</span>
                      <strong>1,140₮</strong>
                    </p>
                    <p className="text text-center">
                      <span>89,000₮-с дээш бол хүргэлт үнэгүй</span>
                    </p>
                    <a href="#" className="btn btn-main btn-block">
                      <span className="text-uppercase">Тооцоо хийх</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "checkout" })(Checkout);
