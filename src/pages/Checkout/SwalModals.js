import React from "react";
import { connect } from "react-redux";
import { Collapse, Tabs, Divider } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withCart from "../../components/HOC/withCart";
import { IMAGE } from "../../utils/consts";
import { isMobile } from "react-device-detect";
const MySwal = withReactContent(Swal);
const formatter = new Intl.NumberFormat("en-US");
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
class SwalModals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBank: []
    };
  }

  componentWillMount() {
    const { type } = this.props;
    if (type == "msgBank") {
      const { data } = this.props;
      if (data.length !== 0) {
        this.setState({ chosenBank: data[0] });
      }
    }
  }

  getOrderDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + " оны " + month + " сарын " + day + " ны өдөр";
  };

  changeTab = e => {
    const { data } = this.props;
    if (data.length !== 0) {
      data.map((item, i) => {
        if (item.bankid == e) {
          this.setState({ chosenBank: item });
        }
      });
    }
  };

  renderBankLogo = () => {
    const { ordData } = this.props;
    let tmp;
    console.log(ordData.qpay);
    if (ordData.qpay.qPay_deeplink.lenght != 0) {
      tmp = ordData.qpay.qPay_deeplink.map((item, i) => {
        return (
          <div className="checkout-qpay" key={i}>
            <a href={item.link}>
              <img
                alt="logo"
                src={IMAGE + item.url}
                height="80px"
                style={{ marginBottom: "5px" }}
              />
              <center>{item.name}</center>
            </a>
          </div>
        );
      });
    }
    return tmp;
  };

  render() {
    let p = [1, 2, 3, 4, 5, 6];
    const { chosenBank } = this.state;
    const { type, changePage, data, readyBtn } = this.props;
    if (type == "paymentSucess") {
      const {
        delivery,
        userInfo,
        products,
        chosenInfo,
        userAddress,
        chosenPayment,
        bankInfo,
        ordData,
        paymentType
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
                          Таны захиалга амжилттай бүртгэгдлээ
                        </span>
                      </h4>
                    </div>
                    <div className="message">
                      <h5 className="title flex-this flex-space">
                        <span className="text-uppercase">
                          Захиалга <strong>{ordData.ordernumber}</strong>
                        </span>
                      </h5>
                      <ul className="list-unstyled class">
                        <li className="flex-this flex-space">
                          <span>Худалдаж авсан барааны тоо:</span>
                          <strong className="big">
                            {ordData.orderquantity}
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Мөнгөн дүн:</span>
                          <strong className="big">
                            {formatter.format(ordData.totalamount)}₮
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Төлбөрийн төрөл:</span>
                          <strong className="big">{chosenPayment.name}</strong>
                        </li>
                        {paymentType != "qpay" ? (
                          <div>
                            <li className="flex-this flex-space">
                              <span>Банк:</span>
                              <strong className="big">{bankInfo.banknm}</strong>
                            </li>
                            <li className="flex-this flex-space">
                              <span>Дансны дугаар:</span>
                              <strong className="big">
                                {bankInfo.account}
                              </strong>
                            </li>
                            <li className="flex-this flex-space">
                              <span>Хүлээн авагч:</span>
                              <strong className="big">{bankInfo.name}</strong>
                            </li>
                          </div>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                    <div className="user-detail">
                      <h5 className="title flex-this flex-space">
                        <span className="text-uppercase">
                          Хүргэлтийн мэдээлэл:
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
                      <p>
                        Та төлбөрөө <b style={{ fontWeight: "bold" }}>2</b>{" "}
                        цагийн дотор төлснөөр таны захиалга баталгаажиж
                        идэвхжинэ. Тус хугацаанд төлбөр төлөгдөөгүй тохиолдолд
                        захиалгыг автоматаар цуцлах болохыг анхаарна уу. <br />
                        {paymentType != "qpay" ? (
                          <div>
                            Төлбөрийг дээрх дансанд шилжүүлэх ба захиалгын
                            <b style={{ fontWeight: "bold" }}>
                              {ordData.ordernumber}
                            </b>{" "}
                            дугаарыг гүйлгээний утга дээр заавал бичнэ үү.
                          </div>
                        ) : (
                          ""
                        )}
                        <br />
                        <br />
                        Хүргэлттэй холбоотой лавлах зүйлс байвал доорх утсаар
                        холбогдоно уу. Баярлалаа
                      </p>
                      <strong className="text-uppercase">
                        Лавлах утас: 7611 0101
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
                      <a
                        className="btn btn-dark"
                        onClick={e => changePage(e, "/order/" + ordData.id)}
                      >
                        <span className="text-uppercase">Захиалга харах</span>
                      </a>
                    </div>
                    {/*  <div className="bottom-text text-center">
                      <p>И-баримтыг таны имэйлрүү явуулсан.</p>
                    </div> */}
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
          <div className="card-content">
            <Tabs tabPosition={"left"} onChange={this.changeTab}>
              {data.map((item, i) => {
                return (
                  <TabPane
                    tab={
                      <li
                        className="active"
                        style={{ textAlign: "left", fontWeight: "100" }}
                      >
                        <span className="contain">
                          <img
                            alt="logo"
                            /* src={require("../../scss/assets/images/demo/golomt.png")} */
                            src={IMAGE + item.logo}
                            style={{ marginRight: "5px" }}
                            width="22px"
                          />
                          <span>{item.banknm}</span>
                        </span>
                      </li>
                    }
                    key={item.bankid}
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
            <div className="text-right" style={{ marginTop: "10px" }}>
              <a
                onClick={e => readyBtn(e, chosenBank, ordData, type)}
                className="btn btn-main"
              >
                <span className="text-uppercase">Болсон</span>
              </a>
            </div>
          </div>
        </div>
      );
    } else if (type == "qpay") {
      const { data, type, ordData, readyBtn } = this.props;
      return (
        <div className="checkout-container msg-bank">
          <div className="card-content">
            <div className="col-md-12 pad10">
              <p className="title">
                <strong>Гүйлгээний мэдээлэл</strong>
              </p>
              <div className="menu-content" style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <ul className="list-unstyled">
                    <li>
                      <span>Гүйлгээний утга</span>
                      <strong>{ordData.ordernumber}</strong>
                    </li>
                    <li>
                      <span>Мөнгөн дүн</span>
                      <strong>{formatter.format(ordData.payamount)}₮</strong>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    alt="qr code"
                    src={"data:image/png;base64, " + ordData.qpay.qPay_QRimage}
                    className="qr-code img-fluid"
                    height="200px"
                  />
                </div>
              </div>
            </div>
            {isMobile ? (
              <div>
                <Divider style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                  Төлөх аргууд
                </Divider>
                <div className="row">{this.renderBankLogo()}</div>
              </div>
            ) : (
              ""
            )}

            <div className="text-center" style={{ marginTop: "10px" }}>
              <a
                href="#"
                className="btn btn-main"
                style={{ marginRight: "10px" }}
              >
                <span className="text-uppercase">Төлбөр шалгах</span>
              </a>
              <a
                onClick={e => readyBtn(e, chosenBank, ordData, type)}
                className="btn btn-main"
              >
                <span className="text-uppercase">Болсон</span>
              </a>
            </div>
          </div>
        </div>
      );
    } else if (type == "agreement") {
      const { agreementCancel, agreementApprove } = this.props;
      return (
        <div className="title-container">
          <h5 className="title">
            <a className="flex-this">
              <span>Үйлчилгээний нөхцөл</span>
            </a>
          </h5>
          <div className="title-button ">
            <p className="text agreement-modal-text">
              Бид үйлчлүүлэгчдийнхээ амьдралыг аз жаргалтай байлгахын тулд
              хамгийн сайн бараа, үйлчилгээг үзүүлэхийг эрмэлздэг. Бид хэлж буй,
              хийж буй бүхий л зүйлдээ хариуцлага хүлээх байлгахын хүсэл
              тэмүүлэл, бахархал, бүтээлч сэтгэлгээ маань бидний брендүүд болон
              байгууллагын дүр зурагт тусгагдсан байдаг.
              <br /> Бид үйлчлүүлэгчдийнхээ амьдралыг аз жаргалтай байлгахын
              тулд хамгийн сайн бараа, үйлчилгээг үзүүлэхийг эрмэлздэг. Бид хэлж
              буй, хийж буй бүхий л зүйлдээ хариуцлага хүлээх байлгахын хүсэл
              тэмүүлэл, бахархал, бүтээлч сэтгэлгээ маань бидний брендүүд болон
              байгууллагын дүр зурагт тусгагдсан байдаг.
            </p>
          </div>
          <h6 className="title">
            <a className="flex-this">
              <span>Хэрэглэгчдийг чухалчлах</span>
            </a>
          </h6>
          <div className="title-button ">
            <p className="text agreement-modal-text">
              Имартын шинэ өдөр хэрэгчдэдээ хэрхэн илүү сайн үйлчлэх вэ гэсэн
              бодлоор эхлэдэг. Учир нь бидний бизнесийн амжилтын ард хэрэглэгч,
              үйлчлүүлэгчид маань байдаг гэдгийг мэддэг.
            </p>
          </div>
          <h6 className="title">
            <a className="flex-this">
              <span>Үйлчилгээний нөхцөлийг зөвшөөрч байна уу ?</span>
            </a>
          </h6>
          <div className="btn-container text-left">
            <a
              className="btn btn-main"
              style={{ marginRight: "5px" }}
              onClick={e => agreementApprove(e)}
            >
              <span className="text-uppercase">Зөвшөөрөх</span>
            </a>
            <a className="btn btn-dark" onClick={e => agreementCancel(e)}>
              <span className="text-uppercase">Цуцлах</span>
            </a>
          </div>
        </div>
      );
    } else if (type == "emarchant") {
      return <div>Оронд нь Имерчант дуудна</div>;
    }
  }
}

export default SwalModals;
