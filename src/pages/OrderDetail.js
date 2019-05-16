import React from "react";
import api from "../api";
import { IMAGE } from "../utils/consts";
import { Link } from "react-router-dom";
class OrderDetail extends React.Component {
  componentDidMount() {}

  render() {
    let orderList = this.props.container.data[0].items;
    const formatter = new Intl.NumberFormat("en-US");
    let firstName = this.props.container.data[0].info.custname;
    let lastName = this.props.auth.user.lastname;
    let phone = this.props.auth.user.phonE1;
    let phone2 = this.props.auth.user.phonE2;
    let total = 0;
    let tableList = null;
    let totalProduct = this.props.container.data[0].info.totalquantity;
    let itemamount = this.props.container.data[0].info.itemamount;
    let totalPrice = this.props.container.data[0].info.totalamount;
    let deliveryAmount = this.props.container.data[0].info.deliveryamount;
    let totalvate = this.props.container.data[0].info.totalvatamount;
    let ordernumber = this.props.container.data[0].info.ordernumber;
    let orderdate = this.props.container.data[0].info.orderdate;
    let address = this.props.container.data[0].info.address;
    let deliveryStatus = this.props.container.data[0].info.customerstatusname;
    let deliveryStatusColor = this.props.container.data[0].info
      .customerstatuscolor;
    tableList = orderList.map((item, index) => {
      total = parseInt(item.orderamount) * parseInt(item.orderquantity);
      return (
        <tr key={index}>
          <td>
            <div className="flex-this">
              <div className="image-container default">
                <a href={item.route}>
                  <span
                    className="image"
                    style={{ backgroundImage: `url(${IMAGE}${item.img})` }}
                  />
                </a>
              </div>
              <div className="info-container">
                <strong>{item.name}</strong>
                <span>{item.backtxt}</span>
              </div>
            </div>
          </td>
          <td>
            <p className="price" style={{ float: "right" }}>
              <strong>
                {formatter.format(
                  item.newprice > 0 ? item.newprice : item.price
                )}
                ₮
              </strong>
            </p>
          </td>
          <td>
            <p className="price total" style={{ float: "right" }}>
              <strong>{item.orderquantity}</strong>
            </p>
          </td>
          <td>
            <p className="price total" style={{ float: "right" }}>
              <strong>{formatter.format(item.orderamount)}₮</strong>
            </p>
          </td>
        </tr>
      );
    });

    return (
      <div className="section">
        <div className="top-container">
          <div className="container pad10">
            <div className="cart-container after-order">
              <div className="btn btn-gray">
                <Link to="/">
                  <span className="text-uppercase">Буцах</span>
                </Link>
              </div>
              <h1 className="title">
                <span className="text-uppercase">Захиалга #{ordernumber}</span>
              </h1>
              <div className="row row10">
                <div className="col-xl-8 pad10">
                  <h5 className="title">
                    <span>Захиалсан бараанууд</span>
                  </h5>
                  <div className="cart-table table-responsive">
                    <table className="table table-borderless">
                      <thead className="thead-light">
                        <tr>
                          <th className="column-1">Бүтээгдэхүүний нэр</th>
                          <th className="column-2">
                            <span style={{ float: "right" }}>Нэгжийн үнэ</span>
                          </th>
                          <th className="column-3">
                            <span style={{ float: "right" }}>Тоо ширхэг</span>
                          </th>
                          <th className="column-4">
                            <span style={{ float: "right" }}>
                              <p className="price total">
                                <strong>Нийт үнэ</strong>
                              </p>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>{tableList}</tbody>
                    </table>
                  </div>
                </div>
                <div className="col-xl-4 pad10">
                  <div className="cart-info">
                    <h5 className="title">
                      <span>Захиалгын дүн</span>
                    </h5>
                    <div className="block">
                      <ul className="list-unstyled">
                        <li className="flex-this flex-space">
                          <span>Нийт барааны үнэ ({totalProduct + " ш"})</span>
                          <strong className="big">
                            {formatter.format(itemamount)}₮
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Энгийн хүргэлт</span>
                          <strong className="big">
                            {formatter.format(deliveryAmount)}₮
                          </strong>
                        </li>
                        <li className="line text-right">
                          <strong>Захиалгын дүн</strong>
                          <strong className="big">
                            {formatter.format(totalPrice)}₮
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>НӨАТ</span>
                          <strong>{formatter.format(totalvate)}₮</strong>
                        </li>
                      </ul>
                    </div>
                    <h5 className="title flex-this flex-space">
                      <span>Захиалгын төлөв</span>
                      <strong style={{ backgroundColor: deliveryStatusColor }}>
                        {deliveryStatus}
                      </strong>
                    </h5>
                    <div className="block">
                      <div className="content">
                        <p className="text flex-this">
                          <i
                            className="fa fa-user"
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>
                            {firstName} {lastName}
                          </span>
                        </p>
                        <p className="text flex-this">
                          <i
                            className="fa fa-phone"
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>
                            {phone ? phone.slice(0, 4) : " "}{" "}
                            {phone ? phone.slice(4) : " "}
                            {", "}
                            {phone2 ? phone2.slice(0, 4) : " "}{" "}
                            {phone2 ? phone2.slice(4) : " "}
                          </span>
                        </p>
                        <p className="text flex-this">
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>{address}</span>
                        </p>
                        <p className="text flex-this">
                          <i
                            className="fa fa-calendar"
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>{orderdate}</span>
                        </p>
                      </div>
                    </div>
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

export default OrderDetail;
