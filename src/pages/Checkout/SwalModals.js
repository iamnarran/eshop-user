import React from "react";
import { connect } from "react-redux";
import { Collapse, Tabs } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withCart from "../../components/HOC/withCart";
import { IMAGE } from "../../utils/consts";
const MySwal = withReactContent(Swal);
const formatter = new Intl.NumberFormat("en-US");
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class SwalModals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let p = [1, 2, 3, 4, 5, 6];
    const { type, changePage } = this.props;
    if (type == "paymentSucess") {
      return (
        <div className="wrap">
          <div className="success-message-container">
            <div className="container pad10">
              <div className="row row10">
                <div className="offset-md-1 col-md-10 pad10">
                  <div className="content">
                    <div className="text-center">
                      <img
                        alt="image"
                        src={require("../../scss/assets/images/demo/4.png")}
                      />
                      <h4 className="title">
                        <span className="text-uppercase">
                          Таны төлбөр баталгаажлаа
                        </span>
                      </h4>
                    </div>
                    <div className="message">
                      <h5 className="title flex-this flex-space">
                        <span className="text-uppercase">Захиалга #022</span>
                      </h5>
                      <ul className="list-unstyled class">
                        <li className="flex-this flex-space">
                          <span>Худалдаж авсан барааны тоо:</span>
                          <strong className="big">2</strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Мөнгөн дүн</span>
                          <strong className="big">11,400₮</strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Төлбөрийн төрөл</span>
                          <strong className="big">Интернэт банк</strong>
                        </li>
                      </ul>
                    </div>
                    <div className="user-detail">
                      <h5 className="title flex-this flex-space">
                        <span className="text-uppercase">
                          Хүргэлтийн мэдээлэл
                        </span>
                      </h5>
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
                          Улаанбаатар хот, Баянзүрх дүүрэг, 17 хороо, 35-р байр,
                          5 давхар, 37 тоот, код - 8759
                        </span>
                      </p>
                      <p className="text flex-this">
                        <i className="fa fa-calendar" aria-hidden="true" />
                        <span>2018 оны 8 сарын 07</span>
                      </p>
                    </div>
                    <div className="bottom-text text-center">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed ullamcorper congue felis porta feugiat. Integer
                        elementum quam dapibus est tincidunt, at posuere ipsum
                        imperdiet.{" "}
                      </p>
                      <strong className="text-uppercase">
                        Лавлах утас: 7700 7700
                      </strong>
                    </div>
                    <div className="btn-container text-center">
                      <a
                        className="btn btn-main"
                        onClick={e => changePage(e, "/")}
                      >
                        <span className="text-uppercase">
                          Нүүр хуудасруу буцах
                        </span>
                      </a>
                      <a href="#" className="btn btn-dark">
                        <span className="text-uppercase">Захиалга харах</span>
                      </a>
                    </div>
                    <div className="bottom-text text-center">
                      <p>И-баримтыг таны имэйлрүү явуулсан.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (type == "msgBank") {
      return (
        <div className="checkout-container msg-bank">
          <div className="card-content" style={{ padding: "20px 20px 0px" }}>
            <Tabs tabPosition={"left"}>
              {p.map((item, i) => {
                return (
                  <TabPane
                    tab={
                      <li className="active">
                        <span className="contain">
                          <img
                            alt="logo"
                            src={require("../../scss/assets/images/demo/golomt.png")}
                            style={{ marginRight: "5px" }}
                          />
                          <span>Голомт банк</span>
                        </span>
                      </li>
                    }
                    key={i}
                  >
                    <div className="col-md-12 pad10">
                      <p className="title">
                        <strong>Гүйлгээний мэдээлэл</strong>
                      </p>
                      <div className="menu-content">
                        <ul className="list-unstyled">
                          <li>
                            <span>Данс</span>
                            <strong>501020304050</strong>
                          </li>
                          <li>
                            <span>Гүйлгээний утга</span>
                            <strong>501020304050</strong>
                          </li>
                          <li>
                            <span>Хүлээн авагчийн нэр</span>
                            <strong>501020304050</strong>
                          </li>
                          <li>
                            <span>Мөнгөн дүн</span>
                            <strong>501020304050</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPane>
                );
              })}
            </Tabs>
            <div className="text-right">
              <a href="#" className="btn btn-main">
                <span className="text-uppercase">Болсон</span>
              </a>
            </div>
          </div>
        </div>
      );
    } else if (type == "qpay") {
      return (
        <div>
          <Tabs defaultActiveKey="1" tabPosition={"left"}>
            {p.map((item, i) => {
              return (
                <TabPane
                  tab={
                    <li className="active">
                      <span className="contain">
                        <img
                          alt="logo"
                          src={require("../../scss/assets/images/demo/golomt.png")}
                          style={{ marginRight: "5px" }}
                        />
                        <span>Голомт банк</span>
                      </span>
                    </li>
                  }
                  key={i}
                >
                  <div className="menu-content">
                    <img
                      alt="qr code"
                      src={require("../../scss/assets/images/demo/qr.png")}
                      className="qr-code img-fluid"
                      style={{ height: "150px" }}
                    />
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
          <div className="text-right">
            <a href="#" className="btn btn-main">
              <span className="text-uppercase">Болсон</span>
            </a>
          </div>
        </div>
      );
    }
  }
}

export default SwalModals;
