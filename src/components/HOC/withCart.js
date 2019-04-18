import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { css } from "glamor";

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

    handleUpdate = (item, qty, shouldOverride = false) => {
      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      const found = cart.products.find(product => product.cd === item.cd);

      let itemQty = qty;
      if (!shouldOverride && found) {
        itemQty = found.qty + qty;
      }

      api.product
        .isAvailable({
          skucd: item.cd || null,
          qty: itemQty
        })
        .then(res => {
          if (res.success) {
            if (found) {
              found.qty = itemQty;
              const i = cart.products
                .map(product => product.cd)
                .indexOf(found.cd);
              cart.products.splice(i, 1, found);
            } else {
              item.qty = itemQty;
              cart.products.push(item);
            }

            const qties = cart.products.map(product => product.qty);
            cart.totalQty = qties.reduce((acc, curr) => acc + curr);

            const prices = cart.products.map(product => {
              const price =
                this.getUnitPrice(product).sprice ||
                this.getUnitPrice(product).price;

              return price * product.qty;
            });
            cart.totalPrice = prices.reduce((acc, curr) => acc + curr);

            // TODO: stop page refreshing
            this.props.updateCart({
              products: cart.products,
              totalQty: cart.totalQty,
              totalPrice: cart.totalPrice
            });

            this.handleNotify(
              `Таны сагсанд "${item.name ||
                item.skunm}" бараа ${itemQty}ш нэмэгдлээ.`
            );
          } else {
            this.handleNotify(res.message);
          }
        });
    };

    handleIncrement = item => {
      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      const found = cart.products.find(product => product.cd === item.cd);

      let itemQty = 0;
      if (found) {
        itemQty = found.qty;
      }

      const qtyToAdd = item.addminqty || 1;
      const newQty = itemQty + qtyToAdd;

      if (item.availableqty >= newQty) {
        if (item.salemaxqty >= newQty || item.salemaxqty === 0) {
          return new Promise((resolve, reject) => {
            api.product
              .isAvailable({
                skucd: item.id ? item.id : item.cd ? item.cd : null,
                qty: newQty
              })
              .then(res => {
                if (res.success) {
                  if (found) {
                    found.qty = newQty;
                    const i = cart.products
                      .map(product => product.cd)
                      .indexOf(found.cd);
                    cart.products.splice(i, 1, found);
                    item = { ...found };
                  } else {
                    item.qty = qtyToAdd;
                    cart.products.push(item);
                  }

                  const qties = cart.products.map(product => product.qty);
                  cart.totalQty = qties.reduce((acc, curr) => acc + curr);

                  const prices = cart.products.map(product => {
                    const price =
                      this.getUnitPrice(product).sprice ||
                      this.getUnitPrice(product).price;

                    return price * product.qty;
                  });
                  cart.totalPrice = prices.reduce((acc, curr) => acc + curr);

                  // TODO: stop page refreshing
                  this.props.updateCart({
                    products: cart.products,
                    totalQty: cart.totalQty,
                    totalPrice: cart.totalPrice
                  });

                  this.handleNotify(
                    `Таны сагсанд "${item.name ||
                      item.skunm}" бараа ${qtyToAdd}ш нэмэгдлээ.`
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
              item.salemaxqty
            }-г худалдан авах боломжтой`
          );
        }
      } else {
        this.handleNotify("Тухайн барааны нөөц хүрэлцэхгүй байна");
      }
    };

    handleDecrement = item => {
      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      const found = cart.products.find(product => product.cd === item.cd);
      if (!found) {
        return;
      }

      const qtyToSubtract = found.addminqty || 1;
      const newQty = found.qty - qtyToSubtract;

      const i = cart.products.map(product => product.cd).indexOf(found.cd);
      if (newQty >= qtyToSubtract) {
        found.qty = newQty;
        cart.products.splice(i, 1, found);
      } else {
        cart.products.splice(i, 1);
      }

      const qties = cart.products.map(product => product.qty);
      cart.totalQty = qties.length
        ? qties.reduce((acc, curr) => acc + curr)
        : 0;

      const prices = cart.products.map(product => {
        const price =
          this.getUnitPrice(product).sprice || this.getUnitPrice(product).price;

        return price * product.qty;
      });
      cart.totalPrice = prices.length
        ? prices.reduce((acc, curr) => acc + curr)
        : 0;

      this.props.updateCart({
        products: cart.products,
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
      });
    };

    handleRemove = item => {
      let { cart } = this.props;

      if (!cart) {
        cart = { products: [], totalQty: 0, totalPrice: 0 };
      }

      const found = cart.products.find(product => product.cd === item.cd);
      if (!found) {
        return;
      }

      const i = cart.products.map(product => product.cd).indexOf(found.cd);
      cart.products.splice(i, 1);

      const qties = cart.products.map(product => product.qty);
      cart.totalQty = qties.length
        ? qties.reduce((acc, curr) => acc + curr)
        : 0;

      const prices = cart.products.map(product => {
        const price =
          this.getUnitPrice(product).sprice || this.getUnitPrice(product).price;

        return price * product.qty;
      });
      cart.totalPrice = prices.length
        ? prices.reduce((acc, curr) => acc + curr)
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

    render() {
      const {
        onNotify,
        onIncrement,
        onDecrement,
        onUpdate,
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
          onUpdate={this.handleUpdate}
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
      cart: state.cart
    };
  };

  return connect(
    mapStateToProps,
    { updateCart }
  )(CartHOC);
};

export default withCart;
