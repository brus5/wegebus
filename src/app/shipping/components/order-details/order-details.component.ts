import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from 'shared/services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from 'shared/services/auth.service';
import {Orders} from 'shared/models/orders';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderId: string;

  order$: Observable<Orders>;
  appUser$;

  constructor(private _orderService: OrderService,
              private _activatedRoute: ActivatedRoute,
              private _auth: AuthService,
              private _router: Router) {
  }

  async ngOnInit() {
    this.appUser$ = this._auth.appUser$$;
    this.orderId = this._activatedRoute.snapshot.paramMap.get('id');
    this.order$ = await this._orderService.getOrderById(this.orderId);
  }

  deleteOrder() {
    if (!confirm('Chcesz usunąć produkt?')) return;
    this._orderService.remove(this.orderId)
      .then(() => this._router.navigate(['/']));
  }
}
