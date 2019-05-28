import React from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import api from "../api";
import { IMAGE } from "../utils/consts";
import Rate from "./Rate";
class Component extends React.Component {
  state = {
    deliveryList: [],
    loading: true
  };

  getData = async () => {
    await api.customer.getViewList({ custId: this.props.user.id }).then(res => {
      if (res.success) {
        this.setState({
          deliveryList: res.data
        });
      }
      this.setState({ loading: false });
    });
  };

  onDelete = (e, item) => {
    console.log(item.cd);
    e.preventDefault();
    api.customer
      .deleteSeenList({ custId: this.props.user.id, skucd: item.cd })
      .then(res => {
        if (res.success) {
          this.getData();
        }
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    let tableList = null;
    const formatter = new Intl.NumberFormat("en-US");
    tableList = this.state.deliveryList.map((item, index) => {
      return (
        <div className="single flex-space" key={index}>
          <div className="product">
            <div className="flex-this">
              <div className="image-container default">
                <a href={item.route ? item.route : " "}>
                  <span
                    className="image"
                    style={{
                      backgroundImage: `url(${IMAGE + item.img})`
                    }}
                  />
                </a>
              </div>
              <div className="info">
                <a href={item.route ? item.route : " "}>
                  <p className="name">{item.skunm}</p>
                  <p className="text">{item.shortnm}</p>
                </a>
                {item.rate ? (
                  <Rate rate={item.rate} numOfVotes={item.rateusercnt} />
                ) : (
                  <Rate rate={0} numOfVotes={0} />
                )}
              </div>
            </div>
          </div>
          <div className="price">
            <strong>{formatter.format(item.price)}₮</strong>
          </div>
          <div className="action">
            <ul className="list-unstyled flex-this end">
              <li>
                <a>
                  <i className="fa fa-heart" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a onClick={e => this.onDelete(e, item)}>
                  <i className="fa fa-times" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    });

    return (
      <div className="col-md-8 pad10">
        <div className="user-menu-content">
          <p className="title">
            <span>Үзсэн барааны түүх</span>
          </p>
          <div
            className="product-list-history"
            style={{ maxHeight: "500px", overflow: "scroll" }}
          >
            {tableList}
          </div>
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
