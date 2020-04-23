import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from 'shared/services/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderId: string;
  cart$;

  constructor(private _orderService: OrderService,
              private _activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.orderId = this._activatedRoute.snapshot.paramMap.get('id');
    this.cart$ = this._orderService.getOder(this.orderId);
  }
}
