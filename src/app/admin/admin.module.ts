import {NgModule} from '@angular/core';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {SharedModule} from 'shared/shared.module';
import {AdminAuthGuardService} from '@app/admin/services/admin-auth-guard.service';
import {ProductFormComponent} from '@app/admin/components/product-form/product-form.component';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from 'shared/services/auth-guard.service';
import {MaterialModule} from 'shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductsManagementComponent} from '@app/admin/components/products-management/products-management.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    ProductFormComponent,
    ProductsManagementComponent,
  ],
  exports: [],
  providers: [AdminAuthGuardService],
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'produkty/nowy',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
        data: { title: 'Nowy produkt' }
      },
      {
        path: 'produkty/edycja/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService],
        data: { title: 'Edytuj produkt' }
      },
    ])
  ]
})

export class AdminModule {}
