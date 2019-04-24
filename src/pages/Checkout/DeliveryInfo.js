import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const formatter = new Intl.NumberFormat("en-US");

class DeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateNoat = (total, deliver, usedpoint) => {
    let noat = ((total + deliver - usedpoint) / 110) * 10;
    return noat.toFixed(2);
  };

  render() {
    const { delivery, products, userInfo, usedpoint, handleClick } = this.props;
    const deliver1 = delivery == [] ? 0 : delivery.price;
    return (
      <div className="col-lg-4 pad10">
        <div className="block right-panel">
          {" "}
          <p className="title">
            <strong>
              {userInfo.length == 0
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
              <strong>{delivery == [] ? "" : delivery.typenm}</strong>
            </p>
            <p className="text flex-this">
              <i className="fa fa-user" aria-hidden="true" />
              <span>
                {userInfo.length == 0
                  ? ""
                  : userInfo.lastname + " " + userInfo.firstname}
              </span>
            </p>
            <p className="text flex-this">
              <i className="fa fa-phone" aria-hidden="true" />
              <span>{userInfo.length == 0 ? "" : userInfo.phone}</span>
            </p>
            <p className="text flex-this">
              <i className="fa fa-map-marker" aria-hidden="true" />
              <span>
                Улаанбаатар хот, Баянзүрх дүүрэг, 17 хороо, 35-р байр, 5 давхар,
                37 тоот, код - 8759
              </span>
            </p>
          </div>
          <hr />
          <div className="content">
            <p className="title">
              <strong>Төлөх дүн</strong>
            </p>
            <p className="text flex-space">
              <span>Бараа ({formatter.format(products.totalQty)}):</span>
              <strong>{formatter.format(products.totalPrice)}₮</strong>
            </p>
            <p className="text flex-space">
              <span>Хүргэлтийн үнэ:</span>
              <strong>{formatter.format(deliver1)}₮</strong>
            </p>
            {usedpoint.toFixed(0) != "0" ? (
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
            <button
              className="btn btn-main btn-block"
              onClick={e => handleClick(e)}
            >
              <span className="text-uppercase">Тооцоо хийх</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryInfo;
