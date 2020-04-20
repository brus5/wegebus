import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import {HomeComponent} from './home/components/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import {LogoffComponent} from './core/components/logoff/logoff.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {ProductsComponent} from './product/components/products/products.component';
import {ProductsWaitingRoomComponent} from './admin/components/products-waiting-room/products-waiting-room.component';
import {AdminGuardService} from './shared/services/admin-guard.service';
import {NewsFormComponent} from './news/components/news-form/news-form.component';
import {AboutusComponent} from './aboutus/components/aboutus/aboutus.component';
import {ContactComponent} from './contact/components/contact/contact.component';
import {HelpComponent} from './help/components/help/help.component';
import {ErrorComponent} from './error/components/error/error.component';
import {RegisterEmailComponent} from './core/components/register-email/register-email.component';
import {ProductsCatalogComponent} from './product/components/products-catalog/products-catalog.component';
import {ShoppingCartComponent} from './product/components/shopping-cart/shopping-cart.component';

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
    path: 'poczekalnia-produktow',
    component: ProductsWaitingRoomComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    data: {title: 'Poczekalnia produktów'}
  },
  {
    path: 'aktualnosci-dodaj',
    component: NewsFormComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    data: {title: 'Napisz aktualność'}
  },
  {
    path: 'o-mnie',
    component: AboutusComponent,
    data: {title: 'O mnie'}
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    data: {title: 'Kontakt'}
  },
  {
    path: 'pomoc',
    component: HelpComponent,
    data: {title: 'Pomoc'}
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
