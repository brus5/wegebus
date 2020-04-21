import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from '../../shared/models/product';
import 'rxjs/add/operator/take';
import {ShoppingCart} from '../../shared/models/shopping-cart';
import {Observable} from 'rxjs';
import {ShoppingCartItem} from '../../shared/models/shopping-cart-item';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private _db: AngularFireDatabase) {
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this._db.object('/shopping-carts/' + cartId)
      .valueChanges().map(x => x ? new ShoppingCart(x['items']) : null);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this._db.object('/shopping-carts/' + cartId + '/items').remove();
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

  private create() {
    return this._db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {

      let quantity;

      if (item.payload.toJSON()) {
        let qty = item.payload.toJSON() as any;
        quantity = qty.quantity;
      }

      quantity = (quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity});
    });
  }
}
