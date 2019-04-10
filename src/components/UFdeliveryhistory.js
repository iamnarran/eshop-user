import React from "react";
import { Form } from "antd";
import api from "../api";
class Component extends React.Component {
  state = {
    wishlist: []
  };
  componentDidMount() {
    api.wishList.findAlls({ custId: "14" }).then(res => {
      if (res.success) {
        this.setState({
          wishlist: res.data
        });
      }
      this.setState({ loading: false });
    });
  }
  render() {
    const formatter = new Intl.NumberFormat("en-US");
    let tableList = null;
    tableList = this.state.wishlist.map((item, index) => {
      return (
        <tr>
          <td>
            <span>#22</span>
          </td>
          <td>
            <span>2018 оны 8 сарын 30</span>
          </td>
          <td>
            <span className="stat the-way">Замдаа гарсан</span>
          </td>
          <td>
            <span>24,000₮</span>
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
            <span>Үзсэн барааны түүх</span>
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
            <tbody>{tableList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const App = Form.create({ name: "delivery" })(Component);
export default App;
