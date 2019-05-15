import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { css, target } from "glamor";
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

      let clonedProduct = clonedeep(product);

      const {
        name,
        qty,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = clonedProduct;

      let targetQty = Math.round(
        qty + addminqty + ((qty + addminqty) % addminqty)
      );

      if (targetQty > 0 && targetQty <= availableqty) {
        if (targetQty <= saleminqty) {
          targetQty = saleminqty;
        } else {
          if (targetQty > salemaxqty) {
            targetQty = Math.floor(
              qty + addminqty + ((qty + addminqty) % addminqty)
            );

            if (targetQty > salemaxqty) {
              this.handleNotify(
                `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
              );
            }
          }
        }

        if (targetQty <= salemaxqty || salemaxqty === 0 || isgift !== 0) {
          clonedProduct.qty = targetQty;
        } else {
          this.handleNotify(
            `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
          );
        }
      } else {
        this.handleNotify(`"${name}" барааны нөөц хүрэлцэхгүй байна`);
      }

      return clonedProduct;
    };

    handleDecrement = product => {
      if (!product) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      let clonedProduct = clonedeep(product);

      const {
        name,
        qty,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = clonedProduct;

      let targetQty = Math.round(
        qty - addminqty + ((qty - addminqty) % addminqty)
      );

      if (targetQty > 0 && targetQty <= availableqty) {
        if (targetQty <= saleminqty) {
          targetQty = saleminqty;
        }

        clonedProduct.qty = targetQty;
      } else {
        this.handleNotify(`"${name}" барааны нөөц хүрэлцэхгүй байна`);
      }

      return clonedProduct;
    };

    handleQtyChange = (product, targetQty) => {
      let localProduct = clonedeep(product);

      if (!localProduct) {
        this.handleNotify("Бараа олдсонгүй");
        return;
      }

      let { qty } = localProduct;

      if (qty === targetQty) {
        return;
      }

      const {
        name,
        addminqty,
        availableqty,
        saleminqty,
        salemaxqty,
        isgift
      } = product;
      const minQty = addminqty || 1;

      // Олон ширхэгээр нэмэгддэг барааны ширхэгийн тооцоолол
      targetQty = Math.round(targetQty / minQty) * minQty;

      if (targetQty > qty) {
        if (availableqty >= targetQty) {
          if (salemaxqty >= targetQty || salemaxqty === 0 || isgift !== 0) {
            if (minQty !== 1) {
              this.handleNotify(
                `Та "${name}" бараанаас сагсандаа "${minQty}" ширхэгээр нэмэх боломжтой байна`
              );
            }

            localProduct.qty = targetQty;
          } else {
            this.handleNotify(
              `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
            );
          }
        } else {
          this.handleNotify(`"${name}" барааны нөөц хүрэлцэхгүй байна`);
        }
      } else {
        if (saleminqty > 0 && targetQty >= saleminqty) {
          if (minQty !== 1) {
            this.handleNotify(
              `Та "${name}" бараанаас сагсандаа "${minQty}" ширхэгээр нэмэх боломжтой байна`
            );
          }

          localProduct.qty = targetQty;
        } else {
          this.handleNotify(
            `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
          );
        }
      }

      return localProduct;
    };

    // handleUpdateCart = (
    //   oldProduct,
    //   newProduct = null,
    //   shouldOverride = false
    // ) => {
    //   if (!oldProduct) {
    //     this.handleNotify("Бараа олдсонгүй");
    //     return;
    //   }

    //   if (newProduct === null) {
    //     newProduct = clonedeep(oldProduct);
    //   }

    //   let { cart } = this.props;
    //   if (!cart) {
    //     cart = { products: [], totalQty: 0, totalPrice: 0 };
    //   }

    //   const found = cart.products.find(prod => prod.cd === newProduct.cd);
    //   const qtyInCart = found ? found.qty : 0;

    //   // if (qtyInCart > 0) {

    //   // } else {
    //   //   if (oldProduct.qty === newProduct.qty) {

    //   //   } else {
    //   //     if (oldProduct.qty < newProduct.qty) {

    //   //     } else {

    //   //     }
    //   //   }
    //   // }

    //   // let qtyToChange = addminqty;
    //   // if (qtyInCart > 0) {
    //   //   const totalQty = qtyInCart + addminqty;
    //   //   if (totalQty < saleminqty) {
    //   //     qtyToChange = saleminqty;
    //   //   } else {
    //   //     if (totalQty >= salemaxqty) {
    //   //       qtyToChange = salemaxqty - qtyInCart;
    //   //     }
    //   //   }
    //   // } else if (qtyInCart === 0) {
    //   //   if (oldProduct.qty < qty) {
    //   //     if () {

    //   //     }
    //   //   }
    //   //   qtyToChange = saleminqty;
    //   // } else {
    //   //   // Error
    //   // }

    //   if (qty > 0) {
    //     if (qty < saleminqty) {
    //       this.handleNotify(
    //         `"${name}" барааг хамгийн багадаа "${saleminqty}" ширхэгээр худалдан авах боломжтой байна`
    //       );
    //       return oldProduct;
    //     } else if (salemaxqty > 0 && qty > salemaxqty) {
    //       this.handleNotify(
    //         `"${name}" барааг хамгийн ихдээ "${salemaxqty}" ширхэгээр худалдан авах боломжтой байна`
    //       );
    //       return oldProduct;
    //     }

    //     api.product
    //       .isAvailable({
    //         custid:
    //           this.props.isLoggedIn && this.props.user ? this.props.user.id : 0,
    //         skucd: cd,
    //         qty,
    //         iscart: shouldOverride ? 1 : 0
    //       })
    //       .then(res => {
    //         if (res.success) {
    //           const found = cart.products.find(prod => prod.cd === cd);

    //           let qtyInCart = qty;
    //           if (!shouldOverride && found) {
    //             qtyInCart = found.qty + qty;
    //           }

    //           if (found) {
    //             found.qty = qtyInCart;
    //             const i = cart.products.map(prod => prod.cd).indexOf(found.cd);
    //             if (i !== -1) {
    //               cart.products.splice(i, 1, found);
    //             }
    //           } else {
    //             product.qty = qtyInCart;
    //             cart.products.push(product);
    //           }

    //           const qties = cart.products.map(prod => prod.qty);
    //           cart.totalQty = qties.reduce((acc, cur) => acc + cur);

    //           const prices = cart.products.map(prod => {
    //             const price =
    //               this.getUnitPrice(prod).sprice ||
    //               this.getUnitPrice(prod).price;

    //             return price * prod.qty;
    //           });
    //           cart.totalPrice = prices.reduce((acc, cur) => acc + cur);

    //           // TODO: stop page refreshing
    //           this.props.updateCart({
    //             products: cart.products,
    //             totalQty: cart.totalQty,
    //             totalPrice: cart.totalPrice
    //           });

    //           this.handleNotify(
    //             `Таны сагсанд "${name}" бараа ${qty}ш нэмэгдлээ`
    //           );
    //         } else {
    //           this.handleNotify(res.message);
    //         }
    //       });
    //   }
    // };

    // handleAddToCart = (product, shouldOverride = false) => {
    //   if (!product) {
    //     this.handleNotify("Бараа олдсонгүй");
    //     return;
    //   }

    //   const {
    //     cd,
    //     name,
    //     qty,
    //     saleminqty,
    //     salemaxqty,
    //     addminqty,
    //     availableqty
    //   } = product;

    //   let { cart } = this.props;

    //   if (!cart) {
    //     cart = { products: [], totalQty: 0, totalPrice: 0 };
    //   }

    //   const found = cart.products.find(prod => prod.cd === cd);
    //   const qtyInCart = found ? found.qty : 0;
    //   const qtyToAdd = qtyInCart < saleminqty ? saleminqty : addminqty || 1;
    //   const newQty = qtyInCart + qtyToAdd;

    //   if (availableqty >= newQty) {
    //     if (salemaxqty >= newQty || salemaxqty === 0) {
    //       return new Promise((resolve, reject) => {
    //         api.product
    //           .isAvailable({
    //             custid:
    //               this.props.isLoggedIn && this.props.user
    //                 ? this.props.user.id
    //                 : 0,
    //             skucd: cd,
    //             qty: newQty,
    //             iscart: shouldOverride ? 1 : 0
    //           })
    //           .then(res => {
    //             if (res.success) {
    //               if (found) {
    //                 found.qty = newQty;
    //                 const i = cart.products
    //                   .map(prod => prod.cd)
    //                   .indexOf(found.cd);
    //                 cart.products.splice(i, 1, found);
    //                 product = { ...found };
    //               } else {
    //                 product.qty = qtyToAdd;
    //                 cart.products.push(product);
    //               }

    //               const qties = cart.products.map(prod => prod.qty);
    //               cart.totalQty = qties.reduce((acc, cur) => acc + cur);

    //               const prices = cart.products.map(prod => {
    //                 const price =
    //                   this.getUnitPrice(prod).sprice ||
    //                   this.getUnitPrice(prod).price;

    //                 return price * prod.qty;
    //               });
    //               cart.totalPrice = prices.reduce((acc, cur) => acc + cur);

    //               this.props.updateCart({
    //                 products: cart.products,
    //                 totalQty: cart.totalQty,
    //                 totalPrice: cart.totalPrice
    //               });

    //               this.handleNotify(
    //                 `Таны сагсанд "${
    //                   product.name
    //                 }" бараа ${qtyToAdd}ш нэмэгдлээ`
    //               );

    //               resolve();
    //             } else {
    //               this.handleNotify(res.message);

    //               reject();
    //             }
    //           });
    //       });
    //     } else {
    //       this.handleNotify(
    //         `Тус бараанаас хамгийн ихдээ ${
    //           product.salemaxqty
    //         }-г худалдан авах боломжтой`
    //       );
    //     }
    //   } else {
    //     this.handleNotify(`"${product.name}" барааны нөөц хүрэлцэхгүй байна`);
    //   }
    // };

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
              this.handleNotify(res.message);
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
