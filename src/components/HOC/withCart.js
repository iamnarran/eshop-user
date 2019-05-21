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
        if (
          product.issalekg &&
          product.kgproduct &&
          product.kgproduct[0] &&
          product.kgproduct[0].salegramprice
        ) {
          // Хямдарсан бөгөөд кг-ын бараа
          return {
            price: product.kgproduct[0].salegramprice,
            sprice: product.kgproduct[0].salegramprice
          };
        }

        // Хямдарсан бараа
        return { price: product.price, sprice: product.sprice };
      }

      if (
        product.issalekg &&
        product.kgproduct &&
        product.kgproduct[0] &&
        product.kgproduct[0].salegramprice
      ) {
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
        qty,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = product;

      let targetQty = qty + addminqty;

      if (targetQty < saleminqty) {
        product.qty = saleminqty;
        this.handleNotify(
          `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байнаaa`
        );
      } else {
        targetQty = Math.ceil(targetQty / addminqty) * addminqty;

        if (targetQty > salemaxqty && salemaxqty !== 0 && isgift !== 0) {
          targetQty = Math.floor(targetQty / addminqty) * addminqty;

          if (targetQty > availableqty) {
            this.handleNotify(`"${name}" барааны нөөц хүрэлцэхгүй байна`);
          } else if (targetQty > salemaxqty && salemaxqty !== 0) {
            this.handleNotify(
              `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
            );
          } else {
            product.qty = targetQty;
          }
        } else {
          product.qty = targetQty;
        }
      }
    };

    handleDecrement = product => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      const { name, qty, addminqty, saleminqty } = product;

      let targetQty = qty - addminqty;

      if (targetQty <= saleminqty) {
        product.qty = saleminqty;
        this.handleNotify(
          `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байнаdfsaf`
        );
      } else {
        targetQty = Math.floor(targetQty / addminqty) * addminqty;

        if (targetQty <= saleminqty) {
          product.qty = saleminqty;
          this.handleNotify(
            `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
          );
        } else {
          product.qty = targetQty;
        }
      }
    };

    handleQtyChange = product => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      const {
        name,
        qty,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = product;

      const targetQty = Math.round(qty / addminqty) * addminqty;

      if (qty === targetQty) {
        return;
      }

      if (targetQty <= saleminqty) {
        product.qty = saleminqty;
        this.handleNotify(
          `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
        );
      } else if (targetQty > salemaxqty && salemaxqty !== 0 && isgift !== 0) {
        if (targetQty > availableqty) {
          product.qty = salemaxqty;
          this.handleNotify(`"${name}" барааны нөөц хүрэлцэхгүй байна`);
        } else {
          product.qty = salemaxqty;
          this.handleNotify(
            `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
          );
        }
      } else {
        product.qty = targetQty;
      }
    };

    handleUpdateCart = (product, shouldOverride = false) => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      const {
        cd,
        name,
        saleminqty,
        salemaxqty,
        addminqty,
        availableqty,
        isgift
      } = product;
      let { qty } = product;

      let { cart } = this.props;
      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      let found = cart.products.find(prod => prod.cd === cd);
      const qtyInCart = found ? found.qty : 0;

      if (isNaN(qty)) {
        if (qtyInCart > 0) {
          if (qtyInCart > saleminqty) {
            qty = addminqty;
          } else {
            qty = saleminqty;
          }
        } else {
          qty = saleminqty;
        }
      }

      let targetQty = shouldOverride
        ? Math.round(qty / addminqty) * addminqty
        : Math.round((qty + qtyInCart) / addminqty) * addminqty;

      if (targetQty < saleminqty) {
        this.handleNotify(
          `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
        );
        return;
      } else if (targetQty > salemaxqty && salemaxqty !== 0 && isgift !== 0) {
        if (targetQty > availableqty) {
          this.handleNotify(`"${name}" барааны нөөц хүрэлцэхгүй байна`);
        } else {
          this.handleNotify(
            `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байнаaaa`
          );
        }
        return;
      }

      api.product
        .isAvailable({
          custid:
            this.props.isLoggedIn && this.props.user ? this.props.user.id : 0,
          skucd: cd,
          qty: targetQty,
          iscart: shouldOverride ? 1 : 0
        })
        .then(res => {
          if (res.success) {
            if (found) {
              found.qty = targetQty;
              const i = cart.products.map(prod => prod.cd).indexOf(found.cd);
              if (i !== -1) {
                cart.products.splice(i, 1, found);
              }
            } else {
              product.qty = targetQty;
              cart.products.push(product);
            }

            const qties = cart.products.map(prod => prod.qty);
            cart.totalQty = qties.reduce((acc, cur) => acc + cur);
            const prices = cart.products.map(prod => {
              const price =
                this.getUnitPrice(prod).sprice || this.getUnitPrice(prod).price;
              return price * prod.qty;
            });
            cart.totalPrice = prices.reduce((acc, cur) => acc + cur);

            this.props.updateCart({
              products: cart.products,
              totalQty: cart.totalQty,
              totalPrice: cart.totalPrice
            });

            this.handleNotify(`Таны сагсанд "${name}" бараа ${qty}ш нэмэгдлээ`);
          } else {
            this.handleNotify(res.message);
          }
        });
    };

    handleRemove = product => {
      if (this.props.isLoggedIn && this.props.user) {
        api.cart
          .removeProduct({ custid: this.props.user.id, skucd: product.cd })
          .then(res => {
            if (res.success) {
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
              cart.totalQty = qties.length
                ? qties.reduce((acc, cur) => acc + cur)
                : 0;

              const prices = cart.products.map(prod => {
                const price =
                  this.getUnitPrice(prod).sprice ||
                  this.getUnitPrice(prod).price;

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
            } else {
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
              cart.totalQty = qties.length
                ? qties.reduce((acc, cur) => acc + cur)
                : 0;

              const prices = cart.products.map(prod => {
                const price =
                  this.getUnitPrice(prod).sprice ||
                  this.getUnitPrice(prod).price;

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
            }
          });
      } else {
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
        cart.totalQty = qties.length
          ? qties.reduce((acc, cur) => acc + cur)
          : 0;

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
      }
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
