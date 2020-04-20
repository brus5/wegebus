import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$;

  constructor(private _shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this._shoppingCartService.getCart();
  }

}
