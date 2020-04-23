import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import 'rxjs/add/observable/fromPromise';
import {Product} from 'shared/models/product';
import {LinkService} from 'shared/services/link.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$;

  constructor(private _shoppingCartService: ShoppingCartService,
              private _linkService: LinkService) { }

  async ngOnInit() {
    this.cart$ = await this._shoppingCartService.getCart();
  }

  clearCart() {
    this._shoppingCartService.clearCart();
  }

  productLink(product: Product): string {
    return this._linkService.cutLink(product.name);
  }
}
