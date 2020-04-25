import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';

import {Product} from 'shared/models/product';
import {ShoppingCart} from 'shared/models/shopping-cart';
import {LinkService} from 'shared/services/link.service';
import {Router} from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private _cartService: ShoppingCartService,
              private _router: Router,
              private _linkService: LinkService) {
  }

  addToCart() {
    this._cartService.addToCart(this.product);
  }

  toUpperCase(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  productLink(product: Product): string {
    return this._linkService.cutLink(product.name);
  }

  goToDetails() {
    this._router.navigate(['/produkt/'
    + this.productLink(this.product)
    + '/', this.product.key]);
  }
}
