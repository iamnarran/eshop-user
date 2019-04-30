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

  getOrderDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + " оны " + month + " сарын " + day + " ны өдөр";
  };

  render() {
    let p = [1, 2, 3, 4, 5, 6];
    const { type, changePage, data, readyBtn } = this.props;
    if (type == "paymentSucess") {
      const {
        delivery,
        userInfo,
        products,
        chosenInfo,
        userAddress,
        chosenPayment
      } = this.props;
      let addrs;
      if (userAddress.length !== 0) {
        if (chosenInfo.length !== 0) {
          userAddress.map((item, i) => {
            if (item.id == chosenInfo.address) {
              addrs = item.address;
            }
          });
        }
      }
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
                          Таны захиалга амжилттай үүслээ
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
                          <strong className="big">
                            {products.products.length}
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Мөнгөн дүн</span>
                          <strong className="big">
                            {formatter.format(products.totalPrice)}₮
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Төлбөрийн төрөл</span>
                          <strong className="big">{chosenPayment.name}</strong>
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
                        <span>
                          {" "}
                          {userInfo.length == 0
                            ? ""
                            : userInfo.lastname + " " + userInfo.firstname}
                        </span>
                      </p>
                      <p className="text flex-this">
                        <i className="fa fa-phone" aria-hidden="true" />
                        <span>
                          {" "}
                          {chosenInfo.length != 0
                            ? chosenInfo.phone1 + ", " + chosenInfo.phone2
                            : ""}
                        </span>
                      </p>
                      <p className="text flex-this">
                        <i className="fa fa-map-marker" aria-hidden="true" />
                        <span>
                          {chosenInfo.length != 0
                            ? chosenInfo.mainLocation +
                              ", " +
                              chosenInfo.subLocation +
                              ", " +
                              chosenInfo.commiteLocation +
                              ", " +
                              addrs
                            : ""}
                        </span>
                      </p>
                      <p className="text flex-this">
                        <i className="fa fa-calendar" aria-hidden="true" />
                        <span>{this.getOrderDate()}</span>
                      </p>
                    </div>
                    <div className="bottom-text text-center">
                      {/* <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed ullamcorper congue felis porta feugiat. Integer
                        elementum quam dapibus est tincidunt, at posuere ipsum
                        imperdiet.{" "}
                      </p> */}
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
      const { ordData } = this.props;
      return (
        <div className="checkout-container msg-bank">
          <div className="card-content" style={{ padding: "20px 20px 0px" }}>
            <Tabs tabPosition={"left"}>
              {data.map((item, i) => {
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
                          <span>{item.banknm}</span>
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
                            <strong>{item.account}</strong>
                          </li>
                          <li>
                            <span>Гүйлгээний утга</span>
                            <strong>{ordData.ordernumber}</strong>
                          </li>
                          <li>
                            <span>Хүлээн авагчийн нэр</span>
                            <strong>{item.name}</strong>
                          </li>
                          <li>
                            <span>Мөнгөн дүн</span>
                            <strong>
                              {formatter.format(ordData.totalamount)}₮
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPane>
                );
              })}
            </Tabs>
            <div className="text-right">
              <a onClick={e => readyBtn(e)} className="btn btn-main">
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
