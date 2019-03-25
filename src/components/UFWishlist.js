import React from "react";
import { Form } from "antd";
import api from "../api";
import { IMAGE } from "../utils/consts";
/* import Rate from "../components/Rate/Rate"; */

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
    let tableList = null;
    const list = this.state.wishlist;
    const formatter = new Intl.NumberFormat("en-US");
    tableList = list.map((item, index) => {
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
                {/* item.rate[0].rate[0] ? (
                  <Rate
                    rate={item.rate[0].rate[0].ravg}
                    numOfVotes={item.rate[0].rate[0].cnt}
                  />
                ) : (
                  <Rate rate={0} numOfVotes={0} />
                ) */}
              </div>
            </div>
          </div>
          <div className="price">
            <strong>{formatter.format(item.price)}₮</strong>
          </div>
          <div className="action">
            <ul className="list-unstyled flex-this end">
              <li>
                <a href={item.route ? item.route : " "}>
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={item.route ? item.route : " "}
                  onClick={this.changeNumber}
                >
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
          <div className="product-list-history">{tableList}</div>
        </div>
      </div>
    );
  }
}

const App = Form.create({ name: "delivery" })(Component);
export default App;
/* style={{ backgroundImage: 'url()'}} */
{
  /* <div className="product-list-history">
            <div className="single flex-space">
              <div className="product">
                <div className="flex-this">
                  <div className="image-container default">
                    <Link to="">
                      <span className="image" />
                    </Link>
                  </div>
                  <div className="info">
                    <Link to="">
                      <p className="name">Шингэн кофе Американо</p>
                      <p className="text">Шингэн кофе Американо No Brand</p>
                    </Link>
                    <Link to="" className="rating">
                      <ul className="list-inline">
                        <li className="list-inline-item active">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star-half-o" aria-hidden="true" />
                          <i className="fa fa-star-o" aria-hidden="true" />
                        </li>
                        <li className="list-inline-item active">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star-half-o" aria-hidden="true" />
                          <i className="fa fa-star-o" aria-hidden="true" />
                        </li>
                        <li className="list-inline-item half-active">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star-half-o" aria-hidden="true" />
                          <i className="fa fa-star-o" aria-hidden="true" />
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star-half-o" aria-hidden="true" />
                          <i className="fa fa-star-o" aria-hidden="true" />
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star-half-o" aria-hidden="true" />
                          <i className="fa fa-star-o" aria-hidden="true" />
                        </li>
                        <li className="list-inline-item">
                          <span className="text">197</span>
                        </li>
                      </ul>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="price">
                <strong>24,000₮</strong>
              </div>
              <div className="action">
                <ul className="list-unstyled flex-this end">
                  <li>
                    <Link to="">
                      <i className="fa fa-cart-plus" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="fa fa-times" aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */
}
