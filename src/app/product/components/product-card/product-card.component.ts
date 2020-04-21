import {Component, Input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';

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
}
