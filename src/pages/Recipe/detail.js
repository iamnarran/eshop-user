import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IMAGE } from "../../utils/consts";
import Slider from "../../components/Slider";
import { updateCart } from "../../actions/cart";
import withCart from "../../components/HOC/withCart";

import chef from "../../scss/assets/images/demo/chef.png";
import time from "../../scss/assets/images/demo/time.png";
import smile from "../../scss/assets/images/demo/smile.png";

const formatter = new Intl.NumberFormat("en-US");

class RecipeDetail extends React.Component {
  handleAddToCartClick = product => {
    if (product) {
      this.props.onAddToCart(product);
    } else {
      const { products } = this.props.container.productsData;

      if (products.length) {
        products.reduce((acc, next) => {
          return acc.then(() => {
            return this.props.onAddToCart(next);
          });
        }, Promise.resolve());
      }
    }
  };

  renderSteps = () => {
    const { steps } = this.props.container;
    return steps.map((step, index) => {
      return (
        <div className="row row10" key={index}>
          <div className="col-md-4">
            <div
              style={{
                backgroundImage: `url(${IMAGE + step.imgnm})`,
                backgroundSize: "cover",
                width: "100%",
                height: "200px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                borderRadius: "10px",
                marginBottom: "20px"
              }}
            />
          </div>
          <div className="col-md-8">
            <h4>
              <FontAwesomeIcon
                icon={["fas", "circle"]}
                style={{ width: "10px" }}
              />{" "}
              АЛХАМ {++index}
            </h4>
            {step.description}
            <p />
          </div>
        </div>
      );
    });
  };

  renderProducts = () => {
    const { products, total } = this.props.container.productsData;

    return (
      <div className="block product-suggest">
        <p className="title">
          <strong>Жоронд орсон бараа</strong>
        </p>
        <ul className="list-unstyled">
          {!!products.length &&
            products.map((product, index) => {
              return (
                <li key={index}>
                  <div className="single flex-this">
                    <div className="image-container">
                      <Link to={product.route ? product.route : ""}>
                        <span
                          className="image"
                          style={{
                            backgroundImage: `url(${IMAGE + product.img})`
                          }}
                        />
                      </Link>
                    </div>
                    <div className="info-container flex-space">
                      <Link to={product.route ? product.route : ""}>
                        <strong>
                          <span>{product.name}</span>
                        </strong>
                        Үнэ: {formatter.format(product.price)}₮
                      </Link>
                      <div className="action">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => this.handleAddToCartClick(product)}
                        >
                          <i
                            className="fa fa-cart-plus"
                            aria-hidden="true"
                            style={{ fontSize: "1.2rem" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="more-link text-center">
          <div className="pack-price">
            <p className="text flex-this end">
              <span style={{ fontSize: "1.6rem" }}>Үнэ:</span>
              <strong>{formatter.format(total)}₮</strong>
            </p>
            <button
              type="button"
              className="btn btn-main"
              onClick={() => this.handleAddToCartClick()}
            >
              <i
                className="fa fa-cart-plus"
                aria-hidden="true"
                style={{ fontSize: "1.2rem" }}
              />{" "}
              <span className="text-uppercase">Сагсанд нэмэх</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { recipe } = this.props.container;
    const date = recipe.insymd.split("T")[0].split("-");
    const sliderParams = {
      spaceBetween: 0,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    };

    return (
      <div className="section">
        <div className="container pad10">
          <div className="e-breadcrumb">
            <ul className="list-unstyled">
              <li>
                <Link to="">
                  <span>Нүүр хуудас</span>
                </Link>
              </li>
              <li>
                <Link to="/recipe">
                  <span>Хоолны жор</span>
                </Link>
              </li>
              <li>
                <span>{recipe.recipenm}</span>
              </li>
            </ul>
          </div>
          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-md-8 pad10">
                <h4 className="title">
                  <span>{recipe.recipenm}</span>
                </h4>
                <p className="date">
                  <span>{`${date[0]} оны ${date[1]} сарын ${date[2]}`}</span>
                </p>
                <div className="food-recipe-detail">
                  <div className="content">
                    <div className="main-slide">
                      <Slider
                        data={recipe.images}
                        params={sliderParams}
                        elContainer={"images"}
                        type="Recipe"
                      />
                    </div>
                  </div>
                  <div className="row row10">
                    <div className="col-md-4">
                      <p>
                        <Avatar size="small" src={chef} />{" "}
                        {recipe.madeoflvlText}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <Avatar size="small" src={time} /> {recipe.time}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <Avatar size="small" src={smile} /> {recipe.humancnt}{" "}
                        хүний порц
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row row10">
                    <div className="col-md-6">
                      <p className="title">ОРЦ</p>
                      <div className="row row10">
                        {recipe.ingredients.map((item, index) => {
                          return (
                            <div className="col-md-6" key={index}>
                              <p>
                                <span style={{ color: "orange" }}>#</span>
                                {" " + item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="title">АМТЛАГЧ</p>
                      <div className="row row10">
                        {recipe.spices.map((item, index) => {
                          return (
                            <div className="col-md-6" key={index}>
                              <p>
                                <span style={{ color: "orange" }}>#</span>
                                {" " + item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div>
                  <h4 className="title" style={{ textTransform: "uppercase" }}>
                    <span>
                      <a>Зөвлөгөө</a>
                    </span>
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: recipe.description
                    }}
                  />
                </div>
                <br />
                <div>
                  <h4
                    className="title"
                    style={{ textTransform: "uppercase", marginBottom: "20px" }}
                  >
                    <span>
                      <a>Хоол хийх заавар</a>
                    </span>
                  </h4>
                  {this.renderSteps()}
                </div>
              </div>
              <div className="col-md-4 pad10">
                <div className="product-plus">
                  <div className="block product-delivery">
                    <p className="title">
                      <strong>Хүргэлтийн мэдээлэл</strong>
                    </p>
                    <p className="text">
                      <span>{recipe.deliverytxt}</span>
                    </p>
                  </div>
                  {this.renderProducts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCart(
  connect(
    null,
    { updateCart }
  )(RecipeDetail)
);
