import React from "react";
import { Link } from "react-router-dom";

import Label from "./Label";
import Rate from "./Rate";
import { IMAGE } from "../utils/consts";

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
            <Link to="" className="name">
              <span>{item.name}</span>
            </Link>
            <Link to="" className="cat">
              <span>{item.featuretxt}</span>
            </Link>

            {item.tags &&
              item.tags.map((label, index) => (
                <Label key={index} seq={index} data={label} />
              ))}

            {item.rate ? (
              <Rate rate={item.rate} numOfVotes={item.user_rate_cnt} />
            ) : (
              " "
            )}
            <Link to="" className="price">
              <small className="sale">{formatter.format(item.price)}₮}</small>
              <span className="current">{formatter.format(item.sprice)}₮</span>
              <Link
                to=" "
                style={{
                  float: "left",
                  marginRight: "20px",
                  marginTop: "20px"
                }}
              >
                <i className="fa fa-heart-o" aria-hidden="true" />
                <span />
              </Link>
              <Link to=" " style={{ float: "left", marginTop: "20px" }}>
                <i className="fa fa-cart-plus" aria-hidden="true" />
                <span />
              </Link>
            </Link>
          </div>
          <div className="search-hover" />
        </div>
      );
    });
    return <div>{indents}</div>;
  }
}

export default SearchList;
