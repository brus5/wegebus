import {ShoppingCart} from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public shipping: any, shoppingCart: ShoppingCart, public userId?: string) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          name: i.name,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }
}
