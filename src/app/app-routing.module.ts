import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import {HomeComponent} from './home/components/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import {LogoffComponent} from './core/components/logoff/logoff.component';
import {AuthGuardService} from 'shared/services/auth-guard.service';
import {AdminAuthGuardService} from '@app/admin/services/admin-auth-guard.service';
import {ErrorComponent} from './error/components/error/error.component';
import {RegisterEmailComponent} from './core/components/register-email/register-email.component';
import {ProductsCatalogComponent} from './shipping/components/products-catalog/products-catalog.component';
import {ShoppingCartComponent} from './shipping/components/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './shipping/components/check-out/check-out.component';
import {AdminOrdersComponent} from './admin/components/admin-orders/admin-orders.component';
import {MyOrdersComponent} from './shipping/components/my-orders/my-orders.component';
import {ProductsManagementComponent} from '@app/admin/components/products-management/products-management.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Nowości w eKcal'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Logowanie'}
  },
  {
    path: 'produkty',
    component: ProductsCatalogComponent,
    data: {title: 'Oferta warzyw'}
  },
  {
    path: 'logoff',
    component: LogoffComponent
  },
  {
    path: 'zamowienia-klientow',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
    data: {title: 'Zarządzenie zamówieniami'}
  },
  {
    path: 'zarzadzanie-produktami',
    component: ProductsManagementComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
    data: {title: 'Zarządzenie produktami'}
  },
  {
    path: 'moje-zamowienia',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService],
    data: {title: 'Moje zamówienia'}
  },
  {
    path: 'rejestracja',
    component: RegisterEmailComponent,
    data: {title: 'Rejestracja'}
  },
  {
    path: 'koszyk',
    component: ShoppingCartComponent,
    data: {title: 'Koszyk'}
  },
  {
    path: 'zamowienie',
    component: CheckOutComponent,
    data: {title: 'Koszyk'}
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {title: 'Error'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // Error: Cannot match any routes. URL Segment: 'undefined'
  // https://stackoverflow.com/a/47649334
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['404']); // or redirect to default route
    };
  }
}
