import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';

import {Product} from 'shared/models/product';
import {ShoppingCart} from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private _cartService: ShoppingCartService) {}

  addToCart() {
    this._cartService.addToCart(this.product);
  }

  toUpperCase(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }
}