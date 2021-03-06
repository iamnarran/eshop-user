import React from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import api from "../api";
import { IMAGE } from "../utils/consts";
import Rate from "./Rate";

class Component extends React.Component {
  state = {
    wishlist: []
  };

  getData() {
    api.customer.getWishList({ custid: this.props.user.id }).then(res => {
      if (res.success) {
        this.setState({
          wishlist: res.data
        });
      }
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.getData();
  }

  togglePopup = () => {
    this.props.onChange();
  };

  onDelete = (e, item) => {
    e.preventDefault();
    api.customer
      .deleteWishList({ custid: this.props.user.id, skucd: item.cd })
      .then(res => {
        if (res.success) {
          this.getData();
        }
      });
  };

  render() {
    const formatter = new Intl.NumberFormat("en-US");
    let tableList =
      this.state.wishlist &&
      this.state.wishlist.map((item, index) => {
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
            <span>Хадгалсан бараа</span>
          </p>
          <div
            className="product-list-history frame frameMargin"
            style={{ maxHeight: "500px", overflow: "auto" }}
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
