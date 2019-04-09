import React from "react";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider";
import { IMAGE } from "../../utils/consts";
import api from "../../api";
import { connect } from "react-redux";
import storage from "../../utils/storage";
import { updateCart } from "../../actions/cart";
import { toast } from "react-toastify";
/* import Img from "react-image"; */
import { Avatar } from "antd";
import { getFeedbacks } from "../../actions/mainlogic";
// import { url } from "inspector";
import chef from "../../scss/assets/images/demo/chef.png";
import time from "../../scss/assets/images/demo/time.png";
import smile from "../../scss/assets/images/demo/smile.png";
class RecipeDetail extends React.Component {
  notify = message => toast(message, { autoClose: 5000 });

  add = item => {
    let cart = storage.get("cart")
      ? storage.get("cart")
      : { products: [], totalQty: 0, totalPrice: 0 };

    const found = cart.products.find(product => product.cd === item.cd);

    let itemQty = 0;
    if (found) {
      itemQty = found.qty;
    }

    return new Promise((resolve, reject) => {
      api.product
        .isAvailable({
          skucd: item.id ? item.id : item.cd ? item.cd : null,
          qty: itemQty + 1
        })
        .then(res => {
          if (res.success) {
            if (found) {
              found.qty++;
              const i = cart.products
                .map(product => product.cd)
                .indexOf(found.cd);
              cart.products.splice(i, 1, found);
            } else {
              item.qty = 1;
              cart.products.push(item);
            }

            const qties = cart.products.map(product => product.qty);
            cart.totalQty = qties.reduce((acc, curr) => acc + curr);

            const prices = cart.products.map(product => {
              const price = product.sprice
                ? product.sprice
                : product.price
                ? product.price
                : 0;
              return product.qty * price;
            });
            cart.totalPrice = prices.reduce((acc, curr) => acc + curr);

            storage.set("cart", cart);

            // TODO: stop page refreshing
            this.props.updateCart({
              products: cart.products,
              totalQty: cart.totalQty,
              totalPrice: cart.totalPrice
            });

            this.notify(
              "Таны сагсанд " +
                item.titlenm +
                " бүтээгдэрхүүн нэмэгдлээ. Үнийн дүн: " +
                item.price
            );

            resolve();
          } else {
            this.notify(
              "Таны сонгосон хоолны жорын " +
                item.titlenm +
                " бараа дууссан байгаа тул худалдан авалт хийх боломжгүй байна."
            );

            reject();
          }
        });
    });
  };

  handleAddToCart = item => e => {
    e.preventDefault();
    let products = [];
    if (item.id) {
      api.recipe.findAllProducts({ id: item.id }).then(res => {
        if (res.success) {
          products = res.data[0].products;
          if (products.length) {
            products.reduce((acc, next) => {
              return acc.then(() => {
                return this.add(next);
              });
            }, Promise.resolve());
          }
        } else {
          this.notify(res.message);
        }
      });
    } else {
      this.add(item);
    }
  };

  render() {
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
    const date = recipe[0].recipe.insymd.split("T")[0].split("-");
    const formatter = new Intl.NumberFormat("en-US");
    let products = null;
    let steps = null;

    steps = step.map((item, index) => {
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
                borderRadius: "10px",
                marginBottom: "20px"
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
                          <span>{product.titlenm}</span>
                          <strong>{formatter.format(product.price)}₮</strong>
                        </Link>
                        <div className="action">
                          <a onClick={this.handleAddToCart(product)}>
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
              <a
                className="btn btn-main"
                onClick={this.handleAddToCart(recipe[0].recipe)}
              >
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
          </div>
          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-md-8 pad10">
                <h4 className="title">
                  <span>{recipe[0].recipe.recipenm}</span>
                </h4>
                <p className="date">
                  <span>{`${date[0]} оны ${date[1]} сарын ${date[2]}`}</span>
                </p>
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
                        <Avatar size="small" src={chef} />{" "}
                        {recipe[0].recipe.madeoflvlText}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <Avatar size="small" src={time} />{" "}
                        {recipe[0].recipe.time}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <Avatar size="small" src={smile} />{" "}
                        {recipe[0].recipe.humancnt} хүний порц
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row row10">
                    <div className="col-md-6">
                      <p className="title">ОРЦ</p>
                      <div className="row row10">
                        {recipe[0].recipe.ingredients.map((item, index) => {
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
                        {recipe[0].recipe.spices.map((item, index) => {
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
                      <a>Хоол хийх заавар</a>
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

export default connect(
  null,
  { updateCart }
)(RecipeDetail);
