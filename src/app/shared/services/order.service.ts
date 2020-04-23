import {Injectable} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingCart} from 'shared/models/shopping-cart';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase) {
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrderss() {
    return this.db.list('/orders');
  }

  getOrders() {
    return this.db.list('/orders',
      ref => ref.orderByChild('userId'))
      .snapshotChanges().pipe(
        map(actions => (
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val()}
          ))
        ))
      );
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders',
        ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().pipe(
        map(actions => (
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val()}
          ))
        ))
      );
  }

  getOder(orderId: string)  {
    // return this.db.list('/orders/' + orderId).valueChanges();
    return this.db.list('/orders',
      ref => ref.orderByKey().equalTo(orderId))
      .snapshotChanges().pipe(
        map(actions => (
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val()}
          ))
        ))
      )
  }
}
