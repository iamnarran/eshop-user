import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { css } from "glamor";
import clonedeep from "lodash.clonedeep";

import api from "../../api";
import { updateCart } from "../../actions/cart";

const withCart = WrappedComponent => {
  class CartHOC extends Component {
    getUnitPrice = product => {
      if (product.sprice) {
        if (product.issalekg && product.kgproduct[0]) {
          // Хямдарсан бөгөөд кг-ын бараа
          return {
            price: product.kgproduct[0].salegramprice,
            sprice: product.kgproduct[0].salegramprice
          };
        }

        // Хямдарсан бараа
        return { price: product.price, sprice: product.sprice };
      }

      if (product.issalekg && product.kgproduct[0]) {
        // Хямдраагүй бөгөөд кг-ын бараа
        return { price: product.kgproduct[0].salegramprice, sprice: null };
      }

      // Хямдраагүй бараа
      return { price: product.price, sprice: null };
    };

    handleNotify = message =>
      toast(message, {
        autoClose: 5000,
        progressClassName: css({
          background: "#feb415"
        })
      });

    handleIncrement = product => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      const {
        name,
        skunm,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = product;
      const productName = name || skunm;
      let { qty } = product;

      qty += (qty < saleminqty ? saleminqty : addminqty) || 1;

      if (availableqty >= qty) {
        if (salemaxqty >= qty || salemaxqty === 0 || isgift !== 0) {
          product.qty = qty;
        } else {
          this.handleNotify(
            `"${productName}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
          );
        }
      } else {
        this.handleNotify(`"${productName}" барааны нөөц хүрэлцэхгүй байна`);
      }

      return product;
    };

    handleDecrement = product => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      const { name, skunm, addminqty, saleminqty } = product;
      const productName = name || skunm;
      let { qty } = product;

      qty -= addminqty || 1;

      if (saleminqty > 0 && saleminqty <= qty) {
        product.qty = qty;
      } else {
        product.qty = 0;
        this.handleNotify(
          `"${productName}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
        );
      }

      return product;
    };

    handleQtyChange = (product, targetQty) => {
      let localProduct = clonedeep(product);

      if (!localProduct) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      let { qty } = localProduct;

      if (qty === targetQty) {
        return localProduct;
      }

      const {
        name,
        skunm,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = localProduct;
      const minQty = addminqty || 1;
      const productName = name || skunm;

      // Олон ширхэгээр нэмэгддэг барааны ширхэгийн тооцоолол
      targetQty = Math.round(targetQty / minQty) * minQty;

      if (targetQty > qty) {
        if (availableqty >= targetQty) {
          if (salemaxqty >= targetQty || salemaxqty === 0 || isgift !== 0) {
            if (minQty !== 1) {
              this.handleNotify(
                `Та "${productName}" бараанаас сагсандаа "${minQty}" ширхэгээр нэмэх боломжтой байна`
              );
            }

            localProduct.qty = targetQty;
          } else {
            this.handleNotify(
              `"${productName}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
            );
          }
        } else {
          this.handleNotify(`"${productName}" барааны нөөц хүрэлцэхгүй байна`);
        }
      } else {
        if (saleminqty > 0 && targetQty >= saleminqty) {
          if (minQty !== 1) {
            this.handleNotify(
              `Та "${productName}" бараанаас сагсандаа "${minQty}" ширхэгээр нэмэх боломжтой байна`
            );
          }

          localProduct.qty = targetQty;
        } else {
          this.handleNotify(
            `"${productName}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
          );
        }
      }

      return localProduct;
    };

    handleUpdateCart = (product, shouldOverride = false) => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      const { name, skunm, qty, saleminqty, salemaxqty } = product;
      const productName = name || skunm;

      if (qty > 0) {
        if (qty < saleminqty) {
          this.handleNotify(
            `"${productName}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
          );
          return;
        } else if (salemaxqty > 0 && qty > salemaxqty) {
          this.handleNotify(
            `"${productName}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
          );
          return;
        }

        let { cart } = this.props;

        if (!cart) {
          cart = { products: [], totalQty: 0, totalPrice: 0 };
        }

        const found = cart.products.find(prod => prod.cd === product.cd);

        api.product
          .isAvailable({
            skucd: product.cd,
            qty
          })
          .then(res => {
            if (res.success) {
              let productQty = qty;
              if (!shouldOverride && found) {
                productQty = found.qty + qty;
              }

              if (found) {
                found.qty = productQty;
                const i = cart.products.map(prod => prod.cd).indexOf(found.cd);
                if (i !== -1) {
                  cart.products.splice(i, 1, found);
                }
              } else {
                product.qty = productQty;
                cart.products.push(product);
              }

              const qties = cart.products.map(prod => prod.qty);
              cart.totalQty = qties.reduce((acc, cur) => acc + cur);

              const prices = cart.products.map(prod => {
                const price =
                  this.getUnitPrice(prod).sprice ||
                  this.getUnitPrice(prod).price;

                return price * prod.qty;
              });
              cart.totalPrice = prices.reduce((acc, cur) => acc + cur);

              // TODO: stop page refreshing
              this.props.updateCart({
                products: cart.products,
                totalQty: cart.totalQty,
                totalPrice: cart.totalPrice
              });

              this.handleNotify(
                `Таны сагсанд "${productName}" бараа ${qty}ш нэмэгдлээ`
              );
            } else {
              this.handleNotify(res.message);
            }
          });
      }
    };

    handleAddToCart = product => {
      if (!product) {
        return;
      }

      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }
      if (cart.products == undefined) {
        cart.products = [];
      }

      const found = cart.products.find(prod => prod.cd === product.cd);
      const productQty = found ? found.qty || 0 : 0;
      const qtyToAdd = product.addminqty || 1;
      const newQty = productQty + qtyToAdd;

      if (product.availableqty >= newQty) {
        if (product.salemaxqty >= newQty || product.salemaxqty === 0) {
          return new Promise((resolve, reject) => {
            api.product
              .isAvailable({
                skucd: product.id ? product.id : product.cd ? product.cd : null,
                qty: newQty
              })
              .then(res => {
                if (res.success) {
                  if (found) {
                    found.qty = newQty;
                    const i = cart.products
                      .map(prod => prod.cd)
                      .indexOf(found.cd);
                    cart.products.splice(i, 1, found);
                    product = { ...found };
                  } else {
                    product.qty = qtyToAdd;
                    cart.products.push(product);
                  }

                  const qties = cart.products.map(prod => prod.qty);
                  cart.totalQty = qties.reduce((acc, cur) => acc + cur);

                  const prices = cart.products.map(prod => {
                    const price =
                      this.getUnitPrice(prod).sprice ||
                      this.getUnitPrice(prod).price;

                    return price * prod.qty;
                  });
                  cart.totalPrice = prices.reduce((acc, cur) => acc + cur);

                  // TODO: stop page refreshing
                  this.props.updateCart({
                    products: cart.products,
                    totalQty: cart.totalQty,
                    totalPrice: cart.totalPrice
                  });

                  this.handleNotify(
                    `Таны сагсанд "${product.name ||
                      product.skunm}" бараа ${qtyToAdd}ш нэмэгдлээ`
                  );

                  resolve();
                } else {
                  this.handleNotify(res.message);

                  reject();
                }
              });
          });
        } else {
          this.handleNotify(
            `Тус бараанаас хамгийн ихдээ ${
              product.salemaxqty
            }-г худалдан авах боломжтой`
          );
        }
      } else {
        this.handleNotify(
          `"${product.name || product.skunm}" барааны нөөц хүрэлцэхгүй байна`
        );
      }
    };

    handleSubtractFromCart = product => {
      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      const found = cart.products.find(prod => prod.cd === product.cd);
      if (!found) {
        return;
      }

      const qtyToSubtract = found.addminqty || 1;
      const newQty = found.qty - qtyToSubtract;

      const i = cart.products.map(prod => prod.cd).indexOf(found.cd);
      if (newQty >= qtyToSubtract) {
        found.qty = newQty;
        cart.products.splice(i, 1, found);
      } else {
        cart.products.splice(i, 1);
      }

      const qties = cart.products.map(prod => prod.qty);
      cart.totalQty = qties.length ? qties.reduce((acc, cur) => acc + cur) : 0;

      const prices = cart.products.map(prod => {
        const price =
          this.getUnitPrice(prod).sprice || this.getUnitPrice(prod).price;

        return price * prod.qty;
      });
      cart.totalPrice = prices.length
        ? prices.reduce((acc, cur) => acc + cur)
        : 0;

      this.props.updateCart({
        products: cart.products,
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
      });
    };

    handleRemove = product => {
      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      const found = cart.products.find(prod => prod.cd === product.cd);
      if (!found) {
        return;
      }

      const i = cart.products.map(prod => prod.cd).indexOf(found.cd);
      cart.products.splice(i, 1);

      const qties = cart.products.map(prod => prod.qty);
      cart.totalQty = qties.length ? qties.reduce((acc, cur) => acc + cur) : 0;

      const prices = cart.products.map(prod => {
        const price =
          this.getUnitPrice(prod).sprice || this.getUnitPrice(prod).price;

        return price * prod.qty;
      });
      cart.totalPrice = prices.length
        ? prices.reduce((acc, cur) => acc + cur)
        : 0;

      this.props.updateCart({
        products: cart.products,
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
      });
    };

    handleClear = () => {
      let { cart } = this.props;

      if (cart) {
        this.props.updateCart({
          products: [],
          totalQty: 0,
          totalPrice: 0
        });
      }
    };

    oneSave = product => {
      api.product
        .addViewList({ id: this.props.user.id, skucd: product.cd })
        .then(res => {
          if (res.success) {
            this.handleNotify("Амжилттай хадгаллаа");
          } else {
            this.handleNotify("Хадгалах үед алдаа гарлаа");
          }
        });
    };

    getPackageData = async id => {
      await api.packageInfo
        .findAllProducts({
          id: id
        })
        .then(res => {
          if (res.success) {
            res.data[0].products.map(prod => {
              this.oneSave(prod);
            });
          }
        });
    };

    getRecipeData = async recipeid => {
      await api.recipe
        .findAllProducts({
          id: recipeid
        })
        .then(res => {
          if (res.success) {
            res.data[0].products.map(prod => {
              this.oneSave(prod);
            });
          }
        });
    };

    handleSave = product => {
      if (this.props.isLoggedIn && this.props.user) {
        if (product.recipeid) {
          this.getRecipeData(product.recipeid);
        }
        if (product.id) {
          this.getPackageData(product.id);
        } else {
          this.oneSave(product);
        }
      } else {
        window.alert("Та нэвтэрсний дараа хүссэн бараагаа хадгалах боломжтой");
      }
    };

    render() {
      const {
        onNotify,
        onIncrement,
        onDecrement,
        onQtyChange,
        onAddToCart,
        onSubtractFromCart,
        onUpdateCart,
        onRemove,
        onClear,
        getUnitPrice,
        ...otherProps
      } = this.props;

      return (
        <WrappedComponent
          onNotify={this.handleNotify}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onQtyChange={this.handleQtyChange}
          onAddToCart={this.handleAddToCart}
          onSubtractFromCart={this.handleSubtractFromCart}
          onUpdateCart={this.handleUpdateCart}
          onRemove={this.handleRemove}
          onClear={this.handleClear}
          getUnitPrice={this.getUnitPrice}
          {...otherProps}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      cart: state.cart,
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user
    };
  };

  return connect(
    mapStateToProps,
    { updateCart }
  )(CartHOC);
};

export default withCart;
