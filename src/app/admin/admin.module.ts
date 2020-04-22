import {NgModule} from '@angular/core';

import {ProductCardWaitingComponent} from './components/product-card-waiting/product-card-waiting.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductCardWaitingComponent,
    AdminOrdersComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
  ],
})

export class AdminModule {}
