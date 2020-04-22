import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {Order} from 'shared/models/order';
import {ShoppingCart} from 'shared/models/shopping-cart';
import {AuthService} from 'shared/services/auth.service';
import {OrderService} from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {} as any;
  userSubscription: Subscription;
  userId = 'anonymous'; // if not logged it then anonymous user will be used

  constructor(
    private router: Router,
    private authService: AuthService,
    private ordersService: OrderService) {
  }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => user ? this.userId = user.uid : null);
  }

  async placeOrder() {
    let order = new Order(this.shipping, this.cart, this.userId);
    let result = await this.ordersService.placeOrder(order);
    await this.router.navigate(['/zamowienie-zlozone', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
