import {NgModule} from '@angular/core';

import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';

import {SharedModule} from 'shared/shared.module';

@NgModule({
  declarations: [
    AdminOrdersComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
  ],
})

export class AdminModule {}
