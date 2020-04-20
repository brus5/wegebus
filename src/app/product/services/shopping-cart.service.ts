import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from '../../shared/models/product';
import 'rxjs/add/operator/take';
import {ShoppingCart} from '../../shared/models/shopping-cart';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private _db: AngularFireDatabase) {
  }

  private create() {
    return this._db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this._db.object('/shopping-carts/' + cartId)
      .valueChanges().map(x => new ShoppingCart(x.items as any));
  }

  private getItem(cartId: string, productId: string) {
    return this._db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      let quantity = 0;

      if (item.payload.toJSON()) {
        quantity = item.payload.toJSON().quantity as any;
      }

      item$.update({product: product as Product, quantity: (quantity || 0) + change});
    });
  }

}
