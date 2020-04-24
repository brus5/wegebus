import {ShoppingCart} from './shopping-cart';

export class Orders {
  datePlaced: number;
  items: any[];

  constructor(public shipping: any, public shoppingCart: ShoppingCart, public userId?: string) {
  }

  get orderItems() {
    return this.shoppingCart;
  }

  get totalPrice() {
    let sum = 0;
    for (let item in this.shoppingCart) {
      sum += this.shoppingCart[item].totalPrice;
    }
    return sum;
  }
}
