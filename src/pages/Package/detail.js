import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, Input, Button, Icon } from "antd";

import { IMAGE } from "../../utils/consts";
import Slider from "../../components/Slider";
import storage from "../../utils/storage";
import api from "../../api";
import { updateCart } from "../../actions/cart";
import withCart from "../../components/HOC/withCart";
import productPlus from "../../scss/assets/images/demo/productPlus.png";

import "./detail.css";

const formatter = new Intl.NumberFormat("en-US");

class PackageDetail extends React.Component {
  state = {
    products: this.props.container.products.products
  };

  componentDidMount() {
    let tempProducts = this.state.products;

    tempProducts.forEach(product => {
      product.qty = product.addminqty || 1;
    });

    this.setState({ products: tempProducts });
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: this.props.container.Products[0].products,
  //     price: parseInt(this.props.container.Products[0].total),
  //     sameProducts: this.props.container.Products[0].sameproducts,
  //     addProduct: null,
  //     remProduct: null,
  //     images: this.props.container.Package.images,
  //     description: this.props.container.Package.products[0].description,
  //     title: this.props.container.Package.products[0].packagenm,
  //     deliveryText: this.props.container.Package.products[0].deliverytxt,
  //     date: this.props.container.Package.products[0].insymd
  //       .split("T")[0]
  //       .split("-"),
  //     id: this.props.container.Package.products[0]
  //   };
  //   console.log("constructor", this.props.container.Package.products[0]);
  // }

  // notify = message => toast(message, { autoClose: 5000 });

  // add = prod => {
  //   let cart = storage.get("cart")
  //     ? storage.get("cart")
  //     : { products: [], totalQty: 0, totalPrice: 0 };
  //   if (prod.length) {
  //     prod.map(product => {
  //       const found = cart.products.find(product => product.cd === product.cd);
  //       if (parseInt(product.unit) === 0) {
  //         return;
  //       } else {
  //         let productQty = 0;
  //         if (found) {
  //           productQty = parseInt(found.qty) + parseInt(product.unit);
  //         } else {
  //           productQty = product.unit;
  //         }
  //         return new Promise((resolve, reject) => {
  //           api.product
  //             .isAvailable({
  //               skucd: product.cd,
  //               qty: productQty
  //             })
  //             .then(res => {
  //               if (res.success) {
  //                 if (found) {
  //                   found.qty = productQty;
  //                   const i = cart.products
  //                     .map(product => product.cd)
  //                     .indexOf(found.cd);
  //                   cart.products.splice(i, 1, found);
  //                 } else {
  //                   product.qty = productQty;
  //                   cart.products.push(product);
  //                 }
  //                 const qties = cart.products.map(product => product.qty);
  //                 cart.totalQty = qties.reduce(
  //                   (acc, curr) => parseInt(acc) + parseInt(curr)
  //                 );
  //                 const prices = cart.products.map(product => {
  //                   const price = product.sprice
  //                     ? product.sprice
  //                     : product.price
  //                     ? product.price
  //                     : 0;
  //                   return product.qty * price;
  //                 });
  //                 cart.totalPrice = prices.reduce(
  //                   (acc, curr) => parseInt(acc) + parseInt(curr)
  //                 );
  //                 storage.set("cart", cart);
  //                 this.props.updateCart({
  //                   products: cart.products,
  //                   totalQty: cart.totalQty,
  //                   totalPrice: cart.totalPrice
  //                 });
  //                 let tot = parseInt(product.unit) * parseInt(product.tprice);
  //                 this.notify(
  //                   "Таны сагсанд " +
  //                     product.unit +
  //                     "ш " +
  //                     product.skunm +
  //                     " бүтээгдэхүүн нэмэгдлээ." +
  //                     "Үнийн дүн:" +
  //                     parseInt(tot)
  //                 );
  //                 resolve();
  //               } else {
  //                 this.notify(
  //                   "Таны сонгосон багцын " +
  //                     product.unit +
  //                     "-" +
  //                     product.skunm +
  //                     " бараа дууссан байгаа тул худалдан авалт хийх боломжгүй байна."
  //                 );
  //                 reject();
  //               }
  //             });
  //         });
  //       }
  //     });
  //   } else {
  //     const found = cart.products.find(product => product.cd === prod.cd);
  //     if (parseInt(prod.unit) === 0) {
  //       return;
  //     } else {
  //       let productQty = 0;
  //       if (found) {
  //         productQty = parseInt(found.qty) + parseInt(prod.unit);
  //       } else {
  //         productQty = parseInt(prod.unit);
  //       }
  //       return new Promise((resolve, reject) => {
  //         api.product
  //           .isAvailable({
  //             skucd: prod.cd,
  //             qty: productQty
  //           })
  //           .then(res => {
  //             if (res.success) {
  //               if (found) {
  //                 found.qty = productQty;
  //                 const i = cart.products
  //                   .map(product => product.cd)
  //                   .indexOf(found.cd);
  //                 cart.products.splice(i, 1, found);
  //               } else {
  //                 prod.qty = productQty;
  //                 cart.products.push(prod);
  //               }
  //               const qties = cart.products.map(product => product.qty);
  //               cart.totalQty = qties.reduce(
  //                 (acc, curr) => parseInt(acc) + parseInt(curr)
  //               );
  //               const prices = cart.products.map(product => {
  //                 const price = product.sprice
  //                   ? product.sprice
  //                   : product.price
  //                   ? product.price
  //                   : 0;
  //                 return product.qty * price;
  //               });
  //               cart.totalPrice = prices.reduce(
  //                 (acc, curr) => parseInt(acc) + parseInt(curr)
  //               );
  //               storage.set("cart", cart);
  //               this.props.updateCart({
  //                 products: cart.products,
  //                 totalQty: cart.totalQty,
  //                 totalPrice: cart.totalPrice
  //               });
  //               let tot = parseInt(prod.unit) * parseInt(prod.tprice);
  //               this.notify(
  //                 "Таны сагсанд " +
  //                   prod.unit +
  //                   "ш " +
  //                   prod.skunm +
  //                   " бүтээгдэхүүн нэмэгдлээ." +
  //                   "Үнийн дүн:" +
  //                   parseInt(tot)
  //               );
  //               resolve();
  //             } else {
  //               this.notify(
  //                 "Таны сонгосон багцын " +
  //                   prod.unit +
  //                   "-" +
  //                   prod.skunm +
  //                   " бараа дууссан байгаа тул худалдан авалт хийх боломжгүй байна."
  //               );
  //               reject();
  //             }
  //           });
  //       });
  //     }
  //   }
  // };

  // handleAddToCart = product => e => {
  //   e.preventDefault();
  //   let products = [];
  //   if (product.recipeid) {
  //     api.recipe.findAllProducts({ id: product.recipeid }).then(res => {
  //       if (res.success) {
  //         products = res.data[0].products;
  //         if (products.length) {
  //           products.reduce((acc, next) => {
  //             return acc.then(() => {
  //               return this.add(next);
  //             });
  //           }, Promise.resolve());
  //         }
  //       } else {
  //         this.notify(res.message);
  //       }
  //     });
  //   } else if (product.packageid) {
  //     this.add(this.state.products);
  //   } else {
  //     this.add(product);
  //   }
  // };

  // handleSingleAddToCart = product => e => {
  //   this.add(product);
  // };

  // onChange = (e, minus) => {
  //   e.preventDefault();
  //   let tmp = [];
  //   this.state.products.map(product => {
  //     if (parseInt(product.unit) > 0) {
  //       if (product.cd === minus.cd) {
  //         product.unit = e.target.value;
  //       }
  //     }
  //     tmp.push(product);
  //   });
  //   this.setState({ products: tmp });
  // };

  // plusProduct = (e, plus) => {
  //   e.preventDefault();
  //   let tmp = [];
  //   let total = 0;
  //   let tot = 0;
  //   this.state.products.map(product => {
  //     if (product.cd === plus.cd) {
  //       if (product.availableqty > product.unit && product.salemaxqty > product.unit) {
  //         product.unit = parseInt(product.unit) + 1;
  //       } else {
  //         if (product.salemaxqty === 0) {
  //           product.unit = parseInt(product.unit) + 1;
  //         } else {
  //           this.notify(
  //             "Уучлаарай тухайн барааг худалдан авах дээд хязгаарт хүрсэн байна."
  //           );
  //         }
  //       }
  //     }
  //     tot = parseInt(product.unit) * parseInt(product.tprice);
  //     total = parseInt(total) + parseInt(tot);
  //     tmp.push(product);
  //   });
  //   this.setState({
  //     products: tmp,
  //     price: total,
  //     images: this.props.container.Package.images
  //   });
  // };

  // minusProduct = (e, minus) => {
  //   e.preventDefault();
  //   let tmp = [];
  //   let total = 0;
  //   let tot = 0;
  //   this.state.products.map(product => {
  //     if (parseInt(product.unit) > 0) {
  //       if (product.cd === minus.cd) {
  //         product.unit = parseInt(product.unit) - 1;
  //       }
  //     }
  //     tot = parseInt(product.unit) * parseInt(product.tprice);
  //     total = parseInt(total) + parseInt(tot);
  //     tmp.push(product);
  //   });
  //   this.setState({ products: tmp, price: total });
  // };

  handleAddToCartClick = () => {
    const { products } = this.state;

    if (products.length) {
      products.reduce((acc, next) => {
        return acc.then(() => {
          return this.props.onUpdate(next, next.qty);
        });
      }, Promise.resolve());
    }
  };

  handleIncrementClick = product => {
    const { products } = this.state;
    let found = products.find(prod => prod.cd === product.cd);

    if (found) {
      const { addminqty, availableqty, salemaxqty, isgift } = found;
      let { qty } = found;

      qty += addminqty || 1;

      if (availableqty >= qty) {
        if (salemaxqty >= qty || salemaxqty === 0 || isgift !== 0) {
          const i = products.map(prod => prod.cd).indexOf(found.cd);

          if (i !== -1) {
            found.qty = qty;
            let tempProducts = products;
            tempProducts.splice(i, 1, found);

            this.setState({ products: tempProducts });
          }
        }
      }
    }
  };

  handleDecrementClick = product => {
    const { products } = this.state;
    let found = products.find(prod => prod.cd === product.cd);

    if (found) {
      const { addminqty, saleminqty } = found;
      let { qty } = found;

      qty -= addminqty || 1;

      if (saleminqty > 0 && saleminqty <= qty) {
        const i = products.map(prod => prod.cd).indexOf(found.cd);

        if (i !== -1) {
          found.qty = qty;
          let tempProducts = products;
          tempProducts.splice(i, 1, found);

          this.setState({ products: tempProducts });
        }
      }
    }
  };

  handleQtyChange = product => e => {
    const { products } = this.state;

    let found = products.find(prod => prod.cd === product.cd);

    if (found) {
      const i = products.map(prod => prod.cd).indexOf(found.cd);

      if (i !== -1) {
        found.qty = parseInt(e.target.value || 1);
        let tempProducts = products;
        tempProducts.splice(i, 1, found);

        this.setState({ products: tempProducts });
      }
    }
  };

  handleQtyKeyDown = product => e => {
    if (e.key === "Enter") {
      const { products } = this.state;
      let found = products.find(prod => prod.cd === product.cd);

      if (found) {
        const { availableqty, salemaxqty, isgift, qty } = found;

        if (availableqty >= qty) {
          if (salemaxqty >= qty || salemaxqty === 0 || isgift !== 0) {
            const i = products.map(prod => prod.cd).indexOf(found.cd);
            let tempProducts = products;
            tempProducts.splice(i, 1, found);

            this.setState({ products: tempProducts });
          }
        }
      }
    }
  };

  handleQtyBlur = product => e => {
    const { products } = this.state;
    let found = products.find(prod => prod.cd === product.cd);

    if (found) {
      const { availableqty, salemaxqty, isgift, qty } = found;

      if (availableqty >= qty) {
        if (salemaxqty >= qty || salemaxqty === 0 || isgift !== 0) {
          const i = products.map(prod => prod.cd).indexOf(found.cd);
          let tempProducts = products;
          tempProducts.splice(i, 1, found);

          this.setState({ products: tempProducts });
        }
      }
    }
  };

  renderDate = dateString => {
    const dateParts = dateString.split("T")[0].split("-");

    return (
      <p className="date">
        <span>
          {`${dateParts[0]} оны ${dateParts[1]} сарын ${dateParts[2]}`}
        </span>
      </p>
    );
  };

  renderSimilarProducts = () => {
    const similarProducts = this.props.container.products.sameproducts;

    return (
      !!similarProducts.length && (
        <div className="block product-suggest">
          <p className="title">
            <strong>Ижил бараа</strong>
          </p>

          <ul className="list-unstyled">
            {similarProducts.map((product, index) => {
              return (
                <li key={index}>
                  <div className="single flex-this">
                    <div className="image-container">
                      <Link to={product.route || ""}>
                        <span
                          className="image"
                          style={{
                            backgroundImage: `url(${IMAGE}${product.url})`
                          }}
                        />
                      </Link>
                    </div>

                    <div className="info-container flex-space">
                      <Link to={product.route || ""}>
                        <span>{product.skunm}</span>
                        <strong>
                          {formatter.format(product.price1 || product.price2)}₮
                        </strong>
                      </Link>
                      <div className="action">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => this.props.onIncrement(product)}
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
        </div>
      )
    );
  };

  renderCartInfo = () => {
    const { products } = this.state;

    return (
      <div className="pack-product-container" style={{ marginTop: "30px" }}>
        {products.length && (
          <div className="pack-list">
            <div className="row row10">
              <div className="col-xl-8 pad10">
                <ul className="list-unstyled">
                  {products.map((product, index) => (
                    <li className="flex-this" key={index}>
                      <div className="image-container default">
                        <Link to={product.route || ""}>
                          <span
                            className="image"
                            style={{
                              backgroundImage: `url(${IMAGE}${product.img})`
                            }}
                          />
                        </Link>
                      </div>

                      <div className="info-container">
                        <div className="flex-space">
                          <p className="text col-md-5 col-sm-5">
                            <Link
                              to={product.route || ""}
                              style={{ color: "#666" }}
                            >
                              <span>{product.skunm}</span>
                              <strong>
                                {formatter.format(
                                  this.props.getUnitPrice(product).sprice ||
                                    this.props.getUnitPrice(product).price
                                )}
                                ₮
                              </strong>
                            </Link>
                          </p>

                          <form style={{ width: "130px" }}>
                            <div className="input-group e-input-group">
                              <div
                                className="input-group-prepend"
                                id="button-addon4"
                              >
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
                                  onClick={() =>
                                    this.handleDecrementClick(product)
                                  }
                                >
                                  <i
                                    className="fa fa-minus"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={product.qty}
                                name="productQty"
                                maxLength={5}
                                onChange={this.handleQtyChange(product)}
                                onKeyDown={this.handleQtyKeyDown(product)}
                                onBlur={this.handleQtyBlur(product)}
                              />
                              <div
                                className="input-group-append"
                                id="button-addon4"
                              >
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
                                  onClick={() =>
                                    this.handleIncrementClick(product)
                                  }
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </form>

                          <div className="action">
                            <Link to="">
                              <i
                                className="fa fa-cart-plus"
                                aria-hidden="true"
                                style={{ fontSize: "1.6rem" }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-xl-4 pad10">
                <div className="pack-price">
                  <p className="text flex-this end">
                    <span>Дүн:</span>
                    {this.renderTotalPrice()}
                  </p>

                  <button
                    type="button"
                    className="btn btn-main"
                    onClick={this.handleAddToCartClick}
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
          </div>
        )}

        <div className="info-container" style={{ float: "right" }}>
          <span>
            <i>
              Та багцаас сонгож авахгүй барааныхаа тоо хэмжээг 0 болгосноор
              багцаас хасаад сагсанд нэмэх боломжтой.
            </i>
          </span>
        </div>
      </div>
    );
  };

  renderTotalPrice = () => {
    // const prices = this.state.products.map(
    //   prod =>
    //     this.props.getUnitPrice(prod).sprice ||
    //     this.props.getUnitPrice(prod).price
    // );
    // console.log("prices", prices);
    const totalPrice = this.state.products.reduce(
      (acc, curr) =>
        acc +
        curr.qty *
          (this.props.getUnitPrice(curr).sprice ||
            this.props.getUnitPrice(curr).price),
      0
    );

    return <strong>{formatter.format(totalPrice)}₮</strong>;
  };

  render() {
    console.log("render", this.state.products);
    // const formatter = new Intl.NumberFormat("en-US");
    // const sameproduct = this.props.container.Products[0].sameproducts;
    // let products = null;
    // let sameProducts = null;
    // const sliderParams = {
    //   spaceBetween: 0,
    //   autoplay: {
    //     delay: 10000,
    //     disableOnInteraction: false
    //   },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   },
    //   pagination: {
    //     el: ".swiper-pagination",
    //     type: "bullets",
    //     clickable: true
    //   }
    // };
    // // Багцад орсон барааны ижил бараанууд
    // if (sameproduct.length > 0) {
    //   sameProducts = (
    //     <div className="block product-suggest">
    //       <p className="title">
    //         <strong>Ижил бараа</strong>
    //       </p>
    //       <ul className="list-unstyled">
    //         {sameproduct.map((product, index) => {
    //           return (
    //             <li key={index}>
    //               <div className="single flex-this">
    //                 <div className="image-container">
    //                   <Link to={product.route ? product.route : " "}>
    //                     <span
    //                       className="image"
    //                       style={{
    //                         backgroundImage: `url(${IMAGE + product.url})`
    //                       }}
    //                     />
    //                   </Link>
    //                 </div>
    //                 <div className="info-container flex-space">
    //                   <Link to="">
    //                     <span>{product.skunm}</span>
    //                     <strong>
    //                       {formatter.format(
    //                         product.price1 ? product.price1 : product.price2
    //                       )}
    //                       ₮
    //                     </strong>
    //                   </Link>
    //                   <div className="action">
    //                     <a onClick={this.handleSingleAddToCart(product)}>
    //                       <Avatar size="small" src={productPlus} />
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   );
    // }
    // console.log("products", this.state.products);
    // // Багцад орсон бараанууд
    // products = this.state.products.map((product, index) => {
    //   return (
    //     <li className="flex-this" key={index}>
    //       <div className="image-container default">
    //         <Link to={product.route ? product.route : " "}>
    //           <span
    //             className="image"
    //             style={{
    //               backgroundImage: `url(${IMAGE + product.img})`
    //             }}
    //           />
    //         </Link>
    //       </div>
    //       <div className="info-container">
    //         <div className="flex-space">
    //           <p className="text col-md-5 col-sm-5">
    //             <span>{product.skunm}</span>
    //             <strong>{formatter.format(product.tprice)}₮</strong>
    //           </p>
    //           <form style={{ width: "100px" }}>
    //             <div className="input-group e-input-group">
    //               <div className="input-group-prepend" id="button-addon4">
    //                 <button
    //                   className="btn"
    //                   type="button"
    //                   style={{
    //                     color: "rgba(0,0,0,.5)",
    //                     textAlign: "center",
    //                     backgroundColor: "rgb(204, 204, 204)",
    //                     borderTopLeftRadius: "20px",
    //                     borderBottomLeftRadius: "20px",
    //                     marginRight: "5px"
    //                   }}
    //                   onClick={e => this.minusProduct(e, product)}
    //                 >
    //                   <i className="fa fa-minus" aria-hidden="true" />
    //                 </button>
    //               </div>
    //               <Input
    //                 style={{ width: "40%", border: "0px", textAlign: "center" }}
    //                 value={product.unit}
    //               />
    //               <div className="input-group-append" id="button-addon4">
    //                 <button
    //                   className="btn"
    //                   type="button"
    //                   style={{
    //                     color: "rgba(0,0,0,.5)",
    //                     textAlign: "center",
    //                     backgroundColor: "rgb(204, 204, 204)",
    //                     borderTopRightRadius: "20px",
    //                     borderBottomRightRadius: "20px",
    //                     marginLeft: "5px"
    //                   }}
    //                   onClick={e => this.plusProduct(e, product)}
    //                 >
    //                   <i className="fa fa-plus" aria-hidden="true" />
    //                 </button>
    //               </div>
    //             </div>
    //           </form>
    //           <div className="action">
    //             <a onClick={this.handleSingleAddToCart(product)}>
    //               <Avatar size="small" src={productPlus} />
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </li>
    //   );
    // });
    const packageInfo = this.props.container.packageInfo.products[0];
    const images = this.props.container.packageInfo.images;

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
                <Link to="/package">
                  <span>Багц</span>
                </Link>
              </li>
              {/* <li>
                <span>{packageInfo.packagenm}</span>
              </li> */}
            </ul>
          </div>

          <div className="product-detail-page">
            <div className="row row10">
              <div className="col-xl-9 col-md-8 pad10">
                <h4 className="title">
                  <span>{packageInfo.packagenm}</span>
                </h4>

                {this.renderDate(packageInfo.insymd)}

                <div className="content">
                  {!!images.length && (
                    <div
                      className="main-slide"
                      style={{ marginBottom: "30px" }}
                    >
                      <Slider
                        data={images}
                        params={sliderParams}
                        elContainer={"images"}
                      />
                    </div>
                  )}

                  <div
                    style={{ lineHeight: "200%" }}
                    className="product-plus htmlcontainer"
                    dangerouslySetInnerHTML={{
                      __html: packageInfo.description
                    }}
                  />
                </div>

                {this.renderCartInfo()}
              </div>

              <div className="col-xl-3 col-md-4 pad10">
                <div className="product-plus">
                  {packageInfo.deliverytxt && (
                    <div className="block product-delivery">
                      <p className="title">
                        <strong>Хүргэлтийн мэдээлэл</strong>
                      </p>
                      <p className="text">
                        <span>{packageInfo.deliverytxt}</span>
                      </p>
                    </div>
                  )}

                  {this.renderSimilarProducts()}
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
  )(PackageDetail)
);
