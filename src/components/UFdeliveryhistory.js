import React from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import api from "../api";

class Component extends React.Component {
  state = {
    deliveryList: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await api.customer
      .getOrderList({ custid: this.props.user.id })
      .then(res => {
        if (res.success) {
          this.setState({
            deliveryList: res.data
          });
        }
        this.setState({ loading: false });
      });
  };

  renderDate = dateString => {
    const dateParts = dateString.split("T")[0].split("-");

    return (
      <span>{`${dateParts[0]} оны ${dateParts[1]} сарын ${dateParts[2]}`}</span>
    );
  };

  renderType = item => {
    return (
      <span
        style={{
          padding: "5px 10px",
          backgroundColor: item.customerstatuscolor,
          color: "rgba(0, 0, 0, 0.65)",
          borderRadius: "15px"
        }}
      >
        {item.statusnm}
      </span>
    );
  };

  onMore = item => {
    console.log("more click", item);
  };

  render() {
    const formatter = new Intl.NumberFormat("en-US");
    let tableList = null;
    tableList = this.state.deliveryList.map((item, index) => {
      return (
        <tr key={index} style={{ height: "70px" }}>
          <td style={{ textAlign: "center", paddingLeft: "10px" }}>
            #{item.ordernumber}
          </td>
          <td style={{ textAlign: "center" }}>
            <span className="success">{this.renderDate(item.orderdate)}</span>
          </td>
          <td style={{ textAlign: "center" }}>{this.renderType(item)}</td>
          <td style={{ textAlign: "center" }}>
            {formatter.format(item.totalamount)}₮
          </td>
          <td style={{ textAlign: "center", paddingRight: "5px" }}>
            <a
              style={{
                color: "#595959"
              }}
              href={"/order/" + item.id}
            >
              Цааш үзэх
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Захиалгын түүх</span>
          </p>
          <table className="table-hover table-sm">
            <thead>
              <tr style={{ height: "70px" }}>
                <th width="5%" style={{ textAlign: "center" }}>
                  №
                </th>
                <th width="25%" style={{ textAlign: "center" }}>
                  Он сар өдөр
                </th>
                <th width="25%" style={{ textAlign: "center" }}>
                  Төлөв
                </th>
                <th width="10%" style={{ textAlign: "center" }}>
                  Үнийн дүн
                </th>
                <th width="15%" style={{ textAlign: "center" }}>
                  Дэлгэрэнгүй
                </th>
              </tr>
            </thead>
            <tbody>{tableList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Component);
