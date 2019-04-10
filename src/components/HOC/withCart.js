import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api";
import storage from "../../utils/storage";
import { updateCart } from "../../actions/cart";

const withCart = WrappedComponent => {
  class CartHOC extends Component {
    constructor(props) {
      super(props);
      this.handleNotify = this.handleNotify.bind(this);
      this.handleIncrement = this.handleIncrement.bind(this);
      this.handleDecrement = this.handleDecrement.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
    }

    handleNotify = message => toast(message, { autoClose: 5000 });

    handleUpdate = (item, qty) => {
      console.log("handleUpdate", item, qty);

      api.product
        .isAvailable({
          skucd: item.cd ? item.cd : null,
          qty
        })
        .then(res => {
          if (res.success) {
            let cart = storage.get("cart")
              ? storage.get("cart")
              : { products: [], totalQty: 0, totalPrice: 0 };

            const found = cart.products.find(product => product.cd === item.cd);

            if (found) {
              found.qty += qty;
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

            storage.set("cart", cart);

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
      console.log("handleIncrement", item);

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

              this.handleNotify("+1");

              resolve();
            } else {
              this.handleNotify(res.message);

              reject();
            }
          });
      });
    };

    handleDecrement = item => {
      let cart = storage.get("cart")
        ? storage.get("cart")
        : { products: [], totalQty: 0, totalPrice: 0 };

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

      storage.set("cart", cart);

      this.props.updateCart({
        products: cart.products,
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
      });
    };

    handleRemove = item => {
      let cart = storage.get("cart")
        ? storage.get("cart")
        : { products: [], totalQty: 0, totalPrice: 0 };

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

      storage.set("cart", cart);

      this.props.updateCart({
        products: cart.products,
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
      });
    };

    render() {
      const {
        onIncrement,
        onDecrement,
        onUpdate,
        onRemove,
        ...otherProps
      } = this.props;

      return (
        <WrappedComponent
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onUpdate={this.handleUpdate}
          onRemove={this.handleRemove}
          {...otherProps}
        />
      );
    }
  }

  return connect(
    null,
    { updateCart }
  )(CartHOC);
};

export default withCart;
