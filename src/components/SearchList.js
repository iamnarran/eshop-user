import React from "react";
import { IMAGE } from "../utils/consts";
import Rate from "./Rate";

class SearchList extends React.Component {
  render() {
    const data = this.props.products;
    const formatter = new Intl.NumberFormat("en-US");
    var indents = data.map((item, ind) => {
      return (
        <div className="single-product list-product">
          <div className="image-container">
            <a href={item.route ? item.route : " "}>
              <span
                className="image"
                style={{
                  backgroundImage: `url(${IMAGE + item.img})`
                }}
              />
            </a>
          </div>
          <div className="info-container">
            <a href="#" className="name">
              <span>{item.name}</span>
            </a>
            <a href="#" className="cat">
              <span>{item.featuretxt}</span>
            </a>
            {item.rate ? (
              <Rate rate={item.rate} numOfVotes={item.user_rate_cnt} />
            ) : (
              " "
            )}
            <a href="#" className="price">
              <small className="sale">{formatter.format(item.price)}₮}</small>
              <span className="current">{formatter.format(item.sprice)}₮</span>
              <a
                href=" "
                style={{
                  float: "left",
                  marginRight: "20px",
                  marginTop: "20px"
                }}
              >
                <i className="fa fa-heart-o" aria-hidden="true" />
                <span />
              </a>
              <a href=" " style={{ float: "left", marginTop: "20px" }}>
                <i className="fa fa-cart-plus" aria-hidden="true" />
                <span />
              </a>
            </a>
          </div>
          <div className="search-hover" />
        </div>
      );
    });
    return <div>{indents}</div>;
  }
}

export default SearchList;
