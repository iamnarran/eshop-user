import React from "react";
import { Link } from "react-router-dom";

import Slider from "../../components/Slider";
import { IMAGE } from "../../utils/consts";

class RecipeDetail extends React.Component {
  render() {
    const { recipe, productsData } = this.props.container;

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

    const date = recipe.insymd.split("T")[0].split("-");
    const formatter = new Intl.NumberFormat("en-US");

    let products = null;
    if (productsData.products) {
      products = (
        <div className="block product-suggest">
          <p className="title">
            <strong>Жоронд орсон бараа</strong>
          </p>
          <ul className="list-unstyled">
            {productsData.products &&
              productsData.products.map(product => {
                return (
                  <li>
                    <div className="single flex-this">
                      <div className="image-container">
                        <a href="#">
                          <span
                            className="image"
                            style={{
                              backgroundImage: `url(${IMAGE + product.imgnm})`
                            }}
                          />
                        </a>
                      </div>
                      <div className="info-container flex-space">
                        <a href="#">
                          <span>{product.titlenm}</span>
                          <strong>{formatter.format(product.price)}₮</strong>
                        </a>
                        <div className="action">
                          <a href="#">
                            <i className="fa fa-cart-plus" aria-hidden="true" />
                          </a>
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
                <span>Дүн:</span>
                <strong>{formatter.format(productsData.total)}₮</strong>
              </p>
              <a href="#" className="btn btn-main">
                <i className="fa fa-cart-plus" aria-hidden="true" />
                <span className="text-uppercase">Сагсанд нэмэх</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

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
                <div className="food-recipe-detail">
                  <h4 className="title">
                    <span>{recipe.recipenm}</span>
                  </h4>
                  <p className="date">
                    <span>{`${date[0]} оны ${date[1]} сарын ${date[2]}`}</span>
                  </p>
                  <div className="content">
                    <div className="main-slide">
                      <Slider
                        data={recipe.images}
                        params={sliderParams}
                        elContainer={"images"}
                      />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: recipe.description }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 pad10">
                <div className="product-plus">
                  <div className="block product-delivery">
                    <p className="title">
                      <strong>Хүргэлтийн мэдээлэл</strong>
                    </p>
                    <p className="text">
                      <span>
                        Энгийн хүргэлт (48 цагийн дотор) - 89,000₮ дээш бараа
                        авсан тохиолдолд үнэгүй
                      </span>
                    </p>
                  </div>
                  {products}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
