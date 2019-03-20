import React from "react";
import { Link } from "react-router-dom";

import Slider from "../../components/Slider";
import { IMAGE } from "../../utils/consts";
import { Divider } from "antd";

class RecipeDetail extends React.Component {
  render() {
    console.log("this.props", this.props);
    const { recipe, productsData } = this.props.container;
    const step = this.props.container.recipe[0].steps;
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
    console.log(step);
    const date = recipe[0].recipe.insymd.split("T")[0].split("-");
    const formatter = new Intl.NumberFormat("en-US");
    let products = null;
    let steps = null;

    steps = step.map((item, index) => {
      console.log(item);
      return (
        <div className="row row10" key={index}>
          <div className="col-md-4">
            <div
              style={{
                backgroundImage: `url(${IMAGE + item.imgnm})`,
                backgroundSize: "cover",
                width: "100%",
                height: "200px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                borderRadius: "10px"
              }}
            />
          </div>

          <div className="col-md-8">
            <p
              className="title"
              style={{
                textDecoration: "uppercase",
                fontSize: "20px",
                marginBottom: "0px"
              }}
            >
              <span>&#8226;</span>
              {item.stepnm}
            </p>
            {item.description}
            <p />
          </div>
        </div>
      );
    });

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
                <span>{recipe[0].recipe.recipenm}</span>
              </li>
            </ul>
            <h4 className="title">
              <span>{recipe[0].recipe.recipenm}</span>
            </h4>
            <p className="date">
              <span>{`${date[0]} оны ${date[1]} сарын ${date[2]}`}</span>
            </p>
          </div>
          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-md-8 pad10">
                <hr />
                <div className="food-recipe-detail">
                  <div className="content">
                    <div className="main-slide">
                      <Slider
                        data={recipe[0].recipe.images}
                        params={sliderParams}
                        elContainer={"images"}
                      />
                    </div>
                  </div>
                  <div className="row row10">
                    <div className="col-md-4">
                      <p>
                        <span>
                          <i className="fa fa-utensils" />
                        </span>
                        haha
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <span>
                          <i class="fa fa-hourglass-half" />
                        </span>
                        {recipe[0].recipe.time}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <span>
                          <i className="fa fa-phone" aria-hidden="true" />
                        </span>
                        {recipe[0].recipe.humancnt} хүний порц
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row row10">
                    <div className="col-md-6">
                      <p className="title">ОРЦ</p>
                      <div className="row row10">
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="title">АМТЛАГЧ</p>
                      <div className="row row10">
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span style={{ color: "yellow" }}>#</span> Үхрийн
                            мах
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div>
                  <h4 className="title" style={{ textTransform: "uppercase" }}>
                    <span>
                      <a
                        style={{
                          backgroundColor: "yellow"
                        }}
                      >
                        Зөвлөгөө
                      </a>
                    </span>
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: recipe[0].recipe.description
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
                      <a
                        style={{
                          backgroundColor: "yellow"
                        }}
                      >
                        Хоол хийх заавар
                      </a>
                    </span>
                  </h4>
                  {steps}
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

/* 
<div className="single-product list-product">
                      <div className="image-container">
                        <a href=" ">
                          <span
                            className="image"
                            style={{
                              backgroundImage: `url(${IMAGE +
                                recipe.images[0].imgnm})`
                            }}
                          />
                        </a>
                      </div>
                      <div>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum
                      </div>
                    </div> */
