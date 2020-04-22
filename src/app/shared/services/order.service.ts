import {Injectable} from '@angular/core';
import {ShoppingCartService} from '../../product/services/shopping-cart.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

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

  getOrders() {
    return this.db.list('/orders');
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
