import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api";
import { updateCart } from "../../actions/cart";
import LoginModal from "../LoginModal";
const withCart = WrappedComponent => {
  class CartHOC extends Component {
    state = { isLoginModalVisible: false, data: [] };
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
                    `Таны сагсанд "${item.name}" бараа ${qtyToAdd}ш нэмэгдлээ.`
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
            "Тухайн өдөр зарагдах боломжтой тоо хэмжээ хэтэрсэн байна"
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

    oneSave = item => {
      api.product
        .addViewList({ id: this.props.user.id, skucd: item.cd })
        .then(res => {
          if (res.success) {
            this.handleNotify("Амжилттай хадгаллаа.");
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
            console.log(res.data[0].products);
            res.data[0].products.map(item => {
              this.oneSave(item);
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
            res.data[0].products.map(item => {
              this.oneSave(item);
            });
          }
        });
    };

    handleSave = item => {
      if (this.props.isLoggedIn && this.props.user) {
        if (item.recipeid) {
          this.getRecipeData(item.recipeid);
        }
        if (item.id) {
          this.getPackageData(item.id);
        } else {
          this.oneSave(item);
        }
      } else {
        window.alert("newtreech malaa");
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
          onSave={this.handleSave}
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
