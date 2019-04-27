import React from "react";
import api from "../api";
import { IMAGE } from "../utils/consts";
class OrderDetail extends React.Component {
  /*  state = {
    orderList: []
  }; */
  componentDidMount() {
    /* this.setState({
      orderList: this.props.container.data
    }); */
  }

  render() {
    let orderList = this.props.container.data;
    const formatter = new Intl.NumberFormat("en-US");
    let totalPrice = this.props.container.data[0].totalamount;
    let totalProduct = this.props.container.data[0].totalquantity;
    let deliveryAmount = this.props.container.data[0].deliveryamount;
    let totalvate = this.props.container.data[0].totalvatamount;
    let firstName = this.props.auth.user.firstname;
    let lastName = this.props.auth.user.lastname;
    let phone = this.props.auth.user.phonE1;
    let totalamount = this.props.container.data[0].totalamount;

    let total = 0;
    let tableList = null;

    tableList = orderList.map((item, index) => {
      total = parseInt(item.orderamount) * parseInt(item.orderquantity);
      return (
        <tr key={index}>
          <td>
            <div className="flex-this">
              <div className="image-container default">
                <span
                  className="image"
                  style={{ backgroundImage: `url(${IMAGE}${item.img})` }}
                />
              </div>
              <div className="info-container">
                <strong>{item.name}</strong>
                <span>{item.backtxt}</span>
              </div>
            </div>
          </td>
          <td>
            <p className="price">
              <strong>{formatter.format(item.orderamount)}₮</strong>
            </p>
          </td>
          <td>
            <p className="price total">
              <strong>{item.orderquantity}</strong>
            </p>
          </td>
          <td>
            <p className="price total">
              <strong>{formatter.format(total)}₮</strong>
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
                <span className="text-uppercase">Буцах</span>
              </div>
              <h1 className="title">
                <span className="text-uppercase">Захиалга #022</span>
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
                          <th className="column-1">
                            <span>Бүтээгдэхүүний нэр</span>
                          </th>
                          <th className="column-2">Нэгжийн үнэ</th>
                          <th className="column-3">Тоо ширхэг</th>
                          <th className="column-4">
                            <p className="price total">
                              <strong>Барааны үнэ</strong>
                            </p>
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
                      <span>Төлсөн дүн</span>
                    </h5>
                    <div className="block">
                      <ul className="list-unstyled">
                        <li className="flex-this flex-space">
                          <span>Нийт бараа ({totalProduct})</span>
                          <strong className="big">
                            {formatter.format(totalamount)}₮
                          </strong>
                        </li>
                        <li className="flex-this flex-space">
                          <span>Энгийн хүргэлт</span>
                          <strong className="big">
                            {formatter.format(deliveryAmount)}₮
                          </strong>
                        </li>
                        <li className="line text-right">
                          <strong>Нийт дүн</strong>
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
                      <span>Төлсөн дүн</span>
                      <strong className="success">
                        {/* deliverytype */}Хүргэгдсэн
                      </strong>
                    </h5>
                    <div className="block">
                      <div className="content">
                        <p className="text flex-this">
                          <i className="fa fa-user" aria-hidden="true" />
                          <span>
                            {firstName} {lastName}
                          </span>
                        </p>
                        <p className="text flex-this">
                          <i className="fa fa-phone" aria-hidden="true" />
                          <span>
                            {phone ? phone.slice(0, 4) : " "}{" "}
                            {phone ? phone.slice(4) : " "}
                          </span>
                        </p>
                        <p className="text flex-this">
                          <i className="fa fa-map-marker" aria-hidden="true" />
                          <span />
                        </p>
                        <p className="text flex-this">
                          <i className="fa fa-calendar" aria-hidden="true" />
                          <span />
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
