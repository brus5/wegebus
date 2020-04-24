import {Injectable} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Order} from 'shared/models/order';
import {Orders} from 'shared/models/orders';

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

  async getOrderById(cartId: string): Promise<Observable<Orders>> {
    return this.db.object('/orders/' + cartId)
      .valueChanges().map(x => x ? new Orders(x['shipping'], x['items'], x['userId']) : null);
  }

  remove(cartId: string) {
    return this.db.list('/orders/' + cartId).remove();
  }

  getOrders() {
    return this.db.list('/orders',
      ref => ref.orderByChild('datePlaced'))
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
}
