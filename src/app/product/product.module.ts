import {NgModule} from '@angular/core';

import {ProductsComponent} from './components/products/products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductComponent} from './components/product/product.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductsCatalogComponent} from './components/products-catalog/products-catalog.component';
import {ProductFilterComponent} from './components/product-filter/product-filter.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ShoppingCartService} from './services/shopping-cart.service';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ProductQuantityComponent} from './components/product-quantity/product-quantity.component';
import {CheckOutComponent} from './components/check-out/check-out.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form.component';
import {ShoppingCartSummaryComponent} from './components/shopping-cart-summary/shopping-cart-summary.component';
import {OrderSuccessComponent} from './components/order-success/order-success.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';

import {SharedModule} from 'shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from '../footer/footer.module';

import {ProductService} from './services/product.service';
import {AuthGuardService} from 'shared/services/auth-guard.service';
import {AdminGuardService} from 'shared/services/admin-guard.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductsCatalogComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
    OrderSuccessComponent,
    MyOrdersComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FooterModule,
    RouterModule.forChild([
      {
        path: 'produkty/nowy',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminGuardService],
        data: { title: 'Nowy produkt' }
      },
      {
        path: 'produkty/edycja/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService],
        data: { title: 'Edytuj produkt' }
      },
      {
        path: 'produkt/:title/:id',
        component: ProductDetailsComponent,
        data: { title: 'Produkt' }
      },
      {
        path: 'zamowienie-zlozone/:id',
        component: OrderSuccessComponent,
        data: { title: 'Zamówienie złożone' }
      },
    ])
  ],
  exports: [],
  providers: [
    ProductService,
    ShoppingCartService
  ]
})

export class ProductModule {}
