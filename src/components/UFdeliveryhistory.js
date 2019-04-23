import React from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import api from "../api";
import { IMAGE } from "../utils/consts";
import Rate from "./Rate";

class Component extends React.Component {
  state = {
    deliveryList: []
  };

  componentDidMount() {
    /* api.customer.getOrderList({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        console.log(res);
        this.setState({
          deliveryList: res.data
        });
      }
      this.setState({ loading: false });
    }); */
  }

  renderDate = dateString => {
    const dateParts = dateString.split("T")[0].split("-");

    return (
      <p className="date">
        <span>
          {`${dateParts[0]} оны ${dateParts[1]} сарын ${dateParts[2]}`}
        </span>
      </p>
    );
  };

  render() {
    const formatter = new Intl.NumberFormat("en-US");
    let tableList = null;
    tableList = this.state.deliveryList.map((item, index) => {
      return (
        <tr>
          <td>
            <span>{item.id}</span>
          </td>
          <td>
            <span>{this.renderDate(item.orderdate)}</span>
          </td>
          <td>
            <span className="stat the-way">{item.deliverytype}</span>
          </td>
          <td>
            <span>{formatter.format(item.deliveryamount)}₮</span>
          </td>
          <td>
            <a href=" ">
              <span>Цааш үзэх</span>
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
          <table className="table table-borderless table-hover table-sm">
            <thead>
              <tr>
                <th width="10%">№</th>
                <th width="25%">Он сар өдөр</th>
                <th width="25%">Төлөв</th>
                <th width="25%">Үнийн дүн</th>
                <th width="15%">Дэлгэрэнгүй</th>
              </tr>
            </thead>
            <tbody>{/* tableList */}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const App = Form.create({ name: "delivery" })(Component);

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Component);
