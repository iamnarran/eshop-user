import React from "react";
/* import { connect } from "react-redux"; */
import Swal from "sweetalert2";
import { Checkbox, Modal /* , Button */ } from "antd";
import withReactContent from "sweetalert2-react-content";
import api from "../../api";
/* import SwalModals from "./SwalModals"; */
/* const MySwal = withReactContent(Swal); */
const formatter = new Intl.NumberFormat("en-US");

class DeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAgreement: false,
      modal2Visible: false,
      agreementData: []
    };
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  handleAgreement = e => {
    this.setState({ checkedAgreement: e.target.checked });
    if (e.target.checked) {
      this.getAgreementData();
    }
  };

  handleScroll = () => {
    let calcBottom =
      document.getElementById("scroll-tst").scrollHeight -
      document.getElementById("scroll-tst").scrollTop;

    let clientHeight = document.getElementById("scroll-tst").clientHeight;
    if (calcBottom === clientHeight) {
      this.timer = setTimeout(() => this.setModal2Visible(false), 200);
      document
        .getElementById("scroll-tst")
        .removeEventListener("scroll", this.handleScroll);
    }
  };

  getAgreementData = async () => {
    await api.staticPage
      .findPage({
        id: 42
      })
      .then(res => {
        if (res.success) {
          this.setState({ agreementData: res.data[0] });
          this.setModal2Visible(true);
          document.getElementById("scroll-tst").scrollTop = 0;
          document
            .getElementById("scroll-tst")
            .addEventListener("scroll", this.handleScroll);
        }
      });
  };

  generateNoat = (total, deliver, usedpoint) => {
    let noat = ((total + deliver - usedpoint) / 110) * 10;
    return noat.toFixed(2);
  };

  render() {
    const { checkedAgreement } = this.state;
    const {
      delivery,
      products,
      userInfo,
      usedpoint,
      handleClick,
      chosenInfo,
      userAddress,
      paymentButton,
      isLoggedIn,
      chosenDeliveryAddrName
    } = this.props;
    let addrs;
    const deliver1 = delivery === [] ? 0 : delivery.price;
    if (userAddress.length !== 0) {
      if (!chosenInfo.isNew) {
        userAddress.map((item, i) => {
          if (item.id === chosenInfo.address) {
            addrs = item.address;
          }
        });
      } else {
        addrs = chosenInfo.addressnm;
      }
    } else {
      addrs = chosenInfo.addressnm;
    }
    return (
      <div className="col-lg-4 pad10">
        <div className="block right-panel">
          {" "}
          <p className="title">
            <strong>
              {userInfo.length === 0
                ? ""
                : userInfo.lastname + " " + userInfo.firstname}
            </strong>
          </p>
          <hr />
          <div className="content">
            <p className="title">
              <strong>Хүргэлтийн мэдээлэл</strong>
            </p>
            <p className="text flex-space">
              <span>Хүргэлтийн төрөл</span>
              <strong>{delivery === [] ? "" : delivery.typenm}</strong>
            </p>
            <p className="text flex-this">
              <i
                className="fa fa-user"
                aria-hidden="true"
                style={{ color: "#feb415" }}
              />
              <span>
                {userInfo.length === 0
                  ? ""
                  : userInfo.lastname + " " + userInfo.firstname}
              </span>
            </p>
            <p className="text flex-this">
              <i
                className="fa fa-phone"
                aria-hidden="true"
                style={{ color: "#feb415" }}
              />
              <span>
                {chosenInfo.length !== 0
                  ? chosenInfo.phone1 + ", " + chosenInfo.phone2
                  : ""}
              </span>
            </p>
            <p className="text flex-this">
              <i
                className="fa fa-map-marker"
                aria-hidden="true"
                style={{ color: "#feb415" }}
              />
              <span>
                {chosenDeliveryAddrName.length !== 0
                  ? chosenDeliveryAddrName.mainLocation +
                    ", " +
                    chosenDeliveryAddrName.subLocation +
                    ", " +
                    chosenDeliveryAddrName.commiteLocation +
                    ", " +
                    addrs
                  : ""}
              </span>
            </p>
          </div>
          <hr />
          <div className="content">
            <p className="title">
              <strong>Төлөх дүн</strong>
            </p>
            <p className="text flex-space">
              <span>Бараа ({products.totalQty}):</span>
              <strong>{formatter.format(products.totalPrice)}₮</strong>
            </p>
            <p className="text flex-space">
              <span>Хүргэлтийн үнэ:</span>
              <strong>{formatter.format(deliver1)}₮</strong>
            </p>
            {usedpoint.toFixed(0) !== "0" ? (
              <p className="text flex-space">
                <span>Имарт карт оноо:</span>
                <strong style={{ color: "red" }}>
                  {"-" + formatter.format(usedpoint.toFixed(0))}₮
                </strong>
              </p>
            ) : (
              ""
            )}
            <hr />
            <p className="text flex-space">
              <span>Нийт дүн:</span>
              <strong>
                {formatter.format(products.totalPrice + deliver1 - usedpoint)}₮
              </strong>
            </p>
            <p className="text flex-space">
              <span>НӨАТ:</span>
              <strong>
                {formatter.format(
                  this.generateNoat(products.totalPrice, deliver1, usedpoint)
                )}
                ₮
              </strong>
            </p>
            <Checkbox onChange={this.handleAgreement}>
              {" "}
              <a>
                <span style={{ fontWeight: "bold" }}>Үйлчилгээний нөхцөл</span>
              </a>
            </Checkbox>
            <button
              className="btn btn-main btn-block"
              onClick={e => handleClick(e)}
              disabled={
                paymentButton === false &&
                isLoggedIn === true &&
                checkedAgreement === true
                  ? false
                  : true
              }
            >
              <span className="text-uppercase">Тооцоо хийх</span>
            </button>
          </div>
        </div>

        <Modal
          centered
          width="1000px"
          visible={this.state.modal2Visible}
          wrapClassName="vertical-center-modal"
          footer={false}
          onCancel={e => this.setModal2Visible(false)}
          /*  footer={
            [
                <button
            style={}
              key="submit"
              className="btn btn-main btn-block"
              onClick={() => this.setModal2Visible(false)}
            >
              Зөвшөөрөх
            </button>
            ]
          } */
        >
          <div className="frame" id="scroll-tst">
            <div className="scroll">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.agreementData.description
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DeliveryInfo;
