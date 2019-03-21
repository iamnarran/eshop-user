import React from "react";
import { Link } from "react-router-dom";
import { IMAGE } from "../../utils/consts";
import Slider from "../../components/Slider";

class PackageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      price: this.props.container.Products[0].total,
      sameProducts: this.props.container.Products[0].sameproducts,
      products: null,
      addProduct: null,
      remProduct: null,
      images: this.props.container.Package.images,
      description: this.props.container.Package.products[0].description,
      title: this.props.container.Package.products[0].packagenm,
      date: this.props.container.Package.products[0].insymd
        .split("T")[0]
        .split("-"),
      countNumber: 1
    };
  }

  plusProduct = e => {
    /* console.log("this is plus", e); */
  };
  minusProduct = e => {
    /* console.log("this is minus", e); */
  };

  render() {
    const formatter = new Intl.NumberFormat("en-US");
    const sameproduct = this.props.container.Products[0].sameproducts;
    const product = this.props.container.Products[0].products;
    let products = null;
    let sameProducts = null;
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
    // Багцад орсон барааны ижил бараанууд
    sameProducts = sameproduct.map((item, index) => {
      if (product) {
        return (
          <li key={index}>
            <div className="single flex-this">
              <div className="image-container">
                <Link to={item.route ? item.route : " "}>
                  <span
                    className="image"
                    style={{
                      backgroundImage: `url(${IMAGE + item.url})`
                    }}
                  />
                </Link>
              </div>
              <div className="info-container flex-space">
                <Link to=" ">
                  <span>{item.name}</span>
                  <strong>
                    {formatter.format(item.price1 ? item.price1 : item.price2)}₮
                  </strong>
                </Link>
                <div className="action">
                  <Link to=" ">
                    <i className="fa fa-cart-plus" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
        );
      } else {
        return null;
      }
    });

    // Багцад орсон бараанууд
    products = product.map((item, index) => {
      return (
        <li className="flex-this" key={index}>
          <div className="image-container default">
            <Link to={item.route ? item.route : " "}>
              <span
                className="image"
                style={{
                  backgroundImage: `url(${IMAGE + item.imgnm})`
                }}
              />
            </Link>
          </div>
          <div className="info-container">
            <div className="flex-space">
              <p className="text col-md-5 col-sm-5">
                <span>{item.skunm}</span>
                <strong>{formatter.format(item.price)}₮</strong>
              </p>
              <form style={{ width: "100px" }}>
                <div className="input-group e-input-group">
                  <div className="input-group-prepend" id="button-addon4">
                    <button
                      className="btn"
                      type="button"
                      style={{
                        color: "rgba(0,0,0,.5)",
                        textAlign: "center",
                        backgroundColor: "rgb(204, 204, 204)",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                        marginRight: "5px"
                      }}
                      onClick={this.minusProduct(item.id)}
                    >
                      <i className="fa fa-minus" aria-hidden="true" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    defaultValue={this.state.countNumber}
                    aria-label=""
                    aria-describedby="button-addon4"
                    style={{ width: "40px" }}
                  />
                  <div className="input-group-append" id="button-addon4">
                    <button
                      className="btn"
                      type="button"
                      style={{
                        color: "rgba(0,0,0,.5)",
                        textAlign: "center",
                        backgroundColor: "rgb(204, 204, 204)",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                        marginLeft: "5px"
                      }}
                      onClick={this.plusProduct(item.id)}
                    >
                      <i className="fa fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </form>
              <div className="action">
                <Link to=" ">
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </li>
      );
    });

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
                <Link to="/package">
                  <span>Багц</span>
                </Link>
              </li>
              <li>
                <span>{this.state.title}</span>
              </li>
            </ul>
          </div>
          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-xl-9 col-md-8 pad10">
                <h4 className="title">
                  <span>{this.state.title}</span>
                </h4>
                <p className="date">
                  <span>{`${this.state.date[0]} оны ${
                    this.state.date[1]
                  } сарын ${this.state.date[2]}`}</span>
                </p>
                <div className="content">
                  <div className="main-slide">
                    <Slider
                      data={this.state.images}
                      params={sliderParams}
                      elContainer={"images"}
                    />
                  </div>
                  <div className="product-plus">
                    <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.description
                      }}
                    />
                  </div>
                </div>
                <div className="pack-product-container">
                  <div className="pack-list">
                    <div className="row row10">
                      <div className="col-xl-8 pad10">
                        <ul className="list-unstyled">{products}</ul>
                      </div>
                      <div className="col-xl-4 pad10">
                        <div className="pack-price">
                          <p className="text flex-this end">
                            <span>Дүн:</span>
                            <strong>
                              {formatter.format(this.state.price)}₮
                            </strong>
                          </p>
                          <a href=" " className="btn btn-main">
                            <i className="fa fa-cart-plus" aria-hidden="true" />
                            <span className="text-uppercase">
                              {" "}
                              Сагсанд нэмэх
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info-container" style={{ float: "right" }}>
                    <span>
                      <i>
                        Та багцаас сонгож авахгүй барааныхаа тоо хэмжээг 0
                        болгосноор багцаас хасаад сагсанд нэмэх боломжтой.
                      </i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 pad10">
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
                  <div className="block product-suggest">
                    <p className="title">
                      <strong>Ижил бараа</strong>
                    </p>
                    <ul className="list-unstyled">{sameProducts}</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PackageDetail;
