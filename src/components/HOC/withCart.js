import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api";
import { updateCart } from "../../actions/cart";

const withCart = WrappedComponent => {
  class CartHOC extends Component {
    handleNotify = message => toast(message, { autoClose: 5000 });

    handleUpdate = (item, qty) => {
      api.product
        .isAvailable({
          skucd: item.cd ? item.cd : null,
          qty
        })
        .then(res => {
          if (res.success) {
            let { cart } = this.props;

            if (!cart) {
              cart = { products: [], totalQty: 0, totalPrice: 0 };
            }

            const found = cart.products.find(product => product.cd === item.cd);

            if (found) {
              found.qty = qty;
              const i = cart.products
                .map(product => product.cd)
                .indexOf(found.cd);
              cart.products.splice(i, 1, found);
            } else {
              item.qty = qty;
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

            // TODO: stop page refreshing
            this.props.updateCart({
              products: cart.products,
              totalQty: cart.totalQty,
              totalPrice: cart.totalPrice
            });
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

      // if (availableqty > 0 && availableqty > productQty) {
      //   if (salemaxqty > productQty || salemaxqty === 0) {
      //     this.setState({
      //       productQty:
      //         productQty < addminqty ? addminqty : productQty + addminqty
      //     });
      //   }
      // }

      return new Promise((resolve, reject) => {
        api.product
          .isAvailable({
            skucd: item.id ? item.id : item.cd ? item.cd : null,
            qty: itemQty + 1
          })
          .then(res => {
            console.log("item", item);
            if (res.success) {
              if (found) {
                found.qty++;
                const i = cart.products
                  .map(product => product.cd)
                  .indexOf(found.cd);
                cart.products.splice(i, 1, found);
                item = { ...found };
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

              // TODO: stop page refreshing
              this.props.updateCart({
                products: cart.products,
                totalQty: cart.totalQty,
                totalPrice: cart.totalPrice
              });

              this.handleNotify(
                `Таны сагсанд "${item.name}" бараа ${item.qty}ш нэмэгдлээ.`
              );

              resolve();
            } else {
              this.handleNotify(res.message);

              reject();
            }
          });
      });
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

      const i = cart.products.map(product => product.cd).indexOf(found.cd);
      if (found.qty > 1) {
        found.qty--;
        cart.products.splice(i, 1, found);
      } else {
        cart.products.splice(i, 1);
      }

      const qties = cart.products.map(product => product.qty);
      cart.totalQty = qties.length
        ? qties.reduce((acc, curr) => acc + curr)
        : 0;

      const prices = cart.products.map(product => {
        const price = product.sprice
          ? product.sprice
          : product.price
          ? product.price
          : 0;
        return product.qty * price;
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
        const price = product.sprice
          ? product.sprice
          : product.price
          ? product.price
          : 0;
        return product.qty * price;
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
        onIncrement,
        onDecrement,
        onUpdate,
        onRemove,
        onClear,
        ...otherProps
      } = this.props;

      return (
        <WrappedComponent
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onUpdate={this.handleUpdate}
          onRemove={this.handleRemove}
          onClear={this.handleClear}
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
