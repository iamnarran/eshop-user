import React from "react";
import { Form, message, Icon, Spin } from "antd";
import { connect } from "react-redux";
import api from "../api";
import { IMAGE } from "../utils/consts";
import Rate from "./Rate";
import { updateCart } from "../actions/cart";
import withCart from "./HOC/withCart";
import store from "../store";

class Component extends React.Component {
  state = {
    deliveryList: [],
    loading: false
  };

  getData = async () => {
    this.setState({ loading: true });
    await api.customer.getViewList({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        this.setState({
          deliveryList: res.data
        });
      }
      this.setState({ loading: false });
    });
  };

  onDelete = (e, item) => {
    e.preventDefault();
    this.setState({ loading: true });
    api.customer
      .deleteSeenList({ custid: this.props.user.id, skucd: item.cd })
      .then(res => {
        if (res.success) {
          this.getData();
        }
      });
  };

  componentDidMount() {
    this.getData();
  }

  oneSave = item => {
    api.product
      .addWishList({ custid: this.props.user.id, skucd: item.cd })
      .then(res => {
        if (res.success) {
          message.success("Амжилттай хадгаллаа.");
        }
      });
  };

  handleSingleAddToCartClick = product => {
    this.props.onUpdateCart(product);
  };

  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
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
                  <i
                    className="fa fa-heart"
                    aria-hidden="true"
                    onClick={() => this.oneSave(item)}
                  />
                </a>
              </li>
              <li>
                <a>
                  <i
                    className="fa fa-cart-plus"
                    aria-hidden="true"
                    onClick={() => this.handleSingleAddToCartClick(item)}
                  />
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
        <Spin
          spinning={this.state.loading}
          delay={500}
          indicator={antIcon}
          tip="Түр хүлээнэ үү"
        >
          <div className="user-menu-content">
            <p className="title">
              <span>Үзсэн барааны түүх</span>
            </p>
            <div
              className="product-list-history frame frameMargin"
              style={{ maxHeight: "500px", overflow: "auto" }}
            >
              {tableList}
            </div>
          </div>
        </Spin>
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

export default withCart(
  connect(
    null,
    { updateCart }
  )(Component)
);
