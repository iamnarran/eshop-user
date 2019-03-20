import api from "../api";
import storage from "../utils/storage";

export function getFeedbacks(res, item, found, cart) {
  if (res.success) {
    if (found) {
      found.qty++;
      const i = cart.products.map(product => product.cd).indexOf(found.cd);
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

    return cart;
  } else {
    return false;
  }
}
